export type Locale = "en" | "es" | "fr" | "de";
export const LOCALES: Locale[] = ["en", "es", "fr", "de"];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
  fr: "🇫🇷",
  de: "🇩🇪",
};

export function getClientLocale(): Locale {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/(?:^|;\s*)locale=([^;]+)/);
  const val = match?.[1];
  if (val === "es" || val === "fr" || val === "de") return val;
  return "en";
}

export function setClientLocale(locale: Locale) {
  document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}
