"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../components/ThemeProvider";
import { useI18n } from "../../components/I18nProvider";
import { RECRUIT, UI, CHARACTER } from "../data";
import { pick } from "../util";
import SectionHead from "./SectionHead";
import { FiMail, FiPhone, FiLinkedin, FiSend, FiGlobe, FiMapPin } from "react-icons/fi";

export default function Recruit() {
  const { theme } = useTheme();
  const { lang } = useI18n();
  const isDark = theme === "dark";
  const a = "var(--quest-recruit)";
  const aGlow = "var(--quest-recruit-glow)";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `[Signal] ${name || "Recruiter"} → ${CHARACTER.name}`;
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${RECRUIT.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const contactLinks = [
    { href: `mailto:${RECRUIT.email}`, icon: FiMail, label: RECRUIT.email },
    { href: RECRUIT.phoneHref, icon: FiPhone, label: RECRUIT.phone },
    { href: RECRUIT.linkedin, icon: FiLinkedin, label: RECRUIT.linkedinHandle },
  ];

  return (
    <section className="py-10 px-4 md:px-8">
      <SectionHead
        id="recruit"
        kicker={pick(lang, UI.recruit)}
        title={pick(lang, UI.recruit)}
        theme="recruit"
      />
      <p className={`text-center font-mono text-xs uppercase tracking-widest mb-8 ${isDark ? "text-stage-silver/50" : "text-stage-charcoal/50"}`}>
        {pick(lang, UI.recruitSub)}
      </p>

      <div className="max-w-xl mx-auto">
        {/* Identity + guild */}
        <div
          className={`rounded-2xl border p-6 backdrop-blur-md ${isDark ? "bg-stage-velvet/70 border-stage-red/15" : "bg-white/70 border-stage-azure/40"
            }`}
        >
          <div className="flex items-start gap-3 mb-5">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-xl font-condensed text-lg shrink-0"
              style={{ border: `1px solid ${a}`, color: aGlow, background: `${a}14` }}
            >
              AB
            </span>
            <div className="min-w-0">
              <p className={`font-serif text-lg ${isDark ? "text-white" : "text-stage-charcoal"}`}>
                {CHARACTER.name}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-wide" style={{ color: aGlow }}>
                {pick(lang, CHARACTER.playerClass)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-5 font-mono text-xs" style={{ color: isDark ? "var(--stage-silver)" : "var(--stage-charcoal)" }}>
            <FiMapPin size={14} style={{ color: aGlow }} />
            {pick(lang, CHARACTER.location)} · {pick(lang, CHARACTER.mobility)}
          </div>

          {/* Direct signal channels */}
          <div className="space-y-2">
            {contactLinks.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.a
                  key={i}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  whileHover={{ x: isDark ? 4 : 4 }}
                  className={`story-focus flex items-center gap-3 p-3 rounded-lg border transition-colors ${isDark
                    ? "bg-stage-black/40 border-stage-red/10 hover:border-stage-red/30"
                    : "bg-stage-ivory/60 border-stage-azure/25 hover:border-stage-azure/60"
                    }`}
                >
                  <span className="p-2 rounded-full" style={{ background: `${a}1a`, color: aGlow }}>
                    <Icon size={16} />
                  </span>
                  <span className={`font-mono text-[12px] truncate ${isDark ? "text-stage-silver/80" : "text-stage-charcoal/80"}`}>
                    {c.label}
                  </span>
                </motion.a>
              );
            })}
          </div>

          {/* Guild languages */}
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: aGlow }}>
            {pick(lang, UI.guildLanguages)}
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {RECRUIT.languages.map((l, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border"
                style={{ borderColor: `${a}40`, background: `${a}10`, color: isDark ? "var(--stage-silver)" : "var(--stage-charcoal)" }}
              >
                <FiGlobe size={12} style={{ color: aGlow }} />
                {l.name} · {pick(lang, l.level)}
              </span>
            ))}
          </div>

          {/* Off-map activities */}
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: aGlow }}>
            {pick(lang, UI.offMapTitle)}
          </p>
          <ul className="space-y-1.5">
            {RECRUIT.offMap.map((o, i) => (
              <li key={i} className={`font-mono text-[11px] leading-snug flex gap-2 ${isDark ? "text-stage-silver/70" : "text-stage-charcoal/70"}`}>
                <span style={{ color: aGlow }}>◇</span>
                {pick(lang, o)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
