"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

type ShapeSpec = {
  kind: "round" | "triangle" | "hexagon";
  size: number;
  bg: string;
  glow: string;
  eyeGlow: string;
  pupil: string;
  velocityX: number;
  velocityY: number;
  drift: number;
  spin: number;
  eyeSpread: number;
};

const darkShapes: ShapeSpec[] = [
  {
    kind: "round",
    size: 220,
    bg: "radial-gradient(circle at 30% 30%, rgba(255, 77, 109, 0.95), rgba(196, 30, 58, 0.9) 45%, rgba(92, 15, 34, 0.95) 100%)",
    glow: "rgba(255, 77, 109, 0.55)",
    eyeGlow: "rgba(255, 77, 109, 0.95)",
    pupil: "#0a0a0f",
    velocityX: 0.26,
    velocityY: 0.2,
    drift: 0.08,
    spin: 0.006,
    eyeSpread: 0.36,
  },
  {
    kind: "hexagon",
    size: 270,
    bg: "radial-gradient(circle at 30% 28%, rgba(255, 211, 106, 0.98), rgba(212, 175, 55, 0.9) 48%, rgba(110, 78, 12, 0.95) 100%)",
    glow: "rgba(255, 211, 106, 0.48)",
    eyeGlow: "rgba(255, 211, 106, 0.96)",
    pupil: "#090909",
    velocityX: -0.18,
    velocityY: 0.24,
    drift: 0.06,
    spin: -0.004,
    eyeSpread: 0.4,
  },
  {
    kind: "triangle",
    size: 205,
    bg: "radial-gradient(circle at 35% 30%, rgba(135, 191, 255, 0.95), rgba(58, 116, 255, 0.9) 46%, rgba(17, 43, 111, 0.95) 100%)",
    glow: "rgba(135, 191, 255, 0.5)",
    eyeGlow: "rgba(135, 191, 255, 0.94)",
    pupil: "#06101f",
    velocityX: 0.2,
    velocityY: -0.22,
    drift: 0.07,
    spin: 0.004,
    eyeSpread: 0.34,
  },
];

type TruckSceneProps = {
  showRecruitMessage?: boolean;
};

