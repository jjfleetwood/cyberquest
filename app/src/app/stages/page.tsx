"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { stages as allStages, epochs } from "@/data/stages";
import { getProgress } from "@/lib/progress";
import { getSession, clearSession } from "@/lib/auth";

// ── Track groupings ────────────────────────────────────────────────────────────
const epochGroups = [
  {
    label: "Core Security",
    desc: "Foundations → Real CVEs",
    epochIds: ["before-times", "ancient"],
  },
  {
    label: "Tech Audit",
    desc: "IT Governance → Cloud → AI Agents",
    epochIds: ["tech-audit-1", "tech-audit-2", "tech-audit-3"],
  },
  {
    label: "Threat Frameworks",
    desc: "MITRE ATT&CK → MITRE ATLAS",
    epochIds: ["mitre", "mitre-atlas"],
  },
  {
    label: "AI Security",
    desc: "OWASP LLM Top 10",
    epochIds: ["owasp-llm"],
  },
  {
    label: "Quantum Era",
    desc: "Threats → PQC → QKD Infrastructure",
    epochIds: ["quantum-1", "quantum-2", "quantum-3"],
  },
  {
    label: "Defend the Enterprise",
    desc: "Real CVEs · DNS Security · Cloud SASE",
    epochIds: ["medieval", "umbrella"],
  },
];

// ── Accent palette ─────────────────────────────────────────────────────────────
const epochAccent: Record<string, { tab: string; active: string; bar: string }> = {
  "before-times": { tab: "text-emerald-400 border-emerald-400 bg-emerald-400/10", active: "border-emerald-400/60 bg-emerald-500/5", bar: "bg-emerald-500" },
  ancient:        { tab: "text-amber-400 border-amber-400 bg-amber-400/10",       active: "border-amber-400/60 bg-amber-500/5",   bar: "bg-amber-500" },
  medieval:       { tab: "text-blue-400 border-blue-400 bg-blue-400/10",          active: "border-blue-400/60 bg-blue-500/5",     bar: "bg-blue-500" },
  "tech-audit-1": { tab: "text-purple-400 border-purple-400 bg-purple-400/10",   active: "border-purple-400/60 bg-purple-500/5", bar: "bg-purple-500" },
  "tech-audit-2": { tab: "text-violet-400 border-violet-400 bg-violet-400/10",   active: "border-violet-400/60 bg-violet-500/5", bar: "bg-violet-500" },
  "tech-audit-3": { tab: "text-indigo-400 border-indigo-400 bg-indigo-400/10",   active: "border-indigo-400/60 bg-indigo-500/5", bar: "bg-indigo-500" },
  mitre:          { tab: "text-red-400 border-red-400 bg-red-400/10",            active: "border-red-400/60 bg-red-500/5",       bar: "bg-red-500" },
  "mitre-atlas":  { tab: "text-fuchsia-400 border-fuchsia-400 bg-fuchsia-400/10",active: "border-fuchsia-400/60 bg-fuchsia-500/5",bar: "bg-fuchsia-500" },
  "owasp-llm":    { tab: "text-orange-400 border-orange-400 bg-orange-400/10",   active: "border-orange-400/60 bg-orange-500/5", bar: "bg-orange-500" },
  "quantum-1":    { tab: "text-cyan-400 border-cyan-400 bg-cyan-400/10",         active: "border-cyan-400/60 bg-cyan-500/5",     bar: "bg-cyan-500" },
  "quantum-2":    { tab: "text-teal-400 border-teal-400 bg-teal-400/10",         active: "border-teal-400/60 bg-teal-500/5",     bar: "bg-teal-500" },
  "quantum-3":    { tab: "text-sky-400 border-sky-400 bg-sky-400/10",            active: "border-sky-400/60 bg-sky-500/5",       bar: "bg-sky-500" },
  umbrella:       { tab: "text-green-400 border-green-400 bg-green-400/10",      active: "border-green-400/60 bg-green-500/5",   bar: "bg-green-500" },
};

const cardBorder: Record<string, string> = {
  "before-times": "border-emerald-500/40 hover:border-emerald-400/80",
  ancient:        "border-amber-500/40 hover:border-amber-400/80",
  medieval:       "border-blue-500/40 hover:border-blue-400/80",
  "tech-audit-1": "border-purple-500/40 hover:border-purple-400/80",
  "tech-audit-2": "border-violet-500/40 hover:border-violet-400/80",
  "tech-audit-3": "border-indigo-500/40 hover:border-indigo-400/80",
  mitre:          "border-red-500/40 hover:border-red-400/80",
  "mitre-atlas":  "border-fuchsia-500/40 hover:border-fuchsia-400/80",
  "owasp-llm":    "border-orange-500/40 hover:border-orange-400/80",
  "quantum-1":    "border-cyan-500/40 hover:border-cyan-400/80",
  "quantum-2":    "border-teal-500/40 hover:border-teal-400/80",
  "quantum-3":    "border-sky-500/40 hover:border-sky-400/80",
  umbrella:       "border-green-500/40 hover:border-green-400/80",
};

