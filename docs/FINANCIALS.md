# Kryptós CronOS — Company Financials
**Entity:** Bolotin Enterprises, Inc. (Delaware C-Corp)  
**EIN:** ✅ Received  
**Founded:** May 23, 2026  
**Last updated:** 2026-05-28

---

## Capital Deployed to Date

Everything spent since founding through May 28, 2026.

| Date | Item | Category | Amount | Type |
|---|---|---|---|---|
| 2026-05-23 | Stripe Atlas incorporation (Delaware C-Corp, EIN, Mercury setup, founder docs) | Legal / Formation | $500.00 | One-time |
| 2026-05-20 | U.S. Copyright registration — "Kryptós CronOS Platform" (copyright.gov) | Legal / IP | $65.00 | One-time |
| ~2026-05 | Anthropic API — used to generate travel/language curriculum content | R&D / Content | $25.00 | One-time |
| 2026-05 | Cloudflare — kryptoscronos.com domain registration (annual) | Infrastructure | $10.00 | Annual |
| 2026-05 | Claude Code MAX subscription — AI-assisted development tool | R&D / Tooling | $200.00 | Monthly |

**Total deployed to date: ~$800**

> **Mercury bank account:** Not yet open. Open immediately at mercury.com — free, no minimums. Required before any revenue can be received and before bookkeeping can begin.

---

## Monthly Run Rate (Current)

What the company spends every month right now, as of May 2026.

| Service | Role | Cost | Notes |
|---|---|---|---|
| Claude Code MAX | AI dev tool — primary development environment | $200.00 | R&D expense. Billed to personal card until Mercury is open. |
| Vercel | Hosting, CDN, serverless | $0 | Hobby plan. **Upgrade trigger:** first hire or commercial SLA needed → Pro at $20/mo |
| Upstash Redis | Database (progress, leaderboard, users) | $0 | Free tier. **Upgrade trigger:** >10,000 Redis commands/day → pay-as-you-go |
| Resend | Transactional email | $0 | Free (3,000 emails/mo). **Upgrade trigger:** >2,500 emails/mo → Pro at $20/mo |
| Anthropic API (production) | ARIA chatbot (Claude Haiku, rate-limited) | ~$0–5 | Pay-per-token. Rate limiting keeps this near-zero at current traffic. |
| GitHub | Source control + CI | $0 | Free |
| DocuSign | NDA eSignature (developer tier) | $0 | **Upgrade trigger:** production investor/partner NDA volume → Business at ~$25/mo |
| Stripe | Payment processing | $0* | No monthly fee. *2.9% + $0.30 per transaction once revenue begins. |
| Cloudflare | Domain + email routing | ~$0.83 | $10/year amortized. Email routing is free. |

**Current monthly burn: ~$200–205**

---

## Annual Obligations

Fixed annual costs — plan for these in the budget regardless of revenue.

| Item | Amount | Due | Notes |
|---|---|---|---|
| Cloudflare domain renewal | $10 | May 2027 | kryptoscronos.com |
| Delaware franchise tax | ~$450 | **March 1, 2027** | Minimum annual franchise tax for a Delaware C-Corp (~$400 tax + $50 annual report fee). Based on minimum "assumed par value capital" method. **You were not aware of this — add it to your calendar now.** Failure to pay accrues 1.5%/month interest + $200 penalty. File at corp.delaware.gov |
| Registered agent renewal (Legalinc) | ~$100–150 | May 2027 | First year included in Atlas $500. Renewal billed by Legalinc annually. |
| Claude Code MAX (annualized) | $2,400 | Monthly | $200 × 12 |

**Annual fixed obligations: ~$3,010–3,060**

---

## Revenue Model

### Pricing (live)

| Product | Price | Stripe Price ID |
|---|---|---|
| Pro — Monthly | $13.99/mo | `STRIPE_PRO_MONTHLY_PRICE_ID` |
| Pro — Annual | $99/yr ($8.25/mo) | `STRIPE_PRO_YEARLY_PRICE_ID` |
| Enterprise | $8/seat/mo | Not yet live |

### Transaction Costs (Stripe)

Every payment incurs: **2.9% + $0.30**

| Product | Gross | Stripe fee | Net revenue |
|---|---|---|---|
| Pro Monthly | $13.99 | $0.71 | $13.28 |
| Pro Annual | $99.00 | $3.17 | $95.83 |

### Break-Even Analysis

At current burn of ~$205/month:

| Metric | Monthly | Annual |
|---|---|---|
| Monthly subscribers needed to break even | **16** | — |
| Annual subscribers needed to break even | — | **3** |
| Monthly subscribers for $10K MRR | 753 | — |
| Monthly subscribers for $50K MRR | 3,764 | — |

