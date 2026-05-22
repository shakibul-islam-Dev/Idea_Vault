"use client";
import React, { useState } from "react";

export default function MyIdeas({ initialIdeas }) {
  const [searchTerm, setSearchTerm] = useState("");

  // সার্চ অনুযায়ী আইডিয়া ফিল্টার করা
  const filteredIdeas = initialIdeas.filter((idea) =>
    idea.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full max-w-4xl px-4">
      {/* সার্চ ইনপুট */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search your ideas..."
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* আইডিয়া লিস্ট */}
      <div className="grid gap-4">
        {filteredIdeas.map((idea) => (
          <div key={idea._id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold">{idea.title}</h2>
            <p>{idea.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
