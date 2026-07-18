"use client";

import { useTheme } from "../components/ThemeProvider";
import { useI18n } from "../components/I18nProvider";
import SceneCard from "../components/SceneCard";
import { FiStar, FiCamera } from "react-icons/fi";

function safeArray(val: unknown): string[] {
  return Array.isArray(val) ? val : [];
}

export default function ExtrasCard() {
  const { theme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === "dark";

  const items = safeArray(t("extras.items"));

  return (
    <section id="extras" className="scroll-margin py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-center">
        <SceneCard
          cue={t("extras.cue") as string}
          title={t("extras.title") as string}
          initialX={0}
          initialY={0}
          width="w-full max-w-4xl mx-auto"
        >
          <div className="space-y-4">
            {items.map((item, i) => (
              <div
                key={i}
                className={`
                  flex items-start gap-3 p-4 rounded-lg
                  ${isDark ? "bg-stage-black/40 border border-stage-red/10" : "bg-stage-ivory/60 border border-stage-azure/25"}
                `}
              >
                <div
                  className={`
                    p-2 rounded-full mt-0.5
                    ${isDark ? "bg-stage-red/10 text-stage-red-glow" : "bg-stage-azure/20 text-stage-azure"}
                  `}
                >
                  {i === 0 ? <FiStar size={16} /> : <FiCamera size={16} />}
                </div>
                <span
                  className={`font-mono text-sm leading-relaxed ${
                    isDark ? "text-stage-silver/80" : "text-stage-charcoal/80"
                  }`}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </SceneCard>
      </div>
    </section>
  );
}
