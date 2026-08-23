"use client";

import { useEffect, useRef, useState } from "react";

const tracks = {
  jazz: {
    fileName: "Jazz.mp3",
    remoteSource: process.env.NEXT_PUBLIC_GREK_STATION_JAZZ_URL?.trim()
      || process.env.NEXT_PUBLIC_GREK_STATION_AUDIO_URL?.trim(),
  },
  techno: {
    fileName: "Techno.mp3",
    remoteSource: process.env.NEXT_PUBLIC_GREK_STATION_TECHNO_URL?.trim(),
  },
} as const;

type TrackKind = keyof typeof tracks;

function getScheduledTrack(date: Date): TrackKind {
  const day = date.getDay();
  return day === 0 || day === 6 ? "techno" : "jazz";
}

function getTrackSource(trackKind: TrackKind) {
  const scheduledTrack = tracks[trackKind];
  return scheduledTrack.remoteSource
    || `/grek_station/${encodeURIComponent(scheduledTrack.fileName)}`;
}

const bandCount = 64;

function getTrackMetadata(fileName: string) {
  const readableName = fileName
    .replace(/\.[^.]+$/, "")
    .replace(/^SpotiMate\.io\s*-\s*/i, "")
    .replaceAll("_", ",");
  const artistFirstSeparator = readableName.search(/\s+[–—]\s+/);

  if (artistFirstSeparator !== -1) {
    const separator = readableName.slice(artistFirstSeparator).match(/^\s+[–—]\s+/)?.[0] ?? "";
    return {
      title: readableName.slice(artistFirstSeparator + separator.length),
      artist: readableName.slice(0, artistFirstSeparator),
    };
  }

  const separator = readableName.lastIndexOf(" - ");

  return separator === -1
    ? { title: readableName, artist: "" }
    : {
        title: readableName.slice(0, separator),
        artist: readableName.slice(separator + 3),
      };
}

