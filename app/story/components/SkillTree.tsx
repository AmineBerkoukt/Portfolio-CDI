"use client";
import { useState, useRef, useEffect } from "react";

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
  const rootAccent = isDark ? accent("recruit") : accent("academic");
  const layout = buildLayout();

  const [activeDomains, setActiveDomains] = useState<Set<number>>(new Set());
  const [hoveredDomain, setHoveredDomain] = useState<number | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const center = () => {
      if (scrollContainerRef.current) {
        const el = scrollContainerRef.current;
        el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
      }
    };
    center();
    const id = setTimeout(center, 150);
    return () => clearTimeout(id);
  }, []);

  const toggleDomain = (index: number, e?: React.MouseEvent) => {
    setActiveDomains((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
        if (e?.currentTarget) {
          const target = e.currentTarget;
          setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
          }, 50);
        }
      }
      return next;
    });
  };

  const toggleAllDomains = () => {
    setActiveDomains((prev) => {
      if (prev.size === SKILL_BRANCHES.length) {
        return new Set();
      }
      return new Set(SKILL_BRANCHES.map((_, i) => i));
    });
  };

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

      <div ref={scrollContainerRef} className="max-w-5xl mx-auto overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none]">
        <div className="relative mx-auto aspect-square w-full max-w-[700px] min-w-[600px] overflow-visible">
          {/* connector + ring layer */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {/* concentric rings */}
            <circle cx={C} cy={C} r={14} fill="none" stroke={ring} strokeWidth={0.4} />
            <circle cx={C} cy={C} r={28} fill="none" stroke={ring} strokeWidth={0.4} />
            {/* pie dividers between branches and conditional 3rd arcs */}
            {SKILL_BRANCHES.map((_, i) => {
              const a = -90 + (i + 0.5) * STEP;
              const ar = (a * Math.PI) / 180;
              const isDomainActive = activeDomains.has(i) || hoveredDomain === i;
              const nextDomainActive = activeDomains.has((i + 1) % SKILL_BRANCHES.length) || hoveredDomain === ((i + 1) % SKILL_BRANCHES.length);
              
              // Divider extends to 47 if this domain or the next domain is active, else 28
              const rDivider = (isDomainActive || nextDomainActive) ? 47 : 28;

              // Arc points for the 3rd ring section (if active)
              const startA = -90 + (i - 0.5) * STEP;
              const startAr = (startA * Math.PI) / 180;
              const x1 = C + 47 * Math.cos(startAr);
              const y1 = C + 47 * Math.sin(startAr);
              const x2 = C + 47 * Math.cos(ar);
              const y2 = C + 47 * Math.sin(ar);

              return (
                <g key={i}>
                  <line
                    x1={C}
                    y1={C}
                    x2={C + rDivider * Math.cos(ar)}
                    y2={C + rDivider * Math.sin(ar)}
                    stroke={ring}
                    strokeWidth={0.3}
                  />
                  {isDomainActive && (
                    <path
                      d={`M ${x1} ${y1} A 47 47 0 0 1 ${x2} ${y2}`}
                      fill="none"
                      stroke={ring}
                      strokeWidth={0.4}
                    />
                  )}
                </g>
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
                  {b.leaves.map((lf, j) => {
                    const isVisible = activeDomains.has(i) || hoveredDomain === i;
                    return (
                      <motion.line
                        key={j}
                        x1={b.header.x}
                        y1={b.header.y}
                        x2={lf.x}
                        y2={lf.y}
                        style={{ ...stroke, ...glow }}
                        initial={false}
                        animate={{ 
                          pathLength: isVisible ? 1 : 0, 
                          opacity: isVisible ? 0.45 : 0 
                        }}
                        transition={{
                          duration: 0.3,
                          delay: isVisible && !reduce ? j * 0.02 : 0,
                        }}
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>

          {/* hub */}
          <motion.button
            className="story-focus absolute left-1/2 top-1/2 z-20 flex h-[13%] w-[13%] flex-col items-center justify-center rounded-full border-2 text-center cursor-pointer"
            style={{
              x: "-50%",
              y: "-50%",
              borderColor: rootAccent.base,
              background: `color-mix(in srgb, ${rootAccent.base} 15%, ${isDark ? "var(--stage-black)" : "var(--stage-cream)"})`,
              color: isDark ? "#fff" : "var(--stage-charcoal)",
            }}
            animate={{
              boxShadow: [
                `0 0 12px color-mix(in srgb, ${rootAccent.glow} 30%, transparent), inset 0 0 10px color-mix(in srgb, ${rootAccent.base} 20%, transparent)`,
                `0 0 35px color-mix(in srgb, ${rootAccent.glow} 90%, transparent), inset 0 0 20px color-mix(in srgb, ${rootAccent.base} 50%, transparent)`,
                `0 0 12px color-mix(in srgb, ${rootAccent.glow} 30%, transparent), inset 0 0 10px color-mix(in srgb, ${rootAccent.base} 20%, transparent)`
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleAllDomains}
            title="Toggle All Skills"
          >
            <FiGitBranch size={16} style={{ color: rootAccent.glow }} />
            <span 
              className="font-condensed text-[10px] uppercase tracking-widest leading-tight mt-1 text-center transition-colors"
              style={{
                color: rootAccent.glow,
                textShadow: `0 0 10px ${rootAccent.glow}88`
              }}
            >
              Amine's<br/>Skills
            </span>
          </motion.button>

          {/* branch headers */}
          {layout.map((b, i) => {
            const branch = SKILL_BRANCHES[i];
            const a = accent(branch.theme);
            const isActive = activeDomains.has(i);
            const isHovered = hoveredDomain === i;
            return (
              <motion.button
                key={branch.key}
                initial={{ opacity: 0, scale: reduce ? 1 : 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : i * 0.07 }}
                className="story-focus absolute z-20 flex items-center justify-center rounded-full border-2 px-2 py-1 text-center cursor-pointer transition-colors"
                style={{
                  left: `${b.header.x}%`,
                  top: `${b.header.y}%`,
                  x: "-50%",
                  y: "-50%",
                  width: "15%",
                  borderColor: a.base,
                  background: (isActive || isHovered) ? a.base : (isDark ? "rgba(10,10,15,0.85)" : "rgba(255,255,255,0.9)"),
                  color: (isActive || isHovered) ? (isDark ? "#fff" : "#000") : a.glow,
                  boxShadow: (isActive || isHovered) ? `0 0 20px ${a.glow}88` : `0 0 14px ${a.glow}44`,
                }}
                onMouseEnter={() => setHoveredDomain(i)}
                onMouseLeave={() => setHoveredDomain(null)}
                onClick={(e) => toggleDomain(i, e)}
              >
                <span className="font-condensed text-[10px] uppercase tracking-wide leading-tight">
                  {pick(lang, branch.label)}
                </span>
              </motion.button>
            );
          })}

          {/* leaf skill nodes */}
          {layout.map((b, i) => {
            const branch = SKILL_BRANCHES[i];
            const a = accent(branch.theme);
            const isVisible = activeDomains.has(i) || hoveredDomain === i;
            return (
              <div key={branch.key}>
                {b.leaves.map((lf) => {
                  const skill = branch.skills[lf.j];
                  const Icon = skill.Icon;
                  return (
                    <motion.div
                      key={lf.j}
                      initial={false}
                      animate={{ 
                        opacity: isVisible ? 1 : 0, 
                        scale: isVisible ? 1 : 0.4,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: isVisible && !reduce ? lf.j * 0.02 : 0,
                      }}
                      whileHover={{ scale: isVisible && !reduce ? 1.08 : 1, zIndex: 30 }}
                      className="story-focus absolute z-10 flex h-9 w-9 items-center justify-center rounded-full border"
                      style={{
                        left: `${lf.x}%`,
                        top: `${lf.y}%`,
                        x: "-50%",
                        y: "-50%",
                        borderColor: `${a.base}99`,
                        background: isDark ? "rgba(10,10,15,0.9)" : "rgba(255,255,255,0.92)",
                        boxShadow: `0 0 12px ${a.glow}33`,
                        pointerEvents: isVisible ? "auto" : "none",
                      }}
                      title={skill.name}
                    >
                      <span style={{ color: skill.color }} className="inline-flex">
                        <Icon size={16} />
                      </span>
                      <span
                        className={`pointer-events-none absolute top-full mt-1 whitespace-nowrap font-mono text-[8px] leading-tight text-center ${isDark ? "text-stage-silver/90" : "text-stage-charcoal/80"
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
