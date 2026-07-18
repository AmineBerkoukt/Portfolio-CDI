"use client";

import { useTheme } from "../components/ThemeProvider";
import { useI18n } from "../components/I18nProvider";
import SceneCard from "../components/SceneCard";
import { FiTool, FiCalendar, FiGitBranch, FiGrid, FiCpu, FiCamera, FiFileText, FiSmile, FiHome, FiShoppingCart, FiBookOpen, FiPenTool, FiMic } from "react-icons/fi";

function safeArray(val: any): string[] {
  return Array.isArray(val) ? val : [];
}

export default function ProjectsCard() {
  const { theme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === "dark";

  const projectItems = [
    { key: "devops", icon: FiGitBranch },
    { key: "microservices", icon: FiGrid },
    { key: "rag", icon: FiCpu },
    { key: "licensePlate", icon: FiCamera },
    { key: "cvAdapter", icon: FiFileText },
    { key: "kidsActivities", icon: FiSmile },
    { key: "studentColocation", icon: FiHome },
    { key: "ecommerce", icon: FiShoppingCart },
    { key: "courselens", icon: FiBookOpen },
    { key: "examAssistant", icon: FiPenTool },
    { key: "voiceCoding", icon: FiMic },
  ];

  return (
    <section id="projects" className="scroll-margin py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-center">
        <SceneCard
          cue={t("projects.cue") as string}
          title={t("projects.title") as string}
          initialX={0}
          initialY={0}
          width="w-full max-w-4xl mx-auto"
        >
          <div className="space-y-4">
            {projectItems.map((proj, i) => {
              const title = t(`projects.${proj.key}.title`) as string;
              const date = t(`projects.${proj.key}.date`) as string;
              const descRaw = t(`projects.${proj.key}.desc`);
              const desc = Array.isArray(descRaw) ? descRaw : [];
              const tech = t(`projects.${proj.key}.tech`) as string;

              return (
                <div
                  key={proj.key}
                  className={`
                    p-4 rounded-lg
                    ${isDark ? "bg-stage-black/40 border border-stage-red/10" : "bg-stage-ivory/60 border border-stage-azure/25"}
                  `}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className={`
                      p-2 rounded-full
                      ${isDark ? "bg-stage-red/10 text-stage-red-glow" : "bg-stage-azure/20 text-stage-azure"}
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
                  <ul className={`font-mono text-xs leading-relaxed ml-11 mb-2 space-y-1 list-disc pl-1 ${isDark ? "text-stage-silver/70 marker:text-stage-red-glow/60" : "text-stage-charcoal/70 marker:text-stage-azure/70"}`}>
                    {desc.map((point, di) => (
                      <li key={di}>{point}</li>
                    ))}
                  </ul>
                  <div className={`
                    ml-11 flex items-start gap-2 p-2 rounded
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
