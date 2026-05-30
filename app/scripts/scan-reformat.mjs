// scan-reformat.mjs — content-reformat progress detector.
// A stage's briefing is considered "reformatted" (bulleted-with-dialogue) when its
// overview / technical.body / incident.body strings contain bullet lines, encoded in
// the source as the literal escape sequence backslash-n-dash-space ("\n- ").
//
// Usage:
//   node scripts/scan-reformat.mjs            # summary across all data files
//   node scripts/scan-reformat.mjs <file.ts>  # per-stage detail for one file
//
// Heuristic only — prose detection is fuzzy. Treat the manual checklist in
// CONTENT_REFORMAT.md as the source of truth; use this to find candidates.

import fs from "node:fs";
import path from "node:path";

const DATA_DIR = "src/data";
const BULLET = "\\n- "; // the 4 source characters: backslash, n, dash, space
const THRESHOLD = 3; // >= this many bullet lines across the 3 sections => "done"

function stagesIn(file) {
  const t = fs.readFileSync(path.join(DATA_DIR, file), "utf8");
  const re = /\n {4}id:\s*"([^"]+)",/g;
  const marks = [];
  let m;
  while ((m = re.exec(t))) marks.push({ id: m[1], idx: m.index });
  const out = [];
  for (let i = 0; i < marks.length; i++) {
    const s = marks[i].idx;
    const e = i + 1 < marks.length ? marks[i + 1].idx : t.length;
    const block = t.slice(s, e);
    if (!/challengeType:/.test(block)) continue;
    // count non-overlapping occurrences of the literal bullet sequence
    let count = 0, from = 0, hit;
    while ((hit = block.indexOf(BULLET, from)) !== -1) { count++; from = hit + BULLET.length; }
    out.push({ id: marks[i].id, bullets: count });
  }
  return out;
}

const arg = process.argv[2];
const files = arg ? [arg] : fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".ts"));

let doneAll = 0, wallAll = 0;
for (const f of files) {
  let st;
  try { st = stagesIn(f); } catch { continue; }
  if (!st.length) continue;
  const done = st.filter((s) => s.bullets >= THRESHOLD);
  const wall = st.filter((s) => s.bullets < THRESHOLD);
  doneAll += done.length; wallAll += wall.length;
  if (arg) {
    console.log(`=== ${f} ===`);
    for (const s of st) console.log(`  ${s.id}\t${s.bullets >= THRESHOLD ? "DONE(" + s.bullets + ")" : "wall(" + s.bullets + ")"}`);
  } else if (wall.length) {
    console.log(`${f}\tdone:${done.length}\twall:${wall.length}\t-> ${wall.map((s) => s.id).join(",")}`);
  }
}
console.log(`\nTOTAL reformatted: ${doneAll} | remaining (wall-of-text): ${wallAll}`);
