import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tools",
  description: "Simple tools by Dmytrii Tamurov.",
};

export default function ToolsPage() {
  return (
    <main className="content-page">
      <section className="journal-shell" aria-labelledby="tools-title">
        <h1 id="tools-title" className="content-title">
          Tools
        </h1>

        <nav className="tools-grid" aria-label="Tools">
          <Link className="tool-card" href="/tools/pomodoro">
            Pomodoro
          </Link>
        </nav>

        <Link className="back-button" href="/">
          Back
        </Link>
      </section>
    </main>
  );
}
