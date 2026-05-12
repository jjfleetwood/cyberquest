import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { redis } from "@/lib/redis";

const RESET_TTL = 3600;

async function isRateLimited(ip: string): Promise<boolean> {
  const key = `rate:forgot:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 900); // 15-minute window
  return count > 3;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (await isRateLimited(ip)) {
    return NextResponse.json({ ok: true }); // silent — don't reveal rate limiting
  }

  const body = await req.json().catch(() => null) as { email?: string } | null;
  const email = body?.email?.trim().toLowerCase();

  const ok = NextResponse.json({ ok: true });
  if (!email) return ok;

  const username = await redis.get<string>(`email:${email}`);
  if (!username) return ok;

  const token = randomBytes(32).toString("hex");
  await redis.set(`reset:${token}`, username, { ex: RESET_TTL });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return ok;

  const baseUrl = process.env.APP_URL ?? "http://localhost:3000";
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Kryptós CronOS <onboarding@resend.dev>",
      to: [email],
      subject: "Reset your Kryptós CronOS password",
      html: `
        <div style="font-family: monospace; background: #0d1117; color: #e2e8f0; padding: 32px; border-radius: 8px; max-width: 480px;">
          <div style="font-size: 24px; margin-bottom: 8px;">🛡️ Kryptós CronOS</div>
          <div style="color: #94a3b8; font-size: 13px; margin-bottom: 24px;">Password Reset Request</div>
          <p style="color: #cbd5e1;">A password reset was requested for agent <strong style="color: #22d3ee;">${username}</strong>.</p>
          <p style="color: #cbd5e1;">Click the link below to set a new password. This link expires in <strong>1 hour</strong>.</p>
          <div style="margin: 24px 0;">
            <a href="${resetUrl}" style="background: linear-gradient(90deg, #22d3ee, #818cf8); color: #000; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">Reset Password →</a>
          </div>
          <p style="color: #475569; font-size: 12px;">If you did not request this, you can safely ignore this email.</p>
        </div>
      `,
    }),
  }).catch(() => {});

  return ok;
}
