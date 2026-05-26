export type Locale = "en" | "es" | "fr" | "de" | "hi" | "pt";
export const LOCALES: Locale[] = ["en", "es", "fr", "de", "hi", "pt"];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  hi: "हिन्दी",
  pt: "Português",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
  fr: "🇫🇷",
  de: "🇩🇪",
  hi: "🇮🇳",
  pt: "🇧🇷",
};

const VALID_LOCALES = new Set<string>(["en", "es", "fr", "de", "hi", "pt"]);

export function getClientLocale(): Locale {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/(?:^|;\s*)locale=([^;]+)/);
  const val = match?.[1];
  if (val && VALID_LOCALES.has(val)) return val as Locale;
  return "en";
}

export function setClientLocale(locale: Locale) {
  document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}
