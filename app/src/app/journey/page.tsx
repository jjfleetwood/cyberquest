"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { stages as allStages, epochs } from "@/data/stages";
import { fetchProgress } from "@/lib/progress";
import { getSession, setSession } from "@/lib/auth";
import { useSkin } from "@/contexts/SkinContext";
import { useLocale } from "@/contexts/LocaleContext";

// ── Epoch accent colours (raw hex for inline styles) ──────────────────────────
const EPOCH_COLOR: Record<string, string> = {
  "first-journey": "#10b981",
  ancient:         "#f59e0b",
  "cisco-core":        "#3b82f6",
  "cisco-enterprise":  "#6366f1",
  "cisco-secops":      "#8b5cf6",
  "tech-audit-1":  "#a855f7",
  "tech-audit-2":  "#8b5cf6",
  "tech-audit-3":  "#6366f1",
  "tech-audit-4":  "#f43f5e",
  mitre:           "#ef4444",
  "mitre-atlas":   "#d946ef",
  "owasp-llm":     "#f97316",
  "quantum-1":     "#06b6d4",
  "quantum-2":     "#14b8a6",
  "quantum-3":     "#0ea5e9",
  umbrella:        "#22c55e",
  tapestry:        "#eab308",
  nails:           "#ec4899",
  "hair-color":    "#fb7185",
  "hair-styling":  "#c4b5fd",
};

// ── Map zones (tracks) ────────────────────────────────────────────────────────
const ZONES = [
  {
    id: "core",
    labelKey: "stages.tracks.coreSecurity",
    icon: "🛡️",
    epochIds: ["first-journey", "ancient"],
    gridArea: "core",
  },
  {
    id: "audit",
    labelKey: "stages.tracks.techAudit",
    icon: "📋",
    epochIds: ["tech-audit-1", "tech-audit-2", "tech-audit-3", "tech-audit-4"],
    gridArea: "audit",
  },
  {
    id: "threat",
    labelKey: "stages.tracks.threatFrameworks",
    icon: "🎯",
    epochIds: ["mitre", "mitre-atlas"],
    gridArea: "threat",
  },
  {
    id: "ai",
    labelKey: "stages.tracks.aiSecurity",
    icon: "🤖",
    epochIds: ["owasp-llm"],
    gridArea: "ai",
  },
  {
    id: "quantum",
    labelKey: "stages.tracks.quantumEra",
    icon: "⚛️",
    epochIds: ["quantum-1", "quantum-2", "quantum-3"],
    gridArea: "quantum",
  },
  {
    id: "defend",
    labelKey: "stages.tracks.enterprise",
    icon: "🏰",
    epochIds: ["cisco-core", "cisco-enterprise", "cisco-secops", "umbrella"],
    gridArea: "defend",
  },
  {
    id: "crafts",
    labelKey: "stages.tracks.crafts",
    icon: "🎨",
    epochIds: ["tapestry", "nails", "hair-color", "hair-styling"],
    gridArea: "crafts",
  },
];

function StageDots({
  total,
  completed,
  color,
}: {
  total: number;
  completed: number;
  color: string;
}) {
  const cols = total <= 10 ? 5 : total <= 12 ? 6 : total <= 25 ? 7 : 6;
  return (
    <div
      className="flex flex-wrap gap-1"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-500"
          style={{
            width: 7,
            height: 7,
            background: i < completed ? color : "rgba(255,255,255,0.07)",
            boxShadow: i < completed ? `0 0 4px ${color}80` : "none",
          }}
        />
      ))}
    </div>
  );
}

type EpochTileProps = {
  epochId: string;
  completedCount: number;
  totalCount: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
};

