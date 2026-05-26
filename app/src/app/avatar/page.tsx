"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import { SHOP_ITEMS, type ShopItem } from "@/data/shop-items";
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

const RARITY_COLORS: Record<string, string> = {
  common: "text-gray-400 border-gray-600/40 bg-gray-600/10",
  rare: "text-purple-400 border-purple-500/40 bg-purple-500/10",
  legendary: "text-amber-400 border-amber-500/40 bg-amber-500/10",
};

export default function AvatarPage() {
  const { t } = useLocale();
  const router = useRouter();
  const [data, setData] = useState<ShopData | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [flash, setFlash] = useState<{ msg: string; ok: boolean } | null>(null);

  const SLOT_LABELS: Record<string, string> = {
    head: t("avatar.slotHead"),
    body: t("avatar.slotBody"),
    hands: t("avatar.slotHands"),
    background: t("avatar.slotBackground"),
  };

  const load = useCallback(() => {
    fetch("/api/shop")
      .then((r) => {
        if (r.status === 401) { router.replace("/login"); return null; }
        return r.json() as Promise<ShopData>;
      })
      .then((d) => { if (d) setData(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => { load(); }, [load]);

  function showFlash(msg: string, ok: boolean) {
    setFlash({ msg, ok });
    setTimeout(() => setFlash(null), 3000);
  }

  async function toggleEquip(itemId: string) {
    if (!data || busy) return;
    setBusy(itemId);
    const res = await fetch("/api/shop", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId }),
    });
    const json = await res.json();
    setBusy(null);
    if (res.ok) {
      showFlash(json.action === "equipped" ? t("avatar.equipped") : t("common.close"), true);
      load();
    } else {
      showFlash(json.error ?? t("common.error"), false);
    }
  }

  const isAdmin = data?.isAdmin ?? false;
  // Admin sees the full catalog; everyone else sees only their inventory
  const allItems = isAdmin ? SHOP_ITEMS : (data?.items ?? []);
  const itemsById = Object.fromEntries(allItems.map((i) => [i.id, i]));
  const equipped = data?.equipped ?? {};
  const inventory = new Set(data?.inventory ?? []);

  // Group items by slot for admin catalog view
  const slots = ["head", "body", "hands", "background"] as const;
  const bySlot = Object.fromEntries(
    slots.map((slot) => [slot, allItems.filter((i) => i.slot === slot)])
  );
  const hasAnyInSlot = (slot: string) => bySlot[slot as keyof typeof bySlot]?.length > 0;

  // Non-admin: show only owned items (legacy inventory view)
  const ownedItems = isAdmin ? [] : (data?.inventory ?? [])
    .map((id) => itemsById[id])
    .filter(Boolean) as ShopItem[];

  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{ background: "linear-gradient(160deg, #060a10 0%, #0d1117 50%, #0a0e1a 100%)" }}
    >
      {flash && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl border text-sm font-semibold shadow-xl transition-all ${
            flash.ok
              ? "bg-green-500/15 border-green-500/40 text-green-400"
              : "bg-red-500/15 border-red-500/40 text-red-400"
          }`}
        >
          {flash.msg}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/shop" className="text-gray-600 hover:text-gray-400 text-sm mb-4 inline-block transition-colors">
            {t("avatar.backToShop")}
          </Link>
          <h1 className="text-3xl font-black text-white">{t("avatar.title")}</h1>
          <p className="text-gray-600 text-sm mt-1">
            {isAdmin ? t("avatar.adminMode") : t("avatar.equipFromShop")}
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col lg:flex-row gap-8 animate-pulse">
            <div className="w-72 h-72 rounded-2xl bg-white/3 border border-white/8 flex-shrink-0" />
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-28 rounded-xl bg-white/3 border border-white/8" />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Avatar preview */}
            <div className="flex flex-col items-center gap-4 flex-shrink-0">
              <div
                className="bg-white/2 border border-white/8 rounded-2xl p-8 flex items-center justify-center"
                style={{ background: "radial-gradient(ellipse at center, rgba(6,182,212,0.06) 0%, transparent 70%)" }}
              >
                <Avatar equipped={equipped} itemsById={itemsById} size="lg" />
              </div>
              <p className="text-xs text-gray-700 text-center">{t("avatar.tapToEquip")}</p>
              {/* Active equips summary */}
              {Object.keys(equipped).length > 0 && (
                <div className="w-full space-y-1">
                  {Object.entries(equipped).map(([slot, itemId]) => {
                    const item = itemsById[itemId];
                    if (!item) return null;
                    return (
                      <div key={slot} className="flex items-center justify-between text-xs bg-cyan-500/8 border border-cyan-500/20 rounded-lg px-3 py-1.5">
                        <span className="text-gray-500">{SLOT_LABELS[slot] ?? slot}</span>
                        <span className="text-cyan-400 font-semibold">{item.emoji} {item.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Item grid */}
            <div className="flex-1 min-w-0">
              {isAdmin ? (
                // Admin: full catalog grouped by slot
                <div className="space-y-6">
                  {slots.map((slot) => {
                    if (!hasAnyInSlot(slot)) return null;
                    return (
                      <div key={slot}>
                        <div className="text-xs text-gray-500 uppercase tracking-wider font-mono mb-3">
                          {SLOT_LABELS[slot]} {t("avatar.slotSuffix")}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {bySlot[slot].map((item) => {
                            const isEquipped = equipped[item.slot] === item.id;
                            const isOwned = inventory.has(item.id);
                            return (
                              <button
                                key={item.id}
                                onClick={() => toggleEquip(item.id)}
                                disabled={!!busy}
                                className={`rounded-xl border p-4 text-left transition-all hover:scale-105 ${
                                  isEquipped
                                    ? "border-cyan-500/50 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
                                    : "border-white/10 bg-white/3 hover:border-white/20"
                                }`}
                              >
                                <div className="text-3xl mb-2">{item.emoji}</div>
                                <div className="text-white text-xs font-semibold leading-tight">{item.name}</div>
                                <div className={`text-xs mt-1.5 font-medium ${isEquipped ? "text-cyan-400" : "text-gray-600"}`}>
                                  {isEquipped ? t("avatar.equipped") : t("avatar.tapToEquipBtn")}
                                </div>
                                <div className="flex items-center gap-1.5 mt-2">
                                  <span className={`text-xs px-1.5 py-0.5 rounded-full border ${RARITY_COLORS[item.rarity]}`}>
                                    {item.rarity}
                                  </span>
                                  {isOwned && !isEquipped && (
                                    <span className="text-xs text-green-500 font-mono">owned</span>
                                  )}
                                  {item.adminOnly && (
                                    <span className="text-xs text-amber-600 font-mono">admin</span>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                // Normal user: only owned items
                <>
                  <div className="text-xs text-gray-600 uppercase tracking-wider font-semibold mb-4">
                    {t("avatar.yourItems")} ({ownedItems.length})
                  </div>
                  {ownedItems.length === 0 ? (
                    <div className="text-center py-16 text-gray-600 text-sm">
                      {t("avatar.noItems")}
                      <Link href="/shop" className="block mx-auto mt-3 text-cyan-400 hover:text-cyan-300 text-xs">
                        {t("avatar.goToShop")}
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {ownedItems.map((item) => {
                        const isEquipped = equipped[item.slot] === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => toggleEquip(item.id)}
                            disabled={!!busy}
                            className={`rounded-xl border p-4 text-left transition-all hover:scale-105 ${
                              isEquipped
                                ? "border-cyan-500/50 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
                                : "border-white/10 bg-white/3 hover:border-white/20"
                            }`}
                          >
                            <div className="text-3xl mb-2">{item.emoji}</div>
                            <div className="text-white text-xs font-semibold leading-tight">{item.name}</div>
                            <div className={`text-xs mt-1.5 font-medium ${isEquipped ? "text-cyan-400" : "text-gray-600"}`}>
                              {isEquipped ? t("avatar.equipped") : t("avatar.tapToEquipBtn")}
                            </div>
                            <span className={`text-xs px-1.5 py-0.5 rounded-full border mt-2 inline-block ${RARITY_COLORS[item.rarity]}`}>
                              {item.rarity}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
