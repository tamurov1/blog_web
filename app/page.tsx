"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { grekStationPlaybackEvent, useGrekStation } from "./GrekStationProvider";

const certifications = [
  { title: "CompTIA Security+", status: "In Progress", year: "2026", tone: "progress", image: "/certifications/CompTIA_Security+.png" },
];
const stationVideoSource = process.env.NEXT_PUBLIC_GREK_STATION_VIDEO_URL?.trim() || "/videos/wave_back.mp4";

type PointAction = "theme" | "grek-station";
type PointBurst = { id: number; x: number; y: number };
const maximumPoints = 2;

function SocialIcon({ name }: { name: string }) {
  if (name === "GitHub") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.7c.85 0 1.71.12 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>;
  }
  if (name === "LinkedIn") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.5 8.25H3V21h3.5V8.25ZM4.75 3A2.04 2.04 0 1 0 4.75 7a2.04 2.04 0 0 0 0-4ZM21 13.69c0-3.84-2.05-5.63-4.79-5.63-2.2 0-3.19 1.21-3.74 2.06V8.25H9V21h3.47v-6.31c0-1.67.31-3.29 2.39-3.29 2.05 0 2.08 1.92 2.08 3.4V21H21v-7.31Z" /></svg>;
  }
  if (name === "YouTube") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.58 7.19a2.98 2.98 0 0 0-2.1-2.11C17.62 4.58 12 4.58 12 4.58s-5.62 0-7.48.5a2.98 2.98 0 0 0-2.1 2.11A31.13 31.13 0 0 0 1.92 12c0 1.63.17 3.24.5 4.81a2.98 2.98 0 0 0 2.1 2.11c1.86.5 7.48.5 7.48.5s5.62 0 7.48-.5a2.98 2.98 0 0 0 2.1-2.11c.33-1.57.5-3.18.5-4.81 0-1.63-.17-3.24-.5-4.81ZM10 15.46V8.54L16 12l-6 3.46Z" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5h18v13H3zM3.5 6l8.5 7 8.5-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>;
}

