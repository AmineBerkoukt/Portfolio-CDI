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
import useRestoredScroll from "../hooks/useRestoredScroll";

type SkillIcon = {
  Icon: React.ElementType;
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
  const restoredScroll = useRestoredScroll();

  return (
    <section id="skills" className="scroll-margin py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-center">
        <SceneCard
          cue={t("skills.cue") as string}
          title={t("skills.title") as string}
          initialX={0}
          initialY={0}
          width="w-full max-w-3xl"
        >
          <div className="space-y-6">
            {skillGroups.map((group, gi) => (
              <motion.div
                key={group.key}
                initial={restoredScroll ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.1 }}
              >
                <h3
                  className={`font-condensed text-sm uppercase tracking-widest mb-3 ${
                    isDark ? "text-stage-red-glow/70" : "text-stage-gold/70"
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
                          ${isDark ? "bg-stage-black/60 border border-stage-red/20 text-stage-silver" : "bg-white/60 border border-stage-gold/20 text-stage-charcoal"}
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
              </motion.div>
            ))}
          </div>
        </SceneCard>
      </div>
    </section>
  );
}
