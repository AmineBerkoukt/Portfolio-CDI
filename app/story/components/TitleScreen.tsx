"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../../components/ThemeProvider";
import { useI18n } from "../../components/I18nProvider";
import { CHARACTER, UI, RESUME_URL } from "../data";
import { pick, scrollToId } from "../util";
import { FiDownload, FiArrowDown } from "react-icons/fi";

export default function TitleScreen() {
  const { theme } = useTheme();
  const { lang } = useI18n();
  const isDark = theme === "dark";
  const reduce = useReducedMotion();

  const strong = isDark ? "text-white" : "text-stage-charcoal";

  return (
    <section className="relative px-4 pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: isDark
            ? "radial-gradient(60% 50% at 50% 30%, rgba(168,85,247,0.12), transparent 70%)"
            : "radial-gradient(60% 50% at 50% 30%, rgba(26,111,224,0.10), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 story-grid-bg opacity-40" aria-hidden="true" />

      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.5 }}
          className="font-mono text-[11px] uppercase tracking-[0.4em] mb-4"
          style={{ color: "var(--quest-side)" }}
        >
          ▸ {pick(lang, UI.titleSub)}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.05 }}
          className={`font-condensed font-bold uppercase leading-[0.95] tracking-tight text-4xl sm:text-6xl md:text-7xl ${strong}`}
        >
          {pick(lang, UI.titleScreen)}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.15 }}
          className={`mt-5 font-mono text-sm md:text-base ${isDark ? "text-stage-silver/80" : "text-stage-charcoal/70"}`}
        >
          {pick(lang, CHARACTER.playerClass)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.25 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <motion.button
            onClick={() => scrollToId("world")}
            whileHover={{ scale: reduce ? 1 : 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="story-focus flex items-center gap-2 px-7 py-3.5 rounded-full font-condensed uppercase tracking-widest text-sm text-white border"
            style={{
              borderColor: "var(--quest-side)",
              background: "rgba(168,85,247,0.18)",
              boxShadow: "0 0 26px rgba(168,85,247,0.3)",
            }}
          >
            {pick(lang, UI.startQuest)}
            <FiArrowDown size={16} />
          </motion.button>

          <motion.a
            href={RESUME_URL}
            download="Amine-Berkoukt-Character-Sheet.pdf"
            whileHover={{ scale: reduce ? 1 : 1.04 }}
            whileTap={{ scale: 0.97 }}
            className={`story-focus flex items-center gap-2 px-6 py-3.5 rounded-full font-condensed uppercase tracking-widest text-sm border transition-colors ${
              isDark
                ? "text-stage-silver border-stage-red/30 hover:border-stage-red"
                : "text-stage-charcoal border-stage-azure/50 hover:border-stage-azure"
            }`}
          >
            <FiDownload size={16} />
            {pick(lang, UI.characterSheet)}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
