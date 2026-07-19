import type { ComponentType } from "react";
import {
  SiSpring, SiAngular, SiReact, SiDocker, SiKubernetes,
  SiGit, SiGithub, SiGitlab, SiTerraform, SiAnsible,
  SiNginx, SiLinux, SiMysql, SiPostgresql, SiMongodb,
  SiRedis, SiPostman, SiJira, SiApachekafka, SiTypescript,
  SiJavascript, SiHtml5, SiPhp, SiC, SiCplusplus,
  SiPython, SiFastapi, SiStreamlit, SiVuedotjs, SiLaravel,
  SiNodedotjs, SiExpress, SiDotnet, SiJunit5,
  SiGnubash,
} from "react-icons/si";
import {
  FaJava, FaCss3Alt, FaDatabase, FaBug, FaMicrosoft, FaRobot, FaBrain, FaMagic
} from "react-icons/fa";
import {
  FiZap, FiGitBranch, FiLink, FiCpu, FiImage, FiEye,
  FiMic, FiBox, FiPackage, FiActivity, FiRefreshCw, FiRepeat,
  FiCamera, FiFileText, FiSmile, FiHome, FiShoppingCart, FiMonitor, FiEdit3, FiServer, FiLayers,
} from "react-icons/fi";

export type Lang = "fr" | "en";

