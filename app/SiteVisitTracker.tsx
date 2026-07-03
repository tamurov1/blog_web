"use client";

import { useEffect, useRef } from "react";

const flushIntervalMs = 15000;

export default function SiteVisitTracker() {
  const visibleStartedAtRef = useRef<number | undefined>(undefined);
  const pendingMsRef = useRef(0);

  useEffect(() => {
    function startVisibleTime() {
      visibleStartedAtRef.current ??= Date.now();
    }

    function pauseVisibleTime() {
      if (visibleStartedAtRef.current === undefined) {
        return;
      }

      pendingMsRef.current += Date.now() - visibleStartedAtRef.current;
      visibleStartedAtRef.current = undefined;
    }

    function flush() {
      pauseVisibleTime();

      const pendingMs = Math.round(pendingMsRef.current);
      if (pendingMs <= 0) {
        return;
      }

      const timeSpentSeconds = Math.max(1, Math.round(pendingMs / 1000));
      pendingMsRef.current = 0;

      const payload = JSON.stringify({
        path: window.location.pathname,
        timeSpentSeconds,
      });

      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon("/api/analytics", blob);
      } else {
        void fetch("/api/analytics", {
          body: payload,
          headers: { "Content-Type": "application/json" },
          keepalive: true,
          method: "POST",
        });
      }

      if (document.visibilityState === "visible") {
        startVisibleTime();
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        startVisibleTime();
        return;
      }

      flush();
    }

    if (document.visibilityState === "visible") {
      startVisibleTime();
    }

    const intervalId = window.setInterval(flush, flushIntervalMs);

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", flush);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, []);

  return null;
}
