"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NDA_TEXT = `MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement ("Agreement") is entered into as of the date of electronic acceptance between Kryptós CronOS (the "Company") and the individual accepting below ("Recipient").

1. CONFIDENTIAL INFORMATION
"Confidential Information" means any non-public information disclosed by the Company, including but not limited to: platform source code, curriculum content, CTF challenge design, business model, financial projections, user data, and any other information designated as confidential. This includes all information accessible through this demo.

2. NON-DISCLOSURE OBLIGATIONS
Recipient agrees to: (a) hold all Confidential Information in strict confidence; (b) not disclose Confidential Information to any third party without prior written consent; (c) use Confidential Information solely to evaluate the platform for the purpose for which access was granted; (d) protect Confidential Information with at least the same degree of care used to protect Recipient's own confidential information, but no less than reasonable care.

3. EXCLUSIONS
These obligations do not apply to information that: (a) is or becomes publicly known through no breach of this Agreement; (b) was rightfully known to Recipient prior to disclosure; (c) is independently developed by Recipient without use of Confidential Information; (d) is required to be disclosed by law or court order, provided Recipient gives prompt written notice to Company.

4. NO LICENSE
Nothing in this Agreement grants Recipient any license, right, title, or interest in the Company's intellectual property. All Confidential Information remains the property of the Company.

5. TERM
This Agreement remains in effect for two (2) years from the date of acceptance, and obligations with respect to trade secrets continue indefinitely.

6. RETURN OF INFORMATION
Upon request, Recipient will promptly return or destroy all Confidential Information and certify such destruction in writing.

7. REMEDIES
Recipient acknowledges that breach of this Agreement may cause irreparable harm for which monetary damages would be inadequate, and that the Company is entitled to seek equitable relief, including injunction, in addition to all other remedies.

8. GOVERNING LAW
This Agreement is governed by the laws of the State of Delaware, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Delaware.

9. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the parties with respect to its subject matter and supersedes all prior agreements.

By checking the box below, you acknowledge that you have read, understood, and agree to be bound by the terms of this Agreement.`;

export default function DemoPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) { setError("You must agree to the NDA to continue."); return; }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/nda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Something went wrong."); return; }
      router.push("/stages");
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start px-4 py-12"
      style={{ background: "linear-gradient(160deg, #060a10 0%, #0d1117 55%, #0a0e1a 100%)" }}
    >
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-mono mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            DEMO ACCESS
          </div>
          <h1 className="text-3xl font-black text-white mb-3">Kryptós CronOS</h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            You&apos;ve been invited to preview the platform. Please review and accept the Non-Disclosure Agreement below to proceed.
          </p>
        </div>

        {/* Platform preview teaser */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: "Stages", value: "358", color: "text-cyan-400" },
            { label: "Curriculum Tracks", value: "10", color: "text-purple-400" },
            { label: "Real CVEs", value: "50+", color: "text-green-400" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white/3 border border-white/8 rounded-xl p-4 text-center">
              <div className={`text-2xl font-black ${color}`}>{value}</div>
              <div className="text-xs text-gray-600 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* NDA card */}
        <div className="bg-white/2 border border-white/10 rounded-2xl overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-white/8 flex items-center gap-2">
            <span className="text-yellow-400">⚖️</span>
            <span className="text-white font-semibold text-sm">Non-Disclosure Agreement</span>
            <span className="ml-auto text-xs text-gray-700 font-mono">Based on Bonterms Mutual NDA</span>
          </div>
          <div className="px-6 py-4 max-h-64 overflow-y-auto">
            <pre className="text-gray-500 text-xs leading-relaxed whitespace-pre-wrap font-mono">
              {NDA_TEXT}
            </pre>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@company.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5 flex-shrink-0">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  agreed
                    ? "bg-cyan-500 border-cyan-500"
                    : "border-white/20 bg-white/5 group-hover:border-white/40"
                }`}
              >
                {agreed && <span className="text-black text-xs font-bold leading-none">✓</span>}
              </div>
            </div>
            <span className="text-sm text-gray-400 leading-relaxed">
              I have read and agree to the Non-Disclosure Agreement above. I understand this is confidential information and agree to keep it confidential.
            </span>
          </label>

          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !name.trim() || !email.trim() || !agreed}
            className="w-full py-3.5 rounded-xl font-bold text-sm text-black transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(90deg, #22d3ee, #818cf8)" }}
          >
            {submitting ? "Recording agreement…" : "Accept NDA & Enter Platform →"}
          </button>

          <p className="text-center text-xs text-gray-700">
            Your acceptance is recorded with timestamp and IP address. By entering the platform you confirm your agreement.{" "}
            <Link href="/privacy" className="text-gray-600 hover:text-gray-500 underline transition-colors">
              Privacy Policy
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
