import Image from "next/image";
import Link from "next/link";
import React from "react";

const TrendingIdea = async () => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  // API থেকে ডাটা ফেচ করা
  const res = await fetch(`${serverUrl}/api/idea`, {
    cache: "no-store",
  });
  const datas = await res.json();

  return (
    <section className="container mx-auto min-h-screen bg-transparent text-slate-900 dark:text-slate-100 py-10">
      <div className="p-5 flex flex-col items-center justify-center w-full text-center gap-8">
        <h2 className="text-3xl font-extrabold">Trending Ideas</h2>

        {/* Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-6 p-4">
          {/* .slice(0, 6) নিশ্চিত করবে যে শুধুমাত্র ৬টি কার্ড দেখা যাবে */}
          {datas.slice(0, 6).map((data) => (
            <div
              key={data._id}
              className="group flex flex-col justify-between w-full max-w-md p-5 border border-gray-200/60 dark:border-slate-800/60 rounded-2xl bg-white dark:bg-slate-950 shadow-sm transition-transform hover:shadow-lg"
            >
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  {/* তথ্য ১: Category */}
                  <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 rounded-md">
                    {data.category || "General"}
                  </span>
                  {/* তথ্য ২: Difficulty (অতিরিক্ত তথ্য) */}
                  <span className="text-[10px] font-medium text-slate-500">
                    {data.difficulty || "Beginner"}
                  </span>
                </div>

                {/* তথ্য ৩: Title */}
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 text-left mb-3 line-clamp-2">
                  {data.ideaTitle}
                </h3>

                <div className="relative w-full h-40 mb-4 bg-gray-50 dark:bg-slate-900 rounded-xl overflow-hidden">
                  <Image
                    src={
                      data.imageUrl ||
                      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173"
                    }
                    alt={data.ideaTitle || "Idea Thumbnail"}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="pt-4 mt-auto border-t border-gray-100 dark:border-slate-900 flex items-center justify-between gap-4">
                <div className="text-left text-xs text-gray-400">
                  Budget
                  <span className="block text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    ${data.estimatedBudget || 0}
                  </span>
                </div>

                <Link
                  href={`/ideadetails/${data._id}`}
                  className="inline-flex items-center justify-center h-9 px-4 text-xs font-medium text-white bg-slate-950 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingIdea;
