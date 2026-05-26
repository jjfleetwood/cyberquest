"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { fetchProgress } from "@/lib/progress";
import { getSession, setSession } from "@/lib/auth";
import { stagesMeta, epochs } from "@/data/stages-meta";
import { useLocale } from "@/contexts/LocaleContext";

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

type ProfileData = {
  username: string;
  coins: number;
  stages: number;
  badges: number;
  streak: number;
  longestStreak: number;
  completedStageIds: string[];
  trophies: { id: string; name: string; emoji: string; tier: string }[];
  equippedItemIds: Record<string, string>;
};

const MEDAL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };


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

const TIER_COLORS: Record<string, string> = {
  field: "text-gray-400 border-gray-500/30 bg-gray-500/8",
  enlisted: "text-stone-400 border-stone-500/30 bg-stone-500/8",
  commended: "text-amber-500 border-amber-500/30 bg-amber-500/8",
  decorated: "text-violet-400 border-violet-500/30 bg-violet-500/8",
  distinguished: "text-sky-400 border-sky-500/30 bg-sky-500/8",
  elite: "text-cyan-400 border-cyan-500/30 bg-cyan-500/8",
  legendary: "text-purple-400 border-purple-500/30 bg-purple-500/8",
  apex: "text-red-400 border-red-500/30 bg-red-500/8",
};

// Group completed stages by epoch for the profile view
function groupStagesByEpoch(completedIds: string[]) {
  const completedSet = new Set(completedIds);
  const groups: { epochName: string; epochEmoji: string; stages: typeof stagesMeta }[] = [];

  for (const epoch of epochs) {
    const done = stagesMeta
      .filter((s) => s.epochId === epoch.id && completedSet.has(s.id))
      .sort((a, b) => a.order - b.order);
    if (done.length > 0) {
      groups.push({ epochName: epoch.name, epochEmoji: epoch.emoji, stages: done });
    }
  }
  return groups;
}

function PlayerAvatar({ username, size = 40, isYou = false }: { username: string; size?: number; isYou?: boolean }) {
  const [fg, bg] = isYou ? (["#000", "#22d3ee"] as [string, string]) : avatarColor(username);
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
      style={{ width: size, height: size, background: bg, color: fg, fontSize: size * 0.38 }}
    >
      {username[0]?.toUpperCase() ?? "?"}
    </div>
  );
}

