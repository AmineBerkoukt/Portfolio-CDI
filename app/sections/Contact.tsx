"use client";

import { motion } from "framer-motion";
import { useTheme } from "../components/ThemeProvider";
import { useI18n } from "../components/I18nProvider";
import { FiLinkedin, FiMail, FiPhone } from "react-icons/fi";

export default function Contact() {
  const { theme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === "dark";

  return (
    <section id="contact" className="scroll-margin py-10 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="section-head" aria-hidden="true">
          <span className="section-title">{t("contact.title") as string}</span>
        </div>
        <motion.div
          className={`
            relative w-full max-w-4xl mx-auto
            ${isDark ? "bg-stage-velvet/80 border border-stage-red/20" : "bg-white/80 border border-stage-azure/45"}
            backdrop-blur-md rounded-xl overflow-hidden
          `}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="p-8 md:p-10">

            <h2
              className={`
                scene-card-title font-serif text-2xl md:text-3xl font-bold mb-6
                ${isDark ? "text-white" : "text-stage-charcoal"}
              `}
            >
              {t("contact.title") as string}
            </h2>

            <div className="space-y-4">
              <motion.a
                href="https://www.linkedin.com/in/amine-berkoukt/"
                target="_blank"
                rel="noreferrer"
                className={`
                  flex items-center gap-3 p-4 rounded-lg border transition-colors
                  ${isDark ? "bg-stage-black/40 border-stage-red/10 hover:border-stage-red/30" : "bg-stage-ivory/60 border-stage-azure/25 hover:border-stage-azure/60"}
                `}
                whileHover={{ x: 4 }}
              >
                <span className={`p-2 rounded-full ${isDark ? "bg-stage-red/10 text-stage-red-glow" : "bg-stage-azure/20 text-stage-azure"}`}>
                  <FiLinkedin size={18} />
                </span>
                <span className={`font-mono text-sm ${isDark ? "text-stage-silver/80" : "text-stage-charcoal/80"}`}>
                  linkedin.com/in/amine-berkoukt/
                </span>
              </motion.a>

              <motion.a
                href="mailto:amine.berkoukt@gmail.com"
                className={`
                  flex items-center gap-3 p-4 rounded-lg border transition-colors
                  ${isDark ? "bg-stage-black/40 border-stage-red/10 hover:border-stage-red/30" : "bg-stage-ivory/60 border-stage-azure/25 hover:border-stage-azure/60"}
                `}
                whileHover={{ x: 4 }}
              >
                <span className={`p-2 rounded-full ${isDark ? "bg-stage-red/10 text-stage-red-glow" : "bg-stage-azure/20 text-stage-azure"}`}>
                  <FiMail size={18} />
                </span>
                <span className={`font-mono text-sm ${isDark ? "text-stage-silver/80" : "text-stage-charcoal/80"}`}>
                  amine.berkoukt@gmail.com
                </span>
              </motion.a>

              <motion.a
                href="tel:+33758102094"
                className={`
                  flex items-center gap-3 p-4 rounded-lg border transition-colors
                  ${isDark ? "bg-stage-black/40 border-stage-red/10 hover:border-stage-red/30" : "bg-stage-ivory/60 border-stage-azure/25 hover:border-stage-azure/60"}
                `}
                whileHover={{ x: 4 }}
              >
                <span className={`p-2 rounded-full ${isDark ? "bg-stage-red/10 text-stage-red-glow" : "bg-stage-azure/20 text-stage-azure"}`}>
                  <FiPhone size={18} />
                </span>
                <span className={`font-mono text-sm ${isDark ? "text-stage-silver/80" : "text-stage-charcoal/80"}`}>
                  +33 7 58 10 20 94
                </span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
