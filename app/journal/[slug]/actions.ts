"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createComment } from "@/lib/commentStore";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function createCommentAction(formData: FormData) {
  const slug = getString(formData, "slug").trim();
  const username = getString(formData, "username");
  const body = getString(formData, "body");
  const website = getString(formData, "website");

  if (website) {
    redirect(`/journal/${slug}`);
  }

  try {
    await createComment({
      journalSlug: slug,
      username,
      body,
    });
  } catch {
    redirect(`/journal/${slug}?comment=invalid#comments`);
  }

  revalidatePath(`/journal/${slug}`);
  redirect(`/journal/${slug}?comment=added#comments`);
}
