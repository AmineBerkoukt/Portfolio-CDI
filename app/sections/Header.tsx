"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../components/ThemeProvider";
import { useI18n } from "../components/I18nProvider";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { key: "about", label: "nav.about" },
  { key: "education", label: "nav.education" },
  { key: "experience", label: "nav.experience" },
  { key: "projects", label: "nav.projects" },
  { key: "skills", label: "nav.skills" },
  { key: "certifications", label: "nav.certifications" },
  { key: "languages", label: "nav.languages" },
  { key: "contact", label: "nav.contact" },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${isScrolled ? "py-2" : "py-4"}
          ${isDark ? "bg-stage-black/90 backdrop-blur-md border-b border-stage-red/20" : "bg-stage-cream/90 backdrop-blur-md border-b border-stage-azure/45"}
        `}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Brand */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <span className={`font-serif text-lg md:text-xl tracking-[0.2em] ${isDark ? "text-white" : "text-stage-charcoal"}`}>
              Amine BERKOUKT
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.key}
                onClick={() => scrollToSection(item.key)}
                className={`
                  px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider rounded
                  transition-colors duration-300
                  ${isDark ? "text-stage-silver/70 hover:text-white hover:bg-stage-red/10" : "text-stage-charcoal/70 hover:text-stage-charcoal hover:bg-stage-azure/20"}
                `}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {t(item.label) as string}
              </motion.button>
            ))}
          </nav>

          {/* Toggles */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <motion.button
              onClick={toggleLang}
              className={`
                px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded border
                ${isDark ? "border-stage-red/30 text-stage-silver hover:border-stage-red" : "border-stage-azure/60 text-stage-charcoal hover:border-stage-azure"}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {lang === "fr" ? "FR" : "EN"}
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

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`
                lg:hidden p-2 rounded-full border
                ${isDark ? "border-stage-red/30 text-stage-silver" : "border-stage-azure/60 text-stage-charcoal"}
              `}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={`
              fixed inset-0 z-40 lg:hidden pt-20
              ${isDark ? "bg-stage-black/95" : "bg-stage-cream/95"}
              backdrop-blur-lg
            `}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-4 p-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.key}
                  onClick={() => scrollToSection(item.key)}
                  className={`
                    font-condensed text-2xl uppercase tracking-widest
                    ${isDark ? "text-white" : "text-stage-charcoal"}
                  `}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t(item.label) as string}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
