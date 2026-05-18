"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiFileText,
  FiGrid,
  FiTag,
  FiImage,
  FiDollarSign,
  FiUsers,
  FiAlertCircle,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";

export default function IdeaForm() {
  const [formData, setFormData] = useState({
    title: "",
    shortDesc: "",
    detailedDesc: "",
    category: "",
    imageUrl: "",
    budget: "",
    targetAudience: "",
    problemStatement: "",
    proposedSolution: "",
  });
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = ["Tech", "Health", "AI", "Education", "Finance", "Other"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && currentTag.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag("");
    }
  };

  return (
    // Tailwind v4 style: OKLCH color spaces support & new native glow treatments
    <div className="relative min-h-screen w-full bg-[#0a0c10] text-gray-200 flex items-center justify-center p-4 sm:p-8 font-sans antialiased">
      {/* Tailwind v4 CSS-only ambient lights using modern radial gradients without legacy plugin hacks */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl z-10"
      >
        <div className="mb-8 border-b border-white/5 pb-6">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Submit New Idea
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Tailwind v4 Optimized Input Blueprint Architecture.
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* Row 1: Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <FiFileText className="text-blue-400" /> Idea Title *
              </label>
              {/* Tailwind v4 focuses heavily on default ring resets and subtle transitions */}
              <input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Smart Traffic Management"
                className="w-full bg-white/3 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
              />
            </div>

            {/* Custom Dropdown using Tailwind v4 fluid utilities */}
            <div className="flex flex-col gap-2 relative">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <FiGrid className="text-purple-400" /> Category *
              </label>
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-white/3 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 flex justify-between items-center cursor-pointer hover:bg-white/[0.05] transition-all"
              >
                <span>{formData.category || "Select Category"}</span>
                <span
                  className={`transition-transform text-gray-500 ${isDropdownOpen ? "rotate-180" : ""}`}
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
                    className="absolute top-[76px] left-0 w-full bg-[#11141a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 max-h-48 overflow-y-auto"
                  >
                    {categories.map((cat) => (
                      <li
                        key={cat}
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, category: cat }));
                          setIsDropdownOpen(false);
                        }}
                        className="px-4 py-2.5 text-sm hover:bg-blue-600 hover:text-white cursor-pointer transition-colors"
                      >
                        {cat}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Row 2: Short Description */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <FiFileText className="text-cyan-400" /> Short Description *
            </label>
            <input
              required
              type="text"
              name="shortDesc"
              value={formData.shortDesc}
              onChange={handleInputChange}
              placeholder="A brief one-liner summary..."
              maxLength={150}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
            />
          </div>

          {/* Row 3: Problem & Solution (Using Tailwind v4 Logical Grid systems) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <FiAlertCircle className="text-amber-400" /> Problem Statement *
              </label>
              <textarea
                required
                rows={3}
                name="problemStatement"
                value={formData.problemStatement}
                onChange={handleInputChange}
                placeholder="What critical problem are you solving?"
                className="w-full bg-white/3 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <FiCheckCircle className="text-emerald-400" /> Proposed Solution
                *
              </label>
              <textarea
                required
                rows={3}
                name="proposedSolution"
                value={formData.proposedSolution}
                onChange={handleInputChange}
                placeholder="How does your idea solve this problem?"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all resize-none"
              />
            </div>
          </div>

          {/* Row 4: Tags & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <FiTag className="text-pink-400" /> Tags
              </label>
              <div className="w-full bg-white/3 border border-white/10 rounded-xl p-2 flex flex-wrap gap-2 items-center focus-within:border-blue-500/50 min-h-[46px]">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs px-2.5 py-1 rounded-md font-mono"
                  >
                    {tag}
                    <FiX
                      onClick={() => setTags(tags.filter((t) => t !== tag))}
                      className="cursor-pointer hover:text-red-400"
                    />
                  </span>
                ))}
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder={tags.length === 0 ? "Press Enter to add..." : ""}
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-600 min-w-[120px] p-1"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <FiDollarSign className="text-yellow-400" /> Estimated Budget
              </label>
              <div className="relative">
                <FiDollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
                {/* Tailwind v4 utilities cleanly clear native browser input increments */}
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="e.g., 5000"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium px-8 py-3.5 rounded-xl shadow-md transition-all duration-300 active:scale-[0.98]"
            >
              Save to Database
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
