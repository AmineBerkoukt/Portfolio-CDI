"use client";

import { useTheme } from "../components/ThemeProvider";
import { useI18n } from "../components/I18nProvider";
import SceneCard from "../components/SceneCard";
import { FiMapPin, FiPhone, FiMail, FiLinkedin, FiGlobe } from "react-icons/fi";

export default function AboutCard() {
  const { theme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === "dark";

  const contactItems = [
    { icon: FiMapPin, text: t("about.location") },
    { icon: FiPhone, text: t("about.phone") },
    { icon: FiMail, text: t("about.email") },
    { icon: FiLinkedin, text: t("about.linkedin") },
    { icon: FiGlobe, text: t("about.portfolio") },
  ];

  return (
    <section id="about" className="scroll-margin py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-center">
        <SceneCard
          cue={t("about.cue") as string}
          title={t("about.title") as string}
          initialX={0}
          initialY={0}
          width="w-full max-w-3xl"
        >
          <p className={`font-mono text-sm leading-relaxed mb-6 ${isDark ? "text-stage-silver/80" : "text-stage-charcoal/80"}`}>
            {t("about.content")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {contactItems.map((item, i) => (
              <div
                key={i}
                className={`
                  flex items-center gap-3 p-3 rounded-lg
                  ${isDark ? "bg-stage-black/40 border border-stage-red/10" : "bg-stage-ivory/60 border border-stage-gold/10"}
                `}
              >
                <item.icon className={`text-lg ${isDark ? "text-stage-red-glow" : "text-stage-gold"}`} />
                <span className={`font-mono text-xs ${isDark ? "text-stage-silver/70" : "text-stage-charcoal/70"}`}>
                  {item.text as string}
                </span>
              </div>
            ))}
          </div>
        </SceneCard>
      </div>
    </section>
  );
}
