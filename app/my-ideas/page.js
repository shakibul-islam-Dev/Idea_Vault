import { auth } from "@/lib/auth"; // আপনার পাথ ঠিক থাকলে এটি রাখুন
import MyIdeas from "@/Components/MyIdeas/MyIdeas";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MongoClient } from "mongodb";
import { headers } from "next/headers"; // এটি ইমপোর্ট করুন

export const metadata = {
  title: "MY Ideas",
  description: "My Ideas.",
};

async function getIdeas() {
  // Better Auth এর ক্ষেত্রে সেশন পাওয়ার সঠিক নিয়ম:
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return [];

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db("IdeaVault");

  const ideas = await db
    .collection("IdeaVaults")
    .find({ userId: session.user.id })
    .toArray();

  return JSON.parse(JSON.stringify(ideas));
}

export default async function MyIdeasPage() {
  const ideas = await getIdeas();

  return (
    <div className="min-h-screen flex flex-col items-center py-6 w-full">
      <ToastContainer theme="colored" position="top-right" autoClose={3000} />
      <MyIdeas initialIdeas={ideas} />
    </div>
  );
}
