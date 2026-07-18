"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

interface SceneCardProps {
  children: React.ReactNode;
  cue: string;
  title: string;
  className?: string;
  initialX?: number;
  initialY?: number;
  width?: string;
}

export default function SceneCard({
  children,
  cue,
  title,
  className = "",
  width = "w-full max-w-2xl",
}: SceneCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [restoredScroll, setRestoredScroll] = useState(false);

  useEffect(() => {
    setRestoredScroll(window.scrollY > 0);
  }, []);

  return (
    <div className="w-full">
      {/* Section heading sitting on a divider line (red in dark, azure in light) */}
      <div className="section-head" aria-hidden="true">
        <span className="section-title">{title}</span>
      </div>

      <motion.div
        initial={restoredScroll ? false : { opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`${width} ${className}`}
      >
        <motion.div
          className={`
            relative rounded-2xl p-6 md:p-8 overflow-hidden mx-auto
            ${isDark ? "bg-stage-velvet/80 border border-stage-red/20" : "bg-white/80 border border-stage-azure/45"}
            backdrop-blur-md
          `}
          style={{
            boxShadow: isDark
              ? "0 18px 40px rgba(0,0,0,0.32)"
              : "0 20px 50px rgba(26,111,224,0.18)",
          }}
        >
          {/* Decorative corner accent */}
          <div
            className={`
              absolute -top-px -left-px w-16 h-16 opacity-60
              ${isDark ? "bg-gradient-to-br from-stage-red/30 to transparent" : "bg-gradient-to-br from-stage-azure/30 to transparent"}
            `}
          />
          {/* Title (hidden — shown on the divider instead) */}
          <h2
            className={`
              scene-card-title h3 mb-4
              ${isDark ? "text-white" : "text-stage-charcoal"}
            `}
          >
            {title}
          </h2>

          <div>{children}</div>
        </motion.div>
      </motion.div>
    </div>
  );
}
