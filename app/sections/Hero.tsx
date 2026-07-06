"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useTheme } from "../components/ThemeProvider";
import { useI18n } from "../components/I18nProvider";
import { FiDownload } from "react-icons/fi";

const TruckScene = dynamic(() => import("../components/TruckScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-stage-black via-stage-velvet to-stage-black" />
  ),
});

export default function Hero() {
  const { theme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === "dark";
  const [showRecruitMessage, setShowRecruitMessage] = useState(false);

  const titleWords = (t("hero.title") as string).split(" ");
  const heroName = t("hero.name") as string;
  const heroCta = t("hero.cta") as string;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <TruckScene showRecruitMessage={showRecruitMessage} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Name */}
        <motion.h1
          className={`font-serif text-5xl md:text-7xl lg:text-8xl font-black mb-4 ${isDark ? "text-white text-glow" : "text-stage-charcoal"}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          {heroName}
        </motion.h1>

        {/* Title with marquee drop animation */}
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mb-6">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              className={`font-condensed text-xl md:text-2xl lg:text-3xl uppercase tracking-wider ${isDark ? "text-stage-silver" : "text-stage-charcoal/80"}`}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.3 + i * 0.1, ease: "backOut" }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="/assets/resume.pdf"
          download="Amine-Berkoukt-Resume.pdf"
          className={`
            inline-flex items-center gap-3 cue-button rounded-full
            ${isDark ? "bg-stage-red/20 text-white border border-stage-red/40 hover:bg-stage-red/30" : "bg-stage-gold/20 text-stage-charcoal border border-stage-gold/40 hover:bg-stage-gold/30"}
          `}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 3.5, type: "spring" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setShowRecruitMessage(true)}
          onHoverEnd={() => setShowRecruitMessage(false)}
        >
          <FiDownload size={16} />
          <span>{heroCta}</span>
        </motion.a>
      </div>
    </section>
  );
}
