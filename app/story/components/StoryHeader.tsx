"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "../../components/ThemeProvider";
import { useI18n } from "../../components/I18nProvider";
import { UI } from "../data";
import { pick } from "../util";
import { FiSun, FiMoon, FiGlobe, FiArrowLeft } from "react-icons/fi";

export default function StoryHeader() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useI18n();
  const isDark = theme === "dark";

  return (
    <motion.header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${isDark
          ? "bg-stage-black/90 backdrop-blur-md border-b border-stage-red/20"
          : "bg-stage-cream/90 backdrop-blur-md border-b border-stage-azure/45"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 story-focus rounded">
          <span
            className={`font-serif text-base md:text-lg tracking-[0.15em] ${
              isDark ? "text-white" : "text-stage-charcoal"
            }`}
          >
            Amine BERKOUKT
          </span>
          <span
            className="hidden sm:inline-block font-mono text-[9px] uppercase tracking-[0.2em] px-1.5 py-0.5 rounded border"
            style={{ borderColor: "var(--quest-side)", color: "var(--quest-side)" }}
          >
            QUEST
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Back to portfolio */}
          <Link
            href="/"
            className={`
              hidden sm:flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded border
              transition-colors
              ${isDark
                ? "border-stage-red/30 text-stage-silver hover:border-stage-red hover:text-white"
                : "border-stage-azure/60 text-stage-charcoal hover:border-stage-azure hover:text-stage-charcoal"}
            `}
          >
            <FiArrowLeft size={14} />
            <span>{pick(lang, UI.backToStage)}</span>
          </Link>

          {/* Language toggle */}
          <motion.button
            onClick={toggleLang}
            aria-label="Toggle language"
            className={`
              flex items-center gap-1.5 px-2 md:px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded border
              ${isDark
                ? "border-stage-red/30 text-stage-silver hover:border-stage-red"
                : "border-stage-azure/60 text-stage-charcoal hover:border-stage-azure"}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiGlobe size={14} className="opacity-80" />
            <span>{lang === "fr" ? "FR" : "EN"}</span>
          </motion.button>

          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`
              p-2 rounded-full border transition-all duration-500
              ${isDark
                ? "border-stage-red/30 text-stage-silver hover:border-stage-red hover:shadow-[0_0_20px_rgba(196,30,58,0.3)]"
                : "border-stage-azure/60 text-stage-charcoal hover:border-stage-azure hover:shadow-[0_0_20px_rgba(26,111,224,0.3)]"}
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