function EpochTile({ epochId, completedCount, totalCount, isHovered, onHover }: EpochTileProps) {
  const { t } = useLocale();
  const epoch = epochs.find((e) => e.id === epochId);
  if (!epoch) return null;

  const color = EPOCH_COLOR[epochId] ?? "#6b7280";
  const pct = totalCount > 0 ? completedCount / totalCount : 0;
  const started = completedCount > 0;
  const done = completedCount >= totalCount;

  const fogOpacity = done ? 0 : started ? Math.max(0.1, 0.85 * (1 - pct)) : 0.92;

  return (
    <Link
      href={`/stages/epoch/${epochId}`}
      onMouseEnter={() => onHover(epochId)}
      onMouseLeave={() => onHover(null)}
      className="relative rounded-xl overflow-hidden flex flex-col gap-2 p-3 transition-all duration-300 cursor-pointer select-none"
      style={{
        background: `linear-gradient(135deg, ${color}10 0%, rgba(13,17,23,0.9) 100%)`,
        border: `1px solid ${done ? color + "80" : started ? color + "40" : "rgba(255,255,255,0.06)"}`,
        boxShadow: done
          ? `0 0 20px ${color}30, inset 0 0 20px ${color}08`
          : isHovered && started
          ? `0 0 12px ${color}20`
          : "none",
        minHeight: 120,
        transform: isHovered ? "scale(1.02)" : "scale(1)",
      }}
    >
      {/* Epoch header */}
      <div className="flex items-center gap-2 z-10 relative">
        <span className="text-lg leading-none">{epoch.emoji}</span>
        <div className="min-w-0">
          <div
            className="text-xs font-bold leading-tight truncate"
            style={{ color: started ? color : "rgba(255,255,255,0.25)" }}
          >
            {epoch.name}
          </div>
          <div className="text-[10px] text-gray-700 leading-tight truncate">{epoch.subtitle}</div>
        </div>
        {done && (
          <span className="ml-auto text-xs font-bold" style={{ color }}>
            ✓
          </span>
        )}
      </div>

      {/* Stage dots */}
      <div className="z-10 relative">
        <StageDots total={totalCount} completed={completedCount} color={color} />
      </div>

      {/* Progress fraction */}
      <div className="z-10 relative flex items-center justify-between mt-auto">
        <span
          className="text-[10px] font-mono"
          style={{ color: started ? color + "cc" : "rgba(255,255,255,0.15)" }}
        >
          {completedCount}/{totalCount}
        </span>
        {done && (
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color }}>
            {t("journey.clearedLabel")}
          </span>
        )}
      </div>

      {/* Thin progress bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5 z-10">
        <div
          className="h-full transition-all duration-700"
          style={{ width: `${pct * 100}%`, background: color }}
        />
      </div>

      {/* ── Fog of war overlay ── */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? Math.max(0, fogOpacity - 0.3) : fogOpacity,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px), " +
            "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px), " +
            "rgba(6,8,15,0.85)",
          backdropFilter: fogOpacity > 0.5 ? "blur(1px)" : "none",
          borderRadius: "inherit",
        }}
      />
      {/* Fog label */}
      {!started && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 transition-opacity duration-300"
          style={{ opacity: isHovered ? 0.3 : 0.7 }}
        >
          <span className="text-[10px] text-gray-600 uppercase tracking-widest font-mono">
            {t("journey.unexploredLabel")}
          </span>
        </div>
      )}
    </Link>
  );
}

