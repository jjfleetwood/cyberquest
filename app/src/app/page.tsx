"use client";

import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";
import HomeCtfDemo from "@/components/HomeCtfDemo";
import Logo from "@/components/Logo";

const TRACK_STATIC = [
  {
    id: "core", labelKey: "stages.tracks.coreSecurity", descKey: "home.trackDesc.core",
    stages: "42", icon: "🏛️",
    border: "border-amber-500/25", textColor: "text-amber-400", glow: "rgba(251,191,36,0.08)",
    topics: ["SQL Injection", "XSS", "Heartbleed", "Log4Shell", "WannaCry", "SSRF"],
  },
  {
    id: "audit", labelKey: "stages.tracks.techAudit", descKey: "home.trackDesc.audit",
    stages: "48", icon: "📋",
    border: "border-blue-500/25", textColor: "text-blue-400", glow: "rgba(59,130,246,0.08)",
    topics: ["IT Governance", "Cloud Security", "AI Agents", "Compliance", "Risk Frameworks"],
  },
  {
    id: "mitre", labelKey: "stages.tracks.threatFrameworks", descKey: "home.trackDesc.mitre",
    stages: "24", icon: "🎯",
    border: "border-red-500/25", textColor: "text-red-400", glow: "rgba(239,68,68,0.08)",
    topics: ["MITRE ATT&CK", "MITRE ATLAS", "APT Tactics", "Kill Chain", "AI Threat Modeling"],
  },
  {
    id: "ai", labelKey: "stages.tracks.aiSecurity", descKey: "home.trackDesc.ai",
    stages: "12", icon: "🤖",
    border: "border-purple-500/25", textColor: "text-purple-400", glow: "rgba(168,85,247,0.08)",
    topics: ["Prompt Injection", "Model Poisoning", "Data Leakage", "Jailbreaking", "RAG Attacks"],
  },
  {
    id: "quantum", labelKey: "stages.tracks.quantumEra", descKey: "home.trackDesc.quantum",
    stages: "30", icon: "⚛️",
    border: "border-cyan-500/25", textColor: "text-cyan-400", glow: "rgba(34,211,238,0.08)",
    topics: ["Harvest Now Decrypt Later", "ML-KEM / ML-DSA", "QKD", "PQC Migration", "Cisco Silicon One"],
  },
  {
    id: "cisco", labelKey: "stages.tracks.enterprise", descKey: "home.trackDesc.cisco",
    stages: "48", icon: "🌐",
    border: "border-indigo-500/25", textColor: "text-indigo-400", glow: "rgba(99,102,241,0.08)",
    topics: ["DNS Tunneling", "DGA Detection", "Fast Flux", "Cisco Umbrella", "VOLT TYPHOON"],
  },
];

const bgThreats = [
  { text: "VOLT TYPHOON", x: "7%",  y: "18%", size: 11, opacity: 0.045, delay: 0 },
  { text: "CVE-2021-44228", x: "68%", y: "9%",  size: 10, opacity: 0.04,  delay: 1.4 },
  { text: "WIZARD SPIDER",  x: "83%", y: "38%", size: 9,  opacity: 0.035, delay: 0.6 },
  { text: "PROMPT INJECTION",x: "11%", y: "70%", size: 9,  opacity: 0.04,  delay: 0.9 },
  { text: "APT29 / NOBELIUM",x: "74%", y: "72%", size: 10, opacity: 0.04,  delay: 1.8 },
  { text: "DNS TUNNELING",   x: "24%", y: "46%", size: 8,  opacity: 0.03,  delay: 0.3 },
  { text: "HARVEST·NOW·DECRYPT·LATER", x: "42%", y: "84%", size: 8, opacity: 0.035, delay: 2.1 },
  { text: "OilRig/APT34",   x: "88%", y: "57%", size: 9,  opacity: 0.035, delay: 1.1 },
  { text: "ML-KEM",         x: "4%",  y: "88%", size: 11, opacity: 0.04,  delay: 1.6 },
  { text: "LOCKBIT 3.0",    x: "55%", y: "22%", size: 9,  opacity: 0.035, delay: 0.5 },
  { text: "SCATTERED SPIDER",x: "33%", y: "13%", size: 10, opacity: 0.04,  delay: 2.3 },
  { text: "DGA DETECTION",  x: "79%", y: "85%", size: 9,  opacity: 0.03,  delay: 1.3 },
  { text: "LOG4SHELL",      x: "48%", y: "55%", size: 10, opacity: 0.03,  delay: 0.7 },
  { text: "ZERO-DAY",       x: "18%", y: "33%", size: 13, opacity: 0.025, delay: 1.9 },
];

