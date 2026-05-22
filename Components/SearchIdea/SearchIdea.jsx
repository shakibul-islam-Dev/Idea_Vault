"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SearchIdea() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSearch = (e) => {
    const term = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-10 flex flex-col md:flex-row gap-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search ideas..."
        defaultValue={searchParams.get("q") || ""}
        onChange={handleSearch}
        className="w-full md:w-2/3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
      />

      {/* Category Select */}
      <select
        defaultValue={searchParams.get("category") || ""}
        onChange={handleCategoryChange}
        className="w-full md:w-1/3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
      >
        <option value="">All Categories</option>
        <option value="AI">AI</option>
        <option value="Technology">Technology</option>
        <option value="Education">Education</option>
        <option value="Health">Health</option>
        <option value="Business">Business</option>
      </select>
    </div>
  );
}
