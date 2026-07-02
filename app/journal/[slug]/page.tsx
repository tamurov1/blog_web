import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listComments } from "@/lib/commentStore";
import { getJournal } from "@/lib/journalStore";
import Comments from "./Comments";

type JournalEntryPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    comment?: string;
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
  searchParams,
}: JournalEntryPageProps) {
  const [{ slug }, query] = await Promise.all([
    params,
    searchParams ?? Promise.resolve({} as { comment?: string }),
  ]);
  const journal = await getJournal(slug);

  if (!journal) {
    notFound();
  }

  const comments = await listComments(slug);

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
      <Comments comments={comments} message={query.comment} slug={slug} />
    </main>
  );
}
