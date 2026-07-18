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
      tagline: "Dual degree Engineer",
      cta: "Download Resume",
      cue: "ACT I — OPENING NIGHT",
      chatBubble: "Recruit me, you won't regret it!",
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
        desc: [
          "Application built with a TDD approach; CI/CD pipeline deployed on an Azure VM.",
        ],
        tech: "Java 17, Spring Boot, Spring Security, Kafka, JUnit, Mockito, TypeScript, Angular, CI/CD, Docker, Azure",
      },
      microservices: {
        title: "Microservices Project — Full Stack Java/Angular Developer",
        desc: [
          "Microservices-based application for training evaluation; synchronous communication via HTTP requests.",
        ],
        tech: "Java 17, Spring Boot, TypeScript, Angular, JUnit, Jira, GitHub, CI/CD, Docker, Azure",
      },
      rag: {
        title: "Agentic RAG & Multimodal RAG (MMRAG)",
        desc: [
          "Developed a multimodal AI assistant capable of leveraging PDF documents, images, audio, and video files as knowledge sources.",
          "Designed an end-to-end RAG pipeline integrating extraction, chunking, vector indexing, and semantic search to improve answer relevance.",
          "Implemented an Agentic RAG workflow enabling the model to dynamically select relevant information before generating responses.",
          "Optimized retrieval performance using vector embeddings and an advanced contextual retrieval strategy.",
          "Improved answer accuracy by reducing hallucinations through systematic enrichment of the context provided to the LLM.",
        ],
        tech: "Python, LangChain, Llama 3.3 70B (Groq Cloud), ChromaDB, SentenceTransformers, FAISS, Hugging Face, Streamlit",
      },
      licensePlate: {
        title: "License Plate Recognition",
        desc: [
          "Developed an automated solution for real-time license plate detection and recognition.",
          "Trained and optimized a detection model capable of recognizing European and North African plates.",
          "Designed a complete image-processing pipeline improving plate quality before OCR recognition.",
          "Optimized reading accuracy through image preprocessing and recognition error correction.",
          "Automated vehicle information extraction to reduce manual intervention.",
        ],
        tech: "Python, YOLOv8, OpenCV, EasyOCR, NumPy",
      },
      cvAdapter: {
        title: "CV Adapter (ATS Optimization)",
        desc: [
          "Developed an AI application capable of automatically tailoring a résumé to a job posting.",
          "Generated ATS-optimized résumés by automatically integrating strategic skills and keywords.",
          "Improved application compatibility with ATS systems while preserving content coherence.",
          "Designed an analysis engine comparing a job posting's requirements with the candidate's profile.",
          "Automated résumé restructuring to increase relevance for each application.",
        ],
        tech: "Python, FastAPI, Llama 3.3 70B (Groq Cloud), LangChain, PDF Processing",
      },
      kidsActivities: {
        title: "Children's Activities Management Platform (DevOps Approach)",
        desc: [
          "Developed a web platform enabling centralized management of activities, registrations, and children's tracking.",
          "Designed an architecture promoting maintainability, collaboration, and continuous deployments.",
          "Automated application deployment to reduce manual intervention and accelerate releases.",
          "Implemented a DevOps approach ensuring delivery quality and reliability.",
          "Deployed the application in a secure cloud environment with full continuous integration.",
        ],
        tech: "Vue.js, Laravel, Docker, Git, GitHub, GitHub Actions, Azure Virtual Machine",
      },
      studentColocation: {
        title: "Student Co-living Platform (DevOps Approach)",
        desc: [
          "Developed a platform connecting students looking for shared accommodation.",
          "Designed a full-stack architecture promoting scalability and separation of concerns.",
          "Automated build, test, and deployment processes through a CI/CD pipeline.",
          "Containerized all services to ensure environment reproducibility.",
          "Deployed the application on the cloud with continuous delivery and simplified maintenance.",
        ],
        tech: "MongoDB, Express.js, React.js, Node.js, Docker, Git, GitHub, GitHub Actions, Azure",
      },
      ecommerce: {
        title: "E-commerce Platform (DevOps Architecture)",
        desc: [
          "Developed a complete e-commerce platform integrating user, product, and order management.",
          "Secured the application with robust authentication and authorization management.",
          "Implemented a comprehensive unit and integration testing strategy ensuring software quality.",
          "Automated the development cycle, from testing to continuous deployment.",
          "Designed an architecture promoting maintainability, reliability, and scalability.",
        ],
        tech: "Spring Boot, Spring Security, Angular, JUnit 5, Mockito, WireMock, Testcontainers, Jasmine, Karma, Docker, GitHub Actions, Azure",
      },
      courselens: {
        title: "CourseLens (Microservices Architecture)",
        desc: [
          "Developed a platform enabling students to evaluate their courses and improve pedagogical tracking.",
          "Designed a microservices architecture facilitating modularity and independent service evolution.",
          "Deployed services in an orchestrated environment ensuring better availability.",
          "Automated testing and deployments through a complete DevOps pipeline.",
          "Implemented a software quality strategy based on unit testing and continuous integration.",
        ],
        tech: "Spring Boot, ASP.NET Core, Angular, Docker, Kubernetes, GitHub Actions, JUnit 5, Mockito, xUnit, Jasmine, Karma",
      },
      examAssistant: {
        title: "AI Exam Preparation Assistant",
        desc: [
          "Developed an AI platform that automatically transforms course materials into interactive learning resources.",
          "Generated intelligent summaries from PDF documents to facilitate revision.",
          "Automated the creation of Q&A and mind maps to enhance learning.",
          "Designed an interface enabling natural-language interaction with documents.",
          "Leveraged language model capabilities to provide personalized student assistance.",
        ],
        tech: "Angular, Laravel, Groq Cloud, Llama 3.3 70B, LangChain",
      },
      voiceCoding: {
        title: "Voice Coding Assistant",
        desc: [
          "Developed an AI assistant capable of generating code from natural-language voice instructions.",
          "Designed an automation chain orchestrating transcription, comprehension, and code generation.",
          "Automated code snippet development to accelerate repetitive tasks.",
          "Integrated advanced language models to produce coherent and contextualized code.",
          "Optimized user experience through fully voice-based interaction with the assistant.",
        ],
        tech: "Spring Boot, Spring AI, n8n, Groq Cloud, Llama 3.3 70B, Whisper",
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
      title: "Contact me",
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
      tagline: "Ingénieur doublement diplomé",
      cta: "Télécharger le CV",
      cue: "ACTE I — PREMIÈRE",
      chatBubble: "Recrutez-moi, vous ne le regretterez pas !",
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
        desc: [
          "Application construite avec une approche TDD ; pipeline CI/CD déployé sur une VM Azure.",
        ],
        tech: "Java 17, Spring Boot, Spring Security, Kafka, JUnit, Mockito, TypeScript, Angular, CI/CD, Docker, Azure",
      },
      microservices: {
        title: "Projet Microservices — Développeur Full Stack Java/Angular",
        desc: [
          "Application basée sur une architecture microservices pour l'évaluation des formations ; communication synchrone via requêtes HTTP.",
        ],
        tech: "Java 17, Spring Boot, TypeScript, Angular, JUnit, Jira, GitHub, CI/CD, Docker, Azure",
      },
      rag: {
        title: "Agentic RAG & Multimodal RAG (MMRAG)",
        desc: [
          "Développé un assistant IA multimodal capable d'exploiter des documents PDF, images, fichiers audio et vidéos comme sources de connaissances.",
          "Conçu un pipeline RAG complet intégrant l'extraction, le découpage, l'indexation vectorielle et la recherche sémantique pour améliorer la pertinence des réponses.",
          "Mis en œuvre un workflow Agentic RAG permettant au modèle de sélectionner dynamiquement les informations pertinentes avant la génération des réponses.",
          "Optimisé les performances des recherches grâce à des embeddings vectoriels et à une stratégie de récupération contextuelle avancée.",
          "Amélioré la précision des réponses en réduisant les hallucinations via un enrichissement systématique du contexte fourni au LLM.",
        ],
        tech: "Python, LangChain, Llama 3.3 70B (Groq Cloud), ChromaDB, SentenceTransformers, FAISS, Hugging Face, Streamlit",
      },
      licensePlate: {
        title: "Reconnaissance de plaques d'immatriculation",
        desc: [
          "Développé une solution automatique de détection et de lecture de plaques d'immatriculation en temps réel.",
          "Entraîné et optimisé un modèle de détection capable de reconnaître des plaques européennes et nord-africaines.",
          "Conçu une chaîne complète de traitement d'image améliorant la qualité des plaques avant reconnaissance OCR.",
          "Optimisé la précision de lecture grâce au prétraitement des images et à la correction des erreurs de reconnaissance.",
          "Automatisé l'extraction des informations des véhicules afin de réduire les interventions manuelles.",
        ],
        tech: "Python, YOLOv8, OpenCV, EasyOCR, NumPy",
      },
      cvAdapter: {
        title: "CV Adapter (Optimisation ATS)",
        desc: [
          "Développé une application IA capable d'adapter automatiquement un CV à une offre d'emploi.",
          "Généré des CV optimisés ATS en intégrant automatiquement les compétences et mots-clés stratégiques.",
          "Amélioré la compatibilité des candidatures avec les systèmes ATS tout en conservant la cohérence du contenu.",
          "Conçu un moteur d'analyse comparant les exigences d'une offre avec le profil du candidat.",
          "Automatisé la restructuration du CV afin d'augmenter sa pertinence pour chaque candidature.",
        ],
        tech: "Python, FastAPI, Llama 3.3 70B (Groq Cloud), LangChain, PDF Processing",
      },
      kidsActivities: {
        title: "Plateforme de gestion d'activités pour enfants (Approche DevOps)",
        desc: [
          "Développé une plateforme web permettant la gestion centralisée des activités, inscriptions et suivi des enfants.",
          "Conçu une architecture favorisant la maintenabilité, la collaboration et les déploiements continus.",
          "Automatisé le déploiement de l'application afin de réduire les interventions manuelles et accélérer les mises en production.",
          "Mis en œuvre une démarche DevOps garantissant la qualité et la fiabilité des livraisons.",
          "Déployé l'application dans un environnement cloud sécurisé avec une intégration continue complète.",
        ],
        tech: "Vue.js, Laravel, Docker, Git, GitHub, GitHub Actions, Azure Virtual Machine",
      },
      studentColocation: {
        title: "Plateforme de colocation étudiante (Approche DevOps)",
        desc: [
          "Développé une plateforme facilitant la mise en relation des étudiants recherchant une colocation.",
          "Conçu une architecture full-stack favorisant la scalabilité et la séparation des responsabilités.",
          "Automatisé les processus de build, tests et déploiement via une pipeline CI/CD.",
          "Conteneurisé l'ensemble des services afin de garantir la reproductibilité des environnements.",
          "Déployé l'application sur le cloud en assurant une livraison continue et une maintenance simplifiée.",
        ],
        tech: "MongoDB, Express.js, React.js, Node.js, Docker, Git, GitHub, GitHub Actions, Azure",
      },
      ecommerce: {
        title: "Plateforme E-commerce (Architecture DevOps)",
        desc: [
          "Développé une plateforme e-commerce complète intégrant la gestion des utilisateurs, produits et commandes.",
          "Sécurisé l'application grâce à une authentification robuste et une gestion des autorisations.",
          "Mis en place une stratégie complète de tests unitaires et d'intégration garantissant la qualité logicielle.",
          "Automatisé le cycle de développement, des tests jusqu'au déploiement continu.",
          "Conçu une architecture favorisant la maintenabilité, la fiabilité et l'évolutivité de l'application.",
        ],
        tech: "Spring Boot, Spring Security, Angular, JUnit 5, Mockito, WireMock, Testcontainers, Jasmine, Karma, Docker, GitHub Actions, Azure",
      },
      courselens: {
        title: "CourseLens (Architecture Microservices)",
        desc: [
          "Développé une plateforme permettant aux étudiants d'évaluer leurs formations et d'améliorer le suivi pédagogique.",
          "Conçu une architecture microservices facilitant la modularité et l'évolution indépendante des services.",
          "Déployé les services dans un environnement orchestré garantissant une meilleure disponibilité.",
          "Automatisé les tests et les déploiements via une pipeline DevOps complète.",
          "Mis en œuvre une stratégie de qualité logicielle reposant sur des tests unitaires et une intégration continue.",
        ],
        tech: "Spring Boot, ASP.NET Core, Angular, Docker, Kubernetes, GitHub Actions, JUnit 5, Mockito, xUnit, Jasmine, Karma",
      },
      examAssistant: {
        title: "Assistant IA de préparation aux examens",
        desc: [
          "Développé une plateforme IA permettant de transformer automatiquement des supports de cours en ressources pédagogiques interactives.",
          "Généré des résumés intelligents à partir de documents PDF afin de faciliter la révision.",
          "Automatisé la création de questions-réponses et de cartes mentales pour améliorer l'apprentissage.",
          "Conçu une interface permettant d'interagir avec les documents en langage naturel.",
          "Exploité les capacités des modèles de langage pour proposer une assistance personnalisée aux étudiants.",
        ],
        tech: "Angular, Laravel, Groq Cloud, Llama 3.3 70B, LangChain",
      },
      voiceCoding: {
        title: "Voice Coding Assistant",
        desc: [
          "Développé un assistant IA capable de générer du code à partir d'instructions vocales en langage naturel.",
          "Conçu une chaîne d'automatisation orchestrant la transcription, la compréhension et la génération de code.",
          "Automatisé le développement de fragments de code afin d'accélérer les tâches répétitives.",
          "Intégré des modèles de langage avancés pour produire du code cohérent et contextualisé.",
          "Optimisé l'expérience utilisateur grâce à une interaction entièrement vocale avec l'assistant.",
        ],
        tech: "Spring Boot, Spring AI, n8n, Groq Cloud, Llama 3.3 70B, Whisper",
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
      title: "Contactez-moi",
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
  toggleLang: () => { },
  t: () => "",
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
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

  return (
    <I18nContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
