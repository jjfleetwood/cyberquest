import Link from "next/link";
import Nav from "@/components/Nav";

const tracks = [
  {
    id: "core",
    label: "Core Security",
    color: "amber",
    accent: "from-amber-500/15 to-transparent",
    border: "border-amber-500/20",
    textColor: "text-amber-400",
    dotColor: "bg-amber-400",
    stages: "54+",
    icon: "🏛️",
    topics: ["SQL Injection", "XSS", "Heartbleed", "Log4Shell", "WannaCry", "SSRF"],
    desc: "Ancient exploits to modern CVEs — the canon every defender must know.",
  },
  {
    id: "audit",
    label: "Tech Audit",
    color: "blue",
    accent: "from-blue-500/15 to-transparent",
    border: "border-blue-500/20",
    textColor: "text-blue-400",
    dotColor: "bg-blue-400",
    stages: "30+",
    icon: "📋",
    topics: ["IT Governance", "Cloud Security", "AI Agents", "Compliance", "Risk Frameworks"],
    desc: "Enterprise IT governance, cloud configuration, and AI agent risk management.",
  },
  {
    id: "mitre",
    label: "Threat Frameworks",
    color: "red",
    accent: "from-red-500/15 to-transparent",
    border: "border-red-500/20",
    textColor: "text-red-400",
    dotColor: "bg-red-400",
    stages: "20+",
    icon: "🎯",
    topics: ["MITRE ATT&CK", "MITRE ATLAS", "APT Tactics", "Kill Chain", "AI Threat Modeling"],
    desc: "Map real-world APT campaigns using MITRE ATT&CK and the new ATLAS AI threat framework.",
  },
  {
    id: "ai",
    label: "AI Security",
    color: "purple",
    accent: "from-purple-500/15 to-transparent",
    border: "border-purple-500/20",
    textColor: "text-purple-400",
    dotColor: "bg-purple-400",
    stages: "10",
    icon: "🤖",
    topics: ["Prompt Injection", "Model Poisoning", "Data Leakage", "Jailbreaking", "RAG Attacks"],
    desc: "OWASP LLM Top 10 — attack and defend the language models powering the next generation of software.",
  },
  {
    id: "quantum",
    label: "Quantum Era",
    color: "cyan",
    accent: "from-cyan-500/15 to-transparent",
    border: "border-cyan-500/20",
    textColor: "text-cyan-400",
    dotColor: "bg-cyan-400",
    stages: "15",
    icon: "⚛️",
    topics: ["Harvest Now Decrypt Later", "ML-KEM / ML-DSA", "QKD", "PQC Migration", "Cisco Silicon One"],
    desc: "Nation-state adversaries are harvesting encrypted traffic today. Understand the post-quantum transition before it's too late.",
  },
  {
    id: "cisco",
    label: "Cisco Enterprise",
    color: "indigo",
    accent: "from-indigo-500/15 to-transparent",
    border: "border-indigo-500/20",
    textColor: "text-indigo-400",
    dotColor: "bg-indigo-400",
    stages: "22",
    icon: "🌐",
    topics: ["DNS Tunneling", "DGA Detection", "Fast Flux", "Cisco Umbrella", "VOLT TYPHOON"],
    desc: "Enterprise-grade DNS-layer defense, real Cisco CVEs, and nation-state threat actor scenarios.",
  },
];

