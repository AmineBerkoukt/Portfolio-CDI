import type { Bi, Lang, ThemeKey } from "./data";

export interface Accent {
  base: string;
  glow: string;
}

export const ACCENTS: Record<ThemeKey, Accent> = {
  academic: { base: "var(--quest-academic)", glow: "var(--quest-academic-glow)" },
  boss: { base: "var(--quest-boss)", glow: "var(--quest-boss-glow)" },
  side: { base: "var(--quest-side)", glow: "var(--quest-side-glow)" },
  recruit: { base: "var(--quest-recruit)", glow: "var(--quest-recruit-glow)" },
  lang: { base: "#eab308", glow: "#fde047" },
  web: { base: "#06b6d4", glow: "#67e8f9" },
  devops: { base: "#8b5cf6", glow: "#c4b5fd" },
  testing: { base: "#10b981", glow: "#6ee7b7" },
  data: { base: "#ef4444", glow: "#fca5a5" },
  sys: { base: "#14b8a6", glow: "#5eead4" },
  method: { base: "#f97316", glow: "#fdba74" },
  ai: { base: "#ec4899", glow: "#f9a8d4" },
};

export const accent = (theme: ThemeKey): Accent => ACCENTS[theme];

/** Pick the right language string from a bilingual object. */
export const pick = (lang: Lang, bi: Bi): string => bi[lang];

/** Smooth-scroll to a section by id (consistent with the main site). */
export const scrollToId = (id: string) => {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};
