import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import CommentUI from "@/Components/Comments/CommentUI";

async function getMyComments(email) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/my-comments/${email}`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

export const metadata = {
  title: "My Interactions",
  description: "View all your comments and activities on ideas",
};

export default async function MyInteractions() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userEmail = session?.user?.email;

  if (!userEmail) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Please login to view your interactions.
        </h2>
      </div>
    );
  }

  const comments = await getMyComments(userEmail);

  return (
    <div className="container mx-auto py-10 px-6 max-w-4xl">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">
        My Interactions
      </h1>

      {comments.length === 0 ? (
        <div className="p-10 border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-2xl text-center text-gray-500">
          You haven&apos;t commented on any ideas yet.
        </div>
      ) : (
        <CommentUI
          initialComments={comments}
          currentUser={{
            name: session.user.name,
            email: session.user.email,
          }}
        />
      )}
    </div>
  );
}
