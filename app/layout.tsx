import type { Metadata } from "next";
import { Playfair_Display, Oswald, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { I18nProvider } from "./components/I18nProvider";
import ModelPreloader from "./components/ModelPreloader";

// Self-hosted fonts via next/font — no render-blocking Google request, no FOUT,
// and the woff2 files are hashed + cached by the framework.
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});
const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Amine BERKOUKT — Full Stack Java/Angular & DevOps Engineer",
  description:
    "Portfolio of Amine BERKOUKT, Full Stack Java/Angular & DevOps Engineer. Specialized in Spring Boot, Angular, Docker, Kubernetes, and cloud technologies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${playfair.variable} ${oswald.variable} ${jetbrains.variable}`}
    >
      <body className="antialiased">
        {/* Begins the avatar GLB download at first client render, decoupled
            from the rest of the page so it's ready immediately. */}
        <ModelPreloader />
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
