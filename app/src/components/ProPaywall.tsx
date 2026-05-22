"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProPaywall({ stageTitle, epochId }: { stageTitle: string; epochId: string }) {
  const [loading, setLoading] = useState<"monthly" | "yearly" | null>(null);

  async function checkout(plan: "monthly" | "yearly") {
    setLoading(plan);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json() as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error ?? "Something went wrong. Please try again.");
        setLoading(null);
      }
    } catch {
      alert("Something went wrong. Please try again.");
      setLoading(null);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: "linear-gradient(135deg, #0d1117 0%, #0f1a2e 50%, #1a0a2e 100%)" }}
    >
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="text-3xl font-black text-white mb-2">Pro Required</h1>
          <p className="text-gray-400 text-sm">
            <span className="text-cyan-400 font-semibold">{stageTitle}</span> is part of the full curriculum.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Monthly */}
          <button
            onClick={() => checkout("monthly")}
            disabled={loading !== null}
            className="relative group rounded-xl border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-400/60 p-6 text-left transition-all duration-200 disabled:opacity-60"
          >
            <div className="text-xs text-cyan-400/70 uppercase tracking-widest mb-1">Monthly</div>
            <div className="text-3xl font-black text-white mb-1">$19</div>
            <div className="text-xs text-gray-500">per month</div>
            {loading === "monthly" && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50">
                <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </button>

          {/* Yearly */}
          <button
            onClick={() => checkout("yearly")}
            disabled={loading !== null}
            className="relative group rounded-xl border border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/15 hover:border-indigo-400/70 p-6 text-left transition-all duration-200 disabled:opacity-60"
          >
            <div className="absolute -top-3 left-4">
              <span className="text-xs font-bold bg-indigo-500 text-white px-2 py-0.5 rounded-full">
                SAVE 34%
              </span>
            </div>
            <div className="text-xs text-indigo-400/70 uppercase tracking-widest mb-1">Annual</div>
            <div className="text-3xl font-black text-white mb-1">$149</div>
            <div className="text-xs text-gray-500">per year · $12.42/mo</div>
            {loading === "yearly" && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50">
                <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </button>
        </div>

        {/* What's included */}
        <div className="rounded-xl border border-white/5 bg-white/2 px-6 py-5 mb-8">
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-3">Pro includes</div>
          <ul className="space-y-2">
            {[
              "All 358 stages across 32 epochs and 10 tracks",
              "ARIA AI tutor — Socratic coaching on every stage",
              "Leaderboard, streaks, and milestone badges",
              "Trophy system and avatar shop",
              "PDF progress certificate",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-cyan-400 mt-0.5 shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Back link */}
        <div className="text-center">
          <Link
            href={`/stages/epoch/${epochId}`}
            className="text-gray-600 hover:text-gray-400 text-sm transition-colors"
          >
            ← Back to stage map
          </Link>
        </div>
      </div>
    </div>
  );
}
