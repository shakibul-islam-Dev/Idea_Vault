import Image from "next/image";
import { Card } from "@heroui/react";
import InteractionButton from "@/Components/InteractionButton/InteractionButton";

const IdeaDetails = ({ idea }) => {
  // Fallback সহ প্রপার্টি destructuring (পুরানো এবং নতুন উভয় ফরম্যাটের জন্য)
  const {
    _id,
    ideaTitle,
    title,
    detailedDescription,
    category,
    tags,
    imageUrl,
    estimatedBudget,
    audience = idea.targetAudience, // audience না থাকলে targetAudience নিবে
    problem = idea.problemStatement, // problem না থাকলে problemStatement নিবে
    solution = idea.proposedSolution, // solution না থাকলে proposedSolution নিবে
  } = idea;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-gray-50 dark:bg-slate-950 min-h-screen">
      <Card className="w-full p-8 flex flex-col gap-6 border border-default-200/60 dark:border-default-100/40 bg-gradient-to-br from-background via-background to-default-100/30 dark:to-default-50/10 shadow-xl rounded-3xl">
        {/* Image Section */}
        <div className="relative h-[280px] sm:h-[350px] w-full shrink-0 overflow-hidden rounded-2xl bg-gradient-to-tr from-default-100 to-default-200/50 flex items-center justify-center">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={ideaTitle || "Idea Preview"}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              fill
            />
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col justify-between gap-4">
          <div className="gap-3 flex flex-col items-start w-full">
            {category && (
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-50 dark:bg-primary-950/30 px-2.5 py-1 rounded-md">
                {category}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl font-black text-foreground">
              {ideaTitle}
            </h1>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <p className="text-base leading-relaxed text-default-600 font-medium whitespace-pre-line">
              {detailedDescription}
            </p>

            {/* Problem Section */}
            {problem && (
              <div className="text-sm p-4 rounded-xl bg-danger-50/40 dark:bg-danger-950/10 border border-danger-100/50 dark:border-danger-900/20 text-default-700">
                <strong className="block text-xs font-bold uppercase text-danger mb-1">
                  The Problem:
                </strong>
                <p className="leading-relaxed">{problem}</p>
              </div>
            )}

            {/* Solution Section */}
            {solution && (
              <div className="text-sm p-4 rounded-xl bg-success-50/40 dark:bg-success-950/10 border border-success-100/50 dark:border-success-900/20 text-default-700">
                <strong className="block text-xs font-bold uppercase text-success mb-1">
                  Proposed Solution:
                </strong>
                <p className="leading-relaxed">{solution}</p>
              </div>
            )}

            {/* Audience Section */}
            {audience && (
              <p className="text-xs font-medium text-default-400 mt-1">
                <span className="font-bold text-default-500">
                  Target Audience:{" "}
                </span>
                {audience}
              </p>
            )}
          </div>

          {/* Footer Section */}
          <div className="mt-auto flex w-full flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-default-200/40 gap-4">
            <div className="flex flex-col gap-2">
              {estimatedBudget && (
                <span className="text-xs font-bold text-success bg-success-50 dark:bg-success-950/30 px-2.5 py-1 rounded-md w-max">
                  Budget: {estimatedBudget}
                </span>
              )}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold text-default-600 bg-default-100 px-2 py-0.5 rounded-full"
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
    </div>
  );
};

export default IdeaDetails;