export default function GrekStation({ onPlaybackChange }: { onPlaybackChange: (playing: boolean, origin?: { x: number; y: number }) => void }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const frequencyDataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const displayValuesRef = useRef(new Float32Array(bandCount));
  const animationFrameRef = useRef<number | null>(null);
  const playingRef = useRef(false);
  const trackKindRef = useRef<TrackKind | null>(null);
  const skipNextPauseSaveRef = useRef(false);
  const positionRestoredRef = useRef(false);
  const lastSavedPositionRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [trackKind, setTrackKind] = useState<TrackKind | null>(null);
  const track = trackKind ? getTrackMetadata(tracks[trackKind].fileName) : null;
  const trackSource = trackKind ? getTrackSource(trackKind) : undefined;

  function getPlaybackPositionStorageKey() {
    return trackKindRef.current
      ? `grek-station:${trackKindRef.current}:playback-position`
      : "grek-station:playback-position";
  }

  function readPlaybackPosition() {
    try {
      const savedPosition = Number.parseFloat(window.localStorage.getItem(getPlaybackPositionStorageKey()) ?? "");
      return Number.isFinite(savedPosition) && savedPosition > 0 ? savedPosition : 0;
    } catch {
      return 0;
    }
  }

  function savePlaybackPosition(audio = audioRef.current) {
    if (!audio || !Number.isFinite(audio.currentTime)) return;

    try {
      if (audio.ended || (Number.isFinite(audio.duration) && audio.currentTime >= audio.duration - 0.5)) {
        window.localStorage.removeItem(getPlaybackPositionStorageKey());
        lastSavedPositionRef.current = 0;
        return;
      }

      window.localStorage.setItem(getPlaybackPositionStorageKey(), String(audio.currentTime));
      lastSavedPositionRef.current = audio.currentTime;
    } catch {
      // Playback still works when storage is unavailable or disabled.
    }
  }

  function restorePlaybackPosition(audio: HTMLAudioElement) {
    if (positionRestoredRef.current) return;

    const savedPosition = readPlaybackPosition();
    if (savedPosition > 0 && (!Number.isFinite(audio.duration) || savedPosition < audio.duration - 0.5)) {
      audio.currentTime = savedPosition;
      lastSavedPositionRef.current = savedPosition;
    } else if (savedPosition > 0) {
      try {
        window.localStorage.removeItem(getPlaybackPositionStorageKey());
      } catch {
        // Playback still works when storage is unavailable or disabled.
      }
    }

    positionRestoredRef.current = true;
  }

  async function ensurePlaybackPositionRestored(audio: HTMLAudioElement) {
    if (positionRestoredRef.current) return;
    if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
      restorePlaybackPosition(audio);
      return;
    }

    await new Promise<void>((resolve) => {
      const finish = () => {
        audio.removeEventListener("loadedmetadata", finish);
        audio.removeEventListener("error", finish);
        resolve();
      };

      audio.addEventListener("loadedmetadata", finish, { once: true });
      audio.addEventListener("error", finish, { once: true });
      audio.load();
    });

    if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) restorePlaybackPosition(audio);
  }

  function drawFrame() {
    const canvas = canvasRef.current;
    if (!canvas) {
      animationFrameRef.current = null;
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      animationFrameRef.current = null;
      return;
    }

    const analyser = analyserRef.current;
    const frequencyData = frequencyDataRef.current;
    const displayValues = displayValuesRef.current;
    const active = playingRef.current && analyser && frequencyData;

    if (active) analyser.getByteFrequencyData(frequencyData);

    const styles = window.getComputedStyle(canvas);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (width <= 0 || height <= 0) {
      animationFrameRef.current = null;
      return;
    }

    const centerY = height / 2;
    const horizontalPadding = Math.max(8, width * 0.018);
    const usableWidth = width - horizontalPadding * 2;
    const spacing = usableWidth / (bandCount - 1);
    let settling = false;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.scale(canvas.width / width, canvas.height / height);
    context.lineWidth = Math.max(1, window.devicePixelRatio > 1 ? 0.75 : 1);
    context.strokeStyle = active
      ? styles.getPropertyValue("--station-wave-active").trim()
      : styles.getPropertyValue("--station-wave-idle").trim();

    for (let index = 0; index < bandCount; index += 1) {
      let target = 0.012 + Math.sin(index * 0.48) * 0.004;

      if (active && frequencyData) {
        const binCount = frequencyData.length;
        const start = Math.max(1, Math.floor(Math.exp((Math.log(binCount) * index) / bandCount)));
        const end = Math.max(start + 1, Math.floor(Math.exp((Math.log(binCount) * (index + 1)) / bandCount)));
        let total = 0;
        let peak = 0;
        let samples = 0;

        for (let bin = start; bin < Math.min(end, binCount); bin += 1) {
          total += frequencyData[bin];
          peak = Math.max(peak, frequencyData[bin]);
          samples += 1;
        }

        const average = samples ? total / samples : 0;
        const normalized = (average * 0.68 + peak * 0.32) / 255;
        const frequencyShape = 1 - index / bandCount * 0.18;
        target = Math.min(1, Math.pow(normalized, 0.74) * 1.22 * frequencyShape);
      }

      const response = target > displayValues[index] ? 0.27 : 0.11;
      displayValues[index] += (target - displayValues[index]) * response;
      if (Math.abs(target - displayValues[index]) > 0.002) settling = true;

      const halfHeight = 1 + displayValues[index] * height * 0.34;
      const x = horizontalPadding + index * spacing;
      context.beginPath();
      context.moveTo(x, centerY - halfHeight);
      context.lineTo(x, centerY + halfHeight);
      context.stroke();
    }

    context.restore();

    if (playingRef.current || settling) {
      animationFrameRef.current = window.requestAnimationFrame(drawFrame);
    } else {
      animationFrameRef.current = null;
    }
  }

  function startAnimation() {
    if (animationFrameRef.current === null) {
      animationFrameRef.current = window.requestAnimationFrame(drawFrame);
    }
  }

  async function initializeAudio() {
    const audio = audioRef.current;
    if (!audio) return null;

    if (!contextRef.current) {
      const AudioContextConstructor = window.AudioContext;
      const audioContext = new AudioContextConstructor();
      const source = audioContext.createMediaElementSource(audio);
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      contextRef.current = audioContext;
      sourceRef.current = source;
      analyserRef.current = analyser;
      frequencyDataRef.current = new Uint8Array(analyser.frequencyBinCount);
    }

    if (contextRef.current.state === "suspended") {
      await contextRef.current.resume();
    }

    return audio;
  }

  async function togglePlayback(event: React.MouseEvent<HTMLButtonElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointOrigin = event.detail === 0
      ? { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 }
      : { x: event.clientX, y: event.clientY };
    const audio = await initializeAudio();
    if (!audio) return;

    if (playingRef.current) {
      audio.pause();
      savePlaybackPosition(audio);
      playingRef.current = false;
      setPlaying(false);
      onPlaybackChange(false);
      startAnimation();
      return;
    }

    await ensurePlaybackPositionRestored(audio);
    if (audio.ended) audio.currentTime = 0;

    try {
      await audio.play();
      playingRef.current = true;
      setPlaying(true);
      onPlaybackChange(true, pointOrigin);
      setHasStarted(true);
      startAnimation();
    } catch {
      playingRef.current = false;
      setPlaying(false);
      onPlaybackChange(false);
    }
  }

  function handleEnded() {
    try {
      window.localStorage.removeItem(getPlaybackPositionStorageKey());
    } catch {
      // Playback still works when storage is unavailable or disabled.
    }
    positionRestoredRef.current = true;
    lastSavedPositionRef.current = 0;
    playingRef.current = false;
    setPlaying(false);
    onPlaybackChange(false);
    startAnimation();
  }

  function handleTimeUpdate() {
    const audio = audioRef.current;
    if (!audio || Math.abs(audio.currentTime - lastSavedPositionRef.current) < 2) return;
    savePlaybackPosition(audio);
  }

  function handlePause(event: React.SyntheticEvent<HTMLAudioElement>) {
    if (skipNextPauseSaveRef.current) {
      skipNextPauseSaveRef.current = false;
      return;
    }

    savePlaybackPosition(event.currentTarget);
  }

  useEffect(() => {
    const updateScheduledTrack = () => {
      const scheduledTrack = getScheduledTrack(new Date());

      if (trackKindRef.current && trackKindRef.current !== scheduledTrack) {
        const audio = audioRef.current;
        if (audio && !audio.paused) {
          savePlaybackPosition(audio);
          skipNextPauseSaveRef.current = true;
          audio.pause();
        }

        playingRef.current = false;
        setPlaying(false);
        setHasStarted(false);
        onPlaybackChange(false);
      }

      trackKindRef.current = scheduledTrack;
      setTrackKind(scheduledTrack);
    };

    updateScheduledTrack();
    const scheduleTimer = window.setInterval(updateScheduledTrack, 60_000);

    return () => window.clearInterval(scheduleTimer);
  }, []);

  useEffect(() => {
    positionRestoredRef.current = false;
    lastSavedPositionRef.current = 0;
  }, [trackKind]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const bounds = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(bounds.width * ratio));
      canvas.height = Math.max(1, Math.round(bounds.height * ratio));
      startAnimation();
    };
    const observer = new ResizeObserver(resizeCanvas);

    observer.observe(canvas);
    resizeCanvas();

    const saveCurrentPosition = () => savePlaybackPosition();
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") saveCurrentPosition();
    };

    window.addEventListener("pagehide", saveCurrentPosition);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      saveCurrentPosition();
      window.removeEventListener("pagehide", saveCurrentPosition);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      playingRef.current = false;
      onPlaybackChange(false);
      audioRef.current?.pause();
      sourceRef.current?.disconnect();
      analyserRef.current?.disconnect();
      void contextRef.current?.close();
    };
  }, []);

  return (
    <div className="grek-station">
      <audio
        ref={audioRef}
        src={trackSource}
        preload="metadata"
        crossOrigin="anonymous"
        onLoadedMetadata={(event) => restorePlaybackPosition(event.currentTarget)}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      <button
        className="station-waveform"
        type="button"
        disabled={!trackKind}
        aria-label={playing ? "Pause Grek Station" : "Play Grek Station"}
        aria-pressed={playing}
        onClick={togglePlayback}
      >
        <canvas ref={canvasRef} aria-hidden="true" />
      </button>
      <div className="station-information" aria-live="polite">
        <span className="station-status">{playing ? "Now playing" : "Off air"}</span>
        {hasStarted && track ? <p><span>{track.title}</span>{track.artist ? <><span aria-hidden="true"> — </span><span>{track.artist}</span></> : null}</p> : null}
      </div>
    </div>
  );
}
