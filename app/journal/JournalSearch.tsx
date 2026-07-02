"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Journal } from "./journals";

type JournalSearchProps = {
  journals: Journal[];
};

export default function JournalSearch({ journals }: JournalSearchProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const visibleJournals = useMemo(() => {
    if (!normalizedQuery) {
      return journals;
    }

    return journals.filter((journal) => {
      const text = `${journal.date} ${journal.title}`.toLowerCase();
      return text.includes(normalizedQuery);
    });
  }, [journals, normalizedQuery]);

  return (
    <>
      <label className="sr-only" htmlFor="journal-search">
        Search journals
      </label>
      <input
        id="journal-search"
        className="journal-search"
        type="search"
        placeholder="Search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <ul className="journal-list">
        {visibleJournals.map((journal) => (
          <li key={journal.slug}>
            <Link href={`/journal/${journal.slug}`}>
              {journal.date} - {journal.title}
            </Link>
          </li>
        ))}
      </ul>

      {visibleJournals.length === 0 ? (
        <p className="empty-note">No journals found.</p>
      ) : null}
    </>
  );
}
