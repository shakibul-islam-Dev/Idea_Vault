"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

// Next.js App Router-এ ক্লায়েন্ট সাইডে params হ্যান্ডেল করার জন্য React.use প্রয়োজন হতে পারে,
// অথবা সরাসরি useEffect-এর ডিপেন্ডেন্সিতে ট্র্যাক করতে হয়।
const IdeaDetailsPage = ({ params: paramsPromise }) => {
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState(null);

  // Comment states
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Fake logged in user
  const currentUser = "Shakib";
  // const serverUrl =
  //   process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  // ১. Next.js-এর প্রমিস params আনর্যাপ করা
  useEffect(() => {
    Promise.resolve(paramsPromise).then((resolvedParams) => {
      setParams(resolvedParams);
    });
  }, [paramsPromise]);

  useEffect(() => {
    if (!params?.id) return;

    fetch(`http://localhost:5000/api/idea/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch idea data");
        return res.json();
      })
      .then((data) => {
        setIdea(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [params?.id]);

  // Add Comment
  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      userName: currentUser,
      text: commentText,
      timestamp: new Date().toLocaleString(),
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

  // Delete Comment
  const handleDelete = (id) => {
    const filtered = comments.filter((comment) => comment.id !== id);
    setComments(filtered);
  };

  // Start Edit
  const handleEdit = (comment) => {
    setEditingId(comment.id);
    setEditText(comment.text);
  };

  // Save Edit
  const handleSaveEdit = (id) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, text: editText } : comment,
    );

    setComments(updatedComments);
    setEditingId(null);
    setEditText("");
  };

  if (loading || !idea) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold bg-gray-50 text-slate-800">
        <div className="animate-pulse">Loading Idea Details...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Idea Details Card */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-100">
        {idea.imageUrl && (
          <div className="relative w-full h-[400px]">
            <Image
              src={idea.imageUrl}
              alt={idea.title || idea.ideaTitle || "Idea Image"}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        <div className="p-8">
          <div className="flex flex-wrap gap-3 mb-4">
            {idea.tags?.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* আপনার ডেটাবেজের প্রোপার্টির সাথে মিলিয়ে title অথবা ideaTitle ব্যবহার করুন */}
          <h1 className="text-4xl font-black text-slate-900 mb-4">
            {idea.title || idea.ideaTitle}
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            {idea.shortDesc || idea.shortDescription}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-500 text-xs uppercase tracking-wider mb-2">
                Category
              </h3>
              <p className="text-slate-800 font-semibold">
                {idea.category || "N/A"}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-500 text-xs uppercase tracking-wider mb-2">
                Estimated Budget
              </h3>
              <p className="text-slate-800 font-semibold">
                ${idea.budget || idea.estimatedBudget || "0"}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-500 text-xs uppercase tracking-wider mb-2">
                Target Audience
              </h3>
              <p className="text-slate-800 font-semibold">
                {idea.targetAudience || "N/A"}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-500 text-xs uppercase tracking-wider mb-2">
                Problem Statement
              </h3>
              <p className="text-slate-700">{idea.problemStatement || "N/A"}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Detailed Description
            </h2>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">
              {idea.detailedDesc || idea.detailedDescription}
            </p>
          </div>

          <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-3 text-emerald-800">
              Proposed Solution
            </h2>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">
              {idea.proposedSolution}
            </p>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div className="mt-10 bg-white shadow-lg border border-slate-100 rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Discussion ({comments.length})
        </h2>

        {/* Add Comment */}
        <div className="mb-8">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Share your thoughts on this blueprint..."
            className="w-full border border-slate-200 text-slate-800 rounded-2xl p-4 h-32 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all"
          />
          <button
            onClick={handleAddComment}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all active:scale-95"
          >
            Post Comment
          </button>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border border-slate-100 bg-slate-50/50 rounded-2xl p-5"
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {comment.userName}
                  </h3>
                  <p className="text-xs text-gray-400">{comment.timestamp}</p>
                </div>

                {comment.userName === currentUser && (
                  <div className="flex gap-4 text-sm">
                    <button
                      onClick={() => handleEdit(comment)}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="text-red-500 font-semibold hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {editingId === comment.id ? (
                <div className="mt-2">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full border border-slate-200 text-slate-800 rounded-xl p-3 h-24 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleSaveEdit(comment.id)}
                      className="bg-emerald-600 text-white text-sm px-4 py-1.5 rounded-lg font-medium"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-slate-200 text-slate-700 text-sm px-4 py-1.5 rounded-lg font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-slate-700 text-sm leading-relaxed">
                  {comment.text}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IdeaDetailsPage;
