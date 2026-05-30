// Kryptós CronOS brand mark — a guilloché watch dial reading 4:21, with a cyan
// bezel (matches the "CronOS" wordmark) and a dark-purple outer ring.
// Pure presentational SVG (no hooks) so it works in server or client components.

function pts(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: cx + r * Math.sin(a), y: cy - r * Math.cos(a) };
}

export default function Logo({ size = 28, className }: { size?: number; className?: string }) {
  const min = Array.from({ length: 60 }).map((_, i) => {
    const major = i % 5 === 0;
    return { o: pts(32, 32, 29, i * 6), inner: pts(32, 32, major ? 22.5 : 26.5, i * 6), major };
  });
  const spokes = Array.from({ length: 24 }).map((_, i) => pts(32, 32, 17, i * 15));
  const pips = Array.from({ length: 12 }).map((_, i) => ({ p: pts(32, 32, 20, i * 30), major: i % 3 === 0 }));
  const subTicks = Array.from({ length: 12 }).map((_, i) => ({ o: pts(32, 44, 5.5, i * 30), inner: pts(32, 44, 4, i * 30) }));
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <defs><linearGradient id="klg" gradientUnits="userSpaceOnUse" x1="8" y1="8" x2="56" y2="56"><stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#818cf8" /></linearGradient></defs>
      <circle cx="32" cy="32" r="31" fill="none" stroke="#6d28d9" strokeWidth="1.6" />
      <circle cx="32" cy="32" r="29.3" fill="none" stroke="#22d3ee" strokeWidth="1.8" />
      <circle cx="32" cy="32" r="27" fill="none" stroke="url(#klg)" strokeWidth="0.5" opacity="0.3" />
      {min.map((t, i) => (
        <line key={"m" + i} x1={t.o.x} y1={t.o.y} x2={t.inner.x} y2={t.inner.y} stroke="url(#klg)" strokeWidth={t.major ? 2 : 0.7} strokeLinecap="round" opacity={t.major ? 0.95 : 0.45} />
      ))}
      {spokes.map((p, i) => (
        <line key={"sp" + i} x1="32" y1="32" x2={p.x} y2={p.y} stroke="url(#klg)" strokeWidth="0.3" opacity="0.22" />
      ))}
      <circle cx="32" cy="32" r="20.5" fill="none" stroke="url(#klg)" strokeWidth="0.5" opacity="0.4" />
      <circle cx="32" cy="32" r="11" fill="none" stroke="url(#klg)" strokeWidth="0.5" opacity="0.4" />
      {pips.map((h, i) => (
        <circle key={"p" + i} cx={h.p.x} cy={h.p.y} r={h.major ? 1.5 : 0.9} fill="url(#klg)" opacity="0.85" />
      ))}
      {/* 6 o'clock subdial */}
      <circle cx="32" cy="44" r="6" fill="none" stroke="url(#klg)" strokeWidth="0.6" opacity="0.6" />
      {subTicks.map((t, i) => (
        <line key={"st" + i} x1={t.o.x} y1={t.o.y} x2={t.inner.x} y2={t.inner.y} stroke="url(#klg)" strokeWidth="0.4" opacity="0.5" />
      ))}
      <line x1="32" y1="44" x2="34.5" y2="41" stroke="url(#klg)" strokeWidth="0.7" strokeLinecap="round" opacity="0.8" />
      <circle cx="32" cy="44" r="0.9" fill="url(#klg)" />
      {/* hands set to 4:21 */}
      <line x1="32" y1="32" x2="40.4" y2="39.1" stroke="url(#klg)" strokeWidth="2.6" strokeLinecap="round" />
      <line x1="32" y1="32" x2="46.6" y2="42.6" stroke="url(#klg)" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="32" y1="32" x2="28" y2="29.1" stroke="url(#klg)" strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
      <circle cx="32" cy="32" r="2.6" fill="url(#klg)" />
    </svg>
  );
}
