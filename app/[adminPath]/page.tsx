import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminPath, isAdminAuthenticated } from "@/lib/adminAuth";
import { getJournal, listJournals } from "@/lib/journalStore";
import { getLibraryBook, listLibraryBooks } from "@/lib/libraryStore";
import AdminJournalList from "./AdminJournalList";
import AdminLibraryList from "./AdminLibraryList";
import {
  createLibraryBookAction,
  createJournalAction,
  loginAction,
  logoutAction,
  updateLibraryBookAction,
  updateJournalAction,
} from "./actions";

type AdminPageProps = {
  params: Promise<{
    adminPath: string;
  }>;
  searchParams: Promise<{
    edit?: string;
    editLibrary?: string;
    error?: string;
    new?: string;
    saved?: string;
    view?: string;
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

function AdminTopbar({ adminPath }: { adminPath: string }) {
  return (
    <div className="admin-topbar">
      <h1 className="content-title">Admin</h1>
      <div className="admin-topbar-actions">
        <Link className="plain-link" href={`/${adminPath}`}>
          Home
        </Link>
        <form action={logoutAction}>
          <button className="plain-button" type="submit">
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}

function AdminTiles({ adminPath }: { adminPath: string }) {
  return (
    <nav className="admin-tile-grid" aria-label="Admin sections">
      <Link className="tile-button admin-tile-button" href={`/${adminPath}?view=journal`}>
        Journal
      </Link>
      <Link className="tile-button admin-tile-button" href={`/${adminPath}?view=library`}>
        Library
      </Link>
    </nav>
  );
}

function JournalForm({
  adminPath,
  journal,
}: {
  adminPath: string;
  journal?: Awaited<ReturnType<typeof getJournal>>;
}) {
  const formAction = journal ? updateJournalAction : createJournalAction;

  return (
    <section className="admin-section" aria-labelledby="journal-admin-title">
      <h2 id="journal-admin-title" className="admin-section-title">
        {journal ? "Edit Journal" : "Add Journal"}
      </h2>
      <form className="admin-form" action={formAction}>
        <input type="hidden" name="slug" value={journal?.slug ?? ""} />
        <label>
          Date
          <input name="date" type="text" defaultValue={journal?.date ?? ""} required />
        </label>
        <label>
          Title
          <input name="title" type="text" defaultValue={journal?.title ?? ""} required />
        </label>
        <label>
          Body
          <textarea name="body" defaultValue={journal?.body ?? ""} rows={10} required />
        </label>
        <button className="back-button" type="submit">
          {journal ? "Update" : "Add"}
        </button>
      </form>
      <Link className="back-button" href={`/${adminPath}?view=journal`}>
        Back
      </Link>
    </section>
  );
}

function LibraryForm({
  adminPath,
  book,
}: {
  adminPath: string;
  book?: Awaited<ReturnType<typeof getLibraryBook>>;
}) {
  const formAction = book ? updateLibraryBookAction : createLibraryBookAction;

  return (
    <section className="admin-section" aria-labelledby="library-admin-title">
      <h2 id="library-admin-title" className="admin-section-title">
        {book ? "Edit Book" : "Add Book"}
      </h2>
      <form className="admin-form" action={formAction}>
        <input type="hidden" name="slug" value={book?.slug ?? ""} />
        <label>
          Book Title
          <input name="title" type="text" defaultValue={book?.title ?? ""} required />
        </label>
        <label>
          Author
          <input name="author" type="text" defaultValue={book?.author ?? ""} required />
        </label>
        <label>
          Category
          <input name="category" type="text" defaultValue={book?.category ?? ""} required />
        </label>
        <label>
          Year of Publication
          <input
            name="publicationYear"
            type="text"
            defaultValue={book?.publicationYear ?? ""}
            required
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            defaultValue={book?.description ?? ""}
            rows={10}
            required
          />
        </label>
        <button className="back-button" type="submit">
          {book ? "Update" : "Add"}
        </button>
      </form>
      <Link className="back-button" href={`/${adminPath}?view=library`}>
        Back
      </Link>
    </section>
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

  const view = query.view === "library" ? "library" : query.view === "journal" ? "journal" : "";

  const selectedJournal =
    view === "journal" && query.edit ? await getJournal(query.edit) : undefined;
  const selectedBook =
    view === "library" && query.editLibrary ? await getLibraryBook(query.editLibrary) : undefined;

  if ((query.edit && !selectedJournal) || (query.editLibrary && !selectedBook)) {
    notFound();
  }

  return (
    <main className="content-page">
      <section className="admin-shell">
        <AdminTopbar adminPath={adminPath} />

        {query.saved ? <p className="admin-message">Saved.</p> : null}
        {query.error === "session" ? <p className="admin-message">Login again.</p> : null}

        {!view ? <AdminTiles adminPath={adminPath} /> : null}

        {view === "journal" && !query.new && !query.edit ? (
          <section className="admin-section" aria-labelledby="journal-admin-title">
            <h2 id="journal-admin-title" className="admin-section-title">
              Journal
            </h2>
            <AdminJournalList adminPath={adminPath} journals={await listJournals()} />
          </section>
        ) : null}

        {view === "journal" && (query.new || query.edit) ? (
          <JournalForm adminPath={adminPath} journal={selectedJournal} />
        ) : null}

        {view === "library" && !query.new && !query.editLibrary ? (
          <section className="admin-section" aria-labelledby="library-admin-title">
            <h2 id="library-admin-title" className="admin-section-title">
              Library
            </h2>
            <AdminLibraryList adminPath={adminPath} books={await listLibraryBooks()} />
          </section>
        ) : null}

        {view === "library" && (query.new || query.editLibrary) ? (
          <LibraryForm adminPath={adminPath} book={selectedBook} />
        ) : null}
      </section>
    </main>
  );
}
