"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Journal } from "@/lib/journalStore";
import DeleteJournalButton from "./DeleteJournalButton";

type AdminJournalListProps = {
  adminPath: string;
  journals: Journal[];
};

export default function AdminJournalList({
  adminPath,
  journals,
}: AdminJournalListProps) {
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
      <label className="sr-only" htmlFor="admin-journal-search">
        Search journals
      </label>
      <input
        id="admin-journal-search"
        className="journal-search"
        type="search"
        placeholder="Search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <ul className="admin-list">
        {visibleJournals.map((journal) => (
          <li key={journal.slug}>
            <span className="admin-list-title">
              {journal.date} - {journal.title}
            </span>
            <span className="admin-list-actions">
              <Link href={`/${adminPath}?view=journal&edit=${encodeURIComponent(journal.slug)}`}>
                Edit
              </Link>
              <Link href={`/journal/${journal.slug}`} target="_blank">
                View
              </Link>
              <DeleteJournalButton slug={journal.slug} title={journal.title} />
            </span>
          </li>
        ))}
      </ul>

      {visibleJournals.length === 0 ? (
        <p className="empty-note">No journals found.</p>
      ) : null}

      <Link className="plus-button" href={`/${adminPath}?view=journal&new=1`}>
        +
      </Link>
    </>
  );
}
