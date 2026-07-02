"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSession,
  getAdminPath,
  getAdminUsername,
  isAdminAuthenticated,
  setAdminSession,
  verifyAdminPassword,
} from "@/lib/adminAuth";
import { createJournal, deleteJournal, updateJournal } from "@/lib/journalStore";
import { createLibraryBook, deleteLibraryBook, updateLibraryBook } from "@/lib/libraryStore";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function redirectToAdmin(query = ""): never {
  redirect(`/${getAdminPath()}${query}`);
}

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirectToAdmin("?error=session");
  }
}

function revalidateJournalPaths(slug?: string) {
  revalidatePath("/journal");
  revalidatePath("/sitemap.xml");

  if (slug) {
    revalidatePath(`/journal/${slug}`);
  }
}

function revalidateLibraryPaths(slug?: string) {
  revalidatePath("/library");
  revalidatePath("/sitemap.xml");

  if (slug) {
    revalidatePath(`/library/${slug}`);
  }
}

export async function loginAction(formData: FormData) {
  const adminPath = getString(formData, "adminPath");
  const username = getString(formData, "username");
  const password = getString(formData, "password");

  if (adminPath !== getAdminPath()) {
    redirect("/");
  }

  if (username !== getAdminUsername() || !verifyAdminPassword(password)) {
    redirectToAdmin("?error=login");
  }

  await setAdminSession();
  redirectToAdmin();
}

export async function logoutAction() {
  await clearAdminSession();
  redirectToAdmin();
}

export async function createJournalAction(formData: FormData) {
  await requireAdmin();

  const journal = await createJournal({
    date: getString(formData, "date"),
    title: getString(formData, "title"),
    body: getString(formData, "body"),
  });

  revalidateJournalPaths(journal?.slug);
  redirectToAdmin("?saved=created");
}

export async function updateJournalAction(formData: FormData) {
  await requireAdmin();

  const slug = getString(formData, "slug");
  const journal = await updateJournal(slug, {
    date: getString(formData, "date"),
    title: getString(formData, "title"),
    body: getString(formData, "body"),
  });

  revalidateJournalPaths(slug);
  revalidateJournalPaths(journal?.slug);
  redirectToAdmin("?saved=updated");
}

export async function deleteJournalAction(formData: FormData) {
  await requireAdmin();

  const slug = getString(formData, "slug");
  const journal = await deleteJournal(slug);

  revalidateJournalPaths(slug);
  revalidateJournalPaths(journal?.slug);
  redirectToAdmin("?saved=deleted");
}

export async function createLibraryBookAction(formData: FormData) {
  await requireAdmin();

  const book = await createLibraryBook({
    title: getString(formData, "title"),
    author: getString(formData, "author"),
    category: getString(formData, "category"),
    publicationYear: getString(formData, "publicationYear"),
    description: getString(formData, "description"),
  });

  revalidateLibraryPaths(book?.slug);
  redirectToAdmin("?saved=library-created");
}

export async function updateLibraryBookAction(formData: FormData) {
  await requireAdmin();

  const slug = getString(formData, "slug");
  const book = await updateLibraryBook(slug, {
    title: getString(formData, "title"),
    author: getString(formData, "author"),
    category: getString(formData, "category"),
    publicationYear: getString(formData, "publicationYear"),
    description: getString(formData, "description"),
  });

  revalidateLibraryPaths(slug);
  revalidateLibraryPaths(book?.slug);
  redirectToAdmin("?saved=library-updated");
}

export async function deleteLibraryBookAction(formData: FormData) {
  await requireAdmin();

  const slug = getString(formData, "slug");
  const book = await deleteLibraryBook(slug);

  revalidateLibraryPaths(slug);
  revalidateLibraryPaths(book?.slug);
  redirectToAdmin("?saved=library-deleted");
}
