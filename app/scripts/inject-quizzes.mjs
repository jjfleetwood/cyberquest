// inject-quizzes.mjs — splice 8-MCQ stage.quiz blocks into stage data files
// WITHOUT reading whole files through the Edit tool (Bash writes have no read-gate),
// which is the dominant context cost when batch-editing many large data files.
//
// Usage:
//   node scripts/inject-quizzes.mjs <quiz-data.json> [targetFile.ts ...]
//
// quiz-data.json shape:  { "<stageId>": [ { id,type,challenge,text,options,correctIndex,explanation }, ... ], ... }
// If no target files are given, every src/data/*.ts is searched for each stage id.
//
// Behavior: for each stageId, find the stage-level `id: "<id>",` line, then insert a
// `quiz: { questions: [...] }` block immediately before that stage's `ctf: {`.
// Idempotent: a stage that already has a quiz before its ctf is skipped.

import fs from "fs";
import path from "path";

const [, , dataPath, ...targetArgs] = process.argv;
if (!dataPath) {
  console.error("usage: node scripts/inject-quizzes.mjs <quiz-data.json> [target.ts ...]");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const esc = (s) => JSON.stringify(s); // safe TS string literal (handles quotes, unicode, em-dash)

function serializeQuestion(q) {
  return `        { id: ${esc(q.id)}, type: ${esc(q.type)}, challenge: ${esc(q.challenge)}, ` +
    `text: ${esc(q.text)}, options: ${JSON.stringify(q.options)}, ` +
    `correctIndex: ${q.correctIndex}, explanation: ${esc(q.explanation)} },`;
}

function buildBlock(questions) {
  return `    quiz: {\n      questions: [\n${questions.map(serializeQuestion).join("\n")}\n      ],\n    },\n`;
}

const dataDir = "src/data";
const targets = targetArgs.length
  ? targetArgs
  : fs.readdirSync(dataDir).filter((f) => f.endsWith(".ts")).map((f) => path.join(dataDir, f));

let inserted = 0, skipped = 0;
const missing = [];

for (const [stageId, questions] of Object.entries(data)) {
  if (!Array.isArray(questions) || questions.length === 0) continue;
  let done = false;
  for (const file of targets) {
    let txt = fs.readFileSync(file, "utf8");
    const idRe = new RegExp(`\\n    id: "${stageId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}",`);
    const m = idRe.exec(txt);
    if (!m) continue;

    const after = txt.slice(m.index);
    const ctfRel = after.search(/\n    ctf: \{/);
    const nextIdRel = after.slice(1).search(/\n    id: "/); // next stage start (excluding current)
    if (ctfRel === -1) { console.error(`! ${stageId}: no ctf block found`); done = true; break; }
    if (nextIdRel !== -1 && ctfRel > nextIdRel + 1) { console.error(`! ${stageId}: ctf is outside this stage`); done = true; break; }

    const stageHead = after.slice(0, ctfRel);
    if (/\n    quiz: \{/.test(stageHead)) { skipped++; done = true; break; }

    const insertAt = m.index + ctfRel + 1; // start of the "    ctf: {" line
    txt = txt.slice(0, insertAt) + buildBlock(questions) + txt.slice(insertAt);
    fs.writeFileSync(file, txt);
    inserted++; done = true; break;
  }
  if (!done) missing.push(stageId);
}

console.log(`inserted=${inserted}  skipped(existing)=${skipped}  missing=${missing.length}`);
if (missing.length) console.log("missing:", missing.join(", "));
