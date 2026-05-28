import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { getServerSession } from "@/lib/server-session";

function randomSegment() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I confusion
  let s = "";
  for (let i = 0; i < 4; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

function generateCode() {
  return `KRYPTOS-${randomSegment()}-${randomSegment()}`;
}

export async function GET(req: NextRequest) {
  const session = getServerSession(req);
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const keys = await redis.zrange("voucher:index", 0, -1, { rev: true });
  if (!keys.length) return NextResponse.json([]);

  const vouchers = await Promise.all(
    keys.map(async (key) => {
      const data = await redis.hgetall(key as string);
      if (!data) return null;
      const uses = data.uses ? JSON.parse(data.uses as string) : [];
      return {
        code: (key as string).replace("voucher:", ""),
        durationDays: Number(data.durationDays ?? 30),
        usesLimit: Number(data.usesLimit ?? 1),
        usesLeft: Number(data.usesLeft ?? 0),
        createdAt: Number(data.createdAt ?? 0),
        createdBy: data.createdBy ?? "",
        uses,
      };
    })
  );

  return NextResponse.json(vouchers.filter(Boolean));
}

export async function POST(req: NextRequest) {
  const session = getServerSession(req);
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json() as { count?: number; usesLimit?: number; durationDays?: number };
  const count = Math.min(Number(body.count ?? 1), 50);
  const usesLimit = Math.min(Math.max(Number(body.usesLimit ?? 1), 1), 1000);
  const durationDays = [30, 60, 90].includes(Number(body.durationDays)) ? Number(body.durationDays) : 30;

  const codes: string[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    let code: string;
    // ensure unique
    do { code = generateCode(); } while (await redis.exists(`voucher:${code}`));

    await redis.hset(`voucher:${code}`, {
      durationDays: String(durationDays),
      usesLimit: String(usesLimit),
      usesLeft: String(usesLimit),
      createdAt: String(now),
      createdBy: session,
      uses: "[]",
    });
    await redis.zadd("voucher:index", { score: now, member: `voucher:${code}` });
    codes.push(code);
  }

  return NextResponse.json({ codes });
}
