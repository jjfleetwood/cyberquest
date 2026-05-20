import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message, page } = await req.json();

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json({ error: "Email not configured" }, { status: 503 });
  }

  const body = {
    from: "Kryptós CronOS <noreply@kryptoscronos.com>",
    to: "jjbolotin@yahoo.com",
    subject: `Kryptós CronOS Feedback${page ? ` — ${page}` : ""}`,
    text: `New feedback from kryptoscronos.com\n\nPage: ${page || "unknown"}\nTime: ${new Date().toISOString()}\n\n---\n\n${message.trim()}`,
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
