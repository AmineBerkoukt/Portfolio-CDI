import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { I18nProvider } from "./components/I18nProvider";
import ModelPreloader from "./components/ModelPreloader";

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
    <html lang="fr" suppressHydrationWarning>
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
