"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../../components/ThemeProvider";
import { useI18n } from "../../components/I18nProvider";
import { STAGES, UI, type Stage, type CareerItem } from "../data";
import { accent, pick } from "../util";
import SectionHead from "./SectionHead";
import { FiCrosshair, FiStar, FiCheck, FiZap, FiRefreshCw } from "react-icons/fi";
import { GiClawSlashes } from "react-icons/gi";

const WARM = { base: "#f97316", glow: "#fb923c" };

function StatusBadge({ status, a, isDark, lang }: { status: CareerItem["status"]; a: { base: string; glow: string }; isDark: boolean; lang: "fr" | "en" }) {
  const Icon = status === "completed" ? FiCheck : FiZap;
  return (
    <span
      className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest border"
      style={{ borderColor: a.base, color: a.glow, background: `${a.base}1a` }}
    >
      <Icon size={12} />
      {pick(lang, UI.status[status])}
    </span>
  );
}

function TensionMeter({ reduce, lang, glow }: { reduce: boolean; lang: "fr" | "en"; glow: string }) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "#f59e0b" }}>
          {pick(lang, UI.tension)}
        </span>
        <span className="font-mono text-[10px] tabular-nums text-[#f59e0b]">92%</span>
      </div>
      <div
        className="h-2.5 rounded-full overflow-hidden border"
        style={{ background: "rgba(0,0,0,0.18)", borderColor: "rgba(245,158,11,0.35)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg,#f59e0b,#ef4444)" }}
          initial={{ width: reduce ? "92%" : "0%" }}
          whileInView={{ width: "92%" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduce ? 0 : 1.6, ease: "easeOut" }}
        />
      </div>
      <p className="mt-1 font-mono text-[10px] flex items-center gap-1" style={{ color: glow }}>
        <FiRefreshCw size={10} className={reduce ? "" : "story-node-pulse"} />
        {pick(lang, UI.tensionNote)}
      </p>
    </div>
  );
}

