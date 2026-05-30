"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchProgress } from "@/lib/progress";
import { getSession } from "@/lib/auth";
import {
  CERT_DOMAINS,
  computeCertReadiness,
  type CertId,
  type CertDomain,
  type CertDomainDef,
} from "@/data/cert-domains";
import { stagesMeta } from "@/data/stages-meta";

// ─── Cert configuration ────────────────────────────────────────────────────────

type CertConfig = {
  id: CertId;
  name: string;
  examCode: string;
  emoji: string;
  tagline: string;
  examUrl: string;
  salaryRange: string;
  jobCount: string;
  cost: string;
  questions: string;
  passingScore: string;
  prerequisites: string;
  studyHours: string;
  gradient: string;
  ringColor: string;
  accentClass: string;
  barClass: string;
  borderClass: string;
  bgClass: string;
  badgeClass: string;
};

const CERTS: CertConfig[] = [
  {
    id: "comptia-secplus",
    name: "CompTIA Security+",
    examCode: "SY0-701",
    emoji: "🔐",
    tagline: "The industry-standard entry certification for security professionals — vendor-neutral, DoD-approved, and globally recognized. Required by thousands of employers.",
    examUrl: "https://www.comptia.org/certifications/security",
    salaryRange: "$75k – $110k",
    jobCount: "700k+ open roles",
    cost: "$392 USD",
    questions: "90 max",
    passingScore: "750 / 900",
    prerequisites: "None required (Network+ and 2 yrs experience recommended)",
    studyHours: "40–60 hours",
    gradient: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.06) 100%)",
    ringColor: "#818cf8",
    accentClass: "text-indigo-400",
    barClass: "bg-indigo-500",
    borderClass: "border-indigo-500/30",
    bgClass: "bg-indigo-500/5",
    badgeClass: "bg-indigo-500/15 border-indigo-500/30 text-indigo-300",
  },
  {
    id: "isc2-cc",
    name: "ISC² CC",
    examCode: "Certified in Cybersecurity",
    emoji: "🛡️",
    tagline: "ISC²'s entry-level certification. Currently free to take — designed to get your first cybersecurity job. Backed by the world's largest security membership body.",
    examUrl: "https://www.isc2.org/certifications/cc",
    salaryRange: "$65k – $95k",
    jobCount: "500k+ open roles",
    cost: "Free (ISC² members)",
    questions: "100",
    passingScore: "700 / 1000",
    prerequisites: "None",
    studyHours: "30–40 hours",
    gradient: "linear-gradient(135deg, rgba(20,184,166,0.08) 0%, rgba(6,182,212,0.06) 100%)",
    ringColor: "#2dd4bf",
    accentClass: "text-teal-400",
    barClass: "bg-teal-500",
    borderClass: "border-teal-500/30",
    bgClass: "bg-teal-500/5",
    badgeClass: "bg-teal-500/15 border-teal-500/30 text-teal-300",
  },
  {
    id: "comptia-netplus",
    name: "CompTIA Network+",
    examCode: "N10-009",
    emoji: "🌐",
    tagline: "The foundational networking certification. Every security professional needs a deep understanding of how networks are built, operated, secured, and troubleshot. Network+ proves it.",
    examUrl: "https://www.comptia.org/certifications/network",
    salaryRange: "$65k – $100k",
    jobCount: "400k+ open roles",
    cost: "$358 USD",
    questions: "90 max",
    passingScore: "720 / 900",
    prerequisites: "None required (CompTIA A+ recommended)",
    studyHours: "40–60 hours",
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(6,182,212,0.06) 100%)",
    ringColor: "#60a5fa",
    accentClass: "text-blue-400",
    barClass: "bg-blue-500",
    borderClass: "border-blue-500/30",
    bgClass: "bg-blue-500/5",
    badgeClass: "bg-blue-500/15 border-blue-500/30 text-blue-300",
  },
  {
    id: "comptia-cysa",
    name: "CompTIA CySA+",
    examCode: "CS0-003",
    emoji: "🔬",
    tagline: "The analyst-level security certification. CySA+ validates threat detection, vulnerability management, and incident response skills — the day-to-day work of a SOC analyst.",
    examUrl: "https://www.comptia.org/certifications/cybersecurity-analyst",
    salaryRange: "$90k – $130k",
    jobCount: "250k+ open roles",
    cost: "$392 USD",
    questions: "85 max",
    passingScore: "750 / 900",
    prerequisites: "Security+ and 4 yrs hands-on experience (recommended)",
    studyHours: "60–90 hours",
    gradient: "linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(234,179,8,0.06) 100%)",
    ringColor: "#fb923c",
    accentClass: "text-orange-400",
    barClass: "bg-orange-500",
    borderClass: "border-orange-500/30",
    bgClass: "bg-orange-500/5",
    badgeClass: "bg-orange-500/15 border-orange-500/30 text-orange-300",
  },
  {
    id: "isaca-cisa",
    name: "ISACA CISA",
    examCode: "Certified Information Systems Auditor",
    emoji: "🔍",
    tagline: "The gold standard for IT audit professionals. CISA is recognized in 180+ countries and required by major audit firms, government agencies, and Fortune 500 internal audit teams.",
    examUrl: "https://www.isaca.org/credentialing/cisa",
    salaryRange: "$95k – $140k",
    jobCount: "200k+ open roles",
    cost: "$575 member / $760 non-member",
    questions: "150",
    passingScore: "450 / 800",
    prerequisites: "5 yrs IS audit/control/security experience (substitutions available)",
    studyHours: "120–150 hours",
    gradient: "linear-gradient(135deg, rgba(234,179,8,0.08) 0%, rgba(163,127,7,0.06) 100%)",
    ringColor: "#eab308",
    accentClass: "text-yellow-400",
    barClass: "bg-yellow-500",
    borderClass: "border-yellow-500/30",
    bgClass: "bg-yellow-500/5",
    badgeClass: "bg-yellow-500/15 border-yellow-500/30 text-yellow-300",
  },
  {
    id: "isaca-cism",
    name: "ISACA CISM",
    examCode: "Certified Information Security Manager",
    emoji: "🏛️",
    tagline: "The management-level security certification. CISM bridges technical security and business leadership — the path from security practitioner to CISO. Globally recognized as the credential for security managers.",
    examUrl: "https://www.isaca.org/credentialing/cism",
    salaryRange: "$115k – $165k",
    jobCount: "150k+ open roles",
    cost: "$575 member / $760 non-member",
    questions: "150",
    passingScore: "450 / 800",
    prerequisites: "5 yrs IS management experience with 3 yrs in security management",
    studyHours: "100–130 hours",
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(139,92,246,0.06) 100%)",
    ringColor: "#a855f7",
    accentClass: "text-purple-400",
    barClass: "bg-purple-500",
    borderClass: "border-purple-500/30",
    bgClass: "bg-purple-500/5",
    badgeClass: "bg-purple-500/15 border-purple-500/30 text-purple-300",
  },
  {
    id: "isaca-crisc",
    name: "ISACA CRISC",
    examCode: "Certified in Risk and Information Systems Control",
    emoji: "⚖️",
    tagline: "The definitive risk management certification. CRISC holders translate IT risk into business language, design and implement controls, and report risk to boards and executives. One of the highest-paying IT certs globally.",
    examUrl: "https://www.isaca.org/credentialing/crisc",
    salaryRange: "$120k – $175k",
    jobCount: "120k+ open roles",
    cost: "$575 member / $760 non-member",
    questions: "150",
    passingScore: "450 / 800",
    prerequisites: "3 yrs IT risk management and IS control experience",
    studyHours: "100–130 hours",
    gradient: "linear-gradient(135deg, rgba(20,184,166,0.08) 0%, rgba(16,185,129,0.06) 100%)",
    ringColor: "#14b8a6",
    accentClass: "text-teal-400",
    barClass: "bg-teal-600",
    borderClass: "border-teal-500/30",
    bgClass: "bg-teal-500/5",
    badgeClass: "bg-teal-500/15 border-teal-500/30 text-teal-300",
  },
  {
    id: "comptia-aiplus",
    name: "CompTIA AI+",
    examCode: "AI+",
    emoji: "🤖",
    tagline: "The first vendor-neutral AI certification from CompTIA. AI+ validates skills in machine learning, generative AI, AI security, and responsible AI governance — the credential the industry needs as AI becomes every professional's tool.",
    examUrl: "https://www.comptia.org/certifications/artificial-intelligence",
    salaryRange: "$95k – $145k",
    jobCount: "300k+ open roles",
    cost: "$392 USD",
    questions: "90 max",
    passingScore: "700 / 900",
    prerequisites: "None required (Security+ or equivalent experience recommended)",
    studyHours: "40–70 hours",
    gradient: "linear-gradient(135deg, rgba(14,165,233,0.08) 0%, rgba(99,102,241,0.06) 100%)",
    ringColor: "#38bdf8",
    accentClass: "text-sky-400",
    barClass: "bg-sky-500",
    borderClass: "border-sky-500/30",
    bgClass: "bg-sky-500/5",
    badgeClass: "bg-sky-500/15 border-sky-500/30 text-sky-300",
  },
];

