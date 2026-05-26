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

export function proxy(req: NextRequest) {
  // Admin route protection
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const token = req.cookies.get("admin_token")?.value;
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.redirect(new URL("/stages", req.url));
    }
  }

  // Per-request nonce for script-src CSP
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://plausible.io`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self' https://api.resend.com https://plausible.io",
    "frame-ancestors 'none'",
  ].join("; ");

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);

  const res = NextResponse.next({ request: { headers: requestHeaders } });
  res.headers.set("Content-Security-Policy", csp);
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};
