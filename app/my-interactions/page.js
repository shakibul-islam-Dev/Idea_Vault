import clientPromise from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { deleteActivityAction } from "@/app/action";
import { Button } from "@heroui/react";

export default async function Dashboard() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return (
      <div className="text-center py-20">
        Please log in to view your dashboard.
      </div>
    );
  }

  const client = await clientPromise;
  const db = client.db("IdeaVault");

  const activities = await db
    .collection("activities")
    .find({ userId: session.user.id })
    .sort({ timestamp: -1 })
    .limit(10)
    .toArray();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-8 text-slate-800 dark:text-slate-100 border-b pb-4">
        {session.user.name || session.user.email || "User"}'s Recent Activities
      </h2>

      {activities.length === 0 ? (
        <p className="text-slate-500 text-center py-10">
          No activities found yet.
        </p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => {
            const dateObj = new Date(activity.timestamp);
            const formattedDate = dateObj.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            const formattedTime = dateObj.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            return (
              <div
                key={activity._id.toString()}
                className="flex items-start gap-4 p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative"
              >
                <div className="mt-1 h-10 w-10 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                  📝
                </div>

                <div className="flex-grow pr-10">
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                    {activity.action}
                  </h3>

                  {activity.details?.text && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 italic">
                      "{activity.details.text}"
                    </p>
                  )}

                  <div className="flex items-center gap-2 mt-3 text-xs font-medium text-slate-400">
                    <span className="bg-slate-100 dark:bg-slate-700/50 px-2.5 py-1 rounded-md">
                      📅 {formattedDate}
                    </span>
                    <span className="bg-slate-100 dark:bg-slate-700/50 px-2.5 py-1 rounded-md">
                      ⏰ {formattedTime}
                    </span>
                  </div>
                </div>

                <form
                  action={deleteActivityAction}
                  className="absolute top-5 right-5"
                >
                  <input
                    type="hidden"
                    name="id"
                    value={activity._id.toString()}
                  />
                  <Button
                    type="submit"
                    className="p-2 cursor-pointer text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full transition-colors"
                    title="Delete this log"
                  >
                    🗑️
                  </Button>
                </form>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
