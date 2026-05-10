"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSession, clearSession, isAdmin } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const [username, setUsername] = useState<string | null>(null);
  const [admin, setAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setUsername(getSession());
    setAdmin(isAdmin());
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  function handleLogout() {
    clearSession();
    setUsername(null);
    router.push("/");
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-gray-950/90 backdrop-blur-md border-b border-white/10"
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

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/stages" className="text-gray-400 hover:text-white transition-colors">Stages</Link>
          <Link href="/leaderboard" className="text-gray-400 hover:text-white transition-colors">Leaderboard</Link>
          {admin && (
            <Link href="/admin" className="text-red-400 hover:text-red-300 transition-colors font-semibold">
              Admin ⚙️
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
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
              <Link
                href="/login"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
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
      </div>
    </header>
  );
}
