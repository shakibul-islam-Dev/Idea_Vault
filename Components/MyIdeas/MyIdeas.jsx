"use client";
import { useState, useEffect } from "react";
import { Button, Input, Modal, Card } from "@heroui/react";
import { Label, TextField } from "@heroui/react";
import { Envelope } from "@gravity-ui/icons";

import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";

export default function MyIdeas({ initialIdeas }) {
  const [ideas, setIdeas] = useState(initialIdeas || []);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialIdeas) setIdeas(initialIdeas);
  }, [initialIdeas]);

  const handleHide = async () => {
    if (!selectedIdea) return;
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/idea/${selectedIdea._id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        setIdeas(ideas.filter((idea) => idea._id !== selectedIdea._id));
        setIsDeleteOpen(false);
        setSelectedIdea(null);
      } else {
        alert("Failed to delete idea");
      }
    } catch (error) {
      console.error("Delete Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedIdea) return;
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/idea/${selectedIdea._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: editTitle }),
        },
      );

      if (response.ok) {
        setIdeas(
          ideas.map((i) =>
            i._id === selectedIdea._id ? { ...i, title: editTitle } : i,
          ),
        );
        setIsEditOpen(false);
        setSelectedIdea(null);
      } else {
        alert("Failed to update idea");
      }
    } catch (error) {
      console.error("Update Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">My Ideas</h1>
        <Link href="/addidea">
          <Button color="primary" variant="shadow">
            + Add New
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {ideas.length === 0 ? (
          <Card className="p-10 text-center text-gray-500 shadow-sm">
            <Card>
              <p>You haven&apos;t added any ideas yet. Start by adding one!</p>
            </Card>
          </Card>
        ) : (
          ideas.map((idea) => (
            <Card key={idea._id} className="hover:shadow-md transition-shadow">
              <Card className="flex flex-row justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">
                    {idea.title || "Untitled Idea"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {idea.category || "No category"}
                  </span>
                </div>
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
                    variant="flat"
                    color="danger"
                    onClick={() => {
                      setSelectedIdea(idea);
                      setIsDeleteOpen(true);
                    }}
                  >
                    <MdDelete /> Remove
                  </Button>
                </div>
              </Card>
            </Card>
          ))
        )}
      </div>
      {/* Delete Modal */}
      {isDeleteOpen && (
        <Modal isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <Modal.Backdrop>
            <Modal.Container placement="auto">
              <Modal.Dialog className="sm:max-w-md">
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Heading>Confirm Delete</Modal.Heading>
                </Modal.Header>
                <Modal.Body className="p-6">
                  <p>Are you sure you want to delete this idea?</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    slot="close"
                    variant="secondary"
                    onPress={() => setIsDeleteOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="solid"
                    color="danger"
                    isLoading={loading}
                    onPress={handleHide}
                  >
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      )}
      {isEditOpen && (
        <Modal>
          <Modal.Backdrop>
            <Modal.Container placement="auto">
              <Modal.Dialog className="sm:max-w-md">
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Heading>Edit Idea</Modal.Heading>
                </Modal.Header>
                <Modal.Body className="p-6">
                  <TextField className="w-full" variant="secondary">
                    <Label>Title</Label>
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Enter new title"
                    />
                  </TextField>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    slot="close"
                    variant="secondary"
                    onPress={() => setIsEditOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="solid"
                    color="primary"
                    isLoading={loading}
                    onPress={handleUpdate}
                  >
                    Update
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      )}
    </section>
  );
}
