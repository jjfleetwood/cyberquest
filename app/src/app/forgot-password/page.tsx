"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";

export default function ForgotPasswordPage() {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => {});
    setLoading(false);
    setSubmitted(true);
  }

  const inputClass =
    "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all text-sm";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #060a10 0%, #0d1117 50%, #0a0e1a 100%)" }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        <Link href="/login" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-400 transition-colors mb-8">
          {t("auth.backToLogin")}
        </Link>

        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-3xl mb-4 border border-cyan-500/20"
            style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(167,139,250,0.15))" }}
          >
            🔑
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Kryptós <span className="text-cyan-400">CronOS</span>
          </h1>
          <p className="text-gray-600 text-sm mt-1">{t("auth.passwordRecovery")}</p>
        </div>

        <div
          className="rounded-2xl border border-white/10 overflow-hidden p-6"
          style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)" }}
        >
          {submitted ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-4">📬</div>
              <h2 className="text-white font-semibold mb-2">{t("auth.checkInbox")}</h2>
              <p className="text-gray-500 text-sm">
                {t("auth.resetLinkSentPart1")} <span className="text-cyan-400">{email}</span>{t("auth.resetLinkSentPart2")}
              </p>
              <Link
                href="/login"
                className="inline-block mt-6 text-sm text-cyan-500 hover:text-cyan-400 transition-colors"
              >
                {t("auth.backToLoginArrow")}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <p className="text-gray-500 text-sm">
                {t("auth.enterEmailForReset")}
              </p>
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2 font-semibold">
                  {t("auth.emailAddress")}
                </label>
                <input
                  type="email"
                  placeholder="agent@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 font-bold rounded-lg text-sm mt-1 transition-all text-black disabled:opacity-50"
                style={{ background: loading ? "#155e75" : "linear-gradient(90deg, #22d3ee, #818cf8)" }}
              >
                {loading ? t("auth.sending") : t("auth.sendResetLink")}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
