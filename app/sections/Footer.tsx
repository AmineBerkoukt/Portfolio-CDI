"use client";

import { useTheme } from "../components/ThemeProvider";
import { useI18n } from "../components/I18nProvider";

export default function Footer() {
  const { theme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === "dark";

  return (
    <footer
      className={`
        py-8 px-4 text-center border-t
        ${isDark ? "border-stage-red/10 bg-stage-black" : "border-stage-gold/10 bg-stage-cream"}
      `}
    >
      <p
        className={`font-mono text-[10px] uppercase tracking-widest ${
          isDark ? "text-stage-silver/40" : "text-stage-charcoal/40"
        }`}
      >
        © {new Date().getFullYear()} Amine BERKOUKT — {t("footer.rights") as string}
      </p>
      <p
        className={`font-mono text-[10px] mt-2 ${
          isDark ? "text-stage-red-glow/30" : "text-stage-gold/30"
        }`}
      >
        {t("footer.built") as string}
      </p>
    </footer>
  );
}
