import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminPath, isAdminAuthenticated } from "@/lib/adminAuth";
import { getJournal, listJournals } from "@/lib/journalStore";
import { getLibraryBook, listLibraryBooks } from "@/lib/libraryStore";
import {
  createLibraryBookAction,
  createJournalAction,
  loginAction,
  logoutAction,
  updateLibraryBookAction,
  updateJournalAction,
} from "./actions";
import DeleteJournalButton from "./DeleteJournalButton";

type AdminPageProps = {
  params: Promise<{
    adminPath: string;
  }>;
  searchParams: Promise<{
    edit?: string;
    editLibrary?: string;
    error?: string;
    saved?: string;
  }>;
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

function AdminLogin({
  adminPath,
  error,
}: {
  adminPath: string;
  error?: string;
}) {
  return (
    <main className="content-page">
      <section className="admin-shell">
        <h1 className="content-title">Login</h1>
        {error === "login" ? <p className="admin-message">Invalid credentials.</p> : null}
        <form className="admin-form" action={loginAction}>
          <input type="hidden" name="adminPath" value={adminPath} />
          <label>
            Username
            <input name="username" type="text" autoComplete="username" required />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
          <button className="back-button" type="submit">
            Login
          </button>
        </form>
      </section>
    </main>
  );
}

export default async function AdminPage({ params, searchParams }: AdminPageProps) {
  const [{ adminPath }, query] = await Promise.all([params, searchParams]);

  if (adminPath !== getAdminPath()) {
    notFound();
  }

  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return <AdminLogin adminPath={adminPath} error={query.error} />;
  }

  const journals = await listJournals();
  const books = await listLibraryBooks();
  const selectedJournal = query.edit ? await getJournal(query.edit) : undefined;
  const selectedBook = query.editLibrary ? await getLibraryBook(query.editLibrary) : undefined;
  const journalFormAction = selectedJournal ? updateJournalAction : createJournalAction;
  const libraryFormAction = selectedBook ? updateLibraryBookAction : createLibraryBookAction;

  return (
    <main className="content-page">
      <section className="admin-shell">
        <div className="admin-topbar">
          <h1 className="content-title">Admin</h1>
          <form action={logoutAction}>
            <button className="plain-button" type="submit">
              Logout
            </button>
          </form>
        </div>

        {query.saved ? <p className="admin-message">Saved.</p> : null}
        {query.error === "session" ? <p className="admin-message">Login again.</p> : null}

        <section className="admin-section" aria-labelledby="journal-admin-title">
          <h2 id="journal-admin-title" className="admin-section-title">
            Journal
          </h2>
          <form className="admin-form" action={journalFormAction}>
            <input type="hidden" name="slug" value={selectedJournal?.slug ?? ""} />
            <label>
              Date
              <input
                name="date"
                type="text"
                defaultValue={selectedJournal?.date ?? ""}
                required
              />
            </label>
            <label>
              Title
              <input
                name="title"
                type="text"
                defaultValue={selectedJournal?.title ?? ""}
                required
              />
            </label>
            <label>
              Body
              <textarea
                name="body"
                defaultValue={selectedJournal?.body ?? ""}
                rows={10}
                required
              />
            </label>
            <button className="back-button" type="submit">
              {selectedJournal ? "Update" : "Add"}
            </button>
          </form>

          <ul className="admin-list">
            {journals.map((journal) => (
              <li key={journal.slug}>
                <Link href={`/${adminPath}?edit=${encodeURIComponent(journal.slug)}`}>
                  {journal.date} - {journal.title}
                </Link>
                <span className="admin-list-actions">
                  <Link href={`/journal/${journal.slug}`} target="_blank">
                    View
                  </Link>
                  <DeleteJournalButton slug={journal.slug} title={journal.title} />
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="admin-section" aria-labelledby="library-admin-title">
          <h2 id="library-admin-title" className="admin-section-title">
            Library
          </h2>
          <form className="admin-form" action={libraryFormAction}>
            <input type="hidden" name="slug" value={selectedBook?.slug ?? ""} />
            <label>
              Book Title
              <input
                name="title"
                type="text"
                defaultValue={selectedBook?.title ?? ""}
                required
              />
            </label>
            <label>
              Author
              <input
                name="author"
                type="text"
                defaultValue={selectedBook?.author ?? ""}
                required
              />
            </label>
            <label>
              Category
              <input
                name="category"
                type="text"
                defaultValue={selectedBook?.category ?? ""}
                required
              />
            </label>
            <label>
              Year of Publication
              <input
                name="publicationYear"
                type="text"
                defaultValue={selectedBook?.publicationYear ?? ""}
                required
              />
            </label>
            <label>
              Description
              <textarea
                name="description"
                defaultValue={selectedBook?.description ?? ""}
                rows={10}
                required
              />
            </label>
            <button className="back-button" type="submit">
              {selectedBook ? "Update" : "Add"}
            </button>
          </form>

          <ul className="admin-list">
            {books.map((book) => (
              <li key={book.slug}>
                <Link href={`/${adminPath}?editLibrary=${encodeURIComponent(book.slug)}`}>
                  {book.title} - {book.author}
                </Link>
                <span className="admin-list-actions">
                  <Link href={`/library/${book.slug}`} target="_blank">
                    View
                  </Link>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
