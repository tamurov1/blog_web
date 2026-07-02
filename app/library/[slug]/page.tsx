import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLibraryBook } from "@/lib/libraryStore";

type LibraryBookPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function generateMetadata({
  params,
}: LibraryBookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = await getLibraryBook(slug);

  if (!book) {
    return {
      title: "Library",
    };
  }

  return {
    title: book.title,
    description: `${book.title} by ${book.author}`,
  };
}

export default async function LibraryBookPage({ params }: LibraryBookPageProps) {
  const { slug } = await params;
  const book = await getLibraryBook(slug);

  if (!book) {
    notFound();
  }

  return (
    <main className="content-page">
      <article className="book-shell">
        <p className="book-category">
          {book.category} | {book.publicationYear}
        </p>
        <h1 className="book-title">{book.title}</h1>
        <p className="book-author">{book.author}</p>
        <p className="book-description">{book.description}</p>
        <Link className="back-button" href="/library">
          Back
        </Link>
      </article>
    </main>
  );
}
