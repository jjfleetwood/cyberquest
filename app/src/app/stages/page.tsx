"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { stages as allStages, epochs } from "@/data/stages";
import { fetchProgress } from "@/lib/progress";
import { getSession, setSession, clearSession } from "@/lib/auth";
import OnboardingModal from "@/components/OnboardingModal";
import { epochAccent } from "@/app/stages/epoch-theme";
import { useSkin } from "@/contexts/SkinContext";

// ── Track groupings ────────────────────────────────────────────────────────────
const epochGroups = [
  {
    label: "Core Security",
    desc: "Foundations → Real CVEs",
    epochIds: ["first-journey", "ancient"],
  },
  {
    label: "Tech Audit",
    desc: "IT Governance → Cloud → AI Agents",
    epochIds: ["tech-audit-1", "tech-audit-2", "tech-audit-3", "tech-audit-4"],
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
  {
    label: "Crafts",
    desc: "Tapestry · Nail Arts · Hair Coloring · Hair Styling",
    epochIds: ["tapestry", "nails", "hair-color", "hair-styling"],
  },
  {
    label: "Driving",
    desc: "CA License → First Miles → Rules of the Road",
    epochIds: ["driving-1", "driving-2", "driving-3"],
  },
  {
    label: "Health",
    desc: "Clubfoot — Understanding & Living With It",
    epochIds: ["clubfoot"],
  },
  {
    label: "Sports",
    desc: "Little League Baseball · The Art of Hitting",
    epochIds: ["baseball-1", "baseball-2"],
  },
];

export default function StagesPage() {
  const router = useRouter();
  const { skin } = useSkin();
  const [completedStages, setCompletedStages] = useState<string[]>([]);
  const [totalCoins, setTotalCoins] = useState(0);
  const [streak, setStreak] = useState(0);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setUsername(getSession());
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { username: string } | null) => {
        if (!data) return;
        setUsername(data.username);
        setSession(data.username);
        fetchProgress().then((p) => {
          if (!p) return;
          setCompletedStages(p.completedStages);
          setTotalCoins(p.coins);
          setStreak(p.streak ?? 0);
        });
      })
      .catch(() => {});
  }, []);

  function handleLogout() {
    clearSession();
    router.refresh();
    setUsername(null);
  }

  async function handleDeleteAccount() {
    if (!window.confirm("Delete your account? This permanently removes all progress, coins, badges, and streak data and cannot be undone.")) return;
    await fetch("/api/delete-account", { method: "DELETE" });
    clearSession();
    router.push("/");
  }

  const maxXp = allStages.reduce((sum, s) => sum + s.xp, 0);

  return (
    <div
      className="min-h-screen px-4 py-16"
      style={{ background: "linear-gradient(135deg, #0d1117 0%, #0f2027 50%, #1a1a2e 100%)" }}
    >
      <OnboardingModal />
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
          <p className="text-gray-400">Seven tracks covering the full spectrum — from core CVEs to AI security, quantum cryptography, and professional crafts.</p>

          {/* XP bar + streak */}
          <div className="mt-6 flex items-center gap-3 flex-wrap">
            <div className="flex-1 bg-white/5 rounded-full h-3">
              <div
                className="bg-cyan-500 h-3 rounded-full transition-all duration-700"
                style={{ width: `${maxXp > 0 ? (totalCoins / maxXp) * 100 : 0}%` }}
              />
            </div>
            <span className="text-amber-400 font-mono text-sm">{totalCoins} / {maxXp} 🪙</span>
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

        {/* Auth banner */}
        {username ? (
          <div className="flex items-center justify-between bg-cyan-500/5 border border-cyan-500/20 rounded-xl px-5 py-3 mb-8">
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
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white/3 border border-white/10 rounded-xl px-5 py-3 mb-8">
            <span className="text-sm text-gray-400">
              👤 Playing as Guest —{" "}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">Sign in</Link>{" "}
              to save progress across devices.
            </span>
          </div>
        )}

        {/* ── Epoch track groups ─────────────────────────────────────────────── */}
        <div className="space-y-6">
          {epochGroups.map((group) => {
            const groupEpochs = group.epochIds
              .map((id) => epochs.find((e) => e.id === id))
              .filter(Boolean) as typeof epochs;

            return (
              <div key={group.label}>
                {/* Track label */}
                <div className="flex items-center gap-3 mb-3 pl-1">
                  <span className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest whitespace-nowrap">
                    {group.label}
                  </span>
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="hidden sm:block text-[10px] text-gray-700 whitespace-nowrap">{group.desc}</span>
                </div>

                {/* Epoch cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pl-4">
                  {groupEpochs.map((epoch) => {
                    const ea = epochAccent[epoch.id] ?? epochAccent.ancient;
                    const stageCount = allStages.filter((s) => s.epochId === epoch.id).length;
                    const doneCount = allStages.filter(
                      (s) => s.epochId === epoch.id && completedStages.includes(s.id)
                    ).length;
                    const pct = stageCount > 0 ? (doneCount / stageCount) * 100 : 0;
                    const done = doneCount === stageCount && stageCount > 0;

                    return (
                      <Link
                        key={epoch.id}
                        href={`/stages/epoch/${epoch.id}`}
                        className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 overflow-hidden ${
                          done
                            ? "border-green-500/40 bg-green-500/5 hover:border-green-400/60"
                            : "border-white/10 bg-white/2 hover:border-white/25 hover:bg-white/5"
                        }`}
                      >

                        <span className="text-2xl leading-none flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                          {epoch.emoji}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-semibold text-gray-200 truncate">{epoch.name}</span>
                            {doneCount > 0 && doneCount < stageCount && (
                              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${ea.tab} flex-shrink-0`}>
                                {doneCount}/{stageCount}
                              </span>
                            )}
                            {done && (
                              <span className="text-[10px] font-mono text-green-400 flex-shrink-0">✓ done</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 truncate">{epoch.subtitle}</p>
                          {doneCount > 0 && (
                            <div className="mt-1.5 w-full bg-white/5 rounded-full h-1">
                              <div
                                className={`${ea.bar} h-1 rounded-full transition-all duration-500`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          )}
                        </div>
                        <span className="text-gray-700 group-hover:text-gray-400 transition-colors text-sm flex-shrink-0">→</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
