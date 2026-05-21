"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const IdeaDetailsPage = ({ params: paramsPromise }) => {
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const currentUser = "Shakib";
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    Promise.resolve(paramsPromise).then((resolvedParams) =>
      setParams(resolvedParams),
    );
  }, [paramsPromise]);

  // Fetch Idea and Comments
  useEffect(() => {
    if (!params?.id) return;

    // Idea Fetching
    fetch(`${serverUrl}/api/idea/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setIdea(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    // Comments Fetching
    fetch(`${serverUrl}/api/comments`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((c) => c.ideaId === params.id);
        setComments(filtered);
      });
  }, [params?.id, serverUrl]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    const newComment = {
      ideaId: params.id,
      userName: currentUser,
      text: commentText,
      time: new Date().toLocaleString(),
    };

    const res = await fetch(`${serverUrl}/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    });
    if (res.ok) {
      const result = await res.json();
      setComments([{ ...newComment, _id: result.insertedId }, ...comments]);
      setCommentText("");
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`${serverUrl}/api/comments/${id}`, {
      method: "DELETE",
    });
    if (res.ok) setComments(comments.filter((c) => c._id !== id));
  };

  const handleSaveEdit = async (id) => {
    const res = await fetch(`${serverUrl}/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: editText,
        time: new Date().toLocaleString(),
      }),
    });
    if (res.ok) {
      setComments(
        comments.map((c) => (c._id === id ? { ...c, text: editText } : c)),
      );
      setEditingId(null);
    }
  };

  if (loading || !idea)
    return <div className="text-center p-20 dark:text-white">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-gray-50 dark:bg-slate-950 min-h-screen">
      {/* Idea Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800 p-8">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
          {idea.title || idea.ideaTitle}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          {idea.shortDesc || idea.shortDescription}
        </p>
        <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border dark:border-slate-700">
          <h3 className="text-xs uppercase text-slate-500 dark:text-slate-400">
            Problem Statement
          </h3>
          <p className="text-slate-800 dark:text-slate-200">
            {idea.problemStatement}
          </p>
        </div>
      </div>

      {/* Comment Section */}
      <div className="mt-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Discussion ({comments.length})
        </h2>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl p-4 text-slate-900 dark:text-white"
        />
        <button
          onClick={handleAddComment}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl"
        >
          Post Comment
        </button>

        <div className="space-y-6 mt-8">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="border-b dark:border-slate-700 pb-4"
            >
              <div className="flex justify-between">
                <h3 className="font-bold dark:text-white">
                  {comment.userName}
                </h3>
                {comment.userName === currentUser && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(comment._id);
                        setEditText(comment.text);
                      }}
                      className="text-blue-500 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="text-red-500 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              {editingId === comment._id ? (
                <div>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full bg-slate-800 p-2 text-white"
                  />
                  <button
                    onClick={() => handleSaveEdit(comment._id)}
                    className="bg-green-600 text-white px-2 py-1 mt-1 text-sm"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p className="text-slate-700 dark:text-slate-300">
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
