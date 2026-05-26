/**
 * Batch-translates stage titles, wonder names, and epoch names/subtitles/descriptions.
 * Resume-safe: skips entries already present in the output JSON.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... npx tsx scripts/translate-meta.ts --locale fr
 *   ANTHROPIC_API_KEY=sk-... npx tsx scripts/translate-meta.ts --locale es
 *   ANTHROPIC_API_KEY=sk-... npx tsx scripts/translate-meta.ts --locale de
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

const ROOT = path.join(__dirname, "..");
const BATCH_SIZE = 15;

type StageMeta = { t: string; w: string };
type EpochMeta = { n: string; s: string; d: string };
type MetaFile = { stages: Record<string, StageMeta>; epochs: Record<string, EpochMeta> };

const LOCALE_NAME: Record<string, string> = { es: "Spanish", fr: "French", de: "German" };

const SYSTEM_PROMPT = (localeName: string) =>
  `You are a professional translator. Translate text into ${localeName}.
Rules:
- Preserve CVE identifiers (CVE-2021-44228, etc.) exactly unchanged
- Preserve technical acronyms (SQL, XSS, DNS, TCP, BGP, SNMP, CTF, SSRF, etc.) unchanged
- Keep proper nouns for place names in ${localeName} standard form when a standard translation exists (e.g. Athens → Athènes in French), otherwise keep original
- Keep cybersecurity product names (Cisco, Umbrella, Log4Shell, WannaCry, etc.) unchanged
- Translate descriptive titles and phrases faithfully
- Do NOT add explanations; return ONLY valid JSON
- No markdown fences
- Use only standard ASCII double-quote characters " — never „ " » «
- All string values must be on a single line`;

async function translateStageBatch(
  client: Anthropic,
  localeName: string,
  items: { id: string; stageTitle: string; wonderName: string }[]
): Promise<Record<string, StageMeta>> {
  const userPrompt = `Translate each entry to ${localeName}. Return a JSON array with the same structure:\n\n${JSON.stringify(items, null, 2)}`;

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2048,
    system: SYSTEM_PROMPT(localeName),
    messages: [{ role: "user", content: userPrompt }],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("No JSON array in response");

  let raw = jsonMatch[0];
  raw = raw.replace(/[„"]/g, '"').replace(/[»«]/g, '"');
  const translated = JSON.parse(raw) as { id: string; stageTitle: string; wonderName: string }[];

  const result: Record<string, StageMeta> = {};
  for (const item of translated) {
    if (item.id) result[item.id] = { t: item.stageTitle ?? "", w: item.wonderName ?? "" };
  }
  return result;
}

async function translateEpochBatch(
  client: Anthropic,
  localeName: string,
  items: { id: string; name: string; subtitle: string; description: string }[]
): Promise<Record<string, EpochMeta>> {
  const userPrompt = `Translate each epoch entry to ${localeName}. Return a JSON array with the same structure:\n\n${JSON.stringify(items, null, 2)}`;

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4096,
    system: SYSTEM_PROMPT(localeName),
    messages: [{ role: "user", content: userPrompt }],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("No JSON array in response for epochs");

  let raw = jsonMatch[0];
  raw = raw.replace(/[„"]/g, '"').replace(/[»«]/g, '"');
  const translated = JSON.parse(raw) as { id: string; name: string; subtitle: string; description: string }[];

  const result: Record<string, EpochMeta> = {};
  for (const item of translated) {
    if (item.id) result[item.id] = { n: item.name ?? "", s: item.subtitle ?? "", d: item.description ?? "" };
  }
  return result;
}

async function main() {
  const LOCALE_NAME_MAP: Record<string, string> = { es: "Spanish", fr: "French", de: "German" };

  const localeArg =
    process.argv.find((a) => a.startsWith("--locale="))?.split("=")[1] ??
    process.argv[process.argv.indexOf("--locale") + 1];

  if (!localeArg || !["es", "fr", "de"].includes(localeArg)) {
    console.error("Usage: npx tsx scripts/translate-meta.ts --locale <es|fr|de>");
    process.exit(1);
  }

  const locale = localeArg as "es" | "fr" | "de";
  const localeName = LOCALE_NAME_MAP[locale];

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { stages, epochs } = require(path.join(ROOT, "src/data/stages.ts")) as {
    stages: Array<{ id: string; title: string; wonder: { name: string } }>;
    epochs: Array<{ id: string; name: string; subtitle: string; description: string }>;
  };

  const outPath = path.join(ROOT, `src/data/translations/meta-${locale}.json`);
  let existing: MetaFile = { stages: {}, epochs: {} };
  try {
    existing = JSON.parse(fs.readFileSync(outPath, "utf8"));
    if (!existing.stages) existing.stages = {};
    if (!existing.epochs) existing.epochs = {};
  } catch {
    existing = { stages: {}, epochs: {} };
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  // ── Stage titles & wonder names ──────────────────────────────────────────
  const stagesToProcess = stages.filter((s) => !(s.id in existing.stages));
  console.log(`\n🌐 Translating ${stagesToProcess.length} stage names → ${localeName}`);
  console.log(`   (${Object.keys(existing.stages).length} already done, ${stages.length} total)\n`);

  let stageSuccess = 0;
  let stageError = 0;

  for (let i = 0; i < stagesToProcess.length; i += BATCH_SIZE) {
    const batch = stagesToProcess.slice(i, i + BATCH_SIZE);
    const preview = batch[0].id + (batch.length > 1 ? ` … +${batch.length - 1}` : "");
    process.stdout.write(`  [${preview}] ... `);

    try {
      const items = batch.map((s) => ({ id: s.id, stageTitle: s.title, wonderName: s.wonder.name }));
      const translated = await translateStageBatch(client, localeName, items);
      Object.assign(existing.stages, translated);
      fs.writeFileSync(outPath, JSON.stringify(existing, null, 2), "utf8");
      console.log(`✓ (${Object.keys(translated).length}/${batch.length})`);
      stageSuccess += Object.keys(translated).length;
      await new Promise((r) => setTimeout(r, 600));
    } catch (err) {
      console.log(`✗ ${err instanceof Error ? err.message : err}`);
      stageError += batch.length;
    }
  }

  // ── Epoch names, subtitles, descriptions ─────────────────────────────────
  const epochsToProcess = epochs.filter((e) => !(e.id in existing.epochs));
  console.log(`\n📋 Translating ${epochsToProcess.length} epoch entries → ${localeName}`);
  console.log(`   (${Object.keys(existing.epochs).length} already done, ${epochs.length} total)\n`);

  if (epochsToProcess.length > 0) {
    // Epochs in one or two batches (usually ~32 total)
    for (let i = 0; i < epochsToProcess.length; i += 10) {
      const batch = epochsToProcess.slice(i, i + 10);
      process.stdout.write(`  Epochs [${batch[0].id} … +${batch.length - 1}] ... `);
      try {
        const items = batch.map((e) => ({
          id: e.id,
          name: e.name,
          subtitle: e.subtitle,
          description: e.description,
        }));
        const translated = await translateEpochBatch(client, localeName, items);
        Object.assign(existing.epochs, translated);
        fs.writeFileSync(outPath, JSON.stringify(existing, null, 2), "utf8");
        console.log(`✓ (${Object.keys(translated).length}/${batch.length})`);
        await new Promise((r) => setTimeout(r, 600));
      } catch (err) {
        console.log(`✗ ${err instanceof Error ? err.message : err}`);
      }
    }
  }

  console.log(`\n✅ Done: ${stageSuccess} stages translated, ${stageError} errors`);
  console.log(`   Output: ${outPath}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