const threatHighlights = [
  {
    label: "AI Model Attacks",
    icon: "🤖",
    color: "purple",
    tagColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    items: [
      "Prompt injection across 10 OWASP LLM categories",
      "RAG poisoning and training data extraction",
      "AI agent hijacking and tool abuse",
    ],
  },
  {
    label: "Post-Quantum Threats",
    icon: "⚛️",
    color: "cyan",
    tagColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    items: [
      "Harvest-now-decrypt-later attack scenarios",
      "ML-KEM and ML-DSA cryptographic migration",
      "Cisco silicon-level PQC hardware integration",
    ],
  },
  {
    label: "Nation-State DNS Ops",
    icon: "🌐",
    color: "indigo",
    tagColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    items: [
      "VOLT TYPHOON critical infrastructure pre-positioning",
      "OilRig DNSpionage tunneling (DNScat2/iodine)",
      "Emotet DGA detection and WIZARD SPIDER campaigns",
    ],
  },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main
        className="min-h-screen flex flex-col"
        style={{ background: "linear-gradient(160deg, #060a10 0%, #0d1117 40%, #0a0e1a 100%)" }}
      >
        {/* ── Hero ── */}
        <section className="relative flex flex-col items-center justify-center text-center px-4 pt-36 pb-28 overflow-hidden">
          {/* Glow orbs */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-32 left-1/3 w-[300px] h-[200px] bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-40 right-1/4 w-[250px] h-[200px] bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/25 rounded-full px-4 py-1.5 mb-8 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-medium">169 Stages · AI Security · Post-Quantum · Cisco CVEs</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none tracking-tight">
              <span className="text-white">The Threats</span>
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(90deg, #22d3ee, #a78bfa, #6366f1)" }}
              >
                Have Changed.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-3 font-semibold">
              AI attacks. Quantum decryption. Nation-state DNS ops.
            </p>

            <p className="text-base text-gray-500 mb-4 max-w-2xl mx-auto leading-relaxed">
              Master the full threat landscape — from classic CVEs that breached Equifax and the NHS to
              LLM prompt injection, post-quantum cryptography, and VOLT TYPHOON critical infrastructure campaigns.
            </p>

            <p className="text-sm text-gray-600 mb-10">
              No setup. No installations. Six curriculum tracks in your browser.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="px-8 py-4 font-bold rounded-xl text-base transition-all text-black hover:scale-105"
                style={{ background: "linear-gradient(90deg, #22d3ee, #818cf8)" }}
              >
                Start Training — Free →
              </Link>
              <Link
                href="/stages"
                className="px-8 py-4 border border-white/15 hover:border-cyan-500/50 text-gray-300 hover:text-white font-semibold rounded-xl text-base transition-all backdrop-blur-sm"
              >
                View All 169 Stages
              </Link>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="border-y border-white/5 bg-white/2 py-10 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "169", label: "Training Stages" },
              { value: "6", label: "Curriculum Tracks" },
              { value: "25+", label: "Real CVEs" },
              { value: "3.5M", label: "Unfilled Cyber Jobs" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-4xl font-black text-transparent bg-clip-text mb-1"
                  style={{ backgroundImage: "linear-gradient(90deg, #22d3ee, #a78bfa)" }}
                >
                  {s.value}
                </div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Threat highlights (AI / Quantum / DNS) ── */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-mono text-purple-400/70 uppercase tracking-widest mb-3">The frontier threats</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Beyond the OWASP Top 10</h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                The threat landscape has expanded. Defenders now need to understand AI model attacks,
                post-quantum cryptographic transitions, and state-sponsored DNS operations.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {threatHighlights.map((t) => (
                <div
                  key={t.label}
                  className="bg-white/2 border border-white/8 rounded-2xl p-6 hover:border-white/15 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{t.icon}</span>
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${t.tagColor}`}>
                      {t.label}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {t.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="text-gray-600 mt-0.5">›</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Curriculum Tracks ── */}
        <section className="py-20 px-4 bg-white/2 border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs font-mono text-cyan-400/70 uppercase tracking-widest mb-2">Six curriculum tracks</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">A complete security education</h2>
                <p className="text-gray-500">From SQL injection to post-quantum cryptography. Every track is hands-on CTF.</p>
              </div>
              <Link href="/stages" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                View stage map →
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className={`relative rounded-2xl border ${track.border} p-6 bg-gradient-to-br ${track.accent} overflow-hidden hover:border-opacity-50 transition-all group`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{track.icon}</span>
                      <div>
                        <p className={`font-bold text-base ${track.textColor}`}>{track.label}</p>
                        <p className="text-xs text-gray-600 font-mono">{track.stages} stages</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-4 leading-relaxed">{track.desc}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {track.topics.slice(0, 4).map((topic) => (
                      <span
                        key={topic}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${track.border} ${track.textColor} bg-white/3`}
                      >
                        {topic}
                      </span>
                    ))}
                    {track.topics.length > 4 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded text-gray-600">
                        +{track.topics.length - 4} more
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">How it works</h2>
              <p className="text-gray-500">Three steps from zero to defender</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  icon: "📖",
                  title: "Read the briefing",
                  desc: "Each stage opens with a full breakdown of the vulnerability — how it works, what it exploits, and the real attack that made headlines.",
                },
                {
                  step: "02",
                  icon: "💻",
                  title: "Run the exploit",
                  desc: "Drop into a simulated terminal. Use real commands to investigate, exploit, and capture the flag — built on the actual vulnerable environment.",
                },
                {
                  step: "03",
                  icon: "🏆",
                  title: "Earn & rank up",
                  desc: "Capture the flag, earn XP, unlock your badge, and climb the leaderboard. Each stage gates the next — no skipping.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative bg-white/3 border border-white/10 rounded-2xl p-7 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="absolute -top-3 left-6 text-xs font-mono font-bold text-cyan-500/60 bg-gray-950 px-2">
                    {item.step}
                  </div>
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Feature highlights ── */}
        <section className="py-24 px-4 bg-white/2 border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Built different</h2>
              <p className="text-gray-500">Not another video course. Not another quiz bank.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🎯",
                  border: "border-cyan-500/20",
                  bg: "rgba(34,211,238,0.06)",
                  title: "Real exploit environments",
                  desc: "Every CTF challenge is modeled on the actual server, code, or config from the real incident. Not a simulation of a simulation.",
                },
                {
                  icon: "🤖",
                  border: "border-purple-500/20",
                  bg: "rgba(167,139,250,0.06)",
                  title: "ARIA AI hint assistant",
                  desc: "Stuck? ARIA — powered by Claude — gives contextual hints without revealing flags. Available on every stage, rate-limited to keep it fair.",
                },
                {
                  icon: "📊",
                  border: "border-orange-500/20",
                  bg: "rgba(251,146,60,0.06)",
                  title: "Gamified progression",
                  desc: "Linear stage gating, XP, badges, and a live leaderboard. The same mechanics that make games addictive — applied to security training.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className={`relative rounded-2xl border ${f.border} p-7 overflow-hidden`}
                  style={{ background: f.bg }}
                >
                  <div className="text-4xl mb-5">{f.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Job outcomes ── */}
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-4">
              <p className="text-xs font-mono text-emerald-400/70 uppercase tracking-widest mb-3">3.5 million unfilled positions globally</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Train for jobs that are hiring right now</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Every stage maps to real skills employers list in job postings. Here's what you'll be qualified to do.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-12">
              {[
                {
                  role: "SOC Analyst",
                  salary: "$70K – $100K",
                  emoji: "🛡️",
                  color: "cyan",
                  skills: ["Threat detection & log analysis", "Incident triage and response", "CVE identification"],
                  coveredIn: ["AI Threat Detection", "WannaCry / EternalBlue", "Log4Shell"],
                },
                {
                  role: "Penetration Tester",
                  salary: "$90K – $140K",
                  emoji: "🎯",
                  color: "purple",
                  skills: ["Web application exploitation", "Network vulnerability assessment", "CTF-style attack simulation"],
                  coveredIn: ["SQL Injection", "XSS", "SSRF", "Heartbleed"],
                },
                {
                  role: "AI / LLM Security Engineer",
                  salary: "$120K – $180K",
                  emoji: "🤖",
                  color: "indigo",
                  skills: ["LLM prompt injection testing", "AI model threat modeling", "OWASP LLM Top 10 assessment"],
                  coveredIn: ["Prompt Injection", "Model Poisoning", "RAG Attacks"],
                },
                {
                  role: "Cloud Security Engineer",
                  salary: "$110K – $160K",
                  emoji: "☁️",
                  color: "emerald",
                  skills: ["IAM misconfigurations", "Server-side request forgery", "DNS security & Cisco Umbrella"],
                  coveredIn: ["SSRF / Capital One", "DNS Tunneling", "Umbrella Policy"],
                },
              ].map((job) => {
                const accent: Record<string, string> = {
                  cyan: "border-cyan-500/20 from-cyan-500/8",
                  purple: "border-purple-500/20 from-purple-500/8",
                  indigo: "border-indigo-500/20 from-indigo-500/8",
                  emerald: "border-emerald-500/20 from-emerald-500/8",
                };
                const tag: Record<string, string> = {
                  cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
                  purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
                  indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
                  emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                };
                const dot: Record<string, string> = {
                  cyan: "bg-cyan-400",
                  purple: "bg-purple-400",
                  indigo: "bg-indigo-400",
                  emerald: "bg-emerald-400",
                };
                return (
                  <div
                    key={job.role}
                    className={`rounded-2xl border ${accent[job.color]} bg-gradient-to-br ${accent[job.color]} to-transparent p-6`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1 font-mono uppercase tracking-wider">Role</p>
                        <h3 className="text-white font-bold text-xl">{job.emoji} {job.role}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600 mb-1 font-mono uppercase tracking-wider">Avg salary</p>
                        <p className="text-white font-bold text-sm">{job.salary}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-gray-600 font-mono uppercase tracking-wider mb-2">Skills you'll build</p>
                      <ul className="space-y-1">
                        {job.skills.map((s) => (
                          <li key={s} className="flex items-center gap-2 text-sm text-gray-400">
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot[job.color]}`} />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 font-mono uppercase tracking-wider mb-2">Covered in</p>
                      <div className="flex flex-wrap gap-1.5">
                        {job.coveredIn.map((s) => (
                          <span key={s} className={`text-xs px-2 py-0.5 rounded border font-mono ${tag[job.color]}`}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-sm text-gray-600 mt-8">
              Completions generate shareable certificates.{" "}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Start earning them →
              </Link>
            </p>
          </div>
        </section>

        {/* ── CTA banner ── */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="rounded-2xl p-12 border border-cyan-500/20 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.08) 0%, rgba(167,139,250,0.08) 50%, rgba(99,102,241,0.08) 100%)" }}
            >
              <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                  backgroundImage: "linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }} />
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 relative z-10">
                The future of defense starts here.
              </h2>
              <p className="text-gray-400 mb-2 relative z-10">
                Six tracks. 169 stages. AI, quantum, and enterprise DNS — all hands-on.
              </p>
              <p className="text-gray-600 text-sm mb-8 relative z-10">
                Free to start. No credit card. No setup.
              </p>
              <Link
                href="/login"
                className="inline-block px-10 py-4 font-bold rounded-xl text-black text-lg relative z-10 transition-all hover:scale-105"
                style={{ background: "linear-gradient(90deg, #22d3ee, #818cf8)" }}
              >
                Create Free Account →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-white/5 py-8 px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xl">🛡️</span>
            <span className="text-white font-bold">Kryptós <span className="text-cyan-400">CronOS</span></span>
          </div>
          <div className="flex justify-center gap-6 text-sm text-gray-600 mb-3">
            <Link href="/stages" className="hover:text-gray-400 transition-colors">Stages</Link>
            <Link href="/leaderboard" className="hover:text-gray-400 transition-colors">Leaderboard</Link>
            <Link href="/login" className="hover:text-gray-400 transition-colors">Sign In</Link>
          </div>
          <p className="text-xs text-gray-700">© 2026 Kryptós CronOS (κρυπτός χρόνος) · Built for defenders</p>
        </footer>
      </main>
    </>
  );
}
