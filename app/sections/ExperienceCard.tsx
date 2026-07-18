"use client";

import { useTheme } from "../components/ThemeProvider";
import { useI18n } from "../components/I18nProvider";
import SceneCard from "../components/SceneCard";
import { FiBriefcase, FiCalendar, FiTool } from "react-icons/fi";

function safeArray(val: any): string[] {
  return Array.isArray(val) ? val : [];
}

export default function ExperienceCard() {
  const { theme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === "dark";

  const experiences = [
    { key: "zenika", icon: FiBriefcase },
    { key: "sqli", icon: FiBriefcase },
    { key: "ormva", icon: FiBriefcase },
  ];

  return (
    <section id="experience" className="scroll-margin py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-center">
        <SceneCard
          cue={t("experience.cue") as string}
          title={t("experience.title") as string}
          initialX={0}
          initialY={0}
          width="w-full max-w-4xl mx-auto"
        >
          <div className="space-y-6">
            {experiences.map((exp, i) => {
              const role = t(`experience.${exp.key}.role`) as string;
              const company = t(`experience.${exp.key}.company`) as string;
              const date = t(`experience.${exp.key}.date`) as string;
              const items = safeArray(t(`experience.${exp.key}.items`));
              const tech = t(`experience.${exp.key}.tech`) as string;

              return (
                <div
                  key={exp.key}
                  className={`
                    p-4 rounded-lg
                    ${isDark ? "bg-stage-black/40 border border-stage-red/10" : "bg-stage-ivory/60 border border-stage-azure/25"}
                  `}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`
                      p-2 rounded-full mt-1
                      ${isDark ? "bg-stage-red/10 text-stage-red-glow" : "bg-stage-azure/20 text-stage-azure"}
                    `}>
                      <exp.icon size={18} />
                    </div>
                    <div>
                      <h3 className={`font-condensed text-lg uppercase tracking-wide ${isDark ? "text-white" : "text-stage-charcoal"}`}>
                        {role}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`font-mono text-xs ${isDark ? "text-stage-red-glow/80" : "text-stage-azure/90"}`}>
                          {company}
                        </span>
                        <span className={`font-mono text-[10px] ${isDark ? "text-stage-silver/40" : "text-stage-charcoal/40"}`}>|</span>
                        <span className={`font-mono text-[10px] flex items-center gap-1 ${isDark ? "text-stage-silver/50" : "text-stage-charcoal/50"}`}>
                          <FiCalendar size={10} />
                          {date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-11">
                    {items.map((item, j) => (
                      <li key={j} className={`font-mono text-xs leading-relaxed ${isDark ? "text-stage-silver/70" : "text-stage-charcoal/70"}`}>
                        • {item}
                      </li>
                    ))}
                  </ul>
                  <div className={`
                    mt-3 ml-11 flex items-start gap-2 p-2 rounded
                    ${isDark ? "bg-stage-red/5" : "bg-stage-azure/12"}
                  `}>
                    <FiTool size={12} className={`mt-0.5 ${isDark ? "text-stage-red-glow/60" : "text-stage-azure/80"}`} />
                    <span className={`font-mono text-[10px] ${isDark ? "text-stage-silver/50" : "text-stage-charcoal/50"}`}>
                      {tech}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </SceneCard>
      </div>
    </section>
  );
}
