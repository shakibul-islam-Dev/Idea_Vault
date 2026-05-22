"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SubmitIdeaPage() {
  return (
    <div className="min-h-screen bg-[#0a0c10] flex flex-col items-center py-6 w-full">
      <ToastContainer theme="colored" position="top-right" autoClose={3000} />
    </div>
  );
}
