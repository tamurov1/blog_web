"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createLibraryComment } from "@/lib/commentStore";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function createLibraryCommentAction(formData: FormData) {
  const slug = getString(formData, "slug").trim();
  const username = getString(formData, "username");
  const body = getString(formData, "body");
  const website = getString(formData, "website");

  if (website) {
    redirect(`/library/${slug}`);
  }

  try {
    await createLibraryComment({
      librarySlug: slug,
      username,
      body,
    });
  } catch {
    redirect(`/library/${slug}?comment=invalid#comments`);
  }

  revalidatePath(`/library/${slug}`);
  redirect(`/library/${slug}?comment=added#comments`);
}
