"use client";
import React, { useState } from "react";
// 1. ToastContainer add kora hoyeche
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // CSS import kora must!
import { motion, AnimatePresence } from "framer-motion";
import {
  FiFileText,
  FiGrid,
  FiTag,
  FiDollarSign,
  FiAlertCircle,
  FiCheckCircle,
  FiX,
  FiImage,
  FiUsers,
  FiAlignLeft,
} from "react-icons/fi";

export default function IdeaForm() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");

  const categories = ["Tech", "Health", "AI", "Education", "Finance", "Other"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCategory) {
      return toast.warn("Please select a category!");
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const newIdea = Object.fromEntries(formData.entries());

    newIdea.category = selectedCategory;
    newIdea.tags = tags;

    try {
      const res = await fetch("http://localhost:4000/api/idea", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newIdea),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Idea saved successfully! 🚀");
        form.reset();
        setTags([]);
        setSelectedCategory("");
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Server connection failed!");
    }
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && currentTag.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
        toast.info(`Tag added: ${currentTag}`, { autoClose: 1000 });
      }
      setCurrentTag("");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-50 dark:bg-[#0a0c10] text-slate-900 dark:text-gray-200 flex items-center justify-center p-4 sm:p-8 font-sans antialiased transition-colors duration-300">
      {/* 2. ToastContainer ekhane thakte hobe */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Glow Effects */}
      <div className="hidden dark:block absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="hidden dark:block absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl dark:shadow-2xl backdrop-blur-xl z-10"
      >
        <div className="mb-8 border-b border-slate-100 dark:border-white/5 pb-6">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Submit New Idea
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-500 mt-1 font-medium">
            Generation Next Idea Blueprint
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Title & Image URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-gray-400 flex items-center gap-2">
                <FiFileText className="text-blue-500" /> Idea Title *
              </label>
              <input
                required
                type="text"
                name="title"
                placeholder="Project Name"
                className="w-full bg-slate-100 dark:bg-white/3 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-gray-400 flex items-center gap-2">
                <FiImage className="text-orange-500" /> Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                placeholder="https://image.com/link"
                className="w-full bg-slate-100 dark:bg-white/3 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Row 2: Short & Audience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-gray-400 flex items-center gap-2">
                <FiAlignLeft className="text-cyan-500" /> Short Description *
              </label>
              <input
                required
                type="text"
                name="shortDesc"
                placeholder="One liner..."
                className="w-full bg-slate-100 dark:bg-white/3 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-gray-400 flex items-center gap-2">
                <FiUsers className="text-indigo-500" /> Target Audience *
              </label>
              <input
                required
                type="text"
                name="targetAudience"
                placeholder="Who is this for?"
                className="w-full bg-slate-100 dark:bg-white/3 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Row 3: Category & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 relative">
              <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-gray-400 flex items-center gap-2">
                <FiGrid className="text-purple-500" /> Category *
              </label>
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-slate-100 dark:bg-white/3 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-700 dark:text-gray-300 flex justify-between items-center cursor-pointer hover:bg-slate-200 dark:hover:bg-white/[0.05] transition-all"
              >
                <span>{selectedCategory || "Select Category"}</span>
                <span
                  className={`text-slate-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </div>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute top-[76px] left-0 w-full bg-white dark:bg-[#11141a] border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                  >
                    {categories.map((cat) => (
                      <li
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsDropdownOpen(false);
                        }}
                        className="px-4 py-2.5 text-sm text-slate-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
                      >
                        {cat}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-gray-400 flex items-center gap-2">
                <FiDollarSign className="text-yellow-600 dark:text-yellow-400" />{" "}
                Estimated Budget
              </label>
              <input
                type="number"
                name="budget"
                placeholder="Budget in $"
                className="w-full bg-slate-100 dark:bg-white/3 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Detailed Description */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-gray-400 flex items-center gap-2">
              <FiAlignLeft className="text-slate-400" /> Detailed Description *
            </label>
            <textarea
              required
              rows={3}
              name="detailedDesc"
              placeholder="Explain everything..."
              className="w-full bg-slate-100 dark:bg-white/3 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-gray-400 flex items-center gap-2">
                <FiAlertCircle className="text-red-500" /> Problem Statement *
              </label>
              <textarea
                required
                rows={3}
                name="problemStatement"
                placeholder="What is the problem?"
                className="w-full bg-slate-100 dark:bg-white/3 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-gray-400 flex items-center gap-2">
                <FiCheckCircle className="text-green-600 dark:text-green-400" />{" "}
                Proposed Solution *
              </label>
              <textarea
                required
                rows={3}
                name="proposedSolution"
                placeholder="How do you solve it?"
                className="w-full bg-slate-100 dark:bg-white/3 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-gray-400 flex items-center gap-2">
              <FiTag className="text-pink-500" /> Tags
            </label>
            <div className="w-full bg-slate-100 dark:bg-white/3 border border-slate-200 dark:border-white/10 rounded-xl p-2 flex flex-wrap gap-2 items-center focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 min-h-[46px]">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-300 text-xs px-2.5 py-1 rounded-md font-mono"
                >
                  {tag}{" "}
                  <FiX
                    onClick={() => setTags(tags.filter((t) => t !== tag))}
                    className="cursor-pointer hover:text-red-500"
                  />
                </span>
              ))}
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Add tag & press Enter"
                className="flex-1 bg-transparent outline-none text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 min-w-[120px] p-1"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all active:scale-[0.98]"
            >
              Save to Database
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