function ProfilePanel({ username, myName, rank, onClose }: {
  username: string;
  myName: string;
  rank: number | null;
  onClose: () => void;
}) {
  const { t } = useLocale();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const isMe = username.toLowerCase() === myName.toLowerCase();

  useEffect(() => {
    setLoading(true);
    setProfile(null);
    fetch(`/api/profile/${encodeURIComponent(username)}`)
      .then((r) => r.ok ? r.json() : null)
      .then((d) => setProfile(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [username]);

  const stageGroups = profile ? groupStagesByEpoch(profile.completedStageIds) : [];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0d1117] border-l border-white/10 z-50 flex flex-col overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 flex-shrink-0">
          <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">{t("leaderboard.operativeProfile")}</span>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-white transition-colors text-lg leading-none"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-40 text-gray-600 text-sm">{t("leaderboard.loadingProfile")}</div>
          ) : !profile ? (
            <div className="flex items-center justify-center h-40 text-gray-600 text-sm">{t("leaderboard.profileNotFound")}</div>
          ) : (
            <>
              {/* Identity block */}
              <div className="px-6 py-6 flex items-center gap-4 border-b border-white/5">
                <PlayerAvatar username={username} size={56} isYou={isMe} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xl font-black text-white">{username}</span>
                    {isMe && (
                      <span className="text-xs text-cyan-500 font-mono">{t("leaderboard.youLabel")}</span>
                    )}
                    {rank !== null && (
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full border border-white/15 text-gray-400">
                        {MEDAL[rank] ?? `#${rank}`}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    {profile.streak > 0 && (
                      <span className="text-amber-500">🔥 {profile.streak}{t("leaderboard.streakLabel")}</span>
                    )}
                    {profile.longestStreak > profile.streak && (
                      <span className="text-gray-700 ml-2">{t("leaderboard.streakBest")} {profile.longestStreak}{t("leaderboard.streakLabel")}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 divide-x divide-white/5 border-b border-white/5">
                {[
                  { label: t("leaderboard.statsCoins"), value: `${profile.coins} 🪙` },
                  { label: t("leaderboard.statsStages"), value: String(profile.stages) },
                  { label: t("leaderboard.statsBadges"), value: String(profile.badges) },
                ].map((s) => (
                  <div key={s.label} className="py-4 text-center">
                    <div className="text-lg font-black text-white">{s.value}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Trophies */}
              {profile.trophies.length > 0 && (
                <div className="px-6 py-5 border-b border-white/5">
                  <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">
                    {t("leaderboard.trophiesProfile")} <span className="text-gray-700 ml-1">({profile.trophies.length})</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.trophies.map((t) => (
                      <div
                        key={t.id}
                        title={`${t.name} · ${t.tier}`}
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs ${TIER_COLORS[t.tier] ?? "text-gray-400 border-gray-500/30"}`}
                      >
                        <span>{t.emoji}</span>
                        <span className="hidden sm:inline truncate max-w-24">{t.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Completed stages */}
              <div className="px-6 py-5">
                <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
                  {t("leaderboard.completedStages")} <span className="text-gray-700 ml-1">({profile.stages})</span>
                </h3>
                {stageGroups.length === 0 ? (
                  <p className="text-gray-700 text-sm">{t("leaderboard.noStagesYet")}</p>
                ) : (
                  <div className="space-y-5">
                    {stageGroups.map((group) => (
                      <div key={group.epochName}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-base leading-none">{group.epochEmoji}</span>
                          <span className="text-xs font-semibold text-gray-400">{group.epochName}</span>
                          <span className="text-xs text-gray-700">({group.stages.length})</span>
                        </div>
                        <div className="space-y-1 pl-6">
                          {group.stages.map((stage) => (
                            <Link
                              key={stage.id}
                              href={`/stages/${stage.id}`}
                              onClick={onClose}
                              className="flex items-center gap-2 group"
                            >
                              <span className="text-green-500 text-xs flex-shrink-0">✓</span>
                              <span className="text-xs text-gray-500 group-hover:text-cyan-400 transition-colors truncate">
                                {stage.title}
                              </span>
                              <span className="text-xs text-gray-700 ml-auto flex-shrink-0">+{stage.xp} 🪙</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/8 flex-shrink-0">
          <Link
            href="/stages"
            onClick={onClose}
            className="block w-full text-center py-2.5 bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-sm font-semibold rounded-lg hover:bg-cyan-500/20 transition-colors"
          >
            {t("leaderboard.viewStageMap")}
          </Link>
        </div>
      </div>
    </>
  );
}

export default function LeaderboardPage() {
  const { t } = useLocale();
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
  const [profileOpen, setProfileOpen] = useState<{ username: string; rank: number } | null>(null);

  function handleShare() {
    const rankStr = myRank ? `#${myRank}` : "the";
    const text = `I ranked ${rankStr} on Kryptós CronOS with ${myCoins} 🪙 across ${myStages} stages. Train on real CVEs, AI attacks, and nation-state ops → kryptoscronos.com`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }

  const openProfile = useCallback((username: string, rank: number) => {
    setProfileOpen({ username, rank });
  }, []);

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
      {profileOpen && (
        <ProfilePanel
          username={profileOpen.username}
          myName={myName}
          rank={profileOpen.rank}
          onClose={() => setProfileOpen(null)}
        />
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/stages" className="text-gray-500 hover:text-cyan-400 text-sm mb-4 inline-block transition-colors">
            {t("leaderboard.backToStageMap")}
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">{t("leaderboard.title")}</h1>
              <p className="text-gray-500 text-sm mt-1">
                {isRecencyFallback && period !== "alltime" ? FALLBACK_DESC[period] : (
                  period === "alltime" ? t("leaderboard.periodCoins") :
                  period === "weekly" ? t("leaderboard.periodWeekly") :
                  t("leaderboard.periodDaily")
                )}
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
                  {copied ? t("leaderboard.copied") : t("leaderboard.shareScore")}
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
              {p === "alltime" ? t("leaderboard.allTime") : p === "weekly" ? t("leaderboard.weekly") : t("leaderboard.daily")}
            </button>
          ))}
        </div>

        {/* Your stats card — only show for alltime */}
        {period === "alltime" && (
          <div className="bg-cyan-500/5 border border-cyan-500/30 rounded-xl p-5 mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: t("leaderboard.yourRank"), value: myRank !== null ? `#${myRank}` : "—" },
              { label: t("leaderboard.totalCoins"), value: `${myCoins} 🪙` },
              { label: t("leaderboard.stagesDone"), value: String(myStages) },
              { label: t("trophies.badges"), value: String(myBadges) },
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
            <span className="text-gray-400 text-sm">{t("leaderboard.yourRankOnBoard")}</span>
            <span className="text-2xl font-bold text-cyan-400">#{myRank}</span>
          </div>
        )}

        {/* Table */}
        <div className="bg-white/3 border border-white/10 rounded-xl overflow-hidden">
          <div className="grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[3rem_1fr_10rem_5rem_5rem_7rem] gap-2 px-5 py-3 border-b border-white/10 text-xs text-gray-500 font-semibold uppercase tracking-wider">
            <div>#</div>
            <div>{t("leaderboard.player")}</div>
            <div>{t("leaderboard.coins")} {period !== "alltime" ? <span className="hidden sm:inline">({period === "weekly" ? t("leaderboard.weekly") : t("leaderboard.daily")})</span> : ""}</div>
            <div className="text-center hidden sm:block">{t("leaderboard.stagesDone")}</div>
            <div className="text-center hidden sm:block">{t("trophies.badges")}</div>
            <div className="text-right hidden sm:block">{t("leaderboard.activeColumn")}</div>
          </div>

          {loading ? (
            <div className="py-16 text-center text-gray-600 text-sm">{t("leaderboard.loadingRankings")}</div>
          ) : rows.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-gray-600 text-sm">{period === "daily" ? t("leaderboard.noActivityToday") : t("leaderboard.noActivityWeek")}</p>
              <p className="text-gray-700 text-xs mt-1">{t("leaderboard.completeStagePrompt")}</p>
            </div>
          ) : (
            rows.map((player) => (
              <button
                key={player.username}
                onClick={() => openProfile(player.username, player.rank)}
                className={`w-full text-left grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[3rem_1fr_10rem_5rem_5rem_7rem] gap-2 px-5 py-4 border-b border-white/5 last:border-0 items-center transition-colors cursor-pointer ${
                  player.isCurrentPlayer
                    ? "bg-cyan-500/8 border-l-2 border-l-cyan-500 hover:bg-cyan-500/12"
                    : "hover:bg-white/4"
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
                  <PlayerAvatar username={player.username} size={32} isYou={!!player.isCurrentPlayer} />
                  <div className="min-w-0">
                    <span className={`font-semibold truncate block ${player.isCurrentPlayer ? "text-cyan-400" : "text-white"}`}>
                      {player.username}
                      {player.isCurrentPlayer && (
                        <span className="ml-2 text-xs text-cyan-600 font-normal">{t("leaderboard.youLabel")}</span>
                      )}
                    </span>
                    <span className="text-xs text-gray-600 sm:hidden">{player.stages} {t("leaderboard.stagesLabel")} · {player.badges} {t("leaderboard.badgesLabel")}</span>
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
              </button>
            ))
          )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/stages"
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors"
          >
            {t("leaderboard.continueTraining")}
          </Link>
          {myName !== "Guest" && (
            <a
              href="/api/progress/certificate"
              download
              className="px-6 py-3 border border-white/15 hover:border-white/30 text-gray-400 hover:text-white font-semibold rounded-lg transition-colors text-sm"
            >
              {t("leaderboard.downloadReport")}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
