const SESSION_KEY = "kryptos_session";

// ─── Session (sessionStorage cache — fast, clears on tab close) ───────────────
// The authoritative session is the server-side session_token cookie.
// sessionStorage is a write-through cache for instant UI rendering.

export function getSession(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

export function setSession(username: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEY, username);
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
  fetch("/api/admin-session", { method: "DELETE" }).catch(() => {});
  fetch("/api/auth/session", { method: "DELETE" }).catch(() => {});
}

// ─── Auth actions ─────────────────────────────────────────────────────────────

export async function register(
  username: string,
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  if (username.trim().length < 3) return { success: false, error: "Username must be at least 3 characters." };
  if (password.length < 8) return { success: false, error: "Password must be at least 8 characters." };
  if (!email.includes("@")) return { success: false, error: "Please enter a valid email address." };

  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username.trim(), email: email.trim(), password }),
  }).catch(() => null);

  if (!res?.ok) {
    const data = await res?.json().catch(() => null);
    if (data?.taken) return { success: false, error: "Username is already taken." };
    return { success: false, error: data?.error ?? "Registration failed. Please try again." };
  }

  const data = await res.json() as { username: string };
  setSession(data.username);

  fetch("/api/notify-registration", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: data.username, email: email.trim() }),
  }).catch(() => {});

  return { success: true };
}

export async function login(
  username: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username.trim(), password }),
  }).catch(() => null);

  if (!res?.ok) {
    const data = await res?.json().catch(() => null);
    return { success: false, error: data?.error ?? "Invalid username or password." };
  }

  const data = await res.json() as { username: string };
  setSession(data.username);
  return { success: true };
}
