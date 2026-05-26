# Kryptós CronOS — Content IP & Third-Party Risk Audit
**Classification:** Internal — Founder / Legal Reference  
**Version:** 1.0  
**Date:** 2026-05-26  
**Prepared by:** Full codebase and curriculum audit

> This document is internal risk assessment, not legal advice. Review with startup counsel before fundraising or enterprise contracting.

---

## Verdict

**Overall IP and 3rd-party risk: LOW.**  
One medium-risk item requires action before monetization is activated (Vercel Hobby plan commercial use restriction). All content use is defensibly within educational fair use. All npm dependencies carry permissive open-source licenses. Attribution gaps exist for MITRE ATT&CK, MITRE ATLAS, and OWASP — low risk but should be addressed before public launch.

---

## Part 1 — Curriculum Content: Sources and Fair Use

### 1.1 Framework and Standard References

| Source | License / Status | Usage in Curriculum | Attribution Present | Risk |
|---|---|---|---|---|
| **MITRE ATT&CK®** | Apache 2.0 — attribution required | Threat framework stages, TTP references | In `references[]` arrays per stage | **LOW** — attribution in data; not surfaced in UI |
| **MITRE ATLAS** | CC BY 4.0 — attribution required | AI/ML adversarial attack stages | In `references[]` arrays per stage | **LOW** — same |
| **OWASP LLM Top 10** | CC BY-SA 3.0+ — attribution required | AI Security epoch (12 stages) | In `references[]` arrays per stage | **LOW** — same |
| **NIST SP 800-61** | US Gov't publication — public domain | Incident response stages, ISCM | In `references[]` arrays | **NONE** — public domain |
| **NIST SP 800-137** | US Gov't publication — public domain | Continuous monitoring stages | In `references[]` arrays | **NONE** — public domain |
| **CVE database** | MITRE / CISA — free use explicitly permitted | CVE IDs throughout Cisco and core epochs | Referenced by CVE number | **NONE** — explicitly free use |
| **NIST Cybersecurity Framework** | US Gov't publication — public domain | Various security framework stages | Cited where used | **NONE** |

**Action item:** Surface MITRE ATT&CK and OWASP attributions in the platform UI (footer or `/about` page). Required by Apache 2.0 and CC BY-SA. Suggested text:
- *"This platform references MITRE ATT&CK®, licensed under Apache 2.0."*
- *"This platform references the OWASP LLM Top 10, licensed under CC BY-SA 3.0."*
- *"This platform references MITRE ATLAS, licensed under CC BY 4.0."*

---

### 1.2 Real Incident References — Factual Use

The curriculum references real security incidents (Target 2013, Equifax 2017, WannaCry 2017, Colonial Pipeline 2021, etc.) by name, organization, date, and impact. This usage is:

1. **Factual** — CVE identifiers, breach dates, affected organizations, and damage figures are facts, not copyrightable expression.
2. **Educational** — the platform teaches defensive security concepts using real events as anchors. This is the same method used by SANS, ISC², CompTIA, and every accredited cybersecurity curriculum.
3. **Transformative** — the incidents are analyzed and reframed as learning scenarios, not reproduced from any source.
4. **Non-commercial (at current stage)** — until Pro subscriptions are active, there is no revenue from this use.

**Fair use analysis (17 U.S.C. § 107):**
- *Purpose and character:* Educational, transformative ✓
- *Nature of the work:* Factual (facts are not copyrightable) ✓
- *Amount used:* No verbatim reproduction of any copyrighted source text ✓
- *Market effect:* Zero — does not substitute for any original source ✓

**Verdict: Defensible fair use. No remediation required.**

---

### 1.3 Company Name Usage

The curriculum names real companies (Target, Equifax, Sony, Colonial Pipeline, Microsoft, Google, etc.) in the context of documented security incidents. This is:

- **Nominative fair use** — using a trademark to refer to the actual company, not to imply sponsorship or endorsement
- **Factual/journalistic** — the same usage appears in every cybersecurity certification course, textbook, and news article
- No claim is made that any company sponsors or endorses the platform

