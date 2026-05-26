# Kryptós CronOS — Launch Legal & Business Formation Guide

**Classification:** Internal — Founder Reference  
**Date:** 2026-05-23  
**Status:** Incorporated ✅

> This document is operational guidance for the founder, not legal advice. Consult a startup attorney before filing and before signing any agreements with investors, employees, or contractors.

---

## ⚡ Immediate Next Actions

| Priority | Action | Deadline | Status |
|---|---|---|---|
| 1 | **Watch for EIN email** from Atlas/IRS — Mercury bank account opens automatically after receipt | Within 1–2 business days | ✅ Done |
| 2 | **Confirm 83(b) election filed** — Atlas files automatically but verify you receive confirmation; missing this deadline has permanent tax consequences | **June 22, 2026** | ⏳ Pending |
| 3 | **File Form DCS** at copyright.gov — assigns copyright registration to Bolotin Enterprises, Inc. (~$95) | Before June 22, 2026 | ⏳ Pending |
| 4 | **Set up Stripe** — create Pro products ($13.99/mo, $99/yr) and add 4 env vars to Vercel to activate payments | Before public launch | ⏳ Pending |

---

## Entity Details

| Field | Value |
|---|---|
| **Legal name** | Bolotin Enterprises, Inc. |
| **DBA / Trade name** | Kryptós CronOS |
| **Entity type** | Delaware C Corporation |
| **Incorporation date** | May 23, 2026 |
| **Incorporation service** | Stripe Atlas |
| **Principal address** | 215 Cardiff Place, Santa Cruz, CA 95060 |
| **Delaware registered office** | 131 Continental Dr, Suite 305, Newark, DE 19713 |
| **Registered agent** | Legalinc Corporate Services Inc. |
| **Authorized shares** | 10,000,000 Common Stock (par value $0.00001) |
| **Founder shares** | 9,000,000 (Jacob Bolotin) |
| **Representative** | Jacob Bolotin, Sole Incorporator |
| **Contact phone** | (917) 691-7264 |
| **Contact email** | hello@kryptoscronos.com |
| **EIN** | ✅ Received |
| **83(b) election deadline** | **June 22, 2026** — Atlas files automatically; confirm receipt |

---

## Overview

Before inviting outside testers, partners, or investors to interact with the platform, three things must be in place:

1. **Entity formed** — personal liability separated from the business
2. **IP protected** — code and curriculum content secured under copyright
3. **NDA gate live** — all demo access logged with legal agreement

---

## Step 1: Incorporate

### Recommended Structure: Delaware C-Corp

Delaware C-Corp is the standard for venture-backed startups. Investors expect it. Convertible notes and SAFEs are templated for Delaware. If you raise VC, you will almost certainly need to be a Delaware C-Corp.

**When to use a Wyoming LLC instead:** If you are certain you will stay bootstrapped or seek only debt financing (SBA loan, revenue-based financing), a Wyoming LLC is simpler, cheaper, and has no annual franchise tax complexity.

### Filing Services (Do This Online — No Attorney Needed for Filing)

| Service | Cost | Includes | Best For |
|---|---|---|---|
| **Stripe Atlas** | ~$500 | Delaware C-Corp, EIN, Mercury bank account, standard SAFE/equity docs | Fastest, most integrated |
| **Clerky** | ~$500 | Delaware C-Corp, cap table, standard docs | Best for eventual fundraising |
| **Firstbase.io** | ~$400 | Delaware C-Corp, registered agent (year 1), EIN filing | Budget-conscious |
| **Incorporate.com** | ~$300 | Filing only, no extras | DIY |

### After Filing — Checklist

- [ ] Receive Certificate of Incorporation from Delaware
- [ ] Get Federal EIN from IRS (irs.gov, free, ~10 min, instant for online)
- [ ] Open business bank account — **Mercury** (mercury.com) or **Relay** (relayfi.com) — both free, startup-friendly, work with Delaware C-Corps
- [ ] Issue founder shares to yourself (Stripe Atlas and Clerky handle this)
- [ ] Sign Proprietary Information and Invention Assignment (PIIA) agreement — assigns all IP you created to the company. Clerky and Stripe Atlas provide templates.
- [ ] File Statement of Information with Delaware within 90 days (~$50)

