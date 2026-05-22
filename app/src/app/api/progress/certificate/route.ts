import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { getServerSession } from "@/lib/server-session";
import { renderToBuffer, Document, Page, View, Text, StyleSheet, Font } from "@react-pdf/renderer";
import { createElement as h } from "react";
import { epochs, stages } from "@/data/stages";

Font.register({
  family: "Helvetica",
  fonts: [],
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#0d1117",
    padding: 48,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1e2d3d",
  },
  brand: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#22d3ee",
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 9,
    color: "#4b5563",
    marginTop: 3,
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 28,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#111827",
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1e2d3d",
  },
  statValue: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#22d3ee",
    marginBottom: 3,
  },
  statLabel: {
    fontSize: 8,
    color: "#4b5563",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#4b5563",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  epochRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 4,
    borderRadius: 6,
    backgroundColor: "#111827",
  },
  epochName: {
    flex: 1,
    fontSize: 10,
    color: "#d1d5db",
  },
  epochCount: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#22d3ee",
    marginRight: 8,
  },
  epochDone: {
    fontSize: 9,
    color: "#4ade80",
  },
  epochPartial: {
    fontSize: 9,
    color: "#6b7280",
  },
  footer: {
    position: "absolute",
    bottom: 32,
    left: 48,
    right: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#1e2d3d",
  },
  footerText: {
    fontSize: 8,
    color: "#374151",
  },
});

export async function GET(req: NextRequest) {
  const username = getServerSession(req);
  if (!username) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const lower = username.toLowerCase();
  const [progressData, streakData] = await Promise.all([
    redis.hgetall(`progress:${lower}`),
    redis.hgetall(`streak:${lower}`),
  ]);

  const coins = Number(progressData?.coins ?? progressData?.xp ?? 0);
  const completedStages: string[] = progressData?.stages
    ? JSON.parse(progressData.stages as string)
    : [];
  const badges: string[] = progressData?.badges
    ? JSON.parse(progressData.badges as string)
    : [];
  const streak = Number(streakData?.current ?? 0);
  const generatedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Build epoch completion summary
  const epochSummary = epochs.map((epoch) => {
    const epochStages = stages.filter((s) => s.epochId === epoch.id);
    const done = epochStages.filter((s) => completedStages.includes(s.id)).length;
    return { name: epoch.name, total: epochStages.length, done };
  }).filter((e) => e.done > 0);

  const doc = h(
    Document,
    { title: `Kryptós CronOS — ${username} Progress Report` },
    h(
      Page,
      { size: "A4", style: styles.page },

      // Header
      h(View, { style: styles.header },
        h(View, null,
          h(Text, { style: styles.brand }, "Kryptós CronOS"),
          h(Text, { style: styles.tagline }, "CYBERSECURITY TRAINING PLATFORM")
        )
      ),

      // Title
      h(Text, { style: styles.title }, "Progress Report"),
      h(Text, { style: styles.subtitle }, `${username}  ·  Generated ${generatedDate}`),

      // Stats
      h(View, { style: styles.statsRow },
        h(View, { style: styles.statBox },
          h(Text, { style: styles.statValue }, `${coins}`),
          h(Text, { style: styles.statLabel }, "Total Coins")
        ),
        h(View, { style: styles.statBox },
          h(Text, { style: styles.statValue }, `${completedStages.length}`),
          h(Text, { style: styles.statLabel }, "Stages Completed")
        ),
        h(View, { style: styles.statBox },
          h(Text, { style: styles.statValue }, `${badges.length}`),
          h(Text, { style: styles.statLabel }, "Badges Earned")
        ),
        h(View, { style: styles.statBox },
          h(Text, { style: styles.statValue }, `${streak}`),
          h(Text, { style: styles.statLabel }, "Day Streak")
        )
      ),

      // Epoch breakdown
      h(Text, { style: styles.sectionTitle }, "Completed Modules"),
      epochSummary.length === 0
        ? h(Text, { style: { fontSize: 10, color: "#4b5563" } }, "No stages completed yet.")
        : h(View, null,
            ...epochSummary.map((e) =>
              h(View, { key: e.name, style: styles.epochRow },
                h(Text, { style: styles.epochName }, e.name),
                h(Text, { style: styles.epochCount }, `${e.done}/${e.total}`),
                h(Text, {
                  style: e.done === e.total ? styles.epochDone : styles.epochPartial,
                }, e.done === e.total ? "✓ Complete" : "In Progress")
              )
            )
          ),

      // Footer
      h(View, { style: styles.footer },
        h(Text, { style: styles.footerText }, "kryptoscronos.com"),
        h(Text, { style: styles.footerText }, `© 2026 Kryptós CronOS`)
      )
    )
  );

  const buffer = await renderToBuffer(doc);

  return new NextResponse(buffer as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="kryptos-cronos-${lower}-progress.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
