import type { Metadata } from "next";
import Link from "next/link";
import LibrarySearch from "./LibrarySearch";
import { listLibraryBooks } from "@/lib/libraryStore";

export const metadata: Metadata = {
  title: "Library",
  description: "Library by Dmytrii Tamurov.",
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function LibraryPage() {
  const books = await listLibraryBooks();

  return (
    <main className="content-page">
      <section className="journal-shell" aria-labelledby="library-title">
        <h1 id="library-title" className="content-title">
          Library
        </h1>
        <LibrarySearch books={books} />
        <Link className="back-button" href="/">
          Back
        </Link>
      </section>
    </main>
  );
}
