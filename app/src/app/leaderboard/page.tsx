"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchProgress } from "@/lib/progress";
import { getSession, setSession } from "@/lib/auth";

type Period = "alltime" | "weekly" | "daily";

type Player = {
  username: string;
  coins: number;
  stages: number;
  badges: number;
  lastActive: number | null;
  isCurrentPlayer?: boolean;
  recencyFallback?: boolean;
};

const MEDAL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

const PERIOD_LABELS: Record<Period, string> = {
  alltime: "All Time",
  weekly: "This Week",
  daily: "Today",
};

const PERIOD_DESC: Record<Period, string> = {
  alltime: "Total coins accumulated",
  weekly: "Coins earned this week",
  daily: "Coins earned today",
};

const FALLBACK_DESC: Record<Period, string> = {
  alltime: "",
  weekly: "Showing agents active this week · period coin tracking begins with new completions",
  daily: "Showing agents active today · period coin tracking begins with new completions",
};

const AVATAR_COLORS: [string, string][] = [
  ["#22d3ee", "#0e7490"], ["#a78bfa", "#6d28d9"], ["#f97316", "#c2410c"],
  ["#4ade80", "#16a34a"], ["#fb7185", "#be123c"], ["#fbbf24", "#b45309"],
  ["#38bdf8", "#0369a1"], ["#e879f9", "#a21caf"],
];

