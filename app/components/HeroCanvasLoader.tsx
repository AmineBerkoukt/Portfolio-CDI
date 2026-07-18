"use client";

import { useTheme } from "./ThemeProvider";

/** Lightweight loader shown while the 3D canvas chunk or GLB is loading. */
export default function HeroCanvasLoader() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div
          className={`h-10 w-10 animate-spin rounded-full border-4 ${
            isDark
              ? "border-stage-red/30 border-t-stage-red"
              : "border-stage-azure/30 border-t-stage-azure"
          }`}
        />
        <span
          className={`font-mono text-[11px] tracking-wide ${
            isDark ? "text-stage-silver" : "text-stage-charcoal/70"
          }`}
        >
          Loading something fancy ✨
        </span>
      </div>
    </div>
  );
}
