"use client";

import { useState } from "react";
import { Toaster, toast } from "sonner";
import { Rocket, Send } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { DateField, Label } from "@heroui/react";
import { getLocalTimeZone } from "@internationalized/date";

export default function SubmitIdeaForm(params) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const selectedDate = value ? value.toDate(getLocalTimeZone()) : null;

  //user information
  const { data: session } = authClient.useSession();
  const user = session?.user;

  async function handleSubmit(formData) {
    setLoading(true);
    const data = Object.fromEntries(formData.entries());

    const finalData = {
      ...data,
      userId: user?.id,
      date: value ? value.toDate(getLocalTimeZone()).toISOString() : null,
    };
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    try {
      const response = await fetch(`${serverUrl}/api/idea`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        toast.success("Idea submitted successfully!");
      }
    } catch (error) {
      toast.error("Failed to submit");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4">
      <Toaster position="top-right" richColors />

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 dark:text-white flex items-center gap-2">
          <Rocket className="text-blue-600" /> Submit Startup Idea
        </h1>

        <form
          action={handleSubmit}
          className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm space-y-5"
        >
          {/* Row 1 */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Idea Title
            </label>
            <input
              name="title"
              required
              className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                Short Description
              </label>
              <textarea
                name="shortDesc"
                required
                rows={2}
                className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                Category
              </label>
              <select
                name="category"
                className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 outline-none"
              >
                <option value="tech">Tech</option>
                <option value="health">Health</option>
                <option value="ai">AI</option>
                <option value="education">Education</option>
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Detailed Description
            </label>
            <textarea
              name="detailedDesc"
              required
              rows={4}
              className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 outline-none"
            />
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                Tags (Optional)
              </label>
              <input
                name="tags"
                className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 outline-none"
                placeholder="AI, SaaS"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                Estimated Budget (Optional)
              </label>
              <input
                name="budget"
                type="number"
                className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 outline-none"
              />
            </div>
          </div>

          {/* Row 5 */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Image URL
            </label>
            <input
              name="imageUrl"
              type="url"
              className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Target Audience
            </label>
            <input
              name="audience"
              className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Problem Statement
            </label>
            <textarea
              name="problem"
              required
              rows={3}
              className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Proposed Solution
            </label>
            <textarea
              name="solution"
              required
              rows={3}
              className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700 outline-none"
            />
          </div>
          <DateField value={value} onChange={setValue} className="w-[256px] ">
            <Label>Date</Label>
            <DateField.Group>
              <DateField.Input className="text-white">
                {(segment) => <DateField.Segment segment={segment} />}
              </DateField.Input>
            </DateField.Group>
          </DateField>
          <button
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2"
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
