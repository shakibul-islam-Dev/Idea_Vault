import React from "react";
import Image from "next/image";

const IdeaDetails = async ({ params }) => {
  const { id } = await params;
  console.log(id);
  if (!params) return <div className="text-center p-5">No details found.</div>;

  return (
    /* 🎯 h-auto এবং pb-16 ব্যবহার করা হয়েছে যাতে কন্টেন্ট ফুটারকে পুশ করে নিচে নামাতে পারে এবং ফাঁকা জায়গা থাকে */
    <div className="w-full h-auto pb-16 bg-transparent transition-all duration-300"></div>
  );
};

export default IdeaDetails;
