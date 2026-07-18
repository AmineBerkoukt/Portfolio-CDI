import type { Metadata } from "next";
import StoryApp from "./StoryApp";

export const metadata: Metadata = {
  title: "The Career Quest — Amine BERKOUKT",
  description:
    "Amine BERKOUKT's career, reimagined as a playable RPG journey: world map, levels, skill tree, trophy room and side quests.",
};

export default function StoryPage() {
  return <StoryApp />;
}
