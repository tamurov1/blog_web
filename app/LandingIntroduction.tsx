"use client";

import { useState } from "react";

const introduction =
  "I investigate security problems, build scripts and cloud systems, manage networks, administration, and research the technologies and systems shaping the modern world.";

export default function LandingIntroduction() {
  const [open, setOpen] = useState(true);

  return (
    <div className="landing-introduction" data-open={open}>
      <div className="landing-heading">
        <h1>Dmytrii Tamurov</h1>
        <button
          className="landing-introduction-toggle"
          type="button"
          aria-controls="landing-introduction-text"
          aria-expanded={open}
          aria-label={open ? "Hide introduction" : "Show introduction"}
          onClick={() => setOpen((current) => !current)}
        >
          <span aria-hidden="true" />
        </button>
      </div>

      <div
        id="landing-introduction-text"
        className="landing-introduction-panel"
        aria-hidden={!open}
      >
        <div className="landing-introduction-inner">
          <p>{introduction}</p>
        </div>
      </div>
    </div>
  );
}
