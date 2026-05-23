"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSession, clearSession, setSession } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";
import { useSkin } from "@/contexts/SkinContext";

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const { skin } = useSkin();
  const [username, setUsername] = useState<string | null>(null);
  const [admin, setAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Render immediately from sessionStorage cache, then validate via cookie
    setUsername(getSession());
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { username: string; isAdmin: boolean } | null) => {
        if (data) {
          setUsername(data.username);
          setAdmin(data.isAdmin);
          setSession(data.username);
        } else {
          setUsername(null);
          setAdmin(false);
        }
      })
      .catch(() => {});
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  function handleLogout() {
    clearSession();
    setUsername(null);
    setMobileOpen(false);
    router.push("/");
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled || mobileOpen ? skin.navBg : "transparent",
        borderBottom: scrolled || mobileOpen
          ? `1px solid ${skin.cardBorder}`
          : "1px solid transparent",
        backdropFilter: scrolled || mobileOpen ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🛡️</span>
          <span className="text-white font-bold text-lg tracking-tight">
            Kryptós <span className="text-cyan-400">CronOS</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {[
            { href: "/stages", label: "Stages" },
            { href: "/journey", label: "Journey" },
            { href: "/leaderboard", label: "Leaderboard" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{ color: skin.textSecondary }}
              className="hover:opacity-100 transition-opacity"
            >
              {label}
            </Link>
          ))}
          {username && (
            <div className="flex items-center gap-1">
              <Link href="/avatar" title="Your Avatar" className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/8 transition-colors text-base">
                👤
              </Link>
              <Link href="/trophies" title="Trophies" className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/8 transition-colors text-base">
                🏆
              </Link>
              <Link href="/shop" title="Shop" className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/8 transition-colors text-base">
                🛒
              </Link>
            </div>
          )}
          {admin && (
            <Link href="/admin" className="text-red-400 hover:text-red-300 transition-colors font-semibold">
              Admin ⚙️
            </Link>
          )}
        </nav>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-3 relative">
          {username ? (
            <>
              <span className="text-sm hidden sm:block" style={{ color: skin.textSecondary }}>
                👤 <span style={{ color: skin.accent }}>{username}</span>
              </span>
              {/* Skin switcher pill — hidden; re-enable by uncommenting
              <div className="relative">
                <button
                  onClick={() => setSkinMenuOpen((o) => !o)}
                  className="text-xs px-2.5 py-1.5 rounded-lg transition-colors font-mono"
                  style={{ border: `1px solid ${skin.cardBorder}`, color: skin.textMuted }}
                  title="Change display style"
                >
                  🎨
                </button>
                {skinMenuOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 rounded-xl overflow-hidden shadow-2xl z-50 min-w-[160px]"
                    style={{ background: skin.navBg, border: `1px solid ${skin.cardBorder}` }}
                  >
                    {(["youth", "standard", "mature"] as SkinId[]).map((id) => (
                      <button
                        key={id}
                        onClick={() => { setSkin(id); setSkinMenuOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-xs transition-colors hover:opacity-80 flex items-center gap-2"
                        style={{
                          color: skinId === id ? skin.accent : skin.textSecondary,
                          background: skinId === id ? `${skin.accent}12` : "transparent",
                        }}
                      >
                        {skinId === id ? "✓ " : "  "}
                        {id === "youth" ? "🚀 Explorer (0–12)" : id === "standard" ? "💻 Terminal (15–50)" : "🏛️ Executive (50+)"}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              */}
              <button
                onClick={handleLogout}
                className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:text-red-400"
                style={{
                  border: `1px solid ${skin.cardBorder}`,
                  color: skin.textMuted,
                }}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm transition-colors"
                style={{ color: skin.textSecondary }}
              >
                Sign in
              </Link>
              <Link
                href="/login"
                className="text-sm px-4 py-2 font-bold rounded-lg transition-opacity hover:opacity-80"
                style={{ background: skin.accent, color: skin.dark ? "#000" : "#fff" }}
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile: hamburger */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-gray-400 transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-gray-400 transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-gray-400 transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 py-4 space-y-1"
          style={{
            borderTop: `1px solid ${skin.cardBorder}`,
            background: skin.navBg,
          }}
        >
          {[
            { href: "/stages", label: "🗺️ Stages" },
            { href: "/journey", label: "🌍 Journey Map" },
            { href: "/leaderboard", label: "🏆 Leaderboard" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block px-3 py-2.5 rounded-lg text-sm transition-colors"
              style={{ color: skin.textSecondary }}
            >
              {label}
            </Link>
          ))}
          {username && (
            <>
              <Link
                href="/avatar"
                className="block px-3 py-2.5 rounded-lg text-sm"
                style={{ color: "#a78bfa" }}
              >
                Your Avatar
              </Link>
              <Link
                href="/trophies"
                className="block px-3 py-2.5 rounded-lg text-sm"
                style={{ color: "#22d3ee" }}
              >
                🏆 Trophies
              </Link>
              <Link
                href="/shop"
                className="block px-3 py-2.5 rounded-lg text-sm"
                style={{ color: "#f59e0b" }}
              >
                🛒 Shop
              </Link>
            </>
          )}
          {admin && (
            <Link href="/admin" className="block px-3 py-2.5 rounded-lg text-red-400 text-sm font-semibold">
              ⚙️ Admin
            </Link>
          )}
          <div className="pt-3 mt-3" style={{ borderTop: `1px solid ${skin.cardBorder}` }}>
            {username ? (
              <div className="space-y-1">
                <p className="px-3 py-1 text-xs" style={{ color: skin.textMuted }}>
                  Signed in as <span style={{ color: skin.accent }}>{username}</span>
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm hover:text-red-400 transition-colors"
                  style={{ color: skin.textMuted }}
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/login"
                  className="block px-3 py-2.5 rounded-lg text-sm"
                  style={{ color: skin.textSecondary }}
                >
                  Sign in
                </Link>
                <Link
                  href="/login"
                  className="block px-3 py-2.5 rounded-lg font-bold text-sm text-center transition-opacity hover:opacity-80"
                  style={{ background: skin.accent, color: skin.dark ? "#000" : "#fff" }}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
