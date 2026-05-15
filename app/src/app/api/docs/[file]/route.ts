import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import fs from "fs";
import path from "path";

const ALLOWED_FILES = new Set([
  "README.md",
  "SECURITY_BRIEFING.md",
  "TECHNICAL_ARCHITECTURE.md",
  "ARCHITECTURE.md",
  "RELEASE_NOTES.md",
  "BUILD.md",
  "OPS.md",
  "CURRICULUM.md",
  "PARTNERS.md",
  "BUSINESS_PROPOSAL_PRO.md",
  "BUSINESS_PROPOSAL_CASUAL.md",
]);

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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ file: string }> }
) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { file } = await params;
  if (!ALLOWED_FILES.has(file)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const filePath = path.join(process.cwd(), "secured-docs", file);
    const content = fs.readFileSync(filePath, "utf-8");
    return new NextResponse(content, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
