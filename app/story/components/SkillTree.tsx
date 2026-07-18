"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../../components/ThemeProvider";
import { useI18n } from "../../components/I18nProvider";
import { SKILL_BRANCHES, UI, CHARACTER } from "../data";
import { accent, pick } from "../util";
import SectionHead from "./SectionHead";
import { FiGitBranch } from "react-icons/fi";

const C = 50; // center in 0..100 space
const STEP = 360 / SKILL_BRANCHES.length;
const R_HEADER = 20;
const R_INNER = 30;
const R_OUTER = 41;
const GT = 8; // tangential gap between leaves in a row

interface LeafPos {
  x: number;
  y: number;
  j: number;
}
interface BranchLayout {
  header: { x: number; y: number };
  leaves: LeafPos[];
}

function buildLayout(): BranchLayout[] {
  return SKILL_BRANCHES.map((branch, i) => {
    const deg = -90 + i * STEP;
    const rd = (deg * Math.PI) / 180;
    const pd = ((deg + 90) * Math.PI) / 180; // perpendicular (tangential) direction
    const header = {
      x: C + R_HEADER * Math.cos(rd),
      y: C + R_HEADER * Math.sin(rd),
    };
    const n = branch.skills.length;
    const half = Math.ceil(n / 2);
    const leaves: LeafPos[] = branch.skills.map((_, j) => {
      const isInner = j < half;
      const idx = isInner ? j : j - half;
      const count = isInner ? half : n - half;
      const r = isInner ? R_INNER : R_OUTER;
      const t = (idx - (count - 1) / 2) * GT;
      const x = C + r * Math.cos(rd) + t * Math.cos(pd);
      const y = C + r * Math.sin(rd) + t * Math.sin(pd);
      return { x, y, j };
    });
    return { header, leaves };
  });
}

