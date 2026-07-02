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
