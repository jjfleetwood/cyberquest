import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers, cookies } from "next/headers";
import Script from "next/script";
import FeedbackWidget from "@/components/FeedbackWidget";
import AgePrompt from "@/components/AgePrompt";
import Nav from "@/components/Nav";
import { SkinProvider } from "@/contexts/SkinContext";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { GroupProvider } from "@/contexts/GroupContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kryptós CronOS (κρυπτός χρόνος) — Defend Through Time",
  description: "A gamified cybersecurity training platform. Break ciphers, exploit real vulnerabilities, and defend through the ages.",
  openGraph: {
    title: "Kryptós CronOS — Defend Through Time",
    description: "358 CTF stages. 32 epochs. Real CVEs. Gamified cybersecurity and AI training.",
    url: "https://kryptoscronos.com",
    siteName: "Kryptós CronOS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kryptós CronOS — Defend Through Time",
    description: "358 CTF stages. 32 epochs. Real CVEs. Gamified cybersecurity and AI training.",
  },
};

// Runs synchronously before React hydrates — prevents flash of wrong skin,
// and cleans up legacy unscoped ctf-state keys (pre-username-scoping fix).
const antiFoucScript = `
(function(){
  try {
    var s = localStorage.getItem('kryptos-skin');
    if (s === 'youth' || s === 'standard' || s === 'mature') {
      document.documentElement.setAttribute('data-skin', s);
      document.documentElement.style.setProperty('--font-scale', s === 'youth' ? '1.08' : '1');
      document.documentElement.style.background = 'linear-gradient(135deg,#0d1117 0%,#0f2027 50%,#1a1a2e 100%)';
    }
  } catch(e) {}
  try {
    var keys = Object.keys(localStorage);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (k.indexOf('ctf-state:') === 0 && k.split(':').length === 2) {
        localStorage.removeItem(k);
      }
    }
  } catch(e) {}
})();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [headerStore, cookieStore] = await Promise.all([headers(), cookies()]);
  const nonce = headerStore.get("x-nonce") ?? "";
  const locale = cookieStore.get("locale")?.value ?? "en";
  const userGroup = cookieStore.get("userGroup")?.value ?? "high-school";
  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: antiFoucScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Script
          defer
          data-domain="kryptoscronos.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        <LocaleProvider initialLocale={locale}>
          <GroupProvider initialGroup={userGroup}>
          <SkinProvider>
            <AgePrompt />
            <Nav />
            {children}
            <FeedbackWidget />
          </SkinProvider>
          </GroupProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
