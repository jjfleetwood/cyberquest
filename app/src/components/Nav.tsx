"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSession, clearSession, setSession } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-gray-950/95 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
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
          <Link href="/stages" className="text-gray-400 hover:text-white transition-colors">Stages</Link>
          <Link href="/journey" className="text-gray-400 hover:text-white transition-colors">Journey</Link>
          <Link href="/leaderboard" className="text-gray-400 hover:text-white transition-colors">Leaderboard</Link>
          {username && (
            <Link href="/shop" className="text-amber-400 hover:text-amber-300 transition-colors">🛒 Shop</Link>
          )}
          {admin && (
            <Link href="/admin" className="text-red-400 hover:text-red-300 transition-colors font-semibold">
              Admin ⚙️
            </Link>
          )}
        </nav>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-3">
          {username ? (
            <>
              <span className="text-sm text-gray-400 hidden sm:block">
                👤 <span className="text-cyan-400">{username}</span>
              </span>
              <button
                onClick={handleLogout}
                className="text-xs px-3 py-1.5 border border-white/10 hover:border-red-500/50 text-gray-500 hover:text-red-400 rounded-lg transition-colors"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
                Sign in
              </Link>
              <Link
                href="/login"
                className="text-sm px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors"
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
        <div className="md:hidden border-t border-white/10 px-4 py-4 space-y-1" style={{ background: "rgba(6,10,16,0.98)" }}>
          <Link href="/stages" className="block px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm">
            🗺️ Stages
          </Link>
          <Link href="/journey" className="block px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm">
            🗺️ Journey Map
          </Link>
          <Link href="/leaderboard" className="block px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm">
            🏆 Leaderboard
          </Link>
          {username && (
            <Link href="/shop" className="block px-3 py-2.5 rounded-lg text-amber-400 hover:text-amber-300 hover:bg-white/5 transition-colors text-sm">
              🛒 Shop & Trophy Room
            </Link>
          )}
          {admin && (
            <Link href="/admin" className="block px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors text-sm font-semibold">
              ⚙️ Admin
            </Link>
          )}
          <div className="border-t border-white/5 pt-3 mt-3">
            {username ? (
              <div className="space-y-1">
                <p className="px-3 py-1 text-xs text-gray-600">Signed in as <span className="text-cyan-400">{username}</span></p>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-white/5 transition-colors text-sm"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link href="/login" className="block px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm">
                  Sign in
                </Link>
                <Link
                  href="/login"
                  className="block px-3 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm text-center transition-colors"
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
