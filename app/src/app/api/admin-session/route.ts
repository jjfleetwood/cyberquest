import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

function signToken(username: string): string {
  const secret = process.env.ADMIN_SECRET ?? "";
  return createHmac("sha256", secret).update(username).digest("hex");
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { username } = body as { username?: string };

  const adminUsername = process.env.ADMIN_USERNAME;
  if (!adminUsername || !username || username.toLowerCase() !== adminUsername.toLowerCase()) {
    return NextResponse.json({ isAdmin: false });
  }

  const token = `${username}:${signToken(username)}`;
  const res = NextResponse.json({ isAdmin: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("admin_token");
  return res;
}
