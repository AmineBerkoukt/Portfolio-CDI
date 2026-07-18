"use client";

import { motion } from "framer-motion";
import { useTheme } from "../components/ThemeProvider";
import { useI18n } from "../components/I18nProvider";
import SceneCard from "../components/SceneCard";
import {
  SiSpring, SiAngular, SiReact, SiDocker, SiKubernetes,
  SiGit, SiGithub, SiGitlab, SiTerraform, SiAnsible,
  SiNginx, SiLinux, SiMysql, SiPostgresql, SiMongodb,
  SiRedis, SiPostman, SiJira, SiApachekafka, SiTypescript,
  SiJavascript, SiHtml5, SiPhp, SiC, SiCplusplus,
  SiGnubash, SiJunit5
} from "react-icons/si";
import { FaJava, FaCss3Alt, FaDatabase, FaVial, FaBug, FaMicrosoft } from "react-icons/fa";
import { FiTool, FiCheckCircle } from "react-icons/fi";

// Official Microsoft C# logo (real vector paths from the Microsoft C# brand).
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

type SkillIcon = {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  name: string;
  color: string;
};

type SkillGroup = {
  key: string;
  icons: SkillIcon[];
};

const skillGroups: SkillGroup[] = [
  {
    key: "languages",
    icons: [
      { Icon: FaJava, name: "Java", color: "#007396" },
      { Icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
      { Icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
      { Icon: SiC, name: "C", color: "#A8B9CC" },
      { Icon: SiCplusplus, name: "C++", color: "#00599C" },
      { Icon: CSharpIcon, name: "C#", color: "#68217A" },
    ],
  },
  {
    key: "web",
    icons: [
      { Icon: SiSpring, name: "Spring", color: "#6DB33F" },
      { Icon: SiAngular, name: "Angular", color: "#DD0031" },
      { Icon: SiReact, name: "React", color: "#61DAFB" },
      { Icon: SiHtml5, name: "HTML5", color: "#E34F26" },
      { Icon: FaCss3Alt, name: "CSS3", color: "#1572B6" },
    ],
  },
  {
    key: "devops",
    icons: [
      { Icon: SiDocker, name: "Docker", color: "#2496ED" },
      { Icon: SiKubernetes, name: "Kubernetes", color: "#326CE5" },
      { Icon: SiGit, name: "Git", color: "#F05032" },
      { Icon: SiGithub, name: "GitHub", color: "#181717" },
      { Icon: SiGitlab, name: "GitLab", color: "#FC6D26" },
      { Icon: SiTerraform, name: "Terraform", color: "#7B42BC" },
      { Icon: SiAnsible, name: "Ansible", color: "#EE0000" },
      { Icon: FaMicrosoft, name: "Azure", color: "#0078D4" },
    ],
  },
  {
    key: "testing",
    icons: [
      { Icon: SiJunit5, name: "JUnit", color: "#25A162" },
      { Icon: SiPostman, name: "Postman", color: "#FF6C37" },
      { Icon: FiCheckCircle, name: "Sonar", color: "#4E9BCD" },
      { Icon: FaBug, name: "Mockito", color: "#52B415" },
      { Icon: FaVial, name: "WireMock", color: "#0F53B6" },
    ],
  },
  {
    key: "databases",
    icons: [
      { Icon: SiMysql, name: "MySQL", color: "#4479A1" },
      { Icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
      { Icon: SiMongodb, name: "MongoDB", color: "#47A248" },
      { Icon: SiRedis, name: "Redis", color: "#DC382D" },
      { Icon: FaDatabase, name: "Oracle DB", color: "#F80000" },
    ],
  },
  {
    key: "sysadmin",
    icons: [
      { Icon: SiLinux, name: "Linux", color: "#FCC624" },
      { Icon: SiNginx, name: "NGINX", color: "#009639" },
      { Icon: SiGnubash, name: "Shell", color: "#4EAA25" },
    ],
  },
  {
    key: "methodologies",
    icons: [
      { Icon: FiTool, name: "Agile / Scrum", color: "#009FDA" },
      { Icon: FiTool, name: "Kanban", color: "#E84C3D" },
      { Icon: FiTool, name: "Clean Code", color: "#6DB33F" },
      { Icon: FiTool, name: "SOLID", color: "#F7DF1E" },
    ],
  },
];

export default function SkillsCard() {
  const { theme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === "dark";

  return (
    <section id="skills" className="scroll-margin py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-center">
        <SceneCard
          cue={t("skills.cue") as string}
          title={t("skills.title") as string}
          initialX={0}
          initialY={0}
          width="w-full max-w-4xl mx-auto"
        >
          <div className="space-y-6">
            {skillGroups.map((group, gi) => (
              <div
                key={group.key}
              >
                <h3
                  className={`font-condensed text-sm uppercase tracking-widest mb-3 ${
                    isDark ? "text-stage-red-glow/70" : "text-stage-azure/85"
                  }`}
                >
                  {t(`skills.${group.key}`) as string}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.icons.map((icon, ii) => {
                    const IconComp = icon.Icon;
                    return (
                      <motion.div
                        key={ii}
                        className={`
                          tech-chip cursor-default
                          ${isDark ? "bg-stage-black/60 border border-stage-red/20 text-stage-silver" : "bg-white/60 border border-stage-azure/45 text-stage-charcoal"}
                        `}
                        whileHover={{ scale: 1.08, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span
                          className="inline-flex items-center justify-center"
                          style={{ color: icon.color }}
                        >
                          <IconComp size={16} />
                        </span>
                        <span className="font-mono text-[10px]">{icon.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </SceneCard>
      </div>
    </section>
  );
}
