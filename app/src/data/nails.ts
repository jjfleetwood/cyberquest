import type { StageConfig, EpochConfig } from "./types";

export const nailsEpoch: EpochConfig = {
  id: "nails",
  name: "Nail Arts",
  subtitle: "The Professional Nail Studio",
  description: "Master professional nail technique from the ground up — prep, the no-water rule, even polish application, troubleshooting lifting and chipping, and the business of running your own nail operation. Real skills, real results.",
  emoji: "💅",
  color: "pink",
  unlocked: true,
};

export const nailsStages: StageConfig[] = [
  // ─── nails-01: Nail Anatomy & Prep Basics ────────────────────────────────────
  {
    epochId: "nails",
    wonder: { name: "Nail Manufacturers Council Expo", location: "Las Vegas, Nevada", era: "Modern", emoji: "💅" },
    id: "nails-01",
    order: 1,
    title: "Know Your Canvas",
    subtitle: "Nail anatomy and the foundation of every great manicure",
    category: "arts",
    xp: 100,
    badge: { id: "nails-badge-01", name: "Nail Apprentice", emoji: "💅" },
    challengeType: "quiz",
    info: {
      tagline: "Every flawless manicure starts long before the first drop of polish.",
      year: 1998,
      overview: [
        "The nail is not just a hard surface to paint — it is a living structure made of keratin, the same protein that forms hair. The nail plate (the hard part you see and paint) sits on top of the nail bed (the pink tissue underneath). The free edge is the part that extends past the fingertip. The lunula is the pale half-moon at the base, marking where the nail plate forms. The cuticle is a thin layer of dead skin that migrates from the proximal nail fold onto the nail plate — and it is one of the first things a professional nail tech learns to manage.",
        "Prep is not optional — it is the entire foundation of a lasting manicure. Even the most expensive polish will lift, chip, or bubble within days on an improperly prepped nail. The nail plate is naturally coated with oils and moisture, both of which prevent polish from bonding. Before any product goes on, those oils must be removed, the surface must be lightly textured, and the nail must be shaped correctly.",
        "The correct prep sequence is: remove old polish → trim and shape → push back and remove cuticles → lightly buff the nail plate → cleanse with a prep wipe → apply dehydrator → apply primer (optional but recommended) → apply product. Skipping or reversing steps creates problems no amount of top coat can fix.",
      ],
      technical: {
        title: "Nail Anatomy Quick Reference",
        body: [
          "The nail grows from the matrix — tissue hidden under the proximal nail fold. Anything that damages the matrix (aggressive drilling, deep cuts near the base) can permanently alter nail growth. This is why nail techs work carefully around the base of every nail.",
          "The cuticle and the eponychium are different things. The cuticle is dead tissue that has migrated onto the nail plate and should be removed. The eponychium is the living skin at the base of the nail — it should never be cut, only gently pushed back. Cutting living skin creates micro-wounds that invite infection and are a liability in a professional setting.",
        ],
        codeExample: {
          label: "Nail anatomy diagram",
          code: `  ┌────────────────────────────────────┐
  │  FREE EDGE (extends past fingertip) │
  ├────────────────────────────────────┤
  │                                    │
  │          NAIL PLATE                │
  │       (the hard surface)           │
  │                                    │
  │  ◐  LUNULA (pale half-moon)        │
  ├────────────────────────────────────┤
  │ CUTICLE  → dead skin on nail plate │
  │ EPONYCHIUM → living skin (don't cut)│
  └────────────────────────────────────┘`,
        },
      },
      incident: {
        title: "How One Prep Step Changed the Nail Industry",
        when: "Late 1990s — gel and acrylic nail boom",
        where: "Professional nail salons, United States",
        impact: "Adding a dehydration step before product application improved service longevity by over 60% in independent salon trials.",
        body: [
          "In the late 1990s, as gel and acrylic services exploded in popularity, salons struggled with rampant lifting and breakage. The problem wasn't the product — it was prep. CND (Creative Nail Design) demonstrated that the nail plate's natural oil content was the single biggest predictor of product failure. Adding a dedicated dehydration step before product application transformed salon results.",
          "This insight changed nail education permanently. Product companies began shipping dehydrators and primers in starter kits. Today, skipping prep is considered unprofessional — but the reason is rooted in real science the industry learned through thousands of failed manicures.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Nail Plate", sub: "keratin — the canvas", type: "system" },
          { label: "Natural Oils", sub: "the adhesion enemy", type: "attacker" },
          { label: "Prep Routine", sub: "removes oils, adds texture", type: "victim" },
          { label: "Polish Bonds", sub: "lasting manicure achieved", type: "result" },
        ],
      },
      timeline: [
        { year: 1920, event: "First commercial nail polish launched" },
        { year: 1978, event: "Acrylic nail systems introduced to professional salons" },
        { year: 1990, event: "UV gel nail systems begin entering US salons" },
        { year: 1998, event: "CND dehydration research transforms prep standards industry-wide", highlight: true },
        { year: 2012, event: "Soak-off gel polish overtakes traditional polish in salon revenue" },
        { year: 2023, event: "BIAB and builder gel systems renew focus on thorough nail prep" },
      ],
      keyTakeaways: [
        "The cuticle is dead skin on the nail plate — the eponychium is living skin and must not be cut",
        "Prep is not optional — it is the single biggest factor in polish longevity",
        "Always remove old polish completely before beginning any prep steps",
        "The nail matrix grows the nail — protect it by never drilling or cutting aggressively near the base",
      ],
      references: [
        { title: "NAILS Magazine: Nail Anatomy Guide", url: "https://www.nailsmag.com" },
        { title: "CND Education Hub", url: "https://www.cnd.com/education" },
        { title: "Milady Standard Nail Technology", url: "https://www.milady.cengage.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "nails-01-q1",
          type: "Nail Science",
          challenge: `  Identify the parts of this nail diagram:

  ┌─────────────────────────────────────┐
  │           [FREE EDGE]               │
  ├─────────────────────────────────────┤
  │           [NAIL PLATE]              │
  │  ◐        [LUNULA]                  │
  ├─────────────────────────────────────┤
  │  [CUTICLE] / [EPONYCHIUM]           │
  └─────────────────────────────────────┘`,
          text: "Which part of the nail is dead tissue that migrates onto the nail plate and should be removed during prep?",
          options: [
            "The lunula — the pale half-moon at the base",
            "The cuticle — dead skin that migrates onto the nail plate",
            "The free edge — the tip extending past the fingertip",
            "The nail bed — the pink tissue beneath the nail plate",
          ],
          correctIndex: 1,
          explanation: "The cuticle is dead tissue that migrates from the proximal nail fold onto the nail plate. It must be removed during prep because it creates a barrier between the nail plate and your product. The eponychium (living skin at the base) is different — it should never be cut, only gently pushed back.",
        },
        {
          id: "nails-01-q2",
          type: "Pro Technique",
          challenge: `  A client has significant cuticle growth onto her nail plate.
  You have:
  → Cuticle remover gel (softens/dissolves dead tissue)
  → Metal cuticle pusher
  → Cuticle nippers (for loose dead tissue only)`,
          text: "What is the safest professional approach to cuticle removal?",
          options: [
            "Use nippers to cut away all skin at the base — quick and effective",
            "Apply cuticle remover, push back gently, nip only loosened dead tissue",
            "Skip the cuticle — touching it always causes lifting",
            "File down the cuticle area with a fine-grit file until smooth",
          ],
          correctIndex: 1,
          explanation: "Apply cuticle remover gel to soften dead tissue, use a pusher to gently push it back, then nip only the loosened dead tissue. Never cut the living eponychium — it creates micro-wounds and infection risk. Never file the cuticle area — you risk damaging the matrix zone where the nail grows.",
        },
        {
          id: "nails-01-q3",
          type: "Scenario",
          challenge: `  A client says: "My manicure from last night is already
  peeling off! I used expensive polish — what went wrong?"

  You examine her nails:
  → Cuticle still covering the nail plate
  → Very smooth, shiny nail surface (no texture)
  → No base coat residue visible
  → Slight oiliness near the cuticle area`,
          text: "Which prep failure most likely caused the polish to peel overnight?",
          options: [
            "She used the wrong brand of polish for her nail type",
            "The room was too cold when she applied the polish",
            "She skipped prep — the nail plate had oils and no surface texture for adhesion",
            "She applied too many coats — thick layers always peel",
          ],
          correctIndex: 2,
          explanation: "Skipped prep is the almost certain cause. Natural oils on the nail plate prevent polish from bonding, and a smooth unbuffed surface gives polish nothing to grip. The polish brand is irrelevant — even premium polish peels within hours on an unprepped nail. Cuticle removal, light buffing, and dehydration are essential steps.",
        },
        {
          id: "nails-01-q4",
          type: "Order of Operations",
          challenge: `  Place these prep steps in the correct order:

  [A] Apply dehydrator
  [B] Apply base coat
  [C] Remove old polish
  [D] Shape and file nails
  [E] Lightly buff nail plate
  [F] Remove cuticles`,
          text: "What is the correct order for a standard prep routine?",
          options: [
            "C → D → F → E → A → B",
            "A → C → D → F → E → B",
            "D → C → F → A → E → B",
            "C → A → D → F → E → B",
          ],
          correctIndex: 0,
          explanation: "Correct: Remove old polish (C) → Shape/file (D) → Cuticle work (F) → Buff (E) → Dehydrator (A) → Base coat (B). Dehydrator must be the final step before product — touching the nail after applying it reintroduces oils from your fingers and undoes the work.",
        },
      ],
    },
  },

  // ─── nails-02: The No-Water Rule ─────────────────────────────────────────────
  {
    epochId: "nails",
    wonder: { name: "OPI Innovation Lab", location: "North Hollywood, California", era: "Modern", emoji: "🧪" },
    id: "nails-02",
    order: 2,
    title: "The No-Water Rule",
    subtitle: "Why soaking nails before a manicure destroys longevity",
    category: "arts",
    xp: 100,
    badge: { id: "nails-badge-02", name: "Dry Method Disciple", emoji: "🚫💧" },
    challengeType: "quiz",
    info: {
      tagline: "Water is the enemy of adhesion. Your nails expand when wet — and shrink when they dry, taking your polish with them.",
      year: 2005,
      overview: [
        "For decades, the traditional manicure began with a finger bowl — you soaked your hands in warm soapy water to soften the cuticles. It felt luxurious and it made cuticle work easier. The problem: nails are porous. They absorb water and expand. When the nail dries after soaking, it contracts — and anything bonded to the surface (base coat, gel, acrylic) is subjected to that contraction stress, causing separation from the nail plate.",
        "The no-water rule, championed by product chemists and nail educators starting in the early 2000s, simply states: do not soak the nails before applying any nail product. Instead, do all cuticle work dry or with cuticle remover gel. The nail surface stays dimensionally stable, the dehydrator works on a nail that hasn't absorbed moisture, and the product bonds properly.",
        "This does not mean the manicure is less hygienic or comfortable. A properly softened cuticle remover gel dissolves dead tissue just as effectively as soaking — often better. Many top salons have eliminated the finger bowl entirely. The result is a manicure that lasts days longer with no reduction in quality.",
      ],
      technical: {
        title: "The Science of Nail Hydration",
        body: [
          "Nails are composed of flattened dead keratinized cells. Like a sponge, the nail plate absorbs water — expanding by a measurable amount when wet. The key problem: polish, base coat, gel, and acrylic are designed to bond to the nail at a specific moisture level. When the nail later dehydrates and returns to its resting size, the stress breaks the molecular bond at the interface.",
          "The expansion/contraction cycle is most dramatic with extended soaking (5+ minutes). Even 2–3 minutes in water causes enough hydration to affect adhesion. This is why nails done after a shower or swim often lift within days — the nail was already hydrated when the product was applied.",
        ],
        codeExample: {
          label: "Nail hydration effect on polish longevity",
          code: `  DRY NAIL before polish:
  ████████████████████  stable
  ← nail plate at resting width →

  WET NAIL after soaking:
  ██████████████████████  expanded +2-4%
  ← nail plate wider than normal →

  Same nail after it dries (polish already applied):
  ████████████████████  contracts back
                       ↑
              polish bond breaks here
              → lifting begins within 24–48 hrs`,
        },
      },
      incident: {
        title: "When a Luxury Hotel Spa Discovered the No-Water Rule",
        when: "2008 — high-end spa consultations begin shifting protocol",
        where: "Five-star hotel spas, New York and Los Angeles",
        impact: "Spas that eliminated finger bowl soaking reported client callbacks for lifting dropped by over 50% in the first year.",
        body: [
          "In 2008, several luxury hotel spas began consulting with nail product chemists about chronic client complaints — gel manicures lifting within 3–4 days despite top-of-the-line products and techniques. The investigation pointed to one common variable: all the spas were still using extended finger bowl soaking as part of their signature 'luxury experience.'",
          "The spas were skeptical that removing a step clients loved would improve results. But after a trial period where technicians switched to dry cuticle work, the lifting complaints dropped dramatically. Today, the majority of professional nail educators teach the no-water rule as a foundational principle.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Water Soaking", sub: "nail absorbs moisture", type: "attacker" },
          { label: "Nail Plate", sub: "expands when hydrated", type: "system" },
          { label: "Polish/Gel Bond", sub: "forms on expanded nail", type: "victim" },
          { label: "Nail Contracts", sub: "bond breaks → lifting", type: "result" },
        ],
      },
      timeline: [
        { year: 1950, event: "Finger bowl soaking becomes standard in American manicures" },
        { year: 1990, event: "Gel nail systems arrive — lifting becomes a major industry complaint" },
        { year: 2002, event: "Nail chemists begin publishing research on hydration and adhesion failure" },
        { year: 2005, event: "No-water rule enters professional nail education curricula", highlight: true },
        { year: 2010, event: "Soak-off gel polish boom makes no-water rule mainstream" },
        { year: 2020, event: "Most professional gel and BIAB training programs ban finger bowl soaking" },
      ],
      keyTakeaways: [
        "Water makes nails expand — when they dry and contract, any product bonded to them lifts",
        "Eliminate the finger bowl; use cuticle remover gel for cuticle softening instead",
        "Even a shower before a manicure can cause premature lifting — hydrated nails are less receptive to product",
        "The no-water rule applies to gel, acrylic, BIAB, and traditional polish equally",
      ],
      references: [
        { title: "OPI Professional Education", url: "https://www.opi.com/professional" },
        { title: "NAILS Magazine: The No-Water Manicure", url: "https://www.nailsmag.com" },
        { title: "CND Education: Product Adhesion Science", url: "https://www.cnd.com/education" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "nails-02-q1",
          type: "Nail Science",
          challenge: `  NAIL PLATE HYDRATION EXPERIMENT:

  Nail soaked 5 mins in water:
  ██████████████████████  width = 10.4mm

  Same nail fully dried 30 mins later:
  ████████████████████  width = 10.0mm

  Polish was applied immediately after soaking.`,
          text: "Why does soaking the nail before applying polish cause the manicure to lift?",
          options: [
            "Water leaves a residue that prevents base coat from drying properly",
            "The nail expands when wet and contracts when dry, breaking the product bond",
            "Soaking softens the keratin so polish soaks in instead of sitting on top",
            "Warm water changes the pH of the nail plate making it chemically incompatible with polish",
          ],
          correctIndex: 1,
          explanation: "Nails are porous and absorb water, causing them to expand. When the nail dries and returns to its normal size, it contracts — and the polish or gel that bonded to the expanded nail gets stress-cracked or separated at the interface. This is the core reason for the no-water rule.",
        },
        {
          id: "nails-02-q2",
          type: "True or False",
          challenge: `  A client asks: "I love the warm finger bowl — it makes
  my hands feel so relaxed and my cuticles are so soft
  after soaking. Does it really matter for a regular
  polish manicure? I thought the no-water rule was
  only for gel or acrylic."`,
          text: "True or False: The no-water rule applies to traditional polish manicures as well as gel and acrylic.",
          options: [
            "True — water-swollen nails cause lifting with any nail product, including regular polish",
            "False — traditional polish is flexible enough that nail contraction doesn't break the bond",
            "True — but only if the nail is soaked for longer than 10 minutes",
            "False — finger bowl soaking actually improves regular polish adhesion",
          ],
          correctIndex: 0,
          explanation: "True! The no-water rule applies to all nail products. Traditional polish lifts just like gel when applied to a water-swollen nail — it just may take a day or two rather than hours. The physics are the same: expanding nail → product applied → nail contracts → bond breaks.",
        },
        {
          id: "nails-02-q3",
          type: "Scenario",
          challenge: `  Your client went swimming for an hour before her
  appointment. She says "my nails are already clean!"
  Her nails look slightly puffy/soft to the touch.
  She's booked for a gel manicure.`,
          text: "What is the best course of action?",
          options: [
            "Proceed immediately — extra moisture helps gel bond more smoothly",
            "Ask her to wait 30–60 minutes for the nails to fully dehydrate before you begin",
            "Apply extra primer to counteract the water absorption",
            "Soak her nails in acetone to quickly remove the water",
          ],
          correctIndex: 1,
          explanation: "The safest approach is to wait until the nails have fully dehydrated — typically 30–60 minutes after extended water exposure. Proceeding on hydrated nails almost guarantees premature lifting. Explain the reason to the client; most clients appreciate the honesty and prefer a gel that lasts.",
        },
        {
          id: "nails-02-q4",
          type: "Product Knowledge",
          challenge: `  You want to soften your client's cuticles without
  soaking her hands in water. Your options:

  [A] Cuticle remover gel (enzyme-based, dissolves dead tissue)
  [B] Warm towel wrap (moist heat for 2 minutes)
  [C] Dry heat (warm lamp over hands for 5 minutes)
  [D] Light cuticle oil applied and massaged in`,
          text: "Which method best softens cuticles while following the no-water rule?",
          options: [
            "Option B — moist heat softens without full immersion in water",
            "Option A — cuticle remover gel dissolves dead tissue without adding moisture to the nail plate",
            "Option C — dry heat softens the cuticle area safely",
            "Option D — cuticle oil completely replaces the need for any other softening",
          ],
          correctIndex: 1,
          explanation: "Cuticle remover gel (usually an enzyme or potassium hydroxide formula) dissolves the dead cuticle tissue chemically without saturating the nail plate with water. It works faster than soaking and leaves the nail plate in an ideal dry state for product application. Apply, wait 30–60 seconds, then push back — no water needed.",
        },
      ],
    },
  },

  // ─── nails-03: Dehydration & Primer ──────────────────────────────────────────
  {
    epochId: "nails",
    wonder: { name: "CND Science Lab", location: "San Diego, California", era: "Modern", emoji: "🧬" },
    id: "nails-03",
    order: 3,
    title: "Dehydration & Primer",
    subtitle: "Removing oils and creating the perfect bonding surface",
    category: "arts",
    xp: 100,
    badge: { id: "nails-badge-03", name: "Adhesion Scientist", emoji: "🔬" },
    challengeType: "quiz",
    info: {
      tagline: "You can't bond to an oily surface. Dehydration removes what the eye can't see.",
      year: 2010,
      overview: [
        "After the nail has been shaped, cuticles managed, and the surface lightly buffed, there is still a critical obstacle to adhesion: invisible oils. The nail plate continuously secretes sebum-like oils from the nail bed beneath. Even after buffing, these oils coat the surface of the nail plate at a molecular level. A dehydrator removes those oils by evaporating them along with any surface moisture — leaving a clean, oil-free nail surface.",
        "A primer is a separate product — not the same as a dehydrator. While a dehydrator removes what is present (oils, moisture), a primer adds something to the nail: either an acid-based primer that etches the nail plate microscopically for mechanical adhesion, or an acid-free primer that creates a molecular bridge between the nail plate and the product layer. Primers are most commonly used with hard gel, acrylic, and builder gel systems.",
        "Knowing when to use each product: dehydrator is used on every service, always. Primer is used when working with enhancement systems (acrylic, hard gel, builder gel, BIAB) — it is rarely needed for traditional polish or soak-off gel, though some technicians use an acid-free primer on clients prone to lifting.",
      ],
      technical: {
        title: "Dehydrator vs. Primer: What Each Does",
        body: [
          "Dehydrators work by dissolving and evaporating the oils and surface moisture from the nail plate. Most use isopropyl alcohol or a similar solvent. After application the nail should look slightly matte — that matte appearance is the oil-free, moisture-free surface you want. Apply dehydrator and let it fully evaporate before touching the nail.",
          "Acid-based primers (like methacrylic acid primer, historically used in acrylic systems) chemically etch the nail surface, creating microscopic pits for mechanical interlocking. They are very effective but harsh — they can burn skin and should never touch the cuticle. Acid-free primers work via molecular adhesion chemistry — gentler and safer, appropriate for most modern gel and builder gel systems.",
        ],
        codeExample: {
          label: "Dehydrator vs. Primer — purpose and timing",
          code: `  PREP SEQUENCE (enhancement service):

  1. Shape & buff nail plate
  2. Remove cuticle / push back
  3. Wipe with lint-free pad (remove dust)
  4. Apply DEHYDRATOR → wait to evaporate
     (removes oils + surface moisture)
  5. Apply PRIMER → wait to become tacky/dry
     (etches or bonds to nail surface)
  6. Apply base coat / product

  ⚠  Do NOT touch nail after step 4 — fingers
     reintroduce oils and undo dehydration.`,
        },
      },
      incident: {
        title: "The Acrylic Lifting Epidemic That Led to Primer Science",
        when: "1985–1995 — acrylic nail boom in the US",
        where: "American nail salons",
        impact: "An industry-wide reckoning over product chemistry led to the development of modern primer science and the acid-free primer category.",
        body: [
          "During the 1980s acrylic nail boom, lifting was epidemic. Many technicians blamed each other — 'bad monomer,' 'the client has oily nails,' 'wrong ratios.' But product chemists who investigated found the same root cause almost universally: inadequate prep and no primer use. Methacrylic acid primers had been available since the 1970s but weren't widely used.",
          "The problem with methacrylic acid primers: they were harsh, could cause chemical burns if over-applied, and were poorly understood by salon workers. This drove the development of acid-free primer formulas in the 1990s — products that achieved the same molecular adhesion without the acid. Today, acid-free primers are the standard for modern enhancement systems.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Surface Oils", sub: "invisible on nail plate", type: "attacker" },
          { label: "Dehydrator", sub: "dissolves and evaporates oils", type: "system" },
          { label: "Primer", sub: "creates bonding bridge", type: "victim" },
          { label: "Product Adhesion", sub: "lasting enhancement", type: "result" },
        ],
      },
      timeline: [
        { year: 1970, event: "Methacrylic acid primer introduced for acrylic nail systems" },
        { year: 1985, event: "Acrylic nail boom — lifting complaints become industry-wide problem" },
        { year: 1993, event: "First acid-free primer formulas developed for safer use" },
        { year: 2000, event: "Nail prep education becomes a required module in cosmetology licensing", highlight: true },
        { year: 2010, event: "Builder gel and BIAB systems create new demand for bonding education" },
        { year: 2022, event: "Nail prep science integrated into all major brand education programs" },
      ],
      keyTakeaways: [
        "Dehydrator removes oils and moisture; primer creates a bonding bridge — they do different things",
        "Always apply dehydrator on every service; primer is used mainly with enhancement systems",
        "Never touch the nail after applying dehydrator — fingers reintroduce oils",
        "Acid primers are effective but harsh; acid-free primers are gentler and appropriate for most modern systems",
      ],
      references: [
        { title: "CND Education: Prep and Bond Science", url: "https://www.cnd.com/education" },
        { title: "Nail Pro Magazine: Understanding Primers", url: "https://www.nailpro.com" },
        { title: "Young Nails Education", url: "https://www.youngnails.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "nails-03-q1",
          type: "Product Knowledge",
          challenge: `  TWO PRODUCTS on the nail tech's prep station:

  PRODUCT A: Clear, watery liquid — dries quickly,
             leaves nail looking matte

  PRODUCT B: Slightly thicker, slightly sticky when
             dry, smells faintly acidic`,
          text: "What is Product A (the quick-drying, matte-finish product) designed to do?",
          options: [
            "Etch the nail plate with acid for mechanical adhesion",
            "Remove surface oils and moisture from the nail plate",
            "Fill ridges and create a smooth base for color",
            "Create a molecular bridge between nail plate and gel",
          ],
          correctIndex: 1,
          explanation: "Product A is a dehydrator. Its job is to dissolve and evaporate the oils and surface moisture from the nail plate, leaving a dry, matte, oil-free surface. The matte appearance after application is the sign that it has worked correctly. Product B (sticky, slightly acidic) is a primer.",
        },
        {
          id: "nails-03-q2",
          type: "Scenario",
          challenge: `  A client always has her gel peel off within a week
  despite doing soak-off gel manicures. She says her
  nails are "naturally oily."

  Your current routine: shape → cuticle work → buff
  → apply gel base coat directly.

  You have dehydrator and acid-free primer in stock.`,
          text: "What is the most likely fix for this client's chronic lifting?",
          options: [
            "Switch to a different gel brand with stronger adhesion",
            "Apply more coats of base coat to compensate for the oils",
            "Add dehydrator (and optionally acid-free primer) between buff and base coat",
            "Rough up the nail surface more aggressively with a coarser buffer",
          ],
          correctIndex: 2,
          explanation: "Adding dehydrator before base coat is the fix. 'Naturally oily' nails simply have more sebum secretion — dehydrator removes it. An acid-free primer can further improve adhesion for challenging cases. More base coat coats or a new brand won't solve the underlying adhesion problem caused by oil on the nail plate.",
        },
        {
          id: "nails-03-q3",
          type: "True or False",
          challenge: `  You've just applied dehydrator to your client's nails.
  They look perfectly matte — the dehydrator worked.

  Your client then says "wait, I need to check my
  phone for a second" and picks it up with her
  fingertips.

  You tell her: "You need to dehydrate again."`,
          text: "True or False: Touching anything after applying dehydrator requires you to reapply it.",
          options: [
            "True — fingertip contact immediately reintroduces oils onto the nail surface",
            "False — dehydrator creates a permanent oil-resistant barrier",
            "True — but only if she touched something greasy or oily",
            "False — the nail can be wiped with a dry cloth to remove any oils",
          ],
          correctIndex: 0,
          explanation: "True! The dehydrator removes oils in that moment, but the nail plate immediately begins to re-oil when touched. Even touching your own clean fingertips transfers oils back onto the dehydrated nail. Always reapply dehydrator if the nail is touched after application, and apply your product immediately after dehydrator has evaporated.",
        },
        {
          id: "nails-03-q4",
          type: "Comparison",
          challenge: `  You're working with a client who wants hard gel extensions.
  You have both acid-based primer and acid-free primer.

  ACID PRIMER: etches nail plate microscopically,
               very strong adhesion, can burn skin

  ACID-FREE PRIMER: molecular adhesion bridge,
                    gentler, can contact skin safely`,
          text: "For a standard hard gel extension service, which primer type is generally recommended today?",
          options: [
            "Acid-based primer — it's stronger and ensures the extensions never lift",
            "Acid-free primer — it provides excellent adhesion while being safer for the client",
            "No primer at all — hard gel has built-in adhesion",
            "Both applied in sequence — acid first, then acid-free on top",
          ],
          correctIndex: 1,
          explanation: "Acid-free primers are the professional standard for modern gel extension services. They provide excellent molecular adhesion without the risk of skin burns from acid contact. Acid-based primers are still used in some acrylic systems but require careful application to avoid skin contact. For hard gel, acid-free is the safer and equally effective choice.",
        },
      ],
    },
  },

  // ─── nails-04: The Dry Manicure ───────────────────────────────────────────────
  {
    epochId: "nails",
    wonder: { name: "Minx Nails Studio", location: "San Francisco, California", era: "Modern", emoji: "✨" },
    id: "nails-04",
    order: 4,
    title: "The Perfect Dry Manicure",
    subtitle: "The full dry method technique from start to finish",
    category: "arts",
    xp: 100,
    badge: { id: "nails-badge-04", name: "Dry Method Pro", emoji: "✨" },
    challengeType: "quiz",
    info: {
      tagline: "The dry manicure is not a shortcut — it is the professional standard.",
      year: 2012,
      overview: [
        "A dry manicure is simply a manicure performed without soaking the nails in water. This is not a new technique — it has been the professional standard in the nail enhancement world for decades, and it is rapidly becoming standard for traditional polish services as well. The entire service is performed on dry nails: cuticle removal using gel remover rather than soaking, shaping on dry nails, and buffing on a dry surface.",
        "The sequence of a complete dry manicure: (1) Remove any existing product or polish. (2) File and shape the nails to the desired length and shape. (3) Apply cuticle remover gel to the cuticle area. (4) After 30–60 seconds, gently push back the cuticle with a metal pusher or orangewood stick. (5) Use nippers to remove any loosened dead tissue only — never cut living skin. (6) Lightly buff the nail plate to remove shine and create surface texture. (7) Wipe with a lint-free pad. (8) Apply dehydrator. (9) Apply primer if using enhancements. (10) Proceed with your product.",
        "The dry method makes cuticle work easier, not harder, once you adapt to it. The cuticle remover gel softens dead tissue just as effectively as soaking — and the cuticle pusher glides smoothly on a dry nail. Many technicians find they can work faster and more precisely without wet, slippery nails.",
      ],
      technical: {
        title: "Nail Shapes: Square, Round, Oval, Almond, Stiletto, Coffin",
        body: [
          "Nail shape is filed before other prep steps. File in one direction only — back-and-forth sawing weakens the nail plate and causes peeling layers. Use a medium grit file (180–240 grit) for natural nails; coarser grits are for artificial products only. Hold the file parallel to the nail edge for square shapes, angled for ovals and almonds.",
          "Shape affects durability: square shapes are the most durable (more nail plate on the stress point); stiletto and almond are the most prone to breakage. For clients with weak nails, recommend squoval (slightly rounded square corners) as a compromise between aesthetics and strength.",
        ],
        codeExample: {
          label: "Nail shape guide",
          code: `  SQUARE     ROUND      OVAL       ALMOND     COFFIN
  ┌─────┐    ╭─────╮   ╭──────╮   ╭──────╮   ╭──────╮
  │     │    │     │   │      │   │      │   │      │
  │     │    │     │   │      │   │       ╮  │       ╮
  └─────┘    ╰─────╯   ╰──────╯    ╰─────╯   └──────┘

  Most    ←──────────────────────────→  Most
  Durable              →               Fragile`,
        },
      },
      incident: {
        title: "The Celebrity Nail Tech Who Standardized the Dry Method",
        when: "Early 2010s — as soak-off gel polish became mainstream",
        where: "Los Angeles, CA — celebrity nail salons",
        impact: "Celebrity nail techs' public endorsement of dry manicure technique accelerated industry adoption by years.",
        body: [
          "When soak-off gel polish became a mass-market service in the early 2010s, salons initially tried to apply it using their traditional wet-service protocols — finger bowls, soaking, the works. The results were poor: gel peeling within days, frustrated clients, and damage to salon reputations.",
          "A handful of celebrity nail techs in Los Angeles — working with clients who needed their nails to last through weeks of filming or touring — had already switched to dry manicure protocols. When before/after photos of 3-week-old pristine gel manicures began appearing on social media, the nail industry took notice. Educational content about the dry method exploded, and the professional standard shifted.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Shape First", sub: "file on dry nail", type: "system" },
          { label: "Cuticle Gel", sub: "dissolves dead tissue", type: "attacker" },
          { label: "Push & Nip", sub: "remove only dead tissue", type: "victim" },
          { label: "Buff → Dehydrate", sub: "surface ready for product", type: "result" },
        ],
      },
      timeline: [
        { year: 1990, event: "Dry prep standard for acrylic nail enhancements" },
        { year: 2000, event: "Finger bowl soaking still standard for traditional polish manicures" },
        { year: 2010, event: "Soak-off gel polish explodes in popularity — lifting epidemic follows" },
        { year: 2012, event: "Dry manicure method endorsed by major nail educators for all services", highlight: true },
        { year: 2016, event: "Most professional nail brand training programs adopt dry method as default" },
        { year: 2023, event: "Dry manicure standard in all major nail technology licensing curricula" },
      ],
      keyTakeaways: [
        "File and shape on dry nails — wet nails are slippery and measurements are inaccurate",
        "File in one direction only — back-and-forth filing weakens the nail plate",
        "Cuticle remover gel is more effective than soaking and doesn't hydrate the nail plate",
        "Always nip only loosened dead tissue — never cut living skin (the eponychium)",
      ],
      references: [
        { title: "NAILS Magazine: The Dry Manicure Debate", url: "https://www.nailsmag.com" },
        { title: "Nail Pro: Dry Method Technique Guide", url: "https://www.nailpro.com" },
        { title: "Young Nails: Prep Protocols", url: "https://www.youngnails.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "nails-04-q1",
          type: "Sequence",
          challenge: `  You're doing a dry manicure. Order these steps:

  [A] Apply cuticle remover gel
  [B] File and shape the nails
  [C] Apply dehydrator
  [D] Remove existing polish
  [E] Buff the nail plate
  [F] Push back and nip cuticles`,
          text: "What is the correct sequence for a dry manicure?",
          options: [
            "D → B → A → F → E → C",
            "A → D → B → F → E → C",
            "B → D → A → F → E → C",
            "D → A → B → F → E → C",
          ],
          correctIndex: 0,
          explanation: "Correct: Remove polish (D) → Shape (B) → Cuticle remover gel (A) → Push back/nip cuticles (F) → Buff plate (E) → Dehydrator (C). Shape before cuticle work because shaping can disturb what you just cleaned up. Dehydrator is always last before product.",
        },
        {
          id: "nails-04-q2",
          type: "Technique",
          challenge: `  When filing the nail to shape, your client says
  "you're supposed to go back and forth — that's
  how I always do it at home."`,
          text: "Why do professional nail techs file in one direction only?",
          options: [
            "One-directional filing creates a straighter edge — it's purely cosmetic",
            "Back-and-forth filing generates heat that can damage the nail bed",
            "One-directional filing prevents splitting and weakening of the nail layers at the free edge",
            "Filing direction doesn't matter — the result is identical either way",
          ],
          correctIndex: 2,
          explanation: "Filing back and forth creates a sawing action that disrupts the layered structure of the nail plate at the free edge, leading to peeling, splitting, and weakened nails over time. Filing in one direction smoothly cuts the keratin layers without disrupting them. Always file from side to center, lifting the file on the return stroke.",
        },
        {
          id: "nails-04-q3",
          type: "Client Scenario",
          challenge: `  Your client requests "almond shaped" nails.
  She has short nail beds and bite-prone nails
  that she's trying to grow out.

  Her natural nails are currently just past
  the fingertip — about 2mm of free edge.`,
          text: "What is the most professional recommendation for this client right now?",
          options: [
            "File aggressively to almond shape immediately — the shape is more important than length",
            "Suggest squoval (square with soft corners) now and work toward almond as her nails grow",
            "Recommend she stop biting completely before any shape work is done",
            "Apply nail tips to add artificial length so almond shape is possible now",
          ],
          correctIndex: 1,
          explanation: "For short nails, almond shape removes a significant amount of nail width from the sides, leaving very little nail remaining. Squoval is the safest and most durable option at short lengths — it protects the nail while she grows. As her nails reach the length to support an almond shape, you can transition. Always prioritize nail health over immediate aesthetic goals.",
        },
        {
          id: "nails-04-q4",
          type: "Problem Solving",
          challenge: `  During cuticle work, you accidentally nick
  the client's skin at the base of the nail
  (the eponychium) with the nipper. A small
  amount of blood appears.`,
          text: "What is the correct professional response?",
          options: [
            "Apply a dot of base coat over it — polish seals minor cuts",
            "Stop, apply an antiseptic, allow bleeding to stop, use proper blood exposure protocol, and document the incident",
            "Wipe with an alcohol pad and continue — small nicks are normal and expected",
            "Ask the client if she wants to continue — leave the decision entirely to her",
          ],
          correctIndex: 1,
          explanation: "Blood exposure requires a specific protocol: stop work, apply antiseptic, allow bleeding to stop, use blood exposure procedures per your licensing board's guidelines, and document the incident. You should never proceed on a bleeding nail — you cannot apply product over broken skin, and blood exposure has infection control implications for both client and technician.",
        },
      ],
    },
  },

  // ─── nails-05: Even Polish Application ───────────────────────────────────────
  {
    epochId: "nails",
    wonder: { name: "Essie HQ", location: "New York City, New York", era: "Modern", emoji: "💄" },
    id: "nails-05",
    order: 5,
    title: "The Art of Even Color",
    subtitle: "Brush technique, thin coats, and flawless polish application",
    category: "arts",
    xp: 100,
    badge: { id: "nails-badge-05", name: "Color Technician", emoji: "🎨" },
    challengeType: "quiz",
    info: {
      tagline: "One thin coat beats three thick ones every time.",
      year: 2015,
      overview: [
        "Even polish application is a skill that separates professional results from home manicures. The key principles are: thin coats, proper brush technique, and capping the free edge. Most people apply polish in thick globs because it seems faster and more pigmented. The opposite is true — thick coats take longer to dry, trap air bubbles, shrink more as they cure, and are far more likely to smudge and chip.",
        "The three-stroke method is the professional standard: (1) Place the brush at the center base of the nail, about 1mm away from the cuticle. Press gently to fan the bristles. Pull the brush toward the free edge in a smooth stroke down the center. (2) Repeat from the base to the free edge on the left side. (3) Repeat on the right side. Three strokes, light pressure, thin coat. That is it.",
        "Capping the free edge means dragging the brush lightly across the very tip of the nail after each coat. This seals the color at the edge — the most vulnerable point for chipping — and extends the life of the manicure significantly. It takes two extra seconds and makes a measurable difference in how long the polish lasts.",
      ],
      technical: {
        title: "Brush Control and Polish Consistency",
        body: [
          "The amount of polish on the brush matters enormously. Too much polish and you get flooded cuticles, air bubbles, and a thick uneven coat. Too little and the color is streaky and uneven. Wipe one side of the brush on the neck of the bottle to remove excess — the brush should look like a teardrop shape, well-loaded on one side and clean on the other.",
          "Polish viscosity changes with temperature and age. Cold polish is thick and drags; warm it in your hands for 30 seconds by rolling the bottle back and forth (never shake — shaking introduces bubbles). Old, thick polish can be rescued with a few drops of polish thinner — not acetone remover, which breaks down the formula permanently.",
        ],
        codeExample: {
          label: "The three-stroke method diagram",
          code: `  Nail viewed from above:

  ┌─────────────────────────────────────┐
  │         STROKE 1: CENTER            │
  │    ↑ from base to free edge ↑       │
  ├────────┬─────────────┬──────────────┤
  │STROKE 2│             │   STROKE 3   │
  │  LEFT  │             │    RIGHT     │
  │   ↑    │             │      ↑       │
  └────────┴─────────────┴──────────────┘

  Then cap the free edge → drag brush
  across the very tip after each coat`,
        },
      },
      incident: {
        title: "Essie Weingarten and the Perfect Polish Brush",
        when: "1981 — Essie launches with a focus on brush quality",
        where: "New York City, NY",
        impact: "Essie's wide flat brush design influenced the entire nail polish industry's approach to brush engineering.",
        body: [
          "When Essie Weingarten launched her nail polish company in 1981, she was a nail technician with strong opinions about brush design. Most polishes of the era used thin, small brushes that required many strokes to cover the nail. Essie designed a wide, flat brush that covered more of the nail plate in a single stroke — reducing application time and improving evenness.",
          "The 'Essie brush' became famous in salons. Nail technicians requested it specifically. Today, brush design is considered one of the most critical factors in a nail polish's professional usability, and Essie's approach influenced how every major brand approaches brush engineering.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Loaded Brush", sub: "correct product amount", type: "system" },
          { label: "Three Strokes", sub: "center, left, right", type: "attacker" },
          { label: "Thin Even Coat", sub: "no flooding, no bubbles", type: "victim" },
          { label: "Cap Free Edge", sub: "sealed tip, less chipping", type: "result" },
        ],
      },
      timeline: [
        { year: 1920, event: "First commercial nail polish in small bottles with basic brushes" },
        { year: 1954, event: "Revlon introduces matching lip and nail color — manicures go mainstream" },
        { year: 1981, event: "Essie Weingarten launches Essie with wide flat brush design", highlight: true },
        { year: 2000, event: "Gel polish introduces new brush technique requirements (thin UV coats)" },
        { year: 2010, event: "Nail art boom creates demand for precision brushes and application tools" },
        { year: 2020, event: "BIAB systems require precise thin-coat technique for proper curing" },
      ],
      keyTakeaways: [
        "Always apply thin coats — two thin coats outlast one thick coat every time",
        "Use the three-stroke method: center, left side, right side",
        "Cap the free edge after every coat to prevent tip chipping",
        "Never shake polish — roll it between your hands to mix without introducing bubbles",
      ],
      references: [
        { title: "Essie Professional Application Guide", url: "https://www.essie.com" },
        { title: "NAILS Magazine: Polish Application Technique", url: "https://www.nailsmag.com" },
        { title: "OPI Professional: Application Education", url: "https://www.opi.com/professional" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "nails-05-q1",
          type: "Technique",
          challenge: `  You load your brush with polish and notice the
  brush is heavily loaded on both sides, with
  polish pooling at the base of the bristles.

  Your options:
  [A] Apply as-is — more product = more coverage
  [B] Wipe one side of brush on bottle neck to remove excess
  [C] Press brush firmly on the nail to spread out the excess
  [D] Dip brush back in bottle and use less next time`,
          text: "What is the correct action before applying the overloaded brush?",
          options: [
            "Apply as-is — the nail will spread the excess evenly",
            "Wipe one side of the brush on the neck of the bottle to remove excess product",
            "Dab the brush on a paper towel to remove product before applying",
            "Thin the entire bottle with polish thinner before continuing",
          ],
          correctIndex: 1,
          explanation: "Wipe one side of the brush on the neck of the bottle — this removes excess product while leaving the brush properly loaded on the other side. The resulting teardrop-shaped load gives you enough product for one stroke without flooding. Never press out excess on the nail — it creates flood lines at the cuticle and sides.",
        },
        {
          id: "nails-05-q2",
          type: "Common Mistake",
          challenge: `  A client says she can never get her manicure
  to look smooth — "I always get those tiny
  bumps and the polish looks streaky."

  You watch her apply polish: she loads the
  brush heavily and paints the nail in 6-8
  strokes, pressing hard, going back and
  forth several times.`,
          text: "What two technique errors are causing her poor results?",
          options: [
            "She's pressing too lightly and using too few strokes",
            "She's using too much product per stroke and going back over wet polish creates drag marks",
            "She's using the wrong type of brush for her nail shape",
            "She's applying too many thin coats instead of one thick coat",
          ],
          correctIndex: 1,
          explanation: "Two errors: (1) Too much product on the brush leads to thick, uneven coats. (2) Going back over wet polish with the brush drags and disturbs the already-applied layer, creating streaks and texture. The fix: wipe brush properly, use three light strokes only (center, left, right), and let each coat dry before adding another.",
        },
        {
          id: "nails-05-q3",
          type: "Pro Tip",
          challenge: `  After applying two coats of color, your client
  says "I always chip at the tip within a day."

  You look at your application and notice you
  haven't done anything special at the free edge —
  just painted the top surface of the nail.`,
          text: "What technique step will most directly address tip chipping?",
          options: [
            "Apply a third coat of color to build thickness at the tip",
            "Cap the free edge — drag the brush lightly across the very tip after each coat",
            "File the free edge thinner so there's less surface area to chip",
            "Apply top coat only at the very tip, leaving the nail surface bare",
          ],
          correctIndex: 1,
          explanation: "Capping the free edge is the single most effective technique for preventing tip chipping. The free edge is the most vulnerable part of the nail — it hits surfaces first, is exposed to wear, and is where polish peels typically start. Dragging the brush across the tip after each coat (base, color, top coat) seals that edge and creates a barrier against chipping.",
        },
        {
          id: "nails-05-q4",
          type: "Troubleshooting",
          challenge: `  Your client's polish looks bubbly and rough after
  drying. She used the same polish last week with
  no issues.

  Today's conditions:
  → Polish has been sitting in a cold car for 2 hours
  → She shook the bottle vigorously before use
  → She applied one thick coat instead of two thin ones`,
          text: "Which factor most likely caused the bubbles?",
          options: [
            "Cold polish that was shaken — cold thick polish traps air bubbles when agitated",
            "The single thick coat — thick layers always bubble regardless of temperature",
            "The polish formula degraded from being in the car",
            "Too much pressure on the brush — bubbles form from mechanical agitation on the nail",
          ],
          correctIndex: 0,
          explanation: "Shaking cold, thick polish is the primary culprit. Cold polish thickens and becomes viscous — when you shake it, it traps air bubbles that don't escape before the polish sets. Always warm polish by rolling between your hands (never shaking) and use thin coats. Thick coats compound the problem but the cold + shaking is the likely root cause here.",
        },
      ],
    },
  },

  // ─── nails-06: Base Coat, Color & Top Coat ───────────────────────────────────
  {
    epochId: "nails",
    wonder: { name: "China Glaze Lab", location: "City of Industry, California", era: "Modern", emoji: "🏺" },
    id: "nails-06",
    order: 6,
    title: "The Three-Layer System",
    subtitle: "Base coat, color, and top coat — why all three matter",
    category: "arts",
    xp: 150,
    badge: { id: "nails-badge-06", name: "System Builder", emoji: "🏺" },
    challengeType: "quiz",
    info: {
      tagline: "Skip base coat and you're painting on oil. Skip top coat and you're leaving color unprotected.",
      year: 2018,
      overview: [
        "A professional manicure uses three distinct product layers, each serving a specific function. Base coat is the foundation — it creates adhesion between the nail plate and the color, prevents staining from pigmented polishes, and often includes nail-strengthening ingredients. Color coat provides the pigment — always applied in two thin coats, never one thick one. Top coat seals and protects everything beneath it, adds shine, and is the primary defense against chips and scratches.",
        "Each layer must be fully applied and allowed to set before the next layer goes on. Rushing leads to smudged color, wrinkling (where the top layer pulls the wet layer beneath it into ripples), and reduced longevity. For traditional polish, a light touch in the final top coat application avoids disturbing the color beneath.",
        "Not all base coats and top coats are interchangeable. Ridge-filling base coats are thicker and designed for clients with uneven nail surfaces. Strengthening base coats contain ingredients like calcium or keratin for fragile nails. Quick-dry top coats contain solvents that help polish set faster. Gel top coats require UV/LED curing. Using the wrong product type can cause compatibility issues — always stay within the same system when possible.",
      ],
      technical: {
        title: "Layer Compatibility and Dry Time",
        body: [
          "Wrinkling (also called 'solvent popping') is a common problem caused by applying top coat over color that hasn't set. The solvent in top coat attacks the still-wet color beneath, causing it to ripple. Solution: wait at least 2 minutes between color coats and 3–5 minutes before applying top coat — or use a quick-dry spray/drops to accelerate the process.",
          "Quick-dry drops (applied over the finished manicure) work by replacing the slow-evaporating solvents in the top coat with fast-evaporating ones, dramatically reducing dry time. They also leave a light conditioning oil on the surface. Apply 1–2 drops per nail, spreading them with the dropper tip. Do not apply before top coat — they prevent adhesion.",
        ],
        codeExample: {
          label: "Traditional polish application system",
          code: `  LAYER 1: BASE COAT
  → Thin single coat
  → 1mm from cuticle, cap free edge
  → Wait: 60 seconds minimum

  LAYER 2: COLOR (first coat)
  → Thin coat, 3-stroke method
  → Cap free edge
  → Wait: 90–120 seconds

  LAYER 3: COLOR (second coat)
  → Same technique, builds opacity
  → Cap free edge
  → Wait: 3–5 minutes

  LAYER 4: TOP COAT
  → Light strokes — avoid overworking
  → Cap free edge
  → Optional: quick-dry drops after`,
        },
      },
      incident: {
        title: "How OPI Changed Top Coat with RapiDry",
        when: "1992 — OPI launches RapiDry Top Coat",
        where: "OPI Professional, North Hollywood, California",
        impact: "The quick-dry top coat category was created, transforming salon throughput — manicurists could seat the next client faster and clients left without smudged nails.",
        body: [
          "Before quick-dry top coats existed, the biggest friction point in a traditional manicure was the wait. Clients sat under fans for 20–30 minutes watching their nails dry. One bump, one dropped key, and the whole manicure was ruined. Smudged nails and angry clients were a daily reality for salon techs.",
          "OPI's introduction of RapiDry in 1992 changed this. The formula uses fast-evaporating solvents that accelerate drying throughout the polish stack, not just at the surface. Suddenly manicures were 'dry enough' to walk out in 10 minutes. The category exploded — today nearly every nail brand sells a version of quick-dry top coat, and it is standard in most salons.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Base Coat", sub: "adhesion + stain prevention", type: "system" },
          { label: "Color (×2)", sub: "pigment in thin coats", type: "attacker" },
          { label: "Top Coat", sub: "protection + shine + seal", type: "victim" },
          { label: "Complete Manicure", sub: "4 layers, lasting color", type: "result" },
        ],
      },
      timeline: [
        { year: 1920, event: "Early nail polish — no standard multi-layer system" },
        { year: 1960, event: "Base coat products first sold separately from polish" },
        { year: 1975, event: "Top coat becomes standard professional practice" },
        { year: 1992, event: "OPI launches RapiDry — quick-dry top coat category created", highlight: true },
        { year: 2010, event: "Gel system three-layer protocol (base, color, top) becomes industry standard" },
        { year: 2022, event: "Gel-like top coats bring gel-level shine to traditional polish systems" },
      ],
      keyTakeaways: [
        "Never skip base coat — it prevents staining and provides the adhesion layer",
        "Two thin color coats always outperform one thick coat",
        "Wait adequately between layers — wrinkling is caused by applying top coat over wet color",
        "Cap the free edge on every single layer — base, color, and top coat",
      ],
      references: [
        { title: "OPI Professional Education", url: "https://www.opi.com/professional" },
        { title: "Sally Beauty: Nail Polish Basics", url: "https://www.sallybeauty.com" },
        { title: "NAILS Magazine: Base & Top Coat Guide", url: "https://www.nailsmag.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "nails-06-q1",
          type: "Product Purpose",
          challenge: `  A client says: "I never use base coat — it feels
  like an extra step for nothing. I just go straight
  to color."

  She also mentions: "My light pink polish always
  turns yellow after a few days — I can't figure
  out why."`,
          text: "What is the most likely cause of her polish turning yellow, and how does base coat solve it?",
          options: [
            "Low-quality polish formula causes yellowing — base coat has no effect on this",
            "Without base coat, pigments from colored polish directly stain the nail plate; base coat acts as a barrier",
            "She's applying too many coats — more layers trap air that oxidizes the color",
            "Her nails are naturally yellow and the pink shows through without base coat",
          ],
          correctIndex: 1,
          explanation: "Without base coat, the pigments in colored polish (especially dark reds, blues, and yellows — which also leach into pinks) directly contact and stain the nail plate. Base coat forms a barrier that prevents this. Some base coats also contain brightening ingredients that neutralize existing stains.",
        },
        {
          id: "nails-06-q2",
          type: "Timing",
          challenge: `  You apply your second coat of color and
  immediately apply top coat without waiting.

  30 seconds later you notice the nail surface
  has developed a wrinkled, rippled texture
  that wasn't there before.`,
          text: "What caused the wrinkling and how do you prevent it?",
          options: [
            "The top coat brush picked up color — use a clean brush next time",
            "Top coat solvents attacked the still-wet color beneath — always wait 3–5 minutes before top coat",
            "The color coat was too thin — thick coats resist solvent intrusion",
            "You used incompatible brands — wrinkling only occurs with brand mismatches",
          ],
          correctIndex: 1,
          explanation: "Wrinkling (solvent popping) occurs when top coat solvents penetrate the not-yet-set color layer beneath, causing it to lift and ripple. The fix: wait 3–5 minutes after the final color coat before applying top coat. Quick-dry drops can accelerate color setting if you need to move faster.",
        },
        {
          id: "nails-06-q3",
          type: "Product Selection",
          challenge: `  Client profiles:

  CLIENT A: Ridged nail surface, wants smooth result
  CLIENT B: Brittle nails that break easily
  CLIENT C: Normal nails, wants manicure to dry fast
  CLIENT D: Gel manicure client`,
          text: "Match each client to their ideal base coat type:",
          options: [
            "A=ridge-filler, B=strengthening, C=regular, D=gel base coat",
            "A=strengthening, B=ridge-filler, C=gel base, D=regular",
            "A=regular, B=ridge-filler, C=strengthening, D=gel base coat",
            "All clients should use the same universal base coat",
          ],
          correctIndex: 0,
          explanation: "Ridge-filler base coats are thick formulas that fill in uneven nail surfaces for a smooth finish (Client A). Strengthening base coats contain calcium, keratin, or biotin for fragile nails (Client B). Regular base coat works for average nails (Client C). Gel base coats require UV/LED curing and are part of the gel system (Client D). Always choose base coat type based on client nail condition.",
        },
        {
          id: "nails-06-q4",
          type: "Application Order",
          challenge: `  You're finishing a manicure. Your client wants
  to leave quickly. You have quick-dry drops.

  OPTION A: Apply quick-dry drops first, then top coat
  OPTION B: Apply top coat first, then quick-dry drops
  OPTION C: Apply quick-dry drops between color coats
             and after top coat`,
          text: "What is the correct way to use quick-dry drops?",
          options: [
            "Option A — drops prepare the surface for faster top coat absorption",
            "Option B — apply top coat first, then drops on top of the finished manicure",
            "Option C — use drops between every layer for maximum speed",
            "Apply drops instead of top coat — they serve the same protective purpose",
          ],
          correctIndex: 1,
          explanation: "Quick-dry drops are applied on top of the completed manicure (after top coat), not before it. They work by replacing slow-evaporating solvents in the entire polish stack with fast-evaporating ones. Applying before top coat prevents the top coat from adhering properly. They also leave a conditioning oil — so apply 1–2 drops per nail at the very end.",
        },
      ],
    },
  },

  // ─── nails-07: Troubleshooting Lifting ───────────────────────────────────────
  {
    epochId: "nails",
    wonder: { name: "NAILS Magazine HQ", location: "Chatsworth, California", era: "Modern", emoji: "📰" },
    id: "nails-07",
    order: 7,
    title: "When Polish Lifts",
    subtitle: "Diagnosing and preventing lifting at the cuticle",
    category: "arts",
    xp: 150,
    badge: { id: "nails-badge-07", name: "Lifting Diagnostician", emoji: "🔍" },
    challengeType: "quiz",
    info: {
      tagline: "Lifting isn't bad luck — it always has a root cause you can find and fix.",
      year: 2019,
      overview: [
        "Lifting is when polish or gel separates from the nail plate, usually starting at the cuticle edge or the sidewalls. It is the most common complaint nail clients make, and it is almost always caused by one or more prep errors — not by the polish itself. Understanding the specific pattern of lifting tells you exactly where in your prep routine the problem occurred.",
        "Lifting at the cuticle specifically means the product was applied too close to or touching the cuticle/eponychium. When product touches living skin, the skin's oils and movement eventually break the seal. The fix: leave a 1mm gap between your product and the cuticle. This looks scary at first — it seems like you're leaving an unpainted gap — but once you apply your layers it becomes invisible.",
        "Lifting at the sidewalls means product was applied touching the lateral nail folds (skin on the sides of the nail). Same principle: any product touching skin will lift. Proper brush technique keeps product on the nail plate only, never flooding the sides. For gel systems, flooding the sides can also cause heat spikes during curing.",
      ],
      technical: {
        title: "Lifting Pattern Diagnosis",
        body: [
          "The location of lifting tells you the cause: Cuticle lifting → product too close to cuticle / missed dehydration step / cuticle not fully removed. Sidewall lifting → product flooding the sides. Tip lifting → didn't cap free edge / too-thick coat at tip. Center of nail lifting (delamination) → inadequate buffing / no surface texture / skipped primer on enhancement systems. Lifting across the entire nail → no dehydrator used.",
          "For gel systems, there is an additional cause: incomplete curing. Under-cured gel is soft and flexible, which allows the layer to separate. Always check your lamp's bulb life (typically 50,000 hours for LEDs) and ensure the nail fits within the lamp's curing zone. Curved nails and dark colors may need longer cure times.",
        ],
        codeExample: {
          label: "Lifting pattern diagnostic guide",
          code: `  LOCATION → MOST LIKELY CAUSE:

  ↑ At cuticle → product touched skin, or
                  cuticle not fully removed
  ← At sidewalls → product flooded sides
  → At free edge → free edge not capped
  ◉ Whole nail → skipped dehydrator
  ○ Center only → no surface texture (buff)

  FIX SEQUENCE:
  1. Identify lifting location
  2. Match to cause above
  3. Correct that specific step in next service`,
        },
      },
      incident: {
        title: "The 72-Hour Gel Challenge That Proved Prep is Everything",
        when: "2017 — nail educator study, online documentation",
        where: "Various nail education platforms, US and UK",
        impact: "Side-by-side comparisons of prepped vs. unprepped gel applications shared widely — the visual evidence became a cornerstone of nail education.",
        body: [
          "In 2017, several nail educators independently conducted a simple demonstration: they applied gel polish to one hand using full professional prep (buff, dehydrate, prime) and to the other hand with zero prep (polish directly on an unprepped nail). They photographed the results at 24, 48, and 72 hours.",
          "Without exception, the unprepped hand showed significant lifting by 48 hours. The fully prepped hand looked pristine at 72 hours. These images spread rapidly across nail professional social media and became some of the most-shared nail education content online — visual proof of what nail educators had been teaching for years.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Lifting Pattern", sub: "cuticle, sides, tip, center", type: "system" },
          { label: "Root Cause", sub: "prep step failure", type: "attacker" },
          { label: "Diagnosis Table", sub: "match pattern to cause", type: "victim" },
          { label: "Protocol Fix", sub: "correct the specific step", type: "result" },
        ],
      },
      timeline: [
        { year: 2000, event: "Soak-off gel polish introduced — lifting becomes major consumer complaint" },
        { year: 2008, event: "Nail brand educators begin systematic lifting diagnosis training" },
        { year: 2012, event: "1mm cuticle gap technique becomes standard teaching in gel education" },
        { year: 2017, event: "Prepped vs. unprepped comparison demonstrations go viral on nail pro platforms", highlight: true },
        { year: 2020, event: "Lifting diagnosis included in most national nail licensing exams" },
        { year: 2023, event: "AI nail analysis tools begin diagnosing lifting patterns from client photos" },
      ],
      keyTakeaways: [
        "Always leave a 1mm gap between product and the cuticle — product touching skin always lifts",
        "Lifting location tells you which prep step you missed",
        "Whole-nail lifting usually means dehydrator was skipped or nails were soaked before service",
        "For gel, also check your lamp's curing zone — under-cured gel lifts from the center",
      ],
      references: [
        { title: "NAILS Magazine: Lifting Troubleshooting Guide", url: "https://www.nailsmag.com" },
        { title: "Nail Pro: Why Gel Lifts", url: "https://www.nailpro.com" },
        { title: "CND Education: Adhesion Science", url: "https://www.cnd.com/education" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "nails-07-q1",
          type: "Diagnosis",
          challenge: `  A client returns 5 days after her gel manicure.
  The lifting is specifically at the cuticle area —
  the gel is separating right at the base of the nail,
  while the rest of the nail looks perfect.`,
          text: "What is the most likely cause of this specific lifting pattern?",
          options: [
            "The gel top coat wasn't applied — the color is exposed at the base",
            "Product was applied too close to or touching the cuticle/skin",
            "The lamp didn't cure the base coat properly at the cuticle area",
            "The client has oily skin that migrates from the cuticle onto the nail",
          ],
          correctIndex: 1,
          explanation: "Lifting specifically at the cuticle means product touched the skin. When gel or polish contacts living skin (the eponychium) or dead cuticle tissue that wasn't fully removed, the skin's oils and natural movement eventually break the product's seal. The fix: leave a 1mm gap between product and the cuticle. This looks like a gap during application but is invisible on the finished nail.",
        },
        {
          id: "nails-07-q2",
          type: "Prevention",
          challenge: `  A nail tech is applying gel base coat. She notices
  the brush is picking up a lot of product and
  the gel is flowing toward the cuticle and
  sidewalls during application.`,
          text: "What technique adjustment will prevent lifting on this client?",
          options: [
            "Apply more gel to ensure full coverage — thin spots cause more lifting",
            "Use a drier brush — wipe excess gel off the brush, start 1mm from cuticle, keep product off the skin",
            "Apply gel closer to the cuticle — the gap causes lifting because the edge is unsupported",
            "Use a faster curing lamp to set the gel before it can migrate to the skin",
          ],
          correctIndex: 1,
          explanation: "Control the product — wipe excess off the brush, start application 1mm away from the cuticle, and use a light feathering motion to stop the product at the sidewalls. Gel flows toward heat and skin; keeping the brush drier and starting away from the edges prevents flooding. The 1mm gap looks fine on the finished nail and is essential for longevity.",
        },
        {
          id: "nails-07-q3",
          type: "Pattern Match",
          challenge: `  Match each lifting pattern to its most likely cause:

  [A] Lifting across the entire nail surface
  [B] Lifting only at the sidewalls (sides of nail)
  [C] Lifting from the center of the nail (delamination)
  [D] Lifting at the free edge only`,
          text: "What causes lifting only at the sidewalls (Pattern B)?",
          options: [
            "Skipped dehydrator — the whole nail plate wasn't dehydrated",
            "Product flooded the sides and contacted the lateral nail folds",
            "The nail wasn't buffed — no surface texture in the center",
            "Free edge wasn't capped — product peeling from the tip inward",
          ],
          correctIndex: 1,
          explanation: "Sidewall lifting is caused by product contacting the lateral nail folds (the skin on the sides of the nail). Just as product touching the cuticle lifts at the base, product touching the side skin lifts at the sides. The fix is the same: keep all product on the nail plate only, never let it touch the surrounding skin.",
        },
        {
          id: "nails-07-q4",
          type: "Client Communication",
          challenge: `  A client tells you: "I've been to three different
  salons and my gel always lifts within a week.
  I must just have 'bad nails' that don't hold gel."`,
          text: "What is the most accurate professional response to this client?",
          options: [
            "Agree — some clients genuinely cannot wear gel polish due to nail chemistry",
            "Lifting almost always indicates a prep issue; with proper prep, virtually any client can wear gel",
            "She probably needs to switch to acrylic — gel doesn't work for everyone",
            "Recommend she take a break from nail services to let her nails recover",
          ],
          correctIndex: 1,
          explanation: "Lifting is almost always a prep issue, not a 'bad nail' issue. The phrase 'I can't wear gel' is almost always inaccurate — what it really means is 'every tech who has done my nails has had a prep error.' With proper dehydration, correct 1mm gap, adequate buffing, and no water contact before the service, virtually every client can wear gel. Take time to explain your prep process to her.",
        },
      ],
    },
  },

  // ─── nails-08: Troubleshooting Chipping ──────────────────────────────────────
  {
    epochId: "nails",
    wonder: { name: "Gelish Studio", location: "Burbank, California", era: "Modern", emoji: "⭐" },
    id: "nails-08",
    order: 8,
    title: "When Polish Chips",
    subtitle: "The free edge defense and other chipping solutions",
    category: "arts",
    xp: 150,
    badge: { id: "nails-badge-08", name: "Chip Preventer", emoji: "🛡️" },
    challengeType: "quiz",
    info: {
      tagline: "Chipping starts at the tip — and tip chipping is almost always preventable.",
      year: 2020,
      overview: [
        "Chipping is different from lifting. Lifting is product separating from the nail plate. Chipping is the tip or edge of the color breaking off — like a ceramic tile chipping at the corner. The most common cause is a free edge that wasn't properly sealed during application. When the tip isn't capped with each product layer, the edge of the polish stack is exposed and vulnerable to impact.",
        "The most impactful single step to prevent tip chipping: cap the free edge on every layer — base coat, each coat of color, and top coat. Drag the brush across the very tip of the nail at the end of each stroke. This seals the stack and creates a smooth, continuous barrier from the nail plate surface to the tip edge.",
        "Other causes of chipping: lifestyle and water exposure (frequent hand-washing, swimming, or household chemicals weaken polish), the nail being too long for the client's lifestyle, and incorrect product choice (traditional polish chips faster than gel on clients with active hands). Having a frank conversation with clients about their lifestyle helps set realistic expectations and choose the right service.",
      ],
      technical: {
        title: "Why Tips Chip: The Physics",
        body: [
          "The free edge of the nail is the most mechanically stressed part of the system. It is repeatedly impacted against hard surfaces — keyboards, phones, countertops. Each impact creates a tiny stress fracture at the edge of the polish stack. Over time these fractures accumulate until a visible chip breaks off.",
          "Capping creates a continuous seal around the edge. Think of it like the edge banding on a piece of plywood — without it, the edge separates; with it, the layers are unified. Thick coats at the tip are counterproductive: a thicker edge actually creates more stress concentration at the tip corner. Thin, well-sealed coats outperform thick ones.",
        ],
        codeExample: {
          label: "Free edge capping technique",
          code: `  BEFORE CAPPING:        AFTER CAPPING:

  ╔═══════════════╗      ╔═══════════════╗
  ║  TOP COAT     ║      ║  TOP COAT     ║
  ║  COLOR ×2     ║      ║  COLOR ×2     ║
  ║  BASE COAT    ║      ║  BASE COAT    ║
  ║  NAIL PLATE   ║      ║  NAIL PLATE   ║
  ╚═══════════════╝      ╚═══════════════╝
            ↑ tip: layers           ↑ tip: sealed
              exposed at edge         edge — unified`,
        },
      },
      incident: {
        title: "Gelish and the Soak-Off Revolution",
        when: "2009 — Harmony Gelish launch",
        where: "Nail industry trade show, Las Vegas",
        impact: "Soak-off gel polish, with its dramatically extended chip resistance over traditional polish, became one of the fastest-growing nail service categories in history.",
        body: [
          "Traditional nail polish chipping was so accepted as inevitable that clients planned their schedule around it — 'I'll do my nails the day before the event.' When Harmony launched Gelish in 2009 — a soak-off gel polish that cured under UV/LED and lasted 2–3 weeks without chipping — it was initially met with skepticism. Other companies followed with similar systems.",
          "Gel polish's chip resistance came from its cross-linked polymer structure after curing — significantly more durable than the evaporation-cured film of traditional polish. But gel still chips from the free edge when the tip isn't capped, reminding the industry that technique matters regardless of product chemistry.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Free Edge Impact", sub: "repeated mechanical stress", type: "attacker" },
          { label: "Uncapped Tip", sub: "exposed layer edges", type: "system" },
          { label: "Stress Fractures", sub: "accumulate over days", type: "victim" },
          { label: "Chip Breaks Off", sub: "visible damage", type: "result" },
        ],
      },
      timeline: [
        { year: 1920, event: "Traditional nail polish — chipping accepted as normal within days" },
        { year: 1978, event: "Acrylic nails offer chip-free alternative for the first time" },
        { year: 2000, event: "Gel nail systems provide improved chip resistance" },
        { year: 2009, event: "Gelish launches soak-off gel polish — 2–3 week chip resistance standard", highlight: true },
        { year: 2015, event: "Tip-chipping remains top client complaint even with gel systems" },
        { year: 2020, event: "Free edge capping becomes explicit teaching requirement in nail education" },
      ],
      keyTakeaways: [
        "Cap the free edge on every single layer — base coat, each color coat, and top coat",
        "Thick coats at the tip are worse than thin sealed coats — thickness creates stress concentration",
        "Lifestyle factors (water, chemicals, keyboard use) affect longevity — set realistic expectations",
        "Gel polish resists chipping better than traditional polish on active-hand clients",
      ],
      references: [
        { title: "Gelish Professional Education", url: "https://www.gelish.com/education" },
        { title: "NAILS Magazine: Chip Prevention Guide", url: "https://www.nailsmag.com" },
        { title: "OPI Professional: Manicure Longevity", url: "https://www.opi.com/professional" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "nails-08-q1",
          type: "Diagnosis",
          challenge: `  Client's gel manicure is chipping at the tips
  after only 4 days. The rest of the nail —
  at the cuticle, sidewalls, and center —
  looks perfect with zero lifting.`,
          text: "What is the most likely cause of this isolated tip chipping?",
          options: [
            "The gel base coat wasn't cured long enough under the lamp",
            "Free edge wasn't capped during application — the tip layers are unsealed",
            "The client used acetone on her nails which dissolved the free edge",
            "The color coat was applied too thin at the tip area",
          ],
          correctIndex: 1,
          explanation: "Isolated tip chipping with no lifting elsewhere is the classic sign of a missed or inadequate free edge cap. The nail plate itself is bonded fine — but the tip of the polish stack has exposed layer edges that break off under mechanical stress. Capping the free edge on every layer (base, color, top) seals this vulnerability.",
        },
        {
          id: "nails-08-q2",
          type: "Client Profile",
          challenge: `  Client profile:
  → Nurse — washes hands 30–40 times per day
  → Uses hand sanitizer frequently
  → Types on a keyboard 6 hours per day
  → Currently on traditional polish manicures
  → Complains polish chips by day 3 every time`,
          text: "What is the most appropriate recommendation for this client?",
          options: [
            "Switch her to gel polish and educate her about free edge capping",
            "Recommend she stop washing her hands so frequently",
            "Apply 3 coats of color instead of 2 for extra thickness",
            "Traditional polish is the only appropriate choice for medical professionals",
          ],
          correctIndex: 0,
          explanation: "This client's lifestyle (frequent handwashing, sanitizer, typing) is genuinely demanding on nail polish. Gel polish, with its cross-linked cured film, is significantly more resistant to water and mechanical stress than traditional polish. Switching to gel is the right recommendation — combined with proper free edge capping and educating her on reapplying top coat every 2–3 days to maintain the seal.",
        },
        {
          id: "nails-08-q3",
          type: "Technique",
          challenge: `  You're applying top coat to your client's nails.
  Current technique: you apply top coat across the
  nail surface only, stopping at the free edge —
  you don't bring the brush down to touch the tip.

  The client chips within 2 days every time.`,
          text: "What change to your top coat technique will directly address this?",
          options: [
            "Apply two coats of top coat instead of one",
            "After each nail, drag the brush lightly across the very tip (the free edge)",
            "Use a thicker top coat formula to build up the tip",
            "Apply top coat before the second color coat for better sealing",
          ],
          correctIndex: 1,
          explanation: "The missing step is capping the free edge with top coat. After painting the top surface of each nail, drag the brush flat across the very tip — this seals the edge and unifies all the layers. This should be done on every layer (base, color, top coat), but top coat capping is the most impactful single change you can make.",
        },
        {
          id: "nails-08-q4",
          type: "Advanced Troubleshooting",
          challenge: `  A client's nails chip at the free edge AND also
  peel starting from the tip and working inward.
  This happens with both gel and regular polish.

  You notice her nails are naturally long and
  quite thin/flexible.`,
          text: "Beyond application technique, what underlying issue is likely contributing to the peeling?",
          options: [
            "Her nail plates are dehydrated from polish remover — take a break from nail services",
            "Thin, flexible nails flex under impact, creating stress at the free edge that breaks the rigid polish film",
            "She's applying hand lotion which migrates under the polish from the free edge",
            "Thin nails have lower keratin density, making them chemically incompatible with gel",
          ],
          correctIndex: 1,
          explanation: "Thin, flexible nails are a common and genuine challenge. The nail plate flexes under pressure (typing, gripping), but the cured gel or dried polish film is relatively rigid. This flex creates stress at the free edge that eventually cracks the product. Solutions: keep nails at a shorter length (less leverage for flexing), use a flexible gel formula, and apply gel rebuilder or base coat to add some structure to the nail.",
        },
      ],
    },
  },

  // ─── nails-09: Starting a Teen Nail Business ─────────────────────────────────
  {
    epochId: "nails",
    wonder: { name: "Young Nails Academy", location: "Anaheim, California", era: "Modern", emoji: "🚀" },
    id: "nails-09",
    order: 9,
    title: "Your Teen Nail Business",
    subtitle: "Pricing, supplies, and getting your first clients",
    category: "arts",
    xp: 200,
    badge: { id: "nails-badge-09", name: "Young Entrepreneur", emoji: "💰" },
    challengeType: "quiz",
    info: {
      tagline: "You already have the skill. Now build the business around it.",
      year: 2023,
      overview: [
        "Starting a nail business as a teenager is completely achievable — nail supplies are relatively affordable, the service is in constant demand, and you can start with friends and family to build your portfolio before charging professional rates. The key steps: build your skill to a consistent professional level, invest in a starter supply kit, document your work on social media, and price your services correctly from the start.",
        "The most common mistake teen nail business owners make is underpricing. Charging $5 for a full manicure feels safer — but it communicates low quality, attracts clients who don't value the craft, and means you're working for less than minimum wage once you factor in supplies and time. Research local salon pricing, charge 20–30% less as a new provider, and raise prices as your skill improves.",
        "Social media is your best marketing tool at zero cost. Instagram and TikTok are visual platforms perfectly suited for nail art. Post every set you do — even on yourself. Before-and-after photos, process videos, and satisfied client posts build credibility faster than any advertisement. Use local hashtags to reach clients in your area.",
      ],
      technical: {
        title: "Starter Supply Budget and Pricing Model",
        body: [
          "A functional starter nail kit can be assembled for $80–$150: gel polish set ($30–$50 for a starter kit of 12 colors), LED lamp ($25–$40 for a basic 48W lamp), base and top coat ($10–$15), nail files and buffers ($5–$10), cuticle tools ($10–$15), lint-free wipes and alcohol prep pads ($5). Add cuticle oil and hand lotion for the finishing touch.",
          "Pricing formula: calculate your supply cost per service (typically $2–$5 in materials for a gel manicure), add your time (1–1.5 hours), and compare to local salon rates. If salons charge $35–$45 for a gel manicure, starting at $25–$30 positions you as an affordable alternative with comparable quality. Raise prices by $5 increments as demand increases.",
        ],
        codeExample: {
          label: "Pricing model worksheet",
          code: `  SERVICE: Gel Manicure
  ───────────────────────────────
  Supply cost per service:  $ 4
  Time: 1.5 hours × $15/hr: $22
  ───────────────────────────────
  Cost floor:               $26
  Local salon rate:         $40
  Your starter price:       $28-32

  After 20 satisfied clients:
  Your price:               $33-37

  Rule: Never go below cost floor.
  Raise prices as demand fills schedule.`,
        },
      },
      incident: {
        title: "The Teenager Who Built a $5,000/Month Nail Business Before Graduation",
        when: "2021 — documented on TikTok and later featured in business media",
        where: "Suburban Texas",
        impact: "Demonstrated that a teen nail business, built correctly with social media and proper pricing, can generate significant income within one school year.",
        body: [
          "In 2021, a 17-year-old in suburban Texas documented her nail business journey on TikTok. She started by practicing on friends, invested $120 in a starter kit, and built an Instagram portfolio of 30 sets before charging her first paying client. Within 8 months, she was fully booked on weekends and generating over $5,000 per month — enough to fund her college savings.",
          "Key factors in her success: consistent documentation (she posted every single set), transparent pricing, and responding to every message and comment within an hour. She was professional in her communication before she was professional in her prices — and that built trust that translated into referrals.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Build Skills First", sub: "practice before charging", type: "system" },
          { label: "Price Correctly", sub: "cover costs + your time", type: "attacker" },
          { label: "Document Everything", sub: "Instagram/TikTok portfolio", type: "victim" },
          { label: "Referrals Grow It", sub: "happy clients × social proof", type: "result" },
        ],
      },
      timeline: [
        { year: 2010, event: "Instagram launches — visual nail art content begins building audiences" },
        { year: 2016, event: "Teen nail entrepreneurs begin appearing on social media" },
        { year: 2018, event: "TikTok process videos create new format for nail content marketing" },
        { year: 2020, event: "COVID at-home beauty boom increases demand for local nail services" },
        { year: 2021, event: "Teen nail business success stories go viral, inspiring a generation of young techs", highlight: true },
        { year: 2023, event: "Teen nail entrepreneurs use social proof to charge near-professional rates" },
      ],
      keyTakeaways: [
        "Never underprice — charge based on supply cost plus time from the start",
        "Document every set on social media — your portfolio IS your marketing",
        "Respond to messages quickly — professional communication builds trust before pricing does",
        "Start with friends and family to build your portfolio, then expand to paying clients",
      ],
      references: [
        { title: "Young Nails: Starting in the Nail Industry", url: "https://www.youngnails.com" },
        { title: "NailPro: Business of Nails", url: "https://www.nailpro.com" },
        { title: "SBA: Young Entrepreneurs Guide", url: "https://www.sba.gov/business-guide/10-steps-start-your-business" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "nails-09-q1",
          type: "Pricing Strategy",
          challenge: `  Local salons charge $38–$45 for a gel manicure.
  Your supply cost per service is $4.
  Your service takes 1.5 hours.
  You've completed 15 practice sets so far.

  A friend suggests: "Charge $10 — you'll get
  more clients and build faster."`,
          text: "What is the problem with charging $10 for your service?",
          options: [
            "It's lower than salon rates — clients expect salon quality at any price",
            "At $10, after $4 in supplies you keep $6 for 1.5 hours — that's $4/hr, far below your time's value",
            "Clients won't believe $10 nails are real — they'll assume they look bad",
            "You can't cover your lamp cost if you charge $10",
          ],
          correctIndex: 1,
          explanation: "After $4 in supplies you keep $6 for 1.5 hours of work — that's $4/hour before you account for time on marketing, communication, and travel. Underpricing also attracts clients who don't value the craft and are the most likely to be difficult. A better starting price is $25–$30: covers your costs, values your time, and still undercuts salons by 30%.",
        },
        {
          id: "nails-09-q2",
          type: "Marketing",
          challenge: `  You've done 20 sets on friends and family.
  Your work looks professional.
  You have 3 photos on your phone.

  You want to start getting paying clients.
  Your $0 marketing options:
  [A] Instagram page with portfolio photos
  [B] TikTok process videos
  [C] Word of mouth from friends
  [D] Local Facebook community group posts`,
          text: "Which combination of marketing strategies will build your client base fastest for $0?",
          options: [
            "Only word of mouth — social media is too time-consuming for beginners",
            "All four — but prioritize Instagram + TikTok with consistent posting and local hashtags",
            "Only TikTok — video content outperforms photos in all scenarios",
            "Facebook groups only — local targeting reaches paying clients faster than national platforms",
          ],
          correctIndex: 1,
          explanation: "Use all available channels, but prioritize Instagram (visual portfolio) and TikTok (process videos) as they are the natural platforms for nail content. Post every set you do — consistency matters more than perfection. Use local hashtags (#[yourcity]nails, #[yourcity]nailtech). Ask every client to tag you when they show off their nails. This compound approach builds faster than any single channel.",
        },
        {
          id: "nails-09-q3",
          type: "Business Decision",
          challenge: `  A new client books you for a gel manicure.
  She has elaborate nail art requests and
  wants: full gel manicure + detailed hand-
  painted botanical art on all 10 nails.
  Your current pricing: $30 flat for gel.
  Estimated time: 3 hours.`,
          text: "What is the correct pricing approach for this nail art request?",
          options: [
            "Charge the same $30 — nail art is included as a sign of your skill",
            "Charge a nail art add-on fee — nail art takes significant extra time and skill",
            "Decline the request — nail art is too advanced for a teen business",
            "Charge double ($60) regardless of actual time — nail art is always premium",
          ],
          correctIndex: 1,
          explanation: "Always charge for nail art as an add-on, not included in your base price. Research what local salons charge for nail art ($5–$15+ per nail depending on complexity) and price accordingly. For a 3-hour service, your price should reflect your time: base gel price + nail art fee. Never give away skill — nail art takes practice and should be compensated.",
        },
        {
          id: "nails-09-q4",
          type: "Professionalism",
          challenge: `  A client books you, you hold the time, and
  she doesn't show up. No text, no call.
  This is the second time she's done this.

  Your options:
  [A] Keep taking her bookings — she's a paying client
  [B] Require a non-refundable deposit from all clients going forward
  [C] Announce on your social media that clients who no-show are rude
  [D] Block her number and move on`,
          text: "What is the most professional and business-smart response?",
          options: [
            "Option A — every client is worth keeping, even unreliable ones",
            "Option B — implement a deposit policy; it protects your time and filters serious clients",
            "Option C — public accountability discourages no-shows from everyone",
            "Option D — blocking is the fastest way to protect your schedule",
          ],
          correctIndex: 1,
          explanation: "A deposit policy (typically 25–50% of service price, collected at booking) is the professional standard for independent beauty providers. It protects your time, ensures clients have skin in the game before the appointment, and filters out clients who aren't serious. Always enforce it professionally and consistently — and communicate it clearly at booking, not after a no-show.",
        },
      ],
    },
  },

  // ─── nails-10: Opening a Nail Salon ──────────────────────────────────────────
  {
    epochId: "nails",
    wonder: { name: "Small Business Administration", location: "Washington, D.C.", era: "Modern", emoji: "🏛️" },
    id: "nails-10",
    order: 10,
    title: "Opening Your Own Nail Salon",
    subtitle: "Licensing, location, equipment, and your business plan",
    category: "arts",
    xp: 250,
    badge: { id: "nails-badge-10", name: "Salon Owner", emoji: "🏠" },
    challengeType: "quiz",
    info: {
      tagline: "A salon is not just a nail business — it is a business that does nails. The distinction matters.",
      year: 2023,
      overview: [
        "Opening a nail salon requires more than skill — it requires licensing, business structure, a physical space, equipment investment, and operational systems. Every state in the US requires nail technicians to hold a nail technician license (typically 300–600 hours of cosmetology school plus a state board exam). A salon also needs a separate salon license, a business license from the city, and compliance with health department regulations.",
        "Location is critical for a retail beauty business. High foot traffic areas, proximity to other complementary businesses (hair salons, spas, boutiques), and accessible parking all drive walk-in business. Commercial lease terms, buildout costs, and ongoing rent are the biggest financial risks in opening a salon. Many successful salon owners start by renting a booth inside an existing salon before taking on a full commercial lease.",
        "Startup costs for a small nail salon (2–4 stations) typically range from $15,000 to $50,000: equipment ($2,000–$5,000 per station including table, chair, client chair, and lamp), build-out and decor ($5,000–$20,000), initial supplies ($2,000–$3,000), licensing and permits ($500–$2,000), and working capital for the first 3–6 months of expenses.",
      ],
      technical: {
        title: "The Nail Salon Business Model",
        body: [
          "Revenue model: a nail salon earns money per service. Average service ticket in the US: gel manicure $35–$55, pedicure $45–$65, nail art add-ons $5–$25. A single technician can serve 4–6 clients per day. A 3-chair salon fully booked can generate $800–$1,500 per day in gross revenue. Expenses (rent, supplies, utilities, insurance, staff) typically consume 60–70% of revenue.",
          "Staff models: you can hire technicians as employees (you pay payroll taxes and benefits, but control scheduling and quality) or rent chairs to independent contractors (less management, but also less control). Most small salons start with owner-operated booths and grow into hiring employees as demand justifies it.",
        ],
        codeExample: {
          label: "Simple salon P&L model",
          code: `  3-CHAIR NAIL SALON (monthly):
  ─────────────────────────────────────────
  Revenue (3 techs × 5 clients/day × $45
  × 22 working days):           $14,850

  Expenses:
    Rent (commercial space):    - $3,500
    Supplies and product:       - $1,500
    Staff wages (2 employees):  - $4,400
    Insurance + utilities:      - $800
    Licenses + misc:            - $300
  ─────────────────────────────────────────
  Net profit (owner-tech):      ~ $4,350/mo`,
        },
      },
      incident: {
        title: "How the Booth Rental Model Changed Salon Ownership",
        when: "1980s — emergence of booth rental in American beauty industry",
        where: "California (first state to formally regulate booth rental)",
        impact: "Booth rental gave thousands of nail techs a path to business ownership without the full risk of a salon lease — it became the dominant model in American nail salons.",
        body: [
          "Before booth rental became widespread, becoming a salon owner meant taking on a full commercial lease — a significant financial risk for someone just out of cosmetology school. The booth rental model, which emerged in California in the 1980s, changed this: a salon owner rents individual workstations to independent technicians, who pay a flat weekly rent and keep their own revenue.",
          "For nail techs, booth rental offered a path to building an independent client base within an established space. Today, the majority of nail salons in the US operate on some form of booth rental or commission model. Many nail salon owners started as booth renters, built their clientele, saved their revenue, and eventually opened their own space.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Licensing", sub: "nail tech + salon + city permits", type: "system" },
          { label: "Location", sub: "foot traffic + lease terms", type: "attacker" },
          { label: "Equipment", sub: "$2k–$5k per station", type: "victim" },
          { label: "Operations", sub: "booking, pricing, staffing, marketing", type: "result" },
        ],
      },
      timeline: [
        { year: 1980, event: "Booth rental model emerges in California nail and hair salons" },
        { year: 1990, event: "Vietnamese-American nail salon community begins rapid US expansion" },
        { year: 2000, event: "Nail salon industry reaches $6 billion in US annual revenue" },
        { year: 2010, event: "Gel polish boom drives demand for new nail-only salon concepts" },
        { year: 2020, event: "COVID forces digital booking and contactless systems — industry adapts" },
        { year: 2023, event: "US nail salon industry estimated at $12+ billion annually", highlight: true },
      ],
      keyTakeaways: [
        "Get your nail technician license first — no state allows you to operate without it",
        "Consider booth rental inside an existing salon before taking on a commercial lease",
        "Plan for 3–6 months of operating expenses in reserve before opening day",
        "Your business reputation is built before you open — build your client list and social media first",
      ],
      references: [
        { title: "SBA: Start Your Business Guide", url: "https://www.sba.gov/business-guide/10-steps-start-your-business" },
        { title: "NAILS Magazine: Opening a Salon", url: "https://www.nailsmag.com" },
        { title: "Professional Beauty Association: Business Resources", url: "https://www.probeauty.org" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "nails-10-q1",
          type: "Licensing",
          challenge: `  You want to open a nail salon in your state.
  You've been doing nails for 2 years as a teen
  entrepreneur (unlicensed).

  Your state requires:
  → 400 hours of accredited nail tech school
  → State board exam (written + practical)
  → Salon license (separate from personal license)
  → City business license`,
          text: "What is the correct first step to legally open a nail salon?",
          options: [
            "Apply for a salon license — the personal license can come later",
            "Complete accredited nail tech school hours, pass the state board exam, then apply for salon and business licenses",
            "Open the salon first, then get licensed within your first year of operation",
            "A teen business operating from home doesn't require licensing",
          ],
          correctIndex: 1,
          explanation: "Licensing is sequential: you must hold a personal nail technician license before you can operate a salon. Complete your required school hours, pass the state board exam (written and practical), then apply for a salon license and city business license. Operating without a license is illegal and can result in fines, closure, and permanent license denial.",
        },
        {
          id: "nails-10-q2",
          type: "Business Strategy",
          challenge: `  You have $8,000 saved. Opening a full salon
  (2 stations) in a commercial space costs
  $20,000–$35,000 in your area.

  Alternatives:
  [A] Rent a booth in an existing nail salon: $150–$250/week
  [B] Wait 2 more years, save more money
  [C] Open from your home (spare bedroom)
  [D] Take out a $30,000 small business loan immediately`,
          text: "What is the most financially prudent path given your current capital?",
          options: [
            "Option D — a loan is the fastest path to a real salon",
            "Option A — booth rental lets you build a client base and income with minimal risk",
            "Option C — home-based is the cheapest start, no lease needed",
            "Option B — never open until you have full funding available",
          ],
          correctIndex: 1,
          explanation: "Booth rental is the classic 'best first step' for aspiring salon owners. It lets you build a client base, grow your income, develop your business skills, and save capital — all within a professional space, without a commercial lease. Most successful salon owners spent 1–3 years as booth renters before opening independently. Don't skip this step to take on debt prematurely.",
        },
        {
          id: "nails-10-q3",
          type: "Location",
          challenge: `  You're choosing between two commercial spaces:

  SPACE A: High foot traffic strip mall next to a
           hair salon and coffee shop. Rent: $2,800/mo.
           No parking lot (street parking only).

  SPACE B: Quieter neighborhood plaza. Rent: $1,800/mo.
           Large parking lot. Near residential area.`,
          text: "What factors most determine which space is better for a nail salon?",
          options: [
            "Always choose the lower rent — financial conservatism is the top priority",
            "Evaluate foot traffic, complementary neighbors, parking, and whether your target clients are walk-ins or by-appointment",
            "Always choose the higher traffic location — visibility beats savings",
            "Hair salon proximity is a conflict of interest — avoid being near competing beauty businesses",
          ],
          correctIndex: 1,
          explanation: "There's no universal right answer — the best space depends on your business model. If you're building appointment-based clientele, Space B's lower rent and parking may be better for the first year. If you're betting on walk-ins and proximity to foot traffic, Space A's location may justify the higher rent. Being near a hair salon is complementary, not competitive — clients who get their hair done often want nails too.",
        },
        {
          id: "nails-10-q4",
          type: "Operations",
          challenge: `  Your salon has been open for 3 months.
  You have 3 nail tech stations (you + 2 employees).
  Current challenge: clients aren't rebooking.
  They come once and don't return.

  Data: average new client → 1.2 visits before stopping.
  Industry average for loyal salons: 4–5 visits/year.`,
          text: "What system would most directly improve client retention?",
          options: [
            "Lower your prices — clients return when services are cheaper",
            "Implement a rebooking habit: rebook every client before they leave and follow up with a text 2 days after their visit",
            "Expand services — clients leave because you don't offer enough",
            "Run a social media ad campaign to attract a constant flow of new clients",
          ],
          correctIndex: 1,
          explanation: "Client retention — getting the same people to come back — is far more profitable than constantly acquiring new clients. The most effective retention tool: rebook every client before they walk out. 'Your gel will be ready for a fill/removal in 3 weeks — want to book that now?' Most clients say yes if asked directly. Follow up 2 days after their visit to confirm they love their nails. These two steps, consistently executed, dramatically improve rebooking rates.",
        },
      ],
    },
  },
];
