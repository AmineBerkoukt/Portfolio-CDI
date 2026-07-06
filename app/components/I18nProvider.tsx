"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "fr";

interface I18nContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string | string[] | Record<string, string>;
}

const translations = {
  en: {
    nav: {
      about: "About",
      education: "Education",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      certifications: "Certifications",
      languages: "Languages",
      contact: "Contact",
      extras: "Activities",
    },
    hero: {
      name: "Amine BERKOUKT",
      title: "Full Stack Java/Angular & DevOps Engineer",
      tagline: "Full Stack Engineer. Stage lights up. Curtain rises.",
      cta: "Download Resume",
      cue: "ACT I — OPENING NIGHT",
    },
    about: {
      title: "Profile",
      cue: "SCENE 1 — THE PERFORMER",
      content:
        "Specialized in Full Stack development with Spring/Angular, with mastery of fundamental concepts, Agile methodologies and DevOps best practices, seeking an opportunity to put my skills into practice.",
      location: "Rennes (35000), France (National mobility)",
      phone: "+33 7 58 10 20 94",
      email: "amine.berkoukt@gmail.com",
      linkedin: "LinkedIn: Amine BERKOUKT",
      portfolio: "Berkoukt-amine.vercel.app",
    },
    education: {
      title: "Education",
      cue: "SCENE 2 — THE TRAINING",
      master: "Master 2 in Software Development of Information Systems (DOSI)",
      masterSchool: "University of Western Brittany — Brest, France",
      masterDate: "2025–Present",
      engineer: "State Engineer in Computer Science and Software Engineering",
      engineerSchool: "ENSA Tanger — Tangier, Morocco",
      engineerDate: "2021–2026",
    },
    experience: {
      title: "Professional Experience",
      cue: "SCENE 3 — THE ROLES",
      zenika: {
        role: "Full Stack Java/Angular Development Intern",
        company: "Zenika Rennes",
        date: "April 2026 – September 2026",
        items: [
          "End-to-end feature development on a ferry + accommodation package booking tunnel",
          "Implementation of microservices in hexagonal architecture",
          "Development and design of responsive and reactive user interfaces",
          "Participation in ScrumBan ceremonies: Daily, Sprint Planning, Event Storming, Retrospective",
          "Application of SOLID principles and Clean Code for maintainability, scalability and code quality",
          "Writing unit and integration tests with JUnit, Mockito and WireMock",
        ],
        tech: "Java 25, Spring Boot, Angular 20, RxJs, Docker, Kubernetes, JUnit, WireMock, Git, GitLab CI/CD, Jira",
      },
      sqli: {
        role: "Full Stack Java/Angular Development Intern",
        company: "SQLI Rabat",
        date: "July 2024 – August 2024",
        items: [
          "Design and development of a leave and medical visit management application",
          "Participation in Agile/Scrum ceremonies: Sprint Planning, Daily Meeting, Backlog",
          "Application of SOLID principles, Clean Code and Design Patterns",
          "Setting up a CI/CD pipeline for build, test and deployment",
          "Creation of Shell scripts for Docker container deployment on an Azure VM",
        ],
        tech: "Spring Boot, Angular, Jira, JUnit, Docker, Git, GitLab, CI/CD, Microsoft Azure",
      },
      ormva: {
        role: "Software Engineering Intern",
        company: "ORMVA Loukkos",
        date: "Internship",
        items: [
          "Design and development of a web-based personnel management application (CRUD)",
        ],
        tech: "Java, HTML5, CSS3, JavaScript, PHP, SQL, MySQL",
      },
    },
    projects: {
      title: "Academic Projects",
      cue: "SCENE 4 — THE PRODUCTIONS",
      devops: {
        title: "DevOps Project — Full Stack Java/Angular Developer",
        date: "June 2023 – August 2023",
        desc: "Application with TDD approach; CI/CD pipeline on Azure VM.",
        tech: "Java 17, Spring Boot, Spring Security, Kafka, JUnit, Mockito, TypeScript, Angular, CI/CD, Docker, Azure",
      },
      microservices: {
        title: "Microservices Project — Full Stack Java/Angular Developer",
        desc: "Microservices-based application for training evaluation; synchronous communication via HTTP requests.",
        tech: "Java 17, Spring Boot, TypeScript, Angular, JUnit, Jira, GitHub, CI/CD, Docker, Azure",
      },
    },
    skills: {
      title: "Skills",
      cue: "SCENE 5 — THE TOOLKIT",
      languages: "Programming Languages",
      web: "Web Development",
      devops: "DevOps",
      testing: "Testing & Quality",
      databases: "Databases",
      sysadmin: "System Administration",
      methodologies: "Methodologies",
    },
    certifications: {
      title: "Certifications",
      cue: "SCENE 6 — THE CREDENTIALS",
      oracle17: "Oracle Certified Professional: Java SE 17 Developer (June 2026)",
      oracleDevOps: "Oracle Cloud Infrastructure 2025 Certified DevOps Professional (April 2026)",
      oracle8: "Oracle Certified Associate: Java SE 8 Programmer (February 2025)",
      google: "Google Cloud Fundamentals: Core Infrastructure",
      docker: "Docker Foundations Professional Certificate (December 2025)",
    },
    languages: {
      title: "Languages",
      cue: "SCENE 7 — THE DIALECTS",
      french: "French: Fluent (B2)",
      english: "English: Fluent",
      arabic: "Arabic: Native",
    },
    extras: {
      title: "Extracurricular Activities",
      cue: "SCENE 8 — BEHIND THE SCENES",
      items: [
        "Backend Workshop Animator for DevOps Project",
        "Photography Manager and Member of the relations cell for the regional event TOP SPEAKER 2023",
      ],
    },
    contact: {
      title: "Backstage Pass",
      cue: "GET IN TOUCH",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      success: "APPROVED",
      successMsg: "Your message has been received. The show goes on!",
      error: "The show must go on — try again",
      placeholderName: "Your name",
      placeholderEmail: "your.email@example.com",
      placeholderMessage: "Your message...",
    },
    footer: {
      rights: "All rights reserved.",
      built: "Built with Next.js, Three.js, and theatrical flair.",
    },
  },
  fr: {
    nav: {
      about: "Profil",
      education: "Éducation",
      experience: "Expérience",
      projects: "Projets",
      skills: "Compétences",
      certifications: "Certifications",
      languages: "Langues",
      contact: "Contact",
      extras: "Parascolaires",
    },
    hero: {
      name: "Amine BERKOUKT",
      title: "Ingénieur en Développement Full Stack Java/Angular et DevOps",
      cta: "Télécharger le CV",
      cue: "ACTE I — PREMIÈRE",
    },
    about: {
      title: "Profil",
      cue: "SCÈNE 1 — L'ARTISTE",
      content:
        "Spécialisé dans le développement Full Stack en Spring/Angular, avec une maîtrise des concepts fondamentaux, des méthodologies Agiles et des bonnes pratiques DevOps, recherche une opportunité afin de mettre en pratique ses acquis.",
      location: "Rennes (35000), France (Mobilité nationale)",
      phone: "+33 7 58 10 20 94",
      email: "amine.berkoukt@gmail.com",
      linkedin: "LinkedIn: Amine BERKOUKT",
      portfolio: "Berkoukt-amine.vercel.app",
    },
    education: {
      title: "Parcours Scolaire",
      cue: "SCÈNE 2 — LA FORMATION",
      master: "Master 2 en Développement Logiciel des Systèmes d'Information (DOSI)",
      masterSchool: "Université de Bretagne Occidentale — Brest, France",
      masterDate: "2025–En cours",
      engineer: "Ingénieur d'État en Génie Informatique et Logiciel",
      engineerSchool: "ENSA Tanger — Tanger, Maroc",
      engineerDate: "2021–2026",
    },
    experience: {
      title: "Expériences Professionnelles",
      cue: "SCÈNE 3 — LES RÔLES",
      zenika: {
        role: "Stagiaire Développement Full Stack Java/Angular",
        company: "Zenika Rennes",
        date: "Avril 2026 – Septembre 2026",
        items: [
          "Développement de fonctionnalités de bout en bout sur un tunnel de réservation d'un package ferry + hébergement",
          "Implémentation de microservices en architecture hexagonale",
          "Développement et conception des interfaces utilisateur responsives et réactives",
          "Participation aux cérémonies ScrumBan : Daily, Sprint Planning, Event Storming, Rétrospective",
          "Application des principes SOLID et Clean Code pour la maintenabilité, la scalabilité et la qualité du code",
          "Écriture de tests unitaires et d'intégration avec JUnit, Mockito et WireMock",
        ],
        tech: "Java 25, Spring Boot, Angular 20, RxJs, Docker, Kubernetes, JUnit, WireMock, Git, GitLab CI/CD, Jira",
      },
      sqli: {
        role: "Stagiaire Développement Full Stack Java/Angular",
        company: "SQLI Rabat",
        date: "Juillet 2024 – Août 2024",
        items: [
          "Conception et développement d'une application de gestion des congés et des visites médicales",
          "Participation aux cérémonies Agile/Scrum : Sprint Planning, Daily Meeting, Backlog",
          "Application des principes SOLID, Clean Code et des Design Patterns",
          "Mise en place d'un pipeline CI/CD pour le build, le test et le déploiement",
          "Création de scripts Shell pour le déploiement de conteneurs Docker sur une VM Azure",
        ],
        tech: "Spring Boot, Angular, Jira, JUnit, Docker, Git, GitLab, CI/CD, Microsoft Azure",
      },
      ormva: {
        role: "Stagiaire Génie Logiciel",
        company: "ORMVA Loukkos",
        date: "Stage",
        items: [
          "Conception et développement d'une application web de gestion du personnel (CRUD)",
        ],
        tech: "Java, HTML5, CSS3, JavaScript, PHP, SQL, MySQL",
      },
    },
    projects: {
      title: "Projets Académiques",
      cue: "SCÈNE 4 — LES PRODUCTIONS",
      devops: {
        title: "Projet DevOps — Développeur Full Stack Java/Angular",
        date: "Juin 2023 – Août 2023",
        desc: "Application avec approche TDD; pipeline CI/CD sur VM Azure.",
        tech: "Java 17, Spring Boot, Spring Security, Kafka, JUnit, Mockito, TypeScript, Angular, CI/CD, Docker, Azure",
      },
      microservices: {
        title: "Projet Microservices — Développeur Full Stack Java/Angular",
        desc: "Application basée sur une architecture microservices pour l'évaluation des formations; communication synchrone via requêtes HTTP.",
        tech: "Java 17, Spring Boot, TypeScript, Angular, JUnit, Jira, GitHub, CI/CD, Docker, Azure",
      },
    },
    skills: {
      title: "Compétences",
      cue: "SCÈNE 5 — L'OUTILLAGE",
      languages: "Langages de Programmation",
      web: "Développement Web",
      devops: "DevOps",
      testing: "Tests & Qualité",
      databases: "Bases de données",
      sysadmin: "Administration système",
      methodologies: "Méthodologies",
    },
    certifications: {
      title: "Certifications",
      cue: "SCÈNE 6 — LES CREDENTIALS",
      oracle17: "Oracle Certified Professional: Java SE 17 Developer (Juin 2026)",
      oracleDevOps: "Oracle Cloud Infrastructure 2025 Certified DevOps Professional (Avril 2026)",
      oracle8: "Oracle Certified Associate: Java SE 8 Programmer (Février 2025)",
      google: "Google Cloud Fundamentals: Core Infrastructure",
      docker: "Docker Foundations Professional Certificate (Décembre 2025)",
    },
    languages: {
      title: "Langues",
      cue: "SCÈNE 7 — LES DIALECTES",
      french: "Français : Courant (B2)",
      english: "Anglais : Courant",
      arabic: "Arabe : Langue maternelle",
    },
    extras: {
      title: "Expériences Parascolaires",
      cue: "SCÈNE 8 — COULISSES",
      items: [
        "Animateur d'Atelier Backend pour Projet DevOps",
        "Responsable de la Photographie et Membre de la cellule de relations de l'évènement régional TOP SPEAKER édition 2023",
      ],
    },
    contact: {
      title: "Passe Coulisse",
      cue: "FINALE — CONTACT",
      name: "Nom",
      email: "Email",
      message: "Message",
      send: "Envoyer",
      success: "APPROUVÉ",
      successMsg: "Votre message a été reçu. Le spectacle continue !",
      error: "Le spectacle doit continuer — réessayez",
      placeholderName: "Votre nom",
      placeholderEmail: "votre.email@exemple.com",
      placeholderMessage: "Votre message...",
    },
    footer: {
      rights: "Tous droits réservés.",
      built: "Construit avec Next.js, Three.js et une touche théâtrale.",
    },
  },
};

const I18nContext = createContext<I18nContextType>({
  lang: "fr",
  toggleLang: () => {},
  t: () => "",
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("lang") as Lang;
    if (saved) setLang(saved);
  }, []);

  const toggleLang = () => {
    const newLang = lang === "fr" ? "en" : "fr";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = translations[lang];
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }
    return value;
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <I18nContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
