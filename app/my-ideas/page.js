import { auth } from "@/lib/auth";
import MyIdeas from "@/Components/MyIdeas/MyIdeas";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MongoClient, ObjectId } from "mongodb";
import { headers } from "next/headers";

export const metadata = {
  title: "MY Ideas",
  description: "My Ideas.",
};

export default async function MyIdeasPage() {
  async function getIdeas() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return [];

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("IdeaVault");

    const userIdStr = session.user.id;

    // OR কুয়েরি ব্যবহার করছি যেন String বা ObjectId — যেভাবেই থাকুক না কেন ডাটা চলে আসে
    const query = {
      $or: [{ userId: userIdStr }, { userId: new ObjectId(userIdStr) }],
    };

    try {
      const ideas = await db.collection("IdeaVaults").find(query).toArray();

      await client.close(); // কানেকশন ক্লোজ করা ভালো প্র্যাকটিস
      return JSON.parse(JSON.stringify(ideas));
    } catch (error) {
      console.error("Database fetch error in parent:", error);
      await client.close();
      return [];
    }
  }
  const ideas = await getIdeas();
  console.log("Data passed to child:", ideas);

  return (
    <div className="min-h-screen flex flex-col items-center py-6 w-full">
      <ToastContainer theme="colored" position="top-right" autoClose={3000} />
      <MyIdeas initialIdeas={ideas} />
    </div>
  );
}
