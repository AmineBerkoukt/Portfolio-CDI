"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { useTheme } from "../../components/ThemeProvider";
import { useI18n } from "../../components/I18nProvider";
import { STAGES, UI, type Stage, type LevelStatus } from "../data";
import { accent, pick, scrollToId } from "../util";
import SectionHead from "./SectionHead";
import { FiCheck, FiZap, FiRefreshCw, FiChevronRight, FiFlag, FiCrosshair } from "react-icons/fi";
import { GiClawSlashes } from "react-icons/gi";

// Serpentine route through the 6 stage coordinates (viewBox 0..100 space).
const ROUTE_D =
  "M 14 15 C 25 15 28 20 40 20 C 56 20 54 16 70 16 C 82 16 88 22 88 40 C 88 55 78 64 64 64 C 50 64 46 84 32 84";

function StatusIcon({ status }: { status: LevelStatus }) {
  if (status === "completed") return <FiCheck size={13} />;
  if (status === "current") return <FiZap size={13} />;
  return <FiRefreshCw size={13} />;
}

function MapNode({ stage, isDark }: { stage: Stage; isDark: boolean }) {
  const a = accent(stage.theme);
  const { lang } = useI18n();
  const hasBoss = stage.items.some((i) => i.bossTag);
  const hasFinalBoss = stage.items.some((i) => i.finalBoss);
  const pulseCls =
    stage.status === "current" ? "story-node-pulse-current" : "story-node-pulse";
  return (
    <button
      onClick={() => scrollToId(stage.id)}
      className={`story-focus absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group`}
      style={{
        left: `${stage.node.x}%`,
        top: `${stage.node.y}%`,
      }}
      aria-label={pick(lang, stage.title)}
    >
      {/* little flag planted above the node */}
      <svg
        width="20"
        height="22"
        viewBox="0 0 20 22"
        className="mb-1 drop-shadow"
        aria-hidden="true"
        style={{ color: a.base }}
      >
        <line x1="4" y1="0" x2="4" y2="22" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 1 L18 5.5 L4 10 Z" fill="currentColor" />
      </svg>

      {/* medallion */}
      <span
        className={`relative flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-full font-condensed text-2xl transition-transform group-hover:scale-110 ${pulseCls}`}
        style={{
          background: isDark ? "var(--stage-velvet)" : "#fff",
          border: `3px solid ${a.base}`,
          color: isDark ? a.glow : a.base,
          boxShadow: `0 0 18px ${a.glow}55, inset 0 0 10px ${a.base}33`,
          ["--node-glow" as string]: a.glow,
          ["--node-ring" as string]: a.base,
        } as React.CSSProperties}
      >
        <span
          className="absolute inset-0 rounded-full"
          style={{ background: a.base, opacity: isDark ? 0.18 : 0.08 }}
        />
        <span className="relative font-bold tabular-nums" style={{ color: isDark ? a.glow : a.base }}>{stage.num}</span>
      </span>

      {/* banner ribbon */}
      <span
        className="mt-2 max-w-[190px] text-center rounded-md px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide leading-tight"
        style={{
          background: isDark ? "rgba(10,10,15,0.72)" : "rgba(255,255,255,0.88)",
          border: `1px solid ${a.base}66`,
          color: isDark ? "#fff" : "var(--stage-charcoal)",
          boxShadow: `0 0 14px ${a.glow}33`,
        }}
      >
        <span className="block truncate">{pick(lang, stage.title)}</span>
        <span
          className="mt-0.5 flex items-center justify-center gap-1"
          style={{ color: isDark ? a.glow : a.base }}
        >
          <StatusIcon status={stage.status} />
          {pick(lang, UI.status[stage.status])}
        </span>
        {hasBoss && (
          <span
            className="mt-1 inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-condensed text-[9px] tracking-widest"
            style={{ background: "var(--quest-boss)", color: "#1a1206" }}
          >
            {hasFinalBoss ? <GiClawSlashes size={9} /> : <FiCrosshair size={9} />} {hasFinalBoss ? "BIG BOSS" : "BOSS"}
          </span>
        )}
      </span>
    </button>
  );
}

