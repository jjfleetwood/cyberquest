"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProgress } from "@/lib/progress";
import { getSession } from "@/lib/auth";

type Player = {
  name: string;
  xp: number;
  stages: number;
  badges: number;
  lastActive: string;
  isCurrentPlayer?: boolean;
};

const mockPlayers: Player[] = [
  { name: "0xGhost",     xp: 580, stages: 4, badges: 3, lastActive: "2 min ago" },
  { name: "NullByte",    xp: 440, stages: 3, badges: 2, lastActive: "18 min ago" },
  { name: "CipherKing",  xp: 390, stages: 3, badges: 2, lastActive: "1 hr ago" },
  { name: "ShadowProxy", xp: 310, stages: 2, badges: 1, lastActive: "3 hr ago" },
  { name: "ByteWitch",   xp: 180, stages: 1, badges: 1, lastActive: "1 day ago" },
  { name: "PhantomRoot", xp: 150, stages: 1, badges: 1, lastActive: "1 day ago" },
  { name: "NetRaider",   xp: 90,  stages: 1, badges: 0, lastActive: "2 days ago" },
  { name: "VirusHunter", xp: 50,  stages: 0, badges: 0, lastActive: "3 days ago" },
  { name: "RootKit99",   xp: 30,  stages: 0, badges: 0, lastActive: "5 days ago" },
];

const MEDAL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function LeaderboardPage() {
  const [rows, setRows] = useState<(Player & { rank: number })[]>([]);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [myXP, setMyXP] = useState(0);
  const [myStages, setMyStages] = useState(0);
  const [myBadges, setMyBadges] = useState(0);
  const [myName, setMyName] = useState("Guest");

  useEffect(() => {
    const sessionUsername = getSession();
    const displayName = sessionUsername ?? "Guest";
    setMyName(displayName);

    const p = getProgress();
    setMyXP(p.xp);
    setMyStages(p.completedStages.length);
    setMyBadges(p.badges.length);

    const me: Player = {
      name: displayName,
      xp: p.xp,
      stages: p.completedStages.length,
      badges: p.badges.length,
      lastActive: "now",
      isCurrentPlayer: true,
    };

    const all = [...mockPlayers, me].sort((a, b) => b.xp - a.xp);
    const ranked = all.map((player, i) => ({ ...player, rank: i + 1 }));
    setRows(ranked);
    setMyRank(ranked.find((r) => r.isCurrentPlayer)?.rank ?? null);
  }, []);

  const maxXP = Math.max(...rows.map((r) => r.xp), 1);

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
              <p className="text-gray-500 text-sm mt-1">Global rankings updated in real time.</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-400 bg-green-400/10 border border-green-400/30 rounded-full px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              LIVE
            </div>
          </div>
        </div>

        {/* Your stats card */}
        <div className="bg-cyan-500/5 border border-cyan-500/30 rounded-xl p-5 mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Your Rank", value: myRank !== null ? `#${myRank}` : "—" },
            { label: "Total XP", value: `${myXP} XP` },
            { label: "Stages Done", value: String(myStages) },
            { label: "Badges", value: String(myBadges) },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white/3 border border-white/10 rounded-xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[3rem_1fr_10rem_5rem_5rem_7rem] gap-2 px-5 py-3 border-b border-white/10 text-xs text-gray-500 font-semibold uppercase tracking-wider">
            <div>#</div>
            <div>Player</div>
            <div>XP</div>
            <div className="text-center">Stages</div>
            <div className="text-center">Badges</div>
            <div className="text-right hidden sm:block">Active</div>
          </div>

          {/* Rows */}
          {rows.map((player) => (
            <div
              key={player.name}
              className={`grid grid-cols-[3rem_1fr_10rem_5rem_5rem_7rem] gap-2 px-5 py-4 border-b border-white/5 last:border-0 items-center transition-colors ${
                player.isCurrentPlayer
                  ? "bg-cyan-500/8 border-l-2 border-l-cyan-500"
                  : "hover:bg-white/3"
              }`}
            >
              {/* Rank */}
              <div className="font-mono text-sm font-bold">
                {MEDAL[player.rank] ? (
                  <span className="text-lg">{MEDAL[player.rank]}</span>
                ) : (
                  <span className="text-gray-500">{player.rank}</span>
                )}
              </div>

              {/* Name */}
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    player.isCurrentPlayer
                      ? "bg-cyan-500 text-black"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {player.name[0].toUpperCase()}
                </div>
                <span
                  className={`font-semibold truncate ${
                    player.isCurrentPlayer ? "text-cyan-400" : "text-white"
                  }`}
                >
                  {player.name}
                  {player.isCurrentPlayer && (
                    <span className="ml-2 text-xs text-cyan-600 font-normal">(you)</span>
                  )}
                </span>
              </div>

              {/* XP with bar */}
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-white/5 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-700 ${
                        player.isCurrentPlayer ? "bg-cyan-400" : "bg-purple-500"
                      }`}
                      style={{ width: `${(player.xp / maxXP) * 100}%` }}
                    />
                  </div>
                  <span className={`text-xs font-mono flex-shrink-0 ${player.isCurrentPlayer ? "text-cyan-400" : "text-gray-400"}`}>
                    {player.xp}
                  </span>
                </div>
              </div>

              {/* Stages */}
              <div className="text-center text-sm text-gray-400">{player.stages}</div>

              {/* Badges */}
              <div className="text-center text-sm">
                {player.badges > 0 ? (
                  <span className="text-yellow-400">{"🏅".repeat(Math.min(player.badges, 3))}</span>
                ) : (
                  <span className="text-gray-700">—</span>
                )}
              </div>

              {/* Last active */}
              <div className="text-right text-xs text-gray-600 hidden sm:block">
                {player.isCurrentPlayer ? (
                  <span className="text-green-500">now</span>
                ) : (
                  player.lastActive
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm mb-4">Complete more stages to climb the rankings.</p>
          <Link
            href="/stages"
            className="inline-block px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors"
          >
            Continue Training →
          </Link>
        </div>
      </div>
    </div>
  );
}
