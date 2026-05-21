// app/comment.js
"use server";

import { revalidatePath } from "next/cache";

// মক ডেটাবেস (বাস্তবে এখানে MongoDB, Prisma বা Postgres-এর লজিক হবে)
export let comments = [
  {
    id: 1,
    author: "রহিম",
    text: "দারুণ একটি ব্লগ পোস্ট! অনেক কিছু জানতে পারলাম।",
    time: "21 May 2026, 6:14 AM",
  },
];

// ১. কমেন্ট যোগ করার ফাংশন (Add Comment)
export async function addComment(formData) {
  const author = formData.get("author");
  const text = formData.get("comment");

  if (!author || !text) return;

  const newComment = {
    id: Date.now(),
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

  comments.unshift(newComment); // নতুন কমেন্ট সবার উপরে যোগ হবে
  revalidatePath("/blog"); // পেজের ক্যাশ ক্লিয়ার করে নতুন ডেটা দেখাবে
}

// ২. কমেন্ট এডিট/আপডেট করার ফাংশন (Edit Comment)
export async function updateComment(id, newText) {
  if (!newText) return;

  comments = comments.map((comment) =>
    comment.id === id
      ? { ...comment, text: newText, time: comment.time + " (Edited)" }
      : comment,
  );

  revalidatePath("/blog");
}

// ৩. কমেন্ট ডিলিট করার ফাংশন (Delete Comment)
export async function deleteComment(id) {
  comments = comments.filter((comment) => comment.id !== id);

  revalidatePath("/blog");
}
