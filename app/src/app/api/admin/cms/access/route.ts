import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import {
  getRestrictedEpochs,
  getEpochAllowlist,
  setEpochRestricted,
  grantEpochAccess,
  revokeEpochAccess,
} from "@/lib/cms";
import { epochs } from "@/data/stages";

function verifyAdmin(req: NextRequest): boolean {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return false;
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const colonIdx = token.lastIndexOf(":");
  if (colonIdx === -1) return false;
  const username = token.slice(0, colonIdx);
  const sig = token.slice(colonIdx + 1);
  const expected = createHmac("sha256", secret).update(username).digest("hex");
  try {
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expected, "hex");
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/** GET — returns all epoch access config */
export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const restricted = await getRestrictedEpochs();
  const allowlists: Record<string, string[]> = {};
  for (const epochId of restricted) {
    allowlists[epochId] = await getEpochAllowlist(epochId);
  }

  return NextResponse.json({
    restricted,
    allowlists,
    epochs: epochs.map((e) => ({ id: e.id, name: e.name, emoji: e.emoji })),
  });
}

type AccessBody =
  | { action: "restrict";   epochId: string }
  | { action: "unrestrict"; epochId: string }
  | { action: "grant";      epochId: string; username: string }
  | { action: "revoke";     epochId: string; username: string };

/** POST — toggle restriction or manage allowlist */
export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json()) as AccessBody;
  const { action, epochId } = body;

  if (!epochId || !epochs.find((e) => e.id === epochId)) {
    return NextResponse.json({ error: "Invalid epochId" }, { status: 400 });
  }

  switch (action) {
    case "restrict":
      await setEpochRestricted(epochId, true);
      break;
    case "unrestrict":
      await setEpochRestricted(epochId, false);
      break;
    case "grant":
      if (!body.username?.trim()) return NextResponse.json({ error: "username required" }, { status: 400 });
      await grantEpochAccess(epochId, body.username.trim());
      break;
    case "revoke":
      if (!body.username?.trim()) return NextResponse.json({ error: "username required" }, { status: 400 });
      await revokeEpochAccess(epochId, body.username.trim());
      break;
    default:
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
