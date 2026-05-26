import Link from "next/link";
import Nav from "@/components/Nav";

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main
        className="min-h-screen px-4 py-24"
        style={{ background: "linear-gradient(160deg, #060a10 0%, #0d1117 50%, #0a0e1a 100%)" }}
      >
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-gray-600 hover:text-gray-400 text-sm mb-8 inline-block transition-colors">
            ← Back to Home
          </Link>

          <h1 className="text-3xl font-black text-white mb-2">Privacy Policy</h1>
          <p className="text-gray-600 text-sm mb-10 font-mono">Effective: 2026-05-16 · Kryptós CronOS (κρυπτός χρόνος)</p>

          <div className="space-y-8 text-gray-400 text-sm leading-relaxed">

            <section>
              <h2 className="text-white font-bold text-lg mb-3">1. What we collect</h2>
              <p className="mb-3">When you create an account, we collect:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><span className="text-gray-300">Username</span> — chosen by you at registration</li>
                <li><span className="text-gray-300">Email address</span> — used to notify the admin of new registrations; not shared with third parties</li>
                <li><span className="text-gray-300">Training progress</span> — completed stage IDs, XP, earned badges, and streak data</li>
                <li><span className="text-gray-300">Last active timestamp</span> — used for the leaderboard</li>
              </ul>
              <p className="mt-3">We do <span className="text-white font-semibold">not</span> collect passwords. Authentication is handled server-side; password hashes and salts never leave our servers and are not stored in your browser.</p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">2. How we use your data</h2>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Display your progress on the stage map and leaderboard</li>
                <li>Persist progress across devices when you log in</li>
                <li>Send a one-time admin notification email when you register (via Resend)</li>
                <li>Maintain daily and weekly leaderboard rankings</li>
              </ul>
              <p className="mt-3">We do not sell your data, use it for advertising, or share it with third parties beyond the infrastructure providers listed below.</p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">3. Infrastructure & third parties</h2>
              <div className="space-y-3">
                {[
                  { name: "Vercel", purpose: "Hosting, CDN, and HTTP access logs (IP + user agent)", url: "https://vercel.com/legal/privacy-policy" },
                  { name: "Upstash Redis", purpose: "Server-side storage for progress, streaks, and leaderboard data", url: "https://upstash.com/trust/privacy.pdf" },
                  { name: "Resend", purpose: "Transactional email — one registration notification to the admin", url: "https://resend.com/privacy" },
                  { name: "Anthropic Claude", purpose: "AI hint assistant (ARIA) — stage context is sent; no personal data is included in hint requests", url: "https://www.anthropic.com/privacy" },
                ].map((p) => (
                  <div key={p.name} className="bg-white/2 border border-white/8 rounded-xl p-4">
                    <p className="text-white font-semibold text-sm mb-1">{p.name}</p>
                    <p className="text-gray-500 text-xs mb-2">{p.purpose}</p>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-500 hover:text-cyan-400 transition-colors">
                      Privacy policy →
                    </a>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">4. Cookies & local storage</h2>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><span className="text-gray-300">session_token</span> — HttpOnly cookie; authenticates your session; 30-day expiry</li>
                <li><span className="text-gray-300">admin_token</span> — HttpOnly cookie; admin-only; issued only on admin login</li>
                <li><span className="text-gray-300">kryptos_progress_*</span> — localStorage; caches your progress for offline and instant display</li>
              </ul>
              <p className="mt-3">We do not use tracking cookies, analytics cookies, or third-party advertising cookies.</p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">5. Your rights — data deletion</h2>
              <p className="mb-3">
                You may delete your account and all associated data at any time. Deletion removes your username, email,
                progress, streaks, and leaderboard entries from our servers immediately and permanently.
              </p>
              <p className="mb-4">
                To delete your account, log in and use the <span className="text-white font-mono">Delete Account</span> option
                on the stage map page, or submit a request to{" "}
                <a href="mailto:hello@kryptoscronos.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  hello@kryptoscronos.com
                </a>.
              </p>
              <p className="text-gray-600 text-xs">
                Note: Vercel access logs and Resend delivery records may retain IP and metadata per their own data retention policies.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">6. Changes</h2>
              <p>
                We may update this policy as the platform evolves. Material changes will be noted with a new effective date.
                Continued use after changes constitutes acceptance.
              </p>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}
