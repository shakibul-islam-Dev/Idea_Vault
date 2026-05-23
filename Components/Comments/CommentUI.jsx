"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextArea, Input, Alert } from "@heroui/react";

export default function CommentUI({
  initialComments = [],
  currentUser = null,
  ideaId,
}) {
  const router = useRouter();
  const [comments, setComments] = useState(initialComments);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(
      () => setToast({ show: false, message: "", type: "success" }),
      3000,
    );
  };

  // Better Auth এর কুকি ব্যাকএন্ডে পাঠানোর জন্য এই ফাংশনটি ব্যবহার করা হবে
  const getFetchOptions = (method, bodyData = null) => {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // এটি খুবই গুরুত্বপূর্ণ! এটি কুকি পাঠাবে
    };
    if (bodyData) {
      options.body = JSON.stringify(bodyData);
    }
    return options;
  };

  // ১. কমেন্ট পোস্ট করা
  const handlePostComment = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newComment = {
      author: formData.get("author") || currentUser?.name || "Anonymous",
      text: formData.get("comment"),
      ideaId,
      time: new Date().toLocaleString(),
    };

    try {
      const res = await fetch(
        "http://localhost:5000/api/comments",
        getFetchOptions("POST", newComment),
      );

      if (res.ok) {
        const dbData = await res.json();
        // ডাটাবেজ থেকে পাওয়া _id নতুন কমেন্টের সাথে যুক্ত করা হচ্ছে
        const savedComment = { ...newComment, _id: dbData.insertedId };

        setComments([...comments, savedComment]);
        e.target.reset();
        showToast("Posted successfully!", "success");
      } else {
        showToast("Failed to post comment. (Unauthorized)", "danger");
      }
    } catch (error) {
      showToast("Network error occurred.", "danger");
    }
  };

  // ২. কমেন্ট আপডেট করা
  const handleUpdateSave = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/comments/${id}`,
        getFetchOptions("PATCH", {
          text: editText,
          time: new Date().toLocaleString() + " (Edited)",
        }),
      );

      if (res.ok) {
        setComments(
          comments.map((c) =>
            c._id === id
              ? { ...c, text: editText, time: "Just now (Edited)" }
              : c,
          ),
        );
        setEditingId(null);
        showToast("Updated successfully!", "success");
      } else {
        showToast("Failed to update.", "danger");
      }
    } catch (error) {
      showToast("Network error occurred.", "danger");
    }
  };

  // ৩. কমেন্ট ডিলিট করা
  const executeDelete = async () => {
    if (!confirmDeleteId) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/comments/${confirmDeleteId}`,
        getFetchOptions("DELETE"),
      );

      if (res.ok) {
        setComments(comments.filter((c) => c._id !== confirmDeleteId));
        setConfirmDeleteId(null);
        showToast("Deleted successfully!", "success");
      } else {
        showToast("Failed to delete. (Unauthorized)", "danger");
        setConfirmDeleteId(null);
      }
    } catch (error) {
      showToast("Network error occurred.", "danger");
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="container mx-auto my-10 p-6 bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 transition-colors">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-5 right-5 z-50">
          <Alert color={toast.type} title={toast.message} />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl max-w-sm w-full">
            <h4 className="font-bold text-lg mb-2">Are you sure?</h4>
            <div className="flex gap-3 justify-end">
              <Button
                size="sm"
                variant="flat"
                onPress={() => setConfirmDeleteId(null)}
              >
                Cancel
              </Button>
              <Button size="sm" color="danger" onPress={executeDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      <h3 className="text-xl font-bold mb-6">Comments ({comments.length})</h3>

      {/* Comment Form */}
      <form onSubmit={handlePostComment} className="flex flex-col gap-4 mb-8">
        <Input name="author" label="Name" defaultValue={currentUser?.name} />
        <TextArea name="comment" label="Write a Comment..." />
        <Button type="submit" color="primary">
          Post Comment
        </Button>
      </form>

      {/* Comments List */}
      <div className="flex flex-col gap-4">
        {comments.map((c) => (
          <div
            key={c._id}
            className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900"
          >
            {editingId === c._id ? (
              <div className="flex flex-col gap-2">
                <TextArea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    color="success"
                    onPress={() => handleUpdateSave(c._id)}
                  >
                    Save
                  </Button>
                  <Button size="sm" onPress={() => setEditingId(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <p className="font-bold text-sm">{c.author}</p>
                <p className="text-xs text-gray-500 mb-2">{c.time}</p>
                <p className="mb-3">{c.text}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="light"
                    onPress={() => {
                      setEditingId(c._id);
                      setEditText(c.text);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="light"
                    color="danger"
                    onPress={() => setConfirmDeleteId(c._id)}
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