export default function HomePage() {
  const { stationPlaying } = useGrekStation();
  const [loading, setLoading] = useState(true);
  const [visitorDate, setVisitorDate] = useState<Date | null>(null);
  const [visitorLocation, setVisitorLocation] = useState("Local time");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showThemePrompt, setShowThemePrompt] = useState(false);
  const [activeSection, setActiveSection] = useState<"projects" | "certificates" | "researches" | "experience" | "grek-station">("projects");
  const [earnedPoints, setEarnedPoints] = useState<PointAction[]>([]);
  const [pointBurst, setPointBurst] = useState<PointBurst | null>(null);
  const [pointsJarVisible, setPointsJarVisible] = useState(false);
  const [pointsJarEvent, setPointsJarEvent] = useState(0);
  const [clockExpanded, setClockExpanded] = useState(false);
  const earnedPointsRef = useRef<PointAction[]>([]);
  const clockTriggerRef = useRef<HTMLButtonElement>(null);
  const clockOverlayButtonRef = useRef<HTMLButtonElement>(null);
  const clockVideoRef = useRef<HTMLVideoElement>(null);
  const clockWasExpandedRef = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1150);
    const hasUsedThemePrompt = window.localStorage.getItem("theme-prompt-used") === "true";
    const promptTimer = hasUsedThemePrompt
      ? undefined
      : window.setTimeout(() => setShowThemePrompt(true), 3000);
    const updateClock = () => setVisitorDate(new Date());
    const storedTheme = window.localStorage.getItem("site-theme");
    const initialTheme = storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const savedPoints = (() => {
      try {
        const stored = JSON.parse(window.localStorage.getItem("site-points") ?? "[]");
        return Array.isArray(stored)
          ? stored.filter((point): point is PointAction => point === "theme" || point === "grek-station")
          : [];
      } catch {
        return [];
      }
    })();

    updateClock();
    earnedPointsRef.current = savedPoints;
    setEarnedPoints(savedPoints);
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
    document.documentElement.style.colorScheme = initialTheme;
    const locationController = new AbortController();
    void fetch("/api/location", {
      cache: "default",
      signal: locationController.signal,
    })
      .then((response) => response.ok ? response.json() : null)
      .then((location: { city?: unknown } | null) => {
        if (typeof location?.city === "string" && location.city.trim()) {
          setVisitorLocation(location.city.trim());
        }
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.warn("Could not determine visitor city");
        }
      });

    const clock = window.setInterval(updateClock, 1000);
    return () => {
      window.clearTimeout(timer);
      if (promptTimer !== undefined) window.clearTimeout(promptTimer);
      window.clearInterval(clock);
      locationController.abort();
    };
  }, []);

  useEffect(() => {
    if (!pointBurst) return;
    const burstId = pointBurst.id;
    const timer = window.setTimeout(() => {
      setPointBurst((current) => current?.id === burstId ? null : current);
    }, 1250);
    return () => window.clearTimeout(timer);
  }, [pointBurst]);

  useEffect(() => {
    if (!pointsJarVisible) return;
    const timer = window.setTimeout(() => setPointsJarVisible(false), 3400);
    return () => window.clearTimeout(timer);
  }, [pointsJarVisible, pointsJarEvent]);

  useEffect(() => {
    const video = clockVideoRef.current;

    if (!clockExpanded) {
      video?.pause();
      if (clockWasExpandedRef.current) {
        clockTriggerRef.current?.focus({ preventScroll: true });
      }
      return;
    }

    clockWasExpandedRef.current = true;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    const previousOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    clockOverlayButtonRef.current?.focus({ preventScroll: true });
    void video?.play().catch(() => {
      // The clock remains usable if the browser declines background video playback.
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setClockExpanded(false);
      if (event.key === "Tab") {
        event.preventDefault();
        clockOverlayButtonRef.current?.focus({ preventScroll: true });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.documentElement.style.overflow = previousDocumentOverflow;
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      video?.pause();
    };
  }, [clockExpanded]);

  const awardPoint = (action: PointAction, x?: number, y?: number) => {
    if (earnedPointsRef.current.includes(action)) return;

    const nextPoints = [...earnedPointsRef.current, action];
    earnedPointsRef.current = nextPoints;
    setEarnedPoints(nextPoints);
    window.localStorage.setItem("site-points", JSON.stringify(nextPoints));
    setPointsJarVisible(true);
    setPointsJarEvent(Date.now());
    setPointBurst({
      id: Date.now(),
      x: x ?? window.innerWidth - 80,
      y: y ?? window.innerHeight / 2,
    });
  };

  useEffect(() => {
    const handleStationPlaybackChange = (event: Event) => {
      const detail = (event as CustomEvent<{
        origin?: { x: number; y: number };
        playing: boolean;
      }>).detail;

      if (detail?.playing) {
        awardPoint("grek-station", detail.origin?.x, detail.origin?.y);
      }
    };

    window.addEventListener(grekStationPlaybackEvent, handleStationPlaybackChange);
    return () => window.removeEventListener(grekStationPlaybackEvent, handleStationPlaybackChange);
  }, []);

  const enterClockMode = () => {
    const video = clockVideoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      void video.play().catch(() => {
        // The effect retries playback after clock mode becomes visible.
      });
    }

    setClockExpanded(true);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem("site-theme", nextTheme);
    window.localStorage.setItem("theme-prompt-used", "true");
    setShowThemePrompt(false);
  };

  const timeParts = visitorDate
    ? new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).formatToParts(visitorDate)
    : [];
  const time = `${timeParts.find((part) => part.type === "hour")?.value ?? "--"}:${timeParts.find((part) => part.type === "minute")?.value ?? "--"}:${timeParts.find((part) => part.type === "second")?.value ?? "--"}`;
  const dayPeriod = timeParts.find((part) => part.type === "dayPeriod")?.value ?? "";
  const date = visitorDate
    ? new Intl.DateTimeFormat(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(visitorDate)
    : "Loading date";

  return (
    <>
    <main className={loading ? "portfolio is-loading" : "portfolio is-ready"} inert={clockExpanded ? true : undefined}>
      <div className="loader" aria-hidden={!loading}>
        <div className="loader-mark">DT</div>
        <div className="loader-line"><i /></div>
      </div>

      <section
        className="hero theme-toggle-area"
        aria-labelledby="hero-title"
        onClick={toggleTheme}
      >
        <video
          className={stationPlaying ? "station-hero-video is-visible" : "station-hero-video"}
          src={stationVideoSource}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
        {showThemePrompt ? (
          <button
            className="theme-prompt"
            type="button"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            aria-pressed={theme === "dark"}
            onClick={(event) => {
              event.stopPropagation();
              awardPoint("theme", event.clientX, event.clientY);
              toggleTheme();
            }}
          >
            click me
          </button>
        ) : null}
        <div className="hero-content">
          <div className="hero-introduction">
            <h1 id="hero-title"><span>Dmytrii</span><span>Tamurov</span></h1>
            <p>I build and maintain secure systems, explore and connect complex ideas<br />and turn knowledge into practical solutions.</p>
            <div className="socials" aria-label="Social links">
              {[
                ["GitHub", "https://github.com/"],
                ["LinkedIn", "https://www.linkedin.com/in/dmytrii-tamurov-40b6aa274"],
                ["YouTube", "https://www.youtube.com/@DmytriiTamurov"],
                ["Email", "mailto:dmytriitamurov@gmail.com"],
              ].map(([name, href]) => <a key={name} href={href} aria-label={name} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"><SocialIcon name={name} /></a>)}
            </div>
          </div>

          <div className="visitor-details" aria-label="Your local date and time">
            <p className="visitor-location">{visitorLocation}</p>
            <button
              ref={clockTriggerRef}
              className="visitor-time"
              type="button"
              aria-label="Show the clock in full-screen mode"
              onClick={(event) => {
                event.stopPropagation();
                enterClockMode();
              }}
            >
              <time dateTime={visitorDate?.toISOString()}>{time}</time>
              <span>{dayPeriod}</span>
            </button>
            <p className="visitor-date">{date}</p>
          </div>
        </div>
      </section>

      <section className="work" id={activeSection} aria-label={activeSection === "projects" ? "Projects" : activeSection === "certificates" ? "Certificates" : activeSection === "researches" ? "Researches" : activeSection === "experience" ? "Experience" : "Grek Station"}>
        <nav className="section-nav" aria-label="Portfolio sections">
          <button className={activeSection === "projects" ? "active" : ""} type="button" onClick={() => setActiveSection("projects")}>Projects</button>
          <button className={activeSection === "certificates" ? "active" : ""} type="button" onClick={() => setActiveSection("certificates")}>Certificates</button>
          <button className={activeSection === "researches" ? "active" : ""} type="button" onClick={() => setActiveSection("researches")}>Researches</button>
          <button className={activeSection === "experience" ? "active" : ""} type="button" onClick={() => setActiveSection("experience")}>Experience</button>
          <button className={activeSection === "grek-station" ? "active" : ""} type="button" onClick={() => setActiveSection("grek-station")}>Grek_Station</button>
        </nav>
        <div className="work-inner">
          <div hidden={activeSection !== "projects"}>
            <div className="project-grid">
              <Link
                className="project-card experience-card"
                href="/projects/image-covert"
                style={{ "--delay": "0ms" } as React.CSSProperties}
                aria-label="Read the Image Covert steganography case study"
              >
                <span className="experience-image" aria-hidden="true">
                  <Image
                    src="/projects/image-covert/carrier-image.jpeg"
                    alt=""
                    width={642}
                    height={964}
                    sizes="(max-width: 600px) calc(100vw - 70px), (max-width: 1199px) 45vw, 30vw"
                  />
                </span>
                <span className="project-copy">
                  <strong>Image Covert</strong>
                  <span>A practical steganography experiment in hidden-data recovery, SHA-256 integrity, and image transformations.</span>
                </span>
                <span className="project-meta"><span>Cybersecurity</span><span>Case study</span></span>
              </Link>
            </div>
          </div>
          <div hidden={activeSection !== "certificates"}>
            <div className="certification-grid">
              {certifications.map((certificate) => (
                <article className="certification-card" key={certificate.title}>
                  <div className="certificate-image-shell">
                    <img src={certificate.image} alt="CompTIA Security+ Certified badge" />
                  </div>
                  <div className="certificate-details">
                    <h2>{certificate.title}</h2>
                    <span className={`certificate-status status-${certificate.tone}`}>{certificate.status}</span>
                    <div className="certificate-year">
                      <span>Year</span>
                      <strong>{certificate.year}</strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div hidden={activeSection !== "researches"}>
            <div className="project-grid">
              <article className="project-card coming-soon-card" style={{ "--delay": "0ms" } as React.CSSProperties}>
                <span className="project-dot" aria-hidden="true" />
                <span className="project-target" aria-hidden="true"><i /><i /><i /><b /></span>
                <span className="project-copy"><strong>Coming soon</strong><span>Research notes, investigations, and published findings are currently being prepared.</span></span>
                <span className="project-meta"><span>Research</span><span>Preparing</span></span>
              </article>
            </div>
          </div>
          <div hidden={activeSection !== "experience"}>
            <div className="project-grid">
              <article className="project-card coming-soon-card" style={{ "--delay": "0ms" } as React.CSSProperties}>
                <span className="project-dot" aria-hidden="true" />
                <span className="project-target" aria-hidden="true"><i /><i /><i /><b /></span>
                <span className="project-copy"><strong>Coming soon</strong><span>Professional experience and selected project work will be added shortly.</span></span>
                <span className="project-meta"><span>Experience</span><span>Preparing</span></span>
              </article>
            </div>
          </div>
          <div hidden={activeSection !== "grek-station"}>
            <div id="grek-station-player" />
          </div>
        </div>
      </section>
      {pointsJarVisible && earnedPoints.length > 0 ? (
        <aside className={pointBurst ? "points-jar is-active" : "points-jar"} aria-label={`${earnedPoints.length} of ${maximumPoints} points collected`}>
          <span className="points-count"><strong>{earnedPoints.length}</strong><span>/{maximumPoints}</span></span>
          <span className="points-track" aria-hidden="true"><i style={{ height: `${earnedPoints.length / maximumPoints * 100}%` }} /></span>
        </aside>
      ) : null}
      {pointBurst ? <span className="point-burst" style={{ left: pointBurst.x, top: pointBurst.y }} aria-hidden="true">+1</span> : null}
    </main>
    <section
      className={clockExpanded ? "clock-focus-overlay is-active" : "clock-focus-overlay"}
      aria-hidden={!clockExpanded}
      aria-label="Full-screen clock"
      aria-modal="true"
      role="dialog"
    >
      <video
        ref={clockVideoRef}
        className="clock-focus-video"
        src={stationVideoSource}
        autoPlay={clockExpanded}
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <button
        ref={clockOverlayButtonRef}
        className="clock-focus-dismiss"
        type="button"
        aria-label="Close the full-screen clock"
        disabled={!clockExpanded}
        onClick={() => setClockExpanded(false)}
      >
        <span className="clock-focus-time">
          <time dateTime={visitorDate?.toISOString()}>{time}</time>
          <span>{dayPeriod}</span>
        </span>
      </button>
    </section>
    </>
  );
}
