import type { StageConfig, EpochConfig } from "./types";

export const hairColorEpoch: EpochConfig = {
  id: "hair-color",
  name: "Hair Coloring",
  subtitle: "From Chemistry to Art",
  description: "Understand how hair absorbs color, master the level system, learn developer and lift, choose between permanent and semi-permanent formulas, apply safely, bleach and tone, correct color mistakes, and build a hair coloring business.",
  emoji: "🎨",
  color: "rose",
  unlocked: true,
};

export const hairColorStages: StageConfig[] = [
  // ─── hair-color-01: Hair Structure & Color Science ────────────────────────────
  {
    epochId: "hair-color",
    wonder: { name: "L'Oréal Professional Research Lab", location: "Paris, France", era: "Modern", emoji: "🧪" },
    id: "hair-color-01",
    order: 1,
    title: "How Color Lives in Hair",
    subtitle: "Hair structure, melanin, and the science of color absorption",
    category: "arts",
    xp: 100,
    badge: { id: "hair-color-badge-01", name: "Color Scientist", emoji: "🧬" },
    challengeType: "quiz",
    info: {
      tagline: "Hair color doesn't sit on the surface — it lives inside the strand.",
      year: 1907,
      overview: [
        "Hair is not a solid rod — it has a structure with three distinct layers. The outermost layer is the cuticle: overlapping scales, like roof tiles or fish scales, that protect the inner shaft. The middle layer is the cortex: the largest part of the hair, made up of keratin proteins and containing the hair's natural pigment (melanin). The innermost layer is the medulla: a soft central core present in coarser hair types, sometimes absent in fine hair.",
        "Color lives in the cortex. Natural hair color is determined by two types of melanin produced by cells called melanocytes in the hair follicle: eumelanin (brown and black pigment) and pheomelanin (red and yellow pigment). The combination and concentration of these two types creates every natural hair color from platinum blonde to jet black. When hair color products change hair color, they are either depositing new pigment into the cortex or removing existing melanin from it.",
        "The cuticle is the gatekeeper. For color to enter the cortex, the cuticle scales must open. Alkaline substances (like ammonia in permanent color) cause the cuticle to swell and lift. Acid substances (like vinegar or acidic conditioners) cause it to close and flatten. This is why alkaline color products deposit color effectively, and why acidic post-color treatments seal the color in and add shine.",
      ],
      technical: {
        title: "The Three Layers of the Hair Shaft",
        body: [
          "Cuticle health determines how color takes and how long it lasts. Damaged cuticles (from heat, chemical processing, or mechanical stress) have lifted, chipped, or missing scales. On damaged hair, color enters easily but also exits easily — fade is rapid. Healthy, smooth cuticles hold color longer but may require more lift from the developer to allow color to enter.",
          "Porosity is the term for how readily hair absorbs and releases moisture and color. Low porosity hair has tightly closed cuticles — it's harder to color and takes longer, but holds color well. High porosity hair has open, damaged cuticles — it absorbs color quickly but fades quickly too. Understanding your client's porosity guides formula choices, processing times, and aftercare recommendations.",
        ],
        codeExample: {
          label: "Hair shaft cross-section",
          code: `  ╔═══════════════════════════════════════╗
  ║  CUTICLE  (outermost — overlapping    ║
  ║           scales, protects cortex)   ║
  ║  ┌───────────────────────────────┐   ║
  ║  │  CORTEX (largest layer —      │   ║
  ║  │  keratin + melanin pigment,   │   ║
  ║  │  WHERE COLOR LIVES)           │   ║
  ║  │  ┌─────────────────────────┐ │   ║
  ║  │  │  MEDULLA (soft core,    │ │   ║
  ║  │  │  not always present)   │ │   ║
  ║  │  └─────────────────────────┘ │   ║
  ║  └───────────────────────────────┘   ║
  ╚═══════════════════════════════════════╝`,
        },
      },
      incident: {
        title: "Eugène Schueller and the Birth of Modern Hair Color",
        when: "1907 — Paris, France",
        where: "L'Oréal founding — Paris laboratory",
        impact: "The first synthetic hair dye, Aureale (later L'Oréal), transformed hair coloring from a hazardous home experiment into a professional service — and created a $100+ billion global industry.",
        body: [
          "In 1907, French chemist Eugène Schueller developed the first synthetic hair dye, which he called Aureale (later renamed L'Oréal). Before this, hair coloring used hazardous plant-based dyes and metallic salts that could cause scalp burns, unpredictable colors, and green or black residue. Schueller's para-phenylenediamine (PPD)-based formula was safer, more predictable, and created consistent colors.",
          "Schueller's formula used oxidative chemistry — the same fundamental chemistry used in professional hair color today. PPD molecules penetrate the cuticle, enter the cortex, and are oxidized by hydrogen peroxide into larger molecules that cannot escape. More than a century later, PPD remains a core component of most permanent hair color formulas, along with significant safety improvements.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Cuticle", sub: "opens to allow color entry", type: "system" },
          { label: "Developer (H₂O₂)", sub: "opens cuticle, oxidizes color", type: "attacker" },
          { label: "Cortex", sub: "melanin lives here", type: "victim" },
          { label: "Color Deposits", sub: "new pigment in cortex", type: "result" },
        ],
      },
      timeline: [
        { year: 1907, event: "Eugène Schueller creates first synthetic hair dye — L'Oréal founded", highlight: true },
        { year: 1950, event: "Clairol launches Nice 'N Easy — first at-home permanent hair color" },
        { year: 1973, event: "Revlon's Charlie campaign associates hair color with women's liberation" },
        { year: 1990, event: "Semi-permanent and demi-permanent color categories become mainstream" },
        { year: 2010, event: "Fashion colors (vivid, non-natural tones) become mainstream service" },
        { year: 2023, event: "Global hair color market exceeds $40 billion annually" },
      ],
      keyTakeaways: [
        "Color lives in the cortex — to change hair color, you must get product past the cuticle",
        "The cuticle opens in alkaline conditions (ammonia) and closes in acidic conditions",
        "Porosity determines how fast color takes and how quickly it fades",
        "Eumelanin (brown/black) and pheomelanin (red/yellow) combine to create all natural hair colors",
      ],
      references: [
        { title: "L'Oréal Professional Color Education", url: "https://www.lorealprofessionnel.com/professional/education" },
        { title: "Behind the Chair: Color Theory Fundamentals", url: "https://www.behindthechair.com" },
        { title: "Modern Salon: Hair Color Science", url: "https://www.modernsalon.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "hair-color-01-q1",
          type: "Anatomy",
          challenge: `  Hair shaft cross-section:

  OUTER LAYER: overlapping protective scales
  MIDDLE LAYER: keratin proteins + melanin pigment
  INNER LAYER: soft core (not always present)`,
          text: "Where does the hair's natural color (melanin) reside?",
          options: [
            "The cuticle — the outer scales carry the pigment",
            "The cortex — the middle layer where melanin molecules live",
            "The medulla — the central core contains the most concentrated pigment",
            "Equally distributed across all three layers",
          ],
          correctIndex: 1,
          explanation: "Melanin — the natural pigment that determines hair color — lives in the cortex, the middle layer of the hair shaft. This is also where artificial color deposits after it passes through the cuticle. The cuticle is a protective barrier; the medulla is a soft core and often pigment-free.",
        },
        {
          id: "hair-color-01-q2",
          type: "Chemistry",
          challenge: `  You apply an alkaline hair color formula to the hair.
  At pH ~10, the formula causes the cuticle scales
  to swell and lift apart.

  A few minutes later, you apply an acidic
  post-color conditioner at pH ~4.5.`,
          text: "What does the acidic conditioner do to the cuticle after coloring?",
          options: [
            "It continues to open the cuticle so color can absorb more deeply",
            "It closes and flattens the cuticle scales, sealing color in and adding shine",
            "It neutralizes the color developer inside the cortex",
            "It has no effect on the cuticle — only the cortex is affected by pH",
          ],
          correctIndex: 1,
          explanation: "Acidic substances cause the cuticle to contract and flatten — closing the scales that the alkaline color formula opened. This seals the new color inside the cortex, reduces fade, and creates a smoother surface that reflects light more evenly (producing shine). This is why most color services end with an acidic post-color treatment or conditioner.",
        },
        {
          id: "hair-color-01-q3",
          type: "Porosity",
          challenge: `  CLIENT A: Natural hair, never chemically processed,
  smooth and shiny. Color takes a long time to process.

  CLIENT B: Bleached 3 times, heat-damaged, dull and
  rough to the touch. Color absorbs in 10 minutes
  but fades in 2 weeks.`,
          text: "What explains the difference in how these clients' hair behaves with color?",
          options: [
            "Client A has more melanin, which resists artificial color",
            "Client A has low porosity (closed cuticles) — takes longer to absorb but holds longer. Client B has high porosity (damaged cuticles) — absorbs fast but fades fast",
            "Client B's bleached hair has no cortex remaining — color sits on the surface only",
            "The difference is entirely due to hair thickness, not porosity",
          ],
          correctIndex: 1,
          explanation: "Porosity is the key variable. Client A's virgin hair has healthy, closed cuticle scales (low porosity) — it resists color entry but holds it well once inside. Client B's chemically damaged hair has open, damaged cuticle scales (high porosity) — color rushes in but also rushes out. Adjustments for high porosity hair: use lower developer, shorter processing time, and recommend color-specific aftercare products.",
        },
        {
          id: "hair-color-01-q4",
          type: "Natural Color",
          challenge: `  Two clients:

  CLIENT A: Dark brown hair with warm reddish tones
            when in sunlight

  CLIENT B: Naturally platinum blonde with cool tones`,
          text: "What combination of melanin types explains these different natural hair colors?",
          options: [
            "Client A has only eumelanin; Client B has only pheomelanin",
            "Client A has high eumelanin + moderate pheomelanin; Client B has minimal eumelanin + minimal pheomelanin",
            "Both have the same melanin types — the difference is only in strand thickness",
            "Natural hair color is determined by the cuticle, not melanin types",
          ],
          correctIndex: 1,
          explanation: "Eumelanin produces dark brown/black tones; pheomelanin produces red/yellow/warm tones. Client A's dark brown with warm red undertones indicates high eumelanin with moderate pheomelanin. Client B's platinum blonde indicates very low concentrations of both types — the hair appears pale because there is very little melanin of any type to absorb light.",
        },
      ],
    },
  },

  // ─── hair-color-02: The Level System ──────────────────────────────────────────
  {
    epochId: "hair-color",
    wonder: { name: "Wella Professionals Academy", location: "Darmstadt, Germany", era: "Modern", emoji: "⭐" },
    id: "hair-color-02",
    order: 2,
    title: "The Level System",
    subtitle: "Reading the numbers on the tube — 1 to 10 and what they mean",
    category: "arts",
    xp: 100,
    badge: { id: "hair-color-badge-02", name: "Level Reader", emoji: "📊" },
    challengeType: "quiz",
    info: {
      tagline: "Every professional hair color conversation starts with levels. Level 1 is black. Level 10 is lightest blonde.",
      year: 1975,
      overview: [
        "The hair color level system is a standardized numerical scale from 1 to 10 that measures the lightness or darkness of hair color — regardless of tone. Level 1 is the darkest (black). Level 10 is the lightest (platinum blonde). Every natural hair color and every artificial hair color formula is assigned a level. A Level 6 could be a warm golden brown or a cool ash brown — the level only tells you how light or dark, not the tone.",
        "Why levels matter: to achieve a desired color result, you need to understand both where the client's hair currently is (their existing level) and where they want to go. Going darker is always easier — you can deposit darker color on any level without lightening. Going lighter requires lifting existing melanin, which requires developer and may require bleach for significant lift.",
        "The rule of thumb for how many levels you can lift with standard permanent color plus developer: 20 volume developer lifts 1–2 levels, 30 volume lifts 2–3 levels, 40 volume lifts 3–4 levels. Going more than 4 levels lighter with standard color (without bleach) usually produces unsatisfactory results — the underlying pigment remains and creates unwanted warm tones.",
      ],
      technical: {
        title: "Understanding Underlying Pigment",
        body: [
          "As hair is lightened, it passes through a predictable series of underlying pigment stages (also called the lifting stages): black → dark brown → brown → red-brown → red → red-orange → orange → yellow-orange → yellow → pale yellow → near-white. These stages are caused by the removal of eumelanin (dark pigment) revealing the more resistant pheomelanin (warm/red/yellow pigment) beneath.",
          "Knowing the underlying pigment level is essential for predicting results. A client at Level 4 (dark brown) who wants to go Level 7 (medium blonde) will pass through red-orange and orange stages during lifting. Without toning, she will be orange-blonde, not clean blonde. The toner after lifting corrects this.",
        ],
        codeExample: {
          label: "The level system and underlying pigment",
          code: `  LEVEL  DESCRIPTION         UNDERLYING PIGMENT
  ─────────────────────────────────────────────
  1      Black               —
  2      Darkest Brown       Red-Brown
  3      Dark Brown          Red-Brown
  4      Medium Brown        Red
  5      Light Brown         Red-Orange
  6      Dark Blonde         Orange
  7      Medium Blonde       Yellow-Orange
  8      Light Blonde        Yellow
  9      Very Light Blonde   Pale Yellow
  10     Lightest Blonde     Very Pale Yellow`,
        },
      },
      incident: {
        title: "How Schwarzkopf Standardized Color Communication",
        when: "1960s–1970s — professional hair color standardization era",
        where: "European professional hair color industry",
        impact: "The adoption of a standardized level and tone numbering system made it possible for colorists worldwide to communicate precisely about hair color for the first time.",
        body: [
          "Before standardized level systems, hair color communication was chaotic. One brand's 'dark blonde' was another's 'medium blonde.' Colorists visiting other salons or working with clients from other cities had no shared language. Schwarzkopf Professional, among other European brands, pushed for standardization of the numbering system in professional hair color education in the late 1960s and 1970s.",
          "The result — the 1–10 level scale combined with a secondary number for tone (e.g., 6.1 = Level 6, ash tone) — became the international professional standard. Today, every professional hair color brand uses this system or a close variant, enabling precise communication between colorists, brand educators, and clients across languages and borders.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Current Level", sub: "how light/dark now", type: "system" },
          { label: "Target Level", sub: "desired result", type: "attacker" },
          { label: "Developer Strength", sub: "20/30/40 vol for lift", type: "victim" },
          { label: "Color Result", sub: "achieved level + tone", type: "result" },
        ],
      },
      timeline: [
        { year: 1907, event: "First synthetic hair color — no standardized system exists" },
        { year: 1960, event: "Professional hair color brands begin internal level classification systems" },
        { year: 1975, event: "International standardization of 1–10 level scale in professional hair color", highlight: true },
        { year: 1985, event: "Level/tone numbering system adopted by major brands globally" },
        { year: 2000, event: "Level system taught as foundational theory in all cosmetology programs" },
        { year: 2023, event: "Digital color matching tools use level system as primary reference" },
      ],
      keyTakeaways: [
        "Levels 1–10 measure only lightness/darkness — they say nothing about tone (warm vs. cool)",
        "Going darker always works; going lighter requires understanding developer volumes",
        "Underlying pigment reveals as hair lifts — always predict what will be revealed before lifting",
        "More than 4 levels of lift with standard color usually requires bleach for clean results",
      ],
      references: [
        { title: "Wella Professionals: Color Theory", url: "https://www.wellprofessionals.com/en-US/color-education" },
        { title: "Behind the Chair: The Level System Explained", url: "https://www.behindthechair.com" },
        { title: "Modern Salon: Color Fundamentals", url: "https://www.modernsalon.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "hair-color-02-q1",
          type: "Level Identification",
          challenge: `  LEVEL SCALE:
  1=Black  2=Darkest Brown  3=Dark Brown
  4=Med Brown  5=Light Brown  6=Dark Blonde
  7=Med Blonde  8=Light Blonde  9=VL Blonde
  10=Lightest Blonde

  Client: natural dark brown hair with slight
  reddish tones in sunlight.`,
          text: "What is the most likely natural level for this client?",
          options: [
            "Level 1–2 (black to darkest brown)",
            "Level 3–4 (dark brown to medium brown)",
            "Level 6–7 (dark to medium blonde)",
            "Level 8–9 (light to very light blonde)",
          ],
          correctIndex: 1,
          explanation: "Dark brown with reddish tones in sunlight is characteristic of Level 3–4. The reddish tones indicate underlying pheomelanin (red pigment) becoming visible in certain lights — typical for medium-dark brown. Level 1–2 would appear virtually black with no red tones visible.",
        },
        {
          id: "hair-color-02-q2",
          type: "Lift Calculation",
          challenge: `  CLIENT GOAL:
  Current level: 5 (light brown)
  Desired level: 8 (light blonde)
  Amount of lift needed: 3 levels

  Available developers:
  → 10 volume (minimal lift, deposit only)
  → 20 volume (1–2 levels of lift)
  → 30 volume (2–3 levels of lift)
  → 40 volume (3–4 levels of lift)`,
          text: "Which developer volume is most appropriate for this 3-level lift?",
          options: [
            "20 volume — more gentle is always better",
            "10 volume — reduces damage",
            "30 volume — provides the 2–3 levels of lift needed",
            "40 volume — maximum lift ensures the goal is reached",
          ],
          correctIndex: 2,
          explanation: "30 volume developer provides 2–3 levels of lift — the right range for this client's goal of going from Level 5 to Level 8 (3 levels). 20 volume would only lift 1–2 levels, falling short of the goal. 40 volume provides more lift than needed, increasing unnecessary damage. Always use the minimum developer volume needed to achieve the desired result.",
        },
        {
          id: "hair-color-02-q3",
          type: "Underlying Pigment",
          challenge: `  A client at Level 6 (dark blonde) wants to go
  to Level 9 (very light blonde) using standard
  permanent color only (no bleach).

  During processing, her hair passes through
  the orange stage and stalls — the color
  lifts her to approximately Level 7.5 with
  a distinct orange cast.`,
          text: "What is causing the orange cast and why didn't she reach Level 9?",
          options: [
            "The color formula was wrong — she should have used a different brand",
            "Underlying pheomelanin (warm/orange pigment) was revealed as eumelanin lifted, and standard color can't lift more than 3–4 levels — a bleach would be needed",
            "Her hair is too resistant from previous coloring",
            "The developer volume was too high, oxidizing the pigment orange",
          ],
          correctIndex: 1,
          explanation: "As dark hair lifts, eumelanin (dark pigment) is removed first, revealing the more resistant pheomelanin (warm/orange/yellow pigment) beneath. At Level 6, the underlying pigment is in the orange zone. Standard permanent color cannot lift more than 3–4 levels — getting from 6 to 9 (3 levels) is at the outer edge. A bleach step would be needed for a clean lift to Level 9 without orange tones.",
        },
        {
          id: "hair-color-02-q4",
          type: "Level vs. Tone",
          challenge: `  Two color formulas:
  FORMULA A: 7.1 (Level 7, ash/cool tone)
  FORMULA B: 7.3 (Level 7, gold/warm tone)

  A client wants Level 7 results but
  specifically doesn't want warm tones
  because she has naturally warm, brassy hair.`,
          text: "Which formula is correct for this client and why?",
          options: [
            "Formula B (7.3) — warm formulas always work better on warm natural hair",
            "Formula A (7.1) — the .1 (ash) tone will neutralize warm/brassy tones",
            "Either formula — the level number determines the result, not the tone",
            "Neither — she needs a Level 8 formula to cool down her warmth",
          ],
          correctIndex: 1,
          explanation: "Formula A (7.1) is correct. The tone number after the decimal tells you the color direction: .1 is ash (blue-based, cools warm tones), .3 is gold (warm, adds warmth). For a client with naturally warm/brassy hair, an ash formula will neutralize and counteract those tones. The level (7) tells you how dark/light; the tone (.1 vs .3) tells you warm vs. cool.",
        },
      ],
    },
  },

  // ─── hair-color-03: Tones & the Color Wheel ──────────────────────────────────
  {
    epochId: "hair-color",
    wonder: { name: "Joico Color Institute", location: "Chatsworth, California", era: "Modern", emoji: "🌈" },
    id: "hair-color-03",
    order: 3,
    title: "Tones, Undertones & the Color Wheel",
    subtitle: "Warm, cool, neutral — and how to use opposite colors to cancel",
    category: "arts",
    xp: 100,
    badge: { id: "hair-color-badge-03", name: "Tone Master", emoji: "🎨" },
    challengeType: "quiz",
    info: {
      tagline: "The color wheel is the colorist's most powerful tool. Opposite colors cancel each other out.",
      year: 1990,
      overview: [
        "Hair color tone describes the warmth or coolness of a color at any given level. A Level 7 can be warm (golden, copper), neutral (balanced), or cool (ash, matte). Tone is the second half of the formula number in professional color systems: in 7.1, the 7 is the level and .1 is the tone code for ash (cool). Common tone codes vary by brand but typically follow: .1=ash, .2=violet, .3=gold, .4=copper, .5=mahogany, .6=red, .7=brown.",
        "The color wheel — the foundational tool of all color theory — directly applies to hair coloring. The primary colors are red, yellow, and blue. Opposite colors on the wheel are complementary — and complementary colors cancel each other out when mixed. This is the principle behind toning: orange brassy tones are canceled by blue-violet (opposite on the wheel). Yellow tones are canceled by purple. Red tones are canceled by green.",
        "This is why purple shampoo neutralizes yellow tones on blonde hair. The purple (violet) pigment deposits onto the yellow tones, and since violet and yellow are complementary colors, they cancel each other, producing a cleaner, cooler blonde. The same principle governs every toning choice a colorist makes.",
      ],
      technical: {
        title: "Tone Codes and Complementary Color Correction",
        body: [
          "Professional color formulas from most brands follow a decimal notation system: the first number is level, the decimal tone codes indicate the primary and secondary tone. A formula like 7.43 means Level 7, primary tone copper (.4), secondary tone gold (.3). Understanding this notation lets you read any formula and predict the result.",
          "For color correction: identify the unwanted tone first, then select the complementary corrector. Orange hair after lifting → use blue-based (ash) toner at the correct level. Brassy yellow-gold hair → use violet/purple toner. Green tones from swimming pool chlorine → use red-based toner. The corrector neutralizes the unwanted tone without necessarily changing the level.",
        ],
        codeExample: {
          label: "Color wheel for hair — complementary cancellation",
          code: `  COLOR WHEEL (hair coloring applications):

       BLUE  ──────────  ORANGE
       (ash toners)     (brassy lifted hair)
           ↕ cancel each other ↕

      VIOLET  ─────────  YELLOW
    (purple shampoo)   (faded blonde)
           ↕ cancel each other ↕

       GREEN  ─────────  RED
     (pool water)     (red correctors)
           ↕ cancel each other ↕

  RULE: To neutralize an unwanted tone,
        use its opposite on the color wheel.`,
        },
      },
      incident: {
        title: "Why Purple Shampoo Is a $500 Million Product Category",
        when: "2010s — purple shampoo goes mainstream in consumer beauty",
        where: "Global consumer haircare market",
        impact: "The simple application of color wheel theory to retail haircare created one of the fastest-growing haircare categories of the decade.",
        body: [
          "Purple shampoo was not invented in the 2010s — professional toning shampoos have existed for decades. But social media democratized the knowledge of color theory behind them. When beauty influencers began explaining that purple cancels yellow because they're complementary colors, millions of blonde consumers who had never heard of the color wheel began buying violet-pigmented shampoos.",
          "The result was a consumer category that grew from a niche professional product to a mainstream beauty aisle staple generating hundreds of millions in annual sales globally. The underlying principle — color wheel complementary cancellation — hadn't changed. What changed was public understanding of the science.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Unwanted Tone", sub: "brassy, yellow, orange", type: "attacker" },
          { label: "Color Wheel", sub: "find the opposite color", type: "system" },
          { label: "Complementary", sub: "blue, violet, green", type: "victim" },
          { label: "Tone Neutralized", sub: "clean, cool result", type: "result" },
        ],
      },
      timeline: [
        { year: 1666, event: "Isaac Newton first documents the color wheel" },
        { year: 1907, event: "First synthetic hair color — no standardized tone system" },
        { year: 1975, event: "Professional tone coding (.1, .2, .3 etc.) standardized", highlight: true },
        { year: 2000, event: "Purple shampoo exists as a professional-only product" },
        { year: 2015, event: "Social media explains color theory to consumers — purple shampoo goes mass market" },
        { year: 2023, event: "Purple shampoo and toning masks are top-selling haircare SKUs globally" },
      ],
      keyTakeaways: [
        "Tone is separate from level — level is how light/dark, tone is warm vs. cool",
        "Complementary colors cancel each other — this is the principle behind all toning",
        "Orange is canceled by blue, yellow is canceled by violet, red is canceled by green",
        "Purple shampoo works because violet and yellow are complementary — the science is color theory",
      ],
      references: [
        { title: "Joico Color Education", url: "https://www.joico.com/education" },
        { title: "Behind the Chair: Color Theory", url: "https://www.behindthechair.com" },
        { title: "Modern Salon: Understanding Tones", url: "https://www.modernsalon.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "hair-color-03-q1",
          type: "Color Wheel",
          challenge: `  After a bleach lift, a client's hair is orange
  (approximately Level 6 underlying pigment exposed).
  She wants a neutral Level 7 blonde result.

  Color wheel reference:
  Orange ←──────────→ Blue (complementary)`,
          text: "What type of toner would neutralize the orange and achieve a neutral blonde?",
          options: [
            "A warm golden toner — warm colors on warm hair look natural",
            "A blue-based (ash) toner at Level 7 — blue cancels orange",
            "A violet/purple toner — purple always fixes blonde issues",
            "A red toner — adds dimension to counteract the flatness of orange",
          ],
          correctIndex: 1,
          explanation: "Blue cancels orange — they're complementary colors. An ash (blue-based) toner at Level 7 will neutralize the orange tones while depositing at the desired level, producing a neutral blonde result. A violet/purple toner would be correct for yellow tones, not orange. Always identify the unwanted tone first, then select its complementary corrector.",
        },
        {
          id: "hair-color-03-q2",
          type: "Formula Reading",
          challenge: `  Professional hair color formula: 6.43

  Level system: 1 (black) → 10 (lightest blonde)
  Tone codes: .1=ash, .2=violet, .3=gold,
              .4=copper, .5=mahogany, .6=red`,
          text: "What result does formula 6.43 produce?",
          options: [
            "Level 6, ash-brown (cool, muted)",
            "Level 6, copper-gold (warm, vibrant)",
            "Level 6, violet-ash (cool, slightly purple)",
            "Level 6, neutral with subtle red tones",
          ],
          correctIndex: 1,
          explanation: "6.43 = Level 6 (dark blonde), primary tone .4 (copper), secondary tone .3 (gold). The result is a warm, vibrant copper-gold at dark blonde depth. Primary tone dominates; secondary tone adds dimension. This is a warm, earthy, autumnal color — opposite of ash or cool formulas.",
        },
        {
          id: "hair-color-03-q3",
          type: "Purple Shampoo Science",
          challenge: `  A blonde client's hair has turned yellow/gold
  over the past few weeks since her last
  toning appointment.

  You recommend purple shampoo for at-home
  maintenance. She asks: "Why purple? My hair
  is yellow, not purple."`,
          text: "How do you explain why purple shampoo works on yellow hair?",
          options: [
            "Purple shampoo contains bleach that removes the yellow pigment",
            "Purple and yellow are opposite colors on the wheel — they cancel each other, shifting yellow tones to neutral",
            "Purple deposits on top of yellow to make it look darker overall",
            "The alkaline pH of purple shampoo opens the cuticle to remove yellow molecules",
          ],
          correctIndex: 1,
          explanation: "Yellow and violet/purple are complementary colors — they sit opposite each other on the color wheel. When mixed (or layered in hair), they cancel each other out rather than creating a new color. The violet pigment in purple shampoo deposits onto yellow tones and neutralizes them, shifting the overall tone from yellow toward neutral. No bleach, no lift — pure color theory.",
        },
        {
          id: "hair-color-03-q4",
          type: "Problem Solving",
          challenge: `  A client's hair has developed green tones
  from frequent swimming in a chlorinated pool.
  (Chlorine oxidizes copper in pipes →
  green copper deposits on hair.)`,
          text: "What type of corrective treatment neutralizes green tones?",
          options: [
            "A blue-ash treatment — blue is closest to green on the color wheel",
            "A red-based treatment — red and green are complementary and cancel each other",
            "A gold/yellow treatment — warm tones overpower cool green",
            "Bleach is the only way to remove green — color correction won't work",
          ],
          correctIndex: 1,
          explanation: "Red and green are complementary colors — they cancel each other. A red-based treatment (shampoo with ketchup is a folk remedy, but professional red-pigmented products work better) neutralizes green tones. This is the same color wheel principle: find the complement, use it to neutralize. After treating the green, follow with a clarifying shampoo and moisturizing treatment.",
        },
      ],
    },
  },

  // ─── hair-color-04: Developer & Lift ──────────────────────────────────────────
  {
    epochId: "hair-color",
    wonder: { name: "Schwarzkopf Professional Academy", location: "Hamburg, Germany", era: "Modern", emoji: "⚗️" },
    id: "hair-color-04",
    order: 4,
    title: "Developer & Lift",
    subtitle: "What hydrogen peroxide does — and how to choose the right volume",
    category: "arts",
    xp: 150,
    badge: { id: "hair-color-badge-04", name: "Developer Specialist", emoji: "⚗️" },
    challengeType: "quiz",
    info: {
      tagline: "Developer does two jobs: it opens the hair and powers the color chemistry inside.",
      year: 1950,
      overview: [
        "Developer (also called oxidant or peroxide) is hydrogen peroxide (H₂O₂) diluted to various concentrations. It is the activating ingredient in permanent and demi-permanent hair color — without it, the color has no lift and no permanent deposit. Developer comes in volumes: 10 volume (3% H₂O₂), 20 volume (6%), 30 volume (9%), and 40 volume (12%). The volume number indicates the amount of oxygen released — higher volume means more oxygen, more lift, and more hair damage potential.",
        "Developer does two separate jobs simultaneously. First, it opens the cuticle (by swelling the hair shaft in the alkaline color environment) to allow color molecules to enter the cortex. Second, it oxidizes the existing melanin (lightening/lifting the hair), and it also oxidizes the color precursors in the formula — these small molecules, once oxidized inside the cortex, become larger molecules that cannot escape, permanently depositing color.",
        "Choosing the correct developer volume is a critical skill. The rule: use the lowest volume that achieves the desired level of lift. 10 volume is for deposit-only (going darker or same level) with no lift. 20 volume is the standard for 1–2 levels of lift or full grey coverage. 30 volume for 2–3 levels. 40 volume for maximum lift (3–4 levels) and is typically only used in lighteners, not standard color formulas.",
      ],
      technical: {
        title: "Developer Volumes and Their Appropriate Uses",
        body: [
          "10 volume developer (3%): Deposit only. No significant lightening. Used for toners, glazes, demi-permanent color, and when the goal is same-level color change or going darker. Minimal damage, closes cuticle gently.",
          "20 volume (6%): Standard. 1–2 levels of lift. Used for standard permanent color with grey coverage or mild lightening. The most versatile developer volume. 30 volume (9%): 2–3 levels of lift. For clients going significantly lighter without bleach. More damaging than 20 volume. 40 volume (12%): Maximum lift (3–4 levels). Typically reserved for lighteners (bleach) on resistant hair, not recommended in standard color formulas as it creates uneven, damaging results.",
        ],
        codeExample: {
          label: "Developer volume selection guide",
          code: `  GOAL                    → DEVELOPER
  ────────────────────────────────────────
  Deposit only (darker)   → 10 volume
  Same level + grey cover → 20 volume
  1–2 levels lighter      → 20 volume
  2–3 levels lighter      → 30 volume
  Maximum lift (bleach)   → 30–40 volume
  Toner after bleach      → 10–20 volume

  PRINCIPLE: Use the LOWEST volume
  that achieves the desired result.`,
        },
      },
      incident: {
        title: "How 40 Volume Became the Most Misused Product in Salons",
        when: "2000s — cosmetology education gaps documented",
        where: "Professional hair color industry, United States",
        impact: "40 volume developer misuse in standard color formulas was identified as a leading cause of hair breakage complaints in professional settings.",
        body: [
          "The logic seemed reasonable: if you want more lift, use higher developer. More strength must equal better results. This misunderstanding led to widespread overuse of 40 volume developer in standard permanent color formulas — particularly in high-volume salons where speed was prioritized over precision.",
          "The results were predictable to chemists: 40 volume in standard color creates uneven lift (because the color molecules process faster than the lift is controlled), excessive cuticle damage, and dramatically increased breakage risk. Leading brand educators began dedicating entire training sessions to developer volume education, emphasizing that 40 volume belongs in lighteners only — standard color should rarely exceed 30 volume.",
        ],
      },
      diagram: {
        nodes: [
          { label: "H₂O₂ Volume", sub: "10/20/30/40 volume", type: "system" },
          { label: "Oxygen Released", sub: "higher vol = more oxygen", type: "attacker" },
          { label: "Melanin Oxidized", sub: "lifted / lightened", type: "victim" },
          { label: "Color Deposits", sub: "oxidized molecules stay in cortex", type: "result" },
        ],
      },
      timeline: [
        { year: 1818, event: "Hydrogen peroxide discovered by Louis Jacques Thénard" },
        { year: 1867, event: "H₂O₂ first used as a hair lightener in Europe" },
        { year: 1907, event: "L'Oréal combines H₂O₂ with color precursors — modern hair color born" },
        { year: 1950, event: "Developer volume system (10/20/30/40) standardized", highlight: true },
        { year: 2000, event: "40 volume overuse becomes documented issue in salons" },
        { year: 2020, event: "Low-ammonia, lower-developer color systems gain market share" },
      ],
      keyTakeaways: [
        "Always use the lowest developer volume that achieves the desired result",
        "10 volume = deposit only; 20 = standard; 30 = significant lift; 40 = maximum lift (lighteners only)",
        "Higher developer volume = more damage — never use more than needed",
        "Developer opens the cuticle AND oxidizes melanin AND oxidizes color molecules — it does three things at once",
      ],
      references: [
        { title: "Schwarzkopf Professional Color Education", url: "https://www.schwarzkopf-professional.com/en/education" },
        { title: "Behind the Chair: Developer Guide", url: "https://www.behindthechair.com" },
        { title: "Redken Color Chemistry", url: "https://www.redken.com/education" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "hair-color-04-q1",
          type: "Developer Selection",
          challenge: `  Client wants to go from Level 4 (medium brown)
  to Level 6 (dark blonde) — that's 2 levels of lift.

  Available developers:
  10 vol (deposit only)
  20 vol (1–2 levels lift)
  30 vol (2–3 levels lift)
  40 vol (3–4 levels lift)`,
          text: "Which developer volume is most appropriate?",
          options: [
            "10 volume — always start with the gentlest option",
            "20 volume — provides the 1–2 levels needed at the lowest appropriate strength",
            "30 volume — ensures the lift goal is reached with room to spare",
            "40 volume — maximum lift guarantees the desired result",
          ],
          correctIndex: 1,
          explanation: "20 volume provides 1–2 levels of lift — exactly what this client needs to go from Level 4 to Level 6. 10 volume won't lift. 30 volume provides more lift than needed and unnecessary damage. 40 volume is excessive and should not be used in standard color formulas. Use the minimum volume that achieves the goal.",
        },
        {
          id: "hair-color-04-q2",
          type: "Chemistry",
          challenge: `  A colorist mixes permanent hair color with developer.
  She notices the mixture heating up in the bowl.

  This is a sign that:
  [A] The formula is mixing incorrectly
  [B] The exothermic oxidation reaction has started
  [C] The developer is too old / expired
  [D] Too much color was added to the developer`,
          text: "What does the warming of the color bowl indicate?",
          options: [
            "Something has gone wrong — color should never heat up during mixing",
            "The exothermic oxidation reaction has started — this is normal and expected",
            "The developer is expired and has degraded",
            "The color to developer ratio is incorrect",
          ],
          correctIndex: 1,
          explanation: "Hair color mixed with developer produces an exothermic chemical reaction — it releases heat as the oxidation chemistry begins. This is completely normal and expected. It tells you the reaction has started and the product should be applied promptly. What's not normal: very strong heat (indicates too-high developer volume or a contaminated bowl) or no warmth at all in a fast-processing formula (may indicate expired developer).",
        },
        {
          id: "hair-color-04-q3",
          type: "Toning",
          challenge: `  After bleaching a client to Level 9 (near pale yellow),
  you want to apply a toner to achieve a cool, ashy
  Level 9 result.

  Which developer should you use for toning?`,
          text: "What developer volume is appropriate for applying a toner after bleaching?",
          options: [
            "40 volume — the hair needs maximum lift to remove remaining yellow",
            "30 volume — ensures the toner penetrates the bleached hair",
            "10 volume — deposit only, no additional lift needed after bleaching",
            "No developer — toners are applied without developer",
          ],
          correctIndex: 2,
          explanation: "After bleaching to the desired level, the toning step is deposit-only — you don't need or want more lift. 10 volume developer gently opens the cuticle just enough for the toner pigment to enter the cortex, deposits the cool tone, and minimizes damage to already-processed hair. Using 20 or higher would cause unnecessary additional damage and could lift more than desired.",
        },
        {
          id: "hair-color-04-q4",
          type: "Safety",
          challenge: `  A client's hair is already significantly damaged
  from previous bleaching. She wants more
  lightening today.

  You're considering whether to use 30 or 40
  volume developer with bleach.`,
          text: "What is the professional consideration when choosing developer for damaged hair?",
          options: [
            "Always use 40 volume on damaged hair — it processes faster so less time on the hair",
            "Use the lowest volume possible to achieve the goal — damaged hair needs maximum protection from further harm",
            "Damaged hair can't process color — reschedule the appointment",
            "Developer volume doesn't matter for damaged hair — the bleach itself is the active ingredient",
          ],
          correctIndex: 1,
          explanation: "Damaged hair has compromised cuticle and cortex structure — it is more vulnerable to chemical damage, more prone to breakage, and processes faster. Always use the lowest developer volume that achieves the goal on damaged hair, extend mixing intervals conservatively, and consider whether the service is safe to perform at all. A strand test before the full service is essential on significantly damaged hair.",
        },
      ],
    },
  },

  // ─── hair-color-05: Permanent vs Semi vs Demi ────────────────────────────────
  {
    epochId: "hair-color",
    wonder: { name: "Paul Mitchell Schools", location: "Santa Barbara, California", era: "Modern", emoji: "🎓" },
    id: "hair-color-05",
    order: 5,
    title: "Permanent, Semi, and Demi",
    subtitle: "Choosing the right color system for every client",
    category: "arts",
    xp: 150,
    badge: { id: "hair-color-badge-05", name: "Formula Expert", emoji: "🧴" },
    challengeType: "quiz",
    info: {
      tagline: "Permanent colors. Semi fades. Demi sits in between. Each has its place.",
      year: 2000,
      overview: [
        "There are three main categories of professional hair color based on how long they last and how they work. Permanent hair color uses an alkaline developer to open the cuticle, remove melanin, and deposit oxidative color molecules that polymerize inside the cortex — they are too large to exit and are truly permanent until the hair grows out or is cut. It can lift (lighten) and deposit, provides full grey coverage, and lasts until regrowth.",
        "Semi-permanent color contains no developer and no ammonia. It works by depositing small color molecules directly onto and slightly into the cuticle — it cannot lift or change melanin. It sits on or near the surface of the hair and washes out gradually over 4–12 shampoos. It adds shine, refreshes color, and is excellent for color experimentation without commitment. It cannot cover resistant grey.",
        "Demi-permanent color uses a low-volume developer (5–10 volume) and contains no ammonia or a very low ammonia concentration. It enters the cortex via the slightly-open cuticle but cannot significantly lift melanin. It lasts longer than semi-permanent (20–28 shampoos) and can cover grey partially to fully depending on the grey percentage. It is the gentlest option for color change and is excellent for toning, glazing, and refreshing faded permanent color.",
      ],
      technical: {
        title: "Comparison Chart: The Three Color Types",
        body: [
          "Permanent is the most versatile — it can go lighter or darker, covers grey fully, and lasts until cut or regrowth. The trade-off is the most chemical processing: ammonia opens the cuticle aggressively, developer lifts melanin, and the hair is permanently altered. Repeated permanent color without conditioning maintenance damages hair over time.",
          "Demi is the salon professional's secret weapon. It doesn't lift but it deposits beautifully, lasts long enough to matter, fades gracefully (no harsh line of demarcation), and is significantly gentler than permanent. Many colorists use permanent at the roots for grey coverage and demi through the lengths and ends to refresh color without additional damage.",
        ],
        codeExample: {
          label: "Color system comparison",
          code: `  TYPE         LIFT?  GREY?   LASTS      DAMAGE
  ────────────────────────────────────────────
  Permanent    Yes    Full    Until      Moderate
                             regrowth
  Demi         No     Partial 20–28      Low
               (blend) –Full  shampoos
  Semi         No     No/     4–12       Minimal
                      Blend   shampoos

  KEY: If client needs lift → only permanent works
       If deposit only → demi or semi preferred`,
        },
      },
      incident: {
        title: "How Demi-Permanent Changed the Glossing Service",
        when: "Late 1990s — Redken Shades EQ launches",
        where: "Professional hair salons, United States",
        impact: "The glossing/glazing service category — using demi-permanent to add shine and tone without commitment — became one of the most requested salon add-on services.",
        body: [
          "Redken's Shades EQ, launched in the late 1990s as an ammonia-free demi-permanent gloss, created a new service category: the gloss or glaze. The concept — applying a conditioning tone and shine treatment that lasts several weeks with no commitment and no damage — resonated immediately with clients who wanted refreshed color between permanent appointments.",
          "The glossing service is now standard in virtually every professional salon. Clients can have their permanent color refreshed, their tone corrected, or simply their hair made shinier and more vibrant without the full commitment of a permanent recolor. Demi-permanent products from every major brand now compete in this category.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Permanent", sub: "lifts + deposits, full grey", type: "system" },
          { label: "Demi-Permanent", sub: "deposit only, partial grey", type: "attacker" },
          { label: "Semi-Permanent", sub: "surface deposit, no grey", type: "victim" },
          { label: "Right Formula", sub: "matched to client goals", type: "result" },
        ],
      },
      timeline: [
        { year: 1907, event: "Permanent oxidative hair color invented by Schueller" },
        { year: 1960, event: "First semi-permanent colors available for consumers" },
        { year: 1980, event: "Demi-permanent category develops as a gentler alternative" },
        { year: 1996, event: "Redken Shades EQ launches — glossing service category created", highlight: true },
        { year: 2005, event: "Ammonia-free and low-ammonia permanent colors begin competing with demi" },
        { year: 2020, event: "Gloss/glaze services become top-requested add-on in professional salons" },
      ],
      keyTakeaways: [
        "Permanent is the only type that can lighten hair — if the client needs lift, permanent is the only option",
        "Demi lasts longer than semi and can partially or fully cover grey — the gentler version of permanent",
        "Semi deposits surface color only — great for experimentation, shine, and color without commitment",
        "A professional colorist matches the formula type to the goal, not just the color shade",
      ],
      references: [
        { title: "Paul Mitchell Color Education", url: "https://www.paulmitchell.edu" },
        { title: "Redken Color Education", url: "https://www.redken.com/education" },
        { title: "Behind the Chair: Color Systems Explained", url: "https://www.behindthechair.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "hair-color-05-q1",
          type: "Client Matching",
          challenge: `  Client A: Level 4 natural, wants Level 7
             — needs 3 levels of lift.

  Client B: Level 7 natural, wants Level 7
             with cooler, ashier tone. No grey.

  Client C: Level 8 blonde, 30% grey, wants
             full coverage at Level 8.`,
          text: "Match each client to the most appropriate color type:",
          options: [
            "A=semi, B=demi, C=permanent",
            "A=permanent, B=demi, C=permanent",
            "A=permanent, B=permanent, C=demi",
            "A=demi, B=semi, C=permanent",
          ],
          correctIndex: 1,
          explanation: "Client A needs lift (3 levels) — only permanent works for lifting. Client B wants same-level tone correction without lift — demi-permanent is ideal, gentler and fades gracefully. Client C needs full grey coverage — demi can cover grey partially, but for full coverage at 30% grey, permanent is most reliable. A=permanent, B=demi, C=permanent.",
        },
        {
          id: "hair-color-05-q2",
          type: "Service Design",
          challenge: `  A client has had her roots done with permanent
  Level 7 ash. Her midlengths and ends are
  previously colored Level 7 but have faded
  warm and brassy over the past 8 weeks.

  The ends are healthy but slightly porous.`,
          text: "What is the most appropriate service for the midlengths and ends?",
          options: [
            "Apply permanent color through the lengths — they need the same formula as the roots",
            "Apply a demi-permanent ash gloss through the midlengths and ends to refresh tone without additional damage",
            "Leave the lengths alone — color on previously colored ends causes breakage",
            "Bleach the ends to remove warmth, then tone",
          ],
          correctIndex: 1,
          explanation: "This is a classic scenario for demi-permanent through the lengths. The ends don't need lift — they're already at the right level but have faded warm. A demi ash gloss (deposit only) corrects the tone, refreshes the color, and adds shine with minimal damage. Applying permanent through the ends would over-process already-colored hair. This technique — permanent at roots, demi through lengths — is called a 'virgin application plus gloss.'",
        },
        {
          id: "hair-color-05-q3",
          type: "Semi-Permanent Limits",
          challenge: `  A client with 40% grey hair asks you to give
  her a semi-permanent color service to cover
  her grey.`,
          text: "What is the honest professional response about semi-permanent's effectiveness on grey?",
          options: [
            "Semi-permanent covers grey just as well as permanent with enough coats",
            "Semi-permanent can blend (not fully cover) grey and will fade quickly — permanent or demi provides better coverage",
            "Semi-permanent is not safe to use on grey hair at all",
            "Grey hair rejects all color — no product can cover it without bleach first",
          ],
          correctIndex: 1,
          explanation: "Semi-permanent deposits color on and near the cuticle surface only — it cannot penetrate resistant grey cortex to fully cover. The result on grey is typically a blend or slight tint rather than full coverage, and it fades within 4–12 shampoos. For a client who wants meaningful grey coverage that lasts, demi or permanent is the correct recommendation. Be honest — setting accurate expectations prevents disappointed clients.",
        },
        {
          id: "hair-color-05-q4",
          type: "Formula Identification",
          challenge: `  You pick up a tube of professional hair color.
  The label says:
  → "No ammonia"
  → "Use with 5 volume developer"
  → "Fades gradually over 20–28 shampoos"
  → "Ideal for toning and glazing"`,
          text: "What type of hair color product is described?",
          options: [
            "Permanent color — the developer indicates oxidative chemistry",
            "Semi-permanent — it fades and has no ammonia",
            "Demi-permanent — no ammonia, low developer, lasts 20–28 shampoos",
            "Bleach — the gradual fading indicates a lightening process",
          ],
          correctIndex: 2,
          explanation: "This is a demi-permanent formula: no ammonia, very low developer (5 volume — deposit only), lasts 20–28 shampoos, and positioned for toning and glazing. Permanent uses ammonia and higher developer. Semi uses no developer and fades in 4–12 shampoos. Demi sits between them — this description is the textbook definition of demi-permanent color.",
        },
      ],
    },
  },

  // ─── hair-color-06: Safety — Skin Tests & Strand Tests ───────────────────────
  {
    epochId: "hair-color",
    wonder: { name: "American Board of Certified Haircolorists", location: "Chicago, Illinois", era: "Modern", emoji: "🛡️" },
    id: "hair-color-06",
    order: 6,
    title: "Safety First — Skin Tests & Strand Tests",
    subtitle: "Allergy protocol, patch testing, and strand testing before every service",
    category: "arts",
    xp: 150,
    badge: { id: "hair-color-badge-06", name: "Safety Specialist", emoji: "🛡️" },
    challengeType: "quiz",
    info: {
      tagline: "A skin test takes 5 minutes. An allergic reaction takes an ambulance.",
      year: 2015,
      overview: [
        "Before performing any chemical hair color service, two tests should be conducted: a skin allergy test (patch test) and a strand test. These are not optional extras — they are professional and legal responsibilities. Para-phenylenediamine (PPD), a common ingredient in permanent and demi-permanent hair color, is a known allergen. Reactions range from contact dermatitis to life-threatening anaphylaxis. A patch test 48 hours before the service identifies clients with PPD sensitivity before the product is applied to the entire scalp.",
        "The patch test procedure: cleanse a small area inside the elbow or behind the ear. Apply a small amount of the color formula (mixed at the service ratio) to the skin. Do not cover it. Leave for 48 hours. If redness, swelling, itching, or blistering occurs, the service must not proceed and the client should see a doctor. If no reaction occurs, proceed with the service.",
        "A strand test evaluates how the hair will respond to the formula — checking for unexpected lifting, color result, processing time, and any signs of breakage. This is especially critical on previously chemically processed hair, grey hair, or hair of unknown history. Take a small strand from an inconspicuous area, apply the formula, process for the planned time, then rinse and evaluate before committing to the full service.",
      ],
      technical: {
        title: "Patch Test and Strand Test Protocols",
        body: [
          "Patch test timing is critical: it must be performed 48 hours before the service — not the same day, not 24 hours before. Reactions from PPD can take 24–48 hours to develop. A same-day patch test provides no meaningful protection. Some colorists build patch tests into the consultation appointment to ensure the timing requirement is always met.",
          "Strand test evaluation checklist: (1) Did the hair reach the desired level? (2) Is the tone correct? (3) Did the hair break during processing or on the strand test? (4) How long did the optimal processing take? Document your findings. If breakage occurs on the strand test, do not proceed with the full service — the hair is too compromised for the planned chemical service.",
        ],
        codeExample: {
          label: "Pre-service safety checklist",
          code: `  ✅ PRE-COLOR SERVICE SAFETY CHECKLIST:

  48 HOURS BEFORE:
  □ Conduct patch test (inside elbow or behind ear)
  □ Mix formula at service ratio
  □ Apply to skin, leave uncovered
  □ Client instructed: call if reaction occurs

  ON SERVICE DAY:
  □ Check patch test site — no reaction? Proceed.
  □ Reaction observed? → Do NOT proceed.
                          → Refer to physician.
  □ Strand test on inconspicuous section
  □ Evaluate strand test results before proceeding
  □ Document all findings`,
        },
      },
      incident: {
        title: "The PPD Allergy Cases That Changed UK Salon Law",
        when: "2010–2015 — series of severe allergic reactions documented in UK",
        where: "United Kingdom — professional salons and at-home color users",
        impact: "High-profile cases of severe anaphylaxis from hair color without patch tests led to updated professional guidelines and increased regulatory scrutiny of salon patch test practices.",
        body: [
          "Between 2010 and 2015, UK health authorities documented a series of severe allergic reactions to hair color — some requiring hospitalization — many of which occurred in clients who had been coloring their hair for years with no prior reaction. PPD sensitization can develop at any time, even after years of exposure.",
          "The UK's Cosmetic, Toiletry and Perfumery Association (CTPA) and major professional bodies updated guidelines to require patch tests for every new color service, not just first-time color clients. The message: prior tolerance does not guarantee future safety. In the professional liability context, performing a color service without a patch test leaves the colorist exposed to significant legal and professional consequences if a reaction occurs.",
        ],
      },
      diagram: {
        nodes: [
          { label: "PPD Sensitivity", sub: "can develop at any time", type: "attacker" },
          { label: "Patch Test (48hr)", sub: "identifies reaction risk", type: "system" },
          { label: "Strand Test", sub: "confirms formula on client's hair", type: "victim" },
          { label: "Safe Service", sub: "documented, informed, protected", type: "result" },
        ],
      },
      timeline: [
        { year: 1907, event: "PPD introduced in hair color — allergenic properties not yet studied" },
        { year: 1940, event: "First clinical reports of PPD contact dermatitis from hair color" },
        { year: 1990, event: "Patch testing recommended by professional bodies as best practice" },
        { year: 2010, event: "Series of severe anaphylaxis cases in UK linked to no-patch-test services" },
        { year: 2015, event: "UK professional guidelines updated: patch test required for every service", highlight: true },
        { year: 2023, event: "PPD allergy testing included in professional cosmetology curricula globally" },
      ],
      keyTakeaways: [
        "Patch test must be 48 hours before the service — same-day testing provides no protection",
        "PPD sensitivity can develop at any time, even after years of safe use — test every client, every time",
        "A strand test on a small section prevents discovering problems on the entire head",
        "No reaction on the patch test does not guarantee no reaction ever — sensitivity can develop at any future service",
      ],
      references: [
        { title: "American Board of Certified Haircolorists", url: "https://www.haircolorist.com" },
        { title: "L'Oréal Professional: Allergy Alert Testing", url: "https://www.lorealprofessionnel.com" },
        { title: "CTPA: Hair Color Safety", url: "https://www.ctpa.org.uk" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "hair-color-06-q1",
          type: "Timing",
          challenge: `  A client calls to book a hair color appointment
  for tomorrow. She has never colored her hair
  before and wants a full permanent color service.

  You explain that she needs a patch test first.
  She says: "Can I come in tomorrow morning
  and do the patch test and the color the
  same day?"`,
          text: "Why is same-day patch testing not adequate?",
          options: [
            "Same-day testing is fine if the client has no known allergies",
            "PPD reactions can take 24–48 hours to develop — a same-day test provides no meaningful protection",
            "Patch test results are only valid if conducted in a clinical setting",
            "Same-day testing is only insufficient for clients over 50",
          ],
          correctIndex: 1,
          explanation: "PPD allergic reactions are delayed hypersensitivity reactions — they can take 24–48 hours to develop after exposure. A same-day patch test only tells you what happened in the next few hours, not in the full reaction window. The patch test must be applied 48 hours before the service and checked immediately before proceeding. Schedule the test for 48+ hours prior — most colorists do it at the consultation appointment.",
        },
        {
          id: "hair-color-06-q2",
          type: "Reaction Response",
          challenge: `  You performed a patch test on a client 48 hours ago.
  When she arrives for her appointment, you check the
  patch test site and see:
  → Redness and raised skin at the test site
  → Mild swelling
  → Client says it "itches a bit"`,
          text: "What is the correct professional response?",
          options: [
            "Proceed with the service but avoid the scalp — a mild reaction is normal",
            "Do not proceed with the color service; advise the client to see a physician about the reaction",
            "Use a different color brand — the reaction indicates a specific formula sensitivity",
            "Dilute the formula 50% with conditioner to reduce allergen concentration",
          ],
          correctIndex: 1,
          explanation: "Any positive patch test reaction — redness, swelling, itching, or blistering — means the service must not proceed. Even a mild reaction indicates PPD sensitivity, and applying a full scalp application could trigger a severe systemic reaction. Advise the client to see a physician. There is no safe modification of the service after a positive patch test. Document the reaction.",
        },
        {
          id: "hair-color-06-q3",
          type: "Strand Test",
          challenge: `  A client wants to go from previously bleached
  Level 9 blonde to a permanent Level 6 dark
  ash brown.

  This is a significant change in both level
  (going darker) and tone (adding ash pigment
  to previously lifted hair).`,
          text: "Why is a strand test especially important before this service?",
          options: [
            "Strand tests are only needed when going lighter — going darker is always safe",
            "Previously bleached hair has high porosity and may absorb color unevenly, turn too dark, or go green — a strand test reveals this before the full application",
            "Strand tests are only required if the client is new — returning clients don't need them",
            "The strand test is needed to determine developer volume only",
          ],
          correctIndex: 1,
          explanation: "Bleached hair is high-porosity — it absorbs color rapidly and can easily go darker than intended. The ash pigment in the target formula can also appear green on bleached hair if the formula isn't correctly chosen. A strand test reveals whether the color will achieve the desired Level 6 or go too dark, and whether the ash appears as intended or shifts green. Always strand test when going from bleached blonde to permanent dark.",
        },
        {
          id: "hair-color-06-q4",
          type: "Long-Term Client",
          challenge: `  A client has been getting her hair colored at your
  salon every 6 weeks for 3 years with no issues.
  She's booked for her regular root touch-up.

  Your assistant suggests: "We don't need to do
  a patch test for her — she's been coming here
  for years with no reaction."`,
          text: "Is your assistant's reasoning correct?",
          options: [
            "Yes — prior tolerance guarantees future safety for the same formula",
            "No — PPD sensitization can develop at any time after any previous exposure; guidelines require testing for every service",
            "Yes — patch tests are only for first-time color clients",
            "No — but once per year is sufficient for returning clients",
          ],
          correctIndex: 1,
          explanation: "Prior tolerance does not guarantee future safety — this is the critical fact. PPD sensitization can develop at any point after any number of safe exposures. Professional guidelines from major bodies recommend patch testing before every color service, not just first-time services. This protects both the client and the colorist from unexpected reactions after years of safe use.",
        },
      ],
    },
  },

  // ─── hair-color-07: Root Application & All-Over Color ────────────────────────
  {
    epochId: "hair-color",
    wonder: { name: "Redken Academy", location: "New York City, New York", era: "Modern", emoji: "🗽" },
    id: "hair-color-07",
    order: 7,
    title: "Root Application & All-Over Color",
    subtitle: "Sectioning, timing, and professional application technique",
    category: "arts",
    xp: 150,
    badge: { id: "hair-color-badge-07", name: "Application Pro", emoji: "💈" },
    challengeType: "quiz",
    info: {
      tagline: "Professional application is not painting — it is sectioning, timing, and control.",
      year: 2005,
      overview: [
        "Professional hair color application begins before the color is mixed — with a thorough consultation, accurate sectioning, and a plan for timing. The way color is sectioned determines evenness of coverage and prevents overlapping previously colored ends with a formula designed for the new growth. Overlapping is one of the most common causes of over-processed, damaged midlengths and ends.",
        "For a root touch-up (new growth only): section the hair into four quadrants using a center part from forehead to nape, and an ear-to-ear parting. Work through each section in subsections 1/4 to 1/2 inch wide, applying color precisely to the new growth only, not touching previously colored hair. Start in the most resistant area first — typically the gray-dense areas or crown.",
        "For an all-over color (entire head, usually a first-time color): apply color to the midlengths and ends first, then apply to the roots in the final 10–15 minutes of processing. This is because the roots (close to the scalp) process faster due to body heat — if roots go on first, they will be over-processed by the time the rest of the hair is done. Work quickly and systematically through all sections.",
      ],
      technical: {
        title: "Sectioning Patterns and Application Order",
        body: [
          "Standard four-section parting: center part forehead to nape + ear-to-ear parting = four equal sections. Label mentally: front-right, front-left, back-right, back-left. Work through each section with subsections, applying product methodically from scalp to where existing color begins. Consistent 1/4-inch subsections ensure every strand is covered.",
          "Application tools: brush application provides precision and works color into the root zone thoroughly. Bottle application is faster and works better for fine hair or when working alone. Many colorists use both — brush for the sections near the face (where precision matters) and bottle through the back sections.",
        ],
        codeExample: {
          label: "Four-section parting diagram",
          code: `   FRONT LEFT │ FRONT RIGHT
  ─────────────────────────────
             (face)

   BACK LEFT  │ BACK RIGHT
  ─────────────────────────────
             (nape)

  APPLICATION ORDER (root touch-up):
  1. Most resistant area (grey concentration)
  2. Work through sections systematically
  3. Roots last 10–15 min for all-over color`,
        },
      },
      incident: {
        title: "How Professional Application Technique Became Teachable",
        when: "1980s — Redken and Wella begin formalized colorist training programs",
        where: "United States and Europe",
        impact: "The professionalization of hair color education — creating standardized, teachable technique — transformed hair coloring from a guesswork service into a reproducible professional skill.",
        body: [
          "Before the 1980s, hair color application was largely passed down informally, with each colorist developing their own method. The results were inconsistent — even within the same salon. Redken and Wella, independently, began developing structured color education curricula that included standardized sectioning patterns, timing protocols, and application sequences.",
          "These programs created the concept of color as a technical skill with learnable procedures, not just an art form. The reproducibility this brought to hair color services elevated the profession, allowed salons to maintain consistent quality, and eventually became the foundation for global color education that is still taught today.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Four-Section Part", sub: "organized starting point", type: "system" },
          { label: "1/4-inch Subsections", sub: "systematic coverage", type: "attacker" },
          { label: "Resistant Areas First", sub: "grey/coarse = needs more time", type: "victim" },
          { label: "Even, Complete Coverage", sub: "no missed sections", type: "result" },
        ],
      },
      timeline: [
        { year: 1950, event: "Hair coloring done without standard application technique" },
        { year: 1980, event: "Redken and Wella create structured colorist training programs", highlight: true },
        { year: 1990, event: "Four-section parting becomes standard teaching in cosmetology schools" },
        { year: 2000, event: "Color timing protocols standardized across professional brands" },
        { year: 2015, event: "Social media enables colorists to share technique innovations globally" },
        { year: 2023, event: "Color application technique included in all major licensing examinations" },
      ],
      keyTakeaways: [
        "Always section before mixing — never apply unsystematically",
        "Apply to most resistant areas first — grey-dense, coarse, or previously resistant zones",
        "For all-over color: midlengths and ends first, roots last 10–15 minutes",
        "For root touch-up: apply to new growth only — never overlap onto previously colored hair",
      ],
      references: [
        { title: "Redken Color Education", url: "https://www.redken.com/education" },
        { title: "Behind the Chair: Application Technique", url: "https://www.behindthechair.com" },
        { title: "Wella Professional Education", url: "https://www.wellprofessionals.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "hair-color-07-q1",
          type: "All-Over Color",
          challenge: `  A client is getting her first-ever hair color —
  a full all-over permanent Level 6 warm brown
  on Level 5 natural hair.

  Colorist A applies roots first, then works
  to midlengths and ends.

  Colorist B applies midlengths and ends first,
  then adds color to roots for the last
  10–15 minutes.`,
          text: "Which colorist is using the correct technique and why?",
          options: [
            "Colorist A — starting at the roots ensures the most important area is covered first",
            "Colorist B — scalp heat accelerates root processing; adding roots last prevents over-processing",
            "Both techniques produce identical results",
            "Colorist A — the midlengths and ends need more processing time on virgin hair",
          ],
          correctIndex: 1,
          explanation: "Colorist B is correct. The scalp produces heat that accelerates color processing near the roots. If roots go on first, they will have processed significantly longer than the lengths by the time the service is complete — resulting in over-processed roots (possibly too dark or too lifted) relative to the rest of the hair. For all-over virgin applications, always apply to lengths first, then roots in the final 10–15 minutes.",
        },
        {
          id: "hair-color-07-q2",
          type: "Root Touch-Up",
          challenge: `  A client is returning for a root touch-up.
  She has 1.5 inches of new growth (Level 4 natural)
  and the rest of the hair is previously colored
  Level 7 warm blonde.

  She wants to match her existing Level 7 color.`,
          text: "What is the critical technique requirement for this root touch-up?",
          options: [
            "Apply color from roots to ends to ensure the entire head matches",
            "Apply color to new growth only — do not overlap onto the previously colored Level 7 hair",
            "Bleach the new growth first to pre-lighten before applying color",
            "Apply a lighter formula at the root to compensate for scalp heat",
          ],
          correctIndex: 1,
          explanation: "Root touch-up means exactly that — color applied to new growth only. Overlapping onto previously colored hair would re-process the existing color (already at Level 7), potentially darkening it, damaging it, or creating a banded appearance. Apply the formula precisely to the 1.5 inches of new growth, then clear the formula away from existing color before the end of processing.",
        },
        {
          id: "hair-color-07-q3",
          type: "Sectioning",
          challenge: `  You're about to begin a root touch-up on
  a client with thick, dense hair and
  approximately 40% grey concentrated
  at the crown and temples.`,
          text: "Where should you begin applying color and why?",
          options: [
            "Start at the nape — it's furthest from the face so mistakes are less visible",
            "Start at the most grey-dense area (crown and temples) — resistant grey needs the most processing time",
            "Start at the front hairline — it frames the face and is seen first",
            "Order doesn't matter — apply randomly for even coverage",
          ],
          correctIndex: 1,
          explanation: "Grey hair is resistant to color — its cortex lacks melanin, and the cuticle structure can be more compact, requiring more time to absorb pigment. Applying color to the most grey-dense areas first ensures they receive the maximum processing time, giving the best chance of complete grey coverage. Starting at the front hairline risks under-processing the crown by the time you get back to it.",
        },
        {
          id: "hair-color-07-q4",
          type: "Timing",
          challenge: `  You've been applying color for 12 minutes.
  The formula on your client's hair has been
  processing for different amounts of time
  on different sections:

  First section applied (back-right): 12 min
  Last section applied (front-left): 3 min

  Manufacturer's recommended processing: 30–35 min`,
          text: "How do you calculate when to begin rinsing?",
          options: [
            "Rinse immediately when the first section reaches 30 minutes",
            "Wait until all sections have processed for at least 30 minutes — check the last section applied",
            "Average the processing times — rinse when the average reaches 30 minutes",
            "Check the first section only — once it's done, rinse immediately",
          ],
          correctIndex: 1,
          explanation: "The last section applied determines when to rinse — all sections must reach the minimum recommended processing time. If you rinse when the first section hits 30 minutes, the last sections (applied 9 minutes later) have only processed 21 minutes — insufficient for full color development and grey coverage. Work systematically and quickly to minimize the timing gap between first and last sections.",
        },
      ],
    },
  },

  // ─── hair-color-08: Bleaching & Lightening ────────────────────────────────────
  {
    epochId: "hair-color",
    wonder: { name: "Pravana Color Lab", location: "Houston, Texas", era: "Modern", emoji: "⚡" },
    id: "hair-color-08",
    order: 8,
    title: "Bleaching & Lightening Safely",
    subtitle: "The lightening process, formulation, and damage prevention",
    category: "arts",
    xp: 200,
    badge: { id: "hair-color-badge-08", name: "Lightening Specialist", emoji: "⚡" },
    challengeType: "quiz",
    info: {
      tagline: "Bleach doesn't care about your timeline. It cares about chemistry.",
      year: 2012,
      overview: [
        "Hair lightening (bleaching) is the most powerful and most potentially damaging service in the colorist's toolkit. Unlike color, which both deposits and lifts, bleach (a mixture of lightening powder and developer) only lifts — it removes melanin from the cortex without depositing new pigment. The result is a lighter, more porous, and structurally weaker hair fiber.",
        "Bleach formulation variables: the lightening powder's chemical type (persulfate-based powders are standard), the developer volume (20 for scalp applications; 30–40 for off-scalp foils on resistant hair), the mixing ratio, and whether the mixture contains additives for hair health. Higher developer volumes and longer processing times produce more lift but also more damage. The goal is to achieve the desired lift with the minimum damage possible.",
        "The most critical safety rules for bleaching: (1) Never apply bleach to a scalp that has been scratched, abraded, or has any open sores. (2) Never process past the point of desired lift — once the melanin is removed it cannot be replaced. (3) Never apply bleach to hair that has been recently relaxed (chemical overlap of bleach + relaxer = breakage or complete dissolution of hair). (4) Do not apply heat to bleach on the scalp — this accelerates processing unpredictably.",
      ],
      technical: {
        title: "Bleach Processing and Lifting Stages",
        body: [
          "Bleach works by the persulfate salts in the powder, activated by the hydrogen peroxide in the developer, generating a highly reactive oxygen molecule that oxidizes and breaks down melanin molecules. The process is visible — you can watch the hair progress through the lifting stages (brown → red → orange → yellow → pale yellow) in real time.",
          "Scalp vs. off-scalp formulation: bleach applied at the scalp uses 20 volume developer (scalp heat accelerates the reaction, and the scalp is sensitive). Off-scalp bleach (in foils, balayage) uses 30–40 volume developer for more aggressive lift without scalp sensitivity concerns. Never use 40 volume on the scalp.",
        ],
        codeExample: {
          label: "Bleach developer selection",
          code: `  APPLICATION TYPE   DEVELOPER     WHY
  ────────────────────────────────────────
  On-scalp bleach    20 volume     Scalp heat
  (root area)                      accelerates;
                                   scalp sensitive

  Off-scalp foils    30 volume     Standard lift
  (midlengths/ends)               without scalp

  Resistant foils    40 volume     Max lift for
  (dark/coarse)                    stubborn hair

  ⚠ NEVER use 40 volume on scalp.
  ⚠ NEVER apply to relaxed hair.`,
        },
      },
      incident: {
        title: "The Bond-Builder Revolution — Olaplex Redefines Bleaching",
        when: "2014 — Olaplex launches at the ISSE trade show",
        where: "Los Angeles, California",
        impact: "Bond-building technology, added to bleach and color formulas, dramatically reduced breakage and damage — enabling hair lightening services that would previously have been impossible on compromised hair.",
        body: [
          "Before 2014, severe hair damage from bleaching was an accepted industry reality. Colorists would routinely turn away clients whose hair was too compromised for further lightening, knowing that breakage was inevitable. Then Olaplex launched — a bond-building molecule (bis-aminopropyl diglycol dimaleate) that, added to bleach formulas, reconnected the disulfide bonds broken during the bleaching process.",
          "The results were dramatic and quickly documented on social media. Hair that would have broken with traditional bleaching survived Olaplex-treated services with significantly less damage. The bond-builder category was created — Olaplex was joined by Wellaplex, Fibreplex, and dozens of competitors. Today, bond-building treatment is considered standard professional practice for bleaching services.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Persulfate Powder", sub: "breaks down melanin", type: "attacker" },
          { label: "Developer (H₂O₂)", sub: "activates the reaction", type: "system" },
          { label: "Melanin Oxidized", sub: "hair lightens in stages", type: "victim" },
          { label: "Desired Level Reached", sub: "rinse, tone, protect", type: "result" },
        ],
      },
      timeline: [
        { year: 1867, event: "Hydrogen peroxide first used for hair lightening" },
        { year: 1950, event: "Modern persulfate bleach powder formulas developed" },
        { year: 1990, event: "Foil highlighting techniques become mainstream in salons" },
        { year: 2012, event: "Balayage (freehand painting) technique goes mainstream globally" },
        { year: 2014, event: "Olaplex launches — bond-builder category created", highlight: true },
        { year: 2023, event: "Bond-building treatment standard in all professional lightening services" },
      ],
      keyTakeaways: [
        "Never use 40 volume developer on the scalp — 20 volume maximum for scalp bleach",
        "Never apply bleach over chemically relaxed hair — breakage or dissolution is likely",
        "Watch the lifting stages in real time — rinse when the desired stage is reached",
        "Add a bond-building treatment to bleach formulas to minimize structural damage",
      ],
      references: [
        { title: "Pravana Lightener Education", url: "https://www.pravana.com/education" },
        { title: "Olaplex Professional", url: "https://www.olaplex.com/professional" },
        { title: "Behind the Chair: Bleaching Guide", url: "https://www.behindthechair.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "hair-color-08-q1",
          type: "Developer Selection",
          challenge: `  You're doing a full scalp bleach application
  (touching the root area near the scalp)
  on a client going from Level 4 to blonde.

  Available developers: 20, 30, 40 volume`,
          text: "What developer volume should be used for on-scalp bleach?",
          options: [
            "40 volume — maximum lift is needed for a 4-level lift",
            "30 volume — provides more lift than 20 but is safer than 40",
            "20 volume — scalp heat accelerates processing; never use 40 on scalp",
            "10 volume — minimizes damage to the scalp area",
          ],
          correctIndex: 2,
          explanation: "20 volume is the maximum for on-scalp bleach. The scalp produces significant heat that accelerates the bleaching reaction — on scalp, 20 volume processes almost as fast as 30 volume does off-scalp. Using 30 or 40 volume at the scalp risks burns, excessive damage, and uncontrolled processing. For heavily resistant hair needing more lift, off-scalp techniques (foils, balayage) with higher developer are the safer approach.",
        },
        {
          id: "hair-color-08-q2",
          type: "Safety",
          challenge: `  A new client books for a full bleach service.
  During the consultation, you discover:
  → She has a chemical relaxer (applied 4 months ago)
  → Her ends have been relaxed multiple times over 3 years
  → The relaxer-treated hair is dry and somewhat brittle`,
          text: "What is the appropriate professional response?",
          options: [
            "Proceed — 4 months is long enough since the relaxer for bleaching to be safe",
            "Do not bleach over relaxed hair — chemical overlap can cause severe breakage or complete dissolution",
            "Proceed only with 10 volume developer to minimize damage",
            "Only bleach the new growth (relaxer-free regrowth) and leave the lengths alone",
          ],
          correctIndex: 1,
          explanation: "Bleach + relaxer chemical overlap is one of the most dangerous combinations in hair services. The sodium hydroxide in a relaxer severely compromises the disulfide bonds in the cortex. Adding bleach — which further breaks bonds — to relaxed hair can result in catastrophic breakage (snapping off at the point of overlap) or complete hair dissolution. This is not a risk management situation — it is a contraindication. Do not proceed.",
        },
        {
          id: "hair-color-08-q3",
          type: "Lifting Stages",
          challenge: `  During a bleaching service, you check the hair
  at 25 minutes. The hair is at the yellow-orange
  stage (approximately Level 7).

  The client's goal is Level 9 (very light blonde)
  before toning. You expect this to take another
  15–20 minutes.`,
          text: "How should you monitor the remaining processing time?",
          options: [
            "Set a timer for 15 minutes and rinse when it goes off",
            "Check the hair every 5–7 minutes and rinse when it reaches Level 9 (pale yellow), regardless of the timer",
            "Process the remaining time without checking — consistent timing gives consistent results",
            "Remove hair from foils to check underneath — this is the only accurate way to assess",
          ],
          correctIndex: 1,
          explanation: "Always monitor by visual assessment of the lifting stage, not by timer alone. Processing times vary based on hair porosity, texture, temperature, and product age. Check every 5–7 minutes and rinse when the hair reaches the desired level (in this case, pale yellow = Level 9). If you rely only on a timer, you risk either under-processing (too warm, orange cast) or over-processing (hair breakage, mushy texture).",
        },
        {
          id: "hair-color-08-q4",
          type: "Bond Building",
          challenge: `  A client wants her Level 5 dark brown hair
  lifted to Level 9 platinum blonde. Her hair is
  currently healthy with no prior chemical services.

  You plan to add an Olaplex-type bond builder
  to the bleach formula.`,
          text: "What is the primary purpose of adding a bond-building treatment to bleach?",
          options: [
            "It speeds up the bleaching process so you need less developer",
            "It reconnects broken disulfide bonds during processing, reducing structural damage",
            "It neutralizes the persulfate salts after processing is complete",
            "It adds protein to compensate for the melanin that is removed",
          ],
          correctIndex: 1,
          explanation: "Bond builders (Olaplex, Wellaplex, Fibreplex, etc.) work by reconnecting the disulfide bonds (sulfur-sulfur bonds between keratin protein chains) that are broken during bleaching. Bleach breaks both melanin and structural bonds — the bond builder selectively repairs the structural bonds while the melanin continues to be oxidized. The result is lighter hair with significantly reduced structural damage and breakage.",
        },
      ],
    },
  },

  // ─── hair-color-09: Toning & Corrective Color ────────────────────────────────
  {
    epochId: "hair-color",
    wonder: { name: "Kenra Professional Studio", location: "Indianapolis, Indiana", era: "Modern", emoji: "🔧" },
    id: "hair-color-09",
    order: 9,
    title: "Toning & Corrective Color",
    subtitle: "Fixing what went wrong — and understanding what happened",
    category: "arts",
    xp: 200,
    badge: { id: "hair-color-badge-09", name: "Corrective Colorist", emoji: "🔧" },
    challengeType: "quiz",
    info: {
      tagline: "Every color correction is a diagnosis before it is a treatment.",
      year: 2015,
      overview: [
        "Toning is the step after lightening that deposits tone without significant lift — it takes bleached or lifted hair to a finished, polished result. After bleaching, hair lands somewhere in the underlying pigment spectrum (orange, yellow-orange, yellow, or pale yellow depending on how far it was lifted). The toner's job is to neutralize unwanted warm tones and/or add a specific cool, neutral, or warm finish. Toners are typically demi-permanent or semi-permanent, mixed with 10–20 volume developer.",
        "Corrective color is the broader category of services that fix color that went wrong — whether from a previous salon visit or at-home application. Before beginning any correction, a thorough analysis is required: What is the current level and tone? What tone is unwanted? Why did the previous service fail? What is the hair's current condition and porosity? Is correction possible in one session or will it require multiple visits?",
        "The most common corrections: (1) Removing brassiness after bleaching — apply a blue or violet toner. (2) Color that came out too dark — requires bleach or color remover to lift first. (3) Hot roots (roots are lighter than lengths after coloring) — usually caused by scalp heat; apply a darker formula to the roots or tone to blend. (4) Uneven color — may require a color melt or toning to unify.",
      ],
      technical: {
        title: "Toner Formulation and Application",
        body: [
          "Toners are most commonly demi-permanent formulas mixed with 10 volume developer (or 20 volume for deeper deposit). The target level of the toner should match the level the hair was lifted to. If hair was lifted to Level 9 (pale yellow), select a Level 9 toner in the desired tone. A toner that is darker than the lifted hair will make the hair appear darker.",
          "For brassiness correction: identify the dominant warm tone (orange = use blue-ash toner; yellow = use violet/pearl toner). Apply toner evenly from roots to ends (or just to lengths if roots are already toned). Process 10–20 minutes or until the desired tone is achieved. Toning can be checked frequently — when the toner reaches the desired result, rinse immediately.",
        ],
        codeExample: {
          label: "Brassiness correction guide",
          code: `  HAIR COLOR         DOMINANT WARMTH  TONER TYPE
  ─────────────────────────────────────────────────
  Lifted Level 6–7   Orange           Blue-ash (1xx)
  Lifted Level 7–8   Yellow-orange    Violet-ash (.12)
  Lifted Level 8–9   Yellow           Violet/pearl (.1)
  Lifted Level 9–10  Pale yellow      Pearl/smoke (.12)

  FORMULA: Toner level = lifted hair level
  Developer: 10 volume (deposit) or
             20 volume (slightly deeper deposit)`,
        },
      },
      incident: {
        title: "The Color Melt — A Corrective Technique That Became a Service",
        when: "2013–2015 — emergence as named technique on social media",
        where: "Professional salons, United States",
        impact: "The color melt technique — blending multiple tones seamlessly from roots to ends — began as a corrective technique for uneven color and became one of the most requested coloring services.",
        body: [
          "Color melts emerged partly as a solution to a common correction problem: uneven color with distinct lines between different tones or levels. Rather than trying to make the entire head one uniform color, colorists began blending the existing variations — darkening roots, adding mid-tones through the lengths, and brightening the ends — creating a seamless gradient.",
          "When these results appeared on social media, clients began requesting them intentionally — not as corrections but as the desired outcome. The color melt became one of the defining hair color trends of the decade, all born from a corrective technique that turned visual problems into artistic opportunity.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Diagnose First", sub: "level, tone, porosity, history", type: "system" },
          { label: "Unwanted Tone", sub: "identify what needs correction", type: "attacker" },
          { label: "Complementary Toner", sub: "neutralize or redeposit", type: "victim" },
          { label: "Final Result", sub: "corrected, finished color", type: "result" },
        ],
      },
      timeline: [
        { year: 2000, event: "Corrective color services become a specialty category in salons" },
        { year: 2008, event: "Toning techniques gain prominence as balayage increases demand" },
        { year: 2013, event: "Color melt emerges as a named technique for blending uneven color", highlight: true },
        { year: 2015, event: "Purple shampoo goes mainstream — clients begin self-toning at home" },
        { year: 2020, event: "Corrective color education becomes a core module in advanced color programs" },
        { year: 2023, event: "Color correction services are among the highest-priced salon offerings" },
      ],
      keyTakeaways: [
        "Always diagnose before correcting — understand what went wrong and why",
        "Toner level should match the lifted hair level — darker toner makes hair appear darker",
        "Color correction often requires multiple sessions — set realistic client expectations",
        "Orange brassiness = blue toner; yellow brassiness = violet toner",
      ],
      references: [
        { title: "Kenra Professional Color Education", url: "https://www.kenra.com/professional" },
        { title: "Behind the Chair: Color Correction", url: "https://www.behindthechair.com" },
        { title: "Modern Salon: Toning Techniques", url: "https://www.modernsalon.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "hair-color-09-q1",
          type: "Toner Selection",
          challenge: `  Client was lifted to Level 8 but her hair has
  a strong yellow-orange brassy cast. She wants
  cool, ashy Level 8 blonde.

  Level 8 underlying pigment: yellow-orange

  Toners available at Level 8:
  .1 (ash/blue-based)
  .12 (ash-violet)
  .3 (gold/warm)`,
          text: "Which toner is most appropriate to neutralize the yellow-orange and achieve cool ash blonde?",
          options: [
            ".3 (gold) — warm on warm looks natural",
            ".1 (ash/blue-based) — blue cancels orange; ash cancels yellow-orange",
            ".12 (ash-violet) — violet and ash combined for comprehensive neutralization",
            "No toner needed — the color will shift on its own after washing",
          ],
          correctIndex: 2,
          explanation: "For yellow-orange at Level 8, .12 (ash-violet) is the most comprehensive choice: the ash (blue) component cancels the orange, while the violet component cancels the yellow. A straight .1 ash might handle the orange but leave yellow. Either .1 or .12 would be preferable to .3 (gold), which would add warmth. In practice, many colorists would try .1 first and reassess after rinsing.",
        },
        {
          id: "hair-color-09-q2",
          type: "Hot Roots",
          challenge: `  After a root touch-up, a client's roots appear
  noticeably lighter (more golden/lifted) than
  her midlengths and ends.
  The roots are Level 8 gold; the lengths are Level 7.

  This is called "hot roots."`,
          text: "What most likely caused the hot roots?",
          options: [
            "The colorist applied too much product at the roots",
            "Scalp heat caused the roots to process faster/lift more than the lengths",
            "The client has naturally lighter hair at the roots",
            "The formula was too light — the colorist should have used a darker level",
          ],
          correctIndex: 1,
          explanation: "Hot roots are caused by scalp heat accelerating the color processing/lifting at the root area. The roots are in contact with the warmest zone (the scalp), which makes the chemistry process faster and lift more than the rest of the hair. The fix: next service, use a slightly darker formula at the roots to compensate, or apply the root color last. Toning the roots with a slightly darker/cooler toner can also blend the difference.",
        },
        {
          id: "hair-color-09-q3",
          type: "Correction Planning",
          challenge: `  A client comes in with at-home box color:
  Level 3 (very dark brown/black) applied over
  previously Level 8 highlighted blonde hair.
  The result is very dark, flat, and she hates it.
  She wants to go back to Level 8 blonde.

  Current condition: hair is chemically processed
  but not damaged — just very dark.`,
          text: "What is the most accurate statement about this color correction?",
          options: [
            "One bleach session will restore her to Level 8 easily",
            "This is a multi-step correction — the dark color must be lifted gradually to avoid damage and uneven results",
            "The at-home color cannot be removed — she must grow it out",
            "A color remover will return her to Level 8 in one session without bleach",
          ],
          correctIndex: 1,
          explanation: "Going from Level 3 back to Level 8 (5 levels of lift) is a multi-session correction. Attempting it in one session risks severe breakage and uneven, patchy results. A color remover can shrink the artificial pigment molecules, but will likely reveal warm underlying tones. Then strategic bleaching (possibly multiple rounds), with bond builder, can gradually lift to the target level. Set the client expectation: 2–3 sessions over several months, with conditioning treatments between.",
        },
        {
          id: "hair-color-09-q4",
          type: "Toner Application",
          challenge: `  You've bleached a client's full head to Level 9
  (pale yellow with slight warm cast).
  You're applying a Level 9 violet toner mixed
  with 10 volume developer.

  During processing, you check at 15 minutes
  and the hair looks like it's turning slightly
  lavender/purple.`,
          text: "What should you do?",
          options: [
            "Leave it — lavender/purple will rinse out completely after washing",
            "Rinse immediately — the toner has over-deposited and is creating an unintended purple cast",
            "Continue processing to the full 30 minutes — the purple will normalize",
            "Add more developer to the remaining toner to dilute the formula",
          ],
          correctIndex: 1,
          explanation: "Toner should be monitored regularly and rinsed as soon as the desired result is achieved. A lavender/purple cast means the violet toner has deposited heavily and is going beyond neutralization into adding visible color. Rinse immediately, then assess. High-porosity hair (post-bleach) absorbs toner rapidly. Next time, dilute the formula or cut the processing time. Leaving it risks an unintended pastel purple result the client didn't request.",
        },
      ],
    },
  },

  // ─── hair-color-10: Building a Hair Coloring Business ────────────────────────
  {
    epochId: "hair-color",
    wonder: { name: "Professional Beauty Association HQ", location: "Scottsdale, Arizona", era: "Modern", emoji: "💼" },
    id: "hair-color-10",
    order: 10,
    title: "Building a Hair Coloring Business",
    subtitle: "Certification, pricing, clientele, and growing a color specialty",
    category: "arts",
    xp: 250,
    badge: { id: "hair-color-badge-10", name: "Color Business Owner", emoji: "💼" },
    challengeType: "quiz",
    info: {
      tagline: "A great colorist with no clients is a great colorist who isn't working. Build the business as carefully as you build the skill.",
      year: 2023,
      overview: [
        "Becoming a professional hair colorist requires a cosmetology license (typically 1,000–1,500 hours of school plus a state board exam). Beyond the license, specialization in color — through brand education programs, advanced color courses, and certifications — differentiates a colorist in a competitive market. Major brands offer free and paid education programs (Redken, Wella, L'Oréal Professional, Schwarzkopf) that give colorists both skills and brand credibility.",
        "Pricing for color services is more complex than nail pricing — services range from a $40 gloss to a $300+ complex correction. Factors: time (color services typically run 1.5–4+ hours), product cost (bleach, toner, developer, bond builder can run $15–$30 per service), and market position. Research your local market's color pricing and decide whether to position as budget, mid-market, or premium.",
        "Building a color clientele takes time — typically 2–3 years to be consistently fully booked as a new colorist. Strategies: document every color result on social media, specialize in a signature technique (balayage, blonde specialist, vivid colors), request referrals from every satisfied client, and partner with photographers and local bloggers for portfolio content.",
      ],
      technical: {
        title: "Color Service Pricing Model",
        body: [
          "Color service pricing formula: Product cost + (Time × hourly rate) + overhead share = minimum viable price. For a full highlight service: bleach/toner product $25, 3 hours × $40/hr target = $120, overhead share $20 = $165 minimum. Research shows top-earning colorists charge $125–$350 for comparable services in mid-to-large markets.",
          "Specialization commands premium pricing. A 'balayage specialist' or 'blonde specialist' can command 20–40% more than a generalist for the same service, because clients seeking that specific result are willing to pay for expertise. Developing and marketing a signature technique is one of the highest-ROI career investments a colorist can make.",
        ],
        codeExample: {
          label: "Color service pricing worksheet",
          code: `  SERVICE: Full Balayage + Tone
  ─────────────────────────────────────────
  Product (bleach + toner + developer):  $28
  Time: 3.5 hours
  Target hourly rate: $45/hr:           $157
  Overhead (salon share or chair rent):  $35
  ─────────────────────────────────────────
  Minimum price:                         $220

  Local balayage market rate: $180–$320
  Your positioning price:     $240–$260

  After 50+ positive reviews:
  Raise to:                   $280–$300`,
        },
      },
      incident: {
        title: "How Instagram Made Balayage a $3 Billion Service Category",
        when: "2013–2018 — balayage goes from niche French technique to global demand",
        where: "Global professional hair color industry",
        impact: "The virality of balayage results on Instagram created an unprecedented demand spike that transformed the careers of colorists who had specialized early.",
        body: [
          "Balayage (French for 'sweeping') had existed as a technique since the 1970s — a freehand painting method used primarily in French salons. For decades it was a niche technique outside France. Then Instagram exploded in 2013 and the soft, sun-kissed gradient results of balayage became some of the most shared beauty content on the platform.",
          "Colorists who had invested in balayage training suddenly found themselves booked out 3 months in advance. Salons that marketed 'balayage specialists' saw dramatic revenue increases. The lesson: specialization in a visual, photographable technique + social media documentation = accelerated career growth. The balayage boom made the case for every colorist to develop and market a signature specialty.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Cosmetology License", sub: "required foundation", type: "system" },
          { label: "Brand Education", sub: "specialization + credibility", type: "attacker" },
          { label: "Social Media Portfolio", sub: "Instagram/TikTok color results", type: "victim" },
          { label: "Specialty Premium", sub: "higher rates + full books", type: "result" },
        ],
      },
      timeline: [
        { year: 1990, event: "Cosmetology licensing requirements standardized by state boards" },
        { year: 2000, event: "Brand education programs (Redken, Wella) become major career differentiators" },
        { year: 2010, event: "Instagram launches — color results become shareable/marketable assets" },
        { year: 2013, event: "Balayage goes viral on Instagram — specialty colorists see booking explosion", highlight: true },
        { year: 2018, event: "Color specialization becomes the standard career path for advanced colorists" },
        { year: 2023, event: "TikTok color transformation videos drive new generation of color clientele" },
      ],
      keyTakeaways: [
        "Cosmetology license is the non-negotiable starting point — no license, no legal service",
        "Brand education programs are often free or heavily subsidized — use them for specialization",
        "Document every color result — social media is your portfolio and your marketing",
        "Specialization (blonde specialist, vivid colorist) commands premium rates in any market",
      ],
      references: [
        { title: "Professional Beauty Association: Career Resources", url: "https://www.probeauty.org" },
        { title: "Behind the Chair: Business of Color", url: "https://www.behindthechair.com" },
        { title: "Redken Education Programs", url: "https://www.redken.com/education" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "hair-color-10-q1",
          type: "Licensing",
          challenge: `  You want to offer professional hair coloring services.
  Your state requires 1,200 hours of cosmetology school.
  You've completed 800 hours.

  A friend suggests: "Just start doing color on
  clients at home — start building your clientele
  now and finish school later."`,
          text: "What is the problem with this suggestion?",
          options: [
            "Home services are fine as long as you don't charge money",
            "Practicing cosmetology services without a license is illegal in all US states — fines and license denial risk",
            "You can do color services legally with 800+ hours completed, even before the exam",
            "The suggestion is fine — cosmetology schools don't enforce licensing",
          ],
          correctIndex: 1,
          explanation: "Practicing cosmetology services (including hair coloring) without a state license is illegal in every US state. Penalties include fines, citations, and potential permanent denial of a cosmetology license when you apply. There are no exceptions for 'in-progress' students or 'just friends.' Complete your hours, pass your board exam, then serve clients legally.",
        },
        {
          id: "hair-color-10-q2",
          type: "Specialization",
          challenge: `  You've completed your license and are working
  in a salon. You're considering which specialty
  to develop to differentiate yourself.

  Options:
  [A] Become a "blonde specialist" — balayage,
      highlights, glossing, all things blonde
  [B] Stay a generalist — offer all services equally
  [C] Specialize in vivid/fashion colors
  [D] Focus on corrective color services`,
          text: "What is the business advantage of developing a specialty?",
          options: [
            "Specialists can refuse clients they don't like — broader client control",
            "Specialization creates a clear identity, attracts ideal clients, and justifies premium pricing",
            "Specialists have shorter wait lists because they're more selective",
            "There is no business advantage — generalists earn more because they attract more clients",
          ],
          correctIndex: 1,
          explanation: "Specialization creates a clear identity in the market — 'the balayage specialist at [salon]' is a referral-generating brand, not just 'a colorist.' Specialists attract clients who specifically want that service and are willing to seek out the best, often regardless of price. This allows premium pricing, higher client satisfaction (you're doing what you do best), and strong social media content (your portfolio is cohesive and recognizable).",
        },
        {
          id: "hair-color-10-q3",
          type: "Social Media",
          challenge: `  You've completed 30 color services since
  getting your license 3 months ago.
  You have 0 social media posts about your work.
  All 30 clients came from salon walk-ins.

  A colleague who started the same time has
  100+ Instagram followers and is already
  taking outside bookings for her speciality.`,
          text: "What is the most impactful thing you can do to build your color clientele?",
          options: [
            "Run a paid Instagram ad campaign",
            "Begin documenting every color result with before/after photos — post consistently on Instagram and TikTok",
            "Lower your prices to undercut other colorists and gain clients faster",
            "Ask your salon manager to refer more clients to you",
          ],
          correctIndex: 1,
          explanation: "For hair colorists, social media is the most high-ROI marketing tool available at $0 cost. Before/after color transformations, process videos, and finished results are some of the most shareable content on Instagram and TikTok. Every service you do without documenting is a missed portfolio and marketing opportunity. Ask every client for permission to photograph — most say yes, especially if they love the result.",
        },
        {
          id: "hair-color-10-q4",
          type: "Pricing",
          challenge: `  Your full balayage + tone service currently
  takes you 3.5 hours and you charge $175.

  Competing salons charge $220–$280 for
  comparable services.

  You've been fully booked for 3 months with
  a 3-week waitlist.`,
          text: "What does your 3-month full book and waitlist indicate about your pricing?",
          options: [
            "Your pricing is perfect — don't change anything",
            "You are likely underpriced — a full book with a waitlist means demand exceeds supply, which is the signal to raise prices",
            "You should hire an assistant to take more clients at current prices",
            "A waitlist means you need to work faster, not charge more",
          ],
          correctIndex: 1,
          explanation: "A consistently full book with a waitlist is the clearest possible signal that you are underpriced. Basic economics: when demand exceeds supply (you can't take more clients), the correct response is to raise prices until demand and supply balance. Raising your price from $175 to $220 will likely cost you some price-sensitive clients — and those spots will be filled by higher-value clients willing to pay your true market rate.",
        },
      ],
    },
  },
];
