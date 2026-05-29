"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSkin } from "@/contexts/SkinContext";
import { clearSession } from "@/lib/auth";

type MeData = {
  username: string;
  email: string;
  tier: "free" | "trial" | "pro" | "all-star";
  trialDaysLeft: number | null;
  voucherExpiry: number | null;
};

const TIER_LABEL: Record<string, string> = {
  free: "Free",
  trial: "Free Trial",
  pro: "Pro",
  "all-star": "All-Star",
};

const TIER_COLOR: Record<string, string> = {
  free: "#6b7280",
  trial: "#f59e0b",
  pro: "#22d3ee",
  "all-star": "#a78bfa",
};

export default function AccountPage() {
  const { skin } = useSkin();
  const router = useRouter();

  const [me, setMe] = useState<MeData | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: MeData | null) => {
        if (!data) { router.replace("/login"); return; }
        setMe(data);
      })
      .catch(() => router.replace("/login"));
  }, [router]);

  async function openBillingPortal() {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json() as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error ?? "Could not open billing portal.");
        setPortalLoading(false);
      }
    } catch {
      alert("Something went wrong. Please try again.");
      setPortalLoading(false);
    }
  }

  async function handleDeleteAccount() {
    if (deleteInput !== me?.username) return;
    setDeleteLoading(true);
    try {
      const res = await fetch("/api/delete-account", { method: "DELETE" });
      if (res.ok) {
        clearSession();
        router.replace("/");
      } else {
        alert("Failed to delete account. Please try again.");
        setDeleteLoading(false);
      }
    } catch {
      alert("Something went wrong.");
      setDeleteLoading(false);
    }
  }

  if (!me) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: skin.pageBg }}>
        <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  const isPro = me.tier === "pro" || me.tier === "all-star";
  const tierColor = TIER_COLOR[me.tier] ?? "#6b7280";

  return (
    <main className="min-h-screen pt-24 pb-16 px-4" style={{ background: skin.pageBg }}>
      <div className="max-w-xl mx-auto space-y-5">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-black mb-1" style={{ color: skin.textPrimary }}>Account</h1>
          <p className="text-sm" style={{ color: skin.textMuted }}>
            Manage your subscription and account settings for{" "}
            <span style={{ color: skin.accent }}>@{me.username}</span>
          </p>
        </div>

        {/* Subscription card */}
        <section
          className="rounded-2xl p-6"
          style={{ background: skin.cardBg, border: `1px solid ${skin.cardBorder}` }}
        >
          <h2 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: skin.textMuted }}>
            Subscription
          </h2>

          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest"
                  style={{ background: `${tierColor}18`, color: tierColor, border: `1px solid ${tierColor}40` }}
                >
                  {TIER_LABEL[me.tier]}
                </span>
              </div>
              {me.tier === "trial" && me.trialDaysLeft !== null && (
                <p className="text-xs mt-1" style={{ color: "#f59e0b" }}>
                  {me.trialDaysLeft} day{me.trialDaysLeft === 1 ? "" : "s"} remaining in free trial
                </p>
              )}
              {me.tier === "free" && (
                <p className="text-xs mt-1" style={{ color: skin.textMuted }}>
                  Free plan — limited to introductory stages
                </p>
              )}
              {me.tier === "pro" && !me.voucherExpiry && (
                <p className="text-xs mt-1" style={{ color: skin.textMuted }}>
                  All 438 stages unlocked · Unlimited ARIA hints
                </p>
              )}
              {me.tier === "pro" && me.voucherExpiry && (
                <p className="text-xs mt-1" style={{ color: skin.textMuted }}>
                  All 438 stages unlocked · Expires{" "}
                  <span style={{ color: "#22d3ee" }}>
                    {new Date(me.voucherExpiry).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </p>
              )}
              {me.tier === "all-star" && (
                <p className="text-xs mt-1" style={{ color: "#a78bfa" }}>
                  All-Star access · Full platform unlocked
                </p>
              )}
            </div>
          </div>

          {isPro && me.tier !== "all-star" && (
            <button
              onClick={openBillingPortal}
              disabled={portalLoading}
              className="w-full py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{ background: `${tierColor}15`, color: tierColor, border: `1px solid ${tierColor}35` }}
            >
              {portalLoading ? "Opening portal…" : "Manage Billing & Subscription →"}
            </button>
          )}

          {me.tier === "all-star" && (
            <p className="text-xs text-center py-2" style={{ color: skin.textMuted }}>
              All-Star access is managed by your administrator.
            </p>
          )}

          {!isPro && (
            <Link
              href="/upgrade"
              className="block w-full py-2.5 rounded-xl text-sm font-black text-center transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(90deg, #22d3ee, #818cf8, #6366f1)", color: "#000" }}
            >
              Upgrade to Pro →
            </Link>
          )}
        </section>

        {/* Account details */}
        <section
          className="rounded-2xl p-6"
          style={{ background: skin.cardBg, border: `1px solid ${skin.cardBorder}` }}
        >
          <h2 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: skin.textMuted }}>
            Account Details
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold block mb-1" style={{ color: skin.textMuted }}>Username</label>
              <p className="text-sm font-mono" style={{ color: skin.textPrimary }}>@{me.username}</p>
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1" style={{ color: skin.textMuted }}>Email</label>
              <p className="text-sm font-mono" style={{ color: skin.textSecondary }}>{me.email || "—"}</p>
            </div>
            <div className="pt-3" style={{ borderTop: `1px solid ${skin.cardBorder}` }}>
              <Link
                href="/forgot-password"
                className="text-xs transition-colors hover:opacity-80"
                style={{ color: skin.accent }}
              >
                Change password →
              </Link>
            </div>
          </div>
        </section>

        {/* Public profile */}
        <section
          className="rounded-2xl p-6"
          style={{ background: skin.cardBg, border: `1px solid ${skin.cardBorder}` }}
        >
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: skin.textMuted }}>
            Public Profile
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-sm" style={{ color: skin.textSecondary }}>
              View your public stats, trophies, and badges
            </p>
            <Link
              href={`/profile/${me.username}`}
              className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors hover:opacity-80 flex-shrink-0"
              style={{ background: `${skin.accent}15`, color: skin.accent, border: `1px solid ${skin.accent}35` }}
            >
              View profile →
            </Link>
          </div>
        </section>

        {/* Danger zone */}
        <section
          className="rounded-2xl p-6"
          style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.2)" }}
        >
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-red-500">
            Danger Zone
          </h2>

          {!deleteConfirm ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-red-400 mb-0.5">Delete account</p>
                <p className="text-xs" style={{ color: skin.textMuted }}>
                  Permanently removes all progress, badges, and data. This cannot be undone.
                </p>
              </div>
              <button
                onClick={() => setDeleteConfirm(true)}
                className="ml-4 flex-shrink-0 text-xs px-3 py-1.5 rounded-lg font-semibold text-red-400 hover:text-red-300 transition-colors"
                style={{ border: "1px solid rgba(239,68,68,0.35)" }}
              >
                Delete
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-red-400 font-semibold">
                Type your username to confirm deletion
              </p>
              <input
                type="text"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                placeholder={me.username}
                className="w-full px-3 py-2 rounded-lg text-sm font-mono bg-black/30 outline-none"
                style={{ border: "1px solid rgba(239,68,68,0.4)", color: skin.textPrimary }}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => { setDeleteConfirm(false); setDeleteInput(""); }}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold transition-colors"
                  style={{ border: `1px solid ${skin.cardBorder}`, color: skin.textMuted }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteInput !== me.username || deleteLoading}
                  className="flex-1 py-2 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-colors disabled:opacity-40"
                >
                  {deleteLoading ? "Deleting…" : "Permanently delete account"}
                </button>
              </div>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
