"use client";

import { useTheme } from "../components/ThemeProvider";
import { useI18n } from "../components/I18nProvider";

export default function Footer() {
  const { theme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === "dark";
  const footerRights = t("footer.rights") as string;
  const footerBuilt = t("footer.built") as string;

  return (
    <footer
      className={`
        py-8 px-4 text-center border-t
        ${isDark ? "border-stage-red/10 bg-stage-black" : "border-stage-azure/25 bg-stage-cream"}
      `}
    >
      <p
        className={`font-mono text-[10px] uppercase tracking-widest ${isDark ? "text-stage-silver/40" : "text-stage-charcoal/40"
          }`}
      >
        © {new Date().getFullYear()} Amine BERKOUKT — {footerRights}
      </p>
    </footer>
  );
}
