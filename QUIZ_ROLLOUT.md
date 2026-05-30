# Dual-Mode Quiz Rollout — Resume Checklist

**Goal:** every `challengeType: "ctf"` stage gets an 8-question MCQ `stage.quiz` so it becomes dual-mode (Quiz = half-clear, CTF = full-clear), exactly like first-journey. The dual-mode UI/machinery already exists — this is **pure content authoring**, no app code changes.

## Decisions (locked)
- **8 four-option MCQs per stage**, first-journey style. `correctIndex: 0` (correct answer first; the UI shuffles options at render).
- Question shape: `{ id, type, challenge, text, options:[4], correctIndex, explanation }`.
- Ground every quiz in the stage's real content + the existing fact bank in `src/data/ctf-quiz-data.json` (5 grounded facts per stage for ~150 stages).
- Quiz half-clear is cosmetic only (0 XP, no unlock) for non-audit epochs.

## Workflow (context-efficient — do NOT read whole data files)
1. `grep` the target file for `id: "..."`, `subtitle:`, `tagline:`, incident `title:`, and `^      scenario:` to get structure + anchors.
2. Pull grounding facts: `node -e "const d=require('./src/data/ctf-quiz-data.json'); ..."` for the epoch's stage keys.
3. Author the 12 quizzes into `app/scripts/quiz-data/<epoch>.json` as `{ "<stageId>": [ ...8 questions ] }`.
4. Inject: `node scripts/inject-quizzes.mjs scripts/quiz-data/<epoch>.json src/data/<file>.ts` (idempotent; skips stages that already have a quiz).
5. `npx tsc --noEmit --skipLibCheck` → verify 0 errors and quiz-block count.
6. Deploy checkpoint: `npx vercel --prod --yes --project kryptos-cronos`.

## Progress (203 CTF stages total)
- [x] first-journey / -2 / -3 — bt-01..bt-30 (30) — hand-authored, **live**
- [x] mitre — mitre-01..12 (12) — **live**
- [x] mitre-atlas — atlas-01..12 (12) — **live**
- [x] owasp-llm — llm-01..12 (12) — **live**
- [x] tech-audit-1 — audit-01..12 (12) — **live**
- [x] tech-audit-2 — audit-t01..t12 (12) — **live**
- [x] tech-audit-3 — audit-a01..a12 (12) — **live**
- [x] tech-audit-4 — audit-cm01..cm12 (12) — **live**
- [x] quantum-1 — quantum-01..10 (10) — **live**
- [x] quantum-2 — quantum-b01..b10 (10) — **live**
- [x] quantum-3 — quantum-c01..c10 (10) — **live**
- [x] quantum-4 — quantum-d01..d10 (10) — **live**
- [x] cisco-2 — stage-m13..m25 (13) — **live**
- [x] cisco-3 — stage-m26, m28, m30 (3) — **live**
- [x] cisco-4 — stage-m34, m36, m37 (3) — **live**
- [x] cisco-5 — stage-m39, m41, m42, m44, m46, m48, m50 (7) — **live**
- [x] umbrella — umbrella-01..10 (10) — **live**
- [x] stages.ts — ancient stage-01..12 + stage-m12 (13) — **live**

**Done: 203 / 203. ✅ ROLLOUT COMPLETE — every `challengeType: "ctf"` stage is now dual-mode.**

## Resume after a context reset (cold-start recipe)
Trust this file + the repo, not chat memory. To pick up exactly where it left off:

1. **Re-scan the true state** (which CTF stages still lack a quiz) from `app/`:
   ```bash
   node -e '
   const fs=require("fs");
   for(const f of fs.readdirSync("src/data").filter(x=>x.endsWith(".ts"))){
     const t=fs.readFileSync("src/data/"+f,"utf8"); const re=/\n {4}id:\s*"([^"]+)",/g; let m,need=[];
     const marks=[]; while((m=re.exec(t))) marks.push({id:m[1],idx:m.index});
     for(let i=0;i<marks.length;i++){const s=marks[i].idx,e=i+1<marks.length?marks[i+1].idx:t.length;const b=t.slice(s,e);
       if(/challengeType:\s*"ctf"/.test(b)&&!/\n {4}quiz:\s*\{/.test(b)) need.push(marks[i].id);}
     if(need.length) console.log(f, need.length, need.join(","));
   }'
   ```
2. Pick the next epoch from the list above. Author its 12 quizzes into `scripts/quiz-data/<epoch>.json` (8 MCQs/stage, grounded in `src/data/ctf-quiz-data.json` facts + the stage's incident).
3. `node scripts/inject-quizzes.mjs scripts/quiz-data/<epoch>.json src/data/<file>.ts`
4. `npx tsc --noEmit --skipLibCheck` (expect 0 errors)
5. `npx vercel --prod --yes --project kryptos-cronos`
6. Check the epoch's box above and commit/save this file.

The injection script is idempotent — re-running after a partial/uncertain state is safe (already-done stages are skipped).
