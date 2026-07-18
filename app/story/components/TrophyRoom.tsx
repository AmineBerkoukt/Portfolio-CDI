"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../components/ThemeProvider";
import { useI18n } from "../../components/I18nProvider";
import { TROPHIES, UI } from "../data";
import { pick } from "../util";
import SectionHead from "./SectionHead";
import { FiAward, FiX } from "react-icons/fi";

import java17 from "../../assets/java17.png";
import oracleDevOps from "../../assets/oracle_devops.png";
import java8 from "../../assets/java8.png";
import gcpf from "../../assets/gcpf.png";
import docker from "../../assets/docker.png";

const IMAGES = {
  java17,
  oracleDevOps,
  java8,
  google: gcpf,
  docker,
} as const;

export default function TrophyRoom() {
  const { theme } = useTheme();
  const { lang } = useI18n();
  const isDark = theme === "dark";
  const [selected, setSelected] = useState<(typeof TROPHIES)[0] | null>(null);

  return (
    <section className="py-10 px-4 md:px-8">
      <SectionHead
        id="trophies"
        kicker={pick(lang, UI.trophies)}
        title={pick(lang, UI.trophies)}
        theme="boss"
      />
      <p className={`text-center font-mono text-xs uppercase tracking-widest mb-8 ${isDark ? "text-stage-silver/50" : "text-stage-charcoal/50"}`}>
        {pick(lang, UI.trophiesSub)}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {TROPHIES.map((t, i) => (
          <motion.button
            key={t.key}
            onClick={() => setSelected(t)}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`story-focus text-left rounded-xl p-4 border flex items-center gap-4 backdrop-blur-md ${
              isDark ? "bg-stage-velvet/70 border-stage-red/15" : "bg-white/70 border-stage-azure/40"
            }`}
          >
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
              style={{ background: `${t.color}1f`, color: t.color }}
            >
              <FiAward size={24} />
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[11px] uppercase tracking-widest mb-0.5" style={{ color: t.color }}>
                {pick(lang, t.issuer)}
              </span>
              <span className={`block font-mono text-[12px] leading-snug ${isDark ? "text-stage-silver" : "text-stage-charcoal"}`}>
                {pick(lang, t.name)}
              </span>
              <span className={`block font-mono text-[10px] mt-1 ${isDark ? "text-stage-silver/50" : "text-stage-charcoal/50"}`}>
                {pick(lang, t.date)}
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className={`relative max-w-md w-full aspect-square rounded-2xl overflow-hidden shadow-2xl border ${
                isDark ? "bg-stage-black border-stage-red/30" : "bg-white border-stage-azure/30"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={IMAGES[selected.image]}
                alt={pick(lang, selected.name)}
                fill
                className="object-contain p-4"
              />
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className={`absolute top-4 right-4 rounded-full w-8 h-8 flex items-center justify-center transition-colors ${
                  isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/10 text-black hover:bg-black/20"
                }`}
              >
                <FiX size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
