"use server";
import { revalidatePath } from "next/cache";

const BACKEND_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function CommentSection(ideaId) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/comments?ideaId=${ideaId}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function addComment(formData) {
  const ideaId = formData.get("ideaId");
  const author = formData.get("author");
  const text = formData.get("comment");

  try {
    const res = await fetch(`${BACKEND_URL}/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ideaId,
        author,
        text,
        time: new Date().toLocaleString(),
      }),
    });
    if (res.ok) revalidatePath(`/ideadetails/${ideaId}`);
  } catch (error) {
    console.error(error);
  }
}

export async function updateComment(id, text, ideaId) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        time: new Date().toLocaleString() + " (Edited)",
      }),
    });
    if (res.ok) revalidatePath(`/ideadetails/${ideaId}`);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteComment(id, ideaId) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/comments/${id}`, {
      method: "DELETE",
    });
    if (res.ok) revalidatePath(`/ideadetails/${ideaId}`);
  } catch (error) {
    console.error(error);
  }
}
