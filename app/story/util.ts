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
