"use client";

import { Button, Avatar } from "@heroui/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Nav = () => {
  const [isOpen, setOpen] = useState(false);
  const [isLoggin, setLoggin] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    setMounted(true);

    const savedLogin = localStorage.getItem("isLoggin") === "true";
    const savedImage = localStorage.getItem("userImage");
    const savedName = localStorage.getItem("userName");

    if (savedLogin) {
      setLoggin(true);
      if (savedImage) setUserImage(savedImage);
      if (savedName) setUserName(savedName);
    }
  }, []);

  const defaultAvatar =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop";

  const publicLinks = [
    { name: "Home", path: "/" },
    { name: "Ideas", path: "/ideas" },
  ];

  const privateLinks = [
    { name: "Add Idea", path: "/add-idea" },
    { name: "My Ideas", path: "/my-ideas" },
    { name: "My Interactions", path: "/my-interactions" },
  ];

  const visibleLinks = isLoggin
    ? [...publicLinks, ...privateLinks]
    : publicLinks;

  const handleSignOut = () => {
    setLoggin(false);
    setUserImage("");
    setUserName("User");
    localStorage.removeItem("isLoggin");
    localStorage.removeItem("userImage");
    localStorage.removeItem("userName");
    setOpen(false);
  };

  if (!mounted) {
    return (
      <div className="h-16 w-full bg-transparent border-b border-transparent" />
    );
  }

  return (
    <nav className="px-4 py-3 relative border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-black dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-10">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold flex items-center h-full tracking-tight cursor-pointer"
        >
          Idea <span className="text-violet-500 ml-1">Vault.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6 h-full">
          {visibleLinks.map((link, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
            >
              <Link
                href={link.path}
                className="cursor-pointer hover:text-violet-500 font-medium text-sm text-neutral-600 dark:text-neutral-300 dark:hover:text-violet-400 transition-colors"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right Side Control */}
        <div className="flex items-center gap-3 h-full">
          {/* Theme Toggle */}
          <div className="cursor-pointer">
            <ThemeToggle />
          </div>

          {!isLoggin ? (
            <div className="flex items-center gap-2 h-full">
              <Avatar
                src={defaultAvatar}
                className="w-8 h-8 opacity-80 border-2 border-neutral-200 dark:border-neutral-700 rounded-full object-cover"
              />

              <Link href="/login" className="cursor-pointer">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 h-8 rounded-lg text-xs font-medium transition-all cursor-pointer">
                  Login
                </Button>
              </Link>
              <Link href="/registration" className="cursor-pointer">
                <Button className="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 px-4 h-8 rounded-lg text-xs font-medium transition-all cursor-pointer">
                  Sign Up
                </Button>
              </Link>
              <Button
                onClick={() => setOpen(!isOpen)}
                className="lg:hidden w-8 h-8 p-0 min-w-8 rounded bg-transparent text-neutral-600 dark:text-neutral-300 cursor-pointer flex items-center justify-center"
              >
                {isOpen ? <RxCross2 size={20} /> : <HiMenuAlt3 size={20} />}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3 h-full">
              <Button
                onClick={handleSignOut}
                className="bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white px-4 h-8 rounded-lg text-xs font-medium transition-all cursor-pointer"
              >
                Sign Out
              </Button>

              <Avatar
                src={userImage || defaultAvatar}
                name={userName.charAt(0).toUpperCase()}
                className="cursor-pointer text-white font-bold bg-green-600 border-2 border-green-500 shadow-sm w-8 h-8 text-xs object-cover rounded-full"
              />

              <Button
                onClick={() => setOpen(!isOpen)}
                className="lg:hidden w-8 h-8 p-0 min-w-8 rounded bg-transparent text-neutral-600 dark:text-neutral-300 cursor-pointer flex items-center justify-center"
              >
                {isOpen ? <RxCross2 size={20} /> : <HiMenuAlt3 size={20} />}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full p-4 flex flex-col gap-1.5 lg:hidden z-50 border-t shadow-xl bg-white border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800"
          >
            {visibleLinks.map((link, index) => (
              <Link
                key={index}
                href={link.path}
                onClick={() => setOpen(false)}
                className="py-2.5 px-4 text-sm font-medium rounded-xl block text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-all cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
