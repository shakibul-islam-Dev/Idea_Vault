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

  useEffect(() => {
    if (!params?.id) return;
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
      <div className="border p-6 rounded-2xl bg-white dark:bg-slate-900">
        <h1 className="text-2xl font-bold">{idea.title || idea.ideaTitle}</h1>
        <p className="text-gray-500 my-2">
          {idea.shortDesc || idea.shortDescription}
        </p>
        <p className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl mt-3">
          {idea.problemStatement}
        </p>
      </div>
    </div>
  );
};

export default IdeaDetailsPage;
