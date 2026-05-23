"use client";
import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";

export default function MyIdeas({ initialIdeas }) {
  const [ideas, setIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    if (initialIdeas) {
      const hiddenIds = JSON.parse(localStorage.getItem("hiddenIdeas") || "[]");
      const filteredIdeas = initialIdeas.filter(
        (idea) => !hiddenIds.includes(idea._id),
      );
      setIdeas(filteredIdeas);
    }
  }, [initialIdeas]);

  const handleHide = () => {
    if (!selectedIdea) return;
    const hiddenIds = JSON.parse(localStorage.getItem("hiddenIdeas") || "[]");
    const newHiddenIds = [...hiddenIds, selectedIdea._id];
    localStorage.setItem("hiddenIdeas", JSON.stringify(newHiddenIds));
    setIdeas(ideas.filter((idea) => idea._id !== selectedIdea._id));
    setIsDeleteOpen(false);
    setSelectedIdea(null);
  };

  const handleUpdate = () => {
    if (!selectedIdea) return;
    setIdeas(
      ideas.map((i) =>
        i._id === selectedIdea._id ? { ...i, title: editTitle } : i,
      ),
    );
    setIsEditOpen(false);
    setSelectedIdea(null);
  };

  return (
    <section className="w-full max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Ideas</h1>
        <Link href={`/addidea`}>
          <Button color="primary">+ Add New Idea</Button>
        </Link>
      </div>

      <div className="w-full">
        {ideas.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="mb-4">No ideas found. Please add your first idea!</p>
          </div>
        ) : (
          ideas.map((idea) => (
            <div
              key={idea._id}
              className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700"
            >
              <span>{idea.title}</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="flat"
                  color="primary"
                  onClick={() => {
                    setSelectedIdea(idea);
                    setEditTitle(idea.title);
                    setIsEditOpen(true);
                  }}
                >
                  <FaRegEdit /> Edit
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => {
                    setSelectedIdea(idea);
                    setIsDeleteOpen(true);
                  }}
                >
                  <MdDelete /> Remove
                </Button>
              </div>
            </div>
          ))
        )}

        {/* Delete Confirmation Modal */}
        {selectedIdea && (
          <Modal
            isOpen={isDeleteOpen}
            onClose={() => {
              setIsDeleteOpen(false);
              setSelectedIdea(null);
            }}
          >
            <ModalHeader>Confirm Remove</ModalHeader>
            <ModalBody>Are you sure you want to remove this idea?</ModalBody>
            <ModalFooter>
              <Button
                variant="flat"
                onClick={() => {
                  setIsDeleteOpen(false);
                  setSelectedIdea(null);
                }}
              >
                Cancel
              </Button>
              <Button color="danger" onClick={handleHide}>
                Confirm
              </Button>
            </ModalFooter>
          </Modal>
        )}

        {/* Update Modal */}
        {selectedIdea && (
          <Modal
            isOpen={isEditOpen}
            onClose={() => {
              setIsEditOpen(false);
              setSelectedIdea(null);
            }}
          >
            <ModalHeader>Edit Idea</ModalHeader>
            <ModalBody>
              <Input
                label="Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                variant="flat"
                onClick={() => {
                  setIsEditOpen(false);
                  setSelectedIdea(null);
                }}
              >
                Cancel
              </Button>
              <Button color="primary" onClick={handleUpdate}>
                Save Changes
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </div>
    </section>
  );
}
