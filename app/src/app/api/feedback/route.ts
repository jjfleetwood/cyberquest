import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

async function isRateLimited(ip: string): Promise<boolean> {
  const key = `rate:feedback:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 3600); // 1-hour window
  return count > 5;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (await isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const { message, page, username } = await req.json();

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json({ error: "Email not configured" }, { status: 503 });
  }

  const body = {
    from: "Kryptós CronOS <noreply@kryptoscronos.com>",
    to: "hello@kryptoscronos.com",
    subject: `Kryptós CronOS Feedback${page ? ` — ${page}` : ""}`,
    text: `New feedback from kryptoscronos.com\n\nUser: ${username || "unknown"}\nPage: ${page || "unknown"}\nTime: ${new Date().toISOString()}\n\n---\n\n${message.trim()}`,
  };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
