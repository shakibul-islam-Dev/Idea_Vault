"use client";

import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-w-9 h-9" />;

  const isDarkMode = theme === "dark";

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        isIconOnly
        variant="light"
        onClick={() => setTheme(isDarkMode ? "light" : "dark")}
        className="min-w-9 h-9 rounded-xl cursor-pointer flex items-center justify-center text-neutral-700 hover:bg-neutral-100 dark:text-amber-400 dark:hover:bg-neutral-800 transition-all"
      >
        {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
      </Button>
    </motion.div>
  );
};

export default ThemeToggle;
