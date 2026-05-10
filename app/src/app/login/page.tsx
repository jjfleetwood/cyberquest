"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login, register } from "@/lib/auth";

type Tab = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("login");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    const result = await login(loginUsername, loginPassword);
    setLoginLoading(false);
    if (result.success) router.push("/stages");
    else setLoginError(result.error ?? "Login failed.");
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setSignupError("");
    if (signupPassword !== signupConfirm) {
      setSignupError("Passwords do not match.");
      return;
    }
    setSignupLoading(true);
    const result = await register(signupUsername, signupEmail, signupPassword);
    setSignupLoading(false);
    if (result.success) router.push("/stages");
    else setSignupError(result.error ?? "Registration failed.");
  }

  const inputClass =
    "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all text-sm";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #060a10 0%, #0d1117 50%, #0a0e1a 100%)" }}
    >
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="w-full max-w-sm relative z-10">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-400 transition-colors mb-8">
          ← Back to home
        </Link>

        {/* Branding */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-3xl mb-4 border border-cyan-500/20"
            style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(167,139,250,0.15))" }}
          >
            🛡️
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Kryptós <span className="text-cyan-400">CronOS</span>
          </h1>
          <p className="text-gray-500 text-xs mt-1 font-mono">(κρυπτός χρόνος)</p>
          <p className="text-gray-600 text-sm mt-1">
            {tab === "login" ? "Welcome back, Agent." : "Join the mission."}
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl border border-white/10 overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)" }}
        >
          {/* Tabs */}
          <div className="flex border-b border-white/8">
            {(["login", "signup"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  setLoginError("");
                  setSignupError("");
                }}
                className={`flex-1 py-4 text-sm font-semibold transition-all ${
                  tab === t
                    ? "text-cyan-400 bg-cyan-500/8 border-b-2 border-cyan-500"
                    : "text-gray-600 hover:text-gray-400"
                }`}
              >
                {t === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>

          <div className="p-6">
            {tab === "login" ? (
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2 font-semibold">
                    Username
                  </label>
                  <input
                    type="text"
                    autoComplete="username"
                    placeholder="agent_name"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2 font-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                {loginError && (
                  <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">
                    <span>⚠</span> {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3 font-bold rounded-lg text-sm mt-1 transition-all text-black disabled:opacity-50"
                  style={{ background: loginLoading ? "#155e75" : "linear-gradient(90deg, #22d3ee, #818cf8)" }}
                >
                  {loginLoading ? "Verifying…" : "Log In →"}
                </button>

                <p className="text-center text-xs text-gray-700">
                  No account?{" "}
                  <button type="button" onClick={() => setTab("signup")} className="text-cyan-500 hover:text-cyan-400 transition-colors">
                    Sign up free
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="flex flex-col gap-4">
                {[
                  { label: "Username", type: "text", placeholder: "agent_name (min. 3 chars)", value: signupUsername, set: setSignupUsername, auto: "username" },
                  { label: "Email", type: "email", placeholder: "agent@example.com", value: signupEmail, set: setSignupEmail, auto: "email" },
                  { label: "Password", type: "password", placeholder: "min. 8 characters", value: signupPassword, set: setSignupPassword, auto: "new-password" },
                  { label: "Confirm Password", type: "password", placeholder: "••••••••", value: signupConfirm, set: setSignupConfirm, auto: "new-password" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2 font-semibold">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      autoComplete={field.auto}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => field.set(e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>
                ))}

                {signupError && (
                  <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">
                    <span>⚠</span> {signupError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={signupLoading}
                  className="w-full py-3 font-bold rounded-lg text-sm mt-1 transition-all text-black disabled:opacity-50"
                  style={{ background: signupLoading ? "#155e75" : "linear-gradient(90deg, #22d3ee, #818cf8)" }}
                >
                  {signupLoading ? "Creating account…" : "Create Account →"}
                </button>

                <p className="text-center text-xs text-gray-700">
                  Have an account?{" "}
                  <button type="button" onClick={() => setTab("login")} className="text-cyan-500 hover:text-cyan-400 transition-colors">
                    Log in
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-800 mt-5">
          Credentials stored locally in your browser · No server required
        </p>
      </div>
    </div>
  );
}
