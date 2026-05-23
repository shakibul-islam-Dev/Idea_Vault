"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function Dashboard() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = async () => {
    try {
      const session = await authClient.getSession();
      const token = session?.data?.token;

      const res = await fetch("http://localhost:5000/api/activity", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setActivities(data);
    } catch (err) {
      console.error("Detailed Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchActivities();
  }, []);

  const handleDelete = async (id) => {
    try {
      const session = await authClient.getSession();
      const token = session?.data?.token;

      const res = await fetch(`http://localhost:5000/api/activity/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // এখানেও টোকেন জরুরি
        },
      });

      if (res.ok) {
        setActivities(activities.filter((a) => a._id !== id));
      } else {
        alert("Delete failed: Unauthorized");
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

      {activities.length === 0 ? (
        <p className="text-slate-500 text-center py-10">No activities found.</p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => {
            const dateObj = new Date(activity.timestamp);
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
                      "{activity.details.text}"
                    </p>
                  )}
                </div>

                <Button
                  onClick={() => handleDelete(activity._id)}
                  className="absolute top-5 right-5 p-2 text-slate-400 hover:text-red-500 rounded-full"
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
