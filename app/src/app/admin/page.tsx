"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUsers, isAdmin, getSession, StoredUser } from "@/lib/auth";
import { stages } from "@/data/stages";

type UserRow = StoredUser & {
  xp: number;
  completedStages: number;
  badges: number;
};

function getUserProgress(username: string) {
  try {
    const raw = localStorage.getItem(`kryptos_progress_${username}`);
    if (!raw) return { xp: 0, completedStages: 0, badges: 0 };
    const p = JSON.parse(raw);
    return {
      xp: p.xp ?? 0,
      completedStages: (p.completedStages ?? []).length,
      badges: (p.badges ?? []).length,
    };
  } catch {
    return { xp: 0, completedStages: 0, badges: 0 };
  }
}

export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [activeToday, setActiveToday] = useState(0);

  useEffect(() => {
    if (!isAdmin()) {
      router.replace("/stages");
      return;
    }
    setAuthorized(true);

    const storedUsers = getUsers();
    const now = Date.now();
    const oneDayMs = 86_400_000;

    const rows: UserRow[] = storedUsers.map((u) => {
      const progress = getUserProgress(u.username);
      return { ...u, ...progress };
    });

    rows.sort((a, b) => b.xp - a.xp);
    setUsers(rows);
    setTotalUsers(rows.length);
    setTotalXp(rows.reduce((s, u) => s + u.xp, 0));
    setActiveToday(rows.filter((u) => now - u.createdAt < oneDayMs).length);
  }, [router]);

  if (!authorized) return null;

  const maxXp = Math.max(...users.map((u) => u.xp), 1);
  const totalStages = stages.length;

  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{ background: "linear-gradient(160deg, #060a10 0%, #0d1117 50%, #0a0e1a 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/stages" className="text-gray-600 hover:text-gray-400 text-sm mb-4 inline-block transition-colors">
            ← Back to Stage Map
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-black text-white">Admin Dashboard</h1>
                <span className="text-xs px-2 py-0.5 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 font-mono">
                  ADMIN
                </span>
              </div>
              <p className="text-gray-600 text-sm">Logged in as <span className="text-cyan-400">{getSession()}</span></p>
            </div>
            <Link
              href="/admin/docs"
              className="flex items-center gap-2 px-4 py-2 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 rounded-lg text-sm transition-colors"
            >
              📄 View Docs
            </Link>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Users", value: totalUsers, color: "text-cyan-400" },
            { label: "Total XP Earned", value: totalXp.toLocaleString(), color: "text-purple-400" },
            { label: "Joined Today", value: activeToday, color: "text-green-400" },
            { label: "Total Stages", value: totalStages, color: "text-orange-400" },
          ].map((s) => (
            <div key={s.label} className="bg-white/3 border border-white/8 rounded-xl p-5 text-center">
              <div className={`text-3xl font-black ${s.color} mb-1`}>{s.value}</div>
              <div className="text-xs text-gray-600 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* User table */}
        <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between">
            <h2 className="text-white font-bold">Registered Users</h2>
            <span className="text-xs text-gray-600">{users.length} total</span>
          </div>

          {users.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-600">
              No users registered yet. Users appear here once they sign up.
            </div>
          ) : (
            <div>
              {/* Table header */}
              <div className="grid grid-cols-[1fr_2fr_6rem_5rem_5rem_7rem] gap-3 px-6 py-3 border-b border-white/5 text-xs text-gray-600 font-semibold uppercase tracking-wider">
                <div>User</div>
                <div>XP</div>
                <div className="text-center">Stages</div>
                <div className="text-center">Badges</div>
                <div className="text-center">Admin</div>
                <div className="text-right">Joined</div>
              </div>

              {users.map((user, i) => (
                <div
                  key={user.username}
                  className={`grid grid-cols-[1fr_2fr_6rem_5rem_5rem_7rem] gap-3 px-6 py-4 border-b border-white/5 last:border-0 items-center ${
                    user.isAdmin ? "bg-red-500/5" : "hover:bg-white/2"
                  } transition-colors`}
                >
                  {/* User */}
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        user.isAdmin ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-white/8 text-gray-400"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <div className="min-w-0">
                      <div className={`font-semibold truncate text-sm ${user.isAdmin ? "text-red-400" : "text-white"}`}>
                        {user.username}
                      </div>
                      <div className="text-xs text-gray-700 truncate">{user.email}</div>
                    </div>
                  </div>

                  {/* XP bar */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/5 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${(user.xp / maxXp) * 100}%`,
                          background: "linear-gradient(90deg, #22d3ee, #818cf8)",
                        }}
                      />
                    </div>
                    <span className="text-xs font-mono text-gray-400 flex-shrink-0 w-12 text-right">
                      {user.xp} XP
                    </span>
                  </div>

                  {/* Stages */}
                  <div className="text-center text-sm text-gray-400">
                    {user.completedStages} / {totalStages}
                  </div>

                  {/* Badges */}
                  <div className="text-center text-sm text-gray-400">
                    {user.badges > 0 ? "🏅".repeat(Math.min(user.badges, 3)) : "—"}
                  </div>

                  {/* Admin */}
                  <div className="text-center">
                    {user.isAdmin ? (
                      <span className="text-xs px-2 py-0.5 rounded-full border border-red-500/40 bg-red-500/10 text-red-400">
                        admin
                      </span>
                    ) : (
                      <span className="text-gray-700 text-xs">—</span>
                    )}
                  </div>

                  {/* Joined */}
                  <div className="text-right text-xs text-gray-700">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stage overview */}
        <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/8">
            <h2 className="text-white font-bold">Stage Catalog</h2>
          </div>
          <div className="divide-y divide-white/5">
            {stages.map((stage) => (
              <div key={stage.id} className="px-6 py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-gray-700 w-5">{stage.order}</span>
                  <span className="text-sm text-gray-300 font-medium">{stage.title}</span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {stage.cveId && (
                    <span className="text-xs text-red-400/70 hidden sm:block">{stage.cveId}</span>
                  )}
                  <span className="text-xs text-cyan-600">+{stage.xp} XP</span>
                  <span className={`text-xs px-2 py-0.5 rounded border ${
                    stage.challengeType === "ctf"
                      ? "border-purple-500/30 text-purple-400 bg-purple-500/5"
                      : "border-cyan-500/30 text-cyan-400 bg-cyan-500/5"
                  }`}>
                    {stage.challengeType.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
