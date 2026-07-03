"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

const workMinutes = 25;
const breakMinutes = 5;
const blockMinutes = workMinutes + breakMinutes;
const minuteMs = 60 * 1000;
const blockMs = blockMinutes * minuteMs;

type TimerState = "setup" | "running" | "summary";

function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

export default function PomodoroTool() {
  const [blocksInput, setBlocksInput] = useState("1");
  const [blocks, setBlocks] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [state, setState] = useState<TimerState>("setup");
  const startedAtRef = useRef(0);
  const animationFrameRef = useRef(0);
  const summaryTimeoutRef = useRef<number | undefined>(undefined);
  const soundRef = useRef<HTMLAudioElement | undefined>(undefined);
  const completedWorkSessionsRef = useRef(0);

  const totalMs = blocks * blockMs;
  const progress = totalMs > 0 ? Math.min(elapsedMs / totalMs, 1) : 0;
  const blockElapsed = blocks > 0 ? elapsedMs % blockMs : 0;
  const blockProgress = state === "summary" ? 1 : Math.min(blockElapsed / blockMs, 1);
  const phase = blockElapsed < workMinutes * minuteMs ? "Work" : "Break";

  const stats = useMemo(
    () => ({
      total: blocks * blockMinutes,
      work: blocks * workMinutes,
      break: blocks * breakMinutes,
    }),
    [blocks],
  );

  useEffect(() => {
    if (state !== "running") {
      return;
    }

    const tick = () => {
      const nextElapsed = Math.min(Date.now() - startedAtRef.current, totalMs);
      setElapsedMs(nextElapsed);

      const completedWorkSessions = getCompletedWorkSessions(nextElapsed);
      if (completedWorkSessions > completedWorkSessionsRef.current) {
        completedWorkSessionsRef.current = completedWorkSessions;
        playWorkCompleteSound();
      }

      if (nextElapsed >= totalMs) {
        setState("summary");
        summaryTimeoutRef.current = window.setTimeout(() => {
          setState("setup");
          setBlocks(0);
          setElapsedMs(0);
          setBlocksInput("1");
        }, 7000);
        return;
      }

      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    animationFrameRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrameRef.current);
    };
  }, [state, totalMs]);

  useEffect(() => {
    return () => {
      window.cancelAnimationFrame(animationFrameRef.current);
      if (summaryTimeoutRef.current) {
        window.clearTimeout(summaryTimeoutRef.current);
      }
    };
  }, []);

  function prepareWorkCompleteSound() {
    const sound = new Audio("/sound.mp3");
    sound.preload = "auto";
    sound.volume = 0;
    soundRef.current = sound;

    void sound
      .play()
      .then(() => {
        sound.pause();
        sound.currentTime = 0;
        sound.volume = 1;
      })
      .catch(() => {
        sound.volume = 1;
      });
  }

  function playWorkCompleteSound() {
    const sound = soundRef.current;

    if (!sound) {
      return;
    }

    sound.currentTime = 0;
    void sound.play().catch(() => undefined);
  }

  function getCompletedWorkSessions(elapsed: number) {
    if (elapsed < workMinutes * minuteMs) {
      return 0;
    }

    return Math.min(blocks, Math.floor((elapsed - workMinutes * minuteMs) / blockMs) + 1);
  }

  function startPomodoro(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const requestedBlocks = Math.max(1, Math.min(24, Math.floor(Number(blocksInput))));

    if (!Number.isFinite(requestedBlocks)) {
      return;
    }

    if (summaryTimeoutRef.current) {
      window.clearTimeout(summaryTimeoutRef.current);
      summaryTimeoutRef.current = undefined;
    }

    setBlocks(requestedBlocks);
    setElapsedMs(0);
    completedWorkSessionsRef.current = 0;
    prepareWorkCompleteSound();
    startedAtRef.current = Date.now();
    setState("running");
  }

  return (
    <main className="content-page">
      <section className="pomodoro-frame" aria-labelledby="pomodoro-title">
        <h1 id="pomodoro-title" className="pomodoro-title">
          Pomodoro
        </h1>
        <Link className="pomodoro-about-link" href="/tools/pomodoro/about">
          What is pomodoro?
        </Link>

        <div className={`pomodoro-workspace ${state === "running" ? "pomodoro-workspace-active" : ""}`}>
          {state === "setup" ? (
            <form className="pomodoro-setup" onSubmit={startPomodoro}>
              <label htmlFor="pomodoro-blocks">
                How many pomodoro blocks
                <span>you wish to complete?</span>
              </label>
              <input
                id="pomodoro-blocks"
                inputMode="numeric"
                max={24}
                min={1}
                name="blocks"
                type="number"
                value={blocksInput}
                onChange={(event) => setBlocksInput(event.target.value)}
              />
              <button className="pomodoro-start" type="submit">
                Start
              </button>
            </form>
          ) : null}

          {state === "summary" ? (
            <div className="pomodoro-summary" aria-live="polite">
              <p>Total time: {formatMinutes(stats.total)}</p>
              <p>Total work: {formatMinutes(stats.work)}</p>
              <p>Total break: {formatMinutes(stats.break)}</p>
              <strong>Good Job!</strong>
            </div>
          ) : null}

          <div
            aria-label="Current pomodoro block progress"
            className="pomodoro-clock"
            style={
              {
                "--clock-progress": `${blockProgress * 360}deg`,
                "--hand-rotation": `${blockProgress * 360}deg`,
              } as CSSProperties
            }
          >
            {state === "running" ? <span className="pomodoro-phase">{phase}</span> : null}
            <span className="pomodoro-hand" />
          </div>

          {state !== "setup" ? (
            <div className="pomodoro-total" aria-label="Total pomodoro progress">
              <div className="pomodoro-total-track">
                {Array.from({ length: blocks }).map((_, index) => (
                  <div className="pomodoro-block" key={index}>
                    <span className="pomodoro-work-segment" />
                    <span className="pomodoro-break-segment" />
                  </div>
                ))}
                <span
                  className="pomodoro-total-fill"
                  style={{ height: `${progress * 100}%` }}
                />
                <span
                  className="pomodoro-total-arrow"
                  style={{ top: `${progress * 100}%` }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <Link className="back-button" href="/tools">
        Back
      </Link>
    </main>
  );
}
