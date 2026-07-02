"use client";

import { useEffect, useState } from "react";

const storageKey = "site-theme";

type Theme = "light" | "dark";

function getStoredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.localStorage.getItem(storageKey) === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = "only light";
  window.localStorage.setItem(storageKey, theme);
}

export default function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const storedTheme = getStoredTheme();
    setTheme(storedTheme);
    applyTheme(storedTheme);
  }, []);

  const dark = theme === "dark";

  return (
    <button
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={dark}
      className="theme-switch"
      type="button"
      onClick={() => {
        const nextTheme = dark ? "light" : "dark";
        setTheme(nextTheme);
        applyTheme(nextTheme);
      }}
    >
      <span className="theme-switch-track">
        <span className="theme-switch-thumb" />
      </span>
    </button>
  );
}
