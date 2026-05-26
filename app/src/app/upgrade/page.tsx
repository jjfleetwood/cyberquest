"use client";

import { useState } from "react";
import Link from "next/link";
import { useSkin } from "@/contexts/SkinContext";

const FEATURES = [
  { icon: "🗺️", text: "All 438 stages across 36 epochs — unlocked immediately" },
  { icon: "🤖", text: "Unlimited ARIA AI hints — no cooldown, no message cap" },
  { icon: "🏆", text: "Trophy vault + daily rotating shop" },
  { icon: "🛒", text: "Full avatar item shop access" },
  { icon: "📄", text: "Downloadable progress certificate (PDF)" },
  { icon: "📦", text: "24 MCP server templates — ready to deploy" },
  { icon: "🔒", text: "Early access to every new epoch as it ships" },
  { icon: "♾️", text: "Cancel anytime — no lock-in" },
];

const FAQ = [
  {
    q: "What happens when my trial ends?",
    a: "After 7 days you'll see a paywall on gated stages. Your progress is always saved — upgrade any time to pick up where you left off.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes. Stripe handles plan changes instantly. Upgrading from monthly to yearly credits unused time.",
  },
  {
    q: "Is payment secure?",
    a: "All payments are processed by Stripe — PCI Level 1 certified. We never store card details.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, cancel from your Stripe billing portal at any time. Access continues through the end of your paid period.",
  },
];

export default function UpgradePage() {
  const { skin } = useSkin();
  const [loading, setLoading] = useState<"monthly" | "yearly" | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    <main
      className="min-h-screen pt-20 pb-24 px-4"
      style={{ background: skin.pageBg }}
    >
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center pt-12 pb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-6 uppercase tracking-widest"
          style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.3)" }}>
          ⚡ Trial ending soon
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight" style={{ color: skin.textPrimary }}>
          Go Pro. Stay ahead<br />
          <span className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(90deg, #22d3ee, #818cf8)" }}>
            of the threat landscape.
          </span>
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: skin.textSecondary }}>
          438 stages · 36 epochs · real CVEs · ARIA AI hints · trophies · MCP templates.
          One subscription, everything unlocked.
        </p>
      </div>

      {/* Pricing cards */}
      <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-5 mb-16">

        {/* Yearly — featured */}
        <div className="relative rounded-2xl p-px overflow-hidden order-first sm:order-last"
          style={{ background: "linear-gradient(135deg, #22d3ee44, #818cf888, #6366f144)" }}>
          <div className="rounded-2xl p-7 h-full flex flex-col"
            style={{ background: "#0d1117" }}>

            {/* Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest"
                style={{ background: "linear-gradient(90deg, #22d3ee, #818cf8)", color: "#000" }}>
                Best value
              </span>
            </div>

            <div className="text-xs uppercase tracking-widest mb-3 mt-2" style={{ color: "#818cf8" }}>Annual</div>

            <div className="flex items-end gap-1.5 mb-1">
              <span className="text-5xl font-black" style={{ color: skin.textPrimary }}>$99</span>
              <span className="text-sm pb-2" style={{ color: skin.textMuted }}>/year</span>
            </div>
            <div className="text-xs mb-1" style={{ color: "#22d3ee" }}>$8.25 / month</div>
            <div className="inline-block text-xs px-2 py-0.5 rounded-full font-bold mb-6"
              style={{ background: "rgba(129,140,248,0.15)", color: "#818cf8" }}>
              SAVE 41% vs monthly
            </div>

            <button
              onClick={() => checkout("yearly")}
              disabled={loading !== null}
              className="w-full py-3.5 rounded-xl font-black text-sm transition-opacity hover:opacity-90 disabled:opacity-50 mb-3"
              style={{ background: "linear-gradient(90deg, #22d3ee, #818cf8, #6366f1)", color: "#000" }}
            >
              {loading === "yearly" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Redirecting…
                </span>
              ) : "Get Pro — Annual →"}
            </button>

            <p className="text-center text-xs" style={{ color: skin.textMuted }}>Cancel anytime · Billed once per year</p>
          </div>
        </div>

        {/* Monthly */}
        <div className="rounded-2xl p-7 flex flex-col"
          style={{ background: skin.cardBg, border: `1px solid ${skin.cardBorder}` }}>

          <div className="text-xs uppercase tracking-widest mb-3" style={{ color: skin.accent }}>Monthly</div>

          <div className="flex items-end gap-1.5 mb-1">
            <span className="text-5xl font-black" style={{ color: skin.textPrimary }}>$13.99</span>
            <span className="text-sm pb-2" style={{ color: skin.textMuted }}>/mo</span>
          </div>
          <div className="text-xs mb-6" style={{ color: skin.textMuted }}>$167.88 / year</div>

          <button
            onClick={() => checkout("monthly")}
            disabled={loading !== null}
            className="w-full py-3.5 rounded-xl font-black text-sm transition-colors disabled:opacity-50 mb-3"
            style={{ background: "rgba(34,211,238,0.12)", color: skin.accent, border: `1px solid rgba(34,211,238,0.35)` }}
          >
            {loading === "monthly" ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                Redirecting…
              </span>
            ) : "Get Pro — Monthly"}
          </button>

          <p className="text-center text-xs" style={{ color: skin.textMuted }}>Cancel anytime · Billed monthly</p>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-2xl mx-auto mb-16">
        <h2 className="text-xs font-bold uppercase tracking-widest text-center mb-6" style={{ color: skin.textMuted }}>
          Everything in Pro
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {FEATURES.map((f) => (
            <div key={f.text}
              className="flex items-start gap-3 px-4 py-3.5 rounded-xl"
              style={{ background: skin.cardBg, border: `1px solid ${skin.cardBorder}` }}>
              <span className="text-lg shrink-0">{f.icon}</span>
              <span className="text-sm leading-snug" style={{ color: skin.textSecondary }}>{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-xl mx-auto mb-16">
        <h2 className="text-xs font-bold uppercase tracking-widest text-center mb-6" style={{ color: skin.textMuted }}>
          FAQ
        </h2>
        <div className="space-y-2">
          {FAQ.map((item, i) => (
            <div key={i}
              className="rounded-xl overflow-hidden"
              style={{ border: `1px solid ${skin.cardBorder}` }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold transition-colors"
                style={{ color: skin.textSecondary, background: skin.cardBg }}
              >
                {item.q}
                <span className="ml-4 shrink-0 text-xs transition-transform duration-200"
                  style={{ color: skin.textMuted, transform: openFaq === i ? "rotate(180deg)" : "none" }}>▼</span>
              </button>
              {openFaq === i && (
                <div className="px-5 py-4 text-sm" style={{ color: skin.textMuted, background: "rgba(255,255,255,0.02)", borderTop: `1px solid ${skin.cardBorder}` }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Trust footer */}
      <div className="max-w-xl mx-auto text-center">
        <div className="flex items-center justify-center gap-6 mb-4 flex-wrap">
          {["🔒 Stripe payments", "♾️ Cancel anytime", "💳 No hidden fees"].map((t) => (
            <span key={t} className="text-xs" style={{ color: skin.textMuted }}>{t}</span>
          ))}
        </div>
        <Link href="/stages" className="text-xs transition-colors" style={{ color: skin.textMuted }}>
          Continue with free trial →
        </Link>
      </div>
    </main>
  );
}
