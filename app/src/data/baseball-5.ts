import type { StageConfig, EpochConfig } from "./types";

export const baseball5Epoch: EpochConfig = {
  id: "baseball-5",
  name: "The Art of Pitching",
  subtitle: "Mechanics & Fundamentals",
  description:
    "Pitching is the most technically demanding skill in baseball — a symphony of biomechanics, mental fortitude, and strategic intelligence executed in under two seconds on every delivery. This epoch breaks down the complete craft: the rubber and stance, grip science, windup and stretch mechanics, arm action, release point command, holding runners, velocity, pitch counts, fielding, and the mound mindset. From Clayton Kershaw's legendary delivery to the pitch count rules protecting young arms, you will learn to think and throw like the best in the game.",
  emoji: "⚾",
  color: "green",
  unlocked: true,
};

export const baseball5Stages: StageConfig[] = [
  // ─── baseball-5-01: The Pitching Rubber and Stance ───────────────────────────
  {
    epochId: "baseball-5",
    wonder: {
      name: "Dodger Stadium — The Pitcher's Mound",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "⚾",
    },
    id: "baseball-5-01",
    order: 1,
    title: "The Pitching Rubber and Stance",
    subtitle: "Stretch vs. windup, rocker step, balance, and situational delivery",
    category: "sports",
    xp: 80,
    badge: { id: "baseball-5-badge-01", name: "On the Rubber", emoji: "🟫" },
    challengeType: "quiz",
    info: {
      tagline: "Everything that happens in a pitch begins with one foot on a six-inch slab of rubber — and how you stand on it determines everything that follows.",
      year: 1962,
      overview: [
        "The pitching rubber is the literal foundation of every pitch. Located at the top of the eighteen-inch mound, sixty feet and six inches from the front edge of home plate, the rubber is a six-inch by twenty-four-inch white slab that the pitcher must be in contact with at the start of every legal delivery. How a pitcher stands on and uses the rubber — which foot contacts it, how the body is positioned, how the weight is distributed — sets the mechanics for every subsequent movement in the delivery.",
        "There are two primary pitching stances: the windup and the stretch. The windup is used with the bases empty or with runners who pose no steal threat; it features a rocker step back, a leg lift, and a full hip rotation that generates maximum velocity. The stretch is used with runners on base; it features a more compact initial stance, a smaller leg lift, and a faster delivery to the plate to minimize the catcher's time to throw out baserunners. Some pitchers use only the stretch even with the bases empty for consistency.",
        "Stance width on the rubber matters. A pitcher whose pivot foot (the foot that pushes off the rubber) is too close to the center of the rubber may lose balance during the delivery; too far to one side, and the stride path becomes angled rather than direct. Dodger pitchers work extensively with pitching coaches on rubber positioning as part of refining their mechanics for both velocity and command.",
      ],
      technical: {
        title: "The Rocker Step and Weight Transfer",
        body: [
          "In a full windup, the rocker step is the backward step taken with the stride foot before the leg lift. It serves as a timing mechanism and weight-loading movement: the pitcher rocks their weight onto the pivot foot (which contacts the rubber), then shifts that weight to the back as the stride leg lifts. This pre-loading stores elastic energy in the hip and core that is then released explosively toward home plate.",
          "The balance point — the brief moment of maximum leg lift — is where many young pitchers lose their mechanics. Collapsing the torso forward, rushing the stride, or allowing the shoulders to tilt at the balance point all disrupt the kinetic chain that follows. Elite pitchers maintain a tall, balanced posture at maximum leg lift before the aggressive forward drive begins.",
        ],
        codeExample: {
          label: "Windup vs. Stretch — Key Differences",
          code: `  WINDUP (bases empty or non-threat):
  1. Pivot foot contacts rubber (parallel or toe)
  2. Rocker step back with stride foot
  3. Hands come together at chest
  4. Leg lift to balance point
  5. Stride forward — full hip rotation
  6. Maximum velocity potential

  STRETCH (runners on base):
  1. Pivot foot on rubber — stride foot sideways
  2. Hands together in set position
  3. Pause (come to a complete stop — REQUIRED)
  4. Leg lift (shorter — quicker delivery)
  5. Stride and throw — faster to plate
  6. Limits stolen base opportunity

  BALANCE POINT CHECKLIST:
  ✓ Head tall — do not collapse forward
  ✓ Pivot leg flexed but stable
  ✓ Hips closed (sideways to home plate)
  ✓ Hands at chest, glove side controlled
  ✗ Do not drift forward before leg lift peaks`,
        },
      },
      incident: {
        title: "The Dodgers Move to Dodger Stadium — The Mound is Born",
        when: "April 10, 1962 — Dodger Stadium opens",
        where: "Dodger Stadium, Los Angeles, California",
        impact: "When Dodger Stadium opened in 1962, it was engineered with a pitching mound designed to the exact specifications of the era — eighteen inches of height, a precisely sloped surface, and a rubber placement that has remained essentially unchanged. Don Drysdale and Sandy Koufax immediately used the new stadium's mound to establish dominant careers.",
        body: [
          "Dodger Stadium opened on April 10, 1962, and its mound became one of the most celebrated in baseball. Sandy Koufax, who was already becoming one of the game's most dominant pitchers, found the mound's firmness and slope suited his high leg-lift, over-the-top delivery perfectly. Koufax won three Cy Young Awards using that mound and authored four no-hitters — including a perfect game in 1965 — from his spot on the rubber.",
          "The Dodger pitching tradition that began at that mound — Koufax, Drysdale, Fernando Valenzuela, Orel Hershiser, Clayton Kershaw — is the most storied in the National League. Pitching coaches at the Dodger complex study every aspect of rubber contact and stance width as part of their development system. Youth coaches who teach the same principles trace the lineage directly to that stadium.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Rubber Contact", sub: "pivot foot legal position", type: "system" },
          { label: "Stance / Set Position", sub: "windup or stretch decision", type: "attacker" },
          { label: "Rocker Step / Balance Point", sub: "weight load before drive", type: "victim" },
          { label: "Drive to Plate", sub: "kinetic chain releases", type: "result" },
        ],
      },
      timeline: [
        { year: 1893, event: "Pitching distance set at 60'6\" — modern mound distance established" },
        { year: 1903, event: "Pitching rubber standardized at 24\" x 6\" in official rules" },
        { year: 1969, event: "Mound height lowered from 15\" to 10\" to reduce pitcher dominance", highlight: true },
        { year: 1962, event: "Dodger Stadium opens — Sandy Koufax and Don Drysdale define Dodger pitching tradition", highlight: true },
        { year: 1988, event: "Orel Hershiser pitches 59 consecutive scoreless innings — Dodger mound record" },
        { year: 2015, event: "Clayton Kershaw wins third Cy Young — modern Dodger mound legacy continues" },
      ],
      keyTakeaways: [
        "The windup is used with bases empty for maximum velocity; the stretch is used with runners on base for quicker delivery",
        "The rocker step loads the pivot leg; the balance point — tall posture at maximum leg lift — sets up the kinetic chain",
        "A complete stop in the set position is required in the stretch — failing to pause is a balk",
        "Rubber positioning (where on the 24-inch rubber the pivot foot contacts) affects stride angle and pitch command",
      ],
      references: [
        { title: "MLB Official Rules: Pitching Regulations", url: "https://www.mlb.com/official-information/umpires/rules" },
        { title: "Dodgers: Pitching Development History", url: "https://www.mlb.com/dodgers" },
        { title: "Baseball Reference: Sandy Koufax", url: "https://www.baseball-reference.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-5-01-q1",
          type: "Windup vs. Stretch",
          challenge: `  Runner on first base, nobody out.
  Your pitcher starts the windup instead
  of the stretch. The runner gets a huge
  jump and steals second easily.

  What went wrong, and why?`,
          text: "Why must a pitcher use the stretch position rather than the full windup with a runner on base?",
          options: [
            "The windup is legal with a runner on first — the pitcher made no mistake",
            "The windup's longer delivery time (rocker step + full leg kick) gives the runner extra time to reach second before the catcher can throw",
            "The problem was the catcher's arm strength, not the pitcher's delivery",
            "The windup reduces velocity — the faster pitch from the stretch would have beaten the runner",
          ],
          correctIndex: 1,
          explanation: "A full windup adds roughly 0.3–0.5 seconds to the delivery time to home plate. An MLB-level catcher needs the ball in about 2.0 seconds from pitcher release to second base. A pitcher using the windup instead of the stretch routinely gives 2.3–2.6 seconds — which is almost always enough time for a fast runner to steal successfully. The stretch exists specifically to compress delivery time and give the catcher a chance. Using the windup with a fast runner on base is a fundamental mechanical error.",
        },
        {
          id: "baseball-5-01-q2",
          type: "Balance Point",
          challenge: `  A young pitcher falls forward off the
  mound during their leg lift — they
  lose balance at the top and rush
  their stride before reaching the balance point.

  What usually happens to the pitch?`,
          text: "How does losing the balance point at maximum leg lift affect pitch command and velocity?",
          options: [
            "Losing balance increases velocity because the momentum carries the pitcher toward the plate faster",
            "Losing balance at the balance point disrupts hip loading — the pitcher rushes forward before their hips have rotated, typically resulting in high, wild pitches and reduced velocity",
            "Balance point doesn't affect the pitch — once the arm starts, mechanics are set",
            "The pitch will naturally correct itself because the stride foot anchors the delivery",
          ],
          correctIndex: 1,
          explanation: "The balance point is when the pitcher's weight fully loads onto the pivot foot before driving forward. Rushing through this position means the hips have not closed fully, and the weight transfer sequence is scrambled. The arm and upper body end up ahead of the lower body — exactly backwards from the correct kinetic chain sequence. The result is typically high and flat pitches (because the release point shifts early) and significantly reduced velocity (because hip rotation, the engine of the delivery, hasn't engaged properly).",
        },
        {
          id: "baseball-5-01-q3",
          type: "Set Position Balk",
          challenge: `  A pitcher with runners on first and second
  comes set in the stretch, then immediately
  starts his delivery without coming to a
  complete stop.

  The umpire calls a balk. Are they correct?`,
          text: "What is required in the set position, and why does failing to stop result in a balk?",
          options: [
            "No — the pitcher only needs to pause briefly, and any visible pause is sufficient",
            "Yes — the rules require a complete and discernible stop in the set position; failing to stop is a balk, and all runners advance one base",
            "No — balks only apply when the pitcher makes an illegal pickoff move, not during the delivery",
            "It depends on the umpire's judgment — the rule is subjective",
          ],
          correctIndex: 1,
          explanation: "Official baseball rules (Rule 5.07) require that a pitcher in the set position come to 'a complete stop' before delivering to the plate. The stop must be discernible — a brief, visible pause with hands together. Failing to stop is a balk, and all runners advance one base automatically. This rule exists to prevent pitchers from using a continuous motion in the stretch that would make it impossible for runners to read the delivery. The complete stop is non-negotiable and enforced from Little League through the Major Leagues.",
        },
        {
          id: "baseball-5-01-q4",
          type: "Rubber Positioning",
          challenge: `  A right-handed pitcher consistently struggles
  with command to left-handed hitters. Their
  pitching coach suggests moving their pivot
  foot to the first-base side of the rubber.

  How would this adjustment help?`,
          text: "How does the position of the pivot foot on the rubber affect pitch angle and command?",
          options: [
            "Rubber positioning has no effect on pitch angle — only arm slot matters",
            "Moving to the first-base side of the rubber changes the angle of the stride path, effectively shifting where pitches appear to enter the strike zone from a hitter's perspective",
            "Moving toward first base increases velocity because the pitcher is closer to the plate",
            "Rubber position only matters for left-handed pitchers — right-handers should always use the center",
          ],
          correctIndex: 1,
          explanation: "The rubber is 24 inches wide, giving pitchers multiple contact points. A right-handed pitcher who contacts the rubber on the first-base side creates a stride path that angles toward the right-handed batter's box and pitches from a more direct angle to a left-handed hitter's outer half. Moving to the third-base side of the rubber creates the opposite angle. Elite pitching coaches prescribe specific rubber positions for individual pitchers to maximize their natural stuff and improve command to specific hitter types.",
        },
      ],
    },
  },

  // ─── baseball-5-02: The Grip ─────────────────────────────────────────────────
  {
    epochId: "baseball-5",
    wonder: {
      name: "Camelback Ranch — Dodgers Spring Training",
      location: "Glendale, Arizona",
      era: "Modern",
      emoji: "🤲",
    },
    id: "baseball-5-02",
    order: 2,
    title: "The Grip",
    subtitle: "Four-seam foundation, finger pressure, movement, and youth hand sizes",
    category: "sports",
    xp: 80,
    badge: { id: "baseball-5-badge-02", name: "The Grip", emoji: "✋" },
    challengeType: "quiz",
    info: {
      tagline: "A two-inch adjustment of the fingertips can mean the difference between a straight fastball and six inches of late movement — grip is everything.",
      year: 2019,
      overview: [
        "The grip is how a pitcher communicates with the baseball. Every movement a pitch makes — rise, sink, cut, curve — originates in how the fingers and wrist impart spin at the moment of release. The four-seam fastball grip is the universal foundation: index and middle fingers across the widest part of the seams (the two seams farthest apart), thumb underneath, ring and pinky fingers tucked to the side. This grip produces pure backspin and maximum velocity — the straightest, fastest pitch a pitcher can throw.",
        "Finger pressure is the most underappreciated element of grip mechanics. Applying slightly more pressure with the index finger pushes the ball toward the arm-side (left for a right-hander), creating a two-seam fastball with natural running action. Pressure with the middle finger moves the ball away. The difference between a four-seam and a two-seam fastball in terms of grip is subtle — two fingers positioned slightly differently on the seam — but the resulting movement difference can be four to six inches at the plate.",
        "Youth hand size is a critical variable in grip development. Young pitchers with smaller hands often cannot properly grip pitches designed for adult hands — especially breaking balls that require wrist pronation. Teaching a twelve-year-old a curveball grip designed for an adult arm and hand is both mechanically unsound and medically risky. Spring training at Camelback Ranch, the Dodgers' Glendale facility, includes grip fitting sessions where minor leaguers are taught grip modifications based on individual hand measurements.",
      ],
      technical: {
        title: "How Seam Orientation Creates Movement",
        body: [
          "A baseball has 108 stitches arranged in a specific pattern that creates four overlapping seams around the ball. When a pitcher grips across the four widest seams and releases with pure backspin (the four-seam fastball), the Magnus effect — the aerodynamic force created by a spinning object — generates lift that makes the ball 'rise' relative to a no-spin trajectory. At 95 mph, a four-seam fastball with 2,400 rpm of backspin can resist gravity by ten to twelve inches compared to a ball thrown with no spin.",
          "The two-seam fastball (also called a sinker) is gripped with the fingers on the two narrow seams. The slight pronation at release imparts sidespin combined with backspin — the Magnus effect creates downward and arm-side movement. Hitters who are told 'this is a fastball' based on the arm speed read a sinking pitch differently than a rising four-seam, causing ground balls or swings over the top of the ball.",
        ],
        codeExample: {
          label: "Grip Guide — Four Core Grips",
          code: `  FOUR-SEAM FASTBALL:
  → Index + middle fingers across wide seams
  → Thumb beneath ball (between seams)
  → Light contact with ring/pinky fingers
  → Pure backspin → maximum velocity, slight rise
  → Youth: easiest grip to learn first

  TWO-SEAM FASTBALL / SINKER:
  → Index + middle fingers ON the narrow seams
  → Same thumb position
  → Natural pronation at release
  → Produces arm-side run + sink
  → Great for ground ball pitchers

  CHANGEUP (circle or 3-finger):
  → Circle change: index + thumb form an "ok" sign
  → Ball rests on middle, ring, pinky fingers
  → Same arm speed as fastball
  → 8–12 mph slower due to grip drag
  → SAFE for youth pitchers — no stress on elbow

  CURVEBALL (ADVANCED — 14+ recommended):
  → Middle finger on top seam, index alongside
  → Thumb on bottom seam
  → Wrist snap forward and downward
  → Topspin → downward break
  → NOT recommended for youth under 13`,
        },
      },
      incident: {
        title: "Trevor Bauer and the Grip Science Revolution — Camelback Ranch, 2019",
        when: "Spring Training 2019 — Camelback Ranch, Glendale, Arizona",
        where: "Camelback Ranch, Glendale, Arizona",
        impact: "As Dodgers pitchers in the modern analytics era began working with Rapsodo and TrackMan spin-rate measurement devices at Camelback Ranch, grip science became a competitive frontier. Understanding exactly how seam orientation and finger pressure affected spin axis and movement allowed Dodger pitchers to design pitches with precision.",
        body: [
          "The Dodgers' use of Rapsodo ball-tracking technology at Camelback Ranch transformed spring training grip development. By 2019, every Dodger pitching prospect could measure the exact spin rate, spin axis, and movement profile of every pitch they threw with each grip variation. A pitcher who found that moving their two-seam index finger one centimeter toward the inside of the seam increased horizontal movement by two inches could document and replicate that adjustment. Grip fitting became as precise as bat fitting for hitters.",
          "The practical result: pitchers arrived at Camelback Ranch with one or two pitches, worked with the technology to find optimal grip positions, and left with verifiable, measured pitch shapes. The grip-to-spin-axis relationship — once passed down orally through generations of coaches — became a quantified, teachable science. Youth coaches who study this era of Dodger development use the same principles in simplified form: measure, adjust, measure again.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Grip Across Seams", sub: "four-seam: widest gap", type: "system" },
          { label: "Finger Pressure", sub: "index vs. middle emphasis", type: "attacker" },
          { label: "Spin Axis at Release", sub: "backspin, sidespin, topspin", type: "victim" },
          { label: "Magnus Effect", sub: "spin creates late movement", type: "result" },
        ],
      },
      timeline: [
        { year: 1870, event: "Candy Cummings credited with inventing the curveball — first documented pitch based on grip" },
        { year: 1950, event: "Sandy Koufax develops his curveball grip under advice from catcher Norm Sherry" },
        { year: 1990, event: "Tom House introduces biomechanical grip analysis to professional pitching instruction" },
        { year: 2015, event: "Rapsodo and TrackMan spin-rate devices enter MLB training facilities", highlight: true },
        { year: 2019, event: "Dodgers at Camelback Ranch use spin axis data to optimize grip fitting for all pitchers", highlight: true },
        { year: 2024, event: "Grip analytics standard across all 30 MLB organizations — youth programs adopt simplified versions" },
      ],
      keyTakeaways: [
        "The four-seam fastball grip — fingers across the widest seams — is the foundation every pitcher learns first",
        "Finger pressure (more on index vs. middle) shifts the spin axis and creates movement away from pure backspin",
        "The changeup is the safest off-speed pitch for youth arms — same arm speed as a fastball, no elbow stress",
        "Curveballs with wrist snap are not recommended for pitchers under 13 — hand and growth plate protection comes first",
      ],
      references: [
        { title: "Baseball Savant: Spin Rate and Movement Data", url: "https://baseballsavant.mlb.com" },
        { title: "Dodgers: Spring Training Pitching Development", url: "https://www.mlb.com/dodgers" },
        { title: "Little League: Pitch Safety Guidelines", url: "https://www.littleleague.org/player-safety/pitch-smart" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-5-02-q1",
          type: "Grip Foundation",
          challenge: `  A 10-year-old pitcher asks what pitch
  to learn first. They have average hand
  size for their age and want to throw
  as many pitches as the pros do.

  What is the correct answer?`,
          text: "Which pitch should every young pitcher learn first, and why?",
          options: [
            "The curveball — it is the most deceptive pitch and gives young hitters the most trouble",
            "The four-seam fastball — it is the foundation of all pitching mechanics and requires no wrist stress",
            "The slider — it breaks late and is the easiest pitch to command",
            "The changeup — deception is more important than velocity at youth levels",
          ],
          correctIndex: 1,
          explanation: "The four-seam fastball is the universal first pitch because it teaches proper mechanics without modification: straight back-arm path, no wrist snap, no pronation, no elbow stress. Every other pitch is learned by modifying this foundation. A pitcher who can throw a consistent four-seam fastball has already done the hard work — they understand their release point, arm slot, and stride direction. All advanced pitches are variations on that foundation. Curveballs and sliders should not be thrown by youth pitchers whose growth plates are still developing.",
        },
        {
          id: "baseball-5-02-q2",
          type: "Movement and Spin",
          challenge: `  A pitcher's four-seam fastball measures
  2,500 rpm on a Rapsodo device but
  moves very little — it is flat and easy
  to hit. A teammate's fastball measures
  2,200 rpm but hitters consistently miss it.

  What might explain the difference?`,
          text: "Why can a lower spin-rate fastball have more useful movement than a higher spin-rate one?",
          options: [
            "Spin rate is the only factor — the higher spin fastball must be more deceptive regardless of shape",
            "Spin efficiency (how much of the spin is true backspin vs. inefficient gyrospin) determines actual movement — a lower rpm with perfect backspin axis beats high rpm with tilted axis",
            "Velocity differences explain this — the teammate must be throwing harder",
            "Rapsodo measurements are inaccurate for youth pitchers — the comparison is meaningless",
          ],
          correctIndex: 1,
          explanation: "Spin rate alone does not determine movement — spin efficiency and spin axis are equally critical. A fastball with 2,500 rpm but a gyroscopic spin axis (ball spinning like a football) generates almost no Magnus-effect movement because the spin is not acting perpendicular to the velocity vector. A fastball with 2,200 rpm of pure backspin on a 12:00–6:00 axis generates maximum rise. Modern pitching analytics measure 'active spin' — the percentage of total spin contributing to movement — which can vary from 60% to nearly 100% depending on grip and wrist position.",
        },
        {
          id: "baseball-5-02-q3",
          type: "Changeup Safety",
          challenge: `  A 12-year-old pitcher wants to throw a
  curveball because it breaks and confuses
  hitters. Their pitching coach says no
  and suggests a changeup instead.

  Why is the changeup safer than a curveball
  for a 12-year-old?`,
          text: "What makes the changeup the recommended off-speed pitch for young pitchers versus a curveball?",
          options: [
            "Changeups are slower, which reduces arm stress from velocity, unlike curveballs",
            "The changeup uses the same arm action as a fastball with no wrist snap — the deception comes from grip drag, not from an unnatural motion that stresses the elbow",
            "Curveballs are banned in Little League — it is a rule, not a recommendation",
            "Changeups are easier to command, making them more practical at youth levels",
          ],
          correctIndex: 1,
          explanation: "The changeup's deception comes entirely from grip drag — the ball rests deeper in the palm with more fingers, which slows it without changing arm speed. There is no wrist snap, no pronation stress, no forearm torque. It is biomechanically nearly identical to a fastball at the arm. The curveball requires a forward wrist snap and forearm pronation that places significant stress on the ulnar collateral ligament — the same ligament damaged in Tommy John surgery. With youth pitchers' growth plates still developing, that repetitive stress is genuinely dangerous. The changeup gives the same deceptive purpose with zero additional arm risk.",
        },
        {
          id: "baseball-5-02-q4",
          type: "Finger Pressure",
          challenge: `  A right-handed pitcher's two-seam fastball
  keeps running inside to right-handed hitters
  instead of away from them (arm-side run
  toward the third-base dugout).

  The pitching coach says: "You're putting
  too much pressure on your middle finger."

  What adjustment should they make?`,
          text: "How does shifting finger pressure between the index and middle fingers change the direction of fastball movement?",
          options: [
            "Shift more pressure to the middle finger — it will push the ball further toward third base",
            "Shift more pressure to the index finger — index-side pressure creates arm-side (right-hander: toward first base) movement",
            "Remove finger pressure entirely and throw with equal weight — this neutralizes unwanted movement",
            "Finger pressure does not meaningfully affect movement direction — the seam grip position is all that matters",
          ],
          correctIndex: 1,
          explanation: "For a right-handed pitcher, the index finger is on the first-base side and the middle finger is on the third-base side of the ball at release. More pressure on the index finger pushes the ball toward the arm side (runs toward first base / inside to right-handed hitters). More pressure on the middle finger pushes the ball toward the glove side (runs toward third base). The pitcher's ball is running incorrectly toward the third-base side, indicating middle-finger dominance. Shifting emphasis to the index finger corrects the run to the intended arm-side direction.",
        },
      ],
    },
  },

  // ─── baseball-5-03: The Delivery: Wind-Up Mechanics ─────────────────────────
  {
    epochId: "baseball-5",
    wonder: {
      name: "Dodger Stadium — The Mound, 1963",
      location: "Los Angeles, California",
      era: "Historic",
      emoji: "🏟️",
    },
    id: "baseball-5-03",
    order: 3,
    title: "The Delivery: Wind-Up Mechanics",
    subtitle: "Leg lift, hip load, stride direction, landing foot, arm slot",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-5-badge-03", name: "Wind-Up", emoji: "🌀" },
    challengeType: "quiz",
    info: {
      tagline: "Clayton Kershaw's windup has been called the most mechanically sound delivery in modern baseball — every position at every phase is a clinic in efficiency.",
      year: 1963,
      overview: [
        "The windup is a sequence of linked mechanical events where each phase positions the pitcher for maximum force generation in the next. From the initial stance on the rubber through the rocker step, leg lift, hip load, stride, arm action, and release, the delivery is a kinetic chain: if any link breaks down, the chain loses force and accuracy. Understanding the windup as a sequence — rather than a single fluid motion — gives coaches and pitchers the ability to diagnose and fix mechanical problems.",
        "The leg lift is the most visible element of the windup and the most varied across pitchers. Clayton Kershaw raises his front knee to nearly hip height in a controlled, repeatable motion that fully loads his pivot leg before driving forward. Some pitchers use a minimal leg lift; others, like Jon Lester, use a dramatic kick. The consistent factor among effective leg lifts is balance — whatever height the leg reaches, the pitcher's weight is fully on the pivot foot before the forward drive begins.",
        "Stride direction and landing foot position are critical for command. The ideal stride is directed slightly toward the first-base side (for a right-hander) — allowing the hips to clear fully through the delivery. A stride that goes directly toward the plate, or worse, toward the third-base side, closes the hips and blocks full rotation. Landing on the heel (rather than the ball of the foot) sends a jarring shock through the delivery chain. Landing too closed (stride foot pointed toward third base) prevents hip completion.",
      ],
      technical: {
        title: "Kershaw's Delivery — Phase by Phase",
        body: [
          "Clayton Kershaw's windup is studied in pitching clinics worldwide because it represents near-perfect mechanical efficiency at every phase. His pivot foot contacts the rubber on the first-base side, creating a natural stride angle toward the plate-plus-first-base-side target. His rocker step is minimal — just enough to shift weight — and his hands come together cleanly at his chest. His leg lift reaches mid-thigh height consistently on every pitch, giving him a reliable balance point without the timing risk of a high kick.",
          "At the balance point, Kershaw's hips remain closed (facing third base, not home plate) while his front leg reaches maximum height. His arms separate from the glove in a smooth, curved arc — not a violent or rushed action. His stride is aggressive but controlled: directed slightly toward the first-base side, landing on the ball of the foot rather than the heel, with the stride foot slightly closed. From this landing position, his hips explode open, his torso rotates, and his arm comes through over the top at maximum extension.",
        ],
        codeExample: {
          label: "Windup Phases — Checklist",
          code: `  PHASE 1: INITIAL STANCE
  ✓ Pivot foot on rubber (first-base side RHP)
  ✓ Stance relaxed, hands at chest
  ✓ Weight centered or slightly back

  PHASE 2: ROCKER STEP
  ✓ Small step back with stride foot
  ✓ Weight loads onto pivot foot
  ✓ Hands begin to meet at chest

  PHASE 3: LEG LIFT / BALANCE POINT
  ✓ Stride knee lifts to hip height (Kershaw)
  ✓ Pivot leg stable — do not drift forward
  ✓ Hips closed (face third base, not plate)
  ✓ Hands together at chest

  PHASE 4: STRIDE
  ✓ Drive off rubber with pivot foot
  ✓ Stride directed slightly to first-base side
  ✓ Land on ball of foot — NOT heel
  ✓ Stride foot slightly closed (not open)

  PHASE 5: RELEASE (see Stage 5)
  → Arm slot, wrist snap, follow-through`,
        },
      },
      incident: {
        title: "Clayton Kershaw's Perfect Game — June 18, 2014",
        when: "June 18, 2014 — Dodgers vs. Colorado Rockies",
        where: "Dodger Stadium, Los Angeles, California",
        impact: "Clayton Kershaw's perfect game against the Colorado Rockies was a masterclass in delivery mechanics under pressure. For nine innings, every phase of his windup executed identically — the consistency of his mechanical pattern was the reason not a single Rockies hitter reached base.",
        body: [
          "On June 18, 2014, Clayton Kershaw retired all 27 Rockies batters he faced in a 8-0 Dodgers win — the first perfect game in Dodger Stadium history. Kershaw struck out 15 batters. What made the performance remarkable from a mechanical perspective was the consistency of his delivery: the same leg lift height, the same stride length, the same arm slot, the same hip rotation timing on every single pitch across 107 throws.",
          "Pitching coaches who studied the broadcast footage noted that Kershaw's balance point — the moment of maximum leg lift — was nearly frame-identical on every delivery, whether he was throwing a 93-mph fastball or an 11:00 curveball. This mechanical consistency is why he commanded both pitches to the same spots all night. When mechanics are that repeatable, the pitcher essentially removes himself as a variable — the only thing the hitter has to figure out is pitch type and location, and Kershaw gave them no clues.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Rocker Step", sub: "weight loads to pivot leg", type: "system" },
          { label: "Balance Point", sub: "hips closed, pivot leg stable", type: "attacker" },
          { label: "Stride + Drive", sub: "aggressive but directed", type: "victim" },
          { label: "Hip Explosion", sub: "hips fire open, chain releases", type: "result" },
        ],
      },
      timeline: [
        { year: 1950, event: "Warren Spahn's high leg kick sets template for modern windup mechanics" },
        { year: 1963, event: "Sandy Koufax goes 25-5 — Dodger Stadium windup delivers first dynasty", highlight: true },
        { year: 1988, event: "Orel Hershiser's delivery dissected by coaches — repeatability cited as key to consistency" },
        { year: 2014, event: "Clayton Kershaw throws perfect game — delivery mechanics studied nationwide", highlight: true },
        { year: 2017, event: "Kershaw wins third Cy Young — most mechanically efficient modern delivery recognized" },
        { year: 2023, event: "Biomechanics labs at MLB academies use motion capture to quantify stride angle and hip timing" },
      ],
      keyTakeaways: [
        "The windup is a kinetic chain — each phase (rocker step, balance point, stride, hip explosion) must set up the next",
        "Keep hips closed (facing third base for RHP) through the balance point — premature hip opening kills velocity",
        "The stride should angle slightly toward the first-base side (RHP) — enabling full hip clearance at release",
        "Land on the ball of the foot, not the heel — heel landing sends disruptive shock through the delivery chain",
      ],
      references: [
        { title: "Baseball Reference: Clayton Kershaw Perfect Game", url: "https://www.baseball-reference.com" },
        { title: "Dodgers: Kershaw Pitching Mechanics", url: "https://www.mlb.com/dodgers" },
        { title: "ASMI: Pitching Biomechanics Research", url: "https://www.asmi.org" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-5-03-q1",
          type: "Hip Rotation Timing",
          challenge: `  A pitcher opens their hips toward home
  plate during the leg lift — before they
  have started their stride. Their fastball
  is consistently 5–7 mph slower than
  expected for their size.

  What is the mechanical cause?`,
          text: "Why does opening the hips too early during the leg lift reduce pitching velocity?",
          options: [
            "Early hip opening is fine — it allows more time for the arm to come through",
            "Opening the hips during the leg lift releases the stored rotational energy before it can be transferred to the arm, collapsing the kinetic chain",
            "Hip timing only affects breaking ball movement, not fastball velocity",
            "Early hip opening causes the stride to be too long — stride length determines velocity loss",
          ],
          correctIndex: 1,
          explanation: "The kinetic chain in pitching depends on the hips being loaded (closed, facing third base for a right-hander) through the balance point. When the pitcher drives forward into the stride, the hips uncoil explosively — this rotation is the main engine of velocity. If the hips open early (during the leg lift), the rotational energy is dissipated before the stride even begins. By the time the arm comes through, there is no hip power left to transfer. It is analogous to releasing a coiled spring before it can do work. This is one of the most common mechanical flaws in youth pitchers.",
        },
        {
          id: "baseball-5-03-q2",
          type: "Stride Direction",
          challenge: `  A pitcher consistently lands with their stride
  foot crossing to the third-base side of an
  imaginary line drawn from the rubber to home.
  Their pitches tail away from every hitter
  and they walk batters outside the zone.

  What does this closed stride cause?`,
          text: "What mechanical problems arise from a closed stride (landing across the body)?",
          options: [
            "A closed stride increases velocity because the body generates more torque",
            "A closed stride blocks the hips from completing their rotation — the pitcher has to throw around their own body, causing the ball to tail inconsistently and reducing command",
            "Stride direction only affects pick-off moves, not delivery to home plate",
            "The problem is the arm slot, not stride direction",
          ],
          correctIndex: 1,
          explanation: "When the stride foot lands on the wrong side of the center line (for a right-hander, toward third base rather than slightly toward first base), the lead leg acts as a physical block to hip rotation. The hips cannot complete their turn because the stride foot's placement prevents clearance. To compensate, the pitcher throws with the arm only — the torso has to work around the blocking leg — producing inconsistent arm paths, reduced velocity, and poor command. The stride foot acts like a gate: where it lands determines whether the hips can open fully.",
        },
        {
          id: "baseball-5-03-q3",
          type: "Balance Point",
          challenge: `  Two pitchers: Pitcher A's leg lift takes
  0.8 seconds to reach its peak; Pitcher B's
  takes 0.4 seconds and rushes immediately
  into the stride.

  Both throw the same velocity in isolation,
  but Pitcher B allows significantly more
  stolen bases.

  What else does Pitcher B's rushing cause?`,
          text: "Beyond stolen base risk, what mechanical effect does rushing through the balance point have on pitch consistency?",
          options: [
            "Rushing actually helps pitchers — it catches hitters off-guard with unpredictable timing",
            "Rushing through the balance point creates inconsistent weight loading — the stride begins before the pivot leg is fully loaded, leading to variable release points and command problems",
            "Rushing only affects pickoff effectiveness — command and release point are not impacted",
            "Faster balance points always increase velocity — the trade-off is acceptable",
          ],
          correctIndex: 1,
          explanation: "The balance point is where the pivot leg reaches maximum load before driving forward. If the pitcher rushes through it — stride begins before the leg lift peaks — the pivot leg isn't fully loaded, and the weight transfer is different on every pitch depending on exactly how early the rush happened. This creates variable release points (the arm arrives at different heights and positions), which produces command inconsistency even if the arm action itself is technically correct. Kershaw's legendary consistency comes from having essentially the identical balance-point load on every single pitch.",
        },
        {
          id: "baseball-5-03-q4",
          type: "Landing Mechanics",
          challenge: `  A pitcher consistently lands on their heel
  with each stride. Their elbow has been
  sore after outings even though their
  pitch count is within limits.

  How might heel landing contribute to
  arm soreness?`,
          text: "How does landing on the heel rather than the ball of the foot increase arm stress?",
          options: [
            "Heel landing increases velocity, which puts more stress on the arm from throwing harder",
            "Heel landing sends a sharp deceleration force up the leg into the torso at the moment the stride foot contacts the ground, disrupting the kinetic chain and transferring extra stress to the arm",
            "Landing mechanics have no effect on arm health — arm stress comes entirely from grip and arm action",
            "Heel landing causes pitchers to throw fewer pitches per outing, which is the real cause",
          ],
          correctIndex: 1,
          explanation: "When the stride foot lands heel-first, it creates a jarring deceleration — like stepping off a curb. This impact shock travels up the leg and through the body at exactly the moment the kinetic chain needs to flow smoothly from lower body to upper body. The disruption in the chain means the arm must compensate for lost momentum — it works harder than it would in a smooth chain transfer. Over time, the arm (specifically the shoulder and elbow) absorbs excess force that should have been generated and dissipated through the lower body. Ball-of-foot landing allows a softer, absorptive contact that preserves the chain.",
        },
      ],
    },
  },

  // ─── baseball-5-04: The Delivery: Arm Action ────────────────────────────────
  {
    epochId: "baseball-5",
    wonder: {
      name: "Baseball Hall of Fame",
      location: "Cooperstown, New York",
      era: "Historic",
      emoji: "🏛️",
    },
    id: "baseball-5-04",
    order: 4,
    title: "The Delivery: Arm Action",
    subtitle: "Arm path, external rotation, elbow height, wrist snap, follow-through",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-5-badge-04", name: "Arm Action", emoji: "💪" },
    challengeType: "quiz",
    info: {
      tagline: "The arm is the last link in the kinetic chain — but it is the most fragile, and the most misunderstood.",
      year: 2001,
      overview: [
        "Arm action describes the path the throwing arm travels from the moment hands separate at the chest until the ball is released and the arm completes its follow-through. Unlike hitting — where the swing has a more universal correct form — pitching arm action varies significantly across successful pitchers. Sandy Koufax threw straight over the top; Pedro Martinez threw from a three-quarter slot; Randy Johnson fired from a nearly sidearm position. Each arm slot produces a different visual plane for hitters and different movement profiles on pitches.",
        "External rotation — called 'laying back' — is the critical and most misunderstood phase of arm action. As the stride foot lands and the hips begin to open, the throwing arm naturally rotates backward (externally) so the ball is behind the head and the elbow is at or above shoulder height. This is not the pitcher throwing the ball backward — it is physics. The violent hip and torso rotation pulls the arm back through external rotation before it snaps forward. Pitchers who try to prevent this natural layback actually increase arm stress.",
        "Elbow height at the release point varies by arm slot, but a universal guideline is that the elbow should be at or above shoulder height at release. Sub-elbow release points place the ulnar collateral ligament in a compromised position — this is the ligament damaged in the Tommy John surgery epidemic that has affected hundreds of MLB pitchers. Little League arm care guidelines specifically warn against dropping the elbow below shoulder height, especially during high-effort throws.",
      ],
      technical: {
        title: "The Throwing Arc — From Arm Path to Follow-Through",
        body: [
          "As the pitcher's hands separate at the chest, the ball hand moves downward and back in a smooth arc — often described as 'thumbs to thighs' — before swinging upward into the cocking position. This arc should be smooth and continuous; a pitcher who pokes the ball out to the side in an abrupt break creates timing inconsistencies that affect release point. The throwing elbow should work toward the pitcher's ear as the arm reaches the cocking position, not be pulled away from the body.",
          "The follow-through is as important as the release. After the ball is released, the arm must decelerate — and it does so over a large arc from the high release point, sweeping down and across the body. Cutting off the follow-through forces the muscles and connective tissue to absorb the arm's deceleration rapidly, increasing injury risk. A proper follow-through ends with the throwing hand near the pitcher's opposite hip or thigh.",
        ],
        codeExample: {
          label: "Arm Action Checkpoints",
          code: `  ARM SEPARATION (hands break at chest):
  ✓ Ball hand moves DOWN and BACK (thumbs down)
  ✓ Glove extends toward target
  ✓ Smooth, curved arc — not a poke or jab

  COCKING PHASE (external rotation):
  ✓ Elbow at or above shoulder height
  ✓ Ball behind head naturally (layback)
  ✓ This is PASSIVE — let physics pull it back
  ✗ Do NOT force the ball further back
  ✗ Do NOT prevent natural layback

  ACCELERATION (hip → shoulder → elbow → wrist):
  ✓ Hips fire first — arm follows
  ✓ Elbow leads the forearm into release
  ✓ Wrist snap fires at last possible moment
  ✓ Full extension through release point

  FOLLOW-THROUGH (deceleration):
  ✓ Arm sweeps down and across body
  ✓ Throwing hand finishes near opposite hip
  ✗ Do NOT cut off follow-through early
  ✗ Early stop = muscles absorb deceleration
     → injury risk increases significantly`,
        },
      },
      incident: {
        title: "Tommy John Surgery Epidemic — A Generation of Pitchers",
        when: "2001–2020 — Tommy John surge in youth and professional baseball",
        where: "Baseball Hall of Fame, Cooperstown — and mounds nationwide",
        impact: "The Tommy John surgery (ulnar collateral ligament reconstruction) epidemic that peaked in the 2000s and 2010s changed how youth baseball teaches arm action. The American Sports Medicine Institute, founded in Birmingham, Alabama, published research showing that specific arm action errors — including elbow drop and year-round throwing — were directly correlated with UCL damage.",
        body: [
          "Tommy John, a Dodgers pitcher who had his UCL reconstructed by Dr. Frank Jobe in 1974 in a then-experimental surgery, became the namesake of a procedure that has now been performed on thousands of pitchers. By 2014, one in seven MLB pitchers on opening day rosters had undergone Tommy John surgery. The cause was not simply velocity — it was a combination of year-round specialization starting at younger ages, poor arm action mechanics (particularly elbow drop), and lack of adequate rest periods.",
          "The American Sports Medicine Institute's Dr. James Andrews became the most prominent voice calling for youth pitch count limits and mechanics reform. Their research specifically identified elbow dropping below shoulder height at release as a significant risk factor. The Little League organization responded by implementing pitch count rules (see Stage 8) and distributing arm care guidelines to coaches nationwide. The Dodgers' development system now includes mandatory arm action screening at every level of their minor league pipeline.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Arm Separation", sub: "thumbs down, smooth arc", type: "system" },
          { label: "External Rotation", sub: "layback — passive, not forced", type: "attacker" },
          { label: "Acceleration Arc", sub: "elbow leads, wrist snaps last", type: "victim" },
          { label: "Follow-Through", sub: "full deceleration arc — no cutting off", type: "result" },
        ],
      },
      timeline: [
        { year: 1974, event: "Tommy John has first UCL reconstruction by Dr. Frank Jobe of the Dodgers", highlight: true },
        { year: 1988, event: "UCL reconstruction becomes standard procedure — pitchers regularly return to pitch" },
        { year: 2001, event: "ASMI begins publishing research connecting arm action mechanics to UCL injury rates" },
        { year: 2007, event: "Little League creates pitching guidelines recommending arm care protocols" },
        { year: 2015, event: "MLB PitchSmart program launches — standardized arm care guidelines for all ages" },
        { year: 2020, event: "Dodgers win World Series with Kershaw as postseason anchor — zero Tommy John in career", highlight: true },
      ],
      keyTakeaways: [
        "External rotation (layback) is a natural physics event — trying to prevent it increases arm stress, not decreases it",
        "Elbow at or above shoulder height at release is the most important arm action safety guideline",
        "The follow-through must be complete — cutting off the arm's deceleration arc forces muscles to absorb excess force",
        "The kinetic chain sequence is hips, torso, shoulder, elbow, wrist — if hips don't fire first, the arm carries the load alone",
      ],
      references: [
        { title: "ASMI: UCL Injury Research and Prevention", url: "https://www.asmi.org" },
        { title: "MLB PitchSmart: Arm Care Guidelines", url: "https://www.mlb.com/pitchsmart" },
        { title: "Dodgers: Tommy John Surgery History", url: "https://www.mlb.com/dodgers" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-5-04-q1",
          type: "External Rotation",
          challenge: `  A young pitcher is told they "lay the ball
  back too far" and tries to stop their arm
  from rotating backward during delivery.
  After two weeks, their elbow hurts.

  Was this coaching advice correct?`,
          text: "Why is external rotation (laying the ball back) a natural part of arm action that should not be prevented?",
          options: [
            "Yes — excessive layback is a documented cause of elbow injuries and should be reduced",
            "No — external rotation is caused by physics as the hips rotate; trying to stop it forces the muscles to resist their own natural mechanics, increasing stress dramatically",
            "Yes — pitchers should limit external rotation to 90 degrees to protect the shoulder",
            "No — but the problem is the follow-through, not the layback itself",
          ],
          correctIndex: 1,
          explanation: "External rotation during pitching is not a voluntary act — it is caused by the violent hip and torso rotation that whips the arm backward passively as the lower body fires forward. The arm lays back because physics demands it: the torso is rotating one way, and the arm is momentarily left behind. Trying to resist this motion by tensing the shoulder and elbow muscles forces them to fight the very forces that are driving the delivery. This muscular conflict dramatically increases stress on the UCL and rotator cuff. The correct cue is to let the arm lay back naturally and focus on a full, accelerating follow-through.",
        },
        {
          id: "baseball-5-04-q2",
          type: "Elbow Height",
          challenge: `  A coach watches a 13-year-old pitcher
  drop their elbow below shoulder height
  on every fastball. The pitcher says it
  "feels natural" and their velocity is fine.

  Should the coach correct this, and why?`,
          text: "Why is elbow drop below shoulder height a priority correction even if the pitcher feels comfortable and throws with good velocity?",
          options: [
            "No — if velocity is fine and the pitcher is comfortable, mechanics adjustments risk making things worse",
            "Yes — elbow drop places the UCL (ulnar collateral ligament) in a high-stress position on every throw, accumulating damage that may not produce pain until significant injury has occurred",
            "Yes — but only if the pitcher also has command problems; elbow drop alone is not dangerous",
            "No — elbow height is only a concern for adult pitchers, not youth",
          ],
          correctIndex: 1,
          explanation: "Elbow drop is one of the most well-documented risk factors for UCL injuries. ASMI research shows that when the elbow drops below shoulder height, the forearm creates a lever that places maximum stress on the UCL at exactly the moment of peak acceleration. Pitchers often don't feel pain until the ligament has already frayed significantly — by the time it hurts, damage is done. A 13-year-old who 'feels fine' with elbow drop is accumulating stress on a growth plate and ligament that are not yet fully developed. The correction now prevents Tommy John surgery at 17.",
        },
        {
          id: "baseball-5-04-q3",
          type: "Follow-Through",
          challenge: `  A pitcher consistently stops their arm at
  shoulder height after release — they
  don't complete the sweeping follow-through.
  They think it looks "cleaner."

  What is the physical risk of cutting off
  the follow-through?`,
          text: "Why must the throwing arm complete a full follow-through arc after releasing the ball?",
          options: [
            "Follow-through only affects pitch movement — cutting it off has no injury implications",
            "The arm is moving at extremely high velocity at release; without a full deceleration arc, the muscles and tendons must absorb the stopping force suddenly, increasing rotator cuff and elbow injury risk",
            "Cutting off the follow-through increases pitch accuracy — coaches should teach shorter follow-throughs",
            "Follow-through matters only for curveballs and breaking pitches, not fastballs",
          ],
          correctIndex: 1,
          explanation: "At release, the throwing arm is moving at roughly 7,000–8,000 degrees per second of internal rotation — one of the fastest human body movements in sports. That velocity must decelerate. The follow-through arc is the deceleration path: muscles and connective tissue gradually absorb the arm's momentum over 18–24 inches of motion. If the follow-through is cut off at shoulder height, the same deceleration must happen in 6 inches — requiring three to four times the muscular force to stop the arm. The rotator cuff, specifically the infraspinatus and teres minor, bear the brunt of this deceleration; cutting off follow-through overloads them every throw.",
        },
        {
          id: "baseball-5-04-q4",
          type: "Kinetic Chain",
          challenge: `  A pitcher throws with excellent arm action
  but their coach says their fastball
  "comes entirely from the arm" — hips
  are not rotating before the arm fires.

  What will this pitcher experience over
  a full season?`,
          text: "What are the long-term consequences of an arm-dominant delivery where the lower body does not drive the kinetic chain?",
          options: [
            "Increased velocity — arm-dominant pitchers are typically faster because the arm drives directly",
            "Arm fatigue and increased injury risk — the arm is absorbing forces that should be generated and distributed through the lower body",
            "Improved command — arm-only deliveries are more consistent because there are fewer moving parts",
            "No meaningful difference — arm action and hip action contribute roughly equally to velocity",
          ],
          correctIndex: 1,
          explanation: "The lower body is supposed to generate the majority of pitching velocity through hip rotation, leg drive, and core engagement — the arm is the final link that delivers the energy, not the primary generator. When a pitcher throws arm-dominant, the arm must produce all the energy alone — working at its physiological limit on every pitch rather than sharing the load with the hip and core. Over a season of 1,000+ throws, this overloads the rotator cuff and elbow structures. MLB data shows that arm-dominant pitchers have significantly shorter careers and higher Tommy John surgery rates than pitchers with efficient lower-body mechanics.",
        },
      ],
    },
  },

  // ─── baseball-5-05: Release Point and Command ────────────────────────────────
  {
    epochId: "baseball-5",
    wonder: {
      name: "Dodger Stadium — The Black of the Plate",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "🎯",
    },
    id: "baseball-5-05",
    order: 5,
    title: "Release Point and Command",
    subtitle: "Consistency, location, how Kershaw paints the black",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-5-badge-05", name: "Painter", emoji: "🖌️" },
    challengeType: "quiz",
    info: {
      tagline: "Release point is the signature of every great pitcher — change it by an inch and you change where the ball goes by a foot.",
      year: 2017,
      overview: [
        "The release point is the precise three-dimensional location in space where the pitcher's fingers leave the baseball. It is not a single point per pitch — it is an ideal point that the pitcher works to reproduce on every delivery. When the release point is consistent, pitches land where the pitcher intends. When the release point moves even slightly — earlier, later, higher, lower — pitches miss their intended location proportionally, often by several inches at the plate.",
        "Command is the ability to locate pitches precisely within the strike zone, especially on the corners and at the edges. The 'black' — the dark border of home plate used as a reference by experienced pitchers — is the target for command artists. A pitcher who can consistently throw to the inner black versus the outer black versus the low black is effectively throwing to three different zones, each with different swing outcomes for the hitter. Clayton Kershaw's career has been defined by his ability to locate pitches to the black with exceptional consistency.",
        "The relationship between release point and location is geometric: the pitcher is essentially throwing from a fixed point (the mound) to a target sixty feet away. A small angular change at the release point creates a large positional change at the plate. Moving the release point two inches higher produces a pitch that travels several inches above the intended target. This is why pitching mechanics coaches spend enormous effort on release point consistency — small changes at the source create big misses at the destination.",
      ],
      technical: {
        title: "How Release Point Adjustments Change Pitch Location",
        body: [
          "Every pitch has a natural 'shape' determined by its grip and spin. Fastballs rise (relatively), curveballs drop, sliders cut laterally. But the starting location of that shape — where it begins its path to the plate — is entirely determined by the release point. If a pitcher moves their release point one inch to the right (toward the first-base side for a right-hander), the pitch travels a path that is approximately four inches to the right at home plate. This geometric relationship is why command coaches teach pitchers to think of themselves as precision instruments: small adjustments, large results.",
          "The concept of 'working the release point' — intentionally adjusting the release point to move pitches — is an advanced technique used primarily by experienced pitchers. By releasing a fastball slightly earlier in the arc, a pitcher can create a two-seamer that runs more aggressively; releasing slightly later creates a cut fastball. Kershaw's ability to move his curveball from the back-foot of a right-handed hitter to the front knee simply by adjusting his release point by an inch is what makes him elite.",
        ],
        codeExample: {
          label: "Release Point Variables and Pitch Location Effect",
          code: `  RELEASE POINT VARIABLES:
  1. HEIGHT (vertical position)
     → 1 inch higher = ball arrives ~4 inches higher
     → 1 inch lower = ball arrives ~4 inches lower
     → Higher slot: easier to command up/down
     → Lower slot: natural horizontal movement

  2. HORIZONTAL POSITION (side)
     → 1 inch arm-side = ball arrives ~4 inches arm-side
     → 1 inch glove-side = ~4 inches glove-side

  3. TIMING (early vs. late in arc)
     → Early release = ball arrives higher, short-arm'd
     → Late release = ball arrives lower, adds sink
     → Consistent timing = consistent height

  KERSHAW'S "BLACK" COMMAND:
  Inner black (RHH): Early in arc, slight arm-side
  Outer black (RHH): Later in arc, glove-side
  Low black:         Slightly lower slot at release
  → Each location requires different RP micro-adjust
  → 10,000+ reps per location to make it automatic`,
        },
      },
      incident: {
        title: "Clayton Kershaw — 2017 Cy Young Season",
        when: "2017 — Kershaw wins his third NL Cy Young Award",
        where: "Dodger Stadium, Los Angeles, California",
        impact: "In 2017, Clayton Kershaw went 18-4 with a 2.31 ERA and won his fourth Cy Young Award, finishing among the top ERA leaders in baseball for the fifth consecutive season. Advanced metrics showed his release point deviation — the average distance his release point varied from his ideal — was the smallest of any starting pitcher in baseball, a statistical signature of his legendary command.",
        body: [
          "Statcast data for the 2017 season showed Kershaw's release point deviation averaging less than two centimeters across all pitch types — an almost impossibly small variance that represented the mechanical consistency his pitching coaches had built over his career. For context, most MLB starting pitchers show release point deviations of four to six centimeters. Kershaw's deviation was literally half the league average, and the result was pitch command rated in the top one percent of all MLB starters.",
          "The Dodger Stadium crowd became accustomed to a particular sight in Kershaw starts: his curveball, beginning at a right-handed hitter's thigh level and breaking sharply to the outside corner knee, or his fastball starting at the batter's hands and finishing on the inner black. Both pitches started from the same release point — the same arm slot, the same wrist position — and broke in different directions from that shared origin. Hitters who knew a curveball was coming still couldn't hit it because they couldn't distinguish it from the fastball at the tunnel.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Release Point", sub: "3D position in space", type: "system" },
          { label: "Geometric Projection", sub: "small RP change = large plate miss", type: "attacker" },
          { label: "Pitch Shape Overlaid", sub: "spin bends path from release", type: "victim" },
          { label: "Target Location", sub: "inner black, outer black, low", type: "result" },
        ],
      },
      timeline: [
        { year: 1965, event: "Sandy Koufax throws perfect game — release point consistency cited in analysis" },
        { year: 1985, event: "Pitching coaches begin using video to analyze release point frame-by-frame" },
        { year: 2000, event: "Greg Maddux retires — four Cy Young Awards built on release-point command, not velocity" },
        { year: 2015, event: "Statcast begins measuring release point coordinates for every MLB pitch", highlight: true },
        { year: 2017, event: "Kershaw's release point deviation measured at sub-2cm — smallest in MLB", highlight: true },
        { year: 2024, event: "Yamamoto and Kershaw co-lead Dodger staff — command-first pitching philosophy dominant" },
      ],
      keyTakeaways: [
        "Release point is the three-dimensional origin of every pitch — small changes there create large misses at the plate",
        "A one-inch release point change corresponds to approximately four inches of location change at home plate",
        "Command to the 'black' — the corners and edges of home plate — requires release point consistency measured in millimeters",
        "Consistent mechanics (balance point, stride, arm slot) are the only path to a consistent release point",
      ],
      references: [
        { title: "Baseball Savant: Kershaw Release Point Data", url: "https://baseballsavant.mlb.com" },
        { title: "Dodgers: Kershaw Pitching Library", url: "https://www.mlb.com/dodgers" },
        { title: "Fangraphs: Command and Location Metrics", url: "https://www.fangraphs.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-5-05-q1",
          type: "Release Point Geometry",
          challenge: `  A pitcher is hitting the outside corner
  perfectly in warmups. In the game, the
  same mechanics but every pitch is six
  inches inside instead.

  The pitching coach says "your release
  point moved." How is this possible?`,
          text: "How does a small change in release point during game conditions produce a large miss at home plate?",
          options: [
            "Release point changes cannot be the cause — the pitcher is using the same mechanics",
            "Because of the geometry of the distance from mound to plate, a release point shift of 1–2 inches causes approximately 4–8 inches of location change at home plate",
            "The miss is caused by grip change, not release point — the two are independent",
            "Release point only affects vertical location — horizontal misses must have a different cause",
          ],
          correctIndex: 1,
          explanation: "The relationship between release point and pitch location is geometric: the pitcher throws from a point sixty feet from the target. Any angular change at the source (release point) amplifies over the full distance. A release point that moves two inches toward the arm side shifts the pitch approximately eight inches toward the arm side at home plate. Game conditions — adrenaline, different timing from the windup vs. warmups, first-inning velocity — commonly cause small release point shifts that produce large location misses. This is why elite pitchers film every start and track release point data obsessively.",
        },
        {
          id: "baseball-5-05-q2",
          type: "Command to the Black",
          challenge: `  A pitcher can throw strikes consistently
  down the middle but can't locate on the
  corners. Their coach says: "You need
  10,000 more throws to specific spots
  before command becomes automatic."

  Why can't a pitcher just 'aim' at the corner?`,
          text: "Why does command to specific locations require thousands of repetitions rather than simply conscious aiming?",
          options: [
            "Command is purely physical — no amount of repetition improves it; some pitchers simply have natural command",
            "Conscious aiming actually degrades performance under game pressure — command must become implicit motor memory through repetition so it executes without conscious interference",
            "Aim works fine for slow-velocity pitchers; high-velocity throws cannot be aimed accurately",
            "The problem is mental, not mechanical — better concentration while aiming is the solution",
          ],
          correctIndex: 1,
          explanation: "Pitching occurs too fast for conscious motor control — from the windup to release takes under 2 seconds, and the arm's final release motion happens in under 100 milliseconds. No human can consciously 'aim' at millimeter-level precision in 100ms. Command is built through repetition that encodes the motor pattern in procedural memory — the same brain system used for typing, driving, or playing an instrument. When that motor program is well-established, the pitcher sets their intention (outer black) and the body executes the encoded pattern. Interrupting this with conscious aiming actually disrupts the motor program. Command is practice, not concentration.",
        },
        {
          id: "baseball-5-05-q3",
          type: "Release Point Consistency",
          challenge: `  Kershaw's average release point deviation
  is measured at 1.8 cm across a season.
  The league average is 4.2 cm.

  Kershaw's ERA is 2.31. The league average
  starter ERA is 4.10.

  What does this correlation suggest?`,
          text: "What is the relationship between release point consistency and ERA in starting pitchers?",
          options: [
            "The correlation is coincidental — ERA is primarily determined by pitch velocity, not release point consistency",
            "Release point consistency is a strong predictor of command quality, which directly reduces opponent batting averages and walk rates — the primary drivers of ERA",
            "ERA is determined by run support, not pitching quality — Kershaw's ERA reflects his team",
            "The correlation only holds for power pitchers — finesse pitchers like Kershaw are outliers",
          ],
          correctIndex: 1,
          explanation: "Release point consistency is the physical precondition for command, and command is the primary determinant of pitching effectiveness for starters. A pitcher with consistent release points throws to their intended location more often — fewer walks (which directly increase ERA), fewer hittable pitches in the middle of the zone (which directly increase batting average), and more called strikes at the edges (which increase strikeout rate). Kershaw's sub-2cm deviation is not coincidentally correlated with his career 2.48 ERA — it is causally related. The release point is where command is born.",
        },
        {
          id: "baseball-5-05-q4",
          type: "Moving the Release Point",
          challenge: `  A pitcher wants to make their two-seam
  fastball run more toward right-handed
  hitters' feet (down and in). Their coach
  says: "Release it slightly later in your arc."

  How does releasing later cause downward movement?`,
          text: "How does timing the release point (earlier vs. later in the delivery arc) affect pitch height at home plate?",
          options: [
            "Release timing has no effect on height — only the arm slot determines vertical pitch location",
            "Releasing later in the arc means the ball leaves the hand at a lower point in the delivery and at a slightly different angle — pitches released later in the arc naturally arrive lower at the plate",
            "Releasing later increases velocity, which causes the ball to drop more due to gravity",
            "Later release creates more spin, which causes the two-seam fastball to sink more",
          ],
          correctIndex: 1,
          explanation: "As the pitching arm sweeps through its delivery arc, the hand travels from high (above the head) to low (beside the hip). Releasing 'later' in this arc means the ball leaves the hand at a slightly lower point — the arm has already begun its downward sweep. Since the release point is lower and the angular direction has shifted slightly downward, the ball travels a slightly lower path toward the plate. For a two-seam fastball that already has natural sink from its spin, releasing slightly later in the arc doubles the downward path, producing a pitch that arrives several inches lower — toward the batter's knees, where ground balls are generated.",
        },
      ],
    },
  },

  // ─── baseball-5-06: The Stretch and Holding Runners ─────────────────────────
  {
    epochId: "baseball-5",
    wonder: {
      name: "Dodger Stadium — First Base Line",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "🏃",
    },
    id: "baseball-5-06",
    order: 6,
    title: "The Stretch and Holding Runners",
    subtitle: "Slide step, pickoff moves, balks, and Dodger baserunner management",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-5-badge-06", name: "Pickoff Artist", emoji: "🔒" },
    challengeType: "quiz",
    info: {
      tagline: "A stolen base given away is no different from a walk — the best pitchers are as dangerous with the ball at their side as with it in their hand.",
      year: 2020,
      overview: [
        "With runners on base, the pitcher's job changes fundamentally. Holding runners — preventing stolen bases and limiting opportunities for base advancement — becomes as important as pitch quality. The stretch position is the primary tool: the compressed delivery reduces the catcher's throw time and limits the runner's jump. But the stretch alone is not always sufficient; elite pitchers also use pickoff moves, slide steps, and varied timing to keep runners honest.",
        "The pickoff move is a legal deceptive throw to a base to either catch a runner off base or force them to return, reducing their secondary lead. There are distinct rules governing pickoff moves to first base (the pitcher must step toward first before throwing), second base (multiple legal approaches), and third base (step directly toward third). An illegal pickoff move — or any number of other mechanical violations during the windup or stretch — is called a balk, advancing all runners one base.",
        "Dodger pitchers in the Dave Roberts era have been trained extensively in the mechanics of holding runners. The 2020 World Series Dodgers faced playoff opponents with fast baserunners, and pitchers like Clayton Kershaw, Walker Buehler, and Julio Urias made deliberate use of varied timing, slide steps, and first-move pickoffs to neutralize the running game. Understanding the interplay between delivery time, pickoff effectiveness, and pitch quality is a graduate-level skill that separates complete pitchers from one-dimensional throwers.",
      ],
      technical: {
        title: "Balk Rules — The Most Misunderstood Rule in Baseball",
        body: [
          "A balk is called when a pitcher makes an illegal motion during a delivery or pickoff attempt while runners are on base. The most common balks are: starting the windup and stopping (a pitcher who starts any movement toward the plate must complete the pitch), failure to come to a set stop in the stretch, stepping toward one base and throwing to another, dropping the ball on the rubber, pitching from in front of the rubber without having their foot on it, and making a fake throw to first base (which is illegal — throwing to first requires an actual step).",
          "The slide step is a modified delivery where the pitcher uses a very small leg lift — essentially sliding the stride foot into the stride rather than a full leg kick. This significantly reduces delivery time from approximately 1.4 seconds (full stretch) to under 1.2 seconds — often below the threshold needed for successful stolen base attempts. The tradeoff is slightly reduced velocity (typically 2–3 mph less) because the leg kick generates hip loading. Pitchers typically use the slide step only when necessary — with fast runners or in critical situations.",
        ],
        codeExample: {
          label: "Holding Runners — Strategy Guide",
          code: `  DELIVERY TIME BENCHMARKS:
  Full windup: ~1.5 sec (easy steal)
  Full stretch: ~1.35–1.40 sec (marginal)
  Slide step: ~1.10–1.20 sec (difficult steal)
  Catcher throw: ~2.0 sec (good arm)
  MLB steal window: < 3.1 sec total

  PICKOFF STRATEGIES (first base, RHP):
  → Move 1: Quick step-off (disengage rubber)
  → Move 2: Slow first-base throw (establish)
  → Move 3: QUICK pickoff (catch runner leaning)
  → Vary timing between pitches (don't be predictable)

  BALK TRIGGERS (all runners advance):
  ✗ Starting delivery, then stopping
  ✗ No complete stop in set position
  ✗ Stepping toward one base, throwing to another
  ✗ Fake throw to first base (illegal)
  ✗ Dropping ball on rubber with runners on
  ✗ Pitching without foot on rubber

  MENTAL APPROACH:
  → Don't let runner live rent-free in your head
  → Two looks maximum, then deliver
  → Mix timing: hold, quick, quick, hold, deliver`,
        },
      },
      incident: {
        title: "Dodgers Win the 2020 World Series — Kershaw Holds Rays Runners",
        when: "October 2020 — World Series vs. Tampa Bay Rays",
        where: "Globe Life Field, Arlington, Texas (neutral site)",
        impact: "The Tampa Bay Rays, one of the fastest teams in the American League in 2020, had their running game neutralized in the World Series by Dodger pitching. Clayton Kershaw specifically varied his delivery timing and used first-base pickoff throws to neutralize the Rays' speed, contributing to the Dodgers' first championship since 1988.",
        body: [
          "The 2020 World Series between the Dodgers and Tampa Bay Rays was a matchup of the National League's best offense against the American League's most analytically advanced team. The Rays' game plan included using speed to create pressure — their stolen base rate during the regular season was among the highest in baseball. The Dodgers' pitching staff countered with deliberate attention to delivery time and runner disruption.",
          "Kershaw, despite criticism of his postseason record in prior years, delivered in the 2020 series. His ability to vary timing — sometimes holding the set position for two seconds, sometimes delivering quickly after one look — kept Rays baserunners from getting comfortable reads on his delivery. His pickoff move to first base, while not his most feared weapon, was disciplined enough to prevent the Rays from taking liberties. The Dodgers won their first World Series since 1988, and the pitching staff's runner management was specifically noted by analysts as a contributing factor.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Runner on Base", sub: "steal threat identified", type: "attacker" },
          { label: "Slide Step or Set", sub: "reduce delivery time", type: "system" },
          { label: "Pickoff Look", sub: "vary timing, disrupt read", type: "victim" },
          { label: "Neutralize Running Game", sub: "catcher window restored", type: "result" },
        ],
      },
      timeline: [
        { year: 1898, event: "Balk rule first standardized in official baseball rules" },
        { year: 1950, event: "Jim Gilliam and Dodgers use aggressive baserunning — pitchers begin counter-strategies" },
        { year: 1962, event: "Maury Wills steals 104 bases for Dodgers — pitchers forced to develop holding mechanics", highlight: true },
        { year: 1988, event: "Dodgers win World Series — Orel Hershiser holds Oakland A's running game in check" },
        { year: 2013, event: "MLB begins tracking delivery time to plate — slide step quantified as sub-1.2 sec standard" },
        { year: 2020, event: "Dodgers win World Series — varied timing neutralizes Rays speed game", highlight: true },
      ],
      keyTakeaways: [
        "The slide step reduces delivery time to under 1.2 seconds — below the threshold for most successful stolen base attempts",
        "A balk advances all runners one base — the most common triggers are stopping mid-delivery and not fully stopping in the set position",
        "Varying timing (hold, quick, hold, vary) prevents runners from getting a clean read on the delivery",
        "Two looks maximum before delivering — spending too much attention on runners degrades pitch quality",
      ],
      references: [
        { title: "MLB Official Rules: Balk Rule 5.07", url: "https://www.mlb.com/official-information/umpires/rules" },
        { title: "Dodgers: 2020 World Series Pitching", url: "https://www.mlb.com/dodgers" },
        { title: "Baseball Reference: Maury Wills 1962 Stolen Base Record", url: "https://www.baseball-reference.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-5-06-q1",
          type: "Slide Step",
          challenge: `  A fast runner is on first base. The catcher
  tells the pitcher: "Use a slide step — our
  throw time is 2.0 seconds."

  The pitcher normally delivers in 1.38 sec
  with full stretch. A slide step would cut
  it to 1.12 sec.

  Why does this matter for stolen base defense?`,
          text: "How does reducing delivery time with a slide step affect the stolen base equation?",
          options: [
            "Delivery time has no impact on stolen base success — it is entirely the catcher's throw accuracy",
            "Total time from pitch release to catcher throw reaching second base must be under ~3.1 seconds for the runner to be out — slide step reduces the pitcher's portion, giving the catcher enough window to throw out the runner",
            "The slide step only helps against slow runners — fast runners will steal regardless of delivery time",
            "Reducing delivery time from 1.38 to 1.12 seconds is not meaningful — the difference is too small",
          ],
          correctIndex: 1,
          explanation: "A stolen base attempt is a race: total time from the pitcher's first motion to the catcher's throw arriving at second base versus the runner's time from first to second. An MLB runner in the lead takes about 3.2 seconds to steal second. With a catcher throwing in 2.0 seconds, the pitcher's delivery can be at most 1.1 seconds for the play to be close. Full stretch at 1.38 seconds + 2.0 catcher throw = 3.38 seconds total — easy steal. Slide step at 1.12 seconds + 2.0 = 3.12 seconds — a play. The 0.26-second difference is the entire margin between a free stolen base and a put-out.",
        },
        {
          id: "baseball-5-06-q2",
          type: "Balk Rules",
          challenge: `  A right-handed pitcher is in the stretch
  with a runner on first. He lifts his front
  leg as if delivering home, then stops
  and throws to first base.

  The umpire calls a balk. Why?`,
          text: "Why does starting a pitching motion and stopping constitute a balk, even if the pitcher subsequently throws to a base?",
          options: [
            "The balk should not be called — stopping and throwing to first is a legal pickoff move",
            "Once a pitcher begins any motion associated with the pitch to home plate, they must complete that delivery — stopping and redirecting to a base after the motion has begun is an illegal deceptive move",
            "The balk is only valid if the runner on first actually moved — if they stayed, the balk should be waived",
            "A balk is only called if the pitcher's foot leaves the rubber — a leg lift alone is not a balk trigger",
          ],
          correctIndex: 1,
          explanation: "The balk rule exists to prevent pitchers from deceiving baserunners with false motions. Once a pitcher begins the motion associated with a pitch to home plate — which includes the leg lift in the stretch — they are committed to completing that delivery. Stopping mid-delivery creates an illegal deception where runners have already begun reading the pitch and may be in motion. The rule is clear: start the motion, complete the motion. A pickoff to first must be made before any pitching motion begins, or the pitcher must step off the rubber first (legally disengaging) before making the throw.",
        },
        {
          id: "baseball-5-06-q3",
          type: "Varying Timing",
          challenge: `  A pitcher always looks at first base exactly
  once, holds for one second, then delivers.
  A fast runner steals second successfully
  on four consecutive attempts.

  What adjustment would disrupt the runner's
  timing without changing the actual delivery?`,
          text: "How does varying the timing between the set position and the pitch disrupt a baserunner's ability to get a good jump?",
          options: [
            "Vary the timing — sometimes hold 0.5 seconds before delivering, sometimes hold 2.5 seconds — so the runner cannot time the delivery from the pitcher's pattern",
            "Throw over to first every time until the runner stops stealing — extra pickoffs are the answer",
            "Use a different arm slot to confuse the hitter — this will also disrupt the runner",
            "Varying timing is illegal in baseball — the pitcher must deliver at a consistent pace",
          ],
          correctIndex: 0,
          explanation: "A runner's stolen base jump comes from reading the pitcher's timing pattern. If a pitcher always holds for exactly one second before delivering, the runner counts '1...go' and gets a perfect jump. When the pitcher varies hold time (0.5 seconds sometimes, 2.5 seconds other times, 1.0 seconds unpredictably), the runner cannot time the delivery. They must either stay on base waiting (reducing their lead advantage) or go early and risk a pickoff. Varying timing is completely legal and is one of the most effective tools a pitcher has against base stealers — it requires no mechanical change, only mental discipline.",
        },
        {
          id: "baseball-5-06-q4",
          type: "Fake Pickoff",
          challenge: `  A right-handed pitcher with a runner on
  first wants to freeze the runner. He steps
  toward first base and makes a fake throw
  — he doesn't actually release the ball.

  The umpire immediately calls a balk.

  Why is a fake throw to first base illegal?`,
          text: "Why is a fake throw to first base a balk, when fake throws to second and third are legal?",
          options: [
            "Fake throws to first are not balks — the umpire made an error",
            "A fake throw to first base is a balk because the rulebook specifically prohibits simulated throws to first; second and third base fakes are permitted because of the fielder positioning involved in double-play situations",
            "Fake throws are only legal from the full windup — any fake from the stretch is a balk",
            "All fake throws are balks — the umpire called it correctly but for the wrong reason",
          ],
          correctIndex: 1,
          explanation: "Rule 5.07(a)(1) specifically prohibits right-handed pitchers from making a fake throw to first base after stepping toward first. This asymmetric rule exists because the mechanics of stepping toward first base while still on the rubber create a deceptive move that could easily be disguised as a pickoff but serve as a distraction. Fake throws to second base are legal because they involve pivoting away from the batter (creating a natural disengagement), and fake throws to third base followed by pivoting to throw to first are also legal (the 3-to-1 fake). First base is different specifically because it is the most common base with runners, and the rules specifically protected it from this deceptive fake.",
        },
      ],
    },
  },

  // ─── baseball-5-07: Velocity and Why It Matters — And Doesn't ───────────────
  {
    epochId: "baseball-5",
    wonder: {
      name: "Turner Field — Greg Maddux's Classroom",
      location: "Atlanta, Georgia",
      era: "Modern",
      emoji: "🔬",
    },
    id: "baseball-5-07",
    order: 7,
    title: "Velocity and Why It Matters — And Doesn't",
    subtitle: "What determines speed, location beats velocity, Maddux principle",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-5-badge-07", name: "Pitch Efficiency", emoji: "⚡" },
    challengeType: "quiz",
    info: {
      tagline: "Greg Maddux never threw 90 mph and won 355 games — because he understood something most pitchers never learn.",
      year: 1995,
      overview: [
        "Velocity is the most visible and most fetishized attribute in pitching. A radar gun reading of 95 mph creates excitement; a 84-mph reading creates doubt. But the relationship between velocity and effectiveness is far more complex than the radar gun suggests. Some of the most dominant pitchers in baseball history — Greg Maddux, Tom Glavine, Jamie Moyer, location specialist Kyle Hendricks — built exceptional careers without elite velocity. Meanwhile, hard-throwing pitchers who cannot command their fastball get hit just as hard as soft-tossers who miss in the zone.",
        "Velocity is determined by several biomechanical factors: hip rotation speed (the primary driver), leg drive from the rubber, arm path efficiency (a clean path wastes no energy), body mass (more mass moving toward the plate = more force), and flexibility (a more flexible pitcher can achieve greater external rotation, which increases the acceleration window). Most of these factors can be improved with training — velocity is not entirely genetic, though there is a ceiling for each individual.",
        "At youth levels, location almost always beats velocity. A pitcher who throws 75 mph but consistently locates to the corners will outperform a pitcher throwing 85 mph down the middle. Youth hitters are trained to make contact with the ball wherever it is — their ability to be disciplined about pitch location is far less developed than their ability to react to a hittable pitch. A consistently located 72-mph pitcher is not only more effective but also healthier — effort-based velocity generation is the primary cause of arm injuries in youth pitchers.",
      ],
      technical: {
        title: "The Maddux Principle — Pitch Efficiency Over Power",
        body: [
          "Greg Maddux won four consecutive Cy Young Awards (1992–1995) and finished with 355 career wins while rarely exceeding 91 mph on his fastball. His approach was built on three principles: (1) throw as few pitches as possible by generating ground balls and weak contact early in counts, (2) change speed to disrupt timing rather than overpowering hitters, and (3) locate precisely on the corners to force hitters to swing at pitches they cannot drive.",
          "Maddux's career average of 76 pitches per game start — compared to the MLB average of 95+ — meant he was significantly more efficient than his peers. This efficiency preserved his arm over a 23-year career and allowed him to pitch deep into games consistently. His philosophy is summarized in a famous quote: 'I don't care what the radar gun reads. If the pitch is where I want it and the hitter can't drive it, I've succeeded.'",
        ],
        codeExample: {
          label: "Velocity vs. Location Matrix",
          code: `  VELOCITY × LOCATION OUTCOMES:
  +----------+-------------+-------------+
  |          |  Good Loc.  |  Bad Loc.   |
  +----------+-------------+-------------+
  | High Vel | Elite       | Very Hittable|
  | (95+ mph)| → strikeouts| → hard hit  |
  +----------+-------------+-------------+
  | Med Vel  | Effective   | Hittable    |
  | (88–94)  | → weak contact| → solid  |
  +----------+-------------+-------------+
  | Low Vel  | Effective   | Very Easy   |
  | (<87 mph)| (Maddux)    | → extra-base|
  +----------+-------------+-------------+

  YOUTH LEVEL INSIGHT:
  → Youth hitters CAN'T locate zone as adults
  → A consistently located 72 mph beats 85 MPH
    thrown in the middle of the zone
  → Pitch count efficiency → arm health

  MADDUX CAREER (1986–2008):
  → 355 wins, 3.16 ERA
  → Max velocity: ~91 mph
  → Career pitches per start: ~76
  → 4 Cy Young Awards`,
        },
      },
      incident: {
        title: "Greg Maddux's 1995 Cy Young Season — Pure Dominance Without Power",
        when: "1995 — Maddux wins fourth consecutive Cy Young Award",
        where: "Turner Field, Atlanta, Georgia",
        impact: "Greg Maddux's 1995 season produced a 1.63 ERA — the lowest since Bob Gibson's 1.12 in 1968. He threw 209.2 innings and walked only 23 batters in the entire season. His peak velocity that year was measured at 90 mph. The season stands as the definitive proof that location, movement, and pitch efficiency beat raw velocity.",
        body: [
          "Maddux's 1995 season with the Braves is studied in pitching clinics as the most extreme real-world demonstration of command over velocity. His 1.63 ERA in 209.2 innings — including the playoffs — was built on one foundation: throwing the ball exactly where he wanted, every time, with movement that made hitters miss by a fraction of an inch. Batters who faced Maddux frequently reported that it felt like he knew exactly what they were thinking: if they sat on the fastball, he threw a changeup; if they adjusted off-speed, he went fastball on the corner.",
          "The Maddux principle translates directly to youth baseball. Youth hitters have not developed the pitch recognition and zone discipline of professionals — they will swing at borderline pitches and chase breaking balls because they react to the ball, not to its location. A pitcher who can command at 72 mph will generate more strikeouts and weak contact at the youth level than a same-age hard thrower who cannot locate. More importantly, the mechanical habits of command-first pitching produce healthier arms.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Velocity Generation", sub: "hips, leg drive, arm path", type: "system" },
          { label: "Radar Gun Reading", sub: "important but not dominant", type: "attacker" },
          { label: "Location + Movement", sub: "determines actual effectiveness", type: "victim" },
          { label: "Pitch Efficiency", sub: "fewer pitches = longer outings", type: "result" },
        ],
      },
      timeline: [
        { year: 1920, event: "Walter Johnson averaged 90+ mph — first documented fastball velocity measurement" },
        { year: 1972, event: "Radar guns introduced to professional baseball — velocity obsession begins" },
        { year: 1992, event: "Maddux begins four-year Cy Young streak — location-first philosophy documented", highlight: true },
        { year: 1995, event: "Maddux 1.63 ERA season — definitive proof location beats velocity", highlight: true },
        { year: 2010, event: "Velocity inflation era begins — MLB average starter fastball reaches 91 mph" },
        { year: 2024, event: "Average MLB fastball tops 94 mph; command and spin still rank as top predictors of ERA" },
      ],
      keyTakeaways: [
        "Velocity is generated by hip rotation, leg drive, and arm path efficiency — most factors are trainable to a ceiling",
        "High velocity with poor location is very hittable; low-to-medium velocity with excellent location is very effective (Maddux)",
        "At youth levels, consistently located pitches at any velocity outperform hard throwers without command",
        "Pitch efficiency (fewer pitches per out) extends outings, reduces arm stress, and wins more games than strikeout totals",
      ],
      references: [
        { title: "Baseball Reference: Greg Maddux Career Stats", url: "https://www.baseball-reference.com" },
        { title: "Fangraphs: Velocity vs. Command Effectiveness Studies", url: "https://www.fangraphs.com" },
        { title: "ASMI: Effort-Based Velocity and Youth Arm Injury", url: "https://www.asmi.org" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-5-07-q1",
          type: "Location vs. Velocity",
          challenge: `  A youth pitcher throws 85 mph but always
  hits the middle of the plate. Their
  teammate throws 71 mph but consistently
  locates on the corners.

  Over a full season, who is more effective
  and why?`,
          text: "Why does consistent location outperform higher velocity at youth baseball levels?",
          options: [
            "The 85-mph pitcher — velocity is always the dominant factor regardless of level",
            "The 71-mph pitcher — youth hitters react to the ball wherever it is and have not developed zone discipline; a pitch on the corner is harder to hit than a faster pitch over the plate",
            "They are equal — the velocity advantage exactly offsets the location advantage",
            "The 85-mph pitcher — youth hitters cannot catch up to that velocity regardless of location",
          ],
          correctIndex: 1,
          explanation: "Youth hitters are trained to react to the ball — they swing at hittable pitches. A pitch over the middle of the plate at any velocity is a hittable pitch: the hitter doesn't need to reach the corners of the zone or adjust for edge location. The 85-mph pitch over the plate is exactly the pitch youth hitters are learning to drive. A consistent corner location at 71 mph requires the hitter to reach the edge of the zone, make contact with a pitch they may not square up, and generate the swing path to cover that location — skills still being developed at youth level. Corner location beats flat velocity in youth baseball consistently.",
        },
        {
          id: "baseball-5-07-q2",
          type: "Velocity Generation",
          challenge: `  A pitching coach tells a 14-year-old:
  "If you want to add 5 mph, don't try
  to throw harder with your arm. Work on
  your hip rotation speed in the weight room."

  Why is hip rotation more important to
  velocity than arm effort?`,
          text: "Which biomechanical factor contributes most to fastball velocity, and why does arm effort alone fail to generate it?",
          options: [
            "Arm strength is the primary velocity driver — the coach's advice is incorrect",
            "Hip rotation speed is the primary driver because it is the first link in the kinetic chain — faster hips accelerate the torso, which accelerates the shoulder and arm; the arm delivers velocity it did not generate alone",
            "Leg strength determines velocity — stronger legs from the weight room directly increase mph",
            "Flexibility is the dominant velocity factor — stretching programs produce the most mph gains",
          ],
          correctIndex: 1,
          explanation: "In the kinetic chain, velocity originates at the hips. Faster hip rotation produces faster torso rotation, which produces faster shoulder rotation, which produces faster arm rotation — each link multiplying the speed of the previous. The arm is the last and smallest link; it cannot generate velocity that the chain hasn't already built. Trying to throw harder with the arm alone (a common youth mistake called 'muscling up') actually disrupts the chain by engaging the arm too early, reducing the chain's efficiency. Hip rotation work — hip flexor strength, glute power, rotational core training — is where velocity gains live.",
        },
        {
          id: "baseball-5-07-q3",
          type: "Pitch Efficiency",
          challenge: `  Pitcher A averages 75 pitches per start
  over 7 innings. Pitcher B averages 100
  pitches per start over 6 innings.

  Over a season of 30 starts each, whose
  arm absorbs more total stress, and why
  does this matter?`,
          text: "How does pitch efficiency affect arm health over a full season?",
          options: [
            "Pitcher B — higher pitch counts per start means more total throws, which accumulates more stress on the arm over the season",
            "Pitcher A — more innings pitched means more total movement, increasing injury risk",
            "They are equal — the total innings pitched is the only relevant variable for arm health",
            "Pitch count only matters for youth pitchers — adult arms can handle unlimited totals",
          ],
          correctIndex: 0,
          explanation: "Pitcher B throws 3,000 pitches over 30 starts; Pitcher A throws 2,250 pitches — 750 fewer throws on the arm. Each throw places stress on the UCL, rotator cuff, and surrounding structures. Over a season, 750 fewer throws is a meaningful reduction in cumulative stress. Additionally, Pitcher A's efficiency likely means they are getting early-count outs (weak contact, ground balls, pop-ups) rather than running deep counts — which correlates with better command, not just lower effort. Maddux averaged 76 pitches per start across his career; his arm was still healthy at 42 years old.",
        },
        {
          id: "baseball-5-07-q4",
          type: "The Maddux Principle",
          challenge: `  A scouting report on a 17-year-old pitcher:
  "Tops out at 87 mph. Average movement.
  But his ERA is 1.85 and he walks almost
  nobody — 0.9 walks per 9 innings."

  A scout says: "Too slow to project."
  Another scout says: "Sign him immediately."

  Who is right, and why?`,
          text: "Why should a pitcher with a 1.85 ERA and 0.9 BB/9 be valued highly despite below-average velocity?",
          options: [
            "The pessimistic scout — velocity is the only projectable attribute; command does not carry to higher levels",
            "The optimistic scout — a 1.85 ERA with a sub-1.0 BB/9 represents elite command and pitch efficiency; command-first pitchers consistently outperform velocity-first projections at higher levels",
            "Neither — at 17, velocity will naturally develop and the ERA will normalize",
            "The pessimistic scout — hitters at higher levels will adjust to command pitchers and light up their ERA",
          ],
          correctIndex: 1,
          explanation: "A 1.85 ERA with 0.9 walks per 9 innings at age 17 is a statistical signature of exceptional command — the most projectable and most durable pitching attribute. Velocity can be added (hip strength, mechanics refinement) but command, once lost, is the hardest thing to rebuild. The Maddux principle proves command can sustain a 20+ year career without elite velocity. A 17-year-old with this profile is rare. The scout who says 'sign him' understands that the ERA represents outcomes, not projections — this pitcher is already producing at a professional-quality result rate regardless of the speed shown on a radar gun.",
        },
      ],
    },
  },

  // ─── baseball-5-08: Pitch Count and Arm Care ────────────────────────────────
  {
    epochId: "baseball-5",
    wonder: {
      name: "Little League World Series Volunteer Stadium",
      location: "Williamsport, Pennsylvania",
      era: "Modern",
      emoji: "🏥",
    },
    id: "baseball-5-08",
    order: 8,
    title: "Pitch Count and Arm Care",
    subtitle: "Little League rules, rest requirements, Tommy John epidemic, Dodgers workload management",
    category: "sports",
    xp: 90,
    badge: { id: "baseball-5-badge-08", name: "Arm Guardian", emoji: "🛡️" },
    challengeType: "quiz",
    info: {
      tagline: "A pitch count limit is not a restriction on greatness — it is the rule that makes greatness possible across a full career.",
      year: 2006,
      overview: [
        "Little League Baseball adopted mandatory pitch count rules beginning with the 2006–2007 rule changes, establishing maximum pitches per day by age group and mandatory rest periods before a pitcher can throw again. These rules were not arbitrary — they were implemented in direct response to a surge in youth arm injuries, particularly UCL tears requiring Tommy John surgery, that researchers at the American Sports Medicine Institute linked to overuse starting as young as nine and ten years old.",
        "The pitch count rules apply to all levels of organized Little League play and are enforced by umpires. A manager who removes a pitcher who has thrown more than the daily limit faces ejection. The rules distinguish between different age groups with different limits and different rest requirements — because developing arms in players aged 7–8 are biomechanically different from those of 15–16-year-olds, and the rules reflect that gradient.",
        "At the professional level, the Dodgers under general manager Andrew Friedman and manager Dave Roberts have implemented their own sophisticated workload management philosophy. Starting pitchers are tracked for innings pitched, pitch count, days of rest, and cumulative fastball velocity decline within starts. Starters who show velocity drops of more than 2 mph on their fastball are removed regardless of pitch count — velocity drop is an objective indicator of arm fatigue before the pitcher consciously feels it.",
      ],
      technical: {
        title: "Little League Pitch Count Rules — By Age Group",
        body: [
          "The following pitch count limits apply to Little League Baseball (as of current rules): Ages 7–8: 50 pitches per day maximum. Ages 9–10: 75 pitches per day maximum. Ages 11–12: 85 pitches per day maximum. Ages 13–16: 95 pitches per day maximum. Ages 17–18: 105 pitches per day maximum.",
          "Rest requirements are tiered by the number of pitches thrown. For ages 14 and under: 1–20 pitches = 0 calendar days rest (can pitch next day); 21–35 pitches = 1 calendar day rest; 36–50 pitches = 2 calendar days rest; 51–65 pitches = 3 calendar days rest; 66+ pitches = 4 calendar days rest. For ages 15–18, limits are slightly more permissive. A pitcher who is removed from a game may not return to pitch in that game, regardless of pitches thrown.",
        ],
        codeExample: {
          label: "Little League Pitch Count Quick Reference",
          code: `  DAILY PITCH LIMITS:
  Ages 7–8:   50 pitches max
  Ages 9–10:  75 pitches max
  Ages 11–12: 85 pitches max
  Ages 13–16: 95 pitches max
  Ages 17–18: 105 pitches max

  REST REQUIREMENTS (ages 14 and under):
  1–20 pitches  → 0 days rest (next day OK)
  21–35 pitches → 1 calendar day rest
  36–50 pitches → 2 calendar days rest
  51–65 pitches → 3 calendar days rest
  66+ pitches   → 4 calendar days rest

  ENFORCEMENT:
  → Umpires track pitch counts
  → Manager ejection for violations
  → Pitcher removed from pitching for
     remainder of game once removed

  DODGERS MLB WORKLOAD MANAGEMENT:
  → 100-pitch soft limit for most starters
  → Velocity drop >2 mph = automatic removal
  → 5-day rotation minimum between starts
  → Pitch type tracking: fastball % monitored`,
        },
      },
      incident: {
        title: "The Tommy John Epidemic — ASMI Research Changes Youth Baseball",
        when: "2006 — Little League adopts mandatory pitch count rules",
        where: "Little League Baseball Headquarters, Williamsport, Pennsylvania",
        impact: "By the early 2000s, the rate of Tommy John surgeries in youth pitchers had risen to crisis levels. Dr. James Andrews of the American Sports Medicine Institute published landmark research showing that year-round pitching specialization combined with no pitch count limits was directly causing UCL damage in children as young as nine. Little League's 2006 rule changes were the organizational response.",
        body: [
          "Dr. James Andrews, the orthopedic surgeon who performed more Tommy John surgeries than any other physician in baseball history, published ASMI research showing that young pitchers who threw more than 100 competitive innings per year had a statistically significant higher rate of serious arm injury. Specifically, pitchers who played year-round (no three-month rest period) and who pitched in consecutive games without adequate rest were developing the same UCL damage that professional pitchers displayed — in bodies that hadn't finished growing.",
          "Little League Baseball's response was the most significant rule change in the organization's modern history: mandatory pitch count limits by age group, with rest requirements enforced by umpires who were empowered to eject managers for violations. The PitchSmart program, launched jointly by Little League and MLB in 2014, extended these guidelines to travel baseball, high school programs, and beyond. The epidemic hasn't ended — but research shows that pitchers who follow pitch count guidelines have significantly lower Tommy John rates than those who do not.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Pitches Thrown", sub: "cumulative stress per outing", type: "attacker" },
          { label: "Pitch Count Limit", sub: "age-based daily maximum", type: "system" },
          { label: "Rest Requirement", sub: "days before next outing", type: "victim" },
          { label: "Arm Health Preserved", sub: "career longevity maintained", type: "result" },
        ],
      },
      timeline: [
        { year: 1974, event: "Tommy John's first UCL surgery — surgery becomes viable treatment" },
        { year: 1995, event: "ASMI research begins linking overuse at youth level to adult UCL injury rates" },
        { year: 2003, event: "Dr. Andrews publishes landmark study on youth pitching overuse and UCL damage" },
        { year: 2006, event: "Little League adopts mandatory pitch count rules by age group", highlight: true },
        { year: 2014, event: "MLB PitchSmart program extends guidelines to travel and high school baseball", highlight: true },
        { year: 2020, event: "Dodgers implement velocity-decline monitoring as pitch count supplement in MLB" },
      ],
      keyTakeaways: [
        "Little League pitch count limits range from 50 pitches per day (ages 7-8) to 105 pitches per day (ages 17-18)",
        "Rest requirements are tiered: throwing 66+ pitches at ages 14 and under requires 4 calendar days of rest before pitching again",
        "The rules were created in response to a documented epidemic of UCL injuries in youth pitchers from overuse",
        "At the MLB level, the Dodgers use velocity decline (>2 mph drop) as an objective trigger for removing starters regardless of pitch count",
      ],
      references: [
        { title: "Little League: Pitch Count Rules Official", url: "https://www.littleleague.org/playing-rules/pitch-count" },
        { title: "MLB PitchSmart: Age-Appropriate Guidelines", url: "https://www.mlb.com/pitchsmart" },
        { title: "ASMI: Youth Pitching Research", url: "https://www.asmi.org" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-5-08-q1",
          type: "Pitch Count Rules",
          challenge: `  A 12-year-old pitcher throws 67 pitches
  in Tuesday's game. The team has another
  game on Thursday.

  Under Little League rules, can they pitch
  on Thursday, and if not, when can they
  pitch again?`,
          text: "Under Little League pitch count rules for a 12-year-old who throws 67 pitches, what is the required rest period?",
          options: [
            "They can pitch on Thursday — 67 pitches is below the 85-pitch limit, so no rest is required",
            "They cannot pitch on Thursday — 66+ pitches requires 4 calendar days of rest, meaning the earliest they can pitch is Saturday",
            "They can pitch on Thursday — only the daily maximum matters, not the rest period",
            "They need 2 days rest — they can pitch Thursday since Tuesday to Thursday is two days",
          ],
          correctIndex: 1,
          explanation: "Under Little League rules for ages 14 and under, throwing 66 or more pitches requires 4 calendar days of rest before the player can pitch again. Tuesday is Day 0; Wednesday is Day 1; Thursday is Day 2; Friday is Day 3; Saturday is Day 4 — Saturday is the earliest this pitcher can throw again. Pitching on Thursday (2 days rest) would violate the rule and would require the manager to remove the pitcher from pitching, with the possibility of ejection for knowingly violating the rule. The rest periods are not arbitrary — they represent minimum recovery time for developing arm tissue.",
        },
        {
          id: "baseball-5-08-q2",
          type: "Why Limits Exist",
          challenge: `  A parent argues: "My son is strong and
  never feels arm pain. The pitch count
  rules are holding him back from developing.
  I'm pulling him from Little League to play
  a travel team with no pitch count rules."

  What is the scientific argument against
  this approach?`,
          text: "Why do pitch count limits apply even to pitchers who feel no arm pain?",
          options: [
            "The parent is correct — if there is no pain, there is no damage and limits are unnecessary",
            "UCL damage accumulates silently — pain typically appears only after significant fraying or partial tears have already occurred; absence of pain is not evidence of healthy tissue",
            "The rules are organizational, not scientific — the parent has a valid point about individual variation",
            "Pitch count limits only protect against muscle fatigue, not structural damage — they do not prevent Tommy John surgery",
          ],
          correctIndex: 1,
          explanation: "The UCL does not produce pain until it is significantly damaged. ASMI research found that youth pitchers frequently showed ligament fraying on MRI before experiencing any symptoms. The ligament's pain receptors are limited — repetitive micro-damage from overuse accumulates silently, and the first symptom a pitcher experiences is often a sudden sharp pain that represents a complete or near-complete tear requiring surgery. A pitcher who 'never feels arm pain' may be accumulating the very damage that leads to Tommy John surgery at 16 or 17. The pitch count rules protect against the silent accumulation, not just the pain threshold.",
        },
        {
          id: "baseball-5-08-q3",
          type: "Dodgers Workload Management",
          challenge: `  In the fifth inning of a playoff game,
  Walker Buehler's fastball velocity drops
  from an average of 96 mph to 93 mph
  over his last 15 pitches. He has thrown
  87 pitches and still feels strong.

  The Dodgers' pitching coach removes him.

  Why is this the correct decision?`,
          text: "Why do the Dodgers remove starting pitchers based on velocity decline rather than waiting for pitch count or the pitcher's own reported fatigue?",
          options: [
            "It is an incorrect decision — at 87 pitches with 2 innings remaining, Buehler should finish what he started",
            "Velocity decline of 2+ mph is an objective measure of arm fatigue that precedes conscious fatigue — continuing to throw a fatigued arm increases injury risk disproportionately to the performance benefit",
            "The Dodgers remove all pitchers at 85 pitches regardless of velocity — the velocity drop is coincidental",
            "Playoff games require extra caution — the same pitcher would not be removed in a regular season game",
          ],
          correctIndex: 1,
          explanation: "Velocity decline is a more objective and earlier indicator of arm fatigue than the pitcher's self-assessment, because pitchers consistently underestimate their own fatigue in high-adrenaline situations. A 3-mph velocity decline over 15 pitches means the arm is producing less force — the muscles responsible for arm acceleration are depleting energy stores faster than they can replenish them. Continuing to throw at this stage means the connective tissue (UCL, rotator cuff) is absorbing forces the fatigued muscles can no longer control. The Dodgers' data showed that pitchers who continued after a 2+ mph decline had dramatically higher rates of subsequent arm issues.",
        },
        {
          id: "baseball-5-08-q4",
          type: "Year-Round Specialization",
          challenge: `  A 13-year-old pitcher plays on three travel
  teams simultaneously and pitches year-round
  with no rest period. He is talented and
  wants to be seen by college scouts.

  What specific risk does year-round pitching
  create that a seasonal rest period prevents?`,
          text: "Why do arm care guidelines universally recommend a minimum three-month rest from competitive pitching per year?",
          options: [
            "Year-round pitching is beneficial — more reps equal more development and the rest period slows progress",
            "The arm requires a period without the repetitive stress of pitching for connective tissue repair and growth plate recovery — continuous year-round stress prevents this recovery, leading to chronic micro-damage",
            "Rest periods are only needed for pitchers who have already experienced arm pain",
            "Year-round pitching increases velocity development — the rest recommendation is outdated",
          ],
          correctIndex: 1,
          explanation: "Connective tissue — ligaments, tendons, the joint capsule — repairs itself through a physiological process that requires periods of reduced stress. Continuous year-round competitive pitching prevents this repair cycle from completing. Additionally, at 13, growth plates (the cartilaginous areas at bone ends) are still developing and are more vulnerable to repetitive stress than adult bone. A minimum three-month rest from competitive pitching gives these structures time to recover and adapt. ASMI research specifically identified year-round pitching with no rest period as one of the strongest predictors of UCL injury in youth pitchers — more predictive than any single game's pitch count.",
        },
      ],
    },
  },

  // ─── baseball-5-09: Fielding Your Position (PFP) ─────────────────────────────
  {
    epochId: "baseball-5",
    wonder: {
      name: "Dodger Stadium — The Infield",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "🧤",
    },
    id: "baseball-5-09",
    order: 9,
    title: "Fielding Your Position (PFP)",
    subtitle: "Covering first, comebackers, backing up, bunt defense, fifth infielder",
    category: "sports",
    xp: 80,
    badge: { id: "baseball-5-badge-09", name: "Fifth Infielder", emoji: "🛡️" },
    challengeType: "quiz",
    info: {
      tagline: "After the ball leaves your hand, you are an infielder — and the play isn't over.",
      year: 2021,
      overview: [
        "Pitchers are the tenth player on a baseball team in a sense — after delivering the pitch, they become a fielder. Pitcher fielding practice (PFP) is a specific component of spring training and regular practice that covers the fielding responsibilities unique to pitchers: covering first base on grounders hit to the right side, fielding comebackers (balls hit sharply back to the mound), backing up bases, defending bunts, and positioning for run-down plays.",
        "Covering first base is the most common and most critical PFP skill. On any ground ball hit to the first baseman or second baseman with the first baseman drawn toward the line, the pitcher must break immediately toward the first-base bag, receive the throw from the fielder, and record the out. This is a practiced running route — from the landing position on the mound, the pitcher sprints toward the grass-dirt line at approximately 45 feet from home plate, runs parallel to the foul line, and reaches the bag in time to receive the throw. Failure to break immediately on any right-side grounder is an automatic out for the offense.",
        "Comebackers — ground balls or line drives hit directly back at the pitcher — present both an opportunity and a danger. A pitcher who fields a hard comebacker cleanly can turn a double play or record a quick out. A pitcher who is not in a proper fielding position after their follow-through is vulnerable to injury. The follow-through ends with the pitcher in an athletic position: both feet roughly shoulder-width apart, knees slightly bent, glove in front — ready to field. This is not accidental; it is the reason proper follow-through mechanics teach the pitcher to arrive in an athletic fielding position.",
      ],
      technical: {
        title: "PFP Responsibilities by Situation",
        body: [
          "The pitcher's fielding responsibilities vary by base situation and ball location. On a ground ball to the right side (first or second base area), the pitcher breaks for first base immediately — the key cue is 'any ball to my right, I run.' On a ground ball to third base with a runner on first, the pitcher covers home plate in case of a throw. On a bunt with runners on base, the pitcher fields the bunt (if reachable) and makes the fielder's choice throw; the positioning for bunt defense is pre-determined by the team's defensive scheme.",
          "Backing up bases is a critical but often ignored responsibility. With a runner on first and a hit to the outfield, the pitcher sprints to back up third base in case of an overthrow. With runners in scoring position, the pitcher covers home plate on any throw from the outfield. The backup assignment is always to the base the ball is being thrown toward, positioned 20–30 feet behind the base to catch overthrows. A pitcher who stands on the mound watching plays in the outfield is giving up potential outs.",
        ],
        codeExample: {
          label: "PFP Quick Reference — What to Do and When",
          code: `  BALL HIT RIGHT SIDE (1B/2B area):
  → Break IMMEDIATELY toward 1B bag
  → Run parallel to foul line (~45' from home)
  → Touch inside of bag, receive throw
  → React to bad throws — adjust route

  COMEBACKER TO MOUND:
  → Follow-through ends in athletic position
  → Field the ball — look runner back first
  → Throw to best base (usually 1B or 2B)

  BUNT DEFENSE:
  → Crash toward home when bunt is signaled
  → Field ball — make pre-determined throw
  → (3rd base on 1B/2B situation usually)

  BACKING UP BASES:
  → Hit to OF with runner on 1B → back up 3B
  → Throw from OF to plate → back up HP
  → Always position 20–30 ft behind target base

  COVERING HOME ON PASSED BALL:
  → With runner on 3B, pitcher moves toward
    the 3B line to receive catcher throw
  → Straddle corner of plate, apply tag

  KEY RULE: Never stand on mound watching
  a developing play — you have an assignment`,
        },
      },
      incident: {
        title: "Walker Buehler's PFP Training — Dodgers Spring 2021",
        when: "February–March 2021 — Dodgers Spring Training",
        where: "Camelback Ranch, Glendale, Arizona",
        impact: "During the 2021 Dodger spring training at Camelback Ranch, the pitching staff under coach Mark Prior spent two full sessions per week exclusively on PFP. Walker Buehler, coming off his 2020 World Series start, led what coaches called 'the most detailed PFP group in years' — with emphasis on covering first base, backup assignments, and bunt defense scenarios.",
        body: [
          "The Dodgers' 2021 PFP program was notable for its focus on decision-making under game pressure, not just physical execution. Buehler and the staff ran scenarios where the same ground ball to the right side had different base situations — runner on first, runner on second, bases loaded — and the pitcher had to make the correct read and execution on each. The training emphasized that PFP is not mechanical repetition but situational intelligence: knowing before the pitch where you will go if the ball is hit in each direction.",
          "The Dodgers' use of advanced defensive positioning data (from Statcast) informed their PFP training. They knew from data that pitchers in their system had most frequently failed to cover first on ground balls hit to the second baseman side rather than the first baseman side — a route that required a longer sprint. The training sessions in 2021 specifically over-weighted second-baseman ground ball scenarios to address this documented weakness. The result: the 2021 Dodger pitching staff finished in the top five in pitcher fielding metrics across the National League.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Pitch Delivered", sub: "follow-through → athletic position", type: "system" },
          { label: "Ball Location Read", sub: "right side? comebacker? bunt?", type: "attacker" },
          { label: "Immediate Movement", sub: "cover 1B, field, or back up", type: "victim" },
          { label: "Defensive Out Recorded", sub: "pitcher as fifth infielder", type: "result" },
        ],
      },
      timeline: [
        { year: 1900, event: "PFP first formalized as part of spring training curriculum in professional baseball" },
        { year: 1950, event: "Don Newcombe wins both 20 games and a Gold Glove — Dodger pitching-fielding model" },
        { year: 1985, event: "Bob Gibson and Tom Seaver cited in retrospective as best fielding pitcher combo of era" },
        { year: 2000, event: "Greg Maddux wins 18th consecutive Gold Glove — PFP excellence defined for a generation", highlight: true },
        { year: 2015, event: "Statcast begins tracking pitcher fielding metrics — PFP data enters analytics pipeline" },
        { year: 2021, event: "Dodgers implement data-driven PFP training targeting documented weakness patterns", highlight: true },
      ],
      keyTakeaways: [
        "On any ground ball to the right side of the infield, the pitcher must immediately break toward first base",
        "The follow-through lands the pitcher in an athletic fielding position — this is functional, not cosmetic",
        "Backing up bases (third on outfield hits, home on throws from the outfield) is a required assignment, not optional",
        "PFP is situational intelligence: know your assignment before the pitch is thrown, not after the ball is hit",
      ],
      references: [
        { title: "Dodgers: Spring Training PFP Program", url: "https://www.mlb.com/dodgers" },
        { title: "Baseball Reference: Pitcher Fielding Statistics", url: "https://www.baseball-reference.com" },
        { title: "MLB: Statcast Pitcher Fielding Metrics", url: "https://baseballsavant.mlb.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-5-09-q1",
          type: "Covering First Base",
          challenge: `  The pitcher delivers a pitch. The batter
  hits a sharp grounder to the second baseman.
  The first baseman has moved toward second
  to field a potential double-play throw.

  No one is covering first base.
  The pitcher is still on the mound.

  What should have happened?`,
          text: "When is the pitcher responsible for covering first base, and what is the running route?",
          options: [
            "The pitcher should cover first only on bunts — ground balls to second base are the second baseman's sole responsibility",
            "On any ground ball to the right side of the infield, the pitcher must immediately break toward first base, running parallel to the foul line to receive the throw",
            "The pitcher should back up the throw to second base for a potential double play, not cover first",
            "If the first baseman is drawn toward the line, the second baseman automatically covers first — the pitcher is not involved",
          ],
          correctIndex: 1,
          explanation: "The rule of PFP: any ball hit to the right side of the infield triggers the pitcher to immediately break toward first base. When the first baseman fields the ball or moves toward second base, the pitcher is the only player available to cover first. The route is standardized: break toward the grass-dirt line about 45 feet from home plate, run parallel to the foul line (not directly to the bag from the mound, which creates a collision angle), and receive the throw while touching the inside of the bag. Failing to break immediately means the out is missed — this is a fundamental defensive breakdown that good teams never allow.",
        },
        {
          id: "baseball-5-09-q2",
          type: "Comebacker Position",
          challenge: `  A pitcher's follow-through ends with them
  standing fully upright, feet together,
  glove at their side. A hard line drive
  hits them in the chest.

  The coach says: "Your follow-through
  mechanics made that worse."

  How does a proper follow-through protect
  the pitcher and help fielding?`,
          text: "How does follow-through mechanics affect a pitcher's fielding position after each delivery?",
          options: [
            "Follow-through is for arm care only — fielding position is a separate adjustment made after the pitch",
            "A proper follow-through ends with the pitcher in an athletic fielding position — balanced, knees flexed, glove in front — which both absorbs comebackers safely and enables quick fielding reactions",
            "Feet together is the correct post-pitch position — it minimizes movement before a fielding play",
            "Follow-through only affects the arm — foot and glove position after delivery is unrelated to mechanics",
          ],
          correctIndex: 1,
          explanation: "A correct follow-through is not just arm health mechanics — it functionally lands the pitcher in the ready fielding position. The sweep of the arm down and across the body drives the pitcher's body into a balanced, athletic stance: weight balanced on both feet, knees bent, upper body slightly forward, glove arm crossing in front. This is the same ready position an infielder uses before every pitch. A pitcher who cuts off their follow-through or ends standing upright with feet together is not in position to react to comebackers. The pitching mechanics and the fielding position are not separate skills — they are the same motion.",
        },
        {
          id: "baseball-5-09-q3",
          type: "Backing Up Bases",
          challenge: `  Runners on first and second. The batter
  hits a single to right field. The right
  fielder's throw is heading to third base.

  Where should the pitcher be positioned,
  and why?`,
          text: "What is the pitcher's backing up assignment when a throw is going to third base?",
          options: [
            "The pitcher should cover second base in case the runner on first tries to advance",
            "The pitcher should be positioned 20–30 feet behind third base in line with the throw's path, to catch any overthrow before it rolls into the outfield",
            "The pitcher should cover home plate in anticipation of a subsequent play",
            "The pitcher has no assignment on outfield throws to bases — they should return to the dugout",
          ],
          correctIndex: 1,
          explanation: "The backing up assignment is always: position yourself behind the base that is being thrown to, in line with the throw's trajectory, 20–30 feet away. On this play, the right fielder is throwing to third base — the pitcher sprints to a spot 20–30 feet behind third base (in foul territory, aligned with the throw from right field). If the throw is offline and bounces past the third baseman, the pitcher is the last line of defense — without a backup, the ball rolls deep and runners score easily. This is one of the most commonly neglected responsibilities by youth pitchers, and the most immediately correctable.",
        },
        {
          id: "baseball-5-09-q4",
          type: "Bunt Defense",
          challenge: `  Runners on first and second, nobody out.
  The batter shows bunt. The team's defensive
  scheme: pitcher fields bunts up the first-
  base line and throws to third.

  The pitcher fields the bunt cleanly at
  the first-base line. The third baseman
  is at the bag. What is the correct throw?`,
          text: "In a bunt defense where the pitcher fields up the first-base line, what is the correct decision with runners on first and second?",
          options: [
            "Throw to first base — always get the sure out on the batter",
            "Throw to third base to retire the lead runner — this is the pre-determined scheme for this situation",
            "Hold the ball — with runners on first and second, there is no safe throw to make",
            "Throw to second base to start a double play",
          ],
          correctIndex: 1,
          explanation: "In bunt defense, the decision should be made before the pitch is delivered based on the team's defensive scheme. With runners on first and second and nobody out, the most valuable out is the lead runner at third — retiring the lead runner prevents the most dangerous runner from scoring and limits the damage of the bunt play. The pre-determined scheme (pitcher fields up the first-base line → throw to third) exists specifically for this situation. Pre-determining the throw removes the decision from the pitcher in real time, where hesitation kills the play. If the third baseman is at the bag and the pitcher fields cleanly, the throw should be made without hesitation.",
        },
      ],
    },
  },

  // ─── baseball-5-10: Mental Approach on the Mound ────────────────────────────
  {
    epochId: "baseball-5",
    wonder: {
      name: "Dodger Stadium — The Mound in October",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "🧠",
    },
    id: "baseball-5-10",
    order: 10,
    title: "Mental Approach on the Mound",
    subtitle: "Bad inning recovery, breathing, pace of play, Kershaw's competitor mindset",
    category: "sports",
    xp: 90,
    badge: { id: "baseball-5-badge-10", name: "Mound Presence", emoji: "🏆" },
    challengeType: "quiz",
    info: {
      tagline: "The best thing you can throw after a bad pitch is the very next one — and throwing it well requires forgetting the last one completely.",
      year: 2022,
      overview: [
        "The mental game of pitching is as demanding as the physical. A pitcher stands alone on the mound, responsible for every pitch, visible to thousands, with a physical flaw or bad pitch immediately resulting in either a strikeout or a ball leaving the park. The psychological demands — managing failure, maintaining focus under pressure, adjusting to adversity — are unique in team sports. A pitcher who cannot manage the mental game cannot maintain their physical mechanics under the stress that competitive pitching produces.",
        "Every great pitcher has a framework for dealing with bad pitches, bad innings, and bad outings. Clayton Kershaw has described his approach as a one-pitch-at-a-time philosophy: the moment a pitch leaves his hand, he releases attachment to the outcome and begins preparing for the next pitch. This is not indifference — Kershaw is famously intense and competitive — it is controlled focus. Emotional attachment to a bad pitch (anger, embarrassment, anxiety) corrupts the mechanical routine of the next pitch delivery.",
        "Breathing technique is the physiological tool that bridges mental state and physical execution. Deep diaphragmatic breathing (breathing into the belly, not the chest) activates the parasympathetic nervous system — reducing heart rate, lowering cortisol, and restoring fine motor control. A pitcher who takes a slow, deliberate breath behind the mound after a bad inning is not showing weakness — they are executing a documented physiological reset that returns the arm and body to the optimal performance state.",
      ],
      technical: {
        title: "Working Fast vs. Working Slow — Pace as a Weapon",
        body: [
          "Pace of play on the mound is a strategic variable, not merely a personal preference. Working fast (delivering pitches within 15–20 seconds of receiving the ball from the catcher) keeps the defense alert, disrupts the hitter's in-between-pitch routine, and maintains the pitcher's own momentum. Fast workers tend to produce better defensive play behind them because fielders stay engaged. Quick-working Kershaw and Walker Buehler are examples of Dodger starters who use pace as a competitive tool.",
          "Working slowly — stepping off, walking around the mound, taking long pauses between pitches — can be effective in specific situations: after an error that disrupts the inning's flow, after a home run to reset mentally, or when facing a particularly dangerous hitter who thrives on fastball timing. However, as a default approach, working slow invites the defense to lose focus and tends to break a pitcher's own mechanical rhythm. The ideal is working at a consistent, confident pace with deliberate slowing only at specific high-stakes moments.",
        ],
        codeExample: {
          label: "The One-Pitch Mind — Mental Reset Protocol",
          code: `  AFTER A BAD PITCH:
  1. Turn away from the plate (turn your back)
  2. Deep breath — exhale slowly (4 sec out)
  3. Focus point: glove seams, cap bill, or ground
  4. One-word cue: "Next" or "Here" or "Now"
  5. Set your grip, look in for sign
  6. Deliver with full commitment

  AFTER A BAD INNING:
  1. Walk off mound under control (not rushing)
  2. Sit down — slow breathing, 3 cycles
  3. Re-establish physical routine (towel, water)
  4. Cue: "This inning is over — it doesn't exist"
  5. Visualize next inning going well (1 minute)
  6. Get your outs mentally before physical warmup

  KERSHAW'S APPROACH:
  → "I know what I want to throw before I grip it"
  → Routine pitch-to-pitch: same pause, same grip
  → Competition mindset: attack, don't protect
  → After HR: faster pace, not slower
  → Command breakdown: simplify (4-seam inside)`,
        },
      },
      incident: {
        title: "Clayton Kershaw — 2022 NLCS Resilience",
        when: "October 2022 — NLCS vs. San Diego Padres",
        where: "Dodger Stadium, Los Angeles, California",
        impact: "Clayton Kershaw had a complicated postseason history — including several difficult moments in high-leverage playoff games throughout his career. The 2022 NLCS against the Padres showcased both the struggle and the competitor mindset: after allowing runs in Game 1, Kershaw came back in Game 5 with a dominant performance that extended the series, demonstrating the mental reset that defines elite pitching.",
        body: [
          "Clayton Kershaw's postseason career has been marked by moments of brilliance and moments of adversity — an unusually human profile for a pitcher so dominant in the regular season. Critics pointed to his struggles as evidence of a mental 'block' in the postseason. What coaches observed was different: Kershaw responded to adversity in the postseason with the same competitor instinct that made him great in the regular season — he never shied away from the moment, never asked out, and never changed his approach after a bad inning.",
          "In Game 5 of the 2022 NLCS, with the Dodgers facing elimination, Kershaw started and held the Padres to two runs over five innings, giving the Dodgers a chance to extend the series. The mental discipline that enabled this performance — pitching in an elimination game after a difficult Game 1 — is what Dodger coaches consistently cited as Kershaw's most undervalued attribute. His mound presence under pressure, his ability to stay mechanically sound after bad pitches, and his commitment to attacking hitters even in vulnerable game situations, defined his legacy as much as his statistics.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Bad Pitch / Bad Inning", sub: "emotional trigger event", type: "attacker" },
          { label: "Mental Reset Protocol", sub: "breath, routine, cue word", type: "system" },
          { label: "Mechanical Routine Restored", sub: "grip, look, deliver", type: "victim" },
          { label: "Next Pitch Clean", sub: "attachment released, focus present", type: "result" },
        ],
      },
      timeline: [
        { year: 1962, event: "Sandy Koufax's mental composure after early career wildness becomes legendary" },
        { year: 1988, event: "Orel Hershiser's 59-inning scoreless streak requires sustained mental focus — coaches study his mound presence" },
        { year: 2000, event: "Sports psychology becomes mainstream in MLB — mindfulness and breathing protocols introduced" },
        { year: 2014, event: "Kershaw's 2014 MVP season — pitching coach Rick Honeycutt credits mental discipline as key differentiator", highlight: true },
        { year: 2020, event: "Kershaw wins his first World Series — postseason redemption arc studied for mental resilience", highlight: true },
        { year: 2022, event: "Kershaw's NLCS Game 5 after Game 1 struggle — competitor mindset on display" },
      ],
      keyTakeaways: [
        "The mental reset after a bad pitch: turn away, breathe out for 4 seconds, use a one-word cue, then commit fully to the next pitch",
        "Emotional attachment to bad pitches corrupts the mechanical routine of the delivery that follows",
        "Working at a consistent pace keeps the defense engaged and maintains the pitcher's own mechanical rhythm",
        "Kershaw's competitor mindset — attack even after adversity, maintain the same approach regardless of score — is the mound presence model",
      ],
      references: [
        { title: "Dodgers: Clayton Kershaw Mental Approach", url: "https://www.mlb.com/dodgers" },
        { title: "ASMI: Sports Psychology and Pitching Performance", url: "https://www.asmi.org" },
        { title: "Baseball Reference: Kershaw 2022 NLCS", url: "https://www.baseball-reference.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-5-10-q1",
          type: "Mental Reset",
          challenge: `  A pitcher allows a home run on a badly
  located fastball. Visibly frustrated,
  they walk back to the rubber quickly,
  grip the ball hard, and throw the next
  pitch before getting a sign — it sails
  wide for ball one.

  What mental error caused the second
  bad pitch?`,
          text: "Why does emotional reactivity after a bad pitch cause mechanical breakdown on the subsequent pitch?",
          options: [
            "The pitcher's grip changed after the home run, causing the next pitch to miss — it is a grip problem",
            "Emotional activation (frustration, adrenaline spike) disrupts the pre-pitch routine that establishes mechanical consistency — the pitcher rushed the delivery while still emotionally triggered, producing the same mechanical errors that caused the home run",
            "Walking quickly is the correct response — the problem was the ball one pitch, which was bad luck",
            "The pitcher needed a faster heart rate to generate velocity — emotional activation should help",
          ],
          correctIndex: 1,
          explanation: "The emotional spike from allowing a home run — frustration, adrenaline, embarrassment — creates physical tension (gripping the ball harder, shortened preparation time, rushing movements) and cognitive disruption (not processing the catcher's sign, not setting grip deliberately). These physical and cognitive changes directly alter the delivery mechanics. The 'angry next pitch' syndrome is documented across all levels: the pitch immediately following a visible emotional reaction is statistically the most likely to miss. The antidote is the mental reset protocol — deliberately slowing down, breathing, and restoring the mechanical routine before the next pitch.",
        },
        {
          id: "baseball-5-10-q2",
          type: "Breathing Technique",
          challenge: `  Between innings after a rough third inning
  (3 runs on 2 walks and a home run), a
  pitcher's heart rate is at 155 bpm and
  their hands are slightly shaking.

  Their pitching coach says:
  "Breathe — three slow cycles before warmup."

  Why is breathing the first recommendation?`,
          text: "How does slow diaphragmatic breathing reduce physiological arousal before the next inning?",
          options: [
            "Breathing is a distracting ritual — the real purpose is to give the pitcher time to think through adjustments",
            "Slow exhalation activates the parasympathetic nervous system, reducing heart rate and cortisol — this physiological reset restores fine motor control that adrenaline disrupts",
            "Deep breathing increases oxygen delivery to muscles, improving velocity on the next inning's pitches",
            "The coach is recommending superstition — breathing has no measurable effect on performance states",
          ],
          correctIndex: 1,
          explanation: "The autonomic nervous system has two modes: sympathetic (fight-or-flight, high arousal, elevated heart rate) and parasympathetic (rest-and-digest, lower arousal, fine motor control restored). A tough inning triggers the sympathetic mode. The fastest way to activate the parasympathetic response is through slow, extended exhalation (breathing out for 4–6 seconds). This triggers baroreceptors in the heart and lungs that signal the brain to slow down. Within three breath cycles of slow exhaling, heart rate drops 10–20 bpm and the cortisol flood diminishes — restoring the physical state optimal for precise mechanical execution. Elite pitchers use this deliberately.",
        },
        {
          id: "baseball-5-10-q3",
          type: "Pace of Play",
          challenge: `  A pitcher typically works at 18–20 seconds
  between pitches. After a lead-off error
  by the third baseman, the pitcher stops,
  walks around the mound for 45 seconds,
  and then delivers — the error disrupted
  their rhythm.

  Should the pitcher work faster or slower
  after an error behind them?`,
          text: "What is the optimal pace strategy after a defensive error disrupts an inning's flow?",
          options: [
            "Work slower — the pitcher needs more time to recover from the emotional disruption of the error",
            "Return to normal pace as quickly as possible — extended pauses extend the disruption and allow negative thoughts to build; consistent pace restores rhythm",
            "Work faster than normal — increased pace generates momentum and signals confidence",
            "Pace is irrelevant after errors — what matters is pitch selection for the next batter",
          ],
          correctIndex: 1,
          explanation: "After an error, the worst response is an extended pause that broadcasts disruption to the hitter, the defense, and the coaching staff. The hitter sees the pause and gains confidence ('the pitcher is rattled'). The defense sees the pause and may lose focus. Critically, the extended pause gives the pitcher's own mind time to dwell on the error rather than focus on the next pitch. The correct response is deliberate: acknowledge the error internally, take one focused breath, and return to normal pace. The pace itself signals to everyone — including the pitcher — that nothing has fundamentally changed. Kershaw's approach after errors: faster pace, not slower.",
        },
        {
          id: "baseball-5-10-q4",
          type: "Competitor Mindset",
          challenge: `  With two runners on base in a tie game,
  a young pitcher asks for a timeout and
  wants to throw only changeups — "to
  be safe" and avoid giving up a hard hit
  fastball.

  The pitching coach says: "Attack. Don't
  protect. What's your best pitch right now?"

  What is the mental principle behind
  this coaching instruction?`,
          text: "Why does a 'protective' pitching mindset (avoiding mistakes) produce worse outcomes than an attacking mindset?",
          options: [
            "Attacking hitters always produces better results — changeups should never be used in high-leverage situations",
            "Pitching 'to protect' (avoiding hard contact) typically produces passive mechanics, reduced velocity, and poor location — the body performs better when executing aggressively toward a target than when flinching away from a bad outcome",
            "The coach is wrong — protecting the lead is the correct high-leverage philosophy",
            "The mindset doesn't matter — the pitch selection (changeup vs. fastball) is the only variable that affects outcomes",
          ],
          correctIndex: 1,
          explanation: "Protective pitching — 'just don't give up the home run,' 'just get the ball in play,' 'just be safe' — produces the very outcomes it tries to avoid. When a pitcher's mental framework shifts from 'attack this target' to 'avoid that bad outcome,' their mechanics follow: grip tightens, delivery slows and becomes passive, release point inconsistency increases (the brain is processing avoidance, not execution). The result is pitches that miss middle, walks from passivity, and ironically more hard contact because the pitcher is no longer locating aggressively. Attacking mechanics — same pitch, same target, executed with full commitment — produce better location and better outcomes in high-leverage situations, even when the pitch is a changeup.",
        },
      ],
    },
  },
];
