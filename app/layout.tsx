import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const SITE_URL = "https://berkoukt-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Amine BERKOUKT — Full Stack Java/Angular & DevOps Engineer",
    template: "%s | Amine BERKOUKT",
  },
  description:
    "Portfolio of Amine BERKOUKT, Full Stack Java/Angular & DevOps Engineer. Specialized in Spring Boot, Angular, Docker, Kubernetes, and cloud technologies.",
  keywords: [
    "Amine BERKOUKT",
    "Full Stack Developer",
    "Java Developer",
    "Angular Developer",
    "Spring Boot",
    "DevOps Engineer",
    "Portfolio",
    "Software Engineer",
    "Développeur Full Stack",
    "Ingénieur Logiciel",
    "Docker",
    "Kubernetes",
    "Rennes",
    "France",
  ],
  authors: [{ name: "Amine BERKOUKT", url: SITE_URL }],
  creator: "Amine BERKOUKT",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "Amine BERKOUKT — Portfolio",
    title: "Amine BERKOUKT — Full Stack Java/Angular & DevOps Engineer",
    description:
      "Portfolio of Amine BERKOUKT, Full Stack Java/Angular & DevOps Engineer. Specialized in Spring Boot, Angular, Docker, Kubernetes, and cloud technologies.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Amine BERKOUKT — Full Stack Java/Angular & DevOps Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amine BERKOUKT — Full Stack Java/Angular & DevOps Engineer",
    description:
      "Portfolio of Amine BERKOUKT, Full Stack Java/Angular & DevOps Engineer. Spring Boot, Angular, Docker, Kubernetes.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
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
