/**
 * Batch-translates stage body content using Claude Haiku (cheapest model).
 * Resume-safe: skips stages already present in the output JSON.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... npx tsx scripts/translate-stages.ts --locale fr
 *   ANTHROPIC_API_KEY=sk-... npx tsx scripts/translate-stages.ts --locale es
 *   ANTHROPIC_API_KEY=sk-... npx tsx scripts/translate-stages.ts --locale de
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

const ROOT = path.join(__dirname, "..");

type TranslationPayload = {
  tagline: string;
  overview: string[];
  technical: { title: string; body: string[] };
  incident: { title: string; impact: string; body: string[] };
  timeline: string[];
  keyTakeaways: string[];
};

async function translateStage(
  client: Anthropic,
  locale: string,
  localeName: string,
  stageId: string,
  payload: TranslationPayload
): Promise<unknown> {
  const systemPrompt = `You are a professional technical translator. Translate all text into ${localeName}.
Rules:
- Translate ALL values in the JSON faithfully and accurately
- Preserve technical terms (SQL, XSS, CVE, BGP, SNMP, etc.) in their original form
- Keep proper nouns (company names, product names, place names) unchanged
- Preserve tone: educational, engaging, cybersecurity-focused
- Do NOT add explanations, only return valid JSON
- Return ONLY the JSON object, no markdown fences or extra text
- CRITICAL: Use only standard ASCII double-quote characters " for JSON strings. Never use „ " » « or any other quotation marks
- CRITICAL: All string values must be on a single line — never insert literal newline characters inside a JSON string value
- CRITICAL: Ensure all special characters inside strings are properly JSON-escaped`;

  const userPrompt = `Translate this JSON object to ${localeName}. Return only valid JSON:\n\n${JSON.stringify(payload, null, 2)}`;

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 8192,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error(`No JSON found in response for ${stageId}`);

  // Repair common model JSON issues: literal newlines/tabs inside string values
  let raw = jsonMatch[0];
  raw = raw.replace(/:\s*"((?:[^"\\]|\\.)*)"/gs, (_m, inner) => {
    const fixed = inner.replace(/\n/g, "\\n").replace(/\r/g, "").replace(/\t/g, "\\t");
    return `: "${fixed}"`;
  });
  // Replace typographic quotation marks that break JSON
  raw = raw.replace(/[„"]/g, '"').replace(/[»«]/g, '"');

  return JSON.parse(raw);
}

async function main() {
  const LOCALE_NAME: Record<string, string> = { es: "Spanish", fr: "French", de: "German" };

  const localeArg =
    process.argv.find((a) => a.startsWith("--locale="))?.split("=")[1] ??
    process.argv[process.argv.indexOf("--locale") + 1];

  if (!localeArg || !["es", "fr", "de"].includes(localeArg)) {
    console.error("Usage: npx tsx scripts/translate-stages.ts --locale <es|fr|de>");
    process.exit(1);
  }

  const locale = localeArg as "es" | "fr" | "de";
  const localeName = LOCALE_NAME[locale];

  // Load stage data
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { stages } = require(path.join(ROOT, "src/data/stages.ts")) as { stages: Array<{ id: string; info?: Record<string, unknown> }> };

  const outPath = path.join(ROOT, `src/data/translations/${locale}.json`);
  let existing: Record<string, unknown> = {};
  try {
    existing = JSON.parse(fs.readFileSync(outPath, "utf8"));
  } catch {
    existing = {};
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const stagesToProcess = stages.filter((s) => s.info && !(s.id in existing));

  console.log(`\n🌐 Translating ${stagesToProcess.length} stages → ${localeName}`);
  console.log(`   (${Object.keys(existing).length} already done, ${stages.length} total)\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const stage of stagesToProcess) {
    const { id, info } = stage as { id: string; info: Record<string, unknown> };
    process.stdout.write(`  ${id} ... `);

    const payload: TranslationPayload = {
      tagline: (info.tagline as string) ?? "",
      overview: (info.overview as string[]) ?? [],
      technical: {
        title: ((info.technical as Record<string, unknown>)?.title as string) ?? "",
        body: ((info.technical as Record<string, unknown>)?.body as string[]) ?? [],
      },
      incident: {
        title: ((info.incident as Record<string, unknown>)?.title as string) ?? "",
        impact: ((info.incident as Record<string, unknown>)?.impact as string) ?? "",
        body: ((info.incident as Record<string, unknown>)?.body as string[]) ?? [],
      },
      timeline: ((info.timeline as Array<{ event: string }>) ?? []).map((e) => e.event),
      keyTakeaways: (info.keyTakeaways as string[]) ?? [],
    };

    try {
      const translated = await translateStage(client, locale, localeName, id, payload);
      existing[id] = translated;
      fs.writeFileSync(outPath, JSON.stringify(existing, null, 2), "utf8");
      console.log("✓");
      successCount++;
      await new Promise((r) => setTimeout(r, 300));
    } catch (err) {
      console.log(`✗ ${err instanceof Error ? err.message : err}`);
      errorCount++;
    }
  }

  console.log(`\n✅ Done: ${successCount} translated, ${errorCount} errors`);
  console.log(`   Output: ${outPath}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