const cardEmojiBg: Record<string, string> = {
  "before-times": "from-emerald-950 to-slate-950",
  ancient:        "from-amber-950 to-stone-950",
  medieval:       "from-blue-950 to-slate-950",
  "tech-audit-1": "from-purple-950 to-slate-950",
  "tech-audit-2": "from-violet-950 to-slate-950",
  "tech-audit-3": "from-indigo-950 to-slate-950",
  mitre:          "from-red-950 to-slate-950",
  "mitre-atlas":  "from-fuchsia-950 to-slate-950",
  "owasp-llm":    "from-orange-950 to-slate-950",
  "quantum-1":    "from-cyan-950 to-slate-950",
  "quantum-2":    "from-teal-950 to-slate-950",
  "quantum-3":    "from-sky-950 to-slate-950",
  umbrella:       "from-green-950 to-slate-950",
};

export default function StagesPage() {
  const router = useRouter();
  const [completedStages, setCompletedStages] = useState<string[]>([]);
  const [totalXp, setTotalXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [username, setUsername] = useState<string | null>(null);
  const [activeEpoch, setActiveEpoch] = useState("before-times");

  useEffect(() => {
    const session = getSession();
    setUsername(session);
    const progress = getProgress();
    setCompletedStages(progress.completedStages);
    setTotalXp(progress.xp);
    setStreak(progress.streak ?? 0);
  }, []);

  function handleLogout() {
    clearSession();
    router.refresh();
    setUsername(null);
  }

  async function handleDeleteAccount() {
    if (!window.confirm("Delete your account? This permanently removes all progress, XP, badges, and streak data and cannot be undone.")) return;
    await fetch("/api/delete-account", { method: "DELETE" });
    clearSession();
    if (typeof window !== "undefined") {
      localStorage.removeItem(`kryptos_progress_${username}`);
      localStorage.removeItem("kryptos_progress");
    }
    router.push("/");
  }

  const epochStages = allStages.filter((s) => s.epochId === activeEpoch);
  const currentEpoch = epochs.find((e) => e.id === activeEpoch)!;
  const accent = epochAccent[activeEpoch] ?? epochAccent.ancient;

  const nextStageId = epochStages.find(
    (s) => !completedStages.includes(s.id)
  )?.id;

  const gridCols =
    activeEpoch === "before-times"
      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  const maxXp = allStages.reduce((sum, s) => sum + s.xp, 0);

  return (
    <div
      className="min-h-screen px-4 py-16"
      style={{ background: "linear-gradient(135deg, #0d1117 0%, #0f2027 50%, #1a1a2e 100%)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-gray-500 hover:text-cyan-400 text-sm transition-colors">
              ← Back to Home
            </Link>
            <Link href="/leaderboard" className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
              🏆 Leaderboard
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Training Stage Map</h1>
          <p className="text-gray-400">Six tracks covering the full spectrum — from core CVEs to AI security and quantum cryptography.</p>

          {/* XP bar + streak */}
          <div className="mt-6 flex items-center gap-3 flex-wrap">
            <div className="flex-1 bg-white/5 rounded-full h-3">
              <div
                className={`${accent.bar} h-3 rounded-full transition-all duration-700`}
                style={{ width: `${maxXp > 0 ? (totalXp / maxXp) * 100 : 0}%` }}
              />
            </div>
            <span className="text-amber-400 font-mono text-sm">{totalXp} / {maxXp} XP</span>
            {streak > 0 && (
              <span
                className="flex items-center gap-1 text-sm font-mono font-bold px-2.5 py-0.5 rounded-full border"
                style={{
                  color: streak >= 7 ? "#fb923c" : "#facc15",
                  borderColor: streak >= 7 ? "rgba(251,146,60,0.4)" : "rgba(250,204,21,0.3)",
                  background: streak >= 7 ? "rgba(251,146,60,0.08)" : "rgba(250,204,21,0.06)",
                }}
              >
                🔥 {streak}d
              </span>
            )}
          </div>
        </div>

        {/* ── Grouped epoch tabs ─────────────────────────────────────────────── */}
        <div className="mb-6 space-y-3">
          {epochGroups.map((group) => {
            const groupEpochs = group.epochIds
              .map((id) => epochs.find((e) => e.id === id))
              .filter(Boolean) as typeof epochs;

            return (
              <div key={group.label}>
                {/* Track label */}
                <div className="flex items-center gap-3 mb-2 pl-1">
                  <span className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest whitespace-nowrap">
                    {group.label}
                  </span>
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="hidden sm:block text-[10px] text-gray-700 whitespace-nowrap">{group.desc}</span>
                </div>

                {/* Epoch buttons for this track */}
                <div className="flex gap-2 flex-wrap pl-4">
                  {groupEpochs.map((epoch) => {
                    const isActive = epoch.id === activeEpoch;
                    const ea = epochAccent[epoch.id] ?? epochAccent.ancient;
                    const stageCount = allStages.filter((s) => s.epochId === epoch.id).length;
                    const doneCount = allStages.filter(
                      (s) => s.epochId === epoch.id && completedStages.includes(s.id)
                    ).length;
                    return (
                      <button
                        key={epoch.id}
                        onClick={() => setActiveEpoch(epoch.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-semibold transition-all ${
                          isActive ? ea.tab : "border-white/15 text-gray-400 hover:border-white/30 hover:text-gray-300"
                        }`}
                      >
                        <span className="text-base leading-none">{epoch.emoji}</span>
                        <span className="hidden sm:inline">{epoch.name}</span>
                        <span className="sm:hidden">{epoch.name.split(" ").slice(1).join(" ")}</span>
                        {doneCount > 0 && (
                          <span className={`text-[10px] font-mono px-1 rounded ${isActive ? "bg-black/30" : "bg-white/10 text-gray-500"}`}>
                            {doneCount}/{stageCount}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Epoch header */}
        <div className={`rounded-xl border px-6 py-5 mb-6 ${accent.active}`}>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-3xl">{currentEpoch.emoji}</span>
            <div>
              <h2 className="text-white font-bold text-lg">{currentEpoch.name}</h2>
              <p className="text-gray-400 text-sm">{currentEpoch.subtitle}</p>
            </div>
            <div className="ml-auto text-right">
              <div className="text-xs text-gray-600 font-mono">{epochStages.length} stages</div>
              <div className="text-xs text-gray-600 font-mono">
                {allStages.filter((s) => s.epochId === activeEpoch && completedStages.includes(s.id)).length} completed
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-2">{currentEpoch.description}</p>
        </div>

        {/* Auth banner */}
        {username ? (
          <div className="flex items-center justify-between bg-cyan-500/5 border border-cyan-500/20 rounded-xl px-5 py-3 mb-6">
            <span className="text-sm text-gray-300">
              👤 Welcome, <span className="text-cyan-400 font-semibold">{username}</span>
            </span>
            <div className="flex items-center gap-4">
              <button onClick={handleLogout} className="text-xs text-gray-500 hover:text-red-400 transition-colors">
                Log out
              </button>
              <button onClick={handleDeleteAccount} className="text-xs text-gray-700 hover:text-red-500 transition-colors">
                Delete account
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white/3 border border-white/10 rounded-xl px-5 py-3 mb-6">
            <span className="text-sm text-gray-400">
              👤 Playing as Guest —{" "}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">Sign in</Link>{" "}
              to save progress across devices.
            </span>
          </div>
        )}

        {/* Stage grid */}
        <div className={`grid gap-3 ${gridCols}`}>
          {epochStages.map((stage) => {
            const completed = completedStages.includes(stage.id);
            const isNext = stage.id === nextStageId;

            const borderClass = completed
              ? "border-green-500/50 hover:border-green-400/80"
              : cardBorder[activeEpoch];

            return (
              <Link
                key={stage.id}
                href={`/stages/${stage.id}`}
                className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-200 hover:-translate-y-0.5 ${borderClass} ${
                  isNext ? "ring-2 ring-offset-2 ring-offset-slate-950 ring-current" : ""
                }`}
              >
                {/* Emoji panel */}
                <div
                  className={`relative flex items-center justify-center py-7 bg-gradient-to-b ${
                    completed ? "from-green-950 to-slate-950" : cardEmojiBg[activeEpoch]
                  }`}
                >
                  <span className="text-5xl leading-none drop-shadow-lg transition-transform duration-200 group-hover:scale-110">
                    {stage.wonder.emoji}
                  </span>

                  {completed && (
                    <div className="absolute inset-0 flex items-end justify-end p-2 pointer-events-none">
                      <span className="text-xs bg-green-500 text-black font-bold px-1.5 py-0.5 rounded-full leading-none">✓</span>
                    </div>
                  )}

                  <div className="absolute top-2 left-2">
                    <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded-md leading-none ${
                      completed ? "bg-green-500/20 text-green-400" : "bg-black/50 text-gray-300"
                    }`}>
                      {stage.order}
                    </span>
                  </div>

                  {(stage.challengeType === "ctf" || stage.cveId) && (
                    <div className="absolute top-2 right-2">
                      <span className="text-xs bg-black/60 text-gray-400 px-1 py-0.5 rounded font-mono leading-none">
                        {stage.cveId ? "CVE" : "CTF"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info panel */}
                <div className="px-2.5 py-2.5 bg-black/20">
                  <p className="text-xs text-gray-600 truncate leading-tight mb-0.5">{stage.wonder.name}</p>
                  <p className="text-xs font-semibold truncate leading-tight text-gray-200">{stage.title}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-xs text-amber-600 font-mono">+{stage.xp}</span>
                    <span className="text-xs text-gray-700">XP</span>
                    <span className="text-xs ml-auto">{stage.badge.emoji}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
