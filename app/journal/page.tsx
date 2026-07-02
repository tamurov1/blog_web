import type { Metadata } from "next";
import Link from "next/link";
import JournalSearch from "./JournalSearch";
import { listJournals } from "@/lib/journalStore";

export const metadata: Metadata = {
  title: "Journal",
  description: "Journal entries by Dmytrii Tamurov.",
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function JournalPage() {
  const journals = await listJournals();

  return (
    <main className="content-page">
      <section className="journal-shell" aria-labelledby="journal-title">
        <h1 id="journal-title" className="content-title">
          Journal
        </h1>
        <JournalSearch journals={journals} />
        <Link className="back-button" href="/">
          Back
        </Link>
      </section>
    </main>
  );
}
