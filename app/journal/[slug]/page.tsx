import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJournal } from "@/lib/journalStore";

type JournalEntryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function generateMetadata({
  params,
}: JournalEntryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const journal = await getJournal(slug);

  if (!journal) {
    return {
      title: "Journal",
    };
  }

  return {
    title: journal.title,
    description: `${journal.date} - ${journal.title}`,
  };
}

export default async function JournalEntryPage({
  params,
}: JournalEntryPageProps) {
  const { slug } = await params;
  const journal = await getJournal(slug);

  if (!journal) {
    notFound();
  }

  return (
    <main className="content-page">
      <article className="entry-shell">
        <h1 className="entry-title">
          {journal.date} - {journal.title}
        </h1>
        <p className="entry-text">{journal.body}</p>
        <Link className="back-button" href="/journal">
          Back
        </Link>
      </article>
    </main>
  );
}
