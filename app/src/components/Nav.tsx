"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getSession, clearSession, setSession } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";
import { useSkin } from "@/contexts/SkinContext";
import { useLocale } from "@/contexts/LocaleContext";
import { LOCALES, LOCALE_FLAGS, LOCALE_LABELS, type Locale } from "@/lib/locale";
import { USER_GROUPS, GROUP_ICONS, GROUP_LABELS, type UserGroup } from "@/lib/groups";
import { useGroup } from "@/contexts/GroupContext";

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const { skin } = useSkin();
  const { t, locale, changeLocale } = useLocale();
  const { group, changeGroup } = useGroup();
  const [username, setUsername] = useState<string | null>(null);
  const [admin, setAdmin] = useState(false);
  const [trialDaysLeft, setTrialDaysLeft] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (groupRef.current && !groupRef.current.contains(e.target as Node)) {
        setGroupOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Render immediately from sessionStorage cache, then validate via cookie
    setUsername(getSession());
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { username: string; isAdmin: boolean; tier?: string; trialDaysLeft?: number | null } | null) => {
        if (data) {
          setUsername(data.username);
          setAdmin(data.isAdmin);
          setSession(data.username);
          setTrialDaysLeft(data.tier === "trial" ? (data.trialDaysLeft ?? null) : null);
        } else {
          setUsername(null);
          setAdmin(false);
          setTrialDaysLeft(null);
        }
      })
      .catch(() => {});
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  function handleUpgrade() {
    router.push("/upgrade");
  }

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
            { href: "/stages", label: t("nav.stages") },
            { href: "/journey", label: t("nav.journey") },
            { href: "/leaderboard", label: t("nav.leaderboard") },
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
              <Link href="/avatar" title={t("nav.avatar")} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/8 transition-colors text-base">
                👤
              </Link>
              <Link href="/trophies" title={t("nav.trophies")} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/8 transition-colors text-base">
                🏆
              </Link>
              <Link href="/shop" title={t("nav.shop")} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/8 transition-colors text-base">
                🛒
              </Link>
            </div>
          )}
          {admin && (
            <Link href="/admin" className="text-red-400 hover:text-red-300 transition-colors font-semibold">
              {t("nav.admin")} ⚙️
            </Link>
          )}
        </nav>

        {/* Desktop auth + language switcher */}
        <div className="hidden md:flex items-center gap-3 relative">
          {/* Language switcher */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((o) => !o)}
              title={t("nav.language")}
              className="text-xs px-2 py-1.5 rounded-lg transition-colors flex items-center gap-1"
              style={{ border: `1px solid ${skin.cardBorder}`, color: skin.textMuted }}
            >
              <span>{LOCALE_FLAGS[locale]}</span>
              <span className="font-mono uppercase">{locale}</span>
            </button>
            {langOpen && (
              <div
                className="absolute right-0 top-full mt-2 rounded-xl overflow-hidden shadow-2xl z-50 min-w-[140px]"
                style={{ background: skin.navBg, border: `1px solid ${skin.cardBorder}` }}
              >
                {LOCALES.map((l) => (
                  <button
                    key={l}
                    onClick={() => { changeLocale(l as Locale); setLangOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs transition-colors hover:opacity-80 flex items-center gap-2"
                    style={{
                      color: locale === l ? skin.accent : skin.textSecondary,
                      background: locale === l ? `${skin.accent}12` : "transparent",
                    }}
                  >
                    {LOCALE_FLAGS[l]} {LOCALE_LABELS[l]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Group switcher */}
          <div ref={groupRef} className="relative">
            <button
              onClick={() => setGroupOpen((o) => !o)}
              title={GROUP_LABELS[group]}
              className="text-xs px-2 py-1.5 rounded-lg transition-colors flex items-center gap-1"
              style={{ border: `1px solid ${skin.cardBorder}`, color: skin.textMuted }}
            >
              <span>{GROUP_ICONS[group]}</span>
            </button>
            {groupOpen && (
              <div
                className="absolute right-0 top-full mt-2 rounded-xl overflow-hidden shadow-2xl z-50 min-w-[160px]"
                style={{ background: skin.navBg, border: `1px solid ${skin.cardBorder}` }}
              >
                {USER_GROUPS.map((g) => (
                  <button
                    key={g}
                    onClick={() => { changeGroup(g as UserGroup); setGroupOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs transition-colors hover:opacity-80 flex items-center gap-2"
                    style={{
                      color: group === g ? skin.accent : skin.textSecondary,
                      background: group === g ? `${skin.accent}12` : "transparent",
                    }}
                  >
                    {GROUP_ICONS[g]} {GROUP_LABELS[g]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {username && trialDaysLeft !== null && (
            <button
              onClick={handleUpgrade}
              className="text-xs px-2.5 py-1 rounded-full font-bold transition-opacity hover:opacity-80"
              style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.35)" }}
            >
              ⚡ {trialDaysLeft}d left
            </button>
          )}
          {username ? (
            <>
              <span className="text-sm hidden sm:block" style={{ color: skin.textSecondary }}>
                <span style={{ color: skin.accent }}>{username}</span>
              </span>
              <button
                onClick={handleLogout}
                className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:text-red-400"
                style={{
                  border: `1px solid ${skin.cardBorder}`,
                  color: skin.textMuted,
                }}
              >
                {t("nav.logOut")}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm transition-colors"
                style={{ color: skin.textSecondary }}
              >
                {t("nav.signIn")}
              </Link>
              <Link
                href="/login"
                className="text-sm px-4 py-2 font-bold rounded-lg transition-opacity hover:opacity-80"
                style={{ background: skin.accent, color: skin.dark ? "#000" : "#fff" }}
              >
                {t("nav.getStarted")}
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
            { href: "/stages", label: `🗺️ ${t("nav.stages")}` },
            { href: "/journey", label: `🌍 ${t("nav.journey")}` },
            { href: "/leaderboard", label: `🏆 ${t("nav.leaderboard")}` },
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
              <Link href="/avatar" className="block px-3 py-2.5 rounded-lg text-sm" style={{ color: "#a78bfa" }}>
                👤 {t("nav.avatar")}
              </Link>
              <Link href="/trophies" className="block px-3 py-2.5 rounded-lg text-sm" style={{ color: "#22d3ee" }}>
                🏆 {t("nav.trophies")}
              </Link>
              <Link href="/shop" className="block px-3 py-2.5 rounded-lg text-sm" style={{ color: "#f59e0b" }}>
                🛒 {t("nav.shop")}
              </Link>
            </>
          )}
          {admin && (
            <Link href="/admin" className="block px-3 py-2.5 rounded-lg text-red-400 text-sm font-semibold">
              ⚙️ {t("nav.admin")}
            </Link>
          )}
          <div className="pt-3 mt-3" style={{ borderTop: `1px solid ${skin.cardBorder}` }}>
            {/* Mobile language switcher */}
            <div className="flex items-center gap-2 px-3 py-2 mb-2">
              <span className="text-xs" style={{ color: skin.textMuted }}>{t("nav.language")}:</span>
              {LOCALES.map((l) => (
                <button
                  key={l}
                  onClick={() => changeLocale(l as Locale)}
                  className="text-xs px-2 py-1 rounded-lg transition-colors"
                  style={{
                    background: locale === l ? `${skin.accent}20` : "transparent",
                    color: locale === l ? skin.accent : skin.textMuted,
                    border: `1px solid ${locale === l ? skin.accent : skin.cardBorder}`,
                  }}
                >
                  {LOCALE_FLAGS[l]}
                </button>
              ))}
            </div>

            {/* Mobile group switcher */}
            <div className="px-3 py-2 mb-2">
              <span className="text-xs block mb-1.5" style={{ color: skin.textMuted }}>Learning level:</span>
              <div className="flex flex-wrap gap-1.5">
                {USER_GROUPS.map((g) => (
                  <button
                    key={g}
                    onClick={() => changeGroup(g as UserGroup)}
                    className="text-xs px-2 py-1 rounded-lg transition-colors flex items-center gap-1"
                    style={{
                      background: group === g ? `${skin.accent}20` : "transparent",
                      color: group === g ? skin.accent : skin.textMuted,
                      border: `1px solid ${group === g ? skin.accent : skin.cardBorder}`,
                    }}
                  >
                    {GROUP_ICONS[g]} {GROUP_LABELS[g]}
                  </button>
                ))}
              </div>
            </div>

            {username ? (
              <div className="space-y-1">
                <p className="px-3 py-1 text-xs" style={{ color: skin.textMuted }}>
                  {t("common.signedInAs")} <span style={{ color: skin.accent }}>{username}</span>
                </p>
                {trialDaysLeft !== null && (
                  <button
                    onClick={handleUpgrade}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-opacity hover:opacity-80"
                    style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.25)" }}
                  >
                    ⚡ Trial: {trialDaysLeft} day{trialDaysLeft === 1 ? "" : "s"} left — Upgrade →
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm hover:text-red-400 transition-colors"
                  style={{ color: skin.textMuted }}
                >
                  {t("nav.logOut")}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link href="/login" className="block px-3 py-2.5 rounded-lg text-sm" style={{ color: skin.textSecondary }}>
                  {t("nav.signIn")}
                </Link>
                <Link
                  href="/login"
                  className="block px-3 py-2.5 rounded-lg font-bold text-sm text-center transition-opacity hover:opacity-80"
                  style={{ background: skin.accent, color: skin.dark ? "#000" : "#fff" }}
                >
                  {t("nav.getStarted")}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
