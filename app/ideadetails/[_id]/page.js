import { Button } from "@heroui/react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

import IdeaDetails from "@/Components/IdeaDetails/IdeaDetails";
import CommentUI from "@/Components/Comments/CommentUI";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { CommentSection } from "./CommentSection";
export const metadata = {
  title: "Idea DetailsPage",
  description: "Idea DetailsPage.",
};

const IdeaDetailsPage = async ({ params }) => {
  const resolvedParams = await params;
  const id = resolvedParams?._id || resolvedParams?.id;

  if (!id) notFound();

  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });
  const loggedInUser = session?.user ? { name: session.user.name } : null;

  const { token } = await auth.api.getToken({ headers: requestHeaders });
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const res = await fetch(`${serverUrl}/api/idea/${id}`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) notFound();

  const data = await res.json();
  const allComments = await CommentSection();

  return (
    <section className="container mx-auto p-6 max-w-4xl space-y-6">
      <div>
        <Link href="/ideas" passHref>
          <Button className="font-medium bg-default-100 hover:bg-default-200 text-default-800 backdrop-blur-md transition-all rounded-xl border border-default-200/50 shadow-sm group">
            <FaArrowLeft className="text-xs transition-transform group-hover:-translate-x-1" />
            Back
          </Button>
        </Link>
      </div>

      <IdeaDetails idea={data} />

      <CommentUI
        initialComments={allComments}
        currentUser={loggedInUser}
        ideaId={id}
      />
    </section>
  );
};

export default IdeaDetailsPage;
