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
    <motion.div
      initial={restoredScroll ? false : { opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${width} ${className}`}
    >
      <motion.div
        className={`
          relative rounded-xl p-6 md:p-8 overflow-hidden mx-auto
          ${isDark ? "bg-stage-velvet/80 border border-stage-red/20" : "bg-white/80 border border-stage-gold/20"}
          backdrop-blur-md
        `}
        style={{
          boxShadow: isDark
            ? "0 18px 40px rgba(0,0,0,0.32)"
            : "0 18px 40px rgba(0,0,0,0.08)",
        }}
      >
        {/* Title */}
        <h2
          className={`
            font-serif text-2xl md:text-3xl font-bold mb-4
            ${isDark ? "text-white" : "text-stage-charcoal"}
          `}
        >
          {title}
        </h2>

        <div>{children}</div>
      </motion.div>
    </motion.div>
  );
}
