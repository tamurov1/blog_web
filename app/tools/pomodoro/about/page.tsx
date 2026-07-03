import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What is Pomodoro?",
  description: "A brief explanation of the Pomodoro technique.",
};

export default function PomodoroAboutPage() {
  return (
    <main className="content-page">
      <article className="entry-shell">
        <h1 className="entry-title">What is pomodoro?</h1>
        <p className="entry-text">
          Pomodoro is a simple focus method. You work for a set period, then take a
          short break. Here, one block is 30 minutes: 25 minutes of work and 5
          minutes of break.
        </p>
        <p className="entry-text">
          The goal is not complexity. It is to start, protect attention, rest
          briefly, and repeat.
        </p>
        <Link className="back-button" href="/tools/pomodoro">
          Back
        </Link>
      </article>
    </main>
  );
}
