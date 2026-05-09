"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "@/lib/auth";

type Tab = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("login");

  // Login form state
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Signup form state
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
    if (result.success) {
      router.push("/stages");
    } else {
      setLoginError(result.error ?? "Login failed.");
    }
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
    if (result.success) {
      router.push("/stages");
    } else {
      setSignupError(result.error ?? "Registration failed.");
    }
  }

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-colors text-sm";

  const labelClass = "block text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(135deg, #0d1117 0%, #0a0e1a 100%)" }}
    >
      <div className="w-full max-w-sm">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🛡️</div>
          <h1 className="text-2xl font-bold text-white tracking-tight">CyberQuest</h1>
          <p className="text-gray-500 text-sm mt-1">Secure your knowledge.</p>
        </div>

        {/* Card */}
        <div className="bg-white/3 border border-white/10 rounded-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => { setTab("login"); setLoginError(""); }}
              className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
                tab === "login"
                  ? "text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/5"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => { setTab("signup"); setSignupError(""); }}
              className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
                tab === "signup"
                  ? "text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/5"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="p-6">
            {/* ── Login Form ── */}
            {tab === "login" && (
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div>
                  <label className={labelClass} htmlFor="login-username">Username</label>
                  <input
                    id="login-username"
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
                  <label className={labelClass} htmlFor="login-password">Password</label>
                  <input
                    id="login-password"
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
                  <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    {loginError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-900 disabled:text-cyan-700 text-black font-bold rounded-lg transition-colors text-sm mt-1"
                >
                  {loginLoading ? "Verifying…" : "Log In →"}
                </button>

                <p className="text-center text-xs text-gray-600">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => { setTab("signup"); setLoginError(""); }}
                    className="text-cyan-500 hover:text-cyan-400 transition-colors"
                  >
                    Sign up
                  </button>
                </p>
              </form>
            )}

            {/* ── Sign Up Form ── */}
            {tab === "signup" && (
              <form onSubmit={handleSignup} className="flex flex-col gap-4">
                <div>
                  <label className={labelClass} htmlFor="signup-username">Username</label>
                  <input
                    id="signup-username"
                    type="text"
                    autoComplete="username"
                    placeholder="agent_name (min. 3 chars)"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="signup-email">Email</label>
                  <input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    placeholder="agent@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="signup-password">Password</label>
                  <input
                    id="signup-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••  (min. 8 chars)"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="signup-confirm">Confirm Password</label>
                  <input
                    id="signup-confirm"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={signupConfirm}
                    onChange={(e) => setSignupConfirm(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                {signupError && (
                  <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    {signupError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={signupLoading}
                  className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-900 disabled:text-cyan-700 text-black font-bold rounded-lg transition-colors text-sm mt-1"
                >
                  {signupLoading ? "Creating account…" : "Create Account →"}
                </button>

                <p className="text-center text-xs text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => { setTab("login"); setSignupError(""); }}
                    className="text-cyan-500 hover:text-cyan-400 transition-colors"
                  >
                    Log in
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-700 mt-6">
          Demo app — data is stored locally in your browser only.
        </p>
      </div>
    </div>
  );
}