---

## P&L Category Structure

Use these categories consistently in bookkeeping (Wave / QuickBooks / Mercury).

### Revenue
| Category | Source |
|---|---|
| Subscription — Monthly | Stripe checkout, $13.99/mo |
| Subscription — Annual | Stripe checkout, $99/yr |
| Enterprise — Seat License | B2B contracts, $8/seat/mo |
| Sponsor Revenue | CrowdStrike, Cisco, SentinelOne (planned) |

### Cost of Revenue (COGS)
Costs that scale directly with users and usage.

| Item | Driver |
|---|---|
| Stripe transaction fees (2.9% + $0.30) | Per payment |
| Anthropic API — production ARIA usage | Per hint request |
| Upstash — Redis command overage | Per user / per request |
| Resend — email overage (>3,000/mo) | Per email sent |
| Supabase — auth overage (>50k MAU) | Per monthly active user |

### Operating Expenses

**R&D (Research & Development)**
| Item | Current Cost |
|---|---|
| Claude Code MAX subscription | $200/mo |
| Anthropic API — content generation (one-time) | $25 (done) |
| Future: contractors, curriculum writers | TBD |

**G&A (General & Administrative)**
| Item | Current Cost |
|---|---|
| Vercel hosting | $0 → $20/mo |
| GitHub | $0 |
| Cloudflare domain | $0.83/mo |
| Delaware franchise tax | ~$37.50/mo amortized |
| Registered agent | ~$10/mo amortized |
| Bookkeeping software (Wave) | $0 (recommended) |
| Business banking (Mercury) | $0 |

**Legal & Compliance (one-time / irregular)**
| Item | Amount | Status |
|---|---|---|
| Stripe Atlas incorporation | $500 | ✅ Paid |
| Copyright registration | $65 | ✅ Paid |
| Pre-fundraise cap table / attorney review | ~$1,500–3,000 | Recommended before seed round |
| 83(b) election filing | $0 | ⏳ Deadline June 22, 2026 — Atlas files automatically, confirm receipt |

---

## Unit Economics (Per Paying User)

What one Pro subscriber is worth and what they cost.

### Monthly subscriber ($13.99/mo)

| Item | Amount |
|---|---|
| Gross revenue | $13.99 |
| Stripe fee | −$0.71 |
| **Net revenue** | **$13.28** |
| Anthropic ARIA (est. 20 hints/mo × $0.001) | −$0.02 |
| Upstash amortized | −$0.01 |
| **Gross margin per user** | **~$13.25 (~95%)** |

### Annual subscriber ($99/yr = $8.25/mo effective)

| Item | Amount |
|---|---|
| Gross revenue | $99.00 |
| Stripe fee | −$3.17 |
| **Net revenue** | **$95.83** |
| Anthropic ARIA (est. 240 hints/yr × $0.001) | −$0.24 |
| **Gross margin per user** | **~$95.59 (~97%)** |

> **Gross margins of 95%+ are exceptional.** This is the standard SaaS software advantage — infrastructure cost per user is near-zero at current scale. Protect this by keeping COGS items rate-limited and capped.

---

## Cost Projections at Scale

How monthly costs grow as the user base grows. Current burn is the baseline.

| Users (MAU) | Vercel | Upstash | Resend | Anthropic API | Supabase | Stripe fees* | Total Infra/mo |
|---|---|---|---|---|---|---|---|
| 0–500 (now) | $0 | $0 | $0 | ~$5 | $0 | — | ~$5 |
| 500–2,000 | $20 | $0–10 | $0 | ~$20 | $0 | ~$50 | ~$90 |
| 2,000–10,000 | $20 | $10–30 | $20 | ~$80 | $0 | ~$300 | ~$430 |
| 10,000–50,000 | $20 | $30–100 | $40 | ~$300 | $0 | ~$1,500 | ~$1,860 |
| 50,000+ | $20+ | $100+ | $40+ | ~$500+ | $25 | ~$7,500+ | ~$8,185+ |

*Stripe fees estimated at 5% monthly-to-annual mix, 10% conversion rate of MAU.

> At 50,000 MAU with 10% conversion (5,000 paying users), estimated MRR: **~$66,000**. Infra cost: ~$8,200. Gross margin: ~88%.

---

## Services — Current vs. Recommended

### Already using (free or paid)

