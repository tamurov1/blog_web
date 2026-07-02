"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { LibraryBook } from "./books";

type LibrarySearchProps = {
  books: LibraryBook[];
};

export default function LibrarySearch({ books }: LibrarySearchProps) {
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
      <label className="sr-only" htmlFor="library-search">
        Search library
      </label>
      <input
        id="library-search"
        className="journal-search"
        type="search"
        placeholder="Search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <ol className="library-list">
        {visibleBooks.map((book) => (
          <li key={book.slug}>
            <Link href={`/library/${book.slug}`}>
              <span>
                {book.title} - {book.author}
              </span>
              <span>
                [{book.category} | {book.publicationYear}]
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {visibleBooks.length === 0 ? (
        <p className="empty-note">No books found.</p>
      ) : null}
    </>
  );
}