const ticker = [
  "🔴  VOLT TYPHOON — Critical Infrastructure Pre-positioning",
  "🟡  Emotet DGA — NHS London, 2024",
  "🔴  WIZARD SPIDER — Log4Shell Campaign",
  "🟠  OilRig DNSpionage — DNS Tunneling via iodine/dnscat2",
  "🔴  NOBELIUM — SolarWinds Supply Chain Compromise",
  "🟡  LockBit 3.0 — Wildcard DNS Policy Bypass",
  "🔴  Scattered Spider — Social Engineering + Cisco Umbrella Evasion",
  "🔴  HARVEST NOW DECRYPT LATER — Post-Quantum Threat Active",
  "🟠  CVE-2023-20198 — Cisco IOS XE Privilege Escalation",
  "🔴  Godlua Trojan — DoH Evasion via 1.1.1.1:443",
];

export default function Home() {
  const { t } = useLocale();
  const tickerFull = [...ticker, ...ticker];

  const tracks = TRACK_STATIC.map((s) => ({
    ...s,
    label: t(s.labelKey),
    desc: t(s.descKey),
  }));

  return (
    <>
      <main
        className="min-h-screen flex flex-col"
        style={{ background: "linear-gradient(160deg, #04080f 0%, #0d1117 45%, #080d1a 100%)" }}
      >

        {/* ── Hero ── */}
        <section className="relative flex flex-col items-center justify-center text-center px-4 pt-36 pb-0 overflow-hidden min-h-[90vh]">

          {/* Floating threat names */}
          {bgThreats.map((threat, i) => (
            <span
              key={i}
              className="absolute font-mono font-bold pointer-events-none select-none uppercase tracking-widest"
              style={{
                left: threat.x, top: threat.y,
                fontSize: `${threat.size}px`,
                opacity: threat.opacity,
                color: "#22d3ee",
                animation: `float-slow ${6 + (i % 3)}s ease-in-out infinite`,
                animationDelay: `${threat.delay}s`,
              }}
            >
              {threat.text}
            </span>
          ))}

          {/* Radar pulse rings */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute rounded-full border border-cyan-500/15 pointer-events-none"
              style={{
                width: `${i * 220}px`,
                height: `${i * 220}px`,
                left: "50%", top: "42%",
                animation: `pulse-ring ${3.5 + i * 0.6}s ease-out infinite`,
                animationDelay: `${i * 1.1}s`,
              }}
            />
          ))}

          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Glow orbs */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[min(800px,100vw)] h-[400px] rounded-full blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.07) 0%, transparent 70%)" }} />
          <div className="absolute top-40 left-1/4 w-[300px] h-[250px] rounded-full blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(168,85,247,0.06) 0%, transparent 70%)" }} />
          <div className="absolute top-48 right-1/4 w-[280px] h-[220px] rounded-full blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)" }} />

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 border border-cyan-500/25 rounded-full px-4 py-1.5 mb-8 text-sm"
              style={{ background: "rgba(34,211,238,0.06)" }}>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-300 font-mono font-medium tracking-wide">
                {t("home.heroBadge")}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-none tracking-tight">
              <span className="text-white" style={{ textShadow: "0 0 80px rgba(255,255,255,0.08)" }}>
                {t("home.heroLine1")}
              </span>
              <br />
              <span className="hero-glow">{t("home.heroLine2")}</span>
            </h1>

            <p className="text-lg md:text-xl font-semibold mb-4"
              style={{ color: "rgba(255,255,255,0.75)" }}>
              {t("home.heroSub")}
            </p>

            <p className="text-base mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{ color: "rgba(156,163,175,0.85)" }}>
              {t("home.heroPara")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/login"
                className="cta-shimmer px-7 py-2.5 font-black rounded-lg text-sm text-black transition-all hover:scale-105 hover:shadow-2xl"
                style={{
                  background: "linear-gradient(90deg, #22d3ee, #818cf8, #6366f1)",
                  boxShadow: "0 0 40px rgba(34,211,238,0.25), 0 0 80px rgba(99,102,241,0.15)",
                }}
              >
                {t("home.ctaStart")}
              </Link>
              <Link
                href="/stages"
                className="px-7 py-2.5 border rounded-lg text-sm font-semibold transition-all hover:scale-105"
                style={{
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "rgba(209,213,219,1)",
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {t("home.ctaView")}
              </Link>
            </div>
          </div>

          {/* Threat intelligence ticker */}
          <div className="w-full border-y border-red-500/15 overflow-hidden py-2.5 relative"
            style={{ background: "rgba(239,68,68,0.04)" }}>
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{ background: "linear-gradient(90deg, #04080f, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{ background: "linear-gradient(-90deg, #04080f, transparent)" }} />
            <div
              className="flex gap-12 whitespace-nowrap"
              style={{ animation: "ticker-scroll 55s linear infinite" }}
            >
              {tickerFull.map((item, i) => (
                <span key={i} className="text-xs font-mono text-red-400/70 flex-shrink-0">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="border-b border-white/5 py-12 px-4"
          style={{ background: "rgba(255,255,255,0.015)" }}>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "458", labelKey: "home.statStages",  color: "#22d3ee" },
              { value: "6",   labelKey: "home.statTracks",  color: "#a78bfa" },
              { value: "25+", labelKey: "home.statCves",    color: "#f97316" },
              { value: "3.5M",labelKey: "home.statJobs",    color: "#4ade80" },
            ].map((s) => (
              <div key={s.labelKey}>
                <div
                  className="text-5xl font-black mb-1"
                  style={{ color: s.color, textShadow: `0 0 30px ${s.color}40` }}
                >
                  {s.value}
                </div>
                <div className="text-sm" style={{ color: "rgba(107,114,128,1)" }}>{t(s.labelKey)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Terminal demo ── */}
        <section className="py-24 px-4 overflow-hidden">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">

            <div>
              <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "rgba(34,211,238,0.6)" }}>
                {t("home.terminalLabel")}
              </p>
              <h2 className="text-4xl font-black text-white mb-5 leading-tight">
                <span className="hero-glow">{t("home.terminalHeading")}</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                {t("home.terminalPara")}
              </p>
              <div className="space-y-3">
                {[
                  { icon: "🔎", key: "home.terminalF1" },
                  { icon: "💥", key: "home.terminalF2" },
                  { icon: "🏁", key: "home.terminalF3" },
                  { icon: "🤖", key: "home.terminalF4" },
                ].map((f) => (
                  <div key={f.key} className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="text-base">{f.icon}</span>
                    {t(f.key)}
                  </div>
                ))}
              </div>
              <Link
                href="/login"
                className="inline-block mt-8 px-7 py-3 font-bold rounded-xl text-sm text-black cta-shimmer transition-all hover:scale-105"
                style={{ background: "linear-gradient(90deg, #22d3ee, #818cf8)" }}
              >
                {t("home.openTerminal")}
              </Link>
            </div>

            {/* Playable mini-CTF terminal */}
            <HomeCtfDemo />
          </div>
        </section>

        {/* ── Curriculum tracks ── */}
        <section className="py-20 px-4 border-y border-white/5" style={{ background: "rgba(255,255,255,0.015)" }}>
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "rgba(34,211,238,0.6)" }}>
                  {t("home.curriculumLabel")}
                </p>
                <h2 className="text-4xl font-black text-white mb-2">{t("home.curriculumHeading")}</h2>
                <p style={{ color: "rgba(107,114,128,1)" }}>{t("home.curriculumDesc")}</p>
              </div>
              <Link href="/stages" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                {t("home.curriculumLink")}
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="track-card rounded-2xl border p-6 cursor-default"
                  style={{
                    borderColor: track.border.replace("border-", "").replace("/25", ""),
                    background: `radial-gradient(ellipse at top left, ${track.glow}, transparent 70%)`,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        {track.icon}
                      </div>
                      <div>
                        <p className={`font-bold text-base ${track.textColor}`}>{track.label}</p>
                        <p className="text-xs font-mono" style={{ color: "rgba(75,85,99,1)" }}>{track.stages} {t("home.stagesUnit")}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(156,163,175,0.85)" }}>
                    {track.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {track.topics.slice(0, 4).map((topic) => (
                      <span
                        key={topic}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${track.textColor}`}
                        style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${track.glow.replace("0.08", "0.3")}` }}
                      >
                        {topic}
                      </span>
                    ))}
                    {track.topics.length > 4 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ color: "rgba(75,85,99,1)" }}>
                        +{track.topics.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-black text-white mb-3">{t("home.howWorksHeading")}</h2>
              <p style={{ color: "rgba(107,114,128,1)" }}>{t("home.howWorksSub")}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: "01", icon: "📖", titleKey: "home.step1Title", descKey: "home.step1Desc" },
                { step: "02", icon: "💻", titleKey: "home.step2Title", descKey: "home.step2Desc" },
                { step: "03", icon: "🏆", titleKey: "home.step3Title", descKey: "home.step3Desc" },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative rounded-2xl p-7 transition-all hover:scale-[1.02]"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                  }}
                >
                  <div
                    className="absolute -top-3 left-6 text-xs font-mono font-bold px-2"
                    style={{ color: "rgba(34,211,238,0.6)", background: "#04080f" }}
                  >
                    {item.step}
                  </div>
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{t(item.titleKey)}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(107,114,128,1)" }}>{t(item.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Feature highlights ── */}
        <section className="py-24 px-4 border-y border-white/5" style={{ background: "rgba(255,255,255,0.015)" }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-black text-white mb-3">{t("home.featuresHeading")}</h2>
              <p style={{ color: "rgba(107,114,128,1)" }}>{t("home.featuresSub")}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "🎯", glow: "rgba(34,211,238,0.08)", border: "rgba(34,211,238,0.2)",
                  titleKey: "home.feature1Title", descKey: "home.feature1Desc" },
                { icon: "🤖", glow: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.2)",
                  titleKey: "home.feature2Title", descKey: "home.feature2Desc" },
                { icon: "📊", glow: "rgba(251,146,60,0.08)", border: "rgba(251,146,60,0.2)",
                  titleKey: "home.feature3Title", descKey: "home.feature3Desc" },
              ].map((f) => (
                <div
                  key={f.titleKey}
                  className="rounded-2xl p-7 transition-all hover:scale-[1.02]"
                  style={{
                    background: `radial-gradient(ellipse at top, ${f.glow}, transparent 70%)`,
                    border: `1px solid ${f.border}`,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                  }}
                >
                  <div className="text-4xl mb-5">{f.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{t(f.titleKey)}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(107,114,128,1)" }}>{t(f.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Job outcomes ── */}
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "rgba(74,222,128,0.7)" }}>
                {t("home.jobsLabel")}
              </p>
              <h2 className="text-4xl font-black text-white mb-3">{t("home.jobsHeading")}</h2>
              <p className="max-w-xl mx-auto" style={{ color: "rgba(107,114,128,1)" }}>
                {t("home.jobsDesc")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { role: "SOC Analyst", salary: "$70K – $100K", emoji: "🛡️",
                  glow: "rgba(34,211,238,0.08)", border: "rgba(34,211,238,0.2)", tag: "rgba(34,211,238,1)",
                  skillKeys: ["home.jobSOCSkill1", "home.jobSOCSkill2", "home.jobSOCSkill3"],
                  coveredIn: ["AI Threat Detection", "WannaCry / EternalBlue", "Log4Shell"] },
                { role: "Penetration Tester", salary: "$90K – $140K", emoji: "🎯",
                  glow: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.2)", tag: "rgba(168,85,247,1)",
                  skillKeys: ["home.jobPenSkill1", "home.jobPenSkill2", "home.jobPenSkill3"],
                  coveredIn: ["SQL Injection", "XSS", "SSRF", "Heartbleed"] },
                { role: "AI / LLM Security Engineer", salary: "$120K – $180K", emoji: "🤖",
                  glow: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.2)", tag: "rgba(99,102,241,1)",
                  skillKeys: ["home.jobAISkill1", "home.jobAISkill2", "home.jobAISkill3"],
                  coveredIn: ["Prompt Injection", "Model Poisoning", "RAG Attacks"] },
                { role: "Cloud Security Engineer", salary: "$110K – $160K", emoji: "☁️",
                  glow: "rgba(74,222,128,0.08)", border: "rgba(74,222,128,0.2)", tag: "rgba(74,222,128,1)",
                  skillKeys: ["home.jobCloudSkill1", "home.jobCloudSkill2", "home.jobCloudSkill3"],
                  coveredIn: ["SSRF / Capital One", "DNS Tunneling", "Umbrella Policy"] },
              ].map((job) => (
                <div
                  key={job.role}
                  className="rounded-2xl p-6 transition-all hover:scale-[1.01]"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${job.glow}, transparent 60%)`,
                    border: `1px solid ${job.border}`,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: "rgba(75,85,99,1)" }}>{t("home.jobRoleLabel")}</p>
                      <h3 className="text-white font-bold text-xl">{job.emoji} {job.role}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: "rgba(75,85,99,1)" }}>{t("home.jobSalaryLabel")}</p>
                      <p className="text-white font-bold text-sm">{job.salary}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: "rgba(75,85,99,1)" }}>{t("home.jobSkillsLabel")}</p>
                    <ul className="space-y-1">
                      {job.skillKeys.map((key) => (
                        <li key={key} className="flex items-center gap-2 text-sm" style={{ color: "rgba(156,163,175,1)" }}>
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: job.tag }} />
                          {t(key)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: "rgba(75,85,99,1)" }}>{t("home.jobCoveredLabel")}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {job.coveredIn.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-2 py-0.5 rounded font-mono"
                          style={{ color: job.tag, background: `${job.border.replace("0.2", "0.08")}`, border: `1px solid ${job.border}` }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-sm mt-8" style={{ color: "rgba(75,85,99,1)" }}>
              {t("home.certNote")}{" "}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                {t("home.certLink")}
              </Link>
            </p>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section className="py-24 px-4 border-y border-white/5" style={{ background: "rgba(255,255,255,0.015)" }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "rgba(168,85,247,0.7)" }}>
                {t("home.pricingLabel")}
              </p>
              <h2 className="text-4xl font-black text-white mb-3">{t("home.pricingHeading")}</h2>
              <p style={{ color: "rgba(107,114,128,1)" }}>
                {t("home.pricingDesc")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  name: "Free", price: "$0", perKey: "home.pricingForever",
                  descKey: "home.pricingFreeDesc",
                  featureKeys: ["home.pricingFreeF1", "home.pricingFreeF2", "home.pricingFreeF3", "home.pricingFreeF4"],
                  ctaKey: "home.pricingFreeCta", href: "/login",
                  accent: "rgba(34,211,238,1)", border: "rgba(34,211,238,0.2)",
                  glow: "rgba(34,211,238,0.06)", highlight: false,
                },
                {
                  name: "Pro", price: "$13.99", perKey: "pricing.perMonth",
                  descKey: "home.pricingProDesc",
                  featureKeys: ["home.pricingProF1", "home.pricingProF2", "home.pricingProF3", "home.pricingProF4"],
                  ctaKey: "home.pricingProCta", href: "/login",
                  accent: "rgba(168,85,247,1)", border: "rgba(168,85,247,0.4)",
                  glow: "rgba(168,85,247,0.08)", highlight: true,
                },
                {
                  name: "Small Business & Enterprise", price: "$8", perKey: "pricing.perMonth",
                  descKey: "home.pricingEntDesc",
                  featureKeys: ["home.pricingEntF1", "home.pricingEntF2", "home.pricingEntF3", "home.pricingEntF4"],
                  ctaKey: "home.pricingEntCta", href: "mailto:hello@kryptoscronos.com",
                  accent: "rgba(74,222,128,1)", border: "rgba(74,222,128,0.2)",
                  glow: "rgba(74,222,128,0.06)", highlight: false,
                },
              ].map((tier) => (
                <div
                  key={tier.name}
                  className="relative rounded-2xl p-7 flex flex-col"
                  style={{
                    background: `radial-gradient(ellipse at top, ${tier.glow}, transparent 70%)`,
                    border: `1px solid ${tier.border}`,
                    boxShadow: tier.highlight ? `0 0 40px ${tier.glow}, 0 4px 24px rgba(0,0,0,0.3)` : "0 4px 24px rgba(0,0,0,0.2)",
                  }}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-mono font-bold px-3 py-0.5 rounded-full"
                      style={{ background: "rgba(168,85,247,1)", color: "#000" }}>
                      {t("home.pricingMostPopular")}
                    </div>
                  )}
                  <div className="mb-5">
                    <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: tier.accent }}>
                      {tier.name}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white">{tier.price}</span>
                      <span className="text-sm" style={{ color: "rgba(107,114,128,1)" }}>{t(tier.perKey)}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(107,114,128,1)" }}>{t(tier.descKey)}</p>
                  </div>
                  <ul className="space-y-2 mb-7 flex-1">
                    {tier.featureKeys.map((key) => (
                      <li key={key} className="flex items-center gap-2 text-sm" style={{ color: "rgba(156,163,175,0.9)" }}>
                        <span style={{ color: tier.accent }}>✓</span>
                        {t(key)}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={tier.href}
                    className="block text-center py-2.5 rounded-lg text-sm font-bold transition-all hover:scale-[1.02]"
                    style={{
                      background: tier.highlight ? tier.accent : "rgba(255,255,255,0.05)",
                      color: tier.highlight ? "#000" : tier.accent,
                      border: `1px solid ${tier.border}`,
                    }}
                  >
                    {t(tier.ctaKey)}
                  </Link>
                </div>
              ))}
            </div>

            <p className="text-center text-xs mt-8" style={{ color: "rgba(55,65,81,1)" }}>
              Target sponsors: CrowdStrike · AWS · SentinelOne · CompTIA · ISC² · Cisco
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="rounded-2xl p-14 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(34,211,238,0.07), rgba(168,85,247,0.07), rgba(99,102,241,0.07))",
                border: "1px solid rgba(34,211,238,0.2)",
                boxShadow: "0 0 80px rgba(34,211,238,0.08), 0 0 160px rgba(99,102,241,0.06)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.035]"
                style={{
                  backgroundImage: "linear-gradient(rgba(34,211,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,1) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="relative z-10">
                <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "rgba(34,211,238,0.6)" }}>
                  {t("home.ctaLabel")}
                </p>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                  {t("home.ctaHeading1")}<br />
                  <span className="hero-glow">{t("home.ctaHeading2")}</span>
                </h2>
                <p className="mb-8" style={{ color: "rgba(107,114,128,1)" }}>
                  {t("home.ctaSub")}
                </p>
                <Link
                  href="/login"
                  className="cta-shimmer inline-block px-12 py-4 font-black rounded-xl text-black text-xl transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(90deg, #22d3ee, #818cf8, #6366f1)",
                    boxShadow: "0 0 40px rgba(34,211,238,0.3), 0 0 80px rgba(99,102,241,0.2)",
                  }}
                >
                  {t("home.ctaButton")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t py-8 px-4 text-center" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Logo size={24} />
            <span className="text-white font-bold">Kryptós <span style={{ color: "#22d3ee" }}>CronOS</span></span>
          </div>
          <div className="flex justify-center gap-6 text-sm mb-3" style={{ color: "rgba(75,85,99,1)" }}>
            <Link href="/stages" className="hover:text-gray-400 transition-colors">{t("home.footerStages")}</Link>
            <Link href="/leaderboard" className="hover:text-gray-400 transition-colors">{t("home.footerLeaderboard")}</Link>
            <Link href="/login" className="hover:text-gray-400 transition-colors">{t("home.footerSignIn")}</Link>
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">{t("home.footerPrivacy")}</Link>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">{t("home.footerTerms")}</Link>
            <Link href="/attribution" className="hover:text-gray-400 transition-colors">{t("home.footerAttributions")}</Link>
          </div>
          <p className="text-xs" style={{ color: "rgba(55,65,81,1)" }}>
            {t("home.footerCopyright")}
          </p>
        </footer>

      </main>
    </>
  );
}