| Service | Plan | Monthly Cost | Action |
|---|---|---|---|
| Vercel | Hobby (free) | $0 | Upgrade to Pro ($20/mo) when first hire joins |
| Upstash Redis | Free | $0 | Monitor; upgrade pay-as-you-go at 10k commands/day |
| Resend | Free | $0 | Upgrade to Pro ($20/mo) before 2,500 emails/mo |
| GitHub | Free | $0 | Keep free |
| Anthropic API (production) | Pay-per-token | ~$5 | Monitor; rate limits protect cost |
| Claude Code MAX | Paid | $200 | R&D expense; keep |
| DocuSign | Developer (free) | $0 | Upgrade to Business (~$25/mo) before investor NDA volume |
| Stripe | Free + 2.9%+$0.30 | $0* | Already integrated; no action needed |
| Cloudflare | Domain only | $0.83 | Keep; consider Cloudflare WAF at scale |

### Recommended to add

| Service | Cost | Why | Priority |
|---|---|---|---|
| **Mercury** (mercury.com) | Free | Business banking — required for expense tracking, payroll, investor wire. Open immediately. | 🔴 Immediate |
| **Wave Accounting** (waveapps.com) | Free | Bookkeeping — connect Mercury, track all expenses by P&L category, generate financial statements for investors. Free forever for small business. | 🔴 Immediate |
| **Supabase** (supabase.com) | Free → $25/mo | Auth migration in progress. Free up to 50k MAU. | 🟡 In progress |
| **Stripe Tax** | 0.5% of transactions | Automatic sales tax calculation and filing. Required for compliance once revenue reaches ~$10K/mo or you have users in multiple states. | 🟡 Before $10K MRR |
| **Vercel Pro** | $20/mo | Team access, 1TB bandwidth, priority support. Needed when first hire joins. | 🟡 Before first hire |
| **Resend Pro** | $20/mo | 50,000 emails/month vs. 3,000 free. Stage completion emails will hit this fast with an active user base. | 🟡 At 100+ active users |

### Not needed yet

| Service | Why not yet |
|---|---|
| DocuSign paid plan | Developer tier (1,000 envelopes/mo) is more than enough for current NDA volume |
| AWS / GCP | Vercel handles all infrastructure needs |
| Salesforce / HubSpot CRM | Manual pipeline management is fine pre-seed |
| Payroll (Gusto, Rippling) | No employees yet; needed at first hire |
| Patent filing | Deferred until Series A per legal doc |
| Accountant / CPA | Recommended before first investor check; ~$500–1,500 for year-end tax prep |

---

## Financial Controls Checklist

Steps to establish proper financial hygiene before investor due diligence.

- [ ] **Open Mercury bank account** — mercury.com. Free. Use this as the company's sole operating account.
- [ ] **Move recurring expenses to company card** — Claude Code MAX and any future subscriptions should bill to the Mercury card, not a personal card.
- [ ] **Set up Wave Accounting** — connect Mercury, create expense categories matching the P&L structure above. Log the $800 already spent retroactively.
- [ ] **Add Delaware franchise tax to calendar** — March 1, 2027. ~$450. Pay at corp.delaware.gov. Missing this triggers interest + penalties.
- [ ] **Confirm 83(b) election filed** — deadline June 22, 2026. Atlas files automatically — watch for confirmation email or check with Atlas support.
- [ ] **Verify registered agent is active** — Legalinc via Atlas. Renewal due May 2027.
- [ ] **Set up Stripe revenue tracking** — connect Stripe to Wave when first payment comes in.
- [ ] **Keep receipts for all formation costs** — Stripe Atlas $500, copyright $65, API usage $25 are all deductible business formation expenses.

---

## Open Compliance Items

| Item | Deadline | Status | Notes |
|---|---|---|---|
| 83(b) election | **June 22, 2026** | ⏳ Atlas filing pending | Confirm receipt of confirmation from Atlas. Missing this has permanent tax consequences on founder equity. |
| Delaware franchise tax | March 1, 2027 | ⏳ Plan for | ~$450 minimum. First payment for tax year 2026. |
| Delaware annual report | March 1, 2027 | ⏳ Plan for | $50 fee, filed at same time as franchise tax. |
| Registered agent renewal | May 2027 | ⏳ Plan for | ~$100–150/yr via Legalinc. |
| Copyright registration (pending) | — | ⏳ In progress | Filed 2026-05-20. Processing takes 6–9 months. Protection is retroactive to filing date. |
| Business bank account | Immediate | 🔴 Not done | Mercury. Required for financial separation and investor due diligence. |
| Bookkeeping setup | Immediate | 🔴 Not done | Wave. Required before revenue begins. |
| Pre-fundraise attorney review | Before seed round | ⏳ Plan for | Cap table, SAFE terms, employment agreements. ~$1,500–3,000. |
