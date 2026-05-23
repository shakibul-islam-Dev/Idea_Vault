import { auth } from "@/lib/auth";
import MyIdeas from "@/Components/MyIdeas/MyIdeas";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";

export const metadata = {
  title: "MY Ideas",
  description: "My Ideas.",
};

// MyIdeasPage.js
async function getIdeas() {
  const session = await auth.api.getSession({ headers: await headers() });
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
  console.log("Data passed to child:", ideas);

  return (
    <div className="min-h-screen flex flex-col items-center py-6 w-full">
      <ToastContainer theme="colored" position="top-right" autoClose={3000} />
      <MyIdeas initialIdeas={ideas} />
    </div>
  );
}
