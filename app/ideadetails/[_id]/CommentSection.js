"use server";

import { revalidatePath } from "next/cache";

import { logUserAction } from "@/app/action";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export async function CommentSystem() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/comments`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch comments");
    return await res.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

export async function addComment(formData) {
  const author = formData.get("author");
  const text = formData.get("comment");

  if (!author || !text) return;

  const newComment = {
    author: author,
    text: text,
    time: new Date().toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  };

  try {
    const res = await fetch(`${BACKEND_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });

    if (res.ok) {
      const session = await auth.api.getSession({ headers: await headers() });

      if (session?.user) {
        await logUserAction(session.user.id, "Posted a Comment", {
          text: text.length > 50 ? text.substring(0, 50) + "..." : text,
        });
      }

      revalidatePath("/blog");
    }
  } catch (error) {
    console.error("Error adding comment:", error);
  }
}

export async function updateComment(id, newText) {
  if (!newText) return;

  const updatedFields = {
    text: newText,
    time:
      new Date().toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }) + " (Edited)",
  };

  try {
    const res = await fetch(`${BACKEND_URL}/api/comments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });

    if (res.ok) {
      revalidatePath("/blog");
    }
  } catch (error) {
    console.error("Error updating comment:", error);
  }
}

export async function deleteComment(id) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/comments/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      revalidatePath("/blog");
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
}
