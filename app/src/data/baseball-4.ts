import type { StageConfig, EpochConfig } from "./types";

export const baseball4Epoch: EpochConfig = {
  id: "baseball-4",
  name: "Elite Mastery",
  subtitle: "Hitting Like a Pro",
  description:
    "You have learned the mechanics, studied the pitches, and built a practice routine. Now comes the hardest part: playing like a professional. This epoch is for hitters who want to think at the highest level — using Statcast analytics, pre-at-bat scouting, mental preparation, clutch execution, platoon strategy, cutting-edge technology, and a lifetime of development philosophy. From Dodger Stadium to Cooperstown, from the on-deck circle to the broadcast booth, this is hitting at its most complete.",
  emoji: "🏆",
  color: "amber",
  unlocked: true,
};

export const baseball4Stages: StageConfig[] = [
  // ─── baseball-4-01: Statcast and the Data Revolution ─────────────────────────
  {
    epochId: "baseball-4",
    wonder: {
      name: "Dodger Stadium — Statcast Tower",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "📡",
    },
    id: "baseball-4-01",
    order: 1,
    title: "Statcast and the Data Revolution",
    subtitle: "wOBA, xBA, xSLG, barrel%, hard-hit%, and how the Dodgers build lineups",
    category: "sports",
    xp: 90,
    badge: { id: "baseball-4-badge-01", name: "Data Hitter", emoji: "📊" },
    challengeType: "quiz",
    info: {
      tagline: "Statcast turned every batted ball into a data point — and the Dodgers turned those data points into championships.",
      year: 2015,
      overview: [
        "When MLB deployed Statcast tracking in all 30 ballparks in 2015, the game changed forever. For the first time, every batted ball could be measured with precision: exit velocity, launch angle, sprint speed, spin rate, arm strength, and dozens of other variables. The data produced new statistics that better predicted future performance than traditional metrics — expected batting average (xBA), expected slugging (xSLG), weighted on-base average (wOBA), barrel percentage, and hard-hit rate.",
        "wOBA (weighted on-base average) assigns different values to different offensive outcomes based on their actual run-scoring impact. A walk is worth less than a single, which is worth less than a double, which is worth less than a home run — and wOBA calculates a single weighted number that captures all of it. An elite wOBA is .400+; league average is typically around .320. Unlike batting average, wOBA accounts for both on-base ability and power, making it one of the most comprehensive single-number hitting metrics.",
        "Barrel percentage measures the rate at which a hitter produces what Statcast defines as the optimal combination of exit velocity and launch angle: 98+ mph exit velocity with a launch angle between 26 and 30 degrees, scaling to lower launch angles at higher velocities. Barrel-hit balls have a .700+ batting average and 2.000+ slugging percentage — essentially automatic extra-base hits. Elite barrels rates are 15%+; league average is around 7–8%. Hard-hit rate (95+ mph exit velocity) tells you how frequently a hitter makes genuinely hard contact regardless of launch angle.",
      ],
      technical: {
        title: "How the Dodgers Use Statcast to Build Their Lineup",
        body: [
          "The Los Angeles Dodgers under president of baseball operations Andrew Friedman and manager Dave Roberts have been among the most aggressive adopters of Statcast analytics for lineup construction. Rather than relying on traditional statistics like batting average and RBI — which are influenced by team context — the Dodgers evaluate hitters using xBA, xSLG, wOBA, barrel rate, and hard-hit rate to identify true offensive talent and platform predictive models for future performance.",
          "One specific application: the Dodgers use sprint speed and exit velocity data to identify whether a hitter's batting average is being suppressed by bad luck (high xBA but low BA) or genuinely reflects weak contact. A hitter with .260 BA but .320 xBA is likely to improve; a hitter with .300 BA but .240 xBA may be due to regress. This allows the front office to acquire undervalued players and avoid overpaying for performance driven by unsustainable contact luck.",
        ],
        codeExample: {
          label: "Key Statcast Metrics — What They Mean",
          code: `  wOBA (Weighted On-Base Average):
  Elite: ≥ .400    Good: .340–.399
  Avg:   ~.320     Below avg: < .300
  → Best single-number hitting value metric

  xBA (Expected Batting Average):
  → Based on exit velocity + launch angle
  → Ignores luck / defense positioning
  → xBA >> BA = hitter is unlucky / improve

  xSLG (Expected Slugging %):
  → Same principle — power based on contact quality
  → xSLG >> SLG = power suppressed by bad luck

  Barrel%:
  → 98+ mph EV at 26–30° LA (scaling)
  → Elite: ≥ 15%    Average: 7–8%
  → .700+ BA on barrels — automatic hit

  Hard-Hit% (≥ 95 mph EV):
  → Elite: ≥ 50%    Average: 35–40%
  → Measures raw contact quality vs. outcomes

  Sprint Speed (ft/sec):
  → Elite: ≥ 30 ft/s    Average: 27 ft/s
  → Affects defensive positioning shifts
  → Infield hit rate strongly correlated`,
        },
      },
      incident: {
        title: "The Dodgers Acquire Freddie Freeman — Statcast Validation",
        when: "November 2021 — Freddie Freeman signs with the Dodgers",
        where: "Dodger Stadium, Los Angeles, California",
        impact: "When the Dodgers signed Freddie Freeman to a 6-year, $162 million deal in November 2021, their analytics team had modeled his Statcast profile extensively. His elite xBA, high barrel rate, and exceptional hard-hit percentage told a different story than his merely-good traditional stats — the data said his floor was higher than the market understood. Freeman's 2022 season (.325 BA, .407 OBP, .511 SLG) validated the prediction immediately.",
        body: [
          "Freddie Freeman's Statcast profile was compelling when the Dodgers signed him: a career barrel rate above 11%, hard-hit rate consistently over 45%, and xSLG that outperformed his actual slugging in several recent seasons. The Atlanta Braves had not matched the Dodgers' offer, partly because traditional scouting weighted his age (32) more heavily. The Dodgers' models, which rely heavily on contact quality metrics that age more gracefully than speed or raw power, projected his production correctly.",
          "Freeman went on to have back-to-back seasons above .300 batting average, becoming the anchor of the Dodger lineup through the 2024 World Series championship. His Game 1 walk-off grand slam — produced on a pitch in his optimal contact zone — was the kind of high-leverage execution that the Statcast model had predicted: when Freeman gets a pitch in his zone, the contact quality is elite. The acquisition is now studied in baseball analytics circles as a model of how Statcast data can surface undervalued veterans.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Contact Quality Metrics", sub: "exit velocity + launch angle", type: "system" },
          { label: "Expected Stats (xBA/xSLG)", sub: "filter out luck — see true talent", type: "attacker" },
          { label: "Barrel% / Hard-Hit%", sub: "quantify optimal contact rate", type: "victim" },
          { label: "wOBA — Lineup Value", sub: "single weighted metric for all outcomes", type: "result" },
        ],
      },
      timeline: [
        { year: 2015, event: "Statcast deployed in all 30 MLB parks — exit velocity and launch angle tracked on every batted ball", highlight: true },
        { year: 2016, event: "Barrel percentage first published publicly — redefines what 'good contact' means" },
        { year: 2017, event: "The Dodgers' analytics team begins using Statcast models for free agent valuation" },
        { year: 2019, event: "wOBA and xwOBA become standard references in mainstream baseball coverage" },
        { year: 2021, event: "Dodgers sign Freeman based on Statcast profile — $162M contract validated by data" },
        { year: 2024, event: "Dodgers win World Series — lineup construction based on Statcast metrics pays off", highlight: true },
      ],
      keyTakeaways: [
        "wOBA is the best single-number hitting value metric — it weights all offensive outcomes by actual run-scoring impact",
        "xBA and xSLG filter out luck — a hitter with xBA much higher than BA is likely to improve, not regress",
        "Barrel percentage (elite: 15%+) identifies batted balls with automatic extra-base hit probability",
        "The Dodgers use Statcast contact quality data to acquire undervalued hitters whose traditional stats understate their talent",
      ],
      references: [
        { title: "Baseball Savant: Statcast Glossary", url: "https://baseballsavant.mlb.com/glossary" },
        { title: "Fangraphs: wOBA and wRC+ Explained", url: "https://www.fangraphs.com/library/offense/woba/" },
        { title: "MLB: Dodgers Analytics Philosophy", url: "https://www.mlb.com/dodgers" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-4-01-q1",
          type: "Statcast Metrics",
          challenge: `  A Dodger scout is evaluating two hitters
  for a mid-season acquisition:

  Hitter A: .285 BA / .290 xBA / 8% barrel%
  Hitter B: .250 BA / .310 xBA / 13% barrel%

  Which hitter represents the better
  acquisition target, and why?`,
          text: "How do Statcast expected statistics help identify undervalued hitters for roster acquisition?",
          options: [
            "Hitter A — a higher batting average means more consistent contact quality",
            "Hitter B — a .310 xBA vs .250 BA suggests his results are suppressed by bad luck, and his 13% barrel rate indicates elite contact quality",
            "They are equal — the xBA gap is within normal variance and neither stands out",
            "Hitter A — barrel% is less important than batting average for lineup construction",
          ],
          correctIndex: 1,
          explanation: "Hitter B is the clear value target. His .310 xBA versus .250 actual BA means his contact quality deserves a much higher batting average — the gap represents bad luck (good balls hit at fielders) or defensive shifts that will not necessarily continue. His 13% barrel rate is above the elite threshold and indicates he generates premium contact consistently. Hitter A's BA and xBA are nearly identical, suggesting his .285 is sustainable — but it also means there is no hidden value. Statcast-based acquisitions look exactly for gaps like Hitter B's: real quality suppressed by circumstances.",
        },
        {
          id: "baseball-4-01-q2",
          type: "wOBA",
          challenge: `  Two hitters have identical batting averages
  of .280. Hitter A walks 45 times and hits
  12 home runs. Hitter B walks 18 times and
  hits 28 home runs.

  Who has the higher wOBA, and what does
  that tell you about their offensive value?`,
          text: "How does wOBA differentiate between hitters with identical batting averages but different offensive profiles?",
          options: [
            "Hitter A — walks are more valuable than home runs in wOBA calculations",
            "They are equal — wOBA is just a rescaled version of batting average",
            "Hitter B — home runs receive the highest weight in wOBA; his power output significantly outweighs Hitter A's walk advantage",
            "Hitter A — OBP is more important than slugging in wOBA, and walks drive OBP more than power",
          ],
          correctIndex: 2,
          explanation: "wOBA uses run-value weights for each event. A home run is worth approximately .890 in wOBA weight; a walk is worth approximately .690; a single approximately .880. With 28 home runs versus 12, Hitter B generates far more wOBA value through power than Hitter A can generate through walks. The difference is substantial: Hitter B might carry a .370+ wOBA while Hitter A might be .340. Both hitters are valuable, but wOBA correctly shows that Hitter B's power production makes him the more impactful offensive player despite identical batting averages.",
        },
        {
          id: "baseball-4-01-q3",
          type: "Barrel Percentage",
          challenge: `  You are coaching a hitter whose barrel%
  has dropped from 14% to 6% over two months.
  His batting average has also dropped
  from .290 to .230.

  Exit velocity is unchanged. Launch angle
  has dropped from 18° average to 9° average.

  What is the most likely cause of the decline?`,
          text: "When exit velocity stays constant but barrel% and batting average both fall, what does the launch angle data indicate?",
          options: [
            "The hitter is getting tired — reduced bat speed is the root cause",
            "The hitter's swing plane has flattened, dropping launch angle below the barrel zone — contact quality has fallen despite unchanged power",
            "The opposing pitchers have adjusted their scouting reports and are attacking his weakness",
            "Barrel% and batting average declines are unrelated to launch angle — check the hitter's hand position",
          ],
          correctIndex: 1,
          explanation: "If exit velocity is unchanged, bat speed and power are intact. But dropping launch angle from 18° to 9° moves the hitter out of the barrel zone (which requires 26–30° at 98+ mph, or proportionally lower angles at higher velocities) and into ground ball territory. The swing plane has flattened — probably from a mechanical adjustment (crouching, dropping the back shoulder, or pressing down on the ball). The fix is mechanical: restore the slight upward attack angle that produces the 15–25° launch angle sweet spot. Statcast's ability to separate exit velocity from launch angle makes this diagnosis possible.",
        },
        {
          id: "baseball-4-01-q4",
          type: "Sprint Speed and Lineup Construction",
          challenge: `  The Dodgers are building their lineup and
  choose between two left fielders with
  identical wOBA (.370). One runs 30.1 ft/sec
  (elite sprint speed). The other runs 26.8 ft/sec
  (below average).

  Why does sprint speed matter for lineup
  construction beyond just stolen bases?`,
          text: "How does sprint speed affect a hitter's value beyond baserunning and stolen base attempts?",
          options: [
            "It doesn't — sprint speed is only relevant for stolen base decisions",
            "Elite sprint speed increases infield hit rate, extra bases taken on singles, and forces defensive shifts that open up more hits in the infield — creating measurable additional offensive value",
            "Sprint speed only matters for outfielders in the field — hitting value is purely about contact quality",
            "Slower runners are more valuable because they force pitchers to hold them on base, reducing pickoff attempts",
          ],
          correctIndex: 1,
          explanation: "Sprint speed creates offensive value in multiple ways beyond stolen bases. Elite speed (30+ ft/sec) dramatically increases infield hit rate — slow grounders that die in the hole become hits. It forces infielders to play shallower, opening gaps. It allows extra bases on singles that slower players cannot take — turning a single into a double or a double into a triple. Statcast models show that elite sprint speed adds roughly 2–4 wins per season in value beyond what wOBA alone captures. For two hitters with identical wOBA, the faster runner is consistently the more valuable choice.",
        },
      ],
    },
  },

  // ─── baseball-4-02: Scouting Reports and Pitcher Tendencies ─────────────────
  {
    epochId: "baseball-4",
    wonder: {
      name: "Cooperstown Hall of Fame — Scouting Archives",
      location: "Cooperstown, New York",
      era: "Historic",
      emoji: "📋",
    },
    id: "baseball-4-02",
    order: 2,
    title: "Scouting Reports and Pitcher Tendencies",
    subtitle: "Pitch usage by count, platoon splits, high-leverage tendencies, and the pre-at-bat card",
    category: "sports",
    xp: 90,
    badge: { id: "baseball-4-badge-02", name: "Scout's Eye", emoji: "🔍" },
    challengeType: "quiz",
    info: {
      tagline: "Every great at-bat starts in the film room — by the time you step in the box, you should already know what's coming.",
      year: 1988,
      overview: [
        "Major League hitters receive detailed scouting reports on every opposing pitcher before each series — sometimes 3–5 pages of data covering pitch usage rates by count, platoon splits, tendencies in specific situations, and recent adjustments. This preparation is not optional: it is the foundation of elite at-bat quality. A hitter who knows that a pitcher throws his slider 80% of the time in 0-2 counts has already resolved one of the key variables in the at-bat before it begins.",
        "Pitch usage by count is one of the most actionable pieces of scouting information. Pitchers develop tendencies: a pitcher who throws his fastball 90% of the time in 2-0 counts is essentially telling you what pitch to look for in that count. A pitcher who throws his changeup only 5% of the time against left-handed batters almost never uses it as a platoon weapon. These rates, when studied before a game, allow hitters to narrow their mental model of possible pitches in any given count — effectively giving themselves more decision-making time.",
        "High-leverage tendencies are particularly important. How does a pitcher approach hitters with runners in scoring position? Do they go to their best pitch or revert to fastballs when the pressure increases? Statcast data shows that many pitchers' pitch mix changes dramatically in high-leverage situations — and hitters who have studied this can anticipate the shift. The Dodgers' advance scouting staff provides these reports to hitters the evening before each series, and game-day iPad updates refine them based on the starter's bullpen session.",
      ],
      technical: {
        title: "Reading a Pre-At-Bat Scouting Card",
        body: [
          "A real pre-at-bat scouting card for a professional hitter covers four main categories: pitch arsenal (what pitches the pitcher throws and at what velocity ranges), pitch usage by count (percentages for each count from 0-0 through full count), location tendencies by pitch type (does the fastball go inner half or outer half? does the curveball break toward the batter or away?), and platoon splits (how does the pitcher's effectiveness differ against left vs. right-handed batters).",
          "The practical use of a scouting card is not to memorize every number but to identify one or two actionable patterns per at-bat. Before stepping in, a hitter should know: (1) what pitch is most likely in the first-pitch and 0-0 count, (2) what pitch the pitcher throws when he has to throw a strike (ahead in the count), and (3) what the pitcher goes to when he wants to get a swing-and-miss. These three pieces of information shape the entire at-bat mental model.",
        ],
        codeExample: {
          label: "Sample Pre-At-Bat Scouting Card",
          code: `  PITCHER: [Right-handed starter, 6'3", 215]

  ARSENAL:
  4-Seam FB:  92–95 mph (primary pitch)
  Slider:     83–86 mph (out-pitch vs. RHH)
  Changeup:   83–85 mph (primary vs. LHH)
  Curveball:  76–79 mph (situational — 2K counts)

  PITCH USAGE BY COUNT (last 30 days):
  0-0:   FB 72% / SL 18% / CU 10%
  1-0:   FB 68% / SL 22% / CU 10%
  2-0:   FB 88% / SL 8% / CU 4%    ← SIT FB
  0-1:   FB 51% / SL 30% / CU 19%
  1-1:   FB 55% / SL 25% / CU 20%
  2-1:   FB 64% / SL 22% / CU 14%
  3-1:   FB 92% / SL 8% / CU 0%    ← FASTBALL
  0-2:   FB 28% / SL 48% / CU 24%  ← SLIDER
  1-2:   FB 35% / SL 42% / CU 23%  ← SLIDER
  FULL:  FB 62% / SL 28% / CU 10%

  LOCATION TENDENCIES:
  FB: 62% outer half, 28% inner, 10% middle
  SL: 74% down-and-away vs. RHH
  CU: 66% in the dirt (chase pitch)

  HIGH-LEVERAGE TENDENCIES (RISP):
  → FB usage increases 8% in RISP situations
  → Goes to SL as out-pitch first K attempt`,
        },
      },
      incident: {
        title: "Mel Didier's Scouting and Kirk Gibson's 1988 Home Run",
        when: "October 15, 1988 — World Series Game 1",
        where: "Dodger Stadium, Los Angeles, California",
        impact: "Dodgers scout Mel Didier had studied Dennis Eckersley so thoroughly that he told Kirk Gibson before the game: 'I guarantee you, partner, on a 3-2 count he will throw you that backdoor slider.' Gibson, barely able to walk, sat on that pitch in the 9th inning and hit the most famous home run in Dodger history. It is the most dramatic example of scouting report preparation winning a World Series moment.",
        body: [
          "Mel Didier was the Dodgers' advance scout in 1988. He had watched Eckersley pitch for days and identified a pattern that almost no one else had noticed: in 3-2 counts against left-handed batters, Eckersley consistently threw his back-door slider on the outer corner. The pitch was nearly unhittable — it broke away from left-handed hitters at the last moment, looking like a ball before catching the outside corner. Eckersley had used it to get out of trouble all season.",
          "Didier briefed the entire Dodger lineup, including Kirk Gibson, who had not played in Game 1 due to leg injuries. When Tommy Lasorda sent Gibson to the plate in the 9th inning, Gibson had one piece of information that changed everything: at 3-2, Eckersley throws the backdoor slider. Gibson fouled off pitches to work the count. The moment the 3-2 count arrived, Gibson made the mental commitment — and when the slider came, he turned on it for the walk-off home run. The scouting report won the game.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Study Pitch Usage by Count", sub: "know what pitch is coming before it arrives", type: "system" },
          { label: "Identify 2–3 Actionable Patterns", sub: "2-0 = fastball; 0-2 = slider, etc.", type: "attacker" },
          { label: "Build Mental Model per At-Bat", sub: "narrow the pitch decision tree in real time", type: "victim" },
          { label: "Sit on a Pitch and Execute", sub: "Gibson / Freeman / Betts style", type: "result" },
        ],
      },
      timeline: [
        { year: 1960, event: "MLB teams begin employing full-time advance scouts — scouting reports become standard preparation" },
        { year: 1988, event: "Kirk Gibson's home run — proof that a single scouting detail can change a World Series", highlight: true },
        { year: 2000, event: "Video scouting supplements written reports — full at-bat archives become available to hitters" },
        { year: 2015, event: "Statcast data integration into scouting reports — pitch usage percentages by count become precise", highlight: true },
        { year: 2020, event: "iPad-based real-time scouting updates delivered in the Dodger dugout between innings" },
        { year: 2024, event: "Dodgers' scouting infrastructure cited as key factor in World Series preparation" },
      ],
      keyTakeaways: [
        "Pitch usage by count is the most actionable scouting data — know what pitch is most likely in 2-0, 0-2, and 3-2 counts",
        "A pre-at-bat scouting card identifies 2–3 key tendencies: first-pitch preference, must-throw-strike pitch, and out-pitch",
        "High-leverage tendencies often differ from normal tendencies — pitchers under pressure may revert to their fastball",
        "Kirk Gibson's 1988 home run proves that a single piece of advance scouting can decide a championship moment",
      ],
      references: [
        { title: "MLB: Advance Scouting in the Modern Era", url: "https://www.mlb.com/video" },
        { title: "Baseball Savant: Pitch Usage by Count", url: "https://baseballsavant.mlb.com" },
        { title: "Dodgers: 1988 World Series Retrospective", url: "https://www.mlb.com/dodgers/history" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-4-02-q1",
          type: "Pitch Usage by Count",
          challenge: `  Your scouting card shows the pitcher throws
  fastball 88% of the time in 2-0 counts.

  You work the count to 2-0. The pitcher's
  last pitch was a changeup that missed low.

  Should you still look for the fastball?`,
          text: "How should a hitter balance scouting tendencies against in-game pitch sequencing?",
          options: [
            "No — the changeup miss means he will throw it again to fool you",
            "Yes — an 88% fastball rate in 2-0 counts is a strong signal that overrides any single-pitch sequence; look for the fastball",
            "Take the pitch — with a 2-0 count you can afford to look for patterns in real time",
            "Scouting data is from previous outings and cannot predict in-game decisions reliably",
          ],
          correctIndex: 1,
          explanation: "An 88% fastball rate in 2-0 counts means that out of every 100 2-0 pitches this pitcher has thrown, 88 were fastballs. The fact that his last pitch was a changeup is a single data point in hundreds. The scouting tendency is the strong prior; the single preceding pitch is noise. A hitter who abandons a dominant scouting tendency because of one sequence is making a cognitive error. Look for the fastball. If the changeup comes, you adjust — but you are right to sit fastball on 2-0 counts against this pitcher.",
        },
        {
          id: "baseball-4-02-q2",
          type: "High-Leverage Tendencies",
          challenge: `  Your scouting report notes: "In RISP
  situations, this pitcher's fastball usage
  increases from 55% to 71%. He goes away
  from his slider and curveball under pressure."

  It is the 6th inning, runners on 2nd and 3rd,
  2 outs. 1-1 count.

  What pitch should you be looking for?`,
          text: "How do high-leverage pitch tendency changes affect a hitter's approach in pressure situations?",
          options: [
            "Slider — it is his out-pitch and he will go to it to end the inning",
            "Fastball — the scouting report shows he increases fastball usage in RISP situations, meaning he is likely to revert to his primary pitch under pressure",
            "Changeup — unexpected pitches are most effective in high-leverage situations",
            "Look for something off-speed — pressure causes pitchers to overthrow fastballs, so they compensate with secondary pitches",
          ],
          correctIndex: 1,
          explanation: "The scouting report is telling you exactly what to expect: this pitcher is more predictable under pressure, not less. Going from 55% to 71% fastball usage in RISP situations means he reverts to his comfort pitch when the stakes rise. In a 1-1 count with runners in scoring position, he is 71% likely to throw a fastball. Sit on the fastball, drive it hard. This is precisely the situation where scouting preparation pays its highest dividend — knowing that pressure makes this pitcher more predictable, not less.",
        },
        {
          id: "baseball-4-02-q3",
          type: "Location Tendencies",
          challenge: `  Scouting card: "His fastball goes outer half
  62% of the time. Inner half only 15%."

  You get into the batter's box against this
  pitcher with a 1-0 count. Where should
  you be looking for the fastball?`,
          text: "How do location tendencies from scouting reports shape a hitter's approach and swing preparation?",
          options: [
            "Inner half — pitchers attack inside against hitters who have shown they handle the outer half",
            "Middle of the plate — split the difference between inner and outer to maximize coverage",
            "Outer half — 62% outer half fastball rate means he is most likely to attack that location; prepare your swing plane for an away fastball",
            "Location tendencies are too general to plan around — just react to where the pitch goes",
          ],
          correctIndex: 2,
          explanation: "A 62% outer-half fastball rate is a strong, actionable tendency. With a 1-0 count (hitter-friendly), you can prepare your mental model for a fastball away — adjusting your stance depth, swing timing, and contact-point expectation toward the outer edge of the plate. This doesn't mean you can't handle an inner-half fastball — it means you are pre-loaded for the most likely location. Hitters who study location tendencies find that they are surprised less often and can produce harder contact on predictable pitches because their mechanics are already calibrated for that zone.",
        },
        {
          id: "baseball-4-02-q4",
          type: "Building the At-Bat Plan",
          challenge: `  Before your first at-bat against a starter,
  you want to extract three key pieces of
  information from his scouting card to
  build your at-bat mental model.

  Which three data points are most valuable
  for a first-time matchup in the same game?`,
          text: "Which three scouting data points best prepare a hitter for a first at-bat against an unfamiliar starter?",
          options: [
            "Pitcher's ERA, WHIP, and season strikeout total",
            "First-pitch tendency (what does he throw 0-0), must-throw-strike pitch (what he throws when he needs a strike), and his primary out-pitch",
            "Pitcher's age, handedness, and number of career starts",
            "His pitch velocity ranges, arm angle, and height/weight",
          ],
          correctIndex: 1,
          explanation: "For a first at-bat, the three most actionable pieces are: (1) First-pitch tendency — knowing his 0-0 pitch mix tells you whether to look to drive the first pitch or take it and study; (2) Must-throw-strike pitch — in counts where he needs a strike (1-2, full count), what does he go to? This is your pitch to look for when you work the count; (3) Primary out-pitch — what does he use when he wants to end the at-bat? Knowing this tells you what pitch to protect against with two strikes. ERA and season stats describe results, not what pitch is coming next.",
        },
      ],
    },
  },

  // ─── baseball-4-03: Pre-At-Bat Rituals and Visualization ────────────────────
  {
    epochId: "baseball-4",
    wonder: {
      name: "Camelback Ranch — Spring Training Facility",
      location: "Glendale, Arizona",
      era: "Modern",
      emoji: "🧘",
    },
    id: "baseball-4-03",
    order: 3,
    title: "Pre-At-Bat Rituals and Visualization",
    subtitle: "On-deck preparation, mental imagery, breathing, and David Ortiz's routine",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-4-badge-03", name: "Mental Game", emoji: "🧠" },
    challengeType: "quiz",
    info: {
      tagline: "The at-bat begins in the on-deck circle — elite hitters have already decided what they are going to do before they step into the box.",
      year: 2004,
      overview: [
        "The on-deck circle is not a waiting area — it is a preparation zone. Elite hitters use every moment in the on-deck circle to accomplish multiple tasks: track the pitcher's delivery from a live angle to calibrate timing, review their scouting information and refine the mental model for their upcoming at-bat, complete a physical warm-up that activates the muscles used in the swing, and perform mental visualization — running the upcoming at-bat through their mind with a successful outcome.",
        "Visualization is one of the most well-documented performance psychology tools in elite sports. Research with Major League hitters consistently shows that mental imagery activates similar neural pathways as physical execution — the brain rehearses the movement pattern at a neurological level. Elite hitters visualize not just 'hitting the ball' but specific, detailed scenarios: the pitch location, the swing mechanics, the contact point, the trajectory of the ball off the bat. The more specific and sensory-rich the visualization, the more effective it is.",
        "Arousal control — managing the physiological activation level before and during at-bats — is critical for clutch performance. Too little arousal (flat, unmotivated) and reaction time slows, decisions are passive. Too much arousal (panicked, over-activated) and fine motor control degrades, resulting in mechanical breakdowns under pressure. The ideal performance state is what sports psychologists call the 'individual zone of optimal functioning' (IZOF) — different for every hitter. Breathing techniques, pre-at-bat routines, and step-in rituals all serve to regulate this arousal level.",
      ],
      technical: {
        title: "David Ortiz's Pre-At-Bat Routine — Dissected",
        body: [
          "David Ortiz ('Big Papi') was one of the greatest clutch hitters of his era — a .455 career batting average in World Series games. His pre-at-bat routine was famously deliberate: in the on-deck circle, he would take four to six slow, full swings while tracking the pitcher, then spend the final 30 seconds standing completely still, eyes closed, performing mental visualization. He consistently described visualizing the pitch he was looking for and his swing connecting with it before he stepped in.",
          "Ortiz's step-in ritual further reinforced his mental state: he would point both index fingers at the sky (a religious acknowledgment), then adjust his helmet, tap his feet twice, and take one final slow breath before his trigger. These rituals were not superstition — they were anchors that activated his optimal performance state consistently. His heart rate studies during pre-game warmups showed that the ritual reduced activation after high-adrenaline at-bats and restored focus between pitches.",
        ],
        codeExample: {
          label: "Elite Pre-At-Bat Routine — Structured Framework",
          code: `  ON-DECK CIRCLE (2–4 minutes before at-bat):

  PHYSICAL:
  → 4–6 tracking swings (watch pitcher's delivery)
  → Note pitch timing — calibrate your trigger
  → Arm circles / hip loosening if needed

  MENTAL REVIEW:
  → Recall 2–3 scouting keys for this pitcher
  → Set primary pitch to look for (count 0-0)
  → Set two-strike approach in advance

  VISUALIZATION (30–60 seconds before stepping in):
  → Close eyes — see the specific pitch you want
  → Feel the swing connecting — hear the contact
  → See the ball go where you want it
  → End the image with a successful outcome

  AROUSAL REGULATION:
  → 4-count inhale, 6-count exhale (calm)
  → Jaw unclenched, shoulders dropped
  → Remind yourself: "Simple. Patient. Attack."

  STEP-IN RITUAL:
  → Same sequence every at-bat (anchor)
  → Engages automatic performance mode
  → Separates previous at-bat from this one`,
        },
      },
      incident: {
        title: "David Ortiz's 2004 ALCS — Clutch Visualization in Action",
        when: "October 2004 — ALCS, Red Sox vs. Yankees",
        where: "Fenway Park, Boston / Yankee Stadium, New York",
        impact: "In the 2004 ALCS, David Ortiz hit walk-off hits in Games 4 and 5, keeping the Red Sox alive in a series they would eventually win after being down 3-0. Ortiz later described his pre-at-bat visualization in both games as unusually clear and specific — he had seen the pitch he was going to hit before he stepped in. His clutch hitting became a case study in sports psychology literature on visualization and performance.",
        body: [
          "Ortiz's walk-off single in Game 4 of the 2004 ALCS came at 12:22 AM in the 12th inning, after the Red Sox had been one strike away from elimination. His pre-at-bat routine — including the visualization of driving a specific pitch up the middle — was described by teammates watching from the dugout as visibly calm and unhurried despite the moment. 'He looked like he was preparing for a batting practice session,' Manny Ramirez later said. 'That's Big Papi.'",
          "Sports psychologists studying Ortiz's performance in high-leverage situations noted that his pre-at-bat routine was exceptionally consistent — the same physical movements, the same visualization duration, the same step-in ritual regardless of the game situation. This consistency prevented the performance anxiety spike that causes other hitters to change their mechanics or abandon their approach in pressure moments. The research conclusion: pre-at-bat rituals are most valuable not for any mystical reason but because they create the same mental state every at-bat — eliminating situation-specific performance degradation.",
        ],
      },
      diagram: {
        nodes: [
          { label: "On-Deck Physical Prep", sub: "tracking swings + warm-up", type: "system" },
          { label: "Mental Review + Scouting", sub: "activate at-bat plan", type: "attacker" },
          { label: "Visualization", sub: "see the success before it happens", type: "victim" },
          { label: "Step-In Ritual", sub: "anchor into optimal performance state", type: "result" },
        ],
      },
      timeline: [
        { year: 1984, event: "Sports psychology formally enters professional baseball — visualization training begins with elite teams" },
        { year: 1990, event: "Individual zone of optimal functioning (IZOF) research published — arousal control becomes mainstream" },
        { year: 2004, event: "David Ortiz's ALCS walk-off hits — pre-at-bat visualization enters the clutch-hitting conversation", highlight: true },
        { year: 2010, event: "Dodgers hire full-time mental skills coaches — pre-at-bat routines become structured protocol" },
        { year: 2018, event: "Biofeedback tools (HRV monitors) begin tracking arousal levels during at-bats at professional level" },
        { year: 2024, event: "Freddie Freeman's World Series routine — calm, deliberate preparation despite severe ankle injury", highlight: true },
      ],
      keyTakeaways: [
        "The on-deck circle is a preparation zone — use it for tracking swings, mental review, visualization, and arousal regulation",
        "Visualization activates the same neural pathways as physical execution — specific, sensory-rich mental imagery improves performance",
        "Pre-at-bat rituals create consistent mental states — they prevent anxiety spikes from degrading mechanics in pressure situations",
        "Arousal control (breathing, physical cues) is a trainable skill — elite hitters reach their IZOF consistently across all game situations",
      ],
      references: [
        { title: "Dodgers: Mental Skills and Player Development", url: "https://www.mlb.com/dodgers" },
        { title: "MLB: Sports Psychology in Baseball", url: "https://www.mlb.com/video" },
        { title: "Applied Sport Psychology: David Ortiz Case Study", url: "https://www.appliedsportpsych.org" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-4-03-q1",
          type: "On-Deck Preparation",
          challenge: `  You are on deck. The current batter is
  facing a pitcher who has thrown 3 straight
  curveballs in this at-bat.

  Most players watch the count.
  You watch the pitcher's release point.

  What specifically should you be gathering
  from watching live during your on-deck time?`,
          text: "What is the most valuable information a hitter can gather by watching the pitcher from the on-deck circle?",
          options: [
            "The catcher's sign sequence — it may be visible from the on-deck angle",
            "The pitcher's delivery timing and release point — calibrating your trigger and tracking the live tunnel before stepping in",
            "The batter's swing adjustments — what the current hitter is doing will tell you what to copy",
            "The umpire's strike zone — watching calls on the current batter identifies the zone for your at-bat",
          ],
          correctIndex: 1,
          explanation: "The on-deck circle provides a live-angle view of the pitcher's delivery — a view you cannot get from the batter's box. From here, you calibrate: how does the pitcher's front foot land? Where exactly is his release point? How tight is the ball out of his hand? What does the pitch trajectory look like from a frontal angle rather than the side? Taking tracking swings while watching the delivery synchronizes your timing before you step in. Hitters who have tracked 6–8 pitches from the on-deck circle step into the box with their timing already calibrated — not starting from zero.",
        },
        {
          id: "baseball-4-03-q2",
          type: "Visualization",
          challenge: `  Your youth player asks: "What should I
  visualize? Just 'getting a hit'?"

  You want to explain effective visualization
  versus vague positive thinking.

  What is the key difference?`,
          text: "What makes visualization effective for hitting performance rather than simply motivational?",
          options: [
            "Effective visualization is always positive — visualizing failure is never useful",
            "Effective visualization is specific and sensory: see the pitch type, feel the swing mechanics, hear the contact, and see a precise trajectory — not just 'getting a hit'",
            "Visualization should focus on the pitcher's mistakes, not your own swing, to build confidence",
            "The content of visualization does not matter — any mental imagery reduces anxiety and improves performance",
          ],
          correctIndex: 1,
          explanation: "Vague positive visualization ('I will get a hit') activates general positive affect but does not rehearse the motor patterns of hitting. Specific, sensory-rich visualization — 'I see a 1-0 fastball middle-away, I feel my hips rotate, I hear the crack of the barrel connecting, I see the ball carry into the left-center gap' — activates motor planning regions in the brain and literally rehearses the movement. Research on elite athletes consistently shows that the specificity of visualization is directly correlated with its performance benefit. Coach your players to see, feel, and hear the at-bat in detail.",
        },
        {
          id: "baseball-4-03-q3",
          type: "Arousal Control",
          challenge: `  You just struck out looking in a key
  situation. The next inning, you're back
  up with the bases loaded.

  You notice your heart is racing, your
  jaw is tight, and you're gripping the
  bat handle too hard in the on-deck circle.

  What technique should you apply, and why?`,
          text: "How do breathing techniques regulate arousal and restore optimal performance state between at-bats?",
          options: [
            "Grip the bat tighter to channel the adrenaline into bat speed",
            "Use controlled breathing — a slow 4-count inhale and longer 6-count exhale — to activate the parasympathetic nervous system, slow heart rate, and restore fine motor control",
            "Think about the previous strikeout to analyze what went wrong before the next at-bat",
            "Arousal levels cannot be changed between at-bats — you either have the mental composure or you do not",
          ],
          correctIndex: 1,
          explanation: "A slow exhale (longer than the inhale) activates the parasympathetic nervous system — the 'rest and digest' branch that counteracts the sympathetic fight-or-flight response. This is not a metaphor; it is physiology. A 4-count inhale / 6-count exhale reduces heart rate, lowers cortisol, and restores fine motor control that high arousal degrades. Elite hitters develop this skill deliberately — not just for obvious pressure situations but as a consistent between-pitch reset. Tight jaw and white-knuckle grip are physical signs of over-arousal; consciously unclenching both while breathing slowly is a trainable correction.",
        },
        {
          id: "baseball-4-03-q4",
          type: "Step-In Ritual",
          challenge: `  Two hitters face the same high-leverage
  situation (bases loaded, 9th inning):

  Hitter A adjusts his routine for the
  situation — longer visualization, more
  deep breaths, extra practice swings.

  Hitter B does his identical pre-at-bat
  routine — same as every other at-bat.

  Research suggests which approach works better,
  and why?`,
          text: "Why do sports psychologists recommend maintaining an identical pre-at-bat routine regardless of situation importance?",
          options: [
            "Hitter A — adapting to the moment's significance with additional preparation improves readiness",
            "Hitter B — consistency in the routine prevents situation-specific anxiety from disrupting the performance state that the routine reliably activates",
            "Both approaches are equally valid — individual preference determines which is more effective",
            "Neither — the most effective approach is to clear your mind completely with no routine",
          ],
          correctIndex: 1,
          explanation: "Research in sport psychology consistently shows that routine consistency outperforms situation-adapted rituals. When Hitter A changes his routine for big moments, he is signaling to his nervous system that this situation is different — which can amplify anxiety rather than reduce it. He may also over-prepare, raising arousal above his optimal level. Hitter B's identical routine activates the same neural state regardless of context — his body and mind associate the routine with the calm, focused performance state, not with the score or inning. The routine is a psychological anchor; changing the anchor breaks the conditioning.",
        },
      ],
    },
  },

  // ─── baseball-4-04: The Clutch At-Bat ────────────────────────────────────────
  {
    epochId: "baseball-4",
    wonder: {
      name: "Dodger Stadium — Home Plate in October",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "🌟",
    },
    id: "baseball-4-04",
    order: 4,
    title: "The Clutch At-Bat",
    subtitle: "High leverage, RISP approach, and Freeman's 2024 World Series grand slam — pitch by pitch",
    category: "sports",
    xp: 95,
    badge: { id: "baseball-4-badge-04", name: "Clutch Gene", emoji: "💎" },
    challengeType: "quiz",
    info: {
      tagline: "Clutch hitting is not a myth — it is a skill, and it can be developed with the right approach and preparation.",
      year: 2024,
      overview: [
        "High-leverage situations — runners in scoring position, late innings, close games — are the moments that define careers and seasons. The concept of 'clutch' has been debated extensively in baseball analytics. Early research suggested that clutch performance was random and could not be reliably predicted. More recent research, including Statcast studies of plate discipline and contact quality in high-leverage situations, shows that elite hitters do maintain higher contact quality and better approach in pressure situations compared to average hitters — suggesting that mental preparation and approach consistency are genuinely clutch skills.",
        "How do elite hitters adjust their approach with runners in scoring position (RISP)? The data reveals that the best clutch hitters do not significantly change their swing — they change their mental approach. They become more selective, waiting for a pitch in their optimal zone rather than expanding the zone out of anxiety. They prioritize putting the ball in play over hitting for power. They accept the walk as a positive outcome rather than forcing the issue. Essentially, the clutch approach is a heightened version of ideal plate discipline.",
        "The Freddie Freeman 2024 World Series Game 1 grand slam is the definitive modern example of clutch hitting executed perfectly. Down 3-2 in the 10th inning against Nestor Cortes, with the bases loaded, a sprained ankle, and a massive postseason moment, Freeman worked the count and then drove a fastball over the right field fence. The pitch-by-pitch breakdown of that at-bat is a clinic in how preparation, approach discipline, and mechanical consistency produce the highest-leverage hit in recent Dodger history.",
      ],
      technical: {
        title: "Freddie Freeman's 2024 World Series Grand Slam — Pitch by Pitch",
        body: [
          "Pitch 1: Slider, down and away — Ball 1. Freeman takes the pitch. He has studied Cortes and knows his slider fades down and away. He is not swinging at it in a pitcher's count. Pitch 2: Four-seam fastball, belt-high inner half — Foul tip. Freeman is on the pitch but gets just under it. He now knows Cortes is attacking the inner half. Pitch 3: Changeup, fading away — Ball 2. Freeman stays back and takes it. His discipline has worked the count to 2-1.",
          "Pitch 4: Four-seam fastball, inner half, letters — Freeman connects. The exit velocity is 100.4 mph at 28° launch angle. A barrel. The ball carries over the right field fence, hitting the foul pole for a walk-off grand slam. The sequence tells the story: Freeman identified the fastball pattern (Cortes was going back to it after the changeup failed), sat on the pitch in the inner half, and executed the identical swing he had grooved in practice. No adjustment, no panic, no expanded zone — just the swing, on the pitch he wanted.",
        ],
        codeExample: {
          label: "Freeman's 2024 WS Game 1 Grand Slam — At-Bat Breakdown",
          code: `  SITUATION: Game 1 WS, Bottom 10th
  Dodgers trailing 3-2, bases loaded, 2 outs
  Pitcher: Nestor Cortes (Yankees closer)
  Batter: Freddie Freeman (ankle injury)

  PITCH 1: Slider, 83 mph, down-and-away
  → Ball 1. Freeman: "Not my pitch. Take it."
  → Count: 1-0

  PITCH 2: 4-Seam FB, 90 mph, inner half
  → Foul. Freeman: "On the pitch — missed barrel."
  → Count: 1-1

  PITCH 3: Changeup, 81 mph, fading away
  → Ball 2. Freeman stays back, refuses to expand.
  → Count: 2-1

  PITCH 4: 4-Seam FB, 91 mph, inner half/letters
  → GRAND SLAM. EV: 100.4 mph. LA: 28°.
  → Walk-off. Dodgers 6, Yankees 3.

  AT-BAT ANALYSIS:
  → Took two balls outside his zone (discipline)
  → Recognized fastball pattern on pitch 4
  → Same swing he had taken all postseason
  → Ankle injury did not change his approach
  → Preparation made the execution automatic`,
        },
      },
      incident: {
        title: "Freddie Freeman's Walk-Off Grand Slam — October 25, 2024",
        when: "October 25, 2024 — World Series Game 1, 10th inning",
        where: "Dodger Stadium, Los Angeles, California",
        impact: "Freddie Freeman's walk-off grand slam in the bottom of the 10th inning of World Series Game 1 gave the Dodgers a 6-3 victory and set the tone for an eventual World Series championship. Freeman, playing through a severely sprained ankle, produced one of the most emotionally charged and technically excellent clutch at-bats in postseason history.",
        body: [
          "The scene seemed scripted for drama: Freddie Freeman, who had been hobbling through the postseason on a badly sprained ankle, came to the plate in the 10th inning with the bases loaded and his team trailing 3-2. He had already produced a go-ahead hit in Game 1 before the Yankees reclaimed the lead. Now, facing Yankees closer Nestor Cortes, he needed a hit with everything on the line.",
          "Freeman's approach was a masterclass in clutch discipline. He took two pitches outside his zone — a slider and a changeup — without flinching, both balls. Cortes came back with his fastball on the inner half, and Freeman drove it over the right field foul pole for a grand slam. The Dodger Stadium crowd eruption was one of the loudest ever recorded at the park. Freeman wept as he rounded the bases — the physical and emotional weight of the moment overwhelming him. The Dodgers went on to win the World Series in five games.",
        ],
      },
      diagram: {
        nodes: [
          { label: "High-Leverage Situation", sub: "RISP, late innings, tight score", type: "attacker" },
          { label: "Elite Approach Discipline", sub: "refuse to expand zone under pressure", type: "system" },
          { label: "Wait for Your Pitch", sub: "patience produces the right pitch to drive", type: "victim" },
          { label: "Execute the Prepared Swing", sub: "same mechanics as every other at-bat", type: "result" },
        ],
      },
      timeline: [
        { year: 1988, event: "Kirk Gibson's 1988 World Series home run — preparation and clutch execution define a championship" },
        { year: 2004, event: "David Ortiz's ALCS walk-off series — establishes modern benchmark for clutch hitting" },
        { year: 2015, event: "Statcast begins measuring approach consistency in high-leverage situations" },
        { year: 2020, event: "Corey Seager's NLCS and World Series MVP — Dodger clutch hitting delivers first title in 32 years" },
        { year: 2024, event: "Freddie Freeman's walk-off grand slam, Game 1 — the signature clutch moment of the decade", highlight: true },
        { year: 2024, event: "Dodgers win World Series — clutch performance cited as decisive factor in 5-game victory" },
      ],
      keyTakeaways: [
        "Clutch hitters do not expand their zone under pressure — they become more selective, not less",
        "The best clutch at-bats use preparation: knowing what pitch is coming and executing the same mechanics as always",
        "Freeman's 2024 grand slam followed a textbook approach: two discipline takes on balls, then attacking the fastball in his zone",
        "Approach consistency — not swing changes — separates elite clutch performers from hitters who press under pressure",
      ],
      references: [
        { title: "MLB: Freeman 2024 World Series Grand Slam", url: "https://www.mlb.com/dodgers" },
        { title: "Baseball Savant: High-Leverage Hitting Metrics", url: "https://baseballsavant.mlb.com" },
        { title: "Fangraphs: Clutch Statistic Methodology", url: "https://www.fangraphs.com/library/offense/clutch/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-4-04-q1",
          type: "Clutch Approach",
          challenge: `  Bases loaded, 2 outs, tie game, 9th inning.
  A pitcher throws you a slider 4 inches
  outside the zone — borderline, but clearly
  a ball.

  Everyone in the stadium wants you to swing.
  You take it. Ball one.

  Did you make the right decision?`,
          text: "Why is taking a ball in a high-leverage situation with bases loaded an example of good clutch approach, not passivity?",
          options: [
            "No — with bases loaded and 2 outs you should swing at anything borderline to avoid walking off the field without swinging",
            "Yes — taking a ball outside your zone even under enormous pressure is elite plate discipline; it improves the count without giving the pitcher a free out",
            "Only if the pitcher is known to be wild — otherwise expanding the zone slightly in a bases-loaded situation is advisable",
            "No — a borderline slider at 0-0 should always be swung at with the bases loaded",
          ],
          correctIndex: 1,
          explanation: "Taking a ball outside your zone in a high-leverage situation is the hardest and most disciplined thing a hitter can do — it requires trusting your approach when emotion demands aggression. Elite clutch hitters consistently show better plate discipline in high-leverage situations, not worse. Swinging at that slider 4 inches outside would have given the pitcher a free out on a pitch outside the zone. Taking it moves the count to 1-0, giving you a better pitch to attack on the next offering. The crowd's reaction is irrelevant to pitch quality.",
        },
        {
          id: "baseball-4-04-q2",
          type: "Freeman Pitch-by-Pitch",
          challenge: `  In Freeman's 2024 WS Game 1 grand slam,
  he took pitches 1 and 3 (a slider and
  changeup, both balls) before hitting
  pitch 4 (a fastball inner half) for the
  grand slam.

  What discipline principle does this sequence
  most clearly demonstrate?`,
          text: "What does Freeman's discipline on pitches 1 and 3 reveal about elite clutch hitting approach?",
          options: [
            "Elite hitters guess on every pitch and got lucky that pitch 4 was a fastball",
            "Elite hitters refuse to expand their zone even with bases loaded and a sprained ankle — they wait for the pitch in their zone and then execute without hesitation",
            "Freeman took pitches 1 and 3 because they were obvious balls — any competent hitter would have done the same",
            "The pitch-by-pitch sequence shows that Cortes made a mistake, not that Freeman demonstrated discipline",
          ],
          correctIndex: 1,
          explanation: "Freeman's takes on pitches 1 and 3 were under the maximum possible pressure: World Series Game 1, extra innings, bases loaded, entire season at stake. The slider and changeup were balls, but not obviously so — in that situation many hitters would have expanded their zone and swung at either pitch. Freeman did not. He trusted his zone, trusted his preparation, and waited. When Cortes had to come back with his fastball on pitch 4, Freeman was ready because his approach had forced Cortes into a hitter's pitch. Discipline in extremis is the clutch skill.",
        },
        {
          id: "baseball-4-04-q3",
          type: "RISP Adjustment",
          challenge: `  Research shows that the best hitters improve
  their performance in RISP situations while
  average hitters perform slightly worse.

  The difference is not physical — their
  bat speed and contact quality stay the same.

  What changes?`,
          text: "What mental and approach factors explain why elite hitters perform better in RISP situations than in low-leverage ones?",
          options: [
            "Elite hitters have more natural talent that becomes visible under pressure",
            "Elite hitters apply heightened approach discipline in RISP situations — more selective with pitch choice, prioritizing contact over power, accepting walks — while maintaining the same mechanics",
            "Elite hitters physically practice more RISP scenarios, building specific muscle memory for those situations",
            "The opposing pitcher is more nervous in RISP situations, making their pitches easier to hit",
          ],
          correctIndex: 1,
          explanation: "Statcast data on high-leverage at-bats shows that elite clutch hitters do not change their mechanics under pressure — their bat speed and swing plane stay consistent. What changes is their approach: they swing at pitches in their zone at a higher rate (ignoring borderline pitches more decisively), they go the other way more (accepting contact quality over pull power), and their walk rate increases slightly (accepting the free base when the pitcher won't give them a strike). The mental game — approach discipline — is what separates clutch from non-clutch performers, not some mysterious physical difference.",
        },
        {
          id: "baseball-4-04-q4",
          type: "Clutch vs. Pressing",
          challenge: `  A youth hitter comes to the plate in the
  district championship, bases loaded, 1-1 count.
  He has been working all season on plate discipline.

  His instinct says: "I need to do something big —
  swing at the next pitch no matter where it is."

  What is the risk of this instinct, and what
  should he do instead?`,
          text: "What is 'pressing' in hitting, and how does it lead to worse outcomes in high-leverage situations?",
          options: [
            "Pressing is trying too hard physically — a lighter grip pressure will fix it",
            "Pressing is abandoning approach discipline under pressure — expanding the zone, swinging at pitcher's pitches, and giving away the advantage of a good count",
            "Pressing only affects novice hitters — experienced players can press without consequence",
            "Pressing produces adrenaline which increases bat speed and actually helps most hitters in big moments",
          ],
          correctIndex: 1,
          explanation: "Pressing is what happens when anxiety overrides approach. 'I have to do something' is the internal voice of pressing — it leads a hitter to swing at balls out of the zone, chase chase pitches that end rallies, and produce weak contact on pitches they normally wouldn't touch. The solution is the opposite of pressing: heightened focus on approach. At 1-1 with bases loaded, the best approach is identical to 1-1 with the bases empty. Wait for your pitch. Trust your zone. The situation does not change what a ball or a strike looks like. Press-proofing comes from pre-at-bat routine, breathing, and the internal cue: 'My approach is my preparation.'",
        },
      ],
    },
  },

  // ─── baseball-4-05: Platoon Splits and Matchup Hitting ───────────────────────
  {
    epochId: "baseball-4",
    wonder: {
      name: "Dodger Stadium — Dugout and Lineup Card",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "⚖️",
    },
    id: "baseball-4-05",
    order: 5,
    title: "Platoon Splits and Matchup Hitting",
    subtitle: "L/R handedness, lineup construction, switch-hitting, and the Dodgers' platoon history",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-4-badge-05", name: "Matchup Master", emoji: "🔀" },
    challengeType: "quiz",
    info: {
      tagline: "The handedness matchup between pitcher and batter is the oldest strategic variable in baseball — and it still drives lineup decisions every single night.",
      year: 1955,
      overview: [
        "The platoon advantage is one of the most well-documented effects in baseball. Left-handed batters hit significantly better against right-handed pitchers — and vice versa — because the ball breaks away from a same-handed pitcher (which hitters find more difficult) versus toward the batter from an opposite-handed pitcher (which hitters find easier to pick up and track). The effect is large: a typical platoon split is 40–60 points of OPS advantage for the opposite-hand matchup.",
        "Major League managers have built lineup construction strategies around platoon advantages for over a century. The Dodgers under Dave Roberts have been particularly aggressive with platoon-based decisions: using specific hitters against certain-handed relievers, deploying platoon pairs at certain positions (where two hitters split playing time based on the opposing pitcher's handedness), and stacking left-handed hitters against right-handed starters to maximize the overall lineup advantage.",
        "Switch-hitting is the ultimate platoon solution — a switch-hitter can bat from either side of the plate, eliminating the handedness disadvantage entirely. True elite switch-hitters like Mickey Mantle, Pete Rose, Chipper Jones, and Dodger star Manny Ramirez (who was left-handed only but faced same-handed pitchers better than most) represent a rare skill set. The mechanics of switch-hitting require developing two complete, separate swing paths — a challenge that most hitters find takes years to develop effectively.",
      ],
      technical: {
        title: "The Platoon Effect — Why Handedness Matters Mechanically",
        body: [
          "The mechanical basis of the platoon advantage is pitch trajectory relative to the batter's eye line. Against an opposite-handed pitcher, the ball starts from the same side of the plate as the hitter's back shoulder and moves toward the hitter as it approaches the plate. This allows the hitter to track the ball with both eyes from the earliest possible point in its flight, maximizing the visual window for pitch recognition.",
          "Against a same-handed pitcher, the ball starts from the batter's front side and breaks across or away from them. The hitter must track the ball across their vision field, losing early read time and making breaking balls particularly difficult. A right-handed curveball breaking away from a right-handed batter is nearly impossible to hit with authority — the pitch begins in the batter's sightline but escapes late. This is why lefties hit better against righties: the same-handed breaking ball breaks toward the hitter rather than away.",
        ],
        codeExample: {
          label: "Platoon Splits — How the Dodgers Use Them",
          code: `  PLATOON ADVANTAGE (typical OPS splits):
  LHB vs. RHP: .750 OPS (favorable)
  LHB vs. LHP: .690 OPS (unfavorable)
  RHB vs. LHP: .745 OPS (favorable)
  RHB vs. RHP: .700 OPS (unfavorable)
  → ~50-60 points OPS gap = platoon advantage

  DODGERS' PLATOON HISTORY:
  2020–2024 roster management:
  → Platoon pairs at OF/DH positions
  → Left-heavy lineup vs. RHP starters (≥65%)
  → Switch-hitter sought at leadoff position
  → Bullpen management: lefty specialist vs. LHH

  SWITCH-HITTING MECHANICS:
  Right-handed swing (natural for most):
  → Same kinetic chain principles apply
  Left-handed swing (must be grooved separately):
  → Different hip rotation direction
  → Opposite contact-zone relationships
  → Requires 2+ years of dedicated development

  WHY FEW PLAYERS SWITCH-HIT SUCCESSFULLY:
  → Must develop two independent swing patterns
  → Breaking ball reads differ from each side
  → Most players plateau with weaker-side swing`,
        },
      },
      incident: {
        title: "The Dodgers' 2020 World Series — Platoon Management Wins a Title",
        when: "October 2020 — World Series vs. Tampa Bay Rays",
        where: "Globe Life Field, Arlington, Texas (neutral site)",
        impact: "The 2020 Dodgers' World Series run was defined by meticulous platoon management. Manager Dave Roberts made over 140 lineup adjustments during the playoff run based on handedness matchups, deploying Chris Taylor, AJ Pollock, and others strategically based on opposing pitcher handedness. The result was one of the most analytically precise postseason lineups in Dodger history.",
        body: [
          "In the 2020 bubble World Series, the Dodgers faced a Tampa Bay Rays team that itself was famous for aggressive pitching changes and platoon exploitation. Dave Roberts countered by treating every at-bat as a specific handedness matchup — pulling players mid-inning for platoon advantages, pinch-hitting against specific relievers, and adjusting his lineup card daily based on the Rays' projected bullpen deployment. The Dodgers' bench depth — built specifically for platoon flexibility — was a strategic weapon.",
          "The 2020 title validated the Dodgers' platoon philosophy. Their hitters' combined OPS in the World Series was .744 — significantly above their regular-season mark — partly because Roberts had engineered nearly every significant matchup to favor the Dodger hitter's handedness. In a seven-game series where four games were decided by one or two runs, the cumulative effect of 50-point platoon advantages in key at-bats was decisive.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Handedness Matchup", sub: "pitcher vs. batter side", type: "attacker" },
          { label: "Platoon Advantage", sub: "opposite hand = ball breaks toward batter", type: "system" },
          { label: "Lineup Construction", sub: "stack opposite-hand hitters vs. starters", type: "victim" },
          { label: "Postseason Edge", sub: "cumulative matchup advantage wins series", type: "result" },
        ],
      },
      timeline: [
        { year: 1955, event: "Brooklyn Dodgers' lineup construction uses early platoon logic — manager Alston stacks left-handed hitters vs. RHP", highlight: true },
        { year: 1980, event: "Platoon effect statistically quantified — first published OPS split data confirms the advantage" },
        { year: 2003, event: "Moneyball-era teams begin aggressive platoon pairs — Oakland A's pioneer split-based roster building" },
        { year: 2016, event: "Dave Roberts era begins — Dodgers become most aggressive platoon team in the NL" },
        { year: 2020, event: "Dodgers win World Series — platoon management cited as key tactical advantage", highlight: true },
        { year: 2024, event: "Dodgers use platoon data to deploy bench optimally in World Series championship run" },
      ],
      keyTakeaways: [
        "Opposite-handed matchups provide 50–60 points of OPS advantage — a massive effect that drives lineup decisions",
        "The mechanical basis: opposite-handed breaking balls break toward the batter, giving them a larger visual tracking window",
        "The Dodgers under Dave Roberts are among the most aggressive platoon-based lineup managers in baseball history",
        "Switch-hitting eliminates the platoon disadvantage but requires developing two complete, independent swing paths",
      ],
      references: [
        { title: "Fangraphs: Platoon Splits Data and Analysis", url: "https://www.fangraphs.com/leaders/splits-leaderboards" },
        { title: "Baseball Reference: Platoon Advantage History", url: "https://www.baseball-reference.com" },
        { title: "Dodgers: 2020 World Series Roster Construction", url: "https://www.mlb.com/dodgers/history" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-4-05-q1",
          type: "Platoon Advantage",
          challenge: `  A left-handed batter faces a right-handed
  pitcher whose primary out-pitch is a
  curveball that breaks down and away.

  Against a left-handed pitcher with the
  same curveball, the same batter struggles.

  Why does handedness change the difficulty
  of the same pitch type?`,
          text: "Why does a curveball from a right-handed pitcher behave more favorably for a left-handed batter than the same pitch from a left-handed pitcher?",
          options: [
            "Right-handed pitchers have less velocity on their curveballs, making it easier to hit",
            "From a right-handed pitcher, the curveball breaks toward the left-handed batter rather than away — making it easier to track and make contact with authority",
            "Handedness does not affect pitch difficulty — only location and velocity matter",
            "Left-handed batters always hit better because they are closer to first base after contact",
          ],
          correctIndex: 1,
          explanation: "Against a right-handed pitcher, the curveball thrown to a left-handed batter breaks toward the hitter — the ball starts outside and breaks in toward the plate. The left-handed batter can track this break with both eyes and drive it. Against a left-handed pitcher, the curveball breaks away from the left-handed batter — starting middle and fading away at the last moment, making contact much more difficult. The pitcher's arm determines which direction breaking balls move relative to the batter; the platoon advantage reflects which direction is easier to hit.",
        },
        {
          id: "baseball-4-05-q2",
          type: "Lineup Construction",
          challenge: `  The opposing starter is a right-handed
  pitcher. The Dodgers' manager must choose
  between two outfielders for the 5th spot
  in the lineup:

  Player A: LHB, .780 OPS vs. RHP, .710 vs. LHP
  Player B: RHB, .720 OPS vs. RHP, .770 vs. LHP

  Who starts, and what does the manager
  consider for the bullpen matchups later?`,
          text: "How should a manager use platoon split data to make lineup decisions against a right-handed starter while also planning for the bullpen?",
          options: [
            "Player B — career OPS is higher and that matters more than handedness splits",
            "Player A — his .780 vs. RHP is stronger for the starter matchup; the manager plans to switch to Player B if the Rays bring in a left-handed reliever in the 7th or 8th",
            "Either player — handedness splits at the 5th spot in the lineup have minimal impact on game outcomes",
            "Player A — left-handed hitters are always preferable regardless of the opposing pitcher's handedness",
          ],
          correctIndex: 1,
          explanation: "Player A starts because his .780 OPS vs. RHP is the best available option for the first 5–6 innings against a right-handed starter — a 60-point OPS advantage over Player B in that matchup. The manager also considers bullpen sequencing: if the opposing team deploys a left-handed reliever, Player A (.710 vs. LHP) becomes a liability and Player B (.770 vs. LHP) is the correct matchup. The Dodgers under Dave Roberts keep both players active and substitute based on bullpen deployment — using both their platoon advantages in the same game.",
        },
        {
          id: "baseball-4-05-q3",
          type: "Switch-Hitting",
          challenge: `  A 14-year-old right-handed hitter wants to
  learn to switch-hit because his coach says
  he will face many right-handed pitchers.

  His natural swing is excellent. His left-handed
  swing is weak and inconsistent.

  Should he become a switch-hitter?`,
          text: "What are the real tradeoffs a young hitter should consider before committing to developing a switch-hitting approach?",
          options: [
            "Yes — any switch-hitting advantage is worth the investment, even if the weak-side swing never becomes elite",
            "Yes, but only if he is willing to invest 2+ years of dedicated work to develop his left-handed swing to a comparable level — otherwise two mediocre swings are worse than one elite swing",
            "No — switch-hitting is a natural talent and cannot be developed by a primarily right-handed hitter",
            "Yes — coaches always prefer switch-hitters because they eliminate platoon decisions",
          ],
          correctIndex: 1,
          explanation: "The decision to become a switch-hitter requires honest assessment of commitment and timeline. A hitter with an excellent natural swing who develops a weak switch-hit swing ends up worse than staying right-handed — pitchers will simply pitch to his weak side consistently. True switch-hitting requires developing two independent, competitive swing paths: different hip rotation direction, different contact point relationships, different breaking ball reads. Most players who attempt it in their teens plateau with a weak weak-side swing that becomes a liability. Only commit if the player is willing to invest 2+ dedicated years of equal practice on the non-dominant side.",
        },
        {
          id: "baseball-4-05-q4",
          type: "Dodgers Platoon History",
          challenge: `  In the 2020 World Series, the Dodgers made
  dozens of mid-inning substitutions based on
  pitcher handedness. Some veteran players
  were pulled after facing one batter.

  Several players complained privately about
  reduced playing time due to platoon decisions.

  Was this approach justified statistically?`,
          text: "How do the statistical benefits of platoon management justify the roster and morale costs?",
          options: [
            "No — player morale and rhythm are more important than platoon matchup advantages",
            "Yes — a 50+ point OPS advantage per at-bat, across dozens of crucial postseason matchups, generates significantly more expected runs and wins than keeping a player comfortable",
            "The platoon advantage is too small to justify the roster complexity — it matters only over a 162-game season",
            "Yes, but only if the replacement hitter has demonstrated specific competence against left-handed pitching",
          ],
          correctIndex: 1,
          explanation: "The statistics are decisive. A 50-point OPS advantage in a single at-bat means the replacement hitter is expected to be 5–6% more productive than the starter in that matchup. In a World Series where every game was decided by 1–2 runs, the Dodgers engineered dozens of at-bats with this advantage. The cumulative expected run value of these decisions was calculated by their analytics team to be worth 3–4 additional runs over the series — potentially decisive. Player morale is a real consideration, but the Dodgers managed it through transparency and roster depth: every player knew the system and was compensated to be platoon-ready.",
        },
      ],
    },
  },

  // ─── baseball-4-06: Advanced Pitch Recognition Technology ────────────────────
  {
    epochId: "baseball-4",
    wonder: {
      name: "Camelback Ranch — Technology Lab",
      location: "Glendale, Arizona",
      era: "Modern",
      emoji: "🎮",
    },
    id: "baseball-4-06",
    order: 6,
    title: "Advanced Pitch Recognition Technology",
    subtitle: "Edgertronic cameras, Rapsodo, VR hitting simulators, and next-gen development",
    category: "sports",
    xp: 90,
    badge: { id: "baseball-4-badge-06", name: "Tech Scout", emoji: "🔬" },
    challengeType: "quiz",
    info: {
      tagline: "The future of hitting development is already here — and it is being built in the same Arizona practice facilities where pitchers learned to throw.",
      year: 2019,
      overview: [
        "The Edgertronic high-speed camera (capable of 2,000 frames per second, compared to broadcast video at 30fps) has transformed how teams study pitching and hitting mechanics. When an Edgertronic captures a pitcher's release at 2,000fps, every detail becomes visible: the exact finger position as the ball leaves the hand, the seam orientation at release, the spin axis, and the initial flight direction of every pitch. For hitters, studying this footage allows them to identify pitch-specific release cues that are invisible in real-time or broadcast video — effectively giving them a 'cheat code' for pitch recognition.",
        "Rapsodo technology (now standard in MLB systems and widely available at the college and advanced youth levels) measures ball flight data with radar and camera tracking: spin rate, spin axis, pitch velocity, break displacement, and release point. For pitchers, this data helps optimize pitch design. For hitters preparing to face specific pitchers, Rapsodo data allows preparation against a pitcher's exact spin characteristics — some teams now build VR pitch-recognition scenarios specifically tuned to opposing pitchers' Rapsodo profiles.",
        "Virtual reality hitting simulators — platforms like WIN Reality, Rapsodo VR, and MLB-licensed systems used by teams — present batters with immersive, first-person pitch-recognition scenarios. Early research on VR hitting training showed significant improvements in pitch recognition speed and accuracy after 20–30 session hours. Some MLB teams now use VR training to prepare hitters for specific pitchers' pitch mixes before a series, allowing them to 'face' the pitcher hundreds of times before the first real at-bat.",
      ],
      technical: {
        title: "How Edgertronic Cameras Change Pitch Recognition Preparation",
        body: [
          "Standard broadcast video (30fps) shows a pitch as a blur from release to contact. At 2,000fps, every rotation of the ball is visible — a four-seam fastball shows exactly four seams rotating end-over-end; a curveball shows the topspin rotation in slow motion; a slider's tilted gyroscopic spin is unmistakable. Hitters who study Edgertronic footage of specific pitchers develop a mental library of visual release cues that help them identify pitches earlier in the flight — before the tunnel point.",
          "The Dodgers' development team has built standardized Edgertronic libraries for every opposing pitcher in the NL West and NL playoffs, cataloguing each pitcher's release point, finger position, and seam orientation by pitch type. Before a series, hitters watch 10–15 minutes of Edgertronic slow-motion footage of the opposing starter's specific pitch grips and release points. When they step to the plate in the actual game, these visual patterns are pre-loaded and accessible — improving pitch recognition speed measurably.",
        ],
        codeExample: {
          label: "Next-Gen Pitch Recognition Training Stack",
          code: `  EDGERTRONIC CAMERA (2,000+ fps):
  → Capture pitcher's release at extreme slow motion
  → Identify: finger position, seam orientation,
    initial flight direction per pitch type
  → Build visual library per opposing pitcher
  → Hitter studies 10–15 min before each series

  RAPSODO TRACKING (Ball Flight Data):
  → Spin rate (RPM): FB 2200–2500, CB 2500–3000
  → Spin axis: determines break direction/amount
  → Release point: height and horizontal position
  → Use: match VR simulation to real pitcher data

  VR HITTING SIMULATORS (WIN Reality / MLB):
  → First-person immersive pitch recognition
  → Pitcher-specific pitch mixes loaded from data
  → Adjustable: velocity, location, spin rate
  → Research: 25–30 sessions → 15% faster
    pitch recognition vs. non-VR group
  → Limitation: no physical swing execution

  DODGERS INTEGRATION:
  Spring training: 3 sessions/week VR
  Regular season: pre-series VR against starter
  Postseason: full Edgertronic review protocol`,
        },
      },
      incident: {
        title: "The Dodgers' 2019 Technology Overhaul — Building the Modern Development Lab",
        when: "2019 — Camelback Ranch Technology Center Expansion",
        where: "Camelback Ranch Spring Training Facility, Glendale, Arizona",
        impact: "In 2019, the Dodgers completed a major technology infrastructure investment at their Camelback Ranch spring training facility, adding Edgertronic cameras at multiple angles in every batting cage and pitching mound, Rapsodo units on every mound and in each cage, and early VR hitting stations. The facility became one of the most technologically advanced player development centers in professional sports.",
        body: [
          "The 2019 Camelback Ranch expansion represented the Dodgers' commitment to integrating technology into every phase of player development. Edgertronic cameras were installed at home plate angles, behind the pitcher, and from the first-base dugout angle in each batting cage — giving coaches and players simultaneous multi-angle slow-motion analysis during every practice session. Coaches could pull up 2,000fps footage of a hitter's swing or a pitcher's release within seconds of each rep.",
          "The results were measurable: minor league players who trained in the Camelback Ranch technology program showed faster promotion timelines and higher Statcast performance rates at their first MLB promotion compared to pre-2019 cohorts. The Dodgers' minor league system, already among the most productive in baseball, became even more effective at translating practice performance to game results. The facility is now referenced as the standard against which other organizations' player development infrastructure is measured.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Edgertronic at 2,000fps", sub: "see release point / seam cues invisible at 30fps", type: "system" },
          { label: "Rapsodo Pitch Data", sub: "spin rate, axis, break mapped precisely", type: "attacker" },
          { label: "VR Simulator Training", sub: "face pitcher 100x before real at-bat", type: "victim" },
          { label: "Faster Pitch Recognition", sub: "pre-loaded visual library from practice", type: "result" },
        ],
      },
      timeline: [
        { year: 2010, event: "First Edgertronic cameras appear in MLB research labs — pitch mechanics studied at high speed" },
        { year: 2015, event: "Rapsodo becomes commercially available — spread from professional to college and advanced youth programs" },
        { year: 2017, event: "First VR pitch recognition platforms (WIN Reality) enter MLB development programs" },
        { year: 2019, event: "Dodgers complete Camelback Ranch technology overhaul — most advanced MLB development facility", highlight: true },
        { year: 2022, event: "VR hitting research published — 25-session VR protocol shows significant pitch recognition improvement" },
        { year: 2024, event: "Full Edgertronic and VR protocol credited in Dodgers' postseason preparation for World Series championship", highlight: true },
      ],
      keyTakeaways: [
        "Edgertronic cameras at 2,000fps reveal pitch-specific release cues invisible to the naked eye or broadcast video",
        "Rapsodo tracks spin rate, spin axis, and break precisely — allowing VR training tuned to specific opposing pitchers' real pitch profiles",
        "VR hitting simulators allow hitters to 'face' a specific pitcher hundreds of times before the first real game at-bat",
        "The Dodgers' Camelback Ranch technology infrastructure is among the most advanced in professional sports",
      ],
      references: [
        { title: "MLB: Edgertronic Camera Technology", url: "https://www.mlb.com/news/dodgers-technology-development" },
        { title: "Rapsodo Baseball: Product Overview", url: "https://rapsodo.com/baseball/" },
        { title: "WIN Reality: VR Hitting Training Research", url: "https://winreality.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-4-06-q1",
          type: "Edgertronic Technology",
          challenge: `  A Dodger prospect is preparing to face
  a starter who has a slider that batters
  consistently miss on.

  Watching broadcast video (30fps), the
  slider looks identical to a fastball.

  Watching Edgertronic footage (2,000fps),
  a visible difference appears.

  What is the Edgertronic footage most likely
  to reveal?`,
          text: "What pitch-identification information becomes visible in high-speed camera footage that is impossible to see at normal frame rates?",
          options: [
            "The pitcher's facial expression and body language as he decides which pitch to throw",
            "The exact seam orientation and spin axis of the pitch at release — allowing the hitter to identify the slider's tilted rotation pattern versus the fastball's backspin",
            "The catcher's sign before it is given to the pitcher",
            "The umpire's positioning that predicts which calls will be made",
          ],
          correctIndex: 1,
          explanation: "At 2,000fps, every rotation of the ball from release is visible in complete detail. A fastball shows clean backspin with seams rotating end-over-end; a slider shows a tilted gyroscopic spin — often appearing as a rotating dot or circle with a clear lateral tilt. At 30fps broadcast video, both pitches look like a spinning blur with no distinguishable seam pattern. The Edgertronic footage allows the hitter to build a visual mental model of the slider's specific seam pattern at release — so that when they see it in a real at-bat at 1/10th of a second, their trained brain can recognize the pattern faster than conscious processing allows.",
        },
        {
          id: "baseball-4-06-q2",
          type: "Rapsodo and Spin Rate",
          challenge: `  Rapsodo data shows an opposing starter's
  curveball has a spin rate of 2,800 RPM
  and a vertical break of -58 inches.

  Your curveball recognition has been trained
  against pitchers with 2,000–2,200 RPM
  and -40 inch break.

  How does this data change your preparation?`,
          text: "How does knowing an opposing pitcher's specific spin and break data improve a hitter's preparation compared to general curveball training?",
          options: [
            "It doesn't — a curveball is a curveball regardless of spin rate",
            "It allows the hitter to recalibrate their 'stay back' timing specifically for this pitcher's more extreme break — a -58 inch drop requires staying back significantly longer than a -40 inch curveball",
            "Higher spin rate means the curveball is easier to identify — more spin is more visible",
            "The data is only useful for pitchers, not hitters — break information doesn't affect hitting preparation",
          ],
          correctIndex: 1,
          explanation: "A -58 inch curveball drops 18 inches more than the -40 inch one you have trained against. This means the pitch appears to start at approximately the same spot but falls nearly a foot and a half lower at the plate. Your trained 'stay back' threshold — calibrated for a less extreme curveball — will cause you to fire too early on this pitcher's curve because you won't expect the ball to keep dropping as long. Rapsodo data allows you to specifically retrain your timing threshold for this pitcher's extreme drop before the first real at-bat. VR systems can load his exact spin parameters for practice.",
        },
        {
          id: "baseball-4-06-q3",
          type: "VR Training",
          challenge: `  Research shows 25–30 sessions of VR
  pitch recognition training improves
  recognition speed by ~15% on average.

  A youth coach asks: "Should we replace
  live batting practice with VR training?"

  What is the appropriate answer?`,
          text: "How should VR pitch recognition training complement rather than replace traditional live hitting practice?",
          options: [
            "Yes — VR provides more reps per session and better pitch tracking data than live BP",
            "No — VR should supplement live BP, not replace it; VR builds cognitive pitch recognition but cannot train the physical timing and swing mechanics that only live pitch execution provides",
            "No — VR technology is too expensive and inaccurate at the youth level",
            "Yes, but only for players who already have strong mechanics — VR is wasted on beginners",
          ],
          correctIndex: 1,
          explanation: "VR pitch recognition trains the cognitive component of hitting — identifying pitch type, location, and timing before the swing decision. It does not train the physical execution: the kinetic chain, timing from a real delivery, contact feel, and two-strike mechanical adjustments all require actual swings against actual pitches. The correct model is supplementary: VR builds the pitch recognition library that live BP cannot efficiently provide at volume, while live BP and tee work build the physical execution. A hitter who does both develops faster than one who does either alone. VR cannot replace the irreplaceable feel of bat meeting ball.",
        },
        {
          id: "baseball-4-06-q4",
          type: "Technology Integration",
          challenge: `  A minor leaguer has just been called up
  to face a starter he has never seen.
  The team's technology staff offers him
  three preparation options for tomorrow:

  A) 20 min Edgertronic review of the
     starter's pitch release points
  B) 1 hour VR session against his exact
     pitch mix (loaded from Rapsodo data)
  C) Traditional 30-min batting practice
     against a pitching machine

  If he can only choose one, which provides
  the most at-bat-ready preparation?`,
          text: "Which technology-based preparation tool provides the most direct at-bat-ready benefit for a hitter facing an unfamiliar pitcher for the first time?",
          options: [
            "Option C — traditional batting practice keeps mechanics sharp and is always the best preparation",
            "Option A — release point and seam cues are the most actionable first-pitch preparation",
            "Option B — VR training against the pitcher's exact pitch mix provides the most complete cognitive and timing preparation for this specific matchup",
            "All three are equally valuable — the hitter should split his time evenly",
          ],
          correctIndex: 2,
          explanation: "Option B provides the most complete matchup-specific preparation. When the VR system is loaded with the pitcher's actual Rapsodo data — his exact velocity, spin rate, spin axis, and break on each pitch — the hitter is effectively facing a digital clone of the pitcher. After an hour of VR at-bats against this specific pitch mix, the hitter's pitch recognition system is pre-loaded with the pitcher's individual patterns. Option A (Edgertronic) provides the release cues but no timing practice. Option C (machine) provides timing and mechanics but no matchup-specific preparation. Option B delivers both pitch-specific recognition and timing in one session.",
        },
      ],
    },
  },

  // ─── baseball-4-07: Position-Specific Hitting Expectations ──────────────────
  {
    epochId: "baseball-4",
    wonder: {
      name: "Dodger Stadium — All Positions on the Diamond",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "🗺️",
    },
    id: "baseball-4-07",
    order: 7,
    title: "Position-Specific Hitting Expectations",
    subtitle: "Why catchers hit .240 and it's fine, positional offensive roles, DH strategy, and Dodger evaluation",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-4-badge-07", name: "Position IQ", emoji: "📍" },
    challengeType: "quiz",
    info: {
      tagline: "A .240 batting average from your catcher and a .240 batting average from your first baseman represent completely different levels of offensive value — context is everything.",
      year: 1992,
      overview: [
        "Not all positions are equal in their offensive requirements. The defensive demands at each position create a trade-off: the more difficult and demanding the defensive position, the lower the offensive bar the player needs to clear to still be considered a valuable roster contributor. This principle is formalized in baseball analytics as positional adjustment — a numerical weight added to or subtracted from a player's offensive stats when calculating their overall value (WAR).",
        "The spectrum runs from catcher (highest defensive demand, lowest offensive expectation) to first baseman and designated hitter (lowest or no defensive demand, highest offensive requirement). A catcher who hits .240 with 15 home runs is often considered a strong offensive contributor at the position because catchers who can hit with authority at all are rare. A first baseman who hits .240 with 15 home runs is generally below the positional offensive standard — teams expect significantly more production from a position with no defensive premium.",
        "The Dodgers evaluate position-specific offense as a core component of roster construction. Their analytical models apply different wRC+ (weighted runs created plus, a park-adjusted offensive metric scaled to 100 = league average) baselines for each position. A catcher at 90 wRC+ is productive; a first baseman at 90 wRC+ is a liability. A shortstop at 100 wRC+ is exceptional; a DH at 100 wRC+ is barely average. Understanding this framework allows teams to build better rosters and hitters to contextualize their own production realistically.",
      ],
      technical: {
        title: "Positional Offensive Baselines — The Dodger Framework",
        body: [
          "The positional offensive baselines used in modern analytics reflect the historical average production at each position, adjusted for the defensive value the player contributes. Catcher is the most physically demanding defensive position — it requires blocking, framing, throwing, and absorbing impacts for nine innings. Catchers who can also hit, like Mike Piazza (.308 average, 427 career HR), are among the rarest and most valuable players in baseball history precisely because combining elite defense at catcher with elite offense is so difficult.",
          "DH strategy is the opposite extreme. In the American League and now National League, the designated hitter bats in place of the pitcher with no defensive responsibility. Teams typically deploy their best pure hitter in the DH role, and offensive expectations at DH are the highest of any position. Shohei Ohtani's 2024 season — 54 HR as a Dodger DH (while recovering from Tommy John surgery as a pitcher) — represents the apex of what DH production can look like. When the Dodgers assign a player to DH, they are expecting elite offensive production with zero defensive contribution.",
        ],
        codeExample: {
          label: "Positional Offensive Baselines — wRC+ Targets",
          code: `  POSITION        wRC+ TARGET   NOTES
  ─────────────────────────────────────────
  Catcher (C)     85–95         Defense is premium
  Shortstop (SS)  90–100        Premium defense + range
  Center Field    95–105        Speed + defense valued
  Second Base     95–105        Turning DPs is key
  Third Base      100–110       Corner infield = more offense
  Left/Right OF   105–115       Bat-first positions
  First Base (1B) 110–120       Must produce significantly
  DH              115–125       No defensive credit — pure bat

  wRC+ SCALE:
  100 = League average by definition
  110 = Above average (positive contributor)
  120 = All-Star caliber at most positions
  140+ = MVP-level offensive production

  DODGER EXAMPLES (2024):
  Freddie Freeman (1B): ~148 wRC+ — far above bar
  Will Smith (C): ~110 wRC+ — excellent for position
  Shohei Ohtani (DH): ~160+ wRC+ — historically elite`,
        },
      },
      incident: {
        title: "Mike Piazza — The Greatest Offensive Catcher in History",
        when: "1992–2004 — Mike Piazza with the Dodgers and Mets",
        where: "Dodger Stadium, Los Angeles, California",
        impact: "Mike Piazza was drafted by the Dodgers in the 62nd round of the 1988 draft as a favor to his father — the last pick of the draft essentially. He became the greatest offensive catcher in baseball history: a .308 career batting average, 427 career home runs, and an OPS of .922 — numbers that would make him an elite first baseman or left fielder. From the catcher position, they are incomprehensible.",
        body: [
          "The positional context of Piazza's offense is staggering. While playing one of baseball's most physically demanding defensive positions — crouching behind the plate for 120+ games per season — he maintained the offensive production of the game's best power hitters. His rookie season in 1993 (.318 BA, 35 HR, 112 RBI) immediately established him as the best offensive catcher the game had seen since Roy Campanella's Brooklyn Dodgers era.",
          "Piazza's swing was perfectly designed for his strengths: a right-handed pull hitter with exceptional bat speed, he attacked inner-half fastballs with authority and drove them to the left side with a high exit velocity. His approach was not subtle — he was a fastball hunter who accepted strikeouts in exchange for devastating contact quality when he got the pitch he was looking for. His Statcast profile, retroactively modeled by analytics researchers, suggests he would have had barrel rates above 18% in the modern era — elite for any position.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Defensive Demand", sub: "C, SS, CF most demanding", type: "attacker" },
          { label: "Offensive Trade-off", sub: "lower bar for harder positions", type: "system" },
          { label: "wRC+ vs. Positional Baseline", sub: "same number, different meaning by position", type: "victim" },
          { label: "Roster Construction", sub: "Dodgers balance D and O across all positions", type: "result" },
        ],
      },
      timeline: [
        { year: 1955, event: "Roy Campanella wins NL MVP — Dodger catcher establishes that catchers can be offensive forces" },
        { year: 1992, event: "Mike Piazza makes his Dodger debut — begins the greatest offensive catcher career in history", highlight: true },
        { year: 2003, event: "Moneyball era reframes positional offensive baselines — wRC+ becomes standard comparison" },
        { year: 2017, event: "Designated hitter comes to the NL in interleague games — DH offensive bar formalized" },
        { year: 2022, event: "DH adopted permanently in the NL — changes roster construction and position-specific strategy league-wide" },
        { year: 2024, event: "Ohtani at DH hits 54 HR — redefines what is possible from the designated hitter position", highlight: true },
      ],
      keyTakeaways: [
        "A catcher who hits .240 with moderate power can be an excellent offensive contributor — positional context is everything",
        "wRC+ baselines vary by position: a 90 wRC+ is excellent for catcher; a 90 wRC+ is a liability at first base or DH",
        "Mike Piazza's career is the clearest example of how a player can redefine offensive expectations at the most demanding defensive position",
        "The Dodgers evaluate every hitter against their position's offensive baseline — not against a universal hitting standard",
      ],
      references: [
        { title: "Baseball Hall of Fame: Mike Piazza", url: "https://baseballhall.org/hall-of-famers/piazza-mike" },
        { title: "Fangraphs: Positional Adjustments in WAR", url: "https://www.fangraphs.com/library/misc/war/" },
        { title: "Baseball Reference: Positional Stats and Baselines", url: "https://www.baseball-reference.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-4-07-q1",
          type: "Positional Context",
          challenge: `  Two hitters both have a .255 batting average
  and 18 home runs:

  Player A is a catcher.
  Player B is a first baseman.

  A GM says: "Player A is performing excellently
  at his position. Player B needs to do better."

  Is the GM's assessment correct?`,
          text: "Why does the same offensive output have different implications depending on the defensive position played?",
          options: [
            "No — hitting statistics should be judged the same regardless of position",
            "Yes — positional offensive baselines reflect the defensive value each position contributes; catchers get credit for what they sacrifice defensively to produce offense",
            "No — first basemen and catchers face the same pitchers, so the hitting challenge is identical",
            "Yes, but only because catchers play fewer games due to injury risk, making per-game comparisons unfair",
          ],
          correctIndex: 1,
          explanation: "The GM is entirely correct. A catcher playing 120+ games while handling the most physically demanding defensive position in baseball and hitting .255 with 18 HR is contributing significant overall value — roughly equivalent to a shortstop hitting .270 with 20 HR. A first baseman has no defensive premium — his only job relative to offense is to hit. At .255 with 18 HR, a first baseman is below the positional offensive standard that justifies a lineup spot at 1B. Positional adjustment is how analytics captures this reality in WAR calculations.",
        },
        {
          id: "baseball-4-07-q2",
          type: "DH Strategy",
          challenge: `  The Dodgers have three hitters available
  for one roster spot:
  - A catcher with .710 OPS (strong for position)
  - A left fielder with .760 OPS (average for OF)
  - A DH-only player with .810 OPS

  The roster already has 1 catcher and 3 outfielders.
  They need one more bat.

  Which player provides the most incremental value?`,
          text: "How does positional flexibility affect the roster value of a player with DH-only offensive skills?",
          options: [
            "The DH-only player — his .810 OPS is the highest and the team can use him daily in the DH spot",
            "The catcher — positional scarcity makes even a backup catcher more roster-flexible",
            "The left fielder — positional flexibility to play defense makes him more valuable than a DH-only player",
            "The DH-only player, but only if his .810 OPS consists primarily of home runs rather than walks",
          ],
          correctIndex: 2,
          explanation: "The left fielder provides more roster value because positional flexibility is itself a strategic asset. A DH-only player fills exactly one spot in the lineup and provides no defensive optionality — if an outfielder is injured, the DH cannot cover that position. The left fielder at .760 OPS can also DH, cover outfield injuries, and be deployed in platoon situations. In a 26-man roster where every spot counts, the player who can play defense AND hit at a high level beats the pure DH in lineup flexibility value. The Dodgers specifically prize defensive versatility in their non-star roster spots.",
        },
        {
          id: "baseball-4-07-q3",
          type: "Catcher Offense",
          challenge: `  You are explaining to a youth player why
  their catcher — who hits .235 — should
  not be worried about his batting average.

  The coach of the opposing team says catchers
  should hit at least .270 to justify their spot.

  How do you explain positional offensive context?`,
          text: "How should youth coaches contextualize hitting expectations for catchers relative to other positions?",
          options: [
            "The opposing coach is correct — all positions should have the same hitting standard",
            "A .235 average from a catcher who calls a good game, blocks well, and throws well is entirely reasonable — the defensive value allows for a lower offensive bar than other positions",
            "Catchers should never bat lower than .250 regardless of defensive ability",
            "Hitting expectations are the same at every level — positional adjustments only apply to professional baseball",
          ],
          correctIndex: 1,
          explanation: "Positional offensive context applies at every level of baseball, from youth leagues to the majors. A catcher who calls pitches intelligently, blocks balls in the dirt, and controls the running game is contributing defensive value that a first baseman, outfielder, or DH simply does not provide. The hitting bar for a catcher is lower because the total value equation includes a large defensive premium. At the youth level, a catcher who works hard defensively and hits .235 is often more valuable than a first baseman who hits .280 but provides no other contribution. Teach players to think in total value, not just batting average.",
        },
        {
          id: "baseball-4-07-q4",
          type: "Shortstop Offensive Value",
          challenge: `  Two shortstops are available to the Dodgers:
  SS-A: Gold Glove defender, .095 wRC+ above average
  SS-B: Average defender, .125 wRC+ above average

  The team's analytics model gives SS-A +4.2 WAR
  and SS-B +4.0 WAR despite SS-B's higher offense.

  How does the defensive premium for shortstop
  explain this WAR gap?`,
          text: "Why can a Gold Glove shortstop have higher overall value (WAR) than a shortstop who hits significantly better?",
          options: [
            "WAR is calculated incorrectly — offensive value should always dominate",
            "The defensive premium for shortstop is large enough that elite defense at the position outweighs a 30-point wRC+ offensive gap — defense at the most demanding infield position is worth multiple runs per season",
            "The WAR models are biased toward defense and cannot be trusted",
            "They are essentially equal — a 0.2 WAR difference is within the margin of error",
          ],
          correctIndex: 1,
          explanation: "Shortstop is the most defensively demanding infield position — covering the widest range of any infielder, turning double plays, handling difficult angle throws, and making dozens of tough plays per season. A Gold Glove shortstop saves 15–20 runs per season defensively compared to an average shortstop. In WAR, each 10 additional runs is worth approximately 1 WAR. The Gold Glove SS-A saves enough defensive runs to overcome the 30-point wRC+ offensive gap. This is exactly why teams prize elite shortstop defense so highly — it is the most run-valuable defensive position on the field.",
        },
      ],
    },
  },

  // ─── baseball-4-08: Coaching the Swing ──────────────────────────────────────
  {
    epochId: "baseball-4",
    wonder: {
      name: "Camelback Ranch — Dodgers Spring Training Batting Cages",
      location: "Glendale, Arizona",
      era: "Modern",
      emoji: "🎓",
    },
    id: "baseball-4-08",
    order: 8,
    title: "Coaching the Swing",
    subtitle: "Youth instruction philosophy, what to correct vs. leave alone, Dodgers player development, and the Charlie Lau vs. Ted Williams debate",
    category: "sports",
    xp: 90,
    badge: { id: "baseball-4-badge-08", name: "Hitting Coach", emoji: "📝" },
    challengeType: "quiz",
    info: {
      tagline: "The hardest thing about coaching hitting is knowing what not to say — fixing the wrong thing at the wrong time can set a hitter back months.",
      year: 1980,
      overview: [
        "Coaching hitting is an art form with a deep philosophical divide. The two dominant schools of thought — represented historically by Ted Williams and Charlie Lau — offer fundamentally different frameworks for what the swing should do and how to teach it. Williams, the greatest pure hitter of his era (.406 in 1941), believed in an upswing plane, attacking the inner half, and zone management based on pitch location relative to where a hitter can drive the ball best. Lau, the coaching innovator who transformed George Brett and later worked with many professional hitters, emphasized weight transfer to the front foot, extending through the ball toward the pitcher, and a one-hand finish on the follow-through.",
        "Modern hitting instruction has largely integrated both schools while adding Statcast evidence. The current consensus: Williams was right about swing plane (match the pitch's downward angle with a slight upswing, not a chop down), and Lau was right about weight transfer (full commitment to the front side through the contact zone) and extension (full arm extension through the ball). The debate is less about right versus wrong and more about which aspects of each approach help specific hitters with specific problems.",
        "The Dodgers' player development philosophy under hitting coordinators like Robert Van Scoyoc and Rachel Balkovec (who worked with their minor league system) is evidence-based: each hitter's Statcast data informs what to prioritize in practice sessions, mechanical changes are made incrementally rather than wholesale, and the goal is always improving contact quality metrics rather than imposing a specific visual style on the swing. This approach has helped the Dodgers develop or maximize hitters across a wider range of body types and swing styles than any previous era.",
      ],
      technical: {
        title: "What to Correct vs. What to Leave Alone — The Most Important Coaching Skill",
        body: [
          "The most dangerous mistake a youth hitting coach can make is identifying a swing quirk that is actually helping the hitter and correcting it away. Mel Ott, who hit 511 career home runs, had a dramatic high leg kick that every conventional coach would have tried to fix. Hank Aaron's early swing had a severe hitch in his load that conventional mechanics teaching would have removed. Both quirks were idiosyncratic but functional — they were repeatable, consistent, and part of what made those hitters great.",
          "The framework for deciding what to correct: (1) Is the quirk consistent — does the hitter do it the same way every swing? If yes, it may be harmless even if it looks unconventional. (2) Is the quirk causing an identifiable problem with results — late on fastballs, weak contact on outside pitches, consistent pop-ups? If yes, it may need correction. (3) Can the hitter make the correction without losing what makes their swing work? Sometimes a 'fix' breaks a working system. The Dodgers' approach: use Statcast data to identify contact quality issues, trace back to mechanical causes, and make the minimum necessary change.",
        ],
        codeExample: {
          label: "Charlie Lau vs. Ted Williams — Two Schools of Hitting",
          code: `  CHARLIE LAU (1970s–80s, coached George Brett):
  Philosophy:
  → Weight transfers fully to front foot at contact
  → One-hand follow-through (top hand releases)
  → Extend toward the pitcher through the ball
  → Head stays still — "see the contact"
  Famous students: George Brett (.390 in 1980)

  TED WILLIAMS (Science of Hitting, 1971):
  Philosophy:
  → Slight upswing plane — match pitch angle
  → Hips lead the hands — rotation, not shift
  → Zone management: .400 zone vs. .230 zone
  → Keep both hands through contact — full swing
  Famous students: Tony Gwynn, cited Williams directly

  MODERN SYNTHESIS (Statcast era):
  → Williams correct: match pitch angle (not chop down)
  → Lau correct: full extension through ball
  → Statcast adds: barrel%, launch angle, exit velocity
  → Result: player-specific optimization, not one-size

  DODGERS' APPROACH:
  → Data-first: what does contact quality tell us?
  → Minimum change principle: fix the problem, not the style
  → Preserve what works even if it looks unconventional`,
        },
      },
      incident: {
        title: "Robert Van Scoyoc and Mookie Betts — Dodger Hitting Philosophy in Action",
        when: "2020–2024 — Mookie Betts with the Dodgers",
        where: "Dodger Stadium and Camelback Ranch, Arizona",
        impact: "When hitting coordinator Robert Van Scoyoc began working with Mookie Betts after the 2020 trade to Los Angeles, he made a deliberate choice to change as little as possible about Betts' mechanics while focusing on pitch recognition patterns and approach optimization. The result: Betts won a World Series in 2020 and evolved into the most complete offensive player the Dodgers had fielded in a generation.",
        body: [
          "Van Scoyoc's approach with Betts exemplifies the Dodger player development philosophy: he studied Betts' Statcast data extensively, identified that Betts' contact quality was already elite, and concluded that the goal was not to fix the swing but to optimize the situations in which Betts' elite contact quality was expressed. This meant working on pitch recognition — helping Betts identify sliders earlier, specifically from pitchers he had historically struggled with — and refining his two-strike approach to protect the plate without compromising his first-pitch aggressiveness.",
          "The minimum-change principle was deliberately applied. Van Scoyoc identified one mechanical adjustment in Betts' two-strike setup — a slight hand drift — and corrected it through targeted tee work. Everything else was left intact. Betts' seasons from 2020 to 2024 showed steady improvement in contact quality metrics despite the very small scope of mechanical change. The lesson: great hitters often need their approach and pitch recognition improved more than their swing mechanics, and a good coach knows the difference.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Identify the Problem", sub: "what does Statcast data show about contact quality?", type: "attacker" },
          { label: "Trace to Mechanical Cause", sub: "what swing element produces the measurable problem?", type: "system" },
          { label: "Minimum Necessary Change", sub: "fix the problem, preserve what works", type: "victim" },
          { label: "Validate with Data", sub: "confirm contact quality improvement post-change", type: "result" },
        ],
      },
      timeline: [
        { year: 1971, event: "Ted Williams publishes 'The Science of Hitting' — most influential hitting book of the 20th century", highlight: true },
        { year: 1980, event: "George Brett hits .390 under Charlie Lau's instruction — validates weight-transfer philosophy" },
        { year: 1994, event: "Tony Gwynn cites Williams as primary influence — the two schools are not mutually exclusive" },
        { year: 2015, event: "Statcast begins providing objective evidence for which mechanical approaches produce better outcomes" },
        { year: 2020, event: "Robert Van Scoyoc's approach with Betts establishes Dodger minimum-change development philosophy" },
        { year: 2024, event: "Dodgers' development staff credited with optimizing 6+ hitters to career-best Statcast contact quality", highlight: true },
      ],
      keyTakeaways: [
        "Charlie Lau and Ted Williams represent different but complementary approaches — modern coaching integrates both",
        "The most dangerous coaching mistake is correcting a quirk that is actually working — consistency matters more than visual convention",
        "The Dodgers' minimum-change principle: use data to identify the problem, trace it to the root mechanical cause, make the smallest possible change",
        "Great hitters often need approach and pitch recognition improved more than swing mechanics — good coaches know the difference",
      ],
      references: [
        { title: "Ted Williams: The Science of Hitting (1971)", url: "https://www.amazon.com/Science-Hitting-Ted-Williams/dp/0671621033" },
        { title: "Dodgers: Player Development Philosophy", url: "https://www.mlb.com/dodgers/minor-league" },
        { title: "Fangraphs: Hitting Instruction and Statcast", url: "https://www.fangraphs.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-4-08-q1",
          type: "What to Correct",
          challenge: `  A 13-year-old hitter has an unusual habit
  of holding the bat at a 70-degree angle
  instead of the conventional 45 degrees.
  Her contact rate is excellent. Exit velocity
  is above average. She rarely strikes out.

  Her new coach wants to "fix" the bat angle.

  Should he?`,
          text: "How should a coach evaluate an unconventional mechanical quirk before deciding whether to change it?",
          options: [
            "Yes — conventional bat angle produces better mechanics and should be standardized",
            "No — if the quirk is consistent and producing excellent contact quality results, it is not a problem to fix; changing a working system risks breaking what makes the hitter effective",
            "Yes — unconventional mechanics may work now but will cause problems at higher levels",
            "Only if the bat angle is causing specific pitch location weaknesses identifiable through data",
          ],
          correctIndex: 1,
          explanation: "If a hitter has excellent contact rate, above-average exit velocity, and low strikeout rate, their mechanics are working — whatever they look like. The bat angle is unconventional but not causing any measurable problem. Fixing it risks disrupting the feel, timing, and neural patterns that produce the excellent results. The question for any mechanical change is never 'does it look right?' but 'is it causing a measurable problem?' When the answer is no, the coach should leave it alone. This is the hardest lesson for coaches to learn: restraint is often better instruction than correction.",
        },
        {
          id: "baseball-4-08-q2",
          type: "Williams vs. Lau",
          challenge: `  A youth hitter is being told two different
  things by two coaches:
  Coach A: "Swing down on the ball — stay level."
  Coach B: "Match the pitch's angle — slight upswing."

  Statcast research supports one of these.
  Which one, and why?`,
          text: "What does Statcast research show about swing plane and the 'swing down' vs. 'match the angle' debate?",
          options: [
            "Coach A — swinging down produces backspin which creates more carry on fly balls",
            "Coach B — Statcast data shows that matching the pitch's downward angle with a slight upswing creates the largest contact window and produces the highest rates of optimal launch angle contact",
            "Both coaches are correct — the optimal approach depends on the hitter's natural mechanics",
            "Coach A — a level swing is always more consistent than any angled approach",
          ],
          correctIndex: 1,
          explanation: "Statcast data definitively supports Coach B. Pitches travel on a downward angle (typically 5–8 degrees) from release to contact. A swing that matches that downward angle with a slight upswing (attack angle of +5 to +10 degrees) creates the maximum overlap between bat path and pitch path — the largest possible contact window for a given reaction time. A downward or flat swing intersects the pitch trajectory at exactly one point; an angle-matched upswing maintains contact overlap for several inches of the swing path. The old 'swing down' instruction produced ground balls, not backspin drives. Modern instruction — validated by Statcast — matches the plane.",
        },
        {
          id: "baseball-4-08-q3",
          type: "Minimum Change Principle",
          challenge: `  A hitter has a 12% barrel rate but his
  Statcast data shows poor exit velocity
  on inner-half pitches specifically.
  All other zones are excellent.

  His hitting coach recommends a complete
  mechanical overhaul. The Dodger approach
  would suggest something different.

  What should be done?`,
          text: "How does the minimum-change principle guide hitting instruction when data identifies a specific zone weakness?",
          options: [
            "Complete the mechanical overhaul — a data-identified problem requires comprehensive correction",
            "Identify the specific mechanical element causing the inner-half weakness (likely early hip commitment or casting), correct only that element through targeted tee work, and validate the fix with subsequent Statcast data",
            "Focus on increasing overall barrel rate through power development — zone-specific weaknesses are secondary",
            "Move the hitter to a different spot in the lineup where inner-half pitches are less likely",
          ],
          correctIndex: 1,
          explanation: "A 12% barrel rate is already elite. A complete mechanical overhaul risks breaking the 88% of the swing that is working. The Dodgers' approach: trace the inner-half exit velocity problem to its specific mechanical cause. Inner-half weakness typically comes from one or two identifiable issues — late hip rotation on inside pitches, hand path that produces a long swing to the inner half, or incorrect contact point (too deep for inside pitches). Fix that one or two elements through specific inner-half tee work. Recheck Statcast after two weeks to confirm improvement. If the fix works without degrading other zones, it was the right call.",
        },
        {
          id: "baseball-4-08-q4",
          type: "Youth Instruction Philosophy",
          challenge: `  You are coaching a 10-year-old Little League
  team. A parent approaches you and asks
  you to teach their child Shohei Ohtani's
  leg kick to help them hit more home runs.

  How do you respond?`,
          text: "How should youth hitting coaches approach the desire to replicate professional mechanics in young, developing players?",
          options: [
            "Teach the leg kick — if it works for Ohtani, it will help any player",
            "Explain that complex triggers like Ohtani's leg kick require exceptional timing that takes years to develop; start with simple, consistent mechanics and build complexity only when fundamentals are solid",
            "Refuse and explain that youth players should never try to mimic professional mechanics",
            "Teach a modified version of the leg kick — a smaller kick that approximates the timing benefit without the full movement",
          ],
          correctIndex: 1,
          explanation: "Ohtani's leg kick is the product of decades of training that built the neuromuscular precision to time a dramatic pre-swing movement consistently against 95-mph pitching. A 10-year-old attempting to replicate it without that foundation will develop timing inconsistencies that hurt their development for years. Youth instruction should prioritize fundamentals — balanced stance, consistent trigger, hip rotation, hands inside the ball — and add complexity only when those foundations are reliable. The goal at age 10 is not to look like Ohtani; it is to develop the athletic foundation from which any style can emerge with time. Teach the principle (timing and loading), not the appearance (dramatic leg kick).",
        },
      ],
    },
  },

  // ─── baseball-4-09: The Greatest Dodger Hitters — Technical Breakdown ────────
  {
    epochId: "baseball-4",
    wonder: {
      name: "Cooperstown Hall of Fame — Dodger Wing",
      location: "Cooperstown, New York",
      era: "Historic",
      emoji: "🏛️",
    },
    id: "baseball-4-09",
    order: 9,
    title: "The Greatest Dodger Hitters — Technical Breakdown",
    subtitle: "Jackie Robinson, Duke Snider, Mike Piazza, Adrian Beltre, Manny Ramirez, Corey Seager, and Mookie Betts",
    category: "sports",
    xp: 95,
    badge: { id: "baseball-4-badge-09", name: "Dodger Legacy", emoji: "💙" },
    challengeType: "quiz",
    info: {
      tagline: "Every great Dodger hitter teaches a different lesson about the craft — and the full curriculum spans nearly 80 years of baseball's evolution.",
      year: 1947,
      overview: [
        "The Dodger franchise has produced some of the most technically instructive hitters in baseball history — each embodying a different principle of hitting mastery. Jackie Robinson (1947–1956) was the complete hitter: bat control, discipline, situational awareness, bunting, slapping, driving — all from a position of unimaginable external pressure. Duke Snider was the archetypal left-handed pull power hitter, with a short load and explosive hip rotation that produced four home runs in two different World Series. Mike Piazza was the right-handed pull power specialist whose elevated bat speed and upper-cut plane against fastballs made him the greatest offensive catcher in history.",
        "Adrian Beltre (1998–2004 with the Dodgers) was the anomaly — a right-handed hitter who could generate power on pitches below his knees through extraordinary hip flexibility. Manny Ramirez, a Dodger from 2008 to 2010, was one of the greatest pure hitters of his generation: exceptional bat speed, elite pitch recognition, and an unhurried approach that made him seem like he was taking batting practice even in high-leverage at-bats. Corey Seager's career arc with the Dodgers showed the modern launch angle evolution — from a left-handed contact hitter to an elite power force through conscious approach changes supported by Statcast data.",
        "Mookie Betts represents the synthesis of modern hitting: contact quality, bat speed, approach discipline, and defensive excellence that makes him the most complete player the franchise has had since Jackie Robinson. His ability to hit the ball hard to all fields at an elite exit velocity, combined with a toe-tap trigger that is among the most studied and taught in modern coaching, makes his swing one of the most instructive in contemporary baseball.",
      ],
      technical: {
        title: "The Technical Signature of Each Great Dodger Hitter",
        body: [
          "Jackie Robinson's signature was bat control through his entire career: the ability to make contact on any pitch in the zone, redirect the ball to where the defense was not, and bunt for hits when the situation called for it. His short, quick stroke was the mechanical foundation — minimal movement from load to contact, maximum efficiency through the contact zone. Robinson never had elite power numbers, but his combination of contact quality, plate discipline, and situational intelligence produced a career that modern analytics would score as among the best in franchise history per plate appearance.",
          "Corey Seager's evolution is the most explicitly documented case of a launch angle approach change in Dodger history. His first three seasons (2016–2018) showed a contact-oriented swing producing singles and doubles. After working with the Dodger analytics staff to consciously raise his launch angle — specifically attacking inner-half pitches earlier and driving them in the air — his home run totals jumped from 22 to 30, and then (after his Texas Rangers years) to 33. The approach change was data-driven and deliberate: Seager's exit velocity was already elite; changing where the ball went rather than how hard it was hit transformed his production.",
        ],
        codeExample: {
          label: "Greatest Dodger Hitters — Technical Signatures",
          code: `  JACKIE ROBINSON (.311, 137 HR, 1947–56):
  → Short, efficient stroke — max bat control
  → High walk rate — disciplined, patient approach
  → Bunting and slap technique: versatile
  Lesson: Complete hitting = contact + discipline

  DUKE SNIDER (.295, 407 HR, 1947–62):
  → Left-handed pull power: short load, hip explosion
  → .300+ seasons alongside 40-HR power
  → 4 WS HRs in 1952 and 1955
  Lesson: Pull power = early contact + hip rotation

  MIKE PIAZZA (.308, 427 HR career):
  → Right-handed uppercut vs. fastballs
  → Bat speed above 76 mph (modern estimate)
  → Inner-half fastball destruction: .360+ contact
  Lesson: Position-defying power from the catcher spot

  ADRIAN BELTRE (.275, 477 HR career):
  → Low-ball power: hip flexibility = off-zone power
  → Aggressive first-pitch hitter: punishes mistakes
  Lesson: Mechanical uniqueness can be a weapon

  MANNY RAMIREZ (.396 OBP with Dodgers 2008–10):
  → Elite pitch recognition + bat speed combo
  → Never chased — walked 100+ times multiple seasons
  → Calm, unhurried: identical approach every at-bat
  Lesson: Plate discipline + bat speed = elite production

  COREY SEAGER (.267 avg with Dodgers, 2x WS MVP):
  → Launch angle evolution: contact → power hitter
  → Data-driven approach change — Statcast informed
  Lesson: Elite hitters evolve intentionally with data

  MOOKIE BETTS (.295 avg with Dodgers, 2020 WS):
  → Toe-tap trigger: most studied in modern coaching
  → All-fields power: drives ball equally all zones
  → Combines Robinson's discipline with Piazza's power
  Lesson: Modern completeness = contact + power + IQ`,
        },
      },
      incident: {
        title: "Manny Ramirez's .396 OBP with the Dodgers — Plate Discipline as Spectacle",
        when: "2008–2010 — Manny Ramirez with the Dodgers",
        where: "Dodger Stadium, Los Angeles, California",
        impact: "When the Dodgers acquired Manny Ramirez at the 2008 trade deadline, his immediate impact was staggering: .396 batting average in 53 games with the Dodgers, .400+ OBP, and a seemingly impossible calm in every at-bat. Pitchers who had dominated other hitters found that Ramirez's patience and pitch recognition made him essentially unhittable when he was locked in.",
        body: [
          "Manny Ramirez's approach was the purest expression of the Ted Williams plate discipline school applied to the modern game. He took pitches — many, many pitches — waiting for something in his zone. Pitchers who attacked the outer half found that Ramirez was content to watch those pitches for balls. Pitchers who came inside found that Ramirez destroyed them. His career walk rate of over 17% and career OBP of .411 tell the story: he refused to give pitchers anything, forcing them to come into his zone or walk him.",
          "Dodger Stadium crowds during Ramirez's tenure experienced hitting on a different level — a hitter who seemed to have all the time in the world, whose at-bats looked like slow-motion demonstrations of pitch recognition mastery. His two NLCS MVP awards and his ability to elevate the entire Dodger lineup around him demonstrated that elite plate discipline is not passive: it is aggressive, specific, and devastatingly effective. Players in the Dodger minor league system were shown Ramirez at-bats as the gold standard for what patience plus bat speed looks like in combination.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Brooklyn Foundation", sub: "Robinson (control) + Snider (power)", type: "system" },
          { label: "LA Power Era", sub: "Piazza + Beltre + Manny — different approaches", type: "attacker" },
          { label: "Modern Evolution", sub: "Seager (data-driven) + Betts (synthesis)", type: "victim" },
          { label: "Each Teaches One Lesson", sub: "discipline / power / flexibility / patience / evolution", type: "result" },
        ],
      },
      timeline: [
        { year: 1947, event: "Jackie Robinson joins the Dodgers — begins the franchise hitting legacy", highlight: true },
        { year: 1955, event: "Duke Snider hits 4 HRs in the World Series — pull power defines a generation" },
        { year: 1992, event: "Mike Piazza begins Dodger career — redefines offensive expectations at catcher" },
        { year: 1998, event: "Adrian Beltre joins the Dodgers — introduces low-ball power hitting to the franchise" },
        { year: 2008, event: "Manny Ramirez acquired — delivers .396 OBP and two NLCS MVP awards", highlight: true },
        { year: 2020, event: "Mookie Betts and Corey Seager lead Dodgers to World Series — modern era peaks" },
      ],
      keyTakeaways: [
        "Jackie Robinson's bat control and discipline remain the most complete hitting foundation in Dodger history",
        "Duke Snider's pull-power approach established that Dodger hitters could be franchise offensive forces",
        "Manny Ramirez exemplifies how plate discipline combined with elite bat speed creates an at-bat approach that is genuinely difficult to pitch to",
        "Corey Seager's launch angle evolution shows that elite hitters can deliberately remake their offensive profiles with data support",
      ],
      references: [
        { title: "Baseball Hall of Fame: Jackie Robinson, Duke Snider, Mike Piazza", url: "https://baseballhall.org" },
        { title: "Baseball Savant: Corey Seager Launch Angle Evolution", url: "https://baseballsavant.mlb.com" },
        { title: "Dodgers: Franchise Hitting History", url: "https://www.mlb.com/dodgers/history" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-4-09-q1",
          type: "Jackie Robinson",
          challenge: `  Jackie Robinson's career batting average was .311
  with 137 home runs in 10 seasons. His OBP was .409.
  Comparable players of the era with similar power
  numbers had OBP around .350.

  What does the 59-point OBP gap tell you about
  Robinson's approach as a hitter?`,
          text: "What does Jackie Robinson's significantly above-average OBP relative to his home run production reveal about his hitting philosophy?",
          options: [
            "Robinson benefited from more hit-by-pitches than most players due to pitchers targeting him",
            "Robinson had elite plate discipline — his willingness to take walks and refuse pitches outside his zone added extraordinary value beyond his contact-based production",
            "The OBP gap reflects an era when walks were more common — Robinson's numbers are not exceptional in context",
            "Robinson's OBP was inflated by bunts and infield singles, not disciplined walk-taking",
          ],
          correctIndex: 1,
          explanation: "A .409 OBP with .311 batting average means Robinson drew walks at an elite rate — his on-base skill went far beyond his contact ability. The 59-point gap above comparable players reflects extraordinary plate discipline: the ability to identify pitches outside his zone and take them for balls rather than expanding his zone under pressure. In the context of Robinson's career — facing pitchers who often tried to intimidate him and managers who had fielded pitchers willing to throw at him — maintaining elite plate discipline required exceptional mental discipline as well as technical skill. His OBP is one of the highest of his era, and it was built on refusing to give pitchers anything.",
        },
        {
          id: "baseball-4-09-q2",
          type: "Corey Seager's Evolution",
          challenge: `  Corey Seager hit 22 HRs in 2016 as a
  contact-oriented left-handed hitter.
  By 2023 (Texas Rangers), he hit 33 HRs
  using a more elevated launch angle approach.

  His exit velocity did not significantly change.
  His home run count increased by 11 per season.

  What was the primary driver of the power increase?`,
          text: "When exit velocity stays constant but home run production increases significantly, what metric most likely changed?",
          options: [
            "Bat speed must have increased — the power increase cannot come from approach alone",
            "Launch angle increased — hitting the ball at a higher angle sent balls that were grounders and line drives into the outfield and over fences instead",
            "Seager moved to a hitter-friendly ballpark, which accounts for the difference",
            "The ball was juiced — external factors explain the power increase across the era",
          ],
          correctIndex: 1,
          explanation: "If exit velocity is constant, the same contact quality is being applied to the ball — the force of impact has not changed. The only remaining variable is where the ball goes: launch angle. By consciously raising his attack angle — committing to driving inner-half pitches earlier and getting the barrel under and through the ball at a higher angle — Seager sent balls that were previously line drives into the upper half of the outfield and eventually over the fence. The data is clear: his average launch angle rose from approximately 12° to 18°, and that 6° difference moved dozens of balls from the warning track to the bleachers every season.",
        },
        {
          id: "baseball-4-09-q3",
          type: "Manny Ramirez",
          challenge: `  Manny Ramirez had a career walk rate of 17.4%
  and a career strikeout rate of 15.2%.

  This means he walked more than he struck out —
  an extraordinarily rare statistic in baseball.

  What does this ratio reveal about his plate
  approach and pitch recognition?`,
          text: "What does a walk rate higher than strikeout rate tell you about a hitter's plate discipline and pitch recognition skill?",
          options: [
            "Ramirez was unusually patient — he took too many pitches that he should have swung at",
            "Ramirez had elite pitch recognition combined with precise zone control — he knew his zone perfectly, swung only at hittable pitches, and refused to expand the zone even with two strikes",
            "The ratio reflects an era when pitchers were less precise, making walk rates higher and strikeouts lower",
            "Walking more than you strike out is typical for power hitters who take many pitches",
          ],
          correctIndex: 1,
          explanation: "Walking more than you strike out is one of the rarest and most elite outcomes in professional hitting. It means the hitter's pitch recognition is so precise that they identify borderline pitches as balls more often than they swing at and miss them. For Ramirez to do this while also hitting 555 career home runs is almost incomprehensible — most power hitters accept high strikeout rates as the cost of their aggressive approach. Ramirez combined elite bat speed (needed for power) with elite discipline (needed for walks) in a way that very few hitters have achieved. His approach is the gold standard of what plate discipline looks like at the highest level.",
        },
        {
          id: "baseball-4-09-q4",
          type: "Technical Comparison",
          challenge: `  A youth hitter asks: "Which Dodger hitter
  should I model my swing after?"

  You want to give them a thoughtful answer
  that teaches them something beyond just
  "pick the best one."

  What do you tell them?`,
          text: "How should a developing hitter think about modeling their swing after a professional hitter, given the diversity of successful hitting approaches?",
          options: [
            "Model your swing exactly after Mookie Betts — his mechanics are the most modern and teachable",
            "Study the Dodger hitters to learn principles — plate discipline from Robinson, load efficiency from Snider, bat speed from Piazza — and let your own swing emerge from those principles rather than copying a single player",
            "Do not model your swing after any professional — all professional swings are too complex for youth players",
            "Pick the hitter with your same handedness and body type and copy their mechanics exactly",
          ],
          correctIndex: 1,
          explanation: "Great hitters come in radically different packages — Robinson barely stood out mechanically, Beltre looked completely unconventional, Ohtani's leg kick is impossible to replicate without his specific physical training. Copying any one hitter wholesale risks adopting their quirks without their thousands of hours of development that make those quirks functional. The better approach: extract the transferable principles — Robinson's discipline, Snider's load efficiency, Manny's zone control, Betts' trigger consistency — and work on those fundamentals. Your natural swing will emerge from that foundation. The greatest hitters are great because of principles, not because they copy each other.",
        },
      ],
    },
  },

  // ─── baseball-4-10: Building a Lifelong Hitting Practice ─────────────────────
  {
    epochId: "baseball-4",
    wonder: {
      name: "Cooperstown Hall of Fame — Library and Research Center",
      location: "Cooperstown, New York",
      era: "Historic",
      emoji: "📚",
    },
    id: "baseball-4-10",
    order: 10,
    title: "Building a Lifelong Hitting Practice",
    subtitle: "Off-season training, age-specific adjustments, the compound effect of daily tee work, and what separates lifelong students of hitting",
    category: "sports",
    xp: 100,
    badge: { id: "baseball-4-badge-10", name: "Student of the Game", emoji: "🌟" },
    challengeType: "quiz",
    info: {
      tagline: "The hitters who never stop improving are not the most naturally talented — they are the ones who never stopped being students.",
      year: 2000,
      overview: [
        "The compound effect in hitting is exactly what it sounds like: consistent daily practice, performed over years, produces exponential improvement that sporadic high-volume practice cannot match. A hitter who takes 100 purposeful tee swings every day for five years has made 182,500 deliberate contact repetitions — each one reinforcing neural pathways, refining muscle memory, and compounding skill. A hitter who takes 1,000 swings in a single weekend session 26 times per year has made the same total volume but without the daily reinforcement that makes skills automatic.",
        "Age-specific adjustments are critical to a lifelong hitting career. Youth players (8–14) should emphasize fundamentals, contact rate, and bat control — power is irrelevant and swing mechanics should be kept simple and consistent. Teen players (15–18) can begin integrating advanced concepts: launch angle awareness, pitch recognition development, and approach refinement. Adult amateur players should focus on maintaining flexibility, protecting mechanics from the physical changes of aging, and emphasizing contact quality over power as bat speed naturally declines with age.",
        "What separates lifelong students of hitting from those who plateau is not talent — it is curiosity and systematic self-evaluation. The hitters who improve into their 30s and 40s are the ones who watch film on themselves and on pitchers consistently, who keep journals of what worked and what did not, who seek out new information (a new drill, a different coaching perspective, a Statcast metric they had not previously tracked), and who treat every plateau as a problem to be solved rather than a ceiling to accept. Ted Williams said he spent more time thinking about hitting than anything else in his life. That relationship to the craft — not natural talent — is what produced a .406 batting average.",
      ],
      technical: {
        title: "The Compound Effect of Daily Tee Work — A Five-Year Development Model",
        body: [
          "The tee drill is the most accessible and impactful single development tool available at any level, and its value compounds with consistent use over years. Year one: daily tee work (15–20 min) builds the basic motor patterns of the swing. Year two: targeted tee work (specific pitch locations, two-strike setups, opposite-field contact) refines the motor patterns and begins building zone-specific contact skills. Year three: advanced tee work (tracking exit velocity, working on launch angle) integrates analytics feedback with physical practice.",
          "By years four and five, a hitter with a consistent daily tee routine has developed the kind of automatic contact skill that allows them to self-diagnose mechanical issues in real time and fix them during a game with a single swing adjustment. The mechanical knowledge is so deeply encoded that conscious analysis becomes faster — a hitter can identify 'I'm rolling over' or 'I'm casting my hands' mid-at-bat and correct it on the next pitch. This is the compound effect: years of daily practice produce not just physical skill but metacognitive hitting awareness.",
        ],
        codeExample: {
          label: "Age-Specific Hitting Development Framework",
          code: `  AGES 8–12 (Foundation Building):
  Focus: Contact rate, bat control, fun
  → 15 min tee work 3x/week
  → Simple trigger (toe-tap or small weight shift)
  → Keep it in play — contact is the goal
  → Do NOT emphasize power or home runs
  → Watch one pro hitting video per week

  AGES 13–15 (Approach Integration):
  Focus: Plate discipline, pitch recognition
  → 20 min tee work daily (location-specific)
  → Soft toss 2x/week with two-strike sets
  → Study pitching tendencies before games
  → Begin video self-analysis with smartphone
  → Introduce count-based approach concepts

  AGES 16–18 (Performance Development):
  Focus: Launch angle, exit velocity, power
  → Full routine: tee + soft toss + BP + video
  → Statcast awareness: track contact quality
  → Study opposing pitchers systematically
  → Begin pre-at-bat visualization routine
  → Develop two-strike approach as reliable skill

  AGES 19+ (Lifelong Maintenance):
  → Protect bat speed: maintain rotation speed
  → Emphasize contact quality over power
  → Adapt mechanics to physical changes with age
  → Never stop watching film and keeping journal
  → Find new coaches / perspectives regularly`,
        },
      },
      incident: {
        title: "Ted Williams — The Last .400 Hitter and the Lifetime Student",
        when: "1939–1960 — Ted Williams, Boston Red Sox",
        where: "Fenway Park, Boston and Cooperstown, New York",
        impact: "Ted Williams hit .406 in 1941 — the last player to hit .400 in a season. He lost nearly five prime years to military service in WWII and Korea. When he returned, he was still one of the best hitters in baseball. His career batting average was .344, and his career OBP was .482 — still the highest in Major League history. He achieved this not through elite athleticism but through his lifelong, obsessive study of hitting mechanics and plate discipline.",
        body: [
          "Williams kept a notebook throughout his career tracking his at-bats, pitchers' tendencies, and mechanical observations. He studied physics to understand ball flight and drag. He divided the strike zone into 77 specific zones and calculated his batting average on pitches in each zone — decades before Statcast made this kind of analysis automatic. He famously said he thought about hitting constantly, even when he was not on a baseball field.",
          "After his playing career, Williams continued studying and coaching hitting — his 1971 book 'The Science of Hitting' remains one of the most influential instructional texts in sports history. He worked with hitters through his 60s and 70s, consistently updating his thinking based on new evidence. The lesson from Williams' career is not that natural talent is overrated — he was extraordinarily talented. The lesson is that natural talent, multiplied by decades of systematic study and daily practice, produces results that neither alone can achieve. Williams is the archetype of the lifelong student of hitting.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Daily Practice (Compound Effect)", sub: "100 reps/day × 5 years = 182,500", type: "system" },
          { label: "Age-Appropriate Development", sub: "contact → approach → power → maintenance", type: "attacker" },
          { label: "Systematic Self-Evaluation", sub: "video, journal, Statcast, coaching", type: "victim" },
          { label: "Lifelong Student Mindset", sub: "curiosity turns plateaus into problems to solve", type: "result" },
        ],
      },
      timeline: [
        { year: 1941, event: "Ted Williams hits .406 — built on lifetime study, not just talent", highlight: true },
        { year: 1971, event: "'The Science of Hitting' published — Williams formalizes lifetime study into the most influential instructional text" },
        { year: 1990, event: "Tee drills become standard at youth level — compound practice principle spreads to grassroots baseball" },
        { year: 2015, event: "Statcast enables objective measurement of development — daily tee work outcomes become trackable" },
        { year: 2020, event: "Dodgers formalize the age-specific development model at all minor league levels" },
        { year: 2024, event: "Freeman and Betts, both lifelong students of hitting, anchor Dodger World Series championship at ages 34 and 31", highlight: true },
      ],
      keyTakeaways: [
        "The compound effect: 100 purposeful reps daily for five years outperforms 1,000 sporadic reps in terms of skill development",
        "Age-specific development: youth = contact; teens = approach; adult = performance; veteran = maintenance and adaptation",
        "Lifelong students of hitting watch film, keep journals, track data, and treat every plateau as a problem to solve",
        "Ted Williams' .406 season was built on systematic study — the lifetime student mindset is more sustainable than talent alone",
      ],
      references: [
        { title: "Ted Williams: The Science of Hitting (1971)", url: "https://www.amazon.com/Science-Hitting-Ted-Williams/dp/0671621033" },
        { title: "Baseball Hall of Fame: Ted Williams", url: "https://baseballhall.org/hall-of-famers/williams-ted" },
        { title: "Dodgers: Player Development Curriculum", url: "https://www.mlb.com/dodgers/minor-league" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-4-10-q1",
          type: "Compound Effect",
          challenge: `  Player A practices hitting 90 minutes on
  Saturdays only — every Saturday for a year.
  Total: ~4,680 purposeful reps.

  Player B practices 15 minutes daily —
  every single day for the same year.
  Total: ~5,475 purposeful reps.

  Player B has more total reps but only by ~17%.
  Research suggests Player B improves significantly
  more. Why?`,
          text: "Why does daily practice produce disproportionately better results than weekly high-volume practice, even when total rep counts are similar?",
          options: [
            "Player B simply hits more reps overall — the 17% additional volume explains the entire gap",
            "Daily practice maintains neural pathway reinforcement — skills rehearsed every day are encoded more deeply than skills practiced once per week with a long gap in between",
            "Player A's 90-minute sessions cause fatigue that degrades quality — shorter sessions are always better",
            "There is no meaningful difference — total rep count is what determines skill development",
          ],
          correctIndex: 1,
          explanation: "Motor skill acquisition research consistently shows that daily practice with adequate recovery outperforms equivalent-volume infrequent practice. The reason is neurological: a skill practiced daily is reinforced while it is still fresh in neural memory. Practicing once per week allows significant neural pattern decay between sessions — each Saturday session spends the first 20–30 minutes re-establishing what was learned the previous week. Daily practice eliminates this decay: each session builds on the neural pattern that was reinforced yesterday. Over a year, this compounds significantly, producing deeper automaticity and faster recall of mechanical patterns under game pressure.",
        },
        {
          id: "baseball-4-10-q2",
          type: "Age-Specific Development",
          challenge: `  A 10-year-old player's parent asks you to
  help their child "develop power" and "hit
  more home runs" because they believe early
  power development is important.

  Based on the age-specific development
  framework, what is your response?`,
          text: "Why is power development inappropriate as a primary focus for youth hitters under age 13?",
          options: [
            "Power development at age 10 is entirely appropriate — starting early maximizes long-term power potential",
            "Power at age 10 develops naturally through contact — the focus should be bat control and making contact, which builds the foundation from which power emerges as the body develops",
            "Power training should start at age 8 to maximize the developmental window",
            "The parent is correct that power should be developed early, but home runs specifically are the wrong goal — launch angle training is appropriate at age 10",
          ],
          correctIndex: 1,
          explanation: "Power in baseball is primarily a function of bat speed, which is driven by hip rotation speed and body mass — both of which are largely determined by physical maturity that does not fully develop until mid-to-late teens. A 10-year-old trying to 'develop power' through swing mechanics typically produces over-swinging, pulling off the ball, and poor contact — all of which actively harm development. The appropriate focus at age 10 is bat control: making consistent contact on the barrel of the bat with a mechanically simple, repeatable swing. The power will come naturally as the player's body matures and the contact skills are already grooved. Train contact at 10; power emerges by 16–18.",
        },
        {
          id: "baseball-4-10-q3",
          type: "Lifelong Student Mindset",
          challenge: `  A 32-year-old amateur league hitter has
  hit .285 for the last 8 years.
  Same mechanics. Same approach. Same results.

  He is happy with .285 but curious if he
  could do better. He has no coach.

  What is the first step a lifelong student
  of hitting would take to identify potential
  improvement?`,
          text: "How should a developing hitter without access to professional coaching begin a systematic self-improvement process?",
          options: [
            "Join a professional hitting academy — self-improvement without expert guidance is ineffective",
            "Record himself at 240fps on a smartphone during batting practice, identify one specific mechanical pattern to focus on (head movement, casting, early commitment), and take 3 weeks of targeted tee work on that one issue before filming again",
            "Increase batting practice volume — more reps will naturally reveal improvement opportunities",
            "Study Ted Williams' book and implement all of his recommendations at once",
          ],
          correctIndex: 1,
          explanation: "Self-directed improvement follows the same diagnostic framework as coached improvement: observe, identify, target, test. A smartphone at 240fps reveals mechanical patterns that feel invisible in real-time. The key is focus: do not watch the video looking for everything — watch for one thing (e.g., head position at contact, hip timing, hand path). Once identified, take targeted tee reps on that specific element for 3 weeks, then re-record and compare. This is the scientific method applied to hitting. Williams did this with notebooks before video existed. Any hitter with a smartphone and a consistent tee-work habit can make meaningful self-directed improvements.",
        },
        {
          id: "baseball-4-10-q4",
          type: "The Lifelong Commitment",
          challenge: `  Ted Williams lost nearly 5 years of his
  prime career to military service (WWII
  and Korea). When he returned at ages
  34 and 38, he was still one of the best
  hitters in the American League.

  At 38, he hit .388 — the highest average
  of any player that year.

  What sustained his ability to hit at
  an elite level so late into his career?`,
          text: "What factors allowed Ted Williams to maintain elite hitting performance far beyond the typical career peak age?",
          options: [
            "Williams' natural talent was so exceptional that it overcame the aging process",
            "His systematic, lifelong study of hitting mechanics, plate discipline, and pitcher tendencies — combined with consistent physical maintenance — allowed him to refine his craft even as his physical tools declined slightly",
            "Williams played in an era with weaker pitching, making his late-career performance less impressive than it appears",
            "His military service was actually beneficial — time away from baseball gave his body time to recover, extending his peak",
          ],
          correctIndex: 1,
          explanation: "Williams' late-career excellence was a product of his analytical approach to the craft. As his reflexes slowed slightly with age, his pitch recognition became sharper — he studied pitchers more obsessively, identified count tendencies more precisely, and reduced his zone to focus on pitches he could still drive with authority. His plate discipline compensated for any slight decline in bat speed: a hitter who never chases and only swings at pitches in his optimal zone can sustain elite production longer than pure physical tools allow. This is the ultimate lesson of the lifelong student: the mental game grows as the physical game inevitably declines, and the hitter who has invested in the mental game has a longer peak.",
        },
      ],
    },
  },
];
