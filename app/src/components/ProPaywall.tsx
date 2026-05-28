"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";

export default function ProPaywall({ stageTitle, epochId }: { stageTitle: string; epochId: string }) {
  const { t } = useLocale();
  const [loading, setLoading] = useState<"monthly" | "yearly" | null>(null);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherStatus, setVoucherStatus] = useState<"idle" | "redeeming" | "success" | "error">("idle");
  const [voucherMsg, setVoucherMsg] = useState("");

  async function redeemVoucher() {
    if (!voucherCode.trim()) return;
    setVoucherStatus("redeeming");
    try {
      const res = await fetch("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: voucherCode.trim() }),
      });
      const data = await res.json() as { ok?: boolean; message?: string; error?: string };
      if (res.ok && data.ok) {
        setVoucherStatus("success");
        setVoucherMsg(data.message ?? "Pro access activated!");
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setVoucherStatus("error");
        setVoucherMsg(data.error ?? "Invalid code.");
        setTimeout(() => setVoucherStatus("idle"), 3000);
      }
    } catch {
      setVoucherStatus("error");
      setVoucherMsg("Something went wrong.");
      setTimeout(() => setVoucherStatus("idle"), 3000);
    }
  }

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
        alert(data.error ?? t("paywall.somethingWentWrong"));
        setLoading(null);
      }
    } catch {
      alert(t("paywall.somethingWentWrong"));
      setLoading(null);
    }
  }

  const features = [
    t("paywall.feature1"),
    t("paywall.feature2"),
    t("paywall.feature3"),
    t("paywall.feature4"),
    t("paywall.feature5"),
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: "linear-gradient(135deg, #0d1117 0%, #0f1a2e 50%, #1a0a2e 100%)" }}
    >
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="text-3xl font-black text-white mb-2">{t("paywall.proRequired")}</h1>
          <p className="text-gray-400 text-sm">
            <span className="text-cyan-400 font-semibold">{stageTitle}</span> {t("paywall.isPartOfCurriculum")}
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
            <div className="text-xs text-cyan-400/70 uppercase tracking-widest mb-1">{t("paywall.monthly")}</div>
            <div className="text-3xl font-black text-white mb-1">$13.99</div>
            <div className="text-xs text-gray-500">{t("paywall.perMonth")}</div>
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
                {t("paywall.save41")}
              </span>
            </div>
            <div className="text-xs text-indigo-400/70 uppercase tracking-widest mb-1">{t("paywall.annual")}</div>
            <div className="text-3xl font-black text-white mb-1">$99</div>
            <div className="text-xs text-gray-500">{t("paywall.perYearDetail")}</div>
            {loading === "yearly" && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50">
                <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </button>
        </div>

        {/* What's included */}
        <div className="rounded-xl border border-white/5 bg-white/2 px-6 py-5 mb-8">
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-3">{t("paywall.proIncludes")}</div>
          <ul className="space-y-2">
            {features.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-cyan-400 mt-0.5 shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Voucher code */}
        <div className="rounded-xl border border-white/8 bg-white/2 px-5 py-4 mb-6">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Have a promo code?</p>
          <div className="flex gap-2">
            <input
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && redeemVoucher()}
              placeholder="KRYPTOS-XXXX-XXXX"
              disabled={voucherStatus === "redeeming" || voucherStatus === "success"}
              className="flex-1 bg-black/40 border border-white/10 text-gray-200 placeholder-gray-700 text-sm font-mono px-3 py-2 rounded-lg focus:outline-none focus:border-cyan-500/50 disabled:opacity-50"
            />
            <button
              onClick={redeemVoucher}
              disabled={!voucherCode.trim() || voucherStatus === "redeeming" || voucherStatus === "success"}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex-shrink-0 disabled:opacity-50 ${
                voucherStatus === "success"
                  ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                  : "bg-white/5 border border-white/10 text-gray-300 hover:border-white/25 hover:text-white"
              }`}
            >
              {voucherStatus === "redeeming" ? "…" : voucherStatus === "success" ? "✓" : "Apply"}
            </button>
          </div>
          {voucherMsg && (
            <p className={`text-xs mt-2 ${voucherStatus === "success" ? "text-emerald-400" : "text-red-400"}`}>
              {voucherMsg}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="text-center space-y-3">
          <div>
            <Link
              href="/upgrade"
              className="text-cyan-500 hover:text-cyan-400 text-sm transition-colors font-semibold"
            >
              See full plan details →
            </Link>
          </div>
          <div>
            <Link
              href={`/stages/epoch/${epochId}`}
              className="text-gray-600 hover:text-gray-400 text-sm transition-colors"
            >
              {t("paywall.backToStageMap")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
