import type { StageConfig, EpochConfig } from "./types";

export const driving2Epoch: EpochConfig = {
  id: "driving-2",
  name: "First Miles",
  subtitle: "Beginning Driver Skills",
  description:
    "Build real confidence behind the wheel — from cockpit checks and smooth starts to highway merging and night driving. Every great driver started exactly where you are now.",
  emoji: "🚙",
  color: "lime",
  unlocked: true,
};

export const driving2Stages: StageConfig[] = [

  // ─── driving-2-01: Know Your Car ─────────────────────────────────────────
  {
    epochId: "driving-2",
    wonder: { name: "Empty Parking Lot", location: "Suburbia, USA", era: "Present Day", emoji: "🅿️" },
    id: "driving-2-01",
    order: 1,
    title: "Know Your Car",
    subtitle: "Mirrors, Seat, Belt, and Dashboard — Your Pre-Drive Checklist",
    category: "driving",
    xp: 80,
    badge: { id: "driving-2-badge-01", name: "Cockpit Ready", emoji: "🪑" },
    challengeType: "quiz",
    info: {
      tagline: "A pilot checks the cockpit before every flight. A great driver does the same before every trip.",
      year: 2024,
      overview: [
        "Before you turn the key, spend 60 seconds on your cockpit drill. Adjust your seat so your feet reach the pedals with a slight knee bend and your hands rest comfortably on the steering wheel. Adjust the rearview mirror to frame the full rear window. Set both side mirrors so just a sliver of your own car is visible on the inner edge — most new drivers angle them too far inward.",
        "Fasten your seatbelt before you do anything else. The shoulder strap goes across your chest and shoulder, never behind your back or under your arm. An improperly worn belt is almost as dangerous as no belt at all — it can cause serious internal injuries in a crash.",
        "Scan your dashboard warning lights. All lights will briefly illuminate when you start the car — that is normal. If any stay on after startup, check your owner's manual. The most important ones to recognize: the battery light (electrical issue), the oil pressure light (stop the car), the temperature gauge (overheating), and the check engine light (service soon).",
      ],
      technical: {
        title: "The Cockpit Drill — In Order",
        body: [
          "The cockpit drill is the professional sequence used in driver training programs worldwide. Doing it the same way every single time builds a reliable habit that prevents accidents before they start.",
          "Warning lights communicate your car's health. The oil pressure light is the most critical — driving with low oil pressure for even a few minutes can destroy an engine. If it comes on while driving, pull over safely and immediately. Never ignore a dashboard warning just because the car still seems to drive normally.",
        ],
        codeExample: {
          label: "The 6-Step Cockpit Drill",
          code: `COCKPIT DRILL — Run before every drive
========================================
1. DOORS       Check all doors are fully closed
2. SEAT        Adjust so pedals reachable, slight knee bend
3. STEERING    Adjust wheel height/tilt if equipped
4. MIRRORS     Rearview: frame full rear window
               Left side: sliver of car on inner edge
               Right side: sliver of car on inner edge
5. SEATBELT    Across chest/shoulder — click, tug to confirm
6. DASHBOARD   Start car, confirm all lights extinguish
               Exception: check engine / ABS / TPMS stay on = issue`,
        },
      },
      incident: {
        title: "The Mirror Adjustment Problem — Teen Crash Statistics",
        when: "Ongoing — analyzed 2024",
        where: "United States",
        impact: "Mirrors set for adult passengers — not adjusted for teen drivers — contribute to blind-spot crashes",
        body: [
          "Studies show that a large percentage of beginner drivers borrow a family car without readjusting the mirrors and seat set for another driver. A mirror angled for someone 5 inches taller shows mostly sky instead of the lane behind you. The car feels fine to drive — you don't realize your rear coverage is almost zero.",
          "According to NHTSA data, teen drivers (16–19) are nearly 3 times more likely to be in a fatal crash per mile driven than drivers aged 20 and older. Failure to properly set up the vehicle before driving is a trainable habit that directly reduces this risk. The 60-second cockpit drill is one of the most high-value habits a new driver can build.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Driver Enters Car", sub: "begins cockpit drill", type: "attacker" },
          { label: "Seat, Wheel & Mirrors", sub: "adjusted for this driver's body", type: "system" },
          { label: "Seatbelt Fastened", sub: "shoulder strap across chest", type: "victim" },
          { label: "Dashboard Cleared", sub: "all warning lights off — safe to drive", type: "result" },
        ],
      },
      timeline: [
        { year: 1959, event: "Volvo introduces the three-point seatbelt — first standard safety device" },
        { year: 1968, event: "US law requires seatbelts in all new cars" },
        { year: 1984, event: "New York becomes first US state to mandate seatbelt use — others follow" },
        { year: 2024, event: "Seatbelts still save an estimated 15,000 US lives per year", highlight: true },
      ],
      keyTakeaways: [
        "Adjust seat so your feet reach the pedals with a slight bend in your knee",
        "Side mirrors should show just a sliver of your car — not the interior of the door",
        "Seatbelt shoulder strap goes across the chest and shoulder — never behind your back",
        "Oil pressure light while driving = pull over immediately and turn off the engine",
      ],
      references: [
        { title: "NHTSA Teen Driver Safety", url: "https://www.nhtsa.gov/road-safety/teen-drivers" },
        { title: "How to Adjust Car Mirrors — AAA", url: "https://exchange.aaa.com/safety/driving-advice/how-to-adjust-car-mirrors/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "d2-01-q1",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You sit in the driver's seat of a car that was last driven by someone 6 inches taller than you. Before starting, what is the FIRST thing you should adjust?",
          options: [
            "The rearview mirror angle",
            "The seat position so your feet comfortably reach the pedals",
            "The steering wheel tilt",
            "The side mirror angles",
          ],
          correctIndex: 1,
          explanation:
            "Seat position comes first — everything else (mirror angles, steering wheel reach) depends on where you are sitting. If you adjust mirrors before moving the seat, you will have to readjust them all again.",
        },
        {
          id: "d2-01-q2",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You check your right side mirror and can see almost the entire right side of your car with no road behind it. This means:",
          options: [
            "The mirror is set correctly — you need to see your car to know where it ends",
            "The mirror is angled too far inward — you are not seeing enough of the lane behind you",
            "The mirror is angled too far outward — you are missing coverage closest to the car",
            "The mirror is perfect for detecting cars in the right lane",
          ],
          correctIndex: 1,
          explanation:
            "Side mirrors should show just a thin sliver of your car on the inner edge. If you can see most of your car, the mirror is turned too far inward and you are missing the lane behind you — one of the most common beginner mistakes.",
        },
        {
          id: "d2-01-q3",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You start the car and notice the oil pressure warning light stays on after the engine is running. What should you do?",
          options: [
            "Drive gently to the nearest gas station to add oil",
            "Wait a few minutes — the light usually goes off once the engine warms up",
            "Turn the engine off immediately and do not drive until the cause is diagnosed",
            "Continue your trip — the oil light often stays on in cold weather",
          ],
          correctIndex: 2,
          explanation:
            "The oil pressure light means the engine may not be properly lubricated right now. Driving even a short distance with low oil pressure can destroy the engine within minutes. Turn off the engine, check the oil level with the dipstick, and call for help if the level is fine — there may be a pump failure.",
        },
        {
          id: "d2-01-q4",
          type: "multiple-choice",
          challenge: "quiz",
          text: "Your friend tells you it is okay to put the seatbelt shoulder strap behind your back because it is uncomfortable. What is wrong with this idea?",
          options: [
            "Nothing — the lap belt still protects you in a crash",
            "The shoulder strap behind your back can still deploy and protect you",
            "Without the shoulder strap, your upper body has no restraint — you can slam into the steering wheel or dashboard in a crash",
            "It is only a problem at highway speeds",
          ],
          correctIndex: 2,
          explanation:
            "The shoulder strap prevents your upper body, head, and neck from snapping forward in a crash. Without it, even the lap belt can cause serious injury — your torso folds over it violently. If the strap is uncomfortable, adjust the seat or use the shoulder anchor height adjustment if your car has one.",
        },
      ],
    },
  },

  // ─── driving-2-02: Smooth Starts and Stops ───────────────────────────────
  {
    epochId: "driving-2",
    wonder: { name: "Quiet Residential Street", location: "Suburbia, USA", era: "Present Day", emoji: "🏘️" },
    id: "driving-2-02",
    order: 2,
    title: "Smooth Starts and Stops",
    subtitle: "Progressive Braking, Smooth Acceleration, and Full Stops",
    category: "driving",
    xp: 80,
    badge: { id: "driving-2-badge-02", name: "Smooth Operator", emoji: "🛑" },
    challengeType: "quiz",
    info: {
      tagline: "A good driver's passengers barely notice when the car starts or stops. That is the goal.",
      year: 2024,
      overview: [
        "Smooth braking means applying progressively more pressure as you slow down, then easing off just before you come to a complete stop. Most new drivers make two mistakes: braking too late (needing to press hard suddenly) or releasing the brake abruptly at the stop (causing a forward jerk). Begin braking earlier than feels necessary and gently ease off the pedal as you approach zero.",
        "Smooth acceleration means pressing the gas pedal gradually from a stop — not snapping your foot down. On a residential street, aim to be at your target speed within 2–3 seconds. Jackrabbit starts waste fuel, wear tires, and startle other road users. On slippery surfaces, aggressive acceleration causes wheelspin.",
        "Covering the brake means moving your right foot from the gas to the brake pedal (hovering over it without pressing) when you anticipate needing to stop — near intersections, behind slow cars, in parking lots. This reduces reaction time from roughly 0.5 seconds to near zero. It is one of the most important habits for new drivers to develop.",
      ],
      technical: {
        title: "Progressive Braking and the Threshold",
        body: [
          "Progressive braking: press gently at first to shift weight forward, then increase pressure to slow, then ease off near the stop. This keeps passengers comfortable and prevents ABS activation during normal stops. ABS (Anti-lock Braking System) is for emergency stops — it prevents wheel lockup, but it should not be triggered in routine driving.",
          "The 3-second rule for braking: pick a fixed point when the car ahead passes it, and count 3 seconds before you reach the same point. If you get there in less than 3 seconds, you are following too closely and your braking distances are too short. Reduce speed and increase the gap.",
        ],
        codeExample: {
          label: "Smooth Stop Sequence",
          code: `SMOOTH STOP TECHNIQUE — Step by Step
======================================
APPROACHING A STOP SIGN (from 25 mph):
  1. Spot the sign early — 150+ feet away
  2. Lift foot off gas — begin coasting
  3. Place foot gently on brake — light pressure
  4. Gradually increase brake pressure as speed drops
  5. At ~5 mph: ease off slightly — avoid abrupt jolt
  6. Come to COMPLETE stop — 2-3 second count
     (wheels must stop rolling before proceeding)
  7. Look left-right-left before moving again

COVERING THE BRAKE — when to hover:
  - Approaching any intersection
  - Behind stopped or slowing traffic
  - Passing parked cars (doors may open)
  - In any parking lot`,
        },
      },
      incident: {
        title: "Rear-End Crashes — The Most Common Crash Type for New Drivers",
        when: "Ongoing — analyzed 2024",
        where: "United States",
        impact: "Rear-end collisions account for roughly 29% of all serious crashes — most caused by following too close or late braking",
        body: [
          "NHTSA data shows rear-end collisions are the single most common crash type in the US. For teen and new drivers specifically, following distance is the primary contributing factor. At 30 mph, it takes approximately 75 feet to stop — and a new driver may need an extra 0.5–1.0 second of reaction time compared to an experienced driver, adding 22–44 feet before braking even begins.",
          "The fix is not faster reflexes — it is more following distance and earlier brake covering. If you are already hovering over the brake and have 4+ seconds of following distance, you have removed most of the risk of rear-ending the car ahead. Experienced drivers are not faster; they are better positioned so speed is never an issue.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Driver Spots Hazard", sub: "sees stop sign or slowing car", type: "attacker" },
          { label: "Reaction Phase", sub: "foot moves to brake (0.3–1.0 sec)", type: "system" },
          { label: "Braking Phase", sub: "progressive pressure applied", type: "victim" },
          { label: "Complete Stop", sub: "wheels fully stopped — safe", type: "result" },
        ],
      },
      timeline: [
        { year: 1920, event: "Four-wheel brakes introduced — previously only rear wheels had brakes" },
        { year: 1966, event: "NHTSA founded — begins collecting crash data and setting safety standards" },
        { year: 1978, event: "ABS introduced in production cars — prevents lockup during panic stops" },
        { year: 2024, event: "Rear-end collisions remain the most common serious crash type despite ABS and ESC", highlight: true },
      ],
      keyTakeaways: [
        "Start braking earlier than feels necessary — smooth, progressive pressure from the start",
        "Come to a complete stop at every stop sign — rolling stops are illegal and dangerous",
        "Cover the brake near any intersection, slow vehicle, or parking lot",
        "A 3-second following gap at 25 mph gives you time to react and stop safely",
      ],
      references: [
        { title: "NHTSA Crash Statistics", url: "https://www.nhtsa.gov/research-data/fatality-analysis-reporting-system-fars" },
        { title: "Safe Following Distance — AAA", url: "https://exchange.aaa.com/safety/driving-advice/following-distance/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "d2-02-q1",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You are driving at 25 mph on a residential street and see a stop sign ahead. When should you begin braking?",
          options: [
            "About 10 feet from the stop line — that is plenty of room at 25 mph",
            "About 50–100 feet before the stop line — begin with light pressure and increase gradually",
            "Right at the stop line — press the brake firmly to stop quickly",
            "Slow to 10 mph first by coasting, then brake hard at the line",
          ],
          correctIndex: 1,
          explanation:
            "At 25 mph, begin braking 50–100 feet before the stop line with light, progressive pressure. Starting too late forces you to brake hard, which jolts passengers and reduces control. Early, light braking is the mark of a confident, smooth driver.",
        },
        {
          id: "d2-02-q2",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You stop at a stop sign but your wheels have not completely stopped rolling yet. Is it okay to proceed if you see no cross traffic?",
          options: [
            "Yes — a rolling stop is fine if visibility is clear",
            "No — you must come to a complete stop with all wheels fully stopped before checking traffic",
            "Only if you are turning right",
            "Yes — the law only requires you to slow significantly, not stop completely",
          ],
          correctIndex: 1,
          explanation:
            "A complete stop at a stop sign means all four wheels must stop rolling — not just slowing to 2–3 mph. A rolling stop is illegal in every US state (called 'failing to stop' or colloquially a 'California stop') and reduces your ability to check traffic properly before proceeding.",
        },
        {
          id: "d2-02-q3",
          type: "multiple-choice",
          challenge: "quiz",
          text: "What does 'covering the brake' mean and when should you do it?",
          options: [
            "Pressing lightly on the brake to slow traffic behind you — use it on highways",
            "Moving your right foot from the gas pedal to hover over (not press) the brake — use it near intersections and hazards",
            "Keeping your left foot on the brake at all times in an automatic car",
            "Using the emergency brake to slow down more gradually",
          ],
          correctIndex: 1,
          explanation:
            "Covering the brake means moving your foot from the gas to hover just above the brake pedal, ready to press. It cuts reaction time from ~0.5 seconds to near-zero. Use it approaching intersections, behind slowing traffic, near parked cars, and in parking lots.",
        },
        {
          id: "d2-02-q4",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You are behind another car at a red light. The light turns green and the car ahead starts moving. When is it safe to accelerate?",
          options: [
            "The moment the light turns green — go immediately",
            "After the car ahead has cleared the intersection completely",
            "After you confirm the car ahead is moving and the intersection is clear of crossing traffic",
            "Wait for the car behind you to honk before moving",
          ],
          correctIndex: 2,
          explanation:
            "After a green light, confirm the car ahead is moving forward AND that no late-running cross traffic is still entering the intersection. Intersection collisions from red-light runners peak in the first 1–2 seconds after a light change. Move when both conditions are met.",
        },
      ],
    },
  },

  // ─── driving-2-03: Turning and Steering ──────────────────────────────────
  {
    epochId: "driving-2",
    wonder: { name: "Community College Parking Lot", location: "Suburbia, USA", era: "Present Day", emoji: "🏫" },
    id: "driving-2-03",
    order: 3,
    title: "Turning and Steering",
    subtitle: "Hand Position, Signaling, Wide vs Tight Turns, and Landing in the Right Lane",
    category: "driving",
    xp: 85,
    badge: { id: "driving-2-badge-03", name: "Turn Signal Pro", emoji: "↩️" },
    challengeType: "quiz",
    info: {
      tagline: "Every turn has a setup, an execution, and a landing. Nail all three and it feels effortless.",
      year: 2024,
      overview: [
        "Modern driver training recommends the push-pull (shuffle) steering technique for most situations: one hand pushes up while the other pulls down, keeping both hands on the wheel at all times. Hand-over-hand is still used for tighter, slower turns (parking lots, U-turns). Never let the wheel spin freely through your hands after a turn — you lose control of the recovery.",
        "Signal at least 100 feet before any turn in a residential or city setting — on highways, signal earlier (200–300 feet). The signal communicates your intention to other drivers, cyclists, and pedestrians before you begin slowing. Activating the signal mid-turn or after you have already started braking gives no warning at all.",
        "After a turn, you should end up in the lane closest to you on the road you turned onto. Left turns from a two-way street: you turn into the leftmost available lane. Right turns from a one-way or two-way street: you turn into the rightmost lane. This rule prevents collisions when two cars are turning simultaneously from opposite directions.",
      ],
      technical: {
        title: "Push-Pull Steering and Turn Lane Selection",
        body: [
          "Push-pull (shuffle) technique: start with hands at 9 and 3 (or 8 and 4). To turn right, push up with your right hand while your left hand pulls down, then slide your right hand down and repeat. Both hands maintain contact. This technique prevents the airbag from breaking your arms if it deploys (hands-crossed over the wheel is dangerous in an airbag deployment).",
          "Wide vs tight turns: a right turn swings wide if you do not start turning early enough — beginners often drift into the oncoming lane. A left turn can be too tight if you cut the corner — you end up in the wrong lane. The reference point for right turns: when the front of the car reaches the intersection corner, begin turning. Practice slowly in a parking lot until it becomes instinct.",
        ],
        codeExample: {
          label: "Turn Sequence Checklist",
          code: `TURN EXECUTION CHECKLIST
=========================
BEFORE the turn (100+ feet away):
  1. Check mirrors for following traffic
  2. Signal ON — at least 100 feet before turn
  3. Begin braking progressively
  4. Move to appropriate lane if not already there

AT the turn:
  5. Speed: 5–10 mph for most residential turns
  6. Steer smoothly — push-pull technique
  7. Look THROUGH the turn to where you want to land

AFTER the turn (landing):
  8. End up in the lane closest to you:
     - Right turn → rightmost lane
     - Left turn  → leftmost lane on new road
  9. Cancel signal if not auto-canceling
  10. Resume normal speed for the new road`,
        },
      },
      incident: {
        title: "The Wrong-Lane Left Turn — A Classic New Driver Error",
        when: "Ongoing — studied in driver education research",
        where: "Intersections nationwide",
        impact: "Left-turn collisions are responsible for ~61% of all intersection crashes",
        body: [
          "The FHWA reports that left turns are involved in the majority of intersection crashes — far more than right turns. For new drivers, the most common error is turning too wide or too tight and landing in the wrong lane. A left turn that swings into the right lane puts you head-on with oncoming traffic. A left turn that cuts corners puts you in the middle of the intersection.",
          "The fix is a simple rule: after any turn, end up in the lane equivalent to the one you started from. Practice in empty parking lots, painting imaginary lane lines in your mind. Once the landing position becomes automatic, the cognitive load of the actual turn drops dramatically and you can focus on hazards.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Signal On", sub: "100+ feet before turn", type: "attacker" },
          { label: "Speed Reduction", sub: "brake before, not during the turn", type: "system" },
          { label: "Steering Execution", sub: "push-pull, smooth arc through turn", type: "victim" },
          { label: "Lane Landing", sub: "closest lane on new road", type: "result" },
        ],
      },
      timeline: [
        { year: 1939, event: "Turn signals first introduced as a standard feature on cars" },
        { year: 1955, event: "Hand-over-hand steering taught as standard — later updated to push-pull" },
        { year: 2000, event: "Push-pull (shuffle) steering adopted as preferred technique in most training programs" },
        { year: 2024, event: "Left turns remain the most hazardous intersection maneuver for new drivers", highlight: true },
      ],
      keyTakeaways: [
        "Signal at least 100 feet before turning — before you begin braking",
        "Push-pull technique keeps both hands on the wheel and is safer during airbag deployment",
        "After a right turn, land in the rightmost lane; after a left turn, land in the leftmost lane",
        "Brake before the turn, not during — mid-turn braking reduces traction and control",
      ],
      references: [
        { title: "FHWA Intersection Safety", url: "https://safety.fhwa.dot.gov/intersection/" },
        { title: "Steering Techniques — DMV Guide", url: "https://www.dmv.org/how-to-guides/steering-techniques.php" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "d2-03-q1",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You are making a right turn at an intersection. There are two lanes on the road you are turning onto. Where should you end up after the turn?",
          options: [
            "In the left (inside) lane — it is easier to swing wide",
            "In the rightmost (nearest) lane — the lane closest to where you turned from",
            "Either lane is fine as long as you signal when you get there",
            "In the center turn lane, then merge right",
          ],
          correctIndex: 1,
          explanation:
            "After a right turn you should always land in the rightmost lane of the road you turned onto — it is the shortest, most direct path. Swinging into a farther lane can conflict with a car simultaneously making a left turn into that lane from the opposite direction.",
        },
        {
          id: "d2-03-q2",
          type: "multiple-choice",
          challenge: "quiz",
          text: "When is the correct time to activate your turn signal before a right turn at a residential intersection?",
          options: [
            "As you begin turning the steering wheel",
            "When you are about 10 feet from the corner",
            "At least 100 feet before the turn — before you begin braking",
            "Only if there are cars behind you",
          ],
          correctIndex: 2,
          explanation:
            "Signal at least 100 feet before the turn and before you start braking. This gives drivers, cyclists, and pedestrians behind you time to react to both your signal and your slowing. Signaling mid-turn or while already braking gives no useful warning.",
        },
        {
          id: "d2-03-q3",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You are using push-pull steering to make a left turn. Which best describes this technique?",
          options: [
            "Cross one hand over the other to spin the wheel quickly",
            "Use only one hand on the bottom of the wheel to keep the other free",
            "Push up with one hand while the other pulls down — both hands stay on the wheel at all times",
            "Hold the wheel at the top with both hands and pull downward in the direction of the turn",
          ],
          correctIndex: 2,
          explanation:
            "Push-pull (shuffle) steering: one hand pushes up on its side of the wheel while the other pulls down, alternating. Both hands maintain contact throughout the turn. This is safer than hand-over-hand in cars with airbags because your arms are never crossed over the deployment zone.",
        },
        {
          id: "d2-03-q4",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You are making a right turn and realize you are turning too wide — your car is drifting toward the center of the road. What should you do?",
          options: [
            "Speed up to correct the drift before oncoming traffic arrives",
            "Steer more to the right to tighten the arc and complete the turn in your lane",
            "Stop in the intersection and wait for a gap to complete the maneuver",
            "Back up and start the turn over",
          ],
          correctIndex: 1,
          explanation:
            "If you are going wide, apply more steering in the direction of the turn (more right for a right turn) to tighten the arc. Do this smoothly, not sharply. Prevention is better: start the turn later (when the front of your car is at the corner) to naturally produce a tighter arc.",
        },
      ],
    },
  },

  // ─── driving-2-04: Lane Changes and Merging ───────────────────────────────
  {
    epochId: "driving-2",
    wonder: { name: "Highway 101 On-Ramp", location: "California, USA", era: "Present Day", emoji: "🛣️" },
    id: "driving-2-04",
    order: 4,
    title: "Lane Changes and Merging",
    subtitle: "Mirror-Signal-Shoulder Check, Blind Spots, and Highway On-Ramps",
    category: "driving",
    xp: 85,
    badge: { id: "driving-2-badge-04", name: "Merge Master", emoji: "🔀" },
    challengeType: "quiz",
    info: {
      tagline: "Every safe lane change is a three-step check: mirrors, signal, shoulder. In that order, every time.",
      year: 2024,
      overview: [
        "The mirror-signal-shoulder check is the professional sequence for every lane change and merge. Step 1: check your rearview and side mirrors to assess traffic behind and beside you. Step 2: signal your intention. Step 3: perform a shoulder check — a brief glance over your shoulder into the blind spot (the area your mirrors cannot see). Only after all three can you move into the new lane smoothly.",
        "Blind spots are the areas alongside your rear quarter panels that mirrors do not cover. In a standard sedan, the blind spots are approximately beside your rear doors on each side. A car can be completely hidden there. Some new vehicles have blind-spot monitoring systems, but you should always do a shoulder check regardless — technology assists but does not replace the habit.",
        "Merging onto a highway requires matching the speed of highway traffic before reaching the end of the on-ramp. Do not merge at 35 mph when highway traffic is moving at 65 mph — the speed differential creates a dangerous situation for you and the cars behind you. Use the full length of the on-ramp to accelerate, signal early, and merge smoothly into a gap.",
      ],
      technical: {
        title: "Blind Spot Geometry and the Shoulder Check",
        body: [
          "Even perfectly adjusted mirrors leave a blind spot roughly 10–20 feet long beside each rear door. A motorcycle, bicycle, or narrow car can sit entirely in that blind spot. The shoulder check takes less than a second: briefly turn your head 45 degrees to look over your shoulder at the road in that zone. Never turn your head more than needed — your hands naturally follow your head and will steer you in that direction.",
          "For a highway merge, the technique is: accelerate on the ramp to match traffic speed, check mirrors and signal early (in the first third of the ramp), perform a shoulder check, find a gap, and smoothly steer into the gap. If you reach the end of the ramp without a gap, the merge lane is mandatory — never stop on a highway ramp unless there is no choice.",
        ],
        codeExample: {
          label: "Lane Change and Merge Sequence",
          code: `LANE CHANGE — Every Time
==========================
  1. MIRRORS      Rearview, then side mirror for target lane
  2. SIGNAL       Activate turn signal — inform other drivers
  3. SHOULDER     Quick 45° look over shoulder into blind spot
  4. CONFIRM GAP  Is there a 4+ second gap in the target lane?
  5. STEER        Smooth, gradual lane change — not a jerk
  6. CANCEL       Turn signal off after completing

HIGHWAY ON-RAMP MERGE
=======================
  Ramp beginning : accelerate toward highway speed
  Ramp middle    : signal on, check mirror + shoulder
  Ramp end       : should be at ~highway speed (65 mph)
  Merge          : smooth entry into gap
  NEVER stop on a ramp unless absolutely forced to`,
        },
      },
      incident: {
        title: "Blind Spot Crashes — Why the Shoulder Check Saves Lives",
        when: "Ongoing — analyzed 2024",
        where: "United States highways and city streets",
        impact: "Over 840,000 blind-spot accidents occur annually in the US — mostly during lane changes",
        body: [
          "The NHTSA estimates that over 840,000 accidents per year in the United States involve blind spots — and the majority of these happen during lane changes. Most drivers check their mirrors, but skip the shoulder check, assuming the mirrors caught everything. A motorcycle moving at 70 mph can travel from behind your rear bumper into your blind spot in under 2 seconds.",
          "New drivers are disproportionately involved in these crashes because mirror checking and shoulder checking are not yet automatic habits. The muscle memory for the three-step sequence takes hundreds of repetitions to become truly automatic. Driving instructors recommend narrating the steps aloud during practice ('mirrors, signal, shoulder') until the sequence is internalized.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Mirrors Checked", sub: "rearview + target-lane side mirror", type: "attacker" },
          { label: "Signal Activated", sub: "communicates intent to others", type: "system" },
          { label: "Shoulder Check", sub: "45° glance clears blind spot", type: "victim" },
          { label: "Smooth Lane Change", sub: "gap confirmed — gradual steer", type: "result" },
        ],
      },
      timeline: [
        { year: 1908, event: "Ford Model T — early cars have no mirrors at all" },
        { year: 1968, event: "NHTSA requires rearview mirrors on all new US vehicles" },
        { year: 2003, event: "First production cars with blind-spot monitoring radar systems" },
        { year: 2024, event: "Despite BSM technology, shoulder checks remain essential — blind spots are not fully eliminated", highlight: true },
      ],
      keyTakeaways: [
        "Mirror-Signal-Shoulder: always in this order, every single lane change",
        "Blind spots are beside your rear quarter panels — mirrors cannot cover them",
        "Match highway traffic speed before merging — never merge at half the traffic speed",
        "Find a 4-second gap before changing lanes — then move smoothly, not abruptly",
      ],
      references: [
        { title: "Blind Spot Safety — NHTSA", url: "https://www.nhtsa.gov/equipment/blind-spot-detection-systems" },
        { title: "Safe Lane Changes — DMV.org", url: "https://www.dmv.org/how-to-guides/lane-change.php" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "d2-04-q1",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You want to change lanes on a city street. Put the following steps in the correct order: (A) Turn on your signal, (B) Check rearview and side mirrors, (C) Look over your shoulder into the blind spot, (D) Steer smoothly into the new lane.",
          options: [
            "A → B → C → D",
            "B → A → C → D",
            "C → B → A → D",
            "B → C → A → D",
          ],
          correctIndex: 1,
          explanation:
            "Mirrors first (B), then signal (A), then shoulder check (C), then move (D). You check mirrors before signaling so you already know what is behind you when you activate your signal. The shoulder check is last because it confirms the blind spot is clear just before you move.",
        },
        {
          id: "d2-04-q2",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You are on a highway on-ramp. Traffic on the highway is moving at 65 mph. As you reach the end of the ramp you are only going 40 mph. What should you do?",
          options: [
            "Merge immediately — other drivers should see you and slow down",
            "Stop at the end of the ramp and wait for a large enough gap",
            "Accelerate as hard as possible in the remaining ramp space and merge at whatever speed you reach",
            "Signal, continue accelerating in the merge lane as long as possible, and merge only when at or near highway speed",
          ],
          correctIndex: 3,
          explanation:
            "If you have not reached highway speed, continue using the merge lane (if it exists) to keep accelerating. Merging at 40 mph when traffic is at 65 mph creates a 25 mph speed differential — the car behind you has very little time to react. Use the full available length of the ramp and any merge lane.",
        },
        {
          id: "d2-04-q3",
          type: "multiple-choice",
          challenge: "quiz",
          text: "Your mirrors are perfectly adjusted. Is a shoulder check still necessary before changing lanes?",
          options: [
            "No — properly adjusted mirrors eliminate the blind spot entirely",
            "Only if you are on a highway",
            "Yes — even perfectly adjusted mirrors leave a blind spot beside each rear quarter panel that cannot be seen without turning your head",
            "Only if there is a motorcycle or bicycle nearby",
          ],
          correctIndex: 2,
          explanation:
            "All mirrors leave a blind spot. Even with perfect adjustment, there is a zone roughly 10–20 feet long beside your rear doors that no mirror covers. A shoulder check is always required. This is true even in cars with blind-spot monitoring — those systems can malfunction or miss fast-moving vehicles.",
        },
        {
          id: "d2-04-q4",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You check your mirrors and signal, then look over your shoulder and see a car in your blind spot. What should you do?",
          options: [
            "Complete the lane change quickly before the car catches up",
            "Cancel the lane change — return your signal to off, remain in your lane, and check again in a few seconds",
            "Flash your hazard lights to warn the other driver",
            "Speed up first to create distance, then change lanes",
          ],
          correctIndex: 1,
          explanation:
            "If your shoulder check reveals a car in the blind spot, abort the lane change. Turn the signal off, stay in your lane, and wait for the gap to clear before attempting the sequence again. There is never urgency that justifies merging into an occupied space.",
        },
      ],
    },
  },

  // ─── driving-2-05: Parking Mastery ───────────────────────────────────────
  {
    epochId: "driving-2",
    wonder: { name: "Downtown Street", location: "San Francisco, California", era: "Present Day", emoji: "🏙️" },
    id: "driving-2-05",
    order: 5,
    title: "Parking Mastery",
    subtitle: "Parallel, Perpendicular, Angle Parking, and Curbing Your Wheels",
    category: "driving",
    xp: 90,
    badge: { id: "driving-2-badge-05", name: "Park Anywhere", emoji: "🅿️" },
    challengeType: "quiz",
    info: {
      tagline: "Parallel parking in San Francisco is a rite of passage. Master the technique and no spot will ever intimidate you.",
      year: 2024,
      overview: [
        "Parallel parking uses reference points rather than estimation. Pull alongside the car in front of the space, aligned and about 2 feet away. When your rear bumper passes the rear bumper of the front car, turn the wheel sharply toward the curb. When your car is at approximately a 45-degree angle and your front door aligns with the rear bumper of the car in front, turn the wheel sharply the other way to straighten. Adjust forward and back to center in the space.",
        "Perpendicular parking (most parking lots) requires centering your car between the lines. Pick a reference point — most drivers use the side mirror alignment with the line. Approach slowly, steer smoothly, and straighten out before you reach the space boundary. Back in when possible — it is far safer to back into a space than to back out into traffic.",
        "Curbing your wheels is required by law on hills in many states and prevents your car from rolling into traffic if the brakes fail. On a downhill with a curb: turn wheels toward the curb (right). On an uphill with a curb: turn wheels away from the curb (left, so the curb stops you). On a hill without a curb: always turn wheels toward the road edge.",
      ],
      technical: {
        title: "Parallel Parking Reference Points",
        body: [
          "The reference point method removes the guesswork from parallel parking. Instead of eyeballing the angle, you react to specific visual triggers that are the same every time. Once you find your car's reference points through practice, parallel parking becomes a reliable mechanical sequence — not a stressful estimation.",
          "For uphill/downhill parking: 'Right, right, left' is a common memory aid — downhill with curb: right (toward curb). Uphill with curb: left (away from curb, so curb catches the wheel if it rolls). No curb either direction: right (toward edge so car rolls off road, not into traffic). Always put the transmission in Park and apply the parking brake on any incline.",
        ],
        codeExample: {
          label: "Parallel Parking Step-by-Step",
          code: `PARALLEL PARKING — Reference Point Method
==========================================
SETUP:
  Pull alongside front car, 2 ft gap, aligned
  Both cars' rear bumpers are even (or yours slightly past)

STEP 1 — Pull back + turn right (toward curb):
  Reverse slowly
  Steer fully right
  Stop when front door aligns with front car's rear bumper
  (Your car is now ~45° to the curb)

STEP 2 — Continue back + turn left (away from curb):
  Keep reversing slowly
  Steer fully left
  Stop when you are parallel to the curb (~1 ft away)

STEP 3 — Pull forward to center in space

HILL PARKING — Wheel Direction:
  Downhill + curb    → wheels RIGHT  (toward curb)
  Uphill   + curb    → wheels LEFT   (away from curb)
  Any hill + no curb → wheels RIGHT  (toward road edge)`,
        },
      },
      incident: {
        title: "San Francisco Runaway Car — Why Curbed Wheels Matter",
        when: "Recurring — multiple documented incidents",
        where: "San Francisco, California",
        impact: "Multiple incidents of parked cars rolling into traffic or pedestrians on steep hills",
        body: [
          "San Francisco's steep hills (some over 30 degrees) make wheel curbing a legal requirement, not just a suggestion. Every year, multiple incidents occur where cars left in gear but without wheels curbed or parking brakes engaged begin rolling. A small sedan rolling down a steep San Francisco hill can reach 30+ mph before reaching an intersection.",
          "California Vehicle Code Section 22526(b) requires drivers to set the parking brake and curb the wheels on any hill over 3 percent grade. Most drivers do not know the law — and many do not understand that a parking brake cable can stretch over time, making wheel curbing the last line of defense. It takes 2 seconds to turn the wheel — it can prevent a catastrophe.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Pull Alongside", sub: "2 ft gap, bumpers aligned", type: "attacker" },
          { label: "Reverse + Turn Right", sub: "toward curb, 45° angle", type: "system" },
          { label: "Reverse + Turn Left", sub: "straighten into the space", type: "victim" },
          { label: "Centered and Curbed", sub: "1 ft from curb, wheels turned", type: "result" },
        ],
      },
      timeline: [
        { year: 1917, event: "First parking regulations enacted in New York City" },
        { year: 1950, event: "Parking meters widespread in US cities — parallel parking becomes a required skill" },
        { year: 1980, event: "California mandates wheel curbing on hills — first US state to do so" },
        { year: 2024, event: "Parallel parking remains on most US driving tests as a core skill", highlight: true },
      ],
      keyTakeaways: [
        "Use reference points for parallel parking — not guesswork — for consistent results",
        "Back into perpendicular spaces when possible — much safer than backing out into traffic",
        "Downhill with a curb: turn wheels toward the curb (right). Uphill with curb: turn away (left)",
        "Always apply the parking brake on hills — do not rely on 'Park' alone",
      ],
      references: [
        { title: "Parallel Parking Guide — DMV.org", url: "https://www.dmv.org/how-to-guides/parallel-parking.php" },
        { title: "California Hill Parking Law — DMV.CA.gov", url: "https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/parking/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "d2-05-q1",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You are parallel parking behind a car. After reversing at a 45-degree angle, what is your next move?",
          options: [
            "Continue reversing straight back until you hit the curb",
            "Turn the wheel sharply left (away from curb) while continuing to reverse to straighten the car into the space",
            "Stop, put the car in drive, and pull forward slightly to adjust the angle",
            "Turn the wheel to the right even more to get closer to the curb",
          ],
          correctIndex: 1,
          explanation:
            "After reaching approximately 45 degrees, you turn the wheel sharply left (counter-steer) while still reversing slowly. This brings the front of the car into the space and straightens the car parallel to the curb. The two-phase steer is the core technique of parallel parking.",
        },
        {
          id: "d2-05-q2",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You are parking on a steep downhill street with a curb on the right side. Which way should your front wheels point?",
          options: [
            "Straight ahead — turning the wheels can damage the tires",
            "To the left, away from the curb",
            "To the right, toward the curb",
            "It does not matter as long as the parking brake is on",
          ],
          correctIndex: 2,
          explanation:
            "Downhill with a curb: turn wheels RIGHT (toward the curb). If the car begins to roll, the front wheels will immediately catch against the curb and stop the car. This is the last line of defense if the parking brake fails or is not fully engaged.",
        },
        {
          id: "d2-05-q3",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You are in a parking lot looking for a space. You find one — should you pull through forward or back in?",
          options: [
            "Always pull through forward — backing is more difficult and dangerous",
            "Backing in is generally safer because you can exit into traffic with full forward visibility",
            "It makes no difference for safety",
            "Only back in if the space is wider than your car",
          ],
          correctIndex: 1,
          explanation:
            "Backing into a space is safer because you exit forward — with full visibility of pedestrians and cross traffic. When you back out of a parking space, your vision is limited and pedestrians walking behind your car may not see you. Most professional fleet drivers are trained to back into spaces.",
        },
        {
          id: "d2-05-q4",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You are parking on a steep uphill street with a curb on the right. Which direction should your front wheels face?",
          options: [
            "To the right, toward the curb — same as downhill",
            "Straight ahead",
            "To the left, away from the curb — so the curb stops the rear wheel if the car rolls back",
            "The direction does not matter uphill, only downhill",
          ],
          correctIndex: 2,
          explanation:
            "Uphill with a curb: turn wheels LEFT (away from the curb). If the car rolls backward, the front of the rear tire will catch against the curb. This is the opposite of the downhill rule. Memory aid: downhill = roll into curb (turn right). Uphill = roll back into curb (turn left).",
        },
      ],
    },
  },

  // ─── driving-2-06: Highway Driving ───────────────────────────────────────
  {
    epochId: "driving-2",
    wonder: { name: "Interstate 5", location: "California, USA", era: "Present Day", emoji: "🛤️" },
    id: "driving-2-06",
    order: 6,
    title: "Highway Driving",
    subtitle: "Entering at Speed, Keeping Right, Following Distance, and Exiting Safely",
    category: "driving",
    xp: 85,
    badge: { id: "driving-2-badge-06", name: "Highway Ready", emoji: "🚀" },
    challengeType: "quiz",
    info: {
      tagline: "The highway is actually one of the safer places to drive — if you understand the rules that keep it that way.",
      year: 2024,
      overview: [
        "Highway driving feels intimidating at first because of the speed, but higher speeds mean more predictable traffic flow and fewer intersections. The key rules: enter at highway speed (use the full on-ramp), keep right except to pass (left lanes are for passing, not cruising), maintain a minimum 4-second following distance at 65 mph (more in poor conditions), and signal and move right early before your exit.",
        "Following distance on a freeway is critical because at 65 mph, your car travels about 95 feet per second. A 4-second gap means roughly 380 feet — about the length of an American football field. Most new drivers dramatically underestimate this. A simple technique: pick a fixed point when the car ahead passes it and count '1-1000, 2-1000, 3-1000, 4-1000' before you reach the same point.",
        "For exiting, begin moving to the right lane at least half a mile before your exit. Signal early (300 feet), take the exit ramp at a controlled speed — most ramps are designed for 35–45 mph, not highway speed. Decelerate on the ramp, not before entering it.",
      ],
      technical: {
        title: "Highway Following Distance and the 4-Second Rule",
        body: [
          "At 65 mph, the standard 2-second following rule is not enough. Freeway vehicles move at high speed and hazards can be much larger (debris, multi-car pileups). NHTSA recommends a minimum 4-second following distance at highway speeds, increasing to 6–8 seconds in rain and 10+ seconds in snow or ice.",
          "Lane discipline on multi-lane highways: travel in the right lane unless overtaking. After passing, return to the right lane promptly. Camping in the left lane forces faster drivers to pass on the right — a more dangerous maneuver. In California, cruising in the left lane when not passing is illegal (Vehicle Code Section 21654).",
        ],
        codeExample: {
          label: "Highway Following Distance Guide",
          code: `HIGHWAY FOLLOWING DISTANCE — 4-Second Rule
============================================
HOW TO MEASURE:
  1. Pick a fixed object (overpass, sign, shadow line)
  2. Note when the car ahead passes it
  3. Count: "1-one-thousand, 2-one-thousand, 3-one-thousand, 4-one-thousand"
  4. You should reach that object AFTER 4 is spoken
  5. If earlier: back off — you are too close

SPEED-TO-DISTANCE GUIDE:
  55 mph  →  4 sec  ≈  323 feet  (minimum)
  65 mph  →  4 sec  ≈  381 feet  (minimum)
  75 mph  →  4 sec  ≈  440 feet  (minimum)

CONDITION ADJUSTMENTS:
  Rain                 →  2x distance  (6-8 seconds)
  Snow / ice           →  4x distance  (10+ seconds)
  Heavy truck ahead    →  extra 2 sec  (debris risk)
  Night driving        →  extra 1 sec  (reduced visibility)`,
        },
      },
      incident: {
        title: "Multi-Car Freeway Pileup — The Cost of Tailgating at Speed",
        when: "November 2002 (classic case study)",
        where: "Hanover, Germany — A2 Autobahn",
        impact: "48-car pileup in fog — inadequate following distance at speed, zero reaction time",
        body: [
          "One of the deadliest aspects of freeway driving is the chain-reaction pileup. A vehicle stops or slows suddenly, the car immediately behind has insufficient following distance, brakes but cannot stop, the impact pushes that car into the one ahead, and within seconds a chain reaction involving dozens of cars unfolds. In fog or rain, where visibility is reduced, the effect is magnified.",
          "In the US, the NHTSA estimates that following-distance violations (tailgating) contribute to over 1.7 million rear-end crashes per year. At 65 mph with a 1-second following gap (what most tailgaters maintain), you have approximately 60 feet of warning — about half the distance needed to stop, even with perfect reaction time and maximum braking.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Highway On-Ramp", sub: "accelerate to match traffic speed", type: "attacker" },
          { label: "Lane Discipline", sub: "travel right, pass left, return right", type: "system" },
          { label: "4-Second Gap", sub: "maintained at all times at 65+ mph", type: "victim" },
          { label: "Exit Ramp", sub: "signal early, decelerate on the ramp", type: "result" },
        ],
      },
      timeline: [
        { year: 1940, event: "Pennsylvania Turnpike opens — first US limited-access highway" },
        { year: 1956, event: "Interstate Highway System created — 46,000+ miles of freeway built" },
        { year: 1973, event: "National 55 mph speed limit introduced during oil crisis" },
        { year: 2024, event: "Tailgating remains a factor in 1.7M+ US rear-end crashes annually", highlight: true },
      ],
      keyTakeaways: [
        "Merge at highway speed — use the entire on-ramp to accelerate before entering",
        "Keep right except to pass — left lanes are for overtaking, not cruising",
        "Maintain a 4-second minimum following gap at 65 mph — double in rain",
        "Begin moving to the right lane at least half a mile before your exit",
      ],
      references: [
        { title: "NHTSA Following Distance Guidance", url: "https://www.nhtsa.gov/road-safety/speeding" },
        { title: "California Highway Rules — DMV.CA.gov", url: "https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/driving-safely/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "d2-06-q1",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You are cruising comfortably in the left lane of a three-lane highway at the speed limit. There is no car ahead of you for a quarter mile. Is this okay?",
          options: [
            "Yes — you are traveling at the speed limit so the left lane is fine",
            "No — the left lane is for passing. If you are not actively passing someone, move to the right lane",
            "Yes — as long as you yield to faster cars when they approach",
            "Only if the right lane has trucks",
          ],
          correctIndex: 1,
          explanation:
            "The left lane on a multi-lane highway is a passing lane, not a travel lane. Sitting in it when not passing forces faster traffic to pass you on the right — a more dangerous maneuver. In California and most US states, lingering in the left lane when not passing is illegal.",
        },
        {
          id: "d2-06-q2",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You are traveling at 65 mph. The car ahead of you passes a bridge overpass. How long should you wait before passing that same overpass to maintain a safe following distance?",
          options: [
            "1 second — fast reactions mean less space is needed at highway speeds",
            "2 seconds — the standard following distance rule",
            "At least 4 seconds — highway speeds require more distance, not less",
            "The gap does not matter — modern ABS handles emergency stops",
          ],
          correctIndex: 2,
          explanation:
            "At 65 mph, you need a minimum 4-second following gap. At this speed you travel 381 feet in 4 seconds — about the length of a football field. This gives you time to perceive a hazard, react, and begin stopping. ABS helps you stop in minimum distance but cannot overcome insufficient following distance.",
        },
        {
          id: "d2-06-q3",
          type: "multiple-choice",
          challenge: "quiz",
          text: "Your exit is coming up in 1 mile and you are in the second lane from the left of a four-lane highway. What should you do?",
          options: [
            "Wait until you see the exit ramp, then cut across all lanes quickly",
            "Begin moving right gradually now — signal, check mirrors, shoulder check, and move one lane at a time toward the right",
            "Move to the right lane only when you see the 500-foot exit sign",
            "Use the left shoulder to pass traffic and reach the exit faster",
          ],
          correctIndex: 1,
          explanation:
            "Begin moving right at least half a mile from your exit — one lane at a time, with full mirror-signal-shoulder checks each time. Last-minute lane cuts across multiple lanes cause serious accidents. Give yourself plenty of time and distance to reach the right lane gracefully.",
        },
        {
          id: "d2-06-q4",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You take an exit ramp and the posted speed for the ramp is 35 mph. You enter the ramp at 65 mph. What is the risk?",
          options: [
            "No risk — ramp speed limits are conservative and posted for large trucks",
            "The ramp's curve is designed for 35 mph — at 65 mph you may not be able to maintain the turn and could roll over or leave the road",
            "The risk is only to your tires",
            "There is a slight risk only in wet weather",
          ],
          correctIndex: 1,
          explanation:
            "Ramp speed limits reflect the geometry of the curve — the physics of centrifugal force at that radius. At nearly double the posted speed, the lateral force may exceed your tires' grip and you can slide off the road or roll. Decelerate before or in the early portion of the ramp to reach the posted speed before the curve tightens.",
        },
      ],
    },
  },

  // ─── driving-2-07: Night and Weather Driving ─────────────────────────────
  {
    epochId: "driving-2",
    wonder: { name: "Pacific Coast Highway at Sunset", location: "California, USA", era: "Present Day", emoji: "🌅" },
    id: "driving-2-07",
    order: 7,
    title: "Night and Weather Driving",
    subtitle: "Headlights, High Beams, Rain Following Distance, and Hydroplaning",
    category: "driving",
    xp: 90,
    badge: { id: "driving-2-badge-07", name: "All-Weather Driver", emoji: "🌧️" },
    challengeType: "quiz",
    info: {
      tagline: "Most new drivers underestimate how much rain and darkness change everything — your speed, your distance, your decisions.",
      year: 2024,
      overview: [
        "Headlights serve two purposes: they help you see, and they help other drivers see you. In most US states you are required to turn on headlights at sunset and must leave them on until sunrise. Many states also require headlights whenever windshield wipers are in use (a practical rule — if it is raining hard enough for wipers, visibility is reduced for everyone). In fog, use low beams — high beams reflect off fog particles and reduce your vision.",
        "High beams illuminate roughly twice as far as low beams and are valuable on dark rural roads with no oncoming traffic. The rule: switch to low beams when you can see the headlights of an oncoming car at approximately 500 feet, or when following another car within 300 feet. Leaving high beams on blinds oncoming drivers and is illegal.",
        "In rain, your following distance should double to a minimum of 6–8 seconds. Wet roads can increase stopping distance by 50–100%. Hydroplaning — when your tires ride on top of a film of water instead of the road surface — can occur at speeds as low as 35 mph on standing water. If you feel the steering suddenly go light, ease off the gas, do not brake suddenly, and steer straight until traction returns.",
      ],
      technical: {
        title: "Hydroplaning — What Happens and How to Recover",
        body: [
          "Hydroplaning occurs when your tires cannot channel water away fast enough and begin to ride on the water film. You lose steering and braking — the car effectively becomes a boat. Causes: speed (higher speed, less time to displace water), tire tread depth (worn tires hydroplane more easily), and standing water depth. At 65 mph on a wet road with worn tires, hydroplaning is a serious risk.",
          "Recovery from hydroplaning: ease off the gas smoothly (do not brake hard or steer sharply), keep the wheel pointed straight, let the car slow naturally until tires regain contact. If you brake hard during hydroplaning you may spin. Prevention: slow down in heavy rain, replace tires when tread depth falls below 2/32 inch, and avoid lane centers where water pools.",
        ],
        codeExample: {
          label: "Headlight and Weather Driving Rules",
          code: `HEADLIGHT RULES
================
Turn ON headlights:
  - At sunset (or 30 min after, per your state)
  - Anytime visibility is under 500 feet (rain, fog)
  - When windshield wipers are in use (many states require this)
  - On mountain roads, tunnels, and dawn / dusk

HIGH BEAMS:
  Use when: dark rural road, no oncoming or leading traffic
  Turn OFF when:
    - Oncoming car within ~500 feet
    - Following another car within ~300 feet
    - In fog, snow, rain (reflects back — reduces YOUR vision)

RAIN DRIVING:
  Following distance:  double to 6-8 seconds minimum
  Speed:               reduce 5-10 mph below normal
  Standing water:      slow down before entering
  Hydroplaning signs:  steering feels light / floaty

HYDROPLANING RECOVERY:
  1. Ease off gas — do not brake hard
  2. Steer straight
  3. Let car slow until traction returns
  4. Breathe — then reduce speed before continuing`,
        },
      },
      incident: {
        title: "Princess Diana Crash — High Speed in a Tunnel, Rain-Slicked Road",
        when: "August 31, 1997",
        where: "Pont de l'Alma tunnel, Paris, France",
        impact: "Fatal crash at high speed on a wet road — a stark reminder that speed and wet conditions are a lethal combination",
        body: [
          "The 1997 Paris crash that killed Princess Diana, Dodi Fayed, and driver Henri Paul occurred on a wet road in a tunnel. Investigators determined the car was traveling at an estimated 65–70 mph in a 30 mph zone on a road made slippery by rain. At that speed on a wet surface, even a minor steering correction could cause loss of control.",
          "While the circumstances were extraordinary, the physics applies to every rain-soaked road. Wet stopping distances are 50–100% longer than dry distances. A car traveling at 65 mph needs roughly 350 feet to stop on a dry road — on a wet road that can exceed 500 feet. Slowing down in rain is not timidity; it is physics. Every experienced driver knows rain changes the math completely.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Reduced Visibility", sub: "rain, fog, darkness, dusk/dawn", type: "attacker" },
          { label: "Headlights On", sub: "see farther, be seen sooner", type: "system" },
          { label: "Speed Reduced", sub: "longer stopping distance in wet", type: "victim" },
          { label: "Increased Following Gap", sub: "6-8 sec minimum in rain", type: "result" },
        ],
      },
      timeline: [
        { year: 1908, event: "First sealed-beam electric headlights appear on production cars" },
        { year: 1940, event: "Sealed-beam headlights standardized in the US" },
        { year: 1997, event: "Paris tunnel crash at high speed on wet road — physics of wet roads in sharp focus", highlight: true },
        { year: 2024, event: "Adaptive headlights and auto-high-beam systems become widely available — but driver knowledge remains essential" },
      ],
      keyTakeaways: [
        "Turn on headlights at sunset, in rain, in fog, and any time visibility is reduced",
        "Use low beams in fog — high beams reflect off fog and reduce your own visibility",
        "Double your following distance to 6–8 seconds minimum when driving in rain",
        "Hydroplaning recovery: ease off gas, steer straight, do not brake hard",
      ],
      references: [
        { title: "Rainy Weather Driving — NHTSA", url: "https://www.nhtsa.gov/road-safety/weather" },
        { title: "Headlight Use Laws by State — IIHS", url: "https://www.iihs.org/topics/headlights" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "d2-07-q1",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You are driving at dusk and it has just started raining. Your windshield wipers are on. Should your headlights be on?",
          options: [
            "No — it is not dark enough yet; headlights are only needed after full dark",
            "Only if visibility is under 100 feet",
            "Yes — many state laws require headlights when wipers are in use, and headlights help other drivers see you in rain and low light",
            "Only high beams are helpful in rain",
          ],
          correctIndex: 2,
          explanation:
            "Most US states require headlights whenever windshield wipers are in use. Even where it is not legally required at dusk, turning on headlights is correct — it makes your car visible to oncoming traffic and pedestrians in the reduced visibility of rain. Never wait for full dark to turn on your lights.",
        },
        {
          id: "d2-07-q2",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You are driving at night on a dark two-lane rural road with no oncoming traffic. You have your high beams on. A car appears around a curve about 400 feet ahead heading toward you. What should you do?",
          options: [
            "Keep high beams on — you need the visibility more than they do",
            "Flash your high beams to warn the oncoming driver",
            "Switch to low beams immediately — high beams can blind the oncoming driver at this distance",
            "Pull over to the shoulder until they pass",
          ],
          correctIndex: 2,
          explanation:
            "Switch to low beams when an oncoming car is within approximately 500 feet. High beams at 400 feet can temporarily blind the oncoming driver — they lose the ability to see the road while still traveling toward you at combined speed. Low beams still provide sufficient visibility for safe driving.",
        },
        {
          id: "d2-07-q3",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You are driving at 55 mph in heavy rain. Suddenly the steering wheel feels light and the car no longer seems to respond to your steering inputs. What is happening and what should you do?",
          options: [
            "Tire blowout — grip the wheel tightly and brake hard to stop",
            "Hydroplaning — ease off the gas, steer straight, and do not brake hard until traction returns",
            "Power steering failure — pull over and call for help",
            "Aquaplaning is normal in rain — continue normally",
          ],
          correctIndex: 1,
          explanation:
            "Light, floating steering in rain is hydroplaning — your tires are riding on a water film and have lost contact with the road surface. Ease off the gas smoothly, steer straight, and wait for the tires to slow down and regain traction. Braking hard can cause a spin. Steering sharply can send you off the road.",
        },
        {
          id: "d2-07-q4",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You are driving in thick fog on the highway. Which lights should you use?",
          options: [
            "High beams — maximum brightness improves your vision through fog",
            "No headlights — lights just reflect off fog and make it worse",
            "Low beams (and fog lights if equipped) — high beams reflect off fog particles and reduce your vision",
            "Hazard lights — they are brightest and most visible",
          ],
          correctIndex: 2,
          explanation:
            "In fog, use low beams. High beam light scatters off the countless water droplets in fog and creates a glare that reduces your visibility — often worse than no lights. Fog lights (if your car has them) are angled low to illuminate the road beneath the fog. Hazard lights in moving traffic are dangerous and illegal in many states.",
        },
      ],
    },
  },

  // ─── driving-2-08: Your First Solo Drive ─────────────────────────────────
  {
    epochId: "driving-2",
    wonder: { name: "California Suburbs Neighborhood", location: "California, USA", era: "Present Day", emoji: "🏡" },
    id: "driving-2-08",
    order: 8,
    title: "Your First Solo Drive",
    subtitle: "Planning Your Route, Staying Calm, and Handling the Unexpected",
    category: "driving",
    xp: 90,
    badge: { id: "driving-2-badge-08", name: "Solo Driver", emoji: "🗝️" },
    challengeType: "quiz",
    info: {
      tagline: "Your first solo drive will feel different — more alive, more real. You are ready. Trust your training.",
      year: 2024,
      overview: [
        "Before your first solo drive, plan a route you have driven before with your instructor or a parent. Familiar roads mean you can focus on driving technique instead of navigation. Keep your first solo trips short — 15 minutes is enough. Avoid highways, rush hour traffic, and challenging conditions for your first few independent drives. Build confidence gradually.",
        "If you get lost, do not panic. Pull over in a safe, well-lit place, use your phone's navigation app, and recalibrate. Never try to read a map or enter addresses while moving. A simple rule: if you are unsure where to go, default to pulling over rather than making a hasty turn or lane change.",
        "Handling traffic stress: every driver, including experienced ones, sometimes encounters stressful moments — an aggressive driver, a near-miss, unexpected road conditions. If you feel overwhelmed, the correct response is to reduce speed, increase following distance, and find a safe place to pull over and collect yourself. Driving under high stress is dangerous. There is no shame in pausing.",
      ],
      technical: {
        title: "Post-Drive Checklist and Building Confidence",
        body: [
          "After each solo drive, spend two minutes on a mental debrief. What went well? What was challenging? What would you do differently? This reflective practice accelerates improvement faster than practice alone. Even professional drivers use debrief techniques — Formula 1 drivers spend as much time reviewing data as they do on the track.",
          "Building a mental hazard library: experienced drivers recognize hazards before they develop — a ball rolling into the street may mean a child is following, a gap in parked cars near a school means pedestrians may appear. Each solo drive builds this mental library. The goal of the first year of driving is to accumulate those experiences safely, which is why familiar routes and low-stakes environments matter so much.",
        ],
        codeExample: {
          label: "First Solo Drive — Pre and Post Checklist",
          code: `PRE-DRIVE CHECKLIST (First Solo)
=================================
Route:
  [ ] Planned a familiar, low-traffic route
  [ ] Estimated time (start with 15-30 min)
  [ ] Checked weather — avoid heavy rain or fog for solo #1
  [ ] Phone charged, navigation app ready

Cockpit:
  [ ] Seat adjusted
  [ ] Mirrors set for YOU
  [ ] Seatbelt on
  [ ] Dashboard clear

Emergency prep:
  [ ] Phone charged and accessible (not in hand while driving)
  [ ] Know who to call if you need help
  [ ] Roadside assistance number saved

POST-DRIVE DEBRIEF (2 min)
===========================
  What went smoothly?
  What felt uncertain or stressful?
  One thing to focus on next drive:
  How do you feel? (honest answer)`,
        },
      },
      incident: {
        title: "Teen Crash Statistics — The First Year Behind the Wheel",
        when: "Ongoing — analyzed 2024",
        where: "United States",
        impact: "Teen drivers (16-17) are 3x more likely to crash per mile than drivers 20+ — crash risk peaks in the first 6 months of solo driving",
        body: [
          "The AAA Foundation for Traffic Safety found that teen drivers are involved in about 3 fatal crashes per 100 million miles driven — nearly 3 times the rate of drivers aged 20 and older. Critically, the crash rate is highest in the first six months of solo driving and drops significantly after the first year. This is why graduated licensing laws in most states restrict nighttime driving, passenger counts, and highway use for new drivers.",
          "The evidence is clear: the most dangerous time to drive is right after getting your license — not because you are unskilled, but because skills are not yet automatic. When something unexpected happens, an inexperienced driver is more likely to be overwhelmed because they are still consciously managing the basics. Every familiar solo drive under normal conditions builds the automatic competence that makes unusual situations manageable.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Route Planned", sub: "familiar roads, light traffic, short trip", type: "attacker" },
          { label: "Cockpit Check Done", sub: "seat, mirrors, belt, dash cleared", type: "system" },
          { label: "Drive Completed", sub: "calm, focused, within comfort zone", type: "victim" },
          { label: "Post-Drive Debrief", sub: "what worked, what to improve", type: "result" },
        ],
      },
      timeline: [
        { year: 1903, event: "First US state driver's license issued — Massachusetts" },
        { year: 1980, event: "Graduated Driver Licensing concept developed — implemented state by state over decades" },
        { year: 1996, event: "First GDL law in the US (California) restricts teen night driving and passengers" },
        { year: 2024, event: "All US states have GDL programs — crash rates for teens have fallen 50% since 1995", highlight: true },
      ],
      keyTakeaways: [
        "Plan your first solo drives on familiar, low-traffic routes during daylight hours",
        "If you get lost, pull over safely before using your phone — never navigate while moving",
        "If traffic stress feels overwhelming, reduce speed, increase following distance, and pull over",
        "A 2-minute post-drive debrief after each trip accelerates your improvement dramatically",
      ],
      references: [
        { title: "AAA Teen Driver Safety", url: "https://teendriving.aaa.com/" },
        { title: "NHTSA Graduated Licensing", url: "https://www.nhtsa.gov/road-safety/teen-drivers/teen-driving-laws" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "d2-08-q1",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You are planning your first solo drive. Which route choice is best?",
          options: [
            "Highway driving — it is straightforward with fewer intersections",
            "A new part of town — exploring builds confidence faster",
            "A familiar local route you have driven before with an instructor, during daylight hours, avoiding rush hour",
            "Downtown — the more complex the route, the faster you will improve",
          ],
          correctIndex: 2,
          explanation:
            "Start with familiar, low-complexity routes in good conditions. Familiar roads let you focus on driving technique rather than navigation. Highways, rush hour, and new areas all add cognitive load that is better added one element at a time after the basics feel automatic.",
        },
        {
          id: "d2-08-q2",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You are driving solo for the first time and realize you have taken a wrong turn. You are now on an unfamiliar street and do not know where to go. What is the best action?",
          options: [
            "Keep driving while looking at your phone map to find your way",
            "Make a U-turn immediately to get back to familiar territory",
            "Pull over in a safe, well-lit spot, then use your phone's navigation app to reorient before continuing",
            "Continue driving — you will eventually find a landmark you recognize",
          ],
          correctIndex: 2,
          explanation:
            "When lost, pull over before using your phone. Looking at a navigation app while moving is distracted driving. A safe stop, even for 60 seconds, to enter your destination and review the route is always the right choice. Never enter a phone address or read a map while the car is in motion.",
        },
        {
          id: "d2-08-q3",
          type: "multiple-choice",
          challenge: "quiz",
          text: "You are driving in busy traffic and feel your heart racing and your stress level rising to the point it is hard to focus. What is the safest response?",
          options: [
            "Drive faster to get through the stressful section quickly",
            "Turn up the music to distract yourself from the stress",
            "Grip the steering wheel very tightly and concentrate harder",
            "Reduce speed, increase your following distance, and pull over to a safe spot if the stress does not subside",
          ],
          correctIndex: 3,
          explanation:
            "Driving while cognitively overwhelmed is dangerous. Reducing speed and following distance buys you more time and space to react. If stress is affecting your ability to drive safely, the correct and courageous choice is to pull over, breathe, and wait until you feel calm. Every experienced driver has done this at some point.",
        },
        {
          id: "d2-08-q4",
          type: "multiple-choice",
          challenge: "quiz",
          text: "After your first solo drive, what is a valuable habit to build?",
          options: [
            "Post immediately on social media about your accomplishment",
            "Take a 2-minute mental debrief: what went well, what felt uncertain, one thing to focus on next time",
            "Immediately plan a much longer, more challenging drive to build on your success",
            "Ask your friends to come along next time so you feel less nervous",
          ],
          correctIndex: 1,
          explanation:
            "A brief post-drive debrief — what went well, what was uncertain, one improvement goal — accelerates learning faster than accumulated practice alone. This technique is used by professional drivers, pilots, and athletes. Honest reflection on each session builds deliberate improvement, not just repetition.",
        },
      ],
    },
  },

];
