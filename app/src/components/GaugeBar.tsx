"use client";

type GaugeBarProps = {
  value: number;     // 1–10
  label: string;
  compact?: boolean; // smaller version for stage cards
};

// Muted interpolation: slate-blue → indigo → teal — avoids traffic-light loudness
function valueToColor(v: number): string {
  const pct = (v - 1) / 9; // 0..1
  if (pct < 0.5) {
    // slate → indigo
    const t = pct / 0.5;
    const r = Math.round(100 + (99 - 100) * t);
    const g = Math.round(116 + (102 - 116) * t);
    const b = Math.round(139 + (241 - 139) * t);
    return `rgb(${r},${g},${b})`;
  } else {
    // indigo → teal
    const t = (pct - 0.5) / 0.5;
    const r = Math.round(99 + (45 - 99) * t);
    const g = Math.round(102 + (212 - 102) * t);
    const b = Math.round(241 + (191 - 241) * t);
    return `rgb(${r},${g},${b})`;
  }
}

export default function GaugeBar({ value, label, compact = false }: GaugeBarProps) {
  const clampedValue = Math.max(1, Math.min(10, value));
  const pct = ((clampedValue - 1) / 9) * 100;
  const color = valueToColor(clampedValue);
  const needleLeft = `${pct}%`;

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-gray-600 text-[10px] whitespace-nowrap">{label}</span>
        <div className="relative flex-1 h-1 rounded-full overflow-hidden"
          style={{ background: "linear-gradient(to right, rgba(100,116,139,0.35), rgba(99,102,241,0.45), rgba(45,212,191,0.4))" }}>
          <div
            className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border border-white/20 -translate-x-1/2"
            style={{ left: needleLeft, background: color }}
          />
        </div>
        <span className="text-[10px] font-bold font-mono w-4 text-right" style={{ color, opacity: 0.8 }}>{clampedValue}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-xs text-gray-500 font-medium">{label}</span>
        <span className="text-sm font-black font-mono" style={{ color, opacity: 0.85 }}>
          {clampedValue}<span className="text-gray-700 text-xs">/10</span>
        </span>
      </div>

      {/* Track */}
      <div className="relative h-2.5 rounded-full"
        style={{ background: "linear-gradient(to right, rgba(100,116,139,0.3) 0%, rgba(99,102,241,0.4) 50%, rgba(45,212,191,0.35) 100%)" }}>
        {/* Needle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-700"
          style={{ left: needleLeft }}
        >
          <div className="w-3.5 h-3.5 rounded-full border border-white/25 shadow shadow-black/40"
            style={{ background: color, opacity: 0.85 }} />
        </div>
      </div>

      {/* Scale labels */}
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-gray-700">Low</span>
        <span className="text-[10px] text-gray-700">High</span>
      </div>
    </div>
  );
}
