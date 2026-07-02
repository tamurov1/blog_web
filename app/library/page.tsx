import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Library",
  description: "Library page by Dmytrii Tamurov.",
};

export default function LibraryPage() {
  return (
    <main className="content-page">
      <section className="simple-shell">
        <h1 className="content-title">Library</h1>
        <p className="entry-text">Soon.</p>
        <Link className="back-button" href="/">
          Back
        </Link>
      </section>
    </main>
  );
}
