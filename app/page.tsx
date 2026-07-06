import Header from "./sections/Header";
import Hero from "./sections/Hero";
import AboutCard from "./sections/AboutCard";
import EducationCard from "./sections/EducationCard";
import ExperienceCard from "./sections/ExperienceCard";
import ProjectsCard from "./sections/ProjectsCard";
import SkillsCard from "./sections/SkillsCard";
import CertificationsCard from "./sections/CertificationsCard";
import LanguagesCard from "./sections/LanguagesCard";
import ExtrasCard from "./sections/ExtrasCard";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <Hero />
      <div className="relative z-10 space-y-8 pb-16">
        <AboutCard />
        <EducationCard />
        <ExperienceCard />
        <ProjectsCard />
        <SkillsCard />
        <CertificationsCard />
        <LanguagesCard />
        <ExtrasCard />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