export default function JourneyPage() {
  const { skin } = useSkin();
  const { t } = useLocale();
  const [completedStages, setCompletedStages] = useState<string[]>([]);
  const [totalCoins, setTotalCoins] = useState(0);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredEpoch, setHoveredEpoch] = useState<string | null>(null);

  const load = useCallback(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { username: string } | null) => {
        if (!data) return;
        setUsername(data.username);
        setSession(data.username);
        return fetchProgress();
      })
      .then((p) => {
        if (!p) return;
        setCompletedStages(p.completedStages);
        setTotalCoins(p.coins);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setUsername(getSession());
    load();
  }, [load]);

  // Per-epoch counts
  const epochStages = Object.fromEntries(
    epochs.map((e) => [
      e.id,
      allStages.filter((s) => s.epochId === e.id),
    ])
  );

  const epochCompleted = Object.fromEntries(
    epochs.map((e) => [
      e.id,
      allStages.filter(
        (s) => s.epochId === e.id && completedStages.includes(s.id)
      ).length,
    ])
  );

  const totalStages = allStages.length;
  const totalCompleted = completedStages.length;
  const overallPct = totalStages > 0 ? (totalCompleted / totalStages) * 100 : 0;

  const epochsDone = epochs.filter(
    (e) => epochCompleted[e.id] >= (epochStages[e.id]?.length ?? 0) && (epochStages[e.id]?.length ?? 0) > 0
  ).length;

  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{ background: skin.pageBg }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/stages"
            className="text-gray-600 hover:text-gray-400 text-sm mb-4 inline-block transition-colors"
          >
            ← {t("nav.stages")}
          </Link>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-black text-white">{t("journey.title")}</h1>
              <p className="text-gray-600 text-sm mt-1">
                {t("journey.mapSubtitle")}
              </p>
            </div>
            {username && (
              <div className="text-xs text-gray-600 font-mono bg-white/3 border border-white/8 rounded-lg px-3 py-2 text-right">
                <div className="text-gray-400 font-semibold">{username}</div>
                <div className="mt-0.5">{totalCoins} 🪙 · {totalCompleted}/{totalStages} {t("journey.stagesCompleted")}</div>
              </div>
            )}
          </div>

          {/* Overall progress */}
          <div className="mt-5 space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-gray-600">
              <span>{t("journey.overallExploration")}</span>
              <span>{overallPct.toFixed(1)}% · {epochsDone}/{epochs.length} {t("journey.epochsCleared")}</span>
            </div>
            <div className="bg-white/5 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${overallPct}%`,
                  background: "linear-gradient(90deg, #06b6d4, #10b981, #a855f7)",
                  boxShadow: "0 0 8px rgba(6,182,212,0.4)",
                }}
              />
            </div>
            <div className="flex gap-4 text-[10px] text-gray-700 font-mono mt-1">
              <span>░ = {t("journey.fog")}</span>
              <span>▒ = {t("journey.inProgress")}</span>
              <span>█ = {t("journey.clearedLabel")}</span>
            </div>
          </div>
        </div>

        {/* ── Map grid ── */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-40 rounded-xl bg-white/3 border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {ZONES.map((zone) => {
              const zoneCompleted = zone.epochIds.reduce(
                (sum, id) => sum + (epochCompleted[id] ?? 0),
                0
              );
              const zoneTotal = zone.epochIds.reduce(
                (sum, id) => sum + (epochStages[id]?.length ?? 0),
                0
              );
              const zonePct = zoneTotal > 0 ? (zoneCompleted / zoneTotal) * 100 : 0;
              const zoneStarted = zoneCompleted > 0;

              return (
                <div
                  key={zone.id}
                  className="rounded-2xl border border-white/5 overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.015)" }}
                >
                  {/* Zone header */}
                  <div className="px-4 py-2.5 border-b border-white/5 flex items-center gap-3">
                    <span className="text-base">{zone.icon}</span>
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: zoneStarted ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)" }}
                    >
                      {t(zone.labelKey)}
                    </span>
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="text-[10px] font-mono text-gray-700">
                      {zoneCompleted}/{zoneTotal}
                      {zoneTotal > 0 && (
                        <> · {zonePct.toFixed(0)}%</>
                      )}
                    </span>
                  </div>

                  {/* Epoch tiles */}
                  <div
                    className="grid gap-3 p-3"
                    style={{
                      gridTemplateColumns: `repeat(${Math.min(zone.epochIds.length, 4)}, 1fr)`,
                    }}
                  >
                    {zone.epochIds.map((epochId) => (
                      <EpochTile
                        key={epochId}
                        epochId={epochId}
                        completedCount={epochCompleted[epochId] ?? 0}
                        totalCount={epochStages[epochId]?.length ?? 0}
                        isHovered={hoveredEpoch === epochId}
                        onHover={setHoveredEpoch}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Legend + CTA */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-6 text-xs text-gray-700 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-white/8" />
              {t("journey.notStarted")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-500" style={{ boxShadow: "0 0 4px #06b6d480" }} />
              {t("stages.completed")}
            </span>
          </div>
          <Link
            href="/stages"
            className="text-xs px-4 py-2 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/25 transition-colors font-semibold"
          >
            {t("leaderboard.viewStageMap")}
          </Link>
        </div>
      </div>
    </div>
  );
}
