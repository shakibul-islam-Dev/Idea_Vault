"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiSun, FiMoon } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

const Nav = () => {
  //state For Menu Open Or close
  const [isOpen, setOpen] = useState(false);
  //State For Loggedin or logOut
  const [isLoggin, setLoggin] = useState(true);
  //For darkmode
  const [isDarkMode, setIsDarkMode] = useState(true);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Ideas", path: "/ideas" },
    { name: "Add Idea", path: "/add-idea" },
    { name: "My Ideas", path: "/my-ideas" },
    { name: "My Interactions", path: "/my-interactions" },
  ];

  return (
    <nav
      className={`px-4 py-3 relative border-b transition-colors duration-300 ${
        isDarkMode
          ? "bg-slate-900 text-white border-slate-800"
          : "bg-white text-black border-slate-200"
      }`}
    >
      {/* Main Container */}
      <div className="max-w-6xl mx-auto flex items-center justify-between h-10">
        {/* Logoarea */}
        <div className="text-2xl font-bold flex items-center h-full">
          Idea <span className="text-violet-500 ml-1">Vault.</span>
        </div>

        {/* Desktop Links */}
        {isLoggin && (
          <div className="hidden lg:flex items-center gap-6 h-full">
            {navLinks.map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center h-full"
              >
                <Link
                  href={link.path}
                  className="cursor-pointer hover:text-violet-500 text-sm font-medium transition-colors flex items-center h-full"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Right Side Control */}
        <div className="flex items-center gap-3 h-full">
          {/* ----- DARK MODE TOGGLER (Centered Icon) ----- */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center"
          >
            <Button
              isIconOnly
              variant="light"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`min-w-8 h-8 rounded-full cursor-pointer flex items-center justify-center ${
                isDarkMode
                  ? "text-yellow-400 hover:bg-slate-800"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {/* Flex wrapper to force absolute center */}
              <span className="flex items-center justify-center w-full h-full">
                {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
              </span>
            </Button>
          </motion.div>

          {/* ----- LOGGED OUT STATE ----- */}
          {!isLoggin && (
            <div className="flex items-center gap-2 h-full">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center"
              >
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 h-8 cursor-pointer rounded text-xs font-medium flex items-center justify-center">
                  Login
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center"
              >
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 h-8 cursor-pointer rounded text-xs font-medium flex items-center justify-center">
                  Sign Up
                </Button>
              </motion.div>
              <div
                className={`w-8 h-8 cursor-pointer rounded-full flex items-center justify-center border ${
                  isDarkMode
                    ? "bg-slate-800 border-slate-700"
                    : "bg-slate-100 border-slate-300"
                }`}
              >
                <FaRegCircleUser
                  size={18}
                  className={isDarkMode ? "text-slate-400" : "text-slate-600"}
                />
              </div>
            </div>
          )}

          {/* ----- LOGGED IN STATE ----- */}
          {isLoggin && (
            <div className="flex items-center gap-2 h-full">
              {/* Sign Out Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center"
              >
                <Button
                  onClick={() => setLoggin(false)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 h-8 cursor-pointer rounded text-xs font-medium flex items-center justify-center"
                >
                  Sign Out
                </Button>
              </motion.div>

              {/* Profile Avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center border border-green-400 cursor-pointer shadow-sm"
              >
                <span className="text-xs font-bold text-white flex items-center justify-center">
                  U
                </span>
              </motion.div>

              {/* Mobile Menu Hamburger/Close Button (Centered Icon) */}
              <Button
                isIconOnly
                onClick={() => setOpen(!isOpen)}
                className={`lg:hidden min-w-8 h-8 rounded cursor-pointer flex items-center justify-center ${
                  isDarkMode
                    ? "bg-slate-800 text-white"
                    : "bg-slate-100 text-slate-900"
                }`}
              >
                <span className="flex items-center justify-center w-full h-full">
                  {isOpen ? <RxCross2 size={18} /> : <HiMenuAlt3 size={18} />}
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* ----- Mobile Menu Dropdown ----- */}
      <AnimatePresence>
        {isLoggin && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`absolute top-full left-0 w-full p-4 flex flex-col gap-2 lg:hidden z-50 border-t shadow-lg ${
              isDarkMode
                ? "bg-slate-800 border-slate-800"
                : "bg-slate-200 border-slate-200"
            }`}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link
                  href={link.path}
                  onClick={() => setOpen(false)}
                  className={`py-2 px-3 text-sm font-medium rounded transition-colors block ${
                    isDarkMode
                      ? "hover:bg-slate-800 text-slate-200"
                      : "hover:bg-slate-200 text-slate-800"
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
