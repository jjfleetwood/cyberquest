import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

async function isRateLimited(ip: string): Promise<boolean> {
  const key = `rate:register:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 3600); // 1-hour window
  return count > 5;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (await isRateLimited(ip)) {
    return NextResponse.json({ ok: true });
  }

  const { username, email } = await req.json().catch(() => ({})) as { username?: string; email?: string };
  if (!username || !email) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!apiKey || !adminEmail) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Kryptós CronOS <noreply@kryptoscronos.com>",
      to: [adminEmail],
      subject: `New user registered: ${username}`,
      html: `
        <div style="font-family: monospace; background: #0d1117; color: #e2e8f0; padding: 32px; border-radius: 8px; max-width: 480px;">
          <h2 style="color: #22d3ee; margin: 0 0 16px;">🛡️ Kryptós CronOS</h2>
          <p style="color: #94a3b8; margin: 0 0 24px;">New agent registered.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="color: #64748b; padding: 8px 0; border-bottom: 1px solid #1e293b;">Username</td>
              <td style="color: #22d3ee; font-weight: bold; padding: 8px 0; border-bottom: 1px solid #1e293b;">${username}</td>
            </tr>
            <tr>
              <td style="color: #64748b; padding: 8px 0; border-bottom: 1px solid #1e293b;">Email</td>
              <td style="color: #e2e8f0; padding: 8px 0; border-bottom: 1px solid #1e293b;">${email}</td>
            </tr>
            <tr>
              <td style="color: #64748b; padding: 8px 0;">Time</td>
              <td style="color: #e2e8f0; padding: 8px 0;">${new Date().toUTCString()}</td>
            </tr>
          </table>
          <p style="color: #334155; margin: 24px 0 0; font-size: 12px;">
            (κρυπτός χρόνος) · kryptoscronos.com
          </p>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
