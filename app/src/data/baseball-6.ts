import type { StageConfig, EpochConfig } from "./types";

export const baseball6Epoch: EpochConfig = {
  id: "baseball-6",
  name: "Pitch Arsenal",
  subtitle: "Grips, Movement & Sequencing",
  description:
    "Every pitcher tells a story with their arsenal — a sequence of speeds, shapes, and locations designed to keep hitters off-balance and guessing wrong. This epoch goes deep on every pitch type from the four-seam fastball to the splitter, covering grip mechanics, spin science, movement physics, and the Rapsodo revolution that transformed how Dodger pitching coaches develop arms. From Clayton Kershaw's El Diablo curveball to Mariano Rivera's career-ending cutter to Hideo Nomo's devastating forkball, you will learn to grip, throw, and sequence every weapon in a complete pitcher's arsenal — and build your own repertoire the right way.",
  emoji: "🎯",
  color: "red",
  unlocked: true,
};

export const baseball6Stages: StageConfig[] = [
  // ─── baseball-6-01: Four-Seam Fastball ────────────────────────────────────────
  {
    epochId: "baseball-6",
    wonder: {
      name: "Dodger Stadium — The Mound",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "⚾",
    },
    id: "baseball-6-01",
    order: 1,
    title: "Four-Seam Fastball",
    subtitle: "Grip, backspin, rise effect, and establishing the heater",
    category: "sports",
    xp: 80,
    badge: { id: "baseball-6-badge-01", name: "Heater", emoji: "🔥" },
    challengeType: "quiz",
    info: {
      tagline: "The four-seam fastball is the foundation of every arsenal — master it first, and every other pitch becomes better because of it.",
      year: 1958,
      overview: [
        "The four-seam fastball is the most common pitch in baseball and the foundation of every pitcher's arsenal. Its grip is simple: the index and middle fingers are placed across the horseshoe seam of the ball so that four seams rotate through the air on every revolution. The thumb rests underneath for control, and the ball is held with fingertip pressure rather than deep in the palm — keeping the wrist loose and maximizing the snap through release.",
        "The physics of the four-seamer are driven by backspin. As the pitcher snaps their wrist downward through release, the ball generates pure backspin — rotation opposite to the direction of travel. This backspin creates the Magnus Effect: the spinning ball pushes air downward off its surface, and in reaction, the air pushes the ball upward. The ball does not literally 'rise,' but it falls less than gravity would predict — creating the perceptual rise effect that makes elite four-seamers so difficult to hit at the top of the zone.",
        "Velocity benchmarks vary by age. A dominant 12-year-old four-seamer sits 60–68 mph. By 14, elite arms reach 70–78 mph. High school varsity starters average 78–85 mph. College starters average 86–91 mph. MLB average is 93–94 mph, with elite power pitchers reaching 99–103 mph. For Dodger starters, the four-seamer is the pitch that establishes presence: Yoshinobu Yamamoto, Tyler Glasnow, and Walker Buehler all throw four-seamers at the top of the zone early in counts to get ahead and make hitters respect velocity.",
      ],
      technical: {
        title: "Backspin Physics — Why the Four-Seam Rises",
        body: [
          "Spin rate is the number of revolutions per minute (rpm) the ball makes in flight. A high-spin four-seamer (2,500+ rpm) creates a stronger Magnus Effect — more perceived rise, more swing-and-miss at the top of the zone. A low-spin four-seamer (2,000 rpm or below) will behave closer to a sinker and will be hit harder if located in the middle of the zone. Rapsodo and Statcast both measure spin rate and spin axis, allowing modern pitching coaches to optimize grip adjustments for maximum backspin efficiency.",
          "Spin efficiency (also called 'active spin') is the percentage of total spin that contributes to movement rather than gyroscopic spin. A fastball with 2,600 rpm and 95% spin efficiency creates massive ride; the same 2,600 rpm with 65% efficiency (more gyro spin) produces far less movement. Grip, finger pressure, and wrist angle all affect spin efficiency — which is why two pitchers can have the same spin rate but completely different results at the plate.",
        ],
        codeExample: {
          label: "Four-Seam Fastball — Grip and Benchmarks",
          code: `  GRIP:
  → Index + middle fingers across the horseshoe seam
  → Four seams rotate on every revolution
  → Thumb directly underneath, relaxed
  → Held with fingertips — NOT deep in palm
  → Loose wrist for maximum snap at release

  MECHANICS:
  → Arm action: over the top or 3/4
  → Release: finger snap downward → pure backspin
  → Ball angle at release: seams perpendicular to flight

  SPIN RATE TARGETS (MLB Statcast):
  Elite:   ≥ 2,500 rpm  → strong rise effect
  Average: 2,200–2,400 rpm
  Low:     ≤ 2,000 rpm  → sinker territory

  VELOCITY BENCHMARKS:
  Age 12:  60–68 mph
  Age 14:  70–78 mph
  HS Var:  78–85 mph
  College: 86–91 mph
  MLB avg: 93–94 mph
  Elite:   97–103 mph

  LOCATION STRATEGY:
  → Up in zone (letters): exploits rise effect
  → First-pitch fastball establishes presence
  → Come back to it after off-speed to reset`,
        },
      },
      incident: {
        title: "Tyler Glasnow and the Dodgers' Velocity Commitment — 2024",
        when: "2023–2024 — Tyler Glasnow trade to Los Angeles",
        where: "Dodger Stadium, Los Angeles, California",
        impact: "When the Dodgers acquired Tyler Glasnow from Tampa Bay in December 2023, they were acquiring one of baseball's elite four-seam fastball arms — a pitcher whose 98–100 mph heater with elite spin rate made his entire arsenal better because hitters had to sit on it first. Glasnow's ability to establish the four-seamer early in counts was central to his 2024 dominance.",
        body: [
          "Tyler Glasnow's four-seam fastball averaged 98.5 mph in 2024 with a spin rate consistently above 2,500 rpm, generating one of the highest rise effects in the National League. His approach was deliberately fastball-first in new counts: he established the four-seamer at the top of the zone early, forced hitters to commit their timing to his velocity, then introduced his devastating curveball as a change of speed and shape. This sequencing philosophy — build off the fastball, everything else is contrast — is the model Dodger pitching coordinator Mark Prior teaches across the organization.",
          "Glasnow's 2024 season (185 strikeouts in 134 innings) demonstrated what a premium four-seamer can do when thrown with conviction and excellent location. His strike-to-ball ratio on first pitches was elite — meaning he was getting ahead regularly and forcing hitters to protect against 99 mph. The lesson for developing pitchers: before adding every off-speed variation, make the four-seamer a genuine weapon that hitters fear. Every other pitch in the arsenal becomes better when hitters can't stop thinking about the heater.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Grip: 4-Seam", sub: "fingers across horseshoe seam", type: "system" },
          { label: "Release: Backspin", sub: "wrist snap downward", type: "attacker" },
          { label: "Magnus Effect", sub: "backspin fights gravity", type: "victim" },
          { label: "Rise Effect / K", sub: "swing-and-miss at top of zone", type: "result" },
        ],
      },
      timeline: [
        { year: 1920, event: "Live-ball era begins — fastball velocity becomes a premium weapon in baseball" },
        { year: 1958, event: "Dodgers move to LA — Sandy Koufax begins perfecting his fastball at Dodger Stadium", highlight: true },
        { year: 1984, event: "Dwight Gooden's 98-mph four-seamer with elite spin redefines strikeout standards" },
        { year: 2015, event: "Statcast spin rate measurement reveals backspin efficiency as a key fastball variable" },
        { year: 2020, event: "Trevor Bauer publicly shares spin rate optimization research — grips go scientific" },
        { year: 2024, event: "Glasnow averages 98.5 mph as a Dodger — spin-rate fastball dominance at its peak", highlight: true },
      ],
      keyTakeaways: [
        "Grip with fingertips across the horseshoe seam — four seams rotate on every revolution for maximum backspin",
        "High spin rate (2,500+ rpm) creates the Magnus Effect rise that makes four-seamers at the top of the zone devastating",
        "Establish the fastball early in counts — every off-speed pitch is more effective when hitters fear the heater",
        "Velocity benchmarks are age-dependent: focus on mechanics and spin efficiency before chasing velocity",
      ],
      references: [
        { title: "Baseball Savant: Fastball Spin Rate Data", url: "https://baseballsavant.mlb.com" },
        { title: "MLB: Tyler Glasnow 2024 Pitching Analysis", url: "https://www.mlb.com/dodgers" },
        { title: "Rapsodo: Spin Rate and Fastball Movement", url: "https://rapsodo.com/baseball" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-6-01-q1",
          type: "Grip Mechanics",
          challenge: `  You grip the ball deep in your palm with
  your four-seam grip. Your fastball has
  less velocity than expected and your
  arm feels tight after every bullpen.

  Your pitching coach watches your grip and
  says: "Get it out of your palm."

  Why does grip depth affect both velocity
  and arm health?`,
          text: "Why should a four-seam fastball be held with fingertips rather than deep in the palm?",
          options: [
            "Palm grip is actually preferred for velocity — more surface area means more push on the ball",
            "Fingertip grip allows a full wrist snap at release, maximizing backspin and velocity while reducing forearm tension",
            "Grip depth only affects spin direction, not velocity or arm stress",
            "A deep grip improves command because the ball is more controlled — velocity is the tradeoff",
          ],
          correctIndex: 1,
          explanation: "Holding the ball deep in the palm restricts wrist flexion at release — the pitcher cannot snap the wrist fully downward, reducing both spin rate and velocity. It also forces the forearm muscles to stabilize a gripped load rather than whipping freely, adding strain over time. A fingertip grip keeps the wrist loose until the final moment of release, allowing a full snap that generates backspin and velocity together. Sandy Koufax, one of the hardest throwers of his era, famously gripped the ball so lightly it was almost a fingertip press.",
        },
        {
          id: "baseball-6-01-q2",
          type: "Spin Rate / Magnus Effect",
          challenge: `  Two pitchers both throw 94 mph.
  Pitcher A: 2,600 rpm spin rate
  Pitcher B: 1,900 rpm spin rate

  Pitcher A gets more swing-and-miss at
  the top of the zone. Pitcher B's fastball
  gets hit hard when elevated.

  Why does spin rate create such a different
  outcome at the same velocity?`,
          text: "How does spin rate determine whether a four-seam fastball is an effective weapon at the top of the zone?",
          options: [
            "Higher spin rate slows the ball down earlier, making it harder to time",
            "Higher spin rate creates stronger Magnus Effect backspin force, making the ball drop less than expected — hitters swing under it",
            "Spin rate affects movement direction but not the perceived rise effect",
            "Lower spin is better for fastballs because it creates less air resistance",
          ],
          correctIndex: 1,
          explanation: "A 94-mph fastball drops about 2.5 feet between release and the plate due to gravity. With 2,600 rpm of backspin, the Magnus Effect counteracts much of that drop — the ball only falls 1.5 feet, arriving a foot higher than a hitter's mental model predicted. This perceptual rise causes the hitter to swing under the ball. At 1,900 rpm, the Magnus Effect is weaker, the ball drops more as expected, and hitters make solid contact. Spin rate is why two identical velocities can produce completely different outcomes at the same location.",
        },
        {
          id: "baseball-6-01-q3",
          type: "Arsenal Strategy",
          challenge: `  You are a 15-year-old pitcher throwing
  82 mph. Your coach suggests throwing
  your four-seam fastball 65% of the time
  in the first inning to "establish" it —
  even if hitters are sitting on fastball.

  Why establish the fastball when hitters
  know it's coming?`,
          text: "Why do pitchers deliberately throw high fastball percentages early in games even when hitters expect it?",
          options: [
            "It is a mistake — if hitters know the fastball is coming, throw off-speed first to surprise them",
            "Establishing fastball velocity forces hitters to set their timing to your speed, making slower pitches more disorienting later",
            "High fastball percentage is only effective for pitchers throwing 95+ mph — below that, it backfires",
            "First-inning fastball percentage is irrelevant — pitch selection doesn't matter until the third inning",
          ],
          correctIndex: 1,
          explanation: "Hitters set their internal timing clock based on what they see early. If you establish 82 mph early in the game, hitters lock in on that tempo. When you throw a 70-mph curveball in the third inning, it arrives 12 mph slower than their timing expects — their brain says 'now' but the ball hasn't arrived yet. This is why off-speed pitches are measured in differential from the fastball, not absolute velocity. The fastball sets the reference point every other pitch exploits.",
        },
        {
          id: "baseball-6-01-q4",
          type: "Location",
          challenge: `  A Dodger pitching coach tells a young
  starter: "The four-seamer up in the zone
  is your strikeout pitch. Your four-seamer
  down in the zone is your get-me-out pitch.
  Don't confuse the two locations."

  What is the difference in outcome between
  an elevated and a low four-seamer?`,
          text: "Why does the four-seam fastball perform so differently when elevated versus thrown low in the zone?",
          options: [
            "There is no meaningful difference — fastball location is about command, not pitch type outcome",
            "Elevated four-seamers exploit the rise effect and swing-and-miss; low four-seamers lose that advantage and become hittable strikes",
            "Low four-seamers are better because they work like sinkers and generate ground balls",
            "Elevated fastballs are only effective at 95+ mph — below that, low four-seamers are superior",
          ],
          correctIndex: 1,
          explanation: "The four-seam fastball's rise effect is most pronounced at the top of the zone, where the ball's perceived upward movement relative to the hitter's eye line creates a swing plane mismatch — hitters swing under it. When a four-seamer is thrown low in the zone, the rise effect is below the hitter's vision center, it loses its deceptive advantage, and hitters can attack it on a flatter swing plane with more margin. Many hard-hit balls off four-seamers are ones thrown at the belt or below rather than at the letters. Elevate the heater.",
        },
      ],
    },
  },

  // ─── baseball-6-02: Two-Seam Fastball and Sinker ─────────────────────────────
  {
    epochId: "baseball-6",
    wonder: {
      name: "Camelback Ranch — Dodgers Spring Training",
      location: "Glendale, Arizona",
      era: "Modern",
      emoji: "🏜️",
    },
    id: "baseball-6-02",
    order: 2,
    title: "Two-Seam Fastball and Sinker",
    subtitle: "Tailing action, ground balls, and grip science",
    category: "sports",
    xp: 80,
    badge: { id: "baseball-6-badge-02", name: "Ground Ball", emoji: "⬇️" },
    challengeType: "quiz",
    info: {
      tagline: "The two-seamer doesn't miss bats — it misses barrels. When hitters make contact, the ball goes into the ground.",
      year: 2015,
      overview: [
        "The two-seam fastball grips the ball along (rather than across) the narrow seam gap — the two seams that run parallel on one side of the ball. The index and middle fingers are placed on or just inside the two narrow seams, with the thumb underneath. This alignment changes the seam orientation during flight, creating sidespin alongside backspin. The result is a pitch that tails toward the pitcher's arm side (down and in on a right-handed hitter from a right-handed pitcher) and drops more than a four-seamer.",
        "The sinker is a related pitch — sometimes considered a variant of the two-seamer, sometimes taught as a distinct pitch. Both share the tailing, sinking action, but the sinker is thrown with slightly more deliberate downward pressure at release to maximize the sinking action at the expense of pure velocity. The sinker is the ground-ball machine of the pitching world: when thrown to the lower half of the strike zone, it generates weak contact on the upper half of the ball, producing rolling grounders to infielders.",
        "Trevor Bauer, who pitched for the Dodgers in 2021, became one of baseball's most public advocates for grip experimentation. Bauer extensively documented his efforts to artificially increase his two-seamer's spin rate and movement using grip changes, noting that even small adjustments in finger placement — shifting one millimeter along the seam — could meaningfully change ball movement. His work helped normalize the idea of pitchers as scientists of their own grips.",
      ],
      technical: {
        title: "Two-Seam vs. Four-Seam — The Grip Difference",
        body: [
          "The critical difference between a two-seamer and a four-seamer is seam orientation and the resulting spin axis. A four-seamer has pure backspin — the spin axis is horizontal, perpendicular to the direction of travel. A two-seamer has a tilted spin axis — some backspin, some sidespin — because the fingers are aligned along rather than across the seam. This tilted axis creates the Magnus Effect in multiple directions: some ride (backspin component) and some tail (sidespin component).",
          "Arm-side run is the defining movement characteristic of the two-seamer. For a right-handed pitcher throwing to a right-handed batter, the ball tails inward and downward, sawing off the hitter's bat handle and producing weak contact. For a right-handed pitcher facing a left-handed hatter, it runs away and down into the outside corner — generating weak grounders or strikeouts chasing. This is why pitchers who face a lineup of same-handed hitters particularly love the two-seamer.",
        ],
        codeExample: {
          label: "Two-Seam vs. Four-Seam Grip and Outcome",
          code: `  FOUR-SEAM GRIP:
  → Fingers ACROSS the horseshoe seam
  → Pure backspin on rotation
  → Spin axis: horizontal (12-to-6 o'clock)
  → Movement: minimal, straight with rise effect

  TWO-SEAM GRIP:
  → Fingers ALONG the narrow seam gap
  → Mixed spin: backspin + sidespin
  → Spin axis: tilted (11-to-5 o'clock typical)
  → Movement: tails arm-side, drops more

  SINKER (variant):
  → Similar grip, more downward finger pressure
  → Maximizes sink, slight velocity reduction
  → Spin axis: flatter — more tail, more drop
  → Goal: hit the top half of the ball → grounder

  OUTCOME COMPARISON (right-handed pitcher):
  4-Seam: up in zone → swing-and-miss
  2-Seam: down and in on RHH → weak contact
  Sinker: bottom of zone → 55%+ ground ball rate

  BAUER GRIP EXPERIMENT (2021):
  → Micro-shift along seam → +80 rpm spin
  → Documented publicly — grip science goes mainstream`,
        },
      },
      incident: {
        title: "Trevor Bauer's Grip Experiments — The Science of the Two-Seamer",
        when: "2021 — Trevor Bauer pitching for the Los Angeles Dodgers",
        where: "Camelback Ranch, Glendale, Arizona / Dodger Stadium",
        impact: "Trevor Bauer's public documentation of his grip experiments during his time with the Dodgers brought grip science into mainstream pitching instruction. His willingness to share spin data, grip adjustments, and movement profiles helped coaches and players at all levels understand that pitch movement is controllable — not just a product of natural ability.",
        body: [
          "In 2021, Bauer was perhaps the most analytically sophisticated pitcher in baseball. During his spring training at Camelback Ranch, he worked with Rapsodo devices to measure how tiny grip changes on his two-seamer affected spin rate and movement. Moving his index finger inward by just a few millimeters along the seam produced meaningfully different spin axis readings, and those axis changes translated directly to different ball movement profiles at the plate.",
          "Bauer's work helped codify a principle now taught at Camelback Ranch during Dodger spring training: grip is a precision skill, not just 'hold it this way.' Pitchers are now encouraged to experiment with small grip variations and measure the results on Rapsodo rather than relying on feel alone. The lesson is that a pitcher's natural two-seamer is a starting point — the final grip is the one that produces the most movement for that specific pitcher's hand size, finger length, and arm action.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Two-Seam Grip", sub: "fingers along narrow seam gap", type: "system" },
          { label: "Tilted Spin Axis", sub: "backspin + sidespin combined", type: "attacker" },
          { label: "Arm-Side Run", sub: "tails down and in to same-side hitter", type: "victim" },
          { label: "Weak Contact", sub: "broken bats, grounders, jammed hitters", type: "result" },
        ],
      },
      timeline: [
        { year: 1980, event: "Two-seam fastball becomes a named pitch category in MLB scouting vocabulary" },
        { year: 2001, event: "Mariano Rivera's cut-fastball dominance draws attention to seam-based pitch manipulation" },
        { year: 2015, event: "Statcast begins tracking movement profiles for two-seamers vs. four-seamers across all MLB parks", highlight: true },
        { year: 2019, event: "Sinker usage drops to a 20-year low as spin-rate revolution favors four-seamers and high-rpm pitches" },
        { year: 2021, event: "Trevor Bauer publicly documents grip experiments at Camelback Ranch — grip science mainstream", highlight: true },
        { year: 2024, event: "Dodger staff uses Rapsodo grip testing for every minor league pitcher in spring training" },
      ],
      keyTakeaways: [
        "Two-seam grip places fingers along (not across) the narrow seam gap, creating sidespin that tails arm-side",
        "The sinker is a variant emphasizing downward pressure at release to maximize sinking action and ground ball rate",
        "Two-seamers induce weak contact by sawing off the bat handle — the goal is grounders, not strikeouts",
        "Grip experimentation (Bauer's contribution) proved that tiny finger adjustments meaningfully change spin axis and movement",
      ],
      references: [
        { title: "Baseball Savant: Sinker Movement Data", url: "https://baseballsavant.mlb.com" },
        { title: "Rapsodo: Two-Seam Spin Axis Analysis", url: "https://rapsodo.com/baseball" },
        { title: "Fangraphs: Sinker Usage Trends", url: "https://www.fangraphs.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-6-02-q1",
          type: "Grip Science",
          challenge: `  A right-handed pitcher throws a two-seam
  fastball to a right-handed hitter. The
  pitch hits the batter on the hands, breaks
  his bat, and produces a dribbler to third.

  A teammate says: "That was bad location —
  you hit him."

  The pitching coach says: "That was perfect."

  Who is right, and why?`,
          text: "Why is a two-seam fastball that jams a same-side hitter on the hands considered ideal execution?",
          options: [
            "The teammate — hitting a batter on the hands is uncontrolled, regardless of outcome",
            "The pitching coach — the two-seamer's purpose is to tail in on same-side hitters, breaking their swing and producing weak contact",
            "Neither — a broken-bat grounder is a result of hitter error, not pitcher skill",
            "The pitching coach, but only because it was a ground ball — a jam-shot single would be a failure",
          ],
          correctIndex: 1,
          explanation: "The two-seamer's entire design is to tail in on same-side hitters — a right-on-right matchup where the ball runs toward the hitter's hands. When it works perfectly, the batter cannot get the fat part of the bat on it; they hit it off the thin handle, producing a broken bat or a badly mis-hit ball that becomes an easy out. This is called 'getting jammed.' The pitch didn't miss — it executed exactly its intended movement pattern. The pitching coach recognizes outcome quality; the teammate sees only process aesthetics.",
        },
        {
          id: "baseball-6-02-q2",
          type: "Four-Seam vs. Two-Seam",
          challenge: `  You are pitching in a game where the
  infield is terrible at catching fly balls
  and pop-ups. The outfield is strong.
  You have both a four-seamer and a sinker
  in your arsenal.

  Which pitch type should you favor in
  this game, and why?`,
          text: "How should pitch selection account for defensive context behind the pitcher?",
          options: [
            "Four-seamer — fly balls go to the outfield, which is strong, and strikeouts avoid defense entirely",
            "Sinker — ground balls go to the infield regardless of quality, and you want to avoid relying on an outfield defense",
            "It doesn't matter — pitch selection should never account for defensive alignment",
            "Sinker — ground balls always produce outs at a higher rate than fly balls regardless of defense quality",
          ],
          correctIndex: 0,
          explanation: "If your infield is weak and your outfield is strong, you want balls in the air — not on the ground. A four-seamer elevated in the zone produces swing-and-miss (strikeouts avoid defense entirely) and fly balls your outfielders can handle. Throwing sinkers in this context sends balls directly to your weakest defenders. Pitcher strategy includes awareness of the defense behind you. The best pitch-to-contact is one that sends balls to your best defenders.",
        },
        {
          id: "baseball-6-02-q3",
          type: "Sinker Mechanics",
          challenge: `  You grip and throw your sinker the same
  way every time, but some days it sinks
  sharply and other days it stays flat
  and gets hit hard.

  Your Rapsodo data shows your spin rate
  is identical on both days, but the spin
  AXIS changes.

  What is causing the flat days?`,
          text: "Why can identical spin rate produce different sinker movement based on spin axis angle?",
          options: [
            "Spin rate is the only variable that determines movement — identical spin rate means identical movement",
            "A shifted spin axis reduces the component of spin contributing to downward Magnus force — less sink despite same total rpm",
            "The flat days are caused by fatigue reducing finger pressure, not spin axis",
            "Rapsodo spin axis data is unreliable on cold days — the readings should be ignored",
          ],
          correctIndex: 1,
          explanation: "Total spin rate tells you how fast the ball rotates, but spin axis tells you in which direction that rotation pushes the air — and therefore the ball. A sinker needs the spin axis oriented to maximize downward Magnus Force. If the axis shifts even slightly (often from subconscious grip or wrist changes), the same rpm now creates more gyroscopic spin (which produces no movement) and less movement-generating spin. This is the 'active spin' principle: a sinker with 95% active spin at 2,100 rpm generates more movement than one with 70% active spin at 2,100 rpm.",
        },
        {
          id: "baseball-6-02-q4",
          type: "Sequencing",
          challenge: `  You've thrown three consecutive sinkers to
  a hitter, all down in the zone. The hitter
  has adjusted — they're staying low and
  making good contact on the third pitch.

  Your catcher signals for another sinker.

  What is the better call, and why?`,
          text: "Why does pitch sequencing require changing pitch type or location after a hitter has adjusted?",
          options: [
            "Throw the sinker again — the pitch is working and you should stay with what works",
            "Change the sequence — go up in the zone with a four-seamer or throw an off-speed pitch to reset the hitter's timing",
            "Throw harder on the next sinker — velocity change within the same pitch type is enough",
            "Only change if the catcher says to — the catcher has full authority on sequencing decisions",
          ],
          correctIndex: 1,
          explanation: "After three identical pitches, even a mediocre hitter has adapted their swing path and timing. The sinker's effectiveness came from establishing a pattern and then breaking it — not from repeating it indefinitely. Going up in the zone with a four-seamer disrupts the hitter's adjusted low-ball approach, and the rise effect at the top of the zone is the opposite of what they've been preparing for. Alternatively, an off-speed pitch resets the timing clock entirely. The best pitchers think in sequences, not individual pitches.",
        },
      ],
    },
  },

  // ─── baseball-6-03: The Changeup ─────────────────────────────────────────────
  {
    epochId: "baseball-6",
    wonder: {
      name: "Dodger Stadium — Bullpen Mound",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "🎭",
    },
    id: "baseball-6-03",
    order: 3,
    title: "The Changeup",
    subtitle: "Arm speed deception, speed differential, and youth development",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-6-badge-03", name: "Deception", emoji: "🎭" },
    challengeType: "quiz",
    info: {
      tagline: "The changeup is the great equalizer — throw it with fastball arm speed and watch the hitter's timing fall apart.",
      year: 1995,
      overview: [
        "The changeup is widely considered the most important off-speed pitch in baseball, and the single most important secondary pitch for developing pitchers to learn. Its effectiveness comes entirely from deception: the arm speed, arm angle, and release point are identical to the fastball. The only difference is velocity — the changeup arrives 10–15 mph slower than the pitcher's fastball. When a hitter's brain processes 'fastball arm action,' it commits to fastball timing. When the ball arrives late, the hitter is already swung through.",
        "The three primary changeup grips produce slightly different movement profiles. The circle changeup is the most common: the thumb and index finger form a circle on the side of the ball, and the remaining three fingers spread across the top. This grip reduces velocity through drag while maintaining arm speed. The palmball grips the ball deep in the palm with all fingers wrapped around it — more velocity reduction, but harder to maintain fastball arm speed without telegraphing. The vulcan changeup splits the middle and ring fingers around the ball's equator, producing a tumbling action with late fade.",
        "Speed differential is the key measurement. A 10–15 mph difference between fastball and changeup is optimal — enough to disrupt timing, not so extreme that the hitter can identify it early. For a youth pitcher throwing 72 mph, a changeup at 58–62 mph is ideal. For an MLB starter at 94 mph, a changeup at 80–84 mph is the target. Kenley Jansen, the Dodgers' longtime closer, mixed his elite cut fastball with a changeup specifically to keep same-side left-handed hitters off-balance after building a career on the cutter alone.",
      ],
      technical: {
        title: "Arm Speed Deception — Why the Changeup Works",
        body: [
          "The brain processes visual information about pitch speed through multiple cues: arm speed at release, hand angle, wrist snap, and the initial trajectory of the ball. When a pitcher's arm speed is identical on the fastball and changeup, the brain misreads the pitch and sets the body's timing for a faster arrival. The swing is triggered early — the hips fire, the hands release — and by the time the ball actually arrives, the hitter is already past the optimal contact point. This is why off-speed artists say 'let them beat themselves.'",
          "The most common mistake young pitchers make is slowing their arm down when throwing a changeup — an unconscious adjustment that telegraphs the pitch before the ball leaves the hand. Advanced hitters can detect arm slowdown visually from the on-deck circle and will sit on the changeup. The cure: throw the changeup with aggressive fastball intent, and let the grip do all the velocity reduction work. If you think 'slow' while throwing it, your arm will slow.",
        ],
        codeExample: {
          label: "Changeup Grip Comparison — Circle, Palmball, Vulcan",
          code: `  CIRCLE CHANGEUP (most common):
  → Thumb + index finger form circle on side
  → Middle, ring, pinky fingers across top
  → Held off-center — creates fade and tumble
  → Velocity reduction: 10–15 mph from fastball
  → Movement: fades arm-side and downward

  PALMBALL:
  → Ball gripped deep in palm, all fingers wrapped
  → More velocity reduction (15–20 mph)
  → Risk: arm slowdown easier to telegraph
  → Best for pitchers with large hands

  VULCAN CHANGEUP:
  → Middle and ring fingers split across equator
  → Creates tumbling spin — unpredictable action
  → Hard to command — high ceiling, high floor

  OPTIMAL SPEED DIFFERENTIAL:
  Fastball 94 mph → Changeup 80–84 mph ✓
  Fastball 72 mph → Changeup 58–62 mph ✓
  Gap < 8 mph → Too similar, easy to adjust
  Gap > 20 mph → Identifiable too early

  ARM SPEED RULE:
  → Throw ALL changeups with fastball arm speed
  → Grip creates velocity reduction — not arm
  → If arm slows: hitter reads it before release`,
        },
      },
      incident: {
        title: "Kenley Jansen's Changeup — Expanding Beyond the Cutter",
        when: "2017–2022 — Kenley Jansen, Los Angeles Dodgers Closer",
        where: "Dodger Stadium Bullpen, Los Angeles, California",
        impact: "Kenley Jansen built one of the most dominant closer careers in Dodger history almost entirely on a single pitch: the cut fastball. When left-handed hitters began timing his cutter in the 2017–2019 period, the Dodgers worked with Jansen to develop a changeup to keep them off-balance — demonstrating how adding even one secondary pitch can rescue a career.",
        body: [
          "Kenley Jansen's cutter was so good — 93–94 mph with elite lateral movement — that it dominated for years against both left-handed and right-handed hitters. But advanced advance scouting eventually revealed that left-handed hitters could anticipate the cutter's arm-side fade and sit on it middle-away. His 2017 World Series performance showed vulnerability against left-handed hitters, and the Dodgers' pitching staff worked to add a changeup to his arsenal.",
          "The changeup gave Jansen a same-speed-different-movement option against lefties: instead of seeing two identical-looking pitches with slightly different break, they now faced a pitch that arrived 12 mph slower with a different flight path. Jansen's changeup was never a put-away pitch — but it forced hitters to consider two possibilities rather than one, making his cutter more effective again. The lesson: sometimes a secondary pitch doesn't need to be dominant; it just needs to exist convincingly enough to affect the hitter's approach.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Fastball Arm Speed", sub: "identical release and mechanics", type: "system" },
          { label: "Grip Slows Ball", sub: "drag from off-center grip", type: "attacker" },
          { label: "Hitter Times Fastball", sub: "brain triggered early by arm speed", type: "victim" },
          { label: "Swing-and-Miss / Weak Contact", sub: "10–15 mph too slow", type: "result" },
        ],
      },
      timeline: [
        { year: 1970, event: "Changeup becomes standardized as the primary third pitch taught in professional development" },
        { year: 1995, event: "Pedro Martinez's circle changeup becomes the benchmark — 15 mph differential at 90+ mph", highlight: true },
        { year: 2005, event: "Johan Santana's changeup dominance reignites focus on grip mechanics in youth instruction" },
        { year: 2015, event: "Rapsodo begins measuring changeup fade and tumble as distinct movement profiles" },
        { year: 2019, event: "Dodgers staff works with Jansen on changeup to counter left-handed lineup strategies", highlight: true },
        { year: 2024, event: "Youth pitching programs universally teach changeup before slider or curveball for health and development" },
      ],
      keyTakeaways: [
        "Arm speed must be identical to the fastball — the grip does all the velocity reduction work",
        "10–15 mph speed differential is optimal: enough to disrupt timing, not so extreme it is identifiable early",
        "Circle changeup is the most teachable grip — thumb-and-index circle, three fingers across the top",
        "Even an imperfect changeup changes the hitter's mental equation, making the fastball more effective",
      ],
      references: [
        { title: "Baseball Savant: Changeup Movement Profiles", url: "https://baseballsavant.mlb.com" },
        { title: "MLB: Kenley Jansen Pitch Arsenal Analysis", url: "https://www.mlb.com/dodgers" },
        { title: "Rapsodo: Changeup Speed Differential Data", url: "https://rapsodo.com/baseball" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-6-03-q1",
          type: "Deception Mechanics",
          challenge: `  You throw a changeup, but the hitter
  recognizes it early and sits on it for
  a hard single. Your catcher tells you:
  "Your arm slowed down on that pitch —
  I could see it from behind the plate."

  What is the fix, and why is arm slowdown
  so damaging to a changeup?`,
          text: "Why does arm slowdown telegraph a changeup, and what is the correct mechanical fix?",
          options: [
            "Arm slowdown is normal — the grip can't reduce velocity enough on its own, so some arm deceleration is necessary",
            "Arm slowdown gives the hitter a visual cue before the ball leaves the hand — throw with full fastball intent and let the grip slow the ball",
            "Arm slowdown only affects velocity, not movement — the hitter was guessing changeup regardless",
            "The fix is a deeper grip, not arm speed — the grip change will eliminate the need for arm deceleration",
          ],
          correctIndex: 1,
          explanation: "A hitter in the batter's box is watching the pitcher's entire delivery for any difference from pitch to pitch. Arm slowdown is one of the most visible tells — even a 10% reduction in arm speed at release is detectable by experienced hitters through peripheral vision and timing instinct. If the arm slows, the brain says 'off-speed coming' and the hitter waits. The circle changeup and similar grips are specifically designed so that the pitcher can throw with fastball aggression and the grip's drag and off-center pressure create velocity reduction automatically. Throw it as hard as you can — the pitch handles the rest.",
        },
        {
          id: "baseball-6-03-q2",
          type: "Speed Differential",
          challenge: `  A youth pitcher throws a 68-mph fastball.
  His "changeup" is 64 mph — only 4 mph slower.
  Hitters are adjusting to it easily.

  What speed differential does he need,
  and why is 4 mph insufficient?`,
          text: "Why is a 4 mph speed differential between fastball and changeup ineffective, and what is the target?",
          options: [
            "4 mph is fine for youth pitchers — hitters at that level cannot detect small speed differences",
            "4 mph is too small — hitters can adjust mid-swing by 4 mph easily; a 10–15 mph gap is needed to force an irrecoverable timing commitment",
            "Speed differential doesn't matter — the movement profile of the changeup is what creates deception",
            "4 mph is actually too large — a 2 mph differential is harder to detect and more effective",
          ],
          correctIndex: 1,
          explanation: "Biomechanics research shows that a hitter can adjust their swing timing by 5–6 mph after pitch identification — they can slow down or speed up their hip rotation slightly. A 4 mph changeup effectively falls within this adjustment window. At 10–15 mph slower, however, the hitter has already committed their hips before the ball arrives, and they cannot slow down fast enough to make solid contact. The 10–15 mph gap creates an irrecoverable early commitment — which is the entire point of the changeup. A 64 mph changeup from a 68 mph fastball arm is just a slightly slower fastball.",
        },
        {
          id: "baseball-6-03-q3",
          type: "Pitch Selection",
          challenge: `  It's a 3-2 count, full count, runner on
  second base. You're a youth pitcher.
  You have a good fastball and a developing
  changeup. Your catcher signals changeup.

  Your coach later says:
  "Good call — full count, two outs, throw
  the changeup." Why would a coach encourage
  a changeup in a full count?`,
          text: "Why is a full-count changeup with a runner on base a tactically sophisticated call?",
          options: [
            "It isn't — a full count always calls for a fastball because you need to throw a strike",
            "The hitter expects a fastball in a full count — a changeup exploits that expectation when a hitter is most committed to swinging",
            "A changeup at 3-2 is only smart if the pitcher has thrown five changeups earlier in the at-bat",
            "Full-count changeups are only effective against left-handed hitters",
          ],
          correctIndex: 1,
          explanation: "The full count is actually an ideal changeup situation precisely because every hitter and every baserunner expects fastball. The runner will be going on the pitch; the hitter knows they cannot take a close pitch. Both have committed their timing to fastball velocity. A well-executed changeup in this scenario catches the hitter lunging, produces a weak swing-and-miss or poor contact, and demonstrates the highest level of pitching intelligence — throwing the least expected pitch in the most 'obvious' fastball count.",
        },
        {
          id: "baseball-6-03-q4",
          type: "Youth Development",
          challenge: `  A 12-year-old pitcher is asking his coach
  whether to learn a curveball or a
  changeup next.

  The coach recommends the changeup first.

  What is the reasoning, from both a
  development and arm health perspective?`,
          text: "Why do pitching development programs universally recommend the changeup before the curveball for young pitchers?",
          options: [
            "Curveballs are illegal in youth baseball — that is why changeups are taught first",
            "The changeup uses fastball arm action and grip — no new stress on the elbow — while the curveball introduces wrist torque that can injure developing growth plates",
            "Changeups are easier to throw for strikes — the learning curve is shorter",
            "The curveball requires 90+ mph fastball velocity to be effective, so it should wait until high school",
          ],
          correctIndex: 1,
          explanation: "The changeup is the ideal second pitch for young pitchers because it uses identical arm action to the fastball — no new mechanical stress is introduced to still-developing elbows and shoulders. The velocity reduction comes from the grip, not the arm. The curveball, by contrast, requires a deliberate pronation and snap that applies torque to the elbow — specifically the UCL, which is still developing through the growth plate years (12–16). The American Sports Medicine Institute recommends changeups as a safe second pitch while suggesting curveballs wait until physical maturity around 13–14.",
        },
      ],
    },
  },

  // ─── baseball-6-04: The Curveball ────────────────────────────────────────────
  {
    epochId: "baseball-6",
    wonder: {
      name: "Dodger Stadium — The Mound (Kershaw's Office)",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "🌊",
    },
    id: "baseball-6-04",
    order: 4,
    title: "The Curveball",
    subtitle: "12-6 break, knuckle curve, spin axis, and when to learn it",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-6-badge-04", name: "El Diablo", emoji: "😈" },
    challengeType: "quiz",
    info: {
      tagline: "Clayton Kershaw's curveball didn't just end at-bats — it ended entire lineups' confidence.",
      year: 2011,
      overview: [
        "The curveball is the most dramatic pitch in baseball — a ball that appears to be heading for the middle of the plate and then drops precipitously into the dirt, catching hitters in the most embarrassing of positions: fully extended on a swing a foot above where the ball actually crossed home plate. Its physics are the inverse of the four-seamer: instead of backspin fighting gravity, the curveball generates topspin, which adds to gravity and creates a downward Magnus Effect that accelerates the ball's drop.",
        "The 12-to-6 curveball (named for the direction of a clock face) drops straight downward — the ideal plane for a high-to-low breaking ball that starts at the belt and finishes at the knees or in the dirt. The 11-to-5 curveball (or 10-to-4) has both downward and lateral movement — it sweeps away from same-side hitters while dropping. The knuckle curveball grips the ball with the index finger's knuckle on the seam rather than the fingertip, producing tighter topspin and a sharper, later break.",
        "Youth pitchers should wait until approximately age 13–14 before throwing curveballs regularly — specifically when the growth plates in the elbow are approaching closure. The American Sports Medicine Institute's research, led by Dr. James Andrews, found that early curveball throwing (before age 13) correlates with significantly higher rates of elbow injury later in the career. Clayton Kershaw's 'El Diablo' — his 12-6 hammer curveball — is the benchmark: thrown with the same arm speed and release point as his fastball, it drops up to 20 inches vertically from release to plate.",
      ],
      technical: {
        title: "Topspin Physics — Why the Curveball Drops",
        body: [
          "The curveball's topspin creates a Magnus Effect opposite to the four-seamer. With topspin, the rotating ball pulls air downward off its top surface — and the reaction force pushes the ball downward, in addition to gravity. A well-thrown curveball experiences up to 30% more downward force than an untouched ball in free fall would from gravity alone. This creates the dramatic drop that makes it look like the ball 'falls off a table' rather than following a gradual arc.",
          "Spin axis is the most important variable for curveball movement. A perfectly vertical spin axis (12-to-6 rotation) creates pure downward movement — the ideal 12-6 break. A tilted axis creates a diagonal break — 11-5 or 1-7 depending on the direction. The tighter the spin (more revolutions per minute with a pure topspinning axis), the sharper the break at the end of the ball's flight. This is why the knuckle curve often produces later, sharper break than the standard grip — the knuckle contact point creates a different seam orientation that can generate more efficient topspin.",
        ],
        codeExample: {
          label: "Curveball Grip Variants and Break Profiles",
          code: `  STANDARD CURVEBALL:
  → Middle finger on top seam, index alongside
  → Thumb underneath on bottom seam
  → Snap downward through release (pronation)
  → Spin axis: ~12-to-6 o'clock
  → Break: primarily downward, 10–20 inches

  KNUCKLE CURVEBALL:
  → Index finger bent — knuckle contacts seam
  → Middle finger across top seam
  → Tighter topspin → sharper, later break
  → Harder to command — high upside

  11-TO-5 / SLURVY CURVE:
  → Release tilted laterally
  → Breaks diagonally — down AND away
  → More lateral sweep, less pure drop
  → Effective against opposite-hand hitters

  BREAK MEASUREMENT (Statcast):
  Average MLB curve: 12–17 inches drop
  Elite (Kershaw): 18–22 inches vertical drop
  Horizontal: 0–8 inches depending on axis

  AGE GUIDELINES (ASMI Recommendation):
  → Before 13: Avoid curveballs — growth plate risk
  → Age 13–14: Begin carefully, low volume
  → Age 15+: Full development with proper mechanics
  → Focus: arm speed and release point = fastball`,
        },
      },
      incident: {
        title: "Kershaw's El Diablo — The Most Famous Curveball in Dodger History",
        when: "2011–2019 — Clayton Kershaw at his peak, Los Angeles Dodgers",
        where: "Dodger Stadium, Los Angeles, California",
        impact: "Clayton Kershaw's 12-6 curveball, nicknamed 'El Diablo' by teammates and opponents alike, was responsible for a disproportionate number of his 2,725 career strikeouts. In his Cy Young Award seasons, it was the strikeout pitch that complemented his four-seam fastball like no breaking ball in a generation — a brutal combination of elite velocity and elite depth.",
        body: [
          "Kershaw's curveball was unique for several reasons. First, his spin axis was almost perfectly vertical — an exceptionally rare 12-to-6 break that fell straight down rather than diagonally. Second, he threw it with identical arm speed and release point as his fastball, making it nearly impossible to identify until the break occurred. Third, his spin rate on the curveball was consistently above 2,800 rpm — elite even by MLB standards — which created the sharp, late drop that earned it its nickname.",
          "During his 2014 MVP and Cy Young season — arguably the greatest single pitching season in the last three decades — Kershaw's curveball whiff rate was above 50%. Hitters swung and missed on more than half their swings against it. The pitch was so effective that opposing hitters admitted to beginning their at-bat already mentally weakened by knowing it was coming. 'El Diablo' was not just a pitch; it was a psychological weapon. Youth coaches who study Kershaw note that the arm speed deception is the learnable element — the break depth comes from that.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Topspin Grip", sub: "middle finger over seam, snap down", type: "system" },
          { label: "Topspin Magnus Effect", sub: "spin adds to gravity — accelerates drop", type: "attacker" },
          { label: "Hitter Reads Fastball", sub: "identical release point deceives", type: "victim" },
          { label: "Drop Below Swing", sub: "20+ inch vertical break", type: "result" },
        ],
      },
      timeline: [
        { year: 1900, event: "Curveball formally documented — Candy Cummings credited with inventing it in the 1870s" },
        { year: 1955, event: "Sandy Koufax begins developing his curveball at age 19 — becomes one of the greatest ever thrown" },
        { year: 1966, event: "Koufax's final season — his curve-fastball combination produces a 1.73 ERA across 323 innings", highlight: true },
        { year: 2011, event: "Kershaw's El Diablo reaches full dominance — 50%+ whiff rate in 2014 season", highlight: true },
        { year: 2018, event: "ASMI guidelines on curveballs for youth pitchers become standard in Little League coaching education" },
        { year: 2024, event: "Next-generation Dodger pitchers (Yamamoto, Gavin Stone) carry on the curveball tradition at Dodger Stadium" },
      ],
      keyTakeaways: [
        "Curveball topspin adds to gravity via Magnus Effect — well-thrown curves drop 10–22 inches vertically",
        "12-to-6 break is the purest downward break; 11-to-5 breaks diagonally — both are effective with different matchup applications",
        "Match arm speed and release point to the fastball — the break happens from spin, not from any telegraphing motion",
        "Age 13–14 is the guideline to begin curveball development; earlier use correlates with elbow injury risk",
      ],
      references: [
        { title: "Baseball Savant: Kershaw Curveball Movement Data", url: "https://baseballsavant.mlb.com" },
        { title: "ASMI: Youth Pitching Safety Guidelines", url: "https://www.asmi.org/research.php?title=baseball" },
        { title: "Dodgers: Clayton Kershaw Career Pitch Analysis", url: "https://www.mlb.com/dodgers" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-6-04-q1",
          type: "Physics",
          challenge: `  A young pitcher asks why his curveball
  "doesn't break" compared to MLB pitchers
  they see on TV.

  The ball spins, it goes in the right
  direction — but it just arcs slowly
  instead of snapping sharply.

  What is the most likely cause?`,
          text: "Why do curveballs with the correct direction of spin still produce a slow, looping arc instead of a sharp break?",
          options: [
            "Young pitchers' smaller hands cannot apply sufficient grip pressure — hand size is the limiting factor",
            "Low spin rate means weak Magnus Effect force — the ball follows a gradual gravity arc rather than an accelerated downward snap",
            "A looping curveball is actually more effective than a sharp one — hitters have more time to swing and miss",
            "The arc is caused by releasing the ball too early — earlier release creates sharper break",
          ],
          correctIndex: 1,
          explanation: "A slow, looping curveball (sometimes called a 'hanger' or 'cement mixer') is almost always a spin rate problem. The Magnus Effect's downward force is proportional to spin rate — more rpm means more force added to gravity, meaning the ball breaks sharper and later. Low spin rate means the ball mostly just follows gravity's natural arc, which experienced hitters can time and drive. The goal is to generate maximum efficient topspin (high rpm, vertical axis) so the break is sharp, late, and unpredictable. Finger snap and wrist rotation speed at release are the physical levers.",
        },
        {
          id: "baseball-6-04-q2",
          type: "Age Guidelines",
          challenge: `  A 12-year-old pitcher has a natural
  feel for curveball grip and wants to
  start throwing it in games. His parents
  say "if it feels natural, let him."

  His pitching coach says to wait one more
  year and develop the changeup instead.

  Who is right, and on what basis?`,
          text: "Why should youth pitchers wait until approximately age 13–14 before throwing curveballs, even if the grip feels natural?",
          options: [
            "The parents are right — if the grip is natural, the mechanics are safe regardless of age",
            "The coach is right — growth plates in the elbow are still developing at 12, and curveball torque correlates with injury risk regardless of grip feel",
            "The coach is right — curveballs are ineffective at youth velocities anyway, so there is no developmental benefit until velocity increases",
            "The parents are right — the ASMI guidelines only apply to pitchers who already have elbow pain",
          ],
          correctIndex: 1,
          explanation: "The American Sports Medicine Institute's research found that the curveball generates significant torque on the medial elbow — specifically stressing the UCL and the growth plate (physis) at the medial epicondyle. At age 12, this growth plate has not yet closed and is vulnerable to stress injury. 'Feels natural' describes grip comfort, not biomechanical safety. The changeup produces no additional torque on the elbow because it uses fastball arm mechanics. This is why the guideline is age-based (13–14), not comfort-based — physiology, not feel, determines readiness.",
        },
        {
          id: "baseball-6-04-q3",
          type: "Kershaw / Deception",
          challenge: `  Kershaw's El Diablo curveball is famous for
  its deception. Hitters know it's coming —
  Kershaw throws it in obvious breaking-ball
  counts — yet they still can't hit it.

  If hitters expect the curveball, why is
  Kershaw's so much harder to handle than
  a predictable breaking ball?`,
          text: "What makes Kershaw's curveball effective even when hitters are anticipating it?",
          options: [
            "Kershaw's curveball is only effective as a surprise pitch — expecting it would make it hittable",
            "The release point and arm speed are identical to his fastball, so even when expecting the curve, hitters cannot begin their downward adjustment until the break starts — too late",
            "Kershaw throws his curveball faster than other pitchers, reducing the identification window",
            "Kershaw's curveball is effective because hitters don't know when in the count he'll throw it",
          ],
          correctIndex: 1,
          explanation: "A curveball that shares a release point and arm speed with the fastball forces the hitter into an impossible problem: even if they know a curveball is coming, they must wait for the break to begin before adjusting downward — and by that point, the break is already complete. Hitters cannot swing down on a ball that looks like it's coming in at belt height until it breaks, because if it doesn't break, they've committed to the wrong plane. This is the deception that makes Kershaw's curveball great: perfect tunneling through the same release point means cognitive uncertainty is maintained even with knowledge of pitch type.",
        },
        {
          id: "baseball-6-04-q4",
          type: "Break Type",
          challenge: `  You throw both a 12-6 curveball and an
  11-5 curveball. Against a right-handed
  hitter (when you are right-handed), your
  coach says to use the 11-5 curve.

  Against a left-handed hitter, he says
  to use the 12-6 curve.

  What is the tactical logic?`,
          text: "How does the direction of a curveball's break affect its matchup effectiveness against left- and right-handed hitters?",
          options: [
            "The direction of break doesn't matter — vertical drop is the key variable against any hitter",
            "An 11-5 curve sweeps away from a same-side hitter (right-on-right), expanding the zone; a 12-6 curve drops into the bottom of the zone against opposite-side hitters with no lateral escape",
            "The 12-6 is always superior — more vertical break means more deception regardless of handedness",
            "The 11-5 is always superior — lateral movement is harder to track than vertical drop",
          ],
          correctIndex: 1,
          explanation: "Break direction creates matchup-specific advantages. An 11-5 curve thrown right-on-right sweeps down and away from the hitter — they must reach or chase it off the plate, producing weak outside-edge contact or a swing-and-miss. A 12-6 against a left-handed hitter drops straight down — with no lateral escape route — into the inside corner from a right-handed pitcher's perspective, creating a tough pitch to drive. This is why most pitchers develop a curve with natural axis tilt for same-side hitters (away sweep) and can optionally straighten it for opposite-side matchups (pure drop). Kershaw had sufficient control to do both.",
        },
      ],
    },
  },

  // ─── baseball-6-05: The Slider ────────────────────────────────────────────────
  {
    epochId: "baseball-6",
    wonder: {
      name: "Dodger Stadium — Bullpen at Game Speed",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "↗️",
    },
    id: "baseball-6-05",
    order: 5,
    title: "The Slider",
    subtitle: "Cut vs. sweep, arm safety, and Kershaw's slider evolution",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-6-badge-05", name: "Wipeout Slider", emoji: "💫" },
    challengeType: "quiz",
    info: {
      tagline: "The slider is the most dangerous pitch in baseball — dangerous for hitters, and dangerous for pitchers who throw it wrong.",
      year: 2014,
      overview: [
        "The slider is baseball's second-most-common pitch and one of the most effective swing-and-miss pitches in the game. It sits in velocity between the fastball (90-95 mph) and curveball (75-82 mph), typically thrown at 82–90 mph, with lateral break away from same-side hitters. Its distinctive grip places the index and middle fingers off-center on one side of the ball, creating a combination of spin types — primarily gyro spin (bullet spin, which produces no Magnus Effect movement) with sidespin — that produces a tight, late lateral break rather than the gradual sweeping arc of a curveball.",
        "The cut slider ('cutter') and the sweep slider represent opposite ends of the slider spectrum. The cut slider (covered in depth in the next stage) is thrown harder, closer to fastball velocity, with shorter lateral break. The sweep slider is thrown with maximum lateral break — sometimes 18–22 inches of horizontal movement — at the cost of some velocity. Both pitches are called 'sliders,' but their intended outcomes differ: the cutter jams hitters, the sweeper misses bats off the outside edge.",
        "Kershaw's slider evolution is one of the most documented pitch development stories in baseball history. Early in his career, his slider was already above average — but it had limited horizontal movement and was occasionally left up in the zone where hitters could damage it. Through adjustments to his grip and wrist angle from 2012 onward, Kershaw transformed his slider into a true swing-and-miss weapon with 4–6 inches of late horizontal break and a 50%+ whiff rate. The combination of this slider with his curveball and fastball made him the most dominant pitcher of his era.",
      ],
      technical: {
        title: "Slider Grip Mechanics — Cut vs. Sweep",
        body: [
          "The cut slider grip places the index and middle fingers slightly off-center toward the index finger side of the ball, with pressure applied primarily by the index finger. The thumb is beneath and slightly to the inside. This off-center grip creates a spin axis tilted from the standard curveball's vertical topspin — the resulting spin is partly gyroscopic (producing no movement) and partly sidespin (producing lateral break). Because gyro spin doesn't produce Magnus Effect forces, the slider arrives with less total movement than its spin rate suggests — but the movement it has occurs very late, when the ball has crossed the decision threshold.",
          "Incorrect slider mechanics — particularly throwing with excessive wrist supination (turning the wrist outward) or forcing the break rather than letting the grip create it — are associated with medial elbow stress. The correct slider mechanics use a pronation or 'karate chop' motion through release, keeping the elbow in a neutral position. Youth pitchers who learn sliders incorrectly by contorting their wrist suffer UCL stress that builds invisibly over months before causing sudden injury. This is why many youth coaches prohibit sliders until age 16.",
        ],
        codeExample: {
          label: "Slider Grip and Break Comparison",
          code: `  STANDARD SLIDER (cut/traditional):
  → Index + middle fingers off-center (index side)
  → Index finger applies primary pressure
  → Thumb underneath and slightly inside
  → Wrist action: karate-chop / pronation (NOT supination)
  → Movement: tight lateral break, 4–8 inches
  → Velocity: 82–88 mph (5–10 mph below fastball)

  SWEEP SLIDER (modern sweeper):
  → Grip farther off-center — nearly on the side
  → Maximum sidespin — 15–22 inch lateral break
  → Lower velocity: 78–84 mph
  → Tunnels as fastball → breaks off plate
  → Best vs. opposite-side hitters chasing off edge

  DIFFERENCE FROM CURVEBALL:
  Curveball: topspin → primarily vertical break
  Slider:    sidespin/gyro → primarily lateral break
  Speed:     Curve 75–82 mph / Slider 82–90 mph

  INJURY WARNING:
  ✗ Wrist supination (twist outward) → UCL stress
  ✓ Pronation / karate-chop → elbow-safe
  → Youth programs: restrict sliders until age 16`,
        },
      },
      incident: {
        title: "Kershaw's Slider Transformation — 2012 to 2014 Cy Young",
        when: "2012–2014 — Clayton Kershaw, Los Angeles Dodgers",
        where: "Dodger Stadium and Camelback Ranch, Los Angeles / Glendale",
        impact: "Clayton Kershaw's slider transformation between 2012 and 2014 converted a pitch that was already good into one of the most dominant swing-and-miss weapons in baseball history. In his 2014 MVP/Cy Young season, his slider whiff rate exceeded 50% — meaning hitters missed more often than they made contact when swinging at it. The transformation was a product of deliberate grip adjustment, not just natural development.",
        body: [
          "Kershaw's 2012 slider was a solid pitch — batters hit approximately .200 against it with a 30% whiff rate. But working with Dodger pitching coaches, he made a grip adjustment that moved his fingers slightly further off-center, increasing the gyro spin component and creating tighter, later lateral break. By 2014, hitters were describing his slider as appearing to be a fastball on the inner half before breaking sharply over the outside corner — the perfect tunnel illusion.",
          "The slider's evolution also changed how Kershaw sequenced pitches. His pre-2012 approach relied heavily on his fastball-curveball combination. Post-2012, he had three distinct pitches operating on different planes — fastball (up and straight), curveball (down and vertical), slider (lateral) — creating a three-dimensional problem for hitters that no single swing plane adjustment could solve. His ERA from 2014–2016 — 1.77, 2.13, 1.69 — reflects what an elite three-pitch arsenal can do when the slider completes the cube.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Off-Center Grip", sub: "index pressure, off-center seam", type: "system" },
          { label: "Gyro + Sidespin", sub: "tight axis, late lateral break", type: "attacker" },
          { label: "Hitter Times Fastball", sub: "tunnels as fastball into zone", type: "victim" },
          { label: "Lateral Miss / Chase", sub: "breaks off plate at last moment", type: "result" },
        ],
      },
      timeline: [
        { year: 1975, event: "Steve Carlton's slider becomes the definitive pitcher's secondary weapon" },
        { year: 1995, event: "Randy Johnson's slider at 90+ mph with 15 inch break redefines what sliders can do" },
        { year: 2012, event: "Kershaw modifies slider grip — adds gyro component for tighter, later break", highlight: true },
        { year: 2014, event: "Kershaw's three-pitch arsenal (FB/CRV/SL) dominates NL — MVP and Cy Young", highlight: true },
        { year: 2020, event: "Sweeper slider becomes mainstream — Yu Darvish and others normalize 18+ inch horizontal break" },
        { year: 2024, event: "Dodger staff leads NL in slider whiff rate — organizational commitment to off-center grip mechanics" },
      ],
      keyTakeaways: [
        "Slider grip is off-center, index-finger dominant, with a pronation (karate-chop) release — NOT wrist supination",
        "Cut slider: tight lateral break at higher velocity; sweeper: maximum lateral break at lower velocity",
        "Slider differs from curveball in break direction (lateral vs. vertical) and spin type (gyro vs. topspin)",
        "Incorrect wrist mechanics on the slider cause UCL stress — age 16+ guideline protects developing pitchers",
      ],
      references: [
        { title: "Baseball Savant: Kershaw Slider Movement History", url: "https://baseballsavant.mlb.com" },
        { title: "Fangraphs: Slider Usage and Whiff Rate Analysis", url: "https://www.fangraphs.com" },
        { title: "ASMI: Slider Arm Health Research", url: "https://www.asmi.org/research.php?title=baseball" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-6-05-q1",
          type: "Grip vs. Curveball",
          challenge: `  A hitter faces both a curveball and a
  slider from the same pitcher. The curve
  breaks down. The slider breaks sideways.

  Both arrive at 83 mph. Both share the
  same release point.

  How does the hitter distinguish them —
  and what happens if they can't?`,
          text: "How does the different spin type of a slider vs. curveball help a pitcher who throws both pitches effectively?",
          options: [
            "Hitters cannot distinguish them — a pitcher who throws both will always fool hitters because no one can tell the difference",
            "The spin axis difference is visible as a slight seam pattern difference — expert hitters can identify it early and adjust break plane",
            "Having both pitches forces the hitter to hold their swing plane decision until very late — each extra pitch adds another plane the hitter must defend",
            "The slider is always easier to hit than the curveball because it breaks laterally rather than vertically",
          ],
          correctIndex: 2,
          explanation: "A pitcher who throws fastball (straight), curveball (vertical break), and slider (lateral break) presents three different planes. A hitter must choose which plane to guard as soon as they identify the pitch — but if all three share a tunnel, identification comes late. The slider and curveball arriving at the same velocity but different break directions means the hitter cannot lock in on a single swing plane adjustment. Even if they see the pitch type correctly, the different break direction may not match where their adjusted swing is aimed. This is why a three-pitch arsenal is so much harder to hit than a two-pitch arsenal.",
        },
        {
          id: "baseball-6-05-q2",
          type: "Arm Safety",
          challenge: `  A 14-year-old is throwing what he calls
  a slider. His coach watches and notices
  the pitcher is twisting his wrist outward
  (supinating) at release to make the ball
  break.

  The pitch breaks well. The kid says his
  arm feels fine. Is there a problem?`,
          text: "Why is wrist supination when throwing a slider dangerous even if the pitch is effective and the arm feels fine?",
          options: [
            "There is no problem — if the arm feels fine, the mechanics are safe",
            "Wrist supination applies torque to the UCL and medial elbow — stress accumulates invisibly before injury, regardless of current symptoms",
            "Supination is the correct mechanics for a slider — the coach is wrong to object",
            "Supination only becomes dangerous at higher velocities — at 14 it is harmless",
          ],
          correctIndex: 1,
          explanation: "UCL stress from incorrect slider mechanics is cumulative — it builds silently over months or years without symptoms. Pitchers who throw with wrist supination often feel completely fine until the UCL tears suddenly under one pitch. This is sometimes called 'the Tommy John accumulation': no symptoms, no warning, sudden structural failure. The fact that the arm 'feels fine' is irrelevant because the damage mechanism is not pain-producing in early stages. Correct mechanics use a pronation/karate-chop release that keeps the elbow in a natural neutral position — same as a fastball — with the off-center grip creating the break rather than wrist manipulation.",
        },
        {
          id: "baseball-6-05-q3",
          type: "Cut vs. Sweep",
          challenge: `  Your pitching coach asks: "When do you
  throw the cut slider vs. the sweeper?"

  You are right-handed. The batter is
  left-handed. It's a 1-2 count.

  Which slider variant and why?`,
          text: "How do the cut slider and sweeper serve different tactical purposes against an opposite-side hitter in a two-strike count?",
          options: [
            "Cut slider — it looks more like a fastball and will be harder to identify from the left side",
            "Sweeper — maximum lateral break drives it off the outside edge against a lefty, creating a swing-and-miss chasing a pitch that appears to be in the zone",
            "The choice doesn't matter at 1-2 — any slider is effective in a pitcher's count",
            "Neither — go back to fastball in two-strike counts to prevent a mistake",
          ],
          correctIndex: 1,
          explanation: "Against a left-handed hitter (opposite side for a right-handed pitcher), the sweeper is particularly brutal: it tunnels as a middle-of-the-zone pitch and then breaks maximally away from the hitter, off the outer edge. The hitter sees 'middle of the plate' and commits — then the ball is off the outside corner by 4–6 inches. At 1-2 with a swing-and-miss pitch available, you want maximum break, not cutter velocity. The sweeper gives left-handed hitters a ball that appears to be a gift pitch and turns into a chase swing. Against right-handed hitters (same side), the cutter — which comes in hard and tails to the handle — is often superior.",
        },
        {
          id: "baseball-6-05-q4",
          type: "Kershaw Evolution",
          challenge: `  Kershaw's ERA went from 2.28 (2011) to
  1.77 (2014) as he improved his slider.
  His fastball and curveball remained
  essentially the same during this period.

  How can improving a third pitch cause
  such a significant overall performance
  improvement?`,
          text: "Why does adding or improving a third pitch disproportionately improve a pitcher's overall effectiveness?",
          options: [
            "It doesn't — ERA improvement is driven by fastball velocity, not pitch variety",
            "A third pitch creates a three-dimensional hitting problem; hitters can no longer solve one of two planes and automatically defend 50% of pitches",
            "A better slider improved Kershaw's fastball by making it look faster through contrast",
            "The third pitch improved his ERA only because it was a slider — other pitch types would not produce the same result",
          ],
          correctIndex: 1,
          explanation: "With two pitches, hitters split their mental preparation between two possibilities — say, 50% fastball timing and 50% curveball timing. A hitter can consciously adjust for one and react to the other. With three distinct pitches on three distinct planes, no single preparation covers even two of them. Adding Kershaw's slider to his fastball-curveball combination meant a hitter sitting on the curveball's vertical break was vulnerable to the slider's lateral break — and sitting on the slider left them exposed to the curveball. The mental multiplication effect of a true three-pitch arsenal is why pitcher development programs prioritize adding a third pitch above further improving a second.",
        },
      ],
    },
  },

  // ─── baseball-6-06: The Cutter ────────────────────────────────────────────────
  {
    epochId: "baseball-6",
    wonder: {
      name: "Yankee Stadium (Rivera's Cathedral)",
      location: "The Bronx, New York",
      era: "Modern",
      emoji: "✂️",
    },
    id: "baseball-6-06",
    order: 6,
    title: "The Cutter",
    subtitle: "Mariano Rivera's weapon, off-center 4-seam, and Kenley Jansen's career",
    category: "sports",
    xp: 90,
    badge: { id: "baseball-6-badge-06", name: "Cut It", emoji: "✂️" },
    challengeType: "quiz",
    info: {
      tagline: "Mariano Rivera threw one pitch his entire career. He retired with the most saves in baseball history. One pitch was all he needed.",
      year: 1997,
      overview: [
        "The cut fastball (cutter) occupies a unique space in the pitch spectrum: it is thrown with fastball velocity (88–96 mph) but gripped off-center, producing a small but sharp late lateral movement — typically 2–5 inches — toward the glove side of the pitcher. It is faster than a slider but with less break, and it shares the same arm speed and release point as a four-seam fastball. The result is a pitch that looks exactly like a fastball until the last few feet of flight, when it cuts sharply.",
        "Mariano Rivera's cutter is the most famous single pitch in baseball history. Rivera threw it at 93–95 mph with remarkable consistency, and it moved 4–5 inches toward his glove side at the last moment. Against left-handed hitters, this cut meant the ball ran toward their hands — sawing off countless bat handles over 19 seasons. Against right-handed hitters, it moved away from their bats. Rivera's cutter was so singular that batters reported preparing exclusively for it — and still couldn't hit it. He saved 652 games in his career on essentially one pitch.",
        "Kenley Jansen, the Dodgers' longtime closer, built an equivalent career as a one-pitch dominant reliever with his cutter. Jansen's cut fastball sat 93–96 mph with the same sharp late run toward left-handed hitters' hands, generating broken bats and jammed contact at a rate that led the National League for multiple seasons. The Dodgers' decision to develop his changeup later in his career demonstrates that even the most dominant one-pitch specialists must eventually diversify.",
      ],
      technical: {
        title: "Cutter Grip — Off-Center Four-Seam",
        body: [
          "The cutter grip is the most subtle in pitching — it begins as a standard four-seam fastball grip and shifts slightly. The index and middle fingers move off-center toward the index finger side, with the index finger applying pressure into the side of the ball rather than over the top. The seam contact point shifts off the center line. The thumb moves slightly toward the middle finger's side underneath. This subtle shift creates a cut-spin component without requiring wrist manipulation — the off-center finger pressure naturally creates sidespin at release.",
          "The hallmark of a great cutter is late break. A slider with 8 inches of break spread over 50 feet is readable — it starts breaking early enough that hitters see the trajectory. A cutter with 4 inches of break in the final 6 feet of flight gives the hitter no early cue — it looks like a fastball for 90% of the pitch's journey, and only the last foot of flight reveals the cut. Rivera's cutter was famous for this: hitters swore it was a fastball until it wasn't, and by then they had committed.",
        ],
        codeExample: {
          label: "Cutter Grip — The Off-Center Shift",
          code: `  STARTING GRIP (four-seam baseline):
  → Index + middle fingers across horseshoe seam
  → Thumb directly underneath

  CUTTER ADJUSTMENT:
  → Shift index + middle fingers slightly
    toward the index finger side (off-center)
  → Index finger applies pressure into the
    SIDE of ball — not directly over top
  → Thumb shifts slightly toward middle finger
  → No wrist manipulation needed — grip creates cut

  MOVEMENT RESULT:
  → 4–6 inches lateral cut toward glove side
  → Late break: final 6–8 feet of flight
  → Velocity: 88–96 mph (near fastball)
  → Appears as fastball for 90% of flight

  AGAINST LEFT-HANDED HITTER (RHP):
  → Ball cuts in toward hitter's hands
  → Saws off bat handle → broken bats, grounders

  AGAINST RIGHT-HANDED HITTER (RHP):
  → Ball cuts away from hitter
  → Off-barrel contact → weak grounders, pop-ups

  RIVERA STATS (career):
  → 652 saves — all-time record
  → One primary pitch: 93–95 mph cutter
  → Left-handed hitter AVG vs. Rivera: .227`,
        },
      },
      incident: {
        title: "Rivera's Cutter — The Most Iconic Pitch in World Series History",
        when: "1997–2013 — Mariano Rivera, New York Yankees",
        where: "Yankee Stadium and postseason venues nationwide",
        impact: "Mariano Rivera's cut fastball is the most celebrated single pitch in baseball history. In the 2000 World Series alone, Rivera broke nine bats in three games. He is the only player elected unanimously to the Baseball Hall of Fame on the first ballot. His career was built on one pitch thrown with perfect command — a lesson in mastery over variety.",
        body: [
          "Rivera discovered his cutter accidentally during a 1997 bullpen session in spring training, when he noticed that a 'straight fastball' was moving sharply toward left-handed hitters. Rather than trying to eliminate the movement, pitching coach Mel Stottlemyre encouraged him to embrace and refine it. Rivera spent the next 16 years perfecting a single pitch — never developing a curveball, rarely relying on his changeup — and became the greatest closer in the history of the sport.",
          "The psychological impact of Rivera's cutter extended beyond broken bats. Left-handed hitters who faced him in the postseason routinely reported that even knowing the cutter was coming, knowing its path, knowing where to look — they still couldn't hit it. Twice in the 2003 ALCS, left-handed Boston Red Sox hitters broke their bats on consecutive pitches. Bat makers reported supplying teams with three times the normal allotment of bats for Rivera postseason appearances. One pitch. The most saves in history.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Off-Center 4-Seam Grip", sub: "index pressure on side of ball", type: "system" },
          { label: "Cut Spin at Release", sub: "fastball velocity, off-center sidespin", type: "attacker" },
          { label: "Looks Like Fastball", sub: "90% of flight path is straight", type: "victim" },
          { label: "Late 4–6 Inch Cut", sub: "handle sawed off / barrel missed", type: "result" },
        ],
      },
      timeline: [
        { year: 1997, event: "Rivera discovers his cutter accidentally in spring training — changes his career and the sport", highlight: true },
        { year: 2000, event: "Rivera breaks nine bats in the World Series — cutter dominance becomes legend" },
        { year: 2013, event: "Rivera retires with 652 saves — Hall of Fame unanimous selection (2019)", highlight: true },
        { year: 2014, event: "Kenley Jansen establishes himself as Rivera's NL equivalent with a 96 mph cutter" },
        { year: 2019, event: "Jansen's cut fastball averages 93 mph — Dodgers lead NL in closer ERA" },
        { year: 2024, event: "Dodgers continue organizational emphasis on cutter mechanics in pitching development" },
      ],
      keyTakeaways: [
        "Cutter grip shifts fingers off-center from a four-seam base — index finger pressure into the side of the ball",
        "The cutter's late break (final 6–8 feet) is what makes it undetectable — it looks like a fastball until it isn't",
        "Against same-side hitters, the cutter runs toward the hands — producing broken bats and jammed grounders",
        "Rivera's 652 saves on one pitch proves that mastery of a single elite pitch beats variety without excellence",
      ],
      references: [
        { title: "Baseball Hall of Fame: Mariano Rivera", url: "https://baseballhall.org/hall-of-famers/rivera-mariano" },
        { title: "Baseball Savant: Kenley Jansen Cutter Analysis", url: "https://baseballsavant.mlb.com" },
        { title: "MLB: Rivera Cutter Breakdown", url: "https://www.mlb.com/video" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-6-06-q1",
          type: "Grip Mechanics",
          challenge: `  You throw a cut fastball but your catcher
  says: "It's not cutting — it looks like
  a straight four-seamer."

  You're holding the grip you learned
  with fingers directly over the top of
  the ball, centered.

  What is the adjustment?`,
          text: "What specific grip adjustment turns a four-seam fastball into a cut fastball?",
          options: [
            "Apply more downward pressure with both fingers equally — this creates the cut spin",
            "Shift the index and middle fingers off-center toward the index side and apply index-finger pressure into the side of the ball",
            "Move both fingers toward the middle of the ball — the seam pattern creates the cut",
            "The wrist must supinate at release — that is what creates the cutting action",
          ],
          correctIndex: 1,
          explanation: "A four-seam fastball held perfectly centered produces pure backspin. To create a cutter, the fingers must be shifted off-center so that the index finger is applying pressure into the side of the ball rather than directly over the top. This asymmetric pressure creates off-center spin — adding a sidespin component to the backspin. The magic of the cutter is that this grip adjustment is tiny — sometimes just millimeters — but produces consistent late lateral break. No wrist manipulation needed: the grip asymmetry does all the work.",
        },
        {
          id: "baseball-6-06-q2",
          type: "Rivera Career",
          challenge: `  Mariano Rivera never had a curveball.
  He rarely threw a changeup. Scouts knew
  exactly what pitch was coming virtually
  every time.

  How did Rivera dominate for 19 seasons
  on a single pitch that everyone knew
  was coming?`,
          text: "How can elite command and late movement allow a single pitch to be dominant even when batters know it is coming?",
          options: [
            "Rivera's cutter wasn't actually one pitch — scouts misidentified his changeup as a cutter",
            "Elite command and late break create a problem where even with full knowledge of the pitch type, the hitter cannot solve the late movement on a 94-mph pitch in time",
            "Hitters were psychologically intimidated by Rivera's reputation — his dominance was largely mental",
            "One-pitch dominance only works in short stints — Rivera's closer role limited hitter exposure",
          ],
          correctIndex: 1,
          explanation: "Knowledge of a pitch type does not equal the ability to hit it. A hitter who knows Rivera is throwing a cutter still must: identify the pitch within 175 ms, determine whether it will cut in or away, adjust their swing plane and timing, and execute the swing while accounting for 94 mph velocity plus 4–5 inch late movement. At elite velocity, even a correctly identified pitch can be unhittable if the break is sharp, late, and precise. Rivera's command was so exceptional — consistently hitting both sides of the plate — that hitters couldn't even guess which way the cut would go. Knowledge plus late movement plus elite velocity equals no hits.",
        },
        {
          id: "baseball-6-06-q3",
          type: "Jansen vs. Rivera",
          challenge: `  Kenley Jansen built a career on a cutter
  very similar to Rivera's. But unlike
  Rivera, Jansen eventually needed to
  add a changeup to remain effective.

  What is the difference in context that
  required Jansen to diversify when
  Rivera never did?`,
          text: "What factors eventually required Kenley Jansen to add an off-speed pitch despite Rivera-level cutter dominance?",
          options: [
            "Jansen's cutter was never as effective as Rivera's — he always needed a secondary pitch",
            "Advanced analytics and left-handed platoon advantages eventually allowed teams to build matchup-specific approaches against Jansen's cutter that Rivera didn't face",
            "Jansen faced a different pitching era — hitters in the 2020s are simply better",
            "Jansen's velocity declined after injury, requiring a secondary pitch to compensate",
          ],
          correctIndex: 1,
          explanation: "Rivera dominated in an era before Statcast, before systematic platoon optimization, and before teams routinely stacked left-handed lineups for specific high-leverage innings against known cutterball closers. By the 2017–2020s, teams could generate detailed movement profiles, identify that Jansen's cutter tailed away from left-handed hitters, and roster construction specifically designed left-handed pinch hitters for the ninth inning. The analytical edge that Rivera never faced eventually required Jansen to create uncertainty by adding a changeup — not because his cutter declined, but because opponent information management improved.",
        },
        {
          id: "baseball-6-06-q4",
          type: "Cutter vs. Slider",
          challenge: `  A pitching coach is explaining pitch
  selection to a right-handed pitcher:

  "Against a left-handed hitter in a
  two-strike count — throw the cutter.
  Against a right-handed hitter in
  two strikes — throw the slider."

  What is the tactical logic?`,
          text: "Why does pitcher handedness affect whether to use a cutter or slider in two-strike counts?",
          options: [
            "Cutters and sliders are interchangeable — pitcher preference is the only relevant factor",
            "The cutter moves toward a same-side hitter's hands on the inside; the slider moves away from a same-side hitter off the outer edge — both produce swing-and-miss but for opposite reasons",
            "Sliders are always the better two-strike pitch — cutters are for contact avoidance, not strikeouts",
            "The handedness of the pitcher doesn't matter — it is the hitter's handedness that determines which pitch to throw",
          ],
          correctIndex: 1,
          explanation: "Movement direction relative to hitter handedness is the key. A right-handed pitcher's cutter cuts glove-side (toward left-handed hitters' hands) — jamming them and producing broken bats on contact or swing-and-miss as they fail to get the barrel through in time. Against right-handed hitters, the same pitch cuts away from their hands toward the outside corner — which is harder to jam them with but easier to drive if they reach. The slider, moving further and in the opposite direction (away from the pitcher's arm side), is better for putting away same-side hitters by making them chase off the outside edge. Two-strike call: jam the opposite side (cutter) or get the same side to chase (slider).",
        },
      ],
    },
  },

  // ─── baseball-6-07: Splitter and Forkball ────────────────────────────────────
  {
    epochId: "baseball-6",
    wonder: {
      name: "Dodger Stadium — 1995 Season (Nomo's Debut)",
      location: "Los Angeles, California",
      era: "Historic",
      emoji: "🇯🇵",
    },
    id: "baseball-6-07",
    order: 7,
    title: "The Splitter and Forkball",
    subtitle: "Deep grip, tumbling action, and Hideo Nomo's legacy",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-6-badge-07", name: "Fork Drop", emoji: "🍴" },
    challengeType: "quiz",
    info: {
      tagline: "Hideo Nomo arrived from Japan in 1995 with a pitch nobody in the National League had ever seen — and immediately became a sensation at Dodger Stadium.",
      year: 1995,
      overview: [
        "The split-fingered fastball (splitter) and forkball are the most dramatic of the 'fastball family' pitches — gripped with fingers spread wide on either side of the ball, which reduces velocity, eliminates backspin, and creates a tumbling action that causes the ball to dive sharply downward in the final feet before the plate. From the hitter's perspective, a well-thrown splitter looks like a fastball — same arm speed, similar initial trajectory — until it drops abruptly out of the zone, producing swings over the top or checked swings into the dirt.",
        "The splitter and forkball differ primarily in finger placement depth. The splitter spreads the index and middle fingers along the seam on either side of the ball without forcing them all the way to the knuckles — a middle-deep grip. The forkball forces the fingers further apart and deeper, between the knuckles, producing more extreme velocity reduction (often 15–20 mph below fastball) and more dramatic dive, but at the cost of command and arm stress. Both pitches generate a forward tumbling spin — the opposite of backspin — which adds to the gravity component and produces the dramatic late-break dive.",
        "Hideo Nomo's forkball was the pitch that made him a celebrity when he joined the Dodgers in 1995. Nomo's Japanese-style forkball — sometimes called a 'fork drop' — produced a 20+ mph velocity differential from his fastball while diving sharply at the last possible moment. He led the NL in strikeouts in his first season, made the All-Star Game as a rookie, and turned Dodger Stadium into a phenomenon as 'Nomomania' gripped Los Angeles. His forkball was a cultural ambassador as much as a baseball pitch.",
      ],
      technical: {
        title: "Grip Mechanics — Why Deep Placement Kills Spin",
        body: [
          "Both the splitter and forkball work by eliminating the snap component of the release. A normal fastball release involves a wrist snap that imparts backspin. When the fingers are spread wide and placed deep on the sides of the ball, the snap is inhibited — the fingers slide off the sides rather than snapping over the top. The result is reduced velocity (less snap force) and reduced backspin (no wrist snap = no backspin imparted). With minimal spin, gravity acts more strongly on the ball — it falls more than the batter expects.",
          "The tumbling spin that results from a splitter's grip is forward (topspin-adjacent) rather than backspin or sidespin. Forward tumble adds a small Magnus Effect component in the downward direction while also creating unstable flight — the ball wobbles slightly due to inconsistent spin axis, making its exact dive location unpredictable even to the pitcher. This unpredictability is part of why splitters are so hard to hit — even the catcher sometimes has trouble predicting exactly where the ball will end up. It also explains why splitters are difficult to control and dangerous to young arms: the deep grip places lateral stress on the UCL.",
        ],
        codeExample: {
          label: "Splitter vs. Forkball — Grip and Outcome Comparison",
          code: `  SPLITTER:
  → Index + middle fingers spread along seam
  → Fingers on outside edges of ball (not forced)
  → Held at middle-deep depth
  → Wrist: normal fastball action (snap inhibited by grip)
  → Velocity: 8–14 mph below fastball
  → Movement: late tumbling dive, 10–18 inches vertical
  → Command: moderate — more controllable than forkball

  FORKBALL:
  → Fingers forced between/over the knuckles
  → Maximum finger spread — seam contact at edges
  → Very deep placement — fingers nearly at palm
  → Velocity: 14–22 mph below fastball
  → Movement: extreme dive, often into the dirt
  → Command: poor — extreme grip = extreme variation
  → ARM RISK: High — deep grip stresses UCL/forearm

  NOMO'S FORKBALL (1995):
  → 87 mph fastball → 67 mph forkball = 20 mph gap
  → Dove 20+ inches in final 3 feet of flight
  → Batters: hit .189 against forkball in 1995
  → NL-leading 236 strikeouts as a rookie Dodger

  YOUTH CAUTION:
  ✗ Splitter/forkball not recommended under age 17
  → UCL lateral stress from extreme finger spread
  → Forearm tension can damage growth plate structures`,
        },
      },
      incident: {
        title: "Nomomania — Hideo Nomo's 1995 Debut at Dodger Stadium",
        when: "May 2, 1995 — Hideo Nomo's MLB debut",
        where: "Dodger Stadium, Los Angeles, California",
        impact: "Hideo Nomo's 1995 Dodger season was more than an athletic achievement — it was a cultural moment that connected Japanese baseball fans to Major League Baseball for the first time, sparked a pipeline of Japanese talent to the Dodgers that culminated in Shohei Ohtani, and introduced American hitters to a forkball style they had never seen before.",
        body: [
          "When Nomo made his MLB debut on May 2, 1995 at Dodger Stadium, scouts had warned that his distinctive tornado windup and Japanese-style forkball might not translate to American hitters. Within three starts, it was clear the warnings were wrong. His forkball dove so dramatically — so far below where hitters expected a pitch to arrive — that batters were either waving at strikes in the dirt or standing in shock as the ball dove through the strike zone at their knees after appearing to be heading for the middle of the plate.",
          "Nomomania became a phenomenon in Los Angeles. Tens of thousands of Japanese fans flew to Dodger Stadium to see him pitch. His jersey was the best-selling in baseball for months. In the 1995 All-Star Game, he struck out three consecutive batters with his forkball in the first inning. Nomo went on to pitch two no-hitters in his career, one of which (Colorado, 1996) was thrown in the most extreme hitters' park in baseball history — largely thanks to his forkball making hitters chase pitches in the dirt in thin air. His legacy at the Dodgers lives through the organization's continued relationship with Japanese talent that eventually brought Yoshinobu Yamamoto and Shohei Ohtani to Los Angeles.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Deep Spread Grip", sub: "fingers on seam edges — snap inhibited", type: "system" },
          { label: "No Backspin", sub: "tumbling forward spin — gravity dominates", type: "attacker" },
          { label: "Looks Like Fastball", sub: "same arm speed, initial trajectory", type: "victim" },
          { label: "20-Inch Late Dive", sub: "drops out of zone at last moment", type: "result" },
        ],
      },
      timeline: [
        { year: 1950, event: "Elroy Face pioneers the split-fingered fastball for the Pittsburgh Pirates — first documented effective use" },
        { year: 1984, event: "Roger Craig teaches the splitter to Detroit Tigers — starts the 1980s split-fingered craze in MLB" },
        { year: 1995, event: "Hideo Nomo debuts with Dodgers — Japanese forkball style captivates American baseball fans", highlight: true },
        { year: 1996, event: "Nomo throws no-hitter in Coors Field — forkball dominant even in thin Colorado air" },
        { year: 2010, event: "ASMI data shows splitter/forkball correlates with UCL stress — youth restriction begins" },
        { year: 2024, event: "Yoshinobu Yamamoto joins Dodgers — Japanese pitch repertoire tradition continues in Los Angeles", highlight: true },
      ],
      keyTakeaways: [
        "Splitter and forkball work by eliminating backspin through deep finger placement — gravity and tumble create the dramatic dive",
        "Forkball is more extreme than splitter: deeper grip, more velocity reduction, worse command, higher arm risk",
        "Nomo's forkball introduced 20-mph differential diving action to American hitters who had never seen the pitch before",
        "Both pitches are not recommended for pitchers under 17 — deep grip stresses the UCL and forearm growth structures",
      ],
      references: [
        { title: "MLB: Hideo Nomo Career and Legacy", url: "https://www.mlb.com/dodgers" },
        { title: "Baseball Reference: Nomo 1995 Pitching Stats", url: "https://www.baseball-reference.com" },
        { title: "ASMI: Splitter and Arm Health Research", url: "https://www.asmi.org/research.php?title=baseball" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-6-07-q1",
          type: "Physics",
          challenge: `  A coach explains why the splitter dives:
  "The pitch has no backspin — and without
  backspin, gravity takes over completely."

  A player asks: "But it moves MORE than
  a pitch with no spin at all would. Why?"

  What explains the extra downward movement
  beyond pure gravity?`,
          text: "What causes a splitter to dive more than a ball with no spin would simply from gravity?",
          options: [
            "The splitter has no extra movement — it falls exactly as fast as gravity alone would produce",
            "The tumbling forward spin creates a small topspin-like Magnus Effect that adds to gravity, producing extra downward force",
            "The deep grip creates extra drag that pulls the ball downward beyond the gravitational baseline",
            "The low velocity of the splitter allows gravity more time to act — that extra time creates the perceived extra drop",
          ],
          correctIndex: 1,
          explanation: "A completely spinless ball would fall exactly as fast as gravity dictates. But a splitter's deep grip creates a forward tumbling spin — not clean backspin or pure topspin, but a chaotic forward rotation. This rotation has a topspin-like component that generates a small Magnus Effect in the downward direction — adding to gravity rather than fighting it, like a curveball. Combined with gravity acting on a low-velocity pitch for longer flight time, the splitter falls more than expected. The tumbling action also creates unpredictable late deviation, which is part of why even catchers have trouble framing it cleanly.",
        },
        {
          id: "baseball-6-07-q2",
          type: "Grip Comparison",
          challenge: `  A pitcher throws a splitter and a forkball.
  His splitter has good command but modest
  dive. His forkball has dramatic dive but
  he bounces it in the dirt 40% of the time.

  For a youth pitcher, which pitch is
  recommended to develop, and why?`,
          text: "Why is the splitter generally preferred over the forkball for developing pitchers despite less extreme movement?",
          options: [
            "The forkball is preferred — more movement always means more effective, regardless of command",
            "The splitter is preferred — it provides significant diving action with better command and less arm stress than the extreme forkball grip",
            "Neither — both pitches should be avoided until age 21 for all pitchers",
            "The choice depends entirely on hand size — large-handed pitchers should always throw forkballs",
          ],
          correctIndex: 1,
          explanation: "A pitch that bounces 40% of the time is a passed ball machine and a walk machine — unusable in games. The splitter's middle-deep grip allows better command (the fingers aren't forced to extremes) while still producing enough velocity reduction and tumbling action to create late dive. Even though the forkball's movement is more extreme, command and repeatable mechanics matter more than raw movement. Additionally, the forkball's extreme finger spread creates more lateral stress on the UCL and forearm tendons — a health risk that outweighs the movement benefit, especially for pitchers whose growth plates are still developing.",
        },
        {
          id: "baseball-6-07-q3",
          type: "Nomo Legacy",
          challenge: `  In 1995, Nomo faced American hitters who
  had never seen his forkball in a game.
  By 1998, after three seasons, his ERA
  had climbed and hitters were adjusting
  to the pitch.

  What does this tell us about pitch
  novelty vs. pitch quality?`,
          text: "Why did American hitters eventually adjust to Nomo's forkball, and what does this reveal about arsenal development?",
          options: [
            "Hitters never truly adjusted — Nomo's 1998 ERA rise was caused by injury, not adjustment",
            "Novelty provides an initial advantage, but hitters eventually adjust through film study and experience — pitch quality and sequencing must sustain effectiveness beyond initial unfamiliarity",
            "A single pitch is always eventually solved — all great pitchers must develop four or more pitches",
            "Adjustment is irrelevant — the same pitch at higher velocity cannot be adjusted to",
          ],
          correctIndex: 1,
          explanation: "Nomo's 1995 forkball was devastatingly effective partly because American hitters had never seen its exact break profile, dive timing, or velocity differential. By 1997–1998, video study had given every lineup's advance scouts a complete picture of what the pitch did, how it tunneled, and when to lay off versus when to attack. The forkball itself hadn't changed — the information environment had. This is the lesson of pitch novelty: unfamiliar pitches earn free strikeouts initially, but hitters adapt. Long-term effectiveness requires true movement quality, sequencing, and location precision — not just novelty.",
        },
        {
          id: "baseball-6-07-q4",
          type: "Sequencing",
          challenge: `  Nomo's most effective sequence was:
  Fastball (87 mph) → Fastball → Forkball (67 mph)

  The forkball was hardest to hit when
  set up by two fastballs.

  Why does this specific sequence create
  the maximum effectiveness for the forkball?`,
          text: "How does setting up a splitter or forkball with consecutive fastballs maximize its deception?",
          options: [
            "Throwing two fastballs first reduces arm fatigue, allowing more velocity on the forkball",
            "Two fastballs lock the hitter's timing to 87 mph — the forkball's 20 mph differential then makes their pre-committed swing arrive far too early",
            "Consecutive fastballs increase the statistical probability that the next pitch will be off-speed",
            "The sequence only works with a 20+ mph differential — smaller gaps require different setups",
          ],
          correctIndex: 1,
          explanation: "Pitch sequencing exploits timing lock-in. After seeing 87 mph twice, the hitter's internal timing clock is calibrated to 87 mph — their hip rotation trigger, their stride timing, their hand release — all set to fire in sync with a ball arriving in about 400 milliseconds. The forkball at 67 mph takes approximately 500 milliseconds to arrive. The hitter's body fires on schedule for 87 mph and is already past the contact point when the forkball gets there. This is the changeup principle applied to the forkball: fastball arm speed + grip-reduced velocity = timing destruction. The two-fastball setup maximizes the timing debt the forkball collects.",
        },
      ],
    },
  },

  // ─── baseball-6-08: Spin Rate, Spin Axis, and Rapsodo ────────────────────────
  {
    epochId: "baseball-6",
    wonder: {
      name: "Camelback Ranch — Rapsodo Lab",
      location: "Glendale, Arizona",
      era: "Modern",
      emoji: "🔬",
    },
    id: "baseball-6-08",
    order: 8,
    title: "Spin Rate, Spin Axis, and Rapsodo",
    subtitle: "How Statcast measures spin and how Dodger coaches use the data",
    category: "sports",
    xp: 90,
    badge: { id: "baseball-6-badge-08", name: "Data Arm", emoji: "📊" },
    challengeType: "quiz",
    info: {
      tagline: "The Rapsodo doesn't lie — it shows you exactly what your ball is doing, and why.",
      year: 2015,
      overview: [
        "Spin rate is measured in revolutions per minute (rpm) and quantifies how fast the baseball rotates in flight. But raw spin rate alone does not determine pitch movement — spin axis and spin efficiency (the proportion of total spin contributing to Magnus Force movement versus gyroscopic spin) are equally important. Two pitchers with identical spin rates can produce dramatically different pitch movement based on their spin axis and efficiency.",
        "Statcast (deployed in all MLB parks in 2015) and Rapsodo (a portable launch monitor now available to high school and college programs) measure three key spin variables: total spin rate (rpm), spin axis (expressed as a clock-face angle, e.g., 12:00 = pure backspin, 6:00 = pure topspin), and spin efficiency (the percentage of total spin contributing to movement). Together these three numbers explain exactly why a pitch moves the way it does.",
        "The Dodger organization was among the first teams to systematically deploy Rapsodo devices at their minor league facilities and Camelback Ranch spring training complex. Dodger pitching coordinator Mark Prior and his staff use spin data to optimize every pitcher's grip, identifying the specific hand orientation that maximizes spin efficiency for their individual arm action. A pitcher who naturally generates 2,400 rpm might produce only 75% spin efficiency — but with a grip adjustment found through Rapsodo testing, they might achieve 90% efficiency, effectively adding 360 'active' rpm without changing any other variable.",
      ],
      technical: {
        title: "Active Spin vs. Gyro Spin — The Efficiency Equation",
        body: [
          "Total spin rate includes two components: active spin (also called Magnus spin) and gyroscopic spin (also called gyro spin). Active spin is the component of rotation that has its axis perpendicular to the ball's direction of travel — this spin pushes air and creates Magnus Force movement. Gyro spin has its axis parallel to the direction of travel — like a bullet's rifling — and produces no Magnus Force movement at all. A pitch with 100% active spin (zero gyro) produces maximum possible movement for its rpm. A pitch with 50% active spin produces half the maximum movement.",
          "Spin efficiency is expressed as a percentage. A four-seam fastball with 95% spin efficiency at 2,500 rpm produces near-maximum rise effect — the seams are cutting cleanly through the air with almost pure backspin. A splitter may have 40% efficiency — most of its spin is gyroscopic, which explains why it 'falls out of' the ball's flight path rather than being driven by Magnus Force. Understanding which pitches benefit from high efficiency (fastballs, curveballs) and which are intentionally low-efficiency (sliders use gyro spin for 'bite') helps pitchers optimize each pitch separately.",
        ],
        codeExample: {
          label: "Spin Variables — What Rapsodo Measures",
          code: `  SPIN RATE (rpm):
  → Fastball elite: ≥ 2,500 rpm
  → Curveball elite: ≥ 2,800 rpm
  → Slider: 2,200–2,700 rpm (gyro component)
  → Changeup: typically 1,500–2,000 rpm

  SPIN AXIS (clock face):
  12:00 → Pure backspin (fastball rise)
  6:00  → Pure topspin (curveball drop)
  3:00  → Pure sidespin (extreme cut)
  1:30  → Tilted backspin (rise + arm-side run)

  SPIN EFFICIENCY:
  Active spin %  = spin contributing to movement
  Gyro spin %    = spin contributing nothing (bulk-fill)
  Formula: Movement = f(rpm × efficiency × axis)

  FASTBALL EXAMPLE:
  Pitcher A: 2,600 rpm × 95% efficiency = 2,470 active rpm
  Pitcher B: 2,600 rpm × 70% efficiency = 1,820 active rpm
  → Pitcher A's ball rides 35% more than Pitcher B's

  SLIDER EXAMPLE (intentional gyro):
  2,400 rpm × 55% efficiency = 1,320 active rpm
  → Low active rpm = tight, late break (not big sweep)

  RAPSODO OUTPUT:
  → Spin rate, axis, efficiency per pitch
  → Movement in (horizontal) and (vertical) inches
  → Velocity off the hand
  → Ideal for grip optimization in bullpen sessions`,
        },
      },
      incident: {
        title: "The Dodgers' Rapsodo Revolution — Camelback Ranch Data Lab",
        when: "2018–present — Dodger Spring Training, Camelback Ranch",
        where: "Camelback Ranch, Glendale, Arizona",
        impact: "The Dodgers' deployment of Rapsodo devices at Camelback Ranch starting around 2018 created a data-driven pitching development pipeline that has helped develop minor league pitchers into major league contributors faster than at any point in franchise history. Their systematic approach to grip optimization using spin data is now considered one of the most sophisticated in professional baseball.",
        body: [
          "At Camelback Ranch, Dodger pitching development staff set up Rapsodo units behind home plate in multiple bullpen mounds during spring training. Every throw from every pitcher in the organization goes through spin rate and axis analysis at some point during camp. Pitchers begin by throwing their natural grips, then work through micro-grip adjustments — finger position, seam contact, thumb placement — measuring spin efficiency on each variant. For many pitchers, the optimal grip differs meaningfully from what they learned in high school.",
          "The process also reveals which pitches each pitcher can optimize most efficiently. Some pitchers have hand sizes and wrist angles that naturally generate elite fastball spin — those pitchers are encouraged to weaponize their four-seamer. Others generate unusual curveball spin efficiency — those pitchers are built around their breaking ball. Rapsodo makes objective what was previously subjective: rather than a pitching coach saying 'I think your curve is your best pitch,' the data shows exactly how much active spin each pitch generates and what the resulting movement profile will be at the major league level.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Total Spin Rate", sub: "rpm measured by Rapsodo/Statcast", type: "system" },
          { label: "Spin Axis Angle", sub: "12:00=pure backspin, 6:00=topspin", type: "attacker" },
          { label: "Spin Efficiency", sub: "% contributing to Magnus Force", type: "victim" },
          { label: "Actual Movement", sub: "horizontal + vertical inches of break", type: "result" },
        ],
      },
      timeline: [
        { year: 2000, event: "Early high-speed cameras begin quantifying spin rate research at the university level" },
        { year: 2015, event: "Statcast deployed in MLB — spin rate becomes a publicly available metric for every pitch", highlight: true },
        { year: 2017, event: "Rapsodo baseball models become affordable for college and high school programs" },
        { year: 2018, event: "Dodgers establish Camelback Ranch data lab — systematic spin optimization for all minor leaguers", highlight: true },
        { year: 2020, event: "Sticky substance controversy — spin rate jumps across the league prompt MLB investigation" },
        { year: 2024, event: "Spin efficiency becomes a mainstream pitching development term in youth and college coaching" },
      ],
      keyTakeaways: [
        "Spin rate (rpm) is only meaningful in context of spin axis and efficiency — all three variables determine movement",
        "Active spin creates Magnus Force movement; gyro spin creates no movement — efficiency is the ratio of active to total spin",
        "A fastball with lower rpm but higher efficiency can outperform one with higher rpm but more gyro spin",
        "Rapsodo allows pitchers to objectively test grip variations and find the specific hand position that maximizes their natural spin efficiency",
      ],
      references: [
        { title: "Baseball Savant: Spin Rate and Movement Database", url: "https://baseballsavant.mlb.com" },
        { title: "Rapsodo: Baseball Metrics Explained", url: "https://rapsodo.com/baseball" },
        { title: "Fangraphs: Spin Rate and Pitch Value Correlations", url: "https://www.fangraphs.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-6-08-q1",
          type: "Spin Efficiency",
          challenge: `  Two pitchers have the same four-seam
  fastball spin rate: 2,500 rpm.

  Pitcher A's fastball generates 14 inches
  of vertical rise (Magnus Effect).
  Pitcher B's fastball generates only 8 inches
  of vertical rise.

  Same spin rate. Different movement.
  What explains the difference?`,
          text: "How can two fastballs with identical spin rates produce different amounts of vertical movement?",
          options: [
            "Velocity is the difference — higher velocity increases Magnus Effect regardless of spin",
            "Spin axis and efficiency differ — Pitcher A's spin is mostly active backspin; Pitcher B's has more gyro spin component",
            "Hand size creates the difference — larger hands naturally produce more efficient backspin",
            "The difference is stadium altitude — Pitcher A pitches at sea level, Pitcher B at elevation",
          ],
          correctIndex: 1,
          explanation: "Total spin rate is not the same as movement-producing spin. A 2,500 rpm fastball with 95% active spin efficiency produces 2,375 rpm of pure backspin driving the Magnus Effect — this creates 14 inches of rise. The same 2,500 rpm with 65% active spin produces only 1,625 rpm of movement-generating backspin — reducing the Magnus Effect to about 8 inches of rise. The remaining 35% is gyro spin, which spins like a rifle bullet with no aerodynamic effect. Two identical spin rates on the display look the same but perform completely differently at the plate.",
        },
        {
          id: "baseball-6-08-q2",
          type: "Spin Axis",
          challenge: `  A pitcher's Rapsodo data shows:
  - Fastball spin axis: 12:15 (slightly tilted right)
  - Spin rate: 2,400 rpm

  His fastball has some arm-side run AND
  rise effect, rather than pure rise.

  The pitching coach says: "We can use
  that tilt or work to straighten it — your
  choice based on how you want the pitch to move."

  What does each option produce?`,
          text: "How does a slightly tilted spin axis on a fastball change its movement profile compared to a pure 12:00 backspin axis?",
          options: [
            "A tilted axis only reduces efficiency — it produces no directional change in movement",
            "A 12:15 axis adds arm-side run (horizontal movement) to the rise effect — creating a riding fastball that also tails; 12:00 produces pure rise with no lateral component",
            "Tilt direction only matters for breaking balls — fastball axes are functionally equivalent between 11:00 and 1:00",
            "Straightening the axis to 12:00 always produces more movement than any tilted axis regardless of pitcher",
          ],
          correctIndex: 1,
          explanation: "Spin axis determines the direction of Magnus Force. A pure 12:00 axis (pure backspin) creates force directly upward — maximum rise, no lateral component. A 12:15 axis adds a small rightward component (for a right-handed pitcher), creating both rise and arm-side run — the ball both rides and tails slightly to the right. This is why some elite fastballs are described as 'rising and running' — their axis is naturally tilted toward arm-side. Whether to keep the tilt or straighten it is a choice about movement profile: pure ride vs. ride-plus-tail. Both can be effective with different pitch mixes.",
        },
        {
          id: "baseball-6-08-q3",
          type: "Rapsodo Usage",
          challenge: `  A 16-year-old pitcher does a Rapsodo
  session with three grip variants of his
  curveball.

  Grip A: 2,650 rpm, 88% efficiency, 6:05 axis
  Grip B: 2,400 rpm, 95% efficiency, 6:00 axis
  Grip C: 2,800 rpm, 72% efficiency, 5:45 axis

  Which grip should he develop, and why?`,
          text: "How do you evaluate competing curveball grip variants using spin data to select the optimal development grip?",
          options: [
            "Grip C — highest total rpm means most movement",
            "Grip B — highest spin efficiency with a clean 6:00 axis produces the most active downward break despite lower total rpm",
            "Grip A — the best balance of rpm and efficiency",
            "Grip C — 5:45 axis creates diagonal break that is harder to identify",
          ],
          correctIndex: 1,
          explanation: "Active spin is total rpm multiplied by efficiency. Grip B: 2,400 × 0.95 = 2,280 active rpm of pure downward topspin. Grip A: 2,650 × 0.88 = 2,332 active rpm at a slightly tilted axis. Grip C: 2,800 × 0.72 = 2,016 active rpm with a diagonal axis. Grips A and B are close — but Grip B's perfect 6:00 axis means all active spin is producing pure vertical drop, making it the cleanest, most predictable break profile. Grip A's slightly tilted axis creates a tiny diagonal movement that may reduce pure vertical drop. Grip C's high total rpm looks impressive but most of it is gyro waste. For a curveball, axis precision and efficiency matter more than raw rpm.",
        },
        {
          id: "baseball-6-08-q4",
          type: "Data Application",
          challenge: `  A Dodger pitching coach tells a prospect:
  "Your changeup has 1,800 rpm — but your
  Rapsodo shows 55% spin efficiency. That's
  990 active rpm, and it's moving like a
  straight slower fastball. We need to change
  something."

  What does the coach want to change, and why?`,
          text: "When a changeup's spin efficiency is too high, what does that mean for pitch movement, and how is it fixed?",
          options: [
            "High efficiency is always desirable — 55% efficiency is actually too low and needs improvement",
            "55% spin efficiency on a changeup means too much of the spin is active topspin or backspin rather than chaotic tumble — the pitch lacks fading dive movement and resembles a fastball with less velocity",
            "The problem is spin rate — 1,800 rpm is too high for a changeup and needs to be reduced",
            "Efficiency doesn't affect changeup movement — only velocity differential matters for a changeup",
          ],
          correctIndex: 1,
          explanation: "A changeup at 55% efficiency with 1,800 rpm produces 990 active rpm — and if that active spin is mostly backspin (similar to a fastball), the pitch rides rather than fades. An effective circle changeup should have lower efficiency (30–50%) with its remaining spin producing fade (arm-side run) and tumble rather than rise. The coach wants the pitcher to adjust their grip so the release produces less organized spin — more chaotic tumble and fade — rather than the tidy backspin that makes it behave like a weak fastball. This is why grip adjustments from Rapsodo data can transform a mediocre changeup into a genuine weapon.",
        },
      ],
    },
  },

  // ─── baseball-6-09: Pitch Tunneling and Deception ────────────────────────────
  {
    epochId: "baseball-6",
    wonder: {
      name: "Dodger Stadium — From Pitcher's Mound to Home Plate",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "🔭",
    },
    id: "baseball-6-09",
    order: 9,
    title: "Pitch Tunneling and Deception",
    subtitle: "Tunnel point, shared release, and building a cohesive arsenal",
    category: "sports",
    xp: 90,
    badge: { id: "baseball-6-badge-09", name: "Tunnel Vision", emoji: "🔭" },
    challengeType: "quiz",
    info: {
      tagline: "The most dangerous pitch in baseball is the one that looks exactly like the pitch before it — until it doesn't.",
      year: 2016,
      overview: [
        "Pitch tunneling is the science of making two or more pitches look identical for as long as possible before they diverge into different movement profiles. The 'tunnel' is the shared flight path that all pitches from a given pitcher must pass through — typically the first 20–25 feet after release. A hitter cannot identify a pitch type until the ball exits the tunnel, which happens at approximately 20–25 feet from the release point, leaving roughly 175 milliseconds for the hitter to identify, decide, and swing.",
        "A pitcher with excellent tunneling throws every pitch with the same release point, same arm angle, and same initial trajectory. Whether it is a fastball, curveball, slider, or changeup, all pitches leave the pitcher's hand on the same path. The divergence — the point where physics causes each pitch's movement to differentiate — happens as late as possible. The shorter the tunnel (meaning pitches diverge earlier), the more time the hitter has to identify the incoming pitch type and adjust. The longer the tunnel (pitches share the same path further), the less time remains after divergence for adjustment.",
        "Creating a cohesive arsenal means deliberately designing each pitch to maximize tunnel sharing. This is why pitcher development coaches at the Dodger organization teach that every pitch must be thrown from the same arm slot and release point — not because it is stylistically consistent, but because deviating the arm slot between a fastball and a curveball allows the hitter to identify the pitch from the arm action alone, before the ball even leaves the hand. The tunnel collapses when arm angles differ.",
      ],
      technical: {
        title: "The Tunnel Point — Physics and Decision Windows",
        body: [
          "The tunnel point is defined as the moment when a pitch's trajectory diverges from the baseline straight-line path enough to be visually distinguishable. Research using high-speed camera data and reaction-time modeling (notably work by Jeremy Greenhouse, one of the original Statcast researchers) shows that hitters cannot distinguish pitch types in the first 23 feet of flight. After the tunnel point — at approximately 23–28 feet depending on the pitch — hitters have between 125 and 175 milliseconds to commit their swing decision.",
          "Pitchers who maximize tunnel sharing force the hitter into the worst-case decision scenario: minimal time from identification to required swing initiation. The mathematical relationship works like this: if a fastball and curveball share the same tunnel point at 23 feet, the hitter has full identification time (175 ms) for both but must still commit under equal pressure. If the curveball exits the tunnel at 15 feet (poor tunneling), the hitter sees the earlier break and has 225 ms to adjust — a significant advantage. That 50-millisecond difference can mean the difference between a swing-and-miss and a well-timed drive.",
        ],
        codeExample: {
          label: "Tunnel Point Geometry — Pitch Decision Windows",
          code: `  RELEASE POINT: 55 feet from plate (hand release)
  PLATE: 0 feet

  TUNNEL (shared path):
  0–23 feet from plate:
  → Hitter CANNOT distinguish pitch type
  → All pitches appear identical in this zone
  → Pitcher must release all pitches from
    SAME point and arm angle

  DIVERGENCE ZONE (23–35 feet from plate):
  → Spin effects begin to differentiate pitches
  → Early divergers give hitter +50 ms to adjust

  DECISION ZONE (< 23 feet from plate):
  → Hitter identifies pitch and commits
  → ~175 ms remaining to execute swing
  → 175 ms: minimum viable decision window

  TUNNEL COLLAPSE CAUSES:
  → Arm slot change between pitches (visible pre-release)
  → Grip change causing premature movement onset
  → Wrist angle telegraph (visible to hitters/coaches)

  TUNNEL OPTIMIZATION:
  ✓ Same arm slot ALL pitches
  ✓ Same release point ALL pitches
  ✓ Movement driven by spin, not arm action
  ✓ Test: film release point from behind — must match`,
        },
      },
      incident: {
        title: "Kershaw's Three-Pitch Tunnel — The Most Cohesive Arsenal in Modern Baseball",
        when: "2013–2016 — Kershaw's peak tunnel dominance",
        where: "Dodger Stadium, Los Angeles, California",
        impact: "Clayton Kershaw's arsenal during his 2013–2016 peak is widely cited by pitching researchers as the modern benchmark for pitch tunneling. His fastball, curveball, and slider all exited his hand from the same release point and arm slot — creating a single tunnel that three completely different pitches had to travel before diverging, leaving hitters with the minimum possible identification window for each.",
        body: [
          "High-speed camera analysis of Kershaw's delivery during his Cy Young years shows remarkably consistent release point data across all three pitch types. His arm angle, wrist position, and hand release location differed by fewer than two inches across his fastball, curveball, and slider — a physical consistency so precise that opposing hitting coaches reported being unable to identify any pre-pitch tell from his delivery. Everything looked identical until the ball was 20+ feet in the air.",
          "The consequence for hitters was a compound deception problem: they knew Kershaw's pitch types and approximate speeds, but they could not identify which one was coming until the ball had already traveled 23 feet — leaving 175 ms or less for identification and decision. Three different planes of movement (straight-with-rise, vertical-drop, lateral-cut), three different velocities, all from an indistinguishable tunnel. Advanced hitters who studied video noted that the only reliable tell was ball flight direction in the tunnel zone — but that information arrives too late to help them. This is the ideal: make every pitch look identical for as long as physically possible.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Same Release Point", sub: "all pitches from identical arm slot", type: "system" },
          { label: "Shared Tunnel", sub: "23+ feet of identical trajectory", type: "attacker" },
          { label: "Late Divergence", sub: "pitch type revealed at last possible moment", type: "victim" },
          { label: "175ms Decision Window", sub: "too little time to adjust swing plane", type: "result" },
        ],
      },
      timeline: [
        { year: 2000, event: "First academic research quantifies tunnel point distance and hitter identification windows" },
        { year: 2015, event: "Statcast enables precise trajectory mapping of all pitches — tunnel research goes mainstream" },
        { year: 2016, event: "Jeremy Greenhouse publishes tunnel point analysis — 'tunnel score' becomes a pitcher evaluation metric", highlight: true },
        { year: 2017, event: "MLB teams begin hiring tunnel analysts — Dodgers among first to apply data to spring training instruction" },
        { year: 2020, event: "Dodger pitching staff leads NL in tunnel scores — organizational emphasis on release-point consistency pays off", highlight: true },
        { year: 2024, event: "Tunnel science now taught at the collegiate level — high school programs beginning to integrate it" },
      ],
      keyTakeaways: [
        "The tunnel is the first 23+ feet of shared flight path — hitters cannot identify pitch type until the tunnel ends",
        "Same arm slot and release point for every pitch is the physical requirement for a long, effective tunnel",
        "Pitches that diverge early (poor tunneling) give hitters more identification time — 50 extra milliseconds is a game-changer",
        "A cohesive arsenal means every pitch looks identical until spin differentiates them — the break, not the arm, reveals the pitch",
      ],
      references: [
        { title: "Baseball Savant: Pitch Tunneling Scores", url: "https://baseballsavant.mlb.com" },
        { title: "The Athletic: Tunnel Point Analysis and Kershaw", url: "https://theathletic.com" },
        { title: "Fangraphs: Pitch Tunneling Metrics Explained", url: "https://www.fangraphs.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-6-09-q1",
          type: "Tunnel Concept",
          challenge: `  Pitcher A throws his fastball from a 3/4
  arm slot and his curveball from over
  the top. His curveball has great break.

  Pitcher B throws both pitches from
  exactly the same arm slot. His curveball
  has slightly less break than Pitcher A's.

  Who is harder to hit, and why?`,
          text: "Why does a consistent arm slot across pitch types make a pitcher more effective even if individual pitch movement is slightly less dramatic?",
          options: [
            "Pitcher A — more break on the curveball always creates more difficulty for hitters",
            "Pitcher B — identical arm slots for all pitches extend the tunnel, giving hitters no pre-pitch identification cue from arm angle",
            "They are equivalent — arm slot only matters for command, not deception",
            "Pitcher A — varying arm angles between pitches makes it harder for hitters to pick up release point",
          ],
          correctIndex: 1,
          explanation: "A different arm slot on the curveball tells the hitter 'breaking ball' before the ball leaves the hand — the tunnel hasn't even started yet, but identification has already happened. Pitcher A's curveball may have more dramatic break, but hitters see it coming 400 milliseconds before the ball even arrives. Pitcher B's identical arm slots give no pre-pitch information — hitters must wait until the ball exits the shared tunnel at 23+ feet, then have only 175 ms to identify and respond. The tunnel advantage from a consistent arm slot more than compensates for slightly less dramatic movement.",
        },
        {
          id: "baseball-6-09-q2",
          type: "Decision Window",
          challenge: `  Research shows a hitter has approximately
  175 milliseconds to identify a pitch and
  commit to a swing after the ball exits
  the tunnel.

  A batter's fastest voluntary reaction
  time to a visual stimulus is about
  200 milliseconds.

  What does this math reveal about how
  hitting works at the elite level?`,
          text: "What does the comparison between pitch identification time and voluntary reaction time reveal about the cognitive process of hitting?",
          options: [
            "It reveals that hitting is impossible — the math suggests no one should be able to hit a baseball",
            "It reveals that conscious analytical decision-making is too slow — elite hitting requires predictive anticipation based on pattern recognition, not real-time calculation",
            "It reveals that hitters need more reaction time training — the physical component is the limiting factor",
            "It reveals that pitchers have an insurmountable advantage — hitters should always strike out more than they do",
          ],
          correctIndex: 1,
          explanation: "If voluntary reaction time (200 ms) exceeds the identification window (175 ms), conscious decision-making can't work — the body would need to start swinging before the brain has consciously identified the pitch. Elite hitters don't think 'this is a curveball, I will swing low' in real time. They pre-load predictions based on count, pitcher tendency, previous pitches, and seam patterns — and they start swing patterns based on probabilities before the ball exits the tunnel. When their prediction matches the incoming pitch, the swing connects. When it doesn't, they either miss or check. Pattern recognition, not reaction speed, is what elite hitting runs on.",
        },
        {
          id: "baseball-6-09-q3",
          type: "Arsenal Design",
          challenge: `  You are designing a three-pitch arsenal.
  You have a 93 mph four-seam fastball,
  a 78 mph curveball, and a developing
  changeup at 82 mph.

  Your pitching coach says: "Your changeup
  is actually hurting your curveball right now."

  How could a changeup at 82 mph make a
  78 mph curveball less effective?`,
          text: "How can a changeup that is faster than the curveball disrupt the intended movement contrast between pitches?",
          options: [
            "It cannot — each pitch is independent, and one pitch's velocity doesn't affect another's effectiveness",
            "If the changeup (82 mph) is thrown after the curveball (78 mph), hitters have already slowed their timing for the slower pitch and adjust faster to the changeup than intended",
            "The changeup's spin profile confuses the hitter's identification of the curveball from the tunnel",
            "The coach is wrong — having three pitches is always better than two regardless of velocity overlap",
          ],
          correctIndex: 1,
          explanation: "Arsenal design requires velocity spacing. If the changeup at 82 mph is thrown after a curveball at 78 mph — which the hitter has already timed and adjusted to — the 4 mph faster changeup arrives within their adjustment window and they can handle it. The changeup should always contrast the fastball (10–15 mph slower), not the curveball (which may be closer in velocity). Additionally, throwing changeup after curveball negates the changeup's primary deception mechanism: fooling fastball timing. The coach is pointing out that the pitcher is using the changeup as a curveball alternative rather than a fastball contrast.",
        },
        {
          id: "baseball-6-09-q4",
          type: "Practical Application",
          challenge: `  A pitcher films his bullpen session from
  directly behind home plate (the catcher's
  view). Comparing fastball and curveball clips,
  he can clearly see his arm drops lower
  before throwing the curveball.

  His curveball is 50% of the way to the
  plate before it begins to break.

  What two problems does this film reveal,
  and what is the priority fix?`,
          text: "When film reveals both an arm-slot tell and late-starting pitch break, which problem should be addressed first and why?",
          options: [
            "Fix the break first — getting the pitch to break earlier is the higher-value improvement",
            "Fix the arm slot first — the tell collapses the tunnel before the ball even leaves the hand, negating any break-timing improvement",
            "Fix both simultaneously — they are equal priority and connected mechanically",
            "Neither is a problem — arm slot differences are fine as long as velocity is high enough",
          ],
          correctIndex: 1,
          explanation: "The arm-slot tell is the higher priority because it destroys the tunnel before the pitch even begins. A hitter who can identify 'curveball incoming' from the arm slot has essentially infinite identification time — they see the tell from the windup, not from pitch flight. Fixing the break timing is meaningless if the hitter already knows the curveball is coming before it leaves the hand. The fix sequence: first establish identical arm slot for all pitches (collapses the pre-pitch tell), then refine the break profile (maximizes the late divergence advantage). Address the earliest information leak first.",
        },
      ],
    },
  },

  // ─── baseball-6-10: Building Your Arsenal by Age ─────────────────────────────
  {
    epochId: "baseball-6",
    wonder: {
      name: "Camelback Ranch — Minor League Fields",
      location: "Glendale, Arizona",
      era: "Modern",
      emoji: "🌱",
    },
    id: "baseball-6-10",
    order: 10,
    title: "Building Your Arsenal by Age",
    subtitle: "Age-appropriate pitch development and the Dodger minor league ladder",
    category: "sports",
    xp: 95,
    badge: { id: "baseball-6-badge-10", name: "Complete Arsenal", emoji: "🎯" },
    challengeType: "quiz",
    info: {
      tagline: "Every great pitcher's arsenal was built one pitch at a time, in the right order, at the right age — the Dodgers have a system for it.",
      year: 2005,
      overview: [
        "Building a pitch arsenal is a multi-year developmental project that must be sequenced by physical maturity, mechanical foundation, and competitive context. Throwing pitches before the body is ready — or before the mechanical foundation is solid — creates injury risk, bad habits, and stunted development. The best pitching programs in baseball (including the Dodger system) follow a structured progression that prioritizes fastball command first, adds the changeup second, then introduces breaking balls only when the physical and mechanical prerequisites are established.",
        "Age-based guidelines from the American Sports Medicine Institute, Pitch Smart (a joint MLB/USA Baseball initiative), and numerous professional organization development programs converge on a consensus: command before velocity, changeup before curveball, curveball before slider, splitter/forkball last (if ever). The rationale is both physiological (growth plates close in sequence from bottom to top of the arm, with the elbow closing around 15–17 and the shoulder around 18–21) and mechanical (throwing breaking balls before a solid fastball mechanics foundation creates compensatory patterns that persist for years).",
        "The Los Angeles Dodgers' minor league pitching development system at Camelback Ranch is organized around this same progression. Minor leaguers entering the system — many of whom throw multiple pitch types already — undergo a Rapsodo evaluation session, and development coaches assess which pitches are mechanically sound versus which were developed incorrectly or are being thrown in ways that create injury risk. Pitches that are potentially harmful are paused, rebuilt, or eliminated. Development is patient — the organization would rather spend two years building a mechanically sound slider than one year allowing a damaging slider to continue for the sake of short-term competitive performance.",
      ],
      technical: {
        title: "The Arsenal Progression — From 8 to 18+",
        body: [
          "Age 8–10 (foundation years): The only pitch that should be thrown is the four-seam fastball, with an occasional two-seamer if the pitcher is mechanically advanced. At this age, the goal is not repertoire breadth — it is mechanics mastery. Stride direction, arm path, hip rotation, and release point consistency are the entire focus. A 10-year-old with a mechanically perfect fastball is far better prepared for long-term success than one with a fastball, changeup, and 'curve' that are all mechanically flawed.",
          "Age 11–13 (changeup introduction): The circle changeup is introduced alongside the established fastball. The two-pitch combination — fastball command plus changeup deception — is sufficient for competitive success at this level and prepares the arm for decades of healthy pitching. Curveball experimentation may begin at age 13, but only in bullpen settings with careful mechanical oversight and low volume. No sliders. No splitters.",
          "Age 14–16 (curveball development): With growth plates in the elbow approaching closure, the curveball is formally introduced in competitive settings. Mechanics are closely monitored for wrist/elbow stress indicators. The slider may be introduced at age 15–16 with proper pronation mechanics but should remain low-volume. High school pitchers who can command fastball, changeup, and one breaking ball have a complete competitive arsenal.",
          "Age 17–18+ (arsenal completion): The slider is developed fully. For pitchers with large hands and appropriate physical maturity, the splitter may be introduced. The cutter can be added by any pitcher who can maintain fastball velocity near 100% — since the grip change is minimal, the arm stress is similar to a fastball. Pitch count limits and rest requirements remain critical even as repertoire expands.",
        ],
        codeExample: {
          label: "Arsenal Progression by Age — Dodger System Model",
          code: `  AGE 8–10 — Foundation:
  ✓ Four-seam fastball (mechanics first)
  ✓ Optional: two-seam fastball (if mechanically ready)
  ✗ No breaking balls
  ✗ No changeup required yet (can introduce at 10)
  Focus: MECHANICS, not pitch variety

  AGE 11–13 — Two-Pitch Competency:
  ✓ Four-seam fastball (must be commanded)
  ✓ Circle changeup (arm speed deception)
  ✓ Age 13: Curveball may begin in bullpen (low vol.)
  ✗ No slider
  ✗ No splitter
  Focus: Fastball command + changeup deception

  AGE 14–16 — Breaking Ball Introduction:
  ✓ Fastball (command first pitch)
  ✓ Changeup (established second pitch)
  ✓ Curveball (competitive introduction)
  ✓ Age 15–16: Slider (pronation mechanics only)
  Focus: Three-pitch arsenal, tunneling

  AGE 17–18+ — Arsenal Completion:
  ✓ All above pitches
  ✓ Slider (full development)
  ✓ Cutter (if fastball velocity sustainable)
  ✓ Splitter (large hands, mature growth plates only)
  Focus: Rapsodo optimization, sequencing, tunneling

  DODGER MINOR LEAGUE STANDARD (entry evaluation):
  → Fastball: command and spin rate assessed
  → Changeup: speed differential and arm speed
  → Breaking ball: mechanics audit (safe vs. not)
  → Pause and rebuild any pitch with injury risk`,
        },
      },
      incident: {
        title: "Yoshinobu Yamamoto and the Dodger Pitch Development Philosophy",
        when: "December 2023 — Yamamoto signs 12-year, $325 million deal",
        where: "Camelback Ranch, Glendale, Arizona / Dodger Stadium",
        impact: "Yoshinobu Yamamoto's arrival at the Dodgers brought one of the most complete pitching arsenals in baseball to Los Angeles — a four-pitch pitcher who went through Japan's structured development system that prioritizes mechanics, spin efficiency, and sequential pitch development. His example demonstrates what a fully realized arsenal built through structured progression looks like at its peak.",
        body: [
          "Yamamoto's development in the Nippon Professional Baseball system mirrors the Dodger minor league philosophy in striking ways. He mastered a premium four-seam fastball first, developed an elite splitter as his signature put-away pitch (Japan's version of the changeup role in American development), and added a slider and curveball over years of careful progression. The result is a pitcher who at age 25 throws four distinct pitches on four planes with elite command of each — the product of a development philosophy that values doing each pitch correctly over adding pitches quickly.",
          "When Yamamoto arrived at Camelback Ranch for his first Dodger spring training, the pitching development staff ran his arsenal through Rapsodo evaluation — not to fix anything, but to establish a precise baseline of his spin rates, axes, and efficiency profiles that could be monitored across a 12-year contract. The Dodgers' interest in data continuity alongside Yamamoto's Japanese development model is itself a philosophy statement: the best pitchers are not those who throw the most pitches, but those who throw each pitch with the highest quality, built one at a time through a patient and structured progression.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Age 8–10: Fastball", sub: "mechanics foundation first", type: "system" },
          { label: "Age 11–13: + Changeup", sub: "arm speed deception added", type: "attacker" },
          { label: "Age 14–16: + Curveball/Slider", sub: "growth plate readiness", type: "victim" },
          { label: "Age 17+: Complete Arsenal", sub: "Rapsodo optimization, sequencing", type: "result" },
        ],
      },
      timeline: [
        { year: 2005, event: "Pitch Smart initiative begins — MLB and USA Baseball formalize age-appropriate pitch guidelines", highlight: true },
        { year: 2010, event: "ASMI research links specific pitch types to injury rates by age — curveball and slider data published" },
        { year: 2015, event: "Dodgers establish structured minor league pitch development program at Camelback Ranch" },
        { year: 2019, event: "Pitch Smart guidelines adopted by most youth baseball organizations in the US", highlight: true },
        { year: 2023, event: "Yamamoto signs with Dodgers — complete 4-pitch arsenal from structured Japanese development" },
        { year: 2024, event: "Dodger minor league system produces multiple MLB-ready pitchers through structured arsenal progression" },
      ],
      keyTakeaways: [
        "Four-seam fastball mechanics come first — no other pitch is useful without a sound fastball foundation",
        "Changeup is the safest and most important second pitch: same arm action, no additional elbow stress",
        "Curveball at 13–14, slider at 15–16, splitter/forkball at 17+ — physiology determines the progression, not impatience",
        "The Dodger system audits every pitcher's mechanics on entry — any pitch with injury risk is paused and rebuilt before development continues",
      ],
      references: [
        { title: "MLB Pitch Smart: Age-Appropriate Pitching Guidelines", url: "https://www.mlb.com/pitch-smart" },
        { title: "ASMI: Pitch Type and Injury Risk by Age", url: "https://www.asmi.org/research.php?title=baseball" },
        { title: "Dodgers: Yoshinobu Yamamoto Pitch Arsenal", url: "https://www.mlb.com/dodgers" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-6-10-q1",
          type: "Age Guidelines",
          challenge: `  A 10-year-old pitcher is dominating his
  league with a fastball and changeup.
  His dad wants to teach him a curveball
  next so he can "stay ahead of the hitters."

  His Little League coach says to wait.

  What is the physiological reason to
  wait even though the child is clearly
  talented and mechanically capable?`,
          text: "Why should a talented 10-year-old with excellent mechanics still avoid throwing curveballs?",
          options: [
            "The coach is being too conservative — if mechanics are excellent, the risk is negligible",
            "Growth plates in the elbow (medial epicondyle physis) remain open and vulnerable to stress fracture at age 10 — curveball torque can cause structural damage regardless of mechanics quality",
            "The curveball is not effective at youth velocity levels — the developmental reason is competitive, not physiological",
            "The dad is right — early curveball development creates a skill advantage that outweighs modest risk",
          ],
          correctIndex: 1,
          explanation: "The medial epicondyle growth plate (physis) at the elbow is a cartilaginous structure in children that has not yet ossified into bone. It is significantly weaker than fully formed bone and vulnerable to apophysitis (stress injury) or avulsion fracture from rotational torque. The curveball's wrist rotation and elbow valgus stress applies force directly to this structure. Good mechanics reduce but do not eliminate this stress. At age 10, the growth plate has years of development remaining — the risk-reward is clearly negative. At 13–14, as the plate approaches closure, the calculus changes. No amount of talent or mechanical quality changes the physiology.",
        },
        {
          id: "baseball-6-10-q2",
          type: "Development Philosophy",
          challenge: `  A 14-year-old pitcher enters a travel
  baseball program. He already throws a
  fastball, curveball, slider, and is
  attempting a splitter.

  The program's pitching coach immediately
  suspends the slider and splitter.

  The parents are upset. The coach explains:
  "We're not eliminating these pitches —
  we're pausing them."

  What is the purpose of pausing rather
  than continuing to develop these pitches?`,
          text: "Why do elite development programs pause injury-risk pitches in young pitchers rather than simply refining them?",
          options: [
            "Pausing is unnecessary — if the pitcher has already thrown these pitches without injury, they are safe to continue",
            "Pausing allows the program to evaluate whether mechanics are safe, rebuild the fastball-changeup foundation if needed, and re-introduce the pitch correctly rather than reinforcing potentially damaging habits",
            "Pausing is just a liability protection strategy for the organization, not a genuine development tool",
            "A 14-year-old who already has a slider and splitter has nothing to gain from pausing — the damage is already done",
          ],
          correctIndex: 1,
          explanation: "A pitch thrown with poor mechanics for two years has embedded those mechanics deeply. Simply continuing to throw it reinforces the bad pattern. Pausing creates a window to assess what the mechanics actually are, whether they are producing injury stress, what the Rapsodo data shows about the pitch's current profile, and whether a rebuild from correct mechanical principles would produce a better and safer pitch than continuing to refine flawed fundamentals. Many pitchers who had elbow surgery report having thrown their slider 'fine for years' before sudden injury — the accumulation happened invisibly. A pause is a diagnosis, not a punishment.",
        },
        {
          id: "baseball-6-10-q3",
          type: "Yamamoto Model",
          challenge: `  Yoshinobu Yamamoto has four elite pitches
  at age 25 — built over a decade of
  structured Japanese development.

  A 16-year-old pitcher asks: "How do I
  get four great pitches by the time I'm
  25?"

  What is the single most important
  principle from Yamamoto's development
  model to give this pitcher?`,
          text: "What single development principle most defines how elite pitchers like Yamamoto build complete arsenals over time?",
          options: [
            "Practice every pitch equally every day — balanced development produces balanced arsenals",
            "Master each pitch sequentially before adding the next — one excellent pitch at a time is better than four mediocre ones simultaneously",
            "Focus on velocity first — repertoire expansion follows naturally from higher velocity",
            "Throw all pitch types early to develop neural pathways before growth plates close",
          ],
          correctIndex: 1,
          explanation: "Sequential mastery — one pitch at a time — is the defining principle of elite long-term development. Yamamoto spent years mastering his fastball before his splitter received serious development. When a pitch is genuinely mastered (commanded, optimized, mechanically sound), it becomes the platform on which the next pitch is built. Contrast: throwing four pitches poorly creates four mediocre habits reinforcing each other. Four pitches built sequentially creates four excellent habits where each pitch's development benefited from the mechanically sound foundation the previous pitch established. The Dodger minor league model is explicit on this: command your fastball before you develop your changeup, command your changeup before you develop your curve.",
        },
        {
          id: "baseball-6-10-q4",
          type: "Complete Arsenal",
          challenge: `  At 18 years old, you are entering college
  baseball. You have:
  - 88 mph four-seam fastball (good command)
  - 76 mph curveball (above average break)
  - 71 mph changeup (needs arm speed work)
  - 83 mph slider (new, mechanics uncertain)

  Your college pitching coach asks you to
  rank your four pitches in development
  priority for the first semester.

  What is the correct priority order?`,
          text: "How should an 18-year-old college pitcher prioritize development across four existing pitches?",
          options: [
            "1. Slider (newest, most upside) 2. Changeup 3. Curveball 4. Fastball (already good)",
            "1. Fastball (your anchor) 2. Changeup (arm speed fix is critical) 3. Curveball (refine) 4. Slider (mechanics audit first)",
            "1. Curveball (above average — develop your best pitch first) 2. Fastball 3. Slider 4. Changeup",
            "All four equally — division of development time should be exactly 25% per pitch",
          ],
          correctIndex: 1,
          explanation: "Priority logic: (1) The fastball is every pitch's foundation — maintaining and improving command of an 88 mph fastball should never stop being a priority, regardless of how good other pitches get. (2) The changeup with arm speed problems is the most urgent fix — a telegraphed changeup is worse than no changeup because it doesn't deceive and it teaches the hitter to wait. (3) The curveball is already a weapon — refining rather than rebuilding. (4) The slider is newest and its mechanics are uncertain — before developing it further, a mechanics audit (is it pronation-based or supination-based?) should come first. Developing a mechanically dangerous slider further would be worse than starting over with correct mechanics.",
        },
      ],
    },
  },
];