function ItemCard({ item, stage, index }: { item: CareerItem; stage: Stage; index: number }) {
  const { theme } = useTheme();
  const { lang } = useI18n();
  const isDark = theme === "dark";
  const reduce = useReducedMotion();

  const a = item.finalBoss ? accent("recruit") : item.warm ? WARM : accent(stage.theme);

  const isBoss = item.kind === "boss";

  const cardBase =
    "relative rounded-xl overflow-hidden backdrop-blur-md " +
    (isBoss
      ? isDark
        ? "bg-stage-velvet/85 border-2"
        : "bg-white/85 border-2"
      : isDark
        ? "bg-stage-velvet/70 border"
        : "bg-white/70 border");

  const warmBg = item.warm
    ? isDark
      ? "linear-gradient(135deg, rgba(249,115,22,0.16), rgba(251,146,60,0.05))"
      : "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(251,146,60,0.04))"
    : item.finalBoss
      ? isDark
        ? "linear-gradient(135deg, rgba(196,30,58,0.18), rgba(255,45,85,0.05))"
        : "linear-gradient(135deg, rgba(196,30,58,0.10), rgba(255,45,85,0.04))"
      : "none";

  return (
    <motion.div
      className={`${cardBase} ${item.finalBoss ? "story-node-pulse-current" : ""}`}
      style={{
        borderColor: isBoss ? a.base : `color-mix(in srgb, ${a.base} 33%, transparent)`,
        boxShadow: isBoss ? `0 0 22px color-mix(in srgb, ${a.glow} 33%, transparent), inset 0 0 14px color-mix(in srgb, ${a.base} 13%, transparent)` : `0 0 10px color-mix(in srgb, ${a.glow} 13%, transparent)`,
        background: warmBg === "none" ? undefined : warmBg,
      }}
      initial={{ opacity: 0, y: reduce ? 0 : 26, scale: reduce || !isBoss ? 1 : 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : index * 0.06, ease: "easeOut" }}
    >
      {/* corner glow */}
      <div
        className="absolute -top-px -left-px w-16 h-16 opacity-60 pointer-events-none"
        style={{ background: `linear-gradient(to bottom right, ${a.base}40, transparent)` }}
        aria-hidden="true"
      />

      <div className="p-5 md:p-6">
        {/* boss tag */}
        {isBoss && (
          <div className="flex items-center gap-2 mb-2">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-condensed text-[10px] uppercase tracking-[0.2em]"
              style={{ background: a.base, color: "#1a1206" }}
            >
              {item.finalBoss ? <GiClawSlashes size={11} /> : <FiCrosshair size={11} />}
              {item.finalBoss ? "BIG BOSS" : item.warm ? pick(lang, UI.lifeBoss) : "BOSS"}
            </span>
            {item.finalBoss && (
              <span className="font-mono text-[10px] uppercase tracking-widest animate-pulse" style={{ color: a.glow }}>
                {pick(lang, UI.status.current)}
              </span>
            )}
          </div>
        )}

        {/* title + status row */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h4
            className={`font-condensed text-xl md:text-2xl uppercase tracking-wide leading-tight ${isBoss ? "" : ""}`}
            style={{ color: isDark ? "#fff" : "var(--stage-charcoal)" }}
          >
            {pick(lang, item.title)}
          </h4>
          <StatusBadge status={item.status} a={a} isDark={isDark} lang={lang} />
        </div>

        {item.period && (
          <p className={`mb-2 font-mono text-[11px] uppercase tracking-wide ${isDark ? "text-stage-silver/60" : "text-stage-charcoal/55"}`}>
            {pick(lang, item.period)}
          </p>
        )}

        {/* narrative */}
        <p className={`font-mono text-sm leading-relaxed ${isDark ? "text-stage-silver/80" : "text-stage-charcoal/75"}`}>
          {pick(lang, item.blurb)}
        </p>

        {/* tension meter for the code-review boss */}
        {item.tensionMeter && <TensionMeter reduce={!!reduce} lang={lang} glow={a.glow} />}

        {/* loot */}
        {item.loot && item.loot.length > 0 && (
          <div className="mt-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: a.base }}>
              {pick(lang, UI.loot)}
            </p>
            <div className="flex flex-wrap gap-2">
              {item.loot.map((loot, i) => (
                <span
                  key={i}
                  className="quest-loot border"
                  style={{ borderColor: `color-mix(in srgb, ${a.base} 25%, transparent)`, background: `color-mix(in srgb, ${a.base} 6%, transparent)`, color: isDark ? "#e7e7e7" : "var(--stage-charcoal)" }}
                >
                  <FiStar size={13} style={{ color: a.glow }} />
                  {pick(lang, loot)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* equipped items */}
        {item.tech && item.tech.length > 0 && (
          <div className="mt-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: a.base }}>
              {pick(lang, UI.equipped)}
            </p>
            <div className="flex flex-wrap gap-2">
              {item.tech.map((t, i) => {
                const Icon = t.Icon;
                return (
                  <span
                    key={i}
                    className="tech-chip border cursor-default"
                    style={{
                      borderColor: "rgba(128,128,128,0.25)",
                      background: isDark ? "rgba(10,10,15,0.5)" : "rgba(255,255,255,0.6)",
                      color: isDark ? "var(--stage-silver)" : "var(--stage-charcoal)",
                    }}
                  >
                    <span style={{ color: t.color }} className="inline-flex">
                      <Icon size={15} />
                    </span>
                    <span className="font-mono text-[10px]">{t.name}</span>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function StageBlock({ stage, index }: { stage: Stage; index: number }) {
  const { theme } = useTheme();
  const { lang } = useI18n();
  const isDark = theme === "dark";
  const reduce = useReducedMotion();
  const a = accent(stage.theme);
  const hasBoss = stage.items.some((i) => i.bossTag);

  return (
    <motion.div
      id={stage.id}
      className="scroll-mt-36 lg:scroll-mt-12 relative pl-12 md:pl-16 pb-10"
      initial={{ opacity: 0, y: reduce ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : index * 0.04 }}
    >
      {/* rail node (sits on the spine) */}
      <span
        className={`absolute left-0 md:left-[2px] top-1 flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full font-condensed text-[10px] md:text-xs font-bold z-10 ${
          stage.status === "current" ? "story-node-pulse-current" : "story-node-pulse"
        }`}
        style={{
          background: isDark ? "var(--stage-velvet)" : "#fff",
          border: `2px solid ${a.base}`,
          color: a.glow,
          boxShadow: `0 0 16px ${a.glow}66, inset 0 0 8px ${a.base}33`,
        }}
      >
        {stage.num}
      </span>

      {/* stage card */}
      <div
        className={`relative rounded-2xl border backdrop-blur-md overflow-hidden ${
          isDark ? "bg-stage-velvet/80 border-stage-red/20" : "bg-white/80 border-stage-azure/45"
        }`}
      >
        <div
          className="absolute -top-px -left-px w-24 h-24 opacity-60 pointer-events-none"
          style={{ background: `linear-gradient(to bottom right, ${a.base}40, transparent)` }}
          aria-hidden="true"
        />
        <div className="p-6 md:p-8">
          {/* stage header */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <span
                className="font-mono text-[10px] uppercase tracking-[0.3em] tabular-nums"
                style={{ color: a.base }}
              >
                {pick(lang, stage.kicker)}
              </span>
              <h3
                className="font-condensed text-2xl md:text-3xl uppercase tracking-wide mt-1"
                style={{ color: isDark ? "#fff" : "var(--stage-charcoal)" }}
              >
                {pick(lang, stage.title)}
              </h3>
              <p className={`mt-1.5 font-mono text-xs ${isDark ? "text-stage-silver/70" : "text-stage-charcoal/60"}`}>
                {pick(lang, stage.org)} · {pick(lang, stage.period)}
              </p>
              {stage.blurb && (
                <p className={`mt-4 font-serif text-sm md:text-base leading-relaxed ${isDark ? "text-stage-silver/90" : "text-stage-charcoal/90"}`}>
                  {pick(lang, stage.blurb)}
                </p>
              )}
            </div>
            <span
              className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest border"
              style={{ borderColor: a.base, color: a.glow, background: `${a.base}1a` }}
            >
              {stage.status === "completed" ? <FiCheck size={12} /> : <FiZap size={12} />}
              {pick(lang, UI.status[stage.status])}
            </span>
          </div>

          {/* items, connected by a sub-rail */}
          <div className="relative pl-8 md:pl-10">
            <span
              className="absolute left-[16px] md:left-[20px] top-2 bottom-2 w-px -translate-x-1/2"
              style={{ background: isDark ? "rgba(255,255,255,0.14)" : "rgba(10,10,15,0.14)" }}
              aria-hidden="true"
            />
            <div className="space-y-4">
              {stage.items.map((item, i) => (
                <div key={item.id} className="relative">
                  {/* item dot */}
                  <span
                    className="absolute -left-[16px] md:-left-[20px] top-3 h-2.5 w-2.5 rounded-full border-2 -translate-x-1/2"
                    style={{
                      background: isDark ? "var(--stage-velvet)" : "#fff",
                      borderColor: item.finalBoss ? accent("recruit").base : item.kind === "boss" ? a.base : `${a.base}88`,
                      boxShadow: `0 0 8px ${item.kind === "boss" ? a.glow : a.base}55`,
                    }}
                    aria-hidden="true"
                  />
                  <ItemCard item={item} stage={stage} index={i} />
                </div>
              ))}
            </div>
          </div>

          {hasBoss && (
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--quest-boss)" }}>
              ★ {lang === "fr" ? "Étape avec combat de boss" : "Chapter contains a boss fight"}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function StageChapters() {
  const { theme } = useTheme();
  const { lang } = useI18n();
  const isDark = theme === "dark";
  return (
    <section className="py-10 px-4 md:px-8">
      <SectionHead id="campaign" kicker={pick(lang, UI.campaign)} title={pick(lang, UI.campaign)} theme="academic" />
      <p className={`mb-10 text-center font-mono text-xs uppercase tracking-widest ${isDark ? "text-stage-silver/50" : "text-stage-charcoal/50"}`}>
        {pick(lang, UI.campaignSub)}
      </p>

      <div className="relative mx-auto max-w-3xl">
        {/* vertical spine through all stages */}
        <span
          className="absolute left-[10px] md:left-[14px] top-2 bottom-2 w-0.5 rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, var(--quest-academic), var(--quest-boss) 45%, var(--quest-side) 70%, var(--quest-recruit))",
          }}
          aria-hidden="true"
        />

        {STAGES.map((stage, i) => (
          <StageBlock key={stage.id} stage={stage} index={i} />
        ))}
      </div>
    </section>
  );
}
