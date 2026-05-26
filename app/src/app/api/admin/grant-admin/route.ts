import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { redis } from "@/lib/redis";

function extractCallerUsername(token: string): string | null {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !token) return null;
  const colonIdx = token.lastIndexOf(":");
  if (colonIdx === -1) return null;
  const username = token.slice(0, colonIdx);
  const sig = token.slice(colonIdx + 1);
  if (!username || !sig) return null;
  const expected = createHmac("sha256", secret).update(username).digest("hex");
  try {
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    return username;
  } catch { return null; }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value ?? "";
  const callerUsername = extractCallerUsername(token);
  if (!callerUsername) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Only the super admin (ADMIN_USERNAME env var) can grant or revoke admin rights
  const superAdmin = process.env.ADMIN_USERNAME?.toLowerCase();
  if (!superAdmin || callerUsername !== superAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => null) as { username?: string; grant?: boolean } | null;
  const target = body?.username?.toLowerCase().trim();
  const grant = body?.grant === true;

  if (!target) return NextResponse.json({ error: "username required" }, { status: 400 });

  // Super admin access cannot be revoked via this endpoint
  if (target === superAdmin) {
    return NextResponse.json({ error: "Cannot modify super admin access" }, { status: 403 });
  }

  const exists = await redis.exists(`user:${target}`);
  if (!exists) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (grant) {
    await redis.hset(`user:${target}`, { isAdmin: "true" });
  } else {
    await redis.hdel(`user:${target}`, "isAdmin");
  }

  return NextResponse.json({ ok: true, username: target, isAdmin: grant });
}