// ─── Stage lookup helpers ──────────────────────────────────────────────────────

function stageIdsForDomain(certId: CertId, domainId: string): string[] {
  return Object.entries(CERT_DOMAINS)
    .filter(([, cds]: [string, CertDomain[]]) =>
      cds.some((d) => d.certId === certId && d.domainId === domainId)
    )
    .map(([id]) => id);
}

function allStageIdsForCert(certId: CertId): string[] {
  return [
    ...new Set(
      Object.entries(CERT_DOMAINS)
        .filter(([, cds]: [string, CertDomain[]]) => cds.some((d) => d.certId === certId))
        .map(([id]) => id)
    ),
  ];
}

// ─── Readiness ring ───────────────────────────────────────────────────────────

function ReadinessRing({ pct, color }: { pct: number; color: string }) {
  const r = 48;
  const circ = 2 * Math.PI * r;
  const filled = (pct / 100) * circ;
  const grade =
    pct >= 80 ? "EXAM READY" :
    pct >= 60 ? "PROGRESSING" :
    pct >= 30 ? "IN TRAINING" :
                "GETTING STARTED";

  return (
    <div className="flex flex-col items-center gap-2 flex-shrink-0">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 110 110">
          <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9" />
          <circle
            cx="55" cy="55" r={r} fill="none"
            stroke={color} strokeWidth="9"
            strokeDasharray={`${filled} ${circ}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 1.2s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-white">{pct}%</span>
          <span className="text-gray-600 text-[9px] uppercase tracking-widest">ready</span>
        </div>
      </div>
      <span
        className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border"
        style={{ color, borderColor: color + "40", background: color + "15" }}
      >
        {grade}
      </span>
    </div>
  );
}

// ─── Exam detail pill ─────────────────────────────────────────────────────────

function Pill({ label, value, cert }: { label: string; value: string; cert: CertConfig }) {
  return (
    <div className={`text-xs px-3 py-1.5 rounded-lg border ${cert.borderClass} ${cert.bgClass}`}>
      <span className="text-gray-500">{label}: </span>
      <span className={`font-bold ${cert.accentClass}`}>{value}</span>
    </div>
  );
}

// ─── Domain row ───────────────────────────────────────────────────────────────

function DomainRow({
  domain, completed, total, pct, cert, completedIds, expanded, onToggle,
}: {
  domain: CertDomainDef;
  completed: number;
  total: number;
  pct: number;
  cert: CertConfig;
  completedIds: string[];
  expanded: boolean;
  onToggle: () => void;
}) {
  const stageIds = stageIdsForDomain(cert.id, domain.id);
  const completedStages = stageIds.filter((id) => completedIds.includes(id));
  const remainingStages = stageIds.filter((id) => !completedIds.includes(id));

  return (
    <div className={`rounded-xl border overflow-hidden ${cert.borderClass}`}>
      <button
        className={`w-full px-5 py-3.5 flex items-center gap-3 hover:bg-white/3 transition-colors text-left ${cert.bgClass}`}
        onClick={onToggle}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h3 className={`font-bold text-sm ${cert.accentClass}`}>{domain.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full border font-mono flex-shrink-0 ${cert.badgeClass}`}>
              {domain.weight}% of exam
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden">
              <div
                className={`h-full rounded-full ${cert.barClass} transition-all duration-700`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className={`text-xs font-bold flex-shrink-0 ${cert.accentClass}`}>
              {completed}/{total}
            </span>
          </div>
        </div>
        <span className="text-gray-600 text-xs flex-shrink-0">{expanded ? "▲" : "▼"}</span>
      </button>

      {expanded && (
        <div className="px-5 pb-4 pt-2 border-t border-white/8">
          {completedStages.length > 0 && (
            <div className="mb-3">
              <p className="text-gray-600 text-xs uppercase tracking-widest mb-2 font-semibold">
                ✓ Completed ({completedStages.length})
              </p>
              <div className="space-y-1">
                {completedStages.map((id) => {
                  const meta = stagesMeta.find((s) => s.id === id);
                  return (
                    <Link
                      key={id}
                      href={`/stages/${id}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/8 hover:border-white/15 transition-colors"
                    >
                      <span className="text-green-400 text-xs flex-shrink-0">✓</span>
                      <span className="text-gray-300 text-xs truncate">{meta?.title ?? id}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
          {remainingStages.length > 0 && (
            <div>
              <p className="text-gray-600 text-xs uppercase tracking-widest mb-2 font-semibold">
                Remaining ({remainingStages.length})
              </p>
              <div className="space-y-1">
                {remainingStages.map((id) => {
                  const meta = stagesMeta.find((s) => s.id === id);
                  return (
                    <Link
                      key={id}
                      href={`/stages/${id}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/8 hover:border-white/15 transition-colors group"
                    >
                      <span className="text-gray-700 text-xs flex-shrink-0">○</span>
                      <span className="text-gray-500 group-hover:text-gray-300 text-xs truncate transition-colors">
                        {meta?.title ?? id}
                      </span>
                      <span className="ml-auto text-gray-700 group-hover:text-gray-500 text-xs flex-shrink-0 transition-colors">→</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Cert card ────────────────────────────────────────────────────────────────

function CertCard({
  cert, completedIds, loading, username,
}: {
  cert: CertConfig;
  completedIds: string[];
  loading: boolean;
  username: string | null;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const { overall, domains } = computeCertReadiness(cert.id, completedIds);

  const allMapped = allStageIdsForCert(cert.id);
  const totalMapped = allMapped.length;
  const totalCompleted = allMapped.filter((id) => completedIds.includes(id)).length;

  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: cert.gradient }}>

      {/* Hero */}
      <div className="p-6 flex flex-col sm:flex-row items-center gap-5">
        {loading
          ? <div className="w-28 h-28 rounded-full bg-white/5 animate-pulse flex-shrink-0" />
          : <ReadinessRing pct={overall} color={cert.ringColor} />
        }
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <div className="flex items-center gap-2 mb-0.5 justify-center sm:justify-start flex-wrap">
            <span className="text-xl">{cert.emoji}</span>
            <h2 className="text-lg font-black text-white">{cert.name}</h2>
            <span className={`text-xs font-mono px-2 py-0.5 rounded border ${cert.badgeClass}`}>
              {cert.examCode}
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-3">{cert.tagline}</p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <Pill label="Salary" value={cert.salaryRange} cert={cert} />
            <Pill label="Open jobs" value={cert.jobCount} cert={cert} />
            <Pill label="Stages" value={username ? `${totalCompleted}/${totalMapped}` : `${totalMapped} mapped`} cert={cert} />
          </div>
        </div>
      </div>

      {/* Exam details toggle */}
      <div className="px-6 pb-3">
        <button
          className="text-xs text-gray-600 hover:text-gray-400 transition-colors flex items-center gap-1"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "▲ Hide exam details" : "▼ Exam details"}
        </button>
        {showDetails && (
          <div className={`mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 p-4 rounded-xl border ${cert.borderClass} ${cert.bgClass}`}>
            <div>
              <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-0.5">Cost</p>
              <p className={`text-sm font-bold ${cert.accentClass}`}>{cert.cost}</p>
            </div>
            <div>
              <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-0.5">Questions</p>
              <p className={`text-sm font-bold ${cert.accentClass}`}>{cert.questions}</p>
            </div>
            <div>
              <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-0.5">Passing score</p>
              <p className={`text-sm font-bold ${cert.accentClass}`}>{cert.passingScore}</p>
            </div>
            <div>
              <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-0.5">Study time</p>
              <p className={`text-sm font-bold ${cert.accentClass}`}>{cert.studyHours}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-0.5">Prerequisites</p>
              <p className="text-gray-400 text-xs">{cert.prerequisites}</p>
            </div>
          </div>
        )}
      </div>

      {/* Domain mini-grid */}
      <div className="px-6 pb-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
        {domains.map(({ domain, pct }) => (
          <div key={domain.id} className={`rounded-lg px-3 py-2 border ${cert.borderClass} ${cert.bgClass}`}>
            <p className={`text-xs font-semibold ${cert.accentClass}`}>{domain.weight}%</p>
            <p className="text-white font-bold text-sm">{pct}%</p>
            <p className="text-gray-600 text-xs truncate">{domain.name}</p>
          </div>
        ))}
      </div>

      {/* CTA bar */}
      <div className="px-6 py-3 border-t border-white/8 flex items-center justify-between gap-3">
        <p className="text-gray-500 text-xs">
          {username
            ? `${totalCompleted} of ${totalMapped} stages completed`
            : "Sign in to track your readiness"}
        </p>
        <div className="flex-shrink-0 flex items-center gap-2">
          <Link
            href={`/exam/cert/${cert.id}`}
            className="px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105 border border-white/15 bg-white/5 text-gray-200 hover:bg-white/10"
          >
            📝 Practice Exam
          </Link>
          <a
            href={cert.examUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105 border"
            style={{ borderColor: cert.ringColor + "60", background: cert.ringColor + "20", color: cert.ringColor }}
          >
            Register →
          </a>
        </div>
      </div>

      {/* Domain breakdown accordion */}
      <div className="px-6 pb-6 border-t border-white/6 pt-4">
        <p className="text-gray-600 text-xs uppercase tracking-widest font-semibold mb-3">Domain Breakdown</p>
        <div className="space-y-2">
          {domains.map(({ domain, completed, total, pct }) => (
            <DomainRow
              key={domain.id}
              domain={domain}
              completed={completed}
              total={total}
              pct={pct}
              cert={cert}
              completedIds={completedIds}
              expanded={expanded === domain.id}
              onToggle={() => setExpanded(expanded === domain.id ? null : domain.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Cert path recommendation bar ────────────────────────────────────────────

function PathGuide() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/2 p-6 mb-8">
      <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
        <span className="text-yellow-400">🗺️</span> Recommended Learning Path
      </h2>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <span className="text-blue-400 font-bold">🌐 Network+</span>
          <span className="text-gray-600">First Journey epochs</span>
        </div>
        <span className="text-gray-700 hidden sm:block">→</span>
        <div className="flex items-center gap-2">
          <span className="text-teal-400 font-bold">🛡️ ISC² CC</span>
          <span className="text-gray-600">All security tracks</span>
        </div>
        <span className="text-gray-700 hidden sm:block">→</span>
        <div className="flex items-center gap-2">
          <span className="text-indigo-400 font-bold">🔐 Security+</span>
          <span className="text-gray-600">Cisco, MITRE, Quantum epochs</span>
        </div>
        <span className="text-gray-700 hidden sm:block">→</span>
        <div className="flex items-center gap-2">
          <span className="text-orange-400 font-bold">🔬 CySA+</span>
          <span className="text-gray-600">Tech Audit, SecOps, Threat Intel</span>
        </div>
      </div>
      <p className="text-gray-600 text-xs mt-3">
        This path builds skills progressively. Network+ gives you the foundation; CySA+ is the analyst-level target for most SOC roles.
        The <Link href="/cyberops" className="text-cyan-500 hover:text-cyan-400 transition-colors">CyberOps Associate</Link> tracker covers the Cisco-specific exam separately.
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CertsPage() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = getSession();
    setUsername(u);
    if (!u) { setLoading(false); return; }
    fetchProgress().then((p) => {
      if (p) setCompletedIds(p.completedStages);
    }).finally(() => setLoading(false));
  }, []);

  const navItems = [
    { id: "cyberops", label: "Cisco CyberOps", emoji: "🎓" },
    ...CERTS.map((c) => ({ id: c.id, label: c.name, emoji: c.emoji })),
  ];

  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{ background: "linear-gradient(135deg, #0d1117 0%, #0a0e1a 100%)" }}
    >
      <div className="max-w-6xl mx-auto">

        <Link href="/stages" className="text-gray-500 hover:text-indigo-400 text-sm mb-6 inline-block transition-colors">
          ← Stage Map
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs px-2.5 py-1 rounded-full border text-indigo-400 bg-indigo-400/10 border-indigo-400/30 font-semibold">
              Certification Paths
            </span>
            <span className="text-xs text-gray-600">Network+ · Security+ · ISC² CC · CySA+</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Certificate Paths</h1>
          <p className="text-gray-400 leading-relaxed max-w-2xl">
            Track your readiness for four industry-leading certifications. Every stage you complete maps
            to real exam domains — see exactly where you stand and which stages to tackle next.
            Also check the <Link href="/cyberops" className="text-cyan-400 hover:text-cyan-300 transition-colors">CyberOps Associate tracker</Link> for the Cisco-specific path, or build a <Link href="/resume" className="text-cyan-400 hover:text-cyan-300 transition-colors">resume</Link> from your completed stages.
          </p>
        </div>

        <div className="flex gap-8 items-start">
          {/* Left sidebar — jump nav (like /admin) */}
          <aside className="hidden lg:block w-52 flex-shrink-0 sticky top-20">
            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-600 mb-3 px-3">Certifications</p>
            <nav className="space-y-0.5">
              {navItems.map(({ id, label, emoji }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span className="flex-shrink-0">{emoji}</span>
                  <span className="truncate">{label}</span>
                </a>
              ))}
            </nav>
            <div className="mt-4 pt-3 border-t border-white/5">
              <p className="text-[10px] font-mono uppercase tracking-widest text-gray-600 mb-3 px-3">Career</p>
              <Link href="/resume" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                <span className="flex-shrink-0">📄</span>
                <span className="truncate">Resume Builder</span>
              </Link>
            </div>
          </aside>

          {/* Main column */}
          <div className="flex-1 min-w-0">
            <PathGuide />

            {/* CyberOps — featured first */}
            <div id="cyberops" className="scroll-mt-24 mb-6 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-2xl">🎓</span>
                    <h2 className="text-xl font-black text-white">Cisco CyberOps Associate</h2>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">CBROPS 200-201</span>
                  </div>
                  <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
                    The SOC-analyst entry cert — security monitoring, host and network intrusion analysis,
                    and incident response. Your Cisco, Umbrella, and threat-framework stages map to its five exam domains.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-gray-500">
                    <span>💼 $60k–$95k</span><span className="text-gray-700">·</span>
                    <span>⏱ 50–70 hrs</span><span className="text-gray-700">·</span>
                    <span>5 exam domains</span>
                  </div>
                </div>
                <Link
                  href="/cyberops"
                  className="flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold text-black transition-all hover:scale-105"
                  style={{ background: "linear-gradient(90deg, #22d3ee, #818cf8)" }}
                >
                  Open the CyberOps tracker →
                </Link>
              </div>
            </div>

            {/* Certification cards */}
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
              {CERTS.map((cert) => (
                <div key={cert.id} id={cert.id} className="scroll-mt-24">
                  <CertCard
                    cert={cert}
                    completedIds={completedIds}
                    loading={loading}
                    username={username}
                  />
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-gray-700 text-xs leading-relaxed">
              Stage-to-domain mappings reflect official exam blueprints (SY0-701, N10-009, CS0-003, CC v1.0).
              Completing all mapped stages does not guarantee exam passage — use this as a readiness guide alongside
              official study materials and practice exams.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
