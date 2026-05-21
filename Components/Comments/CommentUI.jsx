"use client";
import { useState } from "react";
import { Button, TextArea } from "@heroui/react";
import { Input } from "@heroui/react";

import { Alert } from "@heroui/react";
import {
  addComment,
  updateComment,
  deleteComment,
} from "@/app/ideadetails/[_id]/CommentSystem";

export default function CommentUI({
  initialComments = [],
  currentUser = null,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const handleEditInit = (comment) => {
    setEditingId(comment._id);
    setEditText(comment.text);
  };

  const handleUpdateSave = async (id) => {
    if (!editText.trim()) {
      showToast("Comment cannot be empty!", "danger");
      return;
    }
    try {
      await updateComment(id, editText);
      setEditingId(null);
      setEditText("");
      showToast("Comment updated successfully!", "success");
    } catch (err) {
      showToast("Failed to update comment.", "danger");
    }
  };

  const triggerDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const executeDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await deleteComment(confirmDeleteId);
      showToast("Comment deleted successfully!", "success");
    } catch (err) {
      showToast("Failed to delete comment.", "danger");
    } finally {
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="relative container mx-auto my-10 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 font-sans">
      {toast.show && (
        <div className="fixed top-5 right-5 z-50 animate-appearance-in max-w-sm">
          <Alert color={toast.type} title={toast.message} variant="faded" />
        </div>
      )}

      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-sm w-full p-6 shadow-xl border border-gray-150 dark:border-gray-700 animate-appearance-in">
            <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2">
              Are you sure?
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              This action will permanently delete your comment.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                size="sm"
                variant="light"
                className="cursor-pointer"
                onPress={() => setConfirmDeleteId(null)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                color="danger"
                className="cursor-pointer font-semibold shadow-md"
                onPress={executeDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-3 mb-6">
        Comment section ({initialComments.length})
      </h3>

      <form
        action={async (formData) => {
          try {
            await addComment(formData);
            document.getElementById("comment-submission-form").reset();
            showToast("Comment posted successfully!", "success");
          } catch (err) {
            showToast("Failed to post comment.", "danger");
          }
        }}
        id="comment-submission-form"
        className="flex flex-col gap-4 mb-8"
      >
        <Input
          type="text"
          name="author"
          label="Your Name"
          variant="bordered"
          defaultValue={currentUser?.name || ""}
          isreadOnly={!!currentUser?.name}
          className={currentUser?.name ? "opacity-80" : ""}
        />

        <TextArea
          name="comment"
          label="Write a Comment..."
          variant="bordered"
          disableAnimation={false}
          disableAutosize={false}
          classNames={{
            input: "min-h-[90px]",
          }}
        />

        <Button
          type="submit"
          color="primary"
          className="cursor-pointer w-full font-semibold shadow-md"
        >
          Write A comments
        </Button>
      </form>

      <div className="flex flex-col gap-4">
        {initialComments.length === 0 ? (
          <p className="text-gray-400 dark:text-gray-500 text-sm text-center py-4">
            No Comments Found
          </p>
        ) : (
          initialComments.map((comment) => (
            <div
              key={comment._id}
              className="p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all hover:border-gray-300 dark:hover:border-gray-600"
            >
              <div className="flex justify-between items-center mb-2.5">
                <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">
                  {comment.author}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {comment.time}
                </span>
              </div>

              {editingId === comment._id ? (
                <div className="flex flex-col gap-3">
                  <TextArea
                    variant="bordered"
                    color="primary"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      color="success"
                      className="cursor-pointer text-white font-semibold shadow-sm"
                      onPress={() => handleUpdateSave(comment._id)}
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="flat"
                      color="default"
                      className="cursor-pointer font-semibold shadow-sm"
                      onPress={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {comment.text}
                  </p>
                  <div className="flex gap-2 text-xs font-semibold">
                    <Button
                      size="sm"
                      variant="light"
                      color="primary"
                      className="cursor-pointer"
                      onPress={() => handleEditInit(comment)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="light"
                      color="danger"
                      className="cursor-pointer"
                      onPress={() => triggerDelete(comment._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
