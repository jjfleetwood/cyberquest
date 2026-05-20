import { EpochConfig, StageConfig } from "./types";

export const hairStylingEpoch: EpochConfig = {
  id: "hair-styling",
  name: "Hair Styling",
  subtitle: "Tools, Technique & Transformation",
  description:
    "Master the full toolkit of professional hair styling — from understanding hair types and heat science to braiding, curls, and client-ready updos. Then take your craft into business.",
  emoji: "✂️",
  color: "violet",
  unlocked: true,
};

export const hairStylingStages: StageConfig[] = [
  // ─── hair-styling-01 ───────────────────────────────────────────────────────
  {
    epochId: "hair-styling",
    wonder: {
      name: "Vidal Sassoon Academy",
      location: "Santa Monica, California",
      era: "Modern",
      emoji: "✂️",
    },
    id: "hair-styling-01",
    order: 1,
    title: "Know Your Hair Type",
    subtitle: "The Andre Walker System",
    category: "arts",
    xp: 120,
    badge: { id: "hair-styling-01", name: "Texture Reader", emoji: "🔬" },
    challengeType: "quiz",
    info: {
      tagline: "Every great style starts with knowing what you're working with.",
      year: 1997,
      overview: [
        "Hair texture varies enormously — fine, medium, coarse; straight, wavy, curly, coily. Stylist Andre Walker popularized a four-type (1–4) classification system that remains the industry shorthand for texture, with subcategory letters A, B, C indicating curl diameter within each type.",
        "Beyond curl pattern, porosity (how readily hair absorbs and retains moisture) and density (strands-per-square-inch) shape every product and tool decision. High-porosity hair soaks up product but loses moisture fast; low-porosity hair repels product until heat opens the cuticle.",
        "Mastering hair typing isn't about boxing clients into categories — it's about building a shared language that lets you choose the right techniques, products, and expectations before you ever pick up a tool.",
      ],
      technical: {
        title: "The Walker Type System",
        body: [
          "Type 1 (straight): 1A fine/limp, 1B medium body, 1C coarse and resistant.",
          "Type 2 (wavy): 2A loose S-wave, 2B defined wave, 2C thick waves with frizz.",
          "Type 3 (curly): 3A large loose curls, 3B medium springy curls, 3C tight corkscrew curls.",
          "Type 4 (coily): 4A tight S-coil, 4B z-pattern coil, 4C densely packed with minimal definition.",
          "Porosity tiers: Low (cuticles closed, heat needed to open), Medium (balanced absorption), High (gaps in cuticle, absorbs fast, loses fast).",
        ],
        codeExample: {
          label: "Quick Client Assessment",
          code: `Observe dry, product-free hair:
  curl_pattern  → types 1–4 (A/B/C)
  density       → thin/medium/thick (strands per sq inch)
  porosity test → float a strand in water
                  sinks fast  = high porosity
                  floats      = low porosity
  elasticity    → wet-stretch test
                  snaps quickly = protein deficient`,
        },
      },
      incident: {
        title: "The Curl Revolution",
        when: "2010s",
        where: "North America",
        impact: "Curly hair care became a multi-billion-dollar market segment",
        body: [
          "For decades, mainstream beauty culture pressured people with curly and coily hair to straighten. The 'Curly Girl Method' (Lorraine Massey, 2001) and the natural hair movement of the 2010s changed that.",
          "Salons that didn't understand Type 3–4 hair lost entire client segments. Those who trained staff in curl-specific techniques built loyal books.",
          "The lesson: hair typing knowledge isn't academic — it's revenue.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Hair Texture Type (1–4)", type: "attacker" },
          { label: "Porosity & Density Assessment", type: "system" },
          { label: "Product & Tool Selection", type: "victim" },
          { label: "Predictable, Repeatable Result", type: "result" },
        ],
      },
      timeline: [
        { year: 1997, event: "Andre Walker publishes hair typing system in 'Andre Talks Hair'", highlight: true },
        { year: 2001, event: "Lorraine Massey's Curly Girl Method launches curl-specific care" },
        { year: 2010, event: "Natural hair movement accelerates Type 4 product innovation" },
        { year: 2015, event: "CurlFest and DevaCurl popularize curl-inclusive salon services", highlight: true },
        { year: 2020, event: "Textured hair care grows to $2.5B US market segment" },
      ],
      keyTakeaways: [
        "The Andre Walker 1–4 system is the common language for curl pattern in professional settings.",
        "Porosity and density matter as much as curl type for product and tool decisions.",
        "Type 4 coily hair has been systemically underserved — learning it is a competitive advantage.",
        "Assessment always happens on dry, product-free hair for accuracy.",
      ],
      references: [
        { title: "Andre Walker Hair Typing System", url: "https://andrewalkerhair.com" },
        { title: "NaturallyCurly Texture Guide", url: "https://naturallycurly.com/texture-typing" },
        { title: "Curly Girl Method — Lorraine Massey", url: "https://curlygirl.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "hs-01-q1",
          type: "Hair Typing",
          challenge: `  Client assessment notes:
  - Large, loose spiral curls, roughly finger-width diameter
  - Good sheen, bounces when touched
  - Strand floats for 10 seconds then slowly sinks`,
          text: "What Andre Walker type and porosity level best describes this client's hair?",
          options: [
            "Type 2B, high porosity",
            "Type 3A, medium porosity",
            "Type 4A, low porosity",
            "Type 3C, high porosity",
          ],
          correctIndex: 1,
          explanation:
            "Large loose spirals are Type 3A. Medium porosity strands float briefly then sink — neither instant (high) nor indefinitely (low). Type 4A has a tighter z-coil, and 3C has corkscrew tightness.",
        },
        {
          id: "hs-01-q2",
          type: "Porosity",
          challenge: `  Float test result: strand sinks immediately
  Touch feel: rough, tangles easily when dry
  Product behavior: absorbs products instantly
                    hair dries out within hours`,
          text: "What does this assessment indicate, and how should you adapt your product choice?",
          options: [
            "Low porosity — use protein treatments to close the cuticle",
            "High porosity — use humectants and sealants to lock in moisture",
            "Medium porosity — no special adjustments needed",
            "High porosity — avoid all conditioners to prevent buildup",
          ],
          correctIndex: 1,
          explanation:
            "Rapid sinking, rough texture, and fast moisture loss are classic high-porosity signs (gaps in the cuticle). Humectants attract moisture; sealants (oils, butters) trap it inside. Protein fills gaps but shouldn't be the first tool — and avoiding conditioner would make it worse.",
        },
        {
          id: "hs-01-q3",
          type: "Density",
          challenge: `  You part the client's hair down the middle.
  The scalp is easily visible through the parted section
  without moving any strands aside.`,
          text: "What does this observation tell you about density, and which style consideration applies?",
          options: [
            "High density — avoid layering, it will make hair appear bulky",
            "Low density — volumizing techniques and strategic layering help create fullness",
            "Medium density — no special technique needed",
            "Low density — heavy oils and deep conditioning will correct this",
          ],
          correctIndex: 1,
          explanation:
            "Visible scalp without parting indicates low density (fewer strands per square inch). Volumizing mousse, diffusing, and layers that remove bulk add perceived fullness. Heavy oils weigh fine/low-density hair down further.",
        },
        {
          id: "hs-01-q4",
          type: "Consultation",
          challenge: `  New client, Type 4C natural hair, previous stylist
  used heat every visit. Client reports breakage at
  crown. Wants "defined curls."`,
          text: "What is the most important first step in this consultation?",
          options: [
            "Book a keratin treatment to smooth the cuticle before styling",
            "Immediately apply a protein treatment and diffuse on high heat",
            "Assess current porosity and elasticity, then discuss a heat-free or low-heat regimen to restore moisture balance before styling goals",
            "Explain that Type 4C hair cannot achieve defined curls without relaxer",
          ],
          correctIndex: 2,
          explanation:
            "Breakage at the crown combined with heat history signals over-processed, likely high-porosity hair with poor elasticity. Restoring health comes before style. A porosity/elasticity assessment guides the regimen. Keratin on damaged coily hair and high heat are contraindicated; 4C hair absolutely can have definition with the right moisture-based approach.",
        },
      ],
    },
  },

  // ─── hair-styling-02 ───────────────────────────────────────────────────────
  {
    epochId: "hair-styling",
    wonder: {
      name: "Sam Villa Education",
      location: "Portland, Oregon",
      era: "Modern",
      emoji: "🔧",
    },
    id: "hair-styling-02",
    order: 2,
    title: "Tools & Heat Protection",
    subtitle: "Equipment Selection and Thermal Safety",
    category: "arts",
    xp: 120,
    badge: { id: "hair-styling-02", name: "Tool Master", emoji: "🛠️" },
    challengeType: "quiz",
    info: {
      tagline: "The right tool at the right temperature is half the style.",
      year: 2005,
      overview: [
        "Professional styling tools — blow dryers, flat irons, curling irons, diffusers — vary enormously in quality, heat distribution, and safety features. Ionic technology reduces frizz by neutralizing static charge; ceramic and tourmaline plates distribute heat evenly and minimize hot spots.",
        "Heat damage is cumulative and permanent. Protein bonds (disulfide linkages) break above 450°F; hydrogen bonds that give hair its shape break above 140°F — which is exactly what allows thermal styling. The line between reshape and damage is temperature control.",
        "Heat protectants form a barrier on the cuticle that both conducts heat evenly and raises the damage threshold. No protectant eliminates damage — it reduces it. Air-drying where possible and limiting heat frequency are the only guaranteed prevention.",
      ],
      technical: {
        title: "Temperature Guide by Hair Type",
        body: [
          "Fine or damaged hair: 250–300°F (120–150°C) — lowest effective heat.",
          "Medium/normal hair: 300–380°F (150–193°C) — standard range.",
          "Coarse, thick, or resistant hair: 380–450°F (193–230°C) — max professional range.",
          "Blow dryer wattage: 1800–2000W pro dryers move air fast (reducing time = reducing damage).",
          "Cool shot button: locks hydrogen bonds into the new shape — always finish a section with cool air.",
        ],
        codeExample: {
          label: "Pre-Style Checklist",
          code: `Before reaching for any heat tool:
  1. Hair is detangled and at least 80% dry
  2. Heat protectant applied (mist root-to-tip, comb through)
  3. Tool temperature set for hair type
  4. Section size ≤ tool width (thinner = better result)
  5. Continuous motion — never pause on a strand`,
        },
      },
      incident: {
        title: "The Overheated Iron Epidemic",
        when: "2010s–present",
        where: "Salons worldwide",
        impact: "Leading cause of preventable breakage complaints in professional chairs",
        body: [
          "Consumer flat irons that cap at 450°F became ubiquitous. Fine-haired clients began arriving with snapped strands, elasticity loss, and the distinctive 'gummy when wet' texture of heat-damaged hair.",
          "Professional responsibility: a stylist who uses 450°F on fine hair is liable for the result. Temperature selection is a diagnostic skill, not a default setting.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Hair Type & Condition", type: "attacker" },
          { label: "Tool & Temperature Selection", type: "system" },
          { label: "Heat Protectant Application", type: "victim" },
          { label: "Style Without Damage", type: "result" },
        ],
      },
      timeline: [
        { year: 1990, event: "Ceramic plate technology introduced to professional irons" },
        { year: 1998, event: "Ionic blow dryer technology launches in professional market" },
        { year: 2005, event: "Tourmaline coating becomes standard in premium tools", highlight: true },
        { year: 2012, event: "Bond-building treatments (Olaplex) change heat damage repair options", highlight: true },
        { year: 2019, event: "Smart irons with auto temperature regulation enter market" },
      ],
      keyTakeaways: [
        "Match tool temperature to hair type — fine hair max 300°F, coarse up to 450°F.",
        "Heat protectant reduces but does not eliminate thermal damage; apply before every heat session.",
        "Fast-moving tools cause less damage than slow ones at the same temperature.",
        "The cool shot button is not optional — it locks in the style by re-forming hydrogen bonds.",
      ],
      references: [
        { title: "Sam Villa Professional Education", url: "https://samvilla.com/education" },
        { title: "American Board of Certified Haircolorists — Thermal Safety", url: "https://abch.org" },
        { title: "Redken Chemistry of Heat Damage", url: "https://www.redken.com/learn" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "hs-02-q1",
          type: "Temperature Selection",
          challenge: `  Client: fine, color-treated hair, high porosity
  Client report: "my last stylist always used the
  highest setting and my hair breaks now"`,
          text: "What temperature range should you use and why?",
          options: [
            "450°F — fine hair needs maximum heat to style effectively",
            "250–300°F — fine, damaged, high-porosity hair has a lower damage threshold",
            "380–420°F — color-treated hair requires more heat to close the cuticle",
            "No heat at all — you must air-dry until the breakage grows out",
          ],
          correctIndex: 1,
          explanation:
            "Fine, color-treated, high-porosity hair is already compromised. The damage threshold is lower than healthy hair. 250–300°F provides enough energy to reshape hydrogen bonds without further degrading the disulfide bonds. 450°F caused this client's current damage.",
        },
        {
          id: "hs-02-q2",
          type: "Tool Technology",
          challenge: `  Client has coarse, frizzy hair and wants a smooth
  blowout. You're choosing between:
  A) Basic metal plate iron, 1200W dryer
  B) Tourmaline ionic dryer 1875W + ceramic flat iron`,
          text: "Which setup produces better results and why?",
          options: [
            "Option A — metal heats faster and gives more consistent results",
            "Option B — ionic technology neutralizes static/frizz; tourmaline/ceramic distributes heat evenly without hot spots",
            "Both are equivalent — technique matters more than technology",
            "Option A — metal plates grip coarse hair better than ceramic",
          ],
          correctIndex: 1,
          explanation:
            "Ionic dryers emit negative ions that break up water molecules faster and neutralize the positive charge that causes frizz. Tourmaline and ceramic surfaces emit far-infrared heat that dries from inside out, and distribute temperature evenly — eliminating the hot spots that cause breakage and uneven results on coarse hair.",
        },
        {
          id: "hs-02-q3",
          type: "Heat Protectant",
          challenge: `  Stylist applies heat protectant spray to dry hair,
  then immediately runs a flat iron through each section.
  Client's hair feels dry and looks dull afterward.`,
          text: "What mistake did the stylist make?",
          options: [
            "Used the wrong brand of heat protectant",
            "Applied protectant to dry hair — it should only go on wet hair",
            "Did not comb the protectant through evenly before applying heat, and may not have let it set",
            "Used too much product, causing buildup that dullness",
          ],
          correctIndex: 2,
          explanation:
            "Heat protectant must be distributed evenly with a comb so every strand is coated. Rushing the iron over unevenly applied protectant leaves uncoated sections exposed. Some protectants also need a moment to bond before heat is applied. Application method matters as much as the product itself.",
        },
        {
          id: "hs-02-q4",
          type: "Cool Shot",
          challenge: `  After wrapping hair around a curling iron and releasing,
  the curl falls flat within 10 minutes consistently.`,
          text: "What technique step is most likely missing?",
          options: [
            "The iron temperature is too high",
            "The curl wasn't held for long enough",
            "The cool shot button wasn't used to lock in the curl after release",
            "The client has naturally straight hair and curling is not possible",
          ],
          correctIndex: 2,
          explanation:
            "Hydrogen bonds are reshaped by heat but only lock into the new position when cooled. Releasing the curl and immediately letting it fall means the bonds re-set to their previous position. Either use the blow dryer cool shot or hold the curl in your hand until it cools before releasing.",
        },
      ],
    },
  },

  // ─── hair-styling-03 ───────────────────────────────────────────────────────
  {
    epochId: "hair-styling",
    wonder: {
      name: "Drybar",
      location: "Brentwood, California",
      era: "Modern",
      emoji: "💨",
    },
    id: "hair-styling-03",
    order: 3,
    title: "The Perfect Blowout",
    subtitle: "Sectioning, Tension & Volume",
    category: "arts",
    xp: 130,
    badge: { id: "hair-styling-03", name: "Blowout Pro", emoji: "💨" },
    challengeType: "quiz",
    info: {
      tagline: "A great blowout is 80% technique, 20% product.",
      year: 2010,
      overview: [
        "The blowout is the foundational salon skill — a polished, frizz-free, voluminous finish using only a blow dryer and round brush. Mastering it requires understanding sectioning (working bottom-to-top), tension (keeping strands taut for smoothness), and directional airflow (nozzle parallel to the hair shaft, not perpendicular).",
        "Round brush diameter determines result: a small barrel creates curls and body; a large barrel (2 in+) creates sleek, straight volume. The nozzle concentrator is non-negotiable — without it, airflow is too diffuse and cuticle roughening causes frizz.",
        "Product layering matters: a heat protectant first, a volumizing mousse or foam at the root for lift, and a smoothing serum or cream on lengths for frizz control. Too much product on fine hair kills volume; too little on coarse hair invites frizz.",
      ],
      technical: {
        title: "Blowout Section Order",
        body: [
          "Step 1: Towel blot to ~80% dry — never start on dripping wet hair.",
          "Step 2: Apply product — mousse at roots, serum on lengths.",
          "Step 3: Clip hair up. Release bottom nape section first.",
          "Step 4: Subsection ≤ 1 inch thick. Place brush underneath, roll under or over for desired direction.",
          "Step 5: Dryer nozzle points DOWN the shaft. Follow brush with dryer, maintaining tension.",
          "Step 6: Cool shot to set. Release. Continue upward section by section.",
          "Step 7: Finish with a light-hold spray or shine serum.",
        ],
        codeExample: {
          label: "Volume vs. Smooth Result",
          code: `For VOLUME:
  - Roll brush under (lifting root away from scalp)
  - Direct airflow from roots toward ends
  - Angle dryer upward at root

For SMOOTH/SLEEK:
  - Roll brush over (tension pulling down)
  - Direct airflow down the shaft
  - Nozzle parallel to the strand at all times`,
        },
      },
      incident: {
        title: "Drybar's One-Service Model",
        when: "2010",
        where: "Brentwood, CA",
        impact: "Built a $255M brand on a single service: the blowout",
        body: [
          "Alli Webb recognized that many women wanted professional blowouts between salon visits but couldn't justify a full appointment. Drybar opened with one service, no cuts, no color — just blowouts at $40.",
          "The concept proved that mastering one technique perfectly is a viable and highly profitable business model. By 2019 Drybar had 150+ locations and was acquired for $255M.",
          "The takeaway for any stylist: depth beats breadth early in a career.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Section & Product Prep", type: "attacker" },
          { label: "Brush Tension + Airflow Direction", type: "system" },
          { label: "Cool Shot to Lock Shape", type: "victim" },
          { label: "Smooth, Voluminous Blowout", type: "result" },
        ],
      },
      timeline: [
        { year: 1970, event: "Electric blow dryer becomes mainstream consumer product" },
        { year: 1995, event: "Round brush blowout technique codified in professional training" },
        { year: 2010, event: "Drybar opens first location, blowout-only model", highlight: true },
        { year: 2015, event: "Blowout bars expand nationally, technique elevated to artform" },
        { year: 2019, event: "Drybar acquired for $255M — blowout validated as full business", highlight: true },
      ],
      keyTakeaways: [
        "Always work bottom-to-top in horizontal sections no thicker than 1 inch.",
        "The nozzle concentrator and parallel airflow are what separate a professional blowout from a frizzy mess.",
        "Round brush diameter controls the result: large barrel = straight and sleek, small barrel = curled body.",
        "Cool shot after every section locks the shape into place.",
      ],
      references: [
        { title: "Drybar Technique Library", url: "https://thedrybar.com" },
        { title: "Sam Villa Round Brush Tutorial", url: "https://samvilla.com" },
        { title: "Vidal Sassoon Blowdry Fundamentals", url: "https://vidal-sassoon-academy.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "hs-03-q1",
          type: "Technique",
          challenge: `  Client wants maximum volume at the crown.
  Hair is medium density, fine texture, shoulder-length.`,
          text: "Which technique combination creates the most root volume?",
          options: [
            "Large round brush, nozzle pointing down the shaft, roll over the top",
            "Small round brush, nozzle pointing up at the root, roll under lifting away from scalp",
            "No brush — use fingers to tousle while drying for natural lift",
            "Flat iron after blowout to smooth roots down for a sleeker look",
          ],
          correctIndex: 1,
          explanation:
            "Small barrels create more bend and lift. Rolling the brush under lifts the root away from the scalp. Directing airflow upward at the root (not straight down the shaft) creates the greatest volume. Fingering produces texture but not directional lift. A flat iron would remove the volume.",
        },
        {
          id: "hs-03-q2",
          type: "Sectioning",
          challenge: `  Stylist begins a blowout at the crown section,
  then works down to the nape. Result: frizzy
  underneath layers, smooth top sections.`,
          text: "What went wrong?",
          options: [
            "The dryer was too hot for the hair type",
            "Wrong section order — start at the nape (bottom) and work upward so finished sections aren't disturbed",
            "Too much product was applied before drying",
            "The nozzle concentrator wasn't used",
          ],
          correctIndex: 1,
          explanation:
            "Top-down sectioning means the finished top sections get re-disturbed by airflow when drying lower sections. Bottom-up ensures each finished section stays set while you work on the layer above it. This is a fundamental sectioning error.",
        },
        {
          id: "hs-03-q3",
          type: "Products",
          challenge: `  Fine-haired client arrives wanting voluminous blowout.
  You have: volumizing mousse, smoothing serum (heavy),
  heat protectant spray, and a light-hold hairspray.`,
          text: "What is the correct product application strategy?",
          options: [
            "Smoothing serum root-to-tip first, then mousse on top for volume",
            "Heat protectant throughout, volumizing mousse at roots only, light-hold spray to finish",
            "Mousse root-to-tip, then heavy serum on lengths, then hairspray",
            "No products — fine hair is weighed down by anything",
          ],
          correctIndex: 1,
          explanation:
            "Fine hair is easily weighed down. Heat protectant goes on first (protection), mousse at roots only (volume without weighing lengths), and light-hold spray after to finish. Heavy serum on fine hair kills volume — it belongs on lengths of coarse hair for smoothing, not fine hair.",
        },
        {
          id: "hs-03-q4",
          type: "Airflow",
          challenge: `  During a blowout, stylist holds the dryer nozzle
  perpendicular to the hair strand (pointing straight
  at it from the side). Client complains of frizz
  despite using quality products.`,
          text: "What is causing the frizz and how do you fix it?",
          options: [
            "The products aren't working — switch brands",
            "Perpendicular airflow roughens the cuticle, causing frizz — hold nozzle parallel to strand pointing down the shaft",
            "The dryer wattage is too high for this hair type",
            "Fine-haired clients always experience frizz during blowouts",
          ],
          correctIndex: 1,
          explanation:
            "Airflow perpendicular to the shaft blasts the cuticle scales upward, creating frizz regardless of products. Holding the nozzle parallel, angled downward along the strand, smooths the cuticle scales flat — the same direction they naturally lie. This is the most common technique error in student blowouts.",
        },
      ],
    },
  },

  // ─── hair-styling-04 ───────────────────────────────────────────────────────
  {
    epochId: "hair-styling",
    wonder: {
      name: "ghd (Good Hair Day) HQ",
      location: "Leeds, United Kingdom",
      era: "Modern",
      emoji: "🔥",
    },
    id: "hair-styling-04",
    order: 4,
    title: "Flat Iron Mastery",
    subtitle: "Panels, Passes & Precision",
    category: "arts",
    xp: 130,
    badge: { id: "hair-styling-04", name: "Flat Iron Pro", emoji: "🔥" },
    challengeType: "quiz",
    info: {
      tagline: "One pass done right beats five passes done wrong.",
      year: 2001,
      overview: [
        "The flat iron (straightening iron) is among the most powerful and most misused tools in styling. Ceramic or titanium plates apply direct contact heat to reshape hair's hydrogen bonds. The result depends on three variables: temperature (matched to hair type), panel size (matched to section thickness), and speed (slow enough to reshape, fast enough not to scorch).",
        "Common errors include overlapping sections (re-heating already-styled hair), pausing mid-strand (hot spot = breakage), and using the iron on wet or damp hair (steam explosion within the cortex causes irreversible porosity damage — sometimes called the 'frying' effect).",
        "Beyond straightening, the flat iron is a versatile styling tool: a 90° rotation creates a wave, wrapping hair around the barrel creates soft curls, and clamping with a twist creates a defined wave — each result from the same tool.",
      ],
      technical: {
        title: "Flat Iron Variables",
        body: [
          "Temperature: Fine = 250–300°F, Medium = 300–380°F, Coarse = 380–450°F.",
          "Section thickness: Should not exceed plate width. Thinner sections = better heat penetration = fewer passes needed.",
          "Speed: Slow enough for heat transfer (~3–5 seconds per inch), but continuous motion — never static.",
          "Plate type: Ceramic (even heat, gentle), Titanium (heats fastest, best for coarse), Tourmaline (ionic + ceramic).",
          "Hair must be 100% dry before flat ironing. Even slight dampness causes steam damage.",
        ],
        codeExample: {
          label: "Flat Iron Technique Sequence",
          code: `Per section:
  1. Comb section smooth
  2. Clamp at root (leave 0.5in from scalp for safety)
  3. Apply CONTINUOUS downward pull + forward motion
  4. Do NOT pause — constant motion until end of strand
  5. Cool shot or let cool before next manipulation

  One clean pass > multiple rushed passes`,
        },
      },
      incident: {
        title: "The Damp Hair Disaster",
        when: "Common occurrence",
        where: "Home use and under-trained salon environments",
        impact: "Leading cause of acute breakage from heat styling",
        body: [
          "Water molecules trapped in the hair cortex flash to steam when a flat iron passes through. The steam has nowhere to go — it blasts outward, literally exploding the cuticle from the inside. The result is immediate: hair that snaps, splits, and develops a spongy texture when wet.",
          "This is irreversible. The only solution is to grow it out. Prevention is simple: always confirm hair is 100% dry before ironing, or use a blow dryer to completely remove moisture first.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Section Prep (Dry, Combed)", type: "attacker" },
          { label: "Temperature + Plate Selection", type: "system" },
          { label: "Continuous Motion Pass", type: "victim" },
          { label: "Smooth, Damage-Free Result", type: "result" },
        ],
      },
      timeline: [
        { year: 1909, event: "Isaac Shero patents the hair straightening iron" },
        { year: 1990, event: "Ceramic plate irons enter professional market" },
        { year: 2001, event: "ghd launches, popularizing ceramic flat iron in mainstream market", highlight: true },
        { year: 2008, event: "Titanium plates introduced for thick/coarse hair segments" },
        { year: 2015, event: "Smart flat irons with temperature sensors become widely available", highlight: true },
      ],
      keyTakeaways: [
        "Hair must be 100% dry before flat ironing — damp hair causes irreversible steam damage.",
        "Continuous motion is mandatory — pausing creates hot spots and breakage.",
        "Match temperature to hair type; fine/damaged hair max 300°F.",
        "A flat iron can create waves and curls with technique variation, not just straighten.",
      ],
      references: [
        { title: "ghd Professional Education", url: "https://www.ghdhair.com/en-us" },
        { title: "Sam Villa Flat Iron Techniques", url: "https://samvilla.com" },
        { title: "American Board Thermal Safety Guidelines", url: "https://abch.org" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "hs-04-q1",
          type: "Safety",
          challenge: `  Client's hair was towel-dried but still feels slightly
  damp. She's in a hurry and asks you to flat iron now.
  You notice a faint hissing sound on the first pass.`,
          text: "What does the hissing sound indicate and what should you do?",
          options: [
            "Normal — some steam is expected and harmless",
            "The iron is too hot — lower the temperature to 200°F and continue",
            "Steam from residual moisture is exploding within the cortex — stop immediately and blow dry completely before continuing",
            "The plates need cleaning — wipe with a damp cloth and proceed",
          ],
          correctIndex: 2,
          explanation:
            "Hissing is the sound of water flashing to steam inside the hair shaft. This causes the cuticle to burst outward, creating permanent porosity damage. Stop immediately — the hair must reach 100% dry before any flat iron contact. There is no safe workaround.",
        },
        {
          id: "hs-04-q2",
          type: "Technique",
          challenge: `  After flat ironing, client's hair has sections that
  are perfectly straight and others that are slightly
  wavy/kinked. All sections used the same temperature.`,
          text: "What technique error most likely caused the inconsistent result?",
          options: [
            "The iron temperature was too low",
            "Sections were too thick or uneven — heat didn't penetrate to interior strands",
            "The client has mixed hair texture and this is unavoidable",
            "Not enough passes were made over the wavy sections",
          ],
          correctIndex: 1,
          explanation:
            "Thick sections prevent heat from reaching the interior strands — the outer ones get straightened but the interior stays curly. Thin, even subsections (≤ plate width) ensure full heat penetration in a single pass. More passes over kinked sections compounds heat damage without fixing the root cause.",
        },
        {
          id: "hs-04-q3",
          type: "Creative Technique",
          challenge: `  Client wants loose, beachy waves — not straight hair.
  You have only a flat iron available (no curling iron).`,
          text: "How can you create waves with a flat iron?",
          options: [
            "It's impossible — a flat iron can only straighten hair",
            "Clamp and pull straight down very quickly to create a wave effect from friction",
            "Rotate the iron 90° and use a slow S-motion or wrap hair around the barrel while pulling through",
            "Clamp and hold stationary for 10 seconds, release, repeat every 2 inches",
          ],
          correctIndex: 2,
          explanation:
            "A flat iron is extremely versatile. A 90° rotation combined with alternating the panel up and down while pulling through creates an S-wave. Wrapping the hair around the barrel (like a curling iron) creates soft curls. The 'clamp and hold' method creates a bend but not a controlled wave. Friction alone doesn't create waves.",
        },
        {
          id: "hs-04-q4",
          type: "Plate Selection",
          challenge: `  Two clients back to back:
  Client A: fine, color-treated, shoulder-length
  Client B: thick, coarse, natural black hair, arm-length`,
          text: "Which plate type is best suited for each client?",
          options: [
            "Ceramic for both — it's universally safe",
            "Titanium for both — fastest and most effective",
            "Ceramic for Client A (even, gentle heat); Titanium for Client B (rapid heat for thick/coarse hair)",
            "Metal plates for Client B (higher heat capacity); Ceramic for Client A",
          ],
          correctIndex: 2,
          explanation:
            "Ceramic distributes heat gently and evenly — ideal for fine, color-treated hair that is more susceptible to damage. Titanium heats up nearly instantly and maintains temperature even through thick sections — ideal for coarse hair that needs consistent heat penetration. Metal plates lack the coating that prevents hot spots.",
        },
      ],
    },
  },

  // ─── hair-styling-05 ───────────────────────────────────────────────────────
  {
    epochId: "hair-styling",
    wonder: {
      name: "Hot Tools International",
      location: "Chatsworth, California",
      era: "Modern",
      emoji: "🌀",
    },
    id: "hair-styling-05",
    order: 5,
    title: "Curling Irons & Wands",
    subtitle: "Barrel Size, Wrap Direction & Hold",
    category: "arts",
    xp: 130,
    badge: { id: "hair-styling-05", name: "Curl Architect", emoji: "🌀" },
    challengeType: "quiz",
    info: {
      tagline: "Barrel diameter is the blueprint; wrap direction is the signature.",
      year: 1998,
      overview: [
        "Curling irons (with a clamp) and wands (without) both use thermal energy to reshape hair into curls, but each has a distinct use case. Irons create uniform barrel curls with a defined bend where the clamp holds; wands create more natural, open waves without the crease.",
        "Barrel diameter determines curl size: 3/4″ creates tight ringlets, 1″ creates defined curls, 1.5–2″ creates loose waves. Wrap direction — toward or away from the face — is the key to making curls look intentional versus random, and alternating direction section-by-section creates the most natural-looking wave.",
        "Hold time and letting the curl cool before release are the two most commonly skipped steps. Under-held curls fall fast; curls that don't cool before being manipulated unravel. After styling, lock everything in with a flexible hold spray, not a stiff lacquer.",
      ],
      technical: {
        title: "Barrel Guide",
        body: [
          "3/4″ barrel: tight ringlets, best for fine hair wanting defined curls.",
          "1″ barrel: classic curl, most versatile size for all textures.",
          "1.25″ barrel: bouncy curl, popular for medium-length looks.",
          "1.5–2″ barrel or wand: soft wave, best for long hair wanting volume.",
          "Conical wand: tapered barrel makes waves smaller at tips, larger at root — the most natural look.",
        ],
        codeExample: {
          label: "Curl Direction Pattern",
          code: `For natural-looking waves (alternating wrap):
  Section 1 → wrap TOWARD face
  Section 2 → wrap AWAY from face
  Section 3 → wrap TOWARD face
  ... repeat

For uniform Hollywood curls:
  All sections → wrap AWAY from face

  Release tip: hold 8–12 sec, release gently,
  cup curl in palm until cool, then release`,
        },
      },
      incident: {
        title: "The Clamp Crease Problem",
        when: "Ongoing",
        where: "Curling iron users worldwide",
        impact: "Most common curling iron complaint among new stylists",
        body: [
          "The curling iron clamp leaves a visible crease if hair is clamped in the middle of a strand or if the stylist holds the clamp closed too long at one position. Professional technique: clamp only at the tip, wrap upward, and keep moving slightly to distribute even heat.",
          "The wand solves this entirely — no clamp, no crease. But wand styling requires a heat-resistant glove to avoid burns on the hand holding the end of the hair. Skipping the glove is the leading cause of wand-related salon injuries.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Barrel Size + Hair Length", type: "attacker" },
          { label: "Wrap Direction & Hold Time", type: "system" },
          { label: "Cool Before Release", type: "victim" },
          { label: "Defined, Long-Lasting Curls", type: "result" },
        ],
      },
      timeline: [
        { year: 1886, event: "Marcel Grateau invents the first heated curling iron" },
        { year: 1980, event: "Electric curling irons with temperature control enter market" },
        { year: 1998, event: "Hot Tools introduces gold barrel irons, becomes industry standard", highlight: true },
        { year: 2009, event: "Conical wand popularized on YouTube tutorials" },
        { year: 2015, event: "Spiral and interchangeable barrel systems launch", highlight: true },
      ],
      keyTakeaways: [
        "Barrel size is the single biggest determinant of curl size — choose it first.",
        "Alternating wrap direction (toward and away from face) section-by-section creates the most natural wave.",
        "Never release a curl until it has cooled — heat is still reshaping bonds as it dissipates.",
        "Wands require a heat-resistant glove — skipping it is a burn risk.",
      ],
      references: [
        { title: "Hot Tools Professional", url: "https://hottools.com" },
        { title: "Wella Education — Thermal Styling", url: "https://www.wella.com/professional" },
        { title: "Behind The Chair Curling Techniques", url: "https://behindthechair.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "hs-05-q1",
          type: "Barrel Selection",
          challenge: `  Client: long (mid-back), thick hair
  Goal: "soft, beachy waves — not tight ringlets"`,
          text: "Which barrel size and tool type should you choose?",
          options: [
            "3/4″ curling iron — smaller barrel creates the most defined waves on thick hair",
            "1.5–2″ wand or large barrel iron — larger barrel on long hair creates the desired loose wave",
            "1″ iron — the universal size works for all looks",
            "Flat iron with rotation technique — more control than a curling iron on thick hair",
          ],
          correctIndex: 1,
          explanation:
            "For long, thick hair wanting soft beach waves, a large barrel (1.5–2″) or conical wand creates the open, relaxed wave. A 3/4″ barrel on long thick hair would create a lot of tight ringlets. The 1″ iron is versatile but produces a more defined curl than 'beachy.' The flat iron technique works but is slower on thick long hair.",
        },
        {
          id: "hs-05-q2",
          type: "Curl Direction",
          challenge: `  Client's finished style looks random and chaotic — some
  curls go inward, some outward, some neither direction.
  All sections were curled using the same direction.`,
          text: "What technique adjustment creates a more polished, natural-looking result?",
          options: [
            "Use a smaller barrel so all curls are uniform and visible",
            "Alternate wrap direction — curl sections toward the face, then away, alternating throughout",
            "Wrap all sections away from the face for a uniform Hollywood wave",
            "Curl in the same direction but add more product for definition",
          ],
          correctIndex: 1,
          explanation:
            "When all curls go the same direction, hair can clump or look uniform in a way that's obviously 'set.' Alternating toward/away creates movement and dimension — curls fall open into a wave pattern rather than merging. Hollywood curls (all one direction) works but requires more precision, not less.",
        },
        {
          id: "hs-05-q3",
          type: "Hold & Release",
          challenge: `  Stylist curls each section, releases immediately while
  the curl is still warm, and lets it fall.
  All curls drop to loose waves within 30 minutes.`,
          text: "What step is missing?",
          options: [
            "More product should have been applied before curling",
            "The temperature was too low to reshape the bonds",
            "The curls weren't held in the curl shape until cool — hydrogen bonds can't lock while still hot",
            "A different curling iron brand is needed for longer-lasting curls",
          ],
          correctIndex: 2,
          explanation:
            "Hydrogen bonds are physically reshaped by heat but only lock into the new shape as the hair cools. Releasing immediately means the bonds re-set toward their natural pattern before they've set in the curl. Either hold each released curl in your palm until it cools, or pin it with a clip while you move to the next section.",
        },
        {
          id: "hs-05-q4",
          type: "Safety",
          challenge: `  New stylist picks up a wand for the first time.
  After three sections, she puts the wand down and
  shows a red burn mark on her index finger.`,
          text: "What safety equipment was she missing, and what technique should she use?",
          options: [
            "She needed a thicker grip on the wand handle — the burn came from the handle, not the barrel",
            "A heat-resistant styling glove on the hand holding the free end of the hair — the barrel contacted her unprotected finger",
            "She should have used a clamp iron instead — wands are not appropriate for salons",
            "She needed to lower the temperature — burns only occur above 400°F",
          ],
          correctIndex: 1,
          explanation:
            "When using a wand, the hand not holding the tool holds the free end of the hair near the barrel. A heat-resistant glove on that hand is not optional — it's a safety requirement. Burns from wands most commonly occur on the index finger or thumb of the non-dominant hand. The barrel temperature is uniform at whatever setting is used.",
        },
      ],
    },
  },

  // ─── hair-styling-06 ───────────────────────────────────────────────────────
  {
    epochId: "hair-styling",
    wonder: {
      name: "Mielle Organics",
      location: "Chicago, Illinois",
      era: "Modern",
      emoji: "🪢",
    },
    id: "hair-styling-06",
    order: 6,
    title: "Braiding Fundamentals",
    subtitle: "Three-Strand, French, Dutch & Beyond",
    category: "arts",
    xp: 140,
    badge: { id: "hair-styling-06", name: "Braid Weaver", emoji: "🪢" },
    challengeType: "quiz",
    info: {
      tagline: "Braiding is geometry — consistent tension makes it beautiful.",
      year: 2000,
      overview: [
        "Braiding is one of the oldest and most culturally significant styling techniques in the world. At its technical core, braiding is about consistent tension and even sections. An uneven pick-up (adding more hair to one strand than another) or inconsistent tension (tight at root, loose at mid) creates lumpy, asymmetrical results.",
        "Three-strand braids (flat plait) are the foundation for every other braid style. French braids (picking up from the scalp progressively) and Dutch braids (the inverted version that sits raised above the hair) follow the same pattern with the addition of sections at each crossover. Box braids and knotless braids are extensions work requiring additional knowledge of synthetic or natural extension hair management.",
        "Tension damage (traction alopecia) is a significant concern — braids installed too tightly at the root put mechanical stress on the follicle. Protective styles should protect, not damage.",
      ],
      technical: {
        title: "French vs. Dutch Braid",
        body: [
          "French braid: cross outside strands OVER the middle. Pick up from scalp each crossover. Braid sits flat against the head.",
          "Dutch braid: cross outside strands UNDER the middle. Pick up from scalp each crossover. Braid pops OUT from the head (inverted/3D effect).",
          "Both require equal section pick-ups at each crossover — this is where most beginners lose consistency.",
          "Traction alopecia prevention: leave 0.25–0.5in of give at the root. Never install tension that whitens or dimples the scalp.",
        ],
        codeExample: {
          label: "French Braid Pick-Up Pattern",
          code: `Start: divide crown into 3 equal strands (L, M, R)
Step 1: L over M → L becomes new M
Step 2: R over M → R becomes new M
Step 3: Before next crossover, pick up from scalp
        ADD to each outside strand before crossing
Step 4: Repeat until no scalp hair remains
        Continue as regular 3-strand braid to ends`,
        },
      },
      incident: {
        title: "Traction Alopecia — A Preventable Epidemic",
        when: "Ongoing",
        where: "Worldwide — particularly in communities where tight braiding is common",
        impact: "Estimated 1-in-3 Black women experience traction alopecia; leading cause of hair loss in young women",
        body: [
          "Traction alopecia occurs when consistent mechanical tension pulls hair follicles beyond their capacity to recover. The classic sign: hairline recession at the temples and front edges, often with broken, short hairs at the hairline.",
          "The braiding industry's shift toward 'knotless braids' (which start without a knot and reduce immediate tension at the root) is a direct response to this — and a healthier technique for the client.",
          "Stylists who offer protective styling must understand this: protective styles should protect, not cause the damage they're meant to prevent.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Even Section Division", type: "attacker" },
          { label: "Consistent Tension Throughout", type: "system" },
          { label: "Scalp Protection (No Over-tension)", type: "victim" },
          { label: "Clean, Long-Lasting Braid", type: "result" },
        ],
      },
      timeline: [
        { year: -3500, event: "Earliest known braided hairstyles depicted in North African art" },
        { year: 1966, event: "Cornrow styles enter mainstream western fashion via Black Power movement" },
        { year: 2000, event: "Box braids popularized globally as protective style", highlight: true },
        { year: 2015, event: "Knotless braid technique gains traction as lower-tension alternative" },
        { year: 2019, event: "Traction alopecia recognized as public health concern by dermatology associations", highlight: true },
      ],
      keyTakeaways: [
        "French braid = strands cross over; Dutch braid = strands cross under (creates raised effect).",
        "Even section pick-up at every crossover is what separates clean braids from lumpy ones.",
        "Traction alopecia is caused by over-tight installation — protective styles must not pull the hairline.",
        "Knotless braids reduce root tension compared to traditional box braids — recommend them when possible.",
      ],
      references: [
        { title: "Mielle Organics — Protective Styling Education", url: "https://mielleorganics.com" },
        { title: "American Academy of Dermatology — Traction Alopecia", url: "https://www.aad.org" },
        { title: "Behind The Chair Braiding Techniques", url: "https://behindthechair.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "hs-06-q1",
          type: "Braid Identification",
          challenge: `  Description: braid sits flat against the scalp,
  has a smooth appearance, and outside strands
  are crossed OVER the middle strand at each step.
  New scalp hair is picked up before each crossover.`,
          text: "Which braid technique is described?",
          options: [
            "Dutch braid (inverted braid)",
            "French braid",
            "Three-strand flat plait",
            "Fishtail braid",
          ],
          correctIndex: 1,
          explanation:
            "French braid = outside strands cross over the middle + scalp sections added at each crossover. This creates a flat, smooth braid that lies against the head. Dutch braid uses the same pick-up method but crosses strands under instead of over, which makes the braid pop up above the hair. A flat plait has no scalp pick-up. Fishtail uses two sections, not three.",
        },
        {
          id: "hs-06-q2",
          type: "Technique Error",
          challenge: `  Student's French braid starts clean at the crown,
  but by the nape, the braid looks bumpy and
  one side appears much thicker than the other.`,
          text: "What is the most likely cause?",
          options: [
            "The student crossed strands in the wrong direction partway through",
            "Uneven section pick-ups — adding more hair to one side than the other at each crossover",
            "The braid was started too far back on the head",
            "The hair was not shampooed before braiding",
          ],
          correctIndex: 1,
          explanation:
            "Uneven pick-ups are the #1 French braid error. If you add a large section from the right but only a thin wisp from the left at each crossover, one braid strand grows thicker than the other and the whole braid shifts to one side. Consistent, mirror-image pick-up size on both sides is the skill that makes braids look professional.",
        },
        {
          id: "hs-06-q3",
          type: "Safety",
          challenge: `  Client's scalp shows white or red dimpling
  where the braid roots meet the hairline.
  Client says it "hurts a little" but accepts it
  as normal for fresh braids.`,
          text: "What does this indicate and what should you do?",
          options: [
            "Normal post-braid tension that resolves within hours — continue",
            "Over-tight installation causing mechanical stress on follicles — loosen the affected roots immediately; this is the precursor to traction alopecia",
            "The client has a sensitive scalp — apply a numbing spray and continue",
            "The client needs scalp conditioning applied before every braid session",
          ],
          correctIndex: 1,
          explanation:
            "White/red dimpling and pain at the hairline are signs of dangerous over-tension on the follicle. This is not normal — it's the early warning sign of traction alopecia. The correct action is to immediately undo and re-do the affected roots with less tension. 'Tight but not painful' is the standard. If it hurts, it's too tight.",
        },
        {
          id: "hs-06-q4",
          type: "Dutch vs French",
          challenge: `  Client wants a braid that stands out visibly
  above her hair and looks three-dimensional,
  like it's sitting on top of the hair rather
  than woven into it.`,
          text: "Which technique achieves this effect?",
          options: [
            "French braid — it sits flat and smooth on the scalp",
            "Dutch braid — outside strands cross under, creating a raised, 3D effect",
            "A standard three-strand braid pinned flat with bobby pins",
            "Either technique produces the same result",
          ],
          correctIndex: 1,
          explanation:
            "The Dutch braid (inverted French braid) crosses outside strands under the middle instead of over. This inverts which side of the braid faces outward — the braid sits raised above the surrounding hair rather than flat against the scalp, creating the visible 3D effect the client wants. French braids run flat. They are not interchangeable for this look.",
        },
      ],
    },
  },

  // ─── hair-styling-07 ───────────────────────────────────────────────────────
  {
    epochId: "hair-styling",
    wonder: {
      name: "Kevin Murphy Education",
      location: "Melbourne, Australia",
      era: "Modern",
      emoji: "👑",
    },
    id: "hair-styling-07",
    order: 7,
    title: "Updos, Ponytails & Half-Ups",
    subtitle: "Structure, Balance & Finishing",
    category: "arts",
    xp: 140,
    badge: { id: "hair-styling-07", name: "Updo Artist", emoji: "👑" },
    challengeType: "quiz",
    info: {
      tagline: "Every updo is architecture — balance and anchor points define the result.",
      year: 2000,
      overview: [
        "Upstyles (updos, chignons, French twists) and semi-upstyles (ponytails, half-ups) require understanding the architecture of a hairstyle: where the weight will sit, how to anchor sections securely, and how to disguise the mechanics underneath a polished finish.",
        "The ponytail seems simple but is technically demanding: placement (too low looks sloppy, too high looks severe, at the occipital bone looks elegant), tension distribution (the elastic must hold without denting the nape or causing breakage), and disguising the elastic with a wrapped section are all learned skills.",
        "For formal updos, backcombing (teasing) the base before pinning creates the foundation — a smooth surface has nothing for pins to grip. Bobby pins grip best when the wave side faces toward the head and are inserted at a slight downward angle. Crossed-pin technique provides maximum hold.",
      ],
      technical: {
        title: "Anchor Point System",
        body: [
          "Every updo has 2–4 anchor points: sections firmly pinned that hold the weight.",
          "Pin technique: insert slightly open, close on the hair, push down into foundation.",
          "Cross-pin: two pins inserted in opposite X directions for maximum grip.",
          "Backcombing base: rough the hair at the roots of the foundation section before pinning — pins bite into teased hair more securely.",
          "Ponytail elastic rule: hair tie only, never rubber bands. Rubber bands break hair.",
        ],
        codeExample: {
          label: "Ponytail Placement Guide",
          code: `High ponytail   → above ears (youthful, sporty)
Mid ponytail    → level with ears (casual, everyday)
Low/nape        → at or below occipital bone (elegant, formal)
Occipital pony  → at the occipital prominence (classic,
                   balances facial features)

Wrap technique: take 1/2-inch section from ponytail,
wrap around elastic, secure with bobby pin underneath`,
        },
      },
      incident: {
        title: "The Elastic Damage Problem",
        when: "Ongoing",
        where: "Daily hair routines worldwide",
        impact: "Leading cause of mechanical breakage in regular ponytail wearers",
        body: [
          "Wearing a tight ponytail in the same position every day creates a zone of constant friction at the elastic point. Hair breaks at this location — producing the classic 'ponytail line' of short, broken strands.",
          "Prevention: vary placement daily, use fabric-covered elastics, and never sleep in a tight elastic. The wrapped section technique eliminates the elastic-to-hair contact entirely by covering it.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Foundation & Backcombing", type: "attacker" },
          { label: "Anchor Point Placement", type: "system" },
          { label: "Secure Pin Technique", type: "victim" },
          { label: "Balanced, Long-Lasting Updo", type: "result" },
        ],
      },
      timeline: [
        { year: 1900, event: "Gibson Girl updo popularizes formal updos in western fashion" },
        { year: 1960, event: "Beehive and bouffant styles push updos to architectural extremes" },
        { year: 1990, event: "Scrunchie popularized, reducing elastic-caused breakage", highlight: true },
        { year: 2010, event: "Messy bun becomes dominant casual upstyle globally" },
        { year: 2018, event: "Bridal updos drive high-end upstyle education market", highlight: true },
      ],
      keyTakeaways: [
        "Backcombing the base sections before pinning dramatically improves bobby pin grip.",
        "Cross-pin technique (two pins in opposite X directions) provides the most secure hold.",
        "Ponytail placement at the occipital bone is the most universally flattering position.",
        "Always wrap a small section over the elastic to disguise it and reduce elastic-to-hair damage.",
      ],
      references: [
        { title: "Kevin Murphy Education — Updos", url: "https://kevinmurphy.com.au/education" },
        { title: "Behind The Chair Updo Techniques", url: "https://behindthechair.com" },
        { title: "American Salon Bridal Styling Guide", url: "https://americansalon.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "hs-07-q1",
          type: "Pin Technique",
          challenge: `  Student is pinning an updo foundation section.
  The bobby pins keep sliding out within 10 minutes.
  Hair is freshly washed, smooth, and slightly damp.`,
          text: "What are the two most likely causes of the pins sliding out?",
          options: [
            "Pins are the wrong size; use larger pins for thick hair",
            "Hair was not backcombed at the base, and pins were inserted wave-side away from the head on smooth, slightly damp hair — no grip surface and wrong angle",
            "Too many pins were used, creating a slippery surface",
            "The hair needs to be fully wet for pins to grip properly",
          ],
          correctIndex: 1,
          explanation:
            "Two classic errors: (1) Smooth, freshly washed hair provides nothing for pins to grip — backcomb the root section to create texture. (2) Bobby pins grip with the wavy side facing the scalp, not away from it. Damp hair also reduces pin grip and is a sign the blowout wasn't completed before pinning.",
        },
        {
          id: "hs-07-q2",
          type: "Ponytail Placement",
          challenge: `  Client: round face shape, short neck
  Request: a ponytail for a formal event that
  appears to elongate the neck and slim the face.`,
          text: "Where should the ponytail be placed and why?",
          options: [
            "High ponytail at the crown — pulls attention upward, making the neck look longer",
            "Low ponytail at the occipital bone — elongates the neck by keeping weight low and creating vertical length",
            "Mid-level at the ears — neutral placement for all face shapes",
            "Side ponytail at the temple — breaks the symmetry for a slimming effect",
          ],
          correctIndex: 1,
          explanation:
            "A low ponytail at the nape/occipital area keeps the neck visible and creates a long vertical line — visually elongating the neck and slimming the face by leaving the facial frame open. A high ponytail shortens the visible neck and emphasizes face width. Mid-level is neutral but not specifically flattering for this face shape.",
        },
        {
          id: "hs-07-q3",
          type: "Updo Architecture",
          challenge: `  Formal updo on a client with very fine, slippery hair.
  Every technique attempted collapses within the
  appointment. Products tried: hairspray, serum, oil.`,
          text: "What product and technique approach would provide the best foundation?",
          options: [
            "Add more serum — fine hair needs extra slip to fold smoothly",
            "Backcomb (tease) the foundation sections with a fine-tooth comb, use a texturizing spray or dry shampoo before pinning, and use crossed bobby pins",
            "Apply styling gel throughout to provide hold, then pin immediately",
            "Fine hair cannot support a formal updo without hair extensions",
          ],
          correctIndex: 1,
          explanation:
            "Serum and oil make hair more slippery — the opposite of what's needed. Fine hair needs grip: backcombing creates texture, dry shampoo/texturizer roughens the surface for pin bite, and cross-pinning distributes hold. Gel works for sleek styles but makes fine hair stiff and brittle when backcombed. Fine hair can absolutely hold an updo with the right preparation.",
        },
        {
          id: "hs-07-q4",
          type: "Damage Prevention",
          challenge: `  Regular client comes in with a band of short, broken
  hairs at the same location every visit.
  She wears a tight ponytail in the same spot daily.`,
          text: "What is causing this breakage and what should you recommend?",
          options: [
            "Over-brushing — recommend a boar-bristle brush for gentler detangling",
            "Mechanical breakage from constant elastic tension at a single point — recommend varying ponytail height daily, using fabric elastics, and the section-wrap technique to eliminate elastic contact",
            "Chemical damage from heat styling — recommend a heat protectant",
            "Normal breakage from hair growth cycles — no action needed",
          ],
          correctIndex: 1,
          explanation:
            "A band of broken hair at one location is the textbook sign of mechanical breakage from elastic tension. The friction point of the hair tie abrades the cuticle and eventually snaps the strand. Solutions: vary placement (different stress points), fabric/seamless elastics (less friction), and the section wrap technique (no elastic directly on hair at all).",
        },
      ],
    },
  },

  // ─── hair-styling-08 ───────────────────────────────────────────────────────
  {
    epochId: "hair-styling",
    wonder: {
      name: "DevaCurl",
      location: "New York City, New York",
      era: "Modern",
      emoji: "🌿",
    },
    id: "hair-styling-08",
    order: 8,
    title: "Curly Hair Techniques",
    subtitle: "Diffusing, Plopping & Curl Definition",
    category: "arts",
    xp: 140,
    badge: { id: "hair-styling-08", name: "Curl Whisperer", emoji: "🌿" },
    challengeType: "quiz",
    info: {
      tagline: "Curly hair is a living texture — work with it, not against it.",
      year: 2001,
      overview: [
        "Curly and coily hair (Types 2C–4C) require techniques that differ fundamentally from straight hair care. The primary challenges are moisture retention, frizz control, and curl definition without disrupting the natural pattern. The foundational principle: less manipulation equals more definition.",
        "Plopping is a no-heat technique where soaking wet, product-applied hair is gently lowered onto a microfiber towel or t-shirt, wrapped for 20–30 minutes, and released. This enhances natural curl clumping without towel-rubbing frizz. Diffusing disperses blow dryer air broadly over curl clusters, lifting them at the root while keeping the curl pattern intact.",
        "Styling products for curly hair follow the LCO (Liquid, Cream, Oil) or LOC (Liquid, Oil, Cream) method to layer moisture and seal it in. Water is applied first (wet or damp hair), then a cream for definition, then an oil or gel to seal. The 'gel cast' — a crunchy feeling when gel dries — is intentional; it's scrunch-broken after drying to release soft curls.",
      ],
      technical: {
        title: "Curl Technique Glossary",
        body: [
          "Plopping: wet hair lowered into microfiber towel, wrapped 20–30 min, releases without frizz.",
          "Diffusing: attach diffuser bowl to dryer; low heat, low speed; hover or cup curl clusters.",
          "Praying hands: smooth product down the hair shaft (not rubbing) to coat without disturbing curl.",
          "Scrunching: cupping and squeezing curls upward to encourage clumping and definition.",
          "Gel cast: leave gel to dry hard, scrunch to 'break the cast' and reveal soft defined curls.",
          "Pineapple: loose high ponytail for sleeping, preserves curls overnight.",
        ],
        codeExample: {
          label: "Wash Day Routine (Type 3–4)",
          code: `1. Shampoo or co-wash (no sulfates)
2. Deep condition (5–30 min under heat cap)
3. Rinse, leave hair soaking wet
4. Apply leave-in conditioner (praying hands)
5. Apply curl cream (scrunch upward)
6. Apply gel (scrunch to cast)
7. Plop 20–30 min, OR air dry, OR diffuse
8. Once fully dry: scrunch to break gel cast
9. Optional: seal with light oil`,
        },
      },
      incident: {
        title: "The DevaCurl Controversy",
        when: "2020",
        where: "North America",
        impact: "Thousands of curl-community members reported hair loss — product reformulation scandal",
        body: [
          "DevaCurl was the cornerstone brand of the curly hair community. In 2020, thousands of users reported sudden hair loss, scalp irritation, and breakage traced to product reformulations that introduced potentially sensitizing ingredients.",
          "The lesson for stylists: know your product ingredients, patch-test new formulations on yourself or a strand before client application, and maintain brand diversification in your offerings — no single brand should be irreplaceable.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Wet Hair + Products Applied", type: "attacker" },
          { label: "Plop or Diffuse (Low Manipulation)", type: "system" },
          { label: "Full Dry Before Touching", type: "victim" },
          { label: "Defined, Frizz-Free Curls", type: "result" },
        ],
      },
      timeline: [
        { year: 2001, event: "Lorraine Massey's Curly Girl Method defines no-sulfate, no-heat philosophy" },
        { year: 2002, event: "DevaCurl launches, builds the curl-specific product market", highlight: true },
        { year: 2010, event: "YouTube tutorials democratize curl technique education globally" },
        { year: 2018, event: "LCO/LOC layering method widely adopted in curl communities" },
        { year: 2020, event: "DevaCurl controversy; curl community diversifies brand loyalty", highlight: true },
      ],
      keyTakeaways: [
        "Plopping replaces rough towel-drying and is the single biggest frizz reducer for curly hair.",
        "Diffusing uses low heat and low airspeed to dry curl clusters without disrupting their pattern.",
        "Never touch curly hair while it's drying — manipulation during drying = frizz.",
        "The gel cast is intentional: scrunch it out only after hair is completely dry.",
      ],
      references: [
        { title: "NaturallyCurly — Curl Techniques", url: "https://naturallycurly.com" },
        { title: "Curly Girl Method", url: "https://curlygirl.com" },
        { title: "Behind The Chair Curly Hair Education", url: "https://behindthechair.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "hs-08-q1",
          type: "Plopping",
          challenge: `  Type 3B client has frizzy results despite using good
  products. After washing, she wrings out her hair and
  rubs it vigorously with a terrycloth towel.`,
          text: "What is causing the frizz and what should she do instead?",
          options: [
            "The products aren't suitable for 3B hair — switch to a heavier cream",
            "Terrycloth and rubbing roughen the cuticle and disrupt curl clumps — switch to plopping with microfiber or a t-shirt",
            "She needs to detangle after washing to separate the curls before drying",
            "Frizz is unavoidable in 3B hair without a relaxer or keratin treatment",
          ],
          correctIndex: 1,
          explanation:
            "Terrycloth towels have a rough texture that roughs up the cuticle and physically separates curl clumps — both produce frizz. Plopping gently lowers wet hair (without rubbing) onto a smooth microfiber cloth or t-shirt, which absorbs excess water without disruption. This is the highest-impact single change for curly clients with frizz complaints.",
        },
        {
          id: "hs-08-q2",
          type: "Diffusing",
          challenge: `  Client uses a diffuser but ends up with less
  defined curls and frizz after drying.
  Inspection shows she moved the diffuser bowl
  constantly, bouncing it up and down rapidly.`,
          text: "What diffusing technique error caused this result?",
          options: [
            "The diffuser bowl was too small for her hair volume",
            "Constant movement and bouncing disrupts curl clumps while wet — hover or cup motionless; let each section dry before moving to the next",
            "High heat was used — diffusing always requires low heat",
            "Product was applied after diffusing instead of before",
          ],
          correctIndex: 1,
          explanation:
            "Constantly moving the diffuser through wet curls disrupts the clumping that defines curls and introduces frizz. Correct diffusing: hover the bowl over curl sections or gently cup them without movement; use low heat, low speed; only move once that section is mostly dry. This is the curl equivalent of 'don't touch it while it's drying.'",
        },
        {
          id: "hs-08-q3",
          type: "Gel Cast",
          challenge: `  Client comes in during the day between wash days.
  Her hair feels crunchy and stiff — she says she used
  gel to style it and is unhappy with the texture.`,
          text: "What step did she likely skip, and how do you explain it to her?",
          options: [
            "She applied too much gel — recommend half the amount next time",
            "She needs to apply a serum over the gel to soften it",
            "The gel cast — the crunchy dry feeling — is intentional and must be scrunch-broken once fully dry to release soft, defined curls",
            "The gel should be rinsed out after styling, not left in",
          ],
          correctIndex: 2,
          explanation:
            "Gel creates a cast over curls as it dries — this crunchy texture is actually the sign of a good hold. The final step is to scrunch the dry curls with clean, dry hands or a microfiber cloth to break the cast and release soft, defined curls underneath. This step is almost always forgotten by first-time gel users.",
        },
        {
          id: "hs-08-q4",
          type: "Overnight Preservation",
          challenge: `  Client's wash day curls look great day one, but by
  morning they're flat, frizzy, and mostly undefined.
  She currently sleeps on a standard cotton pillowcase.`,
          text: "What two changes would best preserve her curls overnight?",
          options: [
            "Apply more gel at night and re-diffuse every morning",
            "Sleep on a satin or silk pillowcase and use the pineapple (loose high ponytail) to prevent crushing curls overnight",
            "Wet hair down completely every morning and re-style from wet",
            "Braid hair before sleeping to stretch and train the curl pattern",
          ],
          correctIndex: 1,
          explanation:
            "Cotton pillowcases create friction that disrupts curl clumps and causes frizz overnight. Satin/silk dramatically reduces this friction. The 'pineapple' — a loose, high ponytail — keeps curls stacked vertically and prevents them from being crushed flat by the pillow. These two changes extend a wash-day style by 2–4 days for most curl types.",
        },
      ],
    },
  },

  // ─── hair-styling-09 ───────────────────────────────────────────────────────
  {
    epochId: "hair-styling",
    wonder: {
      name: "Cosmetology Institute of America",
      location: "Linthicum Heights, Maryland",
      era: "Modern",
      emoji: "🎓",
    },
    id: "hair-styling-09",
    order: 9,
    title: "Client Consultation",
    subtitle: "Communication, Expectation Setting & Managing Reality",
    category: "arts",
    xp: 150,
    badge: { id: "hair-styling-09", name: "Consultation Pro", emoji: "🎓" },
    challengeType: "quiz",
    info: {
      tagline: "A 5-minute consultation prevents a 5-hour correction.",
      year: 2000,
      overview: [
        "The client consultation is the single most important step in any appointment. It determines whether expectations match reality, surfaces contraindications (recent chemical services, scalp conditions, medications affecting hair), and builds the trust relationship that determines whether a client returns.",
        "The consultation uses open-ended questions ('What are you hoping to achieve today?') rather than closed ones ('Do you want a trim?') to let clients describe their goal in their own words. Then you reflect back your understanding ('So you're looking for X, and given your current Y, I'd suggest Z') — this alignment step prevents the most common disappointment: the client wanted something different from what they received.",
        "Managing reality honestly is both ethical and practical. Promising results that aren't achievable with the client's current hair condition, texture, or commitment level creates dissatisfied clients and professional liability. The phrase: 'We can absolutely get there — here's the honest timeline and the steps it takes.'",
      ],
      technical: {
        title: "Consultation Framework",
        body: [
          "Step 1 — Discover: open-ended questions about desired result, lifestyle, home care routine.",
          "Step 2 — Assess: examine hair condition, texture, porosity, current services, scalp health.",
          "Step 3 — Educate: explain what's achievable today and what requires a process/timeline.",
          "Step 4 — Align: restate the plan in plain language and confirm client agreement.",
          "Step 5 — Document: note service plan, products used, and client preferences for next visit.",
          "Contraindications to always ask about: recent relaxer/keratin, scalp lesions, medications (chemo, blood thinners affect hair), DIY color at home.",
        ],
        codeExample: {
          label: "Consultation Question Sequence",
          code: `Open: "What are you hoping we achieve today?"
  Visual: "Can you show me a reference photo?"
  History: "What services have you had in the past 6 months?"
  Lifestyle: "How much time do you have for daily styling?"
  Commit: "On a scale of 1–10, how often do you re-book?"

  Then reflect:
  "Based on what you've shared, I'd recommend [X].
  This is realistic because [Y]. Here's what's involved..."`,
        },
      },
      incident: {
        title: "The Inspiration Photo Gap",
        when: "Daily occurrence in salons worldwide",
        where: "Every salon chair",
        impact: "Leading cause of negative reviews and client dissatisfaction",
        body: [
          "A client shows an inspiration photo of someone with 3A curls, fine hair, and a long bob. The client has 4B coily hair, high density, and medium length. Without a consultation, the stylist might begin styling without surfacing that the reference photo is not achievable with this client's hair — at least not in one session.",
          "The industry term for this is the 'inspiration gap.' Professionals who learn to navigate it — 'I love this look. Let me show you how we can get the elements that work for your hair' — build loyal books. Those who either promise the impossible or say simply 'that won't work for you' lose clients.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Open-Ended Discovery Questions", type: "attacker" },
          { label: "Hair Assessment & History", type: "system" },
          { label: "Realistic Plan Alignment", type: "victim" },
          { label: "Satisfied, Returning Client", type: "result" },
        ],
      },
      timeline: [
        { year: 1980, event: "Vidal Sassoon formalizes client consultation as core curriculum" },
        { year: 2000, event: "State boards begin requiring consultation documentation in licensing exams" },
        { year: 2010, event: "Instagram reference photos become standard consultation tool", highlight: true },
        { year: 2018, event: "Digital intake forms and client history apps enter salon software" },
        { year: 2022, event: "Post-pandemic, consultation-first salons show higher retention rates", highlight: true },
      ],
      keyTakeaways: [
        "Open-ended questions uncover what the client really wants — closed questions just confirm what you assumed.",
        "The alignment step (reflecting back the plan) is what prevents the most common dissatisfaction.",
        "Always ask about recent chemical services and medications — both can be contraindicated.",
        "Documenting each visit (service, products, preferences) allows consistent results across appointments.",
      ],
      references: [
        { title: "Pivot Point International — Consultation Skills", url: "https://pivot-point.com" },
        { title: "Milady Cosmetology Textbook", url: "https://milady.cengage.com" },
        { title: "Behind The Chair — Client Communication", url: "https://behindthechair.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "hs-09-q1",
          type: "Question Technique",
          challenge: `  Stylist asks new client: "Do you want to keep it long?"
  Client says "yes." Stylist trims 2 inches.
  Client is upset — she thought she was getting a
  "dusting" (less than 1/4 inch trim).`,
          text: "What consultation error occurred and how should the question have been asked?",
          options: [
            "The stylist trimmed too much — always take less than requested",
            "Closed question ('Do you want to keep it long?') allows yes/no but reveals nothing about amount — open question: 'How much length are you comfortable losing today?'",
            "The client gave the wrong answer — stylist is not responsible",
            "The stylist should have shown the client a photo of the planned cut before starting",
          ],
          correctIndex: 1,
          explanation:
            "A closed yes/no question ('do you want to keep it long?') creates false alignment — both parties said 'yes' to different things. An open question ('how much length are you comfortable removing?') forces specificity. The stylist could also have shown 2 inches with fingers and confirmed: 'Something like this?' before cutting.",
        },
        {
          id: "hs-09-q2",
          type: "Contraindications",
          challenge: `  Client requests highlights. During consultation she
  mentions she had a Brazilian Blowout (keratin treatment)
  8 weeks ago and has been using a sulfate-free shampoo.`,
          text: "What contraindication concern should you address before proceeding?",
          options: [
            "No concern — keratin treatments and highlights are fully compatible at 8 weeks",
            "Sulfate-free shampoo must be switched to regular shampoo before any chemical service",
            "The keratin formaldehyde residue in the hair can react with highlight developer — confirm the treatment has fully grown out or faded, and strand test before full application",
            "Highlights should not be performed within 12 months of any keratin treatment",
          ],
          correctIndex: 2,
          explanation:
            "Keratin treatments coat the hair shaft with formaldehyde-based polymers. If significant product remains in the hair, it can react with the peroxide developer in highlights, causing unexpected color results or damage. Industry standard: strand test anytime there's a recent chemical history, regardless of timing. The 'safe' window varies by product used.",
        },
        {
          id: "hs-09-q3",
          type: "Expectation Management",
          challenge: `  Client shows an inspiration photo of platinum blonde.
  Her current hair is level 3 (dark brown),
  previously box-dyed, and shows elasticity loss.`,
          text: "What is the most professional response to this request?",
          options: [
            "Proceed with lightening — the client chose this and signed a release",
            "Decline the service entirely — the hair condition makes it impossible",
            "Explain that platinum requires multiple sessions and hair restoration first; map out a realistic timeline, describe the risks honestly, and let the client decide with full information",
            "Perform a single bleach session today and tell her to come back for the rest",
          ],
          correctIndex: 2,
          explanation:
            "This is the 'inspiration gap' scenario. Platinum from level 3 box-dyed hair with elasticity loss requires multiple sessions and likely bond-building treatments — doing it in one session risks severe breakage. The professional response is honest: outline the realistic path, the cost, the timeline, and the hair health requirement. The client then makes an informed choice. Proceeding without this conversation is how stylists damage hair and lose clients.",
        },
        {
          id: "hs-09-q4",
          type: "Documentation",
          challenge: `  A returning client comes in and says "last time you
  did something different on the crown that I loved
  but I can't remember what it was." You have no
  record of the previous visit's technique.`,
          text: "What practice would have prevented this situation?",
          options: [
            "Take a photo of every client before and after each visit and keep a physical album",
            "Document service notes after every appointment: products used, techniques, client feedback, and specific requests — store in client record system",
            "Ask clients to text you their feedback immediately after appointments",
            "This is unavoidable — clients forget and stylists can't remember every visit",
          ],
          correctIndex: 1,
          explanation:
            "Service documentation is a professional standard and a retention tool. Notes from each visit — products, amounts, techniques, client reactions — allow you to reproduce great results and avoid past mistakes. Most salon software (Vagaro, Phorest, Fresha) includes client notes. A quick record after each appointment takes 2 minutes and builds an irreplaceable client history.",
        },
      ],
    },
  },

  // ─── hair-styling-10 ───────────────────────────────────────────────────────
  {
    epochId: "hair-styling",
    wonder: {
      name: "Professional Beauty Association",
      location: "Scottsdale, Arizona",
      era: "Modern",
      emoji: "💼",
    },
    id: "hair-styling-10",
    order: 10,
    title: "Starting Your Styling Business",
    subtitle: "Licensing, Booth Rental & Building a Book",
    category: "arts",
    xp: 200,
    badge: { id: "hair-styling-10", name: "Studio Founder", emoji: "💼" },
    challengeType: "quiz",
    info: {
      tagline: "Your skills get clients in the chair. Your business sense keeps you there.",
      year: 2010,
      overview: [
        "Launching a hair styling business requires two parallel tracks: mastering the technical craft and building the business infrastructure. In the US, cosmetology or barbering licensure is required to practice professionally — typically 1,000–1,500 state-mandated hours of education plus a practical and written exam.",
        "There are four main business models for stylists: employee (salon pays wage + commission), booth rental (rent a station, keep all income, pay your own taxes and supplies), suite rental (private studio, full independence), and salon ownership. Booth and suite rental are the most common entrepreneurial paths because they require minimal startup capital compared to ownership.",
        "A 'book' — your client list — is the real asset of a stylist's business. Building it requires consistent social media presence (Instagram and TikTok are primary discovery channels), word-of-mouth incentives (referral discounts), and a rebooking habit: always attempt to schedule the next appointment before the client leaves the chair.",
      ],
      technical: {
        title: "Booth Rental Economics",
        body: [
          "Booth rent range: $200–$800/week depending on market and salon location.",
          "As a booth renter you are an independent contractor: pay self-employment tax (~15.3%), buy your own products and insurance, manage your own booking.",
          "Break-even formula: (weekly booth rent + supplies + insurance) / average service ticket = clients needed per week.",
          "Rule of thumb: you need 20–30 committed regular clients before booth rental is financially stable.",
          "Cosmetology license: ~1,000–1,500 hours (state-dependent), written + practical exam, renewal every 2–4 years.",
        ],
        codeExample: {
          label: "Booth Rental Break-Even",
          code: `Monthly fixed costs:
  Booth rent:   $600
  Insurance:    $50
  Supplies:     $150
  Total:        $800 / month

  Average service ticket: $80

  Break-even clients: $800 / $80 = 10 clients/month
  (That's 2–3 clients/week minimum to not lose money)

  At 20 clients/month → $1,600 revenue - $800 costs
                       = $800 profit (before taxes)`,
        },
      },
      incident: {
        title: "The Social Media Discovery Shift",
        when: "2016–present",
        where: "United States",
        impact: "Instagram and TikTok now drive the majority of new salon client acquisition under 35",
        body: [
          "Before social media, new clients found stylists through Yellow Pages, walk-ins, or word of mouth. Today, the majority of under-35 clients discover new stylists through Instagram Reels or TikTok videos — specifically transformation videos, technique demos, and before/after posts.",
          "A stylist who posts consistently and documents their work builds a discoverable portfolio. A stylist who relies only on walk-ins and referrals grows 3–5x slower. The investment is time, not money — a smartphone is all that's needed.",
        ],
      },
      diagram: {
        nodes: [
          { label: "License + Business Structure", type: "attacker" },
          { label: "Book Building (Social + Referrals)", type: "system" },
          { label: "Retention (Rebooking + Notes)", type: "victim" },
          { label: "Profitable Independent Business", type: "result" },
        ],
      },
      timeline: [
        { year: 1938, event: "Cosmetology licensing becomes standard across US states" },
        { year: 1980, event: "Booth rental model gains popularity as alternative to employee model" },
        { year: 2010, event: "Instagram becomes primary visual portfolio platform for stylists", highlight: true },
        { year: 2017, event: "Suite rental concepts (Sola Salons, MY SALON Suite) expand nationally" },
        { year: 2020, event: "TikTok styling tutorials drive viral discovery of individual stylists", highlight: true },
      ],
      keyTakeaways: [
        "Cosmetology or barbering licensure is legally required to practice professionally in all 50 US states.",
        "Booth renters are independent contractors — self-employment tax, supplies, insurance are your responsibility.",
        "You need approximately 20–30 committed regular clients before booth rental is financially stable.",
        "Always rebook the next appointment before the client leaves — retention is cheaper than acquisition.",
      ],
      references: [
        { title: "Professional Beauty Association — Licensing Guide", url: "https://probeauty.org" },
        { title: "Sola Salon Studios", url: "https://solasalonstudios.com" },
        { title: "Behind The Chair — Business Education", url: "https://behindthechair.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "hs-10-q1",
          type: "Licensing",
          challenge: `  You've been doing hair for friends and family
  for two years and everyone loves your work.
  A friend suggests you start charging clients
  immediately to build your book faster.`,
          text: "What is the legal requirement you must fulfill before charging for hair services?",
          options: [
            "Register as a sole proprietor with your state — that's the only legal requirement",
            "Obtain a cosmetology or barbering license by completing state-required hours of education and passing written and practical exams",
            "Get liability insurance — this is all that's needed to practice professionally",
            "There is no legal requirement; you can charge for services at any skill level",
          ],
          correctIndex: 1,
          explanation:
            "In all 50 US states, a cosmetology or barbering license is required to charge money for hair services performed on the public. Practicing without a license is illegal and can result in fines. The licensure path: complete state-required hours (typically 1,000–1,500) at an accredited cosmetology school, then pass the written theory and practical skill exams.",
        },
        {
          id: "hs-10-q2",
          type: "Business Model",
          challenge: `  Licensed stylist weighing options:
  Option A: Employee at an established salon
  Option B: Booth renter at the same salon
  She has 8 regular clients currently.`,
          text: "Which model is more appropriate for her current stage and why?",
          options: [
            "Booth rental — she keeps 100% of her income immediately",
            "Employee — with only 8 regular clients, she doesn't yet have the volume to cover booth rent reliably; employee provides steady income while building the book",
            "She should open her own salon — skipping intermediate stages builds the book faster",
            "Both models have identical risk profiles at this client count",
          ],
          correctIndex: 1,
          explanation:
            "Booth rent of even $200/week ($800/month) plus supplies and insurance is hard to cover with only 8 regular clients. Most stylists recommend 20–30 committed regulars before making the leap. As an employee, a new stylist receives steady income (often commission-based), works on the salon's walk-ins, and can build her own regular clientele before assuming fixed overhead.",
        },
        {
          id: "hs-10-q3",
          type: "Social Media",
          challenge: `  Two stylists, same skill level, same city:
  Stylist A: posts 3x/week on Instagram and TikTok,
  documents work with before/afters and technique clips
  Stylist B: no social media, word-of-mouth only`,
          text: "After 12 months, what is the most likely difference in their client acquisition?",
          options: [
            "No meaningful difference — skill quality determines client growth, not social media",
            "Stylist A has likely acquired 3–5x more new clients under 35 than Stylist B, primarily through discovery on social platforms",
            "Stylist B grew faster — word-of-mouth clients are more loyal and refer more",
            "Stylist A burned out from posting and has lower retention",
          ],
          correctIndex: 1,
          explanation:
            "For under-35 clients, Instagram and TikTok are now the primary discovery channels for new stylists. Consistent posting with clear before/afters and technique content is a passive acquisition engine — videos can be discovered months after posting. Word-of-mouth remains valuable but grows linearly (one referral at a time); social media scales exponentially. Both stylists can grow, but the gap in new client volume over 12 months is typically significant.",
        },
        {
          id: "hs-10-q4",
          type: "Retention",
          challenge: `  Stylist's new client had a great appointment and
  leaves happy. The stylist says "let us know when
  you want to come back!" No next appointment is set.`,
          text: "What retention practice was missed and how does it affect the business?",
          options: [
            "The stylist should have taken payment upfront for the next appointment",
            "Failing to rebook before the client leaves is the most costly retention error — rebooking at checkout converts ~80% of satisfied clients; clients who leave without booking return at a rate of ~40%",
            "The stylist should send a follow-up text the next day — that's more effective than in-chair rebooking",
            "No retention error — satisfied clients always return regardless of rebooking",
          ],
          correctIndex: 1,
          explanation:
            "Industry data consistently shows rebooking at checkout doubles or triples return rates compared to leaving it to the client to initiate. The phrase 'Let us know when you want to come back' puts the burden on the client and introduces friction. The professional close: 'I'd recommend 6–8 weeks for your next visit — shall we get that on the books now?' Most happy clients say yes when asked directly.",
        },
      ],
    },
  },
];
