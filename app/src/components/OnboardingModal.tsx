"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { useLocale } from "@/contexts/LocaleContext";

export default function OnboardingModal() {
  const { t } = useLocale();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("kryptos_onboarded")) setShow(true);
  }, []);

  function dismiss() {
    localStorage.setItem("kryptos_onboarded", "1");
    setShow(false);
  }

  if (!show) return null;

  const steps = [
    { n: "01", icon: "🗺️", titleKey: "onboarding.step1Title", descKey: "onboarding.step1Desc" },
    { n: "02", icon: "💻", titleKey: "onboarding.step2Title", descKey: "onboarding.step2Desc" },
    { n: "03", icon: "🏁", titleKey: "onboarding.step3Title", descKey: "onboarding.step3Desc" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)" }}
    >
      <div
        className="relative max-w-md w-full rounded-2xl border border-cyan-500/20 p-7"
        style={{ background: "linear-gradient(145deg, #0d1117 0%, #080d1a 100%)", boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(34,211,238,0.06)" }}
      >
        <div className="text-center mb-6">
          <div className="mb-3 flex justify-center"><Logo size={48} /></div>
          <h2 className="text-2xl font-black text-white mb-2">{t("onboarding.welcome")}</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            {t("onboarding.subtitle")}
          </p>
        </div>

        <div className="space-y-2.5 mb-6">
          {steps.map((s) => (
            <div
              key={s.n}
              className="flex items-start gap-3 px-4 py-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="text-[10px] font-mono text-cyan-700 mt-0.5 w-5 flex-shrink-0 font-bold">{s.n}</span>
              <span className="text-lg flex-shrink-0 leading-none mt-0.5">{s.icon}</span>
              <div>
                <p className="text-sm font-semibold text-white mb-0.5">{t(s.titleKey)}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{t(s.descKey)}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={dismiss}
          className="w-full py-3 font-black rounded-xl text-sm text-black transition-all hover:opacity-90 active:scale-95"
          style={{ background: "linear-gradient(90deg, #22d3ee, #818cf8)" }}
        >
          {t("onboarding.beginTraining")}
        </button>

        <p className="text-center text-xs text-gray-700 mt-4 space-x-3">
          <Link href="/privacy" className="hover:text-gray-500 transition-colors">{t("onboarding.privacyPolicy")}</Link>
          <span>·</span>
          <Link href="/leaderboard" className="hover:text-gray-500 transition-colors">{t("nav.leaderboard")}</Link>
        </p>
      </div>
    </div>
  );
}
