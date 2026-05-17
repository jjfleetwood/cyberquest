"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { StageConfig } from "@/data/types";

type Props = {
  stage: StageConfig;
  flag: string;
  timeTakenMs: number;
  timePenaltyXp: number;
  effectiveXp: number;
};

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

export default function FlagSuccessModal({ stage, flag, timeTakenMs, timePenaltyXp, effectiveXp }: Props) {
  const [visible, setVisible] = useState(false);
  const [flagVisible, setFlagVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 50);
    const t2 = setTimeout(() => setFlagVisible(true), 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
    >
      {/* Glow rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`w-96 h-96 rounded-full border border-green-500/20 transition-all duration-1000 ${visible ? "scale-100 opacity-100" : "scale-50 opacity-0"}`} />
        <div className={`absolute w-64 h-64 rounded-full border border-green-500/30 transition-all duration-700 delay-100 ${visible ? "scale-100 opacity-100" : "scale-50 opacity-0"}`} />
        <div className={`absolute w-32 h-32 rounded-full bg-green-500/5 transition-all duration-500 delay-200 ${visible ? "scale-100 opacity-100" : "scale-50 opacity-0"}`} />
      </div>

      {/* Card */}
      <div
        className={`relative w-full max-w-md rounded-2xl border overflow-hidden transition-all duration-500 ${
          visible ? "scale-100 translate-y-0" : "scale-90 translate-y-8"
        }`}
        style={{
          background: "linear-gradient(145deg, #061a0e 0%, #0d1117 60%, #0a1628 100%)",
          borderColor: "rgba(34,197,94,0.4)",
          boxShadow: "0 0 60px rgba(34,197,94,0.15), 0 0 120px rgba(34,197,94,0.05)",
        }}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #22c55e, #4ade80, #22c55e)" }} />

        <div className="p-8">
          {/* Status badge */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/40 bg-green-500/10">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 font-mono text-xs font-bold tracking-widest uppercase">
                Flag Accepted
              </span>
            </div>
          </div>

          {/* Main heading */}
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">✓</div>
            <h2 className="text-2xl font-bold text-white mb-1">Mission Complete</h2>
            <p className="text-gray-500 text-sm">{stage.title}</p>
          </div>

          {/* Flag display */}
          <div
            className={`mb-6 rounded-xl border border-green-500/30 bg-black/40 p-4 font-mono text-center transition-all duration-700 ${
              flagVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <p className="text-gray-600 text-xs uppercase tracking-widest mb-2">Captured Flag</p>
            <p
              className="text-green-400 font-bold text-sm break-all"
              style={{ textShadow: "0 0 20px rgba(74,222,128,0.5)" }}
            >
              {flag}
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white/3 rounded-xl p-3 text-center border border-white/10">
              <div className="text-xl font-bold text-green-400">+{effectiveXp}</div>
              <div className="text-xs text-gray-600 mt-0.5">XP Earned</div>
              {timePenaltyXp > 0 && (
                <div className="text-xs text-orange-500 mt-0.5">-{timePenaltyXp} penalty</div>
              )}
            </div>
            <div className="bg-white/3 rounded-xl p-3 text-center border border-white/10">
              <div className="text-xl">{stage.badge.emoji}</div>
              <div className="text-xs text-gray-600 mt-0.5 truncate">{stage.badge.name}</div>
            </div>
            <div className="bg-white/3 rounded-xl p-3 text-center border border-white/10">
              <div className="text-xl font-bold text-cyan-400">{formatTime(timeTakenMs)}</div>
              <div className="text-xs text-gray-600 mt-0.5">Time</div>
            </div>
          </div>

          {/* Skills Acquired */}
          {stage.info?.keyTakeaways && stage.info.keyTakeaways.length > 0 && (
            <div className="mb-6 rounded-xl border border-white/8 bg-white/2 p-4">
              <p className="text-gray-600 text-xs uppercase tracking-widest mb-3">Skills Acquired</p>
              <ul className="space-y-1.5">
                {stage.info.keyTakeaways.slice(0, 3).map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-400 leading-relaxed">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">›</span>
                    {takeaway}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/leaderboard"
              className="flex-1 text-center py-2.5 border border-purple-500/50 hover:border-purple-400 text-purple-400 font-semibold rounded-xl text-sm transition-colors"
            >
              🏆 Leaderboard
            </Link>
            <Link
              href="/stages"
              className="flex-1 text-center py-2.5 font-bold rounded-xl text-sm transition-colors text-black"
              style={{ background: "linear-gradient(90deg, #22c55e, #4ade80)" }}
            >
              Stage Map →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
