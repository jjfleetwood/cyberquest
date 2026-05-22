"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TIER_ORDER, TIER_META, type TrophyTier } from "@/data/trophies";

type TrophyRow = {
  id: string;
  name: string;
  emoji: string;
  tier: TrophyTier;
  supply: number;
  price: number;
  description: string;
  claimed: number;
  remaining: number;
};

type ApiResponse =
  | { mode: "admin"; trophies: TrophyRow[]; ownedIds: string[] }
  | { mode: "user";  shop: TrophyRow[];     owned: TrophyRow[] };

function SupplyBar({ remaining, supply }: { remaining: number; supply: number }) {
  const pct = supply === 0 ? 0 : Math.max(0, Math.min(100, (remaining / supply) * 100));
  const isEmpty = remaining <= 0;
  return (
    <div className="mt-1.5">
      <div className="flex justify-between text-xs mb-0.5" style={{ color: "rgba(107,114,128,1)" }}>
        <span>{isEmpty ? "SOLD OUT" : `${remaining.toLocaleString()} left`}</span>
        <span>{supply.toLocaleString()} total</span>
      </div>
      <div className="w-full h-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div
          className="h-1 rounded-full transition-all"
          style={{
            width: `${pct}%`,
            background: isEmpty ? "#374151" : pct > 50 ? "#22d3ee" : pct > 20 ? "#f59e0b" : "#ef4444",
          }}
        />
      </div>
    </div>
  );
}

function TrophyCard({ trophy, owned }: { trophy: TrophyRow; owned: boolean }) {
  const meta = TIER_META[trophy.tier];
  return (
    <div
      className={`rounded-xl border p-4 flex flex-col gap-3 transition-all ${meta.borderColor} ${meta.bgColor} ${owned ? "ring-1 ring-cyan-500/30" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-3xl leading-none">{trophy.emoji}</span>
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded-full border ${meta.textColor} ${meta.borderColor}`}
          style={{ background: "rgba(0,0,0,0.3)" }}
        >
          {meta.label.toUpperCase()}
        </span>
      </div>

      <div>
        <div className="text-sm font-bold text-white leading-snug">{trophy.name}</div>
        <div className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(107,114,128,1)" }}>
          {trophy.description}
        </div>
      </div>

      <SupplyBar remaining={trophy.remaining} supply={trophy.supply} />

      <div className="flex items-center justify-between mt-auto pt-1">
        <span className={`text-sm font-mono font-bold ${meta.textColor}`}>
          {trophy.price.toLocaleString()} 🪙
        </span>
        {owned && <span className="text-xs text-cyan-400 font-semibold">✓ Owned</span>}
      </div>
    </div>
  );
}

export default function TrophiesPage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminFilter, setAdminFilter] = useState<TrophyTier | "all">("all");

  useEffect(() => {
    fetch("/api/trophies")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d) setData(d); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0d1117,#0f2027,#1a1a2e)" }}>
        <div className="text-gray-600 text-sm">Loading…</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0d1117,#0f2027,#1a1a2e)" }}>
        <div className="text-gray-600 text-sm">Could not load trophies.</div>
      </div>
    );
  }

  // ── Admin view ───────────────────────────────────────────────────────────────
  if (data.mode === "admin") {
    const tiers = adminFilter === "all" ? TIER_ORDER : [adminFilter];
    const totalSupply = data.trophies.reduce((s, t) => s + t.supply, 0);
    const totalClaimed = data.trophies.reduce((s, t) => s + t.claimed, 0);

    return (
      <div className="min-h-screen px-4 py-12" style={{ background: "linear-gradient(135deg,#0d1117,#0f2027,#1a1a2e)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <Link href="/admin" className="text-gray-500 hover:text-cyan-400 text-sm mb-3 inline-block transition-colors">← Admin</Link>
              <h1 className="text-3xl font-black text-white">Trophy Library</h1>
              <p className="text-gray-500 text-sm mt-1">Admin view — full catalog with live supply counters</p>
            </div>
            <div className="flex gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-cyan-400">{data.trophies.length}</div>
                <div className="text-xs text-gray-600">Trophies</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400">{totalClaimed.toLocaleString()}</div>
                <div className="text-xs text-gray-600">Claimed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-500">{totalSupply.toLocaleString()}</div>
                <div className="text-xs text-gray-600">Total Supply</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-8">
            {(["all", ...TIER_ORDER] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setAdminFilter(tier)}
                className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-all"
                style={{
                  background: adminFilter === tier ? "rgba(34,211,238,0.15)" : "rgba(255,255,255,0.04)",
                  color: adminFilter === tier ? "#22d3ee" : "rgba(107,114,128,1)",
                  border: `1px solid ${adminFilter === tier ? "rgba(34,211,238,0.3)" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                {tier === "all" ? "All Tiers" : TIER_META[tier].label}
              </button>
            ))}
          </div>

          {tiers.map((tier) => {
            const group = data.trophies.filter((t) => t.tier === tier);
            if (group.length === 0) return null;
            const meta = TIER_META[tier];
            return (
              <div key={tier} className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className={`text-lg font-black ${meta.textColor}`}>{meta.label}</h2>
                  <div className="text-xs text-gray-600 font-mono">
                    {group[0].supply.toLocaleString()} supply · {group[0].price.toLocaleString()} 🪙
                  </div>
                  <div className="h-px flex-1" style={{ background: meta.color, opacity: 0.2 }} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {group.map((t) => (
                    <TrophyCard key={t.id} trophy={t} owned={data.ownedIds.includes(t.id)} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── User view — collection only ──────────────────────────────────────────────
  const owned = [...data.owned].sort((a, b) => b.price - a.price);

  return (
    <div className="min-h-screen px-4 py-12" style={{ background: "linear-gradient(135deg,#0d1117,#0f2027,#1a1a2e)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link href="/shop" className="text-gray-500 hover:text-cyan-400 text-sm mb-3 inline-block transition-colors">← Shop</Link>
            <h1 className="text-3xl font-black text-white">My Trophies</h1>
            <p className="text-gray-500 text-sm mt-1">
              {owned.length === 0
                ? "Your vault is empty. Pick up trophies from the Shop → Treasures tab."
                : `${owned.length} trophy${owned.length === 1 ? "" : "ies"} in your vault.`}
            </p>
          </div>
          <div className="text-right">
            <Link
              href="/shop?tab=treasures"
              className="text-sm px-4 py-2 rounded-lg font-semibold transition-all"
              style={{
                background: "rgba(34,211,238,0.1)",
                border: "1px solid rgba(34,211,238,0.3)",
                color: "#22d3ee",
              }}
            >
              💎 Browse Treasures →
            </Link>
          </div>
        </div>

        {owned.length === 0 ? (
          <div className="rounded-xl border border-white/8 bg-white/2 p-16 text-center">
            <div className="text-4xl mb-3">🏆</div>
            <p className="text-gray-600 text-sm">Your trophy vault is empty.</p>
            <p className="text-gray-700 text-xs mt-1">Head to Shop → Treasures to start your collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {owned.map((t) => (
              <TrophyCard key={t.id} trophy={t} owned />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