export default function TruckScene({ showRecruitMessage = false }: TruckSceneProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [shapeStates, setShapeStates] = useState(() =>
    darkShapes.map((shape, index) => ({
      x: 18 + index * 31,
      y: 26 + index * 14,
      vx: shape.velocityX,
      vy: shape.velocityY,
      rotate: index % 2 === 0 ? -6 : 6,
    })),
  );
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useEffect(() => {
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (Math.min(32, now - last) / 16.67) * 0.35;
      last = now;
      const viewportWidth = window.innerWidth || 1;
      const viewportHeight = window.innerHeight || 1;

      setShapeStates((current) =>
        current.map((shape, index) => {
          const spec = darkShapes[index];
          const size = spec.size;
          const halfWidthPct = (size / viewportWidth) * 50;
          const halfHeightPct = (size / viewportHeight) * 50;
          const minX = halfWidthPct;
          const maxX = 100 - halfWidthPct;
          const minY = halfHeightPct;
          const maxY = 100 - halfHeightPct;

          let nextX = shape.x + shape.vx * dt;
          let nextY = shape.y + shape.vy * dt;
          let nextVx = shape.vx;
          let nextVy = shape.vy;

          if (nextX <= minX) {
            nextX = minX;
            nextVx = Math.abs(nextVx);
          } else if (nextX >= maxX) {
            nextX = maxX;
            nextVx = -Math.abs(nextVx);
          }

          if (nextY <= minY) {
            nextY = minY;
            nextVy = Math.abs(nextVy);
          } else if (nextY >= maxY) {
            nextY = maxY;
            nextVy = -Math.abs(nextVy);
          }

          return {
            x: nextX,
            y: nextY,
            vx: nextVx,
            vy: nextVy,
            rotate: shape.rotate + spec.spin * 60 * dt,
          };
        }),
      );

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`absolute inset-0 z-0 overflow-hidden ${isDark ? "bg-gradient-to-b from-stage-black via-stage-velvet to-stage-black" : "bg-gradient-to-b from-stage-cream via-stage-ivory to-stage-cream"}`}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.72, 0.95, 0.72] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage:
            isDark
              ? "radial-gradient(circle at 20% 20%, rgba(196, 30, 58, 0.18), transparent 30%), radial-gradient(circle at 80% 30%, rgba(212, 175, 55, 0.16), transparent 28%), radial-gradient(circle at 50% 75%, rgba(255, 255, 255, 0.06), transparent 26%)"
              : "radial-gradient(circle at 18% 20%, rgba(255, 77, 109, 0.12), transparent 30%), radial-gradient(circle at 80% 25%, rgba(58, 116, 255, 0.10), transparent 28%), radial-gradient(circle at 52% 75%, rgba(212, 175, 55, 0.08), transparent 26%)",
        }}
      />

      <div className={`absolute inset-x-0 bottom-0 h-40 ${isDark ? "bg-gradient-to-t from-black/70 to-transparent" : "bg-gradient-to-t from-stage-cream/80 to-transparent"}`} />

      {darkShapes.map((shape, index) => {
        const current = shapeStates[index];
        const eyeDistance = 7;
        const eyeSize = Math.max(22, Math.round(shape.size * 0.13));
        const eyeOffsetX = (mouse.x - current.x) / 100;
        const eyeOffsetY = (mouse.y - current.y) / 100;
        const pupilX = Math.max(-eyeDistance, Math.min(eyeDistance, eyeOffsetX * 16));
        const pupilY = Math.max(-eyeDistance, Math.min(eyeDistance, eyeOffsetY * 16));

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${current.x}%`,
              top: `${current.y}%`,
              width: shape.size,
              height: shape.size,
              marginLeft: -shape.size / 2,
              marginTop: -shape.size / 2,
              transform: `translate3d(0, 0, 0) rotate(${current.rotate}deg)`,
            }}
          >
            <div
              className="relative h-full w-full transition-[transform,filter,box-shadow] duration-500"
              style={{
                clipPath:
                  shape.kind === "triangle"
                    ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                    : shape.kind === "hexagon"
                      ? "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
                      : "none",
                borderRadius: shape.kind === "round" ? "40%" : "0",
                background: isDark
                  ? shape.bg
                  : index === 0
                    ? "radial-gradient(circle at 30% 30%, rgba(255, 143, 163, 0.95), rgba(255, 94, 122, 0.85) 46%, rgba(239, 70, 111, 0.95) 100%)"
                    : index === 1
                      ? "radial-gradient(circle at 30% 30%, rgba(255, 226, 151, 0.96), rgba(244, 191, 72, 0.86) 48%, rgba(220, 163, 28, 0.95) 100%)"
                      : "radial-gradient(circle at 30% 30%, rgba(170, 214, 255, 0.96), rgba(96, 165, 250, 0.86) 46%, rgba(59, 130, 246, 0.95) 100%)",
                boxShadow: `0 0 50px ${shape.glow}, inset 0 0 40px rgba(255,255,255,0.08)`,
                filter: isDark ? "saturate(1.08)" : "saturate(0.96)",
              }}
            >
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[5000ms] ease-out ${showRecruitMessage ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
                style={{
                  color: isDark ? "#fff7d1" : "#1f2937",
                  textShadow: isDark ? `0 0 18px ${shape.eyeGlow}` : "none",
                }}
              >
                <div
                  className="max-w-[78%] rounded-full border px-4 py-2 text-center font-mono text-[10px] md:text-[11px] leading-tight backdrop-blur-md shadow-lg"
                  style={{
                    background: isDark
                      ? "linear-gradient(180deg, rgba(10, 10, 15, 0.7), rgba(10, 10, 15, 0.42))"
                      : "linear-gradient(180deg, rgba(250, 248, 243, 0.96), rgba(250, 248, 243, 0.78))",
                    borderColor: isDark ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.08)",
                    boxShadow: isDark ? `0 0 18px ${shape.eyeGlow}, 0 10px 28px rgba(0,0,0,0.28)` : "0 10px 28px rgba(0,0,0,0.08)",
                    color: isDark ? "#fff7d1" : "#1f2937",
                  }}
                >
                  <span className="whitespace-normal">
                    Recruite me, you won't regret it :)
                  </span>
                </div>
              </div>

              <div
                className="absolute left-1/2 top-[30%] flex items-center justify-center"
                style={{
                  width: Math.round(shape.size * shape.eyeSpread),
                  transform: `translateX(-50%) rotate(${-current.rotate}deg)`,
                }}
              >
                {[0, 1].map((eyeIndex) => (
                  <div
                    key={eyeIndex}
                    className="relative rounded-full bg-white"
                    style={{
                      width: eyeSize,
                      height: eyeSize,
                      boxShadow: isDark ? `0 0 18px ${shape.eyeGlow}` : "0 0 8px rgba(255,255,255,0.2)",
                    }}
                  >
                    <div
                      className="absolute left-1/2 top-1/2 rounded-full"
                      style={{
                        width: Math.round(eyeSize * 0.45),
                        height: Math.round(eyeSize * 0.45),
                        background: shape.pupil,
                        transform: `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`,
                      }}
                    />
                    <div
                      className="absolute left-[58%] top-[30%] rounded-full bg-white/85"
                      style={{ width: Math.max(3, Math.round(eyeSize * 0.12)), height: Math.max(3, Math.round(eyeSize * 0.12)) }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}

      <div className={`absolute inset-0 ${isDark ? "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_55%)]" : "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22),transparent_58%)]"}`} />
    </div>
  );
}
