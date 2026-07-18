"use client";

import { useState } from "react";
import Image from "next/image";
import java17 from "../assets/java17.png";
import oracleDevOps from "../assets/oracle_devops.png";
import java8 from "../assets/java8.png";
import gcpf from "../assets/gcpf.png";
import docker from "../assets/docker.png";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../components/ThemeProvider";
import { useI18n } from "../components/I18nProvider";
import SceneCard from "../components/SceneCard";
import { FiAward, FiX } from "react-icons/fi";

const certList = [
  { key: "oracle17", color: "#F80000", image: java17 },
  { key: "oracleDevOps", color: "#F80000", image: oracleDevOps },
  { key: "oracle8", color: "#F80000", image: java8 },
  { key: "google", color: "#4285F4", image: gcpf },
  { key: "docker", color: "#2496ED", image: docker },
];

export default function CertificationsCard() {
  const { theme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === "dark";
  const [selectedBadge, setSelectedBadge] = useState<typeof certList[0] | null>(null);

  return (
    <>
      <section id="certifications" className="scroll-margin py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-center">
          <SceneCard
            cue={t("certifications.cue") as string}
            title={t("certifications.title") as string}
            initialX={0}
            initialY={0}
            width="w-full max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 gap-4">
              {certList.map((cert, i) => (
                <motion.div
                  key={cert.key}
                  className={`
                    flex items-center gap-4 p-4 rounded-lg
                    ${isDark ? "bg-stage-black/40 border border-stage-red/10" : "bg-stage-ivory/60 border border-stage-azure/25"}
                  `}
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className={`
                      p-3 rounded-full
                      ${isDark ? "bg-stage-red/10" : "bg-stage-azure/20"}
                    `}
                  >
                    <FiAward size={24} style={{ color: cert.color }} />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-mono text-sm ${
                        isDark ? "text-stage-silver" : "text-stage-charcoal"
                      }`}
                    >
                      {t(`certifications.${cert.key}`) as string}
                    </p>
                  </div>
                  <div 
                    className={`hidden md:block relative w-20 h-20 overflow-hidden rounded-lg border cursor-pointer hover:opacity-80 transition-opacity ${isDark ? "border-stage-red/20 bg-stage-black/30" : "border-stage-azure/45 bg-stage-ivory/50"}`}
                    onClick={() => setSelectedBadge(cert)}
                    title="Click to view badge"
                  >
                    <Image
                      src={cert.image}
                      alt={t(`certifications.${cert.key}`) as string}
                      fill
                      sizes="80px"
                      className="object-cover object-center"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </SceneCard>
        </div>
      </section>

      {/* Full screen badge modal */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBadge(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className={`relative max-w-md w-full aspect-square rounded-2xl overflow-hidden shadow-2xl border ${isDark ? "bg-stage-black border-stage-red/30" : "bg-white border-stage-azure/30"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedBadge.image}
                alt={t(`certifications.${selectedBadge.key}`) as string}
                fill
                className="object-contain p-4"
              />
              <button
                onClick={() => setSelectedBadge(null)}
                className={`absolute top-4 right-4 rounded-full w-8 h-8 flex items-center justify-center transition-colors ${isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/10 text-black hover:bg-black/20"}`}
              >
                <FiX size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
