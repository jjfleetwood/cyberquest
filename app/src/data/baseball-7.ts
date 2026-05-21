import type { StageConfig, EpochConfig } from "./types";

export const baseball7Epoch: EpochConfig = {
  id: "baseball-7",
  name: "Pitching Strategy",
  subtitle: "The Chess Match on the Mound",
  description:
    "Pitching is the deepest intellectual game in baseball — a chess match played at 95 miles per hour, where every pitch is a calculated move and every batter is a puzzle to be solved. This epoch dives into the strategic mind of a pitcher: reading batters before a pitch is thrown, manipulating counts, sequencing pitches across an entire lineup, and managing a start from the first inning through the third time through the order. From Sandy Koufax's elegant simplicity to Clayton Kershaw's career-long evolution, the greatest Dodger pitchers teach every principle covered here. Learn to think from the mound — and you will never watch a game the same way again.",
  emoji: "🧠",
  color: "indigo",
  unlocked: true,
};

export const baseball7Stages: StageConfig[] = [
  // ─── baseball-7-01: Reading the Batter ───────────────────────────────────────
  {
    epochId: "baseball-7",
    wonder: {
      name: "Dodger Stadium",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "🧠",
    },
    id: "baseball-7-01",
    order: 1,
    title: "Reading the Batter",
    subtitle: "Stance clues, weight distribution, grip tightness, and setup tells",
    category: "sports",
    xp: 80,
    badge: { id: "baseball-7-badge-01", name: "Mound Reader", emoji: "👁️" },
    challengeType: "quiz",
    info: {
      tagline: "A pitcher who watches before he throws wins half the battle before the ball ever leaves his hand.",
      year: 1965,
      overview: [
        "Before a pitch is thrown, a pitcher and catcher can gather enormous information from the batter's setup in the box. Stance width, weight distribution, hand height, grip tightness on the bat, stride direction tendencies, and how deep or shallow the batter stands relative to home plate all provide clues about that hitter's preferences, vulnerabilities, and likely weaknesses. This is not guesswork — it is systematic observation that professional pitchers and catchers train over years.",
        "A batter who stands deep in the box (toward the catcher) is typically trying to buy more time on breaking balls — a signal they may struggle with hard fastballs up in the zone. A batter who crowds the plate and stands close to it often has trouble with pitches on the inner half — they are inviting the pitcher to go inside. A batter with an open stance (front foot angled toward the pitcher) may have difficulty covering the outer half because their hips are pre-rotated.",
        "Dodger catchers study opposing lineups extensively before each series, building a mental model of each hitter's tendencies with their own Statcast and video preparation. Behind the plate, the catcher serves as the pitcher's strategist — setting up the mitt in specific locations based on everything they know about a given batter. When Clayton Kershaw saw a catcher set up outside against a right-handed batter who had been pulling everything, he understood immediately: go away, make them expand, then come back inside.",
      ],
      technical: {
        title: "Physical Tells and What They Mean",
        body: [
          "Grip tightness is one of the most telling indicators of a batter's mental state and intent. A batter who grips the bat so hard that their forearms are visibly tight is often locked up mentally — they are trying to hit the ball hard, which means they will overswing on anything off-speed. This is the moment to throw a changeup or curveball early in the count. A relaxed grip usually means a disciplined, patient hitter — the kind who will not chase.",
          "Stride direction tells are equally valuable. A hitter who strides toward the catcher (stepping toward the dugout) during their swing is likely to have trouble with pitches on the outer half — their stride pulls them away from outside pitches. A hitter who strides toward the mound (stepping into the pitch) often has trouble with hard stuff inside — they are moving into it without time to get the hands in. Weight distribution — whether a hitter loads heavily onto the back foot or barely loads at all — predicts timing. Heavy back-foot loaders love fastballs because the load generates power; they typically struggle with off-speed that disrupts that load.",
        ],
        codeExample: {
          label: "Catcher's Pre-At-Bat Checklist — Reading the Batter",
          code: `  STANCE DEPTH:
  Deep in box  → trouble with hard stuff up
               → attack with elevated fastball
  Shallow      → more time on breaking ball
               → attack with breaking ball early

  PLATE DISTANCE:
  Crowding     → inner half is dangerous
               → jam them, then go away
  Standing far → outer half has gaps
               → establish away, come inside

  STANCE TYPE:
  Open stance  → trouble covering outer half
               → work the outside corner
  Closed       → inside fastball creates jams
               → set up away, attack inside

  WEIGHT / LOAD:
  Heavy loader → vulnerable to off-speed
               → changeup or curveball early
  Quiet load   → disciplined timing, patient
               → attack early in count

  GRIP:
  Tight/rigid  → anxious, will expand zone
               → waste pitch first; come back
  Relaxed      → disciplined — make them hit
               → attack the strike zone`,
        },
      },
      incident: {
        title: "Sandy Koufax at Chavez Ravine — The Perfect Game, 1965",
        when: "September 9, 1965 — Regular Season at Dodger Stadium (Chavez Ravine)",
        where: "Dodger Stadium (Chavez Ravine), Los Angeles, California",
        impact: "Sandy Koufax's perfect game against the Chicago Cubs on September 9, 1965 — striking out 14 — was built on a game plan that barely varied: fastball up-and-in early in the count to set up his curveball low-and-away. Catcher Jeff Torborg called the game almost exclusively on the read that Cubs hitters were loading for the fastball, which made Koufax's curveball completely unhittable.",
        body: [
          "On September 9, 1965, Sandy Koufax walked no one and struck out 14 batters in a 1-0 perfect game against the Chicago Cubs. The feat was remarkable not just for the results but for the strategic clarity behind it: Torborg and Koufax had studied the Cubs lineup and noted that nearly every hitter loaded their weight aggressively onto the back foot — a tell that they were sitting on Koufax's fastball velocity. So Koufax used the fastball to establish the count, then buried his curve low-and-away when hitters were committed forward.",
          "The elegance of Koufax's approach that night was its simplicity. He did not need elaborate sequencing because his two pitches were so dominant that reading the batter's weight distribution was enough to know which one to use. When Cubs hitters loaded heavily, they got the curveball. When they appeared to be sitting back, they got the high fastball. Torborg described it afterward as 'the easiest game I ever caught — Sandy knew what they wanted and gave them the opposite.' The perfect game stands as the single greatest read-and-react pitching performance in Dodger history.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Observe Stance and Load", sub: "depth, weight, grip, stride", type: "system" },
          { label: "Identify the Tendency", sub: "what does this batter prefer?", type: "attacker" },
          { label: "Attack the Weakness", sub: "pitch to the opposite of preference", type: "victim" },
          { label: "Adjust Through the At-Bat", sub: "re-read if they adjust", type: "result" },
        ],
      },
      timeline: [
        { year: 1955, event: "Dodger catchers under manager Walter Alston formalize pre-game hitter study programs" },
        { year: 1965, event: "Koufax's perfect game — 14 Ks, reading Cubs hitters' loads all night", highlight: true },
        { year: 1988, event: "Orel Hershiser's 59 scoreless innings — systematic batter reading across 8 starts" },
        { year: 2000, event: "Video analysis brings batter-tendency data to catchers' pregame routine" },
        { year: 2015, event: "Statcast begins quantifying batter pull tendencies and spray charts by zone" },
        { year: 2024, event: "Dodger catcher Will Smith uses real-time tablet data to adjust setup pitch-by-pitch", highlight: true },
      ],
      keyTakeaways: [
        "Stance depth tells you if a hitter is looking for time on breaking balls (deep) or trying to attack early (shallow)",
        "Plate crowding signals inner-half vulnerability — go away to set up inside, or jam them immediately",
        "Heavy back-foot loaders favor fastball timing — they are vulnerable to changeups that disrupt the load",
        "Grip tightness predicts mental state: tight grippers will expand their zone; relaxed hitters will make you throw strikes",
      ],
      references: [
        { title: "Baseball Reference: Koufax 1965 Perfect Game", url: "https://www.baseball-reference.com" },
        { title: "MLB: Dodger Pitching History", url: "https://www.mlb.com/dodgers/history" },
        { title: "Baseball Savant: Batter Tendency Charts", url: "https://baseballsavant.mlb.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-7-01-q1",
          type: "Stance Reading",
          challenge: `  The opposing batter steps into the box.
  You notice he is standing very deep —
  well toward the catcher — and his weight
  is loaded heavily on his back foot.

  Your catcher sets up for pitch selection.

  What do these two tells suggest about
  how to attack this hitter?`,
          text: "What do a deep stance position and heavy back-foot load suggest about a batter's vulnerability?",
          options: [
            "He is comfortable with all pitch types — the stance is neutral and gives no information",
            "He is buying time for breaking balls and loading for fastball power — elevated fastballs and early off-speed pitches should exploit both tendencies",
            "He is likely a contact hitter who rarely strikes out — avoid breaking balls and stay with fastballs",
            "Standing deep in the box is always a sign of a power hitter — attack him with inside fastballs",
          ],
          correctIndex: 1,
          explanation: "A deep stance typically means the batter is trying to buy time — he likely has trouble with high fastballs that rise through the zone before he has time to fully identify them. The heavy back-foot load signals he is sitting on fastball velocity and using it to generate power. Together, these tells suggest two attack vectors: an elevated fastball that his deep stance doesn't give him enough time to process, and early off-speed (changeup or curveball) that disrupts the loaded back-foot timing mechanism. This is exactly the kind of pre-pitch intelligence that catchers and pitching coaches build their game plans around.",
        },
        {
          id: "baseball-7-01-q2",
          type: "Plate Position",
          challenge: `  The batter crowds the plate — his front
  foot is almost touching the inside corner.
  Your catcher sets up on the outer half.

  After two pitches away, the catcher
  sets up middle-in.

  Why is the sequence — away first,
  then inside — effective against a
  plate-crowder?`,
          text: "How does establishing the outer half first enhance the effectiveness of an inside pitch against a plate-crowder?",
          options: [
            "It doesn't — against a plate-crowder, you should go inside immediately since that is their weakness",
            "Working away first forces the batter to lean out to cover the outside corner, making the subsequent inside pitch even more difficult to handle as they are moving away from it",
            "The sequence only works if the first pitch away is a ball — strikes on the outside corner have no setup effect",
            "Plate-crowders are usually power hitters who should be walked intentionally rather than pitched to",
          ],
          correctIndex: 1,
          explanation: "Setting up away first against a plate-crowder accomplishes two things: it establishes that you will use the outer half, which causes the batter to lean out and cover the outside corner with their weight moving away from the inside; and it creates a mental commitment to protecting away. When you then come inside with a fastball or cut fastball, the batter is physically and mentally committed to the outside pitch — they cannot get their hands in quickly enough, and the result is a jammed swing or a foul tip off the handle. The setup pitch is the key; the inside pitch is the weapon.",
        },
        {
          id: "baseball-7-01-q3",
          type: "Grip Tell",
          challenge: `  First pitch of the at-bat. You look in from
  the mound. The batter's forearms are rigid,
  knuckles white on the bat handle, jaw
  clenched.

  Your catcher flashes signs.

  What does the batter's grip tightness
  tell you about the best pitch to throw?`,
          text: "How does a batter's grip tightness inform pitch selection at the start of an at-bat?",
          options: [
            "Tight grip means the batter is strong — throw fastballs away to prevent extra-base hits",
            "A tight grip signals anxiety and over-aggression — throw an off-speed pitch early because he will likely expand his zone trying to drive the ball",
            "Grip tightness has no bearing on pitch selection — focus only on scouting tendencies",
            "A tight grip means the batter is ready — go after him with your best fastball immediately",
          ],
          correctIndex: 1,
          explanation: "Grip tightness is a reliable tell of mental state. A batter with a rigid, tight grip is often anxious, overeager, or trying too hard to hit the ball hard — their forearms are loaded with tension that kills bat speed and timing. This batter will expand their zone because their aggressiveness overrides their discipline. An early changeup or curveball — something soft when they are braced for hard — is exactly the pitch to throw. The tight grip tells you they are already overcommitted; give them something to overcommit to.",
        },
        {
          id: "baseball-7-01-q4",
          type: "Dodger Catcher Setup",
          challenge: `  Studying tonight's lineup with catcher
  Will Smith, you note that the third batter
  always strides toward the third-base dugout
  — away from outside pitches.

  Smith sets up for every at-bat with
  this batter on the outer half first.

  Is Smith's setup correct, and why?`,
          text: "How does a hitter's stride direction toward the dugout inform the catcher's location setup?",
          options: [
            "No — a batter who strides away from outside pitches should be pitched inside to take advantage of his open body position",
            "Yes — striding toward the dugout pulls the batter away from the outside corner, making outer-half pitches even more difficult to drive; Smith is attacking the gap his stride creates",
            "Stride direction is only relevant for left-handed hitters — it has no meaning for right-handers",
            "Smith should not set up on the outer half because stride direction tells apply only to curveballs, not fastballs",
          ],
          correctIndex: 1,
          explanation: "A stride toward the dugout (open stride) pulls the batter's body away from the outer half of the plate. As the batter opens up early, the outside corner becomes physically harder to reach — the bat must travel a longer path to get to that zone, and the hitter's power is directed toward the pull side. Will Smith's outer-half setup exploits exactly this: by consistently working the outside corner, he forces a batter who is already moving away from that location to make difficult, reach-across contact. This is a textbook application of stride-direction scouting.",
        },
      ],
    },
  },

  // ─── baseball-7-02: Working the Count ────────────────────────────────────────
  {
    epochId: "baseball-7",
    wonder: {
      name: "Camelback Ranch — Glendale, Arizona",
      location: "Glendale, Arizona",
      era: "Modern",
      emoji: "🌵",
    },
    id: "baseball-7-02",
    order: 2,
    title: "Working the Count",
    subtitle: "First-pitch strikes, 0-2 waste pitches, and the 3-2 battle",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-7-badge-02", name: "Count Commander", emoji: "📊" },
    challengeType: "quiz",
    info: {
      tagline: "The count is not just a scoreboard — it is the scoreboard of the at-bat, and the pitcher who controls it controls the outcome.",
      year: 2011,
      overview: [
        "Count management is one of the most analytically studied aspects of pitching. Research consistently shows that batters hit dramatically better in hitter's counts (2-0, 3-1, 3-2 from the batter's perspective) and dramatically worse in pitcher's counts (0-2, 1-2). A first-pitch strike is the single most important pitch in any at-bat: it shifts the count in the pitcher's favor before the batter has had any chance to read tendencies or make adjustments. Pitchers who consistently throw first-pitch strikes dominate; those who fall behind consistently struggle.",
        "The 0-2 count is a gift for the pitcher — the batter must protect the plate, and the pitcher has enormous latitude to throw pitches off the zone (waste pitches) or attack aggressively. A waste pitch in an 0-2 count is typically a pitch just off the strike zone — an eye-level fastball above the zone, or a curveball in the dirt — designed to get the batter to chase. If they swing and miss, the at-bat ends. If they take it, the count is 1-2 and the pitcher still has the upper hand.",
        "The failure cycle that defines bad pitching is going from 0-2 to 3-2. This is the pitching equivalent of a gift being returned: starting with a dominant 0-2 advantage and allowing the batter to battle back to 3-2 means four consecutive non-outs — the pitcher missed their window. Clayton Kershaw's legendary competitiveness was partly built on his refusal to waste 0-2 counts; Walker Buehler, by contrast, sometimes struggled when ahead by trying to be too fine rather than attacking.",
      ],
      technical: {
        title: "Count Leverage — How Each Count Affects Outcomes",
        body: [
          "MLB research shows that batting average, slugging percentage, and on-base percentage all shift dramatically by count. In 3-0 counts, batters hit over .400 — the pitcher must throw a strike and virtually everyone knows it's a fastball. In 0-2 counts, batters hit below .170 — they are defensive, protecting the plate, and can be attacked with pitches they cannot handle. The leverage of the count is why first-pitch strike percentage is one of the most predictive metrics of pitcher success: it sets the count in your favor before the batter has any information.",
          "Kershaw's approach to count management was aggressive: he wanted first-pitch strikes at over 65% of at-bats. He would start batters with a curveball as often as a fastball — keeping hitters from sitting on his heater on 0-0. His 0-2 approach was to immediately return with the curveball in the dirt, not a waste pitch far off the plate, trusting that the setup of his fastball had created the expectation needed for the follow-up breaking ball to be chased.",
        ],
        codeExample: {
          label: "Count Advantage Chart — Pitcher vs. Hitter",
          code: `  PITCHER'S ADVANTAGE:
  0-2: BA ~.160 — attack or waste and finish
  1-2: BA ~.190 — continue to press advantage
  0-1: BA ~.230 — press toward 0-2 quickly

  NEUTRAL COUNTS:
  0-0: First pitch — ATTACK for strike
       → First-pitch strike = game-changer
  1-1: Both sides even — execute next pitch
  2-2: Battle — make your best pitch

  HITTER'S ADVANTAGE:
  2-0: BA ~.310 — can't miss with a strike
  3-1: BA ~.350 — fastball almost certain
  3-2: BA ~.290 — full count, must attack
  3-0: BA ~.400 — almost always a fastball

  KEY PRINCIPLE:
  0-2 → 3-2 = total failure, wasted gift
  0-2 → out  = what first-pitch strikes earn
  First-pitch strike → K rate doubles`,
        },
      },
      incident: {
        title: "Clayton Kershaw's First-Pitch Strike Mastery — 2011 Cy Young",
        when: "2011 — Kershaw wins NL Cy Young and MVP",
        where: "Dodger Stadium and road parks across the NL",
        impact: "In 2011, Clayton Kershaw won both the NL Cy Young Award and the NL MVP — the first pitcher to win both since Bob Gibson in 1968. His first-pitch strike percentage that year was 66%, well above the league average of 59%. Combined with a 2.28 ERA and 248 strikeouts, his count management was the engine that made everything else work.",
        body: [
          "Kershaw's 2011 season was the result of a deliberate philosophical commitment to count control. Coming into spring training at Camelback Ranch, his pitching coaches worked with him on first-pitch attack sequences — specifically throwing his curveball more often on 0-0 to prevent hitters from sitting fastball. The result was that hitters could never reliably guess his pitch on the first offering, which led to more 0-1 and 0-2 counts and fewer 1-0 and 2-0 situations where hitters could be selective.",
          "When Kershaw got to 0-2, his approach was to attack rather than waste: return with either the curveball in the dirt — which hitters who had just seen two fastballs would chase — or a fastball on the black at the knees. His strikeout-to-walk ratio that year was 9.58:1, the best in the majors, reflecting a pitcher who both generated strikeouts and avoided the walks that come from falling behind in counts. Count management was the foundation of his dominance.",
        ],
      },
      diagram: {
        nodes: [
          { label: "First-Pitch Strike", sub: "shift count in your favor immediately", type: "system" },
          { label: "0-2 Advantage", sub: "waste or attack — never give it back", type: "attacker" },
          { label: "Finish the At-Bat", sub: "expand zone, attack with best pitch", type: "victim" },
          { label: "Avoid 0-2 → 3-2", sub: "that cycle destroys pitchers", type: "result" },
        ],
      },
      timeline: [
        { year: 1966, event: "Koufax's final season — 87% first-pitch strikes, highest first-pitch strike rate of his era" },
        { year: 1988, event: "Hershiser uses count discipline as foundation of his 59-inning scoreless streak" },
        { year: 2003, event: "Bill James publishes research showing count leverage — first-pitch strikes quantified" },
        { year: 2011, event: "Kershaw wins Cy Young and MVP on the back of elite count control", highlight: true },
        { year: 2015, event: "Statcast begins tracking first-pitch strike rates for all pitchers across MLB" },
        { year: 2024, event: "Walker Buehler returns from TJ surgery — count management rebuilt at Camelback Ranch", highlight: true },
      ],
      keyTakeaways: [
        "First-pitch strikes are the most important pitches in an at-bat — they shift every subsequent count in the pitcher's favor",
        "0-2 is a gift: either waste a pitch just off the zone or attack the batter's weakness immediately — do not give the count away",
        "Going from 0-2 to 3-2 is a strategic failure — it means missing four consecutive opportunities to end the at-bat",
        "Vary your 0-0 pitch selection (mix curveball and fastball) so hitters cannot sit on a predictable first pitch",
      ],
      references: [
        { title: "Baseball Reference: Kershaw 2011 Season", url: "https://www.baseball-reference.com" },
        { title: "Fangraphs: First-Pitch Strike Rate Analysis", url: "https://www.fangraphs.com" },
        { title: "MLB: Count Leverage Research", url: "https://www.mlb.com/video" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-7-02-q1",
          type: "First-Pitch Strike",
          challenge: `  You are starting the top of the first
  inning. Your catcher sets up in the
  middle of the zone.

  Your pitching coach says before the
  game: "Get ahead early — I don't care
  what pitch it is."

  Why is the first-pitch strike so critical?`,
          text: "Why do pitching coaches emphasize first-pitch strikes above almost every other single pitch in an at-bat?",
          options: [
            "Because the first pitch is always the fastest — getting a strike early tires the batter out faster",
            "A first-pitch strike immediately shifts every subsequent count toward the pitcher's advantage, dramatically lowering the batter's expected batting average for the entire at-bat",
            "Because batters never swing at first pitches — a strike is essentially free",
            "First-pitch strikes only matter in playoff games — regular season batters don't adjust to early counts",
          ],
          correctIndex: 1,
          explanation: "A first-pitch strike transforms the at-bat's statistical landscape. On 0-0 counts, batters have essentially full plate discipline — they can be selective. Once the count is 0-1, the batter must be more protective, which limits their selectivity and puts the pitcher in a position of strength. Research shows that when pitchers throw first-pitch strikes, their strikeout rates roughly double and their walk rates drop dramatically. It is the single highest-leverage pitch in an at-bat because it sets the trajectory of every subsequent pitch. Getting ahead is not just nice — it is the foundation of pitching effectiveness.",
        },
        {
          id: "baseball-7-02-q2",
          type: "0-2 Count Strategy",
          challenge: `  You have a batter at 0-2. Your catcher
  sets up high and outside — clearly out
  of the zone — for a waste pitch.

  But your pitching coach taught you:
  "On 0-2, attack. Don't give it back."

  Who is right, and when?`,
          text: "When is a waste pitch on 0-2 appropriate, and when should you attack instead?",
          options: [
            "The catcher is always right — wasting a pitch on 0-2 is standard practice and has no downside",
            "Both approaches can be correct depending on the batter: waste a disciplined hitter who rarely chases; attack an aggressive hitter who will expand their zone trying to get a hit",
            "You should always attack on 0-2 — waste pitches give the batter free information about your stuff",
            "Waste pitches on 0-2 are illegal in professional baseball — they constitute intentional ball-throwing",
          ],
          correctIndex: 1,
          explanation: "The 0-2 decision — waste or attack — depends entirely on the batter's discipline profile. Against an aggressive, low-discipline hitter (high chase rate), attack immediately with your nastiest pitch because they will swing at anything close. Against a disciplined hitter with a low chase rate, a waste pitch first tests their discipline: if they chase, the at-bat ends; if they don't, you are 1-2 and still in control. The worst outcome is neither: throwing a hittable waste pitch that is called a strike (1-2) when you meant it as a ball. Precision on waste pitches matters — they must be clearly out of the zone.",
        },
        {
          id: "baseball-7-02-q3",
          type: "The 0-2 to 3-2 Failure",
          challenge: `  You had a batter at 0-2 in the second
  inning. You threw a waste pitch (ball),
  then missed with a curveball (ball),
  then tried to paint the corner but missed
  (ball), then threw a fastball that was
  fouled off — now 3-2.

  Your pitching coach calls timeout.
  What went wrong?`,
          text: "Why is the sequence from 0-2 to 3-2 considered a strategic failure in pitching?",
          options: [
            "Nothing went wrong — full counts are normal and the pitcher still has a 50/50 chance on the 3-2 pitch",
            "The pitcher repeatedly missed their spots and lost confidence while the batter gained information and comfort — a dominant count was surrendered through indecision and poor execution",
            "The waste pitch was the mistake — going directly to an attack pitch on 0-2 would have prevented the count from deteriorating",
            "The problem was the curveball selection — change-ups should be used on 0-2 counts, not curveballs",
          ],
          correctIndex: 1,
          explanation: "Going from 0-2 to 3-2 is four consecutive opportunities to end the at-bat — all missed. With each pitch, the batter gains more information about the pitcher's stuff, location tendencies, and mental state. The batter grows more confident while the pitcher grows more defensive. The original 0-2 gift represented a dominant position: the pitcher could attack OR waste at will. After misusing that advantage, the pitcher is now in a neutral or even slightly disadvantaged position (3-2 full count), having wasted energy and given the batter time to adjust. This cycle, repeated over a game, causes early exits and high pitch counts.",
        },
        {
          id: "baseball-7-02-q4",
          type: "Kershaw vs. Buehler",
          challenge: `  Clayton Kershaw throws his curveball
  on 0-0 counts 30% of the time.
  Walker Buehler throws his fastball
  on 0-0 counts 85% of the time.

  Buehler has a higher first-pitch strike
  rate, but Kershaw generates more 0-2 counts.

  Why might Kershaw's variety on 0-0
  lead to more 0-2 counts even with
  a lower first-pitch strike percentage?`,
          text: "How does mixing pitch types on 0-0 counts affect a batter's ability to get back into the at-bat even when the count reaches 0-1?",
          options: [
            "It doesn't — pitch type on 0-0 has no bearing on how quickly counts deteriorate for the batter",
            "When a batter cannot predict the 0-0 pitch type, they cannot time their swing as confidently even in 0-1 and 0-2 counts — uncertainty on each subsequent pitch makes it easier for the pitcher to generate swings and misses",
            "Kershaw generates more 0-2 counts because his fastball is faster — pitch variety is not the cause",
            "Mixing on 0-0 actually hurts the pitcher because the batter can identify off-speed pitches and lay off them, leading to more 1-0 counts",
          ],
          correctIndex: 1,
          explanation: "When batters cannot predict the 0-0 pitch type, they cannot load their timing mechanism confidently for the entire at-bat. A batter who knows a fastball is coming on 0-0 can sit on that pitch and be fully prepared — even if they take it for a strike, they have filed away the fastball's velocity and location. A batter who has no idea whether 0-0 will be a curveball or a fastball must be more reactive and less committed, which carries forward into the 0-1 and 0-2 counts. This uncertainty is why Kershaw could run through lineups without elite velocity — the unpredictability compounded over every pitch in the at-bat.",
        },
      ],
    },
  },

  // ─── baseball-7-03: Pitch Sequencing ─────────────────────────────────────────
  {
    epochId: "baseball-7",
    wonder: {
      name: "Dodger Stadium — The Pitcher's Mound",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "♟️",
    },
    id: "baseball-7-03",
    order: 3,
    title: "Pitch Sequencing",
    subtitle: "Setting up pitches, creating patterns, and exploiting them later",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-7-badge-03", name: "Sequence Architect", emoji: "🎭" },
    challengeType: "quiz",
    info: {
      tagline: "Every pitch you throw is a lie you plan to collect on later — sequencing is the art of the setup.",
      year: 1988,
      overview: [
        "Pitch sequencing is the art of using one pitch to create the conditions that make a subsequent pitch more effective. The classic example is the fastball in — curveball away sequence: establish that you can put a fastball on the inner half, make the batter respect it (and protect inside), then throw a curveball or changeup that starts looking inside before breaking away. The batter's body and mind are committed to protecting inside; the ball ends up on the outer half, where they cannot catch up.",
        "The setup pitch is any pitch thrown primarily to create an expectation or a mechanical adjustment in the batter's body rather than to get an out. A pitcher who throws three straight fastballs on the outer half is not necessarily trying to get three outs with those pitches — they may be establishing a pattern that makes the fourth pitch (a curveball starting outer half and breaking further away, or a fastball inside after three away) dramatically more effective. The batter's body memory and timing mechanism becomes an asset for the pitcher.",
        "Dodger starters who face a lineup multiple times in a game think in sequences across entire at-bats and across innings. If Kershaw got a groundout from a hitter on a low curveball in the first inning, he stored that information. In the fourth inning with two strikes, he would return to that same curveball — but now the hitter is also looking for it. Kershaw's counter: throw the fastball at the same eye level as the curveball's entry point, generating a swing based on the established pattern.",
      ],
      technical: {
        title: "The Setup Pitch — Investing a Pitch for a Later Return",
        body: [
          "The most effective sequencers in baseball — Greg Maddux, Tom Seaver, and in the Dodger context Kershaw and Hershiser — all understood that individual pitches are not evaluated in isolation. A fastball off the inner half that gets fouled back is not a failed pitch if it caused the batter to protect inside. That pitch paid dividends two pitches later when the curveball away was swung at early. Pitching coaches call this 'investing in the at-bat.'",
          "The fastball-in-to-breaking-ball-away is the most common setup sequence. Its effectiveness comes from a physical reality: when a batter is jammed by an inside pitch, their natural defensive reaction is to keep their hands close to their body on the next pitch. A breaking ball that starts inside (as if another jam pitch) but breaks to the outer half exploits that defensive posture — the batter's hands never get extended, and they make weak contact or swing through it. Dodger starters who went through lineups three times in a night used this sequence repeatedly, varying only the timing and pitch type of the setup.",
        ],
        codeExample: {
          label: "Classic Sequences — Dodger Starter Playbook",
          code: `  FASTBALL IN → BREAKING BALL AWAY:
  Pitch 1: Fastball inner half (establish)
  Pitch 2: Breaking ball away (exploit)
  → Batter protecting inside; ball goes away
  → Results in swing-and-miss or weak contact

  CURVEBALL EARLY → FASTBALL LATER:
  Pitch 1: Curveball for strike (set timing)
  Pitch 2: Fastball above curveball trajectory
  → Batter's timing set to curve speed
  → Fastball appears even faster

  CHANGEUP AFTER FASTBALLS:
  Pitch 1-2: Fastball (establish timing)
  Pitch 3: Changeup same arm speed
  → Batter's body fired early — weak contact

  KERSHAW'S SIGNATURE:
  Pitch 1: Fastball (count strike)
  Pitch 2: Curveball tunnel (chase or take)
  Pitch 3: Curveball same tunnel (chase again)
  → Three pitches from same tunnel, two outcomes
  → Batter cannot distinguish until too late`,
        },
      },
      incident: {
        title: "Orel Hershiser's 59 Scoreless Innings — 1988",
        when: "August 30 – September 28, 1988",
        where: "Dodger Stadium and road parks across the NL",
        impact: "Orel Hershiser's record 59 consecutive scoreless innings in 1988 was not built on overpowering velocity — he averaged about 86 mph. It was built entirely on sequencing: a sinkerball/slider combination that set up the outer half, followed by a curveball that started outer half and broke further away. Hitters who had seen three or four pitches outside were completely unprepared when he came inside with a fastball.",
        body: [
          "Hershiser's scoreless streak from August 30 through September 28, 1988, broke Don Drysdale's record of 58 innings. During the streak, Hershiser averaged fewer than 90 pitches per game — extraordinary for a pitcher going deep into games. The efficiency was entirely a product of sequencing: he did not try to overpower hitters or work deep into counts. He established the outer half with his sinker, moved the ball around the zone in patterns that hitters could not sit on, and then attacked their weakness.",
          "In the 1988 National League Championship Series, Hershiser continued his brilliance against the Mets, then shut down the Oakland Athletics in the World Series — winning MVP. His postseason sequencing was described by catcher Mike Scioscia as 'three-dimensional chess: he knew what the hitter would do with each pitch before he threw it, and he used that knowledge to set up pitches they never expected.' Hershiser's streak remains the model for what intelligent sequencing can accomplish without overpowering stuff.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Setup Pitch", sub: "create expectation or body adjustment", type: "system" },
          { label: "Batter Reacts to Setup", sub: "timing and body committed", type: "attacker" },
          { label: "Exploitation Pitch", sub: "the opposite of what was set up", type: "victim" },
          { label: "Swing Miss or Weak Contact", sub: "pattern paid off", type: "result" },
        ],
      },
      timeline: [
        { year: 1965, event: "Sandy Koufax sequences fastball/curve to perfection — 14 Ks in perfect game" },
        { year: 1988, event: "Hershiser's 59 scoreless innings built entirely on sequencing mastery", highlight: true },
        { year: 1988, event: "Hershiser wins World Series MVP — sequencing across three postseason starts" },
        { year: 2000, event: "Video analysis allows pitchers to study their own sequencing patterns and adjust" },
        { year: 2013, event: "Kershaw's first Cy Young — curveball/fastball tunnel sequences dominate NL hitters" },
        { year: 2022, event: "Tyler Anderson leads NL in groundout rate using sinker-away/curveball-down sequencing", highlight: true },
      ],
      keyTakeaways: [
        "Every setup pitch is an investment — it creates a batter expectation you will exploit with the next pitch",
        "Fastball inside followed by breaking ball away is the most reliable sequence in baseball: inside fear opens up the outer half",
        "Showing a pitch early in the game creates a pattern you can attack late — batters build body memory across at-bats",
        "Elite sequencers like Hershiser win with below-average velocity by outsmarting hitters over nine innings",
      ],
      references: [
        { title: "Baseball Reference: Hershiser 1988 Scoreless Streak", url: "https://www.baseball-reference.com" },
        { title: "MLB: Dodgers 1988 World Series", url: "https://www.mlb.com/dodgers/history" },
        { title: "Fangraphs: Pitch Sequencing Analysis", url: "https://www.fangraphs.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-7-03-q1",
          type: "Setup Pitch Concept",
          challenge: `  You throw a fastball on the inner half
  that the batter fouls straight back.
  Count is now 0-1.

  Your pitching coach nods from the dugout.
  He is not upset about the foul — he
  considers this a successful pitch.

  Why would a fouled pitch be considered
  a success in a sequencing context?`,
          text: "How can a pitch that results in a foul ball be strategically valuable in a sequencing plan?",
          options: [
            "It can't — foul balls simply extend at-bats and are never strategically beneficial for the pitcher",
            "A foul ball off an inside fastball confirms the batter's inside-protection reflex is active — the batter's body memory is now committed inside, making the next pitch away dramatically more effective",
            "The foul ball is valuable only because it advances the count to 0-1 — pitch type and location are irrelevant",
            "Foul balls on inner-half pitches are signs of poor location — the pitch should have jammed the batter, not been fouled",
          ],
          correctIndex: 1,
          explanation: "A foul ball off an inside pitch is often better than a swing-and-miss for sequencing purposes. It tells you two things: the batter reached the pitch (their hands are working inside), and they committed to protecting the inner half. Their body memory and instinct are now calibrated to inside pitches. The next pitch — a breaking ball or changeup that starts inside but moves away — will find a batter whose physical and mental defenses are pointed the wrong direction. The foul confirmed the setup is working. Your pitching coach's nod was approval of exactly this kind of strategic thinking.",
        },
        {
          id: "baseball-7-03-q2",
          type: "Fastball In / Breaking Ball Away",
          challenge: `  You have thrown two fastballs on the
  inner half. The batter has fouled both
  off — getting his hands in well.

  Count is 1-2. Your catcher sets up
  outside for a curveball.

  Why is this the right call now?`,
          text: "Why is the breaking ball away the correct follow-up after establishing the inner-half fastball?",
          options: [
            "It is not — after two inside pitches the batter expects outside, so you should throw inside again",
            "Two inside pitches have conditioned the batter's hands to work in tight — a breaking ball away exploits the inside-protection posture the batter has been reinforcing with both swings",
            "The sequence only works if the first two pitches were strikes — fouls do not create the same setup effect",
            "Curveballs away should only follow changeups inside, not fastballs — the speed differential is wrong",
          ],
          correctIndex: 1,
          explanation: "Two consecutive inside pitches — even fouled — repeatedly reinforce the batter's keep-hands-in reflex. By the third pitch, their body is wired to protect inside. A curveball that starts near the inner half of the plate (through the same visual tunnel as the previous two pitches) before breaking to the outside corner exploits that fully committed inside posture. The batter's hands instinctively stay tight while the ball ends up on the outer half where their hands cannot reach with authority. This is the fastball-in-breaking-ball-away sequence working exactly as designed.",
        },
        {
          id: "baseball-7-03-q3",
          type: "Cross-At-Bat Memory",
          challenge: `  In the first inning, you threw a
  curveball in the dirt to clean-up
  hitter no. 4. He swung and missed badly.

  You are now facing him again in the
  fourth inning. He got a hit against
  you last time on a fastball.

  Your catcher sets up for a curveball.
  You shake to the fastball.

  Who is right?`,
          text: "How should cross-at-bat memory factor into sequencing decisions when facing the same hitter multiple times?",
          options: [
            "The catcher — go back to the curveball because the first-at-bat miss proves it works against this hitter",
            "The pitcher — the hitter has now made an adjustment (the first-at-bat information worked against you last time); the fastball exploits whatever mechanical change he made to handle the curve",
            "Neither — always throw your best pitch regardless of previous at-bat results",
            "The catcher is correct, but only if the curveball is thrown to a different location than the first inning",
          ],
          correctIndex: 1,
          explanation: "This is one of pitching's most nuanced decisions. The hitter has seen your curveball, been fooled by it, and then made an adjustment — getting a hit on the fastball last at-bat. That tells you he has been thinking about the curveball: he either slowed down his timing to handle the curve, or opened his stance. Either adjustment makes him vulnerable to a fastball, which he is now less prepared for because his mental model is curveball-first. The counterpunch is the fastball. But beware: this cat-and-mouse only works once; if he hits the fastball, the curveball becomes the counterpunch again.",
        },
        {
          id: "baseball-7-03-q4",
          type: "Hershiser Sequencing",
          challenge: `  Hershiser's approach: sinker outer half,
  slider outer half, sinker outer half —
  then fastball inner half.

  After seeing three pitches away, the
  batter grounds out weakly on the inside
  fastball.

  Why does showing the outside so many
  times make the inside fastball effective?`,
          text: "How does repeatedly working the outer half set up an inside pitch for maximum effectiveness?",
          options: [
            "It doesn't — working outside repeatedly gives the batter more time to adjust to inside pitches",
            "Repeated outside pitches cause the batter to drift slightly toward the outer half physically and shift their mental coverage outside — the inside pitch then arrives in unprotected territory",
            "Inside pitches are always effective regardless of setup — the outer half sequencing is irrelevant",
            "The effectiveness comes from the count, not the location sequence — an 0-2 inside pitch is always dangerous",
          ],
          correctIndex: 1,
          explanation: "When a batter sees three consecutive pitches on the outer half, their body gradually adjusts: they may lean slightly toward the outside corner, their stride direction begins pointing toward outer half coverage, and their mental focus shifts to protecting away. The inside fastball then arrives in territory the batter has essentially vacated. Hershiser used this systematically — his sinker/slider combination was so effective at establishing outside that when he came inside, the batter had already committed away. This is the outer-half-to-inner-half version of the classic setup sequence, and it was the cornerstone of Hershiser's entire approach during the scoreless streak.",
        },
      ],
    },
  },

  // ─── baseball-7-04: First Time vs. Third Time Through the Order ───────────────
  {
    epochId: "baseball-7",
    wonder: {
      name: "Dodger Stadium — Bullpen",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "🔄",
    },
    id: "baseball-7-04",
    order: 4,
    title: "First Time vs. Third Time Through the Order",
    subtitle: "Why starters fade, the Opener strategy, and Dave Roberts' bullpen management",
    category: "sports",
    xp: 90,
    badge: { id: "baseball-7-badge-04", name: "Game Manager", emoji: "📋" },
    challengeType: "quiz",
    info: {
      tagline: "The third time through the order is where starters earn their money — and where most of them run out of it.",
      year: 2020,
      overview: [
        "One of the most significant analytical findings in modern baseball is the 'times through the order penalty' — a consistent and measurable increase in batting performance against a starting pitcher each successive time through the lineup. The first time through, batters have no information about velocity, movement, or sequencing patterns. By the third time through, they have seen every pitch in the starter's arsenal in multiple counts and locations — and they have adjusted. OPS against starters typically increases by 15–20 points each time through the order.",
        "Dave Roberts and the Dodgers became one of the most aggressive teams in baseball at managing this penalty. Roberts was an early adopter of the 'times through order' data and routinely pulled starters before the third time through, especially in high-leverage situations. This approach drew criticism when it worked imperfectly but was validated when the Dodgers used a full bullpen game strategy in the 2020 World Series — starting with the opener model and using their best relievers in the highest-leverage moments rather than in the traditional 7th, 8th, 9th order.",
        "The Opener strategy — starting a reliever for one or two innings before turning the game over to a long reliever — was pioneered by the Tampa Bay Rays but adopted across baseball including by the Dodgers in their 2020 championship run. The concept is simple: matchup-optimize the first inning by starting the pitcher who has the best platoon advantage against the top of the opposing lineup, then transition to the 'bulk pitcher' who can handle innings 2 through 5.",
      ],
      technical: {
        title: "The Times Through Order Penalty — Numbers and Causes",
        body: [
          "Research from Fangraphs and Baseball Prospectus consistently shows that batters hit approximately .015 better in OBP and .020–.025 better in SLG each time through the order against the same starting pitcher. By the third time through, the aggregate disadvantage for the pitcher is roughly equivalent to facing a lineup that is one talent level higher than the original nine. The cause is information: batters share tendencies in the dugout between at-bats, compare notes on pitch movement, and build a mental model of the pitcher's patterns.",
          "The physical fatigue component is secondary to the information component. A pitcher whose velocity drops 2 mph by the fifth inning is partly dealing with physical fatigue but primarily dealing with hitters who have now seen 15+ pitches and know what each of his offerings looks like out of the hand. Kershaw's ability to pitch deep into games despite this penalty was a product of his sequencing creativity — he consistently changed his patterns the third time through, throwing pitches in counts and locations he had avoided earlier to prevent the information advantage from compounding.",
        ],
        codeExample: {
          label: "Times Through Order — Performance Benchmarks",
          code: `  1st TIME THROUGH (inn. 1–3):
  Batter OPS: ~.680 (pitcher advantage)
  → Hitters have zero sequence data
  → Velocity seems faster (no calibration)
  → Best time to establish patterns

  2nd TIME THROUGH (inn. 4–6):
  Batter OPS: ~.700 (neutral to slight hitter edge)
  → Hitters recall first-at-bat pitches
  → They have tested the sequence once
  → Pitcher must vary from first-at-bat pattern

  3rd TIME THROUGH (inn. 7+):
  Batter OPS: ~.730 (hitter advantage)
  → Full sequence knowledge accumulated
  → Dugout has shared tendency information
  → Fatigue compounds information disadvantage

  DAVE ROBERTS' RULE:
  → Evaluate removing starter at 75 pitches
  → 3rd time through = matchup consideration
  → 2020 WS: used opener + bulk + closer
    pattern to neutralize lineup information`,
        },
      },
      incident: {
        title: "The 2020 World Series Bullpen Game — Dodgers Beat Tampa Bay",
        when: "October 2020 — World Series vs. Tampa Bay Rays",
        where: "Globe Life Field, Arlington, Texas (Neutral Bubble Site)",
        impact: "The 2020 World Series featured two of the most analytically sophisticated teams in baseball employing opposite versions of the same concept: the Tampa Bay Rays pioneered the Opener; the Dodgers responded with a flexible bullpen management approach that matched Tampa's innovations. The Dodgers won in six games, with Game 6 decided partly by Dave Roberts' aggressive bullpen decisions.",
        body: [
          "In the 2020 World Series, Dave Roberts managed his starting pitchers with an explicit times-through-the-order framework. Clayton Kershaw started Game 1 and was pulled after 5.2 innings and 78 pitches despite allowing only two runs — Roberts did not want him facing the top of the Rays' order a third time through. This decision was criticized at the time but was vindicated: the Dodgers' bullpen held the lead. Kershaw started Game 5 and again pitched efficiently before transitioning to the Dodger bullpen.",
          "Game 6 was the most strategically significant: Roberts used Julio Urias as the closing pitcher — throwing him in the eighth inning specifically to exploit favorable platoon matchups against left-handed Tampa hitters, rather than waiting until the traditional ninth-inning save situation. Urias shut down Tampa's lineup in order, and the Dodgers clinched the World Series. The decision reflected exactly the times-through-order philosophy: use your best pitcher in the moment he is most needed, not in the traditional spot the rulebook of convention suggests.",
        ],
      },
      diagram: {
        nodes: [
          { label: "1st Time Through", sub: "pitcher advantage — establish patterns", type: "system" },
          { label: "2nd Time Through", sub: "neutral — vary from first-at-bat plan", type: "attacker" },
          { label: "3rd Time Through", sub: "hitter advantage — consider bullpen", type: "victim" },
          { label: "Opener / Bulk Strategy", sub: "neutralize information accumulation", type: "result" },
        ],
      },
      timeline: [
        { year: 1988, event: "Tommy Lasorda manages 1988 WS bullpen carefully — Kirk Gibson era tactical decisions" },
        { year: 2012, event: "Fangraphs publishes first times-through-order penalty analysis — data reaches front offices" },
        { year: 2017, event: "Tampa Bay Rays first deploy Opener strategy — Blake Snell precedes bulk pitcher" },
        { year: 2020, event: "Dodgers win WS using flexible bullpen management — Roberts credited with tactical mastery", highlight: true },
        { year: 2022, event: "All 30 MLB teams now formally track times-through-order data in real-time during games" },
        { year: 2024, event: "Dodgers use opener in postseason to matchup-optimize against opponent's top bats", highlight: true },
      ],
      keyTakeaways: [
        "Batters improve by 15–20 points of OPS each time through the order — information accumulation is the primary cause",
        "Starters must vary their sequences the third time through or face hitters who know their patterns intimately",
        "Dave Roberts made aggressive times-through-order decisions the cornerstone of the 2020 World Series run",
        "The Opener strategy removes the most predictable first-inning matchup advantage from the opposing lineup",
      ],
      references: [
        { title: "Fangraphs: Times Through Order Penalty", url: "https://www.fangraphs.com" },
        { title: "MLB: 2020 World Series Recap", url: "https://www.mlb.com/dodgers/history" },
        { title: "Baseball Prospectus: Starter vs. Reliever Effectiveness", url: "https://www.baseballprospectus.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-7-04-q1",
          type: "Times Through Order",
          challenge: `  In the first inning, the leadoff hitter
  swings through a curveball in the dirt.
  In the fourth inning, the same hitter
  lays off the same curveball for ball one.

  In the seventh inning, he hits a home run
  on a curveball in a similar location.

  What caused the progression?`,
          text: "How does information accumulation explain a batter's improving performance against the same pitcher across at-bats?",
          options: [
            "The pitcher's curveball lost movement across the game due to fatigue — the pitch became easier to hit",
            "The batter accumulated information about the curveball's starting trajectory and break over multiple at-bats, allowing him to make progressively better decisions about whether to swing",
            "The change in at-bat outcome is random variance — the same pitch produces different results due to chance",
            "The batter got lucky in the seventh inning — repeating the same sequence three times is the correct approach",
          ],
          correctIndex: 1,
          explanation: "The progression from swinging through, to laying off, to hitting the home run represents the information arc of the times-through-the-order penalty in real time. First at-bat: the batter had no calibration for the curveball's starting trajectory, drop, or timing — he swung through it. Second at-bat: he had stored the first miss — he knew roughly where it started and how it moved — so he identified the out-of-zone location and took it. Third at-bat: he now had two data points and a clear mental model — he could sit on the pitch and attack it when it entered the zone. This is precisely why starters allow more runs the third time through.",
        },
        {
          id: "baseball-7-04-q2",
          type: "Dave Roberts Decision",
          challenge: `  Your starter is in the 6th inning with
  74 pitches and a 3-1 lead. He has just
  retired the side in order for the second
  straight inning. The top of the opposing
  lineup is due up — and they will be
  seeing him for the third time.

  Do you leave him in or go to the bullpen?`,
          text: "How should a manager apply times-through-order analysis to in-game pitching decisions?",
          options: [
            "Leave him in — he is pitching well and the pitch count is acceptable; momentum matters more than data",
            "Go to the bullpen — the third time through the order presents a structural disadvantage that the pitcher's recent success does not eliminate; the risk is asymmetric",
            "Let the pitcher bat in the bottom half of the inning and decide afterward — never pull a pitcher who just had a clean inning",
            "Leave him in, but only until the first baserunner in the seventh — then go to the bullpen",
          ],
          correctIndex: 1,
          explanation: "The times-through-order penalty is structural — it applies regardless of how the pitcher has pitched recently. Even a dominant sixth inning is a single inning of data; the third time through the lineup is a systemic advantage the opposing batters hold regardless of the previous two outs. Dave Roberts' approach was explicitly: evaluate before the third time through, regardless of recent results. The bullpen is rested and the hitters have already accumulated information — the structural math favors the bullpen at this moment. A manager who waits for a bad outcome before making the move is managing reactively, not analytically.",
        },
        {
          id: "baseball-7-04-q3",
          type: "The Opener Strategy",
          challenge: `  The opposing team's top three batters are
  right-handed. Your best reliever is a
  tough right-handed sinkerball pitcher
  who is devastating against right-handers.
  Your scheduled starter is left-handed.

  Your pitching coach suggests using the
  right-handed reliever as the Opener for
  two innings, then transitioning to the
  left-handed starter as the bulk pitcher.

  What is the strategic logic?`,
          text: "What problem does the Opener strategy solve that traditional starting pitcher usage does not?",
          options: [
            "The Opener allows the starter to warm up more slowly — it is primarily a physical benefit, not strategic",
            "The Opener exploits the first-inning matchup advantage by putting the pitcher with the best platoon split against the opposing lineup's top hitters, rather than defaulting to a fixed starting pitcher",
            "The Opener reduces bullpen usage by having a reliever throw two innings instead of saving everyone for the final three",
            "The Opener strategy only works in the playoffs — it is too disruptive for regular season use",
          ],
          correctIndex: 1,
          explanation: "Traditional starting pitcher usage ignores the fact that the first inning features the heart of the opposing lineup and that the starting pitcher was not selected based on matchup advantages against those specific hitters. The Opener fixes this: deploy the pitcher with the best matchup for innings 1-2 (when the opponent's best hitters see the pitcher for the first time and the information penalty is lowest), then transition to the bulk pitcher who can handle innings 3-6 against a more complete lineup. The Dodgers used this to turn platoon advantages into structural tools rather than lineup-specific reactions.",
        },
        {
          id: "baseball-7-04-q4",
          type: "2020 World Series",
          challenge: `  In Game 6 of the 2020 World Series,
  Dave Roberts brought Julio Urias into
  the game in the eighth inning — one
  inning earlier than the traditional
  'save situation' in the ninth.

  The Rays had left-handed hitters due
  up in the eighth. Urias is left-handed.

  Kershaw fans were upset Roberts did not
  start Game 6. Was this the right decision?`,
          text: "How does the 2020 World Series Game 6 illustrate the principle of deploying pitchers based on matchup leverage rather than convention?",
          options: [
            "No — tradition dictates that closers pitch the ninth inning; violating this convention risks the pitcher's mental preparation and the team's strategic continuity",
            "Yes — bringing Urias in the eighth to face left-handed hitters at the highest leverage moment reflects the principle that the best pitcher for the situation should pitch it, regardless of inning convention",
            "The decision was correct but only because Urias was the best pitcher available regardless of platoon matchup",
            "Roberts should have started Kershaw and managed the times-through-order penalty by limiting him to three innings",
          ],
          correctIndex: 1,
          explanation: "Roberts' decision to deploy Urias in the eighth — specifically to exploit the left-on-left platoon advantage against the Rays' left-handed hitters — is the clearest expression of modern pitching strategy: the best matchup wins the highest-leverage moment. Conventional wisdom says closers pitch the ninth. Analytical wisdom says the highest-leverage moment gets your best pitcher for that matchup, regardless of inning. The eighth inning of a World Series clincher with left-handed hitters coming up is the highest-leverage moment — Urias was the right answer. The Dodgers won. That validation confirmed the decision.",
        },
      ],
    },
  },

  // ─── baseball-7-05: Pitching from the Stretch ────────────────────────────────
  {
    epochId: "baseball-7",
    wonder: {
      name: "Dodger Stadium — First Base Line",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "⏱️",
    },
    id: "baseball-7-05",
    order: 5,
    title: "Pitching from the Stretch with Runners On",
    subtitle: "Mental checklist, varying tempo, slide step, and Kershaw's pickoff",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-7-badge-05", name: "Baserunner Stopper", emoji: "🚫" },
    challengeType: "quiz",
    info: {
      tagline: "Every runner on base is a second opponent — the pitcher who ignores them gives away outs they never gave up.",
      year: 2014,
      overview: [
        "Pitching from the stretch changes almost everything about a pitcher's rhythm, mechanics, and mental process. From the windup, a pitcher can use a full leg kick and load that generates maximum velocity and movement. From the stretch, the delivery must be abbreviated enough to give the catcher a chance to throw out a potential base-stealer, which typically means a reduced leg kick, a quicker delivery, and a different timing mechanism. The tradeoff: pitchers often lose 1-3 mph of velocity from stretch, and their breaking ball movement can be reduced.",
        "The mental checklist when pitching with runners on is multi-layered: Check the runner. Decide on tempo variation (quick delivery vs. regular tempo). Determine if a pickoff attempt is warranted. Read the catcher's signs while aware of the runner's primary lead. Decide whether to vary the time between signs and delivery to disrupt the runner's timing. All of this occurs before the pitch is thrown, and all of it must occur without losing focus on the batter, who remains the primary threat.",
        "Clayton Kershaw's left-handed pickoff move is considered one of the most effective in modern baseball history. Because left-handers face first base from their natural stance, their pickoff move — stepping toward first and throwing — is far harder for baserunners to read than right-handers who must turn their entire body. Kershaw's move was so quick and deceptive that runners who had been safe on steals against other pitchers repeatedly found themselves picked off against him, disrupting opposing teams' running games entirely.",
      ],
      technical: {
        title: "Varying Delivery Tempo — Disrupting the Runner's Timing",
        body: [
          "A baserunner's jump is built on reading the pitcher's delivery tempo. If a pitcher begins the delivery to the plate at the same time every pitch, a good baserunner will time the jump to the exact moment the pitcher's leg comes up or their hands separate. Varying delivery tempo — sometimes holding the position for 1.5 seconds, sometimes going quickly — forces the runner to guess rather than time. A runner who guesses wrong either goes too early (and gets picked off or thrown out) or goes too late (and gets thrown out by the catcher).",
          "The slide step — a delivery modification where the pitcher does not lift their front leg but instead slides it toward the plate — reduces delivery time by approximately 0.2–0.3 seconds. The tradeoff is velocity (typically 2–3 mph loss) and breaking ball effectiveness. Pitchers use the slide step primarily against base stealers with excellent speed or in situations where a stolen base would change the game context significantly. Overusing the slide step is a mistake: hitters recognize it and adjust their timing accordingly.",
        ],
        codeExample: {
          label: "Stretch Pitching Mental Checklist",
          code: `  PRE-PITCH CHECKLIST (runner on 1st):
  1. Check runner's primary lead (normal? large?)
  2. Determine tempo: vary time holding set position
  3. Decide: pickoff? (if lead is aggressive)
  4. Read catcher signs — confirm pitch/location
  5. Decide: full delivery or slide step?

  SLIDE STEP:
  Use when:
  → Speed threat with large secondary lead
  → Count or situation where SB would hurt
  → Runner has timed your regular delivery
  Don't use when:
  → Pitcher has struggled with location
  → Breaking ball is key to the at-bat

  PICKOFF COMBINATIONS:
  Look 1st → Pitch → Look 1st → Pickoff
  (Never predictable — vary the number of looks)

  KERSHAW'S LEFT-HAND ADVANTAGE:
  → Natural stance faces 1st base
  → Runner cannot see front hip separation
  → Pickoff timing: deceptive, quick, decisive
  → Sent runners back repeatedly in postseason`,
        },
      },
      incident: {
        title: "Kershaw Pickoff in the 2014 NLDS — Silencing the Cardinals",
        when: "October 2014 — NLDS Game 1 vs. St. Louis Cardinals",
        where: "Dodger Stadium, Los Angeles, California",
        impact: "In the 2014 NLDS Game 1, Clayton Kershaw used his left-handed pickoff move to retire Cardinals baserunner on first base, ending a rally that threatened to extend the game. The pickoff demonstrated how a pitcher's ability to control the running game directly translates to controlling the score — it was a momentum-shifting play in a tight game.",
        body: [
          "The 2014 Cardinals were among the most aggressive baserunning teams in the National League, regularly putting pressure on pitchers by taking aggressive leads and attempting to steal at key moments. Kershaw's response throughout the 2014 postseason was to use his pickoff move more than usual — not necessarily to record outs but to disrupt timing. He would step off, vary his tempo, and throw over enough times that runners began taking more conservative leads.",
          "Kershaw's pickoff effectiveness came from the fundamental advantage of being left-handed: his natural stance at the top of his stretch delivery has him facing first base directly, making it impossible for the runner to read hip separation (the primary tell of a pitcher beginning a delivery to the plate). A right-handed pitcher's hip turn is visible to the baserunner; Kershaw's was not. Combined with his elite tempo variation — sometimes holding the stretch for four seconds, sometimes going immediately — baserunners against Kershaw were essentially guessing rather than timing. This pickoff mastery made him dramatically more effective in high-leverage stretch situations than his right-handed counterparts.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Runner Takes Lead", sub: "read size and aggressiveness", type: "attacker" },
          { label: "Vary Tempo and Looks", sub: "disrupt runner's timing mechanism", type: "system" },
          { label: "Slide Step or Full Delivery", sub: "choose based on steal threat", type: "victim" },
          { label: "Runner Contained", sub: "steal attempt off, pickoff recorded", type: "result" },
        ],
      },
      timeline: [
        { year: 1963, event: "Koufax's left-handed pickoff move makes him one of the most effective holders in MLB" },
        { year: 1988, event: "Hershiser controls Cardinals' running game in NLCS using tempo variation" },
        { year: 2000, event: "Slide step becomes quantified — research shows 0.25s faster delivery reduces steal success" },
        { year: 2014, event: "Kershaw's pickoff in NLDS shuts down Cardinals' running game", highlight: true },
        { year: 2019, event: "MLB institutes new rules limiting pickoff attempts — strategy adapts to tempo variation" },
        { year: 2023, event: "Pitch clock rules change stretch dynamics — new timing constraints affect stretch strategy", highlight: true },
      ],
      keyTakeaways: [
        "Varying delivery tempo disrupts the baserunner's timing mechanism — unpredictability is more effective than pure speed",
        "The slide step reduces delivery time by 0.2–0.3 seconds but costs velocity and breaking ball effectiveness — use it selectively",
        "Left-handed pitchers have a natural pickoff advantage because their stance already faces first base without a readable hip turn",
        "The mental checklist (check runner, vary tempo, decide delivery type) must be completed without losing focus on the batter",
      ],
      references: [
        { title: "Baseball Reference: Kershaw 2014 NLDS", url: "https://www.baseball-reference.com" },
        { title: "Fangraphs: Slide Step and Delivery Time Research", url: "https://www.fangraphs.com" },
        { title: "MLB: Pitching from the Stretch", url: "https://www.mlb.com/video" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-7-05-q1",
          type: "Tempo Variation",
          challenge: `  The opposing team's fastest runner has
  led off with a single. He takes a
  large primary lead and has stolen
  5 of his last 6 attempts this season.

  Your catcher calls time and reminds you:
  "Vary the tempo. Don't be predictable."

  What specific adjustment should you make?`,
          text: "How does varying delivery tempo counter an aggressive base stealer's timing mechanism?",
          options: [
            "Throw over to first on every pitch — repeated pickoff attempts will eventually run down his lead",
            "Always use the slide step against base stealers — the faster delivery is the only effective counter",
            "Hold the stretch position for varying durations (sometimes 1 second, sometimes 4 seconds) so the runner cannot time the delivery; combine with a few pickoff attempts to keep him honest",
            "Pitch out on the next pitch — the catcher's arm will shut down the steal regardless of delivery time",
          ],
          correctIndex: 2,
          explanation: "A base stealer's primary weapon is timing — reading when the pitcher's delivery begins and getting the jump accordingly. If your delivery time is constant, the runner can time it like a metronome. Varying the tempo breaks that timing: holding the stretch for 1 second sometimes and 4 seconds other times means the runner must guess when you're going to the plate. Combine this with occasional pickoff attempts (which further commit his attention to first base) and you have disrupted his entire approach. The slide step is one tool within this framework but is not sufficient alone — predictable slide steps become just as easy to time as predictable full deliveries.",
        },
        {
          id: "baseball-7-05-q2",
          type: "Slide Step Tradeoff",
          challenge: `  You have a runner on first in a 2-2 count
  with a skilled base stealer. Your catcher
  calls for a curveball away — your best
  strikeout pitch in this count.

  Should you use a slide step to counter
  the steal threat, knowing it will reduce
  your curveball movement by 1–2 inches?`,
          text: "When is it wrong to use the slide step, even against a legitimate steal threat?",
          options: [
            "Always use the slide step against any base stealer — preventing the stolen base is more valuable than pitch movement",
            "When the pitch being called (curveball) depends on full delivery movement for effectiveness, compromising that movement may cost you the strikeout — weigh which outcome is more costly in context",
            "The slide step should never be used in two-strike counts — pitch quality always takes precedence",
            "Use the slide step but throw a fastball instead — never sacrifice velocity for pitch movement in two-strike counts",
          ],
          correctIndex: 1,
          explanation: "This is a genuine strategic tension. The curveball in a 2-2 count is your best tool to end the at-bat with a strikeout; if the slide step reduces its movement enough to make it hittable, you may trade one baserunner for a hit. Context matters: how fast is the runner, how significant is a stolen base (score, inning, who's batting), and how much does the slide step hurt the curveball specifically. If the runner is fast but not elite, and the curveball is your best 2-2 pitch, throwing the full-delivery curveball and trusting your catcher's arm may be the correct trade. There is no universal answer — this is the judgment-based decision that separates good pitchers from great ones.",
        },
        {
          id: "baseball-7-05-q3",
          type: "Pickoff Deception",
          challenge: `  You are right-handed. There is a runner
  on first who has been very aggressive.
  You have thrown over to first four times
  — always on the same count in your sequence
  (after your second look at the runner).

  He has stopped running but is watching
  carefully.

  What is the problem with your pickoff pattern?`,
          text: "Why is a predictable pickoff timing pattern actually counterproductive against a smart base runner?",
          options: [
            "There is no problem — consistent timing builds reliable mechanics for the pickoff throw",
            "A predictable pattern (always throw over after the second look) tells the runner exactly when to freeze vs. dive — he never gets caught because he knows when the pickoff is coming",
            "Pickoff attempts should always occur on the same count — randomizing them is against baseball convention",
            "Four pickoff attempts is too many — the issue is frequency, not timing predictability",
          ],
          correctIndex: 1,
          explanation: "A predictable pickoff timing pattern is a gift to a smart baserunner. If you always throw over after exactly two looks, the runner knows: one look means no pickoff coming; second look means possible pickoff — dive. He will never be caught because he has mapped your pattern. The solution is randomization: sometimes throw over after one look, sometimes after three, sometimes after a count pause with no look at all. The unpredictability is the weapon. Similarly, varying your pickoff delivery speed (sometimes quick, sometimes deliberate) prevents the runner from reading your intention from delivery mechanics.",
        },
        {
          id: "baseball-7-05-q4",
          type: "Kershaw's Left-Hand Advantage",
          challenge: `  A right-handed pitcher and Clayton Kershaw
  both have runners on first. Both have
  equal delivery times to the plate.

  The right-handed pitcher allows 60% steal
  success. Kershaw allows 35% steal success.

  Given equal delivery times, why does
  Kershaw hold runners more effectively?`,
          text: "What structural advantage does a left-handed pitcher have in controlling baserunners at first base?",
          options: [
            "Left-handers throw harder on pickoff attempts — the ball gets to first faster",
            "Left-handers face first base naturally in their stretch stance, making their pickoff mechanics faster and harder for runners to read because hip separation (the primary steal trigger) is not visible to the runner",
            "Left-handers are allowed more pickoff attempts under baseball rules than right-handers",
            "Kershaw's advantage comes from his velocity — faster pitches reach the catcher sooner, reducing steal opportunity",
          ],
          correctIndex: 1,
          explanation: "A left-handed pitcher's stretch stance naturally faces first base. When a left-hander begins a pickoff move, the runner at first base cannot see the pitcher's front hip and leg separate — which is the primary visual cue right-handers use to trigger a steal. A right-handed pitcher must turn away from first base to pitch, making the hip turn visible to the runner. Left-handers hide this tell entirely. Kershaw's exceptional steal prevention rate, even against quality base stealers, stems from this structural advantage combined with his elite tempo variation — runners simply cannot time him.",
        },
      ],
    },
  },

  // ─── baseball-7-06: High-Leverage Situations ─────────────────────────────────
  {
    epochId: "baseball-7",
    wonder: {
      name: "Dodger Stadium — Ninth Inning",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "🔥",
    },
    id: "baseball-7-06",
    order: 6,
    title: "High-Leverage Situations",
    subtitle: "Bases loaded, tie game, attacking vs. nibbling, and Kenley Jansen",
    category: "sports",
    xp: 90,
    badge: { id: "baseball-7-badge-06", name: "Clutch Closer", emoji: "💎" },
    challengeType: "quiz",
    info: {
      tagline: "The highest-leverage moment demands not your most careful pitch — your most decisive one.",
      year: 2017,
      overview: [
        "High-leverage situations — bases loaded one out in a tie game, tying run on second with two outs in the ninth, man on third and no outs — fundamentally change the mental calculus of pitch selection. In low-leverage situations, a pitcher can afford to nibble at the corners, waste pitches, and work deep into counts without catastrophic consequences. In high-leverage situations, the cost of walking a batter increases dramatically: in a bases-loaded situation, a walk scores a run without the defense touching the ball.",
        "The central tension in high-leverage pitching is between attacking the strike zone aggressively (throwing strikes, trusting your stuff, accepting the risk of contact) and nibbling at the edges (trying to be perfect, risking walks, falling behind in counts). Analytics consistently show that pitchers who nibble in high-leverage situations fail at higher rates than those who attack: a walk in a bases-loaded situation is guaranteed damage; a ball put in play can be fielded. Attacking the zone forces the batter to earn any run.",
        "Kenley Jansen, the Dodgers' all-time saves leader, built his career on one of the most distinctive high-leverage philosophies in modern closers: an overwhelming cut fastball thrown at 93–95 mph in almost every count, in almost every location, to both left-handed and right-handed batters. His approach was the opposite of nibbling — pure attack, trust the pitch, and let the defense work. In his prime, opposing batters knew the cutter was coming and still could not hit it.",
      ],
      technical: {
        title: "Attacking vs. Nibbling — The Philosophy of High-Leverage Pitching",
        body: [
          "The 'attack or nibble' decision is not binary — it exists on a spectrum. A pitcher who attacks means throwing pitches in locations that are difficult to hit but are still clearly in or near the strike zone, trusting their stuff to generate weak contact or swings and misses even when the batter makes contact. A pitcher who nibbles throws pitches at the very edge of the zone, hoping for called strikes on pitches that may be borderline. Nibbling fails in high-leverage because: the umpire does not always cooperate with borderline calls; the pitcher falls behind in counts trying to be perfect; and the batter eventually gets a pitch to hit when the nibbler has to come back to the zone.",
          "Pitching around (intentionally or semi-intentionally walking) a batter in high-leverage situations is occasionally correct — when the next hitter is dramatically weaker, when a platoon advantage is being avoided, or when first base is open in a force-out situation. But pitching around must be a deliberate strategic decision, not a panic reaction to the leverage. Kershaw's philosophy was: 'I would rather give up a hit than give up a walk. A hit requires the batter to beat my pitch. A walk is entirely my failure.'",
        ],
        codeExample: {
          label: "High-Leverage Decision Framework",
          code: `  BASES LOADED, 1 OUT, TIE GAME:
  → DO NOT nibble — every ball is a run
  → Attack with best pitch in your arsenal
  → Trust defense — balls in play = outs
  → A K is ideal; weak contact is fine
  → A walk ends it — no margin for balls

  TYING RUN ON 2ND, 2 OUTS, 9TH:
  → Infield at normal depth or slight in
  → One walk = runner now in scoring position
  → Attack first pitch — don't fall behind
  → Cutter/sinker low — groundball preferred
  → Avoid elevated breaking ball (HR risk)

  WHEN TO PITCH AROUND:
  → First base open AND next batter is weaker
  → Lefty/righty platoon you cannot exploit
  → Batter has already taken a good swing at
    your best pitch twice — he is locked in

  JANSEN'S FORMULA:
  → Cutter. Cutter. Cutter.
  → Attack both sides of the plate
  → Batter knows it's coming — still can't hit
  → Saves record: 350+ (Dodger all-time leader)`,
        },
      },
      incident: {
        title: "Kenley Jansen Closes the 2020 World Series",
        when: "October 27, 2020 — World Series Game 6",
        where: "Globe Life Field, Arlington, Texas",
        impact: "Kenley Jansen recorded the final out of the 2020 World Series, the Dodgers' first championship in 32 years. His cut fastball — the same pitch he had thrown 90% of the time throughout his career — retired the final Tampa Bay batter on a weak grounder to first base. The moment capped a career that defined what a franchise closer looks like.",
        body: [
          "Kenley Jansen's 2020 World Series save was his most celebrated moment in a career that produced 350+ saves with the Dodgers. His approach in Game 6 was identical to his approach in every game: the cut fastball, 93–95 mph, attacking both sides of the plate. Batters who had studied him knew the cutter was coming — it did not matter. The pitch moved late in both directions (inside to right-handers, outside to left-handers) at near-fastball velocity, giving hitters the visual impression of a fastball they could drive while the late break produced jammed contact or swing-and-misses.",
          "Jansen's philosophy for high-leverage situations was simple: 'My best pitch versus your best swing. That's it.' He did not look for weaknesses or set up sequences the way a starter might — he had one pitch and he threw it with conviction. In baseball's highest-leverage moments, that conviction — the willingness to attack rather than defend — is what separates great closers from merely good ones. Jansen's 2020 series-ending out embodied everything the Dodgers had built across 32 years of waiting: decisive, aggressive, and executed without doubt.",
        ],
      },
      diagram: {
        nodes: [
          { label: "High Leverage Identified", sub: "bases loaded, tie game, late innings", type: "attacker" },
          { label: "Attack or Nibble Decision", sub: "analytics favor attack in nearly all cases", type: "system" },
          { label: "Best Pitch, Best Conviction", sub: "Jansen: cutter — always", type: "victim" },
          { label: "Weak Contact or K", sub: "let defense work; close it out", type: "result" },
        ],
      },
      timeline: [
        { year: 1988, event: "Jay Howell's curve sets up Hershiser — Dodger bullpen high-leverage philosophy defined" },
        { year: 2009, event: "Kenley Jansen makes MLB debut — Dodger closer dynasty begins" },
        { year: 2017, event: "Jansen's NLCS performance cements him as best closer in Dodger history" },
        { year: 2019, event: "Fangraphs publishes high-leverage attack rate research — nibbling proven ineffective" },
        { year: 2020, event: "Jansen records final out of World Series — 32-year championship drought ends", highlight: true },
        { year: 2024, event: "Blake Treinen and Evan Phillips form Dodger high-leverage bridge to Ryan/Treinen", highlight: true },
      ],
      keyTakeaways: [
        "In bases-loaded situations, attacking the zone reduces walk risk — a walk scores a run without the defense touching the ball",
        "Nibbling in high-leverage situations fails: umpires miss corners, counts deteriorate, and the batter eventually gets a hittable pitch",
        "Kenley Jansen's 350+ saves prove that one dominant pitch thrown with conviction is sufficient to close games at the highest level",
        "Pitching around a batter is correct only as a deliberate strategic decision, not as a reaction to leverage pressure",
      ],
      references: [
        { title: "Baseball Reference: Kenley Jansen Career Stats", url: "https://www.baseball-reference.com" },
        { title: "MLB: 2020 World Series Highlights", url: "https://www.mlb.com/dodgers/history" },
        { title: "Fangraphs: Leverage Index and Pitcher Decision-Making", url: "https://www.fangraphs.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-7-06-q1",
          type: "Attack vs. Nibble",
          challenge: `  Bases loaded. One out. Tie game, 7th inning.
  You are on the mound. The count is 2-1.

  Your catcher calls for a curveball that
  would be at the very edge of the zone —
  may or may not be called a strike.

  Your pitching coach's voice in your head:
  "Attack. You do not have room for balls."

  What should you do?`,
          text: "Why is throwing a borderline pitch in a bases-loaded, tie-game situation a worse choice than attacking the strike zone?",
          options: [
            "Throw the borderline curveball — umpires usually reward pitchers who work the edges",
            "Attack the zone with a pitch you know is a strike — in bases loaded situations every ball is a run; you cannot rely on borderline calls",
            "The borderline curveball is correct if you have good feel for it — location precision is always preferred",
            "Walk the batter intentionally to set up a force at every base — this is the right high-leverage move",
          ],
          correctIndex: 1,
          explanation: "Bases loaded means every ball is a run — the leverage of being ahead in the count versus falling behind is asymmetric. A borderline curveball that gets called a ball puts the count to 3-1 and gives the batter enormous leverage. A borderline curveball that is called a strike is only marginally better than a clearly-in-the-zone strike. The risk-reward calculation overwhelmingly favors attacking the zone: a called ball in this situation costs you a run directly; a ball put in play gives you a chance at a double play or a groundout. Your pitching coach's instruction — attack — is analytically correct.",
        },
        {
          id: "baseball-7-06-q2",
          type: "Pitching Around",
          challenge: `  Tying run on second, one out, 9th inning.
  The opposing cleanup hitter — a left-handed
  slugger with 40 home runs — is at the plate.
  First base is open.

  The next batter is a right-handed utility
  player hitting .210 this year.

  Do you pitch to the cleanup hitter?`,
          text: "When is intentionally walking (or pitching around) a dangerous hitter the correct high-leverage decision?",
          options: [
            "Always pitch to the cleanup hitter — pitching around batters is cowardly and rarely works",
            "Yes, pitch around the cleanup hitter: first base is open, the platoon matchup favors you against the next batter, and the next hitter is dramatically weaker — this is the textbook intentional-walk setup",
            "No — the next batter should also receive careful pitching; walking the cleanup creates a second dangerous situation",
            "Pitch to the cleanup hitter but use only curveballs — never throw a fastball to a power hitter with the game on the line",
          ],
          correctIndex: 1,
          explanation: "This is the textbook scenario for pitching around a dangerous hitter. Three conditions are all met: (1) first base is open so the walk does not directly score a run or force anything; (2) the on-deck hitter is a dramatically weaker batter (.210 average, right-handed vs. presumably a right-handed pitcher creating a platoon disadvantage for the hitter); (3) the cleanup hitter has the power to end the game with a single swing. Pitching around here is not cowardice — it is correct analytical decision-making. The risk of the cleanup hitter is far greater than the risk of the utility player.",
        },
        {
          id: "baseball-7-06-q3",
          type: "Jansen's Philosophy",
          challenge: `  Kenley Jansen enters to close a 3-2 game
  in the ninth inning. The first batter
  is a right-handed hitter who has seen
  Jansen's cutter 7 times this season and
  has gone 0-for-7 against it.

  Your bench coach suggests throwing a
  changeup to "keep him off-balance."

  Jansen dismisses the suggestion.
  Why is he right?`,
          text: "Why does Jansen's single-pitch attack philosophy outperform a multi-pitch variety approach in a closing role?",
          options: [
            "The bench coach is correct — showing a changeup would create uncertainty that benefits the pitcher even against a batter who is 0-for-7 on the cutter",
            "Jansen is right — a batter who is 0-for-7 on the cutter has not found a way to hit it; adding a new pitch creates unpracticed mechanics for the pitcher and introduces more risk than benefit",
            "Jansen should throw the changeup but only on the first pitch — showing off-speed early prevents the batter from sitting cutter",
            "Both approaches are equally valid — the decision is personal preference, not strategic",
          ],
          correctIndex: 1,
          explanation: "A batter who is 0-for-7 against the cutter has not solved the pitch — they are still being beaten by it. Introducing a changeup to 'keep him off-balance' actually benefits the pitcher less than the premise suggests: now Jansen is throwing a pitch he may not have as sharp in game situations, and the batter has not been forced to adjust because he has already been failing. The cutter is working. Trust the cutter. Adding an untested variable (the changeup) to a situation where the known variable (the cutter) is succeeding is strategically backward. Jansen's conviction in his primary pitch is precisely what makes him elite.",
        },
        {
          id: "baseball-7-06-q4",
          type: "2020 World Series Closer",
          challenge: `  Jansen is on the mound in the final inning
  of the 2020 World Series. The final Tampa
  Bay batter grounds weakly to first base.
  Dodgers win their first championship in
  32 years.

  Throughout the Series, Jansen threw
  his cutter approximately 90% of the time.

  What principle does this demonstrate about
  pitching conviction vs. variety in
  championship moments?`,
          text: "What does Jansen's World Series performance demonstrate about the relationship between conviction and pitch variety?",
          options: [
            "A variety of pitches is always superior — Jansen was simply lucky that teams didn't study his cutter more",
            "In the highest-leverage moments, a dominant pitch thrown with absolute conviction outperforms a varied arsenal thrown with doubt — certainty of execution matters more than keeping hitters guessing",
            "The cutter's effectiveness in the World Series was a product of the Tampa Bay Rays' inability to scout Jansen — better-scouted opponents would have hit the cutter",
            "Jansen's success proves that velocity alone determines closer effectiveness — the cutter just happens to be fast",
          ],
          correctIndex: 1,
          explanation: "Jansen's World Series demonstrates that championship-level pitching is as much about mental conviction as physical stuff. Tampa Bay absolutely knew the cutter was coming — they are one of the most analytically sophisticated organizations in baseball. They prepared for it. They still could not hit it. This is because a pitch thrown with complete certainty — no doubt about location, velocity, or timing — is a fundamentally different offering than the same pitch thrown tentatively. Jansen never wasted a pitch searching for variety he didn't need; every cutter was thrown with the same conviction as the last. That certainty made the pitch harder to hit regardless of anticipation.",
        },
      ],
    },
  },

  // ─── baseball-7-07: Platoon Matchups and Handedness ──────────────────────────
  {
    epochId: "baseball-7",
    wonder: {
      name: "Camelback Ranch — Spring Training Bullpen",
      location: "Glendale, Arizona",
      era: "Modern",
      emoji: "🔀",
    },
    id: "baseball-7-07",
    order: 7,
    title: "Platoon Matchups and Handedness",
    subtitle: "L/R splits, LOOGYs, and how the Dodgers construct their bullpen",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-7-badge-07", name: "Matchup Master", emoji: "🧩" },
    challengeType: "quiz",
    info: {
      tagline: "In baseball, which hand throws the ball and which hand holds the bat are worth more than an ERA point — if you know how to use them.",
      year: 2017,
      overview: [
        "The platoon advantage is one of the most consistent and exploitable edges in baseball. Left-handed batters hit dramatically better against right-handed pitchers than against left-handed pitchers, and vice versa. The reason is visual and mechanical: a pitch thrown from the same side as the batter (left-on-left or right-on-right) has a natural angle that carries it away from the batter's contact zone, and breaking balls from same-side pitchers break away — harder to track and more difficult to drive. The platoon split is not a marginal effect; for many batters it represents 50–80 points of OPS difference.",
        "The LOOGY (Lefty One-Out Guy) was for decades a standard MLB bullpen role: a left-handed specialist brought in specifically to face one or two left-handed batters in high-leverage situations. The 2020 rule change requiring pitchers to face a minimum of three batters effectively eliminated the pure LOOGY role — now pitchers must face multiple hitters regardless of handedness. This pushed teams toward left-handed relievers who are effective against both left-handed and right-handed hitters, rather than pure specialists.",
        "The Dodgers have historically excelled at building bullpens that exploit platoon advantages systematically. Their roster construction under General Manager Andrew Friedman consistently includes left-handed and right-handed relievers specifically matched against offensive tendencies in the National League West. Pitchers like Alex Vesia (left-handed, devastating slider to left-handed batters) and Evan Phillips (right-handed sinker, dominant against right-handed contact hitters) were acquired with explicit matchup functions in mind.",
      ],
      technical: {
        title: "L/R Splits — Numbers and Mechanical Causes",
        body: [
          "The mechanical reason for platoon splits is the angle of release. A left-handed pitcher's fastball, released from the left side of the rubber, travels toward a right-handed batter's inside corner and away from a left-handed batter's outside corner. Breaking balls (particularly sliders and curves) break away from same-side batters — a left-handed pitcher's slider breaks away from left-handed batters, making it an unhittable pitch for many. Same-side breaking balls are considered 'out pitches' precisely because of this angle.",
          "The visual component is equally important. Batters see pitches better when they release from a cross-body angle (opposite-hand pitcher): the ball starts in their field of vision and moves toward them. Same-side pitchers' releases start at the edge of vision or behind it — the ball appears later, giving the batter less time to read spin and velocity. This visual disadvantage compounds the mechanical one, producing the dramatic splits seen in batting statistics.",
        ],
        codeExample: {
          label: "Platoon Split Reference — MLB Averages",
          code: `  LEFT-HANDED BATTER vs.:
  Right-handed pitcher:  .260 avg / .330 OBP
  Left-handed pitcher:   .235 avg / .305 OBP
  Typical split: ~25 pts avg, ~25 pts OBP

  RIGHT-HANDED BATTER vs.:
  Left-handed pitcher:   .265 avg / .335 OBP
  Right-handed pitcher:  .245 avg / .315 OBP
  Typical split: ~20 pts avg, ~20 pts OBP

  WHY SAME-SIDE WORKS:
  → Breaking balls break away from batter
  → Release angle at edge/behind visual field
  → Batter sees pitch later (less recognition time)
  → Power angle is toward hands, not through zone

  POST-2020 THREE-BATTER RULE:
  → Pure LOOGYs replaced by versatile lefties
  → Alex Vesia: elite vs. LHH, acceptable vs. RHH
  → Dodger construction: matchup-versatile
    rather than one-matchup specialists

  SWITCH-PITCHER CURIOSITY:
  Pat Venditte: threw with both arms (MLB 2015)
  → Switch-hitters faced same-side every at-bat
  → Rules: batter declares first`,
        },
      },
      incident: {
        title: "Alex Vesia and the 2023 Dodger Bullpen Construction",
        when: "2023 Season — Dodgers bullpen reconstruction",
        where: "Dodger Stadium and Camelback Ranch",
        impact: "Alex Vesia's emergence as the Dodgers' primary high-leverage left-handed reliever in 2023–2024 exemplified how the organization built around platoon advantages after the three-batter minimum rule eliminated pure LOOGYs. Vesia's slider, which breaks sharply away from left-handed batters, was the primary left-on-left weapon in the Dodgers' late-inning arsenal.",
        body: [
          "After the 2020 three-batter minimum rule changed the economic calculation of pure LOOGY specialization, the Dodgers adapted by developing left-handed relievers who could neutralize left-handed batters with dominant same-side breaking balls while remaining competent against right-handed hitters. Alex Vesia, a left-hander with a sharp slider and four-seam fastball, was developed specifically for this role: his slider broke away from left-handed batters at a 34-inch horizontal break — among the best same-side breaking balls in the National League.",
          "Vesia's usage in 2023 and 2024 reflected the modern platoon-aware bullpen: he entered in the middle of innings specifically to face left-handed batters in high-leverage spots, stayed in to face right-handed hitters with his fastball, and exited when the platoon balance shifted significantly. Dave Roberts managed him the same way a chess player manages a piece — not as a one-trick specialist but as a player with a dominant attribute who could still function in other roles. This flexibility, built on explicit platoon construction at Camelback Ranch each spring, was a hallmark of the Dodger analytical approach.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Platoon Mismatch", sub: "opposite-hand pitcher — batter has advantage", type: "attacker" },
          { label: "Identify Same-Side Option", sub: "does bullpen have a matchup pitcher?", type: "system" },
          { label: "Deploy Matchup Pitcher", sub: "three-batter minimum applies", type: "victim" },
          { label: "Platoon Advantage Realized", sub: "breaking ball away, batter fooled", type: "result" },
        ],
      },
      timeline: [
        { year: 1960, event: "Platoon usage formalized under Walter Alston — Dodgers among first to track L/R splits" },
        { year: 1989, event: "LOOGY role becomes mainstream — left-handed specialists carried on every MLB roster" },
        { year: 2000, event: "Bill James publishes platoon split data — OPS differences quantified for all of MLB" },
        { year: 2015, event: "Pat Venditte becomes first switch-pitcher in modern MLB — 2015 Oakland / multiple teams" },
        { year: 2020, event: "Three-batter minimum rule eliminates pure LOOGY role — rosters evolve", highlight: true },
        { year: 2023, event: "Vesia becomes Dodger primary L-on-L weapon — platoon-versatile construction model validated", highlight: true },
      ],
      keyTakeaways: [
        "Same-side platoon matchups produce 20–25 points of OPS disadvantage for batters — this is among the most reliable edges in baseball",
        "Same-side breaking balls break away from batters, compounding the visual disadvantage of a ball released from behind their field of view",
        "The 2020 three-batter minimum rule ended the pure LOOGY era — teams now build platoon-versatile relievers rather than specialists",
        "The Dodgers construct their bullpen around explicit platoon matchup plans, acquiring left-handed and right-handed relievers for specific lineup functions",
      ],
      references: [
        { title: "Baseball Reference: Platoon Split Statistics", url: "https://www.baseball-reference.com" },
        { title: "Fangraphs: L/R Split Analysis", url: "https://www.fangraphs.com" },
        { title: "MLB: Three-Batter Minimum Rule", url: "https://www.mlb.com/official-information/official-rules" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-7-07-q1",
          type: "Platoon Basics",
          challenge: `  You are a right-handed relief pitcher
  brought in to face the opposing team's
  cleanup hitter — a left-handed batter
  with a .280 average overall but a .240
  average against right-handed pitching.

  Your slider has a natural arm-side break
  that goes away from left-handed hitters.

  What platoon advantage are you exploiting?`,
          text: "How does a right-handed pitcher's slider create a structural platoon advantage against a left-handed batter?",
          options: [
            "There is no platoon advantage — sliders work equally against both left and right-handed batters",
            "The right-handed pitcher's slider breaks away from the left-handed batter toward the outer half, while the release comes from outside the left-hander's visual field — creating both a mechanical and visual disadvantage",
            "The platoon advantage only applies to fastballs, not breaking balls — sliders are neutral",
            "The advantage is reversed: left-handed batters hit sliders better because they can see the spin from their natural angle",
          ],
          correctIndex: 1,
          explanation: "Right-handed pitcher vs. left-handed batter is an opposite-side matchup — traditionally the batter's advantage — but the right-hander's slider breaks toward the outer half of the plate on a left-handed batter (away from them). This creates two compounding disadvantages: mechanically, the ball breaks away from where the left-hander wants to make contact (the inner half where they generate power); visually, the slider's release from the third-base side of the rubber means the left-hander picks up the pitch later. The left-hander's .240 average against right-handed pitching versus .280 overall reflects this structural disadvantage.",
        },
        {
          id: "baseball-7-07-q2",
          type: "LOOGY History",
          challenge: `  In 2018, a left-handed specialist is
  used in the 8th inning: he faces one
  left-handed batter, gets a strikeout,
  and leaves. The right-handed setup man
  handles the rest.

  In 2022, the same scenario is impossible
  under the current rules.

  What changed and how did teams adapt?`,
          text: "How did the 2020 three-batter minimum rule change the design of MLB bullpens?",
          options: [
            "Teams simply accepted the rule and stopped using platoon-based pitching strategies entirely",
            "Teams shifted from acquiring pure one-matchup specialists to developing left-handed and right-handed pitchers who could handle platoon matchups while remaining competent against opposite-hand batters",
            "The three-batter rule only applies in the regular season — playoff bullpen usage is unchanged",
            "Teams responded by using more right-handed pitchers exclusively, abandoning left-handers from high-leverage roles",
          ],
          correctIndex: 1,
          explanation: "The three-batter minimum rule eliminated the economic value of a pure LOOGY who could not face right-handed batters. Teams adapted by seeking and developing relievers who retained platoon advantages (a devastating same-side breaking ball) while being functional — not necessarily elite — against opposite-hand batters. This raised the talent bar for roster construction: every relief pitcher now needs to be a full reliever who happens to have a platoon specialty, not a one-matchup specialist who cannot face the other half of opposing lineups. The Dodgers' Vesia model — elite vs. left-handers, competent vs. right-handers — became the template.",
        },
        {
          id: "baseball-7-07-q3",
          type: "Switch-Pitcher",
          challenge: `  Pat Venditte is a switch-pitcher — he
  can throw with both arms. Under MLB
  rules, when a switch-hitter comes to
  the plate against Venditte, who decides
  which arm Venditte throws with?

  This situation created a rules crisis
  in 2015 — what was the resolution?`,
          text: "How did MLB resolve the chicken-and-egg problem created by a switch-pitcher facing a switch-hitter?",
          options: [
            "The pitcher decides first — he declares which arm he will use, and then the batter decides which side to hit from",
            "The batter declares their hitting side first, and the pitcher then selects which arm to throw with — this ensures the batter always faces a same-side pitcher, which was deemed the fairer rule",
            "The home plate umpire randomly assigns which arm Venditte must use to prevent strategic manipulation",
            "Switch-pitchers are not allowed to change arms once they enter a game under current rules",
          ],
          correctIndex: 1,
          explanation: "MLB ruled that the batter must declare their stance first when facing a switch-pitcher. This means every switch-hitter who bats against Venditte faces a same-side pitcher regardless of which side they choose — because once the batter declares left, Venditte throws left; if the batter declares right, Venditte throws right. This completely neutralizes the switch-hitter's primary advantage (always having a platoon edge). The rule was essentially forced by the Venditte situation, which revealed that the rulebook had no provision for this scenario. It was added to the Official Rules before his 2015 debut.",
        },
        {
          id: "baseball-7-07-q4",
          type: "Dodger Bullpen Construction",
          challenge: `  General Manager Andrew Friedman is
  constructing the Dodgers' 2024 bullpen.
  He has a left-handed pitcher (Vesia)
  who has a .180 avg against against
  left-handed batters and .265 against
  right-handed batters.

  He also has a right-handed pitcher
  (Phillips) who has a .215 avg against
  right-handed batters and .275 against
  left-handed batters.

  How does Friedman plan their deployment?`,
          text: "How do front offices like the Dodgers use individual platoon split data to construct deployment roles for each reliever?",
          options: [
            "Deploy Vesia against right-handed batters since his overall average allowed is lower",
            "Deploy Vesia to face left-handed batters (his dominant split) and Phillips to face right-handed batters (his dominant split), with both available for crossover situations where the advantage is smaller",
            "The platoon deployment is the manager's decision in game — the front office does not plan individual reliever matchups",
            "Use Vesia as the closer and Phillips as the setup man regardless of batter handedness — closer roles override platoon data",
          ],
          correctIndex: 1,
          explanation: "The Dodgers' approach to bullpen construction is explicit matchup design: Vesia's .180 vs. left-handed batters is one of the best same-side numbers in baseball — he is deployed specifically in left-handed-heavy situations. Phillips' .215 vs. right-handed batters is his primary matchup value. Friedman designs the bullpen so Roberts has the correct tool for every situation: a Vesia entry for left-handed-heavy innings, a Phillips entry for right-handed-heavy situations, with flexibility for crossover matchups where the splits converge. This is not accidental — it is the result of deliberate roster construction based on the platoon data that each pitcher's profile provides.",
        },
      ],
    },
  },

  // ─── baseball-7-08: Studying Hitters with Video and Data ─────────────────────
  {
    epochId: "baseball-7",
    wonder: {
      name: "Camelback Ranch — Video Room",
      location: "Glendale, Arizona",
      era: "Modern",
      emoji: "📊",
    },
    id: "baseball-7-08",
    order: 8,
    title: "Studying Hitters with Video and Data",
    subtitle: "Statcast tendencies, spray charts, exit velocity by zone, and Dodger game planning",
    category: "sports",
    xp: 90,
    badge: { id: "baseball-7-badge-08", name: "Data Pitcher", emoji: "💻" },
    challengeType: "quiz",
    info: {
      tagline: "The pitch that gets the out was thrown before the game — when the pitcher sat down with the video.",
      year: 2015,
      overview: [
        "Modern pitching preparation is a data-intensive process that begins 48–72 hours before a start. Dodger starting pitchers review Statcast tendency reports, spray charts, chase rate by zone, exit velocity by pitch type, and video of each opposing hitter's at-bats against pitchers with similar arsenals. The goal is to build a specific game plan before the first batter steps in the box — not a rigid plan that cannot adapt, but a structured approach that identifies each hitter's primary weaknesses and the pitches most likely to exploit them.",
        "Spray charts show where a batter tends to put the ball in play — a pull-heavy hitter's chart shows most hits to the left side (for a right-handed batter), while an opposite-field hitter shows the reverse. Pitchers use spray charts to understand contact tendencies: a pull-heavy hitter probably struggles with outer-half pitches; an opposite-field hitter may have trouble with inside fastballs. Exit velocity by zone shows which areas of the strike zone a hitter does the most damage in — and which zones produce weak contact. Pitching to weak contact zones is the logical extension.",
        "Chase rate by pitch type tells a pitcher how likely each hitter is to swing at a specific pitch out of the strike zone. A hitter with a 45% chase rate on curveballs below the zone will chase the curveball in the dirt — this is a free strike or a swing-and-miss opportunity. A hitter with an 8% chase rate on curveballs means the pitcher should use the curveball as a strike in the zone, not a waste pitch. This data translates directly into count-specific pitch selection.",
      ],
      technical: {
        title: "Building a Pitcher's Game Plan — Data to Decision",
        body: [
          "The Dodger starting pitcher's pre-game preparation follows a structured flow: (1) Identify each hitter's primary vulnerability from Statcast zone data — which zones produce the weakest exit velocity? (2) Cross-reference with chase rate data — are there pitches they will chase out of their weak zone? (3) Build count-specific attack plans — what pitch to throw in 0-0, 0-2, 3-2 counts against this specific hitter? (4) Review video of the hitter against pitchers with a similar arsenal — what sequences had success, what did the hitter time well?",
          "The video review step is critical because Statcast data shows outcomes (exit velocity, launch angle) but not process (how the hitter approached the at-bat, what pitches they tracked versus committed to). A pitcher who only reads data misses the behavioral signals that video provides: does this hitter take the first pitch routinely? Does he expand his zone on 0-2? Does he cheat on fastballs inside late in the count? Video answers questions that exit velocity cannot.",
        ],
        codeExample: {
          label: "Pre-Start Preparation Workflow — Dodger Model",
          code: `  48 HOURS BEFORE START:
  → Receive Statcast opponent report
  → Review spray charts: pull% by zone
  → Review exit velocity: hard hit zones
  → Review chase rate: by pitch type + zone

  24 HOURS BEFORE START:
  → Video review: 3 recent at-bats per hitter
  → Identify primary weakness + backup plan
  → Build count-specific sequences per hitter
  → Discuss with catcher (Will Smith 2023+)

  DAY OF START (Camelback → home):
  → Review game plan one final time
  → Identify top 3 "threat" batters
  → Confirm primary out-pitch per threat
  → Agree on audible signals if plan breaks

  EXAMPLE — RHH, pull-heavy, low chase curve:
  Weakness: outer-half, weak exit velocity
  Chase: slider outside, 38% chase rate
  Plan: fastball away (set up) → slider away
  → Counts 0-2/1-2: slider just off outer edge
  → 3-2: attack inner half if must throw strike`,
        },
      },
      incident: {
        title: "Clayton Kershaw Studies Aaron Judge Before 2017 NLCS",
        when: "Pre-2017 NLDS and NLCS — Kershaw preparation series",
        where: "Camelback Ranch and Dodger Stadium video rooms",
        impact: "Before every postseason start in his career, Clayton Kershaw famously spent extensive pre-game preparation identifying the opposing team's two or three most dangerous hitters and building specific game plans for each. His video preparation sessions with catcher Austin Barnes became a model for how Dodger pitchers approached postseason opponents systematically.",
        body: [
          "Kershaw's preparation process before high-stakes starts was described by multiple Dodger coaches and teammates as the most thorough of any pitcher on the roster. He would review video of opposing lineups not just against right-handed pitchers but specifically against pitchers whose fastball-curveball combination matched his own — looking for whether the opponent had adjusted to similar sequencing. If they had, he would intentionally vary his plan: more changeups, different curveball entry points, fastball locations he had not shown in the regular season.",
          "His use of Statcast data was equally specific. He reviewed exit velocity maps not to find hitters' best zones but their worst: where did the specific hitter produce the weakest contact? He then built his sequence to push the at-bat toward that zone by the second or third pitch, using the first pitch as a setup regardless of whether it generated an out. The Dodger video staff described him as the most data-literate pitcher on the roster — not because he was an analyst, but because he knew exactly what questions to ask of the data before every start.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Statcast Data Review", sub: "spray chart, exit velocity, chase rate", type: "system" },
          { label: "Video Analysis", sub: "behavioral patterns — approach, timing", type: "attacker" },
          { label: "Game Plan Built", sub: "sequence per hitter, count-specific", type: "victim" },
          { label: "Execute on the Mound", sub: "data-informed, adaptable", type: "result" },
        ],
      },
      timeline: [
        { year: 1966, event: "Koufax studies opposing lineups through scout reports — pre-data era equivalent" },
        { year: 1988, event: "Hershiser watches VHS tapes of opponents before every start — video era begins" },
        { year: 2003, event: "Dodgers install first video analysis lab at Vero Beach spring training" },
        { year: 2015, event: "Statcast deployed — exit velocity, launch angle, spin rate data available for game planning", highlight: true },
        { year: 2019, event: "Dodger pitchers begin receiving pre-start zone tendency reports from research staff" },
        { year: 2024, event: "Real-time Statcast tablets in dugout allow mid-game game plan adjustments", highlight: true },
      ],
      keyTakeaways: [
        "Pre-game data review (spray charts, exit velocity by zone, chase rate) is standard preparation for Dodger starting pitchers",
        "Video supplements data by revealing behavioral patterns — first-pitch tendencies, two-strike zone expansion, late-count cheating",
        "Build count-specific sequences for each hitter before the game: what to throw on 0-0, 0-2, and 3-2 against this specific batter",
        "Chase rate data identifies which pitches can be used as waste pitches vs. which must be thrown in the zone — critical for 0-2 strategy",
      ],
      references: [
        { title: "Baseball Savant: Pitcher vs. Hitter Matchup Data", url: "https://baseballsavant.mlb.com" },
        { title: "Fangraphs: Statcast Preparation Tools", url: "https://www.fangraphs.com" },
        { title: "MLB: Dodgers Pitching Intelligence Program", url: "https://www.mlb.com/dodgers" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-7-08-q1",
          type: "Spray Chart Usage",
          challenge: `  You review a spray chart for the opposing
  cleanup hitter before your start. The chart
  shows 80% of his batted balls going to the
  left side of the infield and left-center
  field — a classic pull-heavy hitter.

  What does this spray chart tell you about
  how to attack him?`,
          text: "How does a hitter's spray chart inform a pitcher's attack zones?",
          options: [
            "Pull-heavy hitters should be attacked with inside fastballs — their pull tendency means they want the ball inside",
            "A pull-heavy spray chart suggests the hitter struggles with outer-half pitches — he cannot put balls in play to the right side, indicating he cannot cover that zone effectively",
            "Spray charts are irrelevant to pitch selection — they only show defensive positioning data",
            "Attack all pull-heavy hitters with elevated fastballs — pull tendencies always indicate swing-up issues",
          ],
          correctIndex: 1,
          explanation: "A spray chart showing 80% pull-side contact tells you the hitter is not driving pitches to the opposite field consistently — his swing is producing pull-side contact on pitches that should go to the center or right side. This almost always means the hitter is having trouble covering the outer half: his pull tendency comes from pulling pitches that are middle-in, not from driving outside pitches to the pull side. Attack the outer half with your best pitch on the outer corner. If he could cover the outer half effectively, his spray chart would show more center-field and opposite-field contact.",
        },
        {
          id: "baseball-7-08-q2",
          type: "Exit Velocity by Zone",
          challenge: `  Statcast data shows a right-handed batter:
  - Inner-half pitches: avg exit velocity 95 mph
  - Middle-middle pitches: avg exit velocity 98 mph
  - Outer-half low pitches: avg exit velocity 74 mph

  You are pitching to him in a 2-2 count.
  What zone do you target?`,
          text: "How do exit velocity zone maps inform pitch location decisions in specific counts?",
          options: [
            "Middle-middle — it generates the best contact, which means the batter will be overconfident and make mistakes",
            "Outer-half low — the 74 mph average exit velocity in that zone means the hitter cannot drive those pitches; this is the attack zone regardless of count",
            "Inner-half — his 95 mph exit velocity shows he is a pull hitter, and pull hitters always want the ball inside",
            "The zone map is irrelevant at 2-2 — you must throw your best pitch regardless of location",
          ],
          correctIndex: 1,
          explanation: "A 74 mph average exit velocity in the outer-half low zone means the hitter consistently makes weak contact there — he cannot reach that zone with authority. In a 2-2 count where you need to get an out but still have a strike to work with, attacking his weakest zone (outer-half low) is the analytically correct decision. The 95 and 98 mph exit velocity zones tell you exactly where NOT to throw — those are the locations he damages the ball. Pitch to the 74 mph zone and let your defense work. This is how exit velocity data translates directly into pitch location decisions.",
        },
        {
          id: "baseball-7-08-q3",
          type: "Chase Rate Application",
          challenge: `  Your pre-game report shows a left-handed
  batter has a 42% chase rate on curveballs
  below the zone, but only a 9% chase rate
  on sliders off the outer edge.

  In a 0-2 count, your catcher calls for
  a slider off the outer edge as a waste pitch.
  You shake to the curveball in the dirt.

  Are you correct?`,
          text: "How do chase rate statistics by pitch type change waste-pitch selection on 0-2 counts?",
          options: [
            "The catcher is correct — sliders are generally better waste pitches than curveballs because of late movement",
            "You are correct — a 42% chase rate on the curveball below the zone means nearly half of these batters will swing; a 9% chase rate on the slider means it provides no swing opportunity and wastes the count advantage",
            "Neither pitch is correct for an 0-2 waste — always throw a fastball above the zone in that count",
            "Chase rate data is unreliable in 0-2 counts — batters protect more with two strikes regardless of pitch type",
          ],
          correctIndex: 1,
          explanation: "Chase rate data directly governs waste pitch selection: a 42% chase rate means the curveball below the zone generates a swing-and-miss almost half the time — this is not a waste pitch, it is an attack pitch. Use it. The 9% chase rate on the slider off the outer edge means nearly all batters take it — the slider provides essentially no opportunity to end the at-bat (just a ball called). Throwing the slider as a waste pitch on 0-2 is a 91% chance of nothing happening and advancing to 1-2; the curveball below the zone is a 42% chance of ending the at-bat immediately. Shake to the curveball.",
        },
        {
          id: "baseball-7-08-q4",
          type: "Video vs. Data",
          challenge: `  Statcast data shows a right-handed hitter
  has an exit velocity of 91 mph on pitches
  middle-in. Your data suggests you should
  avoid that zone.

  But video review shows that this hitter
  takes the first pitch almost 90% of the
  time — he has never swung at a first-pitch
  fastball middle-in all season.

  How should you integrate these two pieces
  of information?`,
          text: "How does behavioral video data change the application of Statcast exit velocity zone maps?",
          options: [
            "Ignore the video data — Statcast exit velocity is always more reliable than behavioral observations",
            "The behavioral data supersedes the zone data in this specific count (0-0): his tendency to take the first pitch means a first-pitch fastball middle-in is essentially free — he will not swing, giving you a 0-1 count advantage",
            "Throw the first pitch middle-in as a waste pitch — since he takes it, the location doesn't matter",
            "Never throw middle-in to any hitter regardless of behavioral data — the exit velocity data always wins",
          ],
          correctIndex: 1,
          explanation: "This is the most important integration lesson in modern pitching preparation: Statcast exit velocity data tells you what happens when a hitter makes contact; video behavioral data tells you when they swing. If a hitter never swings at first-pitch fastballs middle-in, the exit velocity data for that zone is irrelevant on 0-0 — he will not swing regardless. A first-pitch fastball middle-in is essentially free: you get a 0-1 count advantage because his behavioral pattern predicts a take. The 91 mph exit velocity only matters if he swings, and the video says he won't. This is exactly why Kershaw reviewed both data and video: neither tells the complete picture alone.",
        },
      ],
    },
  },

  // ─── baseball-7-09: Managing Fatigue ─────────────────────────────────────────
  {
    epochId: "baseball-7",
    wonder: {
      name: "Camelback Ranch — Training Facility",
      location: "Glendale, Arizona",
      era: "Modern",
      emoji: "💪",
    },
    id: "baseball-7-09",
    order: 9,
    title: "Managing Fatigue and Knowing When You're Done",
    subtitle: "Velocity drops, mechanics breakdown, and Tommy John prevention",
    category: "sports",
    xp: 95,
    badge: { id: "baseball-7-badge-09", name: "Iron Arm", emoji: "🦾" },
    challengeType: "quiz",
    info: {
      tagline: "The pitcher who knows when they are done saves their career. The one who doesn't becomes a surgery statistic.",
      year: 2000,
      overview: [
        "Pitching fatigue is one of the most misunderstood concepts in baseball. A tired pitcher does not simply throw slower — they compensate. When velocity drops, pitchers unconsciously change their mechanics to maintain effort: elbow drops, arm drag increases, hip rotation timing shifts. These compensation patterns place abnormal stress on the ulnar collateral ligament (UCL) — the structure that is repaired in Tommy John surgery. A pitcher who stays in too long is not just less effective; they are risking their career.",
        "The early warning signs of fatigue that Dodger pitching coaches track in real time are: velocity decline of 2 mph or more from the starter's average over the first three innings; increased pitch location deviation (pitches missing their targets by greater margins than earlier in the game); reduced spin rate on breaking balls (curveball breaks shorter, slider has less cut); and mechanical tells like elbow position on follow-through or hip rotation timing. Modern Statcast data allows pitching coaches to track all of these metrics pitch-by-pitch.",
        "Tommy John surgery (UCL reconstruction) requires 12–18 months of recovery. Among pitchers who undergo TJ surgery, approximately 20% never return to their pre-surgery performance level. Prevention is overwhelmingly preferable: pitch count management, mechanical efficiency, strengthening programs, and aggressive rest protocols at the first signs of fatigue are the standard Dodger approach. The team has invested heavily in biomechanical analysis at Camelback Ranch to identify early fatigue signals before they become injuries.",
      ],
      technical: {
        title: "Fatigue Indicators — What Coaches and Data Track",
        body: [
          "Modern pitching staff coaches track a layered set of fatigue indicators: (1) Velocity trend — is the pitcher below their average from the first two innings? A 2-mph decline is a yellow flag; 3+ mph is a red flag. (2) Command deviation — are pitches consistently missing their targets by larger margins? Middle-of-the-plate misses on pitches meant for the corner suggest mechanical breakdown. (3) Spin rate degradation — tired breaking balls spin slower and have less break. (4) Arm action — does the pitcher's arm path on video look different from earlier in the game?",
          "The most important mechanical compensation fatigue pitchers exhibit is arm drag: the arm falls behind the body's rotation because the shoulder and rotator cuff are fatigued, causing the arm to drag through the delivery rather than leading it. Arm drag dramatically increases UCL stress because the ligament absorbs the force that the shoulder should be generating. Identifying arm drag in real-time is the single most important pitching coach intervention for injury prevention.",
        ],
        codeExample: {
          label: "Fatigue Red Flags — Real-Time Monitoring",
          code: `  VELOCITY TRACKING:
  Yellow flag: -2 mph from game avg (inn. 1-2)
  Red flag:    -3 mph or consistent decline
  Action:      Warm up reliever; prepare exit

  COMMAND DEVIATION:
  Yellow: Pitches missing target by >6 inches
  Red: Multiple consecutive location misses
  Action: Pitching coach visit — assess arm

  SPIN RATE (Statcast):
  Curveball spin drop >100 rpm = fatigue
  Slider cut reduction = fatigue or mechanics
  Action: Track next inning; exit if no recovery

  MECHANICAL TELLS:
  Arm drag: elbow trails body rotation
  Elbow drop: arm angle drops mid-delivery
  Hip stall: hips stop rotating, arm continues
  → Any = immediate mound visit

  TJ PREVENTION:
  → Pitch count limits respected (≤100 in-season)
  → Minimum 4 days rest between starts
  → Biomechanical analysis at Camelback
  → Arm strength program year-round
  → Immediate rest at any UCL discomfort sign`,
        },
      },
      incident: {
        title: "Walker Buehler's Tommy John Surgeries — 2019 and 2022",
        when: "2019 (UCL reinforcement) and 2022 (full TJ surgery)",
        where: "Camelback Ranch and Dodger Stadium",
        impact: "Walker Buehler underwent two Tommy John-related procedures — a 2019 UCL brace surgery that allowed him to continue pitching, and a full UCL reconstruction in 2022 that cost him the entire 2022 and 2023 seasons. His cases represent how early intervention (2019) can extend a career, but also how the cumulative stress of high-velocity pitching eventually overcomes preventive measures.",
        body: [
          "Buehler's 2019 procedure was a UCL brace — a less invasive intervention that reinforced the ligament without full reconstruction. Dodger medical staff made the call based on MRI results showing partial UCL damage that had not yet reached the threshold requiring full reconstruction. They were aggressive in managing his workload in 2019 and 2020, keeping him under 80 pitches in many starts. When Buehler was fully healthy in 2021, he posted a 2.47 ERA across 33 starts — justifying the conservative management.",
          "His 2022 UCL rupture came in the regular season and required full Tommy John reconstruction. The Dodgers' medical team and front office made the decision to shut him down for the full 2022–2023 period rather than rush the recovery. Buehler returned in 2024, initially struggling with command as he rebuilt arm strength. His story illustrates both the importance of proactive fatigue management and the reality that even the best preventive programs cannot entirely eliminate UCL risk for high-velocity power pitchers who throw at the extreme end of physical capability.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Early Fatigue Signs", sub: "velocity drop, command deviation", type: "attacker" },
          { label: "Real-Time Monitoring", sub: "Statcast + pitching coach observation", type: "system" },
          { label: "Intervention Decision", sub: "mound visit or pull from game", type: "victim" },
          { label: "TJ Prevention / Career Preservation", sub: "rest now, pitch more later", type: "result" },
        ],
      },
      timeline: [
        { year: 1974, event: "Tommy John undergoes first UCL reconstruction — procedure named after him, performed by Dr. Frank Jobe" },
        { year: 1988, event: "Hershiser's record-breaking season — careful pitch count management by Lasorda cited as a factor" },
        { year: 2000, event: "TJ surgery becomes mainstream — Dodger medical staff builds comprehensive arm care protocol" },
        { year: 2015, event: "Statcast enables real-time velocity and spin rate monitoring for fatigue tracking", highlight: true },
        { year: 2019, event: "Buehler's UCL brace surgery — early intervention model validated by 2021 performance" },
        { year: 2022, event: "Buehler's full TJ — cumulative high-velocity stress overcomes prevention protocols", highlight: true },
      ],
      keyTakeaways: [
        "Velocity decline of 2+ mph from a starter's game average is a yellow flag for fatigue — 3+ mph is a red flag warranting removal consideration",
        "Arm drag (arm trails body rotation) is the most dangerous mechanical fatigue compensation because it dramatically increases UCL stress",
        "Tommy John recovery takes 12–18 months and ~20% of pitchers never return to pre-surgery performance — prevention is overwhelmingly preferable",
        "Spin rate degradation on breaking balls is a Statcast-detectable indicator of real-time pitching fatigue that precedes command breakdown",
      ],
      references: [
        { title: "Baseball Reference: Walker Buehler Career and Injury History", url: "https://www.baseball-reference.com" },
        { title: "MLB: Tommy John Surgery Statistics", url: "https://www.mlb.com/video" },
        { title: "Baseball Savant: Real-Time Velocity Tracking", url: "https://baseballsavant.mlb.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-7-09-q1",
          type: "Velocity Decline",
          challenge: `  In innings 1 and 2, your pitcher averaged
  93.5 mph on his four-seam fastball.
  In inning 5, Statcast shows 90.8 mph —
  a 2.7 mph decline.

  He has allowed no runs. His location
  looks fine to the naked eye.

  What should the pitching coach do?`,
          text: "Why does a velocity decline of 2+ mph warrant attention even when results look fine on the scoreboard?",
          options: [
            "Nothing — velocity naturally varies across a start and 2.7 mph is within normal range",
            "Visit the mound and assess: velocity decline of 2.7 mph indicates fatigue that is not yet visible in results — it predicts upcoming command breakdown and injury risk before outcomes deteriorate",
            "Pull the pitcher immediately — a 2.7 mph decline always means Tommy John risk",
            "Let him finish the inning and see if velocity recovers — outcomes are the only reliable indicator",
          ],
          correctIndex: 1,
          explanation: "Velocity decline precedes command breakdown and mechanical compensation — it is an early warning signal, not a lagging indicator. A 2.7 mph decline by inning 5 means the pitcher is already compensating with altered mechanics to maintain effort. These compensations (arm drag, elbow drop, hip stall) are not yet showing in results, but they are increasing UCL stress and typically precede location problems within 1–2 innings. A pitching coach visit at this signal — before results deteriorate — is the difference between catching a problem early (and managing to a successful sixth inning) or missing the signal until the seventh inning implosion.",
        },
        {
          id: "baseball-7-09-q2",
          type: "Arm Drag",
          challenge: `  A pitching coach reviews video of a starter
  in the 6th inning. In the first inning,
  the pitcher's throwing arm was in front
  of his body rotation at release — ideal
  mechanics. In the 6th inning, the arm
  appears to trail behind the hips during
  the delivery.

  The pitcher's velocity is 91 mph — only
  1 mph below his game average.

  What is the concern?`,
          text: "Why is arm drag a more serious fatigue indicator than velocity decline alone?",
          options: [
            "Arm drag is only a concern if velocity has declined more than 2 mph — with only 1 mph decline, the mechanics are acceptable",
            "Arm drag indicates that the shoulder and rotator cuff are fatigued and the arm is no longer leading the delivery — this pattern dramatically increases UCL stress regardless of current velocity",
            "Arm drag is a natural variation in pitching mechanics and only becomes dangerous if spin rate also declines",
            "The velocity reading is wrong — arm drag always causes at least 3 mph velocity decline",
          ],
          correctIndex: 1,
          explanation: "Arm drag is more immediately dangerous than velocity decline because it directly implicates UCL stress mechanics. When the arm drags behind the body's rotation, the elbow is forced into an extreme valgus position (the forearm being pushed away from the body) at release — this is the exact mechanism of UCL injury. The fact that velocity is only 1 mph below average means the pitcher is compensating for arm fatigue by changing mechanics rather than slowing down — often the most dangerous scenario. The velocity reads normal; the mechanics are creating injury-level stress. The pitching coach who catches arm drag early protects the pitcher's UCL regardless of the radar gun reading.",
        },
        {
          id: "baseball-7-09-q3",
          type: "TJ Prevention",
          challenge: `  A 17-year-old pitcher has been pitching
  for three travel ball teams simultaneously
  — approximately 200 innings pitched this
  calendar year. He throws 88 mph with a
  developing curveball.

  His pitching coach warns him: "You are
  at serious Tommy John risk."

  What specific factors make this warning
  credible?`,
          text: "What combination of risk factors makes a high-workload youth pitcher at elevated Tommy John risk?",
          options: [
            "Velocity and curveball usage are the only TJ risk factors — workload management has no proven relationship to UCL injury",
            "High annual innings (200 is well above recommended youth limits), pitching for multiple teams simultaneously without adequate rest, and a developing curveball all combine to create cumulative UCL stress that youth ligaments cannot withstand",
            "The risk is overstated — Tommy John surgery is only dangerous for professional pitchers, not youth players",
            "The curveball is the only concern — innings pitched have no bearing on UCL stress",
          ],
          correctIndex: 1,
          explanation: "Youth pitcher overuse is the leading cause of Tommy John surgery in players under 18. Three compounding factors are present: (1) Annual innings far above youth baseball guidelines (which recommend ≤100 innings per year for most high school pitchers); (2) Multiple team contexts without adequate rest between outings — the UCL does not recover between teams' schedules; (3) Developing curveball mechanics, which — when thrown with immature arm strength — can create high UCL stress if the grip and release are not mechanically sound. The UCL of a 17-year-old has not fully matured, making it more vulnerable to the cumulative stress of overuse than an adult ligament.",
        },
        {
          id: "baseball-7-09-q4",
          type: "Buehler Recovery",
          challenge: `  Walker Buehler returns from Tommy John
  surgery in 2024. His first few starts
  show lower velocity (89–90 mph vs. pre-TJ
  93–95 mph) and more command issues.

  Some analysts want the Dodgers to shut
  him down again. The Dodgers let him
  continue pitching.

  What is the likely reasoning behind the
  Dodgers' decision to continue his ramp-up
  despite early struggles?`,
          text: "How do teams balance post-TJ recovery ramp-up against short-term performance concerns?",
          options: [
            "The Dodgers made an error — post-TJ pitchers should be shut down immediately at the first sign of reduced velocity",
            "Post-TJ recovery requires accumulated arm load to rebuild UCL strength and mechanics — short-term velocity and command decline is expected and does not indicate re-injury risk; the Dodgers are following the established recovery protocol",
            "Velocity cannot be regained after TJ surgery — the Dodgers are accepting a permanently diminished pitcher",
            "The decision was financial — the Dodgers needed Buehler in the rotation regardless of his health status",
          ],
          correctIndex: 1,
          explanation: "Post-Tommy John recovery is a progressive loading process. The UCL reconstruction graft (typically a tendon from elsewhere in the arm or leg) must remodel into a functional ligament through progressive stress — this takes 12–18 months and requires actual pitching load to complete the remodeling process. During this phase, velocity and command are typically below peak because arm strength has not fully rebuilt. The Dodgers' decision to continue Buehler's ramp-up despite early struggles reflects adherence to the established TJ recovery protocol: early-phase velocity and command limitations are expected and do not indicate re-injury; shutting down prematurely would reset the remodeling process.",
        },
      ],
    },
  },

  // ─── baseball-7-10: Greatest Dodger Pitchers ─────────────────────────────────
  {
    epochId: "baseball-7",
    wonder: {
      name: "Dodger Stadium — Hall of Fame Plaques at the Ravine",
      location: "Los Angeles, California — Chavez Ravine",
      era: "Historic",
      emoji: "🏆",
    },
    id: "baseball-7-10",
    order: 10,
    title: "The Greatest Dodger Pitchers — Strategic Breakdowns",
    subtitle: "Koufax, Drysdale, Valenzuela, Hershiser, and Kershaw",
    category: "sports",
    xp: 100,
    badge: { id: "baseball-7-badge-10", name: "Dodger Legend", emoji: "💙" },
    challengeType: "quiz",
    info: {
      tagline: "Five pitchers. Five different strategies. One franchise. The greatest pitching tradition in baseball history.",
      year: 1963,
      overview: [
        "The Los Angeles Dodgers have produced the most concentrated run of elite starting pitchers in baseball history. Sandy Koufax (1955–1966) dominated through elegant simplicity: two pitches, mechanically perfect, thrown with elite velocity and movement. Don Drysdale (1956–1969) combined power with psychological intimidation, establishing the inner half as his property and daring hitters to challenge it. Fernando Valenzuela (1980–1990) brought the screwball — a pitch that broke in the opposite direction of a conventional curveball — to mainstream baseball consciousness, combining it with a unique delivery that disrupted hitter timing.",
        "Orel Hershiser (1983–2000, primarily 1983–1994 with Los Angeles) built his Hall-of-Fame career on the same mound Koufax and Drysdale had owned, but with a fundamentally different approach: below-average velocity, elite sequencing, and a sinker-slider combination that generated groundballs instead of strikeouts. His 1988 season — 23 wins, Cy Young Award, World Series MVP, and 59 consecutive scoreless innings — is the most complete pitching campaign in Dodger history. Clayton Kershaw (2008–present) represents the synthesis of everything that came before: power from Koufax, sequencing intellect from Hershiser, competitiveness from Drysdale, all combined in a left-handed package that made him the best pitcher of his era.",
        "Each of these five Dodger legends teaches a different strategic lesson: Koufax teaches simplicity and dominance through execution; Drysdale teaches ownership of the inner half and psychological control; Valenzuela teaches that unconventional pitches create unconventional problems for hitters; Hershiser teaches that sequencing and intelligence outlast velocity; and Kershaw teaches that the synthesis of all approaches, applied through decades of relentless work, is what produces the greatest career.",
      ],
      technical: {
        title: "Five Approaches — Five Strategies Compared",
        body: [
          "Sandy Koufax's final four seasons (1963–1966) produced 97 wins, four no-hitters, three Cy Young Awards, and a 1966 ERA of 1.73. His approach was binary: fastball or curveball. The fastball averaged 97–100 mph by modern estimates; the curveball dropped 58+ inches and was called 'the best pitch in baseball history' by multiple Hall of Famers who faced it. His strategy was sequencing simplicity itself: use the fastball to establish the count, use the curveball to end the at-bat. Hitters knew exactly what was coming — they still could not hit it.",
          "Kershaw's career arc mirrors Hershiser's more than Koufax's in one important way: he has adapted as his stuff changed. Early Kershaw (2008–2013) relied on a fastball that averaged 93–95 mph and a devastating curveball. As velocity declined in his late 20s and 30s, Kershaw added a slider, changed curveball shapes, and became a sequencing master — relying more on movement, location, and intelligence to compensate for reduced pure stuff. This adaptation — recalibrating your strategy around what you have now, not what you had five years ago — is the defining characteristic of a great pitching career.",
        ],
        codeExample: {
          label: "Five Dodger Legends — Strategic Profiles",
          code: `  SANDY KOUFAX (1955–1966):
  Velocity: ~97–100 mph (estimated)
  Pitches:  Fastball + Curveball (only)
  Strategy: Simplicity + dominance — no 3rd pitch
  Record:   4 no-hitters, 382 K in 1965
  Lesson:   Two elite pitches beat four average ones

  DON DRYSDALE (1956–1969):
  Velocity: 92–95 mph
  Pitches:  Fastball inside + sidearm slider
  Strategy: Own the inner half; intimidate
  Record:   58 consecutive scoreless inn. (1968)
  Lesson:   Fear the inner half = outer half opens

  FERNANDO VALENZUELA (1980–1990):
  Velocity: 84–87 mph
  Pitches:  Screwball + fastball
  Strategy: Unconventional movement beats timing
  Record:   1981 Cy Young + Rookie of Year
  Lesson:   Movement disrupts more than velocity

  OREL HERSHISER (1983–2000):
  Velocity: 83–87 mph
  Pitches:  Sinker + slider + curveball + change
  Strategy: Sequence mastery + groundball approach
  Record:   59 scoreless inn., 1988 WS MVP
  Lesson:   Intelligence outlasts physical tools

  CLAYTON KERSHAW (2008–present):
  Velocity: 88–94 mph (age-declining)
  Pitches:  Fastball + Curveball + Slider + Change
  Strategy: Sequencing evolution — adapts yearly
  Record:   3 Cy Youngs, 1 MVP, 2020 WS Champ
  Lesson:   Adaptation over career = greatest legacy`,
        },
      },
      incident: {
        title: "Koufax's Final Season — 1966 Retirement at the Peak",
        when: "1966 World Series loss, November 1966 — Koufax announces retirement",
        where: "Dodger Stadium and Chavez Ravine",
        impact: "Sandy Koufax retired after the 1966 season at age 30 — after posting a 1.73 ERA, 27 wins, and 317 strikeouts. He retired not because his performance declined but because his arthritic elbow would require him to pitch in constant pain and likely lead to permanent joint damage. His retirement at the peak of his career — choosing health over continued dominance — is one of baseball's most poignant strategic decisions.",
        body: [
          "Koufax's 1966 season was among the best in baseball history. He finished with a 27-9 record, 1.73 ERA, and 317 strikeouts in 323 innings. But he was pitching in severe pain — his arthritic left elbow required cortisone injections before starts, and doctors warned that continuing would risk permanent nerve and joint damage. On November 18, 1966, at age 30, Koufax announced his retirement at a press conference in Los Angeles.",
          "The decision was entirely consistent with his career philosophy: clarity and decisiveness over sentiment. Koufax did not try to grind through seasons of diminishing performance — he stopped at the point of maximum excellence, protecting both his legacy and his health. The Dodgers did not win another World Series for 20 years after his retirement. Among the five great Dodger pitchers, Koufax's retirement stands as the most strategic act of his career: knowing when you are at your best, and choosing to preserve it rather than erode it. Every player and coach in baseball history who has struggled with when to stop has been measured against the clarity of Koufax's decision.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Koufax — Two-Pitch Mastery", sub: "simplicity at 97+ mph dominates any era", type: "system" },
          { label: "Drysdale + Valenzuela — Unconventional Weapons", sub: "inside power and screwball disruption", type: "attacker" },
          { label: "Hershiser — Sequence Intelligence", sub: "59 scoreless innings on below-average velo", type: "victim" },
          { label: "Kershaw — Career Synthesis", sub: "three Cy Youngs; adapts as tools change", type: "result" },
        ],
      },
      timeline: [
        { year: 1963, event: "Koufax posts 1.88 ERA with 306 Ks — first of three consecutive Cy Young seasons", highlight: true },
        { year: 1965, event: "Koufax perfect game vs. Cubs — 14 Ks, September 9, Dodger Stadium" },
        { year: 1966, event: "Koufax retires at 30 with 1.73 ERA — greatest early retirement in baseball history" },
        { year: 1968, event: "Drysdale's 58 consecutive scoreless innings — inner-half dominance record" },
        { year: 1981, event: "Fernandomania — Valenzuela wins Cy Young + ROY in the same season" },
        { year: 1988, event: "Hershiser's 59 scoreless innings breaks Drysdale's record — WS MVP follows", highlight: true },
        { year: 2014, event: "Kershaw wins Cy Young + MVP — best season of his career" },
        { year: 2020, event: "Kershaw wins World Series — 32-year Dodger championship drought ends", highlight: true },
      ],
      keyTakeaways: [
        "Koufax proves two elite pitches beat four average ones — master your best weapons before expanding your arsenal",
        "Drysdale's inner-half dominance teaches that owning one zone opens up the entire plate — ownership creates fear that creates space",
        "Hershiser's 59 scoreless innings at below-average velocity proves sequencing intelligence outlasts physical tools across a career",
        "Kershaw's career-long adaptation — adding pitches and changing approaches as velocity declined — is the model for pitching longevity",
      ],
      references: [
        { title: "Baseball Reference: Sandy Koufax Career", url: "https://www.baseball-reference.com" },
        { title: "Baseball Hall of Fame: Dodger Pitchers", url: "https://baseballhall.org" },
        { title: "MLB: Los Angeles Dodgers Pitching History", url: "https://www.mlb.com/dodgers/history" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-7-10-q1",
          type: "Koufax Strategy",
          challenge: `  Sandy Koufax threw only two pitches —
  a fastball and a curveball. Every hitter
  he faced knew those were the only two
  options.

  Despite this, he struck out 382 batters
  in 1965 and posted a career ERA of 2.76.

  How does a pitcher dominate with a known
  and limited arsenal?`,
          text: "What does Koufax's career teach about the relationship between arsenal size and pitching effectiveness?",
          options: [
            "Koufax succeeded despite his two-pitch limitation — more pitches would have made him even better",
            "Two pitches thrown at elite quality from a single, deceptive tunnel produce more uncertainty for batters than four average pitches — mastery of fewer options outperforms mediocrity of more",
            "Koufax only succeeded because he pitched in the 1960s, when batters were less sophisticated — his approach would fail in modern baseball",
            "The key was his velocity — 97+ mph automatically negates any sequencing disadvantage of a two-pitch arsenal",
          ],
          correctIndex: 1,
          explanation: "Koufax's two-pitch dominance disproves the premise that more options create more uncertainty for hitters. When your two pitches are both elite — the fastball at 97+ mph with late rise, the curveball with 58 inches of drop — and both emerge from the same tunnel looking identical at release, the batter faces a binary decision with no good answer: sit on fastball and get fooled by the curve, or sit on curve and get blown away by the fastball. Adding a mediocre third pitch would have given hitters an option to look for and would have diluted his mechanical focus. Koufax teaches that depth of mastery beats breadth of options every time.",
        },
        {
          id: "baseball-7-10-q2",
          type: "Drysdale's Inner Half",
          challenge: `  Don Drysdale led the league in hit batters
  multiple times. He intentionally threw
  high-and-tight fastballs regularly —
  and was never shy about it.

  His ERA was 2.95 over his career.

  How does owning the inner half with
  genuine willingness to pitch inside
  affect a pitcher's effectiveness on
  the outer half?`,
          text: "How does Drysdale's inner-half aggression explain why he was so effective throwing away from batters?",
          options: [
            "It doesn't — pitching inside and pitching outside are independent; inside pitches have no effect on batter response to outer-half pitches",
            "When batters genuinely fear an inside pitch — because the pitcher has proven willingness to go there — they protect inside, which opens the outer half entirely: they cannot cover both zones simultaneously",
            "Drysdale was effective outside despite his inside pitching, not because of it — his slider was independently dominant",
            "Inside pitching only works as a psychological weapon against weak-minded batters — elite hitters ignore brush-back pitches",
          ],
          correctIndex: 1,
          explanation: "Drysdale's inner-half philosophy is a masterclass in creating fear that opens space. When a pitcher has genuinely hit batters, knocked them down, and established the credibility of the inside fastball as a real weapon, batters cannot crowd the plate or dive out to cover the outside corner — they must protect inside. This protective posture (hands tight, weight back-inside) is exactly the defensive position that makes outer-half breaking balls and fastballs away completely undefendable. Drysdale's ERA of 2.95 was in large part built on outer-half pitches that worked because his inside pitch had already been established as a physical reality, not a bluff.",
        },
        {
          id: "baseball-7-10-q3",
          type: "Fernando's Screwball",
          challenge: `  Fernando Valenzuela's primary out pitch was
  the screwball — a pitch that breaks in the
  opposite direction of a curveball:
  away from left-handed batters (for a
  left-handed pitcher), rather than
  away from right-handed batters.

  In 1981, he went 13-7 with a 2.48 ERA
  and struck out 180 batters.

  Why does an unconventional pitch movement
  pattern create strategic difficulty for
  hitters beyond raw pitch quality?`,
          text: "What strategic advantage does an unconventional pitch like the screwball provide beyond its movement quality alone?",
          options: [
            "Unconventional pitches have no strategic advantage — only velocity and location matter",
            "The screwball's reverse break (opposite of conventional curveball expectations) violates the pattern recognition hitters have built against conventional pitch movement — their body memory is calibrated wrong for this pitch",
            "The screwball helps only against left-handed batters — it has no effect on right-handers who have seen Fernando's pattern",
            "Valenzuela succeeded because of his velocity, not his screwball — the unconventional pitch was secondary",
          ],
          correctIndex: 1,
          explanation: "Pattern recognition is the foundation of pitch identification — hitters build internal models of how pitches behave based on thousands of at-bats. Left-handed pitchers' curveballs break away from right-handed batters; every right-hander has seen this dozens of times. The screwball breaks the opposite way — into right-handed batters rather than away — violating the deeply trained body memory they have developed. Hitters' swing adjustments and timing mechanisms are calibrated for conventional movement patterns; the screwball exploits the gap between their expectations and reality. This pattern-violation advantage is why Valenzuela — with below-average velocity — could dominate major league lineups: the screwball was an unknown quantity that hitters' experience had not prepared them for.",
        },
        {
          id: "baseball-7-10-q4",
          type: "Kershaw's Adaptation",
          challenge: `  In 2013, Kershaw's fastball averaged 93 mph
  and his strikeout rate was 9.9 per 9 innings.
  In 2022, his fastball averaged 89 mph
  but his ERA was still 2.28 and he struck
  out 8.0 per 9 innings.

  He added a slider and changed his curveball
  grip in the years between.

  What pitching principle does Kershaw's
  ability to maintain effectiveness despite
  declining velocity demonstrate?`,
          text: "What does Kershaw's sustained excellence across his career teach about pitching at the highest level?",
          options: [
            "Kershaw was lucky — ERA is too variable to show real skill; his velocity decline should have ended his effectiveness",
            "Sequencing, movement quality, and adaptation can compensate for velocity decline — a pitcher who evolves his approach as his tools change remains elite even as pure stuff diminishes",
            "Strikeout rate is the only real measure of effectiveness — his declining K rate proves his effectiveness also declined",
            "Kershaw's sustained ERA is entirely a product of Dodger defense — his individual performance declined alongside his velocity",
          ],
          correctIndex: 1,
          explanation: "Kershaw's 2022 season with a 2.28 ERA at 89 mph fastball average represents one of the most remarkable adaptations in modern pitching. He compensated for reduced velocity by developing one of the best sliders in baseball (which he barely threw before 2017), changing his curveball grip to produce more horizontal movement, and becoming an even more refined sequencer — using location and pitch timing more precisely because he could no longer blow pitches past hitters. This adaptation arc — the willingness to change approach as physical tools change — is the defining characteristic of great pitching careers. Koufax never had to adapt; Kershaw has had to reinvent himself multiple times. Both are great for different reasons.",
        },
      ],
    },
  },
];
