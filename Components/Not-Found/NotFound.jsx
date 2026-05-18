"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiSearch } from "react-icons/fi";

export default function NotFound() {
  // Floating animation for background elements
  const floatingAnimation = (delay) => ({
    initial: { y: 0, opacity: 0.3 },
    animate: {
      y: [0, -15, 0],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      },
    },
  });

  return (
    /* 
      1. min-h-[calc(100vh-200px)] deya hoyeche jeno nav/footer er majhe bhalo height thake.
      2. max-w-7xl mx-auto diye eti ke nav/footer er grid-e ana hoyeche.
    */
    <div className="relative min-h-[calc(100vh-160px)] w-full max-w-7xl mx-auto text-gray-200 flex flex-col items-center justify-center overflow-hidden font-sans selection:bg-blue-500/30 selection:text-blue-200 px-6 py-12">
      {/* Background Gradients & Grid (Eti ekhon shudhu content-er width-e thakbe) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Decorative Elements */}
      <motion.div
        variants={floatingAnimation(0)}
        initial="initial"
        animate="animate"
        className="absolute top-1/3 left-10 md:left-20 w-4 h-4 rounded-full bg-blue-400 blur-sm hidden sm:block"
      />
      <motion.div
        variants={floatingAnimation(1.5)}
        initial="initial"
        animate="animate"
        className="absolute bottom-1/3 right-10 md:right-20 w-6 h-6 rounded-full bg-purple-400 blur-sm hidden sm:block"
      />

      {/* Main Content Area */}
      <main className="flex flex-col items-center justify-center text-center px-4 z-10 max-w-2xl w-full">
        {/* Animated Illustration Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 shadow-2xl backdrop-blur-sm overflow-hidden group w-full max-w-md aspect-16/10 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-linear-to-tr from-blue-500/10 via-transparent to-purple-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center gap-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl animate-pulse" />
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center border border-blue-400/30 shadow-lg text-white font-mono text-3xl font-extrabold tracking-tighter">
                404
              </div>
            </div>
            <p className="text-xs tracking-widest text-blue-400/80 font-mono uppercase">
              System Core Disconnected
            </p>
          </motion.div>
        </motion.div>

        {/* Error Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase"
        >
          404 - Lost in Void
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 text-gray-400 max-w-md leading-relaxed text-sm md:text-base"
        >
          Whoops! This page seems to have vanished into the digital void. It
          looks like you&apos;ve taken a wrong turn on the path.
        </motion.p>

        {/* Action Buttons & Search */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 w-full flex flex-col items-center gap-4"
        >
          <button
            onClick={() => window.history.back()}
            className="group relative flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium px-6 py-3 rounded-xl shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.5)] transition-all duration-300 transform active:scale-[0.98]"
          >
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Go Back Home
          </button>

          <div className="relative mt-2 w-full max-w-xs group">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            <input
              type="text"
              placeholder="Or try a search..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-300 placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
            />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
