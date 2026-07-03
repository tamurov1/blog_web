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
          Pomodoro technique helps to organize time for any kind of activity. Simply break down the usage of time into blocks of work and rest.
          One block is 30 minutes: 25 minutes of work and 5 minutes of rest.
        </p>
        <p className="entry-text">
          Honestly, I personally find it pretty useful, just try it yourself.
        </p>
        <Link className="back-button" href="/tools/pomodoro">
          Back
        </Link>
      </article>
    </main>
  );
}
