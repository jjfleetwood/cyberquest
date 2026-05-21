import type { StageConfig, EpochConfig } from "./types";

export const driving1Epoch: EpochConfig = {
  id: "driving-1",
  name: "Road to Your License",
  subtitle: "California DMV Test Prep",
  description:
    "Master California driving laws and pass the DMV written knowledge test. Learn the rules of the road, road signs, speed limits, right-of-way laws, DUI statutes, and what examiners look for on the behind-the-wheel test — everything you need to earn your California driver's license.",
  emoji: "🚗",
  color: "yellow",
  unlocked: true,
};

export const driving1Stages: StageConfig[] = [
  // ─── driving-1-01: The Path to Your Permit ────────────────────────────────────
  {
    epochId: "driving-1",
    wonder: {
      name: "California DMV Headquarters",
      location: "Sacramento, California",
      era: "Modern",
      emoji: "🏛️",
    },
    id: "driving-1-01",
    order: 1,
    title: "The Path to Your Permit",
    subtitle: "Age requirements, parent consent, fees, and earning your instruction permit",
    category: "driving",
    xp: 80,
    badge: { id: "driving-1-badge-01", name: "Permit Seeker", emoji: "📋" },
    challengeType: "quiz",
    info: {
      tagline: "You can't get behind the wheel legally until you've passed the first gate: the instruction permit.",
      year: 1913,
      overview: [
        "California requires any new driver under 18 to obtain an instruction permit before practicing behind the wheel. The minimum age to apply is 15 years and 6 months — not 16. This half-year distinction surprises many applicants. To apply, you must visit a DMV office in person, bring proof of identity (birth certificate or passport), proof of California residency, your Social Security number, and — if you are under 18 — a signed Parental Consent (DL 44C) form from a parent or legal guardian.",
        "At the DMV, you will pay the application fee (currently $39 for a non-commercial instruction permit), have your vision tested, and take the written knowledge test. If you pass (38 out of 46 questions correct), you are issued a temporary instruction permit on the spot. The official plastic permit card arrives by mail within a few weeks.",
        "While holding an instruction permit you must have a licensed driver who is 18 years of age or older seated in the front passenger seat at all times when driving. The supervising driver must be fully licensed — a permit holder cannot supervise another permit holder. The instruction permit is valid until your 18th birthday; you do not need to retake the knowledge test simply because your permit expires before you apply for a provisional license.",
      ],
      technical: {
        title: "Instruction Permit Requirements at a Glance",
        body: [
          "The parental consent requirement is absolute for applicants under 18 — the DMV will not process an application without a parent or legal guardian signature. If a parent cannot attend in person, the form DL 44C can be completed in advance and brought to the office.",
          "Vision screening at the DMV checks that you can see at least 20/40 in at least one eye (with or without corrective lenses). If you require glasses or contacts to meet this standard, a restriction will be placed on your license requiring you to wear them whenever driving.",
        ],
        codeExample: {
          label: "Instruction permit checklist",
          code: `  CALIFORNIA INSTRUCTION PERMIT REQUIREMENTS:

  AGE:        15 years, 6 months minimum
  DOCUMENTS:  Proof of identity (birth cert / passport)
              Social Security number
              Proof of CA residency
  CONSENT:    Signed DL 44C if under 18
  FEE:        $39 (non-commercial)
  TEST:       Pass written knowledge test (38/46)
  VISION:     Meet minimum acuity standard

  WHILE DRIVING ON PERMIT:
  → Licensed driver 18+ must be in front seat
  → No unsupervised driving — ever`,
        },
      },
      incident: {
        title: "Why California Lowered the Permit Age to 15½",
        when: "1983 — California Graduated Driver Licensing reform era",
        where: "California Legislature, Sacramento",
        impact: "Research showed that more supervised practice time before the solo license dramatically reduced teen crash rates — lowering the permit age to 15½ gave teenagers more time to practice under adult supervision.",
        body: [
          "Before graduated licensing reform, California's framework gave new teen drivers very little mandatory supervised experience before they received a full license. Studies by the Insurance Institute for Highway Safety found that teen drivers with less supervised practice had dramatically higher crash rates in their first year of solo driving.",
          "The response was the California Graduated Driver License (GDL) law, which set the permit age at 15 years 6 months, required a minimum of 6 months' permit holding, and mandated 50 hours of supervised driving (10 at night) before a provisional license could be issued. The result was measurable: teen fatality rates in California declined significantly in the years following GDL implementation.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Learner (15½+)", sub: "meets age & document requirements", type: "system" },
          { label: "CA DMV Requirements", sub: "vision, test, parental consent", type: "attacker" },
          { label: "Instruction Permit", sub: "issued after passing knowledge test", type: "victim" },
          { label: "Supervised Practice", sub: "licensed adult 18+ in front seat", type: "result" },
        ],
      },
      timeline: [
        { year: 1913, event: "California issues first motor vehicle licenses", highlight: true },
        { year: 1970, event: "Minimum driving age standardized across California at 16" },
        { year: 1983, event: "California GDL research begins — permit age reduced to 15½" },
        { year: 1998, event: "California AB 1740 enacted — formal graduated licensing law" },
        { year: 2006, event: "Provisional license restrictions strengthened for under-18 drivers" },
        { year: 2024, event: "Current fee: $39 for non-commercial instruction permit" },
      ],
      keyTakeaways: [
        "The minimum age for an instruction permit is 15 years and 6 months — not 16",
        "A parent or guardian must sign form DL 44C for any applicant under 18",
        "A licensed driver 18 or older must be in the front seat at all times while on a permit",
        "The permit is valid until age 18 — no retest needed if it expires before you apply for a provisional license",
      ],
      references: [
        { title: "California DMV: Teen Driver Information", url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/fast-facts/teen-driver-ffdl-25/" },
        { title: "California DMV: Applying for a DL", url: "https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/dl-id-online-app-edl/" },
        { title: "CA Vehicle Code Section 12507", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=12507.&lawCode=VEH" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "driving-1-01-q1",
          type: "CA DMV Rule",
          challenge: `  Jordan just turned 15 years and 6 months old.
  She wants to get her instruction permit.

  Her mom has signed the parental consent form.
  She has her birth certificate and SSN.`,
          text: "Is Jordan eligible to apply for a California instruction permit?",
          options: [
            "No — she must be at least 16 years old to apply for any permit",
            "Yes — 15 years and 6 months is the minimum age for an instruction permit",
            "No — she must be 15 years and 9 months old",
            "Yes — but only if she has already passed a driver's education course",
          ],
          correctIndex: 1,
          explanation:
            "The minimum age for a California instruction permit is 15 years and 6 months — not 16. Jordan meets the age requirement, has parental consent, and has the necessary documents. She is fully eligible to apply today.",
        },
        {
          id: "driving-1-01-q2",
          type: "CA DMV Rule",
          challenge: `  Marcus has his instruction permit. He wants to
  practice driving on a Saturday afternoon.

  His options for a supervising passenger are:
  (A) His 17-year-old sister with a full license
  (B) His 19-year-old cousin with a full license
  (C) His 16-year-old friend who has a permit
  (D) His 22-year-old neighbor who has a license`,
          text: "Which people can legally supervise Marcus while he drives on his permit?",
          options: [
            "Only option A — a licensed sibling is the best supervisor",
            "Options B and D — a licensed driver who is 18 or older must be in the front seat",
            "All four — any licensed driver can supervise a permit holder",
            "Options A, B, and D — any licensed driver regardless of age can supervise",
          ],
          correctIndex: 1,
          explanation:
            "California law requires that the supervising passenger be a licensed driver who is 18 years of age or older. The 17-year-old sister and the 16-year-old permit holder do not meet this requirement. Options B (19-year-old with full license) and D (22-year-old with full license) are the valid supervisors.",
        },
        {
          id: "driving-1-01-q3",
          type: "CA DMV Rule",
          challenge: `  Alicia received her instruction permit at age 16.
  She has been practicing driving for 8 months but
  has not yet applied for a provisional license.

  Her permit now shows her 18th birthday has passed.`,
          text: "What must Alicia do to continue driving legally?",
          options: [
            "Nothing — instruction permits are valid indefinitely",
            "Retake the written knowledge test and get a new permit before she can drive supervised again",
            "Apply directly for a full Class C license since she is now 18",
            "Pay a renewal fee — the permit renews automatically at 18",
          ],
          correctIndex: 2,
          explanation:
            "Once a permit holder turns 18, California's graduated licensing rules no longer apply. She can now apply directly for a standard Class C driver's license as an adult — she does not need a provisional license and does not need to retake the knowledge test simply to upgrade. She will, however, need to pass the behind-the-wheel driving test.",
        },
        {
          id: "driving-1-01-q4",
          type: "CA DMV Rule",
          challenge: `  Tyler is 16 and wants to apply for his permit.
  His father cannot come to the DMV with him.

  Can Tyler still apply for his permit today?`,
          text: "What is required for a minor to apply without a parent present at the DMV?",
          options: [
            "No — a parent must be physically present at the DMV to sign in front of an officer",
            "Yes — no parental consent is required for applicants 16 and older",
            "Yes — as long as his parent has signed form DL 44C in advance and Tyler brings it",
            "Yes — but he will receive a restricted permit until his parent comes in",
          ],
          correctIndex: 2,
          explanation:
            "The DMV allows the parent or guardian to sign form DL 44C in advance. Tyler can bring the completed and signed form to the DMV office himself. Physical presence of a parent is not required as long as the consent form is properly completed.",
        },
      ],
    },
  },

  // ─── driving-1-02: Ace the Written Test ──────────────────────────────────────
  {
    epochId: "driving-1",
    wonder: {
      name: "Golden Gate Bridge",
      location: "San Francisco, California",
      era: "Modern",
      emoji: "🌉",
    },
    id: "driving-1-02",
    order: 2,
    title: "Ace the Written Test",
    subtitle: "Test format, passing score, and how to study the CA Driver Handbook",
    category: "driving",
    xp: 80,
    badge: { id: "driving-1-badge-02", name: "Written Test Pro", emoji: "📝" },
    challengeType: "quiz",
    info: {
      tagline: "Almost half of first-time test takers fail. The ones who pass read the handbook — every page.",
      year: 1927,
      overview: [
        "The California DMV written knowledge test consists of 46 multiple-choice questions. To pass, you must answer at least 38 questions correctly — that is a score of 82.6%. The questions are drawn directly from the California Driver Handbook, which is available free from the DMV website or at any DMV office. All answers are in the handbook; there are no trick questions. If you study the handbook, you will pass.",
        "The test is available in multiple languages including English, Spanish, Chinese, Vietnamese, and several others. You may also request an audio version. For applicants under 18, the test covers the same material as the adult test. If you fail the knowledge test, you may retake it up to three times before you must repay the application fee and start over.",
        "Study strategy: read the handbook from cover to cover at least once — pay particular attention to speed limits, right-of-way rules, signal distances, and the graduated license rules for teen drivers. Then take as many practice tests as possible using DMV-approved practice materials. Focus extra study time on the areas where you make the most mistakes.",
      ],
      technical: {
        title: "Written Test Format and Retake Rules",
        body: [
          "The 46-question test is not divided by topic — questions from all areas of the handbook are mixed together. You will see questions about traffic signs, speed laws, right-of-way, alcohol and drug laws, and safe driving practices. The test is timed but most applicants finish with plenty of time to spare.",
          "If you fail the test, you must wait until the next business day to retake it (you cannot retake it the same day). After three failures, you must repay the $39 application fee to receive three more attempts. There is no limit on total attempts, but each set of three attempts costs the application fee.",
        ],
        codeExample: {
          label: "Written test quick reference",
          code: `  CALIFORNIA DMV WRITTEN KNOWLEDGE TEST:

  Total questions:    46
  To pass:            38 correct (82.6%)
  Language options:   English, Spanish, Chinese,
                      Vietnamese + others
  Audio version:      Available on request
  Retakes if fail:    Up to 3 times per fee paid
  Wait between:       Next business day

  TOP STUDY SOURCES:
  → CA Driver Handbook (free, dmv.ca.gov)
  → DMV practice tests (dmv.ca.gov/portal)
  → Focus: signs, speed limits, right-of-way`,
        },
      },
      incident: {
        title: "Nearly Half of Californians Fail the Written Test on the First Try",
        when: "Ongoing — DMV data released 2019",
        where: "California DMV offices statewide",
        impact: "California DMV data shows that approximately 48–50% of first-time applicants fail the written knowledge test — a failure rate that has remained stubbornly high despite the handbook being freely available.",
        body: [
          "The DMV does not officially publish annual pass/fail rates by year, but data obtained through public records requests and reported by California media outlets has consistently shown that roughly half of first-time test takers fail. The most commonly missed questions involve specific numerical facts: exact speed limits in different zones, precise distances for signaling and parking rules, and the specific BAC limits for different age groups.",
          "DMV officials have attributed the high failure rate to applicants who rely on memory from watching other people drive rather than actually reading the handbook. The advice is simple and consistent: read every page of the California Driver Handbook at least once before you sit down for the test. The answers are all there.",
        ],
      },
      diagram: {
        nodes: [
          { label: "CA Driver Handbook", sub: "all answers are inside", type: "system" },
          { label: "Study & Practice Tests", sub: "identify weak spots", type: "attacker" },
          { label: "46-Question Exam", sub: "need 38 correct to pass", type: "victim" },
          { label: "Instruction Permit Issued", sub: "valid until age 18", type: "result" },
        ],
      },
      timeline: [
        { year: 1927, event: "California begins requiring a written knowledge test for new drivers", highlight: true },
        { year: 1970, event: "CA Driver Handbook standardized as the official test source" },
        { year: 1995, event: "Computer-based testing replaces paper-and-pencil at most DMV offices" },
        { year: 2010, event: "DMV launches online practice tests at dmv.ca.gov" },
        { year: 2019, event: "Public records show ~50% of first-time test takers fail" },
        { year: 2023, event: "Handbook available in 8 languages; audio version available on request" },
      ],
      keyTakeaways: [
        "The test is 46 questions; you need 38 correct (82.6%) to pass",
        "All answers are in the California Driver Handbook — there are no trick questions",
        "If you fail, you may retake up to 3 times per application fee paid",
        "Nearly 50% of first-time applicants fail — those who read the full handbook pass at a much higher rate",
      ],
      references: [
        { title: "California Driver Handbook (DMV)", url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/driver-handbook/" },
        { title: "DMV Practice Tests", url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/practice-tests/" },
        { title: "CA DMV: Knowledge Tests", url: "https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/knowledge-tests/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "driving-1-02-q1",
          type: "Test Format",
          challenge: `  You are sitting down to take the California DMV
  written knowledge test for the first time.

  The test proctor tells you the test has 46 questions.`,
          text: "How many questions must you answer correctly to pass the California knowledge test?",
          options: [
            "35 out of 46 (76%)",
            "40 out of 46 (87%)",
            "38 out of 46 (82.6%)",
            "36 out of 46 (78%)",
          ],
          correctIndex: 2,
          explanation:
            "You must answer 38 out of 46 questions correctly to pass — a score of approximately 82.6%. This means you can miss no more than 8 questions. Scoring 37 or fewer is a failing score and you must retake the test.",
        },
        {
          id: "driving-1-02-q2",
          type: "Test Rules",
          challenge: `  Emily takes the written test and receives a
  score of 35 correct out of 46 — a failing score.

  She wants to retake the test as soon as possible.`,
          text: "When is the earliest Emily can retake the knowledge test?",
          options: [
            "She can retake it immediately — there is no waiting period",
            "She must wait 7 days before retaking the test",
            "She must wait until the next business day",
            "She must wait 30 days and retake a driver education course first",
          ],
          correctIndex: 2,
          explanation:
            "After failing the knowledge test, California requires you to wait until the next business day before retaking it. You cannot retake the same day. After three failures, you must repay the application fee to receive three more attempts.",
        },
        {
          id: "driving-1-02-q3",
          type: "Study Strategy",
          challenge: `  Two students are preparing for the DMV knowledge test:

  STUDENT A: Memorizes questions from a random
  website that sells "DMV cheat sheets."

  STUDENT B: Reads the California Driver Handbook
  cover to cover and uses the official DMV practice
  tests at dmv.ca.gov.`,
          text: "Which student is using the most reliable preparation method?",
          options: [
            "Student A — unofficial cheat sheets contain all real test questions",
            "Student B — the handbook is the official source and all test answers come from it",
            "Both methods are equally effective",
            "Student A — third-party sites update their questions more frequently than the handbook",
          ],
          correctIndex: 1,
          explanation:
            "The California Driver Handbook is the exclusive source for all knowledge test questions. All answers are in the handbook. The DMV practice tests at dmv.ca.gov mirror the format and content of the real test. Third-party 'cheat sheet' sites may contain outdated, incorrect, or fabricated questions.",
        },
        {
          id: "driving-1-02-q4",
          type: "Language Access",
          challenge: `  Carlos recently immigrated to California and speaks
  Spanish as his first language. He is 17 and wants
  to get his instruction permit.

  He is worried about taking the test in English.`,
          text: "What option does the California DMV provide for Carlos?",
          options: [
            "The test is only available in English — Carlos must bring his own interpreter",
            "Carlos can request the test in Spanish — the DMV offers it in multiple languages including Spanish",
            "Carlos must take an English proficiency test before he can take the knowledge test",
            "The test is only available in English and Spanish — no other languages are offered",
          ],
          correctIndex: 1,
          explanation:
            "The California DMV offers the knowledge test in multiple languages, including Spanish, Chinese, Vietnamese, and others. Carlos can request the Spanish-language version. An audio version is also available upon request. Language is not a barrier to getting a California driver's license.",
        },
      ],
    },
  },

  // ─── driving-1-03: Road Signs Part 1 ─────────────────────────────────────────
  {
    epochId: "driving-1",
    wonder: {
      name: "Hollywood Boulevard",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "🎬",
    },
    id: "driving-1-03",
    order: 3,
    title: "Road Signs Part 1",
    subtitle: "Regulatory signs — STOP, YIELD, speed limits, and what shapes and colors mean",
    category: "driving",
    xp: 85,
    badge: { id: "driving-1-badge-03", name: "Sign Reader", emoji: "🛑" },
    challengeType: "quiz",
    info: {
      tagline: "Every sign's color and shape is a message before you even read the words.",
      year: 1954,
      overview: [
        "Road signs are designed so that drivers can recognize them at a glance — even before they can read the text — through the use of standardized colors and shapes. Regulatory signs tell you what you must or must not do. They are typically white with black, red, or green lettering, or red (STOP, YIELD, prohibition signs). You are legally required to obey regulatory signs; ignoring them is a traffic violation.",
        "The STOP sign is a red octagon — eight sides, always red. You must come to a complete stop at the limit line, crosswalk, or the edge of the intersection if there is no line. 'Rolling through' a stop sign (also called a 'California stop' or 'rolling stop') is illegal and is one of the most commonly cited moving violations. After stopping, yield to all traffic and pedestrians before proceeding.",
        "The YIELD sign is a downward-pointing red and white triangle. It means you must slow down and give the right of way to traffic already in the intersection or roadway. You do not need to come to a complete stop unless traffic requires it. Speed limit signs are white rectangles with black text. These are the maximum speed you may drive under ideal conditions — the Basic Speed Law means you must slow below posted limits whenever conditions (weather, traffic, visibility) are unsafe.",
      ],
      technical: {
        title: "Regulatory Sign Colors and Shapes",
        body: [
          "Color coding: Red = stop, yield, prohibition (you must not do something). White with black = speed limits, regulations. Green = permitted movements, distance information. Yellow = warning. Orange = construction and maintenance zones. Blue = motorist services. Brown = recreational and cultural areas.",
          "Shape coding: Octagon (8 sides) = STOP only. Downward triangle = YIELD only. Circle = railroad advance warning. Pentagon (5 sides, school house shape) = school area. Diamond = warning. Rectangle = regulatory or informational. The shape lets you recognize the most critical signs even when you cannot read the text — useful at night, in bad weather, or when a sign is damaged.",
        ],
        codeExample: {
          label: "Regulatory sign quick reference",
          code: `  SIGN          SHAPE        COLOR    MEANING
  ──────────────────────────────────────────────
  STOP          Octagon      Red      Full stop required
  YIELD         ▽ Triangle   Red/Wht  Give right of way
  Speed Limit   Rectangle    White    Maximum speed
  No U-Turn     Rectangle    White    U-turns forbidden
  Do Not Enter  Circle/Rect  Red/Wht  Entry prohibited
  One Way       Rectangle    Black    One direction only

  COLOR RULES:
  Red    → stop / prohibition
  White  → regulation
  Yellow → warning`,
        },
      },
      incident: {
        title: "How the Standardized Sign System Saved Thousands of Lives",
        when: "1954 — Federal Highway Administration sign standards adopted",
        where: "United States Interstate Highway System",
        impact: "Before 1954, road signs varied by state and even by county — the same color could mean different things 50 miles apart. Federal standardization created a single national language of road signs that dramatically reduced sign-related crashes.",
        body: [
          "Before the Federal Highway Administration's Manual on Uniform Traffic Control Devices (MUTCD) was widely adopted, American road signs were a patchwork of local designs. A yellow octagonal STOP sign in one state, a red circular one in another. Drivers crossing state lines could not rely on consistent sign meanings.",
          "The MUTCD standardization — eventually requiring the red octagon for STOP and the downward red triangle for YIELD — created a national visual language that drivers could learn once and apply everywhere. The standardized sign system is now international: most countries use very similar shapes and colors, so even travelers who cannot read local languages can understand basic road signs.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Sign Shape", sub: "octagon/triangle/rectangle", type: "system" },
          { label: "Sign Color", sub: "red/white/yellow/green", type: "attacker" },
          { label: "Driver Recognition", sub: "before text is readable", type: "victim" },
          { label: "Correct Action", sub: "stop, yield, follow speed", type: "result" },
        ],
      },
      timeline: [
        { year: 1914, event: "First electric traffic signal installed in Cleveland, Ohio" },
        { year: 1927, event: "California adopts first statewide road sign standards" },
        { year: 1954, event: "MUTCD first edition standardizes sign shapes and colors nationally", highlight: true },
        { year: 1971, event: "Red octagon STOP sign made mandatory in all US states" },
        { year: 2009, event: "MUTCD 2009 edition — current federal standard for US road signs" },
        { year: 2023, event: "California completes statewide sign upgrade to MUTCD 2009 standards" },
      ],
      keyTakeaways: [
        "Red signs mean stop or prohibition — STOP (octagon) and YIELD (triangle) are always red",
        "White rectangular signs with black text are regulatory — speed limits, turn restrictions",
        "The octagon shape means STOP only — no other sign uses an octagon",
        "A complete stop at a STOP sign means the vehicle must be stationary — rolling stops are illegal",
      ],
      references: [
        { title: "California Driver Handbook: Signs, Signals, and Markings", url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/driver-handbook/" },
        { title: "FHWA Manual on Uniform Traffic Control Devices", url: "https://mutcd.fhwa.dot.gov/" },
        { title: "CA DMV Practice Tests", url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/practice-tests/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "driving-1-03-q1",
          type: "CA DMV Rule",
          challenge: `  You are driving and come to a four-way stop
  intersection. There is a red octagonal sign
  at each corner.

  You slow down significantly but your wheels
  do not fully stop rolling.`,
          text: "Did you legally obey the STOP sign?",
          options: [
            "Yes — slowing to under 5 mph counts as a stop in California",
            "No — a STOP sign requires the vehicle to come to a complete stop; rolling through is illegal",
            "Yes — if there is no cross traffic, a complete stop is not required",
            "No — but only police officers parked nearby can cite you for this",
          ],
          correctIndex: 1,
          explanation:
            "A STOP sign legally requires your vehicle to come to a complete stop — wheels not rolling. A 'California stop' or rolling stop is a moving violation. You must stop at the limit line, the crosswalk, or the edge of the intersection if no line is marked, then yield to all traffic and pedestrians before proceeding.",
        },
        {
          id: "driving-1-03-q2",
          type: "Sign Shape",
          challenge: `  You see a sign ahead. Even though you cannot
  yet read the text, you can identify the shape:

  It is a downward-pointing triangle with a
  red border and white background.`,
          text: "What does this sign mean before you can read its text?",
          options: [
            "STOP — come to a complete stop",
            "YIELD — slow down and give right of way to conflicting traffic",
            "WRONG WAY — you are going against traffic",
            "SPEED LIMIT — the number inside tells you the maximum speed",
          ],
          correctIndex: 1,
          explanation:
            "The downward-pointing triangle with a red border is the exclusive shape for the YIELD sign. You must slow down and give the right of way to traffic already in the intersection or road. A complete stop is required only if traffic conditions demand it. Shapes are designed to communicate before text is readable.",
        },
        {
          id: "driving-1-03-q3",
          type: "Speed Limit",
          challenge: `  A speed limit sign reads: 25

  You are driving through a residential
  neighborhood on a sunny day with no other
  traffic and good visibility.

  Is it legal to drive 30 mph?`,
          text: "What does a posted speed limit sign mean under California law?",
          options: [
            "It is the recommended speed — driving 5 mph over is acceptable in good conditions",
            "It is the maximum speed permitted under ideal conditions — driving 30 mph here is illegal",
            "It applies only during school hours in residential areas",
            "It is the minimum speed — you must drive at least 25 mph in this zone",
          ],
          correctIndex: 1,
          explanation:
            "A posted speed limit is the maximum speed you may drive under ideal conditions. Driving 30 mph in a 25 mph zone is a speeding violation regardless of conditions. Additionally, California's Basic Speed Law requires you to drive at a safe speed for conditions even below the posted limit when weather, traffic, or visibility make the posted limit unsafe.",
        },
        {
          id: "driving-1-03-q4",
          type: "No U-Turn Sign",
          challenge: `  You are approaching an intersection. A white
  rectangular sign shows a curved arrow with
  a red circle and diagonal slash over it.

  You were planning to make a U-turn here.`,
          text: "What must you do?",
          options: [
            "Make the U-turn — the sign only applies to trucks",
            "Do not make the U-turn — the sign prohibits U-turns at this location",
            "Make the U-turn only if no other cars are present",
            "The sign is advisory — you may use your judgment about whether a U-turn is safe",
          ],
          correctIndex: 1,
          explanation:
            "A No U-Turn sign prohibits U-turns at that location for all drivers. It is a regulatory sign — you must obey it. Prohibition signs use a red circle with a diagonal slash over the prohibited action. Making a U-turn where prohibited is a traffic violation.",
        },
      ],
    },
  },

  // ─── driving-1-04: Road Signs Part 2 ─────────────────────────────────────────
  {
    epochId: "driving-1",
    wonder: {
      name: "Pacific Coast Highway",
      location: "Big Sur, California",
      era: "Modern",
      emoji: "🌊",
    },
    id: "driving-1-04",
    order: 4,
    title: "Road Signs Part 2",
    subtitle: "Warning signs, guide signs, school zones, and railroad crossings",
    category: "driving",
    xp: 85,
    badge: { id: "driving-1-badge-04", name: "Warning Sign Expert", emoji: "⚠️" },
    challengeType: "quiz",
    info: {
      tagline: "Yellow diamonds warn you what's coming. React early — not when you're already in it.",
      year: 1954,
      overview: [
        "Warning signs alert you to hazards or conditions ahead that require extra caution. They are typically yellow with black symbols or text, and most are diamond-shaped. A yellow diamond warns you of curves, hills, merging traffic, pedestrian crossings, deer crossings, slippery conditions, and hundreds of other specific hazards. They are not regulatory — they do not require you to stop — but they strongly advise you to slow down and be prepared for the hazard described.",
        "Guide signs provide directional and informational guidance. Green rectangular signs show highway route numbers, destinations, and distances. Blue signs indicate motorist services (gas, food, lodging, hospitals). Brown signs point to recreational areas, parks, and historic sites. These signs help you navigate but do not impose legal requirements.",
        "School zone signs are fluorescent yellow-green pentagonal (five-sided) signs that mark school areas. When the flashing yellow light on a school zone sign is active OR when children are present, the speed limit in that zone drops to 25 mph regardless of the normally posted limit. Railroad crossing signs include the round yellow advance warning sign (with an X and two Rs), the white crossbuck sign at the crossing itself, and flashing red lights. When lights flash or gates lower, you must stop at least 15 feet from the nearest rail.",
      ],
      technical: {
        title: "Warning and Guide Sign Color Reference",
        body: [
          "Yellow diamond = warning of physical hazard ahead (curve, dip, intersection, pedestrians, animals). Slow down and be prepared to react. Fluorescent yellow-green = school and pedestrian areas — highest visibility color used for areas where children may be present.",
          "At railroad crossings: the advance warning sign is a round yellow sign with an X and 'RR.' The crossbuck at the crossing itself has no legal stop requirement alone, but if there are flashing lights or a lowered gate, you must stop. Never drive around a lowered gate. The speed limit near a railroad crossing without gates or warning lights is 15 mph.",
        ],
        codeExample: {
          label: "Warning and guide sign quick reference",
          code: `  SIGN TYPE        COLOR/SHAPE          MEANING
  ─────────────────────────────────────────────────
  Warning          Yellow diamond       Hazard ahead
  School zone      Fluorescent ⬠        25 mph when active
  Railroad advance Yellow circle (RR×)  Crossing ahead
  Railroad cross   White crossbuck      At the crossing
  Guide/highway    Green rectangle      Direction/distance
  Services         Blue rectangle       Gas, food, lodging
  Recreation       Brown rectangle      Parks, historic sites

  RAILROAD RULES:
  → No gate/lights:   slow to 15 mph, look both ways
  → Lights flashing:  STOP, 15 feet from nearest rail
  → Gate down:        STOP — never drive around gate`,
        },
      },
      incident: {
        title: "Why School Zone Signs Changed to Fluorescent Yellow-Green",
        when: "2000s — FHWA research into sign conspicuity",
        where: "United States, Federal Highway Administration research",
        impact: "Studies showed fluorescent yellow-green was the most visible color in both daylight and low-light conditions, leading to a nationwide shift for school zone and pedestrian signs that reduced pedestrian fatalities in school zones.",
        body: [
          "For decades, school zone signs used the standard yellow color of all warning signs. Federal Highway Administration research in the 1990s and 2000s tested which colors human eyes detect most quickly under various lighting conditions — daytime, twilight, overcast, and nighttime.",
          "Fluorescent yellow-green (a color that does not occur naturally in the driving environment) proved to be detected significantly faster than standard yellow at all times of day. The FHWA authorized and then recommended its use for school zone and pedestrian crossing signs. California adopted fluorescent yellow-green school zone signs, and studies showed measurable reductions in driver reaction times near schools.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Yellow Diamond", sub: "physical hazard ahead", type: "attacker" },
          { label: "Fluorescent ⬠", sub: "school zone — 25 mph", type: "system" },
          { label: "Round RR Sign", sub: "railroad crossing ahead", type: "victim" },
          { label: "Slow + React Early", sub: "prepared for the hazard", type: "result" },
        ],
      },
      timeline: [
        { year: 1915, event: "First railroad crossing warning signs appear in California" },
        { year: 1954, event: "Yellow diamond standardized for all warning signs nationally", highlight: true },
        { year: 1971, event: "Federal school zone standards require 25 mph in active school zones" },
        { year: 1998, event: "FHWA authorizes fluorescent yellow-green for school/pedestrian signs" },
        { year: 2005, event: "California converts school zone signs to fluorescent yellow-green" },
        { year: 2009, event: "MUTCD 2009 makes fluorescent yellow-green standard for school zones" },
      ],
      keyTakeaways: [
        "Yellow diamond signs warn of hazards — they are not stop or yield requirements, but require caution and lower speed",
        "School zone speed is 25 mph when the flashing light is active or children are present",
        "When railroad crossing lights are flashing, stop at least 15 feet from the nearest rail",
        "Never drive around a lowered railroad crossing gate — a train may be on an adjacent track",
      ],
      references: [
        { title: "California Driver Handbook: Signs", url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/driver-handbook/" },
        { title: "FHWA: School Zone Safety", url: "https://safety.fhwa.dot.gov/speedmgt/ref_mats/fhwasa09028/" },
        { title: "CA Vehicle Code Section 22452", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=22452.&lawCode=VEH" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "driving-1-04-q1",
          type: "Warning Sign",
          challenge: `  Driving on a two-lane mountain road, you see a
  yellow diamond-shaped sign showing a curved
  arrow bending sharply to the right.

  You are currently driving 50 mph.`,
          text: "What does the yellow diamond sign tell you to do?",
          options: [
            "Nothing — diamond signs are only informational and have no required action",
            "Stop completely before the curve",
            "Slow down — the sign warns of a sharp curve ahead where your current speed may be unsafe",
            "Honk your horn to warn oncoming drivers before entering the curve",
          ],
          correctIndex: 2,
          explanation:
            "Yellow diamond signs are warning signs — they alert you to hazards ahead that may require a reduction in speed. A sharp curve sign warns that a curve is coming and your current speed may be unsafe to navigate it. Slow down before reaching the curve, not while in it.",
        },
        {
          id: "driving-1-04-q2",
          type: "School Zone",
          challenge: `  You are driving past an elementary school at
  2:30 PM on a Tuesday. The school zone sign
  has a flashing yellow light that is currently
  ON. The posted school zone speed limit is
  25 mph. Your speedometer reads 35 mph.`,
          text: "Are you violating the law?",
          options: [
            "No — school zone limits only apply when children are visibly present on the street",
            "Yes — when the flashing light is active, you must drive 25 mph regardless of whether you see children",
            "No — 35 mph is within the 10 mph grace tolerance for school zones",
            "Yes — but only if a school crossing guard is present",
          ],
          correctIndex: 1,
          explanation:
            "When a school zone's flashing yellow light is active, the 25 mph speed limit applies — you do not need to see children present to be required to slow down. The light indicates school hours are in effect. Driving 35 mph in an active school zone is a speeding violation with significantly higher fines than regular speeding.",
        },
        {
          id: "driving-1-04-q3",
          type: "Railroad Crossing",
          challenge: `  You approach a railroad crossing. You see the
  round yellow advance warning sign. As you get
  closer, the red lights on the crossbuck sign
  begin flashing.

  No gate is present, but the lights are flashing.`,
          text: "What must you do?",
          options: [
            "Slow to 15 mph and proceed carefully — gates are required before you must stop",
            "Stop at least 15 feet from the nearest rail and wait until lights stop flashing",
            "Stop, look both ways, and proceed immediately if you do not see a train",
            "Yield — slow and proceed if traffic is clear",
          ],
          correctIndex: 1,
          explanation:
            "Flashing red lights at a railroad crossing are a legal stop requirement — you must stop at least 15 feet from the nearest rail. You may not proceed until the lights stop flashing and it is safe. Gates are not required for a stop to be legally necessary — flashing lights alone require a full stop.",
        },
        {
          id: "driving-1-04-q4",
          type: "Guide Signs",
          challenge: `  You are driving on an unfamiliar highway and
  need gas. You look for signs to direct you.

  What color sign would indicate a gas station
  at the next exit?`,
          text: "What color are motorist service signs (gas, food, lodging) on California highways?",
          options: [
            "Green — the same as highway directional signs",
            "Brown — the same as recreational area signs",
            "Blue — motorist service signs are blue",
            "Yellow — all service-related signs are yellow",
          ],
          correctIndex: 2,
          explanation:
            "Blue rectangular signs indicate motorist services — gas, food, lodging, and hospitals. Green signs provide route and distance information. Brown signs point to recreational areas, parks, and historic sites. Yellow is reserved for warning signs. Look for blue signs when you need services on the highway.",
        },
      ],
    },
  },

  // ─── driving-1-05: Speed Laws and Space ──────────────────────────────────────
  {
    epochId: "driving-1",
    wonder: {
      name: "Mulholland Drive",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "🌄",
    },
    id: "driving-1-05",
    order: 5,
    title: "Speed Laws and Space",
    subtitle: "Basic Speed Law, posted limits, the 3-second rule, and following distance",
    category: "driving",
    xp: 90,
    badge: { id: "driving-1-badge-05", name: "Speed Law Scholar", emoji: "⏱️" },
    challengeType: "quiz",
    info: {
      tagline: "The posted speed limit is the maximum — the Basic Speed Law means you may need to go slower.",
      year: 1959,
      overview: [
        "California has two complementary speed laws. The Absolute Speed Limit Law says you may not exceed the posted speed limit under any circumstances — this is the number on the white sign. The Basic Speed Law (Vehicle Code Section 22350) says you may never drive faster than is safe for current conditions regardless of the posted limit. In fog, rain, heavy traffic, or on a slippery road, you may need to drive significantly below the posted limit. You can be cited for violating the Basic Speed Law even when driving below the posted limit if conditions made your speed unsafe.",
        "California's prima facie (default) speed limits apply when no other limit is posted. Key defaults: 15 mph near railroad crossings without gates or signals, 15 mph in alleys, 25 mph in residential districts, 25 mph in school zones during school hours, 55 mph on undivided two-lane highways, 65 mph on most freeways, and 70 mph on freeways where specifically posted.",
        "Maintaining a safe following distance is as important as speed. The 3-second rule: pick a fixed object ahead; when the vehicle in front passes it, count 'one-thousand-one, one-thousand-two, one-thousand-three' — if you pass the object before you finish counting, you are following too closely. Increase to 4 seconds in rain or at night, and 5 or more seconds on slippery roads or when following large trucks.",
      ],
      technical: {
        title: "California Speed Limits and the 3-Second Following Rule",
        body: [
          "The most commonly tested speed limits on the DMV exam: 25 mph residential/school zone, 55 mph two-lane undivided highway, 65 mph freeway, 70 mph freeway where posted, 15 mph near railroad crossings without gates or signals (Vehicle Code 22352). Highways with two or more lanes in one direction have a minimum speed law as well — driving too slowly in the fast lane is also a violation.",
          "The 3-second rule applies regardless of speed — at 65 mph you need approximately 300 feet to stop in an emergency. Tailgating is a leading cause of rear-end collisions. Large trucks and motorcycles require additional following distance: trucks need much longer stopping distances; motorcycles need a full 3 seconds even though they stop faster, because they are smaller and easier to lose sight of.",
        ],
        codeExample: {
          label: "California speed limits quick reference",
          code: `  LOCATION                          SPEED LIMIT
  ─────────────────────────────────────────────
  Near railroad crossing (no gate)  15 mph
  Alley                             15 mph
  Residential district              25 mph
  School zone (when active)         25 mph
  Two-lane undivided highway        55 mph
  Most California freeways          65 mph
  Freeways where posted             70 mph

  FOLLOWING DISTANCE:
  → Normal conditions:  3-second rule
  → Rain / night:       4-second rule
  → Slippery / trucks:  5+ second rule`,
        },
      },
      incident: {
        title: "How Tailgating Became California's Most Common Crash Cause",
        when: "2022 — California OTS Traffic Safety data",
        where: "California statewide highways and surface streets",
        impact: "The California Office of Traffic Safety consistently reports rear-end collisions caused by following too closely as one of the top three collision types in the state, causing tens of thousands of injuries annually.",
        body: [
          "California Office of Traffic Safety data for 2022 showed rear-end collisions among the most frequent collision types in the state. The common factor: insufficient following distance. At 65 mph, the average driver needs approximately 1.5 seconds just to perceive and react to a sudden stop — and then additional distance to actually brake the vehicle. A 1-car-length following distance at freeway speeds is dangerously inadequate.",
          "Enforcement data shows that tailgating citations have increased as dashcam footage has become more common in enforcement. Several California cities have begun automated rear-end collision analysis programs to identify high-tailgating corridors for targeted enforcement and education.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Posted Speed Limit", sub: "absolute maximum, any condition", type: "system" },
          { label: "Basic Speed Law", sub: "safe speed for conditions", type: "attacker" },
          { label: "3-Second Rule", sub: "minimum following distance", type: "victim" },
          { label: "Safe Travel Speed", sub: "lowest of posted and safe", type: "result" },
        ],
      },
      timeline: [
        { year: 1935, event: "California enacts its first statewide Basic Speed Law" },
        { year: 1959, event: "California Vehicle Code §22350 codifies the Basic Speed Law in current form", highlight: true },
        { year: 1974, event: "National 55 mph limit enacted (Energy Crisis) — California complies" },
        { year: 1995, event: "National 55 mph law repealed — California sets 65/70 mph on freeways" },
        { year: 2017, event: "CHP begins statewide 'Following Too Closely' enforcement campaign" },
        { year: 2022, event: "Rear-end collisions remain top-3 collision type in California" },
      ],
      keyTakeaways: [
        "The Basic Speed Law means you can be cited for driving below the posted limit if conditions make your speed unsafe",
        "25 mph in residential and school zones, 55 mph on two-lane undivided highways, 65 mph on most freeways",
        "Near a railroad crossing without gates: slow to 15 mph",
        "Use the 3-second rule for following distance; increase to 4+ seconds in bad weather or at night",
      ],
      references: [
        { title: "CA Vehicle Code §22350 — Basic Speed Law", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=22350.&lawCode=VEH" },
        { title: "CA Vehicle Code §22352 — Prima Facie Speed Limits", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=22352.&lawCode=VEH" },
        { title: "California Driver Handbook: Speed Laws", url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/driver-handbook/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "driving-1-05-q1",
          type: "Basic Speed Law",
          challenge: `  You are driving on a California freeway where
  the posted speed limit is 65 mph. Heavy rain
  has reduced visibility to about 100 feet and
  the road is slippery.

  You are driving 65 mph.`,
          text: "Are you violating California law?",
          options: [
            "No — you are at the posted speed limit, which is always legal",
            "Yes — California's Basic Speed Law says you must drive at a speed safe for conditions, even if below the posted limit",
            "No — the 65 mph limit applies in all weather conditions unless a temporary lower limit is posted",
            "Yes — but only if a CHP officer witnesses your driving",
          ],
          correctIndex: 1,
          explanation:
            "The Basic Speed Law (Vehicle Code §22350) requires you to drive at a speed that is safe for current conditions — regardless of the posted limit. In heavy rain with only 100 feet of visibility at 65 mph, you would need far more than 100 feet to stop. Driving the posted limit when conditions are unsafe is a violation of the Basic Speed Law.",
        },
        {
          id: "driving-1-05-q2",
          type: "Default Speed Limits",
          challenge: `  You are driving through a neighborhood with
  houses on both sides of the street. There is
  no speed limit sign posted anywhere on this block.

  What is the legal speed limit?`,
          text: "What is California's default speed limit in a residential district without posted signs?",
          options: [
            "35 mph — the standard default for unmarked roads",
            "45 mph — residential roads default to 45 mph",
            "25 mph — California's prima facie limit for residential districts",
            "55 mph — the Basic Speed Law default applies everywhere",
          ],
          correctIndex: 2,
          explanation:
            "California Vehicle Code §22352 establishes a prima facie (default) speed limit of 25 mph in residential districts — even without a posted sign. The same 25 mph default applies in school zones during school hours. You are expected to know these default limits without a sign being present.",
        },
        {
          id: "driving-1-05-q3",
          type: "Following Distance",
          challenge: `  You are driving at 55 mph on a two-lane highway.
  You pick a bridge pillar ahead as your reference
  point. The car in front passes the pillar and
  you count:

  "One-thousand-one... one-thousand-two..."

  You pass the pillar before you finish counting.`,
          text: "What does this tell you about your following distance?",
          options: [
            "You are following at exactly the right distance — 2 seconds is the minimum",
            "You are following too closely — the 3-second rule requires at least 3 seconds of space",
            "You are following too far back — you should close the gap",
            "The 3-second rule only applies on freeways, not two-lane highways",
          ],
          correctIndex: 1,
          explanation:
            "The 3-second rule applies on all roads. Passing the fixed reference point before counting to three means you are following too closely — you have less than 3 seconds of following distance. At 55 mph, this gives you inadequate time and space to react and stop if the vehicle ahead brakes suddenly. Increase your following distance.",
        },
        {
          id: "driving-1-05-q4",
          type: "Railroad Speed",
          challenge: `  You are approaching a railroad crossing. There
  are no gates, no flashing lights, and no stop
  sign. The crossing has only the X-shaped white
  crossbuck sign and yellow advance warning sign.

  What speed are you required to slow to?`,
          text: "What is the California speed limit near a railroad crossing without automatic signals or gates?",
          options: [
            "25 mph — the same as a school zone",
            "35 mph — the standard reduced speed for crossings",
            "15 mph — the prima facie limit for crossings without gates or signals",
            "55 mph — no special limit applies if there are no gates or flashing lights",
          ],
          correctIndex: 2,
          explanation:
            "California Vehicle Code §22352 sets a prima facie speed limit of 15 mph within 100 feet of a railroad crossing where you cannot see 400 feet in both directions — which applies to most crossings without gates or automatic signals. Slow to 15 mph, look in both directions, and listen before crossing.",
        },
      ],
    },
  },

  // ─── driving-1-06: Right of Way ───────────────────────────────────────────────
  {
    epochId: "driving-1",
    wonder: {
      name: "Lombard Street",
      location: "San Francisco, California",
      era: "Modern",
      emoji: "🔄",
    },
    id: "driving-1-06",
    order: 6,
    title: "Right of Way",
    subtitle: "4-way stops, uncontrolled intersections, pedestrians, and emergency vehicles",
    category: "driving",
    xp: 90,
    badge: { id: "driving-1-badge-06", name: "Right of Way Master", emoji: "🚦" },
    challengeType: "quiz",
    info: {
      tagline: "Right of way is never 'taken' — it is always 'given.' You yield it; you don't claim it.",
      year: 1959,
      overview: [
        "Right-of-way rules determine who proceeds and who waits at intersections, crosswalks, and other conflict points. The critical principle in California: right of way is something you give, not something you take. Even if you technically have the right of way, you are required by law to yield when necessary to avoid a collision. Claiming your right of way and causing a crash is still a violation.",
        "At a 4-way stop, vehicles proceed in the order they arrived. If two vehicles arrive at the same time, the vehicle on the left yields to the vehicle on the right. If three or four vehicles arrive simultaneously, the same rule applies — look to your right, and if there is a car there, yield. At uncontrolled intersections (no signs or signals), yield to traffic already in the intersection and to vehicles approaching from the right.",
        "Pedestrians always have the right of way in marked crosswalks — you must yield when a pedestrian is in or entering the crosswalk. Pedestrians also have the right of way in unmarked crosswalks at intersections. When you see or hear an emergency vehicle with lights and sirens, you must immediately pull to the right edge of the road and stop until the emergency vehicle passes. On a one-way street, pull to the nearest edge — right or left.",
      ],
      technical: {
        title: "Right-of-Way Rules at a Glance",
        body: [
          "4-way stop priority order: (1) First to arrive goes first. (2) Simultaneous arrival: vehicle to the right goes first. (3) When facing each other going straight: both go. (4) When facing each other and one is turning left: left-turner yields to straight-going driver. This last rule causes many crashes — a left turn at an intersection always yields to oncoming traffic going straight.",
          "School buses: when a school bus stops and activates its flashing red lights (not yellow), all traffic on an undivided road must stop in both directions at least 25 feet away. On a divided highway (physical barrier between opposing lanes), only traffic traveling in the same direction as the bus must stop. The flashing yellow lights mean the bus is preparing to stop — slow down and prepare to stop. Red lights = full stop required.",
        ],
        codeExample: {
          label: "4-way stop decision guide",
          code: `  4-WAY STOP — WHO GOES FIRST?

  Rule 1: First to arrive → first to go
  Rule 2: Tie? → yield to vehicle on YOUR RIGHT
  Rule 3: Two vehicles going opposite straight → both go
  Rule 4: Opposite, one turning left → left yields to straight

  PEDESTRIANS:
  → In marked crosswalk:   you must yield, always
  → Unmarked crosswalk:    you must yield, always
  → Jaywalking mid-block:  use reasonable care

  EMERGENCY VEHICLES (lights + siren):
  → Pull to RIGHT edge of road → STOP
  → One-way street: pull to nearest edge (R or L)
  → Do NOT block the intersection`,
        },
      },
      incident: {
        title: "The Left Turn That Didn't Yield — California's Most Common Intersection Crash",
        when: "2022 — California OTS intersection safety data",
        where: "California statewide intersections",
        impact: "Left-turn violations — failing to yield to oncoming straight traffic — are consistently among the top causes of severe injury intersection crashes in California, accounting for thousands of injuries and hundreds of fatalities per year.",
        body: [
          "California Office of Traffic Safety data consistently shows that left-turn crashes are among the most serious intersection crash types — when a turning vehicle is struck by oncoming traffic, the impact is often a T-bone at high speed into the driver's door. The most common scenario: a driver misjudges the speed of an oncoming vehicle and begins a left turn, thinking they have time.",
          "The legal rule is unambiguous: a vehicle making a left turn must yield to all oncoming traffic. There is no 'I thought I had enough time' defense. The turning driver is responsible. This rule is one of the most frequently tested on the DMV knowledge exam because it is so commonly misunderstood in real driving.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Arrival Order", sub: "first arrived = first to go", type: "system" },
          { label: "Vehicle on Right", sub: "tie = yield to your right", type: "attacker" },
          { label: "Left Turn Driver", sub: "always yields to oncoming straight", type: "victim" },
          { label: "Safe Intersection Cross", sub: "no collision, all rules followed", type: "result" },
        ],
      },
      timeline: [
        { year: 1910, event: "California establishes first right-of-way statute for motor vehicles" },
        { year: 1959, event: "California Vehicle Code codifies modern right-of-way rules", highlight: true },
        { year: 1970, event: "Pedestrian right-of-way in crosswalks strengthened in CA law" },
        { year: 1995, event: "Emergency vehicle yield requirements clarified in CA Vehicle Code" },
        { year: 2015, event: "School bus red light stop law enforcement increased statewide" },
        { year: 2022, event: "Left-turn crashes remain top-3 serious intersection crash type in CA" },
      ],
      keyTakeaways: [
        "Right of way is given, not taken — you must yield even when you technically have the right of way to avoid a crash",
        "At a 4-way stop tie, yield to the vehicle on your right",
        "A left turn always yields to oncoming straight traffic",
        "Pull to the right and stop when an emergency vehicle approaches with lights and siren",
      ],
      references: [
        { title: "CA Vehicle Code §21800 — Right of Way", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=21800.&lawCode=VEH" },
        { title: "CA Vehicle Code §21950 — Pedestrian Right of Way", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=21950.&lawCode=VEH" },
        { title: "California Driver Handbook: Right of Way", url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/driver-handbook/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "driving-1-06-q1",
          type: "4-Way Stop",
          challenge: `  You arrive at a 4-way stop intersection.
  A vehicle to your right arrives at exactly
  the same moment you do.

  No one else is at the intersection.`,
          text: "Who has the right of way?",
          options: [
            "You do — you were there first (by a fraction of a second)",
            "The vehicle to your right — when two vehicles arrive simultaneously, yield to the vehicle on your right",
            "Neither — you must both wait until one person waves the other through",
            "The larger vehicle — trucks and SUVs have priority at all stops",
          ],
          correctIndex: 1,
          explanation:
            "When two vehicles arrive at a 4-way stop at the same time, the vehicle to the right has the right of way. You must yield and let them proceed first. This rule is consistent and applies whenever arrival times are tied.",
        },
        {
          id: "driving-1-06-q2",
          type: "Left Turn Yield",
          challenge: `  You are at a green light and want to make a
  left turn. Oncoming traffic is approaching
  at 40 mph. You think you can complete the
  turn before they arrive.

  There are no pedestrians in the crosswalk.`,
          text: "What must you do before making the left turn?",
          options: [
            "Proceed — at a green light, all movements have equal right of way",
            "Yield to oncoming traffic — a left turn must always yield to straight-moving oncoming vehicles",
            "Flash your turn signal and proceed — oncoming traffic must slow for turning vehicles",
            "Wait only if the oncoming vehicle is within 100 feet",
          ],
          correctIndex: 1,
          explanation:
            "A left turn always yields to oncoming straight traffic, even at a green light. A green light gives you permission to enter the intersection, but you must still wait for a gap in oncoming traffic before completing the turn. This is one of the most common violations and crash causes in California intersections.",
        },
        {
          id: "driving-1-06-q3",
          type: "Pedestrian Right of Way",
          challenge: `  You are driving through a shopping area. A
  pedestrian steps off the curb and begins
  crossing in a marked crosswalk. The light
  is green in your favor.

  The pedestrian is about halfway through the
  crosswalk and in your lane.`,
          text: "What must you do?",
          options: [
            "Proceed — you have the green light and the right of way over pedestrians when your light is green",
            "Honk to alert the pedestrian to hurry up",
            "Yield — pedestrians in a marked crosswalk always have the right of way regardless of the light",
            "Proceed slowly — pedestrians must yield when the traffic signal is green",
          ],
          correctIndex: 2,
          explanation:
            "Pedestrians in a marked crosswalk always have the right of way. A green traffic signal does not override pedestrian right of way in a crosswalk. You must yield to any pedestrian who is in or entering the crosswalk in your path — even on a green light.",
        },
        {
          id: "driving-1-06-q4",
          type: "Emergency Vehicle",
          challenge: `  You are driving on a two-lane road when you
  hear a siren behind you. In your mirror, you
  see an ambulance with flashing red lights
  approaching rapidly.

  You are approaching an intersection.`,
          text: "What is the correct action?",
          options: [
            "Speed up to clear the intersection quickly, then pull over",
            "Stop immediately where you are — do not move until the ambulance passes",
            "Pull to the right edge of the road and stop — do not block the intersection",
            "Continue at your normal speed — emergency vehicles have their own lanes",
          ],
          correctIndex: 2,
          explanation:
            "When an emergency vehicle with lights and siren approaches, pull to the right edge of the roadway and stop. Do not block the intersection — pull past it if possible. Do not drive into the intersection and then stop. Remain stopped until the emergency vehicle has passed.",
        },
      ],
    },
  },

  // ─── driving-1-07: DUI Laws and Teen Restrictions ────────────────────────────
  {
    epochId: "driving-1",
    wonder: {
      name: "California Highway Patrol Academy",
      location: "Sacramento, California",
      era: "Modern",
      emoji: "🚔",
    },
    id: "driving-1-07",
    order: 7,
    title: "DUI Laws and Teen Restrictions",
    subtitle: "BAC limits, zero tolerance, provisional license restrictions, and cellphone rules",
    category: "driving",
    xp: 95,
    badge: { id: "driving-1-badge-07", name: "Safe Driver", emoji: "⚖️" },
    challengeType: "quiz",
    info: {
      tagline: "For drivers under 21, even one drink can cost you your license. California's zero tolerance law is exactly that — zero.",
      year: 1990,
      overview: [
        "California's DUI laws have two key BAC thresholds. For drivers 21 and older, it is illegal to drive with a blood alcohol content of 0.08% or higher — this is a DUI (Driving Under the Influence). For drivers under 21, California has a zero tolerance law: it is illegal to drive with any measurable alcohol in your system — a BAC of 0.01% or higher results in an automatic license suspension. You can get a zero tolerance violation from a single drink. For commercial drivers, the limit is 0.04% BAC.",
        "Teen drivers who receive a provisional license (at age 16 after 6 months permit holding and 50 hours practice) face additional restrictions for the first 12 months or until they turn 18, whichever is later. These restrictions prohibit: driving between 11 PM and 5 AM, and carrying passengers under 20 years of age unless a licensed driver age 25 or older is in the vehicle, or a parent, guardian, or licensed adult relative is present.",
        "California's cellphone law is strict. No driver — regardless of age — may use a handheld phone while driving. Hands-free use (Bluetooth, speakerphone on dashboard) is permitted for drivers 18 and older. Drivers under 18 may not use a mobile phone in any way while driving — no calls, no texts, no hands-free. Sending or reading a text while driving is explicitly illegal for all drivers.",
      ],
      technical: {
        title: "BAC Limits, Teen Restrictions, and Phone Rules",
        body: [
          "A first DUI conviction in California carries a minimum 48-hour jail sentence (or 3-5 days community service in some cases), a fine of approximately $390 base (with penalty assessments often making the total $1,500–$2,000+), license suspension, required DUI school, and installation of an ignition interlock device in many cases. A DUI stays on your driving record for 10 years.",
          "The provisional license passenger restriction has an exception for licensed adult relatives. If a sibling or other relative with a full license is in the car, it is legal. But a friend who has a permit or a friend who is under 20 with a full license does not qualify — the passenger must be a licensed adult over 25 or a licensed parent, guardian, or relative.",
        ],
        codeExample: {
          label: "California DUI and teen restriction quick reference",
          code: `  DUI / BAC LIMITS:
  Age 21+:        Illegal at 0.08% BAC or higher
  Under 21:       Illegal at 0.01% BAC (zero tolerance)
  Commercial:     Illegal at 0.04% BAC

  PROVISIONAL LICENSE RESTRICTIONS (first 12 months):
  Curfew:         No driving 11 PM – 5 AM
  Passengers:     No passengers under 20
                  UNLESS: parent/guardian, or
                  licensed adult 25+ in vehicle,
                  or licensed adult relative

  CELLPHONE RULES:
  All drivers:    No handheld phone use (ever)
  18+ only:       Hands-free allowed
  Under 18:       No phone use at all (any mode)`,
        },
      },
      incident: {
        title: "How California's Zero Tolerance Law Changed Teen DUI Statistics",
        when: "1994 — California zero tolerance law enacted",
        where: "California statewide, per NHTSA data",
        impact: "After California enacted zero tolerance (0.01% BAC for under-21 drivers) in 1994, alcohol-involved teen driver fatalities dropped by over 40% within 5 years — one of the most dramatic reductions in teen traffic safety history.",
        body: [
          "Before zero tolerance, the DUI threshold was the same for all drivers: 0.08% BAC. Teenagers who drank 'just a little' before driving could avoid a DUI charge as long as they stayed under 0.08%. Studies showed this led to widespread acceptance of 'a beer or two before driving' among teens who knew they could pass a sobriety test.",
          "California's 1994 zero tolerance law eliminated this loophole for drivers under 21. Any measurable alcohol — even 0.01% BAC — triggered automatic license suspension and other penalties. NHTSA data showed a dramatic drop in alcohol-involved crashes among California teen drivers in the years following enactment, inspiring similar laws in all other states.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Driver Under 21", sub: "zero tolerance — 0.01% limit", type: "attacker" },
          { label: "Provisional License", sub: "issued after permit + practice", type: "system" },
          { label: "11PM–5AM Curfew", sub: "no driving during these hours", type: "victim" },
          { label: "Violation Consequences", sub: "suspension, fines, DUI record", type: "result" },
        ],
      },
      timeline: [
        { year: 1981, event: "California raises minimum drinking age from 18 to 19; then to 21 in 1986" },
        { year: 1990, event: "California enacts graduated licensing framework for teen drivers", highlight: true },
        { year: 1994, event: "California zero tolerance law (0.01% BAC under 21) enacted — fatalities drop 40%" },
        { year: 2008, event: "California cellphone law bans handheld use for all drivers" },
        { year: 2017, event: "California expands texting ban — any handheld device use illegal" },
        { year: 2021, event: "California raises ignition interlock requirements for first-time DUI" },
      ],
      keyTakeaways: [
        "Drivers under 21 face zero tolerance — a BAC of 0.01% or more is a violation",
        "Drivers 21+ face DUI at 0.08% BAC or higher",
        "Provisional license holders cannot drive 11 PM to 5 AM or carry passengers under 20 (first 12 months)",
        "Drivers under 18 cannot use a cellphone in any way while driving — not even hands-free",
      ],
      references: [
        { title: "CA Vehicle Code §23136 — Zero Tolerance", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=23136.&lawCode=VEH" },
        { title: "CA Vehicle Code §12814.6 — Provisional License", url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=12814.6.&lawCode=VEH" },
        { title: "California DMV: Teen Drivers", url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/fast-facts/teen-driver-ffdl-25/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "driving-1-07-q1",
          type: "Zero Tolerance",
          challenge: `  Alex is 17 years old with a provisional license.
  At a party, he has two beers over two hours.
  He feels completely sober.

  A sobriety test measures his BAC at 0.03%.`,
          text: "Has Alex violated California law by driving?",
          options: [
            "No — 0.03% is well below the legal 0.08% DUI limit",
            "Yes — California's zero tolerance law makes it illegal for drivers under 21 to drive with a BAC of 0.01% or higher",
            "No — the 0.08% limit applies to all drivers regardless of age",
            "Yes — but only if he was involved in an accident",
          ],
          correctIndex: 1,
          explanation:
            "California's zero tolerance law (Vehicle Code §23136) makes it illegal for drivers under 21 to drive with a BAC of 0.01% or higher. Alex's BAC of 0.03% is three times the zero tolerance limit. Feeling sober is irrelevant — the law is based on measurable BAC, not perceived impairment.",
        },
        {
          id: "driving-1-07-q2",
          type: "Provisional Restrictions",
          challenge: `  Maya just got her provisional license at 16.
  It is 11:45 PM on a Friday.

  Her friends (all 16 years old with no licenses)
  want her to drive them home from a party.`,
          text: "Which of Maya's provisional license restrictions apply here?",
          options: [
            "No restrictions apply — provisional licenses have the same privileges as full licenses",
            "Both the 11 PM curfew and the under-20 passenger restriction are violated",
            "Only the passenger restriction — curfew doesn't apply on weekends",
            "Only the curfew — passengers under 20 are only restricted on school nights",
          ],
          correctIndex: 1,
          explanation:
            "Maya is violating two provisional license restrictions simultaneously. First, it is past 11 PM — she cannot drive between 11 PM and 5 AM during the first 12 months of her provisional license. Second, her passengers are under 20 years old and there is no licensed adult 25+ or licensed relative present. Both restrictions apply every night, not just school nights.",
        },
        {
          id: "driving-1-07-q3",
          type: "Passenger Exception",
          challenge: `  Jordan is 16 with a provisional license. He
  wants to drive home with his 17-year-old
  sister who holds a full (not provisional)
  Class C license in the front seat.

  It is 10 PM — before curfew.`,
          text: "Is this allowed under the provisional license passenger restriction?",
          options: [
            "No — the passenger must be at least 25 years old with a full license",
            "No — only parents or legal guardians can be the supervising passenger",
            "Yes — a licensed adult relative qualifies as an exception to the passenger restriction",
            "Yes — any licensed driver in the front seat removes all provisional restrictions",
          ],
          correctIndex: 2,
          explanation:
            "California Vehicle Code §12814.6 provides an exception for licensed adult relatives. Jordan's sister, as a relative who holds a full Class C license, qualifies for the passenger exception. The exception covers: parent or legal guardian, licensed adult 25 or older, or licensed adult relative. (Note: the sister's age does not need to be 25 — the 25-year minimum applies to non-relatives.)",
        },
        {
          id: "driving-1-07-q4",
          type: "Cellphone Rules",
          challenge: `  A 17-year-old driver is using Bluetooth to
  take a hands-free phone call while driving.
  Her phone is mounted on the dashboard.
  Her hands are on the wheel at all times.`,
          text: "Is this legal under California law?",
          options: [
            "Yes — hands-free use is allowed for all drivers",
            "No — drivers under 18 cannot use a phone in any way while driving, including hands-free",
            "Yes — as long as the phone is mounted, any call is legal",
            "No — Bluetooth calls are only legal on freeways, not surface streets",
          ],
          correctIndex: 1,
          explanation:
            "California law prohibits drivers under 18 from using any wireless communication device while driving — including hands-free calls. The hands-free exception only applies to drivers 18 and older. For drivers under 18, no phone use of any kind is permitted while driving.",
        },
      ],
    },
  },

  // ─── driving-1-08: The Behind-the-Wheel Test ─────────────────────────────────
  {
    epochId: "driving-1",
    wonder: {
      name: "DMV Test Center",
      location: "Los Angeles, California",
      era: "Modern",
      emoji: "🎯",
    },
    id: "driving-1-08",
    order: 8,
    title: "The Behind-the-Wheel Test",
    subtitle: "What examiners check, critical errors vs. minor errors, and how to pass",
    category: "driving",
    xp: 100,
    badge: { id: "driving-1-badge-08", name: "Licensed Driver", emoji: "🏆" },
    challengeType: "quiz",
    info: {
      tagline: "The examiner is not trying to fail you — they are trying to verify you can drive safely. Prove it.",
      year: 1927,
      overview: [
        "The California DMV behind-the-wheel drive test is typically 20 minutes long and takes place on public roads near the DMV office. An examiner rides in the front passenger seat and scores your driving using a standardized form. You will be asked to perform turns, lane changes, stops at intersections, and typically a parallel park or turnabout (three-point turn). The examiner does not tell you where to go — they give instructions one at a time.",
        "The scoring system distinguishes between critical errors and minor errors. A critical error (also called an immediate failure) causes an automatic fail regardless of how well you did the rest of the test. Critical errors include: running a red light, failing to yield to a pedestrian, requiring the examiner to take physical control of the vehicle, going the wrong way on a one-way street, or exceeding the speed limit significantly. Minor errors (point deductions) can accumulate — more than 15 minor errors is also a failing score.",
        "What examiners look for on every maneuver: checking mirrors before and after actions, signaling at least 100 feet before turns, smooth and gradual braking (not abrupt stops), maintaining proper lane position, correctly identifying and yielding at stop signs and traffic signals, and appropriate speed for conditions. The most common reasons for failure are not checking mirrors, rolling stops, and not looking before changing lanes.",
      ],
      technical: {
        title: "Drive Test Scoring: Critical vs. Minor Errors",
        body: [
          "Critical errors that cause immediate failure: (1) Running a red light or stop sign. (2) Failing to yield to a pedestrian at a crosswalk. (3) Unsafe speed (significantly exceeding the limit or speed unsafe for conditions). (4) Examiner must intervene physically. (5) Going the wrong direction on a one-way street. (6) Collision or near-collision requiring emergency action. Any one of these ends the test immediately.",
          "The most commonly failed maneuver on the California driving test is the observation check — specifically, failing to look over the shoulder (blind spot check) before changing lanes or pulling away from a curb. The examiner will be watching your head — turn it visibly and deliberately to check the blind spot.",
        ],
        codeExample: {
          label: "Drive test success checklist",
          code: `  BEFORE EVERY MANEUVER:
  □ Check rear view mirror
  □ Check side mirror
  □ Check blind spot (shoulder check)
  □ Signal at least 100 feet before turning

  AT EVERY STOP SIGN:
  □ Complete stop — wheels fully stopped
  □ Stop at limit line or crosswalk
  □ Look left, look right, look left again
  □ Yield before proceeding

  LANE CHANGES:
  □ Mirror check
  □ Signal (min 5 seconds on freeway)
  □ Blind spot shoulder check
  □ Smooth gradual movement into lane

  CRITICAL ERROR = INSTANT FAIL:
  → Red light / stop sign run
  → Pedestrian not yielded to
  → Examiner must touch controls`,
        },
      },
      incident: {
        title: "Why 'Not Looking' Fails More California Tests Than Anything Else",
        when: "2018 — California DMV Examiner Training Data",
        where: "California DMV offices statewide",
        impact: "Internal DMV examiner training materials cite observation failures — not checking mirrors, not doing shoulder checks — as the single most common reason for driving test failures in California, accounting for nearly 30% of all test failures.",
        body: [
          "Many test takers focus intensely on mechanical skills — smooth braking, accurate steering — while forgetting that the examiner scores observation habits as heavily as vehicle control. An applicant can perform a textbook-perfect lane change physically but fail if they did not turn their head to check the blind spot.",
          "Driving instructors consistently advise making observation checks obvious and deliberate for the test — turn your head visibly when checking blind spots so the examiner can see you doing it. Mirror checks should include actually moving your eyes to the mirror — experienced examiners can tell the difference between a real mirror check and a fake one.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Mirror Check", sub: "rear + side before every move", type: "system" },
          { label: "Shoulder Check", sub: "blind spot before lane change", type: "attacker" },
          { label: "Smooth Control", sub: "gradual braking, steady speed", type: "victim" },
          { label: "Pass the Test", sub: "no critical errors, ≤15 minor", type: "result" },
        ],
      },
      timeline: [
        { year: 1927, event: "California begins requiring behind-the-wheel driving tests for new licenses", highlight: true },
        { year: 1960, event: "Standardized scoring form introduced across all CA DMV offices" },
        { year: 1998, event: "GDL law requires behind-the-wheel test for all provisional license applicants" },
        { year: 2010, event: "DMV revises critical error categories following safety research" },
        { year: 2018, event: "Observation checks identified as leading cause of drive test failure" },
        { year: 2023, event: "California processes approximately 1.4 million behind-the-wheel tests annually" },
      ],
      keyTakeaways: [
        "Any single critical error (running a red light, not yielding to a pedestrian) is an automatic fail",
        "More than 15 minor errors also results in a failing score",
        "Observation failures — not checking mirrors and blind spots — are the most common reason for failing",
        "Signal at least 100 feet before turning; make blind spot shoulder checks visible and deliberate",
      ],
      references: [
        { title: "California DMV: Preparing for the Drive Test", url: "https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/dl-id-online-app-edl/drive-test/" },
        { title: "California Driver Handbook: Drive Test Tips", url: "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/driver-handbook/" },
        { title: "CA DMV: Drive Test Appointment", url: "https://www.dmv.ca.gov/portal/appointments/make-an-appointment/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "driving-1-08-q1",
          type: "Critical Error",
          challenge: `  During your driving test, you approach an
  intersection on a green light. As you enter,
  the light turns yellow then red. You clear the
  intersection as the light turns red.

  The examiner marks a note on the score sheet.

  Later in the test, while making a right turn,
  you fail to look over your shoulder to check
  your blind spot.`,
          text: "Which of these errors, if any, would cause an automatic test failure?",
          options: [
            "Neither — both are minor deductions",
            "Running the red light only — the blind spot check is a minor error",
            "The blind spot only — mirror and shoulder checks are critical errors",
            "Both are critical errors resulting in automatic failure",
          ],
          correctIndex: 1,
          explanation:
            "Running a red light is a critical error — it results in automatic failure regardless of everything else done in the test. Failing to check the blind spot before a turn is a minor error (point deduction). Accumulating too many minor errors (more than 15) also fails the test, but each blind spot omission is a minor error, not an automatic failure.",
        },
        {
          id: "driving-1-08-q2",
          type: "Lane Change",
          challenge: `  You are on a two-lane road and the examiner
  asks you to move to the right lane.

  The correct sequence of actions before
  making the lane change is:`,
          text: "In what order should you perform the observation and signaling steps before changing lanes?",
          options: [
            "Signal → Move → Mirror check → Shoulder check",
            "Move immediately — signaling and mirror checks happen after you are in the lane",
            "Mirror check → Signal → Shoulder check → Move into lane smoothly",
            "Shoulder check → Move → Signal while changing",
          ],
          correctIndex: 2,
          explanation:
            "The correct sequence is: (1) Check rear view and side mirror to assess traffic behind and beside you. (2) Signal to communicate your intention. (3) Check blind spot with a visible shoulder check. (4) Smoothly move into the lane. Signaling before checking mirrors is better than the reverse; moving before checking the blind spot is a common critical omission on the test.",
        },
        {
          id: "driving-1-08-q3",
          type: "Stop Sign Technique",
          challenge: `  The examiner asks you to turn left at the
  next intersection. There is a STOP sign.

  You approach, slow to about 3 mph but
  your wheels do not fully stop, then you
  turn left without incident.`,
          text: "How will the examiner score this action?",
          options: [
            "No deduction — slowing to under 5 mph constitutes a legal stop",
            "A minor error deduction for a rolling stop",
            "An automatic failure for running the stop sign",
            "No deduction — the examiner only counts errors when you almost cause a collision",
          ],
          correctIndex: 2,
          explanation:
            "A rolling stop at a STOP sign is treated as running the stop sign on the driving test — it is a critical error that results in automatic failure. The examiner requires a complete, full stop with wheels not rolling. This is one of the most commonly cited reasons for immediate test failure.",
        },
        {
          id: "driving-1-08-q4",
          type: "Signaling Distance",
          challenge: `  You are approaching a right turn. You are
  50 feet from the intersection when you
  activate your turn signal and begin turning.

  The California law requires signaling
  before turning.`,
          text: "Have you satisfied California's turn signal requirement?",
          options: [
            "Yes — any signal before the turn is legally sufficient",
            "No — California requires you to signal at least 100 feet before turning",
            "Yes — 50 feet is the legal minimum for surface street turns",
            "No — signals must be activated at least 300 feet before turning",
          ],
          correctIndex: 1,
          explanation:
            "California Vehicle Code requires you to signal at least 100 feet before making a turn. Signaling at 50 feet is too late and will be marked as an error on the driving test. The 100-foot rule gives other drivers and pedestrians enough time to understand your intention and react. On freeways, activate your turn signal for at least 5 seconds before a lane change.",
        },
      ],
    },
  },
];
