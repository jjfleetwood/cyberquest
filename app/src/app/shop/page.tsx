"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { type ShopItem } from "@/data/shop-items";
import { TIER_META, type TrophyTier } from "@/data/trophies";
import { useLocale } from "@/contexts/LocaleContext";

type ShopData = {
  items: ShopItem[];
  inventory: string[];
  equipped: Record<string, string>;
  coins: number;
  coinsSpent: number;
  spendable: number;
  isAdmin?: boolean;
};

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
  owned?: boolean;
};

type TrophyApiResponse = {
  mode: "user";
  shop: TrophyRow[];
  owned: TrophyRow[];
  isAdmin?: boolean;
};

type CatalogData = {
  items: (ShopItem & { owned: boolean })[];
  trophies: (TrophyRow & { owned: boolean })[];
};

const RARITY_COLORS: Record<string, string> = {
  common: "text-gray-400 border-gray-600/40 bg-gray-600/10",
  rare: "text-purple-400 border-purple-500/40 bg-purple-500/10",
  legendary: "text-amber-400 border-amber-500/40 bg-amber-500/10",
};

function SupplyBar({ remaining, supply }: { remaining: number; supply: number }) {
  const { t } = useLocale();
  const pct = supply === 0 ? 0 : Math.max(0, Math.min(100, (remaining / supply) * 100));
  const isEmpty = remaining <= 0;
  return (
    <div className="mt-1.5">
      <div className="flex justify-between text-xs mb-0.5" style={{ color: "rgba(107,114,128,1)" }}>
        <span>{isEmpty ? t("shop.soldOutLabel") : `${remaining.toLocaleString()} ${t("shop.leftLabel")}`}</span>
        <span>{supply.toLocaleString()} {t("shop.total")}</span>
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

function TrophyCard({
  trophy, owned, onBuy, buying, spendable,
}: {
  trophy: TrophyRow; owned: boolean; onBuy?: (id: string) => void; buying?: boolean; spendable?: number;
}) {
  const { t } = useLocale();
  const meta = TIER_META[trophy.tier];
  const soldOut = trophy.remaining <= 0;
  const canAfford = (spendable ?? 0) >= trophy.price;

  return (
    <div className={`rounded-xl border p-4 flex flex-col gap-3 transition-all ${meta.borderColor} ${meta.bgColor} ${owned ? "ring-1 ring-cyan-500/30" : ""}`}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-3xl leading-none">{trophy.emoji}</span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${meta.textColor} ${meta.borderColor}`} style={{ background: "rgba(0,0,0,0.3)" }}>
          {meta.label.toUpperCase()}
        </span>
      </div>
      <div>
        <div className="text-sm font-bold text-white leading-snug">{trophy.name}</div>
        <div className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(107,114,128,1)" }}>{trophy.description}</div>
      </div>
      <SupplyBar remaining={trophy.remaining} supply={trophy.supply} />
      <div className="flex items-center justify-between mt-auto pt-1">
        <span className={`text-sm font-mono font-bold ${meta.textColor}`}>{trophy.price.toLocaleString()} 🪙</span>
        {owned ? (
          <span className="text-xs text-cyan-400 font-semibold">{t("trophies.owned")}</span>
        ) : onBuy ? (
          <button
            onClick={() => onBuy(trophy.id)}
            disabled={buying || soldOut || !canAfford}
            className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-all"
            style={{
              background: soldOut || !canAfford ? "rgba(55,65,81,0.5)" : buying ? "rgba(34,211,238,0.3)" : "rgba(34,211,238,0.15)",
              color: soldOut || !canAfford ? "rgba(107,114,128,1)" : "#22d3ee",
              border: "1px solid",
              borderColor: soldOut || !canAfford ? "rgba(55,65,81,0.5)" : "rgba(34,211,238,0.3)",
              cursor: soldOut || !canAfford ? "not-allowed" : "pointer",
            }}
          >
            {soldOut ? t("shop.soldOut") : !canAfford ? t("shop.cantAfford") : buying ? t("shop.buying") : t("shop.buy")}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default function ShopPage() {
  const { t } = useLocale();
  const router = useRouter();
  const [data, setData] = useState<ShopData | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [flash, setFlash] = useState<{ msg: string; ok: boolean } | null>(null);

  const [trophyData, setTrophyData] = useState<TrophyApiResponse | null>(null);
  const [trophyLoading, setTrophyLoading] = useState(false);
  const [buyingTrophy, setBuyingTrophy] = useState<string | null>(null);
  const [spendable, setSpendable] = useState(0);

  // Admin catalog
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [catalog, setCatalog] = useState<CatalogData | null>(null);
  const [catalogLoading, setCatalogLoading] = useState(false);

  const load = useCallback(() => {
    fetch("/api/shop")
      .then((r) => {
        if (r.status === 401) { router.replace("/login"); return null; }
        return r.json() as Promise<ShopData>;
      })
      .then((d) => {
        if (d) { setData(d); setSpendable(d.spendable); }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  const loadTrophies = useCallback(() => {
    setTrophyLoading(true);
    fetch("/api/trophies")
      .then((r) => (r.ok ? r.json() as Promise<TrophyApiResponse> : null))
      .then((d) => { if (d) setTrophyData(d); })
      .catch(() => {})
      .finally(() => setTrophyLoading(false));
  }, []);

  useEffect(() => {
    load();
    loadTrophies();
  }, [load, loadTrophies]);

  function showFlash(msg: string, ok: boolean) {
    setFlash({ msg, ok });
    setTimeout(() => setFlash(null), 3000);
  }

  async function purchase(item: ShopItem) {
    if (!data || busy) return;
    setBusy(item.id);
    const res = await fetch("/api/shop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId: item.id }),
    });
    const json = await res.json();
    setBusy(null);
    if (res.ok) {
      showFlash(`${item.emoji} ${item.name} added to your collection!`, true);
      load();
    } else {
      showFlash(json.error === "insufficient coins"
        ? `Not enough coins — need ${item.price}, have ${data.spendable}`
        : (json.error ?? t("common.error")), false);
    }
  }

  async function handleBuyTrophy(trophyId: string) {
    setBuyingTrophy(trophyId);
    try {
      const res = await fetch("/api/trophies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trophyId }),
      });
      const json = await res.json();
      if (res.ok) {
        showFlash(`Trophy acquired! ${json.trophy?.emoji ?? ""}`, true);
        setSpendable(json.newSpendable ?? 0);
        loadTrophies();
      } else {
        showFlash(json.error ?? t("common.error"), false);
      }
    } finally {
      setBuyingTrophy(null);
    }
  }

  async function openCatalog() {
    setCatalogOpen(true);
    if (catalog) return;
    setCatalogLoading(true);
    fetch("/api/admin/catalog")
      .then((r) => r.ok ? r.json() as Promise<CatalogData> : null)
      .then((d) => { if (d) setCatalog(d); })
      .catch(() => {})
      .finally(() => setCatalogLoading(false));
  }

  const isAdmin = data?.isAdmin ?? trophyData?.isAdmin ?? false;
  const items = data?.items ?? [];
  const inventory = data?.inventory ?? [];
  const ownedTrophyIds = new Set(trophyData?.owned.map((tr) => tr.id) ?? []);
  const shopTrophies = trophyData?.shop ?? [];

  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{ background: "linear-gradient(160deg, #060a10 0%, #0d1117 50%, #0a0e1a 100%)" }}
    >
      {flash && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl border text-sm font-semibold shadow-xl transition-all ${
          flash.ok ? "bg-green-500/15 border-green-500/40 text-green-400" : "bg-red-500/15 border-red-500/40 text-red-400"
        }`}>
          {flash.msg}
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <Link href="/stages" className="text-gray-600 hover:text-gray-400 text-sm mb-4 inline-block transition-colors">
            {t("shop.stageMap")}
          </Link>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-black text-white">{t("shop.title")}</h1>
              <p className="text-gray-600 text-sm mt-1">{t("shop.desc")}</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {isAdmin && (
                <button
                  onClick={catalogOpen ? () => setCatalogOpen(false) : openCatalog}
                  className="text-xs px-3 py-1.5 rounded-lg border border-amber-500/30 text-amber-500 bg-amber-500/8 hover:bg-amber-500/15 transition-colors font-mono"
                >
                  🔑 {t("shop.adminCatalogTitle")} {catalogOpen ? "▲" : "▼"}
                </button>
              )}
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-amber-500/30 bg-amber-500/8 text-amber-400 font-mono text-lg font-bold">
                {spendable || data?.spendable || 0} 🪙
                <span className="text-xs text-gray-600 font-normal ml-1">{t("shop.spendable")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Admin Catalog (collapsible) ── */}
        {isAdmin && catalogOpen && (
          <div className="mb-10 border border-amber-500/20 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 bg-amber-500/5 border-b border-amber-500/15 flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-amber-400">{t("shop.adminCatalogTitle")}</span>
                <span className="text-xs text-gray-600 ml-2">{t("shop.adminCatalogDesc")}</span>
              </div>
              <button onClick={() => setCatalogOpen(false)} className="text-gray-600 hover:text-white text-sm">✕</button>
            </div>
            {catalogLoading ? (
              <div className="px-6 py-8 text-gray-600 text-sm">{t("shop.loadingCatalog")}</div>
            ) : catalog ? (
              <div className="px-6 py-5 space-y-8">
                {/* All avatar items */}
                {catalog.items.length > 0 && (
                  <div>
                    <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">
                      {t("shop.avatarItemsLabel")} ({catalog.items.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {catalog.items.map((item) => (
                        <div key={item.id} className={`rounded-xl border p-4 flex items-center gap-3 ${item.owned ? "border-green-500/30 bg-green-500/5" : "border-white/8 bg-white/2"}`}>
                          <span className="text-2xl">{item.emoji}</span>
                          <div className="min-w-0">
                            <div className="text-sm text-white font-semibold truncate">{item.name}</div>
                            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                              <span className={`text-xs px-1.5 py-0.5 rounded border ${RARITY_COLORS[item.rarity]}`}>{item.rarity}</span>
                              <span className="text-xs text-gray-600">{item.slot}</span>
                              <span className="text-xs text-amber-600 font-mono">{item.price} 🪙</span>
                              {item.owned && <span className="text-xs text-green-400">✓ owned</span>}
                              {item.adminOnly && <span className="text-xs text-red-500/70">admin-only</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* All trophies */}
                <div>
                  <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">
                    {t("shop.allTrophiesLabel")} ({catalog.trophies.length})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {catalog.trophies.map((tr) => {
                      const meta = TIER_META[tr.tier];
                      return (
                        <div key={tr.id} className={`rounded-xl border p-3 flex flex-col gap-1.5 ${meta.borderColor} ${meta.bgColor} ${tr.owned ? "ring-1 ring-cyan-500/30" : ""}`}>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl">{tr.emoji}</span>
                            {tr.owned && <span className="text-xs text-cyan-400">✓</span>}
                          </div>
                          <div className="text-xs text-white font-semibold leading-tight">{tr.name}</div>
                          <div className={`text-xs ${meta.textColor} font-mono`}>{tr.price.toLocaleString()} 🪙</div>
                          <div className="text-xs text-gray-700">{tr.remaining.toLocaleString()}/{tr.supply.toLocaleString()} {t("shop.leftLabel")}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-6 py-6 text-gray-600 text-sm">{t("shop.failedCatalog")}</div>
            )}
          </div>
        )}

        {/* ── Avatar items (normal shop) ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 rounded-xl bg-white/3 border border-white/8 animate-pulse" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {items.map((item) => {
              const owned = inventory.includes(item.id);
              const canAfford = (data?.spendable ?? 0) >= item.price;
              return (
                <div key={item.id} className={`rounded-2xl border p-5 flex flex-col gap-4 transition-all ${owned ? "border-green-500/30 bg-green-500/5" : "border-white/8 bg-white/2 hover:border-white/15"}`}>
                  <div className="flex items-start justify-between">
                    <div className="text-4xl">{item.emoji}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${RARITY_COLORS[item.rarity]}`}>{item.rarity}</span>
                  </div>
                  <div>
                    <div className="text-white font-bold">{item.name}</div>
                    <div className="text-gray-500 text-xs mt-1 leading-relaxed">{item.description}</div>
                    <div className="text-gray-600 text-xs mt-2">Slot: <span className="text-gray-400">{item.slot}</span></div>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-amber-400 font-mono font-bold">{item.price} 🪙</span>
                    {owned ? (
                      <Link href="/avatar" className="text-cyan-400 text-xs font-semibold hover:text-cyan-300 transition-colors">
                        → {t("avatar.title")}
                      </Link>
                    ) : (
                      <button
                        onClick={() => purchase(item)}
                        disabled={!!busy || !canAfford}
                        className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${canAfford ? "bg-cyan-500 hover:bg-cyan-400 text-black" : "bg-white/5 text-gray-600 cursor-not-allowed"}`}
                      >
                        {busy === item.id ? "…" : canAfford ? t("shop.buy") : t("shop.needMoreCoins")}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        {/* ── Daily trophy showcase ── */}
        <div className="border-t border-white/6 pt-10">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-black text-white">{t("shop.todayShowcase")}</h2>
            <div className="flex items-center gap-1.5 text-xs text-green-400 bg-green-400/10 border border-green-400/30 rounded-full px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {t("shop.refreshesDaily")}
            </div>
          </div>
          <p className="text-gray-600 text-xs mb-6">{t("shop.showcaseDesc")}</p>

          {trophyLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-48 rounded-xl bg-white/3 border border-white/8 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {shopTrophies.map((tr) => (
                <TrophyCard
                  key={tr.id}
                  trophy={tr}
                  owned={ownedTrophyIds.has(tr.id)}
                  onBuy={handleBuyTrophy}
                  buying={buyingTrophy === tr.id}
                  spendable={spendable}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
