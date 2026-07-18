"use client";

import { useTheme } from "../components/ThemeProvider";
import { useI18n } from "../components/I18nProvider";
import SceneCard from "../components/SceneCard";
import { FiMessageCircle } from "react-icons/fi";

export default function LanguagesCard() {
  const { theme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === "dark";

  const languages = [
    { key: "french", level: 90 },
    { key: "english", level: 85 },
    { key: "arabic", level: 100 },
  ];

  return (
    <section id="languages" className="scroll-margin py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-center">
        <SceneCard
          cue={t("languages.cue") as string}
          title={t("languages.title") as string}
          initialX={0}
          initialY={0}
          width="w-full max-w-4xl mx-auto"
        >
          <div className="space-y-4">
            {languages.map((lang, i) => (
              <div
                key={lang.key}
                className={`
                  p-4 rounded-lg
                  ${isDark ? "bg-stage-black/40 border border-stage-red/10" : "bg-stage-ivory/60 border border-stage-azure/25"}
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        p-2 rounded-full
                        ${isDark ? "bg-stage-red/10 text-stage-red-glow" : "bg-stage-azure/20 text-stage-azure"}
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
                  <div
                    className={`
                      h-full rounded-full
                      ${isDark ? "bg-gradient-to-r from-stage-red to-stage-red-glow" : "bg-gradient-to-r from-stage-azure to-sky-300"}
                    `}
                    style={{ width: `${lang.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </SceneCard>
      </div>
    </section>
  );
}
