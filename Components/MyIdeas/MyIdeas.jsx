"use client";
import React, { useEffect, useState } from "react";
import { FiLayers, FiTag, FiEdit3, FiTrash2, FiX } from "react-icons/fi";

export default function MyIdeas({ refreshTrigger }) {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editShortDesc, setEditShortDesc] = useState("");

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const fetchIdeas = async () => {
    try {
      const res = await fetch(`${serverUrl}/api/idea`);
      if (res.ok) {
        const data = await res.json();
        const allIdeas = Array.isArray(data) ? data : data.ideas || [];
        const myToken = localStorage.getItem("my_ideas_token");

        const filteredIdeas = allIdeas.filter(
          (idea) => idea.clientToken === myToken,
        );
        setIdeas(filteredIdeas);
      }
    } catch (error) {
      console.error("Failed to load ideas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, [refreshTrigger]);

  const openEditModal = (idea) => {
    setSelectedIdea(idea);
    setEditTitle(idea.title);
    setEditCategory(idea.category || "");
    setEditShortDesc(idea.shortDesc || "");
    setIsEditOpen(true);
  };

  const openDeleteModal = (idea) => {
    setSelectedIdea(idea);
    setIsDeleteOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const ideaId = selectedIdea._id || selectedIdea.id;

    const updatedIdeas = ideas.map((idea) => {
      if ((idea._id || idea.id) === ideaId) {
        return {
          ...idea,
          title: editTitle,
          category: editCategory,
          shortDesc: editShortDesc,
        };
      }
      return idea;
    });

    setIdeas(updatedIdeas);
    setIsEditOpen(false);
    showToast("Idea updated successfully!", "success");
  };

  const handleDelete = () => {
    const ideaId = selectedIdea._id || selectedIdea.id;

    const filtered = ideas.filter((idea) => (idea._id || idea.id) !== ideaId);

    setIdeas(filtered);
    setIsDeleteOpen(false);
    showToast("Idea deleted successfully!", "error");
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-slate-500">
        Loading your ideas...
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl px-4 sm:px-8 py-6 relative">
      {toast.show && (
        <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div
            className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium ${
              toast.type === "error"
                ? "bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"
                : "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                toast.type === "error" ? "bg-red-500" : "bg-emerald-500"
              }`}
            />
            {toast.message}
          </div>
        </div>
      )}

      <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-gray-200 flex items-center gap-2">
        <FiLayers className="text-purple-500" /> My Saved Ideas ({ideas.length})
      </h3>

      {ideas.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-2xl text-slate-400">
          You haven't submitted any ideas from this browser yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {ideas.map((idea) => (
            <div
              key={idea._id || idea.id}
              className="p-5 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2 gap-4">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
                    {idea.title}
                  </h4>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs px-2.5 py-1 bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full font-medium">
                      {idea.category}
                    </span>
                    <button
                      onClick={() => openEditModal(idea)}
                      className="p-1.5 text-slate-500 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                      title="Edit Idea"
                    >
                      <FiEdit3 className="text-sm" />
                    </button>

                    <button
                      onClick={() => openDeleteModal(idea)}
                      className="p-1.5 text-slate-500 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                      title="Delete Idea"
                    >
                      <FiTrash2 className="text-sm" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-gray-400 mb-4">
                  {idea.shortDesc}
                </p>
              </div>

              {idea.tags && idea.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 items-center">
                  <FiTag className="text-xs text-slate-400" />
                  {idea.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded text-slate-500 dark:text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl w-full max-w-md p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <FiX className="text-xl" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Update Your Idea
            </h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-white/10 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-white/10 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Short Description
                </label>
                <textarea
                  value={editShortDesc}
                  onChange={(e) => setEditShortDesc(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-white/10 rounded-xl bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 resize-none"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors shadow-sm shadow-purple-500/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl w-full max-w-sm p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Are you sure?
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              This will permanently delete your idea{" "}
              <strong>&quot;{selectedIdea?.title}&quot;</strong>. This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors"
              >
                Keep it
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm shadow-red-500/20"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
