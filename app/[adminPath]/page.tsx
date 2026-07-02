import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminPath, isAdminAuthenticated } from "@/lib/adminAuth";
import { getJournal, listJournals } from "@/lib/journalStore";
import {
  createJournalAction,
  loginAction,
  logoutAction,
  updateJournalAction,
} from "./actions";

type AdminPageProps = {
  params: Promise<{
    adminPath: string;
  }>;
  searchParams: Promise<{
    edit?: string;
    error?: string;
    saved?: string;
  }>;
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Journal Admin",
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
  const selectedJournal = query.edit ? await getJournal(query.edit) : undefined;
  const formAction = selectedJournal ? updateJournalAction : createJournalAction;

  return (
    <main className="content-page">
      <section className="admin-shell">
        <div className="admin-topbar">
          <h1 className="content-title">Journal Admin</h1>
          <form action={logoutAction}>
            <button className="plain-button" type="submit">
              Logout
            </button>
          </form>
        </div>

        {query.saved ? <p className="admin-message">Saved.</p> : null}
        {query.error === "session" ? <p className="admin-message">Login again.</p> : null}

        <form className="admin-form" action={formAction}>
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
              <Link href={`/journal/${journal.slug}`} target="_blank">
                View
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
