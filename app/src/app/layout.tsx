import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import FeedbackWidget from "@/components/FeedbackWidget";
import AgePrompt from "@/components/AgePrompt";
import Nav from "@/components/Nav";
import { SkinProvider } from "@/contexts/SkinContext";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: antiFoucScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <SkinProvider>
          <AgePrompt />
          <Nav />
          {children}
          <FeedbackWidget />
        </SkinProvider>
      </body>
    </html>
  );
}
