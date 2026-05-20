import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { getStageOverride, saveStageOverride, deleteStageOverride, type StageOverride } from "@/lib/cms";
import { getStage } from "@/data/stages";

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

type Params = { params: Promise<{ stageId: string }> };

/** GET — returns current override + defaults for a stage */
export async function GET(req: NextRequest, { params }: Params) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { stageId } = await params;
  const stage = getStage(stageId);
  if (!stage) return NextResponse.json({ error: "Stage not found" }, { status: 404 });

  const override = await getStageOverride(stageId);
  return NextResponse.json({
    stageId,
    override: override ?? {},
    defaults: {
      title: stage.title,
      subtitle: stage.subtitle,
      info_tagline: stage.info.tagline,
      info_overview: stage.info.overview.join("\n"),
      info_keyTakeaways: stage.info.keyTakeaways.join("\n"),
    },
  });
}

/** PUT — save content overrides */
export async function PUT(req: NextRequest, { params }: Params) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { stageId } = await params;
  if (!getStage(stageId)) return NextResponse.json({ error: "Stage not found" }, { status: 404 });

  const body = (await req.json()) as StageOverride;
  await saveStageOverride(stageId, body);
  return NextResponse.json({ ok: true });
}

/** DELETE — clear all overrides (revert to defaults) */
export async function DELETE(req: NextRequest, { params }: Params) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { stageId } = await params;
  await deleteStageOverride(stageId);
  return NextResponse.json({ ok: true });
}
