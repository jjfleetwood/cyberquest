"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useSkin } from "@/contexts/SkinContext";

type Trophy = { id: string; name: string; emoji: string; tier: string };
type EquippedItem = { id: string; name: string; emoji: string; slot: string };

type ProfileData = {
  username: string;
  coins: number;
  stages: number;
  badges: number;
  streak: number;
  longestStreak: number;
  trophies: Trophy[];
  equippedItems: Record<string, EquippedItem>;
};

const TIER_COLORS: Record<string, string> = {
  legendary: "#f59e0b",
  epic: "#a78bfa",
  rare: "#22d3ee",
  common: "#6b7280",
};

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { skin } = useSkin();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!username) return;
    fetch(`/api/profile/${encodeURIComponent(username)}`)
      .then((r) => {
        if (r.status === 404) { setNotFound(true); return null; }
        return r.ok ? r.json() : null;
      })
      .then((data) => { if (data) setProfile(data as ProfileData); })
      .catch(() => {});
  }, [username]);

  const equipped = profile ? Object.values(profile.equippedItems) : [];

  return (
    <main className="min-h-screen pt-24 pb-16 px-4" style={{ background: skin.pageBg }}>
      <div className="max-w-2xl mx-auto">

        {notFound && (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">🔍</p>
            <h1 className="text-xl font-bold mb-2" style={{ color: skin.textPrimary }}>Agent not found</h1>
            <p className="text-sm mb-8" style={{ color: skin.textMuted }}>No profile exists for <span style={{ color: skin.accent }}>@{username}</span></p>
            <Link href="/leaderboard" className="text-sm px-4 py-2 rounded-lg font-bold transition-opacity hover:opacity-80" style={{ background: skin.accent, color: skin.dark ? "#000" : "#fff" }}>
              View Leaderboard
            </Link>
          </div>
        )}

        {!notFound && !profile && (
          <div className="text-center py-24">
            <div className="inline-block w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm" style={{ color: skin.textMuted }}>Loading profile…</p>
          </div>
        )}

        {profile && (
          <>
            {/* Header */}
            <div
              className="rounded-2xl p-8 mb-6 text-center"
              style={{ background: skin.cardBg, border: `1px solid ${skin.cardBorder}` }}
            >
              <div className="text-6xl mb-4">
                {equipped.find((i) => i.slot === "avatar")?.emoji ?? "👤"}
              </div>
              <h1 className="text-2xl font-black mb-1" style={{ color: skin.textPrimary }}>
                {profile.username}
              </h1>
              <p className="text-xs mb-6" style={{ color: skin.textMuted }}>Kryptós CronOS Agent</p>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "Coins", value: profile.coins.toLocaleString(), color: "#f59e0b" },
                  { label: "Stages", value: profile.stages.toString(), color: skin.accent },
                  { label: "Badges", value: profile.badges.toString(), color: "#a78bfa" },
                  { label: "Streak", value: `${profile.streak}🔥`, color: "#f97316" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${skin.cardBorder}` }}>
                    <div className="text-lg font-black" style={{ color }}>{value}</div>
                    <div className="text-xs mt-0.5" style={{ color: skin.textMuted }}>{label}</div>
                  </div>
                ))}
              </div>

              {profile.longestStreak > 0 && (
                <p className="text-xs mt-4" style={{ color: skin.textMuted }}>
                  Longest streak: <span style={{ color: "#f97316" }}>{profile.longestStreak} days</span>
                </p>
              )}
            </div>

            {/* Equipped items */}
            {equipped.length > 0 && (
              <div className="rounded-2xl p-6 mb-6" style={{ background: skin.cardBg, border: `1px solid ${skin.cardBorder}` }}>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: skin.textMuted }}>
                  Equipped
                </h2>
                <div className="flex flex-wrap gap-3">
                  {equipped.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${skin.cardBorder}` }}>
                      <span className="text-base">{item.emoji}</span>
                      <span style={{ color: skin.textSecondary }}>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trophies */}
            {profile.trophies.length > 0 && (
              <div className="rounded-2xl p-6" style={{ background: skin.cardBg, border: `1px solid ${skin.cardBorder}` }}>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: skin.textMuted }}>
                  Trophies ({profile.trophies.length})
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {profile.trophies.map((trophy) => (
                    <div
                      key={trophy.id}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${TIER_COLORS[trophy.tier] ?? skin.cardBorder}22` }}
                    >
                      <span className="text-2xl">{trophy.emoji}</span>
                      <div>
                        <div className="text-xs font-bold leading-tight" style={{ color: skin.textSecondary }}>{trophy.name}</div>
                        <div className="text-[10px] capitalize mt-0.5" style={{ color: TIER_COLORS[trophy.tier] ?? skin.textMuted }}>{trophy.tier}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {profile.trophies.length === 0 && (
              <div className="rounded-2xl p-8 text-center" style={{ background: skin.cardBg, border: `1px solid ${skin.cardBorder}` }}>
                <p className="text-2xl mb-2">🏆</p>
                <p className="text-sm" style={{ color: skin.textMuted }}>No trophies yet</p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
