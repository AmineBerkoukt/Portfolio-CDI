"use client";

import { useTheme } from "../../components/ThemeProvider";
import { accent } from "../util";
import type { ThemeKey } from "../data";

interface SectionHeadProps {
  kicker: string;
  title: string;
  theme: ThemeKey;
  id?: string;
}

/** Themed section divider (kicker + title framed by accent gradient rules). */
export default function SectionHead({ kicker, title, theme, id }: SectionHeadProps) {
  const { theme: mode } = useTheme();
  const isDark = mode === "dark";
  const a = accent(theme);

  return (
    <div id={id} className="scroll-margin flex items-center gap-4 w-full max-w-6xl mx-auto px-1 mb-6">
      <span
        className="flex-1 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${a.base})` }}
        aria-hidden="true"
      />
      <div className="text-center shrink-0 px-2">
        <p
          className="font-mono text-[10px] tracking-[0.3em] uppercase mb-1"
          style={{ color: a.base }}
        >
          {kicker}
        </p>
        <h2
          className="font-condensed text-xl md:text-3xl uppercase tracking-[0.08em] leading-none"
          style={{ color: isDark ? "#ffffff" : "var(--stage-charcoal)" }}
        >
          {title}
        </h2>
      </div>
      <span
        className="flex-1 h-px"
        style={{ background: `linear-gradient(to left, transparent, ${a.base})` }}
        aria-hidden="true"
      />
    </div>
  );
}
