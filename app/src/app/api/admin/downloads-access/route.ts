import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { redis } from "@/lib/redis";
import { logAdminAction, extractAdminUsername } from "@/lib/audit";

const MODE_KEY = "feature:downloads:mode";
const ALLOWLIST_KEY = "feature:downloads:allowlist";

function verifyAdminToken(token: string): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const colonIdx = token.lastIndexOf(":");
  if (colonIdx === -1) return false;
  const username = token.slice(0, colonIdx);
  const signature = token.slice(colonIdx + 1);
  if (!username || !signature) return false;
  const expected = createHmac("sha256", secret).update(username).digest("hex");
  try {
    const sigBuf = Buffer.from(signature, "hex");
    const expBuf = Buffer.from(expected, "hex");
    if (sigBuf.length !== expBuf.length) return false;
    return timingSafeEqual(sigBuf, expBuf);
  } catch { return false; }
}

function isAdmin(req: NextRequest): boolean {
  const token = req.cookies.get("admin_token")?.value;
  return !!token && verifyAdminToken(token);
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [mode, members] = await Promise.all([
    redis.get(MODE_KEY),
    redis.smembers(ALLOWLIST_KEY),
  ]);

  return NextResponse.json({
    mode: (mode as string) ?? "off",
    allowlist: members ?? [],
  });
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json() as { action: string; mode?: string; username?: string };
  const admin = extractAdminUsername(req.cookies.get("admin_token")?.value ?? "") ?? "admin";

  if (body.action === "set-mode") {
    if (!["off", "allowlist", "all"].includes(body.mode ?? "")) {
      return NextResponse.json({ error: "invalid mode" }, { status: 400 });
    }
    await redis.set(MODE_KEY, body.mode!);
    logAdminAction(admin, "downloads-set-mode", body.mode!).catch(() => {});
    return NextResponse.json({ ok: true });
  }

  if (body.action === "grant" && body.username) {
    await redis.sadd(ALLOWLIST_KEY, body.username);
    logAdminAction(admin, "downloads-grant", body.username).catch(() => {});
    return NextResponse.json({ ok: true });
  }

  if (body.action === "revoke" && body.username) {
    await redis.srem(ALLOWLIST_KEY, body.username);
    logAdminAction(admin, "downloads-revoke", body.username).catch(() => {});
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}
