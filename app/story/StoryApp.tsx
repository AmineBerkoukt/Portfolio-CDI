"use client";

import { useTheme } from "../components/ThemeProvider";
import { useI18n } from "../components/I18nProvider";
import { UI, RESUME_URL } from "./data";
import { pick } from "./util";
import { FiArrowLeft, FiDownload } from "react-icons/fi";
import Link from "next/link";

import StoryHeader from "./components/StoryHeader";
import HUD from "./components/HUD";
import TitleScreen from "./components/TitleScreen";
import WorldMap from "./components/WorldMap";
import StageChapters from "./components/LevelDetail";
import SideQuests from "./components/SideQuests";
import SkillTree from "./components/SkillTree";
import TrophyRoom from "./components/TrophyRoom";
import Recruit from "./components/Recruit";

function StoryFooter() {
  const { theme } = useTheme();
  const { lang } = useI18n();
  const isDark = theme === "dark";
  return (
    <footer
      className={`py-8 px-4 text-center border-t ${
        isDark ? "border-stage-red/10 bg-stage-black" : "border-stage-azure/25 bg-stage-cream"
      }`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-3">
        <Link
          href="/"
          className={`story-focus inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider border transition-colors ${
            isDark
              ? "border-stage-red/30 text-stage-silver hover:border-stage-red"
              : "border-stage-azure/60 text-stage-charcoal hover:border-stage-azure"
          }`}
        >
          <FiArrowLeft size={14} />
          {pick(lang, UI.backToStage)}
        </Link>
        <a
          href={RESUME_URL}
          download="Amine-Berkoukt-Character-Sheet.pdf"
          className={`story-focus inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider border transition-colors ${
            isDark
              ? "border-stage-red/30 text-stage-silver hover:border-stage-red"
              : "border-stage-azure/60 text-stage-charcoal hover:border-stage-azure"
          }`}
        >
          <FiDownload size={14} />
          {pick(lang, UI.characterSheet)}
        </a>
      </div>
      <p className={`font-mono text-[10px] uppercase tracking-widest ${isDark ? "text-stage-silver/40" : "text-stage-charcoal/40"}`}>
        © {new Date().getFullYear()} Amine BERKOUKT — Built with Next.js, framer-motion & theatrical flair.
      </p>
    </footer>
  );
}

export default function StoryApp() {
  return (
    <main className="relative min-h-screen">
      <StoryHeader />
      <TitleScreen />
      <div className="max-w-[1440px] mx-auto lg:px-8 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12 pb-16">
        <HUD />
        <div className="min-w-0">
          <WorldMap />
          <StageChapters />
          <SideQuests />
          <SkillTree />
          <TrophyRoom />
          <Recruit />
        </div>
      </div>
      <StoryFooter />
    </main>
  );
}
