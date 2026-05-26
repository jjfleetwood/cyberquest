import Link from "next/link";
import Nav from "@/components/Nav";

export default function TermsPage() {
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

          <h1 className="text-3xl font-black text-white mb-2">Terms of Service</h1>
          <p className="text-gray-600 text-sm mb-10 font-mono">Effective: 2026-05-22 · Kryptós CronOS (κρυπτός χρόνος)</p>

          <div className="space-y-8 text-gray-400 text-sm leading-relaxed">

            <section>
              <h2 className="text-white font-bold text-lg mb-3">1. Acceptance of Terms</h2>
              <p>
                By creating an account, accessing, or using the Kryptós CronOS platform at kryptoscronos.com
                (the &ldquo;Service&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;).
                If you do not agree, do not use the Service. These Terms constitute a legally binding agreement
                between you and Jacob John Bolotin, doing business as Kryptós CronOS (&ldquo;Company,&rdquo;
                &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">2. Description of Service</h2>
              <p className="mb-3">
                Kryptós CronOS is a gamified cybersecurity and AI training platform. The Service provides
                access to educational content including Capture-the-Flag (CTF) challenges, quizzes, an AI
                tutoring assistant (ARIA), leaderboards, and a progression system organized into curriculum
                tracks and epochs.
              </p>
              <p>
                The simulated terminal environments and exploit scenarios are for educational purposes only.
                All vulnerable environments are sandboxed within your browser and do not represent real
                production systems.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">3. Accounts</h2>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>You must provide accurate information when creating an account.</li>
                <li>You are responsible for maintaining the security of your account credentials.</li>
                <li>You must be at least 13 years of age to use the Service. If you are under 18, you represent that a parent or legal guardian has reviewed and agreed to these Terms.</li>
                <li>You may not share, sell, or transfer your account to another person.</li>
                <li>We reserve the right to suspend or terminate accounts that violate these Terms.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">4. Subscriptions and Payment</h2>
              <p className="mb-3">
                The Service offers a free tier and a paid Pro subscription. By subscribing to Pro, you agree to
                pay the fees in effect at the time of purchase.
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><span className="text-gray-300">Billing:</span> Subscriptions are billed in advance on a monthly or annual cycle. Payment is processed via Stripe. We do not store your payment card information.</li>
                <li><span className="text-gray-300">Cancellation:</span> You may cancel at any time from your account settings. Cancellation takes effect at the end of the current billing period. No partial refunds are issued for unused time.</li>
                <li><span className="text-gray-300">Refunds:</span> We offer a 7-day refund for new Pro subscribers who have not completed more than 5 stages. Submit refund requests to <a href="mailto:hello@kryptoscronos.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">hello@kryptoscronos.com</a>.</li>
                <li><span className="text-gray-300">Price changes:</span> We may change subscription prices with 30 days&rsquo; notice. Continued use after the effective date constitutes acceptance.</li>
                <li><span className="text-gray-300">Taxes:</span> You are responsible for any applicable taxes. Prices are exclusive of taxes unless stated otherwise.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">5. Acceptable Use</h2>
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Use the Service for any unlawful purpose or in violation of any applicable law.</li>
                <li>Attempt to access, probe, or attack any real-world system using techniques learned on the platform.</li>
                <li>Reverse-engineer, decompile, or extract the platform&rsquo;s source code, CTF flag values, or curriculum content.</li>
                <li>Share, publish, or distribute CTF flags, solutions, or challenge content without our written permission.</li>
                <li>Attempt to manipulate the leaderboard, XP system, or badge awards through unauthorized means.</li>
                <li>Use automated scripts or bots to interact with the Service.</li>
                <li>Impersonate other users or Company personnel.</li>
                <li>Interfere with or disrupt the Service or its infrastructure.</li>
              </ul>
              <p className="mt-3">
                The cybersecurity techniques demonstrated on this platform are for defensive education only.
                Applying these techniques against systems you do not own or have explicit written authorization
                to test is illegal and strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">6. Intellectual Property</h2>
              <p className="mb-3">
                All content on the Service — including but not limited to stage scenarios, CTF challenges,
                curriculum text, attack diagrams, code, and the ARIA AI tutor system — is owned by or
                licensed to the Company and is protected by U.S. and international copyright law
                (U.S. Copyright Registration filed 2026-05-20).
              </p>
              <p className="mb-3">
                Your subscription grants you a personal, non-exclusive, non-transferable license to access
                and use the Service for personal educational purposes only. You may not reproduce, distribute,
                modify, or create derivative works from any platform content without prior written permission.
              </p>
              <p>
                Third-party frameworks referenced in curriculum content (MITRE ATT&amp;CK, OWASP, NIST, Cisco,
                and others) are the property of their respective owners. See the{" "}
                <Link href="/attribution" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Attributions page
                </Link>{" "}
                for full notices.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">7. AI Assistant (ARIA)</h2>
              <p className="mb-3">
                ARIA is powered by Anthropic&rsquo;s Claude API. When you interact with ARIA, the stage context
                and your message are sent to Anthropic for processing. No personally identifiable information
                beyond your message content is included in these requests.
              </p>
              <p>
                ARIA is an educational tool. Its responses are not professional security advice. Do not rely
                on ARIA for decisions about real-world security systems.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">8. Disclaimers</h2>
              <p className="mb-3">
                THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND,
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p>
                We do not warrant that the Service will be uninterrupted, error-free, or free of harmful
                components. Cybersecurity training content reflects documented historical incidents; we make no
                guarantees about its completeness or applicability to current threat landscapes.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">9. Limitation of Liability</h2>
              <p className="mb-3">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE COMPANY SHALL NOT BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA,
                OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.
              </p>
              <p>
                IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID
                FOR THE SERVICE IN THE 12 MONTHS PRECEDING THE CLAIM, OR (B) $100 USD.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">10. Termination</h2>
              <p className="mb-3">
                We may suspend or terminate your account immediately, without notice, if you violate these Terms
                or engage in conduct we determine to be harmful to other users or the Service.
              </p>
              <p>
                Upon termination, your right to access the Service ceases immediately. You may request deletion
                of your account data at any time per our{" "}
                <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Privacy Policy
                </Link>.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">11. Governing Law & Disputes</h2>
              <p className="mb-3">
                These Terms are governed by the laws of the State of Delaware, without regard to its conflict
                of law provisions. Any dispute arising under these Terms shall be resolved exclusively in the
                state or federal courts located in Delaware.
              </p>
              <p>
                Before initiating formal proceedings, you agree to first contact us at{" "}
                <a href="mailto:hello@kryptoscronos.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  hello@kryptoscronos.com
                </a>{" "}
                and attempt to resolve the dispute informally for at least 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">12. Changes to Terms</h2>
              <p>
                We may update these Terms at any time. We will post the revised Terms with a new effective date.
                Material changes will be communicated via email to registered users. Continued use of the
                Service after changes take effect constitutes your acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-lg mb-3">13. Contact</h2>
              <p>
                Questions about these Terms:{" "}
                <a href="mailto:hello@kryptoscronos.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  hello@kryptoscronos.com
                </a>
              </p>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}
