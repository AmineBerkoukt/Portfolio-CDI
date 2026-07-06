"use client";

import { motion } from "framer-motion";
import { useTheme } from "../components/ThemeProvider";
import { useI18n } from "../components/I18nProvider";
import SceneCard from "../components/SceneCard";
import { FiCode, FiTool, FiCalendar } from "react-icons/fi";
import useRestoredScroll from "../hooks/useRestoredScroll";

function safeArray(val: any): string[] {
  return Array.isArray(val) ? val : [];
}

export default function ProjectsCard() {
  const { theme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === "dark";
  const restoredScroll = useRestoredScroll();

  const projectItems = [
    { key: "devops", icon: FiCode },
    { key: "microservices", icon: FiCode },
  ];

  return (
    <section id="projects" className="scroll-margin py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-center">
        <SceneCard
          cue={t("projects.cue") as string}
          title={t("projects.title") as string}
          initialX={0}
          initialY={0}
          width="w-full max-w-2xl"
        >
          <div className="space-y-4">
            {projectItems.map((proj, i) => {
              const title = t(`projects.${proj.key}.title`) as string;
              const date = t(`projects.${proj.key}.date`) as string;
              const desc = t(`projects.${proj.key}.desc`) as string;
              const tech = t(`projects.${proj.key}.tech`) as string;

              return (
                <motion.div
                  key={proj.key}
                  className={`
                    p-4 rounded-lg
                    ${isDark ? "bg-stage-black/40 border border-stage-red/10" : "bg-stage-ivory/60 border border-stage-gold/10"}
                  `}
                  initial={restoredScroll ? false : { opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className={`
                      p-2 rounded-full
                      ${isDark ? "bg-stage-red/10 text-stage-red-glow" : "bg-stage-gold/10 text-stage-gold"}
                    `}>
                      <proj.icon size={18} />
                    </div>
                    <div>
                      <h3 className={`font-condensed text-base uppercase tracking-wide ${isDark ? "text-white" : "text-stage-charcoal"}`}>
                        {title}
                      </h3>
                      {date && (
                        <span className={`font-mono text-[10px] flex items-center gap-1 mt-1 ${isDark ? "text-stage-silver/50" : "text-stage-charcoal/50"}`}>
                          <FiCalendar size={10} />
                          {date}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className={`font-mono text-xs leading-relaxed ml-11 mb-2 ${isDark ? "text-stage-silver/70" : "text-stage-charcoal/70"}`}>
                    {desc}
                  </p>
                  <div className={`
                    ml-11 flex items-start gap-2 p-2 rounded
                    ${isDark ? "bg-stage-red/5" : "bg-stage-gold/5"}
                  `}>
                    <FiTool size={12} className={`mt-0.5 ${isDark ? "text-stage-red-glow/60" : "text-stage-gold/60"}`} />
                    <span className={`font-mono text-[10px] ${isDark ? "text-stage-silver/50" : "text-stage-charcoal/50"}`}>
                      {tech}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </SceneCard>
      </div>
    </section>
  );
}