### Registered Agent

Required by Delaware. All filing services include the first year (~$100/yr after). Alternatives: Northwest Registered Agent (~$125/yr), Harvard Business Services (~$50/yr).

---

## Step 2: Protect Intellectual Property

### Copyright (Do This Immediately — $65)

All code, curriculum content, stage scenarios, and UI copy are **automatically protected by copyright** from the moment of creation under US law (17 U.S.C. § 102). You do not need to register to have copyright.

**Why register anyway:** Registration at copyright.gov enables:
- Statutory damages of $750–$30,000 per work (up to $150,000 for willful infringement) — without registration you can only recover actual damages, which are hard to prove
- Ability to sue in federal court
- Creates a public record

**How to register:**

1. Go to copyright.gov → Register a Claim → Log In / Create Account
2. Select **"Computer File"** as the type of work
3. Title: "Kryptós CronOS Platform" (or per-version if you prefer)
4. Upload a ZIP of your source code (you can redact trade secrets — register the first and last 25 pages of code if the full source is sensitive)
5. Pay $65 (online single application) or $45 (Standard Application, slightly more work)
6. Registration takes 6–9 months but **protection is retroactive to the filing date**

**Register separately:**
- The platform codebase (computer program)
- The curriculum content/scenarios (literary work) — significant original educational content is separately copyrightable

### Patent (Optional — Skip for Now)

Software patents are expensive ($15,000–$50,000+ attorney fees) and take 2–3 years. For a training platform, copyright + trade secrets provides strong enough protection at this stage.

**Provisional Patent Application** ($320 USPTO filing fee, no attorney required for provisional):
- Buys 12 months of **"Patent Pending"** status
- Does not grant patent rights — you must file a full non-provisional within 12 months
- Useful only if you have a novel technical method (e.g., the agentic curriculum engine or adaptive difficulty system might qualify)
- Recommended: file a provisional only after consulting a patent attorney who specializes in software

**Recommendation:** Skip patent for now. File copyright registration. Revisit patent after Series A when you can afford proper patent counsel.

### Trade Secrets

Trade secrets are protected by keeping them confidential. NDAs are your primary tool. Protect:
- The specific flag values and CTF stage solutions
- Proprietary curriculum design methodology
- Business relationships and pipeline

---

## Step 3: NDA Gate for Demo Access

### Why You Need This

Before sharing the live platform with anyone outside the founding team:
- **Legal protection:** Establishes that recipients acknowledged the platform is proprietary
- **Investor meetings:** NDAs protect the business model details you share
- **Beta testers:** Prevents early testers from sharing or copying curriculum content
- **Proof of disclosure date:** Redis-logged acceptance records timestamp when each person saw the platform

### NDA Gate Implementation (Live in App)

The platform includes a built-in NDA gate at `/demo`:

- Visitors see a 1-page NDA acceptance form (name + email + checkbox)
- Acceptance is stored in Redis: `nda:{email}` → `{ name, email, acceptedAt, ip }`
- An `nda_token` cookie is set (HMAC-signed) gating further access
- The admin dashboard at `/admin` shows all NDA signatories

**To invite someone:**
1. Share the link: `https://kryptoscronos.com/demo`
2. They must complete the NDA form before accessing the platform
3. Their acceptance is logged with timestamp and IP

### NDA Template Used

The NDA displayed in the `/demo` gate is based on the Bonterms Mutual NDA (bonterms.com) — a startup-community standard, attorney-reviewed, freely licensed. It covers:
- Confidential information definition
- Non-disclosure and non-use obligations
- 2-year term
- Governing law: Delaware

### DocuSign NDA (for Formal Invites)

The admin dashboard at `/admin` includes a **Send DocuSign NDA** form. Enter a name and email — the recipient receives a DocuSign email, signs electronically, and the signed status is logged in Redis and visible in the admin panel. This is the defensible option for testers, partners, and investors.

**Setup — one-time steps in DocuSign:**

