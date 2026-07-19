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
import Reveal from "./components/Reveal";
import ScrollToTop from "./components/ScrollToTop";

export default function Home() {
  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Amine BERKOUKT",
    jobTitle: "Full Stack Java/Angular & DevOps Engineer",
    url: "https://berkoukt-portfolio.vercel.app",
    sameAs: [
      "https://www.linkedin.com/in/amine-berkoukt",
      "https://github.com/AmineBerkworkt",
    ],
    knowsAbout: [
      "Java", "Spring Boot", "Angular", "Docker", "Kubernetes",
      "DevOps", "CI/CD", "Full Stack Development",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rennes",
      addressCountry: "FR",
    },
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Amine BERKOUKT — Portfolio",
    url: "https://berkoukt-portfolio.vercel.app",
  };

  return (
    <main className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />
      <Header />
      <Hero />
      <div className="relative z-10 space-y-6 pb-16">
        <Reveal><AboutCard /></Reveal>
        <Reveal delay={0.05}><EducationCard /></Reveal>
        <Reveal delay={0.1}><ExperienceCard /></Reveal>
        <Reveal delay={0.15}><ProjectsCard /></Reveal>
        <Reveal delay={0.2}><SkillsCard /></Reveal>
        <Reveal delay={0.25}><CertificationsCard /></Reveal>
        <Reveal delay={0.3}><LanguagesCard /></Reveal>
        <Reveal delay={0.35}><ExtrasCard /></Reveal>
        <Reveal delay={0.4}><Contact /></Reveal>
      </div>
      <Footer />
      <ScrollToTop />
    </main>
  );
}
