"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { LibraryBook } from "@/lib/libraryStore";
import DeleteLibraryBookButton from "./DeleteLibraryBookButton";

type AdminLibraryListProps = {
  adminPath: string;
  books: LibraryBook[];
};

export default function AdminLibraryList({
  adminPath,
  books,
}: AdminLibraryListProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const visibleBooks = useMemo(() => {
    if (!normalizedQuery) {
      return books;
    }

    return books.filter((book) => {
      const text =
        `${book.title} ${book.author} ${book.category} ${book.publicationYear}`.toLowerCase();
      return text.includes(normalizedQuery);
    });
  }, [books, normalizedQuery]);

  return (
    <>
      <label className="sr-only" htmlFor="admin-library-search">
        Search library
      </label>
      <input
        id="admin-library-search"
        className="journal-search"
        type="search"
        placeholder="Search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <ul className="admin-list">
        {visibleBooks.map((book) => (
          <li key={book.slug}>
            <span className="admin-list-title">
              {book.title} - {book.author}
            </span>
            <span className="admin-list-actions">
              <Link
                href={`/${adminPath}?view=library&editLibrary=${encodeURIComponent(book.slug)}`}
              >
                Edit
              </Link>
              <Link href={`/library/${book.slug}`} target="_blank">
                View
              </Link>
              <DeleteLibraryBookButton slug={book.slug} title={book.title} />
            </span>
          </li>
        ))}
      </ul>

      {visibleBooks.length === 0 ? <p className="empty-note">No books found.</p> : null}

      <Link className="plus-button" href={`/${adminPath}?view=library&new=1`}>
        +
      </Link>
    </>
  );
}
