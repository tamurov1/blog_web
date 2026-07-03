"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createLibraryComment } from "@/lib/commentStore";
import { getClientIp } from "@/lib/requestInfo";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function createLibraryCommentAction(formData: FormData) {
  const slug = getString(formData, "slug").trim();
  const username = getString(formData, "username");
  const body = getString(formData, "body");
  const website = getString(formData, "website");
  const requestHeaders = await headers();

  if (website) {
    redirect(`/library/${slug}`);
  }

  try {
    await createLibraryComment({
      librarySlug: slug,
      username,
      body,
      ipAddress: getClientIp(requestHeaders),
    });
  } catch {
    redirect(`/library/${slug}?comment=invalid#comments`);
  }

  revalidatePath(`/library/${slug}`);
  redirect(`/library/${slug}?comment=added#comments`);
}
