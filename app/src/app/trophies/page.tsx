"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TIER_ORDER, TIER_META, type TrophyTier } from "@/data/trophies";
import { useLocale } from "@/contexts/LocaleContext";

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

type EarnedBadge = {
  id: string;
  name: string;
  emoji: string;
  source: "stage" | "milestone";
  desc?: string;
};

type ApiResponse =
  | { mode: "admin"; trophies: TrophyRow[]; ownedIds: string[] }
  | { mode: "user"; shop: TrophyRow[]; owned: TrophyRow[]; earnedBadges: EarnedBadge[] };

function SupplyBar({ remaining, supply }: { remaining: number; supply: number }) {
  const { t } = useLocale();
  const pct = supply === 0 ? 0 : Math.max(0, Math.min(100, (remaining / supply) * 100));
  const isEmpty = remaining <= 0;
  return (
    <div className="mt-1.5">
      <div className="flex justify-between text-xs mb-0.5" style={{ color: "rgba(107,114,128,1)" }}>
        <span>{isEmpty ? t("trophies.soldOut") : `${remaining.toLocaleString()} ${t("trophies.left")}`}</span>
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
  const { t } = useLocale();
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
        {owned && <span className="text-xs text-cyan-400 font-semibold">{t("trophies.owned")}</span>}
      </div>
    </div>
  );
}

function EarnedBadgeCard({ badge }: { badge: EarnedBadge }) {
  const { t } = useLocale();
  const isMilestone = badge.source === "milestone";
  return (
    <div
      className="rounded-xl border p-4 flex flex-col gap-3"
      style={{
        background: isMilestone ? "rgba(250,204,21,0.04)" : "rgba(34,211,238,0.04)",
        borderColor: isMilestone ? "rgba(250,204,21,0.25)" : "rgba(34,211,238,0.2)",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-3xl leading-none">{badge.emoji}</span>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full border"
          style={{
            background: "rgba(0,0,0,0.3)",
            color: isMilestone ? "#facc15" : "#22d3ee",
            borderColor: isMilestone ? "rgba(250,204,21,0.3)" : "rgba(34,211,238,0.3)",
          }}
        >
          {isMilestone ? t("trophies.milestone") : t("trophies.stage")}
        </span>
      </div>

      <div className="flex-1">
        <div className="text-sm font-bold text-white leading-snug">{badge.name}</div>
        {badge.desc && (
          <div className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(107,114,128,1)" }}>
            {badge.desc}
          </div>
        )}
      </div>

      <div className="mt-auto pt-1">
        <span
          className="text-xs font-semibold"
          style={{ color: isMilestone ? "#facc15" : "#22d3ee" }}
        >
          {t("trophies.earnedLabel")}
        </span>
      </div>
    </div>
  );
}

export default function TrophiesPage() {
  const { t } = useLocale();
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
        <div className="text-gray-600 text-sm">{t("common.loading")}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0d1117,#0f2027,#1a1a2e)" }}>
        <div className="text-gray-600 text-sm">{t("common.error")}</div>
      </div>
    );
  }

  // ── Admin view ───────────────────────────────────────────────────────────────
  if (data.mode === "admin") {
    const tiers = adminFilter === "all" ? TIER_ORDER : [adminFilter];
    const totalSupply = data.trophies.reduce((s, tr) => s + tr.supply, 0);
    const totalClaimed = data.trophies.reduce((s, tr) => s + tr.claimed, 0);

    return (
      <div className="min-h-screen px-4 py-12" style={{ background: "linear-gradient(135deg,#0d1117,#0f2027,#1a1a2e)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <Link href="/admin" className="text-gray-500 hover:text-cyan-400 text-sm mb-3 inline-block transition-colors">← Admin</Link>
              <h1 className="text-3xl font-black text-white">{t("trophies.trophyLibrary")}</h1>
              <p className="text-gray-500 text-sm mt-1">{t("trophies.adminView")}</p>
            </div>
            <div className="flex gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-cyan-400">{data.trophies.length}</div>
                <div className="text-xs text-gray-600">{t("trophies.trophiesLabel")}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400">{totalClaimed.toLocaleString()}</div>
                <div className="text-xs text-gray-600">{t("trophies.claimed")}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-500">{totalSupply.toLocaleString()}</div>
                <div className="text-xs text-gray-600">{t("trophies.totalSupply")}</div>
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
                {tier === "all" ? t("trophies.allTiers") : TIER_META[tier].label}
              </button>
            ))}
          </div>

          {tiers.map((tier) => {
            const group = data.trophies.filter((tr) => tr.tier === tier);
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
                  {group.map((tr) => (
                    <TrophyCard key={tr.id} trophy={tr} owned={data.ownedIds.includes(tr.id)} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── User view ────────────────────────────────────────────────────────────────
  const owned = [...data.owned].sort((a, b) => b.price - a.price);
  const earned = data.earnedBadges ?? [];
  const hasAnything = owned.length > 0 || earned.length > 0;

  return (
    <div className="min-h-screen px-4 py-12" style={{ background: "linear-gradient(135deg,#0d1117,#0f2027,#1a1a2e)" }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link href="/shop" className="text-gray-500 hover:text-cyan-400 text-sm mb-3 inline-block transition-colors">← Shop</Link>
            <h1 className="text-3xl font-black text-white">{t("trophies.title")}</h1>
            <p className="text-gray-500 text-sm mt-1">
              {!hasAnything
                ? t("trophies.vaultEmpty")
                : `${earned.length} ${t("trophies.earnedLabel")} · ${owned.length} ${t("trophies.purchased")}`}
            </p>
          </div>
          <Link
            href="/shop?tab=treasures"
            className="text-sm px-4 py-2 rounded-lg font-semibold transition-all self-start"
            style={{
              background: "rgba(34,211,238,0.1)",
              border: "1px solid rgba(34,211,238,0.3)",
              color: "#22d3ee",
            }}
          >
            {t("trophies.browseTreasures")}
          </Link>
        </div>

        {!hasAnything ? (
          <div className="rounded-xl border border-white/8 bg-white/2 p-16 text-center">
            <div className="text-4xl mb-3">🏆</div>
            <p className="text-gray-600 text-sm">{t("trophies.vaultEmpty")}</p>
            <p className="text-gray-700 text-xs mt-1">{t("trophies.headToShop")}</p>
          </div>
        ) : (
          <div className="space-y-10">

            {/* Earned section */}
            {earned.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-amber-400">{t("trophies.earned")}</h2>
                  <div className="h-px flex-1 bg-amber-400/15" />
                  <span className="text-xs font-mono text-gray-600">{earned.length}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {earned.map((b) => (
                    <EarnedBadgeCard key={b.id} badge={b} />
                  ))}
                </div>
              </section>
            )}

            {/* Purchased section */}
            {owned.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-400">{t("trophies.purchased")}</h2>
                  <div className="h-px flex-1 bg-cyan-400/15" />
                  <span className="text-xs font-mono text-gray-600">{owned.length}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {owned.map((tr) => (
                    <TrophyCard key={tr.id} trophy={tr} owned />
                  ))}
                </div>
              </section>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
