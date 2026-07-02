import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cybersecurity",
  description: "Cybersecurity page by Dmytrii Tamurov.",
};

export default function CybersecurityPage() {
  return (
    <main className="content-page">
      <section className="simple-shell">
        <h1 className="content-title">Cybersecurity</h1>
        <p className="entry-text">Soon.</p>
        <Link className="back-button" href="/">
          Back
        </Link>
      </section>
    </main>
  );
}
