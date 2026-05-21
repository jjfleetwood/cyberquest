import type { StageConfig, EpochConfig } from "./types";

export const baseball2Epoch: EpochConfig = {
  id: "baseball-2",
  name: "The Art of Hitting",
  subtitle: "Mastering the Batter's Box",
  description:
    "Hitting a round ball with a round bat is the hardest skill in professional sports — and the most rewarding when you get it right. This epoch dives deep into every facet of the craft: stance, pitch recognition, swing mechanics, plate discipline, power, contact adjustments, and the legendary Dodger hitters who mastered it all. From Jackie Robinson's bunts to Shohei Ohtani's leg kick, you'll learn to think like the best hitters in the world — and train like them too.",
  emoji: "🏏",
  color: "blue",
  unlocked: true,
};

export const baseball2Stages: StageConfig[] = [
  // ─── baseball-2-01: The Stance ────────────────────────────────────────────────
  {
    epochId: "baseball-2",
    wonder: {
      name: "Dodger Stadium",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "🏟️",
    },
    id: "baseball-2-01",
    order: 1,
    title: "The Stance",
    subtitle: "Feet, weight, hands, and loading for every pitch",
    category: "sports",
    xp: 80,
    badge: { id: "baseball-2-badge-01", name: "Batter's Box", emoji: "📐" },
    challengeType: "quiz",
    info: {
      tagline: "Every great swing starts before the ball leaves the pitcher's hand — it starts with how you stand.",
      year: 1958,
      overview: [
        "The batting stance is the foundation of every swing. There is no single perfect stance — Mookie Betts uses a gentle toe-tap to time his load, Shohei Ohtani employs a dramatic high leg kick to generate torque, and some of the best contact hitters in history barely moved their feet at all. What all great stances share is balance, a clear view of the pitcher, and a reliable way to trigger the swing on time.",
        "Feet should be set slightly wider than shoulder-width apart, pointing toward the plate or slightly open. Knees are bent so that the hips are loaded and ready to fire. Weight sits evenly on the balls of both feet — neither on the heels (which causes slow reaction) nor on the toes (which causes forward lurch). The body faces the plate at roughly a 45-degree angle to the pitcher, keeping both eyes forward.",
        "Hand position is critical. Hands start near the back shoulder, bat angled at roughly 45 degrees behind the head. The grip is firm but relaxed — tension in the hands travels up into the forearms and kills bat speed. The knocking knuckles (middle knuckles of both hands) align on the handle. From this position, the hitter can load back and launch forward into any pitch in the strike zone.",
      ],
      technical: {
        title: "The Trigger — Load Styles and Why They Work",
        body: [
          "A 'trigger' is any pre-swing movement that helps a hitter time the pitch and load energy into the swing. The most common triggers are: the toe-tap (front foot lifts and sets down as the pitcher enters delivery — used by Mookie Betts and many top hitters), the leg kick (front leg lifts dramatically to generate hip torque — Shohei Ohtani, Josh Hamilton), the weight shift (slight backward weight shift onto the back foot without lifting — more common in contact-oriented hitters), and the no-trigger (quiet stance with minimal movement — used by some elite contact hitters).",
          "The purpose of any trigger is timing and loading: getting the weight onto the back side at the right moment so that the hips and hands can fire forward in sync with the pitch. A good trigger is consistent — the same movement every pitch — so the rest of the swing is reliable. Youth players should experiment to find a simple, repeatable trigger rather than copying a complex Major League kick that is difficult to time.",
        ],
        codeExample: {
          label: "Stance Checklist — Before Every At-Bat",
          code: `  FEET:
  ✓ Slightly wider than shoulder-width
  ✓ Weight on balls of feet — not heels, not toes
  ✓ Knees bent — hips loaded and ready

  HANDS:
  ✓ Knocking knuckles aligned on bat handle
  ✓ Hands near back shoulder — not too low
  ✓ Grip firm but relaxed (no white knuckles)

  EYES:
  ✓ Both eyes facing pitcher — head level
  ✓ Pick up the pitcher's release point early

  TRIGGER (choose one and be consistent):
  → Toe-tap  (Mookie Betts style)
  → Leg kick  (Ohtani / power hitters)
  → Weight shift back (contact hitter style)
  → Quiet / no-trigger

  COMMON MISTAKES:
  ✗ Too open (hips face pitcher too early)
  ✗ Too closed (can't see outside pitches)
  ✗ Weight on heels (slow first step)
  ✗ Hands too low (bat drag on every swing)`,
        },
      },
      incident: {
        title: "Mookie Betts and the Return to Dodger Stadium — 2020",
        when: "February 2020 — Dodgers acquire Mookie Betts",
        where: "Dodger Stadium, Los Angeles, California",
        impact: "When the Dodgers traded for Mookie Betts in February 2020, scouts specifically praised his toe-tap trigger as one of the most consistent and replicable timing mechanisms in the game. Betts went on to win the 2020 World Series with the Dodgers, batting .304 with key hits throughout the postseason.",
        body: [
          "Mookie Betts' batting stance has been studied and taught across youth baseball programs. His toe-tap — a gentle lift of the front foot that lands just as the pitcher begins release — creates a perfectly timed load into the back leg. The motion is small, controlled, and identical on every pitch, whether a 99-mph fastball or a 75-mph curveball. The consistency of his trigger is one reason his batting mechanics translate so well to hitters of all sizes.",
          "When Betts arrived in Los Angeles in 2020, hitting coordinator Robert Van Scoyoc noted that Betts' approach combined elite bat speed with exceptional timing discipline. He rarely got fooled by off-speed pitches because his trigger kept him back long enough to read the pitch. Youth coaches who study Betts' stance note that his toe-tap is small enough to be replicated by players of any age — it is one of the most teachable triggers in professional baseball.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Set the Stance", sub: "balance, knees bent, eyes forward", type: "system" },
          { label: "Trigger / Load", sub: "toe-tap, leg kick, or weight shift", type: "attacker" },
          { label: "Read the Pitch", sub: "track from release point", type: "victim" },
          { label: "Launch Position", sub: "weight back, ready to fire", type: "result" },
        ],
      },
      timeline: [
        { year: 1920, event: "Babe Ruth's wide open stance redefines power hitting stance for a generation" },
        { year: 1941, event: "Ted Williams' closed, crouched stance proves elite vision and balance, highlight: false" },
        { year: 1958, event: "Dodgers move to Los Angeles — Dodger Stadium becomes laboratory for hitting development", highlight: true },
        { year: 1985, event: "Biomechanics research begins analyzing stance and load mechanics for youth development" },
        { year: 2015, event: "Statcast measures bat speed and launch angle — stance mechanics linked to exit velocity data" },
        { year: 2020, event: "Mookie Betts joins Dodgers — toe-tap trigger becomes one of MLB's most studied stances" },
      ],
      keyTakeaways: [
        "Feet slightly wider than shoulder-width, weight on the balls of the feet, knees bent for a loaded hip position",
        "Hands near the back shoulder with knocking knuckles aligned — firm grip without tension in the forearms",
        "Choose a consistent trigger (toe-tap, leg kick, or weight shift) that repeats identically every pitch",
        "Both eyes must face the pitcher — a closed or turned stance limits pitch recognition and outside coverage",
      ],
      references: [
        { title: "MLB: Mookie Betts Hitting Analysis", url: "https://www.mlb.com/video" },
        { title: "Dodgers: Hitting Development Program", url: "https://www.mlb.com/dodgers" },
        { title: "Baseball Savant: Stance and Bat Speed Metrics", url: "https://baseballsavant.mlb.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-2-01-q1",
          type: "Stance",
          challenge: `  You step into the batter's box and set
  your feet very close together — about
  six inches apart — because you feel more
  comfortable in a narrow stance.

  The first pitch is a fastball inside.
  You can't get your hips through in time.

  What is the problem?`,
          text: "Why does a narrow stance limit hip rotation and bat speed?",
          options: [
            "A narrow stance is fine — foot width doesn't affect hip rotation speed",
            "A narrow stance reduces the base of support, limiting how forcefully the hips can rotate through the swing",
            "The problem is hand position, not foot width — the stance is secondary",
            "A narrow stance causes the front foot to fly open, which is the real issue",
          ],
          correctIndex: 1,
          explanation: "Hip rotation — the engine of a powerful swing — requires a stable, wide base. A narrow stance gives the hips nowhere to rotate into; the lower body has no leverage. Feet set slightly wider than shoulder-width create the athletic triangle that allows the hips to fire explosively. Think of it like a door hinge: the wider the door frame, the more powerful the swing of the door. Narrow the base and you narrow the power.",
        },
        {
          id: "baseball-2-01-q2",
          type: "Load / Trigger",
          challenge: `  You watch Shohei Ohtani's at-bat on video.
  His front leg kicks high before the swing —
  almost to his hip. Your coach says:
  "Try a simpler trigger first."

  Why does your coach suggest a simpler
  trigger than Ohtani's leg kick?`,
          text: "Why might a high leg kick be difficult for developing hitters to use consistently?",
          options: [
            "High leg kicks are illegal in youth baseball — the rulebook restricts movement",
            "A high leg kick requires precise timing to land in sync with the pitch — a small timing error creates big swing problems",
            "Leg kicks reduce bat speed — power hitters use quiet stances instead",
            "Ohtani's leg kick only works because he is left-handed — right-handed hitters cannot use it",
          ],
          correctIndex: 1,
          explanation: "A high leg kick generates significant power, but it must land exactly in sync with the pitch. If the front foot lands even slightly early or late, the hitter's weight is out of position for the entire swing. For developing hitters still learning timing, a simpler trigger — a toe-tap or small weight shift — provides the same load with far less timing risk. Master the simple trigger first, then add complexity as your pitch reading improves.",
        },
        {
          id: "baseball-2-01-q3",
          type: "Hand Position",
          challenge: `  Your hands start near your front hip —
  low and in front of your body — rather
  than near your back shoulder.

  Your batting practice results: lots of
  pop-ups and weak grounders.

  What is the cause?`,
          text: "What happens when a hitter starts with their hands too low and forward in the stance?",
          options: [
            "Low hands produce a more level swing — this should create line drives, not pop-ups",
            "Low, forward hands force the bat to travel a longer, slower path to the contact zone — creating pop-ups and late contact",
            "The hands' position only affects pitch selection, not contact quality",
            "Low hands cause the hitter to pull off the ball — the real problem is hip rotation",
          ],
          correctIndex: 1,
          explanation: "When hands start low and forward, the bat must travel a longer arc through the zone — this path takes more time, causing the hitter to be late, and the longer loop causes an upward swing plane that undercuts the ball (pop-ups) or sweeps under it. Hands near the back shoulder create the shortest, most direct path to any pitch in the zone. The hands then fire through the ball — not around it.",
        },
        {
          id: "baseball-2-01-q4",
          type: "Balance",
          challenge: `  You're in the batter's box. The pitcher is
  in the windup. You realize your weight is
  sitting back on your heels — not on the
  balls of your feet.

  What is the risk of this weight distribution
  before the pitch?`,
          text: "Why is weight on the heels problematic for a hitter's stance?",
          options: [
            "Weight on the heels is ideal — it keeps the hitter balanced and prevents lunging forward",
            "Weight on the heels slows reaction time because the hitter must first shift weight forward before any movement is possible",
            "Heel weight causes the hitter to stride too far — losing balance through the swing",
            "There is no meaningful difference — weight distribution in the stance doesn't affect swing timing",
          ],
          correctIndex: 1,
          explanation: "Athletes in any sport must be on the balls of their feet to react quickly — not on their heels, which locks the ankles and slows first movement. A hitter on their heels must shift weight forward before their stride can even begin, adding precious milliseconds to a reaction that already has less than 400 milliseconds from pitch release to contact. The balls of the feet allow instant, explosive weight transfer in any direction.",
        },
      ],
    },
  },

  // ─── baseball-2-02: Reading the Pitcher ──────────────────────────────────────
  {
    epochId: "baseball-2",
    wonder: {
      name: "Dodger Stadium — Home Plate",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "👁️",
    },
    id: "baseball-2-02",
    order: 2,
    title: "Reading the Pitcher",
    subtitle: "Pitch recognition, tunnel point, and tracking 90+ mph",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-2-badge-02", name: "Pitch Reader", emoji: "🎯" },
    challengeType: "quiz",
    info: {
      tagline: "By the time a 95-mph fastball crosses the plate, you had less than 400 milliseconds to decide — the decision was made before the ball was halfway there.",
      year: 2018,
      overview: [
        "A 95-mph fastball takes approximately 400 milliseconds to travel from a pitcher's release point to the catcher's mitt. Research shows that batters must begin their swing decision by the time the ball is roughly halfway to the plate — leaving about 175 milliseconds to identify pitch type, location, and speed. This is not enough time for conscious analytical thinking. Elite hitters develop pattern recognition so deeply trained that pitch identification is nearly automatic.",
        "The tunnel point is the concept that explains how pitchers deceive hitters. All pitches — fastball, curveball, slider, changeup — start on nearly the same trajectory out of the pitcher's hand. They share a common 'tunnel' of flight for the first 20–25 feet. After that, spin and physics cause them to diverge. A pitcher who keeps all pitches through the same tight tunnel is far more effective because the hitter cannot identify the pitch until it has already diverged — giving them far less time to adjust.",
        "Freddie Freeman, the Dodgers' first baseman and one of the premier hitters of his era, is renowned for his plate approach. He studies pitchers intensively before each game, tracking their tendencies: what pitch they throw in 2-0 counts, where they locate fastballs when ahead, what their release point does differently on a curveball. This preparation allows him to narrow his mental model of what pitch is coming — effectively giving himself more time by reducing uncertainty.",
      ],
      technical: {
        title: "Spin Identification — Reading the Seams",
        body: [
          "Advanced hitters learn to identify pitch spin from the seam rotation visible out of the pitcher's hand. A four-seam fastball rotates with pure backspin — the seams appear as a solid ring of rotation (sometimes called the 'dot' hitters look for). A curveball has topspin — the seams rotate forward over the top of the ball. A slider has a tight, tilted spin — often described as a spinning circle or dot, but smaller and with lateral tilt.",
          "Changeups are particularly deceptive because they have fastball arm speed and a similar spin profile — the difference is velocity, which the hitter can only detect in the final milliseconds. This is why changeups are so effective: the hitter's brain says 'fastball' and begins the swing, but the ball arrives 8–12 mph slower, causing early commitment and weak contact or a swing-and-miss.",
        ],
        codeExample: {
          label: "The Tunnel Point — How Pitches Deceive",
          code: `  RELEASE POINT (60'6" from plate):
  Fastball: released at same point as...
  Curveball: same release as fastball
  Slider:    same release as fastball
  Changeup:  same release, same arm speed

  THE TUNNEL (first ~20 feet of flight):
  → All pitches follow nearly identical path
  → Hitter CANNOT distinguish pitch type yet

  DIVERGENCE POINT (~40 feet from plate):
  Fastball:  continues straight / rises
  Curveball: drops sharply (12-to-6 break)
  Slider:    cuts late horizontally
  Changeup:  fades down and away

  HITTER'S DECISION WINDOW:
  → Must start swing decision here ↑
  → ~175ms remaining when ball exits tunnel
  → Goal: identify spin early, predict location`,
        },
      },
      incident: {
        title: "Freddie Freeman's Walk-Off Grand Slam — 2024 World Series Game 1",
        when: "October 25, 2024 — World Series Game 1",
        where: "Dodger Stadium, Los Angeles, California",
        impact: "Freddie Freeman's 10th-inning walk-off grand slam against the New York Yankees in World Series Game 1 was set up entirely by his deep knowledge of Yankees reliever Nestor Cortes. Freeman had studied Cortes' tendencies so thoroughly that he was able to sit on a specific pitch in a specific location — and when it came, he did not miss it.",
        body: [
          "Freddie Freeman came to the plate in the 10th inning of World Series Game 1 against the Yankees, trailing 3-2, with the bases loaded. He had been dealing with a sprained ankle throughout the postseason but was still contributing. Freeman had faced Nestor Cortes before and knew his tendencies — that Cortes liked to get ahead with fastballs before introducing his two-seamer in. Freeman sat on a pitch he could drive, and when Cortes threw a fastball on the inner half, Freeman hit a walk-off grand slam to give the Dodgers a 6-3 win.",
          "The preparation that made this moment possible was invisible: hours of video, discussions with hitting coaches, a mental map of what Cortes would do in that situation. Freeman's pitch recognition in that at-bat was not luck — it was studied anticipation. The grand slam became one of the most celebrated moments in Dodger playoff history and was cited by hitting coaches nationwide as a textbook example of how pitch preparation wins games.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Pitcher Releases Ball", sub: "all pitches share same tunnel", type: "attacker" },
          { label: "Tunnel Point", sub: "hitter cannot yet identify pitch", type: "system" },
          { label: "Divergence — Spin Takes Over", sub: "fastball vs. breaking ball splits", type: "victim" },
          { label: "Hitter's Decision", sub: "swing, take, or adjust", type: "result" },
        ],
      },
      timeline: [
        { year: 1960, event: "Ted Williams first publishes zone-by-zone pitch approach — early pitch reading science" },
        { year: 1980, event: "Video analysis introduced at MLB level — hitters begin systematic pre-game preparation" },
        { year: 2000, event: "High-speed cameras first used to study ball rotation and tunnel point physics" },
        { year: 2015, event: "Statcast tracking data allows quantification of pitch tunnels and deception", highlight: true },
        { year: 2018, event: "Pitch recognition training apps enter mainstream youth and college programs" },
        { year: 2024, event: "Freddie Freeman's World Series grand slam — pitch preparation at its most dramatic", highlight: true },
      ],
      keyTakeaways: [
        "A 95-mph fastball gives you less than 400 milliseconds — pitch recognition must be automatic, not analytical",
        "The tunnel point is why pitchers are deceptive: all pitches look the same for the first 20 feet of flight",
        "Study pitchers before games — knowing tendencies (what they throw in 2-0 counts, how they set up) reduces uncertainty",
        "Look for spin early: backspin = fastball, topspin = curveball, tight tilted spin = slider",
      ],
      references: [
        { title: "Baseball Savant: Pitch Tunnel Metrics", url: "https://baseballsavant.mlb.com" },
        { title: "MLB: Pitch Recognition Training", url: "https://www.mlb.com/video" },
        { title: "Dodgers: Freddie Freeman 2024 World Series", url: "https://www.mlb.com/dodgers" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-2-02-q1",
          type: "Pitch Recognition",
          challenge: `  You're batting against a pitcher who throws
  a fastball and a curveball. You notice that
  when he throws a curveball, his release
  point is about 2 inches lower than his
  fastball release point.

  How can you use this information?`,
          text: "How do hitters use a pitcher's release point differences to identify pitch type early?",
          options: [
            "They can't — release point differences are too small to be detected at game speed",
            "They can use the lower release point as a pre-pitch tip-off that a curveball is coming, allowing them to adjust timing",
            "They should ignore release point and focus only on spin after the ball exits the hand",
            "Release point only matters for left-handed pitchers — it has no effect on right-handers",
          ],
          correctIndex: 1,
          explanation: "Any consistent difference in a pitcher's delivery between pitch types is valuable information. A lower release point before a curveball is called a 'tell' — it gives the hitter a fraction of a second of advance notice before the ball even leaves the hand. At 90+ mph, even a 50-millisecond head start is meaningful. Elite hitters study video specifically to find these tips. If a pitcher's wrist, elbow, or release point is even subtly different for their curveball, experienced hitters will find it.",
        },
        {
          id: "baseball-2-02-q2",
          type: "Tunnel Point",
          challenge: `  Two pitchers have the same fastball velocity
  (94 mph). Pitcher A's fastball and curveball
  diverge from the same tunnel point.
  Pitcher B's curveball diverges 5 feet earlier
  than his fastball.

  Which pitcher is harder to hit, and why?`,
          text: "Why does keeping pitches through the same tunnel make a pitcher more effective?",
          options: [
            "Pitcher B — the early curveball break gives the hitter more time to identify it and adjust",
            "Pitcher A — pitches that share the same tunnel give the hitter less time to identify the pitch type before divergence",
            "They are equally effective — tunnel point doesn't affect pitch difficulty",
            "Pitcher B — the additional break distance creates more movement on the curveball",
          ],
          correctIndex: 1,
          explanation: "Pitcher A is harder to hit. When all pitches share the same tunnel — looking identical for the longest possible time before diverging — the hitter cannot identify the pitch until the latest possible moment, leaving minimum time to adjust. Pitcher B's curveball breaks out of the tunnel 5 feet earlier, giving the hitter an earlier visual cue. The goal of elite pitching is to keep hitters guessing as long as possible. The tunnel point is the core concept behind why some pitchers with average velocity are still very difficult to hit.",
        },
        {
          id: "baseball-2-02-q3",
          type: "Timing",
          challenge: `  You're in a slump — swinging through
  fastballs and way out in front of
  changeups. Your timing is completely off.

  Your hitting coach says:
  "You're guessing fastball on every pitch."

  What adjustment should you make?`,
          text: "When a hitter is getting fooled by off-speed pitches, what is usually the root cause?",
          options: [
            "The hitter's stance is too open — physical adjustment is needed, not mental",
            "The hitter is sitting on fastball velocity and committing early — they need to wait longer before firing the hips",
            "The pitcher is tipping their pitches, and the hitter is unconsciously adjusting to fake information",
            "Off-speed problems are always mechanical — the hands are too slow through the zone",
          ],
          correctIndex: 1,
          explanation: "Getting fooled by changeups is almost always a timing issue caused by early commitment. The hitter triggers early (perhaps because they are guessing fastball), fires the hips before the ball diverges from the tunnel, and can't adjust when the slower pitch arrives. The fix is not mechanical — it is mental: stay back longer, let the pitch show itself, and avoid assuming fastball. Some coaches cue this as 'sit on soft, react to hard' — start your mental clock assuming a slower pitch and accelerate if needed.",
        },
        {
          id: "baseball-2-02-q4",
          type: "Preparation",
          challenge: `  Before a game, Freddie Freeman watches 45
  minutes of video on the opposing starter.
  He notes: "In 2-0 counts, he throws fastball
  up and in 78% of the time."

  In the game, Freeman gets a 2-0 count.

  How does this preparation affect his approach?`,
          text: "How does pre-game pitcher study give a hitter an advantage in specific count situations?",
          options: [
            "It doesn't — in-game conditions are too different from video for the data to matter",
            "It allows the hitter to eliminate pitch possibilities in specific counts, effectively giving themselves more decision-making time",
            "It creates a bias — thinking about tendencies causes hitters to miss pitches that don't fit the pattern",
            "Pre-game study only helps against pitchers with two or fewer pitches",
          ],
          correctIndex: 1,
          explanation: "Pre-game preparation is pitch recognition on fast-forward. If Freeman knows that a pitcher throws fastball up-and-in 78% of the time in 2-0 counts, he can mentally sit on that pitch in that situation — narrowing his decision tree from four possible pitches to essentially one. His brain has less to process in real time, giving him a perceptual time advantage. This is why hitters who study extensively can sit on specific pitches and crush them. It is not cheating — it is preparation.",
        },
      ],
    },
  },

  // ─── baseball-2-03: The Swing Mechanics ──────────────────────────────────────
  {
    epochId: "baseball-2",
    wonder: {
      name: "Dodger Stadium — The Batter's Eye",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "⚡",
    },
    id: "baseball-2-03",
    order: 3,
    title: "The Swing Mechanics",
    subtitle: "Hip rotation, bat path, contact zone, and launch angle",
    category: "sports",
    xp: 90,
    badge: { id: "baseball-2-badge-03", name: "Sweet Spot", emoji: "💥" },
    challengeType: "quiz",
    info: {
      tagline: "A great swing is a kinetic chain — every link from the ground up fires in sequence to deliver maximum force at the contact zone.",
      year: 2015,
      overview: [
        "The modern understanding of swing mechanics has been transformed by Statcast data, which measures bat speed, launch angle, and exit velocity on every batted ball in Major League Baseball. The key insight: the most valuable contact — line drives and hard-hit fly balls — comes from a swing plane that matches the pitch's downward trajectory, creating a larger contact window rather than a smaller one. This is why the old-school coaching cue 'swing down on the ball' is now understood to produce poor contact, not good contact.",
        "Hip rotation remains the engine of the swing. As the stride foot lands, the back hip fires forward and upward (sometimes described as 'clearing the hips'), pulling the hands and bat into the contact zone. The sequence is ground-up: back foot plants, ankle rotates ('squish the bug'), knee drives inward, hip fires, core rotates, shoulders come through, hands stay palm-up and palm-down through contact, bat head arrives at the ball. Breaking the chain at any link reduces power.",
        "The contact zone — where the bat meets the ball — is ideally out in front of the body for pull pitches, at the plate edge for middle pitches, and deep (near the back hip) for away pitches. Hitters who try to pull everything make contact too early or too late on away pitches; hitters who stay deep make contact too far back on inside pitches. Reading pitch location and adjusting contact point is a skill developed through thousands of repetitions.",
      ],
      technical: {
        title: "Launch Angle — The Modern Hitting Revolution",
        body: [
          "Launch angle is the vertical angle at which the ball leaves the bat. Statcast research shows that balls hit between 10 and 30 degrees of launch angle produce the highest batting averages and slugging percentages — these are the hard line drives and medium fly balls that either drop for hits or leave the park. Balls hit at 0 degrees (perfectly flat) are usually ground balls, easy outs. Balls hit above 30 degrees are pop-ups — high and easily caught.",
          "Achieving optimal launch angle requires a slight upward swing plane — the bat traveling slightly upward through the contact zone to match the pitch's downward angle. This creates maximum overlap between bat and ball at the moment of contact. The old cue 'swing down' was meant to prevent pop-ups but actually produced ground balls. Modern instruction focuses on 'attack angle' — matching the bat path to the pitch's approach angle for the largest possible contact window.",
        ],
        codeExample: {
          label: "The Kinetic Chain — Swing Sequence",
          code: `  STEP 1: BACK FOOT PLANTS
  → Ankle rotates ('squish the bug')
  → Creates ground reaction force

  STEP 2: HIPS FIRE
  → Back hip drives forward and slightly up
  → Hips clear BEFORE hands begin moving
  → 'Separation' between hips and shoulders

  STEP 3: HANDS RELEASE
  → Back elbow slots near the body
  → Hands take shortest path to contact zone
  → Knob points at pitch briefly (barrel delay)

  STEP 4: CONTACT
  → Ideal launch angle: 10–30 degrees
  → Palm-up / palm-down grip at contact
  → Head stays on the ball

  STEP 5: EXTENSION + FOLLOW-THROUGH
  → Arms extend fully past contact
  → Bat finishes high on back shoulder
  → Weight over front foot

  EXIT VELOCITY TARGET: 95+ mph (MLB avg)
  → Correlates with bat speed at contact`,
        },
      },
      incident: {
        title: "The Statcast Revolution — How the Dodgers Built Their Lineup",
        when: "2015 — MLB Statcast era begins",
        where: "Dodger Stadium and MLB ballparks nationwide",
        impact: "When MLB deployed Statcast tracking across all 30 ballparks in 2015, the Dodgers were among the first organizations to use exit velocity and launch angle data to reshape their hitting instruction. Their emphasis on hard contact at optimal launch angles became a model for how analytics and mechanics could be integrated into a winning lineup.",
        body: [
          "In 2015, Statcast began measuring every batted ball in Major League Baseball with unprecedented precision — exit velocity, launch angle, sprint speed, arm strength. The Dodgers, under manager Dave Roberts and an analytically-driven front office, began using this data to inform how they coached hitters. Rather than asking hitters to 'just make contact,' they began working on specific contact quality: hard-hit balls at launch angles between 10 and 30 degrees.",
          "The results transformed Dodger lineups throughout the late 2010s and 2020s. Players were coached to pull the ball in the air more frequently, to avoid weak ground balls to the pull side, and to match their swing plane to pitch angles rather than 'swinging down' as old-school instruction demanded. The Dodgers' sustained success — and their ability to develop hitters who improved year-over-year — was partly a product of this data-informed approach to swing mechanics.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Back Foot Plants", sub: "squish the bug — power base", type: "system" },
          { label: "Hips Fire First", sub: "hips separate from shoulders", type: "attacker" },
          { label: "Hands Follow Hips", sub: "shortest path to contact zone", type: "victim" },
          { label: "Contact — Optimal Launch", sub: "10–30° angle, full extension", type: "result" },
        ],
      },
      timeline: [
        { year: 1971, event: "Ted Williams' 'Science of Hitting' describes optimal contact zones scientifically" },
        { year: 1995, event: "MLB teams begin using basic video analysis for swing mechanics review" },
        { year: 2010, event: "High-speed cameras in batting cages allow frame-by-frame kinetic chain analysis" },
        { year: 2015, event: "Statcast deployed in all MLB parks — launch angle and exit velocity data goes public", highlight: true },
        { year: 2018, event: "'Launch angle revolution' reaches youth baseball — old 'swing down' cues abandoned" },
        { year: 2024, event: "Dodgers win World Series with lineup built on hard contact and optimal launch angles" },
      ],
      keyTakeaways: [
        "The kinetic chain fires from the ground up: foot, ankle, knee, hip, core, shoulders, hands — in that sequence",
        "Hips fire before hands — 'hip-to-hand separation' is what generates the whip effect of a powerful swing",
        "Optimal launch angle is 10–30 degrees — not ground balls, not pop-ups, but hard line drives and fly balls",
        "The contact point adjusts by pitch location: out front for inside pitches, deep near hip for outside pitches",
      ],
      references: [
        { title: "Baseball Savant: Launch Angle and Exit Velocity Data", url: "https://baseballsavant.mlb.com" },
        { title: "MLB: Statcast Glossary", url: "https://www.mlb.com/glossary/statcast" },
        { title: "Dodgers: Hitting Development Philosophy", url: "https://www.mlb.com/dodgers" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-2-03-q1",
          type: "Kinetic Chain",
          challenge: `  A young hitter generates all their power
  from their arms and upper body — big
  arm swing, but no hip rotation. Their
  exit velocity on well-hit balls is 65 mph.

  A same-size teammate who uses full hip
  rotation hits at 88 mph exit velocity.

  What is the difference?`,
          text: "What role does the kinetic chain play in generating exit velocity?",
          options: [
            "The arm-only hitter just needs more strength training — hip rotation adds only marginal power",
            "Hip rotation multiplies force by transferring the entire body's momentum into the bat before the arms even engage",
            "The difference is bat weight — the second hitter uses a heavier bat",
            "Exit velocity is primarily determined by pitch velocity — the hitter contributes little",
          ],
          correctIndex: 1,
          explanation: "The kinetic chain is a force multiplier. When the hips fire, they transfer the momentum of the legs and core into the torso. When the torso rotates, it transfers that momentum into the shoulders and arms. By the time the hands engage, they are being accelerated by the entire body's rotation — not just arm strength. An arm-only swing uses perhaps 20% of the available force. Full kinetic chain engagement uses nearly all of it. This is why size matters less than mechanics: a smaller player with great hip rotation outperforms a larger player with arms-only.",
        },
        {
          id: "baseball-2-03-q2",
          type: "Launch Angle",
          challenge: `  You hit a ball with a launch angle of -5 degrees
  (slightly downward). On Statcast, it shows
  a 102 mph exit velocity.

  Despite the hard contact, it is an easy
  ground ball out to the second baseman.

  What adjustment would turn this into a hit?`,
          text: "How does launch angle affect the outcome of even well-hit balls?",
          options: [
            "Increase exit velocity further — 102 mph should produce a hit regardless of angle",
            "Adjust swing plane to match the pitch angle, raising launch angle to the 10–30 degree range where hard contact becomes hits and home runs",
            "Aim for the pull side — ground balls to the opposite field are the real problem",
            "Launch angle only matters at the professional level — youth players should not worry about it",
          ],
          correctIndex: 1,
          explanation: "A 102-mph ground ball is still a ground ball. Exit velocity gets the ball to the fielder faster — it does not make the play harder if the trajectory is straight into the infield. The Statcast revolution showed that hard contact at the wrong launch angle (-5° to 5°) produces ground ball outs nearly 75% of the time. The same 102 mph at 15° launch angle is a line drive with a much higher probability of reaching the gap or leaving the park. Matching swing plane to pitch approach angle is the key.",
        },
        {
          id: "baseball-2-03-q3",
          type: "Contact Zone",
          challenge: `  A fastball is thrown on the inside corner.
  You hit it, but the ball goes weakly to
  the second baseman. Your coach says:
  "You were too deep on that pitch."

  What does "too deep" mean, and what is the fix?`,
          text: "What is the correct contact point for an inside pitch, and what happens when contact is made too deep?",
          options: [
            "Too deep means the barrel was too far from the body — keep hands inside the ball more",
            "Too deep means contact was made near the back hip rather than out in front — inside pitches require early contact out in front of the plate",
            "Too deep refers to the stride being too long — a shorter stride fixes inside pitch contact",
            "The contact zone is identical for all pitch locations — only the swing angle changes",
          ],
          correctIndex: 1,
          explanation: "Inside pitches must be hit out in front of the plate — if you wait to contact them at the same spot as a middle or outside pitch, you contact them near your back hip with a closed swing path, producing weak pull-side grounders or foul balls. The adjustment: 'attack the ball early' on inside pitches — fire the hips slightly sooner and let the barrel get to the inner half out front. Outside pitches are the opposite: stay deep, contact them near the back of the plate to drive them the other way.",
        },
        {
          id: "baseball-2-03-q4",
          type: "Hip-Hand Separation",
          challenge: `  Coach says: "Your hips and hands are moving
  at the same time. You need separation."

  You have heard this before but don't
  understand what it means or why it matters.

  What is hip-hand separation?`,
          text: "What does hip-hand separation mean in hitting mechanics, and why does it create power?",
          options: [
            "Moving the hips and hands to opposite sides of the plate to increase reach",
            "The hips begin rotating before the hands move — this lag creates a whipping effect that accelerates the barrel",
            "Keeping the top hand separated from the bottom hand on the grip for more wrist action",
            "A coaching cue to keep the front hip from flying open early",
          ],
          correctIndex: 1,
          explanation: "Hip-hand separation (sometimes called 'lag' or 'stretch') is the brief moment when the hips have already begun rotating but the hands have not yet released. This creates a torque — like winding a spring. When the hands release, they are being pulled forward by the already-rotating hips, creating tremendous bat speed. When hips and hands move simultaneously, this whip effect is lost. Think of it like cracking a whip: the handle moves first, and the tip follows — that sequence is what generates speed at the tip.",
        },
      ],
    },
  },

  // ─── baseball-2-04: Plate Discipline ─────────────────────────────────────────
  {
    epochId: "baseball-2",
    wonder: {
      name: "Dodger Stadium — The Walk-Up Circle",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "🧠",
    },
    id: "baseball-2-04",
    order: 4,
    title: "Plate Discipline",
    subtitle: "The strike zone, ball-strike counts, walks, and OBP",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-2-badge-04", name: "Eye of the Zone", emoji: "👁️" },
    challengeType: "quiz",
    info: {
      tagline: "The best pitch to hit is one you choose — not one you react to. Plate discipline means knowing the difference.",
      year: 1955,
      overview: [
        "Plate discipline is the ability to swing at strikes and take balls — and to do so consistently under the pressure of a full count with two outs in the seventh inning. It sounds simple, but it is one of the most difficult mental skills in hitting. Batters who chase pitches out of the zone give pitchers free outs. Batters who take pitches on the edge of the zone give pitchers free strikes. The elite hitter does neither: they swing at strikes they can drive and let everything else go.",
        "On-base percentage (OBP) is one of the most important offensive statistics in modern baseball because it measures every time a hitter avoids making an out — hits, walks, and hit-by-pitches all contribute. A hitter who bats .280 with a .380 OBP (by drawing many walks) is far more valuable than a hitter who bats .310 with a .330 OBP (by rarely walking). The Dodgers under manager Dave Roberts have consistently emphasized OBP and walk rate as core offensive values.",
        "Count leverage is the concept that different counts favor different strategies. In hitter's counts (2-0, 3-0, 3-1), the pitcher is behind and more likely to throw a fastball in the zone — the hitter can look for a specific pitch to drive. In pitcher's counts (0-2, 1-2), the hitter must protect the plate — swing at anything close to the zone or risk being struck out looking. The mental game of count management — staying ahead by taking first-pitch strikes less often or working deep into counts — separates good hitters from great ones.",
      ],
      technical: {
        title: "The Strike Zone — Official vs. Real vs. Umpire",
        body: [
          "The official strike zone, as defined in the rulebook, extends from the midpoint between the top of the shoulders and the top of the uniform pants (roughly letters height) to the bottom of the kneecap, and from the inner edge of home plate to the outer edge. In practice, MLB umpires call the high strike at roughly the belt and the low strike at the bottom of the knees. The corners — inside and outside edges — are the most contested area.",
          "Plate coverage means a hitter must be mechanically capable of making contact on pitches throughout the zone — inside, outside, up, and down. A hitter who cannot cover the inside corner will have pitchers attacking it all day. A hitter who cannot stay back on pitches at the knees will chase low curveballs. Developing plate coverage through tee work and live batting practice at all pitch locations is essential to becoming a disciplined hitter.",
        ],
        codeExample: {
          label: "Count Strategy — Hitter's vs. Pitcher's Counts",
          code: `  HITTER'S COUNTS (you are ahead):
  3-0: Wait for a fastball in your zone
       → Many teams require coach's green light
  3-1: Look for a fastball to drive — be ready
  2-0: Wide zone to swing — look for mistake
  1-0: Slight edge — be selective but engaged

  NEUTRAL COUNTS:
  0-0: Take or swing — study first pitch
  1-1: Make pitcher throw a strike
  2-1: Slightly hitter-favorable — look to drive

  PITCHER'S COUNTS (you are behind):
  0-1: Don't chase — don't give 0-2 easily
  0-2: Protect the plate — zone widens
  1-2: Same — swing at anything close
  2-2: Deep breath — protect and battle

  KEY PRINCIPLE:
  → OBP = (H + BB + HBP) / (AB + BB + HBP + SF)
  → A walk is as good as a single for scoring`,
        },
      },
      incident: {
        title: "The Dodgers' Walk Culture — Dave Roberts Era",
        when: "2016–present — Dave Roberts as Dodgers manager",
        where: "Dodger Stadium, Los Angeles, California",
        impact: "Under manager Dave Roberts, the Dodgers have consistently ranked among the league leaders in walk rate and OBP, treating base on balls as a strategic weapon rather than a failure to swing. This philosophy — drawn from the Moneyball-influenced front office — has produced some of the most consistent offenses in the National League.",
        body: [
          "When Dave Roberts became Dodgers manager in 2016, the organization's analytics-driven front office had already built a philosophy around plate discipline. The Dodgers instructed hitters to work deep into counts, look for pitches in their zone, and treat walks as equivalent in value to singles for the purposes of on-base percentage. Hitters like Corey Seager, Justin Turner, and later Freddie Freeman embodied this approach — patient, selective, willing to take a walk when the pitcher would not throw a strike.",
          "The results were consistent playoff runs and some of the most efficient offenses in baseball. The Dodgers also benefited from the downstream effect: pitchers who had to throw more strikes to avoid walks ran up pitch counts faster, tiring earlier. A lineup that walks frequently forces opposing pitchers deeper into the count, which means more mistakes in hitter-friendly locations. Plate discipline is not passive — it is an aggressive offensive strategy.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Pitcher Throws", sub: "ball or strike — you decide", type: "attacker" },
          { label: "Strike Zone Decision", sub: "is this pitch in my zone?", type: "system" },
          { label: "Swing Decision", sub: "attack strikes, lay off balls", type: "victim" },
          { label: "OBP Increases", sub: "walks, hits — both count", type: "result" },
        ],
      },
      timeline: [
        { year: 1955, event: "Dodgers' Duke Snider draws 100+ walks in a season — early plate discipline emphasis" },
        { year: 1971, event: "Williams' strike zone grid published — first visual model of pitch value by location" },
        { year: 2003, event: "Moneyball published — OBP and walks become mainstream offensive philosophy" },
        { year: 2016, event: "Dave Roberts era begins — Dodgers implement walk-rate emphasis across lineup", highlight: true },
        { year: 2020, event: "Mookie Betts' .366 OBP contributes to Dodgers' World Series title" },
        { year: 2024, event: "Dodgers lead NL in walks and OBP en route to World Series championship" },
      ],
      keyTakeaways: [
        "OBP includes walks — a hitter who reaches base via walk contributes as much as one who singles",
        "In hitter's counts (2-0, 3-1), look for a specific pitch to drive — the pitcher needs a strike",
        "In pitcher's counts (0-2, 1-2), protect the plate — zone widens, swing at anything borderline",
        "Chasing pitches out of the zone is the most common way hitters give pitchers free outs — be disciplined",
      ],
      references: [
        { title: "Fangraphs: Plate Discipline Statistics", url: "https://www.fangraphs.com" },
        { title: "Baseball Reference: OBP Explained", url: "https://www.baseball-reference.com" },
        { title: "Dodgers: Offensive Philosophy", url: "https://www.mlb.com/dodgers" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-2-04-q1",
          type: "Count Management",
          challenge: `  You are at the plate with a 3-0 count.
  The pitcher needs to throw a strike or
  he walks you. Your coach has given you
  the "green light" to swing.

  What kind of pitch should you be looking for?`,
          text: "In a 3-0 count with a green light to swing, what is the optimal hitting approach?",
          options: [
            "Swing at anything in the strike zone — a 3-0 pitch is a gift no matter where it is",
            "Look for a fastball in a specific location you can drive hard — be highly selective",
            "Take the pitch — the walk is more valuable than any 3-0 swing",
            "Bunt — the pitcher is struggling with control, so a bunt catch them off guard",
          ],
          correctIndex: 1,
          explanation: "A 3-0 count is the most favorable count in hitting — the pitcher is desperate to throw a strike and almost certainly is throwing a fastball. But 'green light' doesn't mean swing at any strike — it means look for a fastball in YOUR zone, the location where you can drive it hardest. If a fastball comes in at the knees or on the outer edge and you can't drive it, take the ball and earn the walk. The 3-0 green light is permission to be selectively aggressive, not blindly aggressive.",
        },
        {
          id: "baseball-2-04-q2",
          type: "OBP vs. AVG",
          challenge: `  Player A bats .320 / .340 OBP (20 walks)
  Player B bats .270 / .390 OBP (85 walks)

  Both played 150 games. Who is more valuable
  offensively, and why?`,
          text: "Why might a hitter with a lower batting average be more offensively valuable than a higher-average hitter?",
          options: [
            "Player A — batting average is the most important offensive statistic",
            "Player B — on-base percentage includes walks, and Player B reaches base 50 more times per season",
            "They are equal — the additional walks are offset by the lower batting average",
            "Player A — a high batting average produces more run-scoring opportunities through extra-base hits",
          ],
          correctIndex: 1,
          explanation: "Over 150 games at .390 OBP, Player B reaches base roughly 225 times. Player A at .340 OBP reaches base roughly 195 times — 30 fewer times. Each time a player reaches base without making an out, there is a potential scoring opportunity. Player B's plate discipline generates ~85 walks — each of which is a free base that required the pitcher to fail to throw strikes. In the context of a lineup, Player B is much harder to pitch around and much more likely to score runs.",
        },
        {
          id: "baseball-2-04-q3",
          type: "Two-Strike Approach",
          challenge: `  You're at the plate with an 0-2 count.
  The pitcher throws a breaking ball that
  starts at your waist and drops to the
  dirt just at your feet — barely out of
  the strike zone.

  Do you swing?`,
          text: "In a pitcher's count like 0-2, how should a hitter approach borderline pitches?",
          options: [
            "No — if the pitch is out of the zone, even at 0-2, lay off it",
            "Yes — at 0-2 you must protect the entire plate and swing at anything close to the zone",
            "No — 0-2 is still a hitter's count because the pitcher hasn't thrown a third strike yet",
            "Only swing if you can identify the pitch type early enough to make solid contact",
          ],
          correctIndex: 1,
          explanation: "At 0-2, your zone expands dramatically. A pitch that bounces in the dirt three inches in front of the plate is still a borderline strike call from some umpires. With no room for error, you must swing at any pitch that could realistically be called a strike. This doesn't mean chase pitches in the dirt by two feet — it means your discipline threshold shifts significantly toward protecting the plate. The goal at 0-2 is to stay alive in the at-bat, not to drive the ball.",
        },
        {
          id: "baseball-2-04-q4",
          type: "Walk Value",
          challenge: `  Your team is down 1-0 in the 6th inning.
  You're at the plate, 2-2 count, bases empty.
  The pitcher throws a pitch just off the
  outside corner — clearly a ball by an inch.

  Some teammates shout: "Swing! Don't take!"

  You take the pitch. Ball three, now 3-2.

  Did you make the right decision?`,
          text: "Why is laying off a borderline ball on a 2-2 count defensible, even under pressure to swing?",
          options: [
            "No — with your team down, you should be aggressive and swing at anything close",
            "Yes — a ball just off the corner at 2-2 stays a ball, and turning 2-2 into 3-2 gives you another chance at a better pitch",
            "No — the umpire could have called that a strike, and taking it risked a called strike three",
            "It depends on who is on deck — if it is a weak hitter, you should swing and make something happen",
          ],
          correctIndex: 1,
          explanation: "Taking a ball on 2-2 to work the count to 3-2 is smart hitting. At 3-2, the pitcher still needs to throw a strike — giving you another pitch to handle. The pitch 'just off the corner' is a ball if you can identify it in time. The key is discipline: don't chase the pitch just because the count is close. Teammates shouting 'swing' are reacting emotionally — your job is to manage the at-bat intelligently. A 3-2 walk is as good as a single for your team's rally.",
        },
      ],
    },
  },

  // ─── baseball-2-05: Power Hitting ─────────────────────────────────────────────
  {
    epochId: "baseball-2",
    wonder: {
      name: "Dodger Stadium — Left Field Pavilion",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "💪",
    },
    id: "baseball-2-05",
    order: 5,
    title: "Power Hitting",
    subtitle: "Bat speed, exit velocity, pull power, and the Dodger lineup",
    category: "sports",
    xp: 90,
    badge: { id: "baseball-2-badge-05", name: "Tape Measure", emoji: "🏠" },
    challengeType: "quiz",
    info: {
      tagline: "Power is not about how big you are — it is about how efficiently you transfer force from the ground through the bat at the right moment.",
      year: 2022,
      overview: [
        "Modern baseball has undergone a power revolution. The combination of Statcast analytics showing the value of hard contact at optimal launch angles, more aggressive strength and conditioning programs, and refined hitting instruction has produced the most power-hitting era in baseball history. Exit velocities above 100 mph are now common at the professional level, and home run rates remain historically high despite various equipment adjustments.",
        "Bat speed is the most direct driver of exit velocity — the faster the bat is moving at contact, the harder the ball comes off. Bat speed is generated primarily through hip rotation speed, hip-to-hand separation, and the length and efficiency of the swing path. Heavier bats do not automatically generate more exit velocity — a hitter who can swing a lighter bat faster will often outperform someone struggling to whip a heavy bat through the zone.",
        "The Dodgers have built their lineup around power since the mid-2010s. Cody Bellinger, Max Muncy, Corey Seager, Justin Turner, and Shohei Ohtani have all been products of a philosophy that prizes hard contact to all fields but especially to the pull side in the air. Understanding the difference between pull power (hitter-friendly, high exit velocity by getting the barrel to the ball early) and opposite-field power (requires elite bat speed to drive the ball with authority away) is central to developing a power approach.",
      ],
      technical: {
        title: "Pull Power vs. Opposite-Field Power",
        body: [
          "Pull power is generated by getting the barrel of the bat to the ball early — contact in front of the plate on pitches on the inner half. Because the swing is still accelerating at this contact point (the bat has not yet fully decelerated), and because the barrel has more centrifugal force at the front of the swing, pull contact produces the highest exit velocities. This is why most home runs are pulled — the physics favor it.",
          "Opposite-field power is the signature of elite bat speed. To drive an outside pitch to the opposite field with authority, the hitter must wait longer (contact is deeper in the zone, near the back hip), maintain hip rotation through contact, and extend the arms fully through the ball going the other way. Hitters with slower bat speed who try to pull outside pitches produce weak grounders to the shortstop side. Staying back and driving the other way with authority requires both mechanical excellence and genuine bat speed.",
        ],
        codeExample: {
          label: "Power Metrics — What the Numbers Mean",
          code: `  EXIT VELOCITY (EV):
  ≥ 95 mph → Hard Hit (top 30% outcomes)
  ≥ 100 mph → Elite contact
  ≥ 110 mph → Top 5% — home run territory

  BAT SPEED (MLB Statcast, 2024):
  Average MLB: ~70 mph
  Elite (top 10%): ≥75 mph
  Shohei Ohtani: 80+ mph peak swing speed

  LAUNCH ANGLE FOR POWER:
  20–35 degrees → Home run range
  10–20 degrees → Extra-base hit range
  < 10 degrees → Ground ball

  PULL VS. OPPO POWER:
  Pull HR rate: 4–5x higher per ball in play
  Oppo HR: Requires EV ≥ 103+ mph typically
  → Pull power is more accessible / teachable
  → Oppo power is elite bat speed signature

  DODGER TEAM PHILOSOPHY:
  → Attack inner half — pull side air balls
  → Don't sacrifice swing path for contact
  → Drives lineup construction (LHH/RHH mix)`,
        },
      },
      incident: {
        title: "Shohei Ohtani Joins the Dodgers — 2024",
        when: "December 2023 — Ohtani signs 10-year, $700 million deal",
        where: "Dodger Stadium, Los Angeles, California",
        impact: "Shohei Ohtani's signing with the Dodgers brought the most dominant hitter-pitcher in baseball history to Los Angeles. His 54 home runs in 2024 — second-most in MLB history for a player also pitching — demonstrated that his power approach (leg kick, elite bat speed, pull-side damage) represents the pinnacle of modern power hitting.",
        body: [
          "Ohtani's 2024 season was historically remarkable: 54 home runs, 59 stolen bases (the first '50-50 season' in baseball history), and a .310 batting average — while also returning from Tommy John surgery as a pitcher. His power comes from a combination of an unusually high leg kick that generates tremendous hip torque, elite bat speed estimated above 80 mph at contact, and a swing plane that produces optimal launch angles on inner-half pitches.",
          "Dodger Stadium, with its moderately pitcher-friendly dimensions, might seem like an odd choice for the game's most feared power hitter. But the Dodgers' lineup construction around Ohtani — placing Freddie Freeman in front of him and Teoscar Hernandez behind him — ensured he would see pitches to hit. The combination produced 127 total home runs from the Dodger lineup in 2024, one of the most powerful offenses in franchise history.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Hip Rotation Speed", sub: "engine of bat speed", type: "system" },
          { label: "Bat Speed at Contact", sub: "multiplied by kinetic chain", type: "attacker" },
          { label: "Exit Velocity", sub: "bat speed + pitch speed combined", type: "victim" },
          { label: "Hard Contact / HR", sub: "95+ mph EV at 20–35° LA", type: "result" },
        ],
      },
      timeline: [
        { year: 1927, event: "Babe Ruth hits 60 home runs — first modern power season benchmark" },
        { year: 1998, event: "Mark McGwire hits 70 HRs — power era peaks (later tainted by PED revelations)" },
        { year: 2015, event: "Statcast debut — exit velocity and launch angle become quantifiable power metrics", highlight: true },
        { year: 2022, event: "Dodgers' Freddie Freeman leads team in hard-hit rate at .400+ season" },
        { year: 2023, event: "Ohtani wins NL MVP — signs 10-year deal with Dodgers in December" },
        { year: 2024, event: "Ohtani hits 54 HR with Dodgers — first 50-50 season in MLB history", highlight: true },
      ],
      keyTakeaways: [
        "Bat speed is the primary driver of exit velocity — faster bat speed matters more than bat weight",
        "Pull power is more accessible because contact is made in front of the plate where the barrel is accelerating fastest",
        "Opposite-field power requires elite bat speed — hitters who stay back and drive outside pitches away are genuinely special",
        "Target exit velocity above 95 mph — hard-hit balls above this threshold produce dramatically better outcomes",
      ],
      references: [
        { title: "Baseball Savant: Shohei Ohtani Exit Velocity Data", url: "https://baseballsavant.mlb.com" },
        { title: "MLB: Ohtani 2024 Season Review", url: "https://www.mlb.com/dodgers" },
        { title: "Fangraphs: Bat Speed and Power Correlation", url: "https://www.fangraphs.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-2-05-q1",
          type: "Bat Speed",
          challenge: `  You are choosing between two bats:
  Bat A: 32 oz — you can swing it at full speed
  Bat B: 35 oz — you can swing it, but
         noticeably slower

  Which bat will produce higher exit velocity
  on well-hit balls?`,
          text: "How does bat weight affect exit velocity, and what is the tradeoff?",
          options: [
            "Bat B — heavier bats always produce higher exit velocity because of greater mass",
            "Bat A — if the speed advantage is significant, the lighter, faster bat generates more force at contact",
            "They are equal — mass and speed perfectly offset each other in exit velocity calculations",
            "Bat B — heavier bats produce lower swing speeds but the mass increase always outweighs the speed loss",
          ],
          correctIndex: 1,
          explanation: "Exit velocity is a function of bat mass AND bat speed — specifically: EV ≈ (bat speed × bat mass) / (ball mass + bat mass) × some efficiency factor. If swinging the heavier bat reduces your speed significantly (say, from 72 mph to 65 mph), the mass gain does not compensate for the speed loss. Swing speed is the dominant variable for most hitters. This is why bat fitting — finding the heaviest bat you can swing at full speed — is a science, not just picking the heaviest one available.",
        },
        {
          id: "baseball-2-05-q2",
          type: "Pull Power",
          challenge: `  You've been pulling every pitch —
  even outside pitches — trying to hit
  home runs. Your coach shows you a Statcast
  report: you're hitting 40% ground balls
  to the pull side, almost zero extra-base hits.

  What is causing the pull-side ground balls?`,
          text: "Why does trying to pull outside pitches usually result in ground balls rather than home runs?",
          options: [
            "Pull-side ground balls come from an incorrect grip — change to a one-hand finish",
            "Pulling outside pitches requires contact in front of the plate, but the barrel arrives late on away pitches — producing weak pull-side grounders",
            "The swing is too upward — a more level swing will eliminate ground balls on outside pitches",
            "Bat speed is too high — slow down the swing to let the barrel catch up to the outside pitch",
          ],
          correctIndex: 1,
          explanation: "Outside pitches must be hit deep — contact at or behind the plate edge, driving the ball to the opposite field. If you try to pull an outside pitch by contacting it out front, the barrel is still closing across the ball when it arrives — the bat face is turned, and you produce a weak grounder to the pull side. The fix: identify the pitch location early and let outside pitches get deep before driving them the other way. Only inner-half pitches should be pulled.",
        },
        {
          id: "baseball-2-05-q3",
          type: "Exit Velocity",
          challenge: `  A ball hit at 94 mph exit velocity at 22°
  launch angle lands in the gap for a double.

  The same hitter hits a ball at 98 mph at
  the same angle — it carries 20 feet farther
  and lands over the fence.

  What does this tell you about the relationship
  between exit velocity and power?`,
          text: "Why does a relatively small increase in exit velocity have a disproportionate effect on home run distance?",
          options: [
            "Exit velocity and distance are linear — each mph adds the same amount of distance",
            "Distance increases non-linearly with exit velocity — small gains near the home run threshold produce dramatic results because drag and gravity are overcome differently",
            "The 4 mph difference is too small to matter — other factors (wind, spin) explain the difference",
            "Exit velocity only affects how hard the ball hits the wall, not whether it clears it",
          ],
          correctIndex: 1,
          explanation: "Ball flight distance is not linear with exit velocity. Near the home run threshold (~95+ mph at 20-30°), small increases in exit velocity translate to large gains in distance because the ball overcomes aerodynamic drag more efficiently. A ball at 94 mph might carry 400 feet; the same angle at 98 mph carries 420 feet — enough to clear a 390-foot wall. This is why Statcast researchers found that players who increased their average exit velocity by just 2–3 mph often saw their home run totals double.",
        },
        {
          id: "baseball-2-05-q4",
          type: "Power Approach",
          challenge: `  Ohtani's approach: "Attack the inner half.
  Drive pitches up the middle and to the
  pull side in the air. On outer-half pitches,
  take them the other way with authority."

  A young hitter asks: "Why not pull everything?"

  What is the answer?`,
          text: "Why do elite power hitters use an all-fields power approach rather than pulling everything?",
          options: [
            "Pulling everything is actually the ideal power approach — opposite-field power is overrated",
            "If pitchers know you only pull, they will attack the outer half where your bat speed can't produce damage — going oppo forces them to pitch inside where you're strongest",
            "Opposite-field hitting has nothing to do with pitching strategy — it is purely mechanical",
            "Going the other way reduces exit velocity — it is sacrificed for contact, not power",
          ],
          correctIndex: 1,
          explanation: "Elite power hitters go the other way specifically to prevent pitchers from safely attacking the outer half. If you only pull, pitchers park everything on the outer edge and away — your pull swing can't reach those pitches with authority. When you demonstrate the ability to drive outside pitches the other way for extra bases, pitchers must attack the inner half — which is exactly where your pull-power is strongest. Going the other way is not a fallback — it is an offensive weapon that opens the inner half.",
        },
      ],
    },
  },

  // ─── baseball-2-06: Contact Hitting & Two-Strike Adjustments ─────────────────
  {
    epochId: "baseball-2",
    wonder: {
      name: "Ebbets Field — Historical Site",
      location: "Brooklyn, New York",
      era: "Historic",
      emoji: "🎯",
    },
    id: "baseball-2-06",
    order: 6,
    title: "Contact Hitting & Two-Strike Adjustments",
    subtitle: "Choke up, protect the plate, and what .300 really means",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-2-badge-06", name: "Contact Artist", emoji: "✏️" },
    challengeType: "quiz",
    info: {
      tagline: "Getting a hit three out of ten times makes you a great hitter. That means the best in the world fail seven times — how you adjust with two strikes determines whether you fail on your terms.",
      year: 1950,
      overview: [
        "Contact hitting — making consistent, solid contact with the bat on the barrel — is the foundation of an effective offense regardless of power. At the youth level, contact is king: a player who sprays line drives to all fields and puts the ball in play consistently is more valuable than a player who strikes out half the time but occasionally hits it far. Developing contact skills through tee work, soft toss, and live batting practice builds the hand-eye coordination that powers all other aspects of hitting.",
        "The two-strike adjustment is one of the most important skills in hitting. With no strikes or one strike, a hitter can be selective — they have room to take pitches and look for something specific. With two strikes, the at-bat changes: the hitter must protect the plate. The standard two-strike adjustment involves choking up on the bat (moving the hands 1–2 inches up the handle), shortening the swing, widening the strike zone, and focusing on making contact rather than driving the ball.",
        "A .300 batting average means getting a hit in 30% of at-bats. Even the best hitters in baseball history failed to get a hit 70% of the time. Understanding this failure rate is essential to the mental game of hitting: every great hitter has gone 0-for-4, 0-for-10, 0-for-20. Slumps are inevitable. The mental response — staying short, staying disciplined, not changing everything after a bad stretch — determines how quickly a hitter recovers.",
      ],
      technical: {
        title: "Choking Up — The Most Underused Tool in Baseball",
        body: [
          "Choking up on the bat (moving the hands 1–2 inches up from the knob) shortens the effective length of the bat, increases control, and — counterintuitively — often increases bat speed because the lever is shorter. The tradeoff is a small reduction in power: the barrel is closer to the hands, so the whip effect is reduced. But two-strike hitting is about contact, not power. A ball hit off the end of the bat or jammed is an out. A ball hit on the barrel with a choked-up grip is a hit.",
          "The slap technique — used by contact specialists, switch hitters, and some left-handed hitters — involves a shorter swing path that prioritizes making contact and running out of the box quickly, often targeting the left side of the infield or opposite field. Tony Gwynn, one of the greatest contact hitters in history (.338 career average), was a master of the short, quick stroke to the opposite field, often into what is now called 'the Ted Williams shift area.'",
        ],
        codeExample: {
          label: "Two-Strike Hitting Checklist",
          code: `  PHYSICAL ADJUSTMENTS (2 strikes):
  ✓ Choke up 1–2 inches on the handle
  ✓ Shorten stride — less movement, more control
  ✓ Widen your strike zone slightly
  ✓ Shorten follow-through — contact, not power

  MENTAL ADJUSTMENTS (2 strikes):
  ✓ "Protect the plate" — swing at close pitches
  ✓ Look for ball in middle — adjust to location
  ✓ Stay short to the ball — no big loop
  ✗ Don't chase curveballs in the dirt
  ✗ Don't try to hit a home run with 2 strikes

  BATTING AVERAGE CONTEXT:
  .400 = last done in 1941 (Ted Williams)
  .350 = All-Star level, elite contact
  .300 = Very good hitter, respectable
  .270 = League average MLB (2024)
  .250 = Needs improvement / positional value
  < .230 = Must hit for power to justify roster`,
        },
      },
      incident: {
        title: "Tony Gwynn vs. the Shift — The Original Contact Master",
        when: "1980s–1990s — Tony Gwynn, San Diego Padres",
        where: "Petco Park predecessor (San Diego Jack Murphy Stadium)",
        impact: "Tony Gwynn, who hit .338 over a 20-year career — including eight batting titles — was so precise in hitting the ball to left-center field against the spray of the shift that he invented what coaches now call the 'Gwynn zone.' His film study, chopstick drills, and obsession with contact mechanics remain the standard for teaching contact hitting.",
        body: [
          "Tony Gwynn was famous for being the first player to extensively use video analysis to study his own swing and opposing pitchers. He carried a VHS player on road trips decades before video study was common. He identified that his most effective contact zone was a pitch low and away — which he could drive into left-center field consistently. As defenses shifted toward his pull side, he simply went the other way more and kept hitting.",
          "Gwynn's approach to two-strike hitting was particularly instructive: he shortened his swing, choked up slightly, and prioritized making contact anywhere in the strike zone over trying to drive the ball. His contact rate with two strikes was remarkable — he almost never struck out looking. He ended his career with a strikeout rate of under 4%, a number that modern hitters with advanced analytics have studied as the benchmark for elite contact skills.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Two Strikes", sub: "zone widens, approach changes", type: "attacker" },
          { label: "Choke Up / Shorten", sub: "more control, faster bat", type: "system" },
          { label: "Protect the Plate", sub: "swing at anything close", type: "victim" },
          { label: "Ball in Play", sub: "let defense make an error", type: "result" },
        ],
      },
      timeline: [
        { year: 1941, event: "Ted Williams hits .406 — last .400 season in Major League history" },
        { year: 1950, event: "Brooklyn Dodgers era — Duke Snider and Jackie Robinson model contact + power balance", highlight: true },
        { year: 1980, event: "Tony Gwynn begins career — pioneers video study and contact-first approach" },
        { year: 1994, event: "Gwynn hits .394 — closest approach to .400 in the post-Williams era" },
        { year: 2005, event: "Contact rate and strikeout rate become mainstream analytical measures" },
        { year: 2024, event: "MLB league-average strikeout rate hits 22% — contact hitting increasingly rare and valuable" },
      ],
      keyTakeaways: [
        "Choking up 1–2 inches increases control and often bat speed — use it with two strikes",
        "Two-strike approach: shorten swing, widen zone, protect the plate — contact over power",
        "A .300 average means 7 out of 10 at-bats result in no hit — slumps are normal, not catastrophic",
        "Tony Gwynn's contact philosophy: find your zone, go opposite field, never give away at-bats",
      ],
      references: [
        { title: "Baseball Hall of Fame: Tony Gwynn", url: "https://baseballhall.org/hall-of-famers/gwynn-tony" },
        { title: "Fangraphs: Contact Rate Statistics", url: "https://www.fangraphs.com" },
        { title: "MLB: Two-Strike Hitting Approach", url: "https://www.mlb.com/video" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-2-06-q1",
          type: "Two-Strike Adjustment",
          challenge: `  You are batting with an 0-2 count.
  The pitcher throws a changeup that
  hangs at the bottom of the strike zone.

  Instead of your normal full swing, you
  use a shortened swing and make solid
  contact for a single.

  What adjustment made this possible?`,
          text: "How does a shortened two-strike swing improve a hitter's ability to make contact?",
          options: [
            "A shorter swing is slower — it only helps on slower pitches like changeups",
            "A shorter swing reduces the path length to the contact zone, giving the hitter more time to identify and react to off-speed pitches",
            "Choking up changes the bat's sweet spot location, which is why contact improves",
            "A shortened swing has no mechanical advantage — it is purely a mental adjustment",
          ],
          correctIndex: 1,
          explanation: "A shorter swing reduces the time from swing initiation to contact — the bat travels a shorter path and arrives in the contact zone faster for a given hip rotation speed. This gives the hitter extra milliseconds to identify pitch type and location before committing fully. With two strikes, those milliseconds are everything. The shorter swing also makes it easier to handle pitches at the extremes of the zone — low-and-away, high-and-in — that a full swing path has trouble reaching cleanly.",
        },
        {
          id: "baseball-2-06-q2",
          type: "Choking Up",
          challenge: `  Your teammate says: "I never choke up —
  it's a sign of weakness and it costs
  power."

  You are teaching youth hitting and want
  to explain the actual mechanics.

  What do you tell them?`,
          text: "What are the real mechanical effects of choking up on the bat?",
          options: [
            "Choking up primarily reduces power with no compensating benefit — your teammate is correct",
            "Choking up shortens the lever, which increases control and often bat speed, with a modest power tradeoff — entirely worth it with two strikes",
            "Choking up moves the sweet spot closer to the hands, reducing the effective contact zone",
            "Choking up is purely psychological — it has no actual mechanical effect on the swing",
          ],
          correctIndex: 1,
          explanation: "Choking up shortens the lever of the bat, which physically increases the speed at which the barrel can be whipped through the zone (shorter lever = faster tip speed for the same muscle force). The tradeoff is reduced distance — the bat mass is effectively reduced because the swinging portion is shorter. But with two strikes, you want to make contact, not hit home runs. A ball on the barrel is a hit; a ball off the end of the bat is a weak grounder. The mechanical case for choking up with two strikes is solid and has been used by Hall of Famers throughout history.",
        },
        {
          id: "baseball-2-06-q3",
          type: "Batting Average Context",
          challenge: `  Your youth player goes 2-for-20 in the
  last five games (.100 batting average
  in that stretch). They want to quit
  and say they are terrible at hitting.

  How do you help them understand this
  slump in context?`,
          text: "How should players and coaches contextualize batting slumps in terms of baseball's inherent failure rate?",
          options: [
            "Reassure them that 2-for-20 is actually a normal short-term variance, even for excellent hitters",
            "Suggest immediate mechanical changes — a slump this deep always has a mechanical cause",
            "Tell them to swing at more pitches — being selective is causing the slump",
            "Explain that only players with natural talent avoid slumps — but they may not have the talent",
          ],
          correctIndex: 0,
          explanation: "A .100 average over 20 at-bats (2-for-20) is entirely within normal variance for a good hitter. Even a .300 hitter — someone who succeeds 30% of the time — can statistically go 2-for-20 (10%) over a stretch without anything being mechanically wrong. Short-sample slumps are normal in a game with such a high failure rate. The correct response: look for obvious mechanical issues first, but reassure the hitter that their approach is sound and results will normalize. Panicking and making wholesale changes during a slump usually makes it worse.",
        },
        {
          id: "baseball-2-06-q4",
          type: "Contact vs. Power",
          challenge: `  In a tied game in the 7th inning,
  your team has runners on 1st and 3rd
  with two outs and a 2-2 count.

  You are the batter. Do you swing for power
  to drive in both runners, or do you use
  your two-strike approach to make contact?`,
          text: "In a high-leverage two-strike situation, why is a contact-focused approach usually superior to a power approach?",
          options: [
            "A power approach is correct — this is the moment to try for the big hit",
            "A contact approach is better — a hard-hit ball in play gives the best odds of both run-scoring outcomes and avoiding a strikeout",
            "The count is irrelevant — always use a full power swing in high-leverage situations",
            "Lay down a squeeze bunt — contact hitters should bunt in this situation",
          ],
          correctIndex: 1,
          explanation: "With two strikes, a strikeout ends the inning with no chance of scoring. A contact approach — shorter swing, protective zone — maximizes the probability of putting the ball in play, which gives the runners a chance to score. Even a weakly-hit ball can be an error or a seeing-eye hit. A strikeout is always zero. The runners on first and third create scoring opportunities on virtually any ball in play — passed ball, wild pitch, fielder's choice, hit. A two-strike contact approach preserves all of those opportunities.",
        },
      ],
    },
  },

  // ─── baseball-2-07: Hitting Fastballs ────────────────────────────────────────
  {
    epochId: "baseball-2",
    wonder: {
      name: "Dodger Stadium — Batting Cage Tunnel",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "🔥",
    },
    id: "baseball-2-07",
    order: 7,
    title: "Hitting Fastballs",
    subtitle: "Timing, early commitment, and hands inside the ball",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-2-badge-07", name: "Fastball Hitter", emoji: "⚡" },
    challengeType: "quiz",
    info: {
      tagline: "You cannot react to a 95-mph fastball in real time — you have to decide before it arrives, and your decision has to be right.",
      year: 1988,
      overview: [
        "Hitting a fastball is fundamentally a timing problem. A 95-mph pitch arrives at the plate in approximately 400 milliseconds; a 100-mph pitch in roughly 375 milliseconds. A hitter's swing from initiation to contact takes 150–160 milliseconds. That means a hitter must begin their swing — committing hip rotation — before the ball is even halfway to the plate. The margin for error is less than 10 milliseconds between a solid contact and a foul tip.",
        "The key to hitting hard fastballs is not strength — it is timing, and timing is trained through repetition. Pitching machines set to 85–90 mph, at-bats against live fastball pitchers, and overload/underload bat training (swinging a heavier bat, then a lighter bat, then the game bat) all develop the neural patterns that allow a hitter to be on time consistently. Hitters who are late on fastballs are not necessarily slow — they are often simply not committed early enough.",
        "Keeping hands inside the ball is the most critical mechanical cue for fastball hitting. On a fastball, the barrel of the bat needs to arrive at the contact zone through the shortest possible path — not a long, looping arc. 'Inside the ball' means the hands stay close to the body as they travel toward the contact zone, so the barrel enters the hitting zone from the inside out, making contact on the inner half of the ball and driving it with backspin. Casting the hands (letting them drift away from the body early) creates a long path that is always late on fastballs.",
      ],
      technical: {
        title: "Pitching Machine Training vs. Live Pitching",
        body: [
          "Pitching machines offer consistent velocity and location, making them excellent tools for timing training. Set a machine at game speed (or slightly above game speed for overload training) and focus on tracking the ball from the machine's release slot — not from the arm slot a live pitcher would use. The weakness of machine training is that it removes pitch recognition cues: there is no deception, no tunnel point, no release point variation. Machine reps build timing mechanics; live pitching builds timing plus recognition.",
          "The best fastball training drill is the 'fastball only' at-bat: take rounds of BP where you know only fastballs are coming, and focus entirely on being on time, driving the ball hard to all fields. This separates timing from recognition — you can groove the mechanics of fastball hitting without the cognitive load of pitch identification. Once the mechanics are grooved, add breaking balls back to complete the picture.",
        ],
        codeExample: {
          label: "Fastball Timing Drill — Step by Step",
          code: `  STEP 1: MACHINE OR BP SETUP
  → Set to 85–95 mph (depending on level)
  → Position machine/pitcher at regulation distance
  → Focus: track ball from release point

  STEP 2: TRIGGER ON RELEASE
  → Initiate load (toe-tap or weight shift)
  → Sync trigger with pitcher's stride foot landing
  → You should feel "on time" on every pitch

  STEP 3: HANDS INSIDE THE BALL
  → Back elbow stays close to body on approach
  → Knob points at incoming pitch (briefly)
  → Barrel stays behind hands until contact zone

  STEP 4: CONTACT TARGET
  → Middle-away fastball: contact at plate edge
  → Middle-in fastball: contact out in front
  → Drive through the ball — full extension

  OVERLOAD DRILL:
  → 5 swings with bat 2–3 oz heavier
  → 5 swings with bat 2–3 oz lighter
  → 5 swings with game bat
  → Game bat feels quicker / better timed`,
        },
      },
      incident: {
        title: "Kirk Gibson's Fastball — 1988 World Series Game 1",
        when: "October 15, 1988 — World Series Game 1",
        where: "Dodger Stadium, Los Angeles, California",
        impact: "Kirk Gibson's pinch-hit walk-off home run off Oakland's Dennis Eckersley in the 1988 World Series remains the most iconic single swing in Dodger history. On one good leg, with a 3-2 count, Gibson turned on a backdoor slider — and timing that pitch perfectly despite being barely able to walk is a story about preparation, timing, and commitment.",
        body: [
          "Kirk Gibson could barely walk in Game 1 of the 1988 World Series due to leg injuries. He had not played in the game. With the Dodgers trailing 4-3 in the bottom of the 9th inning, manager Tommy Lasorda sent Gibson up to pinch-hit against closer Dennis Eckersley — one of the most dominant relievers in baseball history. Gibson worked the count to 3-2, fouling off pitches. Dodgers scout Mel Didier had previously briefed Gibson: 'I guarantee you, he'll throw you that backdoor slider on 3-2.' Gibson sat on the slider.",
          "When Eckersley threw the backdoor slider, Gibson — despite his injuries — generated enough hip rotation and timing to turn on the pitch and drive it over the right field fence for a walk-off two-run home run. He pumped his fist as he limped around the bases. The Dodgers went on to win the World Series in five games. The story is a testament to preparation: Gibson knew what pitch was coming, sat on it, and when it arrived, his trained timing mechanics did the rest even through significant physical limitation.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Pitcher Releases Fastball", sub: "400ms to plate at 95 mph", type: "attacker" },
          { label: "Trigger on Release", sub: "commit to swing timing early", type: "system" },
          { label: "Hands Inside the Ball", sub: "short path, barrel behind hands", type: "victim" },
          { label: "On-Time Contact", sub: "barrel meets ball at contact zone", type: "result" },
        ],
      },
      timeline: [
        { year: 1955, event: "Duke Snider hits 3 HRs in 1955 World Series — Dodger fastball hitting on display" },
        { year: 1988, event: "Kirk Gibson's walk-off HR off Eckersley — greatest moment in Dodger hitting history", highlight: true },
        { year: 1995, event: "Pitching machines reach game-speed accuracy — fastball timing training goes mainstream" },
        { year: 2010, event: "Overload/underload bat training introduced at professional level" },
        { year: 2015, event: "Statcast first measures bat speed at contact — fastball hitting science advances" },
        { year: 2024, event: "Ohtani averages 80+ mph bat speed — elite fastball hitting benchmark established" },
      ],
      keyTakeaways: [
        "A 95-mph fastball arrives in 400ms — you must begin your swing before the ball is halfway to the plate",
        "Timing is trained: pitching machines, live BP, and overload/underload drills develop consistent timing mechanics",
        "Hands inside the ball: the barrel stays behind the hands through the approach and enters the zone from inside out",
        "Kirk Gibson's 1988 home run proves preparation and timing beat physical limitations — know what's coming",
      ],
      references: [
        { title: "MLB: Kirk Gibson 1988 World Series", url: "https://www.mlb.com/video" },
        { title: "Dodgers: Batting Practice and Timing Drills", url: "https://www.mlb.com/dodgers" },
        { title: "Baseball Savant: Fastball Hitting Statistics", url: "https://baseballsavant.mlb.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-2-07-q1",
          type: "Timing",
          challenge: `  You consistently get jammed on inside fastballs
  — the ball hits off the handle near your hands.
  This means your timing is:

  A) Late — you are starting your swing too late
  B) Early — you are starting your swing too early

  Which is it, and why?`,
          text: "When a hitter is consistently jammed (hitting off the handle on inside pitches), what does this reveal about their timing?",
          options: [
            "Late timing — the barrel hasn't reached the correct contact zone when the ball arrives",
            "Early timing — the hands are out too far in front, pulling the barrel in toward the body",
            "Incorrect bat path — the hands are too high or too low, not a timing issue",
            "Incorrect stance — the body is positioned too close to the plate",
          ],
          correctIndex: 0,
          explanation: "Being jammed — ball hitting the handle — means the barrel was NOT far enough in front at the time the ball arrived. The ball caught the barrel before it had traveled to the correct contact zone. This is late timing: the swing started too late for the pitch speed, and the barrel was still coming through when the ball was already there. The fix is to initiate the swing trigger earlier — start the load and launch sooner so the barrel has time to reach the optimal contact zone. Generating more hip rotation speed (rather than just swinging harder with the arms) is usually the mechanical solution.",
        },
        {
          id: "baseball-2-07-q2",
          type: "Hands Inside",
          challenge: `  On video review, you see that your hands
  drift away from your body early in the swing —
  your arms extend outward before your hands
  reach the contact zone.

  Your coach calls this "casting."

  What problems does casting cause?`,
          text: "What happens mechanically when a hitter casts the hands (extends arms early before contact)?",
          options: [
            "Casting generates extra power by increasing the swing arc length",
            "Casting creates a longer, looping path to the contact zone that is consistently late on inside fastballs and produces pop-ups on middle pitches",
            "Casting only affects outside pitches — inside pitches are unaffected",
            "Casting is a style preference — some elite hitters cast intentionally for more power",
          ],
          correctIndex: 1,
          explanation: "When the hands cast outward early, the barrel travels in a long, circular arc rather than a direct path to the contact zone. This long path takes more time to complete — making the hitter consistently late on inside fastballs. On middle pitches, the barrel arrives from below the ball's path, producing pop-ups. The drill fix: keep the back elbow close to the body through the initial launch phase; the knob should point briefly at the incoming pitch before the barrel releases. This 'short to the ball, long through the ball' path is the mechanically efficient fastball swing.",
        },
        {
          id: "baseball-2-07-q3",
          type: "Training",
          challenge: `  You want to get better at hitting fastballs.
  Your options are:

  A) 100 swings in front of a mirror with
     no ball — working on mechanics
  B) 50 swings on a pitching machine set
     to 88 mph, tracking from the slot
  C) 30 live at-bats against a pitcher
     who throws 84 mph with 3 pitches

  Which approach builds fastball timing best?`,
          text: "What type of training most effectively builds fastball timing mechanics?",
          options: [
            "Option A — mirror work ingrains perfect mechanics that transfer to game timing",
            "Option B — repetitive machine work at game speed directly trains the neural timing pathways",
            "Option C — live pitching with multiple pitch types creates the best game-speed training environment",
            "All three are equally valuable — alternate between them each session",
          ],
          correctIndex: 1,
          explanation: "Fastball timing is a neural skill — the brain-to-muscle timing pattern that fires a swing at exactly the right moment. Mirror work (Option A) trains mechanics but cannot train timing without a moving ball. Option C is the most game-realistic but mixes pitch types, making it harder to isolate fastball timing. Option B, machine work at game speed, directly trains the timing neural pathway through high volume. Once the timing mechanism is established on the machine, Option C refines it against live pitching. Start with machine volume; graduate to live pitching.",
        },
        {
          id: "baseball-2-07-q4",
          type: "Mental Preparation",
          challenge: `  Kirk Gibson knew — from a scouting report —
  that Eckersley would throw him a backdoor
  slider on a 3-2 count. He sat on that pitch.

  This is called "sitting on a pitch."
  What does it mean, and why is it risky?`,
          text: "What does it mean to 'sit on a pitch,' and what is the risk of this approach?",
          options: [
            "Sitting on a pitch means refusing to swing until the pitch appears — it reduces strikeouts",
            "Sitting on a pitch means mentally committing to a specific pitch in a specific location — if a different pitch comes, you are unprepared and will likely miss or take a bad swing",
            "Sitting on a pitch means waiting until 3-2 to swing — all hits should come on full counts",
            "Sitting on a pitch is illegal — it gives hitters an unfair advantage through pre-game intelligence",
          ],
          correctIndex: 1,
          explanation: "Sitting on a pitch means mentally locking in on a specific pitch type and location: 'I am getting fastball away — I will drive it to center.' If that pitch comes, you are maximally prepared. If a different pitch comes, your timing and swing path are wrong for it — you'll either miss or make weak contact. The risk is real: if the pitcher doesn't throw your pitch, you may swing at something you can't drive, or take a strike called. Gibson succeeded because his scouting was precise and Eckersley delivered exactly the predicted pitch. Sitting on a pitch requires confident preparation.",
        },
      ],
    },
  },

  // ─── baseball-2-08: Hitting Breaking Balls ───────────────────────────────────
  {
    epochId: "baseball-2",
    wonder: {
      name: "Dodger Stadium — The Mound View",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "🌀",
    },
    id: "baseball-2-08",
    order: 8,
    title: "Hitting Breaking Balls",
    subtitle: "Staying back, weight shift, and curveball vs. slider vs. changeup",
    category: "sports",
    xp: 90,
    badge: { id: "baseball-2-badge-08", name: "Breaking Ball Crusher", emoji: "🌊" },
    challengeType: "quiz",
    info: {
      tagline: "Breaking balls are designed to make you look foolish. Staying back is the antidote — patience is the skill.",
      year: 1963,
      overview: [
        "Breaking balls — curveballs, sliders, changeups, and their variants — are designed to exploit a hitter's timing. They all start with similar trajectories to fastballs (the tunnel point principle) but arrive slower and/or in different locations. The most common mistake hitters make against breaking balls is early commitment: firing the hips before the pitch has fully identified itself, producing a swing that is either too early (roll-over grounder) or too far in front (big swing miss).",
        "The curveball is the classic early-commitment trap. It starts high, looking like a fastball in the upper zone, then drops dramatically into or below the strike zone. Hitters who react to the initial 'high fastball' trajectory fire early and swing at where the ball started — not where it ends up. The key to hitting curveballs is staying back: delaying hip rotation until the ball's break has been identified, then making a shorter, adjusted swing to the ball's actual arrival location.",
        "The slider is the most deceptive pitch at the professional level because it is the hardest to distinguish from a fastball. Sliders have tight spin that looks like a fastball's backspin but has a lateral tilt — the ball cuts late to the glove side of the plate. Many hitters describe sliders as 'fastballs that disappear' in the final 10–15 feet. The changeup, by contrast, looks like a fastball by design — same arm speed, same trajectory — but arrives 8–12 mph slower. Early commitment is fatal against both.",
      ],
      technical: {
        title: "The Curveball vs. Slider vs. Changeup — Key Differences",
        body: [
          "Curveball: 12-to-6 or 11-to-5 spin axis, large vertical drop, typically 10–15 mph slower than the fastball. The break is large and starts early. Hitters who stay back long enough to see the break can identify it at the tunnel divergence point. The key: do not commit to the high trajectory — wait for the ball to reveal its actual landing spot.",
          "Slider: Tight, gyroscopic spin with a lateral-and-downward break, typically 5–8 mph slower than fastball. The break is sharp and late — it looks like a fastball until the final 10–15 feet. This late action makes sliders very difficult to hit. The cue: sliders cut to the arm side of the plate at the end; a ball that starts middle and appears to be fading inside (for a right-handed batter against a right-handed pitcher) is a slider. Changeup: Fastball trajectory at fastball arm speed but 8–12 mph slower. The gravity makes it drop more than a fastball, often breaking away from same-side batters. Cue: if the pitch looks like a fastball but your timing says 'too early,' it is probably a changeup.",
        ],
        codeExample: {
          label: "Breaking Ball Identification Guide",
          code: `  CURVEBALL:
  Spin:    12-6 or 11-5 topspin axis
  Speed:   78–85 mph (10–15 mph off FB)
  Break:   Large, early, vertical drop
  Cue:     Ball starts high — wait for drop
  Fix:     Stay back, short adjusted swing

  SLIDER:
  Spin:    Tight gyroscopic + lateral tilt
  Speed:   82–88 mph (5–8 mph off FB)
  Break:   Late, sharp, horizontal cut
  Cue:     Fastball that disappears inside/outside
  Fix:     Track late — do not pull off pitch

  CHANGEUP:
  Spin:    Fastball look (low spin rate)
  Speed:   78–86 mph (8–12 mph off FB)
  Break:   Fades down and away from batter
  Cue:     Arm speed says fastball, velocity says no
  Fix:     Stay back, drive through the fade

  UNIVERSAL RULE:
  → Trigger LATER on breaking ball pitchers
  → Less aggressive load — more staying back
  → "Soft-to-hard" approach: expect breaking ball,
    react fast to fastball`,
        },
      },
      incident: {
        title: "Clayton Kershaw's Curveball — Dodgers' Greatest Weapon",
        when: "2011–present — Clayton Kershaw at Dodger Stadium",
        where: "Dodger Stadium, Los Angeles, California",
        impact: "Clayton Kershaw's curveball — nicknamed 'El Diablo' by Vin Scully — has been called the best in baseball for over a decade. With an average drop of 58 inches (nearly five feet of vertical movement) and tight tunnel with his fastball, it represents the exact pitch that forces hitters to understand why staying back is so important.",
        body: [
          "Clayton Kershaw's curveball enters the tunnel at approximately 80 feet from home plate looking exactly like his 92–94 mph fastball. Both pitches start from the same release point, at the same trajectory. At roughly 40 feet from the plate — where the tunnel diverges — the curveball begins its catastrophic 58-inch vertical drop while the fastball continues on a flat line. Hitters who commit their hip rotation early, reading 'fastball,' are already firing by the time the ball begins dropping.",
          "The most common result of a hitter being fooled by Kershaw's curveball is a wild swing over the top of the ball — sometimes missing it by more than two feet. The lesson for hitters: identify the spin at the tunnel point, stay back, and make a short adjusted swing. The hitters who have the most success against Kershaw are those who can stay back on the curveball long enough to identify it and then react to its final location — a skill that requires exceptional patience and quick-twitch adjustment.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Breaking Ball Enters Tunnel", sub: "looks like fastball — don't fire yet", type: "attacker" },
          { label: "Stay Back", sub: "delay hip rotation — wait for break", type: "system" },
          { label: "Identify the Pitch", sub: "curveball, slider, or changeup?", type: "victim" },
          { label: "Short Adjusted Swing", sub: "attack ball's actual landing zone", type: "result" },
        ],
      },
      timeline: [
        { year: 1963, event: "Sandy Koufax's curveball dominates the NL — teaches a generation how to stay back", highlight: true },
        { year: 1988, event: "Orel Hershiser's slider leads Dodgers to World Series — study of breaking ball approach" },
        { year: 2000, event: "Slider becomes most common strikeout pitch in Major League Baseball" },
        { year: 2011, event: "Kershaw wins first Cy Young — curveball rated No. 1 in MLB annually" },
        { year: 2015, event: "Statcast measures curveball break in inches — Kershaw's 58\" drop quantified" },
        { year: 2024, event: "Slider remains top strikeout pitch — Dodger hitters develop breaking ball protocols" },
      ],
      keyTakeaways: [
        "Stay back against all breaking balls — early hip commitment is the cause of nearly every breaking ball miss",
        "Curveball: large early drop — wait for the ball to show its location before committing",
        "Slider: late, sharp cut — looks like a fastball until the final 10–15 feet, track it all the way",
        "Changeup: same arm speed, slower velocity — if your timing says 'too early,' adjust and stay through the ball",
      ],
      references: [
        { title: "Baseball Savant: Clayton Kershaw Curveball Metrics", url: "https://baseballsavant.mlb.com" },
        { title: "MLB: Breaking Ball Recognition Training", url: "https://www.mlb.com/video" },
        { title: "Dodgers: Pitching Philosophy and Hitter Preparation", url: "https://www.mlb.com/dodgers" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-2-08-q1",
          type: "Staying Back",
          challenge: `  Kershaw winds up. You see the ball leave his
  hand — it looks like a fastball, headed
  high in the zone. You fire your hips.

  The ball drops six inches below the zone.
  You swing entirely over it.

  What mistake did you make?`,
          text: "What mechanical error causes a hitter to swing completely over a curveball?",
          options: [
            "The bat path was too level — an uppercut swing would have caught the breaking ball",
            "Early commitment — firing the hips on the fastball trajectory before the pitch revealed its break",
            "The stride was too long — a shorter stride would have kept the weight back longer",
            "The hands were too high — lowering hand position prevents swinging over curveballs",
          ],
          correctIndex: 1,
          explanation: "Swinging over the curveball is the textbook result of early hip commitment. When you see the ball start high and fire your hips immediately — reading 'fastball' — your entire swing is timed and aimed at the high trajectory. By the time the ball drops into or below the strike zone, your barrel has already passed through the upper zone where the ball started. You swing 12–18 inches over the actual pitch location. The fix: delay your trigger, let the pitch travel further and identify its trajectory before committing. Stay back.",
        },
        {
          id: "baseball-2-08-q2",
          type: "Slider Identification",
          challenge: `  A right-handed pitcher throws you a pitch
  that starts looking like a middle fastball.
  At the last second, it cuts sharply to the
  right side of the plate (inside to you as
  a right-handed batter).

  What pitch was that?`,
          text: "How do you identify a slider from a fastball, and when does the difference become visible?",
          options: [
            "A curveball — the sharp drop indicates curveball movement",
            "A changeup — the late movement is characteristic of changeup fade",
            "A slider — tight late-breaking pitch that cuts to the arm side of the plate in the final 10–15 feet",
            "A two-seam fastball — natural run to the arm side is fastball movement, not a slider",
          ],
          correctIndex: 2,
          explanation: "A slider cuts laterally in the final 10–15 feet — it looks like a fastball through most of its flight and then cuts sharply to the pitcher's arm side. For a right-handed pitcher throwing to a right-handed batter, the slider breaks inside (to the batter's left). This 'late action' makes the slider the most deceptive pitch: hitters see fastball, commit, and then the pitch cuts away or in. The only way to distinguish a slider from a fastball is to track the spin: sliders have a tight, tilted 'gyroscopic' rotation — sometimes visible as a spinning red dot.",
        },
        {
          id: "baseball-2-08-q3",
          type: "Changeup Approach",
          challenge: `  A pitcher throws you three straight fastballs.
  On the fourth pitch, same arm speed,
  same arm angle — but the ball arrives
  noticeably slower and drops more than expected.
  You are completely out in front — weak grounder.

  What pitch was that, and what is the prevention?`,
          text: "What approach helps hitters avoid being fooled by changeups?",
          options: [
            "Watch the pitcher's wrist — changeup grips often reveal the pitch before release",
            "Use the 'soft-to-hard' approach: mentally prepare for an off-speed pitch and react to a fastball, rather than always sitting on fastball velocity",
            "The changeup cannot be avoided after seeing three straight fastballs — it is an unanswerable pitch",
            "Widen the stance to slow your stride and automatically adjust to slower pitches",
          ],
          correctIndex: 1,
          explanation: "The 'soft-to-hard' approach flips the default assumption: instead of sitting on fastball and trying to slow down for off-speed, you expect an off-speed pitch (changeup) and react fast if a fastball comes. Because fastball reaction is faster than slowing down for off-speed, this mental approach often yields better results on both pitches. Your timing is calibrated to the changeup speed — if a fastball arrives, your fast-twitch reaction accelerates the swing. If the changeup comes, you are already timing it correctly.",
        },
        {
          id: "baseball-2-08-q4",
          type: "Curveball vs. Slider",
          challenge: `  Pitch A: Starts at belt height, drops 58 inches
            by the time it reaches the plate.
            Spin: clearly visible topspin rotation.

  Pitch B: Starts at belt height, breaks 18 inches
            laterally — very tight spin, almost
            looks like a spinning dot.

  Which is the curveball and which is the slider?`,
          text: "What are the visual differences between a curveball and a slider in flight?",
          options: [
            "Pitch A is the slider (lateral break), Pitch B is the curveball (vertical drop)",
            "Pitch A is the curveball (large vertical drop, topspin), Pitch B is the slider (late lateral cut, tight spin)",
            "Both could be either pitch — the break direction and spin are not reliably different",
            "Pitch A is a changeup (large break), Pitch B is a curveball (tight rotation)",
          ],
          correctIndex: 1,
          explanation: "Pitch A is the curveball: large vertical drop (sometimes described as 12-to-6, like a clock hand falling from noon to six), topspin axis, starts early in the flight and breaks throughout the trajectory. Pitch B is the slider: tight, gyroscopic spin (looks like a spinning dot or small circle), breaks sharply and laterally in the final phase of flight. Curveballs break more and earlier; sliders break less but later. Both are difficult, but they require different adjustments: the curveball needs patience for the drop; the slider needs late tracking of the cut.",
        },
      ],
    },
  },

  // ─── baseball-2-09: Dodger Legends ───────────────────────────────────────────
  {
    epochId: "baseball-2",
    wonder: {
      name: "Dodger Stadium — Monument Park",
      location: "Los Angeles, California",
      era: "Historic",
      emoji: "🏆",
    },
    id: "baseball-2-09",
    order: 9,
    title: "Dodger Legends at the Plate",
    subtitle: "From Jackie Robinson to Shohei Ohtani — a hitting dynasty",
    category: "sports",
    xp: 95,
    badge: { id: "baseball-2-badge-09", name: "Dodger Blue", emoji: "💙" },
    challengeType: "quiz",
    info: {
      tagline: "The Dodger franchise has produced some of the most distinctive and instructive hitting approaches in baseball history — each era teaching a different lesson about the craft.",
      year: 1947,
      overview: [
        "The Brooklyn and Los Angeles Dodgers have featured legendary hitters across every era of baseball. Jackie Robinson (1947–1956) was not the most powerful hitter but was perhaps the most complete: exceptional bat control, extraordinary baserunning, clutch hitting, and the mental fortitude to perform under the most intense external pressure any baseball player has ever faced. Duke Snider hit 407 career home runs and was one of the great pull hitters of the 1950s, part of a center field triumvirate in New York City (alongside Willie Mays and Mickey Mantle) that generated endless debates about who was the best.",
        "Mike Piazza, who came up through the Dodger system in 1992, became one of the greatest offensive catchers in baseball history — a right-handed pull hitter with exceptional bat speed who drove everything to the left side with authority. Adrian Beltre, who played for the Dodgers from 1998 to 2004, was famous for hitting great balls in the dirt — a unique ability to generate power on pitches below the strike zone that confused every pitcher who tried to get him out low.",
        "Cody Bellinger (2017–2022 with the Dodgers) had one of the most aesthetically distinctive swings in modern Dodger history — a dramatic leg kick combined with a high hand position and extreme pull/air ball approach that produced a 2019 NL MVP season with 47 home runs. Freddie Freeman's mechanics are the model for balance and consistency in modern hitting. And Shohei Ohtani's 2024 performance — 54 home runs and 59 stolen bases — is among the most historically dominant offensive seasons in baseball history.",
      ],
      technical: {
        title: "Jackie Robinson's Bat Control — The Most Underrated Hitting Skill",
        body: [
          "Jackie Robinson's hitting approach was defined by exceptional bat control: the ability to put the ball where he wanted it, bunt whenever needed, slap to the opposite field when the situation called for it, and drive the ball with authority when he had the pitch he was looking for. He hit .311 lifetime despite playing his first Major League season at 28 after years in the Negro Leagues. His plate discipline and bat control were taught by Dodger coaches as the model for positional hitting.",
          "Robinson's 1949 season — when he won the NL batting title with a .342 average, added 16 home runs, and stole 37 bases — represents the full package of a hitting approach that prioritized on-base percentage, contact, situational hitting, and just enough power to keep defenses honest. Modern analysts who study 1940s–50s Dodger hitting often point to Robinson as the franchise's best pure hitter — not for power, but for the completeness of his craft.",
        ],
        codeExample: {
          label: "Dodger Hitting Legacy — Era by Era",
          code: `  BROOKLYN ERA (1947–1957):
  Jackie Robinson:  .311 avg, 137 HR, 740 OBP
  → Legacy: Bat control, discipline, clutch
  Duke Snider:      .295 avg, 407 HR
  → Legacy: Pull power, .300 seasons

  LOS ANGELES ERA:
  Mike Piazza:      .308 avg, 427 HR (Dodger/career)
  → Legacy: Right-handed power, catcher offense
  Adrian Beltre:    .275 avg, 477 HR (career)
  → Legacy: Low-ball hitting, aggressive approach
  Manny Ramirez:    .396 OBP with Dodgers (2008–10)
  → Legacy: Plate discipline and power combination

  MODERN ERA:
  Cody Bellinger:   47 HR in 2019 NL MVP season
  → Legacy: Launch angle revolution embodied
  Freddie Freeman:  .300+ hitter, multi-tool
  → Legacy: Balance, patience, clutch
  Shohei Ohtani:    54 HR / 59 SB in 2024
  → Legacy: Most complete offensive player ever`,
        },
      },
      incident: {
        title: "Duke Snider's Four-Homer World Series — 1955",
        when: "October 1955 — Brooklyn Dodgers World Series",
        where: "Ebbets Field, Brooklyn / Yankee Stadium, New York",
        impact: "Duke Snider hit four home runs in the 1955 World Series — helping the Brooklyn Dodgers win their only championship as a Brooklyn franchise. His pull-power approach and exceptional bat speed in the 1950s established him as one of the era's premier power hitters and demonstrated how a left-handed pull hitter could dominate right-handed pitching.",
        body: [
          "The 1955 Brooklyn Dodgers won their first and only World Series title, defeating the New York Yankees in seven games. Duke Snider, the center fielder, was the offensive catalyst — hitting four home runs in the series, the most dramatic coming in Game 5. Snider's swing was a model of left-handed pull power: a short, compact load, explosive hip rotation, and a swing path that produced towering fly balls to the right side of the field and center.",
          "Snider hit four home runs in both the 1952 and 1955 World Series — the only player to accomplish that feat twice. His approach at the plate was entirely pull-focused, and he worked with Dodger hitting instructors to develop the pitch selection to find those pull-side pitches reliably. The legacy of Snider's power hitting influenced how Dodger coaches developed left-handed pull hitters for generations — an influence visible even in how Cody Bellinger and others were instructed in the modern era.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Jackie Robinson", sub: "bat control + discipline (Brooklyn era)", type: "system" },
          { label: "Duke Snider / Piazza", sub: "power hitting across eras", type: "attacker" },
          { label: "Beltre / Manny / Bellinger", sub: "approach evolution", type: "victim" },
          { label: "Freeman / Ohtani", sub: "modern completeness", type: "result" },
        ],
      },
      timeline: [
        { year: 1947, event: "Jackie Robinson breaks MLB color barrier — joins Brooklyn Dodgers", highlight: true },
        { year: 1949, event: "Robinson wins NL batting title (.342) — Dodger hitting philosophy established" },
        { year: 1955, event: "Duke Snider hits 4 HRs — Brooklyn wins first and only World Series" },
        { year: 1992, event: "Mike Piazza breaks into Dodger lineup — greatest offensive catcher in franchise history" },
        { year: 2020, event: "Mookie Betts and Corey Seager lead Dodgers to World Series title" },
        { year: 2024, event: "Ohtani 54 HR + Freeman walk-off grand slam — greatest Dodger hitting season in 70 years", highlight: true },
      ],
      keyTakeaways: [
        "Jackie Robinson's bat control and plate discipline remain the model for complete hitting — not just power",
        "Duke Snider's pull-power approach in the 1955 World Series established the Dodger power-hitting tradition",
        "Mike Piazza proved that catchers can be elite offensive forces — OPS over 1.000 in multiple seasons",
        "Ohtani's 2024 season (54 HR, 59 SB) is the most complete offensive performance in modern Dodger history",
      ],
      references: [
        { title: "Baseball Hall of Fame: Jackie Robinson", url: "https://baseballhall.org/hall-of-famers/robinson-jackie" },
        { title: "Baseball Hall of Fame: Duke Snider", url: "https://baseballhall.org/hall-of-famers/snider-duke" },
        { title: "Dodgers: Franchise History", url: "https://www.mlb.com/dodgers/history" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-2-09-q1",
          type: "Jackie Robinson",
          challenge: `  Jackie Robinson faced pitchers who were
  trying to intimidate him — high-and-tight
  fastballs, brush-back pitches, and pitchers
  who refused to give him anything to hit.

  His response was never to overswing.
  He walked, slapped singles, and waited.

  What hitting principle did Robinson embody?`,
          text: "What aspect of Jackie Robinson's hitting approach made him difficult to get out despite constant pitching harassment?",
          options: [
            "He always swung at the first pitch — taking initiative before pitchers could set patterns",
            "He combined elite plate discipline with bat control — refusing to expand his zone under pressure and making pitchers throw strikes",
            "He was primarily a power hitter — his threat of home runs prevented pitchers from attacking him",
            "He used a bunting strategy to demoralize pitchers who threw inside too often",
          ],
          correctIndex: 1,
          explanation: "Robinson's bat control and plate discipline were his weapons. Pitchers who tried to intimidate him with high-and-tight pitches found that he simply took the pitch for a ball or fouled it off — never giving them the expanded zone that pressure was designed to create. He protected the strike zone, made pitchers work deep into counts, and then punished mistakes. His .400+ OBP in multiple seasons reflects how rarely pitchers could get him out on their terms. Discipline under pressure is a hitting skill that Robinson exemplified better than almost anyone in Dodger history.",
        },
        {
          id: "baseball-2-09-q2",
          type: "Adrian Beltre",
          challenge: `  Adrian Beltre was famous for hitting home runs
  on pitches below the strike zone — even balls
  in the dirt. Pitchers tried to get him out
  low, but he could still drive low pitches.

  This is the opposite of most hitting advice,
  which says to lay off low pitches.

  Why could Beltre do this when most hitters cannot?`,
          text: "What physical and mechanical attribute allowed Adrian Beltre to generate power on pitches below the strike zone?",
          options: [
            "Beltre cheated on low pitches — he had been tipped off by the catcher's signs",
            "He had exceptional hip flexibility and the ability to get into a very low hitting position, maintaining full hip rotation even with the bat plane below the strike zone",
            "All good hitters can hit low pitches — Beltre is no different from others",
            "Beltre used an unusually long bat that could reach pitches other hitters could not",
          ],
          correctIndex: 1,
          explanation: "Beltre's low-ball hitting was a product of extraordinary hip flexibility — he could drop into an almost squatting position while still rotating his hips fully through the swing, generating the same power on a pitch at his ankles that other hitters might generate on a pitch at the waist. Most hitters lose their kinetic chain on low pitches because their hip rotation flattens out. Beltre maintained it even in extreme positions. This was largely innate physical ability combined with years of practice — youth players should understand this as an outlier, not a technique to emulate blindly.",
        },
        {
          id: "baseball-2-09-q3",
          type: "Cody Bellinger",
          challenge: `  Cody Bellinger in 2019 hit 47 home runs
  using a dramatic leg kick, high hands,
  and a pull-heavy/air-ball approach.

  In 2021 and 2022, his average dropped to
  .165 and .210. The leg kick timing was
  causing him to be late on fastballs.

  What does Bellinger's career arc teach us?`,
          text: "What lesson about complex hitting mechanics does Cody Bellinger's career arc provide?",
          options: [
            "Pull-heavy approaches always lead to decline — stay-back hitters have longer careers",
            "Complex triggers like leg kicks work brilliantly when timed correctly but become liabilities when timing breaks down — consistency is more important than peak potential",
            "Bellinger's decline was caused by injuries, not mechanics — mechanics were not the issue",
            "High-leverage approaches only work in hitter-friendly parks — Dodger Stadium hurt his mechanics",
          ],
          correctIndex: 1,
          explanation: "Bellinger's career illustrates a fundamental truth about complex mechanics: when everything synchronizes, a leg kick produces elite power. When timing breaks down (from injury, aging, or mental adjustments), a large leg kick amplifies the error — the entire kinetic chain is desynchronized by a few milliseconds. Simple triggers fail smaller; complex triggers can fail catastrophically. Youth players should develop the most reliable mechanics they can execute consistently, not the most spectacular ones they've seen on TV. Bellinger's 2023 recovery (28 HRs with the Cubs) came after significant mechanical simplification.",
        },
        {
          id: "baseball-2-09-q4",
          type: "Freddie Freeman",
          challenge: `  In the 2024 World Series, Freddie Freeman
  played through a serious ankle injury —
  barely able to run — but continued to
  hit well. His walk-off grand slam in
  Game 1 came despite the injury.

  What does this demonstrate about what
  makes Freeman such an effective hitter?`,
          text: "What aspects of Freddie Freeman's hitting approach allow him to remain effective even when his physical abilities are compromised?",
          options: [
            "Freeman's power is the key — he can hit home runs even on limited physical mobility",
            "Freeman's approach, bat control, and preparation are so deeply ingrained that he does not need full physical health to make quality contact and drive the ball",
            "Freeman is simply lucky — his World Series performance was too unusual to draw lessons from",
            "The ankle injury was not serious — reports of his injury were overstated by the media",
          ],
          correctIndex: 1,
          explanation: "Freeman's 2024 World Series performance while injured is a case study in how deeply ingrained mechanics and approach can carry a hitter when physical ability is limited. His preparation (knowing what Cortes would throw), his short, efficient swing (requiring less hip mobility), and his patient approach (waiting for a pitch he could drive without aggressive foot movement) all meant that even with a compromised ankle, he could sit back and drive a pitch he'd anticipated. This is why Freeman's mechanics are studied: they work at 100% health and at 70% health. Efficiency and preparation are more durable than athleticism.",
        },
      ],
    },
  },

  // ─── baseball-2-10: Building Your Hitting Routine ────────────────────────────
  {
    epochId: "baseball-2",
    wonder: {
      name: "Dodger Stadium — Field Level Batting Cage",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "🏋️",
    },
    id: "baseball-2-10",
    order: 10,
    title: "Building Your Hitting Routine",
    subtitle: "Tee work, soft toss, BP, video analysis, and training like a pro",
    category: "sports",
    xp: 100,
    badge: { id: "baseball-2-badge-10", name: "Pro Routine", emoji: "🌟" },
    challengeType: "quiz",
    info: {
      tagline: "The difference between a good hitter and a great one is not talent alone — it is what they do when nobody is watching.",
      year: 2000,
      overview: [
        "Professional hitters take anywhere from 200 to 500 practice swings per day — not including at-bats. This volume of practice is how mechanics become automatic, how timing becomes reliable, and how adjustments are grooved into muscle memory. For Little League players, the scale is smaller, but the principle is the same: consistent, purposeful practice with specific goals every session produces far better results than casual swings in the backyard once a week.",
        "A well-structured hitting routine has multiple components: tee work (stationary ball, pure mechanics focus), soft toss (timing against a moving ball from close range), front toss (timing against a more realistic trajectory), live BP (full timing against a pitcher's delivery), and video review (comparing your mechanics against your goals and against professionals). Each component builds a different aspect of the hitting skill set.",
        "Video analysis is no longer just for professional players. Every smartphone can record at 240 frames per second — more than enough to analyze swing mechanics in slow motion. Youth players and coaches who use video systematically — comparing pre-session mechanics to post-session mechanics, tracking improvements over weeks and months — develop hitters far faster than those who rely on feel alone. The key: watch the video with a specific focus (hip rotation, hand path, head position) rather than general review.",
      ],
      technical: {
        title: "Tee Work — The Most Underrated Hitting Tool",
        body: [
          "The batting tee allows a hitter to freeze the ball in any location — inner half, outer half, up, down, high, low — and take 50 swings at that exact location without any timing element. This isolates mechanics completely. A hitter who struggles with inside pitches can take 100 tee reps with the ball on the inner third of the plate, grooving the hip rotation and early contact point required for that pitch. No other drill allows this precision.",
          "Tee drills for specific development: (1) Inner half drill — tee set at front of plate, inner half, focus on hip rotation and early contact; (2) Outer half drill — tee set at back edge of plate, outer half, focus on staying back and driving the other way; (3) High fastball drill — tee at shoulder height, focus on short swing path and staying above the ball; (4) Low pitch drill — tee at knee height, focus on getting the swing plane down without losing hip rotation.",
        ],
        codeExample: {
          label: "Weekly Hitting Routine — Youth Level",
          code: `  MONDAY (Tee Work — 30 min):
  → 15 reps: Inner half, front of plate
  → 15 reps: Outer half, back edge
  → 10 reps: High pitch
  → 10 reps: Low pitch
  Focus: Hip rotation, staying back, hand path

  WEDNESDAY (Soft Toss — 30 min):
  → Partner tosses from 10 ft at 45° angle
  → Focus: Timing, track the ball in
  → 5 sets of 10 reps — vary location
  → 2 sets: two-strike approach (choked up)

  FRIDAY (Batting Practice — 45 min):
  → 3 rounds of 10 pitches from coach/machine
  → Round 1: fastball only — full swing
  → Round 2: all pitches — be selective
  → Round 3: two-strike simulations
  → Video 1–2 rounds for review

  ONGOING:
  → Watch 10 min of pro hitting film weekly
  → Study one pitcher you'll face next game
  → Keep a hitting journal (what worked, what didn't)`,
        },
      },
      incident: {
        title: "How the Dodgers Build Hitters — Robert Van Scoyoc and Analytics",
        when: "2015–present — Dodgers Hitting Development Program",
        where: "Dodger Stadium and Camelback Ranch Spring Training Facility",
        impact: "The Dodgers' hitting development infrastructure under coaches like Robert Van Scoyoc (who worked with Mookie Betts, Clayton Kershaw on batting mechanics, and others) combined Statcast data with traditional tee and cage work to create one of the most systematic hitter development programs in professional baseball.",
        body: [
          "The Dodgers' approach to hitting development integrates data and traditional work more deliberately than almost any other franchise. During spring training and the regular season, hitters receive daily Statcast reports — exit velocity by pitch zone, launch angle distribution, swing rate by pitch type. This data informs which tee drills to run that day: if a hitter's exit velocity on outer-half pitches is declining, they run outer-half tee sessions. If launch angle is dropping below 10 degrees, the hitting staff runs high-tee and launch angle drills.",
          "The Dodgers also pioneered the use of real-time video — iPads positioned in the dugout allow hitters to review at-bats immediately between innings, comparing their swing to pre-game plan mechanics. This feedback loop has significantly shortened adjustment cycles: where it once took a week for a hitter to recognize and correct a mechanical problem, it now takes an inning. Youth players can approximate this system with a smartphone on a tripod in the batting cage — the technology is accessible, but the discipline to use it consistently is what distinguishes great development programs.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Tee Work", sub: "isolate mechanics — no timing", type: "system" },
          { label: "Soft Toss / Front Toss", sub: "add timing element", type: "attacker" },
          { label: "Live BP / Game At-Bats", sub: "full pitcher deception + timing", type: "victim" },
          { label: "Video Review", sub: "compare, adjust, improve", type: "result" },
        ],
      },
      timeline: [
        { year: 1971, event: "Ted Williams begins public hitting instruction — tee work and zone theory taught" },
        { year: 1990, event: "Batting tee becomes standard equipment in youth and professional practice" },
        { year: 2000, event: "Video analysis first used in youth baseball — VHS to early digital cameras", highlight: true },
        { year: 2015, event: "Dodgers integrate Statcast data into daily hitting development sessions" },
        { year: 2018, event: "Real-time in-game video (iPad in dugout) becomes standard at MLB level" },
        { year: 2024, event: "Dodgers' development system produces 6 hitters with 15+ HR in World Series lineup" },
      ],
      keyTakeaways: [
        "Tee work is the foundation: it isolates mechanics without timing pressure, allowing precision development",
        "A weekly routine (tee → soft toss → batting practice → video review) builds hitting skills systematically",
        "Video analysis on a smartphone at 240fps is accessible to every youth player — use it with specific focus",
        "Keep a hitting journal: what worked, what did not, adjustments made — elite hitters track their development",
      ],
      references: [
        { title: "Dodgers: Spring Training Hitting Program", url: "https://www.mlb.com/dodgers" },
        { title: "Little League: Batting Tee Drills", url: "https://www.littleleague.org/player-and-coach-resources/baseball-coaching-guides/" },
        { title: "MLB: Youth Hitting Development", url: "https://www.mlb.com/youth-programs" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-2-10-q1",
          type: "Tee Work",
          challenge: `  You are struggling with outside pitches —
  you keep rolling over them for ground balls
  to the shortstop side.

  Your coach suggests a specific tee drill.
  Where should the tee be positioned to
  correct this problem?`,
          text: "How do you use tee work to specifically address problems with outside pitches?",
          options: [
            "Set the tee on the inner half to force the hitter to stay inside the ball on all pitches",
            "Set the tee at the back edge of the plate on the outer half, focusing on staying back and driving through the ball to the opposite field",
            "Set the tee in the middle of the strike zone and focus on a more level swing path",
            "Tee work cannot help with outside pitches — live BP is the only way to fix this problem",
          ],
          correctIndex: 1,
          explanation: "For outside pitch problems, set the tee at the back edge of the plate (sometimes slightly behind) on the outer half of the zone. This forces the hitter to let the pitch get deep before contact — exactly the adjustment needed. Take 50+ reps here, focusing on: staying back (no early hip commitment), driving the ball to the opposite field, and full extension through the contact zone. The tee gives you 50 reps in the exact contact zone you are struggling with — more targeted than any live practice.",
        },
        {
          id: "baseball-2-10-q2",
          type: "Video Analysis",
          challenge: `  You record your swings at 240 fps during
  batting practice. Reviewing the video,
  you notice your head is lifting slightly
  before the bat makes contact with the ball.

  Your timing and contact have been inconsistent.

  Is this video observation useful?`,
          text: "How should a youth player use video analysis to make targeted mechanical improvements?",
          options: [
            "No — feeling the swing is more important than visual analysis; mechanics felt differently often look different on video",
            "Yes — identifying a specific issue (head lifting early) with video allows the hitter to give themselves a concrete cue to fix on the next round of tee work",
            "Only MLB-level coaches can correctly interpret swing video — youth players should not analyze their own swings",
            "Video is only useful for identifying problems, not for fixing them — you need a coach to suggest drills",
          ],
          correctIndex: 1,
          explanation: "Video analysis is one of the most powerful development tools available to any hitter because it shows what is actually happening, not what you feel is happening. Feeling and reality often diverge significantly — many hitters feel they are keeping their head down but video shows clear early lift. Identifying 'head lifts before contact' gives you a specific, testable cue: 'see the bat hit the ball.' You take 20 tee reps focusing only on that cue, then re-record and compare. This feedback loop accelerates development dramatically. At 240fps on a modern phone, this is available to any youth player.",
        },
        {
          id: "baseball-2-10-q3",
          type: "Routine Structure",
          challenge: `  Two players practice the same total time:

  Player A: 3 hours of random hitting —
  mixing tee, soft toss, and BP with no
  specific focus, just hitting as many balls
  as possible.

  Player B: 1 hour of structured practice:
  20 min tee (specific location), 20 min soft
  toss (with two-strike adjustments), 20 min BP
  (with video review between rounds).

  Which player improves faster?`,
          text: "Why does purposeful, structured practice produce faster improvement than high-volume unstructured practice?",
          options: [
            "Player A — volume of reps is the most important factor in athletic skill development",
            "Player B — deliberate practice with specific goals and feedback loops reinforces exactly the skill being targeted",
            "They improve at the same rate — time and reps are what matter, not structure",
            "Player A improves faster in the short term; Player B only shows benefits after a full season",
          ],
          correctIndex: 1,
          explanation: "Deliberate practice — focused repetition on a specific skill with immediate feedback — is consistently shown by sports science research to produce faster skill acquisition than random high-volume practice. When Player B takes 20 tee reps specifically targeting outer-half contact, then uses video to confirm the adjustment, then practices two-strike choking-up with specific swing shortening, each session is building exactly what was targeted. Player A's random reps can actually reinforce existing errors if they are practicing bad habits at high volume. Quality + structure beats raw quantity.",
        },
        {
          id: "baseball-2-10-q4",
          type: "Holistic Development",
          challenge: `  A 12-year-old player wants to hit like
  Shohei Ohtani. They ask you:
  "What is the single most important thing
  I can do to become a great hitter?"

  What do you tell them?`,
          text: "What single piece of advice best summarizes how to develop into a skilled hitter at the youth level?",
          options: [
            "Hit the gym — strength is the foundation of every aspect of hitting",
            "Build a daily practice routine with tee work, maintain plate discipline, and study the craft through video and reading — consistency over years produces greatness, not shortcuts",
            "Find the right batting stance and stick with it forever — mechanical consistency is everything",
            "Play in as many games as possible — game experience is the only real teacher",
          ],
          correctIndex: 1,
          explanation: "Daily consistent practice, combined with mental development (plate discipline, pitch recognition study, video analysis) and patience to let skills develop over years, is what produces great hitters. Ohtani didn't develop his swing in a month — he threw and hit daily from childhood, studied hitters and pitchers obsessively, and built a complete approach over two decades. Shortcuts don't exist. What does exist is a reliable path: tee work every day, study pitchers, maintain discipline, use video, keep a journal, and trust the process. A player who does these things consistently from age 10 to age 18 will become a genuinely skilled hitter.",
        },
      ],
    },
  },
];
