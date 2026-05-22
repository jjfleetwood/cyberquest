import Link from "next/link";

const tracks = [
  {
    id: "core", label: "Core Security", stages: "42", icon: "🏛️",
    border: "border-amber-500/25", textColor: "text-amber-400", glow: "rgba(251,191,36,0.08)",
    topics: ["SQL Injection", "XSS", "Heartbleed", "Log4Shell", "WannaCry", "SSRF"],
    desc: "Ancient exploits to modern CVEs — the canon every defender must know.",
  },
  {
    id: "audit", label: "Tech Audit", stages: "48", icon: "📋",
    border: "border-blue-500/25", textColor: "text-blue-400", glow: "rgba(59,130,246,0.08)",
    topics: ["IT Governance", "Cloud Security", "AI Agents", "Compliance", "Risk Frameworks"],
    desc: "Enterprise IT governance, cloud configuration, and AI agent risk management.",
  },
  {
    id: "mitre", label: "Threat Frameworks", stages: "24", icon: "🎯",
    border: "border-red-500/25", textColor: "text-red-400", glow: "rgba(239,68,68,0.08)",
    topics: ["MITRE ATT&CK", "MITRE ATLAS", "APT Tactics", "Kill Chain", "AI Threat Modeling"],
    desc: "Map real-world APT campaigns using MITRE ATT&CK and ATLAS AI threat framework.",
  },
  {
    id: "ai", label: "AI Security", stages: "12", icon: "🤖",
    border: "border-purple-500/25", textColor: "text-purple-400", glow: "rgba(168,85,247,0.08)",
    topics: ["Prompt Injection", "Model Poisoning", "Data Leakage", "Jailbreaking", "RAG Attacks"],
    desc: "OWASP LLM Top 10 — attack and defend the language models powering modern software.",
  },
  {
    id: "quantum", label: "Quantum Era", stages: "30", icon: "⚛️",
    border: "border-cyan-500/25", textColor: "text-cyan-400", glow: "rgba(34,211,238,0.08)",
    topics: ["Harvest Now Decrypt Later", "ML-KEM / ML-DSA", "QKD", "PQC Migration", "Cisco Silicon One"],
    desc: "Nation-states are harvesting encrypted traffic today. Understand the post-quantum transition.",
  },
  {
    id: "cisco", label: "Defend the Enterprise", stages: "48", icon: "🌐",
    border: "border-indigo-500/25", textColor: "text-indigo-400", glow: "rgba(99,102,241,0.08)",
    topics: ["DNS Tunneling", "DGA Detection", "Fast Flux", "Cisco Umbrella", "VOLT TYPHOON"],
    desc: "Enterprise-grade DNS-layer defense, real Cisco CVEs, and nation-state scenarios.",
  },
  {
    id: "crafts", label: "Crafts", stages: "30", icon: "✂️",
    border: "border-pink-500/25", textColor: "text-pink-400", glow: "rgba(236,72,153,0.08)",
    topics: ["Nail Prep", "Dry Manicure", "Hair Coloring", "Bleaching & Toning", "Braiding", "Client Consultation"],
    desc: "Professional nail arts, hair coloring science, and styling techniques — from first client to running your own studio.",
  },
  {
    id: "driving", label: "Driving", stages: "24", icon: "🚗",
    border: "border-yellow-500/25", textColor: "text-yellow-400", glow: "rgba(234,179,8,0.08)",
    topics: ["CA DMV Written Test", "Road Signs", "Speed Laws", "Right of Way", "Defensive Driving", "Teen Restrictions"],
    desc: "Everything you need to pass the California DMV written test and become a confident, safe driver.",
  },
  {
    id: "sports", label: "Baseball", stages: "70", icon: "⚾",
    border: "border-red-500/25", textColor: "text-red-400", glow: "rgba(239,68,68,0.08)",
    topics: ["Field & Rules", "Batting", "Pitching", "Fielding", "Baserunning", "Sportsmanship"],
    desc: "Little League fundamentals — learn the game from the ground up, from your first at-bat to playing your position with confidence.",
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

const terminalLines = [
  { type: "sys",  text: "╔══════════════════════════════════════════╗" },
  { type: "sys",  text: "║   Kryptós CronOS Terminal  v1.0          ║" },
  { type: "sys",  text: "║   Stage 07: VOLT TYPHOON — ERCOT Grid    ║" },
  { type: "sys",  text: "╚══════════════════════════════════════════╝" },
  { type: "out",  text: "" },
  { type: "out",  text: "Objective: Lateral movement detected in SCADA network." },
  { type: "out",  text: "Identify the C2 beacon before the threat actor pivots." },
  { type: "out",  text: "" },
  { type: "cmd",  text: "ls network-captures/" },
  { type: "out",  text: "dns-beacon.pcap   lateral-movement.log   c2-traffic.bin" },
  { type: "cmd",  text: "dns-analyze --file dns-beacon.pcap" },
  { type: "warn", text: "[ALERT] Suspicious subdomain pattern detected" },
  { type: "warn", text: "[MATCH] Tunnel encoding: base64 in query labels" },
  { type: "out",  text: "[INFO]  Query rate: 1,247/hr  →  C2 exfil confirmed" },
  { type: "cmd",  text: "talos-lookup --ioc volt-typhoon-c2.net" },
  { type: "ok",   text: "✓ TID: G1017 | VOLT TYPHOON | State-sponsored APT" },
  { type: "out",  text: "  Targets: US critical infrastructure (energy, water)" },
  { type: "out",  text: "" },
  { type: "cursor", text: "❯ " },
];

export default function Home() {
  const tickerFull = [...ticker, ...ticker];

  return (
    <>
      <main
        className="min-h-screen flex flex-col"
        style={{ background: "linear-gradient(160deg, #04080f 0%, #0d1117 45%, #080d1a 100%)" }}
      >

        {/* ── Hero ── */}
        <section className="relative flex flex-col items-center justify-center text-center px-4 pt-36 pb-0 overflow-hidden min-h-[90vh]">

          {/* Floating threat names */}
          {bgThreats.map((t, i) => (
            <span
              key={i}
              className="absolute font-mono font-bold pointer-events-none select-none uppercase tracking-widest"
              style={{
                left: t.x, top: t.y,
                fontSize: `${t.size}px`,
                opacity: t.opacity,
                color: "#22d3ee",
                animation: `float-slow ${6 + (i % 3)}s ease-in-out infinite`,
                animationDelay: `${t.delay}s`,
              }}
            >
              {t.text}
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
                358 Stages · AI · Post-Quantum · Nation-State CTF
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-none tracking-tight">
              <span className="text-white" style={{ textShadow: "0 0 80px rgba(255,255,255,0.08)" }}>
                Defend the Future.
              </span>
              <br />
              <span className="hero-glow">Start Here.</span>
            </h1>

            <p className="text-lg md:text-xl font-semibold mb-4"
              style={{ color: "rgba(255,255,255,0.75)" }}>
              AI attacks. Quantum decryption. Nation-state DNS ops.
            </p>

            <p className="text-base mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{ color: "rgba(156,163,175,0.85)" }}>
              The threats have changed — train on the same exploits behind Equifax, the NHS breach,
              and VOLT TYPHOON&apos;s ERCOT grid campaign, then step into AI prompt injection and
              post-quantum cryptography. Ten tracks. All in your browser.
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
                Start Training — Free →
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
                View 358 Stages
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
              { value: "346", label: "Training Stages",      color: "#22d3ee" },
              { value: "9",   label: "Curriculum Tracks",    color: "#a78bfa" },
              { value: "25+", label: "Real CVEs",            color: "#f97316" },
              { value: "3.5M",label: "Unfilled Cyber Jobs",  color: "#4ade80" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-5xl font-black mb-1"
                  style={{ color: s.color, textShadow: `0 0 30px ${s.color}40` }}
                >
                  {s.value}
                </div>
                <div className="text-sm" style={{ color: "rgba(107,114,128,1)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-mono uppercase tracking-widest mb-10 text-center" style={{ color: "rgba(34,211,238,0.5)" }}>
              How it works
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { n: "01", icon: "🗺️", title: "Pick a track", desc: "Ten curriculum paths — core CVEs, threat frameworks, AI security, quantum, enterprise defense, crafts, driving, baseball, and more. Start anywhere." },
                { n: "02", icon: "💻", title: "Hack the terminal", desc: "A simulated vulnerable environment in your browser. Real commands, real exploit mechanics — no videos, no multiple choice." },
                { n: "03", icon: "🏁", title: "Capture the flag", desc: "Find the hidden flag, submit it, earn XP. ARIA AI hints keep you moving without giving the answer away." },
              ].map((s) => (
                <div
                  key={s.n}
                  className="relative p-6 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="absolute top-4 right-5 text-5xl font-black font-mono leading-none select-none" style={{ color: "rgba(255,255,255,0.04)" }}>{s.n}</div>
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="font-bold text-white mb-2 text-base">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Terminal demo ── */}
        <section className="py-24 px-4 overflow-hidden">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">

            <div>
              <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "rgba(34,211,238,0.6)" }}>
                Real exploit environments
              </p>
              <h2 className="text-4xl font-black text-white mb-5 leading-tight">
                Every stage is a<br />
                <span className="hero-glow">live terminal.</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Not a quiz. Not a video. You get a simulated network, real commands,
                and a hidden flag buried inside the vulnerable environment.
                The briefing panel stays open while you work — just like a real incident response runbook.
              </p>
              <div className="space-y-3">
                {[
                  { icon: "🔎", text: "Investigate with real forensic commands" },
                  { icon: "💥", text: "Exploit the actual vulnerability mechanics" },
                  { icon: "🏁", text: "Submit the flag to unlock the next stage" },
                  { icon: "🤖", text: "ARIA AI hints on demand — never reveals the flag" },
                ].map((f) => (
                  <div key={f.text} className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="text-base">{f.icon}</span>
                    {f.text}
                  </div>
                ))}
              </div>
              <Link
                href="/login"
                className="inline-block mt-8 px-7 py-3 font-bold rounded-xl text-sm text-black cta-shimmer transition-all hover:scale-105"
                style={{ background: "linear-gradient(90deg, #22d3ee, #818cf8)" }}
              >
                Open a Terminal →
              </Link>
            </div>

            {/* 3D Terminal */}
            <div className="hidden md:block">
              <div className="terminal-wrap" style={{ transformOrigin: "center center" }}>
                <div
                  className="rounded-xl overflow-hidden border"
                  style={{
                    borderColor: "rgba(34,211,238,0.2)",
                    background: "#0d1117",
                    boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(34,211,238,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Title bar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5"
                    style={{ background: "rgba(255,255,255,0.03)" }}>
                    <span className="w-3 h-3 rounded-full bg-red-500/70" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <span className="w-3 h-3 rounded-full bg-green-500/70" />
                    <span className="ml-auto text-xs font-mono" style={{ color: "rgba(75,85,99,1)" }}>
                      kryptos-cronos — bash
                    </span>
                  </div>
                  {/* Terminal output */}
                  <div className="p-4 font-mono text-xs leading-relaxed space-y-0.5">
                    {terminalLines.map((line, i) => {
                      const colors: Record<string, string> = {
                        sys:    "rgba(34,211,238,0.5)",
                        out:    "rgba(134,239,172,0.75)",
                        cmd:    "rgba(229,231,235,0.9)",
                        warn:   "rgba(250,204,21,0.9)",
                        ok:     "rgba(74,222,128,1)",
                        cursor: "rgba(34,211,238,0.9)",
                      };
                      return (
                        <div key={i} style={{ color: colors[line.type] ?? colors.out }}>
                          {line.type === "cmd" && (
                            <span style={{ color: "rgba(34,211,238,0.7)" }}>❯ </span>
                          )}
                          {line.text}
                          {line.type === "cursor" && (
                            <span className="cursor-blink inline-block w-1.5 h-3.5 align-middle ml-0.5"
                              style={{ background: "rgba(34,211,238,0.8)" }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Curriculum tracks ── */}
        <section className="py-20 px-4 border-y border-white/5" style={{ background: "rgba(255,255,255,0.015)" }}>
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "rgba(34,211,238,0.6)" }}>
                  Ten curriculum tracks
                </p>
                <h2 className="text-4xl font-black text-white mb-2">A complete security education</h2>
                <p style={{ color: "rgba(107,114,128,1)" }}>From SQL injection to post-quantum cryptography. Every track is hands-on CTF.</p>
              </div>
              <Link href="/stages" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                View stage map →
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
                        <p className="text-xs font-mono" style={{ color: "rgba(75,85,99,1)" }}>{track.stages} stages</p>
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
              <h2 className="text-4xl font-black text-white mb-3">How it works</h2>
              <p style={{ color: "rgba(107,114,128,1)" }}>Three steps from zero to defender</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: "01", icon: "📖", title: "Read the briefing",
                  desc: "Each stage opens with a full breakdown — vulnerability mechanics, real-world incident, attack diagram, and timeline." },
                { step: "02", icon: "💻", title: "Run the exploit",
                  desc: "Drop into a simulated terminal. Investigate, exploit, and capture the flag using real commands on the actual vulnerable environment." },
                { step: "03", icon: "🏆", title: "Earn & rank up",
                  desc: "Capture the flag, earn XP, unlock your badge, and climb the leaderboard. Daily streaks unlock milestone badges." },
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
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(107,114,128,1)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Feature highlights ── */}
        <section className="py-24 px-4 border-y border-white/5" style={{ background: "rgba(255,255,255,0.015)" }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-black text-white mb-3">Built different</h2>
              <p style={{ color: "rgba(107,114,128,1)" }}>Not a video course. Not a quiz bank.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "🎯", glow: "rgba(34,211,238,0.08)", border: "rgba(34,211,238,0.2)",
                  title: "Real exploit environments",
                  desc: "Every CTF challenge is modeled on the actual server, code, or config from the real incident — not a simulation of a simulation." },
                { icon: "🤖", glow: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.2)",
                  title: "ARIA AI hint assistant",
                  desc: "Stuck? ARIA (powered by Claude) gives contextual hints without revealing flags. Available on every stage, rate-limited to keep it fair." },
                { icon: "📊", glow: "rgba(251,146,60,0.08)", border: "rgba(251,146,60,0.2)",
                  title: "Gamified progression",
                  desc: "XP, badges, daily streaks, and a live leaderboard. Linear stage gating keeps the difficulty curve honest." },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl p-7 transition-all hover:scale-[1.02]"
                  style={{
                    background: `radial-gradient(ellipse at top, ${f.glow}, transparent 70%)`,
                    border: `1px solid ${f.border}`,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                  }}
                >
                  <div className="text-4xl mb-5">{f.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(107,114,128,1)" }}>{f.desc}</p>
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
                3.5 million unfilled positions globally
              </p>
              <h2 className="text-4xl font-black text-white mb-3">Train for jobs that are hiring right now</h2>
              <p className="max-w-xl mx-auto" style={{ color: "rgba(107,114,128,1)" }}>
                Every stage maps to real skills employers list in job postings.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { role: "SOC Analyst", salary: "$70K – $100K", emoji: "🛡️",
                  glow: "rgba(34,211,238,0.08)", border: "rgba(34,211,238,0.2)", tag: "rgba(34,211,238,1)",
                  skills: ["Threat detection & log analysis", "Incident triage and response", "CVE identification"],
                  coveredIn: ["AI Threat Detection", "WannaCry / EternalBlue", "Log4Shell"] },
                { role: "Penetration Tester", salary: "$90K – $140K", emoji: "🎯",
                  glow: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.2)", tag: "rgba(168,85,247,1)",
                  skills: ["Web application exploitation", "Network vulnerability assessment", "CTF-style attack simulation"],
                  coveredIn: ["SQL Injection", "XSS", "SSRF", "Heartbleed"] },
                { role: "AI / LLM Security Engineer", salary: "$120K – $180K", emoji: "🤖",
                  glow: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.2)", tag: "rgba(99,102,241,1)",
                  skills: ["LLM prompt injection testing", "AI model threat modeling", "OWASP LLM Top 10"],
                  coveredIn: ["Prompt Injection", "Model Poisoning", "RAG Attacks"] },
                { role: "Cloud Security Engineer", salary: "$110K – $160K", emoji: "☁️",
                  glow: "rgba(74,222,128,0.08)", border: "rgba(74,222,128,0.2)", tag: "rgba(74,222,128,1)",
                  skills: ["IAM misconfigurations", "Server-side request forgery", "DNS security & Cisco Umbrella"],
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
                      <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: "rgba(75,85,99,1)" }}>Role</p>
                      <h3 className="text-white font-bold text-xl">{job.emoji} {job.role}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: "rgba(75,85,99,1)" }}>Avg salary</p>
                      <p className="text-white font-bold text-sm">{job.salary}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: "rgba(75,85,99,1)" }}>Skills you&apos;ll build</p>
                    <ul className="space-y-1">
                      {job.skills.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-sm" style={{ color: "rgba(156,163,175,1)" }}>
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: job.tag }} />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: "rgba(75,85,99,1)" }}>Covered in</p>
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
              Completions generate shareable certificates.{" "}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Start earning them →
              </Link>
            </p>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section className="py-24 px-4 border-y border-white/5" style={{ background: "rgba(255,255,255,0.015)" }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "rgba(168,85,247,0.7)" }}>
                Simple pricing
              </p>
              <h2 className="text-4xl font-black text-white mb-3">Free to start. Built to scale.</h2>
              <p style={{ color: "rgba(107,114,128,1)" }}>
                Individual learners, security teams, and enterprise partners — one platform.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  name: "Free",
                  price: "$0",
                  per: "forever",
                  desc: "Full access to Our First Journey and Foundations. No credit card required.",
                  features: ["30+ beginner stages", "ARIA AI hints", "Live leaderboard", "Streak & badge system"],
                  cta: "Start Free",
                  href: "/login",
                  accent: "rgba(34,211,238,1)",
                  border: "rgba(34,211,238,0.2)",
                  glow: "rgba(34,211,238,0.06)",
                  highlight: false,
                },
                {
                  name: "Pro",
                  price: "$5.99",
                  per: "/ month",
                  desc: "All ten curriculum tracks. Full CTF access, certificates, and priority ARIA responses.",
                  features: ["358 stages across 10 tracks", "Completion certificates", "Priority ARIA hints", "All milestone badges"],
                  cta: "Get Pro — $5.99/mo",
                  href: "/login",
                  accent: "rgba(168,85,247,1)",
                  border: "rgba(168,85,247,0.4)",
                  glow: "rgba(168,85,247,0.08)",
                  highlight: true,
                },
                {
                  name: "Enterprise",
                  price: "$8",
                  per: "/ seat / month",
                  desc: "For security teams and training programs. Admin dashboard, cohort progress, and custom content.",
                  features: ["All Pro features", "Admin dashboard & analytics", "Custom epoch access control", "Sponsor integration support"],
                  cta: "Contact Sales",
                  href: "mailto:jjbolotin@yahoo.com",
                  accent: "rgba(74,222,128,1)",
                  border: "rgba(74,222,128,0.2)",
                  glow: "rgba(74,222,128,0.06)",
                  highlight: false,
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
                      Most Popular
                    </div>
                  )}
                  <div className="mb-5">
                    <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: tier.accent }}>
                      {tier.name}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white">{tier.price}</span>
                      <span className="text-sm" style={{ color: "rgba(107,114,128,1)" }}>{tier.per}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(107,114,128,1)" }}>{tier.desc}</p>
                  </div>
                  <ul className="space-y-2 mb-7 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "rgba(156,163,175,0.9)" }}>
                        <span style={{ color: tier.accent }}>✓</span>
                        {f}
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
                    {tier.cta}
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
                  The future of defense starts here
                </p>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                  Ten tracks. 346 stages.<br />
                  <span className="hero-glow">All in your browser.</span>
                </h2>
                <p className="mb-8" style={{ color: "rgba(107,114,128,1)" }}>
                  Free to start. No credit card. No setup.
                </p>
                <Link
                  href="/login"
                  className="cta-shimmer inline-block px-12 py-4 font-black rounded-xl text-black text-xl transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(90deg, #22d3ee, #818cf8, #6366f1)",
                    boxShadow: "0 0 40px rgba(34,211,238,0.3), 0 0 80px rgba(99,102,241,0.2)",
                  }}
                >
                  Create Free Account →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t py-8 px-4 text-center" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xl">🛡️</span>
            <span className="text-white font-bold">Kryptós <span style={{ color: "#22d3ee" }}>CronOS</span></span>
          </div>
          <div className="flex justify-center gap-6 text-sm mb-3" style={{ color: "rgba(75,85,99,1)" }}>
            <Link href="/stages" className="hover:text-gray-400 transition-colors">Stages</Link>
            <Link href="/leaderboard" className="hover:text-gray-400 transition-colors">Leaderboard</Link>
            <Link href="/login" className="hover:text-gray-400 transition-colors">Sign In</Link>
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy</Link>
            <Link href="/attribution" className="hover:text-gray-400 transition-colors">Attributions</Link>
          </div>
          <p className="text-xs" style={{ color: "rgba(55,65,81,1)" }}>
            © 2026 Kryptós CronOS (κρυπτός χρόνος) · Built for defenders
          </p>
        </footer>

      </main>
    </>
  );
}
