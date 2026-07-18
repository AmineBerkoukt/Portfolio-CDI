"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../components/ThemeProvider";
import { useI18n } from "../components/I18nProvider";
import type { HeroPointer } from "../components/Hero3DCanvas";
import Hero3DCanvas from "../components/Hero3DCanvas";
import HeroCanvasLoader from "../components/HeroCanvasLoader";
import { FiDownload, FiZap } from "react-icons/fi";
import Link from "next/link";

export default function Hero() {
  const { theme } = useTheme();
  const { t, lang } = useI18n();
  const isDark = theme === "dark";

  const sectionRef = useRef<HTMLElement | null>(null);
  // Whether the user is hovering the "Download Resume" button.
  const [ctaHovered, setCtaHovered] = useState(false);
  // Latest pointer position (normalized to [-1, 1]) shared with the 3D canvas
  // without triggering re-renders on every mouse move.
  const pointer = useRef<HeroPointer>({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointer.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
    };
  };

  const resetPointer = () => {
    pointer.current = { x: 0, y: 0 };
  };

  const titleWords = (t("hero.title") as string).split(" ");
  const heroName = t("hero.name") as string;
  const heroCta = t("hero.cta") as string;
  const heroTagline = t("hero.tagline");
  const hasTagline = typeof heroTagline === "string" && heroTagline.length > 0;

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative flex items-start overflow-x-hidden pt-20"
    >
      {/* Ambient theatrical glow — sits behind the split content. */}
      <div
        className={`absolute inset-0 -z-10 ${isDark
            ? "bg-gradient-to-b from-stage-black via-stage-velvet to-stage-black"
            : "bg-gradient-to-b from-stage-cream via-stage-ivory to-stage-cream"
          }`}
      />
      {/* Portfolio grid pattern overlay — subtle structural texture */}
      <div
        className={`pointer-events-none absolute inset-0 -z-10 opacity-[0.03] ${isDark ? "bg-white" : "bg-black"
          }`}
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          backgroundPosition: 'center center',
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        animate={{ opacity: [0.6, 0.85, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage: isDark
            ? "radial-gradient(circle at 18% 25%, rgba(196, 30, 58, 0.16), transparent 32%), radial-gradient(circle at 82% 30%, rgba(168, 85, 247, 0.14), transparent 30%), radial-gradient(circle at 60% 80%, rgba(34, 211, 238, 0.10), transparent 30%)"
            : "radial-gradient(circle at 18% 25%, rgba(255, 77, 109, 0.10), transparent 32%), radial-gradient(circle at 82% 30%, rgba(168, 85, 247, 0.10), transparent 30%), radial-gradient(circle at 60% 80%, rgba(34, 211, 238, 0.08), transparent 30%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-8 px-6 py-6 md:py-8 lg:grid-cols-2 lg:gap-10 lg:py-8">
        {/* LEFT — text / introduction */}
        <div className="text-left">
          <h1
            className={`h1 ${isDark ? "text-white text-glow" : "text-stage-charcoal"
              }`}
          >
            {heroName}
          </h1>

          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
            {titleWords.map((word, i) => (
              <span
                key={i}
                className={`text-xl uppercase tracking-wider md:text-2xl lg:text-3xl ${isDark ? "text-stage-silver" : "text-stage-charcoal/80"
                  }`}
              >
                {word}
              </span>
            ))}
          </div>

          {hasTagline && (
            <p
              className={`mt-4 break-words max-w-[400px] font-mono text-base leading-tight ${isDark ? "text-stage-silver/80" : "text-stage-charcoal/70"
                }`}
            >
              {heroTagline}
            </p>
          )}

          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: isDark
                  ? ["0 0 15px rgba(196,30,58,0.4)", "0 0 35px rgba(255,45,85,0.8)", "0 0 15px rgba(196,30,58,0.4)"]
                  : ["0 0 15px rgba(26,111,224,0.4)", "0 0 30px rgba(90,162,255,0.8)", "0 0 15px rgba(26,111,224,0.4)"]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className={`rounded-full border overflow-hidden ${isDark ? "bg-stage-red border-stage-red-glow" : "bg-stage-azure border-stage-azure-glow"
                }`}
            >
              <Link
                href="/story"
                className="inline-flex items-center gap-3 px-8 py-3.5 font-condensed text-[17px] uppercase tracking-[0.15em] text-white"
              >
                <FiZap size={18} />
                {lang === "fr" ? "CV en jeu vidéo" : "CV as a game"}
              </Link>
            </motion.div>

            <motion.a
              href="/assets/resume.pdf"
              download="Amine-Berkoukt-Resume.pdf"
              className={`inline-flex items-center gap-3 cue-button rounded-full px-6 py-3 ${isDark
                  ? "bg-stage-red/20 text-white border border-stage-red/40 hover:bg-stage-red/30"
                  : "cue-button-light bg-stage-azure/10 text-stage-charcoal border border-stage-azure/40 hover:bg-stage-azure/20"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              onTouchStart={() => setCtaHovered(true)}
              onTouchEnd={() => setCtaHovered(false)}
            >
              <FiDownload size={16} />
              <span className="font-condensed uppercase tracking-widest text-sm">{heroCta}</span>
            </motion.a>
          </div>
        </div>

        {/* RIGHT — interactive 3D avatar canvas */}
        <div className="relative h-[55vh] w-full min-h-[420px] lg:h-[80vh]">
          {/* Existing radial tint */}
          <div
            className={`pointer-events-none absolute inset-0 rounded-3xl ${isDark
                ? "bg-[radial-gradient(circle_at_center,rgba(196,30,58,0.08),transparent_60%)]"
                : "bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08),transparent_60%)]"
              }`}
          />

          {/* ── Light-mode azure motifs ── */}
          {!isDark && (
            <>
              {/* Soft azure glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 55%, rgba(26,111,224,0.28) 0%, transparent 55%)",
                }}
              />

              {/* Concentric rings */}
              <div
                className="pointer-events-none absolute rounded-full border-2 border-stage-azure/30"
                style={{
                  width: "70%",
                  height: "70%",
                  top: "15%",
                  left: "15%",
                }}
              />
              <div
                className="pointer-events-none absolute rounded-full border border-stage-azure/20"
                style={{
                  width: "90%",
                  height: "90%",
                  top: "5%",
                  left: "5%",
                }}
              />
              <div
                className="pointer-events-none absolute rounded-full border border-dashed border-stage-azure/20"
                style={{
                  width: "50%",
                  height: "50%",
                  top: "25%",
                  left: "25%",
                }}
              />

              {/* Floating dots */}
              <div
                className="pointer-events-none absolute h-3 w-3 rounded-full bg-stage-azure/50 animate-float"
                style={{ top: "18%", left: "22%" }}
              />
              <div
                className="pointer-events-none absolute h-2.5 w-2.5 rounded-full bg-stage-azure-glow/55 animate-float"
                style={{ top: "72%", right: "18%", animationDelay: "2s" }}
              />
              <div
                className="pointer-events-none absolute h-3.5 w-3.5 rounded-full bg-stage-azure/40 animate-float"
                style={{ top: "35%", right: "12%", animationDelay: "4s" }}
              />
              <div
                className="pointer-events-none absolute h-2.5 w-2.5 rounded-full bg-stage-azure-glow/45 animate-float"
                style={{ bottom: "22%", left: "16%", animationDelay: "1s" }}
              />
              <div
                className="pointer-events-none absolute h-3 w-3 rounded-full bg-stage-azure/45 animate-float"
                style={{ top: "55%", left: "10%", animationDelay: "3s" }}
              />

              {/* Small cross accents */}
              <div
                className="pointer-events-none absolute font-mono text-stage-azure/40 text-xl select-none"
                style={{ top: "12%", right: "25%" }}
              >
                +
              </div>
              <div
                className="pointer-events-none absolute font-mono text-stage-azure/35 text-base select-none"
                style={{ bottom: "18%", left: "28%" }}
              >
                +
              </div>
            </>
          )}

          <Hero3DCanvas pointerRef={pointer} showBubble={ctaHovered} />
        </div>
      </div>
    </section>
  );
}