export default function SkillTree() {
  const { theme } = useTheme();
  const { lang } = useI18n();
  const isDark = theme === "dark";
  const reduce = useReducedMotion();
  const rootAccent = accent("side");
  const layout = buildLayout();

  const ring = isDark ? "rgba(255,255,255,0.16)" : "rgba(10,10,15,0.13)";

  return (
    <section className="py-10 px-4 md:px-8">
      <SectionHead
        id="skill-tree"
        kicker={pick(lang, UI.skillTree)}
        title={pick(lang, UI.skillTree)}
        theme="academic"
      />
      <p className={`text-center font-mono text-xs uppercase tracking-widest mb-8 ${isDark ? "text-stage-silver/50" : "text-stage-charcoal/50"}`}>
        {pick(lang, UI.skillTreeSub)}
      </p>

      <div className="max-w-5xl mx-auto overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none]">
        <div className="relative mx-auto aspect-square w-full max-w-[700px] min-w-[560px] overflow-visible">
          {/* connector + ring layer */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {/* concentric rings */}
            <circle cx={C} cy={C} r={14} fill="none" stroke={ring} strokeWidth={0.4} />
            <circle cx={C} cy={C} r={28} fill="none" stroke={ring} strokeWidth={0.4} />
            <circle cx={C} cy={C} r={47} fill="none" stroke={ring} strokeWidth={0.4} />
            {/* pie dividers between branches */}
            {SKILL_BRANCHES.map((_, i) => {
              const a = -90 + (i + 0.5) * STEP;
              const ar = (a * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={C}
                  y1={C}
                  x2={C + 47 * Math.cos(ar)}
                  y2={C + 47 * Math.sin(ar)}
                  stroke={ring}
                  strokeWidth={0.3}
                />
              );
            })}

            {/* spoke + leaf connectors */}
            {layout.map((b, i) => {
              const a = accent(SKILL_BRANCHES[i].theme);
              const stroke = { stroke: a.base, strokeWidth: 0.6, strokeLinecap: "round" as const };
              const glow = { filter: `drop-shadow(0 0 1.2px ${a.glow})` };
              return (
                <g key={i}>
                  <motion.line
                    x1={C}
                    y1={C}
                    x2={b.header.x}
                    y2={b.header.y}
                    style={{ ...stroke, ...glow, opacity: 0.55 }}
                    initial={{ pathLength: reduce ? 1 : 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : i * 0.07 }}
                  />
                  {b.leaves.map((lf, j) => (
                    <motion.line
                      key={j}
                      x1={b.header.x}
                      y1={b.header.y}
                      x2={lf.x}
                      y2={lf.y}
                      style={{ ...stroke, ...glow, opacity: 0.45 }}
                      initial={{ pathLength: reduce ? 1 : 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: reduce ? 0 : 0.5,
                        delay: reduce ? 0 : i * 0.07 + 0.15 + j * 0.03,
                      }}
                    />
                  ))}
                </g>
              );
            })}
          </svg>

          {/* hub */}
          <div
            className="story-focus absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex h-[13%] w-[13%] flex-col items-center justify-center rounded-full border-2 text-center"
            style={{
              borderColor: rootAccent.base,
              background: `${rootAccent.base}22`,
              color: isDark ? "#fff" : "var(--stage-charcoal)",
              boxShadow: `0 0 22px ${rootAccent.glow}55, inset 0 0 12px ${rootAccent.base}33`,
            }}
          >
            <FiGitBranch size={16} style={{ color: rootAccent.glow }} />
            <span className="font-condensed text-[9px] uppercase tracking-widest leading-none mt-0.5">
              {lang === "fr" ? "CLASSE" : "CLASS"}
            </span>
            <span
              className="font-mono text-[9px] tabular-nums leading-none mt-0.5"
              style={{ color: rootAccent.glow }}
            >
              LVL {String(CHARACTER.level).padStart(2, "0")}
            </span>
          </div>

          {/* branch headers */}
          {layout.map((b, i) => {
            const branch = SKILL_BRANCHES[i];
            const a = accent(branch.theme);
            return (
              <motion.div
                key={branch.key}
                initial={{ opacity: 0, scale: reduce ? 1 : 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : i * 0.07 }}
                className="story-focus absolute z-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border-2 px-2 py-1 text-center"
                style={{
                  left: `${b.header.x}%`,
                  top: `${b.header.y}%`,
                  width: "15%",
                  borderColor: a.base,
                  background: isDark ? "rgba(10,10,15,0.85)" : "rgba(255,255,255,0.9)",
                  color: a.glow,
                  boxShadow: `0 0 14px ${a.glow}44`,
                }}
              >
                <span className="font-condensed text-[10px] uppercase tracking-wide leading-tight">
                  {pick(lang, branch.label)}
                </span>
              </motion.div>
            );
          })}

          {/* leaf skill nodes */}
          {layout.map((b, i) => {
            const branch = SKILL_BRANCHES[i];
            const a = accent(branch.theme);
            return (
              <div key={branch.key}>
                {b.leaves.map((lf) => {
                  const skill = branch.skills[lf.j];
                  const Icon = skill.Icon;
                  return (
                    <motion.div
                      key={lf.j}
                      initial={{ opacity: 0, scale: reduce ? 1 : 0.4 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: reduce ? 0 : 0.35,
                        delay: reduce ? 0 : i * 0.07 + 0.2 + lf.j * 0.03,
                      }}
                      whileHover={{ scale: reduce ? 1 : 1.12, zIndex: 30 }}
                      className="story-focus absolute z-10 -translate-x-1/2 -translate-y-1/2 flex w-[8%] flex-col items-center gap-0.5 rounded-lg border p-1 text-center"
                      style={{
                        left: `${lf.x}%`,
                        top: `${lf.y}%`,
                        borderColor: `${a.base}66`,
                        background: isDark ? "rgba(10,10,15,0.82)" : "rgba(255,255,255,0.88)",
                        boxShadow: `0 0 10px ${a.glow}22`,
                      }}
                      title={skill.name}
                    >
                      <span style={{ color: skill.color }} className="inline-flex">
                        <Icon size={13} />
                      </span>
                      <span
                        className={`font-mono text-[8px] leading-tight ${
                          isDark ? "text-stage-silver/90" : "text-stage-charcoal/80"
                        }`}
                      >
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
