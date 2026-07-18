"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTheme } from "../../components/ThemeProvider";
import { useI18n } from "../../components/I18nProvider";
import {
  STAGES, CHARACTER, UI, RESUME_URL, type Bi, type ThemeKey,
} from "../data";
import { accent, pick, scrollToId } from "../util";
import { FiDownload } from "react-icons/fi";

interface NavItem {
  id: string;
  label: Bi;
  theme: ThemeKey;
  num?: string;
}

const NAV: NavItem[] = [
  { id: "world", label: UI.worldMap, theme: "academic" },
  ...STAGES.map((l) => ({ id: l.id, label: l.title, theme: l.theme, num: l.num })),
  { id: "side-quests", label: UI.sideQuests, theme: "side" },
  { id: "skill-tree", label: UI.skillTree, theme: "academic" },
  { id: "trophies", label: UI.trophies, theme: "boss" },
  { id: "recruit", label: UI.recruit, theme: "recruit" },
];

function XpBar({ isDark }: { isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const { lang } = useI18n();
  const pct = 30; // career progress toward the next level-up (early in the run)
  const muted = isDark ? "text-stage-silver/70" : "text-stage-charcoal/60";
  return (
    <div ref={ref} className="w-full">
      <div className="flex items-baseline justify-between mb-1">
        <span className={`font-mono text-[10px] uppercase tracking-widest ${muted}`}>
          LVL {String(CHARACTER.level).padStart(2, "0")}
        </span>
        <span className={`font-mono text-[10px] uppercase tracking-widest ${muted}`}>
          {CHARACTER.xpYears} {pick(lang, CHARACTER.xpLabel)}
        </span>
      </div>
      <div className="xp-track h-2.5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, var(--quest-academic), var(--quest-boss))",
            transformOrigin: "left",
          }}
          initial={{ scaleX: reduce ? 1 : 0 }}
          animate={{ scaleX: inView || reduce ? pct / 100 : 0 }}
          transition={{ duration: reduce ? 0 : 1.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function NavList({ active, isDark }: { active: string; isDark: boolean }) {
  const { lang } = useI18n();
  return (
    <>
      {NAV.map((n) => {
        const a = accent(n.theme);
        const isActive = active === n.id;
        return (
          <button
            key={n.id}
            onClick={() => scrollToId(n.id)}
            className="story-focus group relative flex items-center gap-2.5 w-full text-left px-2.5 py-2 rounded-md transition-colors"
            style={{
              background: isActive ? "rgba(128,128,128,0.12)" : "transparent",
            }}
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className="h-2 w-2 rounded-full shrink-0 transition-all"
              style={{
                background: isActive ? a.base : "rgba(128,128,128,0.4)",
                boxShadow: isActive ? `0 0 8px ${a.glow}` : "none",
              }}
            />
            {n.num && (
              <span
                className="font-mono text-[10px] tabular-nums opacity-70"
                style={{ color: a.base }}
              >
                {n.num}
              </span>
            )}
            <span
              className={`font-mono text-[11px] uppercase tracking-wide leading-tight ${
                isActive
                  ? isDark
                    ? "text-white"
                    : "text-stage-charcoal"
                  : "text-stage-silver/70"
              }`}
            >
              {pick(lang, n.label)}
            </span>
          </button>
        );
      })}
    </>
  );
}

export default function HUD() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { lang } = useI18n();
  const [active, setActive] = useState("world");

  // Track which section is in view to highlight the matching nav item.
  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const panelBg = isDark
    ? "bg-stage-velvet/70 border-stage-red/15"
    : "bg-white/70 border-stage-azure/40";

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col gap-5 p-5 rounded-2xl border backdrop-blur-md ${panelBg} lg:sticky lg:top-[72px] lg:h-[calc(100vh-92px)] lg:overflow-y-auto`}
      >
        <Identity />
        <XpBar isDark={isDark} />
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-stage-silver/40 mb-2 px-1">
            {pick(lang, UI.hudNav)}
          </p>
          <nav className="flex flex-col gap-0.5">
            <NavList active={active} isDark={isDark} />
          </nav>
        </div>
        <CharacterSheetButton />
      </aside>

      {/* Mobile sticky strip */}
      <div
        className={`lg:hidden sticky top-14 z-30 -mx-4 px-3 py-2 border-b backdrop-blur-md mb-6 ${panelBg}`}
      >
        <div className="flex items-center gap-3 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none]">
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-stage-silver/50 hidden xs:inline">
            {pick(lang, UI.hudQuests)}
          </span>
          {NAV.map((n) => {
            const a = accent(n.theme);
            const isActive = active === n.id;
            return (
              <button
                key={n.id}
                onClick={() => scrollToId(n.id)}
                className="story-focus shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono uppercase tracking-wide transition-colors"
                style={{
                  borderColor: isActive ? a.base : "rgba(128,128,128,0.25)",
                  color: isActive ? a.base : "rgba(160,160,160,0.8)",
                  background: isActive ? "rgba(128,128,128,0.1)" : "transparent",
                }}
                aria-current={isActive ? "true" : undefined}
              >
                {n.num && <span className="tabular-nums">{n.num}</span>}
                {pick(lang, n.label)}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

function Identity() {
  const { lang } = useI18n();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative h-12 w-12 rounded-xl flex items-center justify-center font-condensed text-xl shrink-0"
        style={{
          background: "rgba(128,128,128,0.1)",
          border: "1px solid var(--quest-side)",
          color: "var(--quest-side-glow)",
          boxShadow: "0 0 18px rgba(168,85,247,0.25)",
        }}
      >
        AB
      </div>
      <div className="min-w-0">
        <p className={`font-serif text-sm leading-tight truncate ${isDark ? "text-white" : "text-stage-charcoal"}`}>
          {CHARACTER.name}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-wide text-stage-silver/60 leading-tight">
          {pick(lang, CHARACTER.playerClass)}
        </p>
      </div>
    </div>
  );
}

function CharacterSheetButton() {
  const { lang } = useI18n();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <motion.a
      href={RESUME_URL}
      download="Amine-Berkoukt-Character-Sheet.pdf"
      className={`mt-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-condensed uppercase tracking-widest text-sm transition-all ${
        isDark
          ? "bg-stage-red/15 text-white border border-stage-red/40 hover:bg-stage-red/25 hover:shadow-[0_0_24px_rgba(196,30,58,0.35)]"
          : "bg-stage-azure/20 text-stage-charcoal border border-stage-azure/60 hover:bg-stage-azure/30 hover:shadow-[0_0_24px_rgba(26,111,224,0.3)]"
      }`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <FiDownload size={16} />
      {pick(lang, UI.characterSheet)}
    </motion.a>
  );
}
