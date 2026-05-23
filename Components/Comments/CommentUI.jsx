"use client";
import { useState } from "react";
import { Button, TextArea, Input, Alert } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function CommentUI({
  initialComments = [],
  currentUser = null,
  ideaId,
}) {
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

  const getFetchOptions = async (method, bodyData = null) => {
    const session = await authClient.getSession();
    const token =
      session?.data?.session?.token || session?.data?.token || session?.token;

    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
    };
    if (bodyData) options.body = JSON.stringify(bodyData);
    return options;
  };

  // ১. কমেন্ট পোস্ট
  const handlePostComment = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const commentText = formData.get("comment");

    if (!commentText || !commentText.trim()) {
      showToast("Comment text cannot be empty.", "danger");
      return;
    }

    // কারেন্ট ইউজারের আইডি বের করার মাল্টিপল ফলব্যাক লজিক
    const currentIdStr =
      currentUser?.id ||
      currentUser?._id ||
      currentUser?.user?.id ||
      currentUser?.user?._id ||
      "";

    const newComment = {
      author:
        currentUser?.name ||
        currentUser?.user?.name ||
        formData.get("author") ||
        "Anonymous",
      userId: currentIdStr,
      text: commentText,
      ideaId,
      time: new Date().toLocaleString(),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comments`,
        await getFetchOptions("POST", newComment),
      );

      if (res.ok) {
        const dbData = await res.json();
        const actualId = dbData.insertedId || dbData._id || dbData.id;

        const savedComment = {
          ...newComment,
          _id: actualId,
        };

        setComments([...comments, savedComment]);
        e.target.reset();
        showToast("Posted successfully!", "success");
      } else {
        showToast("Unauthorized: Please login.", "danger");
      }
    } catch (error) {
      console.error("Comment Post Error:", error);
      showToast("Network error.", "danger");
    }
  };

  // ২. কমেন্ট আপডেট
  const handleUpdateSave = async (id) => {
    if (!id) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comments/${id}`,
        await getFetchOptions("PATCH", {
          text: editText,
          time: new Date().toLocaleString() + " (Edited)",
        }),
      );

      if (res.ok) {
        setComments(
          comments.map((c) =>
            c._id === id || c.id === id
              ? { ...c, text: editText, time: "Just now (Edited)" }
              : c,
          ),
        );
        setEditingId(null);
        showToast("Updated successfully!", "success");
      } else {
        showToast("Failed to update.", "danger");
      }
    } catch {
      showToast("Network error.", "danger");
    }
  };

  // ৩. কমেন্ট ডিলিট
  const executeDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comments/${confirmDeleteId}`,
        await getFetchOptions("DELETE"),
      );
      if (res.ok) {
        setComments(
          comments.filter(
            (c) => c._id !== confirmDeleteId && c.id !== confirmDeleteId,
          ),
        );
        setConfirmDeleteId(null);
        showToast("Deleted successfully!", "success");
      } else {
        showToast("Failed to delete.", "danger");
      }
    } catch (error) {
      console.error("Delete Comment Error:", error);
      showToast("Network error.", "danger");
    }
  };

  return (
    <div className="container mx-auto my-10 p-6 bg-white dark:bg-gray-950 rounded-xl border">
      {toast.show && (
        <div className="fixed top-5 right-5 z-50">
          <Alert color={toast.type} title={toast.message} />
        </div>
      )}

      {/* Delete Confirmation */}
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

      <form onSubmit={handlePostComment} className="flex flex-col gap-4 mb-8">
        <Input
          name="author"
          label="Name"
          defaultValue={currentUser?.name || currentUser?.user?.name}
        />
        <TextArea name="comment" label="Write a Comment..." />
        <Button type="submit" color="primary">
          Post Comment
        </Button>
      </form>

      <div className="flex flex-col gap-4">
        {comments.map((c, index) => {
          const commentId = c._id || c.id;

          // ফিক্সড কন্ডিশন: currentUser এর ভেতরের সব সম্ভাব্য আইডি পাথ চেক করা হচ্ছে
          const currentUserIdStr = String(
            currentUser?.id ||
              currentUser?._id ||
              currentUser?.user?.id ||
              currentUser?.user?._id ||
              "",
          ).trim();

          const commentUserIdStr = String(c.userId || "").trim();

          // ফুলপ্রুফ ওনারশিপ চেক
          const isOwner =
            currentUserIdStr &&
            commentUserIdStr &&
            currentUserIdStr === commentUserIdStr;

          return (
            <div
              key={commentId || index}
              className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900"
            >
              {editingId === commentId ? (
                <div className="flex flex-col gap-2">
                  <TextArea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      color="success"
                      onPress={() => handleUpdateSave(commentId)}
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
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-bold text-sm">{c.author}</p>
                    <span className="text-xs text-gray-400">{c.time}</span>
                  </div>
                  <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
                    {c.text}
                  </p>

                  {isOwner && (
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="flat"
                        onPress={() => {
                          setEditingId(commentId);
                          setEditText(c.text);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        color="danger"
                        onPress={() => setConfirmDeleteId(commentId)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
