import { createHmac, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

function secret(): string {
  // SESSION_SECRET is preferred; falls back to ADMIN_SECRET during transition
  const s = process.env.SESSION_SECRET ?? process.env.ADMIN_SECRET;
  if (!s) throw new Error("SESSION_SECRET not configured");
  return s;
}

export function signSessionToken(username: string): string {
  const lower = username.toLowerCase().trim();
  const hmac = createHmac("sha256", secret()).update(`u:${lower}`).digest("hex");
  return `u:${lower}:${hmac}`;
}

export function verifySessionToken(token: string): string | null {
  try {
    const parts = token.split(":");
    // format: u:{username}:{hmac}
    if (parts.length < 3 || parts[0] !== "u") return null;
    const username = parts[1];
    const expected = signSessionToken(username);
    const a = Buffer.from(token);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return null;
    if (!timingSafeEqual(a, b)) return null;
    return username;
  } catch {
    return null;
  }
}

export function getServerSession(req: NextRequest): string | null {
  const cookie = req.cookies.get("session_token");
  if (!cookie?.value) return null;
  return verifySessionToken(cookie.value);
}

/** For use in Server Component pages (not route handlers). */
export async function getSessionFromCookies(): Promise<string | null> {
  const jar = await cookies();
  const token = jar.get("session_token")?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  };
}
