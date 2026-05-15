"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { stages as allStages, epochs } from "@/data/stages";
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

const epochAccent: Record<string, { tab: string; active: string; bar: string; badge: string }> = {
  "before-times": {
    tab: "text-emerald-400 border-emerald-400 bg-emerald-400/10",
    active: "border-emerald-400/60 bg-emerald-500/5",
    bar: "bg-emerald-500",
    badge: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  },
  ancient: {
    tab: "text-amber-400 border-amber-400 bg-amber-400/10",
    active: "border-amber-400/60 bg-amber-500/5",
    bar: "bg-amber-500",
    badge: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  },
  medieval: {
    tab: "text-blue-400 border-blue-400 bg-blue-400/10",
    active: "border-blue-400/60 bg-blue-500/5",
    bar: "bg-blue-500",
    badge: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  },
};

export default function StagesPage() {
  const router = useRouter();
  const [completedStages, setCompletedStages] = useState<string[]>([]);
  const [totalXp, setTotalXp] = useState(0);
  const [username, setUsername] = useState<string | null>(null);
  const [activeEpoch, setActiveEpoch] = useState("before-times");

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
    setUsername(null);
  }

  const epochStages = allStages.filter((s) => s.epochId === activeEpoch);
  const currentEpoch = epochs.find((e) => e.id === activeEpoch)!;
  const accent = epochAccent[activeEpoch] ?? epochAccent.ancient;

  const cardBorder: Record<string, string> = {
    "before-times": "border-emerald-500/40 hover:border-emerald-400/80",
    ancient: "border-amber-500/40 hover:border-amber-400/80",
    medieval: "border-blue-500/40 hover:border-blue-400/80",
  };
  const cardEmojiBg: Record<string, string> = {
    "before-times": "from-emerald-950 to-slate-950",
    ancient: "from-amber-950 to-stone-950",
    medieval: "from-blue-950 to-slate-950",
  };

  const nextStageId = epochStages.find(
    (s) => !completedStages.includes(s.id) && isUnlocked(s.epochId, s.order)
  )?.id;

  const gridCols =
    activeEpoch === "before-times"
      ? "grid-cols-3 sm:grid-cols-4 lg:grid-cols-5"
      : "grid-cols-3 lg:grid-cols-4";

  const maxXp = allStages.reduce((sum, s) => sum + s.xp, 0);

  function isEpochUnlocked(epochIndex: number): boolean {
    if (epochIndex === 0) return true;
    const prevEpoch = epochs[epochIndex - 1];
    const prevStages = allStages.filter((s) => s.epochId === prevEpoch.id);
    return prevStages.length > 0 && prevStages.every((s) => completedStages.includes(s.id));
  }

  function isUnlocked(epochId: string, order: number): boolean {
    if (order === 1) return true;
    const prev = allStages.find((s) => s.epochId === epochId && s.order === order - 1);
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
          <p className="text-gray-400">Complete stages in order to unlock new challenges and earn XP.</p>

          {/* XP bar */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 bg-white/5 rounded-full h-3">
              <div
                className={`${accent.bar} h-3 rounded-full transition-all duration-700`}
                style={{ width: `${maxXp > 0 ? (totalXp / maxXp) * 100 : 0}%` }}
              />
            </div>
            <span className="text-amber-400 font-mono text-sm">{totalXp} XP</span>
          </div>
        </div>

        {/* Epoch tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {epochs.map((epoch, epochIndex) => {
            const isActive = epoch.id === activeEpoch;
            const unlocked = isEpochUnlocked(epochIndex);
            const ea = epochAccent[epoch.id] ?? epochAccent.ancient;
            return (
              <button
                key={epoch.id}
                onClick={() => unlocked && setActiveEpoch(epoch.id)}
                disabled={!unlocked}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                  !unlocked
                    ? "border-white/10 text-gray-600 bg-white/3 cursor-not-allowed opacity-50"
                    : isActive
                    ? ea.tab
                    : "border-white/20 text-gray-400 hover:border-white/40"
                }`}
              >
                <span>{epoch.emoji}</span>
                <span>{epoch.name}</span>
                {!unlocked && <span className="text-xs">🔒</span>}
              </button>
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
          </div>
          <p className="text-gray-500 text-sm mt-2">{currentEpoch.description}</p>
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

        {/* Stage map grid */}
        <div className={`grid gap-3 ${gridCols}`}>
          {epochStages.map((stage) => {
            const unlocked = isUnlocked(stage.epochId, stage.order);
            const completed = completedStages.includes(stage.id);
            const isNext = stage.id === nextStageId;

            const borderClass = completed
              ? "border-green-500/50 hover:border-green-400/80"
              : unlocked
              ? cardBorder[activeEpoch]
              : "border-white/8";

            const ringClass = isNext
              ? "ring-2 ring-offset-2 ring-offset-slate-950 ring-current"
              : "";

            const cardContent = (
              <>
                {/* Emoji panel */}
                <div
                  className={`relative flex items-center justify-center py-7 bg-gradient-to-b ${
                    completed
                      ? "from-green-950 to-slate-950"
                      : unlocked
                      ? cardEmojiBg[activeEpoch]
                      : "from-slate-950 to-slate-950"
                  }`}
                >
                  <span
                    className={`text-5xl leading-none drop-shadow-lg transition-transform duration-200 ${
                      unlocked ? "group-hover:scale-110" : "grayscale opacity-30"
                    }`}
                  >
                    {stage.wonder.emoji}
                  </span>

                  {/* Completed overlay */}
                  {completed && (
                    <div className="absolute inset-0 flex items-end justify-end p-2 pointer-events-none">
                      <span className="text-xs bg-green-500 text-black font-bold px-1.5 py-0.5 rounded-full leading-none">✓</span>
                    </div>
                  )}

                  {/* Locked overlay */}
                  {!unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <span className="text-xl opacity-50">🔒</span>
                    </div>
                  )}

                  {/* Stage number */}
                  <div className="absolute top-2 left-2">
                    <span
                      className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded-md leading-none ${
                        completed
                          ? "bg-green-500/20 text-green-400"
                          : unlocked
                          ? "bg-black/50 text-gray-300"
                          : "bg-black/40 text-gray-600"
                      }`}
                    >
                      {stage.order}
                    </span>
                  </div>

                  {/* CTF / CVE badge */}
                  {(stage.challengeType === "ctf" || stage.cveId) && unlocked && (
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
                  <p className={`text-xs font-semibold truncate leading-tight ${unlocked ? "text-gray-200" : "text-gray-600"}`}>
                    {stage.title}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-xs text-amber-600 font-mono">+{stage.xp}</span>
                    <span className="text-xs text-gray-700">XP</span>
                    <span className="text-xs ml-auto">{stage.badge.emoji}</span>
                  </div>
                </div>
              </>
            );

            return unlocked ? (
              <Link
                key={stage.id}
                href={`/stages/${stage.id}`}
                className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-200 hover:-translate-y-0.5 ${borderClass} ${ringClass} ${isNext ? (accent.bar === "bg-emerald-500" ? "text-emerald-400" : accent.bar === "bg-amber-500" ? "text-amber-400" : "text-blue-400") : ""}`}
              >
                {cardContent}
              </Link>
            ) : (
              <div
                key={stage.id}
                className={`relative rounded-xl overflow-hidden border-2 opacity-45 cursor-not-allowed ${borderClass}`}
              >
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