function avatarColor(username: string): [string, string] {
  let h = 0;
  for (let i = 0; i < username.length; i++) h = (h * 31 + username.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function timeAgo(ts: number | null): string {
  if (!ts) return "—";
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<Period>("alltime");
  const [rows, setRows] = useState<(Player & { rank: number })[]>([]);
  const [isRecencyFallback, setIsRecencyFallback] = useState(false);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [myCoins, setMyCoins] = useState(0);
  const [myStages, setMyStages] = useState(0);
  const [myBadges, setMyBadges] = useState(0);
  const [myName, setMyName] = useState("Guest");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  function handleShare() {
    const rankStr = myRank ? `#${myRank}` : "the";
    const text = `I ranked ${rankStr} on Kryptós CronOS with ${myCoins} 🪙 across ${myStages} stages. Train on real CVEs, AI attacks, and nation-state ops → kryptoscronos.com`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }

  useEffect(() => {
    setMyName(getSession() ?? "Guest");
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { username: string } | null) => {
        if (!data) return;
        setMyName(data.username);
        setSession(data.username);
        fetchProgress().then((p) => {
          if (!p) return;
          setMyCoins(p.coins);
          setMyStages(p.completedStages.length);
          setMyBadges(p.badges.length);
        });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const displayName = myName;

    fetch(`/api/leaderboard?period=${period}`)
      .then((r) => r.json())
      .then((serverPlayers: Player[]) => {
        const serverMe = serverPlayers.find(
          (pl) => pl.username.toLowerCase() === displayName.toLowerCase()
        );
        const me: Player = {
          username: displayName,
          coins: serverMe?.coins ?? (period === "alltime" ? myCoins : 0),
          stages: serverMe?.stages ?? myStages,
          badges: serverMe?.badges ?? myBadges,
          lastActive: Date.now(),
          isCurrentPlayer: true,
        };

        const serverWithoutMe = serverPlayers.filter(
          (pl) => pl.username.toLowerCase() !== displayName.toLowerCase()
        );

        const meWithServerCoins = serverMe
          ? { ...me, coins: serverMe.coins }
          : period === "alltime" ? me : null;

        const all = [
          ...serverWithoutMe,
          ...(meWithServerCoins ? [meWithServerCoins] : []),
        ].sort((a, b) => b.coins - a.coins);

        const ranked = all.map((player, i) => ({ ...player, rank: i + 1 }));
        setRows(ranked);
        setIsRecencyFallback(serverPlayers.some((p) => p.recencyFallback));
        setMyRank(ranked.find((r) => r.isCurrentPlayer)?.rank ?? null);
      })
      .catch(() => {
        setRows([]);
        setMyRank(null);
      })
      .finally(() => setLoading(false));
  }, [period, myName]);

  const maxCoins = Math.max(...rows.map((r) => r.coins), 1);

  return (
    <div
      className="min-h-screen px-4 py-12"
      style={{ background: "linear-gradient(135deg, #0d1117 0%, #0f2027 50%, #1a1a2e 100%)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/stages" className="text-gray-500 hover:text-cyan-400 text-sm mb-4 inline-block transition-colors">
            ← Stage Map
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
              <p className="text-gray-500 text-sm mt-1">
                {isRecencyFallback && period !== "alltime" ? FALLBACK_DESC[period] : PERIOD_DESC[period]}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {myName !== "Guest" && (
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all"
                  style={{
                    borderColor: copied ? "rgba(74,222,128,0.5)" : "rgba(255,255,255,0.15)",
                    color: copied ? "rgba(74,222,128,1)" : "rgba(156,163,175,1)",
                    background: copied ? "rgba(74,222,128,0.08)" : "rgba(255,255,255,0.03)",
                  }}
                >
                  {copied ? "✓ Copied!" : "↗ Share score"}
                </button>
              )}
              <div className="flex items-center gap-2 text-xs text-green-400 bg-green-400/10 border border-green-400/30 rounded-full px-3 py-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                LIVE
              </div>
            </div>
          </div>
        </div>

        {/* Period tabs */}
        <div className="flex gap-1 bg-white/3 border border-white/10 rounded-xl p-1 mb-6">
          {(["alltime", "weekly", "daily"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                period === p
                  ? "bg-cyan-500 text-black"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </div>

        {/* Your stats card — only show for alltime */}
        {period === "alltime" && (
          <div className="bg-cyan-500/5 border border-cyan-500/30 rounded-xl p-5 mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Your Rank", value: myRank !== null ? `#${myRank}` : "—" },
              { label: "Total Coins", value: `${myCoins} 🪙` },
              { label: "Stages Done", value: String(myStages) },
              { label: "Badges", value: String(myBadges) },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{s.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {period !== "alltime" && myRank !== null && (
          <div className="bg-cyan-500/5 border border-cyan-500/30 rounded-xl p-4 mb-6 flex items-center justify-between">
            <span className="text-gray-400 text-sm">Your rank on this board</span>
            <span className="text-2xl font-bold text-cyan-400">#{myRank}</span>
          </div>
        )}

        {/* Table */}
        <div className="bg-white/3 border border-white/10 rounded-xl overflow-hidden">
          <div className="grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[3rem_1fr_10rem_5rem_5rem_7rem] gap-2 px-5 py-3 border-b border-white/10 text-xs text-gray-500 font-semibold uppercase tracking-wider">
            <div>#</div>
            <div>Player</div>
            <div>Coins {period !== "alltime" ? <span className="hidden sm:inline">({PERIOD_LABELS[period]})</span> : ""}</div>
            <div className="text-center hidden sm:block">Stages</div>
            <div className="text-center hidden sm:block">Badges</div>
            <div className="text-right hidden sm:block">Active</div>
          </div>

          {loading ? (
            <div className="py-16 text-center text-gray-600 text-sm">Loading rankings…</div>
          ) : rows.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-gray-600 text-sm">No activity yet {period === "daily" ? "today" : "this week"}.</p>
              <p className="text-gray-700 text-xs mt-1">Complete a stage to appear here!</p>
            </div>
          ) : (
            rows.map((player) => (
              <div
                key={player.username}
                className={`grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[3rem_1fr_10rem_5rem_5rem_7rem] gap-2 px-5 py-4 border-b border-white/5 last:border-0 items-center transition-colors ${
                  player.isCurrentPlayer
                    ? "bg-cyan-500/8 border-l-2 border-l-cyan-500"
                    : "hover:bg-white/3"
                }`}
              >
                <div className="font-mono text-sm font-bold">
                  {MEDAL[player.rank] ? (
                    <span className="text-lg">{MEDAL[player.rank]}</span>
                  ) : (
                    <span className="text-gray-500">{player.rank}</span>
                  )}
                </div>

                <div className="flex items-center gap-2 min-w-0">
                  {(() => {
                    const [fg, bg] = player.isCurrentPlayer ? ["#000", "#22d3ee"] : avatarColor(player.username);
                    return (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: bg, color: fg }}
                      >
                        {player.username[0].toUpperCase()}
                      </div>
                    );
                  })()}
                  <div className="min-w-0">
                    <span className={`font-semibold truncate block ${player.isCurrentPlayer ? "text-cyan-400" : "text-white"}`}>
                      {player.username}
                      {player.isCurrentPlayer && (
                        <span className="ml-2 text-xs text-cyan-600 font-normal">(you)</span>
                      )}
                    </span>
                    <span className="text-xs text-gray-600 sm:hidden">{player.stages} stages · {player.badges} badges</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/5 rounded-full h-1.5 hidden sm:block">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-700 ${
                          player.isCurrentPlayer ? "bg-cyan-400" : "bg-purple-500"
                        }`}
                        style={{ width: `${(player.coins / maxCoins) * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs font-mono flex-shrink-0 ${player.isCurrentPlayer ? "text-cyan-400" : "text-gray-400"}`}>
                      {player.coins} 🪙
                    </span>
                  </div>
                </div>

                <div className="text-center text-sm text-gray-400 hidden sm:block">{player.stages}</div>

                <div className="text-center text-sm hidden sm:block">
                  {player.badges > 0 ? (
                    <span className="text-yellow-400 font-mono text-xs">🏅 {player.badges}</span>
                  ) : (
                    <span className="text-gray-700">—</span>
                  )}
                </div>

                <div className="text-right text-xs text-gray-600 hidden sm:block">
                  {player.isCurrentPlayer ? (
                    <span className="text-green-500">now</span>
                  ) : (
                    timeAgo(player.lastActive)
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/stages"
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors"
          >
            Continue Training →
          </Link>
          {myName !== "Guest" && (
            <a
              href="/api/progress/certificate"
              download
              className="px-6 py-3 border border-white/15 hover:border-white/30 text-gray-400 hover:text-white font-semibold rounded-lg transition-colors text-sm"
            >
              ↓ Download Progress Report
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
