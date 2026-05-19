import { Button } from "@heroui/react";
import IdeaDetails from "../IdeaDetails/IdeaDetails";
import Image from "next/image";

const IdeaPage = async () => {
  const res = await fetch("http://localhost:4000/api/idea", {
    cache: "no-store",
  });
  const datas = await res.json();

  const categories = ["Tech", "Health", "AI", "Education", "Finance", "Other"];

  return (
    <div className="p-5 flex flex-col items-center justify-center  w-full text-center gap-6">
      {/* Search Section - Centered */}
      <div className="flex gap-2 w-full max-w-md justify-center">
        <input
          type="text"
          name="Search"
          placeholder="Search Ideas"
          className="border p-2 rounded w-full max-w-xs focus:outline-none"
        />
        <Button className="cursor-pointer">Search</Button>
      </div>

      {/* Categories Map Section - Centered */}
      <div className="flex gap-2.5 items-center justify-center flex-wrap w-full">
        {categories.map((value, index) => (
          <div
            key={index}
            className="px-4 py-1.5 border border-gray-300 rounded-full cursor-pointer select-none text-sm bg-white text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 active:bg-blue-700 transition-all duration-200"
          >
            {value}
          </div>
        ))}
      </div>

      <h1 className="text-2xl font-bold mt-4">Hello World</h1>

      {/* Data Map Section - Centered */}
      <div className="w-full flex flex-col items-center gap-4 p-4">
        {datas.map((data) => (
          <div
            key={data._id}
            className="flex flex-col justify-between w-full max-w-md h-[520px] p-5 border border-gray-200 rounded-xl shadow-sm bg-white"
          >
            {/* Top and Body Content inside a flex wrapper */}
            <div className="flex flex-col flex-grow">
              {/* ক্যাটাগরি */}
              <div className="mb-3 text-left">
                <span className="px-2 py-1 text-xs font-bold text-blue-600 bg-blue-50 rounded">
                  {data.category}
                </span>
              </div>

              {/* টাইটেল */}
              <h3 className="text-lg font-bold text-gray-800 text-left mb-2">
                {data.ideaTitle}
              </h3>

              {/* ইমেজ কন্টেইনার (overflow-hidden ও rounded-xl অ্যাড করা হয়েছে) */}
              <div className="relative w-full h-36 mb-4 bg-gray-100 rounded-xl overflow-hidden">
                <Image
                  src={data.imageUrl}
                  alt={data.ideaTitle}
                  fill
                  className="object-cover"
                />
              </div>

              {/* বডিতে ডেসক্রিপশন এবং ট্যাগ */}
              <div></div>

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

            {/* নিচের অংশ: বাজেট এবং ভিউ ডিটেইলস বাটন */}
            <div className="pt-3 border-t border-gray-100">
              {data.estimatedBudget && (
                <div className="text-left text-sm font-semibold text-emerald-600 mb-2">
                  Budget: {data.estimatedBudget}
                </div>
              )}
              <button className="w-full py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer text-center">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdeaPage;
