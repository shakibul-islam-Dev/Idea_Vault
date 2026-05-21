import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const IdeaPage = async ({ searchParams }) => {
  // ১. বানানের ভুল ফিক্স করা হয়েছে: searchParam থেকে searchParams করা হয়েছে
  const resolvedParams = await searchParams;
  const currentSearch = resolvedParams?.search || "";
  const currentCategory = resolvedParams?.category || "";
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  // ব্যাকএন্ড API-তে কোয়েরি প্যারামিটার পাস করা
  const fetchUrl = `${serverUrl}/api/idea?search=${encodeURIComponent(currentSearch)}&category=${encodeURIComponent(currentCategory)}`;

  let datas = [];
  try {
    const res = await fetch(fetchUrl, { cache: "no-store" });
    if (res.ok) {
      datas = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch ideas:", error);
  }

  const categories = [
    "All",
    "Tech",
    "Health",
    "AI",
    "Education",
    "Finance",
    "Other",
  ];

  return (
    <section className="container mx-auto">
      <div className="p-5 flex flex-col items-center justify-center w-full text-center gap-6">
        {/* সার্চ ফর্ম */}
        <form
          action=""
          method="GET"
          className="flex gap-2 w-full max-w-md justify-center"
        >
          {currentCategory && (
            <input type="hidden" name="category" value={currentCategory} />
          )}

          <input
            type="text"
            name="search"
            defaultValue={currentSearch}
            placeholder="Search Ideas..."
            className="border p-2 px-4 rounded-xl w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
          />
          <Button
            type="submit"
            className="cursor-pointer bg-blue-600 text-white rounded-xl"
          >
            Search
          </Button>
        </form>

        {/* ক্যাটাগরি ফিল্টার */}
        <div className="flex gap-2.5 items-center justify-center flex-wrap w-full">
          {categories.map((value, index) => {
            const isSelected =
              value === "All" ? !currentCategory : currentCategory === value;

            const searchPart = currentSearch
              ? `search=${encodeURIComponent(currentSearch)}`
              : "";
            const catPart =
              value !== "All" ? `category=${encodeURIComponent(value)}` : "";
            const queryString = [searchPart, catPart].filter(Boolean).join("&");
            const href = queryString ? `?${queryString}` : "/ideas";

            return (
              <Link
                key={index}
                href={href}
                className={`px-4 py-1.5 border rounded-full cursor-pointer select-none text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {value}
              </Link>
            );
          })}
        </div>

        {/* নো ডেটা অ্যালার্ট */}
        {datas.length === 0 && (
          <div className="my-10 text-xl text-gray-500">
            No ideas found matching your criteria.
          </div>
        )}

        {/* আইডিয়া গ্রিড */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-6 p-4">
          {datas.map((data) => (
            <div
              key={data._id}
              className="flex flex-col justify-between w-full max-w-md p-5 border border-gray-200 rounded-2xl shadow-sm bg-white hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col">
                <div className="mb-3 text-left">
                  <span className="px-2 py-1 text-xs font-bold text-blue-600 bg-blue-50 rounded">
                    {data.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 text-left mb-2 line-clamp-2">
                  {data.ideaTitle}
                </h3>

                <div className="relative w-full h-36 mb-4 bg-gray-100 rounded-xl overflow-hidden">
                  <Image
                    src={
                      data.imageUrl ||
                      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173"
                    }
                    alt={data.ideaTitle || "Idea Thumbnail"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 justify-start mb-4">
                  {data.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 mt-auto border-t border-gray-100">
                {data.estimatedBudget && (
                  <div className="text-left text-sm font-semibold text-emerald-600 mb-2">
                    Budget: ${data.estimatedBudget}
                  </div>
                )}
                <Link
                  href={`/ideadetails/${data._id}`}
                  className="block w-full py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl text-center transition-colors duration-200"
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

export default IdeaPage;
