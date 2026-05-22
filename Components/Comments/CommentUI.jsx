"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextArea, Input, Alert } from "@heroui/react";
import {
  addComment,
  updateComment,
  deleteComment,
} from "@Actions/CommentSection";

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

  const handleUpdateSave = async (id) => {
    await updateComment(id, editText, ideaId);
    setComments(
      comments.map((c) =>
        c._id === id
          ? {
              ...c,
              text: editText,
              time: new Date().toLocaleString() + " (Edited)",
            }
          : c,
      ),
    );
    setEditingId(null);
    showToast("Updated successfully!", "success");
  };

  const executeDelete = async () => {
    await deleteComment(confirmDeleteId, ideaId);
    setComments(comments.filter((c) => c._id !== confirmDeleteId));
    setConfirmDeleteId(null);
    showToast("Deleted successfully!", "success");
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl max-w-sm w-full border border-gray-200 dark:border-gray-800">
            <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
              Are you sure?
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              This action will permanently delete your comment.
            </p>
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

      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      <form
        id="comment-submission-form"
        action={async (formData) => {
          formData.append("ideaId", ideaId);
          await addComment(formData);
          document.getElementById("comment-submission-form").reset();
          router.refresh();
          showToast("Posted successfully!", "success");
        }}
        className="flex flex-col gap-4 mb-8"
      >
        <Input
          name="author"
          label="Name"
          defaultValue={currentUser?.name}
          className="dark:text-white"
        />
        <TextArea
          name="comment"
          label="Write a Comment..."
          className="dark:text-white"
        />
        <Button type="submit" color="primary" className="font-semibold">
          Post Comment
        </Button>
      </form>

      {/* Comments List */}
      <div className="flex flex-col gap-4">
        {comments.map((c) => (
          <div
            key={c._id}
            className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900"
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
                <p className="font-bold text-sm text-gray-900 dark:text-gray-100">
                  {c.author}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {c.time}
                </p>
                <p className="mb-3 text-gray-700 dark:text-gray-300">
                  {c.text}
                </p>
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
