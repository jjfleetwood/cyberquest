"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { setClientLocale, type Locale } from "@/lib/locale";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import fr from "@/messages/fr.json";
import de from "@/messages/de.json";
import hi from "@/messages/hi.json";
import pt from "@/messages/pt.json";

const messages: Record<Locale, Record<string, string>> = { en, es, fr, de, hi, pt };

type LocaleContextType = {
  locale: Locale;
  changeLocale: (l: Locale) => void;
  t: (key: string, fallback?: string) => string;
};

const LocaleContext = createContext<LocaleContextType>({
  locale: "en",
  changeLocale: () => {},
  t: (key) => key,
});

export function LocaleProvider({
  children,
  initialLocale = "en",
}: {
  children: ReactNode;
  initialLocale?: string;
}) {
  const validLocale = (["en", "es", "fr", "de", "hi", "pt"].includes(initialLocale) ? initialLocale : "en") as Locale;
  const [locale, setLocaleState] = useState<Locale>(validLocale);

  function changeLocale(l: Locale) {
    setClientLocale(l);
    setLocaleState(l);
  }

  function t(key: string, fallback?: string): string {
    return messages[locale]?.[key] ?? messages.en?.[key] ?? fallback ?? key;
  }

  return (
    <LocaleContext.Provider value={{ locale, changeLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
