"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function Dashboard() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // অ্যাক্টিভিটি ফেচ করার ফাংশন
  const fetchActivities = async () => {
    try {
      setLoading(true);
      const session = await authClient.getSession();

      // ফিক্সড: Better Auth এর সঠিক টোকেন পাথ চেক
      const token =
        session?.data?.session?.token || session?.data?.token || session?.token;
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

      const res = await fetch(`${serverUrl}/api/activity`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include", // ফিক্সড: কুকি সেশন পাস করার জন্য
      });

      if (!res.ok) throw new Error("Failed to fetch activities");

      const data = await res.json();
      setActivities(data);
    } catch (err) {
      console.error("Detailed Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // প্রথমবার পেজ লোড হলে ডাটা আসবে
  useEffect(() => {
    fetchActivities();
  }, []);

  // অ্যাক্টিভিটি ডিলিট করার ফাংশন
  const handleDelete = async (id) => {
    try {
      const session = await authClient.getSession();
      const token =
        session?.data?.session?.token || session?.data?.token || session?.token;
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

      const res = await fetch(`${serverUrl}/api/activity/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include", // ফিক্সড: কুকি সেশন পাস করার জন্য
      });

      if (res.ok) {
        setActivities((prev) => prev.filter((a) => a._id !== id));
      } else {
        alert("Delete failed: Unauthorized or Bad Request");
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-8 text-slate-800 dark:text-slate-100 border-b pb-4">
        Recent Activities
      </h2>

      {loading ? (
        <p className="text-slate-500 text-center py-10">
          Loading activities...
        </p>
      ) : activities.length === 0 ? (
        <p className="text-slate-500 text-center py-10">No activities found.</p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => {
            return (
              <div
                key={activity._id}
                className="flex items-start gap-4 p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm relative"
              >
                <div className="mt-1 h-10 w-10 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-bold text-lg">
                  📝
                </div>
                <div className="flex-grow pr-10">
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                    {activity.action}
                  </h3>
                  {activity.details?.text && (
                    <p className="text-sm text-slate-500 mt-1 italic">
                      {activity.details.text}&ldquo;
                    </p>
                  )}
                  {activity.timestamp && (
                    <span className="text-xs text-gray-400 block mt-2">
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                  )}
                </div>

                <Button
                  onPress={() => handleDelete(activity._id)} // ফিক্সড: onClick কে HeroUI অনুযায়ী onPress করা হলো
                  className="absolute top-5 right-5 p-2 min-w-0 bg-transparent text-slate-400 hover:text-red-500 rounded-full"
                  title="Delete this log"
                >
                  🗑️
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
