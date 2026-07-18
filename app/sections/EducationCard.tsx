"use client";

import { useTheme } from "../components/ThemeProvider";
import { useI18n } from "../components/I18nProvider";
import SceneCard from "../components/SceneCard";
import { FiBook, FiAward } from "react-icons/fi";

export default function EducationCard() {
  const { theme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === "dark";

  const educationItems = [
    {
      icon: FiAward,
      title: t("education.master"),
      school: t("education.masterSchool"),
      date: t("education.masterDate"),
    },
    {
      icon: FiBook,
      title: t("education.engineer"),
      school: t("education.engineerSchool"),
      date: t("education.engineerDate"),
    },
  ];

  return (
    <section id="education" className="scroll-margin py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-center">
        <SceneCard
          cue={t("education.cue") as string}
          title={t("education.title") as string}
          initialX={0}
          initialY={0}
          width="w-full max-w-4xl mx-auto"
        >
          <div className="space-y-4">
            {educationItems.map((item, i) => (
              <div
                key={i}
                className={`
                  flex items-start gap-4 p-4 rounded-lg
                  ${isDark ? "bg-stage-black/40 border border-stage-red/10" : "bg-stage-ivory/60 border border-stage-azure/25"}
                `}
              >
                <div className={`
                  p-2 rounded-full
                  ${isDark ? "bg-stage-red/10 text-stage-red-glow" : "bg-stage-azure/20 text-stage-azure"}
                `}>
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className={`font-condensed text-lg uppercase tracking-wide ${isDark ? "text-white" : "text-stage-charcoal"}`}>
                    {item.title as string}
                  </h3>
                  <p className={`font-mono text-xs mt-1 ${isDark ? "text-stage-silver/60" : "text-stage-charcoal/60"}`}>
                    {item.school as string}
                  </p>
                  <span className={`font-mono text-[10px] uppercase tracking-wider ${isDark ? "text-stage-red-glow/60" : "text-stage-azure/80"}`}>
                    {item.date as string}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </SceneCard>
      </div>
    </section>
  );
}
