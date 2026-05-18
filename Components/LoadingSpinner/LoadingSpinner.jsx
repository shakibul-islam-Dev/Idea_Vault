"use client"; // <-- Ekhane fix kora hoyeche, ebar server runtime e ar error dibena
import React from "react";
import { motion } from "framer-motion";
import { FiLoader } from "react-icons/fi";

export default function LoadingSpinner() {
  // Animation configuration for the dots
  const dotVariants = {
    animate: (i) => ({
      scale: [1, 1.5, 1],
      opacity: [0.3, 1, 0.3],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.2,
      },
    }),
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-75 w-full bg-[#0a0c10] overflow-hidden rounded-2xl p-8 border border-white/3">
      {/* Background Glow Ring */}
      <div className="absolute w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Spinner Wrapper */}
      <div className="relative flex items-center justify-center w-24 h-24">
        {/* Outer Tech Ring - Outer Fast Spin */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-t-blue-500 border-r-purple-500 border-b-transparent border-l-transparent opacity-80"
        />

        {/* Inner Counter Ring - Slower Reverse Spin */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 rounded-full border border-t-transparent border-r-transparent border-b-indigo-400 border-l-cyan-400 opacity-60"
        />

        {/* Center Pulsing Glow / Core Icon */}
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-blue-400"
        >
          <FiLoader
            className="w-6 h-6 animate-spin text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
            style={{ animationDuration: "3s" }}
          />
        </motion.div>
      </div>

      {/* Loading Text with Animated Dots */}
      <div className="mt-6 flex flex-col items-center gap-1.5 z-10">
        <span className="text-sm font-medium tracking-widest text-gray-400 uppercase font-mono">
          Connecting to Server
        </span>

        {/* Modern 3-Dot Staggered Animation */}
        <div className="flex items-center gap-1.5 h-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              custom={index}
              variants={dotVariants}
              animate="animate"
              className="w-1.5 h-1.5 rounded-full bg-linear-to-r from-blue-400 to-indigo-400"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
