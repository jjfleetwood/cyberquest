# Content Reformatting Rollout — Resume Checklist

**Goal:** break dense walls-of-text in **all three briefing sections — `overview`, `technical.body` (Technical Deep-Dive), and `incident.body` (Real-World Incident)** — into scannable **bulleted-with-dialogue** format. Approved by Jacob (style locked).

**Status:** 8 stages reformatted platform-wide (see scanner). The grind is in-scope **security / tech-audit / AI epochs + first-journey + ancient** (~250 stages). Extended curriculum (baseball, driving, french/italian, paris/milan, nails, hair, tapestry — ~210 stages) is **OUT OF SCOPE** unless Jacob says otherwise. **Quiz rollout is DONE (203/203, v1.23.0)** — this is the remaining grind.

## Coloring (shipped in `RichText.tsx` — do NOT re-edit the component)
- `'single-quoted'` terms → amber pill; backtick `code` → cyan monospace pill.
- **Use sparingly.** Backticks for real code/commands only; single quotes for at most a key term or two per section. Keep amber density LOW — match the Overview's restraint. Jacob: "toned down colors like in the overview." Don't quote every severity level, product name, or standard.

## Format (the renderer already supports it — no component change)
- `StageInfo.tsx` `RichBlock` renders bullets: within a single block string, lines starting with `- ` / `•` / `*` become a `<ul>`; non-bullet lines stay prose.
- **Pattern:** a lead framing sentence (prose), then `\n- ` bullet lines, each carrying **a full sentence of real explanation** (not a terse phrase):
  `"Lead framing sentence:\n- First point — a full sentence of dialogue.\n- Second point — a full sentence of dialogue."`
- **Condense, don't just bulletize** — the goal is *less* text that's *more* scannable. Preserve the substance (CVEs, incidents, mechanics, attribution).
- **Canonical reference example: `tech-audit-3.ts` → `audit-a07`** (overview + technical.body + incident.body all done correctly). Copy its rhythm.

## Workflow (per epoch)
1. `node scripts/scan-reformat.mjs <file>.ts` → see which stages are still `wall`.
2. Open the data file; for each wall stage, reformat the `overview`, `technical.body`, and `incident.body` string arrays into lead-sentence + `\n- ` bullets. **Edit strings in place — do not touch ids, xp, codeExample, diagram, timeline, keyTakeaways, references.**
3. `npx tsc --noEmit --skipLibCheck` → expect 0 errors.
4. Re-run `node scripts/scan-reformat.mjs <file>.ts` → confirm stages flipped to DONE.
5. Deploy checkpoint: `npx vercel --prod --yes --project kryptos-cronos`.
6. Tick the epoch below and commit this file.

## Progress detector
`node scripts/scan-reformat.mjs` (no arg = summary; `<file>.ts` = per-stage detail). A stage counts as DONE at ≥3 `\n- ` bullet sequences across its three briefing sections. **Heuristic only — this checklist is the source of truth.** Trust the repo, not chat memory, after any compaction.

## Order (worst offenders first) — IN SCOPE
- [~] tech-audit-3 — audit-a01 ✅, audit-a07 ✅ done; **remaining: a02,a03,a04,a05,a06,a08,a09,a10,a11,a12** (10)
- [ ] tech-audit-1 — audit-01..12 (12)
- [ ] tech-audit-2 — audit-t01..t12 (12)
- [ ] tech-audit-4 — audit-cm01..cm12 (12)
- [ ] mitre — mitre-01..12 (12)
- [ ] mitre-atlas — atlas-01..12 (12)
- [ ] owasp-llm — llm-09 ✅; remaining llm-01..08, llm-10..12 (11)
- [ ] quantum-1 — quantum-01..10 (10)
- [ ] quantum-2 — quantum-b01..b10 (10)
- [ ] quantum-3 — quantum-c01..c10 (10)
- [ ] quantum-4 — quantum-d01..d10 (10)
- [ ] emerging-tech — emerging-01..10 (10)
- [ ] cisco-2 — stage-m13..m25 (13)
- [ ] cisco-3 — stage-m26..m33 (8)
- [ ] cisco-4 — stage-m34..m38 (5)
- [ ] cisco-5 — stage-m39..m50 (12)
- [ ] umbrella — umbrella-01..10 (10)
- [ ] stages.ts (ancient) — stage-m01..m05 ✅; remaining stage-01..12 + stage-m06..m12 (19)
- [ ] first-journey ×3 — bt-01..30 (30) — adult-beginner tone; lighter, already fairly tight

## OUT OF SCOPE (do not touch unless Jacob asks)
baseball-1..7, driving-1..3, french-basics, italian-basics, paris, milan, nails, hair-color, hair-styling, tapestry.

## Cold-start recipe (after a context reset)
1. From `app/`: `node scripts/scan-reformat.mjs` to see live state.
2. Pick the next unchecked epoch from the IN-SCOPE order above.
3. Reformat its wall stages following `audit-a07` as the model + the coloring rules.
4. `npx tsc --noEmit --skipLibCheck` → `npx vercel --prod --yes --project kryptos-cronos`.
5. Tick the epoch, commit `CONTENT_REFORMAT.md` + the data file.
