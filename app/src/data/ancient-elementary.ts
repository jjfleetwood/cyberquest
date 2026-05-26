import type { StageConfig } from "./types";

export const ancientElementaryStages: StageConfig[] = [
  // ─── elem-01: Your Magic Password ────────────────────────────────────────────
  {
    epochId: "ancient",
    group: "elementary",
    wonder: { name: "School Locker Room", location: "Anytown, USA", era: "Present Day", emoji: "🔒" },
    id: "elem-01",
    order: 1,
    title: "Your Magic Password",
    subtitle: "Why passwords exist and how to make them strong",
    category: "cybersecurity",
    xp: 60,
    badge: { id: "badge-elem-01", name: "Key Keeper", emoji: "🗝️" },
    challengeType: "quiz",
    info: {
      tagline: "Your password is like a secret combination — the stronger it is, the safer everything inside stays.",
      year: 2024,
      overview: [
        "Imagine your locker at school. It has a combination lock — a secret set of numbers that only you know. If someone else figures out your combination, they can open your locker and take your things. Online accounts work exactly the same way. Your password is your secret combination.",
        "Every day, people try to guess other people's passwords. They start with the easy ones: your name, your birthday, the word 'password', or just '1234'. If your password is easy to guess, someone could get into your account and read your messages, spend your game coins, or pretend to be you.",
        "The good news is that a strong password is easy to make. Use a long phrase you will remember, add some numbers, and never reuse the same password in two different places. Think of it like your locker combination — you would not use '000' because anyone could guess it.",
      ],
      technical: {
        title: "What Makes a Password Strong?",
        body: [
          "A strong password is long (at least 8 characters), uses a mix of letters and numbers, and does not include your real name or birthday. 'Fluffy123!' is stronger than 'fluffy', but 'ILovePizzaOnFridays!' is even better because it is long and easy to remember.",
          "Every account should have its own password, just like your locker has a different combination than your bicycle lock. If someone figures out one password and you use it everywhere, they get into everything at once.",
        ],
        codeExample: {
          label: "Weak vs. Strong Passwords",
          code: `WEAK (easy to guess):
  password    1234    fluffy    yourname

STRONGER (mix of letters + numbers):
  Fluffy123!    SoccerStar2024!

BEST (a long phrase you remember):
  ILovePizzaOnFridays!
  MyDogIsNamedCharlie99`,
        },
      },
      incident: {
        title: "The Lunch Account Hack",
        when: "2023 — Elementary school, United States",
        where: "School online lunch payment system",
        impact: "Students found money missing from their lunch accounts after someone guessed their simple passwords",
        body: [
          "At a school in the United States, students noticed money disappearing from their online lunch accounts. The school investigated and found that someone had been guessing students' passwords. Most students had used their first name or birthday — things that are easy to look up.",
          "The school fixed the problem by teaching students how to create stronger passwords. The lesson: even a small account is worth protecting, because attackers look for any easy door they can find.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Attacker", sub: "tries easy guesses", type: "attacker" },
          { label: "Weak Password", sub: "\"fluffy\" or \"1234\"", type: "system" },
          { label: "Your Account", sub: "now open to them", type: "victim" },
          { label: "Strong Password", sub: "keeps the door locked", type: "result" },
        ],
      },
      timeline: [
        { year: 1961, event: "The first computer passwords were invented at MIT" },
        { year: 2013, event: "\"123456\" became the world's most common — and most hacked — password" },
        { year: 2019, event: "\"password\" still appeared in millions of hacked accounts" },
        { year: 2024, event: "Most websites now require stronger, longer passwords", highlight: true },
      ],
      keyTakeaways: [
        "Your password is private — never share it with anyone except a parent or guardian",
        "Use long passwords that mix letters, numbers, and symbols",
        "Never use your name, birthday, or 'password' as your password",
        "Use a different password for every account",
      ],
      references: [
        { title: "Google: Create a Strong Password", url: "https://support.google.com/accounts/answer/32040" },
        { title: "StaySafeOnline: Passwords", url: "https://staysafeonline.org/stay-safe-online/securing-key-accounts-devices/passwords-and-securing-accounts/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "elem-01-q1",
          type: "Password Strength",
          challenge: `Which password would be hardest for someone to guess?`,
          text: "Which of these passwords is the strongest?",
          options: [
            "fluffy",
            "12345678",
            "MyDogFluffyLovesPizza!",
            "password123",
          ],
          correctIndex: 2,
          explanation: "The longest password with a mix of letters, numbers, and symbols is always the hardest to guess. 'MyDogFluffyLovesPizza!' is long and easy for you to remember, but very hard for anyone else to figure out.",
        },
        {
          id: "elem-01-q2",
          type: "Password Safety",
          challenge: `Your friend wants to know your password so they
can log into your game and play while you are sick.

What should you do?`,
          text: "Your friend asks for your password. What is the right thing to do?",
          options: [
            "Tell them — they are your best friend and you trust them",
            "Keep it private — your password is for you alone",
            "Share it but make them promise not to tell anyone else",
            "Write it on a note and give it to them",
          ],
          correctIndex: 1,
          explanation: "Your password is private — like a secret. Even good friends should not know it. If someone needs to help you with an account, ask a parent or teacher instead.",
        },
        {
          id: "elem-01-q3",
          type: "Password Habits",
          challenge: `You use the same password for your email,
your game account, and your school login.

What is the problem with this?`,
          text: "Why is using the same password in multiple places risky?",
          options: [
            "There is no problem — it is easier to remember one password",
            "If someone figures out your password once, they can get into all of your accounts",
            "Websites do not allow the same password to be used twice",
            "It makes your computer run slower",
          ],
          correctIndex: 1,
          explanation: "If you use the same password everywhere and someone discovers it, they can get into ALL your accounts — not just one. It is like using the same key for your house, your locker, and your bicycle lock.",
        },
        {
          id: "elem-01-q4",
          type: "Real World",
          challenge: `You notice someone is using your game account
and sending messages as you.

What is the most important first step?`,
          text: "Someone has gotten into your account. What do you do first?",
          options: [
            "Send them a message asking them to stop",
            "Delete the account",
            "Change your password right away, then tell a parent or guardian",
            "Wait and see if they log out on their own",
          ],
          correctIndex: 2,
          explanation: "Changing your password right away locks out the attacker. Then tell a trusted adult who can help you check what happened and whether other accounts need to be secured too.",
        },
      ],
    },
  },

  // ─── elem-02: Don't Take the Bait ────────────────────────────────────────────
  {
    epochId: "ancient",
    group: "elementary",
    wonder: { name: "School Mailbox", location: "Anytown, USA", era: "Present Day", emoji: "📬" },
    id: "elem-02",
    order: 2,
    title: "Don't Take the Bait",
    subtitle: "Recognizing fake messages that try to trick you",
    category: "cybersecurity",
    xp: 60,
    badge: { id: "badge-elem-02", name: "Sharp Eye", emoji: "👁️" },
    challengeType: "quiz",
    info: {
      tagline: "If a message seems too good to be true — a free prize, an urgent warning, a suspicious link — it probably is.",
      year: 2024,
      overview: [
        "Imagine you find a note in your locker that says: 'You have won a free pizza! Click the link below to claim it.' Would you click it? How do you even know who left that note? Online, people send fake messages just like this all the time. They are called phishing attacks — and they are one of the most common tricks used to steal personal information.",
        "A phishing message tries to scare you or excite you so you act quickly without thinking. It might say your account is in trouble, you won a prize, or a friend needs help. Once you click the link or enter your information, the attacker gets exactly what they wanted.",
        "The best defense is to slow down and ask questions. Does this message make sense? Did I really sign up for this? Would my school or a real company actually ask for my password in an email? If something feels off, it probably is.",
      ],
      technical: {
        title: "How to Spot a Fake Message",
        body: [
          "Real organizations — your school, a game company, a bank — will never ask for your password in an email or text. If a message asks for your password, it is a trick. Also check: does the sender's address look strange? Is there a weird link that does not match the company name?",
          "Phishing messages often create a sense of urgency: 'Act now or your account will be deleted!' Real companies give you time to think. A message that pressures you to act immediately is almost always a scam.",
        ],
        codeExample: {
          label: "Real vs. Fake Message",
          code: `FAKE (phishing):
  From: support@gam3s-free.net
  "Your account will be deleted in 24 hours!
   Click here to verify: bit.ly/fr33g4mes"

REAL:
  From: support@roblox.com
  "We noticed a login from a new device.
   If this was not you, change your password
   at roblox.com/settings (no link needed)"`,
        },
      },
      incident: {
        title: "The Free Gift Card Scam",
        when: "2022 — Middle school district, United States",
        where: "School email system",
        impact: "Several students provided personal information thinking they won prizes — the attackers used the information to create fake accounts",
        body: [
          "Students at a middle school received emails claiming they had won a $50 gift card just for being good students. The email asked them to 'verify' their identity by entering their name, birthday, and school login password on an outside website.",
          "The students who fell for it had their school accounts compromised. The school had to reset all their passwords and spent weeks cleaning up the damage. The lesson: if a prize shows up without you entering any contest, it is not real.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Fake Email / Text", sub: "too good to be true", type: "attacker" },
          { label: "You Click the Link", sub: "acting without thinking", type: "system" },
          { label: "Your Info Stolen", sub: "password, name, etc.", type: "victim" },
          { label: "Pause and Check", sub: "stop before you click", type: "result" },
        ],
      },
      timeline: [
        { year: 1996, event: "The word 'phishing' first appeared online — attackers 'fishing' for victims" },
        { year: 2004, event: "Phishing attacks hit banks and PayPal users for the first time at large scale" },
        { year: 2016, event: "Phishing email tricks a presidential campaign, leaking thousands of private emails" },
        { year: 2024, event: "Phishing remains the #1 way attackers get into accounts worldwide", highlight: true },
      ],
      keyTakeaways: [
        "If a message says you won something you never entered, it is a trick",
        "No real company will ever ask for your password in an email",
        "Urgency ('act now!') is a red flag — slow down and think",
        "When in doubt, ask a parent, teacher, or guardian before clicking anything",
      ],
      references: [
        { title: "Google: Avoid Phishing Attacks", url: "https://support.google.com/mail/answer/8253" },
        { title: "FTC: How to Recognize and Avoid Phishing Scams", url: "https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "elem-02-q1",
          type: "Spot the Phish",
          challenge: `You get an email:
"CONGRATULATIONS! You won a $100 gift card!
 Enter your password at: gifts4kidz.net
 Hurry — only 2 hours left!"

What is this?`,
          text: "What kind of message is this?",
          options: [
            "A real prize — you should enter your password quickly",
            "A phishing scam — someone is trying to trick you into giving your password",
            "A message from your school",
            "A virus warning that you need to fix",
          ],
          correctIndex: 1,
          explanation: "This is a phishing scam. The fake urgency ('only 2 hours!'), the request for your password, and the suspicious website address are all classic tricks. Real prizes do not require your account password.",
        },
        {
          id: "elem-02-q2",
          type: "Safe Action",
          challenge: `Your friend texts you: "This website gives you free
Robux if you enter your username and password!"

What should you do?`,
          text: "Your friend sends you a link promising free in-game currency. What do you do?",
          options: [
            "Click it — your friend would not send you something bad",
            "Do not click it — your friend may have been tricked and is passing along a scam",
            "Enter just your username but not your password",
            "Click it only if the website looks official",
          ],
          correctIndex: 1,
          explanation: "Scammers often compromise one account and then use it to trick the victim's friends. Your friend may have been hacked and did not even know they sent you that message. If a link promises free things for your login info, it is always a scam.",
        },
        {
          id: "elem-02-q3",
          type: "Warning Signs",
          challenge: `Which of these is the BIGGEST warning sign
that a message might be fake?`,
          text: "Which is the biggest red flag in a message?",
          options: [
            "The message has a friendly greeting",
            "The message asks you to act immediately or something bad will happen",
            "The message comes from a name you recognize",
            "The message mentions your school's name",
          ],
          correctIndex: 1,
          explanation: "Fake messages almost always create panic or excitement to make you act without thinking. 'Act now or your account is deleted!' is a classic trick. Real organizations give you time and never demand instant action.",
        },
        {
          id: "elem-02-q4",
          type: "Best Response",
          challenge: `You think an email you got might be fake
but you are not completely sure.

What is the BEST thing to do?`,
          text: "You are unsure if an email is real. What is the best action?",
          options: [
            "Click the links carefully to investigate",
            "Delete it and pretend it never happened",
            "Show it to a parent, teacher, or trusted adult before doing anything",
            "Reply to ask if it is real",
          ],
          correctIndex: 2,
          explanation: "When in doubt, always ask an adult you trust. Do not click links, do not reply, and do not enter any information. A trusted adult can help you figure out if the message is real.",
        },
      ],
    },
  },

  // ─── elem-03: What Stays Private ─────────────────────────────────────────────
  {
    epochId: "ancient",
    group: "elementary",
    wonder: { name: "School Bulletin Board", location: "Anytown, USA", era: "Present Day", emoji: "📌" },
    id: "elem-03",
    order: 3,
    title: "What Stays Private",
    subtitle: "Personal information and why some things should not be shared online",
    category: "cybersecurity",
    xp: 60,
    badge: { id: "badge-elem-03", name: "Privacy Guardian", emoji: "🛡️" },
    challengeType: "quiz",
    info: {
      tagline: "Some information belongs to you and only you — sharing it with strangers online can put you in real danger.",
      year: 2024,
      overview: [
        "Think about the school bulletin board. You might post your art project or a funny poster, but you would not post your home address or phone number for everyone to see. The internet works the same way — some things are fine to share publicly, and some things should stay private.",
        "Personal information — like your full name, home address, phone number, school name, age, and location — can be used by strangers to find you in real life. Even small details that seem harmless can become dangerous when put together. Sharing your school name plus your grade plus a photo in your uniform might let a stranger figure out exactly who you are and where to find you.",
        "Being careful about what you share does not mean you cannot use the internet and have fun. It just means thinking before you post and keeping your most sensitive details for people you know and trust in real life.",
      ],
      technical: {
        title: "What Counts as Personal Information?",
        body: [
          "Personal Identifiable Information (PII) includes your full name, address, phone number, school, birthday, and anything that could identify exactly who you are or where you are. Usernames, photos, and location tags can also reveal more than you think.",
          "Even information that seems harmless can be dangerous when combined. Your first name + school name + photo + neighborhood is enough for a stranger to locate you. Think of it as puzzle pieces — alone they seem innocent, but together they form a complete picture.",
        ],
        codeExample: {
          label: "Safe vs. Unsafe Sharing",
          code: `SAFE to share publicly:
  ✓ Your favorite color
  ✓ A drawing you made
  ✓ A funny meme about cats

NOT safe to share publicly:
  ✗ Your full name + birthday
  ✗ Your home address
  ✗ Your school name + grade
  ✗ Photos showing your location`,
        },
      },
      incident: {
        title: "The Location Tag Mistake",
        when: "2023 — Elementary school student, United States",
        where: "Social media platform",
        impact: "A student's posts with school tags and location data allowed a stranger to identify exactly which school the child attended and their daily routine",
        body: [
          "A student posted several photos on a social media app. The photos themselves seemed harmless — lunch, a class project, a selfie in a school sweatshirt. But together, they showed the school's name, the student's first name, what time school let out, and even which bus stop they used.",
          "A concerned parent spotted the posts and worked with school administrators to remove them. The lesson: individual pieces of information may seem harmless, but they can be assembled into a detailed profile that strangers can misuse.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Pieces of Info", sub: "name, school, photo", type: "attacker" },
          { label: "Assembled Together", sub: "forms a profile", type: "system" },
          { label: "Your Identity Exposed", sub: "strangers can find you", type: "victim" },
          { label: "Share Carefully", sub: "think before you post", type: "result" },
        ],
      },
      timeline: [
        { year: 1998, event: "COPPA (Children's Online Privacy Protection Act) passed in the US to protect kids online" },
        { year: 2012, event: "Social media platforms begin adding location tagging to photos and posts" },
        { year: 2018, event: "GDPR (Europe's privacy law) gives everyone more control over their personal data" },
        { year: 2024, event: "Most platforms now offer privacy settings to limit who can see your posts", highlight: true },
      ],
      keyTakeaways: [
        "Never share your full name, address, phone number, or school location online with strangers",
        "Location tags in photos can reveal exactly where you are",
        "Information that seems harmless alone can be dangerous when combined",
        "Ask a parent or guardian before making any account or profile online",
      ],
      references: [
        { title: "FTC: COPPA — Protecting Kids' Privacy Online", url: "https://www.ftc.gov/business-guidance/privacy-security/childrens-privacy" },
        { title: "Common Sense Media: Privacy and Internet Safety", url: "https://www.commonsense.org/education/articles/privacy-and-internet-safety-what-is-it" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "elem-03-q1",
          type: "Private vs. Public",
          challenge: `Which of these should you NEVER share with strangers online?`,
          text: "Which piece of information should stay private?",
          options: [
            "Your favorite book",
            "Your home address",
            "A drawing you made",
            "Your favorite sports team",
          ],
          correctIndex: 1,
          explanation: "Your home address tells a stranger exactly where to find you in real life. Never share it with people you only know online. Your favorite book, a drawing, or a sports team are fine to discuss because they do not reveal where you are.",
        },
        {
          id: "elem-03-q2",
          type: "Puzzle Pieces",
          challenge: `You post these things on different days:
- A photo in your school uniform
- A selfie outside your apartment building
- A post that mentions your teacher's name

Why might this be risky?`,
          text: "Why can posting these three things together be dangerous?",
          options: [
            "It is not risky — none of those things is your password",
            "Together, the posts could let a stranger figure out where you go to school and where you live",
            "It only becomes risky if you share your phone number too",
            "Social media is private so only your friends can see it",
          ],
          correctIndex: 1,
          explanation: "Each piece seems harmless alone, but combined they paint a detailed picture. A stranger could identify your school, your building, and your teacher's name — enough to find you in real life. Think of personal info like puzzle pieces: separate pieces reveal little, but the whole picture reveals everything.",
        },
        {
          id: "elem-03-q3",
          type: "Privacy Settings",
          challenge: `A new app asks you to set your profile to
"Public" so more people can follow you.

Should you do it?`,
          text: "An app offers a public profile. What is the safest choice for a kid?",
          options: [
            "Set it to Public — the more followers the better",
            "Keep it Private — only people you know should see your posts",
            "Set it to Public but do not use your real name",
            "Set it to Public but do not post photos",
          ],
          correctIndex: 1,
          explanation: "Private settings mean only people you approve can see your posts. Public means anyone in the world can see them. For kids, private is always the safer choice. Ask a parent or guardian to help you with privacy settings on any new app.",
        },
        {
          id: "elem-03-q4",
          type: "Smart Choices",
          challenge: `Someone in an online game asks for your real name,
what school you go to, and what city you live in.

What should you do?`,
          text: "An online stranger asks for your real name, school, and city. What do you do?",
          options: [
            "Answer — you are just playing a game together",
            "Give your city but not your school",
            "Do not answer — tell a trusted adult about the request",
            "Give a fake name but your real city",
          ],
          correctIndex: 2,
          explanation: "Real friends in online games do not need to know your school or city to play together. Someone asking these questions may have bad intentions. Do not give any personal information, and tell a trusted adult what happened.",
        },
      ],
    },
  },

  // ─── elem-04: Three Ways to Stay Safe ────────────────────────────────────────
  {
    epochId: "ancient",
    group: "elementary",
    wonder: { name: "Local Library Safe Room", location: "Anytown, USA", era: "Present Day", emoji: "📚" },
    id: "elem-04",
    order: 4,
    title: "Three Ways to Stay Safe",
    subtitle: "The three big rules that protect everything on the internet",
    category: "cybersecurity",
    xp: 60,
    badge: { id: "badge-elem-04", name: "Triad Keeper", emoji: "🔐" },
    challengeType: "quiz",
    info: {
      tagline: "Every rule in cybersecurity comes back to three things: Keep it secret, keep it correct, keep it available.",
      year: 2024,
      overview: [
        "Security experts have three big rules that guide everything they do. They call it the CIA Triad — but it has nothing to do with spies! CIA stands for Confidentiality, Integrity, and Availability. These three ideas protect information in every system, from your gaming account to hospital records.",
        "Confidentiality means keeping secrets secret — only the right people get to see your information. Integrity means keeping information correct — nobody should be able to change it without permission. Availability means keeping systems working — the information should be there when you need it.",
        "When something goes wrong online, it usually breaks one of these three rules. Someone reads your private messages (Confidentiality broken). Someone changes your school record (Integrity broken). A website crashes so you cannot use it (Availability broken). Knowing these three rules helps you understand almost any cybersecurity story.",
      ],
      technical: {
        title: "CIA Triad — The Three Pillars",
        body: [
          "Confidentiality: Information is only seen by authorized people. Example: your diary should only be readable by you. Tools that help: passwords, encryption, locked accounts.",
          "Integrity: Information is accurate and unchanged. Example: your grades should be exactly what your teacher recorded — nobody else should be able to edit them. Tools that help: checksums, access logs, version control. Availability: Systems work when you need them. Example: the school website should be up during registration. Tools that help: backups, extra servers, monitoring.",
        ],
        codeExample: {
          label: "CIA Triad in Everyday Life",
          code: `CONFIDENTIALITY
  Your locker: only you have the combo
  Your texts: only you and your friend read them

INTEGRITY
  Your grades: only your teacher can change them
  A library book: returned in the same condition

AVAILABILITY
  The school website: works on registration day
  The lunch app: works at lunch time`,
        },
      },
      incident: {
        title: "The Report Card Hack",
        when: "2020 — School district, United States",
        where: "School records system",
        impact: "A student changed their own grades in the school system — breaking Integrity and causing weeks of investigation",
        body: [
          "A high school student found a way to log into the school's grade portal using a teacher's stolen password. They changed some of their failing grades to passing ones. This was a classic Integrity violation — the information was no longer accurate.",
          "The school discovered the change because the system kept logs of who changed what and when. The student was caught, suspended, and the grades were corrected. The lesson: good systems keep records so that any changes can be traced.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Confidentiality", sub: "keep secrets secret", type: "attacker" },
          { label: "Integrity", sub: "keep info correct", type: "system" },
          { label: "Availability", sub: "keep systems working", type: "victim" },
          { label: "CIA Triad", sub: "three pillars of safety", type: "result" },
        ],
      },
      timeline: [
        { year: 1987, event: "Security researchers first wrote down the CIA Triad concept" },
        { year: 1998, event: "NIST (National Institute of Standards and Technology) adopts CIA as a core framework" },
        { year: 2013, event: "Target breach violated all three pillars at once, costing $290 million" },
        { year: 2024, event: "CIA Triad remains the foundation of every cybersecurity course and certification", highlight: true },
      ],
      keyTakeaways: [
        "CIA stands for Confidentiality, Integrity, and Availability — not the spy agency",
        "Confidentiality = keep secrets secret (passwords, locks)",
        "Integrity = keep information accurate (no unauthorized changes)",
        "Availability = keep systems working when people need them",
      ],
      references: [
        { title: "NIST: Information Security Basics", url: "https://www.nist.gov/system/files/documents/2018/04/10/cybersecurityframework_v1.1.pdf" },
        { title: "OWASP: Security Fundamentals", url: "https://owasp.org/www-project-developer-guide/draft/foundations/security_principles/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "elem-04-q1",
          type: "CIA Triad",
          challenge: `Someone reads your private diary without
your permission.

Which CIA pillar was broken?`,
          text: "Someone reads your private diary without permission. Which pillar of the CIA Triad was violated?",
          options: [
            "Availability — the diary was not available when you needed it",
            "Integrity — the contents of the diary were changed",
            "Confidentiality — private information was seen by someone unauthorized",
            "None — reading something does not break any rule",
          ],
          correctIndex: 2,
          explanation: "Confidentiality means information should only be seen by authorized people. When someone reads your diary without permission, they violated Confidentiality — they accessed something private they were not allowed to see.",
        },
        {
          id: "elem-04-q2",
          type: "CIA Triad",
          challenge: `A student sneaks into the school grade system
and changes their F to an A.

Which CIA pillar was broken?`,
          text: "A student changes their grade in the school system. Which pillar was violated?",
          options: [
            "Confidentiality — the grade was now seen by unauthorized people",
            "Availability — the system went offline",
            "Integrity — information was changed without authorization",
            "None — the grade was still a number",
          ],
          correctIndex: 2,
          explanation: "Integrity means information should only be changed by authorized people in authorized ways. A student hacking their own grade is an Integrity violation — the data is now incorrect and unauthorized.",
        },
        {
          id: "elem-04-q3",
          type: "CIA Triad",
          challenge: `A hacker floods a school website with fake
traffic until it crashes.

Which CIA pillar was broken?`,
          text: "A website crashes because of a hacker attack. Which pillar was violated?",
          options: [
            "Confidentiality — secret information was revealed",
            "Integrity — the website content was changed",
            "Availability — the system was no longer usable when needed",
            "None — the website will come back online eventually",
          ],
          correctIndex: 2,
          explanation: "Availability means systems should work when people need them. When an attacker crashes a website so no one can use it, they have broken Availability — even if they did not read or change any data.",
        },
        {
          id: "elem-04-q4",
          type: "Real World",
          challenge: `Ransomware locks all the files on a
hospital's computers and demands payment.

How many CIA pillars does this attack break?`,
          text: "A ransomware attack encrypts a hospital's files and demands payment. How many CIA pillars are violated?",
          options: [
            "One — only Availability is affected since files are just locked",
            "Two — Confidentiality and Availability",
            "Three — Confidentiality, Integrity, and Availability are all affected",
            "Zero — no data was actually deleted",
          ],
          correctIndex: 2,
          explanation: "Ransomware typically breaks all three: attackers often READ data first (Confidentiality), encrypt it (Integrity — it is now unusable/altered), and lock access to it (Availability). This is why ransomware attacks are so serious — they break all three pillars at once.",
        },
      ],
    },
  },

  // ─── elem-05: Strangers Online ────────────────────────────────────────────────
  {
    epochId: "ancient",
    group: "elementary",
    wonder: { name: "School Front Office", location: "Anytown, USA", era: "Present Day", emoji: "🏫" },
    id: "elem-05",
    order: 5,
    title: "Strangers Online",
    subtitle: "Why online strangers need the same caution as real-life strangers",
    category: "cybersecurity",
    xp: 60,
    badge: { id: "badge-elem-05", name: "Trust Checker", emoji: "🔍" },
    challengeType: "quiz",
    info: {
      tagline: "Online, anyone can claim to be anyone — the same rules you follow with strangers in real life apply even more online.",
      year: 2024,
      overview: [
        "In real life, your parents have probably taught you to be careful around strangers. Online, the same rule applies — except it is even harder, because you cannot see the other person's face or know if they are who they say they are. Someone who claims to be a 12-year-old gamer might actually be an adult with bad intentions.",
        "Social engineering is when someone tricks you by pretending to be something they are not. Online, people can create fake profiles, use fake photos, and make up entire fake identities. They might befriend you slowly over weeks, building trust before asking for photos, personal information, or to meet in person.",
        "The good news is that recognizing the warning signs is straightforward. If someone you only know online asks for personal information, wants you to keep your conversations secret from your parents, or wants to meet in real life, those are red flags. A real friend — online or offline — does not need to hide.",
      ],
      technical: {
        title: "Social Engineering Warning Signs",
        body: [
          "Social engineers use trust and emotion to get what they want. Online, they often start with friendly conversation and shared interests before slowly introducing requests. The technique is called 'grooming' — building a fake relationship to lower your guard.",
          "Warning signs: someone wants to keep your friendship secret from parents, asks for photos or personal info, gets angry or upset when you say no, or tries to move conversations to a private app. Any of these should make you stop and tell an adult immediately.",
        ],
        codeExample: {
          label: "Real Friend vs. Online Danger",
          code: `REAL friend (online or offline):
  ✓ Does not need your home address to be friends
  ✓ Is fine with you telling your parents about them
  ✓ Does not get angry if you say no to something
  ✓ Does not ask you to keep secrets

WARNING SIGNS:
  ✗ "Do not tell your parents about me"
  ✗ "Send me a photo — I sent you one"
  ✗ "We should meet up sometime — just us"
  ✗ Pressure to share personal information`,
        },
      },
      incident: {
        title: "The Gaming Friend Who Was Not",
        when: "2022 — United States",
        where: "Online gaming platform",
        impact: "A child befriended what they thought was a same-age gamer; the person was actually an adult collecting personal information",
        body: [
          "A 10-year-old made friends with someone in an online game who claimed to be 11 and shared the same interests. Over several weeks, the person slowly asked for the child's school name, neighborhood, and a photo. The child thought nothing of it because they had become 'friends.'",
          "The child eventually mentioned the friendship to a parent, who immediately recognized the warning signs. Authorities were notified and investigated the account. The lesson: online friendships can be real and great, but adults you trust should always know about them.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Fake Profile", sub: "pretends to be a kid", type: "attacker" },
          { label: "Builds Trust", sub: "weeks of friendship", type: "system" },
          { label: "Asks for Info", sub: "photos, address, school", type: "victim" },
          { label: "Tell an Adult", sub: "the moment something feels off", type: "result" },
        ],
      },
      timeline: [
        { year: 1993, event: "Famous New Yorker cartoon: 'On the Internet, nobody knows you are a dog'" },
        { year: 2003, event: "First major laws passed targeting online predators using social platforms" },
        { year: 2008, event: "ICAC (Internet Crimes Against Children) task force expanded nationwide" },
        { year: 2024, event: "Online safety curriculum now taught in schools across the US", highlight: true },
      ],
      keyTakeaways: [
        "Online strangers deserve the same caution as real-life strangers — maybe more, since you cannot see them",
        "Anyone online can lie about who they are, their age, or their intentions",
        "Warning signs: keeping secrets from parents, asking for photos, wanting to meet in person",
        "If something feels wrong, tell a trusted adult immediately — you will never be in trouble for doing so",
      ],
      references: [
        { title: "NCMEC: Online Safety for Kids", url: "https://www.missingkids.org/netsmartz" },
        { title: "FBI: Safe Online Surfing", url: "https://sos.fbi.gov/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "elem-05-q1",
          type: "Warning Signs",
          challenge: `Someone you met in an online game says:
"Do not tell your mom or dad about me —
 they would not understand our friendship."

What is this a warning sign of?`,
          text: "An online friend asks you to keep them secret from your parents. What does this mean?",
          options: [
            "They are just shy and do not want to meet your parents yet",
            "This is a major warning sign — real friends never need to be kept secret from parents",
            "It is fine as long as you have been friends for a long time",
            "They are probably just trying to be cool",
          ],
          correctIndex: 1,
          explanation: "A real friend — online or in person — does not need to be a secret. Anyone who asks you to hide your friendship from your parents is a red flag. Tell a trusted adult immediately.",
        },
        {
          id: "elem-05-q2",
          type: "Fake Identity",
          challenge: `Your online gaming friend says they are 11 years old
and lives nearby. You have been friends for two months.

How can you know for sure who they really are?`,
          text: "How certain can you be about an online friend's real identity?",
          options: [
            "You can be completely sure — they have told you so much about their life",
            "You can be fairly sure if you have been friends for a long time",
            "You cannot be certain — online, anyone can claim to be any age or person",
            "You can verify by asking them to tell you their address",
          ],
          correctIndex: 2,
          explanation: "Online, anyone can make up a name, age, location, and backstory. Even someone you have chatted with for months could be misrepresenting themselves. This is why online friends should never receive your personal information.",
        },
        {
          id: "elem-05-q3",
          type: "Safe Response",
          challenge: `An online friend gets really angry and says
you are being unfair when you tell them you
do not want to share your photo.

What should you do?`,
          text: "An online friend gets angry when you refuse to share a photo. What do you do?",
          options: [
            "Share the photo — you do not want to lose the friendship",
            "Apologize and share just one photo",
            "Recognize this as a red flag and tell a trusted adult",
            "Ask your parents to take a photo that does not show your face",
          ],
          correctIndex: 2,
          explanation: "A real friend respects your boundaries. Someone who gets angry when you say no is using pressure and emotion to manipulate you — a classic social engineering technique. Do not share anything and tell a trusted adult right away.",
        },
        {
          id: "elem-05-q4",
          type: "Best Action",
          challenge: `An online friend asks if you want to meet in
person at the park near your school.

What is the right response?`,
          text: "An online-only friend wants to meet you in person. What is the safest response?",
          options: [
            "Agree, but only during the day when it is safe",
            "Meet them but bring a friend from school",
            "Say no and tell a trusted adult about the request",
            "Ask your parents if they can come with you to meet them",
          ],
          correctIndex: 2,
          explanation: "Meeting someone from the internet in person — even if your parents come — is a significant step that should involve a thoughtful adult conversation, law enforcement guidance, and never happen in a private location. The first step is always telling a trusted adult.",
        },
      ],
    },
  },

  // ─── elem-06: Your Digital Footprint ─────────────────────────────────────────
  {
    epochId: "ancient",
    group: "elementary",
    wonder: { name: "Sandy Beach", location: "Coastal USA", era: "Present Day", emoji: "🏖️" },
    id: "elem-06",
    order: 6,
    title: "Your Digital Footprint",
    subtitle: "What you leave behind every time you go online",
    category: "cybersecurity",
    xp: 60,
    badge: { id: "badge-elem-06", name: "Trace Tracker", emoji: "👣" },
    challengeType: "quiz",
    info: {
      tagline: "Every click, post, and search you make online leaves a trail — and that trail can last for years.",
      year: 2024,
      overview: [
        "When you walk on a sandy beach, you leave footprints. The tide eventually washes them away. But on the internet, your footprints are much harder to erase. Every post you share, every photo you like, every comment you make, and every website you visit adds to what is called your digital footprint.",
        "Your digital footprint has two parts. Your active footprint is what you choose to share — posts, profiles, and comments. Your passive footprint is what gets recorded without you actively doing anything — websites track which pages you visit, how long you stay, and what you click on.",
        "This matters because employers, teachers, colleges, and even strangers can look up your digital footprint. Something you post as a joke today might still be findable years from now. Building a positive digital footprint starts with thinking before you share.",
      ],
      technical: {
        title: "Active vs. Passive Digital Footprint",
        body: [
          "Active footprint: Posts you make on social media, comments you leave, photos you upload, emails you send. You created these intentionally. Passive footprint: Data collected automatically — websites using cookies to track your visits, apps collecting your location, search engines recording your searches.",
          "Both types can be seen by others. Colleges have rejected applicants because of old social media posts. Companies research job applicants online. Even deleted posts can be saved by screenshots or archived by web tools before deletion.",
        ],
        codeExample: {
          label: "Types of Digital Footprints",
          code: `ACTIVE (you created it):
  Posts and photos you share
  Comments on videos
  Profiles you filled out

PASSIVE (collected automatically):
  Websites you visited (browser history)
  Searches you typed in Google
  Your location when you use apps`,
        },
      },
      incident: {
        title: "The Deleted Post That Was Not Gone",
        when: "2019 — United States high school",
        where: "Social media platform",
        impact: "A student's offensive posts from years earlier were screenshot and shared, leading to disciplinary action despite the posts being deleted",
        body: [
          "A high school student deleted offensive posts they had made years earlier, thinking they were gone. But other users had already taken screenshots and saved them. Years later, those screenshots were shared during the student's college application process.",
          "The student lost a scholarship offer as a result. The lesson: delete does not mean gone. Once something is on the internet, assume it can exist forever somewhere.",
        ],
      },
      diagram: {
        nodes: [
          { label: "You Post Something", sub: "even just for fun", type: "attacker" },
          { label: "Internet Records It", sub: "screenshots, archives, logs", type: "system" },
          { label: "Future You", sub: "can be affected years later", type: "victim" },
          { label: "Think Before You Post", sub: "would you show this to your teacher?", type: "result" },
        ],
      },
      timeline: [
        { year: 2004, event: "Facebook launches — the beginning of widespread social media footprints" },
        { year: 2012, event: "Colleges begin routinely checking applicants' social media profiles" },
        { year: 2016, event: "The Wayback Machine has archived over 450 billion web pages — including deleted ones" },
        { year: 2024, event: "Digital citizenship education required in schools across many US states", highlight: true },
      ],
      keyTakeaways: [
        "Your digital footprint is everything you do online — active posts and passive tracking",
        "Deleting something does not guarantee it is truly gone",
        "Future colleges and employers may see your online history",
        "The best rule: never post anything you would not want a teacher or grandparent to see",
      ],
      references: [
        { title: "Common Sense Media: Digital Footprint", url: "https://www.commonsense.org/education/articles/what-is-a-digital-footprint" },
        { title: "Google: About Me — Manage Your Online Info", url: "https://myaccount.google.com/data-and-privacy" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "elem-06-q1",
          type: "Footprint Types",
          challenge: `Which of these is an example of an
ACTIVE digital footprint?`,
          text: "Which action creates an active digital footprint?",
          options: [
            "A website recording which pages you visited",
            "An app tracking your location in the background",
            "A photo you posted on social media",
            "Ads that know what you searched for",
          ],
          correctIndex: 2,
          explanation: "An active footprint is something you intentionally created and shared — like a photo you posted. Passive footprints are collected automatically by websites, apps, and advertisers without you doing anything specific.",
        },
        {
          id: "elem-06-q2",
          type: "Permanence",
          challenge: `You post a joke that seems funny at the time.
Later you delete it.

Is it completely gone?`,
          text: "You delete a post you regret. Is it fully erased from the internet?",
          options: [
            "Yes — deleting it removes all copies permanently",
            "Only if you deleted it within 24 hours",
            "Not necessarily — someone may have screenshot it or it may be archived",
            "Yes, as long as the platform confirms the deletion",
          ],
          correctIndex: 2,
          explanation: "Deleting a post removes it from the platform, but it does not erase screenshots, copies saved by other users, or archives made by web tools. Always assume that once something is online, it can exist forever.",
        },
        {
          id: "elem-06-q3",
          type: "Real Impact",
          challenge: `Before posting something online, what is a
good test to decide if it is OK to share?`,
          text: "What is a useful 'test' before posting something?",
          options: [
            "Would my best friend think it is funny?",
            "Is it under 280 characters?",
            "Would I be comfortable if my teacher or a future employer saw this?",
            "Has anyone else posted something similar before?",
          ],
          correctIndex: 2,
          explanation: "The 'grandparent test' or 'teacher test' is a classic way to check if something is okay to post. If you would be embarrassed for a teacher, parent, future employer, or college admissions officer to see it, you probably should not post it.",
        },
        {
          id: "elem-06-q4",
          type: "Building a Good Footprint",
          challenge: `What is the BEST way to build a positive
digital footprint?`,
          text: "How do you build a positive digital footprint?",
          options: [
            "Use a fake name so nothing is linked to the real you",
            "Never go online at all",
            "Share things that reflect your real interests and accomplishments — and avoid hurtful content",
            "Delete everything you post after 24 hours",
          ],
          correctIndex: 2,
          explanation: "A positive digital footprint is built by sharing things that reflect well on you — your projects, your interests, kind comments, and achievements. Using a fake name is not a real solution because other details can still identify you.",
        },
      ],
    },
  },

  // ─── elem-07: Two Locks Are Better Than One ──────────────────────────────────
  {
    epochId: "ancient",
    group: "elementary",
    wonder: { name: "Bank Vault Door", location: "Financial District, USA", era: "Present Day", emoji: "🏦" },
    id: "elem-07",
    order: 7,
    title: "Two Locks Are Better Than One",
    subtitle: "What Two-Factor Authentication means and why it matters",
    category: "cybersecurity",
    xp: 60,
    badge: { id: "badge-elem-07", name: "Double Lock", emoji: "🔑" },
    challengeType: "quiz",
    info: {
      tagline: "Even if someone steals your password, a second lock on the door means they still cannot get in.",
      year: 2024,
      overview: [
        "Imagine a bank vault. It does not just have one lock — it has a combination, a key, and sometimes even a fingerprint scanner. Multiple locks mean that even if a robber steals one key, they still cannot get inside. This is the idea behind Two-Factor Authentication, or 2FA.",
        "Two-Factor Authentication means that logging in requires two separate steps, not just one password. The first factor is something you know (your password). The second factor is something you have (a code sent to your phone) or something you are (your fingerprint or face). Even if someone steals your password, they still need that second factor to get in.",
        "Most major websites — Google, Microsoft, your school's system — offer 2FA. It takes about 10 extra seconds to log in, but it makes your account dramatically harder to break into. Security experts say that enabling 2FA stops over 99% of automated account hacks.",
      ],
      technical: {
        title: "The Three Factors of Authentication",
        body: [
          "Authentication proves you are who you say you are. There are three types of factors: Something you KNOW (password, PIN), Something you HAVE (phone, key, security token), Something you ARE (fingerprint, face, voice). Using two of these together makes authentication much stronger.",
          "A text code (SMS 2FA) is the most common second factor. When you log in with your password, the website sends a 6-digit code to your phone. You must enter that code to finish logging in. Even if a hacker has your password, they cannot log in without also having your phone.",
        ],
        codeExample: {
          label: "How 2FA Login Works",
          code: `Step 1: Enter password
  Username: alex@school.com
  Password: ●●●●●●●●●●●
  → "We sent a code to your phone"

Step 2: Enter the code
  Code: 4 8 2 7 1 9
  → "Welcome, Alex!"

If hacker has password but not phone:
  Password: ●●●●●●●●●●●  ← stolen!
  Code: ??? ← they don't have your phone
  → "Incorrect code. Access denied."`,
        },
      },
      incident: {
        title: "The Instagram Account Saved by 2FA",
        when: "2023 — United States",
        where: "Instagram",
        impact: "A teen's account was targeted by attackers who knew their password — but 2FA prevented the takeover",
        body: [
          "A teenager reused a password from a website that had been hacked. The attackers had the password and tried to log into the teen's Instagram account. They succeeded in entering the password — but Instagram sent a 2FA code to the teen's phone.",
          "The teen saw the unexpected login attempt notification, did NOT share the code, and immediately changed their password. The attack failed entirely because of 2FA. If the account had not had 2FA enabled, it would have been taken over within seconds.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Stolen Password", sub: "first lock bypassed", type: "attacker" },
          { label: "2FA Code Required", sub: "second lock still holds", type: "system" },
          { label: "Attacker Blocked", sub: "cannot enter without your phone", type: "victim" },
          { label: "Enable 2FA", sub: "on every account that offers it", type: "result" },
        ],
      },
      timeline: [
        { year: 1986, event: "RSA Security creates the first hardware token for two-factor authentication" },
        { year: 2011, event: "Google introduces 2FA for all accounts — 'Authenticator' app launched" },
        { year: 2018, event: "Google reports that 2FA stops 100% of automated bot attacks" },
        { year: 2024, event: "Most major websites offer 2FA; security experts call it the single most impactful easy step", highlight: true },
      ],
      keyTakeaways: [
        "2FA adds a second step to logging in — even if your password is stolen, attackers still need your phone",
        "The three factors are: something you know, something you have, something you are",
        "Never share a 2FA code with anyone — not even someone claiming to be from the company",
        "Enable 2FA on every account that offers it, especially email and social media",
      ],
      references: [
        { title: "Google: 2-Step Verification", url: "https://myaccount.google.com/signinoptions/two-step-verification" },
        { title: "CISA: More Than a Password (MFA Guide)", url: "https://www.cisa.gov/MFA" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "elem-07-q1",
          type: "2FA Basics",
          challenge: `What does Two-Factor Authentication (2FA) mean?`,
          text: "What is Two-Factor Authentication?",
          options: [
            "Having two different passwords for the same account",
            "Using two separate steps to log in — a password plus a second verification",
            "Sharing your password with two trusted people",
            "Having two backup email addresses",
          ],
          correctIndex: 1,
          explanation: "2FA means logging in requires two separate steps — usually your password (something you know) plus a code sent to your phone (something you have). Both are required to get in.",
        },
        {
          id: "elem-07-q2",
          type: "Why 2FA Works",
          challenge: `A hacker steals your password. But your account
has 2FA enabled with codes sent to your phone.

Can they log in?`,
          text: "A hacker has your password but your account has 2FA. Can they access it?",
          options: [
            "Yes — if they have your password they can always get in",
            "No — they also need the 2FA code that goes to your phone",
            "Yes — they can request a new 2FA code to their own phone",
            "It depends on how strong your password is",
          ],
          correctIndex: 1,
          explanation: "With 2FA, the password alone is not enough. The hacker would also need the code sent to your phone. Since they do not have your phone, they are blocked — even with a correct password.",
        },
        {
          id: "elem-07-q3",
          type: "Protect the Code",
          challenge: `You get an unexpected 2FA text message:
"Your code is 847291. Never share this code."

Right after, someone calls claiming to be Google
support and asks for the code.

What do you do?`,
          text: "Someone calls asking for your 2FA code. What do you do?",
          options: [
            "Give them the code — they said they are from Google",
            "Give them the first three digits only",
            "Never share the code — hang up and tell a trusted adult",
            "Share it after they verify their employee ID",
          ],
          correctIndex: 2,
          explanation: "No real company will ever call you and ask for your 2FA code. This is a social engineering attack. The message itself says 'Never share this code' — follow that instruction. Hang up and tell a trusted adult.",
        },
        {
          id: "elem-07-q4",
          type: "3 Factors",
          challenge: `Which of these is an example of the
"something you ARE" factor?`,
          text: "Which authentication method uses 'something you are'?",
          options: [
            "Your password",
            "A code texted to your phone",
            "Your fingerprint scan",
            "A USB security key you plug in",
          ],
          correctIndex: 2,
          explanation: "The three factors are: Something you KNOW (password), Something you HAVE (phone, security key), Something you ARE (fingerprint, face, iris scan). A fingerprint is 'something you are' — it is a physical characteristic of your body.",
        },
      ],
    },
  },

  // ─── elem-08: Safe Places Online ─────────────────────────────────────────────
  {
    epochId: "ancient",
    group: "elementary",
    wonder: { name: "Public Library", location: "Anytown, USA", era: "Present Day", emoji: "📖" },
    id: "elem-08",
    order: 8,
    title: "Safe Places Online",
    subtitle: "How to recognize a safe website and browse smartly",
    category: "cybersecurity",
    xp: 60,
    badge: { id: "badge-elem-08", name: "Safe Surfer", emoji: "🏄" },
    challengeType: "quiz",
    info: {
      tagline: "Just like there are safe and unsafe neighborhoods in a city, there are safe and unsafe places on the internet.",
      year: 2024,
      overview: [
        "Think of the internet like a big city. Most of it is safe and helpful — like libraries, stores, and schools. But just like a city has some unsafe areas, the internet has dangerous places too. Knowing how to spot a safe website is one of the most useful skills you can learn.",
        "One of the biggest clues is in the web address. Safe websites use HTTPS — you can see a little padlock icon in your browser next to the address. The 'S' stands for Secure, meaning your information is encrypted and protected while traveling to the website. A website that only shows HTTP (without the S) is not secure.",
        "But HTTPS alone is not enough. A fake website can also have HTTPS. You also need to look at the website address carefully: does it match the real company? Small typos like 'googIe.com' (capital I instead of lowercase l) or 'paypa1.com' (number 1 instead of letter l) are tricks that can fool you at a glance.",
      ],
      technical: {
        title: "HTTPS, Padlocks, and Fake URLs",
        body: [
          "HTTPS uses a technology called TLS (Transport Layer Security) to encrypt your data before it travels across the internet. This means even if someone intercepts your connection, they see scrambled data, not your real information. Always look for the padlock in your browser before entering any personal information.",
          "Fake websites often copy the look of real ones perfectly but use a slightly different URL. Always type website addresses directly into the browser bar instead of clicking links in emails. Before entering a password or credit card info, double-check that the URL is exactly correct.",
        ],
        codeExample: {
          label: "Safe vs. Fake URLs",
          code: `SAFE (real websites):
  https://www.google.com   ← padlock + correct spelling
  https://roblox.com       ← padlock + correct spelling

SUSPICIOUS (possible fakes):
  http://google.com        ← no 'S' (not encrypted)
  https://googIe.com       ← capital I instead of l
  https://rob1ox.com       ← '1' instead of 'l'
  https://paypa1.com       ← '1' instead of 'l'`,
        },
      },
      incident: {
        title: "The Fake Roblox Login Page",
        when: "2022 — United States",
        where: "Phishing website mimicking Roblox",
        impact: "Thousands of young players entered their login credentials on a fake site that looked identical to the real Roblox login page",
        body: [
          "Attackers created a website called 'roblox-free-robux.com' that looked exactly like the real Roblox login page — same colors, same logo, same layout. Children were directed there via YouTube comments and Discord messages promising free Robux.",
          "Those who entered their username and password had their accounts stolen within minutes. The accounts were used to scam their friends or sold. The lesson: no matter how real a site looks, always check the URL and never enter your password on a site reached through a link from a stranger.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Fake Website", sub: "looks exactly like the real one", type: "attacker" },
          { label: "You Enter Password", sub: "thinking it is safe", type: "system" },
          { label: "Attacker Gets Login", sub: "account stolen instantly", type: "victim" },
          { label: "Check the URL + Padlock", sub: "before every login", type: "result" },
        ],
      },
      timeline: [
        { year: 1994, event: "HTTPS invented to make online shopping secure" },
        { year: 2018, event: "Google Chrome begins marking all HTTP websites as 'Not Secure'" },
        { year: 2020, event: "Over 95% of web traffic is now encrypted with HTTPS" },
        { year: 2024, event: "Fake HTTPS sites (using stolen certificates) become a major threat", highlight: true },
      ],
      keyTakeaways: [
        "Look for HTTPS and the padlock before entering any personal information",
        "Check the URL carefully — fake sites use small typos to look real",
        "Never click a link to a login page — type the address yourself",
        "If something looks off, close the tab and go to the real site directly",
      ],
      references: [
        { title: "Google: Safer Browsing Tips", url: "https://safety.google/intl/en_us/security/security-tips/" },
        { title: "StaySafeOnline: Staying Safe While Shopping Online", url: "https://staysafeonline.org/stay-safe-online/online-safety-basics/secure-websites/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "elem-08-q1",
          type: "HTTPS",
          challenge: `You are about to enter your password on a website.
The address bar shows:
  http://myschool.com/login

Is this safe?`,
          text: "The site uses HTTP (not HTTPS). Is it safe to enter your password?",
          options: [
            "Yes — the address has 'myschool' so it is a school site",
            "No — HTTP means the connection is not encrypted; your password could be intercepted",
            "Yes — as long as you trust the school it does not matter",
            "It depends on what browser you are using",
          ],
          correctIndex: 1,
          explanation: "HTTP (without the S) means your information travels unencrypted. Anyone watching your internet connection could see your password. Always look for HTTPS (with the padlock) before entering any sensitive information.",
        },
        {
          id: "elem-08-q2",
          type: "Spot the Fake",
          challenge: `Which of these website addresses is SUSPICIOUS?`,
          text: "Which URL looks like a fake or phishing site?",
          options: [
            "https://www.roblox.com",
            "https://roblox-free-robux.com",
            "https://www.minecraft.net",
            "https://account.google.com",
          ],
          correctIndex: 1,
          explanation: "'roblox-free-robux.com' is a classic fake site URL. No official game company puts 'free robux' in their web address — they do not need to. Any site promising free currency or items in exchange for your login is a scam.",
        },
        {
          id: "elem-08-q3",
          type: "Safe Behavior",
          challenge: `You get a text message: "Click here to log in
to your school account: bit.ly/sch00l-login"

What should you do?`,
          text: "A text message sends you a link to log in to your school account. What do you do?",
          options: [
            "Click it — the text says it is your school account",
            "Click it only if it is from a number you recognize",
            "Do not click it — type your school's real website address yourself instead",
            "Click it but check for the padlock first",
          ],
          correctIndex: 2,
          explanation: "Never log in by clicking a link from a text or email. Type your school's real address directly into the browser. The link in the text could point to a fake site even if the message looks official.",
        },
        {
          id: "elem-08-q4",
          type: "URL Check",
          challenge: `You want to go to Google. You see two tabs open:
  Tab 1: https://www.google.com
  Tab 2: https://www.googIe.com (capital I not lowercase l)

What is different about Tab 2?`,
          text: "What is the difference between 'google.com' and 'googIe.com' (with capital I)?",
          options: [
            "Nothing — they look the same",
            "Tab 2 uses a capital I instead of a lowercase L — it is a different website, possibly a fake",
            "Tab 2 is the mobile version of Google",
            "Tab 2 is safer because it uses a capital letter",
          ],
          correctIndex: 1,
          explanation: "In many fonts, a capital 'I' and a lowercase 'l' look identical. Attackers use this trick (called a homograph attack) to create fake URLs that are almost impossible to spot at a glance. Always look carefully at the spelling of any website you enter passwords on.",
        },
      ],
    },
  },
];
