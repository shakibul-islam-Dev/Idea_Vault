"use client";
import { Button, Avatar, Card } from "@heroui/react";

import Link from "next/link";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { RxCross2, RxAvatar } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { FaSignOutAlt } from "react-icons/fa";

import { authClient } from "@/lib/auth-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Nav = () => {
  const [isOpen, setOpen] = useState(false);

  const { data: session } = authClient.useSession();

  const user = session?.user;

  //console.log(user);
  const links = [
    { name: "Home", path: "/" },
    { name: "Ideas", path: "/ideas" },
    ...(user
      ? [
          { name: "Add Idea", path: "/add-idea" },
          { name: "My Ideas", path: "/my-ideas" },
          { name: "My Interactions", path: "/my-interactions" },
        ]
      : []),
  ];

  return (
    <nav className="px-4 py-3 relative border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-10">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white"
        >
          Idea <span className="text-violet-500">Vault.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <motion.div
              key={link.path}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={link.path}
                className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <>
              <Avatar className="cursor-pointer">
                <Avatar.Image alt={user?.name} src={user?.image} />
                <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
              </Avatar>

              <Button
                onClick={async () => {
                  await authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        toast.success("Successfully signed out!");

                        setTimeout(() => {
                          window.location.href = "/login";
                        }, 1000);
                      },
                      onError: () => {
                        toast.error("Failed to sign out. Please try again.");
                      },
                    },
                  });
                }}
                size="sm"
                title="Sign Out"
                className="bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white text-xs transition-all"
              >
                <FaSignOutAlt /> SignOut
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <div>
                <RxAvatar size={30} />
              </div>

              <Link href="/login">
                <Button
                  size="sm"
                  className="bg-blue-300 hover:bg-blue-700 text-white text-xs"
                >
                  Login
                </Button>
              </Link>
              <Link href="/registration">
                <Button
                  size="sm"
                  className="bg-blue-300 hover:bg-blue-700   text-neutral-800 dark:text-neutral-200 text-xs"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          <Button
            isIconOnly
            variant="light"
            className="lg:hidden text-neutral-600 dark:text-neutral-300"
            onClick={() => setOpen(!isOpen)}
          >
            {isOpen ? <RxCross2 size={20} /> : <HiMenuAlt3 size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-neutral-100 dark:border-neutral-800 mt-3"
          >
            <div className="p-4 flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setOpen(false)}
                  className="py-2 px-4 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
