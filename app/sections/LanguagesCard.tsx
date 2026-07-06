"use client";

import { motion } from "framer-motion";
import { useTheme } from "../components/ThemeProvider";
import { useI18n } from "../components/I18nProvider";
import SceneCard from "../components/SceneCard";
import { FiMessageCircle } from "react-icons/fi";
import useRestoredScroll from "../hooks/useRestoredScroll";

export default function LanguagesCard() {
  const { theme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === "dark";
  const restoredScroll = useRestoredScroll();

  const languages = [
    { key: "french", level: 90 },
    { key: "english", level: 85 },
    { key: "arabic", level: 100 },
  ];

  return (
    <section id="languages" className="scroll-margin py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-center">
        <SceneCard
          cue={t("languages.cue") as string}
          title={t("languages.title") as string}
          initialX={0}
          initialY={0}
          width="w-full max-w-lg"
        >
          <div className="space-y-4">
            {languages.map((lang, i) => (
              <motion.div
                key={lang.key}
                className={`
                  p-4 rounded-lg
                  ${isDark ? "bg-stage-black/40 border border-stage-red/10" : "bg-stage-ivory/60 border border-stage-gold/10"}
                `}
                initial={restoredScroll ? false : { opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        p-2 rounded-full
                        ${isDark ? "bg-stage-red/10 text-stage-red-glow" : "bg-stage-gold/10 text-stage-gold"}
                      `}
                    >
                      <FiMessageCircle size={16} />
                    </div>
                    <span
                      className={`font-mono text-sm ${
                        isDark ? "text-white" : "text-stage-charcoal"
                      }`}
                    >
                      {t(`languages.${lang.key}`) as string}
                    </span>
                  </div>
                </div>
                <div
                  className={`
                    h-2 rounded-full overflow-hidden
                    ${isDark ? "bg-stage-black/60" : "bg-stage-cream/60"}
                  `}
                >
                  <motion.div
                    className={`
                      h-full rounded-full
                      ${isDark ? "bg-gradient-to-r from-stage-red to-stage-red-glow" : "bg-gradient-to-r from-stage-gold to-yellow-400"}
                    `}
                    initial={restoredScroll ? false : { width: 0 }}
                    whileInView={{ width: `${lang.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.2, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </SceneCard>
      </div>
    </section>
  );
}
