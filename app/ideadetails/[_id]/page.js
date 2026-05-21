import Image from "next/image";
import { Button, Card } from "@heroui/react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import InteractionButton from "@/Components/InteractionButton/InteractionButton";
import CommentUI from "@/Components/Comments/CommentUI";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { CommentSystem } from "./CommentSystem";
export const metadata = {
  title: "Idea DetailsPage",
  description: "Idea DetailsPage.",
};

const IdeaDetailsPage = async ({ params }) => {
  const resolvedParams = await params;
  const id = resolvedParams?._id || resolvedParams?.id;

  if (!id) notFound();

  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  const loggedInUser = session?.user ? { name: session.user.name } : null;

  const { token } = await auth.api.getToken({
    headers: requestHeaders,
  });
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const res = await fetch(`${serverUrl}/api/idea/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  const {
    _id,
    ideaTitle,
    detailedDescription,
    category,
    tags,
    imageUrl,
    estimatedBudget,
    targetAudience,
    problemStatement,
    proposedSolution,
  } = data;

  const allComments = await CommentSystem();

  return (
    <section className="container mx-auto p-6 max-w-4xl space-y-6">
      <div>
        <Link href="/ideas" passHref>
          <Button className="font-medium bg-default-100 hover:bg-default-200 text-default-800 backdrop-blur-md transition-all rounded-xl border border-default-200/50 shadow-sm group">
            <FaArrowLeft className="text-xs transition-transform group-hover:-translate-x-1" />{" "}
            Back
          </Button>
        </Link>
      </div>

      <Card className="w-full p-8 flex flex-col gap-6 border border-default-200/60 dark:border-default-100/40 bg-gradient-to-br from-background via-background to-default-100/30 dark:to-default-50/10 shadow-xl hover:shadow-2xl hover:border-primary-300/40 transition-all duration-300 rounded-3xl">
        <div className="relative h-[280px] sm:h-[350px] w-full shrink-0 overflow-hidden rounded-2xl bg-gradient-to-tr from-default-100 to-default-200/50 shadow-inner flex items-center justify-center">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={ideaTitle || "Idea Preview"}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none transition-transform duration-500 hover:scale-105"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
            />
          )}
          <span className="absolute bottom-3 right-3 text-[10px] font-semibold tracking-wider text-white/80 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded uppercase">
            Preview
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-between gap-4">
          <div className="gap-3 p-0 flex flex-col items-start w-full">
            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex flex-wrap items-center gap-2">
                {category && (
                  <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-50 dark:bg-primary-950/30 px-2.5 py-1 rounded-md">
                    {category}
                  </span>
                )}
              </div>

              <h1 className="pr-8 text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-default-600/80">
                {ideaTitle}
              </h1>
            </div>
          </div>

          <div className="p-0 flex flex-col gap-4 overflow-visible w-full">
            <p className="text-base leading-relaxed text-default-600 font-medium w-full pt-1 whitespace-pre-line">
              {detailedDescription}
            </p>

            {problemStatement && (
              <div className="text-sm p-4 rounded-xl bg-danger-50/40 dark:bg-danger-950/10 border border-danger-100/50 dark:border-danger-900/20 text-default-700 w-full">
                <strong className="block text-xs font-bold uppercase tracking-wide text-danger mb-1">
                  The Problem:
                </strong>
                <p className="leading-relaxed">{problemStatement}</p>
              </div>
            )}

            {proposedSolution && (
              <div className="text-sm p-4 rounded-xl bg-success-50/40 dark:bg-success-950/10 border border-success-100/50 dark:border-success-900/20 text-default-700 w-full">
                <strong className="block text-xs font-bold uppercase tracking-wide text-success mb-1">
                  Proposed Solution:
                </strong>
                <p className="leading-relaxed">{proposedSolution}</p>
              </div>
            )}

            {targetAudience && (
              <p className="text-xs font-medium text-default-400 mt-1">
                <span className="font-bold text-default-500">
                  Target Audience:
                </span>{" "}
                {targetAudience}
              </p>
            )}
          </div>

          <div className="mt-auto flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between p-0 pt-4 border-t border-default-200/40 dark:border-default-100/20">
            <div className="flex flex-col gap-2">
              {estimatedBudget && (
                <div className="flex">
                  <span className="text-xs font-bold text-success bg-success-50 dark:bg-success-950/30 px-2.5 py-1 rounded-md">
                    Budget: {estimatedBudget}
                  </span>
                </div>
              )}

              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 my-1">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold text-default-600 bg-default-100/80 px-2 py-0.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <InteractionButton
              ideaData={{ _id, ideaTitle, category, tags, estimatedBudget }}
            />
          </div>
        </div>
      </Card>

      <CommentUI initialComments={allComments} currentUser={loggedInUser} />
    </section>
  );
};

export default IdeaDetailsPage;
