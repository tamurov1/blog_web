"use client";

import { useState } from "react";

const introduction =
  "I investigate security problems, build scripts and cloud systems, manage networks, administration, and research the technologies and systems shaping the modern world.";

export default function LandingIntroduction() {
  const [open, setOpen] = useState(true);

  return (
    <div className="landing-introduction" data-open={open}>
      <div
        id="landing-introduction-text"
        className="landing-introduction-panel"
        aria-hidden={!open}
      >
        <div className="landing-introduction-inner">
          <p>{introduction}</p>
          <button
            className="landing-introduction-close"
            type="button"
            aria-label="Hide introduction"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>

      <button
        className="landing-introduction-open"
        type="button"
        aria-controls="landing-introduction-text"
        aria-expanded={open}
        aria-hidden={open}
        tabIndex={open ? -1 : 0}
        onClick={() => setOpen(true)}
      >
        Show introduction
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}
