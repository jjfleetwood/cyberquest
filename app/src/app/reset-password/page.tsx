"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { setSession } from "@/lib/auth";

function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!token) setError("Missing or invalid reset link.");
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Reset failed. The link may have expired.");
        return;
      }

      const { username } = data as { username: string };

      // Server sets the HTTP-only session cookie; just sync client sessionStorage
      setSession(username);
      setDone(true);
      setTimeout(() => router.push("/stages"), 2000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all text-sm";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #060a10 0%, #0d1117 50%, #0a0e1a 100%)" }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        <Link href="/login" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-400 transition-colors mb-8">
          ← Back to login
        </Link>

        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-3xl mb-4 border border-cyan-500/20"
            style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(167,139,250,0.15))" }}
          >
            🔐
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Kryptós <span className="text-cyan-400">CronOS</span>
          </h1>
          <p className="text-gray-600 text-sm mt-1">Set New Password</p>
        </div>

        <div
          className="rounded-2xl border border-white/10 overflow-hidden p-6"
          style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)" }}
        >
          {done ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-white font-semibold mb-2">Password updated</h2>
              <p className="text-gray-500 text-sm">Redirecting you to training…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { label: "New Password", placeholder: "min. 8 characters", value: password, set: setPassword, auto: "new-password" },
                { label: "Confirm Password", placeholder: "••••••••", value: confirm, set: setConfirm, auto: "new-password" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2 font-semibold">
                    {field.label}
                  </label>
                  <input
                    type="password"
                    autoComplete={field.auto}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={(e) => field.set(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
              ))}

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">
                  <span>⚠</span> {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !token}
                className="w-full py-3 font-bold rounded-lg text-sm mt-1 transition-all text-black disabled:opacity-50"
                style={{ background: loading ? "#155e75" : "linear-gradient(90deg, #22d3ee, #818cf8)" }}
              >
                {loading ? "Updating…" : "Set New Password →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
