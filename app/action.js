"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import clientPromise from "@/lib/mongodb";

import { ObjectId } from "mongodb";

import { MongoClient } from "mongodb";

async function getDb() {
  const client = await clientPromise;
  return { client, db: client.db("IdeaVault") };
}

export async function createPost(formData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");

  const { db } = await getDb();
  await db.collection("IdeaVaults").insertOne({
    title: formData.get("title"),
    content: formData.get("content"),
    userId: session.user.id,
    createdAt: new Date(),
  });

  revalidatePath("/my-ideas");
}

export async function logUserAction(userId, action, details) {
  try {
    const client = await clientPromise;
    const db = client.db("IdeaVault");
    await db.collection("activities").insertOne({
      userId: userId || "unknown",
      action: action || "unknown",
      details: details || {},
      timestamp: new Date(),
    });
    console.log("Database Insert");
  } catch (err) {
    console.error("Database Error", err);
  }
}
async function getIdeas(query = "") {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return [];

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db("IdeaVault");

  const filter = { userId: session.user.id };
  if (query) {
    filter.title = { $regex: query, $options: "i" };
  }

  const ideas = await db.collection("IdeaVaults").find(filter).toArray();
  return JSON.parse(JSON.stringify(ideas));
}

export async function getIdeasAction(query = "", category = "") {
  try {
    const client = await clientPromise;
    const db = client.db("IdeaVault");

    // ১. ব্যাকএন্ডে ডেটা ঠিকমতো আসছে কি না তা চেক করার জন্য:
    console.log("---- Debug Info ----");
    console.log("Search Query:", query);
    console.log("Selected Category:", category);

    let filter = {};
    let conditions = [];

    if (query) {
      conditions.push({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { ideaTitle: { $regex: query, $options: "i" } },
          { content: { $regex: query, $options: "i" } },
          { shortDescription: { $regex: query, $options: "i" } },
        ],
      });
    }

    if (category) {
      conditions.push({
        category: { $regex: category, $options: "i" },
      });
    }

    if (conditions.length > 0) {
      filter = { $and: conditions };
    }

    // ২. ফিল্টারটি দেখতে কেমন হয়েছে তা চেক করার জন্য:
    console.log("MongoDB Filter:", JSON.stringify(filter, null, 2));

    const ideas = await db.collection("IdeaVaults").find(filter).toArray();

    // ৩. কয়টি ডেটা পেলো তা দেখার জন্য:
    console.log("Found Items:", ideas.length);

    return JSON.parse(JSON.stringify(ideas));
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function deleteActivityAction(formData) {
  try {
    const activityId = formData.get("id");
    if (!activityId) return;

    const client = await clientPromise;
    const db = client.db("IdeaVault");

    await db
      .collection("activities")
      .deleteOne({ _id: new ObjectId(activityId) });

    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Error deleting activity:", error);
  }
}
