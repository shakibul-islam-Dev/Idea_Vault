"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function IdeaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "All";
  const currentSearch = searchParams.get("search") || "";

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState(currentSearch);

  const categories = [
    "All",
    "Tech",
    "Health",
    "AI",
    "Education",
    "Finance",
    "Other",
  ];

  // Category change handler
  const handleCategoryChange = (categoryName) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categoryName === "All") {
      params.delete("category");
    } else {
      params.set("category", categoryName);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Search submit handler
  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (searchText.trim()) {
      params.set("search", searchText.trim());
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // API Call
  useEffect(() => {
    const fetchIdeas = async () => {
      setLoading(true);

      try {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";

        const params = new URLSearchParams();

        // Category Filter
        if (currentCategory !== "All") {
          params.set("category", currentCategory);
        }

        // Search by title
        if (currentSearch) {
          params.set("search", currentSearch);
        }

        const fetchUrl = `${serverUrl}/api/idea?${params.toString()}`;

        const res = await fetch(fetchUrl, {
          cache: "no-store",
        });

        if (res.ok) {
          const json = await res.json();
          setDatas(json);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [currentCategory, currentSearch]);

  return (
    <section className="container mx-auto min-h-screen bg-transparent text-slate-900 dark:text-slate-100 py-10">
      <div className="p-5 flex flex-col items-center justify-center w-full text-center gap-8">
        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-2xl flex items-center gap-3"
        >
          <input
            type="text"
            placeholder="Search by idea title..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 h-11 px-4 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 outline-none text-sm"
          />

          <button
            type="submit"
            className="h-11 px-5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        {/* Category Filter */}
        <div className="flex gap-2 items-center justify-center flex-wrap w-full max-w-2xl">
          {categories.map((value, index) => {
            const isSelected = currentCategory === value;

            return (
              <button
                key={index}
                onClick={() => handleCategoryChange(value)}
                className={`px-4 py-1.5 rounded-full cursor-pointer select-none text-xs font-medium transition-all duration-300 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20 dark:bg-blue-50 dark:text-slate-950"
                    : "bg-gray-100 dark:bg-slate-900 text-gray-600 dark:text-slate-400 border border-transparent hover:bg-gray-200 dark:hover:bg-slate-800"
                }`}
              >
                {value}
              </button>
            );
          })}
        </div>

        {/* Loading */}
        {loading && (
          <div className="my-16 text-sm font-medium text-gray-400 animate-pulse">
            Loading ideas...
          </div>
        )}

        {/* No Data */}
        {!loading && datas.length === 0 && (
          <div className="my-16 text-sm font-medium text-gray-400 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl p-10 w-full max-w-md">
            No ideas found.
          </div>
        )}

        {/* Cards */}
        {!loading && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-6 p-4">
            {datas.map((data) => (
              <div
                key={data._id}
                className="group flex flex-col justify-between w-full max-w-md p-5 border border-gray-200/60 dark:border-slate-800/60 rounded-2xl bg-white dark:bg-slate-950 shadow-sm"
              >
                <div className="flex flex-col">
                  <div className="mb-4 text-left">
                    <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 rounded-md">
                      {data.category}
                    </span>
                  </div>

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
                    Budget{" "}
                    <span className="block text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      ${data.estimatedBudget || 0}
                    </span>
                  </div>

                  <Link
                    href={`/ideadetails/${data._id}`}
                    className="inline-flex items-center justify-center h-9 px-4 text-xs font-medium text-white bg-slate-950 rounded-xl"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
