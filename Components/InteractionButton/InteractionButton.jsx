"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { createBooking } from "@/app/ideadetails/[_id]/Booking";
import { toast } from "react-toastify";

export default function InteractionButton({ ideaData }) {
  const [loading, setLoading] = useState(false);

  const handleInteraction = async () => {
    setLoading(true);

    const result = await createBooking({ ideaData });

    setLoading(false);
    if (result.success) {
      toast.success("Successfully added to booking collection!");
    } else {
      toast.error(result.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <Button
      isLoading={loading}
      onClick={handleInteraction}
      className="w-full sm:w-auto font-bold text-primary-foreground bg-gradient-to-r from-primary to-primary-500 hover:opacity-90 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200 rounded-xl px-6"
    >
      {loading ? "Saving..." : "MY Interactions"}
    </Button>
  );
}
