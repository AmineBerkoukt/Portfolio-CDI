"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../../components/ThemeProvider";
import { useI18n } from "../../components/I18nProvider";
import { SIDE_QUESTS, UI } from "../data";
import { accent, pick } from "../util";
import SectionHead from "./SectionHead";
import { FiBookOpen, FiStar } from "react-icons/fi";

export default function SideQuests() {
  const { theme } = useTheme();
  const { lang } = useI18n();
  const isDark = theme === "dark";
  const reduce = useReducedMotion();
  const a = accent("side");

  return (
    <section className="py-10 px-4 md:px-8">
      <SectionHead
        id="side-quests"
        kicker={pick(lang, UI.sideQuests)}
        title={pick(lang, UI.sideQuests)}
        theme="side"
      />
      <p className={`text-center font-mono text-xs uppercase tracking-widest mb-8 ${isDark ? "text-stage-silver/50" : "text-stage-charcoal/50"}`}>
        {pick(lang, UI.sideQuestsSub)}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {SIDE_QUESTS.map((q, i) => (
          <motion.article
            key={q.id}
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : (i % 3) * 0.06 }}
            whileHover={{ y: reduce ? 0 : -4 }}
            className={`story-focus group relative rounded-xl p-5 border backdrop-blur-md overflow-hidden ${
              isDark ? "bg-stage-velvet/70 border-stage-red/15" : "bg-white/70 border-stage-azure/40"
            }`}
          >
            {/* top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 opacity-70"
              style={{ background: `linear-gradient(90deg, ${a.base}, transparent)` }}
              aria-hidden="true"
            />

            <div className="flex items-start gap-3 mb-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ background: `${a.base}1f`, color: a.glow }}
              >
                <q.Icon size={17} />
              </span>
              <h3
                className="font-condensed text-base uppercase leading-tight pt-1"
                style={{ color: isDark ? "#fff" : "var(--stage-charcoal)" }}
              >
                {pick(lang, q.title)}
              </h3>
            </div>

            <p className={`font-mono text-[12px] leading-relaxed mb-4 ${isDark ? "text-stage-silver/75" : "text-stage-charcoal/70"}`}>
              {pick(lang, q.blurb)}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {q.tech.map((t, ti) => (
                <span
                  key={ti}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono"
                  style={{
                    background: `${a.base}14`,
                    border: `1px solid ${a.base}30`,
                    color: a.glow,
                  }}
                >
                  <FiStar size={9} />
                  {t}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