**Verdict: No trademark risk. No remediation required.**

---

### 1.4 Code Examples in CTF Stages

CTF stage `extraCommands` and `codeExample` blocks contain:
- Original terminal simulation logic (fully original ✓)
- Standard UNIX command syntax (not copyrightable ✓)
- Protocol-standard output formats (HTTP headers, DNS records, etc.) — functional/factual, not copyrightable ✓
- No substantial reproduction from any third-party codebase

**Verdict: Clean. No remediation required.**

---

## Part 2 — npm Dependency License Audit

| Package | Version | License | Notes |
|---|---|---|---|
| `next` | 16.2.6 | MIT | ✅ Permissive |
| `react` / `react-dom` | 19.2.4 | MIT | ✅ Permissive |
| `@upstash/redis` | 1.38.0 | MIT | ✅ Permissive |
| `@react-pdf/renderer` | 4.5.1 | MIT | ✅ Permissive |
| `react-markdown` | 10.x | MIT | ✅ Permissive |
| `remark-gfm` | 4.x | MIT | ✅ Permissive |
| `stripe` | 22.x | MIT | ✅ Permissive |
| `tailwindcss` | 4.x | MIT | ✅ Dev dep only |
| `typescript` | 5.x | Apache 2.0 | ✅ Dev dep only; not distributed |
| `eslint` / `eslint-config-next` | 9.x | MIT | ✅ Dev dep only |
| `playwright` | 1.60.0 | Apache 2.0 | ✅ Dev dep only |
| `@anthropic-ai/sdk` | 0.98.0 | MIT | ⚠️ Listed in `devDependencies` but used at runtime by `/api/hint`; move to `dependencies` |

**Action item:** Move `@anthropic-ai/sdk` from `devDependencies` to `dependencies` in `package.json`. Vercel bundles server imports regardless of dep type, so ARIA currently works — but this is technically incorrect and could break under stricter build tools.

**No GPL, LGPL, AGPL, or copyleft dependencies are present.** There are no license compatibility concerns.

---

## Part 3 — Third-Party Service Risk

### 3.1 Vercel
**Plan:** Hobby (free)  
**ToS:** Hobby plan is for personal, non-commercial projects. Commercial use requires Pro ($20/month).  
**Risk:** **MEDIUM** — activating Stripe payments (Pro subscriptions) while on the Hobby plan likely violates Vercel ToS.  
**Remediation:** Upgrade to Vercel Pro **before** the Stripe webhook goes live and first payment is accepted. Pro adds team members, higher build minutes, and removes the commercial use restriction. Budget: $20/month.

---

### 3.2 Upstash Redis
**Plan:** Free tier  
**ToS:** Free tier allows commercial use.  
**Data stored:** Usernames, hashed passwords (PBKDF2-SHA-256), email addresses, XP/progress, leaderboard rankings, NDA records, session/reset tokens.  
**GDPR:** Upstash is a US company. For EU users, the `/privacy` policy should disclose Upstash as a data subprocessor. Upstash offers Data Processing Agreements on request.  
**Risk:** LOW — ToS compliant. GDPR exposure is low until EU user volume grows.  
**Remediation:** Add Upstash to the privacy policy's subprocessor list (trivial edit to `/privacy`).

---

### 3.3 Resend
**Plan:** Free tier  
**ToS:** Transactional email is explicitly permitted on all plans.  
**Usage:** Welcome emails, stage completion emails, password reset, registration notifications.  
**Risk:** LOW — all emails are transactional (triggered by user action), not marketing. No unsolicited email.  
**Note:** The rate limiting on `/api/notify-registration` and `/api/forgot-password` prevents abuse that could get the sending domain flagged.

---

### 3.4 Anthropic (ARIA AI Tutor)
**Plan:** API key, pay-per-token  
**ToS:** Educational and training applications are permitted. No prohibited use categories apply.  
**Usage:** Socratic coaching, stage-aware hints, `/api/hint` only. All calls are server-side.  
**Controls in place:** 15 requests/IP/15min rate limit; 10-message session cap; 30-second cooldown; Haiku model (lowest cost tier).  
**PII in prompts:** Stage context and user question only — no PII (email, password, real name) is sent to Anthropic.  
**Risk:** LOW — standard educational API use, responsible rate limiting in place.  
**Package note:** `@anthropic-ai/sdk` is in `devDependencies` — move to `dependencies` (see Part 2).

