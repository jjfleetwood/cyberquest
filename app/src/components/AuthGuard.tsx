"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSession } from "@/lib/auth";

/**
 * AuthGuard — soft auth banner.
 *
 * Renders a non-blocking banner at the top of a page if the user is not
 * logged in. Once dismissed (or if the user is logged in), nothing is shown.
 * This is NOT a hard access gate; guests can still use the app anonymously.
 */
export default function AuthGuard() {
  const [dismissed, setDismissed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // default true to avoid flash

  useEffect(() => {
    setIsLoggedIn(getSession() !== null);
  }, []);

  if (isLoggedIn || dismissed) return null;

  return (
    <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl px-5 py-4 flex flex-wrap items-center justify-between gap-3 mb-6">
      <p className="text-sm text-gray-300">
        👤 Sign in to track your progress and appear on the leaderboard.
      </p>
      <div className="flex items-center gap-3 flex-shrink-0">
        <Link
          href="/login"
          className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-semibold rounded-lg transition-colors"
        >
          Sign In →
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}
