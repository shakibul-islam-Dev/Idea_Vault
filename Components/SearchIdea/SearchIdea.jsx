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
      <input
        type="text"
        placeholder="Search..."
        defaultValue={searchParams.get("q") || ""}
        onChange={handleSearch}
        className="w-full md:w-2/3 p-4 border rounded-xl focus:outline-none focus:border-slate-900"
      />

      <select
        defaultValue={searchParams.get("category") || ""}
        onChange={handleCategoryChange}
        className="w-full md:w-1/3 p-4 border rounded-xl focus:outline-none focus:border-slate-900 bg-white"
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
