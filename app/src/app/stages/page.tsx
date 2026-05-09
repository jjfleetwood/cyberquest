"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { stages as allStages } from "@/data/stages";
import { getProgress } from "@/lib/progress";
import { getSession, clearSession } from "@/lib/auth";

const categoryColors: Record<string, string> = {
  cybersecurity: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
  ai: "text-purple-400 bg-purple-400/10 border-purple-400/30",
  owasp: "text-orange-400 bg-orange-400/10 border-orange-400/30",
};

const categoryLabel: Record<string, string> = {
  cybersecurity: "Cybersecurity",
  ai: "AI",
  owasp: "OWASP",
};

export default function StagesPage() {
  const router = useRouter();
  const [completedStages, setCompletedStages] = useState<string[]>([]);
  const [totalXp, setTotalXp] = useState(0);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const session = getSession();
    setUsername(session);
    const progress = getProgress();
    setCompletedStages(progress.completedStages);
    setTotalXp(progress.xp);
  }, []);

  function handleLogout() {
    clearSession();
    router.refresh();
    // Re-read session after clearing
    setUsername(null);
  }

  const maxXp = allStages.reduce((sum, s) => sum + s.xp, 0);

  function isUnlocked(order: number): boolean {
    if (order === 1) return true;
    const prev = allStages.find((s) => s.order === order - 1);
    if (!prev) return false;
    return completedStages.includes(prev.id);
  }

  return (
    <div
      className="min-h-screen px-4 py-16"
      style={{ background: "linear-gradient(135deg, #0d1117 0%, #0f2027 50%, #1a1a2e 100%)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-gray-500 hover:text-cyan-400 text-sm transition-colors">
              ← Back to Home
            </Link>
            <Link href="/leaderboard" className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
              🏆 Leaderboard
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Training Stage Map</h1>
          <p className="text-gray-400">Complete stages in order to unlock new challenges and earn XP.</p>

          {/* XP bar */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 bg-white/5 rounded-full h-3">
              <div
                className="bg-cyan-500 h-3 rounded-full transition-all duration-700"
                style={{ width: `${maxXp > 0 ? (totalXp / maxXp) * 100 : 0}%` }}
              />
            </div>
            <span className="text-cyan-400 font-mono text-sm">{totalXp} XP</span>
          </div>
        </div>

        {/* Auth banner */}
        {username ? (
          <div className="flex items-center justify-between bg-cyan-500/5 border border-cyan-500/20 rounded-xl px-5 py-3 mb-6">
            <span className="text-sm text-gray-300">
              👤 Welcome, <span className="text-cyan-400 font-semibold">{username}</span>!
            </span>
            <button
              onClick={handleLogout}
              className="text-xs text-gray-500 hover:text-red-400 transition-colors"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white/3 border border-white/10 rounded-xl px-5 py-3 mb-6">
            <span className="text-sm text-gray-400">
              👤 Playing as Guest —{" "}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Sign in
              </Link>{" "}
              to save your progress across devices.
            </span>
          </div>
        )}

        {/* Stage list */}
        <div className="flex flex-col gap-4">
          {allStages.map((stage) => {
            const unlocked = isUnlocked(stage.order);
            const completed = completedStages.includes(stage.id);

            return (
              <div
                key={stage.id}
                className={`relative border rounded-xl p-6 transition-all ${
                  completed
                    ? "border-green-500/40 bg-green-500/5"
                    : unlocked
                    ? "border-cyan-500/40 bg-white/5 hover:border-cyan-400"
                    : "border-white/5 bg-white/2 opacity-50"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Stage number / status */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 ${
                      completed
                        ? "bg-green-500 text-black"
                        : unlocked
                        ? "bg-cyan-500 text-black"
                        : "bg-white/10 text-gray-600"
                    }`}
                  >
                    {completed ? "✓" : unlocked ? stage.order : "🔒"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-white font-semibold text-lg">{stage.title}</h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[stage.category]}`}>
                        {categoryLabel[stage.category]}
                      </span>
                      {stage.owaspRef && (
                        <span className="text-xs px-2 py-0.5 rounded-full border text-orange-400 bg-orange-400/10 border-orange-400/30">
                          {stage.owaspRef}
                        </span>
                      )}
                      {stage.cveId && (
                        <span className="text-xs px-2 py-0.5 rounded-full border text-red-400 bg-red-400/10 border-red-400/30">
                          {stage.cveId}
                        </span>
                      )}
                      {stage.challengeType === "ctf" && (
                        <span className="text-xs px-2 py-0.5 rounded-full border text-purple-400 bg-purple-400/10 border-purple-400/30">
                          🚩 CTF
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{stage.subtitle}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="text-cyan-600">+{stage.xp} XP</span>
                      <span>{stage.badge.emoji} {stage.badge.name}</span>
                      {completed && <span className="text-green-400">✓ Completed</span>}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex-shrink-0">
                    {unlocked ? (
                      <Link
                        href={`/stages/${stage.id}`}
                        className={`px-5 py-2 font-semibold rounded-lg text-sm transition-colors ${
                          completed
                            ? "bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                            : "bg-cyan-500 hover:bg-cyan-400 text-black"
                        }`}
                      >
                        {completed ? "Replay →" : "Start →"}
                      </Link>
                    ) : (
                      <div className="px-5 py-2 bg-white/5 text-gray-600 rounded-lg text-sm cursor-not-allowed">
                        Locked
                      </div>
                    )}
                  </div>
                </div>

                {/* Connector line */}
                {stage.order < allStages.length && (
                  <div className="absolute left-10 -bottom-4 w-0.5 h-4 bg-white/10" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
