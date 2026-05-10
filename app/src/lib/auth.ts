/**
 * auth.ts — Client-side auth utilities for Kryptós CronOS.
 *
 * SECURITY CAVEAT: This is a demo app. Passwords are hashed with SHA-256 via
 * the Web Crypto API, but everything is stored in plain localStorage (no
 * server, no HttpOnly cookies, no HTTPS enforcement). Do NOT use this pattern
 * for real production apps. A proper implementation would use a server-side
 * auth library (NextAuth, Lucia, etc.) with a database.
 */

const USERS_KEY = "kryptos_users";
const SESSION_KEY = "kryptos_session";

// ─── Types ────────────────────────────────────────────────────────────────────

export const ADMIN_USERNAME = "jjb";

export type StoredUser = {
  username: string;
  email: string;
  passwordHash: string;
  salt: string;
  createdAt: number;
  isAdmin?: boolean;
};

/** Returns true if the current session user is the admin. */
export function isAdmin(): boolean {
  const session = getSession();
  return session?.toLowerCase() === ADMIN_USERNAME.toLowerCase();
}

// ─── Crypto helpers ───────────────────────────────────────────────────────────

/** Returns 16 random hex chars (8 bytes) as a salt. */
export function generateSalt(): string {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** SHA-256 hash of `password + salt`, returned as hex. */
export async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ─── User store ───────────────────────────────────────────────────────────────

export function getUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

export function saveUser(user: StoredUser): void {
  if (typeof window === "undefined") return;
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ─── Session ──────────────────────────────────────────────────────────────────

/** Returns the logged-in username, or null if no session. */
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
}

// ─── Auth actions ─────────────────────────────────────────────────────────────

export async function register(
  username: string,
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  if (username.trim().length < 3) {
    return { success: false, error: "Username must be at least 3 characters." };
  }
  if (password.length < 8) {
    return { success: false, error: "Password must be at least 8 characters." };
  }
  if (!email.includes("@")) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const users = getUsers();
  const usernameLower = username.trim().toLowerCase();

  if (users.some((u) => u.username.toLowerCase() === usernameLower)) {
    return { success: false, error: "Username is already taken." };
  }
  if (users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
    return { success: false, error: "An account with that email already exists." };
  }

  const salt = generateSalt();
  const passwordHash = await hashPassword(password, salt);

  const newUser: StoredUser = {
    username: username.trim(),
    email: email.trim(),
    passwordHash,
    salt,
    createdAt: Date.now(),
    isAdmin: username.trim().toLowerCase() === ADMIN_USERNAME.toLowerCase(),
  };

  saveUser(newUser);
  setSession(newUser.username);

  // Fire-and-forget admin notification — non-blocking
  fetch("/api/notify-registration", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: newUser.username, email: newUser.email }),
  }).catch(() => {});

  return { success: true };
}

export async function login(
  username: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  const users = getUsers();
  const user = users.find(
    (u) => u.username.toLowerCase() === username.trim().toLowerCase()
  );

  if (!user) {
    return { success: false, error: "Invalid username or password." };
  }

  const hash = await hashPassword(password, user.salt);
  if (hash !== user.passwordHash) {
    return { success: false, error: "Invalid username or password." };
  }

  setSession(user.username);
  return { success: true };
}
