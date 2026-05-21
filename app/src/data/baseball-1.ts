import type { StageConfig, EpochConfig } from "./types";

export const baseball1Epoch: EpochConfig = {
  id: "baseball-1",
  name: "Play Ball!",
  subtitle: "Little League Fundamentals",
  description:
    "Learn America's game from the ground up — the diamond, the rules, how to hit, pitch, field, and run the bases with confidence. But the game is more than mechanics: it's about hustle, teamwork, and respecting the sport. Whether you're brand new or looking to sharpen your skills, these fundamentals will take you from first throw to full team player.",
  emoji: "⚾",
  color: "red",
  unlocked: true,
};

export const baseball1Stages: StageConfig[] = [
  // ─── baseball-1-01: The Field and the Game ────────────────────────────────────
  {
    epochId: "baseball-1",
    wonder: {
      name: "Doubleday Field",
      location: "Cooperstown, New York",
      era: "Modern",
      emoji: "🏟️",
    },
    id: "baseball-1-01",
    order: 1,
    title: "The Field and the Game",
    subtitle: "Diamond, positions, innings, and how to score",
    category: "sports",
    xp: 80,
    badge: { id: "baseball-1-badge-01", name: "Diamond Rookie", emoji: "💎" },
    challengeType: "quiz",
    info: {
      tagline: "Before you can play the game, you have to understand the field — and why it's shaped the way it is.",
      year: 1839,
      overview: [
        "Baseball is played on a diamond-shaped infield with four bases — first, second, third, and home plate — placed 90 feet apart (60 feet in most youth leagues). The infield is a square rotated 45 degrees so the bases form a diamond shape. Beyond the infield is the outfield, extending to the outfield wall. The fair territory is the area between the two foul lines that extend from home plate through first and third base and continue into the outfield.",
        "A team fields nine players, each in a specific position: pitcher (1), catcher (2), first baseman (3), second baseman (4), third baseman (5), shortstop (6), left fielder (7), center fielder (8), and right fielder (9). These numbers are used on scorecards and in scoring (e.g., a 6-4-3 double play means shortstop to second baseman to first baseman).",
        "A baseball game consists of nine innings (six in most youth leagues). Each inning has two halves — the visiting team bats first (top of inning), the home team bats second (bottom of inning). Each team is retired after three outs. To score a run, a batter must reach base, advance around the three bases, and touch home plate before the third out of the inning. The team with more runs after nine innings wins.",
      ],
      technical: {
        title: "The Baseball Diamond — Dimensions and Layout",
        body: [
          "The infield consists of the four bases (including home plate) and the areas between them. The pitcher's mound is in the center of the diamond, 60 feet 6 inches from home plate (46 feet in Little League Minor divisions). The batter's box is on either side of home plate, and the catcher crouches directly behind it. The dugouts are on either side of the field, where the team sits when not batting or in the field.",
          "Foul territory is the area outside the two foul lines. A ball hit into foul territory is generally a foul ball (a strike if the batter has fewer than two strikes; no additional penalty after two strikes, with some exceptions). A foul ball caught in the air by a fielder is an out. Fair/foul is determined by where the ball first contacts the ground past first or third base.",
        ],
        codeExample: {
          label: "Baseball Field Layout",
          code: `                    CENTER FIELD (8)
                         *
              LEFT (7)      RIGHT (9)
                 *              *
           3B *    INFIELD    * 1B
           (5)                 (3)
                 SS  *  2B
                (6)    (4)
                    PITCHER
                      (1)
                   CATCHER (2)
               ∧  HOME PLATE  ∧
          FOUL LINE          FOUL LINE

  BASES: 90 ft apart (60 ft youth)
  MOUND: 60'6" from home (46 ft youth)`,
        },
      },
      incident: {
        title: "The First Little League World Series — 1947",
        when: "1947 — Williamsport, Pennsylvania",
        where: "Williamsport, Pennsylvania",
        impact: "The first Little League World Series established Williamsport as the spiritual home of youth baseball, a tradition that continues today with 20 teams from around the world competing annually before global audiences.",
        body: [
          "Little League Baseball was founded in 1939 by Carl Stotz in Williamsport, Pennsylvania, with just three teams. Eight years later, in 1947, Stotz organized the first Little League World Series — a regional competition that drew teams from across Pennsylvania. It was modest by today's standards, but it established the template for what would become one of the most watched youth sporting events in the world.",
          "Today, the Little League World Series features 20 teams representing regions across the United States and countries around the world. Games are broadcast nationally on ESPN and ABC. The tournament has produced some of baseball's most memorable moments — and thousands of players who went on to careers in professional baseball. The series remains in Williamsport, at Howard J. Lamade Stadium, just miles from where Carl Stotz first laid out those three original teams.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Batter Gets On Base", sub: "hit, walk, or error", type: "attacker" },
          { label: "Advances the Bases", sub: "1B → 2B → 3B", type: "system" },
          { label: "Reaches Home Plate", sub: "before 3rd out", type: "victim" },
          { label: "Run Scores", sub: "+1 for the team", type: "result" },
        ],
      },
      timeline: [
        { year: 1839, event: "Abner Doubleday credited (somewhat mythically) with inventing baseball in Cooperstown, NY", highlight: true },
        { year: 1876, event: "National League of Professional Base Ball Clubs founded" },
        { year: 1903, event: "First modern World Series played — Boston Americans vs. Pittsburgh Pirates" },
        { year: 1939, event: "Little League Baseball founded by Carl Stotz in Williamsport, Pennsylvania" },
        { year: 1947, event: "First Little League World Series held in Williamsport" },
        { year: 1974, event: "Little League officially opens to girls" },
        { year: 2024, event: "Little League operates in over 80 countries worldwide" },
      ],
      keyTakeaways: [
        "The baseball diamond has four bases 90 feet apart (60 feet in most youth leagues) — home, first, second, third",
        "Nine players take the field, each with a numbered position (pitcher=1, catcher=2, and so on to right field=9)",
        "Each inning has two halves — three outs per half-inning; nine innings per game",
        "To score, a player must advance around all three bases and touch home plate before the inning ends",
      ],
      references: [
        { title: "Little League International: Official Rules", url: "https://www.littleleague.org/playing-rules/" },
        { title: "Baseball Hall of Fame — Cooperstown, NY", url: "https://baseballhall.org" },
        { title: "MLB: Understanding the Game", url: "https://www.mlb.com/fans/basics" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-1-01-q1",
          type: "Field Knowledge",
          challenge: `  A ball is hit down the left field line.
  It lands 3 feet past third base in fair
  territory, then rolls foul.

  Is it a fair ball or a foul ball?`,
          text: "Is a ball that lands in fair territory past third base but then rolls foul considered fair or foul?",
          options: [
            "Foul — where the ball ends up determines fair/foul",
            "Fair — a ball that lands in fair territory beyond third base is fair regardless of where it rolls",
            "It depends — the umpire uses judgment based on where most of the ball's travel occurred",
            "Foul — once the ball crosses the foul line at any point, it is a foul ball",
          ],
          correctIndex: 1,
          explanation: "Fair/foul is determined by where the ball FIRST CONTACTS the ground (or a fielder, or a fence) beyond first or third base. If the ball lands in fair territory past the base — even if it then rolls into foul territory — it is a FAIR ball. This is different from balls that don't reach the base, where fair/foul is determined by where the ball stops or is touched.",
        },
        {
          id: "baseball-1-01-q2",
          type: "Scoring",
          challenge: `  Runner on third base. Two outs.
  Batter hits a fly ball to center field.
  The center fielder catches it.

  What happens?`,
          text: "What happens to the runner on third and the inning when the fly ball is caught?",
          options: [
            "The runner on third scores — they were already on base when the ball was hit",
            "The inning is over — the catch is the third out, and no run scores",
            "The runner can try to tag up and score after the catch",
            "The inning is over but the run counts if the runner touched home before the catch",
          ],
          correctIndex: 1,
          explanation: "With two outs, a caught fly ball ends the inning — and no run counts, even if a runner crossed home plate before the ball was caught. The rule is: a run cannot score on a play where the third out is recorded on the batter or on a force out. On a caught fly ball with two outs, the catch IS the third out, so the half-inning ends immediately and the runner's position is irrelevant.",
        },
        {
          id: "baseball-1-01-q3",
          type: "Positions",
          challenge: `  POSITION NUMBERS:
  1=Pitcher, 2=Catcher, 3=First baseman
  4=Second baseman, 5=Third baseman
  6=Shortstop, 7=Left field, 8=Center field
  9=Right field

  The announcer says: "6-4-3 double play!"`,
          text: "What does a 6-4-3 double play mean?",
          options: [
            "The third baseman threw to the shortstop who threw to the first baseman",
            "The shortstop fielded the ball, threw to second base, and the second baseman threw to first base",
            "The pitcher threw to the second baseman who threw to the third baseman",
            "Two outs on one play involving positions 6, 4, and 3 — scored in reverse order",
          ],
          correctIndex: 1,
          explanation: "Position 6 = Shortstop, Position 4 = Second baseman, Position 3 = First baseman. A 6-4-3 double play means the shortstop fielded the ball, threw to the second baseman (who recorded the force out at second), and the second baseman threw to first base for the second out. This is the most common double play in baseball — it typically happens on a ground ball with a runner on first.",
        },
        {
          id: "baseball-1-01-q4",
          type: "Innings",
          challenge: `  Your youth baseball game is tied 3-3.
  Your team is up to bat in the bottom of the
  6th inning (the last regulation inning in
  Little League).

  What happens if you don't score?`,
          text: "In Little League, how many regulation innings are typically played before extra innings are possible?",
          options: [
            "9 innings — same as Major League Baseball",
            "7 innings — standard for most youth leagues above age 12",
            "6 innings — standard for most Little League divisions",
            "5 innings — standard for all youth baseball",
          ],
          correctIndex: 2,
          explanation: "Little League regulation games are typically 6 innings (compared to 9 in Major League Baseball). If the game is tied after 6 innings, extra innings are played until one team is ahead at the end of a complete inning. Younger youth divisions (T-ball, coach pitch) may play fewer innings. Always check your specific league's rules — Little League divisions range from 4 to 6 regulation innings depending on age group.",
        },
      ],
    },
  },

  // ─── baseball-1-02: Rules Every Player Must Know ──────────────────────────────
  {
    epochId: "baseball-1",
    wonder: {
      name: "Little League International Headquarters",
      location: "Williamsport, Pennsylvania",
      era: "Modern",
      emoji: "⚾",
    },
    id: "baseball-1-02",
    order: 2,
    title: "Rules Every Player Must Know",
    subtitle: "Outs, walks, force plays, and the infield fly rule",
    category: "sports",
    xp: 80,
    badge: { id: "baseball-1-badge-02", name: "Rule Book", emoji: "📋" },
    challengeType: "quiz",
    info: {
      tagline: "You can't play the game right if you don't know the rules — and knowing them protects your team.",
      year: 1876,
      overview: [
        "Baseball has a well-organized set of rules, but several key rules trip up new players. Three strikes and you're out — but only certain pitches count as strikes: a pitch in the strike zone that you don't swing at, any pitch you swing at and miss, or a pitch you hit foul (with the exception that a foul ball cannot be the third strike, except on a bunt attempt). Four balls — pitches out of the strike zone that the batter doesn't swing at — earn the batter a walk (free base on first).",
        "There are two primary ways to record an out on a base runner: force outs and tag outs. A force out occurs when a runner is forced to advance to the next base because a batter becomes a runner (or because runners behind force runners ahead). To record a force out, the fielder only needs to touch the base while holding the ball — no tag required. A tag out requires the fielder to physically tag the runner with the ball while the runner is not touching a base.",
        "The infield fly rule is one of baseball's most misunderstood rules. It applies when there are runners on first and second (or bases loaded), fewer than two outs, and a fair fly ball is hit to the infield that an infielder can catch with ordinary effort. In this situation, the batter is automatically declared out — even if the fielder drops it intentionally. This rule exists to prevent fielders from deliberately dropping easy pop-ups to create a cheap double or triple play.",
      ],
      technical: {
        title: "Hits vs. Errors — Scoring the Play",
        body: [
          "A hit is when a batter reaches base due to their own skill — a ball hit in fair territory that cannot be fielded with ordinary effort, or that lands for a base hit before an out can be recorded. An error is when a fielder makes a mistake on a ball that should have been fielded with ordinary effort — dropping a catchable fly ball, throwing wildly, or mishandling a routine grounder. An error is charged to the fielder; the batter reaches base but is not credited with a hit.",
          "Distinguishing hits from errors matters for statistics (batting average only counts hits) and for scoring purposes. The official scorer makes this judgment. In youth baseball, learning to distinguish these plays builds baseball IQ. A key concept: benefit of the doubt goes to the batter — if a play is borderline, score it a hit.",
        ],
        codeExample: {
          label: "Key Rules Quick Reference",
          code: `  STRIKES: swing and miss, in-zone no-swing, foul
  → 3 strikes = out  (foul ≠ 3rd strike)
  BALLS:   out of zone, no-swing
  → 4 balls = walk (batter goes to 1st)

  FORCE OUT:  runner forced to advance
  → fielder only needs to TOUCH the base
  TAG OUT:    runner not forced
  → fielder must TAG the runner

  INFIELD FLY RULE activates when:
  → Runners on 1st + 2nd (or bases loaded)
  → Fewer than 2 outs
  → Fair fly ball catchable by infielder
  → Batter is OUT automatically (call by ump)
  → Runners may advance at their own risk

  HIT vs. ERROR:
  → Hit = batter's skill reached base
  → Error = fielder's mistake allowed base`,
        },
      },
      incident: {
        title: "The Famous Infield Fly Rule Controversy — NLDS 2012",
        when: "October 5, 2012 — MLB Playoffs",
        where: "Turner Field, Atlanta, Georgia",
        impact: "An infield fly rule call in the bottom of the 8th inning of an elimination playoff game (Cardinals vs. Braves) sparked massive controversy when a ball dropped in shallow left field was called under the rule — fans threw debris on the field, and the game was delayed. The play highlighted how widely misunderstood this rule remains even among adult fans.",
        body: [
          "In the 2012 NLDS Wild Card game between the St. Louis Cardinals and Atlanta Braves, with the Braves trailing 6-3 and runners on first and second with one out in the 8th inning, shortstop Pete Kozma camped under a pop-up in short left field. As the ball came down — well past the normal infield — the left field umpire called 'infield fly, batter is out.' The ball dropped, the runner on second advanced to third, and confusion reigned.",
          "Braves fans — and even many players — were furious, arguing the ball was too far into the outfield for the rule to apply. The rule requires the ball to be catchable 'with ordinary effort' by an infielder, but the call is a judgment by the umpire. The play, though controversial, was arguably correct. The incident became a viral teaching moment for baseball rules education, demonstrating that even in professional playoff baseball, the infield fly rule remains widely misunderstood.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Ball in Play", sub: "hit, thrown, or in air", type: "attacker" },
          { label: "Force or Tag Situation?", sub: "determines how out is recorded", type: "system" },
          { label: "Fielder Applies Rule", sub: "touch base or tag runner", type: "victim" },
          { label: "Out Recorded", sub: "or run scores safely", type: "result" },
        ],
      },
      timeline: [
        { year: 1876, event: "National League codifies first modern baseball rules including three-strike out", highlight: true },
        { year: 1895, event: "Infield fly rule introduced to prevent fielders from deliberately dropping pop-ups" },
        { year: 1901, event: "Foul ball rule updated — foul balls count as strikes (except the third)" },
        { year: 1920, event: "Batter credited with hit on walk changed — walks no longer counted as at-bats" },
        { year: 1973, event: "Designated Hitter rule adopted by the American League" },
        { year: 2023, event: "MLB adopts pitch clock, shift restrictions, and larger bases — most significant rule changes in decades" },
      ],
      keyTakeaways: [
        "Three strikes = out; four balls = walk. Foul balls count as strikes but cannot be the third strike",
        "Force outs only require touching the base; tag outs require tagging the runner's body",
        "The infield fly rule automatically retires the batter on a catchable infield pop-up with runners on 1st and 2nd (or bases loaded) and fewer than 2 outs",
        "A hit requires the batter's skill; an error is a fielder's mistake — the batter reaches base but gets no hit credit",
      ],
      references: [
        { title: "Little League Official Rules and Regulations", url: "https://www.littleleague.org/playing-rules/" },
        { title: "MLB Official Baseball Rules", url: "https://www.mlb.com/official-information/umpires/official-rules" },
        { title: "Baseball Reference: Glossary", url: "https://www.baseball-reference.com/bullpen/Main_Page" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-1-02-q1",
          type: "Scenario",
          challenge: `  Runner on first base. Ground ball hit to shortstop.
  The shortstop throws to second base.
  The second baseman catches it and steps on second,
  but the runner has NOT yet arrived at second.

  Is the runner out?`,
          text: "Does the second baseman need to tag the runner, or just touch second base, to record the out?",
          options: [
            "The second baseman must tag the runner — touching the base is not enough",
            "The second baseman only needs to touch second base — it is a force out",
            "Both — they need to touch the base first, then tag if the runner slides",
            "It depends on whether the runner was running on the pitch",
          ],
          correctIndex: 1,
          explanation: "This is a force out. The runner on first was forced to run to second because the batter became a runner and took first base. In a force situation, the fielder only needs to touch the base while in possession of the ball — no tag required. The runner is out the moment the fielder touches second with the ball before the runner arrives. This is different from a runner who is NOT forced — those runners require a physical tag.",
        },
        {
          id: "baseball-1-02-q2",
          type: "Strike Count",
          challenge: `  Batter has 0 balls and 2 strikes.
  She swings at a pitch and hits it foul.

  What is the new count?`,
          text: "When a batter hits a foul ball with two strikes, what happens to the count?",
          options: [
            "The batter is out — a foul ball with two strikes is strike three",
            "The count stays at 0-2 — a foul ball cannot be the third strike (except on a bunt)",
            "The count goes to 1-2 — a foul ball with two strikes counts as a ball",
            "The at-bat restarts — the foul ball cancels the count",
          ],
          correctIndex: 1,
          explanation: "A foul ball (other than a foul bunt) cannot be the third strike. With two strikes, hitting a foul ball does not advance the strike count — the count remains at 0-2. The batter must be retired by a swinging third strike, a called third strike (pitch in the zone not swung at), or a fielder catching a fly ball. Exception: a foul tip (ball that goes sharply and directly to the catcher's mitt) CAN be strike three.",
        },
        {
          id: "baseball-1-02-q3",
          type: "Rules",
          challenge: `  Bases loaded, one out. Batter hits a high
  pop-up between the pitcher and second base.
  The umpire calls "INFIELD FLY — BATTER IS OUT!"

  The ball drops to the ground untouched.`,
          text: "After the infield fly is called and the ball drops untouched, what can the base runners do?",
          options: [
            "The runners cannot move — all runners must stay at their current bases",
            "The runners may advance at their own risk — but if they leave the base, they can be tagged out",
            "The runners automatically advance one base since the ball was dropped",
            "The play is dead and all runners return to their original bases",
          ],
          correctIndex: 1,
          explanation: "When the infield fly rule is called, the batter is automatically out — but the play is NOT dead. Runners may advance at their own risk, just as on any fly ball. If a runner leaves their base and the fielder picks up the dropped ball, the runner can be tagged out or a force out can be recorded. Runners typically stay put when the ball drops in this situation, since they were already safe on the bases and the infield fly rule already got the out that protects them.",
        },
        {
          id: "baseball-1-02-q4",
          type: "Hit or Error",
          challenge: `  Shortstop fields a routine ground ball cleanly.
  She throws to first base, but the throw
  goes wide of the bag. The first baseman
  cannot reach it. The batter reaches first.

  How is this scored — hit or error?`,
          text: "When a fielder makes a clean play but throws badly, how is the batter's advancement scored?",
          options: [
            "Hit — the batter made contact and reached base; the fielding is irrelevant",
            "Error on the shortstop — the fielder handled the ball cleanly but the throwing mistake allowed the batter to reach",
            "Neither — this is scored as a fielder's choice",
            "Hit by default — errors are only called when the ball is muffed, not thrown badly",
          ],
          correctIndex: 1,
          explanation: "This is an error on the shortstop. The shortstop fielded the ball cleanly (no fielding error) but made a throwing error that allowed the batter to reach base. An error is charged whenever a fielder's mistake — whether mishandling the ball OR making a bad throw — allows a batter or runner to advance when they should have been retired with ordinary effort. The batter reaches first but is not credited with a hit, and the error counts against the shortstop's fielding percentage.",
        },
      ],
    },
  },

  // ─── baseball-1-03: The Art of Batting ────────────────────────────────────────
  {
    epochId: "baseball-1",
    wonder: {
      name: "Fenway Park",
      location: "Boston, Massachusetts",
      era: "Modern",
      emoji: "🎯",
    },
    id: "baseball-1-03",
    order: 3,
    title: "The Art of Batting",
    subtitle: "Stance, grip, load, and contact — hitting fundamentals",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-1-badge-03", name: "Contact Hitter", emoji: "🏏" },
    challengeType: "quiz",
    info: {
      tagline: "Hitting a round ball with a round bat squarely is the hardest skill in sports — these fundamentals make it possible.",
      year: 1939,
      overview: [
        "Hitting is widely considered the most difficult skill in professional sports — even the best hitters in history failed to get a hit about 70% of the time. For youth players, the goal is simpler: make consistent contact, develop repeatable mechanics, and build confidence at the plate. The fundamentals of batting don't change from Little League to the Major Leagues — only the speed and movement of the pitches.",
        "A proper batting stance begins with feet shoulder-width apart, knees slightly bent, weight balanced on the balls of the feet. The body faces home plate (or slightly toward the pitcher). Hands grip the bat with the knocking knuckles — the middle knuckles of both hands — aligned. This grip allows the wrists to roll properly through the swing. Hands start at shoulder height, roughly even with the back shoulder.",
        "The swing is a sequence: load (shift weight to back foot, hands move slightly back), stride (small step toward the pitcher with the front foot — just a few inches, keeping the front foot closed), hip rotation (hips fire toward the pitcher, generating power), contact (arms extend, hands stay through the ball), and follow-through (the bat continues all the way around to the back shoulder). The most common mistakes: stepping in the bucket (front foot steps away from the plate rather than toward the pitcher), dropping the back elbow, and lifting the head before contact.",
      ],
      technical: {
        title: "The Mechanics of a Good Swing",
        body: [
          "Eyes on the ball: the single most important cue for young hitters. Watch the ball from the pitcher's release point all the way to the contact zone. Many young hitters look at the fielder, the outfield wall, or anticipate the ball instead of tracking it. Keep your head down and eyes focused through the zone — not up to watch where you hit it.",
          "Hip rotation is where power comes from. Young hitters who only use their arms generate weak ground balls and weak fly balls. Teaching players to 'squish the bug' — rotating the back heel into the ground as the hips fire — connects the lower body to the swing. The hands follow the hips, not the other way around.",
        ],
        codeExample: {
          label: "Batting Mechanics Checklist",
          code: `  STANCE:
  ✓ Feet shoulder-width apart
  ✓ Knees slightly bent, weight on balls of feet
  ✓ Knocking knuckles aligned on grip
  ✓ Hands at back shoulder height

  SWING SEQUENCE:
  1. LOAD    → weight shifts to back foot
  2. STRIDE  → small step toward pitcher (few inches)
  3. HIPS    → fire toward pitcher first (power!)
  4. CONTACT → arms extend, eyes on ball
  5. FOLLOW  → bat continues to back shoulder

  COMMON MISTAKES:
  ✗ Stepping in the bucket (away from plate)
  ✗ Dropping the back elbow
  ✗ Lifting head to watch contact — keep eyes down
  ✗ Arms only swing — no hip rotation`,
        },
      },
      incident: {
        title: "Ted Williams and the Science of Hitting",
        when: "1939 — Ted Williams arrives at Fenway Park",
        where: "Fenway Park, Boston, Massachusetts",
        impact: "Ted Williams, who batted .406 in 1941 — the last player to bat over .400 in a season — wrote 'The Science of Hitting' in 1971, the most influential hitting manual in baseball history. His breakdown of the strike zone into 77 individual cells and analysis of bat angle through contact transformed how hitting was taught.",
        body: [
          "Ted Williams arrived at Fenway Park in 1939 as a 20-year-old with an obsessive, analytical approach to hitting. He studied pitchers, tracked every at-bat mentally, and thought more deeply about the mechanics of hitting than any player before him. In 1941, he hit .406 — refusing to sit out a doubleheader on the last day of the season that would have preserved his .400 average — and went 6-for-8 to finish at .406. No player has batted .400 since.",
          "Williams' 1971 book 'The Science of Hitting' introduced concepts — particularly the strike zone diagram and the importance of waiting for a good pitch in the zone where the batter's average was highest — that are now foundational to hitting instruction at every level. Williams is proof that the best hitters are students, not just athletes: he studied the craft until he understood it more thoroughly than anyone.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Pitcher Releases Ball", sub: "track from release point", type: "attacker" },
          { label: "Load and Stride", sub: "weight back, step forward", type: "system" },
          { label: "Hip Rotation + Contact", sub: "power from hips to hands", type: "victim" },
          { label: "Solid Contact", sub: "ball jumps off the bat", type: "result" },
        ],
      },
      timeline: [
        { year: 1920, event: "Babe Ruth's power hitting transforms baseball from scientific to power game" },
        { year: 1939, event: "Ted Williams debuts at Fenway Park — begins his analytical approach to hitting", highlight: true },
        { year: 1941, event: "Williams hits .406 — last .400 season in Major League history" },
        { year: 1971, event: "Williams publishes 'The Science of Hitting' — still the standard hitting text" },
        { year: 1995, event: "Youth batting tees and soft-toss drills become standard in travel baseball development" },
        { year: 2015, event: "Statcast tracking technology revolutionizes understanding of exit velocity and launch angle" },
      ],
      keyTakeaways: [
        "Align the knocking knuckles on the grip to allow proper wrist rotation through contact",
        "Never step in the bucket — the front foot should stride toward the pitcher, not away from the plate",
        "Power comes from hip rotation — hands follow the hips, not the other way around",
        "Keep eyes on the ball all the way through contact — lifting the head early causes weak contact and pop-ups",
      ],
      references: [
        { title: "Little League: Hitting Fundamentals", url: "https://www.littleleague.org/player-and-coach-resources/baseball-coaching-guides/" },
        { title: "The Science of Hitting — Ted Williams (book)", url: "https://baseballhall.org" },
        { title: "MLB: Youth Hitting Clinics", url: "https://www.mlb.com/youth-programs" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-1-03-q1",
          type: "Grip",
          challenge: `  You're teaching a new player how to hold the bat.
  They grab it deep in their palm, wrapping
  all fingers around — the same grip they'd
  use for a hammer.

  What grip should you teach instead?`,
          text: "What is the correct batting grip, and how do you find the knocking knuckle alignment?",
          options: [
            "Deep palm grip — more control with the bat fully in the palm of both hands",
            "Knocking knuckle grip — line up the middle knuckles of both hands along the same plane on the bat",
            "Fingertip grip — only the fingertips should touch the bat for maximum bat speed",
            "Overlap grip — same as a golf grip, with the pinky of the top hand overlapping the index finger of the bottom",
          ],
          correctIndex: 1,
          explanation: "The knocking knuckle grip aligns the middle knuckles (the ones you'd knock on a door with) of both hands in a straight line on the bat. This grip allows the wrists to roll naturally through the contact zone — critical for making solid contact. A deep palm grip (hammer grip) locks the wrists and prevents proper rotation, resulting in weaker contact and a tendency to pull off the ball.",
        },
        {
          id: "baseball-1-03-q2",
          type: "Stance",
          challenge: `  A young player consistently hits weak ground
  balls to the pull side. Coach notices that
  when she strides, her front foot steps
  toward the third-base dugout rather than
  toward the pitcher.

  What is this mistake called?`,
          text: "What is the term for when a batter's front foot steps away from the plate during the stride?",
          options: [
            "Opening the hips — hips rotate before the stride is complete",
            "Stepping in the bucket — front foot steps away from the plate rather than toward the pitcher",
            "Cross-stepping — feet cross over during the stride",
            "Bailing out — technically different from stepping in the bucket",
          ],
          correctIndex: 1,
          explanation: "Stepping in the bucket describes a batter whose front foot steps away from home plate (toward the dugout on their pull side) rather than toward the pitcher. This opens up the body early, causes the head to drift away from the ball, and makes it almost impossible to hit outside pitches. It often develops as a fear response to inside pitches. The fix: place a batting tee or cone where the front foot is incorrectly stepping — the player learns to stride toward the pitcher to avoid the obstacle.",
        },
        {
          id: "baseball-1-03-q3",
          type: "Power Source",
          challenge: `  Coach tells player: "Don't just use your arms —
  swing with your whole body."

  The player asks: "What part of my body
  actually generates the power in a swing?"`,
          text: "What is the primary source of power in a proper baseball swing?",
          options: [
            "The forearms and wrists — generating 'snap' through contact",
            "The shoulders — a bigger shoulder turn creates more bat speed",
            "Hip rotation — the hips firing toward the pitcher drives the lower half into the swing",
            "The core muscles — the abs generate the rotational force",
          ],
          correctIndex: 2,
          explanation: "Hip rotation is the primary power source. When the hips fire toward the pitcher, they pull the torso, shoulders, and arms through the contact zone in sequence — generating far more force than arm strength alone. The 'squish the bug' teaching cue (rotating the back heel into the ground as the hips turn) helps young players connect their lower half to the swing. Players who only swing with their arms are losing the majority of their potential power.",
        },
        {
          id: "baseball-1-03-q4",
          type: "Contact",
          challenge: `  A player consistently pops up. Video review
  shows that just before contact, she raises
  her head and eyes to watch where the ball
  is going — even before the bat makes contact.

  What is this mistake, and what does it cause?`,
          text: "What happens when a batter lifts their head to watch contact before the bat actually hits the ball?",
          options: [
            "Nothing — watching the ball requires lifting the head to follow its flight",
            "The barrel drops below the ball, causing the bat to undercut it and produce pop-ups",
            "The back elbow drops, causing the bat to travel in an upward arc",
            "Hip rotation stops early because the head pulling up interrupts the kinetic chain",
          ],
          correctIndex: 1,
          explanation: "When a batter lifts their head early to watch the flight, the shoulder rises, the barrel drops below the plane of the ball, and the bat undercuts it — producing pop-ups and weak fly balls. Great hitters 'see the contact' — they keep their eyes and head down through the swing until well after the ball is hit. A coaching cue: 'see the bat hit the ball' — keeps the head down through contact. It feels unnatural at first because every instinct wants to watch where you hit it.",
        },
      ],
    },
  },

  // ─── baseball-1-04: Pitching Fundamentals ─────────────────────────────────────
  {
    epochId: "baseball-1",
    wonder: {
      name: "Wrigley Field",
      location: "Chicago, Illinois",
      era: "Modern",
      emoji: "🤾",
    },
    id: "baseball-1-04",
    order: 4,
    title: "Pitching Fundamentals",
    subtitle: "Grip, mechanics, pitch counts, and protecting your arm",
    category: "sports",
    xp: 90,
    badge: { id: "baseball-1-badge-04", name: "Young Ace", emoji: "💪" },
    challengeType: "quiz",
    info: {
      tagline: "A pitcher's arm is precious — throw with good mechanics and respect your pitch count.",
      year: 2007,
      overview: [
        "Pitching is a full-body athletic movement that places significant stress on the arm, particularly the elbow and shoulder. For youth pitchers, understanding proper mechanics and respecting pitch count limits is not just about performance — it is about arm health. Overuse injuries in youth pitching have reached epidemic levels in the United States, with injuries like UCL tears (Tommy John surgery) increasingly common in players as young as 15.",
        "The four-seam fastball is the foundational pitch for all youth pitchers. To grip it: place your index and middle fingers across the four seams (the seams that form a 'C' shape at the top of the ball), with the thumb underneath for support. The grip should be firm but not tight — gripping too hard creates tension in the forearm that reduces velocity and increases injury risk.",
        "Pitching mechanics sequence: start with a balanced stance on the rubber, begin the windup, stride forward toward home plate with the front foot (stride length approximately 80–90% of height for most pitchers), rotate the hips and shoulders, release the ball with the arm traveling in a natural arc, and follow through completely — the arm should finish on the glove-side thigh. Incomplete follow-through is a major cause of arm stress.",
      ],
      technical: {
        title: "Little League Pitch Count and Rest Requirements",
        body: [
          "Little League Baseball has strict pitch count rules designed to protect young arms. The limits depend on age: ages 7–8: max 50 pitches/day; ages 9–10: max 75 pitches/day; ages 11–12: max 85 pitches/day; ages 13–16: max 95 pitches/day; ages 17–18: max 105 pitches/day. These are maximums — coaches should monitor arm fatigue regardless of the count.",
          "Required rest days are equally important. If a pitcher throws 66+ pitches, they require 4 calendar days of rest before pitching again (ages 13 and above). Lower pitch counts require proportionally fewer rest days. Coaches and parents who ignore rest requirements for the sake of winning are the primary source of youth arm injuries. No game result is worth a child's long-term arm health.",
        ],
        codeExample: {
          label: "Little League Pitch Count Rules (Ages 11–12)",
          code: `  PITCH COUNT — AGES 11–12:
  Maximum pitches per day: 85

  REST REQUIREMENTS (ages 11–12):
  1–20 pitches thrown  → 0 days rest required
  21–35 pitches thrown → 1 day rest required
  36–50 pitches thrown → 2 days rest required
  51–65 pitches thrown → 3 days rest required
  66+ pitches thrown   → 4 days rest required

  ⚠  If a pitcher starts a batter when their
     rest threshold hasn't been reached, they
     may finish that batter before stopping.

  ADDITIONAL RULES:
  → A catcher who catches 4+ innings cannot
    pitch that same day.
  → Leagues may set LOWER limits but not higher.`,
        },
      },
      incident: {
        title: "The Youth Arm Injury Epidemic — ASMI Research 2007",
        when: "2007 — American Sports Medicine Institute study",
        where: "Birmingham, Alabama",
        impact: "Research by Dr. James Andrews and colleagues at ASMI documented that youth pitchers who threw more than 100 innings per year had a 3.5× greater risk of serious arm injury — driving adoption of pitch count rules in youth baseball nationwide.",
        body: [
          "In 2007, Dr. James Andrews and colleagues at the American Sports Medicine Institute (ASMI) published research showing that youth pitchers who threw over 100 innings per year were 3.5 times more likely to suffer serious arm injury than those who pitched fewer innings. The study also found that playing baseball year-round (particularly pitching) without adequate rest was a major risk factor.",
          "The research triggered significant changes in youth baseball. Little League International adopted formal pitch count rules in 2007. USA Baseball created the 'Pitch Smart' guidelines, which are now endorsed by every major youth baseball organization in the country. The core message: a pitcher's arm is not replaceable. Protecting it in youth baseball protects a child's ability to play for life.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Overuse / Poor Mechanics", sub: "stress on elbow + shoulder", type: "attacker" },
          { label: "Pitch Count Limits", sub: "Little League enforced rules", type: "system" },
          { label: "Youth Pitcher's Arm", sub: "still developing — vulnerable", type: "victim" },
          { label: "Healthy Arm", sub: "plays well into adult years", type: "result" },
        ],
      },
      timeline: [
        { year: 1990, event: "Youth arm injuries begin rising as year-round baseball becomes common" },
        { year: 2000, event: "USA Baseball and ASMI begin studying youth pitching injuries" },
        { year: 2007, event: "Little League Baseball adopts formal pitch count rules — ages 7–18", highlight: true },
        { year: 2010, event: "USA Baseball launches 'Pitch Smart' guidelines — science-based arm care program" },
        { year: 2015, event: "Tommy John surgeries in players under 20 double compared to 2000 levels (ASMI data)" },
        { year: 2020, event: "Year-round specialization identified as top risk factor — multi-sport participation recommended" },
      ],
      keyTakeaways: [
        "Grip the four-seam fastball across the four seams, finger pads on the leather — not too tight",
        "Follow through completely — arm finishes on the glove-side thigh — incomplete follow-through injures elbows",
        "Little League pitch count limits exist to protect young arms — ages 11–12 maximum is 85 pitches/day",
        "Rest requirements after pitching are mandatory — 66+ pitches requires 4 days of rest before pitching again",
      ],
      references: [
        { title: "Little League: Pitch Count Rules", url: "https://www.littleleague.org/playing-rules/pitch-count/" },
        { title: "USA Baseball: Pitch Smart Guidelines", url: "https://www.usabaseball.com/pitchsmart" },
        { title: "ASMI: Youth Baseball Arm Care Research", url: "https://www.asmi.org" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-1-04-q1",
          type: "Grip",
          challenge: `  You're teaching the four-seam fastball grip.
  The pitcher places their fingers and you check:
  index and middle fingers are across the seams,
  thumb underneath for support.

  The pitcher squeezes the ball hard — their
  forearm is visibly tense.`,
          text: "What is wrong with gripping the ball too tightly when pitching?",
          options: [
            "A tight grip causes the ball to sink rather than going straight",
            "Gripping too hard creates forearm tension that reduces velocity and increases injury risk",
            "Too tight a grip causes blisters more quickly — that is the main concern",
            "A tight grip makes it harder to hide the pitch type from the batter",
          ],
          correctIndex: 1,
          explanation: "Gripping the ball too tightly creates tension throughout the forearm and elbow — reducing the natural looseness (called 'loose arm') that generates velocity and protects the joint. Pitchers should feel like they can hold the ball firmly without white knuckles. A common cue: 'hold it like you're holding a bird — firm enough that it can't fly away, gentle enough that you don't hurt it.' Arm tension also shortens follow-through, compounding the injury risk.",
        },
        {
          id: "baseball-1-04-q2",
          type: "Mechanics",
          challenge: `  A pitcher releases the ball and immediately
  lets their arm drop to their side.
  Their arm finishes pointing at the ground
  rather than continuing across their body.

  Coach says: "You need to finish your pitch."`,
          text: "Why is complete follow-through important when pitching?",
          options: [
            "Follow-through adds velocity to the pitch — a long follow-through is the main source of fastball speed",
            "Complete follow-through allows the arm to decelerate naturally, reducing stress on the elbow and shoulder",
            "Follow-through positions the pitcher to field bunts — it is primarily a defensive mechanic",
            "An incomplete follow-through causes the pitch to rise — it affects ball movement",
          ],
          correctIndex: 1,
          explanation: "When a pitcher releases the ball, their arm is moving at extremely high speed. If the arm is stopped abruptly (by not following through), the decelerator muscles must absorb all that force suddenly — this is a major cause of arm strain and injury. Complete follow-through (arm crosses the body and finishes on the glove-side thigh) allows the arm to decelerate over a longer distance, spreading the force and protecting the joint. Think of it as the arm 'coasting to a stop' rather than hitting a wall.",
        },
        {
          id: "baseball-1-04-q3",
          type: "Pitch Count",
          challenge: `  An 11-year-old pitcher has thrown 70 pitches
  in a game. She is still pitching well —
  no visible fatigue.

  The coach wants her to stay in the game.
  Little League rules for ages 11–12:
  Maximum 85 pitches per day.
  66+ pitches = 4 days required rest.`,
          text: "If the pitcher throws 70 pitches today, what are her rest requirements before she can pitch again?",
          options: [
            "She can pitch again tomorrow — she's still under the 85-pitch maximum",
            "She must rest 4 calendar days before pitching in another game",
            "She must rest 3 days — 70 pitches falls in the 51–65 range",
            "No rest required — she finished under the maximum for her age",
          ],
          correctIndex: 1,
          explanation: "At 70 pitches, she has crossed the 66-pitch threshold — which requires 4 calendar days of rest before pitching again in any game, regardless of how good she felt. The rest requirement is based on TOTAL pitches thrown that day, not how she looked. The maximum (85) means she CAN throw that many — but throwing 66+ always triggers the 4-day rest rule. Coaches who exceed rest requirements put children's arms at serious risk.",
        },
        {
          id: "baseball-1-04-q4",
          type: "Arm Health",
          challenge: `  A 13-year-old pitcher plays baseball year-round —
  travel ball in the spring, All-Stars in summer,
  fall ball, and pitching lessons in winter.
  He pitches 5–6 months out of the year.

  His father asks his pediatric orthopedist:
  "Is year-round baseball okay for his arm?"`,
          text: "What do sports medicine researchers recommend about year-round pitching for young athletes?",
          options: [
            "Year-round baseball is fine if pitch counts are respected within each individual season",
            "Young pitchers should take at least 3–4 consecutive months off from overhead throwing each year",
            "Year-round pitching builds arm strength and reduces injury risk through conditioning",
            "Only winter pitching is problematic — summer and fall participation is low-risk",
          ],
          correctIndex: 1,
          explanation: "USA Baseball's Pitch Smart guidelines and ASMI research both recommend that young pitchers take at least 3–4 consecutive months off from all overhead throwing each year. This rest period allows the arm to recover, the growth plates to remain healthy, and the athlete to develop other skills (and play other sports). Year-round baseball without a rest period is identified as one of the primary risk factors for UCL injuries and early-onset elbow damage. Playing multiple sports is also recommended — athletes who specialize only in baseball have significantly higher injury rates.",
        },
      ],
    },
  },

  // ─── baseball-1-05: Fielding and Throwing ─────────────────────────────────────
  {
    epochId: "baseball-1",
    wonder: {
      name: "PNC Park",
      location: "Pittsburgh, Pennsylvania",
      era: "Modern",
      emoji: "🧤",
    },
    id: "baseball-1-05",
    order: 5,
    title: "Fielding and Throwing",
    subtitle: "Ready position, ground balls, fly balls, and throwing mechanics",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-1-badge-05", name: "Gold Glover", emoji: "🧤" },
    challengeType: "quiz",
    info: {
      tagline: "Every great play in the field starts with the right ready position — before the ball is hit.",
      year: 1960,
      overview: [
        "Defense in baseball begins before the ball is pitched. A fielder in the correct ready position — athletic stance, glove out and ready, on the balls of their feet — can react to any ball faster and more cleanly than one who is caught flat-footed. The ready position is: feet slightly wider than shoulder-width, knees bent, weight forward on the balls of the feet, glove at waist height in front of the body, eyes up and tracking the batter.",
        "Fielding ground balls requires approaching the ball rather than waiting for it to arrive. The technique: charge forward to take the ball out front (not letting it play you), get the body low (back parallel to the ground), place the glove down with fingers pointing at the ground (to prevent short-hops bouncing over the glove), watch the ball into the glove, field with both hands (the throwing hand closes over the ball in the glove). The common mistake: straightening up too early and trying to field at hip height — balls go through the legs.",
        "Throwing mechanics: grip the ball with a four-seam fastball grip across the seams (straight, accurate throw), align the front shoulder toward the target, step with the front foot toward the throw, rotate hips and shoulders, extend the arm naturally, and follow through. The accuracy of a throw comes from consistent grip and front shoulder alignment.",
      ],
      technical: {
        title: "Fly Ball Positioning and Two-Hand Fielding",
        body: [
          "Catching fly balls: move under the ball early — get to the spot before the ball arrives and let it come to you. Position yourself so the ball is coming slightly toward you (not going away). Give yourself a slight crow-hop (a shuffle step) before throwing, which allows you to generate momentum toward your target. Two hands whenever possible: use the throwing hand to close over the ball as it enters the glove, securing it and enabling a faster transfer to throw.",
          "Judging fly balls is a skill that develops with repetition — the sound of the bat and the initial trajectory of the ball are the primary cues. A ball hit high and straight is easier to track; a line drive is harder. Outfielders should never backpedal — always turn and run to the ball's projected landing spot, then let the ball come to you.",
        ],
        codeExample: {
          label: "Ground Ball Fielding Technique",
          code: `  GROUND BALL — STEP BY STEP:

  1. READY POSITION:
     → Knees bent, glove out, weight forward
     → Eyes on the batter (not the infield)

  2. CHARGE:
     → Move toward the ball (don't wait for it)
     → Read the hop — charge to a good hop

  3. APPROACH:
     → Get LOW — back parallel to ground
     → Glove fingers pointing DOWN at grass
     → Left foot slightly ahead (right-handers)

  4. FIELD:
     → Watch the ball ALL the way into the glove
     → Close throwing hand over ball in glove

  5. TRANSFER:
     → Quick grip (four-seam if possible)
     → Step toward target, throw through it`,
        },
      },
      incident: {
        title: "Roberto Clemente and the Art of Outfield Throwing",
        when: "1960–1972 — Pittsburgh Pirates",
        where: "PNC Park (Forbes Field), Pittsburgh, Pennsylvania",
        impact: "Roberto Clemente's outfield arm is widely considered the best in baseball history — he won 12 consecutive Gold Glove Awards and was famous for throwing out runners on the base paths who tried to take extra bases. His arm became the template for outfield throwing instruction.",
        body: [
          "Roberto Clemente played right field for the Pittsburgh Pirates from 1955 to 1972 and won 12 consecutive Gold Glove Awards — the most prestigious defensive award in baseball. Opposing managers would tell their runners: do not try to take extra bases on Clemente. His arm — powerful, accurate, and remarkably quick from glove to release — threw out runners at any base, including home, from the right field warning track.",
          "Clemente's technique was studied by coaches for generations: he used a low, compact arm action, hit the cutoff man precisely, and anticipated where base runners would go before the ball was hit. His defensive play remains the benchmark for outfield instruction. He was killed in a plane crash on December 31, 1972, while delivering disaster relief supplies to Nicaragua — one of baseball's most beloved figures, remembered for his character as much as his talent.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Ready Position", sub: "weight forward, glove ready", type: "system" },
          { label: "Ball Is Hit", sub: "read trajectory immediately", type: "attacker" },
          { label: "Charge and Get Low", sub: "field out front, two hands", type: "victim" },
          { label: "Quick Transfer", sub: "four-seam grip, step and throw", type: "result" },
        ],
      },
      timeline: [
        { year: 1955, event: "Roberto Clemente joins the Pittsburgh Pirates — transforms outfield defense" },
        { year: 1960, event: "Clemente wins first Gold Glove Award — goes on to win 12 consecutive", highlight: true },
        { year: 1962, event: "Rawlings Gold Glove Awards become the industry standard for defensive excellence" },
        { year: 1975, event: "Youth baseball programs begin teaching the 'charge the ball' technique formally" },
        { year: 2000, event: "Two-hand fielding technique standardized in youth coaching curriculum" },
        { year: 2020, event: "Statcast defensive metrics change how outfield positioning is evaluated" },
      ],
      keyTakeaways: [
        "Start every pitch in the ready position — weight forward, knees bent, glove out front",
        "Charge ground balls; get low with glove fingers pointing down to prevent balls going under the glove",
        "Always try to use two hands — the throwing hand closes over the ball for a faster, more secure transfer",
        "Grip the ball with a four-seam grip before throwing for maximum accuracy and carry",
      ],
      references: [
        { title: "Little League: Fielding Fundamentals Coaching Guide", url: "https://www.littleleague.org/player-and-coach-resources/baseball-coaching-guides/" },
        { title: "Baseball Hall of Fame: Roberto Clemente", url: "https://baseballhall.org/hall-of-famers/clemente-roberto" },
        { title: "MLB Youth: Defensive Skills Clinics", url: "https://www.mlb.com/youth-programs" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-1-05-q1",
          type: "Ready Position",
          challenge: `  You're playing second base. The pitcher is in
  the windup. You're standing upright with
  your arms at your sides, glove hanging down.

  The batter hits a sharp ground ball toward you.
  You don't get to it in time.

  What was wrong with your position?`,
          text: "What elements should be included in a proper fielding ready position before the pitch?",
          options: [
            "Feet together, arms extended — maximizes reach when the ball is hit",
            "Standing upright, hands at sides — maintains energy for a burst when the ball is hit",
            "Feet wider than shoulders, knees bent, weight on balls of feet, glove out front at waist",
            "Crouched low with glove on the ground — ready for all ground balls",
          ],
          correctIndex: 2,
          explanation: "The ready position: feet slightly wider than shoulder-width, knees bent, weight forward on the balls of the feet (not flat-footed), and glove held out in front at approximately waist height. This athletic stance allows you to move in any direction instantly. Standing upright with arms at sides is a resting position — it adds nearly half a second to your first step reaction time, which is often the difference between making a play and missing it.",
        },
        {
          id: "baseball-1-05-q2",
          type: "Ground Ball Technique",
          challenge: `  Ground ball hit toward a player. Two options:

  OPTION A: Stay back and wait for the ball to
           arrive, field it when it comes to you

  OPTION B: Charge toward the ball, get low,
           field it out in front of the body`,
          text: "Why should fielders charge ground balls rather than waiting for them?",
          options: [
            "Charging is faster — getting to the ball quickly prevents runners from advancing",
            "Charging allows you to choose which hop to field (preferring a longer hop over a short hop near the glove)",
            "Both — charging gets you to the ball faster AND gives you control over which hop you field",
            "Charging is only appropriate for infielders — outfielders should always let balls come to them",
          ],
          correctIndex: 2,
          explanation: "Charging a ground ball accomplishes two things: (1) it gets you to the ball faster, reducing the time runners have to advance; and (2) it gives you control over the bounce. Ground balls take a series of hops — some predictable (a 'true' long hop), some unpredictable (a short hop close to the glove). By charging, you can eliminate the bad hops by getting to the ball at the long hop before it makes a second, unpredictable bounce. Waiting passively forces you to deal with whatever hop arrives.",
        },
        {
          id: "baseball-1-05-q3",
          type: "Throwing",
          challenge: `  A shortstop fields a routine ground ball and
  grabs the ball with a random four fingers on
  the leather, with no attention to seam placement.
  She throws to first — the ball tails badly
  and the first baseman has to stretch.

  What would improve this throw?`,
          text: "Why is the four-seam grip important for throwing accuracy?",
          options: [
            "The four-seam grip adds velocity — the seams cutting through the air reduce drag",
            "A four-seam grip across the seams produces a straight, true ball with backspin — maximizing accuracy and carry",
            "It doesn't matter — grip only affects pitch movement, not thrown accuracy",
            "The four-seam grip prevents short-hops at the receiving end — the ball arrives on a better trajectory",
          ],
          correctIndex: 1,
          explanation: "The four-seam fastball grip — index and middle fingers across the four seams — produces a throw with pure backspin. Backspin creates the Magnus effect, which makes the ball travel in a straight, true line with maximum carry. Grip variations (accidentally across fewer seams, or along the seams) create side-spin or two-seam spin, causing the ball to tail or sink unpredictably. Quick four-seam grip on every throw is a habit that significantly improves throwing accuracy.",
        },
        {
          id: "baseball-1-05-q4",
          type: "Fly Balls",
          challenge: `  A fly ball is hit over an outfielder's head.
  The outfielder begins backpedaling to
  track the ball. She catches it but stumbles
  slightly on the play.

  Coach says: "Turn and run — don't backpedal."`,
          text: "Why should outfielders turn and run on balls hit over their head rather than backpedaling?",
          options: [
            "Backpedaling is slower and unstable — turning allows a full sprint to the landing spot",
            "Turning allows the outfielder to see other runners on base while tracking the ball",
            "Running forward is faster than backpedaling — outfielders should always move toward the infield",
            "Backpedaling causes the ball to drift in the wind — running stabilizes the visual tracking",
          ],
          correctIndex: 0,
          explanation: "Backpedaling is significantly slower and less stable than turning and running. A player can sprint at full speed forward; they cannot backpedal at anywhere near the same pace, and backpedaling risks tripping and falling. The correct technique on a ball over the head: drop step (pivot on one foot and turn your body toward where the ball will land), then run at full sprint to the landing spot. Practice with your coach on drop-step reads — it is a skill that requires repetition to become natural.",
        },
      ],
    },
  },

  // ─── baseball-1-06: Infield Play ──────────────────────────────────────────────
  {
    epochId: "baseball-1",
    wonder: {
      name: "Yankee Stadium",
      location: "New York, New York",
      era: "Modern",
      emoji: "🏃",
    },
    id: "baseball-1-06",
    order: 6,
    title: "Infield Play",
    subtitle: "Stretching at first, double plays, communication, and backing up",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-1-badge-06", name: "Infield Anchor", emoji: "🔷" },
    challengeType: "quiz",
    info: {
      tagline: "Good infield play isn't just about making the hard plays — it's about making the right play every time.",
      year: 1927,
      overview: [
        "The infield positions each have specific responsibilities beyond fielding balls hit in their direction. The first baseman is the anchor of every infield throw — they must learn to stretch for off-target throws while keeping their foot on the base, which is both a technique and a skill that prevents many errors from becoming hits. The shortstop and second baseman must learn the double play pivot — the mechanics of how to receive the ball at second and quickly transfer to a throw to first.",
        "Communication is a critical and undervalued skill in the infield. When a ball is hit or thrown in an ambiguous area, the fielder who calls 'I got it!' must be heard over the crowd and must call early — not at the last second. If two fielders converge on a pop-up with no call, collisions can cause injuries. The rule: the player who calls first has priority; other fielders peel away. Call early and call loud.",
        "Backing up is the habit of repositioning behind a play in case of an overthrow or wild throw. Every player on the field should be moving on every play — even if the ball is not hit to them. The pitcher backs up third and home on throws from the outfield. The center fielder backs up second base. Every fielder has a responsibility to be somewhere useful on every single pitch.",
      ],
      technical: {
        title: "The Double Play — 6-4-3 Mechanics",
        body: [
          "For the second baseman receiving a throw at second base (the 4 in a 6-4-3): catch the ball, drag the back foot across the bag while throwing (or touch with the foot just before catching), and clear away from the base path to avoid the runner. The key is catching the ball first, then making the throw — never rush the transfer so badly that both plays are missed.",
          "For the shortstop throwing to second (the 6 in a 6-4-3): read the runner's distance, throw to a consistent location (slightly to the first-base side of the bag, at chest height), and let the second baseman make the pivot. A good feed from the shortstop makes the second baseman's job dramatically easier — a bad feed at the runner's eyes or in the dirt makes it nearly impossible.",
        ],
        codeExample: {
          label: "Infield Communication Rules",
          code: `  POP-UPS / FLY BALLS — PRIORITY ORDER:
  (who has priority when two fielders converge)

  OUTFIELDERS > INFIELDERS
  (outfielder running in has better angle,
  more momentum, and calls "I GOT IT!")

  SHORTSTOP > SECOND BASE on balls between them
  CENTER FIELD > ALL OUTFIELDERS
  CATCHER > PITCHER on pop-ups near the plate

  COMMUNICATION RULES:
  ✓  Call LOUD: "I GOT IT! I GOT IT!"
  ✓  Call EARLY: before both players arrive
  ✓  Once called: other player PEELS AWAY
  ✗  Never call and then pull back — commit
  ✗  Never assume another player has it`,
        },
      },
      incident: {
        title: "The 1927 Yankees Infield — Setting the Standard",
        when: "1927 — New York Yankees World Series championship season",
        where: "Yankee Stadium, New York, New York",
        impact: "The 1927 Yankees, often called the greatest baseball team ever, featured Lou Gehrig at first base — renowned for his stretch at the bag that saved inaccurate throws and kept baserunners off base. His technique became the model taught to first basemen for generations.",
        body: [
          "Lou Gehrig's tenure at first base for the New York Yankees (1923–1939) coincided with the era when first base technique was being formally codified. Gehrig, famous for his consistent excellence, developed the full stretch at first base into an art form — he could extend his reach to snag throws that might otherwise pull other players off the bag, turning would-be hits into putouts.",
          "Baseball coaches studying the 1927 Yankees — who went 110-44 and swept the World Series — noted that their infield execution was as much responsible for their success as the famous offense featuring Babe Ruth. The principle of 'save a bad throw whenever possible while keeping the foot on the bag' remains standard first base instruction today at every level from Little League to the Major Leagues.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Ball Hit to Infield", sub: "multiple players in motion", type: "attacker" },
          { label: "Primary Fielder", sub: "calls and takes the ball", type: "system" },
          { label: "Supporting Players", sub: "back up every throw", type: "victim" },
          { label: "Out Recorded Cleanly", sub: "no overthrow, no collision", type: "result" },
        ],
      },
      timeline: [
        { year: 1920, event: "Professional baseball codifies infield position responsibilities in coaching guides" },
        { year: 1927, event: "1927 Yankees set defensive standard — infield execution studied for generations", highlight: true },
        { year: 1960, event: "Double play pivot mechanics become standard youth coaching curriculum" },
        { year: 1975, event: "Little League coaching manuals first include communication protocols for pop-ups" },
        { year: 2005, event: "Infield shifts become widespread in professional baseball — defensive positioning evolves" },
        { year: 2023, event: "MLB bans extreme infield shifts — traditional positioning reinstated" },
      ],
      keyTakeaways: [
        "First baseman: stretch fully toward the throw while keeping one foot on the bag — save every reachable throw",
        "Communication is critical — call 'I got it!' early and loud; the caller has priority, others peel away",
        "On a double play, catch the ball first — never rush the transfer so badly that you miss both plays",
        "Everyone backs up every throw — if you're not involved in the primary play, find the backup position",
      ],
      references: [
        { title: "Little League: Infield Coaching Guide", url: "https://www.littleleague.org/player-and-coach-resources/baseball-coaching-guides/" },
        { title: "Baseball Hall of Fame: Lou Gehrig", url: "https://baseballhall.org/hall-of-famers/gehrig-lou" },
        { title: "MLB: Infield Fundamentals Clinics", url: "https://www.mlb.com/youth-programs" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-1-06-q1",
          type: "First Base",
          challenge: `  A throw from the shortstop is slightly to the
  second-base side of first base (not perfectly
  on target). The first baseman has to choose:

  OPTION A: Stay in normal position, can't reach it
  OPTION B: Step toward the ball with left foot,
            stretch across the bag, keep right
            foot on the bag as long as possible`,
          text: "What is the correct first base technique when a throw is slightly off-target?",
          options: [
            "Option A — it's safer to hold position than risk being pulled off the bag",
            "Option B — stretch toward the throw with the receiving foot, keeping one foot on the bag as long as possible to both catch the ball and record the out",
            "Step fully off the bag to catch the throw — secure the ball first, then attempt the tag",
            "Signal to the infielder to hold the throw — only accept accurate throws",
          ],
          correctIndex: 1,
          explanation: "The first baseman's stretch is one of baseball's most valuable techniques. By stepping toward the off-target throw with the receiving foot while anchoring the other foot on the bag, the first baseman increases their reach by several feet — turning what would have been an error into an out. The key: the foot stays on the bag as long as possible, and the player stretches as far as physically possible. This skill requires practice but dramatically improves the infield's ability to handle imperfect throws.",
        },
        {
          id: "baseball-1-06-q2",
          type: "Communication",
          challenge: `  A pop-up is hit between the second baseman
  and right fielder. Both players run hard
  for the ball. Neither calls for it.
  They collide.

  How should this situation have been handled?`,
          text: "What should outfielders and infielders do when converging on the same fly ball?",
          options: [
            "The nearest player takes it — whoever gets there first has priority",
            "The player who calls 'I got it!' first has priority — the other player immediately peels away",
            "Infielders always have priority over outfielders — they should call for any ball they can reach",
            "Both players should slow down and communicate — never commit until you're sure the other isn't taking it",
          ],
          correctIndex: 1,
          explanation: "The first player to call 'I GOT IT!' (loudly, clearly, twice) has priority. Once called, the other player immediately stops pursuing the ball and peels away. The priority order when players converge: outfielders generally have priority over infielders (they're running in with more momentum and a better angle). On balls hit between outfield positions, center field typically has priority. The critical rule: never call it and then back off — commit to the call.",
        },
        {
          id: "baseball-1-06-q3",
          type: "Double Play",
          challenge: `  Runner on first. Ground ball to shortstop.
  Shortstop throws to second for the first out.
  Second baseman tries to make the throw to first
  WHILE catching the ball — drops it instead.

  What mistake was made?`,
          text: "What is the key principle for executing the second part of a double play at second base?",
          options: [
            "Catch the ball first, then make the throw — never sacrifice the catch for a faster release",
            "Release is most important — prioritize the throw to first over securing the catch",
            "The second baseman should always use one hand to speed up the transfer",
            "Slide step toward first base before catching the ball — generates throw momentum",
          ],
          correctIndex: 0,
          explanation: "Catch first, throw second — always. Rushing the transfer so quickly that the ball is not secured produces the worst possible outcome: neither out is recorded. Get the ball securely in the glove, drag or touch the bag, then make the throw. A completed first out with a missed double play throw is better than two missed plays. As players develop, the transfer speed increases naturally — but the sequence never changes: secure, then release.",
        },
        {
          id: "baseball-1-06-q4",
          type: "Backing Up",
          challenge: `  A runner is on second base. The batter
  hits a single to left field. The left fielder
  throws home. The pitcher watches the play
  from near the mound.

  What should the pitcher be doing?`,
          text: "What is the pitcher's backup responsibility on a throw to home plate from the outfield?",
          options: [
            "Stay near the mound in case the catcher throws back to second for a double play",
            "Drift toward first base in case the catcher throws there after the play at home",
            "Sprint behind home plate to back up the catcher on an errant throw",
            "Cover third base in case the runner on second tries to advance further",
          ],
          correctIndex: 2,
          explanation: "On all throws to home plate from the outfield, the pitcher's responsibility is to sprint behind home plate — to back up the catcher in case of an overthrow or errant hop. If the throw gets past the catcher and the pitcher is not there, the ball rolls to the backstop and runners advance. This backup responsibility applies to throws to third base too (pitcher backs up third). Pitchers should be moving to backup position on every single batted ball — they should never stand still watching.",
        },
      ],
    },
  },

  // ─── baseball-1-07: Outfield Play ─────────────────────────────────────────────
  {
    epochId: "baseball-1",
    wonder: {
      name: "Dodger Stadium",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "🌿",
    },
    id: "baseball-1-07",
    order: 7,
    title: "Outfield Play",
    subtitle: "Drop step, reading the bat, cutoff man, and communication",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-1-badge-07", name: "Outfield Wall", emoji: "🌿" },
    challengeType: "quiz",
    info: {
      tagline: "The outfield is not a place to rest — it's where the game is saved.",
      year: 1958,
      overview: [
        "Outfielders must cover large amounts of ground quickly, read fly balls accurately, throw with power and accuracy, and communicate constantly with each other. The most critical skill is reading the crack of the bat — the sound of contact tells an outfielder immediately whether the ball will be hit softly (handle hit, off the end) or hard (off the sweet spot), and the angle of contact tells them roughly where it will go. Experienced outfielders are already taking their first step before the ball clears the infield.",
        "The drop step is the foundational technique for balls hit over an outfielder's head. When you see the ball going back, pivot on the foot nearest the direction the ball is going (drop that foot behind you), turn your body, and sprint at full speed to the landing spot — never backpedal. The drop step gets you to full sprint speed in two steps rather than several shuffling steps backward.",
        "Throwing to the cutoff man — the infielder who positions themselves in the relay path between the outfielder and the base — is standard for most throws from the outfield. Throwing through the cutoff man rather than directly to the base allows the cutoff man to redirect if the play changes, and it keeps a soft throw from rolling to the backstop. The exception: if the throw is strong enough to beat the runner directly, and the cutoff is waving you through.",
      ],
      technical: {
        title: "Outfield Communication and Fence Awareness",
        body: [
          "Outfielders communicate constantly: calling for fly balls, signaling cutoff positions, warning teammates of the fence. The center fielder is generally the captain of the outfield — they have priority on balls hit to either gap. If the center fielder calls for a ball, the corner outfielder peels away even if they were closer to the ball.",
          "Fence awareness is a safety and performance issue. Know where the warning track is — the dirt or gravel strip before most outfield fences that warns the fielder they are near the wall. When you feel the warning track, look up for the fence before continuing to run. Never run full-speed into a fence to make a catch unless you are experienced enough to know exactly how far you are from it. Youth coaches should walk players to the warning track at the start of every season so they know what it feels like.",
        ],
        codeExample: {
          label: "Outfield Responsibilities — Quick Reference",
          code: `  READING THE BALL:
  → Sound at contact: solid vs. handle hit
  → Bat angle: pull, up the middle, opposite field
  → First step on contact — not on landing

  DROP STEP (ball over your head):
  → Pivot on foot nearest ball direction
  → Turn body 180° and SPRINT — don't backpedal
  → Get to landing spot, let ball come to you

  CUTOFF MAN — HIT IT:
  → Most throws go through the relay infielder
  → Throw chest-high to the cutoff man
  → Exception: wave through = throw to base

  FENCE SAFETY:
  → Know where the warning track is
  → When you hit dirt: glance up for wall
  → Don't sprint blind — know your distance`,
        },
      },
      incident: {
        title: "Willie Mays and the Catch — Polo Grounds 1954",
        when: "September 29, 1954 — World Series Game 1",
        where: "Polo Grounds, New York City",
        impact: "Willie Mays' over-the-shoulder catch off Vic Wertz's 420-foot drive in the 1954 World Series is considered the greatest defensive play in baseball history — a demonstration of the drop step, reading the ball off the bat, and pure athleticism that became the defining moment of outfield play.",
        body: [
          "In Game 1 of the 1954 World Series at the Polo Grounds, Cleveland's Vic Wertz hit a drive 420 feet to deep center field with two runners on base. Willie Mays turned at the crack of the bat and sprinted toward the center field wall — full speed with his back to the infield. At approximately the 460-foot mark, he caught the ball over his shoulder, whirled, and threw an extraordinary relay throw back to the infield, preventing both runners from scoring.",
          "The play, simply called 'The Catch,' was captured on film and is watched by baseball fans 70 years later. It demonstrated every element of elite outfield play: reading the bat, immediate drop step, full sprint to the landing spot, and an accurate, powerful throw after a nearly impossible catch. Willie Mays later said of the play that it was not the hardest catch he ever made — it was simply the most famous. The New York Giants won the World Series in four games.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Crack of the Bat", sub: "read distance and direction", type: "attacker" },
          { label: "Drop Step Sprint", sub: "turn, run — don't backpedal", type: "system" },
          { label: "Ball Lands — Caught", sub: "two hands, squeeze tight", type: "victim" },
          { label: "Throw to Cutoff Man", sub: "relay to prevent advancement", type: "result" },
        ],
      },
      timeline: [
        { year: 1954, event: "Willie Mays makes 'The Catch' in the World Series — outfield play forever changed", highlight: true },
        { year: 1958, event: "Dodgers move to Los Angeles — Dodger Stadium becomes a model for outfield scouting" },
        { year: 1970, event: "Outfield communication protocols formally introduced in youth baseball coaching guides" },
        { year: 1990, event: "Warning track requirements standardized across youth baseball field specifications" },
        { year: 2010, event: "Drop step drill becomes standard in youth outfield training programs" },
        { year: 2023, event: "Statcast outfield metrics quantify jump time and route efficiency at the Major League level" },
      ],
      keyTakeaways: [
        "Read the ball off the bat — sound and angle tell you where to go before the ball is visible",
        "Drop step on balls over your head — turn and sprint, never backpedal",
        "Throw chest-high to the cutoff man on most throws — he can redirect if the play changes",
        "Know where the warning track is before every game — it tells you the fence is close",
      ],
      references: [
        { title: "Little League: Outfield Coaching Guide", url: "https://www.littleleague.org/player-and-coach-resources/baseball-coaching-guides/" },
        { title: "Baseball Hall of Fame: Willie Mays", url: "https://baseballhall.org/hall-of-famers/mays-willie" },
        { title: "MLB Film Room: The Catch (1954)", url: "https://www.mlb.com/video" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-1-07-q1",
          type: "Drop Step",
          challenge: `  You're playing center field. A ball is hit over
  your head to your right. You begin to
  backpedal, watching the ball.

  Coach blows the whistle: "Wrong technique!"

  What should you have done?`,
          text: "What is the correct technique when a ball is hit over an outfielder's head?",
          options: [
            "Backpedal while keeping your eyes on the ball — it maintains visual tracking",
            "Drop step: pivot on the right foot, turn body fully, and sprint to where the ball will land",
            "Sprint straight back and then adjust — speed first, direction second",
            "Call for help from the corner outfielder and let them take the ball",
          ],
          correctIndex: 1,
          explanation: "Drop step: when a ball is hit to your right and over your head, pivot on your right foot (drop it back and behind you), fully rotate your body, and sprint at full speed to the projected landing spot. This gets you to full sprint in two steps. Backpedaling is slow, unstable, and dangerous near the fence. You cannot cover the same ground backpedaling that you can sprinting, and good outfielders make these plays by getting to the spot before the ball — then waiting for it.",
        },
        {
          id: "baseball-1-07-q2",
          type: "Cutoff Man",
          challenge: `  You catch a single in left field. The runner
  is trying to score from second base.
  The cutoff man (shortstop) is positioned
  between you and home plate, arms raised.

  Should you throw to the cutoff or directly
  to home plate?`,
          text: "When should you throw through the cutoff man vs. directly to the base?",
          options: [
            "Always throw to the cutoff — they always know better where to redirect the ball",
            "Always throw directly to home — the cutoff just slows down the throw",
            "Throw to the cutoff by default; only throw directly to the base if the cutoff waves you through or your arm is strong enough to beat the runner",
            "Throw wherever the coach signals from the dugout — the coach has the best view",
          ],
          correctIndex: 2,
          explanation: "Throw to the cutoff man by default. The cutoff man can redirect if the play changes (runner stops, different runner is advancing), cut the ball if it won't beat the runner and keep it from rolling to the backstop, and relay if needed. Only throw directly to the base if: (1) the cutoff man waves you through (arms straight down = cut it, arms overhead/waving = let it go through), or (2) you are close enough and your arm is strong enough to clearly beat the runner. When in doubt, hit the cutoff.",
        },
        {
          id: "baseball-1-07-q3",
          type: "Fence Safety",
          challenge: `  You're chasing a fly ball in right field.
  You're running hard toward the fence.
  Your feet hit the warning track.

  What should you do?`,
          text: "What does feeling the warning track tell you, and what should you do when you feel it?",
          options: [
            "The warning track means you are safe — it is a buffer zone between you and the fence",
            "The warning track means the fence is close — glance up to locate the wall before continuing",
            "Stop running immediately — the warning track marks the edge of the safe running zone",
            "Continue running at full speed — experienced outfielders use the warning track as a timing guide only",
          ],
          correctIndex: 1,
          explanation: "The warning track is typically 10–15 feet of dirt or gravel before the outfield fence, designed to alert outfielders that the wall is close. When you feel it under your feet, glance up to locate the fence before continuing. You can often still make the catch near the fence — but you need to know exactly how far away it is. Running full speed blind into a fence causes serious injuries. Youth players should walk to the warning track at the start of every season to feel it and understand the distance to the wall.",
        },
        {
          id: "baseball-1-07-q4",
          type: "Reading the Bat",
          challenge: `  A ball is hit to right-center field.
  The right fielder takes a wrong first step —
  moving toward the infield — before correcting.

  The center fielder takes the correct first
  step immediately and makes the catch easily.

  What gave the center fielder the advantage?`,
          text: "How do experienced outfielders know where to run before the ball is clearly visible?",
          options: [
            "Experience guessing — some players develop intuition through thousands of games",
            "Reading the crack of the bat (sound = hard vs. soft contact) and the bat angle at contact (pull vs. opposite field)",
            "Watching the pitcher's release — the pitch type predicts ball flight direction",
            "Watching the batter's feet — stance position reveals where the ball will be hit",
          ],
          correctIndex: 1,
          explanation: "Experienced outfielders read two cues simultaneously at the moment of contact: (1) the sound — a loud, solid crack indicates a hard-hit ball that will carry; a duller sound indicates a softer hit. (2) The bat angle — a pull swing sends the ball to the pull field, an inside-out swing sends it to the opposite field. Together, these cues allow an outfielder to take their first step in the right direction before the ball is even visible above the infield. This read is trained through repetitive exposure — batting practice and fly ball drills build it over time.",
        },
      ],
    },
  },

  // ─── baseball-1-08: Baserunning ────────────────────────────────────────────────
  {
    epochId: "baseball-1",
    wonder: {
      name: "Camden Yards",
      location: "Baltimore, Maryland",
      era: "Modern",
      emoji: "💨",
    },
    id: "baseball-1-08",
    order: 8,
    title: "Baserunning",
    subtitle: "Leaving on contact, rounding, reading signs, and sliding",
    category: "sports",
    xp: 85,
    badge: { id: "baseball-1-badge-08", name: "Speedster", emoji: "💨" },
    challengeType: "quiz",
    info: {
      tagline: "Smart baserunning scores more runs than raw speed — knowing when to go is the skill.",
      year: 1966,
      overview: [
        "Baserunning is one of the most underrated skills in baseball, and one of the most strategic. A team that runs the bases aggressively and intelligently puts enormous pressure on defenses — every hit potentially becomes a multi-base hit, and every fly ball is a scoring opportunity. The fundamentals begin with knowing when to leave: base runners leave on contact with the ground (when the ball is put in play), not on the sound of the bat.",
        "Rounding a base means hitting the inside corner of the base with your foot, allowing you to maintain momentum in a curved arc rather than stopping and restarting. The technique: when running to first on a hit you think might go for extra bases, take a curved approach to the base — bow out toward foul territory about 15–20 feet before the bag, hit the inside corner of the base with your right foot, and continue in a curved line toward second. This is faster than running straight and making a sharp 90-degree turn.",
        "The third base coach is the player's eyes when running between second and third, and from third toward home. The coach uses signals — hands raised (stop), arm waving in circles (go), hands patting down (slide), or hands across the body (stop). On contact, the base runner's job is to run hard and read the coach — not to make the decision themselves. Trust the coach. They have the view; you don't.",
      ],
      technical: {
        title: "Sliding Technique — Safety and Execution",
        body: [
          "The bent-leg (hook) slide: as you approach the base, drop to the ground by bending your lower leg under you while extending the other leg toward the bag. Your body drops to the ground and you slide on your hip and thigh, extending the lead leg to touch the base. The advantage: you stay low and hard to tag, and the slide protects you from collisions. Always slide away from the tag if possible — aim for the corner of the bag farthest from where the throw is coming.",
          "The pop-up slide: same as the bent-leg, but the player uses the momentum of the slide to spring back to their feet — ideal at first base on a close play where the runner wants to continue to second if the throw is wild. Never pop-up slide into home or second when a fielder is blocking — use a hook slide to go around the tag.",
        ],
        codeExample: {
          label: "Baserunning Decision Guide",
          code: `  LEAVING THE BASE:
  → Leave on CONTACT (ball hits bat/ground)
  → NOT on the sound of the bat
  → Tag up on fly balls — leave when caught

  ROUNDING BASES:
  → Take a curved approach — bow out 15 ft before bag
  → Hit INSIDE CORNER of base with right foot
  → Maintain curved momentum — no sharp turns

  READING THE THIRD BASE COACH:
  → Arms up = STOP (hold or stop at 3rd)
  → Arm windmill = GO (keep running/score)
  → Pat down = SLIDE
  → Arms across = STOP, stay (at any base)

  SLIDING:
  → Bent-leg slide: hip down, lead leg extends
  → Pop-up slide: bent-leg, spring to feet after
  → Slide EARLY — never late`,
        },
      },
      incident: {
        title: "Lou Brock and the Science of Stolen Base Records",
        when: "1966–1979 — St. Louis Cardinals",
        where: "Busch Stadium, St. Louis (later Camden Yards era)",
        impact: "Lou Brock set the all-time stolen base record (938 career steals) by studying pitchers' movements, timing his breaks, and proving that baserunning was as much science as athleticism — changing how baserunning was taught at every level.",
        body: [
          "Lou Brock, who played for the St. Louis Cardinals from 1964 to 1979, held the all-time stolen base record (938 career steals, since surpassed by Rickey Henderson) and revolutionized the study of baserunning. Brock kept meticulous notes on every pitcher he faced — their delivery time to the plate, their move to first, their preferred pitch in steal situations. He reduced his lead, his jump, and his route to second base to a science.",
          "Brock's contribution to baseball was not just the stolen bases themselves but the intellectual framework he brought to baserunning. He demonstrated that smart baserunning — reading pitchers, timing breaks precisely, taking the right angle — was teachable and repeatable. His work influenced how coaches teach baserunning to this day: read the pitcher, time the jump, and run smart, not just fast.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Ball Hit", sub: "runner leaves on contact", type: "attacker" },
          { label: "Running Through Base", sub: "round inside corner, maintain speed", type: "system" },
          { label: "Third Base Coach", sub: "read the signal", type: "victim" },
          { label: "Score or Advance", sub: "aggressive, smart baserunning", type: "result" },
        ],
      },
      timeline: [
        { year: 1962, event: "Maury Wills steals 104 bases — modern stolen base era begins" },
        { year: 1966, event: "Lou Brock begins his scientific approach to baserunning in St. Louis", highlight: true },
        { year: 1977, event: "Brock breaks Ty Cobb's career stolen base record" },
        { year: 1982, event: "Rickey Henderson steals 130 bases in a single season — still the all-time record" },
        { year: 1991, event: "Henderson breaks Brock's career stolen base record" },
        { year: 2015, event: "Little League updates baserunning rules — delayed steal limitations in youth leagues" },
      ],
      keyTakeaways: [
        "Leave the base on contact with the ground, not on the sound of the bat — these are slightly different timings",
        "Round bases by hitting the inside corner — bow out early and maintain a curved arc rather than making sharp turns",
        "Always read and trust the third base coach — they have the view; you are running hard with your back to the field",
        "Slide early and low — aim for the corner of the bag away from the tag",
      ],
      references: [
        { title: "Little League: Baserunning Coaching Guide", url: "https://www.littleleague.org/player-and-coach-resources/baseball-coaching-guides/" },
        { title: "Baseball Hall of Fame: Lou Brock", url: "https://baseballhall.org/hall-of-famers/brock-lou" },
        { title: "MLB: Baserunning Skills Clinics", url: "https://www.mlb.com/youth-programs" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-1-08-q1",
          type: "Leaving the Base",
          challenge: `  You're on first base. The batter swings.
  You hear a loud crack — it sounds like
  a solid hit to right field.

  You leave the base immediately when you
  hear the crack of the bat.

  Is this correct timing?`,
          text: "When should a base runner leave the base on a batted ball?",
          options: [
            "On the sound of the bat — the crack tells you the ball is hit hard",
            "On contact — the moment the ball hits the bat (or ground for a ground ball), runners leave",
            "After you see the ball land in the outfield — then you know it's safe to run",
            "When the third base coach waves — never leave on your own judgment",
          ],
          correctIndex: 1,
          explanation: "Runners leave on contact — the moment the ball makes contact with the bat. The sound of the bat is a useful cue but is slightly after actual contact, which is why 'leave on contact' is the technical instruction. For fly balls, runners should hold or take a short lead until the ball is caught or falls in (on a fly ball, leaving too early and the ball being caught results in being doubled off). On ground balls, runners leave immediately on contact.",
        },
        {
          id: "baseball-1-08-q2",
          type: "Rounding Bases",
          challenge: `  You hit a ball to right-center field.
  You want to try for a double.

  OPTION A: Run straight to first base and
            make a 90-degree turn toward second

  OPTION B: Bow out toward foul territory
            15-20 feet before first, hit the
            inside corner of the bag, continue
            in a curved arc toward second`,
          text: "Why is Option B (rounding the base with a curve) faster than Option A (straight run and sharp turn)?",
          options: [
            "Option B is actually slower — the extra distance of bowing out costs more time than a sharp turn saves",
            "Option B maintains momentum in the direction of second base — a sharp 90-degree turn requires stopping and restarting",
            "Option B keeps the runner in fair territory, which is required by rule",
            "Option B positions the runner's right foot on the bag, which is required for proper rounding",
          ],
          correctIndex: 1,
          explanation: "Physics explains this. A sharp 90-degree turn requires the runner to decelerate sharply, change direction, and re-accelerate — losing significant momentum. Bowing out before the bag creates a curved running path that allows the runner to maintain most of their speed through the turn. By hitting the inside corner of the bag and continuing in a curved arc, the runner never truly stops — they redirect while running. This is consistently faster over the full path to second base.",
        },
        {
          id: "baseball-1-08-q3",
          type: "Third Base Coach",
          challenge: `  You're rounding third base at full speed.
  You glance at the third base coach.
  The coach's arms are waving in windmill circles.

  You have a feeling the outfielder might
  have a good arm and you could be out at home.`,
          text: "What should you do when the third base coach signals to go home?",
          options: [
            "Use your own judgment — if you think you'll be out, stop at third",
            "Go — run as hard as possible toward home; the coach has the view you don't have",
            "Hesitate and look at the outfielder's throw before committing",
            "Go only if you are 100% confident you'll be safe — never run into an out",
          ],
          correctIndex: 1,
          explanation: "When the third base coach waves you through, you go — full speed. The coach sees the entire field: the outfielder, the throw, the catcher positioning, the distance. Running at full speed toward third base, you see almost none of this. The entire purpose of the third base coach is to make this decision for you so you can run without splitting your attention. Players who second-guess the coach and stop hesitantly often get tagged in no-man's-land — the worst outcome. Trust the coach and commit fully.",
        },
        {
          id: "baseball-1-08-q4",
          type: "Tagging Up",
          challenge: `  You're on second base. Two outs. Batter hits
  a deep fly ball to right field. You know the
  rule about tagging up on fly balls.

  Do you need to tag up (return to second base)
  before advancing with two outs?`,
          text: "With two outs, must a runner tag up on a fly ball before advancing?",
          options: [
            "Yes — you must always tag up on fly balls regardless of the number of outs",
            "No — with two outs you can leave on contact; if the fly ball is caught, the inning is over anyway",
            "Yes — but only if the runner on first also tags up",
            "No — but you must still wait until the ball is clearly headed into the outfield",
          ],
          correctIndex: 1,
          explanation: "With two outs, base runners leave on contact just like any other batted ball — they do not need to tag up. Here is why: if the fly ball is caught with two outs, the inning is over regardless of where the runner is. The runner cannot score on a caught third out under any circumstances. So with two outs, the runner should run on contact — if the ball drops, they've already advanced. If it's caught, the inning is over. Tagging up with two outs wastes the opportunity created by the runner's head start.",
        },
      ],
    },
  },

  // ─── baseball-1-09: Catching ──────────────────────────────────────────────────
  {
    epochId: "baseball-1",
    wonder: {
      name: "Coors Field",
      location: "Denver, Colorado",
      era: "Modern",
      emoji: "🎯",
    },
    id: "baseball-1-09",
    order: 9,
    title: "Catching — The Field General",
    subtitle: "Equipment, signs, framing, blocking, and throwing",
    category: "sports",
    xp: 90,
    badge: { id: "baseball-1-badge-09", name: "Field General", emoji: "🛡️" },
    challengeType: "quiz",
    info: {
      tagline: "The catcher runs the defense — they see the whole field and direct traffic on every pitch.",
      year: 1950,
      overview: [
        "The catcher is the most physically demanding and strategically demanding position in baseball. They wear more equipment than any other player: a chest protector, helmet with a face guard (skull cap or helmet), shin guards, and a cup (required for male catchers). The equipment protects from foul tips, wild pitches, and collisions at the plate. The catcher is the only fielder who faces the entire field throughout the game.",
        "Catchers give signs to the pitcher for each pitch using hand signals in the glove hand: one finger for fastball, two fingers for curveball, three for changeup (or the team's specific system). The catcher must also set up (position their body) in the zone where they want the pitch thrown, giving the pitcher a target. The sign system must be changed when runners are on base (so the runner at second doesn't relay signs to the batter).",
        "Pitch framing is the skill of receiving pitches on the edge of the strike zone in a way that makes it easier for the umpire to call them strikes. The technique: keep the glove relatively still as the ball enters the mitt, with a subtle inward rotation for borderline pitches. Never 'stab' at the ball or make a dramatic catching motion — that draws the umpire's attention to the fact the pitch was outside. Good framers can gain their team 15–20 extra strike calls per game.",
      ],
      technical: {
        title: "Blocking Balls in the Dirt",
        body: [
          "Blocking is essential when a pitcher throws in the dirt with runners on base. Technique: drop both knees to the ground simultaneously (do not lunge), keep the chin tucked down toward the chest, curve the body forward to create a 'cup' shape, and let the ball hit the chest protector and drop in front of the plate — not to the side. The goal is to keep the ball in front, giving you time to pick it up and make a throw if needed.",
          "The throwing position: from the crouch, catchers throw with a quick, compact arm action — no long windup. The throw to second base is the most important defensive throw a catcher makes. The technique: shift the weight slightly forward, raise the arm to a high slot, and throw from the ear — a crisp, four-seam fastball directly over the second base bag. Time from catch to release is measured in fractions of a second.",
        ],
        codeExample: {
          label: "Catcher's Signs — Basic System",
          code: `  BASIC SIGN SYSTEM (no runner on 2nd):

  1 finger = FASTBALL
  2 fingers = CURVEBALL
  3 fingers = CHANGEUP
  4 fingers = Slider / Special pitch
  Fist      = Pitchout

  WITH RUNNER ON SECOND (sign-stealing risk):
  → Use multiple signs — the 2nd sign counts
  → Example: "middle finger system" — third
    sign given counts
  → Shake off + re-sign = pump-fake to confuse

  TARGETING:
  → Set up glove as target in desired zone
  → Inside corner: set up near batter's fists
  → Outside corner: set up near opposite edge
  → Signal, then set target before pitcher
    begins windup`,
        },
      },
      incident: {
        title: "Johnny Bench and the One-Handed Catching Revolution",
        when: "1968 — Cincinnati Reds",
        where: "Crosley Field, Cincinnati, Ohio",
        impact: "Johnny Bench introduced the one-handed catching technique in 1968, keeping the bare throwing hand behind the back rather than beside the glove. This eliminated thousands of finger injuries from foul tips and became the universal standard within five years.",
        body: [
          "Before Johnny Bench arrived in Cincinnati in 1968, catchers universally caught with two hands — the throwing hand placed beside the glove to secure the ball and enable a quick transfer. The problem: foul tips frequently hit the unprotected throwing hand, breaking fingers. Every catcher of that era has a story about broken fingers.",
          "Bench noticed that the transfer of the ball from glove to throwing hand was fast enough without having the bare hand beside the glove on every pitch. He began keeping his throwing hand behind his back until the instant of transfer. Within a few seasons, virtually every catcher in professional baseball had adopted the technique. Today, two-handed catching is only taught for the final securing motion — never for receiving. Bench is considered the greatest catcher in baseball history partly because he transformed the position.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Sign to Pitcher", sub: "calls the pitch and location", type: "system" },
          { label: "Receives Pitch", sub: "framing, blocking in dirt", type: "attacker" },
          { label: "Calls the Game", sub: "manages pitcher + defense", type: "victim" },
          { label: "Throw / Manage Runner", sub: "controls baserunning game", type: "result" },
        ],
      },
      timeline: [
        { year: 1920, event: "Catcher's gear standardized — shin guards, chest protector, skull cap" },
        { year: 1950, event: "Two-handed catching standard — foul tip finger injuries epidemic", highlight: true },
        { year: 1968, event: "Johnny Bench introduces one-handed catching — universal adoption follows" },
        { year: 1975, event: "Pitch framing first quantified as a statistical contribution in academic baseball study" },
        { year: 2010, event: "Statcast begins measuring pitch framing value — catchers' defensive contributions quantified" },
        { year: 2020, event: "Full protective helmets (concussion-rated) become standard for catchers at all levels" },
      ],
      keyTakeaways: [
        "Catchers must wear chest protector, helmet, shin guards, and cup — all mandatory before every game",
        "One finger = fastball; two = curveball; three = changeup — change the sign system with a runner on second",
        "Frame borderline pitches with a quiet, steady glove — never stab or make dramatic movements at the zone edge",
        "Block balls in the dirt by dropping both knees and curving the body forward — keep the ball in front",
      ],
      references: [
        { title: "Little League: Catching Fundamentals", url: "https://www.littleleague.org/player-and-coach-resources/baseball-coaching-guides/" },
        { title: "Baseball Hall of Fame: Johnny Bench", url: "https://baseballhall.org/hall-of-famers/bench-johnny" },
        { title: "USA Baseball: Catcher Development", url: "https://www.usabaseball.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-1-09-q1",
          type: "Equipment",
          challenge: `  Before taking the field as catcher,
  you check your equipment:

  ✓ Shin guards on
  ✓ Chest protector on
  ✓ Helmet with face guard on
  ? Something is missing for a male catcher`,
          text: "What required equipment is missing from this catcher's setup?",
          options: [
            "Knee pads — worn under the shin guards for additional joint protection",
            "Cup — required protective gear for male catchers, worn under the uniform",
            "Throat guard — an attachment to the helmet face guard required in all leagues",
            "Finger guards — worn inside the catcher's mitt to prevent foul tip injuries",
          ],
          correctIndex: 1,
          explanation: "A cup (protective cup) is required equipment for all male catchers — it protects against foul tips, wild pitches, and collisions. It is worn under the uniform. Little League and all youth baseball organizations require a cup for male catchers before taking the field. A throat guard (attached to the helmet face guard) is also recommended and required in many leagues — if not already attached to this catcher's helmet, it should be checked as well.",
        },
        {
          id: "baseball-1-09-q2",
          type: "Signs",
          challenge: `  Runner on second base. The pitcher is looking
  in for signs. You give your normal signs:
  one finger = fastball.

  Coach calls timeout and tells you to
  change your sign system.

  Why?`,
          text: "Why do catchers change their sign system when there is a runner on second base?",
          options: [
            "To confuse the pitcher — changing signs keeps the pitcher from becoming predictable",
            "The runner at second has a direct view of the catcher's signs and can relay them to the batter",
            "League rules require sign changes every three innings regardless of baserunner situations",
            "The second base umpire could inadvertently telegraph signs to the third base coach",
          ],
          correctIndex: 1,
          explanation: "A runner at second base has a direct, unobstructed view of the catcher's sign-giving hand between the pitcher's legs. If they can read '1 finger = fastball,' they can relay that information to the batter — a significant competitive advantage. The catcher must use a more complex sign system (using a sequence where only the second or third sign counts) to prevent the runner from decoding it. This is standard baseball strategy at every level from youth leagues to the Major Leagues.",
        },
        {
          id: "baseball-1-09-q3",
          type: "Framing",
          challenge: `  A pitch comes in on the outside corner —
  borderline between ball and strike.

  OPTION A: Stab the glove outward to grab it
            as it passes — dramatic catch
  OPTION B: Set the glove where the pitch is
            going, receive it with a quiet, still
            glove, slight inward rotation`,
          text: "Which technique is correct for framing a borderline pitch?",
          options: [
            "Option A — the dramatic stab shows the umpire you fully extended for a difficult pitch",
            "Option B — a quiet, still glove with subtle inward rotation presents the pitch as a strike without drawing attention to its location",
            "Neither — framing is considered deceptive and is not taught in youth baseball",
            "Option A is correct for inside pitches; Option B for outside pitches",
          ],
          correctIndex: 1,
          explanation: "Quiet framing (Option B) is the correct technique. When a catcher stabs dramatically at the ball, the motion draws the umpire's eye to the fact that the pitch was outside — making a ball call more likely. A catcher who receives the pitch smoothly, with minimal movement, and gently rotates the glove toward the strike zone presents the pitch more naturally as a strike. The goal is to catch the ball in a way that doesn't announce 'this was outside.' Good framers gain their teams 15–20 extra strikes per game.",
        },
        {
          id: "baseball-1-09-q4",
          type: "Blocking",
          challenge: `  Pitcher throws a ball in the dirt with a runner
  on first base. The catcher must decide:

  OPTION A: Lunge forward with one knee to try
            to grab the ball before it bounces

  OPTION B: Drop both knees simultaneously,
            tuck chin down, curve body forward,
            let ball hit chest protector and drop
            in front`,
          text: "Why is Option B (full blocking technique) superior to Option A (lunging grab) for blocking balls in the dirt?",
          options: [
            "Option B is safer for the catcher — the padded chest protector is better protection than the bare knee",
            "Option B creates a larger, more reliable barrier — the entire body cups the ball and keeps it in front for a play",
            "Option A is faster but Option B is safer — advanced catchers use Option A",
            "Both are acceptable — the choice depends on how far outside the pitch is",
          ],
          correctIndex: 1,
          explanation: "The full blocking technique (Option B) creates a large, consistent barrier with the entire body — chest protector, arms forming a frame, and the ground in front creating a 'cup' that keeps the ball nearby. Lunging for the ball (Option A) is a one-chance gamble: if you miss the grab, the ball goes past with no backup. If you block (Option B) and the ball drops in front of you, it stays playable — you pick it up and throw the runner out if needed. Keeping the ball in front is the primary goal; the block succeeds even if the ball isn't caught cleanly.",
        },
      ],
    },
  },

  // ─── baseball-1-10: Sportsmanship ─────────────────────────────────────────────
  {
    epochId: "baseball-1",
    wonder: {
      name: "Little League World Series Stadium",
      location: "Williamsport, Pennsylvania",
      era: "Modern",
      emoji: "🤝",
    },
    id: "baseball-1-10",
    order: 10,
    title: "Sportsmanship and the Spirit of the Game",
    subtitle: "Hustle, encouragement, respecting umpires, and being a teammate",
    category: "sports",
    xp: 100,
    badge: { id: "baseball-1-badge-10", name: "Spirit of the Game", emoji: "🌟" },
    challengeType: "quiz",
    info: {
      tagline: "The best players in the world still hustle on every play — because that's what good teammates do.",
      year: 1939,
      overview: [
        "Sportsmanship is not a soft skill — it is the foundation of what makes baseball worth playing. Hustle on every play, encouraging teammates after errors, respecting umpires, and shaking hands after the game are not optional extras on top of the game; they are the game. Teams that play with character and spirit are harder to beat, more fun to be on, and leave a better impression long after the final score is forgotten.",
        "Hustle means running out every single ball, no matter how routine. Hustling down the first base line on a routine ground ball costs nothing and occasionally produces an infield hit when the first baseman rushes. Not hustling costs your team a potential opportunity and sends the message that you only care when it's easy. Major league players who jog to first on ground balls are criticized widely — at any level, it is considered a fundamental failure of commitment.",
        "Umpires are human. They will miss calls. The correct response is no response — walk back to the dugout, encourage your teammates, and focus on the next play. Arguing with umpires in youth baseball achieves nothing positive: it cannot change the call, it can result in an ejection, and it sets a poor example for the team. Even when an umpire is clearly wrong, the player's job is to continue playing with focus and intensity — not to protest.",
      ],
      technical: {
        title: "The Post-Game Handshake Line",
        body: [
          "The post-game handshake line is one of baseball's most meaningful traditions. Both teams form a line and pass each other, shaking hands (or bumping fists at youth levels) and saying 'good game.' This applies whether you won by twelve runs or lost on a walk-off. The handshake teaches losing with grace and winning with humility — both essential to character in sport and in life.",
          "What good teammates do after a teammate's error: say nothing about the error in the moment, encourage the next play ('shake it off, you got the next one'), and remember that errors are part of the game — every player at every level makes them. What great teammates do after their own error: take a breath, refocus, and make the next play harder. Great teammates are remembered for their character, not their statistics.",
        ],
        codeExample: {
          label: "The Code of a Good Teammate",
          code: `  HUSTLE:
  ✓  Run out EVERY ball — every at-bat
  ✓  Sprint to and from your position
  ✓  No walking after fly balls — jog minimum

  AFTER A TEAMMATE'S ERROR:
  ✓  "Shake it off — you've got the next one."
  ✓  Clap in the field, keep energy high
  ✗  No silence or eye rolls in the dugout
  ✗  No pointing out what they should have done

  UMPIRES:
  ✓  Say nothing — walk back to position
  ✓  Let your coach handle disagreements
  ✗  No gestures, no prolonged stares
  ✗  No "that was a ball/strike" commentary

  HANDSHAKE LINE:
  ✓  Go through every time — win or lose
  ✓  Firm handshake/fist bump: "Good game"
  ✗  Don't sulk through it after a loss
  ✗  Don't gloat through it after a win`,
        },
      },
      incident: {
        title: "The Little League World Series Sportsmanship Moment — 2014",
        when: "August 2014 — Little League World Series",
        where: "Williamsport, Pennsylvania",
        impact: "During the 2014 LLWS, a player from a losing team consoled a crying opponent — an image that went viral and was cited by Little League International as the embodiment of what the tournament is actually about.",
        body: [
          "During the 2014 Little League World Series in Williamsport, a player from one team noticed a player from the opposing team crying after a tough loss. Without hesitation, he walked over and put his arm around the crying player, consoling him. A photographer captured the moment. The image spread globally and was featured in major sports media around the world.",
          "Little League International used the image in their educational materials, noting that it captured the ideal of what youth baseball is for: not wins and losses, but learning how to treat other people. The two boys, from different countries, had just competed as hard as they could against each other — and within minutes one was comforting the other. No coach told either of them what to do. That is sportsmanship.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Every Play", sub: "hustle regardless of outcome", type: "attacker" },
          { label: "Teammate Support", sub: "encouragement after errors", type: "system" },
          { label: "Respect the Game", sub: "umpires, opponents, handshake", type: "victim" },
          { label: "Team of Character", sub: "harder to beat, worth playing with", type: "result" },
        ],
      },
      timeline: [
        { year: 1939, event: "Little League Baseball founded on principles of teamwork and character, Williamsport PA", highlight: true },
        { year: 1947, event: "First Little League World Series — post-game handshake tradition established" },
        { year: 1974, event: "Little League opens to girls — sportsmanship principles codified across all programs" },
        { year: 2000, event: "Little League International's Pledge emphasizes sportsmanship over winning" },
        { year: 2014, event: "Sportsmanship moment at LLWS goes viral — reinvigorates discussion of youth sports character" },
        { year: 2023, event: "Little League introduces Positive Coaching Alliance partnership — mental health and sportsmanship" },
      ],
      keyTakeaways: [
        "Hustle on every single play — jog minimum, sprint when appropriate; never walk after a ball",
        "Encourage teammates after errors with brief, specific support — 'you got the next one' — then play hard",
        "Never argue with umpires — walk back to your position; let your coach handle any disputes",
        "The post-game handshake line applies whether you won or lost — go through with energy and grace",
      ],
      references: [
        { title: "Little League International: Core Values", url: "https://www.littleleague.org/who-we-are/mission-and-history/" },
        { title: "Positive Coaching Alliance: Sportsmanship", url: "https://www.positivecoach.org" },
        { title: "MLB: Play Ball Youth Baseball Initiative", url: "https://www.mlb.com/play-ball" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "baseball-1-10-q1",
          type: "Hustle",
          challenge: `  With two outs, you hit a slow roller to the
  shortstop. You think the shortstop will easily
  throw you out. You jog down the first base line.

  The shortstop bobbles the ball — but throws
  you out by half a step because you were jogging.

  What is the lesson?`,
          text: "Why is running full speed to first base on every ground ball important, even seemingly routine ones?",
          options: [
            "It is mostly symbolic — the outcome rarely changes, but hustle shows respect for the game",
            "Running hard changes plays frequently — bobbles, errant throws, and slow transfers become hits for players who sprint",
            "It matters only in close games — hustle is less important when you're winning or losing by a large margin",
            "Running hard protects you from injury — a jogging player is more likely to pull a muscle",
          ],
          correctIndex: 1,
          explanation: "Running hard to first changes the outcome of plays more often than players realize. Infielders bobble routine balls regularly. First basemen pull their foot off the bag. Throws sail wide. A player who sprints every time takes advantage of every one of these opportunities. A player who jogs gives away plays that would have been hits. Beyond the outcome — a team that hustles on every play pressures the defense into hurrying, causing more errors. Hustle is contagious and it wins games.",
        },
        {
          id: "baseball-1-10-q2",
          type: "After an Error",
          challenge: `  Your teammate at shortstop just let a ground
  ball go through their legs — two runners
  scored. The team is now down by 4 runs.

  You're playing second base. What do you do?`,
          text: "What is the best response from a teammate after another player makes an error that costs runs?",
          options: [
            "Say nothing — don't draw more attention to the mistake",
            "Walk over and explain what they should have done so they can correct it immediately",
            "Clap, maintain your energy in the field, and when they come back to the dugout, 'shake it off — next play'",
            "Show extra intensity in your own fielding to demonstrate the right approach",
          ],
          correctIndex: 2,
          explanation: "Maintain field energy — clap, stay in ready position, signal support with your body language. When your teammate comes off the field, a brief 'shake it off, you've got the next one' is the right message. Silence after an error communicates judgment. Technical instruction in the moment is not helpful — the player already knows what happened. What they need is confirmation that their teammates still believe in them. This is what separates good teams from great teams: how they respond to adversity together.",
        },
        {
          id: "baseball-1-10-q3",
          type: "Umpires",
          challenge: `  The umpire calls you out on a pitch you
  are certain was ball four. You watched it
  the whole way and it was clearly outside.

  You are furious.

  What is the correct response?`,
          text: "What should a player do immediately after a call they strongly disagree with?",
          options: [
            "Turn and politely tell the umpire you thought it was a ball — clear communication is respected",
            "Look to your coach to argue the call on your behalf while you return to the dugout",
            "Say nothing, make no gesture, walk back to the dugout and focus on the next at-bat",
            "Make brief eye contact with the umpire to let them know you saw it differently",
          ],
          correctIndex: 2,
          explanation: "Walk back to the dugout without comment, gesture, or extended staring. No call in youth baseball has ever been reversed by a player arguing. What arguing does accomplish: it can lead to ejection, it disrupts the team's focus, and it models poor sportsmanship for teammates and opponents. If your coach wants to approach the umpire to ask for a clarification, that is their role — not yours. Your job is to stay mentally ready for the next at-bat.",
        },
        {
          id: "baseball-1-10-q4",
          type: "Handshake Line",
          challenge: `  Your team just lost the championship game
  on a walk-off hit. Everyone is devastated.
  It is time for the post-game handshake line.

  One player on your team says:
  "I don't want to do the handshake.
  We lost — it's embarrassing."`,
          text: "Why is participating in the post-game handshake line essential, especially after a tough loss?",
          options: [
            "It is required by league rules — you will be penalized if your team doesn't participate",
            "Losing with grace and honoring the opponent who outplayed you is a core part of sportsmanship — skipping it is selfish",
            "It makes your coach look bad if the team doesn't shake hands — do it for the coach",
            "The handshake line is optional after championships — regular season games are different",
          ],
          correctIndex: 1,
          explanation: "Losing with grace is one of the hardest and most important things sport teaches. The opponent played well and beat you — they deserve acknowledgment. Skipping the handshake says 'my feelings matter more than honoring the game and the people I played against.' It also tells your teammates and the crowd that you can't handle losing — the opposite of the mental toughness that makes a player great. The handshake is hardest when you lose, which is exactly when it matters most.",
        },
      ],
    },
  },
];