---

### 3.5 DocuSign
**Plan:** Developer tier (free)  
**ToS:** Developer tier is for testing only, not production use.  
**Usage:** Admin-initiated NDA envelopes; signer status tracking via webhook.  
**Risk:** **LOW-MEDIUM** — developer tier is appropriate for current NDA volume (pre-launch). Must upgrade to a paid plan before NDA flow is used in production for real legal agreements.  
**Remediation:** Upgrade to DocuSign eSignature Standard (~$45/month) when platform exits demo/beta. The webhook and JWT implementation is production-grade and requires no code changes on upgrade.

---

### 3.6 Stripe
**Plan:** Pay-per-transaction (2.9% + $0.30 per charge)  
**ToS:** Educational SaaS is permitted.  
**Implementation:** Webhook signature verification (`constructEvent`) is implemented ✓. `checkout.session.completed` sets Pro tier server-side ✓. `customer.subscription.deleted` reverts to free ✓.  
**Risk:** LOW — standard implementation, no ToS concerns.

---

### 3.7 GitHub
**Plan:** Free  
**ToS:** Private repos and CI Actions are permitted on free tier.  
**CI budget:** 2,000 Actions minutes/month free. Current CI workflow (lint + tsc + build + audit) runs approximately 3–5 minutes per push.  
**Risk:** LOW — well within free tier limits at current commit volume.

---

## Part 4 — Attribution Remediation Plan

Three attribution items require UI-level action before public launch:

| Item | Requirement | Suggested Location | Effort |
|---|---|---|---|
| MITRE ATT&CK® | Apache 2.0 — attribution required | Footer or `/about` page | 10 min |
| OWASP LLM Top 10 | CC BY-SA 3.0 — attribution required | Footer or `/about` page | 10 min |
| MITRE ATLAS | CC BY 4.0 — attribution required | Footer or `/about` page | 10 min |

Suggested footer text (covers all three):
> *Curriculum references MITRE ATT&CK® (Apache 2.0), MITRE ATLAS (CC BY 4.0), and OWASP LLM Top 10 (CC BY-SA 3.0). CVE identifiers used under MITRE CVE program terms. NIST publications are US government works in the public domain.*

Stage-level `references[]` arrays already link to source documents for each stage — this is defensible good practice regardless of license requirements.

---

## Part 5 — Risk Summary

| Risk | Severity | Status | Remediation |
|---|---|---|---|
| Vercel Hobby plan — commercial use | **MEDIUM** | ⚠️ Open | Upgrade to Pro before Stripe goes live |
| `@anthropic-ai/sdk` in devDependencies | Low | ⚠️ Open | Move to dependencies |
| MITRE ATT&CK UI attribution | Low | ⚠️ Open | Add to footer before public launch |
| OWASP LLM Top 10 UI attribution | Low | ⚠️ Open | Add to footer before public launch |
| MITRE ATLAS UI attribution | Low | ⚠️ Open | Add to footer before public launch |
| Upstash subprocessor disclosure | Low | ⚠️ Open | Add to /privacy page |
| DocuSign developer tier (pre-production) | Low | ⚠️ Acceptable | Upgrade when NDA volume starts |
| Curriculum content copyright | None | ✅ Clean | Factual / fair use — no action needed |
| Company name / trademark usage | None | ✅ Clean | Nominative fair use — no action needed |
| npm dependency licenses | None | ✅ Clean | All MIT or Apache 2.0 |
| Stripe ToS compliance | None | ✅ Clean | Standard SaaS use |
| Resend ToS compliance | None | ✅ Clean | Transactional email only |
| Anthropic ToS compliance | None | ✅ Clean | Educational API use within terms |

---

*Last updated: 2026-05-26*
