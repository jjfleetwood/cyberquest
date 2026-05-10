import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

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
  } catch {
    return false;
  }
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.redirect(new URL("/stages", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
