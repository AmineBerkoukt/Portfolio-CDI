"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "../../components/ThemeProvider";
import { useI18n } from "../../components/I18nProvider";
import { FiSun, FiMoon, FiGlobe } from "react-icons/fi";

export default function StoryHeader() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${isScrolled ? "py-2" : "py-4"}
        ${isDark ? "bg-stage-black/90 backdrop-blur-md border-b border-stage-red/20" : "bg-stage-cream/90 backdrop-blur-md border-b border-stage-azure/45"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link href="/">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <span className={`font-serif text-sm sm:text-base md:text-xl tracking-widest md:tracking-[0.2em] whitespace-nowrap ${isDark ? "text-white" : "text-stage-charcoal"}`}>
              Amine BERKOUKT
            </span>
          </motion.div>
        </Link>

        {/* Toggles */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language Toggle */}
          <motion.button
            onClick={toggleLang}
            className={`
              flex items-center gap-1.5 px-2 md:px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded border
              ${isDark ? "border-stage-red/30 text-stage-silver hover:border-stage-red" : "border-stage-azure/60 text-stage-charcoal hover:border-stage-azure"}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiGlobe size={14} className="opacity-80" />
            <span>{lang === "fr" ? "FR" : "EN"}</span>
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className={`
              p-2 rounded-full border transition-all duration-500
              ${isDark ? "border-stage-red/30 text-stage-silver hover:border-stage-red hover:shadow-[0_0_20px_rgba(196,30,58,0.3)]" : "border-stage-azure/60 text-stage-charcoal hover:border-stage-azure hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"}
            `}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
