# Content Reformatting Rollout — Resume Checklist

**Goal:** break dense walls-of-text in **all three briefing sections — `overview`, `technical.body` (Technical Deep-Dive), and `incident.body` (Real-World Incident)** — into scannable **bulleted-with-dialogue** format. Approved by Jacob (style locked).

**Coloring (shipped in `RichText.tsx`):** `'single-quoted'` terms → amber pill; backtick `code` → cyan monospace pill. **Use sparingly** — backticks for real code/commands, and single quotes for at most a key term or two per section. Keep amber density LOW (match the Overview's restraint; don't quote every severity level, product name, or standard — that's too colorful). Jacob's note: "toned down colors like in the overview."

## How (renderer + format)
- `StageInfo.tsx` `RichBlock` already renders bullets: within a single block string, lines starting with `- ` / `•` / `*` become a `<ul>`; non-bullet lines stay prose. (No component change needed.)
- **Format:** a lead sentence (prose), then `\n- ` bullet lines, each carrying **a full sentence of real explanation** (not a terse phrase). Example pattern:
  `"Lead framing sentence:\n- First point — a sentence of dialogue.\n- Second point — a sentence of dialogue."`
- Condense, don't just bulletize verbose prose — the goal is *less* text that's *more* scannable. Preserve the substance (CVEs, incidents, mechanics).
- Edit the `overview:` array in each stage's data file; `npx tsc --noEmit --skipLibCheck`; deploy per epoch.

## Order (worst offenders first)
- [x] tech-audit-3 audit-a07 — **done (proof), live**
- [ ] tech-audit-3 (audit-a01..a12, rest)
- [ ] tech-audit-1 (audit-01..12)
- [ ] tech-audit-2 (audit-t01..t12)
- [ ] tech-audit-4 (audit-cm01..cm12)
- [ ] mitre / mitre-atlas / owasp-llm
- [ ] cisco-2..5, quantum-1..4, umbrella
- [ ] first-journey ×3, ancient (lighter — already fairly tight)

## Note
The **quiz rollout** (see `QUIZ_ROLLOUT.md`) is now **COMPLETE (203/203, v1.23.0)**. This content reformat is the remaining multi-turn grind; deploy at epoch checkpoints; trust the repo state over chat memory after any compaction.