/* Official Microsoft C# logo (real vector paths from the Microsoft C# brand). */
const CSharpIcon = ({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    viewBox="0 0 128 128"
    width={size}
    height={size}
    className={className}
    role="img"
    aria-label="C#"
    fill="currentColor"
  >
    <path d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z" />
    <path d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z" />
    <path d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6zM97 66.2l.9-4.3h-4.2v-4.7h5.1L100 51h4.9l-1.2 6.1h3.8l1.2-6.1h4.8l-1.2 6.1h2.4v4.7h-3.3l-.9 4.3h4.2v4.7h-5.1l-1.2 6h-4.9l1.2-6h-3.8l-1.2 6h-4.8l1.2-6h-2.4v-4.7H97zm4.8 0h3.8l.9-4.3h-3.8l-.9 4.3z" />
  </svg>
);
export type Bi = { fr: string; en: string };
export type ThemeKey = "academic" | "boss" | "side" | "recruit" | "lang" | "web" | "devops" | "testing" | "data" | "sys" | "method" | "ai";
export type LevelStatus = "completed" | "ongoing" | "current";

export interface TechItem {
  name: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
  color: string;
}

/* ---- Tech registry (canonical name -> icon + brand color) ---- */
const T: Record<string, TechItem> = {
  Java: { name: "Java", Icon: FaJava, color: "#007396" },
  JavaScript: { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  C: { name: "C", Icon: SiC, color: "#A8B9CC" },
  "C++": { name: "C++", Icon: SiCplusplus, color: "#00599C" },
  "C#": { name: "C#", Icon: CSharpIcon, color: "#68217A" },
  Spring: { name: "Spring", Icon: SiSpring, color: "#6DB33F" },
  "Spring Boot": { name: "Spring Boot", Icon: SiSpring, color: "#6DB33F" },
  "Spring Security": { name: "Spring Security", Icon: SiSpring, color: "#6DB33F" },
  "Spring AI": { name: "Spring AI", Icon: SiSpring, color: "#6DB33F" },
  Angular: { name: "Angular", Icon: SiAngular, color: "#DD0031" },
  "Angular 20": { name: "Angular 20", Icon: SiAngular, color: "#DD0031" },
  React: { name: "React", Icon: SiReact, color: "#61DAFB" },
  "React.js": { name: "React.js", Icon: SiReact, color: "#61DAFB" },
  HTML5: { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
  CSS3: { name: "CSS3", Icon: FaCss3Alt, color: "#1572B6" },
  PHP: { name: "PHP", Icon: SiPhp, color: "#777BB4" },
  Docker: { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  Kubernetes: { name: "Kubernetes", Icon: SiKubernetes, color: "#326CE5" },
  Git: { name: "Git", Icon: SiGit, color: "#F05032" },
  GitHub: { name: "GitHub", Icon: SiGithub, color: "#181717" },
  "GitLab CI/CD": { name: "GitLab CI/CD", Icon: SiGitlab, color: "#FC6D26" },
  "GitLab": { name: "GitLab", Icon: SiGitlab, color: "#FC6D26" },
  "CI/CD": { name: "CI/CD", Icon: FiZap, color: "#FBBF24" },
  Azure: { name: "Microsoft Azure", Icon: FaMicrosoft, color: "#0078D4" },
  Jira: { name: "Jira", Icon: SiJira, color: "#0052CC" },
  JUnit: { name: "JUnit", Icon: SiJunit5, color: "#25A162" },
  RxJs: { name: "RxJS", Icon: FiRepeat, color: "#B7178C" },
  WireMock: { name: "WireMock", Icon: FiBox, color: "#0F53B6" },
  Kafka: { name: "Kafka", Icon: SiApachekafka, color: "#231F20" },
  Terraform: { name: "Terraform", Icon: SiTerraform, color: "#7B42BC" },
  Ansible: { name: "Ansible", Icon: SiAnsible, color: "#EE0000" },
  NGINX: { name: "NGINX", Icon: SiNginx, color: "#009639" },
  Linux: { name: "Linux", Icon: SiLinux, color: "#FCC624" },
  Shell: { name: "Shell", Icon: SiGnubash, color: "#4EAA25" },
  MySQL: { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  PostgreSQL: { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  MongoDB: { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  Redis: { name: "Redis", Icon: SiRedis, color: "#DC382D" },
  "Oracle DB": { name: "Oracle DB", Icon: FaDatabase, color: "#F80000" },
  Postman: { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
  Mockito: { name: "Mockito", Icon: FaBug, color: "#52B415" },
  Python: { name: "Python", Icon: SiPython, color: "#3776AB" },
  FastAPI: { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
  LangChain: { name: "LangChain", Icon: FiLink, color: "#1C3C3C" },
  "Groq Cloud": { name: "Groq Cloud", Icon: FiCpu, color: "#F55036" },
  "Llama 3.3 70B": { name: "Llama 3.3 70B", Icon: FiCpu, color: "#C2A4F2" },
  Streamlit: { name: "Streamlit", Icon: SiStreamlit, color: "#FF4B4B" },
  "ChromaDB / FAISS": { name: "ChromaDB / FAISS", Icon: FaDatabase, color: "#7C3AED" },
  "YOLOv8": { name: "YOLOv8", Icon: FiImage, color: "#00FFBB" },
  OpenCV: { name: "OpenCV", Icon: FiEye, color: "#5C3EE8" },
  EasyOCR: { name: "EasyOCR", Icon: FiEye, color: "#8B5CF6" },
  "Vue.js": { name: "Vue.js", Icon: SiVuedotjs, color: "#42B883" },
  Laravel: { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
  "Node.js": { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  "Express.js": { name: "Express.js", Icon: SiExpress, color: "#888888" },
  "ASP.NET Core": { name: "ASP.NET Core", Icon: SiDotnet, color: "#512BD4" },
  n8n: { name: "n8n", Icon: FiBox, color: "#EA4B71" },
  Whisper: { name: "Whisper", Icon: FiMic, color: "#10A37F" },
  Testcontainers: { name: "Testcontainers", Icon: FiPackage, color: "#1A6FE0" },
  "Machine Learning": { name: "Machine Learning", Icon: FaBrain, color: "#FF6F00" },
  "Deep Learning": { name: "Deep Learning", Icon: FaBrain, color: "#4B0082" },
  "Generative AI": { name: "Generative AI", Icon: FaMagic, color: "#2E8B57" },
  "Prompt Engineering": { name: "Prompt Engineering", Icon: FiZap, color: "#8B4513" },
  "IA Agents": { name: "IA Agents", Icon: FaRobot, color: "#4682B4" },
  "Generic Tool": { name: "Tool", Icon: FiBox, color: "#94A3B8" },
};

const tech = (...names: string[]): TechItem[] =>
  names.map((n) => T[n] ?? T["Generic Tool"]);

/* ---- Campaign stages (the career as a 6-stage playthrough) ---- */
export type NodeKind = "level" | "boss";

export interface CareerItem {
  id: string;
  kind: NodeKind;
  title: Bi;
  period?: Bi;
  blurb: Bi;
  status: LevelStatus;
  loot?: Bi[];
  tech?: TechItem[];
  bossTag?: boolean; // boss-fight styling (heavier border/glow + BOSS tag)
  tensionMeter?: boolean; // code-review / CI-CD "tension meter" gag
  warm?: boolean; // warmer "life boss" tone (adapting to a new country)
  finalBoss?: boolean; // final, still-unresolved boss
}

export interface Stage {
  id: string;
  num: string;
  kicker: Bi;
  title: Bi;
  blurb?: Bi;
  org: Bi;
  period: Bi;
  theme: ThemeKey;
  status: LevelStatus;
  /* Map node coordinates (percentage of the map panel). x: 8..92, y: 8..92 */
  node: { x: number; y: number };
  items: CareerItem[];
}

export const STAGES: Stage[] = [
  /* ============ STAGE 1 ============ */
  {
    id: "stage-1",
    num: "01",
    kicker: { fr: "CHAPITRE 01", en: "CHAPTER 01" },
    title: { fr: "La Forge de l'Ingénieur", en: "The Engineer's Forge" },
    blurb: {
      fr: "Là où tout commence. Cinq années à forger les fondations — des classes prépa qui aiguisent l'esprit, jusqu'à la porte rare du double diplôme, et enfin le cycle d'ingénieur qui transforme un étudiant en développeur. Le tutoriel qui n'en avait pas l'air.",
      en: "Where it all begins. Five years spent forging the fundamentals — from the preparatory classes that sharpen the mind, through the rare dual-degree gate, to the engineering cycle that turns a student into a developer. The tutorial that never felt like one."
    },
    org: { fr: "École Nationale des Sciences de l'Ingénieur — Tanger, Maroc", en: "National School of Engineering — Tangier, Morocco" },
    period: { fr: "2021 – 2026", en: "2021 – 2026" },
    theme: "academic",
    status: "completed",
    node: { x: 14, y: 15 },
    items: [
      {
        id: "s1-prepas",
        kind: "level",
        title: { fr: "Classes Préparatoires", en: "Preparatory Classes" },
        period: { fr: "2021 – 2023 · 2 ans", en: "2021 – 2023 · 2 yrs" },
        blurb: {
          fr: "Deux années intensives de fondations — mathématiques, physique et raisonnement algorithmique — avant de se spécialiser. L'arc d'entraînement qui forge les stats de base avant que le vrai chemin d'ingénieur ne s'ouvre.",
          en: "Two intensive foundation years — math, physics and algorithmic reasoning — before specializing. The training arc that builds core stats before the real engineering path opens up.",
        },
        loot: [
          { fr: "Algorithmique", en: "Algorithms" },
          { fr: "Mathématiques", en: "Mathematics" },
          { fr: "Physique", en: "Physics" },
          { fr: "Raisonnement", en: "Reasoning" },
        ],
        tech: tech("C", "C++", "Java"),
        status: "completed",
      },
      {
        id: "s1-gate",
        kind: "boss",
        bossTag: true,
        title: { fr: "La Porte du Double Diplôme", en: "The Dual-Degree Gate" },
        blurb: {
          fr: "Sélectionné parmi les premiers étudiants à rejoindre la filière internationale de double diplôme. Un sas rare et ultra-compétitif que seule une poignée de joueurs franchit.",
          en: "Selected as one of the first students able to join the international dual-degree track. A rare, competitive gate that only a small number of players get through.",
        },
        loot: [
          { fr: "Double Diplôme International Débloqué", en: "International Dual Degree Unlocked" },
        ],
        status: "completed",
      },
      {
        id: "s1-cycle",
        kind: "level",
        title: { fr: "Cycle d'Ingénieur en Génie Informatique", en: "Software Engineering Degree Cycle" },
        period: { fr: "2023 – 2026 · 3 ans", en: "2023 – 2026 · 3 yrs" },
        blurb: {
          fr: "Le cycle d'ingénieur au cœur — génie logiciel, systèmes et spécialisation qui transforment les stats de base en vrais skills full-stack.",
          en: "The core engineering cycle — software engineering, systems, and specialization coursework that turns foundational stats into real full-stack skills.",
        },
        loot: [
          { fr: "Génie Logiciel", en: "Software Engineering" },
          { fr: "Systèmes", en: "Systems" },
          { fr: "Spécialisation", en: "Specialization" },
        ],
        tech: tech("Java", "C", "C++", "HTML5", "CSS3", "JavaScript", "MySQL"),
        status: "completed",
      },
    ],
  },

  /* ============ STAGE 2 ============ */
  {
    id: "stage-2",
    num: "02",
    kicker: { fr: "CHAPITRE 02", en: "CHAPTER 02" },
    title: { fr: "Prologue", en: "Prologue" },
    blurb: {
      fr: "Le tout premier stage et la découverte du monde de l'entreprise. Une introduction vitale à son fonctionnement, au travail d'équipe, et le tout premier contact direct avec du code en milieu professionnel.",
      en: "The very first internship and the discovery of the corporate world. A vital introduction to how enterprises work, teamwork, and the first direct contact with code in a professional environment."
    },
    org: { fr: "ORMVA du Loukkos — Stage", en: "ORMVA Loukkos — Internship" },
    period: { fr: "Premier contact pro", en: "First Pro Contact" },
    theme: "boss",
    status: "completed",
    node: { x: 40, y: 20 },
    items: [
      {
        id: "s2-fundamentals",
        kind: "level",
        title: { fr: "Bases de l'ingénierie logicielle", en: "Fundamentals of Software Engineering" },
        blurb: {
          fr: "Langages de programmation, première vraie application CRUD, premiers pas dans le code professionnel.",
          en: "Programming languages, first real CRUD application, first taste of professional code.",
        },
        loot: [
          { fr: "Première App CRUD", en: "First CRUD App" },
          { fr: "Code Professionnel", en: "Professional Code" },
        ],
        tech: tech("PHP", "MySQL", "HTML5", "CSS3", "JavaScript"),
        status: "completed",
      },
      {
        id: "s2-dsa",
        kind: "boss",
        bossTag: true,
        title: { fr: "Structures de Données & Algorithmes", en: "Data Structures & Algorithms" },
        blurb: {
          fr: "Le défi initiatique classique que chaque ingénieur doit vaincre.",
          en: "The classic rite-of-passage challenge every engineer has to clear.",
        },
        loot: [
          { fr: "Algorithmes Maîtrisés", en: "Algorithms Mastered" },
        ],
        status: "completed",
      },
    ],
  },

  /* ============ STAGE 3 ============ */
  {
    id: "stage-3",
    num: "03",
    kicker: { fr: "CHAPITRE 03", en: "CHAPTER 03" },
    title: { fr: "Le Creuset Fullstack", en: "The Fullstack Crucible" },
    blurb: {
      fr: "L'arbre de compétences explose : Design Patterns, DevOps, CI/CD. Mais la vraie épreuve n'est pas le code — c'est l'attente. Le pipeline qui tourne, la revue qui approche, la jauge de tension qui monte jusqu'au vert libérateur.",
      en: "The skill tree explodes open: Design Patterns, DevOps, CI/CD. But the real trial isn't the code — it's the wait. The pipeline running, the review looming, the tension meter climbing toward that green pass."
    },
    org: { fr: "SQLI — Rabat, Maroc", en: "SQLI — Rabat, Morocco" },
    period: { fr: "Juillet – Août 2024", en: "July – August 2024" },
    theme: "boss",
    status: "completed",
    node: { x: 70, y: 16 },
    items: [
      {
        id: "s3-fullstack",
        kind: "level",
        title: { fr: "Développement Full Stack Java/Angular", en: "Java/Angular Full-Stack Development" },
        blurb: {
          fr: "Design Patterns, DevOps, CI/CD, « tous les trucs stylés » — le moment où l'arbre de compétences s'ouvre vraiment.",
          en: "Design Patterns, DevOps, CI/CD, 'all the fancy stuff' — the moment the skill tree really opens up.",
        },
        loot: [
          { fr: "Design Patterns", en: "Design Patterns" },
          { fr: "DevOps", en: "DevOps" },
          { fr: "CI/CD", en: "CI/CD" },
        ],
        tech: tech("Spring Boot", "Angular", "Jira", "JUnit", "Docker", "Git", "GitLab CI/CD", "Azure"),
        status: "completed",
      },
      {
        id: "s3-pipeline",
        kind: "boss",
        bossTag: true,
        tensionMeter: true,
        title: { fr: "Revue de Code & Pipeline en cours", en: "Code Review & Pipeline Running" },
        blurb: {
          fr: "L'énergie du dev qui sue en regardant un pipeline CI/CD tourner dans l'attente d'une revue de code. La jauge de tension monte…",
          en: "The sweating-dev energy of watching a CI/CD pipeline run while waiting on a code review. The tension meter climbs…",
        },
        loot: [
          { fr: "Pipeline Vert ✔", en: "Pipeline Green ✔" },
          { fr: "Revue Validée", en: "Review Approved" },
        ],
        status: "completed",
      },
    ],
  },

  /* ============ STAGE 4 ============ */
  {
    id: "stage-4",
    num: "04",
    kicker: { fr: "CHAPITRE 04", en: "CHAPTER 04" },
    title: { fr: "L'Autre Rive", en: "The Far Shore" },
    blurb: {
      fr: "Traverser une frontière ne se joue pas qu'en logistique. Un nouveau pays, un nouveau rythme, et un boss qui ne se bat pas avec du code : s'adapter, tenir, trouver ses repères — avant que les cours et les projets ne redeviennent un terrain familier.",
      en: "Crossing a border isn't just logistics. A new country, a new rhythm, and a boss you can't fight with code: adapting, holding on, finding your footing — before lectures and projects become familiar ground again."
    },
    org: { fr: "Université de Bretagne Occidentale — Brest", en: "University of Western Brittany — Brest" },
    period: { fr: "2025 – 2026", en: "2025 – 2026" },
    theme: "academic",
    status: "ongoing",
    node: { x: 88, y: 40 },
    items: [
      {
        id: "s4-adapt",
        kind: "boss",
        bossTag: true,
        warm: true,
        title: { fr: "S'adapter à un nouveau pays", en: "Adapting to a New Country" },
        blurb: {
          fr: "Déménager à l'étranger, tout semble différent, la nostalgie du pays. Un vrai combat de boss de la vie, pas seulement technique.",
          en: "Moving abroad, everything feels different, missing home — an honest life boss fight, not just a technical one.",
        },
        loot: [
          { fr: "Nouvelles Racines", en: "New Roots" },
          { fr: "Résilience", en: "Resilience" },
        ],
        status: "completed",
      },
      {
        id: "s4-rhythm",
        kind: "level",
        title: { fr: "Cours, projets & trouver son rythme", en: "Lectures, Projects & Finding a Rhythm" },
        blurb: {
          fr: "Le calme après la tempête, une fois le boss d'adaptation vaincu.",
          en: "The calm-after-the-storm level once the adaptation boss is cleared.",
        },
        loot: [
          { fr: "Projets", en: "Projects" },
          { fr: "Rythme", en: "Rhythm" },
        ],
        tech: tech("Java", "Spring Boot", "Angular", "Docker", "Kubernetes"),
        status: "ongoing",
      },
    ],
  },

  /* ============ STAGE 5 ============ */
  {
    id: "stage-5",
    num: "05",
    kicker: { fr: "CHAPITRE 05", en: "CHAPTER 05" },
    title: { fr: "La Dernière Chasse", en: "The Last Hunt" },
    blurb: {
      fr: "Avant de jouer, il faut décrocher le ticket d'entrée. Candidatures, silences, refus, entretiens — la chasse avant la récompense. Puis vient l'épreuve finale de la formation : livrer en conditions réelles, sans filet.",
      en: "Before you can play, you have to earn the ticket in. Applications, silence, rejection, interviews — the hunt before the reward. Then comes training's final trial: shipping for real, with no safety net."
    },
    org: { fr: "Zenika Rennes — Stage", en: "Zenika Rennes — Internship" },
    period: { fr: "2026", en: "2026" },
    theme: "boss",
    status: "ongoing",
    node: { x: 64, y: 64 },
    items: [
      {
        id: "s5-hunt",
        kind: "boss",
        bossTag: true,
        title: { fr: "Décrocher un Stage", en: "Seeking the Internship" },
        blurb: {
          fr: "Le grind de candidatures, refus et entretiens avant de décrocher le bon.",
          en: "The grind of applications, rejections, and interviews before landing one.",
        },
        loot: [
          { fr: "Stage Décroché", en: "Internship Secured" },
        ],
        status: "completed",
      },
      {
        id: "s5-internship",
        kind: "level",
        title: { fr: "Le Stage en lui-même", en: "The Internship Itself" },
        period: { fr: "Avril – Sept 2026", en: "April – Sept 2026" },
        blurb: {
          fr: "Mettre en pratique tout ce qui a été appris.",
          en: "Putting everything learned into practice.",
        },
        loot: [
          { fr: "Livraison en conditions réelles", en: "Real-World Delivery" },
        ],
        tech: tech("Java", "Spring Boot", "Angular 20", "RxJs", "Docker", "Kubernetes", "JUnit", "WireMock", "Git", "GitLab CI/CD", "Jira"),
        status: "ongoing",
      },
    ],
  },

  /* ============ STAGE 6 — BIG BOSS ============ */
  {
    id: "stage-6",
    num: "06",
    kicker: { fr: "CHAPITRE 06 · BIG BOSS", en: "CHAPTER 06 · BIG BOSS" },
    title: { fr: "Le Seuil du Monde Réel", en: "The Threshold of the Real World" },
    blurb: {
      fr: "Le vrai big boss, celui pour lequel tout le reste n'était qu'entraînement. Pas de checkpoint, pas de guide de stratégie tout fait. La carte s'arrête ici — pour l'instant — en attendant le coup qui la termine.",
      en: "The real big boss — the one everything else was training for. No checkpoint, no strategy guide. The map ends here — for now — waiting on the hit that finishes it."
    },
    org: { fr: "Le Marché du Travail", en: "The Job Market" },
    period: { fr: "2026 →", en: "2026 →" },
    theme: "recruit",
    status: "current",
    node: { x: 32, y: 84 },
    items: [
      {
        id: "s6-job",
        kind: "boss",
        bossTag: true,
        finalBoss: true,
        title: { fr: "Décrocher un Emploi", en: "Seeking a Job" },
        blurb: {
          fr: "Le big boss, encore en cours. La grande confrontation de toute la carte — pas encore vaincue.",
          en: "The current, ongoing big boss battle. The big boss of the whole map — not yet defeated.",
        },
        loot: [
          { fr: "À débloquer…", en: "To be unlocked…" },
        ],
        status: "current",
      },
    ],
  },
];

/* ---- Side quests (personal & academic projects) ---- */
export interface SideQuest {
  id: string;
  title: Bi;
  blurb: Bi;
  tech: string[];
  Icon: ComponentType<{ size?: number; className?: string }>;
}

export const SIDE_QUESTS: SideQuest[] = [
  {
    id: "rag",
    title: { fr: "Agentic RAG & Multimodal RAG (MMRAG)", en: "Agentic RAG & Multimodal RAG (MMRAG)" },
    blurb: {
      fr: "Assistant IA multimodal sur PDF, images, audio et vidéo avec un pipeline RAG agentique.",
      en: "Multimodal AI assistant over PDFs, images, audio and video with an Agentic RAG pipeline.",
    },
    tech: ["Python", "LangChain", "Llama 3.3 70B", "ChromaDB / FAISS", "Streamlit"],
    Icon: FaBrain,
  },
  {
    id: "plate",
    title: { fr: "Reconnaissance de plaques", en: "License Plate Recognition" },
    blurb: {
      fr: "Détection et OCR de plaques en temps réel (européennes et nord-africaines).",
      en: "Real-time plate detection & OCR for EU and North-African plates.",
    },
    tech: ["Python", "YOLOv8", "OpenCV", "EasyOCR"],
    Icon: FiCamera,
  },
  {
    id: "cv",
    title: { fr: "CV Adapter (Optimisation ATS)", en: "CV Adapter (ATS Optimization)" },
    blurb: {
      fr: "Outil IA qui adapte un CV à chaque offre pour optimiser le passage des ATS.",
      en: "AI tool that tailors a résumé to each posting for ATS optimization.",
    },
    tech: ["Python", "FastAPI", "Llama 3.3 70B", "LangChain"],
    Icon: FiFileText,
  },
  {
    id: "kids",
    title: { fr: "Plateforme d'activités enfant", en: "Children's Activities Platform" },
    blurb: {
      fr: "Gestion centralisée des activités, inscriptions et suivi des enfants (approche DevOps).",
      en: "Centralized management of kids' activities, registrations and tracking (DevOps approach).",
    },
    tech: ["Vue.js", "Laravel", "Docker", "Azure"],
    Icon: FiSmile,
  },
  {
    id: "coloc",
    title: { fr: "Plateforme de colocation étudiante", en: "Student Roommate Platform" },
    blurb: {
      fr: "Met en relation les étudiants cherchant une colocation, avec CI/CD complet.",
      en: "Connects students seeking shared accommodation, with full CI/CD.",
    },
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Docker", "Azure"],
    Icon: FiHome,
  },
  {
    id: "ecom",
    title: { fr: "Plateforme E-commerce", en: "E-commerce Platform" },
    blurb: {
      fr: "Plateforme e-commerce complète avec suite de tests complète et auth sécurisée.",
      en: "Full e-commerce app with comprehensive test suite and secure auth.",
    },
    tech: ["Spring Boot", "Angular", "Testcontainers", "Docker", "Azure"],
    Icon: FiShoppingCart,
  },
  {
    id: "courselens",
    title: { fr: "CourseLens", en: "CourseLens" },
    blurb: {
      fr: "Plateforme microservices d'évaluation des cours pour le retour étudiant.",
      en: "Microservices course-evaluation platform for student feedback.",
    },
    tech: ["Spring Boot", "ASP.NET Core", "Angular", "Kubernetes"],
    Icon: FiMonitor,
  },
  {
    id: "exam",
    title: { fr: "Assistant IA de révision", en: "AI Exam-Prep Assistant" },
    blurb: {
      fr: "Transforme des cours en résumés, Q/R et cartes mentales interactives.",
      en: "Turns course materials into summaries, Q&A and mind maps.",
    },
    tech: ["Angular", "Laravel", "Groq Cloud", "LangChain"],
    Icon: FiEdit3,
  },
  {
    id: "voice",
    title: { fr: "Voice Coding Assistant", en: "Voice Coding Assistant" },
    blurb: {
      fr: "Génère du code à partir d'instructions vocales en langage naturel.",
      en: "Generates code from natural-language voice commands.",
    },
    tech: ["Spring Boot", "Spring AI", "n8n", "Whisper"],
    Icon: FiMic,
  },
  {
    id: "devops-p",
    title: { fr: "Projet DevOps académique", en: "DevOps Academic Project" },
    blurb: {
      fr: "Application en TDD avec un pipeline CI/CD déployé sur une VM Azure.",
      en: "TDD-built app with a CI/CD pipeline deployed on an Azure VM.",
    },
    tech: ["Java", "Spring Security", "Kafka", "Docker", "Azure"],
    Icon: FiServer,
  },
  {
    id: "micro-p",
    title: { fr: "Projet Microservices académique", en: "Microservices Academic Project" },
    blurb: {
      fr: "Outil d'évaluation des formations en architecture microservices.",
      en: "Training-evaluation tool in a microservices architecture.",
    },
    tech: ["Java", "Spring Boot", "Angular", "Docker", "Azure"],
    Icon: FiLayers,
  },
];

/* ---- Skill tree ---- */
export interface SkillBranch {
  key: string;
  label: Bi;
  theme: ThemeKey;
  skills: TechItem[];
}

export const SKILL_BRANCHES: SkillBranch[] = [
  {
    key: "languages",
    label: { fr: "Langages", en: "Languages" },
    theme: "lang",
    skills: tech("Java", "JavaScript", "TypeScript", "C", "C++", "C#"),
  },
  {
    key: "web",
    label: { fr: "Développement Web", en: "Web Dev" },
    theme: "web",
    skills: tech("Spring", "Spring Boot", "Spring Security", "Spring AI", "Angular", "React.js", "Express.js", "Laravel"),
  },
  {
    key: "devops",
    label: { fr: "DevOps", en: "DevOps" },
    theme: "devops",
    skills: tech("Docker", "Kubernetes", "Git", "GitHub", "GitLab", "Terraform", "Ansible", "Azure"),
  },
  {
    key: "testing",
    label: { fr: "Tests & Qualité", en: "Testing & Quality" },
    theme: "testing",
    skills: tech("JUnit", "Postman", "Mockito", "WireMock"),
  },
  {
    key: "databases",
    label: { fr: "Bases de données", en: "Databases" },
    theme: "data",
    skills: tech("MySQL", "PostgreSQL", "MongoDB", "Redis", "Oracle DB"),
  },
  {
    key: "sysadmin",
    label: { fr: "Admin Système", en: "Sys Admin" },
    theme: "sys",
    skills: tech("Linux", "NGINX", "Shell"),
  },
  {
    key: "methodology",
    label: { fr: "Méthodologie", en: "Methodology" },
    theme: "method",
    skills: tech("Jira", "Kafka", "Generic Tool", "Generic Tool"),
  },
  {
    key: "ai",
    label: { fr: "Intelligence Artificielle", en: "Artificial Intelligence" },
    theme: "ai",
    skills: tech("Machine Learning", "Deep Learning", "Prompt Engineering", "Generative AI", "IA Agents"),
  },
];

/* Methodology leaves are conceptual — give them readable labels + neutral icons. */
SKILL_BRANCHES[6].skills = [
  { name: "Agile / Scrum", Icon: FiActivity, color: "#009FDA" },
  { name: "Kanban", Icon: FiActivity, color: "#E84C3D" },
  { name: "SOLID", Icon: FiRefreshCw, color: "#F7DF1E" },
];

/* ---- Trophy room (certifications) ---- */
export interface Trophy {
  key: string;
  name: Bi;
  issuer: Bi;
  date: Bi;
  color: string;
  image: "java17" | "oracleDevOps" | "java8" | "google" | "docker";
}

export const TROPHIES: Trophy[] = [
  {
    key: "oracle17",
    name: { fr: "Oracle Certified Professional: Java SE 17 Developer", en: "Oracle Certified Professional: Java SE 17 Developer" },
    issuer: { fr: "Oracle", en: "Oracle" },
    date: { fr: "Juin 2026", en: "June 2026" },
    color: "#F80000",
    image: "java17",
  },
  {
    key: "oracleDevOps",
    name: { fr: "OCI 2025 Certified DevOps Professional", en: "Oracle Cloud Infrastructure 2025 Certified DevOps Professional" },
    issuer: { fr: "Oracle", en: "Oracle" },
    date: { fr: "Avril 2026", en: "April 2026" },
    color: "#F80000",
    image: "oracleDevOps",
  },
  {
    key: "oracle8",
    name: { fr: "Oracle Certified Associate: Java SE 8 Programmer", en: "Oracle Certified Associate: Java SE 8 Programmer" },
    issuer: { fr: "Oracle", en: "Oracle" },
    date: { fr: "Février 2025", en: "February 2025" },
    color: "#F80000",
    image: "java8",
  },
  {
    key: "google",
    name: { fr: "Google Cloud Fundamentals: Core Infrastructure", en: "Google Cloud Fundamentals: Core Infrastructure" },
    issuer: { fr: "Google Cloud", en: "Google Cloud" },
    date: { fr: "Juin 2026", en: "June 2026" },
    color: "#4285F4",
    image: "google",
  },
  {
    key: "docker",
    name: { fr: "Docker Foundations Professional Certificate", en: "Docker Foundations Professional Certificate" },
    issuer: { fr: "Docker", en: "Docker" },
    date: { fr: "Décembre 2025", en: "December 2025" },
    color: "#2496ED",
    image: "docker",
  },
];

/* ---- Character / recruit info ---- */
export const CHARACTER = {
  name: "Amine BERKOUKT",
  playerClass: {
    fr: "Ingénieur Full Stack Java/Angular & DevOps",
    en: "Full Stack Java/Angular & DevOps Engineer",
  },
  level: 1,
  xpYears: 0.8,
  xpLabel: { fr: "AN D'EXPÉRIENCE", en: "YEAR OF XP" },
  location: { fr: "Rennes (35000), France", en: "Rennes (35000), France" },
  mobility: { fr: "Mobilité nationale", en: "Open to national mobility" },
};

export const RECRUIT = {
  email: "amine.berkoukt@gmail.com",
  phone: "+33 7 58 10 20 94",
  phoneHref: "tel:+33758102094",
  linkedin: "https://www.linkedin.com/in/amine-berkoukt/",
  linkedinHandle: "amine-berkoukt",
  languages: [
    { name: "Français", level: { fr: "Courant (B2)", en: "Fluent (B2)" } },
    { name: "English", level: { fr: "Courant", en: "Fluent" } },
    { name: "العربية", level: { fr: "Langue maternelle", en: "Native" } },
  ],
  offMap: [
    {
      fr: "Animateur d'atelier Backend pour un projet DevOps étudiant",
      en: "Backend workshop facilitator for a DevOps student project",
    },
    {
      fr: "Responsable photo & relations — événement régional TOP SPEAKER 2023",
      en: "Photography lead & event relations crew — TOP SPEAKER 2023 regional event",
    },
  ],
};

export const RESUME_URL = "/assets/resume.pdf";

/* UI chrome labels (bilingual) */
export const UI = {
  backToStage: { fr: "Retour au Portfolio", en: "Back to Portfolio" },
  loot: { fr: "BUTIN & RÉCOMPENSES", en: "LOOT & REWARDS" },
  equipped: { fr: "ÉQUIPEMENT", en: "EQUIPPED ITEMS" },
  boss: { fr: "COMBAT DE BOSS", en: "BOSS / MILESTONE" },
  status: {
    completed: { fr: "TERMINÉ", en: "COMPLETED" },
    ongoing: { fr: "EN COURS", en: "ONGOING" },
    current: { fr: "EN COURS", en: "IN PROGRESS" },
  },
  worldMap: { fr: "CARTE DU MONDE", en: "WORLD MAP" },
  worldMapSub: {
    fr: "Sélectionnez un chapitre pour revivre l'arc",
    en: "Select a chapter to replay the campaign",
  },
  stage: { fr: "CHAPITRE", en: "CHAPTER" },
  campaign: { fr: "JOURNAL DE CAMPAGNE", en: "CAMPAIGN LOG" },
  campaignSub: {
    fr: "Chaque chapitre défile comme un niveau",
    en: "Each chapter scrolls in like a level",
  },
  sideQuests: { fr: "QUÊTES SECONDAIRES", en: "SIDE QUESTS" },
  sideQuestsSub: {
    fr: "Projets personnels & académiques — le tableau des quêtes",
    en: "Personal & academic projects — the quest board",
  },
  skillTree: { fr: "ARBE DES COMPÉTENCES", en: "SKILL TREE" },
  skillTreeSub: {
    fr: "Survolez ou touchez les branches pour révéler les compétences",
    en: "Hover or tap the branches to reveal unlocked skills",
  },
  trophies: { fr: "SALLE DES TROPHÉES", en: "TROPHY ROOM" },
  trophiesSub: {
    fr: "Certifications & badges débloqués",
    en: "Certifications & badges unlocked",
  },
  recruit: { fr: "RECRUTEZ AMINE", en: "RECRUIT AMINE" },
  recruitSub: { fr: "Envoyez un signal", en: "Send a Signal" },
  characterSheet: { fr: "Télécharger la Fiche Perso", en: "Download Character Sheet" },
  startQuest: { fr: "Commencer l'aventure", en: "Begin the Quest" },
  titleScreen: { fr: "LA QUÊTE CARRIÈRE", en: "THE CAREER QUEST" },
  titleSub: {
    fr: "Le parcours d'Amine, joué chapitre par chapitre",
    en: "Amine's journey, played chapter by chapter",
  },
  guildLanguages: { fr: "Langues de la Guilde", en: "Guild Languages" },
  offMapTitle: { fr: "Activités Hors-Carte", en: "Off-Map Activities" },
  send: { fr: "Envoyer le signal", en: "Send Signal" },
  name: { fr: "Nom", en: "Name" },
  email: { fr: "Email", en: "Email" },
  message: { fr: "Message", en: "Message" },
  placeholderName: { fr: "Votre nom", en: "Your name" },
  placeholderEmail: { fr: "vous@exemple.com", en: "you@example.com" },
  placeholderMessage: { fr: "Votre message...", en: "Your message..." },
  signalSent: { fr: "SIGNAL ÉMIS", en: "SIGNAL SENT" },
  hudNav: { fr: "NAVIGATION", en: "NAVIGATION" },
  hudQuests: { fr: "QUÊTES", en: "QUESTS" },
  tension: { fr: "JAUGE DE TENSION", en: "TENSION METER" },
  tensionNote: {
    fr: "Pipeline à 92 %… en attente de la revue de code",
    en: "Pipeline at 92%… awaiting code review",
  },
  lifeBoss: { fr: "BOSS DE VIE", en: "LIFE BOSS" },
};
