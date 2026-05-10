const USERS_KEY = "kryptos_users";
const SESSION_KEY = "kryptos_session";

// ─── Types ────────────────────────────────────────────────────────────────────

export type StoredUser = {
  username: string;
  email: string;
  passwordHash: string;
  salt: string;
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

// ─── Crypto helpers ───────────────────────────────────────────────────────────

export function generateSalt(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: encoder.encode(salt), iterations: 100_000, hash: "SHA-256" },
    keyMaterial,
    256
  );
  return Array.from(new Uint8Array(bits))
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
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return;
    const users: StoredUser[] = JSON.parse(raw);
    const user = users.find((u) => u.username.toLowerCase() === username.toLowerCase());
    if (user) {
      user.isAdmin = true;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  } catch {
    // ignore
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
    isAdmin: false,
  };

  saveUser(newUser);
  setSession(newUser.username);

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
  await grantAdminIfEligible(user.username);
  return { success: true };
}
