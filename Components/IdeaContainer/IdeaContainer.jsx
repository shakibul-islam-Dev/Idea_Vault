"use client"; // এটি এখন ক্লায়েন্ট কম্পোনেন্ট হবে

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export default function IdeaContainer({ query, category }) {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // এক্সপ্রেস ব্যাকএন্ডে রিকোয়েস্ট পাঠানো
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/api/idea?search=${query}&category=${category}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setIdeas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching ideas:", err);
        setLoading(false);
      });
  }, [query, category]);

  if (loading) {
    return <div className="text-center py-20">Loading ideas...</div>;
  }

  if (ideas.length === 0) {
    return (
      <div className="text-center text-slate-500 dark:text-slate-400 py-20">
        No ideas found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ideas.map((idea) => (
        <div
          key={idea._id}
          className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          {/* Image Section */}
          <div className="relative w-full h-48 bg-slate-100 dark:bg-slate-950 overflow-hidden">
            {idea.imageUrl ? (
              <Image
                src={idea.imageUrl}
                alt={idea.ideaTitle || "Idea Image"}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600">
                No Image
              </div>
            )}
            <span className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md text-white text-[11px] uppercase font-bold px-3 py-1 rounded-full">
              {idea.category || "Uncategorized"}
            </span>
          </div>

          {/* Content Section */}
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 line-clamp-1 mb-2">
              {idea.ideaTitle}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 flex-grow">
              {idea.shortDescription}
            </p>
            {/* Action Button */}
            <Link href={`/ideadetails/${idea._id}`} className="w-full mt-auto">
              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 rounded-xl transition-all">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
