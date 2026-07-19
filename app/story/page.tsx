import type { Metadata } from "next";
import StoryApp from "./StoryApp";

export const metadata: Metadata = {
  title: "The Career Quest — Amine BERKOUKT",
  description:
    "Amine BERKOUKT's career, reimagined as a playable RPG journey: world map, levels, skill tree, trophy room and side quests.",
  alternates: {
    canonical: "/story",
  },
  openGraph: {
    title: "The Career Quest — Amine BERKOUKT",
    description:
      "Amine BERKOUKT's career, reimagined as a playable RPG journey: world map, levels, skill tree, trophy room and side quests.",
    url: "/story",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Career Quest — Amine BERKOUKT's RPG Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Career Quest — Amine BERKOUKT",
    description:
      "Amine BERKOUKT's career as a playable RPG journey: world map, skill tree, trophy room and side quests.",
    images: ["/og-image.png"],
  },
};

export default function StoryPage() {
  return <StoryApp />;
}
