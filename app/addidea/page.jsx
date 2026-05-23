"use client";

import { useState } from "react";
import { Toaster, toast } from "sonner";
import { Rocket, Send } from "lucide-react";
import { DateField, Label } from "@heroui/react";
import { getLocalTimeZone } from "@internationalized/date";
import { authClient } from "@/lib/auth-client";

export default function SubmitIdeaForm() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault(); // ফর্ম রিলোড হওয়া আটকান
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    if (value) {
      formData.append("date", value.toDate(getLocalTimeZone()).toISOString());
    }

    try {
      // Better Auth থেকে সেশন এবং টোকেন নিন
      const { data: session } = await authClient.getSession();

      const response = await fetch("http://localhost:5000/api/idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${session?.token}`,
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) throw new Error("Submission failed");
      toast.success("Idea submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit. Check console.");
    } finally {
      setLoading(false);
    }
  }

  const fieldStyle =
    "w-full p-3 rounded-lg border bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 transition-colors";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4 transition-colors">
      <Toaster position="top-right" richColors />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
          <Rocket className="text-blue-600" /> Submit Startup Idea
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm space-y-5"
        >
          {/* Idea Title */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Idea Title
            </label>
            <input name="title" required className={fieldStyle} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Short Description
              </label>
              <textarea
                name="shortDesc"
                required
                rows={2}
                className={fieldStyle}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Category
              </label>
              <select name="category" className={fieldStyle}>
                <option value="tech">Tech</option>
                <option value="health">Health</option>
                <option value="ai">AI</option>
                <option value="education">Education</option>
              </select>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Detailed Description
            </label>
            <textarea
              name="detailedDesc"
              required
              rows={4}
              className={fieldStyle}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Tags (Optional)
              </label>
              <input name="tags" className={fieldStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Estimated Budget
              </label>
              <input name="budget" type="number" className={fieldStyle} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Image URL
            </label>
            <input name="imageUrl" type="url" className={fieldStyle} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Target Audience
            </label>
            <input name="audience" className={fieldStyle} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Problem Statement
            </label>
            <textarea name="problem" required rows={3} className={fieldStyle} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Proposed Solution
            </label>
            <textarea
              name="solution"
              required
              rows={3}
              className={fieldStyle}
            />
          </div>

          {/* DateField with dark mode styling */}
          <div className="flex flex-col gap-2">
            <DateField
              value={value}
              onChange={setValue}
              className="text-gray-900 dark:text-gray-100"
            >
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Date
              </Label>
              <DateField.Group className="flex w-full p-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800">
                <DateField.Input className="flex w-full outline-none">
                  {(segment) => (
                    <DateField.Segment
                      segment={segment}
                      className="px-0.5 text-gray-900 dark:text-gray-100 focus:bg-blue-500/20 rounded"
                    />
                  )}
                </DateField.Input>
              </DateField.Group>
            </DateField>
          </div>

          <button
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              "Saving..."
            ) : (
              <>
                <Send size={18} /> Submit Idea
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