export default function WorldMap() {
  const { theme } = useTheme();
  const { lang } = useI18n();
  const isDark = theme === "dark";
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 25%"]
  });

  // Scenery tints adapt to the active theme.
  const ink = isDark ? "rgba(255,255,255,0.10)" : "rgba(10,10,15,0.07)";
  const inkSoft = isDark ? "rgba(255,255,255,0.05)" : "rgba(10,10,15,0.04)";
  const snow = isDark ? "rgba(190,215,255,0.20)" : "rgba(40,60,95,0.14)";

  const stars = [
    { x: 12, y: 10, r: 0.5, d: 0 },
    { x: 30, y: 6, r: 0.4, d: 0.6 },
    { x: 48, y: 12, r: 0.5, d: 1.2 },
    { x: 64, y: 7, r: 0.4, d: 0.3 },
    { x: 82, y: 22, r: 0.5, d: 0.9 },
    { x: 90, y: 40, r: 0.4, d: 1.5 },
    { x: 8, y: 34, r: 0.4, d: 0.4 },
    { x: 40, y: 30, r: 0.35, d: 1.1 },
    { x: 70, y: 30, r: 0.45, d: 0.7 },
  ];

  return (
    <section className="py-10 px-4 md:px-8">
      <SectionHead
        id="world"
        kicker={pick(lang, UI.worldMap)}
        title={pick(lang, UI.worldMap)}
        theme="academic"
      />
      <p className={`text-center font-mono text-xs uppercase tracking-widest mb-8 ${isDark ? "text-stage-silver/50" : "text-stage-charcoal/50"}`}>
        {pick(lang, UI.worldMapSub)}
      </p>

      {/* Desktop adventure map */}
      <div
        ref={containerRef}
        className={`group relative hidden lg:block w-full max-w-4xl mx-auto rounded-2xl border overflow-hidden story-grid-bg ${
          isDark ? "bg-stage-velvet/50 border-stage-red/15" : "bg-white/50 border-stage-azure/40"
        }`}
        style={{ minHeight: 660 }}
      >
        {/* vignette for depth */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: isDark
              ? "radial-gradient(120% 90% at 50% 0%, transparent 35%, rgba(0,0,0,0.4) 100%)"
              : "radial-gradient(120% 90% at 50% 0%, transparent 45%, rgba(20,30,60,0.08) 100%)",
          }}
          aria-hidden="true"
        />

        {/* scenery */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 z-0 h-full w-full"
          style={{ pointerEvents: "none" }}
          aria-hidden="true"
        >
          {/* ground band */}
          <path
            d="M0 82 Q 25 76 50 82 T 100 82 L100 100 L0 100 Z"
            fill={inkSoft}
          />
          {/* mountains */}
          <path d="M6 84 L 22 56 L 38 84 Z" fill={ink} />
          <path d="M20 84 L 35 64 L 50 84 Z" fill={ink} />
          <path d="M44 86 L 60 50 L 76 86 Z" fill={ink} />
          <path d="M68 84 L 84 60 L 98 84 Z" fill={ink} />
          {/* snow caps */}
          <path d="M16 70 L 22 56 L 28 70 L 24 67 L 22 71 L 20 67 Z" fill={snow} />
          <path d="M54 64 L 60 50 L 66 64 L 62 61 L 60 65 L 58 61 Z" fill={snow} />
          <path d="M78 74 L 84 60 L 90 74 L 86 71 L 84 75 L 82 71 Z" fill={snow} />
          {/* trees */}
          {[28, 34, 82, 88].map((tx, i) => (
            <g key={i} fill={ink}>
              <rect x={tx - 0.4} y={80} width={0.8} height={4} />
              <path d={`M${tx} 70 L${tx - 2.2} 80 L${tx + 2.2} 80 Z`} />
              <path d={`M${tx} 74 L${tx - 1.8} 82 L${tx + 1.8} 82 Z`} />
            </g>
          ))}

          {/* drifting clouds */}
          <g className="story-cloud" opacity={isDark ? 0.12 : 0.5} fill="#ffffff">
            <g transform="translate(14 14)">
              <circle cx="0" cy="0" r="3" />
              <circle cx="4" cy="-1.5" r="2.4" />
              <circle cx="-4" cy="-1" r="2.2" />
              <rect x="-5" y="0" width="10" height="2.4" rx="1.2" />
            </g>
            <g transform="translate(70 10)">
              <circle cx="0" cy="0" r="2.6" />
              <circle cx="3.4" cy="-1.2" r="2" />
              <circle cx="-3.2" cy="-0.8" r="1.8" />
              <rect x="-4" y="0" width="8" height="2" rx="1" />
            </g>
          </g>
          <g className="story-cloud" opacity={isDark ? 0.08 : 0.35} fill="#ffffff" style={{ animationDelay: "3s" }}>
            <g transform="translate(46 22)">
              <circle cx="0" cy="0" r="2.2" />
              <circle cx="3" cy="-1" r="1.7" />
              <circle cx="-2.8" cy="-0.6" r="1.5" />
              <rect x="-3.4" y="0" width="6.8" height="1.8" rx="0.9" />
            </g>
          </g>

          {/* twinkling stars (dark mode only) */}
          {isDark &&
            stars.map((s, i) => (
              <circle
                key={i}
                cx={s.x}
                cy={s.y}
                r={s.r}
                fill="#cfe3ff"
                className="story-twinkle"
                style={{ animationDelay: `${s.d}s` }}
              />
            ))}

          {/* compass rose, top-right */}
          <g transform="translate(90 12)" stroke={ink} fill="none" strokeWidth="0.4">
            <circle cx="0" cy="0" r="4.5" />
            <circle cx="0" cy="0" r="3" />
            <path d="M0 -5 L1 0 L0 5 L-1 0 Z" fill={isDark ? "rgba(200,220,255,0.4)" : "rgba(40,60,95,0.3)"} stroke="none" />
            <path d="M-5 0 L0 1 L5 0 L0 -1 Z" fill={ink} />
            <text x="0" y="-6.2" fontSize="2.2" textAnchor="middle" fill={ink} stroke="none" style={{ fontFamily: "monospace" }}>
              N
            </text>
          </g>
        </svg>

        {/* winding road */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 z-10 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--quest-academic)" />
              <stop offset="50%" stopColor="var(--quest-boss)" />
              <stop offset="100%" stopColor="var(--quest-recruit)" />
            </linearGradient>
          </defs>
          {/* road bed */}
          <path
            d={ROUTE_D}
            fill="none"
            stroke={isDark ? "rgba(255,255,255,0.10)" : "rgba(10,10,15,0.10)"}
            strokeWidth={5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* dashed centerline */}
          <path
            d={ROUTE_D}
            className="story-route-march"
            fill="none"
            stroke={isDark ? "rgba(255,255,255,0.35)" : "rgba(10,10,15,0.3)"}
            strokeWidth={1.2}
            strokeDasharray="1.5 3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* animated traveled route */}
          <motion.path
            d={ROUTE_D}
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth={3}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ 
              pathLength: reduce ? 1 : scrollYProgress,
              opacity: reduce ? 1 : scrollYProgress,
              filter: "drop-shadow(0 0 5px rgba(168,85,247,0.6))" 
            }}
          />
        </svg>

        {/* decorative game-panel frame */}
        <div
          className="pointer-events-none absolute inset-2 z-10 rounded-xl border border-dashed"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(10,10,15,0.10)" }}
          aria-hidden="true"
        />

        {STAGES.map((s) => (
          <MapNode key={s.id} stage={s} isDark={isDark} />
        ))}
      </div>

      {/* Mobile / tablet vertical timeline */}
      <ol className="lg:hidden relative max-w-xl mx-auto pl-4 space-y-4 border-l border-stage-silver/20">
        {STAGES.map((s) => {
          const a = accent(s.theme);
          const hasBoss = s.items.some((i) => i.bossTag);
          const hasFinalBoss = s.items.some((i) => i.finalBoss);
          return (
            <li key={s.id} className="relative">

              <button
                onClick={() => scrollToId(s.id)}
                className="story-focus w-full text-left py-2 transition-colors flex items-center gap-3 hover:opacity-80 group"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-condensed text-base font-bold ${
                    s.status === "current" ? "story-node-pulse-current" : "story-node-pulse"
                  }`}
                  style={
                    {
                      border: `2px solid ${a.base}`,
                      color: isDark ? a.glow : a.base,
                      ["--node-glow" as string]: a.glow,
                      ["--node-ring" as string]: a.base,
                      background: isDark ? "var(--stage-velvet)" : "#fff",
                    } as React.CSSProperties
                  }
                >
                  {s.num}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 font-condensed text-sm uppercase leading-tight truncate" style={{ color: isDark ? "#fff" : "var(--stage-charcoal)" }}>
                    <FiFlag size={13} style={{ color: a.base }} className="shrink-0" />
                    {pick(lang, s.title)}
                  </span>
                  <span className={`block font-mono text-[10px] uppercase tracking-wide mt-0.5 flex items-center gap-1`} style={{ color: isDark ? a.glow : a.base }}>
                    <StatusIcon status={s.status} />
                    {pick(lang, UI.status[s.status])} · {pick(lang, s.period)}
                  </span>
                  {hasBoss && (
                    <span
                      className="mt-1 inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-condensed text-[9px] tracking-widest"
                      style={{ background: "var(--quest-boss)", color: "#1a1206" }}
                    >
                      {hasFinalBoss ? <GiClawSlashes size={9} /> : <FiCrosshair size={9} />} {hasFinalBoss ? "BIG BOSS" : "BOSS"}
                    </span>
                  )}
                </span>
                <FiChevronRight size={18} className={`shrink-0 ${isDark ? "text-stage-silver/40" : "text-stage-charcoal/40"}`} />
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
