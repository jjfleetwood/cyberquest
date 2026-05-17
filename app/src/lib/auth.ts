import { generateSalt, hashPassword } from "@/lib/crypto-utils";

export { generateSalt, hashPassword };

const USERS_KEY = "kryptos_users";
const SESSION_KEY = "kryptos_session";

// ─── Types ────────────────────────────────────────────────────────────────────

export type StoredUser = {
  username: string;
  email: string;
  createdAt: number;
  isAdmin?: boolean;
};

/** Returns true if the current session user has admin privileges. */
export function isAdmin(): boolean {
  const session = getSession();
  if (!session) return false;
  const users = getUsers();
  const user = users.find((u) => u.username.toLowerCase() === session.toLowerCase());
  return user?.isAdmin === true;
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
  // Upsert — update existing entry if username already stored
  const idx = users.findIndex((u) => u.username.toLowerCase() === user.username.toLowerCase());
  if (idx >= 0) {
    users[idx] = { ...users[idx], ...user };
  } else {
    users.push(user);
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ─── Session ──────────────────────────────────────────────────────────────────

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

// ─── Admin session ────────────────────────────────────────────────────────────

async function grantAdminIfEligible(username: string): Promise<boolean> {
  try {
    const res = await fetch("/api/admin-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    return data.isAdmin === true;
  } catch {
    return false;
  }
}

function markUserAdmin(username: string): void {
  const users = getUsers();
  const user = users.find((u) => u.username.toLowerCase() === username.toLowerCase());
  if (user) {
    user.isAdmin = true;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
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

  const salt = generateSalt();
  const passwordHash = await hashPassword(password, salt);

  // Sync credentials to Redis first
  const syncRes = await fetch("/api/sync-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username.trim(), email: email.trim(), passwordHash, salt }),
  }).catch(() => null);

  if (!syncRes?.ok) {
    // If server already has this username, treat as taken
    const syncData = await syncRes?.json().catch(() => null);
    if (syncData?.taken) {
      return { success: false, error: "Username is already taken." };
    }
  }

  // Save to localStorage without credentials
  const newUser: StoredUser = {
    username: username.trim(),
    email: email.trim(),
    createdAt: Date.now(),
    isAdmin: false,
  };
  saveUser(newUser);
  setSession(newUser.username);

  // Set HTTP-only session cookie (verifies credentials against Redis)
  await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: newUser.username, passwordHash }),
  }).catch(() => {});

  const adminGranted = await grantAdminIfEligible(newUser.username);
  if (adminGranted) markUserAdmin(newUser.username);

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
  // Login is fully server-side — no password hashes in localStorage
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username.trim(), password }),
  }).catch(() => null);

  if (!res?.ok) {
    const data = await res?.json().catch(() => null);
    return { success: false, error: data?.error ?? "Invalid username or password." };
  }

  const data = await res.json() as { username: string; email: string };

  setSession(data.username);
  saveUser({ username: data.username, email: data.email, createdAt: Date.now() });

  const adminGranted = await grantAdminIfEligible(data.username);
  if (adminGranted) markUserAdmin(data.username);

  return { success: true };
}