1. Create a free DocuSign Developer account at developer.docusign.com
2. Create a new Integration Key (App): Developer Console → Apps and Keys → Add App and Integration Key
3. Under the Integration Key, add an RSA Keypair — DocuSign generates one. Copy the **private key** (you only see it once).
4. Add a Redirect URI: `https://kryptoscronos.com/oauth/callback` (placeholder, not actually used in JWT flow)
5. Note your **Integration Key (Client ID)**, **Account ID** (from upper-right menu → My Apps & Keys), and **User ID** (API Username from the same screen)
6. Grant consent for JWT impersonation: visit this URL (replace `{integrationKey}` and `{your-account-base-url}`):
   ```
   https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature%20impersonation&client_id={integrationKey}&redirect_uri=https://kryptoscronos.com/oauth/callback
   ```
   Log in and click Allow. You only do this once.

**Add these env vars in Vercel → Project → Settings → Environment Variables:**

```
DOCUSIGN_INTEGRATION_KEY    ← Integration Key (Client ID) from step 2
DOCUSIGN_USER_ID            ← API Username (User ID) from step 5
DOCUSIGN_ACCOUNT_ID         ← Account ID from step 5
DOCUSIGN_PRIVATE_KEY        ← RSA private key from step 3 (paste full PEM including headers)
DOCUSIGN_BASE_URL           ← https://demo.docusign.net  (sandbox) or https://na4.docusign.net (production)
DOCUSIGN_WEBHOOK_SECRET     ← Optional: set this to enable HMAC verification of webhook callbacks
```

For **production**, switch `DOCUSIGN_BASE_URL` to `https://na4.docusign.net` (or your account's region URL, found in DocuSign Admin → API and Keys).

---

## Step 4: Employment and Contractor Agreements

Before hiring anyone (employees or contractors):

- **Employees:** Standard offer letter + PIIA (Proprietary Information and Invention Assignment) + Non-Compete (if your state allows) + equity grant agreement
- **Contractors:** Independent Contractor Agreement + PIIA — ensures all work product is assigned to the company
- Templates: Clerky, Stripe Atlas, or **Bonterms** (bonterms.com)

---

## Step 5: Pre-Fundraise Checklist

Before sending pitch decks to investors:

- [x] Entity incorporated (Delaware C-Corp) ✅ **Bolotin Enterprises, Inc.** incorporated May 23, 2026
- [x] EIN obtained ✅ received from IRS via Atlas
- [x] Business bank account open ✅ Mercury opens automatically after EIN — check Mercury dashboard to confirm
- [x] Founder shares issued + PIIA signed ✅ 9,000,000 shares · 4-year vest · 1-year cliff · vesting start 2025-11-22 · double trigger
- [ ] 83(b) election filed ← Atlas files automatically · **deadline June 22, 2026** · watch for confirmation
- [x] Copyright registration filed ✅ (filed 2026-05-20 — U.S. Copyright Office, pending registration)
- [ ] NDA gate live on demo
- [ ] Privacy policy live on platform ✅ (already at /privacy)
- [ ] Cap table clean (just founder shares, no informal promises)
- [ ] SAFE note template ready (YC standard SAFE: ycombinator.com/documents)

---

## Key Resources

| Resource | URL | Purpose |
|---|---|---|
| Stripe Atlas | stripe.com/atlas | Incorporation + bank |
| Clerky | clerky.com | Incorporation + legal docs |
| copyright.gov | copyright.gov | Copyright registration |
| Bonterms | bonterms.com | Free NDA and contractor templates |
| NVCA | nvca.org | Investor-standard NDA |
| YC SAFE | ycombinator.com/documents | Seed funding instrument |
| Mercury | mercury.com | Business banking |
| USPTO | uspto.gov | Patent filing (if needed) |
| IRS EIN | irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online | Free EIN |

---

## Recommended Order of Operations

```
Week 1 (Before first external demo):
  1. Incorporate via Stripe Atlas or Clerky
  2. File copyright registration at copyright.gov
  3. NDA gate is already live at /demo — start using it

Week 2:
  4. Open business bank account (Mercury)
  5. Sign PIIA agreement (platform IP assigned to company)
  6. Prepare formal NDA (Bonterms Mutual) for investor meetings

Before fundraising:
  7. Issue founder shares (Stripe Atlas / Clerky handle this)
  8. Prepare YC SAFE template
  9. Engage startup attorney for cap table review (~$1,500–3,000 flat fee)
```

---

*Last updated: 2026-05-22*
