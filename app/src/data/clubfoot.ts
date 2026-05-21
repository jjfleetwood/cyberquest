import type { StageConfig, EpochConfig } from "./types";

export const clubfootEpoch: EpochConfig = {
  id: "clubfoot",
  name: "Standing Tall",
  subtitle: "Understanding and Living with Clubfoot",
  description:
    "Explore the history, science, and human story of talipes equinovarus — one of the most common birth differences in the world. From ancient treatments to the modern Ponseti revolution, learn how a condition once treated with surgery is now corrected with gentle casts and braces, and how families and communities can support those who stand a little differently.",
  emoji: "🦶",
  color: "teal",
  unlocked: true,
};

export const clubfootStages: StageConfig[] = [
  // ─── clubfoot-01: What is Clubfoot? ───────────────────────────────────────────
  {
    epochId: "clubfoot",
    wonder: {
      name: "Neonatal Care Unit",
      location: "Boston Children's Hospital, Massachusetts",
      era: "Modern",
      emoji: "👶",
    },
    id: "clubfoot-01",
    order: 1,
    title: "What is Clubfoot?",
    subtitle: "Medical definition, prevalence, and what it looks like",
    category: "health",
    xp: 80,
    badge: { id: "clubfoot-badge-01", name: "Clubfoot Aware", emoji: "🦶" },
    challengeType: "quiz",
    info: {
      tagline: "One in a thousand babies is born with clubfoot — it is more common than most people realize, and more treatable.",
      year: 1992,
      overview: [
        "Clubfoot, medically known as talipes equinovarus, is a congenital condition in which one or both feet are turned inward and downward at birth. The word 'talipes' refers to the ankle and foot; 'equinus' means the foot is plantarflexed (pointed downward, like a horse hoof); 'varus' means it is turned inward. Together, these describe a foot that points down and in rather than forward.",
        "Clubfoot is one of the most common congenital musculoskeletal conditions in the world, occurring in approximately 1 in 1,000 live births globally — about 4,000 babies per year in the United States alone, and around 200,000 worldwide. It affects boys roughly twice as often as girls. It can affect one foot (unilateral) or both feet (bilateral — present in about half of cases).",
        "The causes of clubfoot are not fully understood. It is believed to involve a combination of genetic factors (it runs in families — if one parent had clubfoot, the child has a 3–4% chance; if a sibling had it, 2–5%) and environmental factors during fetal development. The condition is detectable by ultrasound as early as 12–16 weeks of pregnancy, though prenatal diagnosis does not change the treatment approach.",
      ],
      technical: {
        title: "Anatomy of Clubfoot — What Is Different",
        body: [
          "In a foot with clubfoot, several structural abnormalities occur simultaneously: the Achilles tendon is shortened and tight (causing the equinus/downward pointing), the foot is turned inward (varus), the forefoot is adducted (turned inward relative to the heel), and the arch is exaggerated (cavus). The bones, tendons, and ligaments are all affected — but the bones themselves are formed correctly, just positioned incorrectly. This is why gentle, consistent correction (casting) can reposition them.",
          "Clubfoot is classified as idiopathic (no known underlying cause — the most common type), neurogenic (associated with a neurological condition like spina bifida), syndromic (part of a broader genetic syndrome), or positional (caused by crowded positioning in the womb — typically the mildest form). Treatment and prognosis vary by type; idiopathic clubfoot has the best outcomes.",
        ],
        codeExample: {
          label: "Talipes Equinovarus — Component Terms",
          code: `  TALIPES EQUINOVARUS — component breakdown:

  TALIPES    = talus (ankle bone) + pes (foot)
               → "ankle-foot" condition

  EQUINUS    = like equus (horse)
               → foot points DOWN (plantarflexed)
               → tight Achilles tendon

  VARUS      = turned INWARD
               → sole faces inward, not downward

  ADDUCTUS   = forefoot turned INWARD
               → toes point toward other foot

  CAVUS      = high arch, rigid
               → overall rigid, C-shaped foot`,
        },
      },
      incident: {
        title: "Prenatal Detection — A Mother's Story",
        when: "1992 — routine prenatal ultrasound becomes standard",
        where: "United States — widespread adoption of obstetric ultrasound",
        impact: "When prenatal ultrasound became routine in the early 1990s, clubfoot became diagnosable before birth for the first time — giving families time to prepare and connect with specialists before delivery.",
        body: [
          "In 1992, a mother in Ohio received an ultrasound at 18 weeks that showed both feet of her unborn son were turned inward. Her physician referred her to a pediatric orthopedic specialist who explained the Ponseti method — weekly casts beginning in the first week of life. 'Knowing before he was born,' she later told a support group, 'meant I could spend the pregnancy learning, not panicking. When he arrived, we were ready.'",
          "Her son wore casts for 6 weeks, had a minor Achilles tenotomy, and used a boot-and-bar brace through age 4. He competed in middle school track. This story is representative of thousands — prenatal detection does not change the outcome, but it changes the family's experience from shock to preparation. Organizations like the Ponseti International Association now provide prenatal diagnosis resources specifically for this reason.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Normal Foot Development", sub: "bones form correctly", type: "system" },
          { label: "Positioning Factors", sub: "genetic + developmental", type: "attacker" },
          { label: "Foot at Birth", sub: "turned in, downward, rigid", type: "victim" },
          { label: "Talipes Equinovarus", sub: "diagnosable, treatable", type: "result" },
        ],
      },
      timeline: [
        { year: 400, event: "Hippocrates describes clubfoot and recommends gentle manipulation (not surgery)" },
        { year: 1800, event: "Surgical treatment becomes primary approach — with mixed results" },
        { year: 1948, event: "Dr. Ignacio Ponseti begins developing his casting method at University of Iowa" },
        { year: 1963, event: "Ponseti publishes first outcomes data on non-surgical casting technique" },
        { year: 1992, event: "Routine prenatal ultrasound enables clubfoot diagnosis before birth", highlight: true },
        { year: 2000, event: "Ponseti method becomes global standard — surgical rates drop dramatically" },
        { year: 2024, event: "WHO supports Ponseti method as first-line treatment worldwide" },
      ],
      keyTakeaways: [
        "Clubfoot (talipes equinovarus) affects about 1 in 1,000 births — approximately 200,000 babies per year worldwide",
        "The foot is turned inward and downward due to shortened tendons and ligaments — the bones themselves are correctly formed",
        "Bilateral clubfoot (both feet) occurs in roughly half of all cases",
        "Causes are not fully understood but involve genetic and environmental factors; it is detectable by prenatal ultrasound",
      ],
      references: [
        { title: "Boston Children's Hospital: Clubfoot", url: "https://www.childrenshospital.org/conditions/clubfoot" },
        { title: "Ponseti International Association", url: "https://www.ponseti.info" },
        { title: "AAOS: Clubfoot Overview", url: "https://orthoinfo.aaos.org/en/diseases--conditions/clubfoot/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "clubfoot-01-q1",
          type: "Medical Definition",
          challenge: `  The medical term for clubfoot is:

  TALIPES EQUINOVARUS

  Breaking down the term:
  - Talipes = ankle + foot
  - Equinus = horse-like
  - Varus = turned inward`,
          text: "What does the 'equinus' component of talipes equinovarus describe?",
          options: [
            "The foot is turned sharply inward at the ankle",
            "The foot points downward, like a horse's hoof — caused by a shortened Achilles tendon",
            "The toes are curled under the foot",
            "The foot has an unusually high arch",
          ],
          correctIndex: 1,
          explanation: "Equinus comes from 'equus' (horse) and describes the downward-pointing position of the foot — as if the person is permanently standing on tiptoe. This is caused by a shortened, tight Achilles tendon. The other components of talipes equinovarus describe the inward turning (varus), the inward forefoot rotation (adductus), and the high arch (cavus).",
        },
        {
          id: "clubfoot-01-q2",
          type: "Prevalence",
          challenge: `  Clubfoot statistics:
  - Affects approximately 1 in __ live births
  - ~200,000 new cases per year worldwide
  - Boys affected ___ as often as girls
  - About ___% of cases affect both feet`,
          text: "What is the approximate global prevalence of clubfoot at birth?",
          options: [
            "1 in 100 births — a very common condition",
            "1 in 10,000 births — quite rare",
            "1 in 1,000 births — one of the most common musculoskeletal birth differences",
            "1 in 500 births — moderately common",
          ],
          correctIndex: 2,
          explanation: "Clubfoot occurs in approximately 1 in 1,000 live births globally — about 200,000 new cases per year worldwide. In the United States alone, approximately 4,000 babies are born with clubfoot each year. Boys are affected roughly twice as often as girls. About half of cases are bilateral (both feet). These numbers make clubfoot one of the most common congenital musculoskeletal conditions in the world.",
        },
        {
          id: "clubfoot-01-q3",
          type: "Anatomy",
          challenge: `  A pediatrician describes a newborn's clubfoot:
  "The bones themselves formed correctly.
  What's different is the positioning — tendons
  and ligaments are shortened and tight, holding
  the foot in the wrong position."`,
          text: "What is the significance of the bones being correctly formed in clubfoot?",
          options: [
            "It means the condition will resolve on its own without treatment",
            "It means gentle, consistent repositioning through casting can correct the position — surgery to reshape bones is not required",
            "It means only the skin and soft tissue need treatment — the joints are unaffected",
            "It has no practical significance — treatment is the same regardless of bone formation",
          ],
          correctIndex: 1,
          explanation: "The fact that the bones are correctly formed (just incorrectly positioned) is the foundation of the Ponseti method's success. Because bones are not malformed — just held in the wrong position by tight tendons and ligaments — gentle weekly casting can gradually stretch those soft tissues and guide the bones into correct alignment. This is why non-surgical treatment achieves over 90% success. If the bones themselves were malformed, structural surgery would be necessary.",
        },
        {
          id: "clubfoot-01-q4",
          type: "Genetics",
          challenge: `  Two parents discuss their newborn's clubfoot.
  Neither parent had clubfoot.
  The father has a brother with clubfoot.

  They ask the doctor about future pregnancies.`,
          text: "What is approximately the recurrence risk of clubfoot when one sibling is already affected?",
          options: [
            "Less than 0.5% — essentially the same as the general population",
            "2–5% — modestly elevated above the general population risk",
            "25–50% — inherited like a dominant genetic condition",
            "Nearly 100% — if one child has it, all future children will too",
          ],
          correctIndex: 1,
          explanation: "Clubfoot has a multifactorial inheritance pattern — genetic and environmental factors combine. When one sibling has clubfoot, the recurrence risk for subsequent siblings is approximately 2–5%, compared to the general population risk of about 0.1%. If a parent had clubfoot, the risk to their children is approximately 3–4%. These figures are elevated but not deterministic — having an affected sibling does not mean future children will certainly have it.",
        },
      ],
    },
  },

  // ─── clubfoot-02: The Ponseti Method ─────────────────────────────────────────
  {
    epochId: "clubfoot",
    wonder: {
      name: "University of Iowa Hospitals and Clinics",
      location: "Iowa City, Iowa",
      era: "Modern",
      emoji: "🏥",
    },
    id: "clubfoot-02",
    order: 2,
    title: "The Ponseti Method",
    subtitle: "How weekly casts and a brace transformed clubfoot treatment",
    category: "health",
    xp: 85,
    badge: { id: "clubfoot-badge-02", name: "Ponseti Pioneer", emoji: "🏥" },
    challengeType: "quiz",
    info: {
      tagline: "Dr. Ponseti proved that the gentlest approach was also the most effective — and changed millions of lives.",
      year: 1963,
      overview: [
        "The Ponseti method is a non-surgical technique for correcting clubfoot, developed by Dr. Ignacio Ponseti at the University of Iowa starting in the 1940s and 1950s. The method involves a specific sequence of weekly plaster casts — typically 5 to 7 casts applied over 5 to 7 weeks — that gradually move the foot into correct alignment by systematically stretching the shortened tendons and ligaments. Each cast holds the foot in a slightly more corrected position than the last.",
        "After casting, most children (approximately 80%) require a small procedure called a percutaneous Achilles tenotomy — a minor in-office or clinic procedure (not open surgery) in which the tight Achilles tendon is released through a tiny nick in the skin. The tendon regrows in a lengthened position during the final cast (worn for 3 weeks after the procedure). This addresses the equinus (downward pointing) component that casting alone cannot fully correct.",
        "Following casting and tenotomy, children wear a foot abduction brace — boots attached to a bar that holds the feet in an externally rotated, slightly dorsiflexed position — for 23 hours per day for 3 months, then during nighttime and nap time until age 4–5. This bracing phase is the most critical for preventing relapse. Studies show that strict brace compliance reduces relapse rates from over 50% to less than 10%. The Ponseti method achieves greater than 90% success in producing a functional, pain-free foot.",
      ],
      technical: {
        title: "The Casting Sequence — Step by Step",
        body: [
          "Each Ponseti cast corrects one component of the deformity in a specific order: first the cavus (high arch) is corrected by supinating and extending the forefoot — a counterintuitive step that aligns the navicular with the head of the talus. Then the varus (inward turning) and adductus (forefoot inward) are corrected over subsequent casts. The equinus (downward pointing) is addressed last — often requiring the Achilles tenotomy.",
          "Why weekly casts? Infant tendons and ligaments are highly elastic and respond rapidly to gentle sustained stretch. Casting for longer than a week risks losing correction as the tissues relax. Shorter than a week does not allow full tissue response. The one-week interval is precisely timed to the biology of infant connective tissue. This is why the method only works well when started early — ideally within the first week of life while tissue elasticity is highest.",
        ],
        codeExample: {
          label: "Ponseti Treatment Timeline",
          code: `  WEEK 1:   Cast 1 — correct cavus (high arch)
  WEEK 2:   Cast 2 — begin abduction (foot outward)
  WEEK 3–5: Casts 3–5 — progressive abduction
  WEEK 6:   Cast 6 — maximum abduction
  (80% of children): Achilles tenotomy in clinic
  WEEK 7:   Final cast — worn 3 weeks post-tenotomy
             (tendon regrows at correct length)

  MONTHS 1–3 post-cast: Brace 23 hrs/day
  YEARS 1–4:           Brace during sleep/naps
  Follow-up:           Annual check through teen years

  Success rate (brace-compliant): >90%`,
        },
      },
      incident: {
        title: "Dr. Ponseti's Long-Term Follow-Up — 45-Year Outcomes",
        when: "2003 — University of Iowa publishes 45-year follow-up data",
        where: "University of Iowa, Iowa City",
        impact: "Follow-up on patients treated by Dr. Ponseti in the 1950s–60s showed that the vast majority had fully functional, pain-free feet into their 50s — decades of evidence that non-surgical correction was durable.",
        body: [
          "In 2003, Dr. Ponseti and colleagues at the University of Iowa published 45-year follow-up data on patients he had treated in the 1950s and 1960s. The data showed that the majority of patients — who were now in their 40s and 50s — had fully functional feet with minimal pain and no arthritis. Many had played sports throughout their lives and had no functional limitations.",
          "This long-term data was pivotal. Until this publication, orthopedic surgeons worldwide had been performing extensive surgical releases on clubfeet, producing short-term correction but often leaving feet stiff, painful, and arthritic in adulthood — the so-called 'operated clubfoot' syndrome. Ponseti's 45-year data provided the definitive argument for abandoning surgery as a primary treatment. The method's global adoption accelerated dramatically after 2003.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Clubfoot at Birth", sub: "equinovarus deformity", type: "attacker" },
          { label: "Weekly Casting", sub: "5–7 casts, systematic stretch", type: "system" },
          { label: "Achilles Tenotomy", sub: "minor release of tight tendon", type: "victim" },
          { label: "Brace Protocol", sub: "4–5 years, prevents relapse", type: "result" },
        ],
      },
      timeline: [
        { year: 1948, event: "Dr. Ponseti begins developing his method at University of Iowa" },
        { year: 1963, event: "First published outcomes paper on Ponseti casting technique", highlight: true },
        { year: 1980, event: "Method largely ignored internationally — surgery still dominant" },
        { year: 1996, event: "Dr. Lynn Staheli at Seattle Children's begins advocating for global Ponseti adoption" },
        { year: 2003, event: "45-year follow-up data published — global shift to Ponseti method begins" },
        { year: 2010, event: "WHO and CURE International train providers in developing nations in Ponseti method" },
        { year: 2024, event: "Ponseti method is first-line treatment in over 100 countries" },
      ],
      keyTakeaways: [
        "The Ponseti method uses 5–7 weekly casts to gradually correct clubfoot without major surgery",
        "About 80% of children need a small Achilles tenotomy after casting — a minor procedure, not open surgery",
        "The boot-and-bar brace worn for 4–5 years (napping and sleeping) is the most critical relapse prevention step",
        "With brace compliance, the Ponseti method achieves over 90% success — producing functional, pain-free feet long-term",
      ],
      references: [
        { title: "Ponseti International Association — Treatment Protocol", url: "https://www.ponseti.info/treatment.html" },
        { title: "University of Iowa: Ponseti Clubfoot Management", url: "https://uihc.org/health-topics/ponseti-clubfoot-treatment" },
        { title: "AAOS: Clubfoot Treatment Options", url: "https://orthoinfo.aaos.org/en/diseases--conditions/clubfoot/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "clubfoot-02-q1",
          type: "Treatment Steps",
          challenge: `  A baby is born with clubfoot.
  The parents ask the pediatric orthopedist:
  "Will our baby need surgery?"

  Standard Ponseti protocol:
  5–7 casts → (possible tenotomy) → bracing`,
          text: "What does the Achilles tenotomy involve, and how many children with clubfoot need it?",
          options: [
            "Major open surgery to restructure the foot bones — needed in nearly all cases",
            "A small nick in the skin to release the tight Achilles tendon — needed in about 80% of cases, not open surgery",
            "A procedure to lengthen multiple tendons in the leg — needed in about 30% of cases",
            "Emergency surgery done at birth before casting begins — about 50% of children need it",
          ],
          correctIndex: 1,
          explanation: "The Achilles tenotomy is a minor percutaneous procedure — the surgeon makes a tiny nick in the skin and cuts the tight Achilles tendon. It is performed in a clinic with local anesthetic, not in an operating room. About 80% of children with idiopathic clubfoot require this step to address the equinus (downward pointing) component. The tendon regrows at the correct length during the final cast (worn 3 weeks after the procedure). This is not the extensive open surgery that characterized older treatments.",
        },
        {
          id: "clubfoot-02-q2",
          type: "Bracing",
          challenge: `  The Ponseti casting is complete. The foot
  looks corrected. The family is told their
  baby needs to wear a boots-and-bar brace.

  Schedule:
  - 23 hrs/day for 3 months
  - Nights and naps until age 4–5

  The parents ask: "Is the brace really necessary?"`,
          text: "What happens if the brace protocol is not followed after successful Ponseti casting?",
          options: [
            "The foot may slowly drift back — but this will be caught at follow-up appointments and easily corrected",
            "Nothing — the casting itself permanently corrects the deformity",
            "Relapse rates exceed 50% without bracing versus less than 10% with strict compliance",
            "The tenotomy site may re-tear — bracing protects the Achilles, not the foot correction",
          ],
          correctIndex: 2,
          explanation: "Bracing compliance is the single most important factor in preventing relapse. Without the brace, relapse (foot turning back in) occurs in over 50% of cases. With consistent brace use as prescribed, relapse rates drop below 10%. The casting corrects the position, but the foot's muscle memory wants to return to the original position — the brace maintains the correction during the years when the foot is still growing and adaptable. Many parents see the brace as optional once the foot looks correct; it is not.",
        },
        {
          id: "clubfoot-02-q3",
          type: "Timing",
          challenge: `  A family adopts a baby from another country.
  The child is 8 months old and has untreated
  clubfoot. The family asks if the Ponseti
  method can still work.`,
          text: "How does age affect the success of the Ponseti method?",
          options: [
            "Age makes no difference — the method works equally well at any age",
            "The method works best in the first weeks of life when tissue is most elastic, but can still be effective in toddlers with modifications",
            "The method cannot be used after 3 months of age — surgery is the only option",
            "Older children need more casts but have the same long-term outcomes as newborns",
          ],
          correctIndex: 1,
          explanation: "The Ponseti method is most effective when started within the first week of life because infant tendons and ligaments are at their most elastic — they respond quickly and fully to gentle casting. However, the method can still be effective in older infants and toddlers, though it may require more casts and the outcomes may be somewhat less predictable. Children up to approximately 2–3 years of age can often be treated with modified Ponseti protocol. Beyond that age, surgical intervention is more likely to be part of the plan.",
        },
        {
          id: "clubfoot-02-q4",
          type: "Long-Term Outcomes",
          challenge: `  Dr. Ponseti's 45-year follow-up study (2003)
  compared patients treated with:

  GROUP A: Ponseti casting + bracing (1950s–60s)
  GROUP B: Extensive surgical release (1970s–80s)`,
          text: "What did the long-term follow-up data show about outcomes in adulthood?",
          options: [
            "Surgically treated patients had better outcomes — surgery achieved more precise correction",
            "Both groups had equivalent outcomes — the method matters less than early treatment",
            "Ponseti-treated patients had functional, pain-free feet in their 50s; surgically treated patients often had stiff, arthritic, painful feet by middle age",
            "Surgical patients had better foot aesthetics but Ponseti patients had better function",
          ],
          correctIndex: 2,
          explanation: "The 45-year follow-up data was pivotal. Ponseti-treated patients who were now in their 40s–50s had largely functional, pain-free feet and had lived active lives. Patients who underwent extensive surgical release in the 1970s–80s often had what orthopedists called 'operated clubfoot syndrome' — feet that looked corrected initially but became stiff, painful, and arthritic by middle age. This evidence accelerated the global abandonment of surgery as first-line treatment.",
        },
      ],
    },
  },

  // ─── clubfoot-03: History of Treatment ───────────────────────────────────────
  {
    epochId: "clubfoot",
    wonder: {
      name: "Ancient Greek Agora",
      location: "Athens, Greece",
      era: "Ancient",
      emoji: "🏛️",
    },
    id: "clubfoot-03",
    order: 3,
    title: "A Long History",
    subtitle: "From ancient bandaging to the Ponseti revolution",
    category: "health",
    xp: 80,
    badge: { id: "clubfoot-badge-03", name: "Medical Historian", emoji: "📜" },
    challengeType: "quiz",
    info: {
      tagline: "Clubfoot has been documented for thousands of years — and every era had its own idea of how to fix it.",
      year: 1950,
      overview: [
        "Clubfoot is one of the oldest documented congenital conditions in human history. Ancient Egyptian papyri describe a foot deformity consistent with talipes equinovarus, and Egyptian mummies have been found with evidence of clubfoot. The condition was also noted in ancient Rome — Emperor Claudius (10 BC – 54 AD) is believed by historians to have had a gait disorder consistent with clubfoot or a related condition.",
        "Hippocrates (460–370 BC) wrote about clubfoot in his work 'On Joints,' making him one of the earliest documented physicians to observe and describe it. Critically, he recommended gentle manipulation and bandaging — a non-surgical approach remarkably similar in philosophy to the modern Ponseti method. His insights were largely ignored for over 2,000 years as surgical approaches dominated.",
        "The 20th century surgical era produced some of the most unfortunate outcomes in the history of clubfoot treatment. Extensive surgical releases — operations that cut multiple tendons, ligaments, and joint capsules to release the deformity — became the standard of care in the 1970s and 1980s. These surgeries initially appeared successful, but long-term follow-up revealed that operated feet became stiff, scarred, and arthritic by middle age. The shift back to Ponseti's non-surgical casting method, beginning in the late 1990s, represented one of the most significant reversals in pediatric orthopedics.",
      ],
      technical: {
        title: "The Geography of Clubfoot — Global Treatment Access",
        body: [
          "Approximately 80% of all clubfoot births occur in low- and middle-income countries. Before the global spread of the Ponseti method through organizations like Ponseti International, CURE International, and the Global Clubfoot Initiative, most children in these regions received no treatment — growing up with untreated clubfoot, a major cause of disability and economic marginalization worldwide.",
          "The cost of Ponseti treatment — casts, a tenotomy, and a brace — can be accomplished for as little as $100–300 USD in resource-limited settings when providers are trained. Surgical treatment costs 10–50× more and requires infrastructure (operating rooms, anesthesia). This economic reality makes the Ponseti method not just medically superior but the only globally scalable solution.",
        ],
        codeExample: {
          label: "Clubfoot Treatment History Timeline",
          code: `  400s BC:   Hippocrates — gentle manipulation, bandaging
  100s AD:   Roman physicians — various splinting methods
  1800s:     Surgery introduced — tenotomy only (Achilles)
  1930s:     Extensive surgical releases become common
  1948:      Dr. Ponseti begins casting research (Iowa)
  1970–80s:  Surgical era peaks — poor long-term outcomes
  1990s:     Ponseti method begins global adoption
  2003:      45-year outcomes published — surgery abandoned
  2010s:     WHO supports Ponseti as global standard
  2020s:     >100 countries use Ponseti method routinely`,
        },
      },
      incident: {
        title: "The Surgical Era's Legacy — 'Operated Clubfoot Syndrome'",
        when: "1970s–1990s — peak of surgical clubfoot treatment",
        where: "Western Europe and North America",
        impact: "A generation of adults treated with extensive surgical releases in childhood suffered from stiff, painful, arthritic feet by their 30s–40s — a direct consequence of over-treatment that accelerated the return to non-surgical Ponseti protocol.",
        body: [
          "During the 1970s and 1980s, the standard treatment for clubfoot at major pediatric orthopedic centers in the US and Europe was the 'posteromedial release' — a complex surgery that cut nearly every tight structure in the foot simultaneously. Surgeons believed that achieving immediate anatomical correction would produce durable results. Short-term follow-up seemed to confirm this.",
          "By the 1990s, however, orthopedists began reporting a disturbing pattern: patients operated on in childhood were returning in their 30s and 40s with feet that were stiff, painful, scarred, and prematurely arthritic. The surgical scars had created fibrosis (scar tissue stiffness) that worsened with age. Ponseti's 45-year follow-up data, published in 2003, provided the definitive comparison — non-surgical patients had dramatically better long-term outcomes. The term 'operated clubfoot' entered the orthopedic literature as a cautionary descriptor.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Ancient Observation", sub: "Hippocrates, Egypt, Rome", type: "system" },
          { label: "Surgical Era", sub: "20th century over-treatment", type: "attacker" },
          { label: "Ponseti's Research", sub: "Iowa, 1948–1963", type: "victim" },
          { label: "Global Non-Surgical Standard", sub: ">90% success, worldwide", type: "result" },
        ],
      },
      timeline: [
        { year: -400, event: "Hippocrates describes clubfoot and recommends gentle manipulation in 'On Joints'" },
        { year: 1836, event: "Little performs first Achilles tenotomy for clubfoot — partial surgical approach" },
        { year: 1948, event: "Dr. Ponseti begins developing casting method at University of Iowa", highlight: true },
        { year: 1970, event: "Posteromedial release surgery becomes standard of care at major centers" },
        { year: 1996, event: "Dr. Lynn Staheli champions global Ponseti adoption — shift begins" },
        { year: 2003, event: "Ponseti 45-year outcomes published — surgical era effectively ends" },
        { year: 2015, event: "Global Clubfoot Initiative launches to expand Ponseti access in developing nations" },
      ],
      keyTakeaways: [
        "Clubfoot has been documented since ancient Egypt and Greece — Hippocrates recommended gentle manipulation 2,400 years ago",
        "The 20th century surgical era produced poor long-term outcomes — 'operated clubfoot syndrome' with stiff, arthritic feet",
        "Dr. Ponseti developed his non-surgical method at the University of Iowa starting in 1948",
        "80% of clubfoot births occur in low/middle-income countries — the Ponseti method's low cost makes it globally scalable",
      ],
      references: [
        { title: "Global Clubfoot Initiative", url: "https://globalclubfoot.com" },
        { title: "Ponseti International: History of Clubfoot Treatment", url: "https://www.ponseti.info/history.html" },
        { title: "CURE International: Clubfoot Program", url: "https://cure.org/clubfoot/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "clubfoot-03-q1",
          type: "History",
          challenge: `  Around 400 BC, a Greek physician wrote
  about a foot deformity and recommended
  treating it with "bandaging and
  manipulation from the first day of life."

  This approach is remarkably similar to
  modern Ponseti treatment.`,
          text: "Which ancient physician described clubfoot and recommended gentle manipulation — a philosophy echoing the modern Ponseti method?",
          options: [
            "Galen — the Roman physician who systematized Greek medicine",
            "Hippocrates — who described clubfoot in 'On Joints' and recommended gentle manipulation",
            "Avicenna — the Persian physician who wrote the Canon of Medicine",
            "Aristotle — who documented birth defects in his natural history writings",
          ],
          correctIndex: 1,
          explanation: "Hippocrates (460–370 BC) described clubfoot in his work 'On Joints' and recommended treating it with gentle manipulation and bandaging from birth — a philosophy essentially identical to the modern Ponseti method. His insights were overlooked for over 2,000 years as surgical approaches came to dominate. Ponseti himself acknowledged Hippocrates' observations when describing the origins of his approach.",
        },
        {
          id: "clubfoot-03-q2",
          type: "The Surgical Era",
          challenge: `  A patient treated for clubfoot in 1978
  (with extensive surgical release) returns
  to clinic in 2001 at age 23.

  She reports: foot pain, stiffness, and
  difficulty walking long distances.
  X-ray shows early joint changes.`,
          text: "What term did orthopedic surgeons use to describe this pattern of poor long-term outcomes from surgical clubfoot treatment?",
          options: [
            "Post-operative clubfoot regression",
            "Operated clubfoot syndrome — stiffness, pain, and arthritis from surgical scarring",
            "Secondary equinovarus — clubfoot returning after surgery",
            "Pediatric foot arthritis syndrome",
          ],
          correctIndex: 1,
          explanation: "'Operated clubfoot syndrome' describes the pattern seen in adults who had extensive surgical releases as children — feet that appeared corrected initially but became stiff, scarred, and arthritic by middle age due to the fibrosis (scar tissue) from surgery. This syndrome, increasingly documented in the 1990s and 2000s, was a major driver of the shift back to Ponseti's non-surgical approach. The surgical releases cut so many structures that the foot's natural flexibility was permanently reduced.",
        },
        {
          id: "clubfoot-03-q3",
          type: "Global Access",
          challenge: `  Statistics on clubfoot globally:
  - ~200,000 new cases per year worldwide
  - __% of cases occur in low/middle-income countries
  - Ponseti treatment cost: ~$100–300 USD
  - Surgical treatment cost: 10–50× more`,
          text: "Why is the Ponseti method especially important for global clubfoot treatment access?",
          options: [
            "Because surgery requires specialized equipment not available in most countries",
            "Because the Ponseti method's low cost and minimal equipment requirements make it the only globally scalable solution where 80% of cases occur",
            "Because surgical training takes too long — Ponseti can be learned in a single day",
            "Because Western surgeons are reluctant to perform clubfoot surgery in developing nations",
          ],
          correctIndex: 1,
          explanation: "Approximately 80% of clubfoot births occur in low- and middle-income countries. Surgical treatment costs 10–50× more than Ponseti treatment and requires operating rooms, anesthesia, and specialized surgical teams. Ponseti treatment using plaster casts, a simple tenotomy with local anesthetic, and a boot-and-bar brace can be implemented for $100–300 USD and taught to medical providers in weeks. This makes it the only realistic path to treating the global burden of clubfoot — organizations like CURE International and the Global Clubfoot Initiative have trained providers in over 100 countries.",
        },
        {
          id: "clubfoot-03-q4",
          type: "Historical Figure",
          challenge: `  A Roman emperor who ruled from 41–54 AD
  was described by ancient historians as
  having a limping gait and difficulty walking.
  Some historians believe he had clubfoot or
  a related congenital condition.`,
          text: "Which Roman Emperor is believed by some historians to have had a gait condition possibly related to clubfoot?",
          options: [
            "Julius Caesar",
            "Emperor Claudius",
            "Emperor Nero",
            "Augustus Caesar",
          ],
          correctIndex: 1,
          explanation: "Emperor Claudius (10 BC – 54 AD) is described by ancient historians including Suetonius as having a limp, shaky hands, and various physical differences that affected his movement. Some modern medical historians have suggested his gait abnormalities may have been consistent with clubfoot or a related congenital condition, though the exact diagnosis across 2,000 years cannot be confirmed. Claudius became emperor despite his physical differences and was considered one of Rome's more effective administrators.",
        },
      ],
    },
  },

  // ─── clubfoot-04: Staying Flexible and Active ─────────────────────────────────
  {
    epochId: "clubfoot",
    wonder: {
      name: "Children's Physical Therapy Center",
      location: "Denver, Colorado",
      era: "Modern",
      emoji: "💪",
    },
    id: "clubfoot-04",
    order: 4,
    title: "Staying Flexible and Active",
    subtitle: "Exercises, activities, and recognizing relapse",
    category: "health",
    xp: 85,
    badge: { id: "clubfoot-badge-04", name: "Active Mover", emoji: "🏃" },
    challengeType: "quiz",
    info: {
      tagline: "A treated clubfoot is not a fragile foot — it is a strong foot that needs consistent care.",
      year: 2005,
      overview: [
        "After Ponseti treatment, children with clubfoot can participate in virtually all physical activities. The goal of treatment is a functional foot — one that is flat on the ground, flexible, and pain-free. With proper treatment and brace compliance, children with clubfoot become runners, swimmers, cyclists, and athletes. Physical activity is not just permitted; it is encouraged as part of healthy development and maintaining foot flexibility.",
        "Daily stretching is important, particularly during the brace-wearing years. The key stretch for clubfoot is the calf stretch (also called the Achilles tendon stretch): with the knee straight, gently flex the foot upward (dorsiflexion). This maintains the length of the Achilles tendon that was achieved through casting and tenotomy. Foot circles (rotating the foot through its full range of motion) and toe wiggles also maintain flexibility and circulation.",
        "Relapse — the foot beginning to turn back in — is the primary concern in treated clubfoot. Relapse most commonly occurs between ages 1 and 4, almost always associated with reduced brace compliance. Signs of relapse include: the foot beginning to supinate (turn in) when walking, the child beginning to walk on the outer edge of the foot, increased tightness in the calf, and a return of the high arch. If any of these signs appear, contact the orthopedic team — caught early, relapse can often be managed with additional casting rather than surgery.",
      ],
      technical: {
        title: "Exercise Protocol for Treated Clubfoot",
        body: [
          "Physical therapy is often recommended after casting is complete, particularly for children who had more severe initial deformity. A physical therapist will teach parents and children age-appropriate exercises, assess gait, and identify any developing tightness before it becomes a relapse. PT is usually not intensive — a home program of daily stretches is the primary tool.",
          "Water-based activities (swimming, water play) are among the most beneficial for treated clubfoot. Water provides resistance for strengthening without impact stress, and kicking movements naturally stretch the calf and Achilles. Cycling is also excellent — the circular motion keeps the ankle flexible. High-impact sports (running, soccer, basketball) are entirely safe for most children with treated clubfoot.",
        ],
        codeExample: {
          label: "Daily Stretching Routine — Treated Clubfoot",
          code: `  CALF / ACHILLES STRETCH (key stretch):
  1. Sit with leg extended
  2. Gently flex foot upward (toes toward shin)
  3. Hold 30 seconds × 3 reps, twice daily
  ← Maintains Achilles tendon length

  FOOT CIRCLES:
  1. Rotate foot clockwise 10×, counterclockwise 10×
  2. Full range of motion, both directions
  ← Maintains ankle mobility

  TOWEL TOE CURLS:
  1. Place towel on floor, scrunch it with toes
  2. 3 sets of 10 repetitions
  ← Strengthens intrinsic foot muscles

  SIGNS OF RELAPSE — CONTACT ORTHO IF YOU SEE:
  ⚠  Foot turning inward when walking
  ⚠  Child walking on outer edge of foot
  ⚠  Return of high arch
  ⚠  Increased calf tightness`,
        },
      },
      incident: {
        title: "The Brace Compliance Study — Why Stretching and Bracing Matter Together",
        when: "2005 — Journal of Bone and Joint Surgery",
        where: "Multi-center study, United States and Europe",
        impact: "A landmark multi-center study confirmed that children who both wore the brace as prescribed AND performed daily stretches had significantly lower relapse rates than either group alone.",
        body: [
          "A 2005 study in the Journal of Bone and Joint Surgery followed children treated with the Ponseti method across multiple centers. The study compared outcomes based on brace compliance and the performance of daily calf stretches. Children who wore the brace as prescribed and performed stretches had relapse rates below 6%. Those who wore the brace but skipped stretches had slightly higher rates. Those who did neither had relapse rates approaching 55%.",
          "The authors concluded that the combination of brace compliance and daily Achilles stretching maintained the correction achieved by casting more effectively than either alone. Physical therapists working with clubfoot families now routinely teach the Achilles stretch as a non-negotiable daily habit — as routine as brushing teeth — during the brace-wearing years.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Treated Clubfoot", sub: "casting + tenotomy done", type: "system" },
          { label: "Daily Stretching", sub: "maintain Achilles length", type: "attacker" },
          { label: "Brace Compliance", sub: "naps + nights, 4–5 years", type: "victim" },
          { label: "Relapse Prevention", sub: "active, pain-free child", type: "result" },
        ],
      },
      timeline: [
        { year: 1990, event: "Physical therapy recognized as adjunct to Ponseti casting" },
        { year: 2000, event: "Ponseti method global spread — PT programs developed for clubfoot families" },
        { year: 2005, event: "Landmark study confirms combined brace + stretching minimizes relapse", highlight: true },
        { year: 2010, event: "Aquatic therapy programs developed specifically for clubfoot rehabilitation" },
        { year: 2018, event: "STEPS Charity launches parent exercise video library for clubfoot families" },
        { year: 2023, event: "Mobile app-based exercise programs for clubfoot families launched by multiple hospitals" },
      ],
      keyTakeaways: [
        "Daily calf stretches (Achilles tendon stretch) maintain the length gained through casting and are non-negotiable during brace years",
        "Children with treated clubfoot can participate in virtually all sports — swimming and cycling are particularly beneficial",
        "Relapse signs: foot turning in, walking on outer edge, high arch returning — contact ortho immediately",
        "Brace compliance + daily stretching together produce the lowest relapse rates — both are required",
      ],
      references: [
        { title: "STEPS Charity: Clubfoot Exercise Resources", url: "https://www.steps-charity.org.uk" },
        { title: "Ponseti International: Parent Exercise Guide", url: "https://www.ponseti.info" },
        { title: "AAOS: Clubfoot — Activity After Treatment", url: "https://orthoinfo.aaos.org/en/diseases--conditions/clubfoot/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "clubfoot-04-q1",
          type: "Exercise",
          challenge: `  A 2-year-old child is 6 months out of casting
  for clubfoot. She is in the brace-wearing phase.
  Her parents ask the physical therapist what
  single exercise is most important to do daily.`,
          text: "What is the most critical daily stretch for maintaining the correction achieved in clubfoot treatment?",
          options: [
            "Toe extensions — pulling the toes upward to strengthen the top of the foot",
            "Calf (Achilles tendon) stretch — gently flexing the foot upward with the knee straight",
            "Ankle circles done passively by the parent — the best all-around mobility exercise",
            "Standing calf raises — strengthens and stretches the Achilles simultaneously",
          ],
          correctIndex: 1,
          explanation: "The calf/Achilles tendon stretch is the most critical exercise. With the knee straight, gently flex the foot upward (dorsiflexion) — pulling the toes toward the shin. This maintains the length of the Achilles tendon that was achieved through the tenotomy and casting. Without this daily stretch, the Achilles gradually shortens again during growth, leading to relapse. The exercise should be done for 30 seconds × 3 reps, twice daily — as routine as brushing teeth.",
        },
        {
          id: "clubfoot-04-q2",
          type: "Activity",
          challenge: `  Parents of a 4-year-old with treated clubfoot
  ask: "Are there sports our child should avoid?"

  Their child's foot is fully corrected,
  flexible, and pain-free. Brace compliance
  has been excellent.`,
          text: "What activities are generally recommended or safe for children with successfully treated clubfoot?",
          options: [
            "Only low-impact activities — running and jumping should be avoided to prevent relapse",
            "Swimming and cycling only — contact sports are not appropriate",
            "Virtually all activities including running, soccer, and swimming — with swimming and cycling especially beneficial",
            "No restrictions until age 10 — then reassess based on long-term outcomes",
          ],
          correctIndex: 2,
          explanation: "Children with successfully treated clubfoot can participate in virtually all sports and physical activities. The goal of treatment is a fully functional foot, and physical activity supports that goal. Swimming and cycling are particularly beneficial because both activities naturally stretch the Achilles while building strength. High-impact sports (running, soccer, basketball) are entirely appropriate for most children with treated clubfoot. Physical activity should be encouraged — a treated clubfoot is not a fragile foot.",
        },
        {
          id: "clubfoot-04-q3",
          type: "Relapse Recognition",
          challenge: `  A 2.5-year-old who completed Ponseti treatment
  successfully 18 months ago begins to:
  - Walk with the right foot turned slightly inward
  - Occasionally trip over the right foot
  - Resist wearing the nighttime brace more than usual

  Parents notice the right foot's arch looks
  slightly higher than the left.`,
          text: "What do these signs most likely indicate, and what should the family do?",
          options: [
            "Normal toddler walking variation — wait and see for 3–6 months",
            "The brace size has been outgrown — schedule a routine fitting appointment",
            "Early relapse signs — contact the orthopedic team promptly; caught early, recasting may resolve it without surgery",
            "The tenotomy site is re-tightening — this requires emergency surgical evaluation",
          ],
          correctIndex: 2,
          explanation: "These are textbook early relapse signs: foot turning in during walking, high arch returning, and brace resistance (often because the child has become aware the foot is tight). The correct response is to contact the orthopedic team promptly. When caught early, relapse can often be managed with 1–3 additional Ponseti casts — no surgery required. Waiting months allows the deformity to progress and makes correction more difficult. Brace resistance is often the first sign — it can reflect foot discomfort from early tightening.",
        },
        {
          id: "clubfoot-04-q4",
          type: "Research",
          challenge: `  Study A: Child wears brace + does daily stretches
            → Relapse rate: ~5–6%

  Study B: Child wears brace only, no stretches
            → Relapse rate: ~15%

  Study C: No brace, no stretches
            → Relapse rate: ~55%`,
          text: "What does this data tell us about the relative importance of bracing vs. stretching?",
          options: [
            "Only bracing matters — stretching has no measurable impact",
            "Only stretching matters — bracing is the practice that families can safely skip",
            "Both bracing and stretching are required — together they produce the lowest relapse rates",
            "Neither has a strong effect — relapse is primarily determined by initial deformity severity",
          ],
          correctIndex: 2,
          explanation: "The data shows clearly that both brace compliance and daily stretching are required for optimal outcomes. Bracing alone (Study B) reduces relapse significantly compared to no treatment (Study C), but adding daily stretching (Study A) reduces it further — to near 5–6%. The Achilles tendon stretch and brace work synergistically: the brace maintains foot position, the stretch maintains tendon length. Families who do both have the best outcomes.",
        },
      ],
    },
  },

  // ─── clubfoot-05: Famous People with Clubfoot ─────────────────────────────────
  {
    epochId: "clubfoot",
    wonder: {
      name: "Pro Football Hall of Fame",
      location: "Canton, Ohio",
      era: "Modern",
      emoji: "🏈",
    },
    id: "clubfoot-05",
    order: 5,
    title: "Standing Tall",
    subtitle: "Famous people who lived with clubfoot",
    category: "health",
    xp: 80,
    badge: { id: "clubfoot-badge-05", name: "Role Model", emoji: "⭐" },
    challengeType: "quiz",
    info: {
      tagline: "Clubfoot has never stopped the people it wanted to slow down.",
      year: 1970,
      overview: [
        "Throughout history, many prominent individuals have had clubfoot — athletes, entertainers, and historical figures whose lives demonstrate that a foot difference does not determine a person's ability, achievement, or character. These stories matter for children and families navigating a clubfoot diagnosis: they show what is possible after treatment, and in some cases, what is possible even without modern treatment.",
        "Troy Aikman, the Pro Football Hall of Fame quarterback who led the Dallas Cowboys to three Super Bowl championships in the 1990s, was born with a clubfoot in his left foot. He had surgery as an infant and went on to have one of the most successful careers in NFL history. His story is particularly powerful because it involves the high-demand physical environment of professional football — and his foot held.",
        "Dudley Moore, the British comedian, actor, and pianist, was born with a clubbed foot and a shortened leg (a condition called talipes). Despite physical differences that affected his walk, he became one of the most successful comic actors of his era. Mia Farrow and Damon Wayans also lived with clubfoot. Emperor Claudius of Rome, whose gait difficulties are documented by ancient historians, is thought by some scholars to have had a congenital foot condition.",
      ],
      technical: {
        title: "What These Lives Teach Us",
        body: [
          "The common thread in these stories is not that clubfoot was irrelevant to their lives — it was relevant, in different ways. Troy Aikman's surgery as an infant and rehabilitation meant his foot was functionally corrected before he began sports. Dudley Moore's clubfoot and shortened leg were visible throughout his life and career, and he addressed them with humor and directness.",
          "For children currently in treatment: the brace, the casts, and the stretches are the foundation on which a full life is built. For families: these stories are not about exceptional people overcoming extraordinary odds — they are about the ordinary reality of clubfoot, which is that treatment works and life is not limited by a foot that started out turned in.",
        ],
        codeExample: {
          label: "Notable People with Clubfoot",
          code: `  TROY AIKMAN
    Sport: NFL quarterback, Dallas Cowboys
    3× Super Bowl champion, Pro Football Hall of Fame
    Treated surgically as infant (pre-Ponseti era)

  DUDLEY MOORE
    Entertainer: actor, comedian, musician
    Starred in 'Arthur' (1981) — Academy Award nominee
    Clubfoot + shortened leg; walked with slight limp

  MIA FARROW
    Actress: 'Rosemary's Baby,' 'Hannah and Her Sisters'
    Humanitarian, UNICEF Goodwill Ambassador

  DAMON WAYANS
    Comedian/actor: 'In Living Color,' 'My Wife and Kids'
    Clubfoot treated in childhood

  EMPEROR CLAUDIUS (historical)
    Roman Emperor, 41–54 AD
    Gait difficulties documented by Suetonius`,
        },
      },
      incident: {
        title: "Troy Aikman's Rookie Season and What No One Knew",
        when: "1989 — Dallas Cowboys NFL Draft",
        where: "Dallas, Texas",
        impact: "Troy Aikman was the #1 overall NFL Draft pick in 1989. His birth history with clubfoot was largely unknown to fans until he disclosed it publicly years later — a quiet example of how thoroughly treatment can correct the condition.",
        body: [
          "When Troy Aikman was selected as the first overall pick in the 1989 NFL Draft, few people knew he had been born with a clubfoot. His parents had sought surgical correction when he was an infant — a standard approach in the pre-Ponseti era — and Aikman grew up with no significant functional limitation. He played football from childhood through high school at Henryetta, Oklahoma, and at UCLA, where he was a consensus All-American.",
          "Aikman disclosed his birth history publicly in interviews later in his career, partly to encourage families of children with clubfoot. His message was consistent: 'Get the treatment, do the work, and don't let the diagnosis define what your child can achieve.' For a generation of clubfoot families in the 1990s, a three-time Super Bowl champion who had been born with a clubfoot was a powerful reference point.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Clubfoot Diagnosis", sub: "at birth — unknown future", type: "attacker" },
          { label: "Treatment", sub: "casting, brace, surgery", type: "system" },
          { label: "Life Lived", sub: "sports, art, public service", type: "victim" },
          { label: "Possibility", sub: "athlete, actor, advocate", type: "result" },
        ],
      },
      timeline: [
        { year: -10, event: "Emperor Claudius born — Roman historians later document his gait difficulties" },
        { year: 1935, event: "Dudley Moore born in Dagenham, England — clubfoot and shortened left leg" },
        { year: 1945, event: "Mia Farrow born in Los Angeles, California" },
        { year: 1966, event: "Troy Aikman born in West Covina, California — born with left clubfoot", highlight: true },
        { year: 1989, event: "Aikman selected #1 overall in NFL Draft — future Hall of Famer" },
        { year: 1993, event: "Aikman leads Dallas Cowboys to first of three Super Bowl championships" },
        { year: 2006, event: "Troy Aikman inducted into Pro Football Hall of Fame, Canton, Ohio" },
      ],
      keyTakeaways: [
        "Troy Aikman, three-time Super Bowl champion, was born with a left clubfoot and treated surgically as an infant",
        "Dudley Moore had clubfoot and a shortened leg throughout his career as a renowned actor and comedian",
        "Mia Farrow and Damon Wayans both had clubfoot treated in childhood",
        "These stories show that treated clubfoot does not limit athletic, artistic, or professional achievement",
      ],
      references: [
        { title: "Pro Football Hall of Fame: Troy Aikman", url: "https://www.profootballhof.com/players/troy-aikman/" },
        { title: "STEPS Charity: Clubfoot Role Models", url: "https://www.steps-charity.org.uk" },
        { title: "Ponseti International: Living with Clubfoot", url: "https://www.ponseti.info" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "clubfoot-05-q1",
          type: "Famous Person",
          challenge: `  This NFL quarterback was born in West Covina,
  California in 1966 with a clubfoot in his left foot.
  He was treated with surgery as an infant.
  He was the #1 overall NFL Draft pick in 1989.
  He won three Super Bowls with the Dallas Cowboys.
  He was inducted into the Pro Football Hall of Fame.`,
          text: "Who is this Hall of Fame quarterback who was born with a clubfoot?",
          options: [
            "Joe Montana",
            "Dan Marino",
            "Troy Aikman",
            "Brett Favre",
          ],
          correctIndex: 2,
          explanation: "Troy Aikman was born with a left clubfoot and had surgical correction as an infant. He went on to lead the Dallas Cowboys to three Super Bowl championships (1993, 1994, 1996) and was inducted into the Pro Football Hall of Fame in 2006. Aikman has spoken publicly about his birth history to encourage clubfoot families — a three-time Super Bowl champion who started life with a turned-in foot is a compelling example of what treatment makes possible.",
        },
        {
          id: "clubfoot-05-q2",
          type: "Famous Person",
          challenge: `  This British actor and comedian was born in 1935
  with a clubfoot and a shortened left leg (talipes).
  He was a classically trained pianist and
  an Academy Award-nominated actor.
  He starred in the 1981 film 'Arthur.'
  He walked with a visible limp throughout his life.`,
          text: "Who is this beloved British entertainer who had clubfoot and a shortened leg?",
          options: [
            "Peter Sellers",
            "Dudley Moore",
            "John Cleese",
            "Rowan Atkinson",
          ],
          correctIndex: 1,
          explanation: "Dudley Moore (1935–2002) was born with talipes equinovarus and a shortened left leg. Unlike modern clubfoot patients whose conditions are largely corrected by treatment, Moore's condition was visible throughout his life — he walked with a distinct limp. Rather than hiding it, he addressed it with characteristic humor. He became one of the most celebrated comic actors of his generation, was Academy Award-nominated for 'Arthur' (1981), and was also a classically trained jazz pianist.",
        },
        {
          id: "clubfoot-05-q3",
          type: "Historical Figure",
          challenge: `  Ancient Roman historians including Suetonius
  describe this emperor as having: a limp,
  weakness in his legs, a shaking head,
  and difficulties walking.

  He ruled from 41–54 AD and was considered
  by many historians to be an effective
  administrator despite his physical differences.`,
          text: "Which Roman emperor's physical difficulties have led some medical historians to suggest he may have had a congenital foot condition?",
          options: [
            "Julius Caesar",
            "Emperor Claudius",
            "Emperor Caligula",
            "Marcus Aurelius",
          ],
          correctIndex: 1,
          explanation: "Emperor Claudius (10 BC – 54 AD) is described by the historian Suetonius as having a limp, weak legs, a shaking head, and difficulty walking. Some modern medical historians have suggested these descriptions are consistent with clubfoot or a related congenital condition, though a definitive diagnosis across 2,000 years is not possible. What is historical fact is that Claudius became emperor despite his physical differences and ruled for 13 years, undertaking significant administrative and military achievements.",
        },
        {
          id: "clubfoot-05-q4",
          type: "Impact",
          challenge: `  A child just diagnosed with clubfoot is
  feeling scared. Her parents want to find
  something encouraging to share.

  Troy Aikman won 3 Super Bowls.
  Dudley Moore was an Oscar-nominated actor.
  Mia Farrow has been a UNICEF ambassador.`,
          text: "What is the most meaningful takeaway from these stories for a child newly diagnosed with clubfoot?",
          options: [
            "Clubfoot provides no meaningful challenges — famous people prove it is trivial",
            "Only extraordinary people can overcome clubfoot — it requires exceptional determination",
            "With treatment and care, clubfoot does not define what a person can achieve — the foot is the beginning of the story, not the end",
            "These people succeeded despite clubfoot, not because treatment worked — success requires ignoring the diagnosis",
          ],
          correctIndex: 2,
          explanation: "The most meaningful message is that clubfoot — when treated — does not limit what a person can achieve. Troy Aikman's foot held up to the most physically demanding position in professional sports. Dudley Moore's visible limp did not prevent him from becoming a beloved entertainer. These stories are not about exceptional willpower; they are about the ordinary outcome of treatment: a foot that works, a life that is full. For a newly diagnosed child, these names are reference points for possibility.",
        },
      ],
    },
  },

  // ─── clubfoot-06: Supporting Someone You Love ─────────────────────────────────
  {
    epochId: "clubfoot",
    wonder: {
      name: "Clubfoot Support Group Community Center",
      location: "Portland, Oregon",
      era: "Modern",
      emoji: "🤝",
    },
    id: "clubfoot-06",
    order: 6,
    title: "Supporting Someone You Love",
    subtitle: "How to help, what to say, and finding your community",
    category: "health",
    xp: 90,
    badge: { id: "clubfoot-badge-06", name: "Community Pillar", emoji: "💙" },
    challengeType: "quiz",
    info: {
      tagline: "The best thing you can do for someone with clubfoot is be the person who makes it ordinary.",
      year: 2010,
      overview: [
        "Parents, siblings, grandparents, and friends all play important roles in supporting a child through clubfoot treatment. The early months — weekly casting trips, a minor procedure, transitioning to the brace — are tiring and emotionally charged for families. What loved ones say and do during this time matters enormously. The goal is not to minimize or dramatize the diagnosis, but to normalize it: this is something that is being managed, that has a clear treatment path, and that will be a small part of a very full life.",
        "What not to say: 'I'm so sorry' (implies tragedy rather than a manageable condition), 'Will they ever walk normally?' (undermines confidence in treatment), 'This must be so hard' (focuses on difficulty rather than resilience). What helps: 'What's the next cast appointment? I'd love to come,' 'What can I do this week?' 'Your baby is beautiful.' Practical support — meals, transportation to appointments, help with older siblings — is often more valuable than emotional commentary.",
        "The Ponseti International Association, STEPS Charity (UK), and various national clubfoot support groups provide resources for families, connecting them with other parents who have been through the same treatment journey. Online communities (Facebook groups, clubfoot-specific forums) can provide real-time support from parents who have navigated every stage of treatment — a cast that came off early, a brace a toddler is refusing, a relapse scare. Finding this community early makes the journey significantly less isolating.",
      ],
      technical: {
        title: "Support Organizations and Resources",
        body: [
          "Ponseti International Association (ponseti.info) is the global authority on Ponseti method resources. Their website includes provider directories (to find certified Ponseti providers), parent guides, exercise videos, and research publications. For families newly diagnosed, the PIA parent handbook is an essential first resource.",
          "STEPS Charity (steps-charity.org.uk) is a UK-based organization supporting families of children with lower limb conditions including clubfoot. Their resources include family support workers, peer mentoring (parents paired with experienced clubfoot families), and fundraising for treatment in developing countries. Though UK-based, their online resources serve families globally.",
        ],
        codeExample: {
          label: "Support Do's and Don'ts",
          code: `  SAY THIS:
  ✓  "What's the next appointment — can I help?"
  ✓  "What can I do this week?" (meals, rides)
  ✓  "Your baby is beautiful."
  ✓  "The treatment really works — let me show you
      what other families have said."
  ✓  "I read about Troy Aikman — three Super Bowls!"

  NOT THIS:
  ✗  "I'm so sorry." (implies it's a tragedy)
  ✗  "Will they walk normally?" (undermines confidence)
  ✗  "That must be so hard for you." (focuses on difficulty)
  ✗  "My cousin had that — it was terrible." (not helpful)
  ✗  "Have you tried [alternative treatment]?" (unhelpful)

  FIND YOUR COMMUNITY:
  → Ponseti International Association: ponseti.info
  → STEPS Charity: steps-charity.org.uk
  → Facebook: "Clubfoot Parents" groups
  → Ask your orthopedic team for parent connections`,
        },
      },
      incident: {
        title: "The First Parent Meeting — STEPS Charity Peer Support",
        when: "2010 — STEPS Charity peer mentoring program expansion",
        where: "United Kingdom and United States online communities",
        impact: "STEPS Charity's peer mentoring program — pairing newly diagnosed families with experienced clubfoot parents — reduced reported anxiety in newly diagnosed families by over 60% in program evaluation surveys.",
        body: [
          "In 2010, STEPS Charity evaluated the impact of their peer mentoring program — a scheme where parents of children who had completed clubfoot treatment were matched with newly diagnosed families. The program evaluation found that 62% of participating families reported significantly reduced anxiety after connecting with an experienced parent, and 78% said the connection helped them feel confident about the treatment process.",
          "The most common feedback: 'Hearing that another parent had gone through the same casting schedule and that their child was now running around playing football made everything feel manageable.' Experienced parents were also able to share practical tips — how to make brace time more comfortable, which brands of socks fit over Dobbs bars, how to handle the tenotomy appointment — that healthcare providers sometimes don't think to mention.",
        ],
      },
      diagram: {
        nodes: [
          { label: "New Clubfoot Family", sub: "scared, overwhelmed", type: "victim" },
          { label: "Community Support", sub: "PIA, STEPS, peer parents", type: "system" },
          { label: "Practical Help", sub: "rides, meals, presence", type: "attacker" },
          { label: "Normalized Journey", sub: "confident, connected family", type: "result" },
        ],
      },
      timeline: [
        { year: 1987, event: "STEPS Charity founded in the UK to support lower limb condition families" },
        { year: 2000, event: "Ponseti International Association established — global provider and family resource" },
        { year: 2005, event: "Online clubfoot parent communities begin forming on early social media platforms" },
        { year: 2010, event: "STEPS peer mentoring program evaluated — 62% anxiety reduction reported", highlight: true },
        { year: 2015, event: "Facebook clubfoot parent groups reach tens of thousands of members globally" },
        { year: 2023, event: "Global Clubfoot Initiative trains providers in 70+ countries — communities form around new treatment sites" },
      ],
      keyTakeaways: [
        "Practical support (meals, transportation, presence at appointments) is often more helpful than emotional commentary",
        "Avoid 'I'm so sorry' and 'Will they walk normally?' — these center difficulty rather than capability",
        "Connect with the Ponseti International Association and STEPS Charity for family resources and peer support",
        "Peer mentoring — talking to a parent who has been through the same journey — is the highest-impact support for newly diagnosed families",
      ],
      references: [
        { title: "Ponseti International Association — Family Resources", url: "https://www.ponseti.info" },
        { title: "STEPS Charity — Clubfoot Family Support", url: "https://www.steps-charity.org.uk" },
        { title: "Global Clubfoot Initiative", url: "https://globalclubfoot.com" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "clubfoot-06-q1",
          type: "Communication",
          challenge: `  Your best friend just had a baby who was
  diagnosed with bilateral clubfoot.
  They're scared and overwhelmed.
  They call you for support.

  Choose your response.`,
          text: "Which response is most helpful for a friend whose newborn was just diagnosed with clubfoot?",
          options: [
            "'I'm so sorry — this must be absolutely devastating news. How are you holding up?'",
            "'Don't worry — it's not a big deal. Lots of people have it and you barely notice.'",
            "'Tell me about the treatment plan — and what can I do for you this week? Meals? Rides to appointments?'",
            "'Have you looked into alternative treatments? I've read some interesting things online.'",
          ],
          correctIndex: 2,
          explanation: "The best response acknowledges the situation, moves toward action, and offers practical support. 'I'm so sorry — devastating' centers tragedy and implies poor outcomes. 'Not a big deal, barely notice' dismisses valid feelings. Suggesting alternative treatments is confusing and undermines the medical team. Asking about the treatment plan (showing interest and confidence in it) and offering concrete practical help (meals, rides) is what actually helps. Practical support during the casting weeks is more valuable than almost anything else.",
        },
        {
          id: "clubfoot-06-q2",
          type: "Resources",
          challenge: `  A family in Texas has a 3-week-old with
  clubfoot. They want to:
  (1) Find a certified Ponseti provider nearby
  (2) Read about what to expect during casting
  (3) Connect with other parents who have
      been through treatment

  Where should they look first?`,
          text: "Which organization is the primary global resource for Ponseti treatment information and provider directories?",
          options: [
            "The American Academy of Pediatrics — they maintain a clubfoot provider registry",
            "Ponseti International Association (ponseti.info) — provider directories, parent guides, and research",
            "WebMD clubfoot section — comprehensive and regularly updated",
            "The CDC birth defects registry — includes treatment referral information",
          ],
          correctIndex: 1,
          explanation: "The Ponseti International Association (ponseti.info) is the primary global resource for everything related to Ponseti treatment. Their website includes a provider directory to find certified providers, a parent handbook covering every stage of treatment, exercise video guides, and research publications. STEPS Charity (steps-charity.org.uk) is also excellent for family support and peer mentoring, though it is UK-based. These two organizations are the first resources any newly diagnosed family should be directed to.",
        },
        {
          id: "clubfoot-06-q3",
          type: "Practical Support",
          challenge: `  A parent with a 6-week-old in Ponseti
  casting has three older children (ages 3, 6,
  and 8). Their partner works long hours.
  Casting appointments are weekly, 45 minutes away.

  You want to help but aren't sure what
  would actually be useful.`,
          text: "What type of support is most practically valuable during the casting phase?",
          options: [
            "Sending an encouraging text before each appointment",
            "Researching treatment options and sharing articles about clubfoot",
            "Offering specific help: driving to appointments, watching older children, bringing meals on casting days",
            "Joining them at appointments to take notes and ask questions on their behalf",
          ],
          correctIndex: 2,
          explanation: "During the casting phase — weekly appointments, a new baby, older children, a tired parent — practical, tangible help is the most valuable. Offer to drive to appointments, watch the older children so the parent can attend focused, or bring meals on casting days (which are long and tiring). Specific offers ('I can watch the kids this Tuesday') are more actionable than general offers ('let me know if you need anything'). Encouraging texts are kind but don't reduce the logistical burden. Research and note-taking risks overstepping the parent's relationship with their medical team.",
        },
        {
          id: "clubfoot-06-q4",
          type: "Milestone Celebration",
          challenge: `  A 4-year-old who was treated with Ponseti
  casting and bracing for clubfoot just got
  their brace off permanently. The parents
  want to celebrate but wonder if it might
  make their child feel self-conscious about
  their history.`,
          text: "How can families best approach celebrating treatment milestones like completing the brace phase?",
          options: [
            "Keep it private — drawing attention to clubfoot history might create unnecessary self-consciousness",
            "Celebrate openly and warmly — the milestone deserves recognition, and marking it creates positive associations rather than shame",
            "Only celebrate if the child brings it up — let them lead entirely",
            "Wait until the child is older to celebrate — at 4 they won't remember anyway",
          ],
          correctIndex: 1,
          explanation: "Celebrating treatment milestones openly and warmly is the recommended approach. The end of the brace phase is a significant achievement — years of compliance, stretching, and appointments. Marking it positively builds the child's sense of agency and accomplishment. The concern about creating self-consciousness by mentioning clubfoot is understandable but misplaced: the way to avoid shame is not avoidance but normalization. 'You worked so hard, and now you're done' is a message of capability, not difference. STEPS Charity specifically recommends milestone celebrations as part of building healthy clubfoot identity.",
        },
      ],
    },
  },
];
