import type { StageConfig, EpochConfig } from "./types";

export const driving3Epoch: EpochConfig = {
  id: "driving-3",
  name: "Rules of the Road",
  subtitle: "Wisdom Every Driver Needs",
  description:
    "Passing the test is just the beginning. Becoming a genuinely safe, thoughtful driver means mastering the skills no written exam covers — distraction awareness, defensive technique, handling emergencies, and treating every trip as a responsibility to yourself and everyone around you.",
  emoji: "🛣️",
  color: "orange",
  unlocked: true,
};

export const driving3Stages: StageConfig[] = [
  // ─── driving-3-01: Eyes Up, Phone Down ────────────────────────────────────────
  {
    epochId: "driving-3",
    wonder: {
      name: "Freeway Digital Billboard",
      location: "California",
      era: "Modern",
      emoji: "📱",
    },
    id: "driving-3-01",
    order: 1,
    title: "Eyes Up, Phone Down",
    subtitle: "Distracted driving laws and the science of attention",
    category: "driving",
    xp: 80,
    badge: { id: "driving-3-badge-01", name: "Eyes On The Road", emoji: "👁️" },
    challengeType: "quiz",
    info: {
      tagline: "At 65 mph, a 5-second glance at your phone covers the length of a football field — blind.",
      year: 2008,
      overview: [
        "Distracted driving kills more than 3,000 people in the United States every year. California was one of the first states to ban handheld cellphone use while driving, and the law has been updated multiple times since. Under current California law, all drivers must use a hands-free device — a phone mount or Bluetooth — to make calls or use GPS. Drivers under 18 may not use a phone at all, even hands-free.",
        "Texting while driving is particularly dangerous because it combines all three distraction types simultaneously: visual (eyes off road), manual (hands off wheel), and cognitive (mind off driving). Studies show that reading or sending a text takes your eyes off the road for an average of five seconds. At freeway speeds, your car travels the length of a football field in that time — completely unguided.",
        "The impairment from texting while driving is comparable to driving with a blood alcohol level of .08% — the legal limit in California. Reaction times slow dramatically, lane-keeping deteriorates, and hazard detection drops. The difference: alcohol impairment is obvious and people know to plan around it; phone distraction is invisible and underestimated by almost every driver who does it.",
      ],
      technical: {
        title: "California Cellphone Law — What's Legal and What's Not",
        body: [
          "California Vehicle Code 23123 and 23124 regulate phone use. Adult drivers (18+) may use a phone ONLY if it is in a hands-free mount and operated with a single tap or swipe. No holding the phone, even at a red light. Drivers under 18 may not use a phone in any way while driving — no calls, no GPS apps, no music changes — zero exceptions.",
          "Violations are primary offenses — officers can pull you over just for phone use. First offense: $162 base fine (total with fees approaches $300+). Second offense within 36 months: $285 base fine. Points are also added to your driving record for violations on or after July 1, 2021.",
        ],
        codeExample: {
          label: "CA Cellphone Law — Quick Reference",
          code: `  DRIVER AGE 18+:
  ✓  Phone in approved windshield/dash mount
  ✓  Single tap or swipe to operate
  ✗  Holding phone in hand (even at red light)
  ✗  Typing, texting, scrolling

  DRIVER UNDER 18:
  ✗  Phone use of ANY kind while driving
  ✗  Hands-free calling still prohibited
  ✗  GPS app on phone still prohibited

  PENALTIES:
  1st offense: ~$300 total with fees
  2nd offense (36 months): ~$450 total
  Points on record after July 1, 2021`,
        },
      },
      incident: {
        title: "The Texting Driver on US-101",
        when: "2010 — one year after CA hands-free law strengthened",
        where: "US Highway 101, San Mateo County, California",
        impact: "A rear-end crash caused by a driver texting at freeway speeds injured 4 people and triggered a 2-hour highway closure during peak commute. Dashcam footage shared by media became a widely-used public safety teaching example.",
        body: [
          "In 2010, a driver on US-101 near San Mateo rear-ended slowing traffic at approximately 65 mph. Skid marks showed no braking before impact — investigators concluded the driver never looked up. Cell records confirmed a text message was sent seconds before the crash. Four people were transported to hospital, two with serious injuries.",
          "The driver, who had no prior record, faced reckless driving charges. More consequentially, dashcam footage from the car behind captured the entire collision. California Highway Patrol shared it in public safety campaigns, where it has been viewed millions of times — a stark visual demonstration of what five seconds of inattention looks like at speed.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Phone Notification", sub: "ping draws attention", type: "attacker" },
          { label: "Driver's Eyes", sub: "shift to screen, 5 seconds", type: "victim" },
          { label: "Vehicle at Speed", sub: "travels 100+ yards unguided", type: "system" },
          { label: "Crash / Near Miss", sub: "preventable outcome", type: "result" },
        ],
      },
      timeline: [
        { year: 2001, event: "New York becomes first US state to ban handheld cellphone use while driving" },
        { year: 2008, event: "California hands-free law takes effect for all drivers (CVC 23123)", highlight: true },
        { year: 2013, event: "California bans use of handheld devices for texting/data under 18 — expanded" },
        { year: 2017, event: "California updates law: phone must be mounted, only single-tap interaction allowed" },
        { year: 2021, event: "Driving record points added for cellphone violations in California" },
        { year: 2024, event: "NHTSA reports distracted driving involved in ~8% of all fatal US crashes" },
      ],
      keyTakeaways: [
        "California drivers 18+ must use a hands-free mount — holding the phone is illegal even at a stop light",
        "Drivers under 18 may not use a phone in any way while driving, including hands-free",
        "Texting while driving impairs reaction time as much as driving at the legal BAC limit",
        "At 65 mph, 5 seconds of distraction covers a full football field length with no driver input",
      ],
      references: [
        { title: "CA DMV: Distracted Driving", url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/fast-facts/distracted-driving-ffdl-36/" },
        { title: "NHTSA Distracted Driving", url: "https://www.nhtsa.gov/risky-driving/distracted-driving" },
        { title: "California Vehicle Code 23123", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=23123.&lawCode=VEH" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "driving-3-01-q1",
          type: "California Law",
          challenge: `  You're 17 years old, stopped at a red light.
  Your phone rings. You have a Bluetooth earpiece.

  Is it legal to answer the call?`,
          text: "Under California law, can a driver under 18 answer a call using a Bluetooth earpiece while driving?",
          options: [
            "Yes — Bluetooth is hands-free, so it is legal for all ages",
            "No — California law prohibits drivers under 18 from using a phone in any way while driving, including hands-free",
            "Yes — but only at a red light, not while moving",
            "No — only if the call is from a parent or guardian",
          ],
          correctIndex: 1,
          explanation: "California Vehicle Code 23124 prohibits drivers under 18 from using any wireless communication device while driving — including hands-free devices. The under-18 ban is stricter than the adult law precisely because young drivers have less experience to manage divided attention. There are no exceptions except 911 emergency calls.",
        },
        {
          id: "driving-3-01-q2",
          type: "Scenario",
          challenge: `  You are 19 years old, driving on the freeway.
  Your phone buzzes with a navigation update.
  Your phone is sitting in your cupholder.
  You reach down and tap it to dismiss the alert.

  Is this legal in California?`,
          text: "Is picking up your phone from the cupholder to tap it while driving legal for an adult in California?",
          options: [
            "Yes — a single tap is allowed under the hands-free law",
            "No — the law requires the phone to be in an approved mount; touching a phone held in your hand is illegal",
            "Yes — as long as you keep your eyes on the road while tapping",
            "No — but only if you are on a freeway, not a surface street",
          ],
          correctIndex: 1,
          explanation: "California's hands-free law requires the phone to be mounted in an approved windshield or dash mount AND operated with a single tap. Picking the phone up from a cupholder to tap it means you are holding it — which is illegal regardless of how quickly you tap. The mount requirement is what makes it 'hands-free.'",
        },
        {
          id: "driving-3-01-q3",
          type: "Science",
          challenge: `  A researcher compares driver performance:

  GROUP A: Sober drivers using a cellphone
  GROUP B: Drivers with BAC of .08% (legal limit)

  Reaction time, lane deviation, and hazard
  detection were measured in both groups.`,
          text: "How does texting while driving compare to driving at the legal BAC limit of .08%?",
          options: [
            "Texting is less impairing — alcohol affects the entire body, phones only occupy one hand",
            "They are roughly equivalent — texting produces impairment comparable to a .08% BAC",
            "Texting is more dangerous only at night or in rain conditions",
            "BAC impairment is always more severe because it affects coordination and balance",
          ],
          correctIndex: 1,
          explanation: "Research from the University of Utah found that texting while driving produces impairment — in reaction time, lane keeping, and hazard detection — comparable to driving with a BAC of .08%. The difference is that most drivers accurately gauge their alcohol impairment and plan around it. Almost no one accurately gauges their phone-induced impairment.",
        },
        {
          id: "driving-3-01-q4",
          type: "Calculation",
          challenge: `  You're driving at 65 mph on the freeway.
  You look down at your phone for 5 seconds.

  A football field is 100 yards (300 feet) long.
  65 mph = approximately 95 feet per second.`,
          text: "Approximately how far does your car travel during a 5-second phone glance at 65 mph?",
          options: [
            "About 50 feet — less than half a football field",
            "About 475 feet — more than one and a half football fields",
            "About 100 feet — roughly a third of a football field",
            "About 200 feet — roughly two-thirds of a football field",
          ],
          correctIndex: 1,
          explanation: "At 65 mph (about 95 feet per second), a 5-second glance means your car travels approximately 475 feet — more than a football field and a half — completely without any driver input. Traffic conditions can change entirely in that distance, including a car braking hard, a pedestrian stepping out, or a lane merging.",
        },
      ],
    },
  },

  // ─── driving-3-02: Defensive Driving ─────────────────────────────────────────
  {
    epochId: "driving-3",
    wonder: {
      name: "California Highway Patrol Academy",
      location: "Sacramento, California",
      era: "Modern",
      emoji: "🚓",
    },
    id: "driving-3-02",
    order: 2,
    title: "Defensive Driving",
    subtitle: "Expect the unexpected — and have a plan before you need one",
    category: "driving",
    xp: 85,
    badge: { id: "driving-3-badge-02", name: "Defensive Driver", emoji: "🛡️" },
    challengeType: "quiz",
    info: {
      tagline: "Defensive driving means assuming other drivers will make mistakes — and being ready when they do.",
      year: 1964,
      overview: [
        "Defensive driving is a set of habits and mental frameworks that help you anticipate and react to hazards before they become emergencies. The core philosophy: you cannot control other drivers, road conditions, or mechanical failures — but you can control your own position, speed, and readiness to react. Defensive drivers assume other cars will do the wrong thing and position themselves to have options when that happens.",
        "Scanning 12–15 seconds ahead (the distance your car will travel in that time) gives you the processing time to identify hazards and make smooth decisions rather than panicking. On city streets, 12–15 seconds is about a full block. On the freeway, it is a quarter mile. Most new drivers focus only on the car directly in front — experienced drivers scan the whole picture.",
        "The SIPDE method — Scan, Identify, Predict, Decide, Execute — is the systematic process CHP officers and driver's ed programs use to teach hazard response. Scan the environment broadly, Identify specific hazards, Predict how those hazards might develop, Decide on a response, Execute it smoothly. Running this process continuously transforms reactive driving into proactive driving.",
      ],
      technical: {
        title: "The SIPDE Method and Space Management",
        body: [
          "Covering the brake means moving your foot off the gas and hovering it over the brake pedal — without pressing — when a hazard is developing. This reduces reaction-to-braking time from 0.75 seconds to less than 0.3 seconds. It is the difference between stopping in time and not. Always cover the brake when: pedestrians are near the roadway, cars are merging from a ramp, or you see brake lights ahead.",
          "The 3-second following distance rule (expand to 4-5 seconds in rain or heavy traffic) gives you a buffer for reaction and braking. Pick a fixed point — a sign, a shadow — and count after the car ahead passes it. If you pass the same point before you count to three, you're too close. Space is your most important safety resource.",
        ],
        codeExample: {
          label: "SIPDE Method — Step by Step",
          code: `  S — SCAN:     Look 12–15 seconds ahead + check
                  mirrors every 5–8 seconds

  I — IDENTIFY: Pick out specific hazards
                (merging car, pedestrian, debris)

  P — PREDICT:  What might that hazard do next?
                (pedestrian might step into street)

  D — DECIDE:   Choose your response in advance
                (slow down, change lane, cover brake)

  E — EXECUTE:  Apply your decision smoothly
                before the hazard reaches you

  ↳ Repeat continuously — every few seconds`,
        },
      },
      incident: {
        title: "The CHP Study on Rear-End Collisions",
        when: "2019 — California Highway Patrol annual report analysis",
        where: "California freeways",
        impact: "Rear-end collisions account for nearly 29% of all traffic crashes in California — and are among the most preventable crash types with proper following distance and scanning habits.",
        body: [
          "The California Highway Patrol's 2019 traffic safety data showed rear-end collisions as one of the most common crash types on California freeways — nearly 30% of all reported collisions. In the vast majority of cases, investigators noted that the at-fault driver had either inadequate following distance, or reacted to a hazard that had been visible for several seconds before the crash.",
          "CHP training programs emphasize that most rear-end crashes are not 'sudden' — the hazard was present, the driver just wasn't scanning far enough ahead to see it in time. The SIPDE framework, taught at the CHP Academy, directly addresses this: it trains drivers to process hazards at the 12–15 second mark rather than waiting until they're 2 seconds away.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Scan 12–15 sec Ahead", sub: "see hazards early", type: "system" },
          { label: "SIPDE Process", sub: "identify, predict, decide", type: "attacker" },
          { label: "Cover the Brake", sub: "cut reaction time in half", type: "victim" },
          { label: "Smooth Avoidance", sub: "hazard resolved before crisis", type: "result" },
        ],
      },
      timeline: [
        { year: 1923, event: "First formal driver training programs established in American high schools" },
        { year: 1964, event: "National Safety Council codifies 'defensive driving' as a formal curriculum", highlight: true },
        { year: 1972, event: "SIPDE method introduced in professional driving education" },
        { year: 1988, event: "California requires defensive driving concepts in DMV licensing curriculum" },
        { year: 2000, event: "Insurance companies begin offering premium discounts for defensive driving course completion" },
        { year: 2020, event: "ADAS systems (automatic braking, lane keep) begin augmenting — but not replacing — defensive driving" },
      ],
      keyTakeaways: [
        "Scan 12–15 seconds ahead so hazards are processed early, not at the last second",
        "Cover the brake near pedestrians, merging vehicles, and developing hazards — shaves 0.5 seconds off reaction time",
        "Maintain a 3-second following distance minimum — more in bad weather",
        "Use SIPDE: Scan, Identify, Predict, Decide, Execute — continuously, not just in emergencies",
      ],
      references: [
        { title: "NSC Defensive Driving Course", url: "https://www.nsc.org/home-safety/tools-resources/defensive-driving" },
        { title: "CA DMV Driver Handbook: Space Management", url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/california-driver-handbook/" },
        { title: "CHP Traffic Safety Programs", url: "https://www.chp.ca.gov/programs-services/programs/traffic-safety" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "driving-3-02-q1",
          type: "Technique",
          challenge: `  You're driving on the freeway at 65 mph.
  You see brake lights appearing about 20 cars ahead.
  Traffic is slowing but the car in front of you
  hasn't braked yet.

  What is the SIPDE-trained response?`,
          text: "Using the SIPDE method, what should you do when you see brake lights far ahead?",
          options: [
            "Wait until the car directly in front of you brakes before reacting",
            "Identify the braking hazard, predict it will reach you, decide to slow and cover the brake now",
            "Change lanes immediately without checking mirrors",
            "Flash your hazard lights to warn drivers behind you and wait",
          ],
          correctIndex: 1,
          explanation: "SIPDE in action: You Scanned far ahead (good), you Identify the brake lights as a slowing hazard, you Predict the slowdown will reach you, you Decide to ease off the gas and cover the brake, you Execute by beginning to slow now rather than waiting. Reacting at 20 cars ahead gives you many seconds of buffer; waiting for the car in front gives you almost none.",
        },
        {
          id: "driving-3-02-q2",
          type: "Scenario",
          challenge: `  You're on the freeway. The car ahead is 1.5 seconds
  in front of you. Suddenly it brakes hard.
  Your reaction time is 0.75 seconds.

  Stopping distance at 65 mph is about 300 feet.
  At 65 mph you travel about 95 feet per second.`,
          text: "Why is a 1.5-second following gap dangerously insufficient at freeway speeds?",
          options: [
            "It is fine — reaction time of 0.75 seconds leaves 0.75 seconds of braking buffer",
            "By the time you perceive the hazard and your foot reaches the brake, you've already closed most of the gap — braking distance then far exceeds the remaining space",
            "It is only dangerous if you are tired; alert drivers can handle 1.5 seconds",
            "The 1.5-second gap becomes dangerous only if the car ahead brakes suddenly",
          ],
          correctIndex: 1,
          explanation: "At 65 mph with a 1.5-second gap (≈142 feet), your 0.75-second reaction time consumes about 71 feet. You now have roughly 71 feet left to stop, but full braking from 65 mph requires far more than that. The 3-second rule (about 285 feet) gives you reaction time plus most of the braking distance you need. Closer than 3 seconds and physics works against you.",
        },
        {
          id: "driving-3-02-q3",
          type: "Technique",
          challenge: `  You're approaching an intersection.
  A pedestrian is standing on the curb,
  looking at their phone, appearing to be
  about to step off.

  Your foot is on the gas pedal.`,
          text: "What does 'covering the brake' mean and why should you do it here?",
          options: [
            "Press the brake firmly to begin slowing before the pedestrian steps out",
            "Move your foot off the gas and hover it over the brake without pressing — ready to stop instantly if needed",
            "Cover the brake pedal with your left foot as a backup in case your right foot slips",
            "Turn on hazard lights to warn the pedestrian that you are there",
          ],
          correctIndex: 1,
          explanation: "Covering the brake means moving your foot off the accelerator and hovering it over the brake pedal, poised to press. You are not slowing yet — just ready. This reduces time-to-brake from ~0.75 seconds (moving from gas to brake) to under 0.3 seconds. In a situation where a pedestrian might step out, that half-second reduction could be the difference between stopping and not stopping.",
        },
        {
          id: "driving-3-02-q4",
          type: "Scanning",
          challenge: `  New driver Maya always watches the car
  directly in front of her. She says: "If I
  follow that car, I'll know everything I
  need to know about what's coming."

  Experienced driver Theo scans far ahead,
  reads the whole traffic pattern, and rarely
  needs to brake hard.`,
          text: "How far ahead should a defensive driver scan, and why does it matter?",
          options: [
            "2–3 car lengths — enough to see what the car ahead is doing",
            "12–15 seconds of travel time — gives you time to process hazards and respond smoothly",
            "As far as possible — defensive drivers always look to the horizon",
            "5 seconds ahead — a good balance between near and far",
          ],
          correctIndex: 1,
          explanation: "Scanning 12–15 seconds ahead (about a quarter mile on the freeway, one block in the city) gives you enough time to identify developing hazards and respond smoothly — no hard braking, no panic swerving. Drivers who only watch the car directly in front are perpetually reactive and surprise-prone. 12–15 seconds is the standard taught by NSC, CHP, and professional driving schools.",
        },
      ],
    },
  },

  // ─── driving-3-03: Road Rage ──────────────────────────────────────────────────
  {
    epochId: "driving-3",
    wonder: {
      name: "Los Angeles Freeway System",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "😤",
    },
    id: "driving-3-03",
    order: 3,
    title: "Staying Cool",
    subtitle: "Road rage, de-escalation, and protecting yourself",
    category: "driving",
    xp: 80,
    badge: { id: "driving-3-badge-03", name: "Cool Head", emoji: "🧊" },
    challengeType: "quiz",
    info: {
      tagline: "Road rage turns a frustrating commute into a dangerous situation — for everyone.",
      year: 1995,
      overview: [
        "Road rage is aggressive or violent behavior by a driver in response to a perceived traffic offense by another driver. It escalates from frustration (a normal reaction) to aggressive action (dangerous and potentially criminal). Common triggers include being cut off, someone driving slowly in the fast lane, tailgating, or a perceived slight. The problem: the 'offense' is often unintentional, and even when it is intentional, responding with aggression creates far worse outcomes than the original annoyance.",
        "De-escalation is always the correct response when another driver becomes aggressive. This means: do not make eye contact, do not gesture or yell back, do not brake-check them, do not speed up to 'keep up' with them. Your goal is to separate yourself from the aggressor — change lanes, slow down, take a different exit. Matching aggression is how minor incidents become crashes or altercations.",
        "If an aggressive driver follows you or is threatening, do not drive home. Drive to a police station, a busy public place, or call 911. CHP can be reached on California roads via 911 or #77 from a cell phone. Staying in your car in a public place with doors locked is far safer than engaging or getting out.",
      ],
      technical: {
        title: "Recognizing and Responding to Aggressive Drivers",
        body: [
          "Warning signs that another driver is aggressive: excessive speed and weaving, tailgating, repeated horn honking, aggressive headlight flashing, making obscene gestures, yelling or threatening. If you see these signs directed at any car (including yours), create space between you and that driver immediately.",
          "Managing your own frustration: acknowledge that other drivers' mistakes are usually not personal. A driver who cut you off likely didn't see you — they weren't targeting you. Name the frustration internally ('that was irritating') but don't feed it. Podcasts, music, and controlled breathing all help. Avoid driving when emotionally escalated.",
        ],
        codeExample: {
          label: "Road Rage Response Protocol",
          code: `  ANOTHER DRIVER IS AGGRESSIVE TOWARD YOU:

  1. Do NOT make eye contact or gesture back
  2. Do NOT brake-check or block them
  3. Slow down / change lanes to create space
  4. Do NOT speed up or engage in any way

  IF THEY ARE FOLLOWING YOU:
  5. Do NOT drive to your home or destination
  6. Drive to a police station or busy public place
  7. Stay in your locked car
  8. Call 911 — report license plate, direction of travel
  9. #77 on cell = CHP dispatch in California`,
        },
      },
      incident: {
        title: "The I-5 Road Rage Shooting, Sacramento",
        when: "April 2021",
        where: "Interstate 5, Sacramento, California",
        impact: "A 6-year-old child was fatally shot after a road rage incident between two vehicles on I-5. The case became national news and a landmark example of the deadly potential of road rage escalation.",
        body: [
          "In April 2021, a road rage incident on Interstate 5 in Sacramento ended with a 6-year-old boy shot and killed while riding in the family's car. The altercation began with a dispute between two drivers. Investigators determined the child was an innocent victim of an escalating confrontation he had nothing to do with.",
          "The case was significant not because road rage shootings are common, but because it demonstrated in the starkest possible terms what can happen when drivers engage with aggression rather than disengage. California law enforcement agencies used the case in public awareness campaigns about road rage. The lesson is unambiguous: no lane dispute, no perceived insult, is worth engaging with an unknown person in an unknown state of mind.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Traffic Trigger", sub: "cut off, tailgated, etc.", type: "attacker" },
          { label: "Driver Frustration", sub: "normal, manageable", type: "system" },
          { label: "Escalation Choice", sub: "engage or disengage?", type: "victim" },
          { label: "De-escalation", sub: "create space, do not engage", type: "result" },
        ],
      },
      timeline: [
        { year: 1987, event: "The term 'road rage' coined by Los Angeles TV reporter after wave of freeway shootings" },
        { year: 1995, event: "AAA Foundation study defines road rage as a distinct traffic safety problem", highlight: true },
        { year: 2000, event: "California enacts harsher penalties for assault with a vehicle in road rage cases" },
        { year: 2016, event: "AAA survey: nearly 80% of US drivers expressed anger or aggression at least once in the past year" },
        { year: 2021, event: "Firearm-related road rage incidents reach record levels in the US (Everytown research)" },
        { year: 2023, event: "CHP launches expanded Road Rage Awareness campaign across California freeways" },
      ],
      keyTakeaways: [
        "Never match aggression — disengage by slowing, changing lanes, or exiting",
        "Do not make eye contact, gesture, or yell at an aggressive driver",
        "If followed, do not go home — drive to a police station or busy public place and call 911",
        "In California, dial #77 from a cell phone to reach CHP dispatch",
      ],
      references: [
        { title: "AAA Foundation: Aggressive Driving Research", url: "https://aaafoundation.org/aggressive-driving/" },
        { title: "CHP Road Rage Tips", url: "https://www.chp.ca.gov/programs-services/programs/traffic-safety" },
        { title: "NHTSA: Aggressive Driving", url: "https://www.nhtsa.gov/risky-driving/aggressive-driving" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "driving-3-03-q1",
          type: "Scenario",
          challenge: `  A driver cuts you off on the freeway.
  You're angry. They're now directly in front
  of you, going slower than you were.

  Your options:
  A) Flash your headlights repeatedly at them
  B) Honk several times and drive up close
  C) Back off, create space, let it go
  D) Change lanes and accelerate past them with a gesture`,
          text: "Which is the safe, correct response to being cut off?",
          options: [
            "Option A — let them know their behavior was unacceptable",
            "Option B — close the gap so they understand the hazard they created",
            "Option C — back off, create space, and let it go",
            "Option D — getting around them ends the confrontation",
          ],
          correctIndex: 2,
          explanation: "Option C is the only safe choice. Flashing lights, tailgating, or gesturing all escalate the situation and could provoke an unstable driver. Getting around them with a gesture is also escalation. The driver who cut you off likely didn't see you — this was almost certainly not personal. Creating distance protects you physically and ends the interaction.",
        },
        {
          id: "driving-3-03-q2",
          type: "Escalation",
          challenge: `  An aggressive driver has been tailgating you
  for several miles. They're flashing their
  lights and honking. You're approaching your
  neighborhood exit.`,
          text: "What should you do if you suspect the driver may follow you?",
          options: [
            "Take your normal exit — don't let them change your plans",
            "Speed up to create distance, then pull over on a side street",
            "Do not take the exit toward home — drive to a police station or busy public place",
            "Stop your car on the freeway shoulder to let them pass",
          ],
          correctIndex: 2,
          explanation: "Never lead a potentially threatening driver to your home. Drive past your exit and head to a police station, a 24-hour store, or any busy public place. Stay in your car, lock the doors, and call 911. Give the dispatcher the vehicle's description, license plate if you have it, and your location. Stopping on a freeway shoulder creates its own severe danger.",
        },
        {
          id: "driving-3-03-q3",
          type: "Self-Awareness",
          challenge: `  You just had a stressful argument before
  leaving the house. You're running late, you're
  frustrated, and you're getting ready to drive
  on the freeway during rush hour.

  You notice you're already feeling irritated
  before you've left the driveway.`,
          text: "What does driving research say about driving in an emotionally escalated state?",
          options: [
            "Stress has no measurable effect on driving if you focus on the road",
            "Emotional stress increases aggressive driving tendencies and reduces hazard tolerance",
            "Frustration makes you more alert and actually improves reaction time slightly",
            "This is only a concern for teen drivers — adults manage emotions better while driving",
          ],
          correctIndex: 1,
          explanation: "Research consistently shows that drivers who are already emotionally elevated are more likely to perceive neutral events as aggressive, respond more intensely to perceived slights, and make more impulsive decisions. If you are already frustrated before driving, give yourself a few minutes to decompress. Even 5 minutes of slow breathing before getting in the car can meaningfully reduce road rage risk.",
        },
        {
          id: "driving-3-03-q4",
          type: "California Law",
          challenge: `  In California, what number can you dial
  from a cell phone to reach CHP dispatch
  directly — without going through regular 911?`,
          text: "What is the CHP's direct cell phone dispatch number in California?",
          options: [
            "*CHP (star-CHP)",
            "#77",
            "511",
            "411",
          ],
          correctIndex: 1,
          explanation: "#77 connects you directly to California Highway Patrol dispatch when you dial it from a cell phone. It works throughout California on state highways and freeways. Use it to report road rage, aggressive driving, impaired drivers, crashes, or road hazards. Regular 911 also works — #77 is the faster direct route to CHP specifically.",
        },
      ],
    },
  },

  // ─── driving-3-04: Sharing the Road ──────────────────────────────────────────
  {
    epochId: "driving-3",
    wonder: {
      name: "San Francisco Bike Lane Network",
      location: "San Francisco, California",
      era: "Modern",
      emoji: "🚲",
    },
    id: "driving-3-04",
    order: 4,
    title: "Sharing the Road",
    subtitle: "Cyclists, pedestrians, buses, and big trucks",
    category: "driving",
    xp: 80,
    badge: { id: "driving-3-badge-04", name: "Road Sharer", emoji: "🤝" },
    challengeType: "quiz",
    info: {
      tagline: "Every person on the road — walking, cycling, or driving — has the same right to get home safely.",
      year: 2014,
      overview: [
        "California roads are shared by vehicles, cyclists, pedestrians, motorcycles, school buses, and large commercial trucks — all with different speeds, blind spots, stopping distances, and vulnerabilities. Safe driving requires understanding the rules and realities of each. Failing to share the road properly is a leading cause of pedestrian and cyclist fatalities.",
        "California's 3-foot passing law (CVC 21760), effective since 2014, requires drivers to give at least 3 feet of clearance when passing a cyclist. If 3 feet is not possible (narrow lane, oncoming traffic), drivers must slow and wait for a safe opportunity to pass. Passing too close, even without contact, endangers the cyclist — wind turbulence alone can destabilize a bike at speed.",
        "Pedestrians have the right of way in all marked crosswalks and in many unmarked crosswalks at intersections. California law requires drivers to yield to pedestrians who are in or entering a crosswalk. The law does not require the pedestrian to be already in the lane — if they are entering the street, you must yield. School buses with flashing red lights require a full stop in both directions on undivided roads.",
      ],
      technical: {
        title: "No-Zone Truck Blind Spots and Large Vehicle Rules",
        body: [
          "Large semi-trucks have four significant blind spots called No-Zones: directly in front (about 20 feet where the driver cannot see down), directly behind (30 feet where no mirrors cover), and on both sides — especially a large zone on the right side that extends diagonally behind the truck for two full lanes. If you can't see the truck driver's mirrors, the truck driver cannot see you. Do not linger in No-Zones.",
          "School buses with flashing red lights: All traffic approaching from either direction on an undivided road must stop and may not proceed until the lights stop flashing and the stop arm is retracted. On divided highways with a raised median, only traffic behind the bus must stop. On divided roads with a painted center line only (no barrier), all traffic stops.",
        ],
        codeExample: {
          label: "Key Road-Sharing Rules — California",
          code: `  CYCLISTS:
  ✓  Give 3 feet minimum when passing (CVC 21760)
  ✓  If 3 feet not possible: slow and wait
  ✓  Check mirrors before opening door (dooring)

  PEDESTRIANS:
  ✓  Yield to pedestrians in/entering crosswalk
  ✓  Yield at unmarked intersections too
  ✗  Do NOT pass a stopped car at a crosswalk

  SCHOOL BUSES:
  ✓  Stop when red lights flash (undivided road)
  ✓  Wait until arm retracted and lights stop
  ✗  Do NOT pass — even if bus looks empty

  LARGE TRUCKS (No-Zones):
  ✗  Don't linger beside, behind, or directly ahead
  ✓  Pass quickly — don't cruise in blind spots`,
        },
      },
      incident: {
        title: "Cyclist Fatality from Dooring — San Francisco",
        when: "2012 — peak of San Francisco cycling expansion",
        where: "Market Street, San Francisco, California",
        impact: "A cyclist was killed when a car door was flung open directly into the bike lane. The case prompted legislation and city infrastructure changes, and led to California emphasizing the 'Dutch Reach' door-opening technique in driver education.",
        body: [
          "In 2012, a cyclist on Market Street in San Francisco was killed when a car door opened directly in front of them from a parked vehicle, leaving no time to brake or swerve. The driver had not checked their mirror before opening the door. The incident occurred in a designated bike lane — a space cyclists reasonably expected to be safe.",
          "Following several such incidents in San Francisco and other California cities, driver education programs began emphasizing the 'Dutch Reach' technique: opening your car door with your far hand (the hand opposite the door side), which forces your body to rotate toward the road and look back — seeing cyclists before the door is fully open. California now references this technique in updated driver education materials.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Vulnerable Road User", sub: "cyclist, pedestrian", type: "victim" },
          { label: "Driver Awareness Gap", sub: "blind spots, not checking", type: "attacker" },
          { label: "CA Sharing Laws", sub: "3-ft rule, yield, stop arm", type: "system" },
          { label: "Safe Shared Road", sub: "all users reach destination", type: "result" },
        ],
      },
      timeline: [
        { year: 1996, event: "California pedestrian right-of-way law strengthened (CVC 21950)" },
        { year: 2012, event: "San Francisco cycling deaths prompt statewide dooring awareness campaign" },
        { year: 2014, event: "California 3-Foot Passing Law (CVC 21760) takes effect", highlight: true },
        { year: 2016, event: "School bus passing law enforcement increased after multiple incidents" },
        { year: 2020, event: "California adds bicycle infrastructure to state transportation funding formula" },
        { year: 2023, event: "NHTSA reports pedestrian fatalities at 40-year high nationally — CA launches response campaigns" },
      ],
      keyTakeaways: [
        "Give cyclists 3 feet minimum when passing — if you can't, slow and wait",
        "Yield to pedestrians who are in or entering a crosswalk — the law does not require them to be in your lane",
        "Stop for school buses with flashing red lights on undivided roads — in both directions",
        "Avoid truck No-Zones — if you can't see the driver's mirror, the driver cannot see you",
      ],
      references: [
        { title: "California 3-Foot Passing Law CVC 21760", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=21760.&lawCode=VEH" },
        { title: "CA DMV: Sharing the Road", url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/california-driver-handbook/" },
        { title: "FMCSA: No-Zones — Truck Blind Spots", url: "https://www.fmcsa.dot.gov/safety/driver-safety/no-zones-blind-spots" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "driving-3-04-q1",
          type: "California Law",
          challenge: `  You're on a two-lane road with no shoulder.
  A cyclist is riding ahead of you. To pass safely
  you would need to cross the center line briefly.
  There is currently no oncoming traffic.

  California's 3-foot passing law applies.`,
          text: "What should you do when you cannot pass a cyclist while staying in your lane AND giving 3 feet?",
          options: [
            "Pass as close as safely possible — 3 feet is a guideline, not a hard requirement",
            "Wait behind the cyclist until there is a safe opportunity to cross the center line and give full clearance",
            "Honk to alert the cyclist you're passing and proceed immediately",
            "Pass in the bike lane if one exists — that lane is shared during passing",
          ],
          correctIndex: 1,
          explanation: "California's 3-foot passing law (CVC 21760) requires 3 feet of clearance — it is the law, not a suggestion. If your lane is too narrow to give 3 feet, you must wait for an opportunity to safely cross the center line (when oncoming is clear) and pass with full clearance. You may not reduce the clearance because crossing feels awkward. Honking and proceeding dangerously close is also a violation.",
        },
        {
          id: "driving-3-04-q2",
          type: "Pedestrian Rights",
          challenge: `  You're approaching an intersection with a
  marked crosswalk. A pedestrian steps off
  the curb and begins walking across — but
  they are still in the oncoming lane's half
  of the crosswalk, not yet in your lane.

  Do you need to yield?`,
          text: "Must you yield to a pedestrian in a crosswalk who has not yet entered your lane?",
          options: [
            "No — the law only requires yielding once the pedestrian enters your travel lane",
            "Yes — California law requires yielding when a pedestrian is in or entering the crosswalk",
            "Only if the pedestrian makes eye contact with you first",
            "Yes — but only at marked crosswalks, not at unmarked intersections",
          ],
          correctIndex: 1,
          explanation: "California Vehicle Code 21950 requires drivers to yield to pedestrians who are in a crosswalk OR who are entering the crosswalk close enough to be in danger. The pedestrian does not need to be in your lane — if they are actively crossing and could be endangered by your movement, you must yield. This also applies to unmarked crosswalks at intersections (where curbs meet).",
        },
        {
          id: "driving-3-04-q3",
          type: "School Bus",
          challenge: `  You are driving on a two-lane road (one lane
  each direction, no raised median) when a school
  bus ahead activates its flashing red lights
  and extends its stop arm.

  Traffic is approaching from the opposite direction.`,
          text: "What must oncoming traffic (approaching from the opposite direction) do?",
          options: [
            "Continue — only the traffic behind the bus must stop",
            "Slow to 15 mph and proceed carefully",
            "Stop — on an undivided road, ALL traffic in both directions must stop for a school bus with red lights flashing",
            "Stop only if students are visibly crossing the road",
          ],
          correctIndex: 2,
          explanation: "On an undivided road (including two-lane roads with only a painted center line), ALL traffic in BOTH directions must stop when a school bus activates flashing red lights. Only on divided highways with a physical raised barrier does the opposite direction have an exception. You must remain stopped until the red lights stop flashing and the stop arm retracts.",
        },
        {
          id: "driving-3-04-q4",
          type: "Truck Safety",
          challenge: `  You are driving next to a large semi-truck.
  You've been next to it for the last mile.
  You can see the truck, but you cannot see
  the driver's face in their mirrors.

  The truck begins to merge toward your lane.`,
          text: "Why couldn't the truck driver see you, and what is the takeaway for driving near large trucks?",
          options: [
            "The truck's turn signal malfunctioned — always report trucks with broken signals",
            "You were in the truck's No-Zone blind spot — if you can't see the driver's mirrors, the driver cannot see you",
            "The driver was distracted — report them to CHP at #77",
            "Large trucks have good visibility on the left side — the problem must have been driver error",
          ],
          correctIndex: 1,
          explanation: "The No-Zone rule: if you cannot see the truck driver's face in their side mirrors, you are in a blind spot and the driver cannot see you. Large trucks have significant blind spots on both sides (especially the right), directly behind, and directly in front. The rule is simple: pass trucks decisively and quickly, never linger alongside, and never sit in a No-Zone. If a truck signals a lane change, give it space.",
        },
      ],
    },
  },

  // ─── driving-3-05: Car Care Basics ───────────────────────────────────────────
  {
    epochId: "driving-3",
    wonder: {
      name: "Auto Repair Shop Garage",
      location: "California",
      era: "Modern",
      emoji: "🔧",
    },
    id: "driving-3-05",
    order: 5,
    title: "Car Care Basics",
    subtitle: "Tires, oil, lights, and knowing when to stop immediately",
    category: "driving",
    xp: 85,
    badge: { id: "driving-3-badge-05", name: "Car Caretaker", emoji: "🔧" },
    challengeType: "quiz",
    info: {
      tagline: "You don't need to be a mechanic to keep your car safe — but you do need to know the basics.",
      year: 2000,
      overview: [
        "A car that is poorly maintained is a safety hazard. Tire blowouts, brake failures, and overheating engines cause thousands of crashes every year in the US — many of which a basic inspection could have prevented. Learning to check tires, oil, and lights, and to recognize dashboard warning lights, is part of responsible vehicle ownership. California law requires vehicles to be in a safe condition to operate, and a non-roadworthy vehicle can be cited.",
        "Tires are the single most safety-critical maintenance item on a vehicle. Low tire pressure increases braking distance and makes blowouts more likely. Worn tread reduces traction, especially in wet conditions. The minimum legal tread depth in California is 2/32 of an inch — you can check with a penny (Lincoln's head disappears if you have enough tread). Tire pressure should be checked monthly and before any long trip; check the sticker inside your driver's door jamb for the recommended PSI.",
        "Dashboard warning lights are divided into two urgency levels: red lights that mean stop driving as soon as safely possible (oil pressure, temperature, brake system, battery), and yellow/amber lights that mean visit a shop soon but are not immediately dangerous (check engine, traction control, tire pressure). Never ignore a red warning light — driving further can cause catastrophic engine or brake damage.",
      ],
      technical: {
        title: "Monthly Vehicle Safety Check",
        body: [
          "Oil level check: engine must be off for at least 5 minutes. Pull the dipstick, wipe clean, reinsert fully, pull again. Oil level should be between the MIN and MAX marks. Oil should be amber/brown — black gritty oil needs a change. Milky oil (looks like coffee with cream) indicates coolant mixing with oil — stop driving immediately and have it inspected.",
          "Coolant level: check the translucent overflow reservoir when the engine is COLD. Never open the radiator cap on a hot engine — pressurized coolant can cause severe burns. Coolant should be between MIN and MAX. Low coolant causes overheating, which can warp the engine head — an extremely expensive failure.",
        ],
        codeExample: {
          label: "Warning Light Quick Reference",
          code: `  RED = STOP SOON (serious risk if you continue):
  🔴 Oil pressure  — stop immediately, check oil
  🔴 Temperature   — stop, engine overheating
  🔴 Battery       — electrical failure imminent
  🔴 Brake light   — brake fluid low or failure

  YELLOW = VISIT SHOP (monitor, not emergency):
  🟡 Check Engine  — emissions/sensor issue
  🟡 TPMS (tire)  — one or more tires low pressure
  🟡 Traction/Stab — traction system fault
  🟡 Service Due   — scheduled maintenance due`,
        },
      },
      incident: {
        title: "The I-15 Tire Blowout — Tread Depth Failure",
        when: "Summer 2018 — peak California road trip season",
        where: "Interstate 15, San Bernardino County, California",
        impact: "A family's SUV suffered a catastrophic rear tire blowout at 75 mph due to tread worn below legal minimum. The vehicle rolled. NHTSA analysis of the tires confirmed the tread was less than 1/32 inch — half the legal minimum. Three of four passengers were injured.",
        body: [
          "In summer 2018, a family driving on I-15 in the Mojave Desert experienced a sudden rear tire blowout at freeway speed. Post-crash inspection revealed the tire's tread had been worn to 1/32 of an inch — significantly below the 2/32 legal minimum. The heat of summer desert driving compounded the risk; high temperatures increase tire pressure and stress aged rubber.",
          "CHP officers who responded noted the vehicle had passed a recent smog inspection — which does not include tire inspection. This case became a reference point in California road safety campaigns emphasizing that safety inspections are the driver's responsibility, not the state's. A penny test done before the trip would have identified the worn tires immediately.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Worn/Low Tires", sub: "reduces grip and blowout risk", type: "attacker" },
          { label: "Monthly Check Habit", sub: "pressure + tread depth", type: "system" },
          { label: "Warning Light", sub: "dashboard signal to act", type: "victim" },
          { label: "Safe Vehicle", sub: "maintained, roadworthy", type: "result" },
        ],
      },
      timeline: [
        { year: 1971, event: "US DOT establishes minimum tire tread depth of 2/32 inch nationally" },
        { year: 2000, event: "Ford Explorer/Firestone tire recall — 271 deaths — renews public focus on tire safety", highlight: true },
        { year: 2007, event: "TPMS (Tire Pressure Monitoring System) required on all new US vehicles" },
        { year: 2015, event: "AAA study: nearly 1 in 3 vehicles driven with at least one unsafe tire" },
        { year: 2021, event: "NHTSA: tire-related crashes cause ~600 deaths annually in the US" },
        { year: 2024, event: "California BAR (Bureau of Automotive Repair) adds tire depth to safety inspection checklist" },
      ],
      keyTakeaways: [
        "Check tire pressure monthly and before long trips — find recommended PSI on the door jamb sticker",
        "Do the penny test: insert a penny in the tread groove — if Lincoln's head disappears, you have enough tread",
        "Red dashboard lights mean stop as soon as safely possible — do not continue driving",
        "Check oil level on a cold engine — milky oil means stop and get inspected immediately",
      ],
      references: [
        { title: "NHTSA Tire Safety", url: "https://www.nhtsa.gov/equipment/tires" },
        { title: "CA BAR: Vehicle Maintenance Tips", url: "https://www.bar.ca.gov" },
        { title: "AAA Car Care: Monthly Checklist", url: "https://www.aaa.com/autorepair" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "driving-3-05-q1",
          type: "Tire Safety",
          challenge: `  You insert a penny into the tread groove of your tire.
  Abraham Lincoln's entire head is visible above the tread.

  What does this mean?`,
          text: "If Lincoln's full head is visible above the tread during a penny test, what does that mean?",
          options: [
            "Your tires have excellent tread — Lincoln's head being visible is a good sign",
            "Your tires are at the legal minimum — they're fine for a few more months",
            "Your tires are worn below the 2/32-inch legal minimum — they need to be replaced",
            "The penny test only applies to front tires, not rear tires",
          ],
          correctIndex: 2,
          explanation: "The penny test works like this: insert the penny with Lincoln's head pointing into the groove. If the tread covers any part of Lincoln's head, you have at least 2/32 inch of tread — the legal minimum. If his entire head is visible, you're at or below 2/32 inch and the tire should be replaced. Many experts recommend replacing at 4/32 inch (use a quarter — Washington's head should be partially covered).",
        },
        {
          id: "driving-3-05-q2",
          type: "Warning Lights",
          challenge: `  While driving, your RED oil pressure warning light
  comes on. You are 8 miles from home and there is
  no gas station nearby.

  What should you do?`,
          text: "What is the correct response to a red oil pressure warning light while driving?",
          options: [
            "Drive home carefully — 8 miles is a short enough distance to risk it",
            "Pull over safely as soon as possible and stop the engine — continuing can destroy the engine in minutes",
            "Reduce speed to 25 mph and drive to the nearest gas station",
            "Add oil at the next gas station — low oil is rarely urgent",
          ],
          correctIndex: 1,
          explanation: "A red oil pressure warning light means the engine is not receiving adequate oil pressure RIGHT NOW — not that oil is low in the future. Running an engine with insufficient oil pressure causes catastrophic metal-on-metal friction. Engine seizure can occur within minutes of the light illuminating. Pull over immediately, stop the engine, and call for assistance. Driving 8 miles on a seized-oil engine can turn a tow call into a $8,000+ engine replacement.",
        },
        {
          id: "driving-3-05-q3",
          type: "Oil Check",
          challenge: `  You want to check your engine oil level.
  The car has been running for 2 hours.
  You've just parked.

  STEP 1: Open the hood
  STEP 2: Pull the dipstick`,
          text: "Why should you wait before checking oil on a recently driven car?",
          options: [
            "You should not wait — oil readings are only accurate when the engine is warm",
            "The engine should be off for at least 5 minutes so oil drains back to the pan and gives an accurate reading",
            "You need to wait 30 minutes for the exhaust fumes to clear before working under the hood",
            "Waiting is only required if you're checking coolant, not oil",
          ],
          correctIndex: 1,
          explanation: "When the engine is running or just stopped, oil is circulated throughout the engine and hasn't drained back to the oil pan yet — making the dipstick read low even if the level is correct. Waiting 5 minutes after shutting off allows oil to drain back to the sump and gives you an accurate reading. Also wipe the dipstick clean, reinsert fully, then pull again to get a clean reading.",
        },
        {
          id: "driving-3-05-q4",
          type: "Tire Pressure",
          challenge: `  You find your car's recommended tire pressure.
  Where is the most accurate place to find
  this information?`,
          text: "Where should you look to find the correct tire pressure for your specific vehicle?",
          options: [
            "On the sidewall of the tire itself — it lists the maximum PSI",
            "The sticker on the driver's door jamb or owner's manual — it lists the recommended PSI",
            "The tire pressure monitoring system display — it shows the recommended pressure",
            "The gas station air pump — they have pressure guides for all vehicles",
          ],
          correctIndex: 1,
          explanation: "The sticker on the driver's door jamb (or the owner's manual) shows the manufacturer-recommended tire pressure for your specific vehicle — usually 32–36 PSI. The sidewall of the tire shows the MAXIMUM pressure the tire can handle — which is higher than the recommended driving pressure and should not be used as a fill target. The TPMS warns you when pressure is low but does not specify the target PSI.",
        },
      ],
    },
  },

  // ─── driving-3-06: After a Crash ─────────────────────────────────────────────
  {
    epochId: "driving-3",
    wonder: {
      name: "California Intersection Dashcam",
      location: "California",
      era: "Modern",
      emoji: "📹",
    },
    id: "driving-3-06",
    order: 6,
    title: "After a Crash",
    subtitle: "What to do in the first minutes — and the forms to file",
    category: "driving",
    xp: 90,
    badge: { id: "driving-3-badge-06", name: "Crash Ready", emoji: "📋" },
    challengeType: "quiz",
    info: {
      tagline: "Knowing what to do after a crash — and what not to say — protects you legally and physically.",
      year: 2005,
      overview: [
        "Every driver should know exactly what to do if they are involved in a crash, because it is very difficult to think clearly in the immediate aftermath. California law imposes specific obligations on drivers involved in crashes: you must stop, provide your information, and render aid if needed. Leaving the scene of a crash involving injury is a felony under California law.",
        "Never admit fault at the scene. Even if you believe you caused the crash, fault determination is complex and involves factors you may not be aware of — the other driver's speed, their intoxication, road conditions, mechanical failures. Statements made at the scene are admissible in court and can be used against you in insurance claims and lawsuits. Simply provide your information, check for injuries, call 911 if needed, and cooperate with law enforcement.",
        "California requires drivers to file a SR-1 form (Report of Traffic Accident Occurring in California) with the DMV within 10 days when a crash involves injury, death, or property damage exceeding $1,000 to any one person's property. Failure to file when required can result in license suspension. This is separate from any police report — you must file the SR-1 yourself.",
      ],
      technical: {
        title: "Crash Scene Documentation",
        body: [
          "Photograph everything before moving vehicles (if safe): damage to both vehicles, license plates, street signs and intersection, skid marks, any visible injuries, and the overall scene. Photos are time-stamped and GPS-tagged on modern phones and are powerful evidence. Take more photos than you think you need.",
          "Information to exchange: full name, address, phone number, driver's license number, vehicle registration, insurance company name and policy number. Do not share more than this. Do not sign anything another driver offers you. Do not accept cash to 'settle' at the scene — injuries may not be apparent immediately.",
        ],
        codeExample: {
          label: "Post-Crash Action Checklist",
          code: `  IMMEDIATELY:
  1. Stop — you are legally required to
  2. Check yourself and passengers for injury
  3. If safe, move vehicles out of traffic
  4. Call 911 if: injury, major damage, dispute

  INFORMATION TO EXCHANGE:
  ✓  Name, address, phone number
  ✓  Driver's license number
  ✓  Vehicle registration info
  ✓  Insurance company + policy number

  DOCUMENT THE SCENE:
  ✓  Photos of both vehicles, plates, damage
  ✓  Street signs, intersection, skid marks

  NEVER SAY:
  ✗  "It was my fault" / "I didn't see you"
  ✗  "I'm so sorry" (implies fault legally)

  WITHIN 10 DAYS:
  ✓  File SR-1 with DMV if damage > $1,000
      or any injury/death`,
        },
      },
      incident: {
        title: "The 'Sorry' Problem — How Apologies Affect Insurance Claims",
        when: "2005 — California insurance litigation case study",
        where: "Los Angeles, California",
        impact: "A driver's verbal apology at the scene was used as an admission of fault in a subsequent lawsuit, resulting in a judgment against them despite evidence suggesting shared fault.",
        body: [
          "In a 2005 Los Angeles civil case, a driver who said 'I'm so sorry, I should have seen you' at the crash scene found those words entered into evidence and treated as an admission of liability. Under California law, statements made at the scene are admissible, and an apology — even a reflexive, sympathetic one — can function as a legal admission of fault.",
          "California is among the states that have debated 'apology laws' (which protect apologetic statements from use as admissions), but as of now, apologies at crash scenes remain admissible. Legal professionals universally advise: express genuine concern for the other party's wellbeing ('Are you okay? Do you need help?'), call 911, exchange information — but make no statements about fault, cause, or responsibility.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Crash Occurs", sub: "chaotic, stressful moment", type: "attacker" },
          { label: "Legal Obligations", sub: "stop, aid, exchange info", type: "system" },
          { label: "Fault Statements", sub: "can be used against you", type: "victim" },
          { label: "Documented Scene", sub: "photos, SR-1, no admission", type: "result" },
        ],
      },
      timeline: [
        { year: 1935, event: "California first requires drivers to stop and provide information after a crash" },
        { year: 1988, event: "Hit-and-run causing injury elevated to felony in California" },
        { year: 2000, event: "SR-1 form updated — electronic filing option added by DMV" },
        { year: 2005, event: "Insurance industry study: verbal fault admissions affect 23% of contested claims", highlight: true },
        { year: 2015, event: "Dashcam adoption increases — video evidence changes post-crash documentation" },
        { year: 2023, event: "California considers expanding medical apology privilege — not yet enacted" },
      ],
      keyTakeaways: [
        "Stop immediately — leaving the scene of an injury crash is a felony in California",
        "Never admit fault — say nothing about who caused the crash; just exchange information",
        "Document everything: photos of damage, plates, scene layout, injuries",
        "File SR-1 with the DMV within 10 days if damage exceeds $1,000 or there is injury or death",
      ],
      references: [
        { title: "CA DMV: Reporting Traffic Accidents (SR-1)", url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/fast-facts/reporting-traffic-accidents/" },
        { title: "California Vehicle Code: Hit and Run (CVC 20001)", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=20001.&lawCode=VEH" },
        { title: "CHP: What to Do After a Collision", url: "https://www.chp.ca.gov" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "driving-3-06-q1",
          type: "Legal Obligation",
          challenge: `  You are involved in a minor fender-bender
  in a parking lot. No one appears injured.
  Damage to each car is moderate.

  You consider leaving without exchanging
  information because "it's just a parking lot."`,
          text: "Under California law, what are you required to do when involved in any traffic collision?",
          options: [
            "You only need to leave a note on the windshield if the other driver isn't present",
            "You must stop, provide your information to the other driver, and render reasonable aid if there are injuries",
            "Parking lot collisions have different rules — you can leave if no one is hurt",
            "You are only legally required to stop and exchange info on public roads, not private property",
          ],
          correctIndex: 1,
          explanation: "California Vehicle Code 20002 requires drivers to stop and provide identifying information (name, address, license number, registration) at the scene of any crash involving property damage — including parking lots, which are generally treated as private roadways under the same rules. Leaving without exchanging information in a parking lot is still a hit-and-run offense when the other party is present or the vehicle is identifiable.",
        },
        {
          id: "driving-3-06-q2",
          type: "Scene Documentation",
          challenge: `  You've just had a collision. Both cars are pulled
  to the side of the road. No one is injured.
  Your phone has 40% battery.

  What should you photograph first?`,
          text: "What are the most important things to photograph at a crash scene?",
          options: [
            "The other driver's face — for identification purposes if they flee",
            "Your own vehicle damage only — the other party is responsible for their own documentation",
            "Both vehicles' damage, both license plates, the overall scene including street signs and any skid marks",
            "Only the point of impact on both vehicles — context photos are not legally useful",
          ],
          correctIndex: 2,
          explanation: "Photograph everything: damage to both vehicles, license plates of all vehicles involved, the full scene including street signs and intersection names, skid marks, any road hazards, and the overall positions of the vehicles. Wide shots establish context; close-ups document damage. Photos are time-stamped and GPS-tagged — they are powerful evidence in insurance claims and litigation. Take far more than you think you need.",
        },
        {
          id: "driving-3-06-q3",
          type: "Fault Admission",
          challenge: `  Right after a crash, the other driver looks upset.
  You feel terrible. The collision was at least
  partly your fault.

  You consider saying: "I'm so sorry — I didn't
  see your car. That was completely on me."`,
          text: "Why should you avoid saying 'I'm so sorry, that was my fault' even if you believe it?",
          options: [
            "It is rude to apologize first — let the police determine fault officially",
            "Apologies and fault statements made at the scene are admissible in court and insurance proceedings, and may be used against you",
            "Fault is never assigned at the scene, so your statement is meaningless legally",
            "You should only apologize in writing, not verbally, to preserve the record",
          ],
          correctIndex: 1,
          explanation: "Verbal statements at a crash scene are legally admissible. Saying 'that was my fault' or 'I didn't see you' can be used as an admission of liability in both insurance claims and civil lawsuits — even if the complete picture of fault is more complex (other driver was also speeding, road was defective, etc.). Express concern for wellbeing ('Are you okay?'), provide your required information, cooperate with police — but make no statements about cause or fault.",
        },
        {
          id: "driving-3-06-q4",
          type: "SR-1 Filing",
          challenge: `  You were in a crash. Damage to your car: $800.
  Damage to the other car: $1,400.
  No injuries. Police came and wrote a report.

  Do you need to file a SR-1 with the CA DMV?`,
          text: "When is a California driver required to file a SR-1 form with the DMV?",
          options: [
            "No — the police report takes care of the filing requirement",
            "Yes — damage to any person's property exceeds $1,000, so SR-1 must be filed within 10 days",
            "Only if there were injuries — property damage alone does not require SR-1",
            "No — SR-1 is only required when the total combined damage exceeds $1,000",
          ],
          correctIndex: 1,
          explanation: "California requires you to file a SR-1 when the collision results in: (1) any injury or death, OR (2) property damage to any person's property exceeding $1,000. Here, the other car sustained $1,400 in damage — one person's property exceeds $1,000 — so SR-1 is required, filed within 10 days. The police report does NOT replace SR-1. They are separate filings.",
        },
      ],
    },
  },

  // ─── driving-3-07: Breakdowns and Roadside Safety ────────────────────────────
  {
    epochId: "driving-3",
    wonder: {
      name: "Highway Shoulder",
      location: "Interstate 5, California",
      era: "Modern",
      emoji: "🔺",
    },
    id: "driving-3-07",
    order: 7,
    title: "Breakdowns and Roadside Safety",
    subtitle: "Pulling over safely and staying alive on the freeway shoulder",
    category: "driving",
    xp: 85,
    badge: { id: "driving-3-badge-07", name: "Breakdown Survivor", emoji: "🚨" },
    challengeType: "quiz",
    info: {
      tagline: "The freeway shoulder is one of the most dangerous places in California — treat it that way.",
      year: 2010,
      overview: [
        "Vehicle breakdowns are common — AAA responds to more than 32 million service calls in the US every year. Knowing how to handle a breakdown safely, particularly on a freeway, can prevent an already stressful situation from becoming a fatal one. Freeway shoulders are particularly dangerous because vehicles travel at high speeds nearby and drivers are not always alert for stationary obstacles.",
        "If your vehicle breaks down or you need to pull over on a freeway, activate your hazard lights immediately. Steer as far to the right as possible — onto the shoulder, against the guardrail if one is present. If possible, exit at the next off-ramp rather than stopping on the freeway mainline. Once stopped, leave your hazard lights on, do not open the driver's door into traffic, and do not stand between your car and the travel lanes.",
        "Emergency triangles or flares should be placed 10 feet behind the vehicle and at 100 and 200 feet — the standard warning distance. However, on a freeway, CHP advises staying inside the locked vehicle (with seat belts on) rather than standing outside, because a distracted driver hitting your stopped car is far more survivable inside than outside the vehicle.",
      ],
      technical: {
        title: "Freeway Breakdown — Priority Actions",
        body: [
          "Calling for help: AAA can be reached at 1-800-222-4357. California drivers can also reach CHP by calling #77 from a cell phone, or by pushing the SOS button in vehicles equipped with connected services (OnStar, BMW Assist, etc.). Provide your location using freeway number, direction of travel, and the nearest milepost marker (green signs on most California freeways).",
          "Move It or Leave It: If your car is still drivable after a minor impact or flat tire, California's 'Move It' law requires you to move to the shoulder or the nearest safe location off the roadway. Blocking a travel lane when the car is moveable creates serious secondary crash risk and is also a citation.",
        ],
        codeExample: {
          label: "Freeway Breakdown Protocol",
          code: `  BREAKING DOWN ON THE FREEWAY:

  1. Activate hazard lights IMMEDIATELY
  2. Steer to the right shoulder — as far right as possible
  3. If possible: exit at the nearest off-ramp instead
  4. Once stopped: leave hazard lights ON
  5. Do NOT open driver's door into traffic
  6. Place warning triangles: 10 ft, 100 ft, 200 ft back
  7. CHP recommendation: STAY IN VEHICLE (seat belt on)
     (struck car = survivable; struck person = not)
  8. Call AAA (1-800-222-4357) or CHP (#77)
  9. Give location: freeway #, direction, milepost marker`,
        },
      },
      incident: {
        title: "The Move It Law and Secondary Crashes in California",
        when: "2007 — California 'Move It' law enacted",
        where: "California freeways",
        impact: "Before the 'Move It' law, stalled vehicles in travel lanes were involved in thousands of secondary crashes annually. CHP data showed a measurable reduction after drivers were required by law to move disabled vehicles to the shoulder when possible.",
        body: [
          "Secondary crashes — crashes that occur when another vehicle hits an already-disabled vehicle on the roadway — were a significant traffic safety problem in California. Drivers who stopped in travel lanes after minor fender-benders or flat tires created dangerous bottlenecks where rear-end collisions were frequent, sometimes fatal.",
          "California enacted the 'Move It' law in 2007, requiring drivers to move their vehicle out of the travel lanes and to a safe location when it is safe to do so after a crash or breakdown. CHP officers can now direct drivers to move their vehicles. The law has contributed to a reduction in secondary crash incidents, though the problem remains significant when drivers leave vehicles in travel lanes unnecessarily.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Breakdown Occurs", sub: "high-speed traffic all around", type: "attacker" },
          { label: "Pull Right, Hazards On", sub: "clear the travel lane", type: "system" },
          { label: "Freeway Shoulder", sub: "dangerous — stay in car", type: "victim" },
          { label: "Help Arrives Safely", sub: "AAA / CHP dispatched", type: "result" },
        ],
      },
      timeline: [
        { year: 1980, event: "AAA expands emergency road service to all 50 states" },
        { year: 2000, event: "OnStar automatic emergency notification system introduced in vehicles" },
        { year: 2007, event: "California 'Move It' law enacted — disabled vehicles must be moved from travel lanes", highlight: true },
        { year: 2010, event: "CHP updates freeway safety protocols — recommends staying inside vehicle on high-speed roads" },
        { year: 2019, event: "California Freeway Service Patrol expanded — free tows off freeways during peak hours" },
        { year: 2023, event: "AAA data: flat tires remain the #1 roadside assistance call in California" },
      ],
      keyTakeaways: [
        "Activate hazard lights immediately when trouble starts — then steer to the right shoulder",
        "On the freeway, stay inside the car with seat belts on — being struck inside the car is far more survivable than being struck outside",
        "Call AAA (1-800-222-4357) or CHP (#77) — give your location as freeway number, direction, and milepost marker",
        "If your car is moveable after a crash, California law requires you to move it out of the travel lane",
      ],
      references: [
        { title: "CA Freeway Service Patrol — AAA", url: "https://www.aaa.com/stop/fsp.html" },
        { title: "CHP: Freeway Safety", url: "https://www.chp.ca.gov" },
        { title: "CA DMV: What to Do If Your Car Breaks Down", url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/california-driver-handbook/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "driving-3-07-q1",
          type: "Scenario",
          challenge: `  Your car suddenly loses power on the freeway.
  You are in the second lane from the right.
  Traffic is traveling at 70 mph around you.

  What is your immediate first action?`,
          text: "What should be your first action when your car loses power on a freeway?",
          options: [
            "Turn on your hazard lights and steer toward the right shoulder",
            "Stop where you are and call AAA before moving",
            "Open your door and flag down another driver",
            "Turn on your headlights and remain in your lane until the car stops naturally",
          ],
          correctIndex: 0,
          explanation: "Activate hazard lights FIRST — immediately and automatically. Then use whatever momentum you have to steer to the right shoulder. Stopping in a travel lane at freeway speeds is extremely dangerous — you become an obstacle in a stream of 70 mph traffic. Even coasting with no engine power, you can likely reach the shoulder. Hazard lights warn following drivers before they're upon you.",
        },
        {
          id: "driving-3-07-q2",
          type: "Safety Protocol",
          challenge: `  You've pulled to the shoulder successfully.
  You're on the right shoulder of I-5.
  Traffic is flying past at 70 mph, 3 feet away.

  Your options:
  A) Get out to look at the problem
  B) Stay in the car, seat belt on, call for help
  C) Stand behind the car to be more visible
  D) Open the hood to signal distress`,
          text: "On a high-speed freeway shoulder, what does CHP recommend as the safest action?",
          options: [
            "Option A — diagnosing the problem quickly reduces time on the shoulder",
            "Option B — stay inside the car with seat belt fastened and call for help",
            "Option C — being outside and visible helps passing drivers give you more space",
            "Option D — an open hood is the universal breakdown signal",
          ],
          correctIndex: 1,
          explanation: "CHP recommends staying inside the car with your seat belt on. This seems counterintuitive, but statistics support it: a driver standing on the shoulder is extremely vulnerable — a distracted driver drifting onto the shoulder will hit a person directly. Inside a car, there is a substantial metal structure between you and an impact. Leave hazard lights on, call for help, and wait inside. Exit the car only if there is a fire or other immediate danger.",
        },
        {
          id: "driving-3-07-q3",
          type: "Warning Triangles",
          challenge: `  Your car has broken down on a two-lane highway
  (not a freeway). You have emergency warning
  triangles in your trunk. Traffic is moving at 55 mph.

  Where should you place the triangles?`,
          text: "Where should warning triangles be placed after a breakdown on a two-lane highway?",
          options: [
            "One directly behind the car, one in front — triangles on both sides of the car",
            "10 feet behind, 100 feet behind, and 200 feet behind the vehicle",
            "All three triangles as far behind as possible — 500 feet back",
            "Only one triangle is needed — directly behind the car at 5 feet",
          ],
          correctIndex: 1,
          explanation: "The standard emergency triangle placement: one at 10 feet behind the vehicle (immediately visible to drivers approaching), one at 100 feet, one at 200 feet. This creates a progressive warning sequence — drivers see the 200-foot triangle first and have time to slow, then the 100-foot confirms the hazard, then the 10-foot tells them exactly where to avoid. On freeways, however, CHP advises against leaving your car to set triangles if traffic speed is high.",
        },
        {
          id: "driving-3-07-q4",
          type: "Calling for Help",
          challenge: `  You're broken down on a California freeway.
  You have your cell phone. You want to reach
  the California Highway Patrol directly.

  What number do you dial?`,
          text: "How do you reach CHP dispatch directly from a cell phone in California?",
          options: [
            "411 — the general information line",
            "#77 — connects directly to CHP dispatch on California highways",
            "*CHP — the star-code for emergency services",
            "1-800-HIGHWAY — the national road emergency number",
          ],
          correctIndex: 1,
          explanation: "#77 connects you directly to California Highway Patrol dispatch from a cell phone anywhere in the state. It is faster than 911 for non-life-threatening highway situations like breakdowns. You can also call the Freeway Service Patrol (FSP) — a free tow service during peak hours on major California freeways — through CHP dispatch. Have your location ready: the freeway number, direction of travel, and the nearest milepost marker (green signs on California freeways).",
        },
      ],
    },
  },

  // ─── driving-3-08: Being a Good Driver ───────────────────────────────────────
  {
    epochId: "driving-3",
    wonder: {
      name: "California Open Road at Sunrise",
      location: "California",
      era: "Modern",
      emoji: "🌅",
    },
    id: "driving-3-08",
    order: 8,
    title: "Being a Good Driver",
    subtitle: "Courtesy, responsibility, and the long game",
    category: "driving",
    xp: 90,
    badge: { id: "driving-3-badge-08", name: "Road Ambassador", emoji: "🌟" },
    challengeType: "quiz",
    info: {
      tagline: "The best drivers are thoughtful, not just skilled — they make the road better for everyone.",
      year: 2015,
      overview: [
        "Technical driving skill is one part of being a good driver. The other part is character — courtesy, patience, and responsibility on the road. Studies consistently show that driver attitude and behavior are more predictive of crash risk than most technical skills. Drivers who treat the road as a shared resource, show courtesy to other users, and maintain a patient mindset have significantly lower crash rates than those who drive aggressively or impatiently.",
        "The zipper merge is one of the most misunderstood aspects of driving courtesy. When two lanes must merge into one, the most efficient and safe method is for both lanes to fill to the merge point and alternate — like a zipper. Early mergers who consider late-lane users 'cheaters' actually create longer, more congested backups. The California DMV endorses late merging as the correct technique in lane-closure situations.",
        "California has an idling law (CVC 22515, and the California Air Resources Board regulations) — idling diesel vehicles more than 5 minutes is prohibited, and many local ordinances restrict gasoline vehicle idling near schools and residences. Beyond the law, unnecessary idling wastes fuel and produces emissions. Turning off the engine when stopped for more than a minute is the courteous and environmentally responsible choice.",
      ],
      technical: {
        title: "Zipper Merge and Common Courtesies",
        body: [
          "Letting people merge or enter from a side street when traffic is heavy costs you less than 2 seconds and dramatically reduces the other driver's stress. The butterfly effect of one courteous driver on a congested road can ripple — when drivers feel less frustrated, they make fewer aggressive decisions. Traffic flow research shows that cooperative merging behavior reduces overall throughput times.",
          "Helping new drivers: if you have the opportunity to sit with a permit driver (a younger sibling, a friend), share what you know. Narrate your defensive scanning, explain the 3-second rule, demonstrate covering the brake. New drivers' biggest challenge is not knowing what experienced drivers do automatically. You passing on good habits is one of the highest-impact road safety contributions a private citizen can make.",
        ],
        codeExample: {
          label: "Zipper Merge — Why It Works",
          code: `  LANE CLOSURE AHEAD:

  ─────────────────────────>
  ████ ███ ██  █  [MERGE]
  ─────────────────────────>
  ████ ███ ██  █

  ✓ Both lanes fill to the merge point
  ✓ Drivers alternate at the merge: 1-1-1-1
  ✓ Result: shorter backup, smoother flow

  ✗ Early merge (single-file at lane closure sign):
  ─────────────────────────>
  ████████████████ [MERGE]
  ─────────────────────────>
  (empty lane the whole way)
  ✗ Result: longer backup, wasted capacity`,
        },
      },
      incident: {
        title: "MnDOT Zipper Merge Study — Traffic Engineering Confirms Courtesy",
        when: "2008 — Minnesota Department of Transportation",
        where: "Minneapolis, Minnesota",
        impact: "The state of Minnesota ran a public campaign to normalize late merging (zipper merge) after traffic engineers showed it reduced construction zone backups by up to 40%. California subsequently endorsed the same technique.",
        body: [
          "The Minnesota Department of Transportation studied driver behavior in lane-closure situations and found that early merging — where all drivers merged into the open lane as soon as they saw the closure sign — created backups 40% longer than necessary and increased driver frustration and aggression. The alternative, using both lanes to the merge point and alternating (the zipper merge), dramatically reduced backup length and improved throughput.",
          "MnDOT launched a public education campaign normalizing zipper merging. The counterintuitive message — 'the person who waits in the closing lane until the last moment is doing it right' — required overcoming years of deeply ingrained driver behavior. California, citing the same research, has since endorsed zipper merge as the correct behavior in construction and lane-closure situations.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Shared Road Mindset", sub: "others have equal right", type: "system" },
          { label: "Courteous Behavior", sub: "zipper merge, letting in", type: "attacker" },
          { label: "Less Frustration", sub: "calmer, safer drivers", type: "victim" },
          { label: "Better Traffic Flow", sub: "everyone moves faster", type: "result" },
        ],
      },
      timeline: [
        { year: 1970, event: "Traffic flow research establishes cooperative merging as optimal" },
        { year: 2000, event: "Road rage incidents peak — driver courtesy becomes a public safety focus" },
        { year: 2008, event: "MnDOT zipper merge campaign demonstrates measurable traffic improvement", highlight: true },
        { year: 2010, event: "California endorses zipper merge in construction zone guidance" },
        { year: 2015, event: "California Air Resources Board tightens idling restrictions near schools and residences" },
        { year: 2023, event: "Driver courtesy rated as top factor in reducing urban road rage by AAA survey" },
      ],
      keyTakeaways: [
        "The zipper merge — using both lanes until the merge point and alternating — is the correct and most efficient technique",
        "Letting people merge and being patient costs you seconds but meaningfully reduces road frustration",
        "California law prohibits extended diesel idling; turn off your engine when stopped for more than a minute",
        "Sharing driving knowledge with new drivers is one of the most impactful road safety things you can do",
      ],
      references: [
        { title: "CA DMV: Merging and Lane Changes", url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/california-driver-handbook/" },
        { title: "AAA: Road Courtesy and Safety", url: "https://exchange.aaa.com/safety/driving-advice/" },
        { title: "CA Air Resources Board: Idling Restrictions", url: "https://ww2.arb.ca.gov/our-work/programs/truck-idling-reduction" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "driving-3-08-q1",
          type: "Zipper Merge",
          challenge: `  You're approaching a lane closure on the freeway.
  The sign says "Right Lane Ends — 1 Mile."
  Both lanes are moving. You're in the right lane.

  The driver behind you honks and gestures
  for you to move over NOW.`,
          text: "What is the correct behavior when approaching a lane closure 1 mile ahead?",
          options: [
            "Move to the left lane immediately — using the closing lane to the end is selfish",
            "Stay in the right lane until the merge point and merge using the zipper technique — this is the correct and efficient approach",
            "Speed up to get ahead of traffic before you have to merge",
            "Pull onto the shoulder to let the aggressive driver pass, then move left",
          ],
          correctIndex: 1,
          explanation: "The zipper merge is the correct technique endorsed by California and traffic engineers. Using both lanes until the merge point and alternating at the merge reduces backup length by up to 40% compared to early merging. The driver who stays in the closing lane until the end is doing it right. The driver honking at you has absorbed a common misconception. You do not need to comply with their gestures.",
        },
        {
          id: "driving-3-08-q2",
          type: "Idling Law",
          challenge: `  You're picking someone up and you park outside
  their apartment building. They're running
  about 10 minutes late. Your car's AC is on.
  You live in California.`,
          text: "What does California law and environmental responsibility say about idling your car for 10 minutes?",
          options: [
            "It is perfectly legal and expected when waiting",
            "California prohibits commercial diesel vehicles from idling more than 5 minutes; gasoline vehicles should also limit idling as a matter of environmental responsibility and local ordinances",
            "Idling is always illegal in California if the car is not moving",
            "Only trucks and buses have idling restrictions — personal cars are exempt",
          ],
          correctIndex: 1,
          explanation: "California's main idling law (CA Code of Regs, Title 13) prohibits commercial diesel vehicles from idling more than 5 minutes. Many California cities and counties also have ordinances restricting gasoline vehicle idling, especially near schools and residences. Beyond legal requirements, idling for 10 minutes burns fuel and produces emissions unnecessarily. Turning off the engine (and restarting when needed) is the courteous and responsible choice.",
        },
        {
          id: "driving-3-08-q3",
          type: "New Drivers",
          challenge: `  Your younger sibling just got their permit.
  You offer to take them to an empty parking
  lot to practice. What single habit would
  be most valuable to teach them first?`,
          text: "What is the most important foundational habit to teach a new driver?",
          options: [
            "How to parallel park — it's the hardest skill and the one they'll need for the test",
            "How to check mirrors and blind spots before every lane change and turn",
            "How to use the radio and climate controls without looking away",
            "How to accelerate smoothly — jerky acceleration causes most beginner accidents",
          ],
          correctIndex: 1,
          explanation: "Mirror and blind spot checking before every lane change is the most consequential foundational habit. Beginners consistently underuse mirrors and skip blind spot checks — these omissions directly cause merge crashes, sideswipes, and dooring incidents. Teaching this as a non-negotiable habit before complex maneuvers sets up everything else. Parking can be refined later; checking before moving protects them immediately.",
        },
        {
          id: "driving-3-08-q4",
          type: "Courtesy",
          challenge: `  You're in heavy freeway traffic. A driver in
  the adjacent lane needs to merge into your
  lane to take an upcoming exit. They are
  signaling.

  You are 2 car lengths behind the car ahead.
  You could let them in or close the gap.`,
          text: "What does letting someone merge cost you, and why does it matter?",
          options: [
            "It costs significant time — letting one car in adds 30+ seconds to your trip in heavy traffic",
            "It costs almost nothing — typically 1–2 seconds — and contributes to calmer, safer overall traffic flow",
            "It is only appropriate when the other driver signals well in advance — last-second signals don't deserve courtesy",
            "Letting drivers merge in heavy traffic is dangerous — any gap creates a cascade of merges",
          ],
          correctIndex: 1,
          explanation: "Research on traffic flow shows that letting one car merge costs a following driver approximately 1–2 seconds in heavy traffic — far less than most drivers intuitively believe. The benefit is significant: the merging driver's stress drops, their driving becomes calmer, and the cooperative behavior ripples outward through traffic. Courteous drivers also tend to get more courtesy in return, creating a positive feedback loop. There is almost no scenario where denying a signaling merger improves your trip time.",
        },
      ],
    },
  },
];
