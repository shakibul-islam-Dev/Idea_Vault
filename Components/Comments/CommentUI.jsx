// app/blog/CommentUI.js
export default function CommentUI() {
  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-100 font-sans">
      <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-3 mb-6">
        কমেন্ট সেকশন (২)
      </h3>

      {/* কমেন্ট করার ফর্ম UI */}
      <form className="flex flex-col gap-4 mb-8">
        <input
          type="text"
          placeholder="আপনার নাম"
          required
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
        />
        <textarea
          placeholder="কমেন্ট লিখুন..."
          required
          className="w-full px-4 py-2.5 min-h-[90px] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white resize-y"
        />
        <button
          type="button"
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-colors duration-200 shadow-sm"
        >
          কমেন্ট করুন
        </button>
      </form>

      {/* কমেন্ট লিস্ট UI */}
      <div className="flex flex-col gap-4">
        {/* ১ নম্বর কমেন্ট (সাধারণ ভিউ) */}
        <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm transition-all hover:border-gray-300">
          <div className="flex justify-between items-center mb-2.5">
            <span className="font-bold text-gray-800 text-sm">রহিম</span>
            <span className="text-xs text-gray-400">21 May 2026, 6:14 AM</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            দারুণ একটি ব্লগ পোস্ট! অনেক কিছু জানতে পারলাম।
          </p>
          <div className="flex gap-4 text-xs font-semibold">
            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Edit
            </button>
            <button
              type="button"
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>

        {/* ২ নম্বর কমেন্ট (এডিট মোড দেখতে কেমন হবে তার UI) */}
        <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-gray-800 text-sm">করিম</span>
            <span className="text-xs text-gray-400">21 May 2026, 6:15 AM</span>
          </div>

          {/* এডিট বক্স UI */}
          <div className="flex flex-col gap-3">
            <textarea
              defaultValue="নেক্সট জেএস দিয়ে কমেন্ট সিস্টেম বানানো এখন অনেক সহজ।"
              className="w-full p-3 text-sm rounded-lg border border-blue-500 focus:outline-none ring-2 ring-blue-100 bg-white resize-y"
            />
            <div className="flex gap-2">
              <button
                type="button"
                className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                className="px-4 py-1.5 bg-gray-500 hover:bg-gray-600 text-white text-xs font-semibold rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
