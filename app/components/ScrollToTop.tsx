"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import { useTheme } from "./ThemeProvider";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 ${
            isDark
              ? "bg-stage-charcoal/80 text-stage-red border border-stage-red/20 hover:border-stage-red/50 hover:shadow-stage-red/20"
              : "bg-white/80 text-stage-azure border border-stage-azure/20 hover:border-stage-azure/50 hover:shadow-stage-azure/20"
          }`}
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-base md:text-xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
