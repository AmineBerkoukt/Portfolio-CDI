import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        stage: {
          black: "#0a0a0f",
          velvet: "#0f0f1a",
          red: "#c41e3a",
          "red-glow": "#ff2d55",
          silver: "#c0c0c0",
          azure: "#1a6fe0",
          "azure-glow": "#5aa2ff",
          cream: "#f5f0e6",
          ivory: "#faf8f3",
          charcoal: "#2a2a2a",
          smoke: "#1a1a2e",
        }
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        condensed: ["var(--font-oswald)", "Oswald", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "spotlight-sweep": "spotlightSweep 8s ease-in-out infinite",
        "blink": "blink 4s infinite",
        "float": "float 6s ease-in-out infinite",
        "smoke-drift": "smokeDrift 20s linear infinite",
        "marquee-drop": "marqueeDrop 0.8s ease-out forwards",
        "stamp": "stamp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        "house-flash": "houseFlash 0.4s ease-out forwards",
      },
      keyframes: {
        spotlightSweep: {
          "0%, 100%": { transform: "translateX(-30%) rotate(-15deg)" },
          "50%": { transform: "translateX(30%) rotate(15deg)" },
        },
        blink: {
          "0%, 96%, 100%": { transform: "scaleY(1)" },
          "98%": { transform: "scaleY(0.1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        smokeDrift: {
          "0%": { transform: "translateX(0) translateY(0)" },
          "100%": { transform: "translateX(-50px) translateY(-20px)" },
        },
        marqueeDrop: {
          "0%": { transform: "translateY(-100px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        stamp: {
          "0%": { transform: "scale(3) rotate(-10deg)", opacity: "0" },
          "100%": { transform: "scale(1) rotate(-5deg)", opacity: "1" },
        },
        houseFlash: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
