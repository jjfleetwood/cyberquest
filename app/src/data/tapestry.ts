import type { StageConfig, EpochConfig } from "./types";

export const tapestryEpoch: EpochConfig = {
  id: "tapestry",
  name: "The Woven World",
  subtitle: "Tapestry — History, Tradition & Modern Practice",
  description: "Travel through 3,000 years of tapestry: from Egyptian tombs and Andean mummy wrappings to the great Flemish workshops, Persian courts, Navajo hogans, and the modern artist's studio. Learn to weave, mix colors on the loom, and read the language of thread.",
  emoji: "🧵",
  color: "yellow",
  unlocked: true,
};

export const tapestryStages: StageConfig[] = [
  // ─── tapestry-01: What Is Tapestry? ──────────────────────────────────────────
  {
    epochId: "tapestry",
    wonder: { name: "Egyptian Museum", location: "Cairo, Egypt", era: "~1400 BCE", emoji: "🏺" },
    id: "tapestry-01",
    order: 1,
    title: "Threads Through Time",
    subtitle: "What is tapestry? Origins from Egypt to the ancient Americas",
    category: "arts",
    xp: 100,
    badge: { id: "tapestry-badge-01", name: "Thread Keeper", emoji: "🧵" },
    challengeType: "quiz",
    info: {
      tagline: "Every tapestry begins with a single thread and a story that wants to be told.",
      year: -1400,
      overview: [
        "Tapestry is one of the oldest art forms on earth — and one of the most misunderstood. The word is often used loosely to mean any decorative textile, but true tapestry has a precise definition: it is a weft-faced weave where the design is formed entirely by the colored weft (horizontal) threads, which completely cover the warp (vertical) threads beneath. The warp is the skeleton; the weft is the painting.",
        "The earliest surviving tapestry fragments were found in Egyptian tombs dating to around 1400 BCE — fine linen weaves depicting geometric patterns and lotus flowers. But tapestry almost certainly began even earlier, in multiple places simultaneously, wherever humans stretched fiber on a frame and discovered that color could be woven in alongside structure. Pre-Columbian Andean weavers, working in complete isolation from the Old World, developed tapestry techniques of extraordinary refinement — sometimes achieving over 100 weft threads per centimeter.",
        "What makes tapestry different from ordinary weaving? In regular cloth, warp and weft threads appear in equal measure — you see the grid of both. In tapestry, the weft is beaten down so firmly that it completely hides the warp. The weaver works color area by color area, turning back at each boundary, building the image thread by thread from bottom to top — exactly like a painter adding color to a canvas, except the medium is fiber.",
      ],
      technical: {
        title: "How to Recognize Tapestry",
        body: [
          "Look at the back of a woven piece. In true tapestry, you will see exposed warp threads (the structural skeleton) and numerous loose tails where the weaver started and ended different color areas. The front shows only weft. If you can see both warp and weft on the front, it is ordinary cloth, not tapestry.",
          "Run your finger across the surface. Tapestry has a characteristic ridged texture — you can feel the distinct ribs of each weft thread. Embroidery, by contrast, has stitches sitting on top of a background fabric; tapestry has no background fabric. The structure and the image are one and the same thing.",
        ],
        codeExample: {
          label: "The structure of tapestry (side view)",
          code: `  WEFT (the colors you see — runs horizontally)
  ════════════════════════════════════
  ┊  ┊  ┊  ┊  ┊  ┊  ┊  ┊  ┊  ┊  ┊
  ┊  ┊  ┊  ┊  ┊  ┊  ┊  ┊  ┊  ┊  ┊
  ┊  ┊  ┊  ┊  ┊  ┊  ┊  ┊  ┊  ┊  ┊
  WARP (hidden beneath — runs vertically)

  The weft is packed so tightly it completely
  covers the warp threads. You only see color.`,
        },
      },
      incident: {
        title: "The Bayeux Tapestry — History's Great Misnomer",
        when: "~1070–1080 CE",
        where: "Normandy, France (now displayed in Bayeux, France)",
        impact: "Cultural significance: Sole surviving visual record of the Norman Conquest of England — 58 scenes, 230 feet long, commissioned by Bishop Odo of Bayeux.",
        body: [
          "Here is a delightful secret that surprises most people: the famous Bayeux Tapestry is not actually tapestry. It is embroidery — colored wool stitched onto a linen background fabric. You can see the linen underneath the figures. True tapestry has no background fabric; the threads ARE the fabric. The Bayeux Tapestry was called tapestry for centuries simply because it hung on a wall like a tapestry would.",
          "This confusion is common. The word 'tapestry' in everyday English means any large decorative textile hanging, regardless of technique. In the textile arts world, 'tapestry' refers specifically to the weft-faced weave technique. Both meanings are in use today — just know the difference when you're at a museum or talking with a weaver.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Warp Threads", sub: "vertical skeleton, hidden", type: "system" },
          { label: "Weft Threads", sub: "horizontal, carries color", type: "attacker" },
          { label: "Beating Down", sub: "weft covers warp completely", type: "victim" },
          { label: "Tapestry Image", sub: "color built row by row", type: "result" },
        ],
      },
      timeline: [
        { year: -3000, event: "Earliest woven textiles — plain weave cloth in Egypt and Mesopotamia" },
        { year: -1400, event: "Earliest surviving tapestry fragments found in Egyptian tombs", highlight: true },
        { year: -500, event: "Pre-Columbian Andean weavers develop extraordinary tapestry techniques" },
        { year: 1080, event: "Bayeux 'Tapestry' created — actually embroidery, but illustrates the era's love of narrative textile" },
        { year: 1300, event: "Flemish tapestry workshops begin in Arras — golden age begins" },
      ],
      keyTakeaways: [
        "True tapestry is weft-faced: the weft completely covers the warp — you never see the warp on the front",
        "The Bayeux 'Tapestry' is actually embroidery — a common and forgivable mix-up",
        "Tapestry was independently invented in multiple ancient civilizations simultaneously",
        "Egyptian, Andean, and Asian tapestries predate European tapestry by thousands of years",
        "The difference from plain cloth: in tapestry, the structure and the image are the same thing",
      ],
      references: [
        { title: "The Metropolitan Museum — Tapestry Collection", url: "https://www.metmuseum.org/art/collection/search#!?q=tapestry&perPage=20&sortBy=Relevance&offset=0&pageSize=0" },
        { title: "Bayeux Museum (Virtual Tour)", url: "https://www.bayeuxmuseum.com/la-tapisserie-de-bayeux/" },
        { title: "Textile Museum Washington DC", url: "https://museumoftextiles.com/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "tapestry-01-q1",
          type: "Weaving Trivia",
          challenge: `  In tapestry weaving, look at these two diagrams:

  DIAGRAM A (Plain cloth):          DIAGRAM B (Tapestry):
  ─────────────────────             ══════════════════════
  | warp | warp | warp |            ══════════════════════
  ─────────────────────             ══════════════════════
  warp and weft both visible        only weft visible`,
          text: "What is the key difference between tapestry and ordinary woven cloth?",
          options: [
            "Tapestry uses silk threads; cloth uses wool or cotton",
            "In tapestry, the weft threads completely cover the warp — you only see the weft",
            "Tapestry is always made on a vertical loom; cloth on a horizontal one",
            "Tapestry uses twice as many threads per inch as ordinary cloth",
          ],
          correctIndex: 1,
          explanation: "In tapestry, the weft (horizontal threads) is beaten down so firmly that it completely hides the warp (vertical threads) beneath. This is what makes tapestry 'weft-faced' — and it's what allows the weaver to create a colored image purely from weft thread.",
        },
        {
          id: "tapestry-01-q2",
          type: "History Spotlight",
          challenge: `  A museum archaeologist opens a sealed Egyptian tomb
  and discovers fragments of woven linen with geometric
  patterns — lotus flowers, chevrons, and diamonds —
  dating to approximately 1400 BCE.

  These fragments are: clearly dyed, clearly woven,
  and show no background fabric — just interlocked threads.`,
          text: "These Egyptian fragments represent what milestone in tapestry history?",
          options: [
            "The first evidence of embroidery in the ancient world",
            "The earliest surviving examples of true tapestry weaving",
            "Proof that ancient Egyptians invented the modern loom",
            "The origin of the Bayeux Tapestry tradition",
          ],
          correctIndex: 1,
          explanation: "Tapestry fragments from Egyptian tombs (~1400 BCE) are among the earliest surviving examples of true tapestry weaving — where the weft completely covers the warp to create a pattern. Egypt was one of several ancient civilizations that independently discovered tapestry.",
        },
        {
          id: "tapestry-01-q3",
          type: "True or False",
          challenge: `  The famous Bayeux Tapestry, 230 feet long and depicting
  the Norman Conquest of England in 1066, has been
  called a "tapestry" for nearly a thousand years.

  But look closely: the figures are stitched in wool
  ONTO a linen background fabric. The background
  fabric is still visible between the stitched figures.`,
          text: "True or False: The Bayeux 'Tapestry' is technically embroidery, not tapestry.",
          options: [
            "True — it is embroidered onto a background fabric, which rules out true tapestry",
            "False — it qualifies as tapestry because it hangs on a wall",
            "False — it uses weft-faced weaving just like other tapestries",
            "True — but only the border sections are embroidery; the center is true tapestry",
          ],
          correctIndex: 0,
          explanation: "True! The Bayeux Tapestry is embroidery — colored wool stitched onto a linen backing. In true tapestry, there is no background fabric; the weft threads create both the image and the fabric itself. The name 'tapestry' stuck because wall-hung textiles were simply called tapestries in medieval times, regardless of technique.",
        },
        {
          id: "tapestry-01-q4",
          type: "Pattern Quiz",
          challenge: `  Feel the surface of these two textiles:

  TEXTILE A: Smooth, flat — you can feel both the
             horizontal and vertical threads evenly.

  TEXTILE B: Ribbed, textured — you feel distinct
             horizontal ridges running across the piece.
             No vertical threads can be felt at all.`,
          text: "Which textile is tapestry, and why?",
          options: [
            "Textile A — the smooth flat surface shows both threads are equally visible",
            "Textile B — the distinct ribs are the weft threads packed over hidden warp",
            "Both could be tapestry — the feel doesn't distinguish technique",
            "Neither — true tapestry has no texture at all",
          ],
          correctIndex: 1,
          explanation: "Textile B is tapestry. That characteristic ribbed texture is the weft threads packed tightly on top of hidden warp threads. When you run your finger across the surface of a tapestry, you feel only the horizontal weft ribs — because the vertical warp is completely buried beneath them.",
        },
      ],
    },
  },

  // ─── tapestry-02: Flemish Golden Age ─────────────────────────────────────────
  {
    epochId: "tapestry",
    wonder: { name: "Château d'Angers", location: "Angers, France", era: "14th–16th Century", emoji: "🏰" },
    id: "tapestry-02",
    order: 2,
    title: "The Flemish Masters",
    subtitle: "Europe's golden age of tapestry — Arras, Brussels, and the great workshops",
    category: "arts",
    xp: 100,
    badge: { id: "tapestry-badge-02", name: "Cartoon Reader", emoji: "🏰" },
    challengeType: "quiz",
    info: {
      tagline: "For two hundred years, the workshops of Flanders clothed the walls of every palace in Europe.",
      year: 1350,
      overview: [
        "Between roughly 1350 and 1550, the cities of Arras and Brussels in what is now Belgium became the unrivalled center of European tapestry production. Tapestries from Arras were so famous that the French word for tapestry became 'arras' — a usage still found in Shakespeare ('I'll find where truth is hid, though it were hid indeed within the centre,' from Hamlet, where Polonius hides behind an 'arras'). Brussels later overtook Arras, and by the 16th century, the Brussels mark — a small weaving shuttle — was the most coveted quality guarantee in Europe.",
        "These were not small workshops. The great Flemish tapestry ateliers employed hundreds of weavers, dye masters, wool merchants, and cartoon painters — tapestry was a major industry. A single large tapestry might take a team of weavers several years to complete. The finished pieces were worth more than paintings by the greatest masters of the day — they were the prestige art objects of their time, given as diplomatic gifts between kings and popes.",
        "The design process was elaborate. First, a painter created a small-scale sketch. This was then enlarged to a full-size painting called a 'cartoon' (from the Italian 'cartone,' meaning large paper). The cartoon was placed behind the warp threads on the loom, and the weavers worked from the back, using mirrors or translucent cartoons to follow the design. The result, seen from the front, was a mirror-image of the cartoon — which weavers had to account for when the design was asymmetric.",
      ],
      technical: {
        title: "Working from a Cartoon",
        body: [
          "A tapestry 'cartoon' is simply the full-size design drawing placed behind or beneath the warp threads as a guide. Today, beginners often draw their cartoon on paper, place it behind a frame loom, and trace the major shapes directly onto the warp threads with a marker. This gives you clear boundaries to fill in with color.",
          "For your first tapestry, keep the cartoon simple: bold shapes with clear color areas. Avoid very thin lines or highly detailed areas — these are genuinely difficult to weave and belong to more advanced work. A design of large colored shapes — an abstract landscape, a simple flower, a geometric pattern — will give you beautiful results and teach you the fundamentals cleanly.",
        ],
        codeExample: {
          label: "From cartoon to tapestry (the process)",
          code: `  STEP 1: Draw your design on paper (the 'cartoon')
  ┌─────────────────────────────┐
  │   🌸  simple flower         │
  │   bold shapes, few colors   │
  └─────────────────────────────┘
          ↓ place behind warp
  STEP 2: Trace major lines onto warp threads
  STEP 3: Weave each color area, working bottom to top
  STEP 4: The finished tapestry = the cartoon in thread

  TIP: If your design is asymmetric, remember the
  finished piece will be the MIRROR IMAGE of your cartoon
  (you weave from the back).`,
        },
      },
      incident: {
        title: "The Unicorn Tapestries — The Greatest Mystery in Fiber",
        when: "~1495–1505",
        where: "Now at The Cloisters, Metropolitan Museum of Art, New York",
        impact: "Cultural significance: Seven tapestries depicting the hunt and capture of a unicorn. Their original owner, meaning, and location are still unknown after 500+ years.",
        body: [
          "The Unicorn Tapestries are among the most celebrated works of art in the world — seven large tapestries, each about 12 by 14 feet, woven in wool and silk with metallic threads, depicting scenes from the hunt of a unicorn. They are extraordinary in their detail: over 100 different plants have been identified in the millefleurs ('thousand flowers') backgrounds, many botanically accurate enough to identify as specific species.",
          "What makes them mysterious: nobody knows who commissioned them, who wove them, or what they mean. The monogram 'A' and 'E' appears in the borders, but its meaning is disputed. They may depict the Annunciation, or a secular hunt, or the life of Christ — scholars have argued about this for over a century. They came to the Metropolitan Museum in 1937 as a gift from John D. Rockefeller Jr., who bought them from the Duc de la Rochefoucauld. Before that? Unknown. You can visit them today at The Cloisters in New York.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Painter creates sketch", sub: "small-scale design", type: "attacker" },
          { label: "Cartoon painted", sub: "full-size guide drawing", type: "system" },
          { label: "Weavers work from back", sub: "mirror image produced", type: "victim" },
          { label: "Finished tapestry", sub: "years of work, priceless", type: "result" },
        ],
      },
      timeline: [
        { year: 1300, event: "Arras workshops begin — Belgian city becomes Europe's tapestry capital" },
        { year: 1380, event: "Apocalypse Tapestry woven for Duke of Anjou — 459 feet long, still surviving", highlight: true },
        { year: 1500, event: "Unicorn Tapestries woven — greatest surviving example of the Flemish golden age" },
        { year: 1520, event: "Raphael designs the Acts of the Apostles cartoons for Brussels weavers (now in the V&A)" },
        { year: 1620, event: "Peter Paul Rubens begins designing tapestry cartoons — painting meets weaving" },
      ],
      keyTakeaways: [
        "Flemish tapestries were the most prestigious art objects in Europe — more valuable than paintings",
        "A 'cartoon' is the full-size design drawing placed behind the loom as a guide",
        "Weavers worked from the back, producing a mirror image of the cartoon",
        "The Brussels quality mark — a weaving shuttle — was the guarantee of excellence",
        "The Unicorn Tapestries (c.1500) at The Cloisters, NYC, are among the world's finest surviving examples",
      ],
      references: [
        { title: "The Unicorn Tapestries — The Cloisters, Met Museum", url: "https://www.metmuseum.org/art/collection/search/473835" },
        { title: "The Apocalypse Tapestry — Château d'Angers (Virtual)", url: "https://www.chateau-angers.fr/en/discover/the-apocalypse-tapestry" },
        { title: "V&A — Raphael Cartoons", url: "https://www.vam.ac.uk/articles/the-raphael-cartoons" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "tapestry-02-q1",
          type: "History Spotlight",
          challenge: `  A scholar in the 1400s writes a letter:
  "I have purchased the finest 'arras' money can buy —
   a magnificent hunting scene, six feet high and twenty
   feet wide, destined for the great hall."

  The word 'arras' here refers to tapestry.`,
          text: "Why did the word 'arras' become a synonym for tapestry in medieval Europe?",
          options: [
            "Arras was the Latin word for 'thread' used in Church documents",
            "The Belgian city of Arras was so famous for tapestry that its name became the word for the product",
            "King Louis XIV of France decreed that all tapestries must be called 'arras'",
            "Arras was the name of the inventor of the tapestry loom",
          ],
          correctIndex: 1,
          explanation: "The city of Arras (in what is now northern France/Belgium) was so dominant in tapestry production from the 14th century onward that its name became a common noun for tapestry in English and French. Shakespeare used 'arras' this way — when Polonius hides 'behind the arras' in Hamlet, he is hiding behind a tapestry.",
        },
        {
          id: "tapestry-02-q2",
          type: "Technique Quiz",
          challenge: `  A tapestry workshop, Brussels, 1500:

  The head weaver unrolls a large paper drawing —
  the same size as the finished tapestry will be —
  and places it behind the stretched warp threads
  on the loom. The weavers peer through the warp
  at the shapes and colors they must reproduce.

  What is this drawing called?`,
          text: "What is the full-size design drawing placed behind a tapestry loom called?",
          options: [
            "A template",
            "A draft",
            "A cartoon",
            "A schematic",
          ],
          correctIndex: 2,
          explanation: "It's called a 'cartoon' — from the Italian 'cartone' (large paper). This word predates its modern funny-drawings meaning by centuries. When Raphael designed tapestries for the Sistine Chapel, his full-size preparatory drawings were called cartoons. Today's weavers still use this term for the full-size guide drawing placed behind or under the warp.",
        },
        {
          id: "tapestry-02-q3",
          type: "History Spotlight",
          challenge: `  At The Cloisters museum in New York City, seven
  large tapestries hang in a dedicated room. Each
  is about 12 by 14 feet. They show scenes of a
  hunt: a unicorn is chased, captured, wounded,
  and finally shown alive in a millefleur garden.

  Woven around 1495-1505. Original owner: unknown.
  Original location: unknown. Meaning: debated.`,
          text: "What are these famous tapestries called?",
          options: [
            "The Apocalypse Tapestries",
            "The Unicorn Tapestries",
            "The Hunt of the Stag",
            "The Seven Sacraments",
          ],
          correctIndex: 1,
          explanation: "The Unicorn Tapestries! They are among the world's most celebrated medieval artworks — seven tapestries depicting the hunt of a unicorn, woven around 1495–1505 in the Flemish tradition. You can visit them today at The Cloisters (the medieval branch of the Metropolitan Museum of Art) in northern Manhattan. The millefleur ('thousand flowers') backgrounds contain over 100 identifiable plant species.",
        },
        {
          id: "tapestry-02-q4",
          type: "Technique Quiz",
          challenge: `  A weaver has placed her cartoon (design drawing)
  behind the warp threads. She works from the back
  of the tapestry, weaving from left to right.

  Her cartoon shows the letter 'R' in the center
  of the design.

  When she turns the finished tapestry around to
  view the front — what will she see?`,
          text: "When weaving from the back of the loom, what happens to the design?",
          options: [
            "The design appears exactly as drawn — weaving doesn't change orientation",
            "The design appears upside down",
            "The design appears as a mirror image — left and right are reversed",
            "The design rotates 90 degrees to the left",
          ],
          correctIndex: 2,
          explanation: "The finished tapestry is a mirror image of the cartoon. Because weavers work from the back, left becomes right and right becomes left in the finished piece. Weavers using asymmetric designs (like letters, or faces looking one direction) must plan their cartoons as mirror images, or they can use a mirror to check their work as they go. Symmetrical designs — flowers, geometric patterns, central motifs — are unaffected.",
        },
      ],
    },
  },

  // ─── tapestry-03: Asian Traditions ───────────────────────────────────────────
  {
    epochId: "tapestry",
    wonder: { name: "Palace Museum", location: "Beijing, China", era: "Song Dynasty, ~960–1279 CE", emoji: "🐉" },
    id: "tapestry-03",
    order: 3,
    title: "Silk and Shimmer",
    subtitle: "Kesi, tsuzure-ori, and the tapestry traditions of Asia",
    category: "arts",
    xp: 100,
    badge: { id: "tapestry-badge-03", name: "Silk Road Weaver", emoji: "🐉" },
    challengeType: "quiz",
    info: {
      tagline: "On the other side of the world, weavers worked in silk so fine you could read a letter through it.",
      year: 960,
      overview: [
        "While Flemish weavers were perfecting wool tapestry in Europe, Chinese artisans in the Song dynasty (960–1279 CE) were developing 'kesi' — a silk tapestry of breathtaking fineness. Kesi (literally 'cut silk,' for the small gaps that appear at color boundaries) was used for imperial robes, scroll paintings, and religious objects. The finest kesi pieces achieve a thread count that makes modern machine-made fabric look coarse by comparison — and they were so valued that whole silk paintings were reproduced thread by thread in kesi to preserve them.",
        "Japan developed its own tradition: 'tsuzure-ori,' which means 'pebble weave.' Japanese tsuzure weavers use their fingernails — carefully filed into serrated edges — as weaving combs, pressing each weft thread into place with extraordinary precision. The technique produces tapestry of remarkable sharpness and delicacy, traditionally used for the formal obi sashes worn with kimono. Today, Nishijin in Kyoto remains a center of this living tradition.",
        "Persian tapestry brought different values: bold color, complex geometric and floral patterns, and a tradition of garden imagery. Persian tapestries depicted the 'paradise garden' (from the Old Persian 'pairidaeza,' from which we get our word 'paradise') — a walled garden with water channels, flower beds, and birds. These garden tapestries were meant to bring the Persian ideal of paradise indoors during the harsh winter months. Their influence spread across the Islamic world, from Turkey to India.",
      ],
      technical: {
        title: "Working with Fine Threads",
        body: [
          "Asian silk tapestry traditions emphasize fine threads and closely-sett warps to achieve painterly detail. If you want to work in a similar spirit today, try using a fine wool or cotton warp (at 8–12 threads per inch) with smooth, fine weft threads — such as cotton embroidery floss, thin wool singles, or silk thread. Finer warps let you capture more detail but require more patience.",
          "A practical way to experience Asian tapestry techniques at home: try a simple flower or leaf design using only three or four colors, working very slowly and carefully packing each weft thread with your fingers or a tapestry comb. The aim is precision — each color area has a clean, sharp edge. Japanese tsuzure weavers spend years perfecting this patience. You can begin in an afternoon.",
        ],
        codeExample: {
          label: "Thread fineness comparison",
          code: `  THREAD COUNT (weft threads per inch):

  Beginner frame loom:     6–8 epi (ends per inch)
  Intermediate tapestry:  10–12 epi
  Fine European wool:     16–20 epi
  Chinese Kesi silk:      50–100+ epi  ← extraordinary
  Japanese tsuzure-ori:   40–80 epi

  Finer thread = more detail, more time, more patience.
  Start at 8 epi. Work up gradually. There is no rush.
  The finest kesi artists worked on a single piece
  for months or years.`,
        },
      },
      incident: {
        title: "The Dragon Robes — Kesi as Imperial Power",
        when: "15th–19th Century",
        where: "Imperial Court, Beijing, China",
        impact: "Cultural significance: Kesi dragon robes were the exclusive garment of Chinese emperors — the dragon patterns signifying divine authority. Only the emperor could wear robes with five-clawed dragons facing front.",
        body: [
          "The Chinese imperial court's dress codes were among the most elaborate in history, and kesi tapestry was central to them. The emperor's ceremonial robes were woven in kesi silk, and every element of the design carried meaning: the number and position of dragons, the arrangement of clouds, the colors used for each rank. A five-clawed dragon facing the viewer was the emperor's exclusive symbol. Princes of different ranks wore four-clawed dragons; other nobles wore three.",
          "Making a single imperial kesi robe took skilled weavers months of continuous work. The Palace Museum in Beijing holds extraordinary examples — pieces so fine that individual silk filaments are barely visible to the naked eye, yet the images are as precise as paintings. Many kesi robes were specifically made to reproduce earlier paintings in imperishable thread, preserving masterworks in a medium that (in the right conditions) lasts a thousand years.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Chinese Kesi", sub: "silk, ultra-fine, cut-silk gaps", type: "attacker" },
          { label: "Japanese Tsuzure-ori", sub: "fingernail combing, kimonos", type: "system" },
          { label: "Persian Garden Tapestry", sub: "paradise imagery, bold color", type: "victim" },
          { label: "Living Traditions Today", sub: "Nishijin, Kyoto; Beijing Palace Museum", type: "result" },
        ],
      },
      timeline: [
        { year: 700, event: "Kesi tapestry technique emerges in Tang Dynasty China" },
        { year: 960, event: "Song Dynasty — kesi reaches its highest artistic refinement", highlight: true },
        { year: 1200, event: "Persian paradise garden tapestry tradition well established — spreads across Islamic world" },
        { year: 1600, event: "Japanese tsuzure-ori reaches full development in Kyoto's Nishijin district" },
        { year: 1800, event: "Chinese imperial kesi robes at their most complex — preserved in Palace Museum today" },
        { year: 2024, event: "Nishijin tsuzure-ori weavers maintain the living tradition; kesi taught in Chinese art schools" },
      ],
      keyTakeaways: [
        "Chinese Kesi is woven in silk at extraordinary fineness — up to 100 weft threads per centimeter",
        "Japanese tsuzure-ori weavers use their own fingernails, filed serrated, as weaving combs",
        "Persian tapestry depicted 'paradise gardens' — the origin of our word 'paradise'",
        "'Kesi' means 'cut silk' — named for the small gaps that appear at color boundaries",
        "Imperial Chinese kesi robes required months of work and communicated rank through dragon claw count",
      ],
      references: [
        { title: "Palace Museum — Kesi Collection", url: "https://www.dpm.org.cn/collection/weave.html" },
        { title: "Nishijin Textile Center, Kyoto", url: "https://www.nishijin.or.jp/eng/" },
        { title: "V&A — Asian Textiles Collection", url: "https://www.vam.ac.uk/collections/asian-textiles" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "tapestry-03-q1",
          type: "History Spotlight",
          challenge: `  A museum label reads:

  "Kesi panel, China, Song Dynasty (960–1279 CE)
   Silk, gold thread
   Weft: approximately 80 threads per centimeter
   Subject: Lotus pond with mandarin ducks"

  The Chinese characters for Kesi (缂丝) literally
  translate as two words. One means 'to carve' or
  'to cut.' The other means 'silk.'`,
          text: "What does 'Kesi' literally mean, and what feature of the weave inspired this name?",
          options: [
            "'Painted silk' — because kesi looks like a painting",
            "'Cut silk' — because small gaps appear at the boundaries between colors",
            "'Royal silk' — because it was reserved for emperors",
            "'Woven silk' — distinguishing it from other silk techniques",
          ],
          correctIndex: 1,
          explanation: "'Cut silk' (缂丝, kè sī) — named for the characteristic tiny gaps that appear where two colors meet in kesi tapestry. Because the weft threads in each color area only travel back and forth within that area (not across the whole width), small slits form at the color boundaries. These are part of the technique's signature appearance, not a flaw.",
        },
        {
          id: "tapestry-03-q2",
          type: "Technique Quiz",
          challenge: `  A master tsuzure-ori weaver in Kyoto demonstrates:
  she holds no shuttle, no comb, no tool.

  Instead, she uses her own hand — specifically,
  the fingernails of her right hand, which have been
  carefully filed into a serrated, comb-like edge.

  She uses these to press each weft thread precisely
  into place, one by one.`,
          text: "Which country's tapestry tradition uses this distinctive fingernail technique?",
          options: [
            "China",
            "Persia (Iran)",
            "India",
            "Japan",
          ],
          correctIndex: 3,
          explanation: "Japan's tsuzure-ori tradition! Tsuzure weavers in Kyoto's Nishijin district file their fingernails into serrated edges and use them as living combs to press each silk weft thread into place. The technique produces tapestry of extraordinary precision and is still practiced today. Tsuzure-ori obi sashes are among the most prized in traditional Japanese textile arts.",
        },
        {
          id: "tapestry-03-q3",
          type: "Regional ID",
          challenge: `  A tapestry design shows:
  • A rectangular garden divided into four quarters
    by water channels running from a central fountain
  • Flowering trees: cypress, pomegranate, rose
  • Birds: nightingales, peacocks
  • A border of geometric star patterns

  The word for this garden concept comes from
  Old Persian 'pairidaeza' — a walled garden.
  This same word gave English its word 'paradise.'`,
          text: "Which tapestry tradition features the 'paradise garden' as its most characteristic subject?",
          options: [
            "Chinese kesi",
            "Flemish millefleur",
            "Persian tapestry",
            "Navajo weaving",
          ],
          correctIndex: 2,
          explanation: "Persian tapestry! The paradise garden (from Old Persian 'pairidaeza') was the central subject of Persian textile arts. These walled gardens with water channels, flowering plants, and birds represented paradise on earth — and the tapestries were meant to bring that paradise indoors during harsh winters. The word 'paradise' in English, French, and many other languages comes directly from this Persian garden concept.",
        },
        {
          id: "tapestry-03-q4",
          type: "History Spotlight",
          challenge: `  An Imperial Chinese robe at the Palace Museum shows:
  • Color: bright yellow (reserved for the emperor)
  • Center front: a dragon facing forward, five claws
  • Center back: same dragon, five claws
  • Shoulders: two more five-clawed dragons

  A prince's robe in the same collection shows
  dragons with only four claws.`,
          text: "In Chinese imperial kesi robes, what did the number of claws on a dragon communicate?",
          options: [
            "The dragon's age — older dragons had more claws",
            "The owner's rank — five-clawed dragons were the emperor's exclusive symbol",
            "The region of China where the robe was made",
            "The season — five claws for summer, four for winter",
          ],
          correctIndex: 1,
          explanation: "Rank! Five-clawed front-facing dragons were the emperor's exclusive symbol. Four-clawed dragons were worn by princes of the highest rank; three-clawed by lesser nobles. These distinctions were law — wearing a five-clawed dragon without imperial permission was considered treason. The entire visual language of Chinese court dress was encoded in the tapestry weave.",
        },
      ],
    },
  },

  // ─── tapestry-04: The Americas ───────────────────────────────────────────────
  {
    epochId: "tapestry",
    wonder: { name: "National Museum of the American Indian", location: "Washington D.C., USA", era: "Pre-Columbian & Living Tradition", emoji: "🌵" },
    id: "tapestry-04",
    order: 4,
    title: "Weavers of the Americas",
    subtitle: "Andean tapestry and Navajo weaving — two great independent traditions",
    category: "arts",
    xp: 100,
    badge: { id: "tapestry-badge-04", name: "Earth & Thread", emoji: "🌵" },
    challengeType: "quiz",
    info: {
      tagline: "Separated by thousands of miles, two cultures independently perfected the art of weaving color and story into cloth.",
      year: -500,
      overview: [
        "Long before European contact, the civilizations of the Andes mountains developed tapestry techniques that have never been surpassed for fineness. Andean weavers — in what is now Peru, Bolivia, and Ecuador — achieved weft counts of over 100 threads per centimeter in some pieces, using camelid fibers (alpaca and vicuña) and natural dyes to create textiles of extraordinary refinement. These were not decorative objects: in Andean culture, textiles were among the most important expressions of social identity, spiritual belief, and political power. The Inca required conquered peoples to contribute textile labor as a form of taxation.",
        "Navajo weaving of the American Southwest is a living tradition with a documented history stretching back to the 17th century, though the Diné (Navajo people) learned weaving from the Pueblo peoples even earlier. Classic Navajo blankets and rugs are immediately recognizable: bold geometric patterns in deep reds, blacks, and whites, woven on a vertical upright loom. The brilliant red traditionally came from bayeta (Spanish flannel cloth) that Navajo weavers would unravel and reweave — a remarkable repurposing of trade goods into something uniquely their own.",
        "Both traditions share important characteristics: vertical looms, weft-faced structure, and the use of locally available natural fibers and dyes. Both also share the understanding that weaving is not merely craft but a fundamental cultural act. For the Navajo, weaving is a gift from Spider Woman (Ná'ashjé'ii Asdzáá), who taught the first Diné woman to weave on a loom whose warp was made of sky and earth. The technical and the sacred are woven together as inseparably as warp and weft.",
      ],
      technical: {
        title: "Natural Dyes — Color from the Earth",
        body: [
          "Both Andean and Navajo traditions used extraordinary natural dyes before synthetic colors arrived. The brilliant reds in both traditions often came from cochineal — tiny scale insects that live on prickly pear cactus and produce a carmine dye of exceptional richness and lightness-fastness. Navajo weavers later obtained cochineal-dyed Spanish bayeta wool and unraveled it for reweaving.",
          "You can explore natural dyeing at home with simple materials: onion skins produce warm golds and oranges; avocado pits and skins give soft pink-beige tones; black tea creates soft browns; turmeric gives brilliant (but not lightfast) yellow. For a first natural dye experiment, simmer yellow onion skins in water for 30 minutes, strain, add pre-wetted wool yarn, simmer 45 minutes, and rinse. The result is a warm amber-gold that connects you directly to thousands of years of dye tradition.",
        ],
        codeExample: {
          label: "Simple natural dye color chart",
          code: `  NATURAL DYE SOURCES (beginner-friendly):

  🟡  Yellow onion skins  →  warm gold / amber
  🟠  Madder root         →  terra cotta / brick red
  🟤  Walnut hulls        →  rich brown (mordant-free)
  🟢  Nettles             →  soft olive green
  🩷  Avocado pits/skins  →  dusty pink / blush
  ⬛  Iron water          →  grays and blacks (modifier)
  🔴  Cochineal insects   →  brilliant crimson / scarlet

  Mordants (alum is safest for beginners) help the
  dye bond to the fiber and improve lightfastness.`,
        },
      },
      incident: {
        title: "The Paracas Textiles — Finest Cloth Ever Made",
        when: "~300 BCE – 200 CE",
        where: "Paracas Peninsula, Peru",
        impact: "Cultural significance: Burial textiles found on the Paracas Peninsula are the finest pre-Columbian textiles ever discovered — mummy bundles wrapped in layers of extraordinarily detailed embroidered mantles with up to 100 threads per centimeter.",
        body: [
          "In 1925, archaeologist Julio Tello excavated mummy bundles on the Paracas Peninsula of Peru and discovered textiles of almost impossible fineness — hundreds of intricately embroidered and woven mantles, each wrapped around the mummies of members of Paracas society who died between 300 BCE and 200 CE. The figures depicted on these textiles — supernatural beings, flying shamans, trophy heads — are so detailed that scholars have spent a century decoding their iconographic language.",
          "These textiles were not merely burial goods — they were the measure of a person's spiritual power and social standing. The finest pieces required years of work by skilled artisans working with thread so fine that a single strand must be held up to bright light to be visible at all. Some Paracas textiles are so delicate that they have partially dissolved into the air — visible as impression in the burial soil rather than as intact cloth. Those that survive are distributed among museums worldwide; the largest collection is in Lima, Peru.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Andean Alpaca & Vicuña", sub: "camelid fiber, ultra-fine thread", type: "attacker" },
          { label: "Natural Plant & Insect Dyes", sub: "cochineal, indigo, plants", type: "system" },
          { label: "Vertical Upright Loom", sub: "shared by both traditions", type: "victim" },
          { label: "Textile as Cultural Language", sub: "identity, rank, spirituality", type: "result" },
        ],
      },
      timeline: [
        { year: -3000, event: "Evidence of weaving in coastal Peru — one of earliest known textile traditions" },
        { year: -300, event: "Paracas textiles — among finest ever made, discovered in 1925", highlight: true },
        { year: 1500, event: "Inca Empire uses textile tribute — woven cloth as political currency" },
        { year: 1650, event: "Navajo weaving tradition established — learned from Pueblo peoples" },
        { year: 1800, event: "Classic Navajo blanket period — bold geometric designs, bayeta red" },
        { year: 2024, event: "Both traditions actively maintained — Navajo Nation weaving, Andean artisan cooperatives" },
      ],
      keyTakeaways: [
        "Andean weavers achieved over 100 weft threads per centimeter — never surpassed in technical fineness",
        "Navajo brilliant red traditionally came from unraveled Spanish bayeta cloth dyed with cochineal",
        "Cochineal — tiny insects on cactus — produces the richest natural red dye known",
        "For the Diné (Navajo), weaving is a gift from Spider Woman — the technical and sacred are unified",
        "In Andean cultures, textiles communicated social rank, spiritual power, and political authority",
      ],
      references: [
        { title: "National Museum of the American Indian — Weaving Collection", url: "https://americanindian.si.edu/" },
        { title: "Textile Museum — Andean Collection", url: "https://museumoftextiles.com/collections/andean-textiles/" },
        { title: "Navajo Nation Weaving — Hubbell Trading Post NPS", url: "https://www.nps.gov/hutr/learn/historyculture/navajo-weaving.htm" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "tapestry-04-q1",
          type: "History Spotlight",
          challenge: `  A museum card reads:
  "Andean tapestry tunic, Peru, ~500 CE
   Fiber: camelid (alpaca/vicuña)
   Weft count: 80–120 per centimeter
   Colors: 12 distinct hues
   Size: 36 × 28 inches"

  For comparison, a fine wool suit fabric today
  has approximately 50 threads per centimeter total
  (warp and weft combined).`,
          text: "What made Andean tapestry technically remarkable compared to modern fabric?",
          options: [
            "It used synthetic fibers hundreds of years before they were invented elsewhere",
            "The weft count was finer than almost anything produced in modern factories",
            "It was woven on a horizontal loom, unique to the Americas",
            "It required no mordant dyes — colors were inherent in the camelid fiber",
          ],
          correctIndex: 1,
          explanation: "The technical fineness of Andean tapestry is staggering — up to 120 weft threads per centimeter in some pieces. Modern machine-woven fabric typically has 40–60 combined warp and weft threads per centimeter. These Andean artisans, working by hand with handspun camelid fiber (alpaca and vicuña), achieved what modern machinery still cannot consistently replicate.",
        },
        {
          id: "tapestry-04-q2",
          type: "Color Mixing",
          challenge: `  A Navajo weaver in 1830 wants to create a
  vibrant red section in her blanket.

  She has access to:
  • Spanish bayeta (a red flannel trade cloth)
  • Indigo-dyed wool (blue)
  • Natural white churro wool
  • Local plant dyes (producing yellows and greens)

  Red bayeta was so expensive that she unravels
  the cloth, 're-spins' the threads finer,
  and reweaves them into her tapestry.`,
          text: "What was the source of the brilliant red in classic Navajo weaving, and how was it obtained?",
          options: [
            "Red rock dust from the Canyon de Chelly mixed with pine resin",
            "Cochineal insects harvested directly from local cactus",
            "Spanish bayeta flannel cloth unraveled and rewoven into the tapestry",
            "A red clay-based dye unique to the Navajo Nation",
          ],
          correctIndex: 2,
          explanation: "Spanish bayeta cloth — trade flannel dyed with cochineal — was unraveled by Navajo weavers, re-spun into finer threads, and rewoven. This remarkable practice turned trade goods into something entirely their own. The bayeta red is instantly recognizable in classic Navajo textiles — a deep, saturated scarlet that no other dye of the era could match in vibrancy.",
        },
        {
          id: "tapestry-04-q3",
          type: "Cultural Trivia",
          challenge: `  In the Diné (Navajo) creation story:

  Spider Woman (Ná'ashjé'ii Asdzáá) taught
  the first Diné woman to weave.

  The loom's warp was made of:
  • The vertical (warp) threads: sky and earth
  • The weaving tools: sun rays and rock crystal
  • The heddle: a white shell
  • The comb: an eagle feather`,
          text: "In Navajo tradition, what does this creation story convey about weaving?",
          options: [
            "That weaving is a purely practical skill for making clothing",
            "That weaving connects the material world to the spiritual — it is a sacred act",
            "That weaving was borrowed from neighboring Pueblo peoples",
            "That only women are permitted to weave in Navajo tradition",
          ],
          correctIndex: 1,
          explanation: "In Navajo tradition, weaving is a sacred gift connecting earth, sky, and the human world. The loom's materials in the creation story — sky, earth, sun rays, crystal — show that weaving is not merely craft but a spiritual practice. For the Diné, a well-woven rug carries the weaver's prayers and spirit into the cloth. This integration of technical mastery and spiritual meaning is one of the things that makes Navajo weaving so profound.",
        },
        {
          id: "tapestry-04-q4",
          type: "Natural Dye Quiz",
          challenge: `  You want to dye a skein of natural white wool yarn.
  You have these things in your kitchen:

  A) Yellow onion skins (the papery outer layers)
  B) A jar of turmeric powder
  C) Avocado pits and skins
  D) Black tea bags

  Each will give a different result. No special
  equipment needed — just a pot, water, and the
  material.`,
          text: "Which of these natural kitchen dyes will give you the softest, most unexpected color — a delicate blush pink?",
          options: [
            "A — yellow onion skins, which give warm gold",
            "B — turmeric, which gives brilliant yellow",
            "C — avocado pits and skins, which give a surprising dusty pink",
            "D — black tea, which gives warm tan-brown",
          ],
          correctIndex: 2,
          explanation: "Avocado pits and skins! The tannins in avocado produce a beautiful, subtle dusty pink or blush tone on wool — completely unexpected from something so dark green-brown. Simmer the pits and skins in water for an hour, strain, add your wet wool, and simmer gently. The color that emerges will surprise you. This is one of the great delights of natural dyeing: the dye bath and the result often look nothing alike.",
        },
      ],
    },
  },

  // ─── tapestry-05: Color Theory for Weavers ───────────────────────────────────
  {
    epochId: "tapestry",
    wonder: { name: "Kelmscott Manor", location: "Oxfordshire, England", era: "Arts & Crafts Movement, 1870s", emoji: "🌿" },
    id: "tapestry-05",
    order: 5,
    title: "The Colors of the Loom",
    subtitle: "Color theory for weavers — mixing, harmony, and the feel of color",
    category: "arts",
    xp: 150,
    badge: { id: "tapestry-badge-05", name: "Color Weaver", emoji: "🎨" },
    challengeType: "quiz",
    info: {
      tagline: "Color in tapestry is not mixed on a palette — it is built thread by thread, and the result is alive.",
      year: 1870,
      overview: [
        "Color in tapestry works differently from color in painting. A painter mixes pigments physically — blue and yellow make green on the palette. A weaver mixes colors optically — blue and yellow threads placed close together (or alternating) create the impression of green to the eye, but each thread remains physically separate. Understanding both kinds of mixing is fundamental to tapestry design.",
        "The basic color wheel applies directly to tapestry: red, yellow, and blue are primary colors. Mix any two primaries to get secondaries: red + yellow = orange, yellow + blue = green, blue + red = violet. Mix a primary with the secondary opposite it (called a complementary pair) and you get a color that seems to vibrate with energy — blue and orange, red and green, yellow and violet. Used carefully, complementary colors create the most eye-catching tapestries.",
        "Warm colors (reds, oranges, yellows) seem to advance toward the eye — they feel close, energetic, warm. Cool colors (blues, greens, violets) seem to recede — they feel distant, calm, restful. This effect can be used deliberately in tapestry design: a warm-colored figure on a cool-colored background will always stand out and feel present. A pale cool figure on a warm background can feel mysterious and receding. Every color decision is also a feeling decision.",
      ],
      technical: {
        title: "Color Mixing on the Loom",
        body: [
          "There are three ways to mix color in tapestry: (1) Blending in the yarn preparation — two strands of different colors held together and woven as one thread. The colors physically combine in the needle, creating a heathered blend. (2) Hatching — alternating rows or wedges of two colors so they intermingle visually in the weave. (3) Optical mixing — placing small areas of pure colors adjacent to each other so the eye blends them from a distance, like the Impressionist painters.",
          "For your first color exploration: take three primary colors of yarn (red, yellow, blue) and weave small samples using each technique. Weave a row of red, then a row of yellow — they stay separate. Now weave alternating stitches of red and yellow in the same row — from a distance this looks orange. Now hold one red and one yellow strand together and weave them as a single thread — the result is a warm, blended orange-red. Same three colors, three completely different visual results.",
        ],
        codeExample: {
          label: "Color wheel for tapestry weavers",
          code: `         YELLOW 🟡
            /    \\
           /      \\
  🟢 Green        Orange 🟠
         |          |
  🔵 Blue          Red 🔴
           \\      /
            \\    /
          Violet 🟣

  PRIMARY colors:    Red · Yellow · Blue
  SECONDARY colors:  Orange · Green · Violet

  COMPLEMENTARY pairs (maximum contrast):
    Red   ←→  Green
    Blue  ←→  Orange
    Yellow ←→  Violet

  WARM colors: Red, Orange, Yellow → advance
  COOL colors: Blue, Green, Violet → recede`,
        },
      },
      incident: {
        title: "William Morris — The Crusade for Natural Color",
        when: "1870s–1890s",
        where: "Kelmscott Manor, Oxfordshire, and Merton Abbey Mills, London",
        impact: "Cultural significance: Morris refused synthetic aniline dyes and spent decades perfecting natural dye recipes, single-handedly reviving vegetable dyeing in England and inspiring the Arts & Crafts movement.",
        body: [
          "William Morris (1834–1896) — poet, designer, socialist, and one of the great creative minds of the 19th century — was furious about synthetic aniline dyes. Invented in 1856, these cheap chemical dyes quickly replaced natural dyeing throughout the textile industry. Morris found their colors garish, unstable, and aesthetically dead. 'I must learn to dye myself,' he wrote, and he meant it literally.",
          "Morris spent years mastering indigo, weld (yellow), madder (red), and other historical dyes. He set up his own dyehouse at Merton Abbey Mills in London, where he dyed the wools for his tapestries and carpets according to recipes he researched from medieval sources. His tapestry designs — 'Woodpecker,' 'Orchard,' 'The Forest' — use a palette of deep blue-greens, warm russets, and dusty golds that feel completely harmonious, like a garden seen through old glass. You can see his tapestries today at the Victoria and Albert Museum in London.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Primary Colors", sub: "red, yellow, blue", type: "attacker" },
          { label: "Color Mixing", sub: "physical, optical, hatching", type: "system" },
          { label: "Warm vs Cool", sub: "advance vs recede", type: "victim" },
          { label: "Harmony & Contrast", sub: "complementary pairs", type: "result" },
        ],
      },
      timeline: [
        { year: 1666, event: "Newton publishes Opticks — first scientific description of the color spectrum and primary colors" },
        { year: 1810, event: "Goethe's Theory of Colors — emotional and psychological dimensions of color described" },
        { year: 1839, event: "Chevreul publishes color harmony principles — directly influences tapestry and painting" },
        { year: 1856, event: "Synthetic aniline dyes invented — Morris's enemy; cheap but garish" },
        { year: 1880, event: "William Morris establishes Merton Abbey dyehouse — natural dye revival", highlight: true },
        { year: 1912, event: "Itten and the Bauhaus develop color theory that still underpins art education today" },
      ],
      keyTakeaways: [
        "Primary colors: red, yellow, blue. Mix any two to get a secondary color.",
        "Complementary colors (opposites on the wheel) create maximum vibration and contrast",
        "Warm colors advance; cool colors recede — use this to push subjects forward or back",
        "Color in tapestry mixes optically as well as physically — hatching creates color blending",
        "William Morris proved that natural dyes produce more harmonious color than synthetic alternatives",
      ],
      references: [
        { title: "V&A — William Morris Tapestry Collection", url: "https://www.vam.ac.uk/articles/william-morris" },
        { title: "Josef Albers 'Interaction of Color' — Online Edition", url: "https://yupnet.org/interactionofcolor/" },
        { title: "Natural Dye Introduction — Dharma Trading", url: "https://www.dharmatrading.com/techniques/natural-dyeing.html" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "tapestry-05-q1",
          type: "Color Mixing",
          challenge: `  COLOR WHEEL MIXING CHALLENGE:

  You have three skeins of yarn on your table:

  🔴  Scarlet red
  🔵  Cobalt blue
  🟡  Cadmium yellow

  You want to weave a section that looks GREEN.`,
          text: "Which two colors do you combine to make green?",
          options: [
            "Red + Blue",
            "Blue + Yellow",
            "Red + Yellow",
            "All three colors together",
          ],
          correctIndex: 1,
          explanation: "Blue + Yellow = Green! This is a fundamental primary color mix. On the color wheel, green sits exactly between blue and yellow — it is their secondary mixture. Red + Blue = Violet. Red + Yellow = Orange. All three primaries mixed together produce a muddy brown-gray. Keep your mixing to two colors at a time for the clearest results.",
        },
        {
          id: "tapestry-05-q2",
          type: "Color Mixing",
          challenge: `  SECONDARY COLOR CHALLENGE:

  Primary colors: 🔴 Red  🔵 Blue  🟡 Yellow

  You want to weave a section that looks ORANGE.
  Then a section that looks VIOLET (purple).

  Match each secondary color with its recipe.`,
          text: "What are the correct mixes for orange and violet?",
          options: [
            "Orange = Red + Blue;   Violet = Yellow + Blue",
            "Orange = Red + Yellow; Violet = Blue + Red",
            "Orange = Yellow + Blue; Violet = Red + Yellow",
            "Orange = Blue + Red;   Violet = Yellow + Red",
          ],
          correctIndex: 1,
          explanation: "Orange = Red + Yellow. Violet = Blue + Red. These are two of the three secondary colors: Orange (R+Y), Green (B+Y), and Violet (B+R). A helpful memory: mix the two primaries on either side of the secondary color on the wheel. Orange sits between red and yellow. Violet sits between blue and red. Green sits between blue and yellow.",
        },
        {
          id: "tapestry-05-q3",
          type: "Color Feel",
          challenge: `  A weaver is designing a tapestry landscape:

  • Mountains in the background
  • A flower garden in the foreground

  She wants the mountains to feel far away and
  restful. She wants the flowers to pop forward
  and feel warm and energetic.

  She has: 🔴 red, 🟠 orange, 🟡 yellow,
           🟢 green, 🔵 blue, 🟣 violet`,
          text: "Which colors should she use for the MOUNTAINS (receding), and which for the FLOWERS (advancing)?",
          options: [
            "Mountains: warm reds and oranges. Flowers: cool blues and greens.",
            "Mountains: cool blues and greens. Flowers: warm reds and oranges.",
            "Mountains: bright yellows. Flowers: dark violets.",
            "Color temperature has no effect on perceived depth in tapestry.",
          ],
          correctIndex: 1,
          explanation: "Cool colors (blues, greens, violets) recede — they feel distant and restful. Warm colors (reds, oranges, yellows) advance — they feel close, energetic, and warm. This is why mountain ranges in painting and tapestry are almost always depicted in cool blues and grays — the atmosphere makes distant things cooler and paler. Flowers and near objects in warm colors naturally pop forward. This is one of color theory's most useful practical tools.",
        },
        {
          id: "tapestry-05-q4",
          type: "Complementary Colors",
          challenge: `  COMPLEMENTARY COLOR PAIRS:
  (Colors directly opposite each other on the color wheel)

     🔴 Red      ←→      🟢 Green
     🔵 Blue     ←→      🟠 Orange
     🟡 Yellow   ←→      🟣 Violet

  A weaver places a small red bird on a
  background of deep green leaves.`,
          text: "Why do complementary colors placed next to each other create such a powerful visual effect?",
          options: [
            "They are the same brightness, so they blend smoothly",
            "They stimulate opposite responses in the eye, creating maximum contrast and apparent vibrancy",
            "They are always warm colors, which makes them feel exciting",
            "Complementary colors can only be used in traditional tapestry, not modern designs",
          ],
          correctIndex: 1,
          explanation: "Complementary colors are opposite on the color wheel, which means they stimulate opposite color receptors in the eye simultaneously. The result is maximum contrast — each color makes the other appear MORE vivid than it would alone. A red bird looks redder against green than it would against any other color. This is why holiday decorations (red and green), traffic signs (yellow and violet), and great tapestries all use complementary pairs for maximum visual impact.",
        },
      ],
    },
  },

  // ─── tapestry-06: Warp and Weft ──────────────────────────────────────────────
  {
    epochId: "tapestry",
    wonder: { name: "Manufacture des Gobelins", location: "Paris, France", era: "Since 1662", emoji: "🇫🇷" },
    id: "tapestry-06",
    order: 6,
    title: "Warp and Weft",
    subtitle: "The fundamental structure of weaving — understanding over and under",
    category: "arts",
    xp: 150,
    badge: { id: "tapestry-badge-06", name: "Structure Builder", emoji: "🇫🇷" },
    challengeType: "quiz",
    info: {
      tagline: "Two sets of threads. One goes over the other. From this simple principle, everything follows.",
      year: 1662,
      overview: [
        "All weaving — tapestry, cloth, carpet, or canvas — is built from the same simple principle: two sets of threads crossing each other at right angles. The threads that run up and down (vertically) on the loom are called the warp. The threads that run from side to side (horizontally), interlacing with the warp, are called the weft. The warp is stretched taut on the loom and stays fixed; the weft is worked in row by row, going over and under alternate warp threads.",
        "In plain weave cloth, both warp and weft are visible and roughly equal in prominence. In tapestry, the weft is packed down so firmly that it buries the warp completely — you see only weft. The warp threads serve as an invisible structural skeleton; the weft carries all the color and image. This is why tapestry weavers choose a strong, non-fuzzy yarn for warp (cotton string, linen, or tightly twisted wool) and a softer, more colorful yarn for weft.",
        "The key operation in weaving is creating the 'shed' — a gap between alternate warp threads through which the weft can pass. On simple frame looms, beginners create the shed by hand, weaving over-one-under-one with a needle or shuttle. On tapestry looms with a heddle, a bar or row of loops can be lifted to separate alternate warp threads and create the shed automatically. Understanding shed and counter-shed is the mechanical foundation of all weaving.",
      ],
      technical: {
        title: "Setting Up a Simple Frame Loom",
        body: [
          "A frame loom is the easiest starting point — you can buy one, or make one from a picture frame and nails. Hammer small nails or screws along the top and bottom edges, spaced about 1 cm apart (for a beginner weight). Wind your warp thread (smooth cotton string works perfectly) from bottom nail to top nail and back, going around each nail in sequence. Pull snug but not desperately tight — the warp should have firm tension but the frame shouldn't bow.",
          "Once warped, you're ready to weave. Thread a tapestry needle with weft yarn. Starting at the bottom, weave over the first warp thread, under the second, over the third, under the fourth — all the way across. Beat gently down with your fingers or a comb. On the next row, reverse: under the first, over the second, under the third. This over-one-under-one alternation is the foundation of all tapestry. Every additional technique — hatching, soumak, rya knots — builds on this simple structure.",
        ],
        codeExample: {
          label: "Over-under structure (top view)",
          code: `  WARP threads (vertical, always fixed):
  |    |    |    |    |    |    |    |
  ↑    ↑    ↑    ↑    ↑    ↑    ↑    ↑

  WEFT thread (horizontal, woven in):
  Row 1: OVER · under · OVER · under · OVER · under
         ─────  . . .  ─────  . . .  ─────  . . .

  Row 2: under · OVER · under · OVER · under · OVER
         . . .  ─────  . . .  ─────  . . .  ─────

  The alternating over-under LOCKS the rows together.
  In tapestry, MANY rows are packed tightly on top
  of each other until the warp is completely hidden.`,
        },
      },
      incident: {
        title: "The Gobelins — France's Royal Tapestry Factory",
        when: "Since 1662",
        where: "Paris, France (still operating today)",
        impact: "Cultural significance: Founded by Louis XIV as a royal manufactory, the Gobelins has woven for French kings, presidents, and foreign heads of state for over 360 years without interruption.",
        body: [
          "In 1662, Louis XIV's finance minister Jean-Baptiste Colbert purchased the Gobelin family's dyehouse on the left bank of the Seine in Paris and converted it into the Royal Manufactory of Crown Furniture — later simply known as the Gobelins. Louis's intention was to make France self-sufficient in luxury goods, ending the massive payments to Flemish and Italian workshops that had drained French wealth. The Gobelins would weave tapestries equal to or better than anything Flanders could produce.",
          "The Gobelins achieved this goal spectacularly. Under the artistic direction of Charles Le Brun, it produced some of the greatest tapestries of the 17th century. It has never stopped operating — today it still weaves large tapestries for French state gifts and public buildings, still using traditional high-warp looms and many of the same techniques Le Brun's weavers used. You can visit and watch weavers at work. The warp, the weft, the over-and-under: unchanged in 360 years.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Warp", sub: "vertical, fixed, hidden in tapestry", type: "system" },
          { label: "Weft", sub: "horizontal, carries color", type: "attacker" },
          { label: "The Shed", sub: "gap between warps for weft to pass", type: "victim" },
          { label: "Beat down", sub: "packing weft tight covers warp", type: "result" },
        ],
      },
      timeline: [
        { year: -3000, event: "Earliest warp-weighted looms in Europe — the fundamental structure unchanged since" },
        { year: 1000, event: "High-warp (vertical) tapestry looms established in Europe" },
        { year: 1662, event: "Gobelins Royal Manufactory founded in Paris", highlight: true },
        { year: 1801, event: "Jacquard loom invented — mechanized shed creation for complex patterns" },
        { year: 1970, event: "Frame loom revival — tapestry weaving accessible to home crafters worldwide" },
        { year: 2024, event: "Gobelins still weaves on traditional looms in Paris — the living tradition continues" },
      ],
      keyTakeaways: [
        "Warp = vertical threads on the loom, always fixed and under tension",
        "Weft = horizontal threads, woven in row by row, carries all the color in tapestry",
        "The 'shed' is the gap between alternate warp threads through which the weft passes",
        "Over-one-under-one alternating rows lock the weave structure together",
        "In tapestry, the weft is beaten down firmly until it completely covers the warp",
      ],
      references: [
        { title: "Manufacture des Gobelins — Visit Information", url: "https://www.mobiliernational.culture.gouv.fr/fr/les-lieux/manufacture-des-gobelins" },
        { title: "How to Warp a Frame Loom — YouTube Tutorial (Annie Cholewa)", url: "https://www.youtube.com/results?search_query=warp+frame+loom+tapestry+beginner" },
        { title: "Tapestry Weaving Basics — Mirrix Looms", url: "https://mirrixlooms.com/blogs/mirrix-blog/tapestry-weaving-basics" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "tapestry-06-q1",
          type: "Weaving Basics",
          challenge: `  A loom is set up and ready to weave.
  The vertical threads, stretched taut from
  top to bottom, are under firm tension.

  The horizontal threads will be woven
  in from side to side, going over and
  under the vertical threads.`,
          text: "In weaving, which name goes with which set of threads?",
          options: [
            "Vertical threads = weft; Horizontal threads = warp",
            "Vertical threads = warp; Horizontal threads = weft",
            "Both sets are called warp when on the loom",
            "Vertical threads = shed; Horizontal threads = heddle",
          ],
          correctIndex: 1,
          explanation: "Warp = vertical (up and down), always fixed on the loom. Weft = horizontal (side to side), woven in row by row. A helpful memory: 'warp' sounds like 'up' — and warp threads run up the loom. 'Weft' sounds like 'left' — and weft threads travel left and right. In tapestry, the warp is hidden; the weft carries all the color.",
        },
        {
          id: "tapestry-06-q2",
          type: "Structure Quiz",
          challenge: `  ROW 1 (left to right):
  OVER warp 1 · UNDER warp 2 · OVER warp 3 · UNDER warp 4

  ROW 2 (right to left):
  What is the correct over-under pattern for Row 2?`,
          text: "To lock a plain weave together, how must Row 2 alternate compared to Row 1?",
          options: [
            "Row 2 repeats Row 1 exactly: OVER 1 · UNDER 2 · OVER 3 · UNDER 4",
            "Row 2 reverses Row 1: UNDER 1 · OVER 2 · UNDER 3 · OVER 4",
            "Row 2 skips every other warp thread",
            "Row 2 goes over ALL warp threads without going under any",
          ],
          correctIndex: 1,
          explanation: "Row 2 must be the reverse of Row 1 — UNDER where Row 1 went OVER, and OVER where Row 1 went UNDER. This alternation is what locks the rows together. If both rows went over the same threads, nothing would hold. The alternating over-under is the mechanical foundation of all weaving — and it's also why tapestry has that characteristic ridged texture.",
        },
        {
          id: "tapestry-06-q3",
          type: "Equipment Quiz",
          challenge: `  A weaver has set up her frame loom.
  The warp threads are in place.
  She needs to pass the weft thread through
  the warp to begin weaving.

  On a simple frame loom, she creates a space
  between alternating warp threads by lifting
  every other warp thread — creating a gap.

  What is this gap called?`,
          text: "What is the weaving term for the gap between alternating warp threads through which the weft passes?",
          options: [
            "The gap",
            "The shed",
            "The channel",
            "The weft path",
          ],
          correctIndex: 1,
          explanation: "The shed! This is one of the fundamental terms in weaving. The shed is the opening (or gap) created between alternating warp threads — the space through which the weft passes from one side to the other. On simple frame looms, you create the shed by lifting alternate threads by hand. On more advanced looms, a heddle bar or shaft does this automatically. 'Opening the shed' is the first motion of every single row of weaving.",
        },
        {
          id: "tapestry-06-q4",
          type: "Weaving Basics",
          challenge: `  You are choosing materials for your first
  tapestry project:

  FOR THE WARP you need something:
  → Strong (won't break under tension)
  → Smooth (so weft slides over it easily)
  → Not stretchy (keeps tension stable)

  FOR THE WEFT you need something:
  → Colorful (it's all you'll see)
  → Soft (packs down well)
  → Available in many colors`,
          text: "Which combination makes the best choice for a beginner tapestry?",
          options: [
            "Warp: stretchy jersey yarn. Weft: rigid plastic cord.",
            "Warp: smooth cotton string. Weft: soft wool yarn.",
            "Warp: thick fluffy mohair. Weft: fine metallic thread.",
            "Warp and weft: same yarn for simplicity.",
          ],
          correctIndex: 1,
          explanation: "Smooth cotton string for warp, soft wool for weft — the classic beginner combination. Cotton string is strong, smooth, and has almost no stretch, making it ideal warp material. Wool is soft, available in hundreds of beautiful colors, and packs down beautifully to hide the warp. This combination is used by tapestry weavers from beginners to professionals. Many weavers use cotton seine twine (available at craft stores) as their warp for life.",
        },
      ],
    },
  },

  // ─── tapestry-07: Your First Loom ────────────────────────────────────────────
  {
    epochId: "tapestry",
    wonder: { name: "Bauhaus Archive", location: "Berlin, Germany", era: "1919–1933", emoji: "⬜" },
    id: "tapestry-07",
    order: 7,
    title: "Your First Loom",
    subtitle: "Choosing and setting up equipment for modern tapestry weaving",
    category: "arts",
    xp: 150,
    badge: { id: "tapestry-badge-07", name: "Loom Builder", emoji: "⬜" },
    challengeType: "quiz",
    info: {
      tagline: "The most sophisticated loom in the world is useless until you sit down and begin weaving.",
      year: 1919,
      overview: [
        "The good news about tapestry equipment is that you don't need much. The most basic tapestry loom is a piece of cardboard with notches cut in the top and bottom edges. You warp it with string, weave with a needle and yarn, and produce real tapestry that is structurally identical to what the great Flemish masters made. The technique is not in the equipment — it is in the hands and the eye.",
        "That said, there are real differences between loom types that affect the weaving experience. Frame looms (rigid rectangles of wood with pegs or slots) are the ideal starting point — inexpensive, portable, and versatile. Tapestry looms (larger, often with a built-in shedding device) allow larger work and faster progress. High-warp looms (vertical, like those at the Gobelins) allow the weaver to see the work from the front while weaving — the traditional European setup. Low-warp looms (horizontal) are used in some Flemish traditions, with the weaver working from the back.",
        "For tools, you need relatively little: a tapestry needle (blunt-tipped, with a large eye), a weaving comb or fork (for beating down weft rows), and scissors. Many weavers add a small stick shuttle (a flat stick with a notch at each end for winding yarn) for carrying longer lengths of weft. Everything else is optional. The Bauhaus weaving workshop — which produced some of the 20th century's most influential textile artists, including Anni Albers — began with simple looms and the idea that the most important tool is an educated eye.",
      ],
      technical: {
        title: "Setting Up Your Cardboard Loom (Free!)",
        body: [
          "Cut a piece of stiff cardboard about 20 × 25 cm (8 × 10 inches). Using scissors, cut small notches along the top and bottom edges, spaced about 1 cm apart. These notches hold the warp threads in place. Wind smooth cotton string or crochet thread from bottom notch to top notch and back, going around each pair of notches. You want the warp threads to lie flat and parallel, with even tension — snug but not bowing the cardboard.",
          "Thread a tapestry needle with your chosen weft yarn. Starting at the bottom, weave over-under across all the warp threads, leaving a 10 cm tail at the start. Turn around and come back, reversing the over-under. Beat each row down gently with your fingers. After a few rows, you're weaving tapestry. To change colors, simply cut the yarn, leave a tail, and start the new color. You'll trim or tuck the tails when the piece is finished. This is exactly what professional weavers do — just on a larger, more elaborate version of your cardboard loom.",
        ],
        codeExample: {
          label: "Cardboard loom setup",
          code: `  [TOP of loom with notches]
  ∧∧∧∧∧∧∧∧∧∧∧∧∧∧∧∧∧∧∧∧∧

  |  |  |  |  |  |  |  |  ← warp threads
  |  |  |  |  |  |  |  |    (cotton string)
  |  |  |  |  |  |  |  |
  |  |  |  |  |  |  |  |
  ══ == ══ == ══ == ══ ==  ← weft (your colors!)
  |  |  |  |  |  |  |  |
  |  |  |  |  |  |  |  |

  ∨∨∨∨∨∨∨∨∨∨∨∨∨∨∨∨∨∨∨∨∨
  [BOTTOM of loom with notches]

  TOOLS NEEDED: cardboard, string, tapestry needle,
  wool yarn, scissors. Total cost: often under $5.`,
        },
      },
      incident: {
        title: "Anni Albers and the Bauhaus Weaving Workshop",
        when: "1922–1933",
        where: "Dessau, Germany",
        impact: "Cultural significance: Anni Albers, working at the Bauhaus with simple looms, produced textile art of such intellectual depth that she became the first textile artist to have a solo show at the Museum of Modern Art, New York (1949).",
        body: [
          "When Anni Fleischmann arrived at the Bauhaus school in 1922, women were quietly steered toward the weaving workshop — the school's founders considered it the appropriate 'feminine' department. Anni Albers (as she became after marrying fellow Bauhaus student Josef Albers) transformed this slight into a triumph. She spent years mastering the loom, studying the structure of thread with scientific rigor, and developing a visual language in textile that was entirely original.",
          "Albers' insight was that the loom itself is a visual medium — the warp and weft structure, the repetition, the grid — these are not limitations to overcome but the very nature of the art. Her weavings explore pattern, texture, and optical effect with the precision of a composer working with musical intervals. She went on to teach, write (her book 'On Weaving' is still in print and essential reading), and exhibit worldwide. She did all of this with, essentially, the same tools available to any beginner today.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Cardboard Loom", sub: "free, start today", type: "attacker" },
          { label: "Frame Loom", sub: "best beginner purchase", type: "system" },
          { label: "Tapestry Loom", sub: "for larger work, more speed", type: "victim" },
          { label: "High-Warp Loom", sub: "professional, Gobelins tradition", type: "result" },
        ],
      },
      timeline: [
        { year: -8000, event: "Warp-weighted looms in use — stones weighing warp threads, worked standing" },
        { year: 1200, event: "High-warp vertical tapestry looms established in European workshops" },
        { year: 1800, event: "Rigid heddle frame looms become widely available for home use" },
        { year: 1922, event: "Bauhaus weaving workshop — Anni Albers begins transforming textile into fine art", highlight: true },
        { year: 1960, event: "Fiber arts revival — frame looms popularized for home crafters in USA and Europe" },
        { year: 2024, event: "Beginners' frame looms and online tutorials make tapestry more accessible than ever" },
      ],
      keyTakeaways: [
        "A cardboard loom works — you can begin tapestry weaving today for almost no cost",
        "Frame looms are the best first purchase: versatile, portable, inexpensive",
        "Essential tools: tapestry needle, weaving comb, scissors — nothing more is strictly needed",
        "High-warp looms are vertical; low-warp looms are horizontal — both produce true tapestry",
        "Anni Albers proved the most sophisticated art can come from the simplest equipment",
      ],
      references: [
        { title: "Anni Albers Foundation — Her Life and Work", url: "https://www.anniealbers.com/" },
        { title: "Mirrix Tapestry Looms — Beginner Guide", url: "https://mirrixlooms.com/blogs/mirrix-blog" },
        { title: "DIY Cardboard Loom Tutorial — Yarn Barn", url: "https://www.yarnbarn-ks.com/pages/tapestry-weaving" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "tapestry-07-q1",
          type: "Equipment Quiz",
          challenge: `  You want to start weaving tapestry TODAY.
  You have at home:

  ✓ A piece of stiff cardboard (cereal box works)
  ✓ Scissors
  ✓ Cotton string or crochet thread
  ✓ Wool yarn in a few colors
  ✓ A large blunt needle (or a fork from the kitchen)

  Is this enough to begin?`,
          text: "Can you weave real tapestry with just cardboard, string, yarn, and a needle?",
          options: [
            "No — you need a proper wooden loom to produce real tapestry",
            "Yes — a cardboard loom makes structurally identical tapestry to any other loom",
            "Only if the cardboard is at least 2cm thick and rigid",
            "No — cardboard warps too easily; you need a metal frame",
          ],
          correctIndex: 1,
          explanation: "Yes! A cardboard loom produces real, structurally correct tapestry. The loom is just a device for holding the warp threads under tension while you weave — and cardboard does this perfectly well for small pieces. Cut notches along the top and bottom edges, warp with cotton string, and you're ready to weave. Many experienced weavers still use cardboard looms for small samples and travel projects.",
        },
        {
          id: "tapestry-07-q2",
          type: "Equipment Quiz",
          challenge: `  LOOM TYPES compared:

  TYPE A: A rigid wooden rectangle with pegs
          along top and bottom. Portable. Sits
          flat on a table or propped against a wall.

  TYPE B: A larger free-standing vertical structure
          with a built-in heddle mechanism and
          adjustable tension. Designed for large works.

  TYPE C: A device about 30cm wide, with a rigid
          heddle bar that creates the shed by lifting.
          Fast for cloth; less flexible for tapestry.`,
          text: "Which type (A, B, or C) is the recommended first tapestry loom for a beginner?",
          options: [
            "Type C — the rigid heddle loom, because it's the fastest",
            "Type B — the floor loom, because it can do the most",
            "Type A — the frame loom, because it's versatile, portable, and inexpensive",
            "None of the above — beginners should use a cardboard loom only",
          ],
          correctIndex: 2,
          explanation: "Type A — the frame loom — is the ideal beginner tapestry loom. It's inexpensive ($20–$60 for a good one), portable, requires no assembly, and works well for pieces up to its frame size. Rigid heddle looms (Type C) are designed for cloth weaving and aren't ideal for tapestry. Floor looms (Type B) are wonderful but expensive and require significant space. Start with a frame loom; you can always grow from there.",
        },
        {
          id: "tapestry-07-q3",
          type: "Equipment Quiz",
          challenge: `  A tapestry needle (sometimes called a yarn needle)
  compared to a regular sewing needle:

  Regular sewing needle:
  • Sharp pointed tip
  • Small eye for fine thread

  Tapestry needle:
  • _______________ tip
  • _______________ eye`,
          text: "How does a tapestry needle differ from a regular sewing needle?",
          options: [
            "Tapestry needle: sharp tip, small eye — same as sewing but longer",
            "Tapestry needle: blunt tip, large eye — designed to pass through warp gaps, not pierce fabric",
            "Tapestry needle: curved tip, medium eye — for curved weft paths",
            "Tapestry needle: double-ended, no eye — yarn wraps around a groove",
          ],
          correctIndex: 1,
          explanation: "Blunt tip, large eye. The blunt tip is essential — you want the needle to slide between warp threads, not pierce them. A sharp needle would split and weaken the warp. The large eye accommodates the thicker weft yarn. Tapestry needles come in various sizes — the larger the number, the thicker the needle and eye. A size 13 or 14 tapestry needle works well with standard knitting-weight wool weft.",
        },
        {
          id: "tapestry-07-q4",
          type: "Art History",
          challenge: `  Bauhaus, Dessau, Germany, 1926.
  A young woman is directed to the weaving
  workshop — considered less important than
  the painting, sculpture, or architecture studios.

  She spends years studying the structure of
  thread with scientific rigor. Her loom is simple.
  Her understanding becomes profound.

  In 1949, she becomes the first textile artist
  to have a solo exhibition at MoMA New York.`,
          text: "Who is this pioneering textile artist?",
          options: [
            "Gunta Stölzl",
            "Anni Albers",
            "Sophie Taeuber-Arp",
            "Sonia Delaunay",
          ],
          correctIndex: 1,
          explanation: "Anni Albers! She arrived at the Bauhaus in 1922, was directed to the weaving workshop (considered the 'women's department'), and transformed it into one of the most intellectually rigorous areas of the school. Her work explored the structural language of weaving — how the grid of warp and weft creates pattern, texture, and optical effect. She became one of the 20th century's most important textile artists. Her book 'On Weaving' (1965) is still essential reading.",
        },
      ],
    },
  },

  // ─── tapestry-08: Core Techniques ────────────────────────────────────────────
  {
    epochId: "tapestry",
    wonder: { name: "American Tapestry Alliance Studio", location: "Portland, Oregon, USA", era: "Present Day", emoji: "🪡" },
    id: "tapestry-08",
    order: 8,
    title: "Joins, Knots, and Texture",
    subtitle: "Core tapestry techniques — hatching, soumak, slits, and rya",
    category: "arts",
    xp: 150,
    badge: { id: "tapestry-badge-08", name: "Technique Weaver", emoji: "🪡" },
    challengeType: "quiz",
    info: {
      tagline: "Every technique in tapestry exists to solve a specific visual problem. Learn the problem first; the technique follows naturally.",
      year: 2024,
      overview: [
        "Once you can weave a basic over-under row, you have the foundation. All additional tapestry techniques are variations on or additions to this basic structure, each serving a specific purpose. Hatching blends colors. Soumak adds a raised diagonal texture. Interlocking joins two color areas without a slit. Rya knots create pile (loops or cut fringe). Understanding why each technique exists makes learning it much easier.",
        "Slits and joins are one of tapestry's central design challenges. When two areas of color meet vertically (both colors turn back at the same warp thread), a vertical slit forms between them — a thin gap in the fabric. Short slits (two or three rows) are structurally fine and are characteristic of Scandinavian tapestry and some Andean traditions. Longer slits weaken the fabric and must be managed either by interlocking the weft threads at the boundary, or by sewing the slit closed after completion. Managing vertical joins well is a mark of tapestry skill.",
        "Soumak is a wrapped technique borrowed from rug-making traditions — the weft thread wraps around warp threads diagonally rather than going straight through the shed. The result is a raised, diagonal ridge on the surface. Soumak is used for detail lines, outlines, borders, and texture areas within a tapestry. It is slower than plain weave but creates a beautiful three-dimensional surface quality. You see soumak most prominently in Persian and Caucasian rugs, and in contemporary tapestry where weavers want texture contrast.",
      ],
      technical: {
        title: "Hatching — Blending Colors Like a Painter",
        body: [
          "Hatching (from the French 'hachure') is the tapestry technique for creating color gradients and smooth color transitions. Instead of a hard edge where two colors meet, you interlock wedge-shaped rows of alternating colors — one color going a few warps into the other's territory, then turning back, the other color doing the same. From a distance, the two colors blend optically into a third, intermediate tone.",
          "To practice hatching: set up a small sample with two colors. Weave three rows of Color A across the full width. Then, instead of weaving Color B all the way across, weave it only halfway, turn it back, and let Color A continue from where Color B turned. Alternate these wedge-shaped rows, each encroaching a little further into the other's territory. Step back from your work periodically to see the optical blend that emerges. This is how tapestry weavers achieve sky gradients, skin tones, and soft transitions between landscape areas.",
        ],
        codeExample: {
          label: "Hatching pattern (diagram view)",
          code: `  HATCHING: Two colors blending

  AAAAAAAAABBB   ← Color A goes 9 warps, B takes 3
  AAAAAABBBBBB   ← A goes 6 warps, B takes 6
  AAABBBBBBBBB   ← A goes 3 warps, B takes 9
  BBBBBBBBBBBB   ← full B row

  From a distance, the center looks like a
  third color — a blend of A and B.

  Like a painter's brushstroke blending two
  colors on canvas — except made of thread.`,
        },
      },
      incident: {
        title: "The Soumak Problem — When Technique Meets Tradition",
        when: "~3rd Century BCE onward",
        where: "Caucasus, Persia, and the Americas",
        impact: "Cultural significance: Soumak weaving is one of the oldest continuous decorative textile techniques — appearing in nearly identical form in both Caucasian rugs and Andean textiles, developed independently on opposite sides of the world.",
        body: [
          "One of textile history's most striking coincidences is the appearance of nearly identical wrapped-weft techniques (soumak) in both Caucasian rug traditions and pre-Columbian Andean weaving — two traditions that had absolutely no contact with each other. Both discovered, independently, that wrapping the weft around the warp threads at a diagonal angle creates a distinctive raised diagonal rib on the surface — more three-dimensional and textured than plain tapestry weave.",
          "In Caucasian soumak rugs (from the region of modern Azerbaijan, Armenia, and Georgia), the technique covers the entire surface, creating rugs of extraordinary durability and visual richness. In Andean weaving, soumak appears as a detail technique — used for borders, outlines, and decorative bands within a larger tapestry field. This convergent discovery suggests that soumak is not an arbitrary technique but a near-inevitable discovery for any weaver who begins experimenting with what happens when the weft wraps rather than passes.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Plain Weave", sub: "over-under, the foundation", type: "system" },
          { label: "Hatching", sub: "interlocking wedges, color blending", type: "attacker" },
          { label: "Soumak", sub: "wrapped weft, raised diagonal rib", type: "victim" },
          { label: "Rya Knot", sub: "looped pile, texture and fringe", type: "result" },
        ],
      },
      timeline: [
        { year: -200, event: "Soumak wrapping technique appears in Caucasian textiles" },
        { year: 1400, event: "Flemish weavers perfect hatching for realistic color gradients in large tapestries" },
        { year: 1900, event: "Arts and Crafts revival brings tapestry techniques back to studio practice" },
        { year: 1960, event: "Fiber arts movement — rya knots and sculptural techniques popularized in USA and Scandinavia", highlight: true },
        { year: 2020, event: "Online tutorials make soumak, hatching, and rya accessible to beginners worldwide" },
      ],
      keyTakeaways: [
        "Hatching blends two colors optically by interlocking wedge-shaped rows at a shared boundary",
        "Soumak wraps the weft around warp threads diagonally — creates a raised, textured ridge",
        "Vertical slits form where two colors turn back at the same warp; short slits are structurally fine",
        "Rya knots are tied around pairs of warp threads to create pile — loops or cut fringe",
        "Every technique exists to solve a visual problem — understand the problem first",
      ],
      references: [
        { title: "American Tapestry Alliance — Technique Library", url: "https://americantapestryalliance.org/" },
        { title: "How to Hatch — Rebecca Mezoff (Video)", url: "https://www.youtube.com/@RebeccaMezoff" },
        { title: "Soumak Technique Tutorial — Tapestry Weaving", url: "https://www.youtube.com/results?search_query=soumak+tapestry+technique" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "tapestry-08-q1",
          type: "Technique Quiz",
          challenge: `  A weaver has two sections of tapestry:
  on the left, a deep ocean blue;
  on the right, a pale sky blue.

  She wants the transition between them
  to be GRADUAL — not a hard, sharp line,
  but a gentle blending from dark to light,
  like a real sky or sea.

  She considers two approaches:
  A) Bring ocean blue right up to sky blue with
     a hard vertical edge.
  B) Weave interlocking wedge-shaped rows of
     both colors, each color encroaching into
     the other's territory for several rows.`,
          text: "Which approach, and what technique, creates a gradual color blend in tapestry?",
          options: [
            "Approach A — sharp edges look more professional in tapestry",
            "Approach B — this is called hatching, and it creates optical color blending",
            "Approach B — this is called soumak, and it creates a textured transition",
            "Neither — gradual blending is impossible in woven tapestry",
          ],
          correctIndex: 1,
          explanation: "Approach B is hatching! By weaving interlocking wedge-shaped rows of two colors — each color's rows reaching a little further into the other's territory — you create a zone where the two colors blend optically. From a distance, the eye reads this as a smooth gradient. This technique is how tapestry weavers depict skies, skin tones, water, and any gradual color transition in nature. It takes practice but the results are beautiful.",
        },
        {
          id: "tapestry-08-q2",
          type: "Technique Quiz",
          challenge: `  A weaver wraps her weft thread like this:

  Instead of going straight through the shed
  (under-one, over-one), she passes the weft
  FORWARD over 2 warp threads, then BACK under
  1 warp thread, then forward over 2 again...

  The result on the surface is a raised,
  diagonal rib — textured, three-dimensional.`,
          text: "This wrapped weft technique that creates a raised diagonal ridge is called:",
          options: [
            "Hatching",
            "Rya",
            "Soumak",
            "Twining",
          ],
          correctIndex: 2,
          explanation: "Soumak! The weft wraps around the warp threads diagonally (over two, back under one) rather than passing straight through the shed. This creates a visible raised diagonal rib on the surface — more three-dimensional than plain weave. Soumak is used for outlines, decorative bands, borders, and texture contrast within tapestries. It's slower than plain weave, but the textural richness it adds is distinctive and beautiful.",
        },
        {
          id: "tapestry-08-q3",
          type: "Technique Quiz",
          challenge: `  A weaver is designing a piece with
  a bright yellow sun and a dark blue sky.
  The sun and sky are adjacent vertically.

  In each row, yellow turns back at warp #12.
  Blue turns back at warp #12 (same warp).

  After 20 rows, she notices a SLIT has
  formed along this line — a thin vertical
  gap in the fabric.`,
          text: "What causes this slit, and what is the standard solution?",
          options: [
            "The slit is caused by using the wrong needle. Solution: use a sharper needle.",
            "Two colors turning back at the same warp without interlocking creates a slit. Solution: link the weft threads at the boundary, or sew it closed afterward.",
            "Slits are caused by uneven tension. Solution: beat the weft harder.",
            "All tapestry has slits — they are unavoidable and no solution exists.",
          ],
          correctIndex: 1,
          explanation: "When two colors repeatedly turn back at the same warp without interlocking, a vertical slit forms. Short slits (a few rows) are structurally fine and are characteristic of Andean and Scandinavian tapestry design. Longer slits weaken the fabric. Solutions: (1) Interlock — loop the two weft colors around each other at the boundary on alternating rows. (2) Sew the slit closed with a needle and matching thread after the piece is finished. Both approaches are standard practice.",
        },
        {
          id: "tapestry-08-q4",
          type: "Technique Quiz",
          challenge: `  A weaver is making a tapestry of a forest.
  The trees are done in plain weave tapestry.
  Now she wants to add texture to the grass
  area at the bottom — something that sticks
  out from the surface, creating a fuzzy,
  three-dimensional effect.

  She ties short lengths of yarn around
  pairs of warp threads, leaving loops or
  tails that stick out from the surface.`,
          text: "What is this knotted pile technique called?",
          options: [
            "A soumak row",
            "A hatching zone",
            "A rya knot",
            "A twining border",
          ],
          correctIndex: 2,
          explanation: "A rya knot! (From the Scandinavian 'rya' — a type of long-pile rug.) Rya knots are tied around pairs of warp threads, leaving tails or loops that stick out from the tapestry surface. They can be left as loops (creating a round pile) or cut (creating a shaggy fringe). Rya knots are used in tapestry for textures like grass, animal fur, clouds, or abstract sculptural areas. They're one of the techniques that gives contemporary tapestry its distinctive three-dimensional quality.",
        },
      ],
    },
  },

  // ─── tapestry-09: Pattern and Design ─────────────────────────────────────────
  {
    epochId: "tapestry",
    wonder: { name: "Musée de la Tapisserie Contemporaine", location: "Aubusson, France", era: "Present Day", emoji: "🎨" },
    id: "tapestry-09",
    order: 9,
    title: "Drawing Your Cartoon",
    subtitle: "Designing a tapestry — from idea to full-size pattern",
    category: "arts",
    xp: 150,
    badge: { id: "tapestry-badge-09", name: "Pattern Maker", emoji: "🎨" },
    challengeType: "quiz",
    info: {
      tagline: "The design is not separate from the weaving — it lives in every decision about color, shape, and line.",
      year: 1940,
      overview: [
        "Before you weave a single row, you must decide what you're making. This design phase is where tapestry connects most closely to the other visual arts — to painting, drawing, graphic design, and photography. The process of creating a tapestry design is different from these other arts in one important way: you must think in terms of what thread can do. Highly detailed photographic images are difficult; bold shapes and clear color areas are the language tapestry speaks most fluently.",
        "Begin with a small sketch — even a rough thumbnail in pencil shows the main compositional elements. Think about the large shapes first: what are the biggest color areas? What is the main subject and how large will it be relative to the whole? Where are the darkest and lightest areas? Simple designs with three to five distinct color areas are ideal for beginners. Geometric patterns — diamonds, stripes, chevrons — are excellent first projects because the shapes are clear and the color areas are obvious.",
        "Jean Lurçat (1892–1966) was the French artist who single-handedly revived tapestry as a serious contemporary art form in the 20th century. He studied the medieval Aubusson tapestry tradition and made a crucial observation: the greatest historic tapestries worked with a limited palette — often 20 to 40 colors — and used large, bold design areas rather than the overly detailed, painting-imitation tapestries of the 19th century. He reduced his personal palette to 40 numbered colors and created a notation system so weavers and designers could communicate precisely. His ideas transformed Aubusson into a living center of contemporary tapestry.",
      ],
      technical: {
        title: "Creating Your First Tapestry Cartoon",
        body: [
          "Draw your cartoon at the same size as your planned tapestry — 1:1 scale. If your tapestry will be 20 × 25 cm, draw your cartoon on a 20 × 25 cm piece of paper. Use bold lines and clear color areas. You can use watercolor, marker, colored pencil, or simply outlined areas labeled with color names. The cartoon doesn't need to be a finished painting — it's a working guide, not an artwork in itself.",
          "Transfer the main lines of your cartoon to your warp threads with a light marker. Lay the cartoon behind or beneath the warp (for a frame loom, you can tape it behind the warp so you can see it through the threads). Mark the major boundaries — where one color area ends and another begins — directly on the warp threads with a fine-tip waterproof marker. These lines guide your weaving but are hidden by the weft as you work. Beginners who skip this step often find their shapes wandering in unexpected directions.",
        ],
        codeExample: {
          label: "Simple beginner cartoon: three-zone landscape",
          code: `  ┌─────────────────────────────────┐
  │  🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵  │  SKY: pale blue
  │  🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵  │  (cool, receding)
  │  🟢🟢🟢🌳🌳🌳🌳🌳🌳🟢🟢🟢🟢🟢  │  HILLS: green
  │  🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤  │  EARTH: brown
  └─────────────────────────────────┘
  3 colors. 3 clear horizontal zones.
  Perfect for a first tapestry.

  TIPS:
  ✓ Bold, simple shapes
  ✓ Few colors (3-5 is ideal for beginners)
  ✓ Avoid tiny details
  ✓ Work bottom to top when weaving`,
        },
      },
      incident: {
        title: "Jean Lurçat and the Aubusson Revival",
        when: "1939–1966",
        where: "Aubusson, France",
        impact: "Cultural significance: Lurçat convinced French weavers and artists to abandon slavish imitation of paintings and return to the bold, symbolic language of medieval tapestry — creating a new golden age of tapestry art.",
        body: [
          "In 1939, the painter Jean Lurçat visited Aubusson — the French tapestry town that had been weaving continuously since the 16th century but had lost its artistic direction. 19th-century Aubusson tapestries tried to reproduce oil paintings exactly, complete with airbrushed tonal gradations, perspective, and photographic detail. They were technically impressive and artistically inert. Lurçat was appalled.",
          "He returned to the model of the medieval tapestries in the Musée de Cluny, Paris — bold, flat colors, strong outlines, symbolic imagery, limited palette. He created a numbered color system (40 colors, each with a number), developed a new design approach using large confident shapes, and began designing tapestries for the Aubusson weavers. His most famous work, 'Le Chant du Monde' (The Song of the World), is a monumental 79-meter series now in Le Mans. Lurçat's influence transformed tapestry from imitation painting back into its own art form.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Sketch / Thumbnail", sub: "composition, main shapes", type: "attacker" },
          { label: "Full-size Cartoon", sub: "1:1 scale, color areas marked", type: "system" },
          { label: "Transfer to Warp", sub: "mark boundaries on threads", type: "victim" },
          { label: "Weave & Discover", sub: "cartoon guides, thread decides", type: "result" },
        ],
      },
      timeline: [
        { year: 1400, event: "Flemish workshop cartoonists develop professional pattern-to-weave translation" },
        { year: 1520, event: "Raphael creates monumental cartoon series for Brussels — painting and weaving separated" },
        { year: 1870, event: "William Morris designs tapestry cartoons himself, controlling full artistic vision" },
        { year: 1939, event: "Jean Lurçat begins Aubusson revival — rejects painting imitation, returns to bold tapestry language", highlight: true },
        { year: 1960, event: "Fiber art movement — artists design and weave their own work, no separate cartoonist" },
        { year: 2024, event: "Digital design tools — weavers design cartoons in Photoshop, Procreate, and Canva" },
      ],
      keyTakeaways: [
        "Draw your cartoon at 1:1 scale — the same size as the finished tapestry",
        "Bold shapes and clear color areas (3–5 colors) are ideal for beginners",
        "Transfer major boundary lines to warp threads with a fine waterproof marker",
        "Geometric and horizontal zone designs (landscape, abstract) are easiest starting points",
        "Jean Lurçat showed that tapestry's strength is bold simplicity, not imitated photography",
      ],
      references: [
        { title: "Musée Jean Lurçat — Aubusson", url: "https://www.musee-jean-lurcat.fr/" },
        { title: "Rebecca Mezoff — Tapestry Design for Beginners (Book)", url: "https://rebeccamezoff.com/tapestry-weaving-book" },
        { title: "Designing a Tapestry Cartoon — YouTube Tutorial", url: "https://www.youtube.com/results?search_query=tapestry+cartoon+design+beginner" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "tapestry-09-q1",
          type: "Design Quiz",
          challenge: `  You are planning your first tapestry.
  It will be 20 cm wide × 25 cm tall.

  You begin drawing your cartoon (the
  design guide you'll weave from).

  OPTION A: Draw it at 10 × 12.5 cm
             (half the finished size)

  OPTION B: Draw it at 20 × 25 cm
             (same size as finished tapestry)

  OPTION C: Draw it at 40 × 50 cm
             (twice the finished size)`,
          text: "At what scale should a tapestry cartoon be drawn?",
          options: [
            "Option A — half size is easier to work with",
            "Option B — full size, 1:1 scale with the finished piece",
            "Option C — double size allows finer detail in the drawing",
            "Any scale works — you can resize mentally as you weave",
          ],
          correctIndex: 1,
          explanation: "Full size, 1:1 scale. The cartoon must be the same size as the finished tapestry because you'll place it behind or beneath the warp as a direct guide. If it's a different size, your shapes won't correspond to the warp threads correctly. This is also why you mark boundary lines directly onto the warp — you're working full size, and every warp thread in a 20 cm wide piece is a real boundary you must navigate.",
        },
        {
          id: "tapestry-09-q2",
          type: "Design Quiz",
          challenge: `  A beginner's first tapestry design:

  DESIGN A:
  • A photographic portrait with subtle skin tones
  • Fine hair details (individual strands)
  • Complex background with architectural detail
  • 47 different colors

  DESIGN B:
  • Three horizontal bands: sky, hillside, earth
  • Bold colors: pale blue, sage green, warm brown
  • Simple stylized tree shape in foreground
  • 4 colors total`,
          text: "Which design is more appropriate for a beginner's first tapestry?",
          options: [
            "Design A — ambitious projects motivate more learning",
            "Design B — bold shapes and few colors match what tapestry does naturally",
            "Both designs are equally achievable for a beginner",
            "Neither — beginners should copy an existing tapestry design exactly",
          ],
          correctIndex: 1,
          explanation: "Design B. Tapestry speaks the language of bold shapes and clear color areas most fluently. Fine detail (individual hairs, subtle gradients, architectural precision) is genuinely difficult in tapestry and belongs to advanced work. A landscape with 3–4 colors gives you everything you need to learn the fundamental techniques while producing a beautiful result. Save the portrait for your fifth or tenth tapestry.",
        },
        {
          id: "tapestry-09-q3",
          type: "History Spotlight",
          challenge: `  An artist visits the Musée de Cluny in Paris
  in 1939 and studies the medieval tapestries.
  He notices something:

  • Bold, flat areas of color
  • Strong black outlines
  • Symbolic, not photographic imagery
  • Only 20–40 colors in total

  He compares these to the Aubusson tapestries
  of his own era: thousands of colors, tiny
  gradients, painted-looking — and lifeless.

  He decides to change this.`,
          text: "Who is this artist, and what did he create at Aubusson?",
          options: [
            "William Morris — he created the Arts & Crafts tapestry revival",
            "Jean Lurçat — he revived bold tapestry design with a limited numbered color palette",
            "Anni Albers — she brought Bauhaus principles to Aubusson",
            "Pablo Picasso — he designed several tapestries for Aubusson in the 1940s",
          ],
          correctIndex: 1,
          explanation: "Jean Lurçat! He revolutionized 20th-century tapestry by returning to the bold, symbolic language of medieval tapestry. He created a numbered color system (40 colors), developed strong design principles favoring large flat areas and confident shapes, and sparked an artistic revival in Aubusson that attracted major artists from across Europe. His monumental 'Le Chant du Monde' (79 meters long) in Le Mans is a landmark of 20th-century tapestry. (And yes — Picasso did design some Aubusson tapestries, so that answer wasn't entirely wrong!)",
        },
        {
          id: "tapestry-09-q4",
          type: "Design Practice",
          challenge: `  PATTERN TYPE CHALLENGE:

  Which of these design types is EASIEST
  to weave as a first tapestry project?

  A) Horizontal stripes of color
     ═══════════════════════
     ─────────────────────
     ══════════════════════

  B) A diagonal line from corner to corner
     ╲╲╲╲╲╲╲╲╲╲╲╲╲╲╲╲╲╲╲╲

  C) A circle in the center of the tapestry
     ◉

  D) The letter 'Q' in script`,
          text: "Which design feature is the most natural and straightforward to weave in tapestry?",
          options: [
            "B — diagonal lines, because they follow the weft direction",
            "A — horizontal stripes, because they follow the natural direction of each weft row",
            "C — circles, because their curves are regular and predictable",
            "D — script letters, because the hand is trained to follow them",
          ],
          correctIndex: 1,
          explanation: "Horizontal stripes are the most natural tapestry design — because every row of weft you weave IS horizontal. Changing color from row to row, or from one horizontal zone to another, is the most fundamental tapestry operation. Diagonal lines require careful stepped edges (called 'saw-tooth' if done abruptly). Curves require even more careful stepping. Letters are complex because they combine all these challenges. Start horizontal — the loom's natural direction — and curves will feel intuitive later.",
        },
      ],
    },
  },

  // ─── tapestry-10: Optical Color Mixing ───────────────────────────────────────
  {
    epochId: "tapestry",
    wonder: { name: "Color Field Studio", location: "Santa Fe, New Mexico, USA", era: "Present Day", emoji: "🌈" },
    id: "tapestry-10",
    order: 10,
    title: "Optical Color Magic",
    subtitle: "How colors blend on the loom — distance, context, and the eye's role",
    category: "arts",
    xp: 150,
    badge: { id: "tapestry-badge-10", name: "Optical Mixer", emoji: "🌈" },
    challengeType: "quiz",
    info: {
      tagline: "Step back from your tapestry. What seemed like two separate colors becomes one harmonious tone from across the room.",
      year: 1886,
      overview: [
        "One of the most magical properties of tapestry is optical color mixing — the way that separate threads of different colors, seen from a slight distance, merge in the eye to create new colors and tones. This is the same phenomenon the Impressionist painters discovered in the 1880s: Georges Seurat's Pointillism placed pure dots of color side by side, knowing the eye would mix them. In tapestry, the weft threads are the dots, and the 'mix' happens automatically with distance.",
        "Optical mixing in tapestry works in three main ways: (1) Blended yarn — two different colors twisted together or held together in the needle, so they enter the weave side by side. (2) Hatching — alternating rows or wedges of different colors that blend at a distance. (3) The 'bouclé' or textural approach — different colored threads in adjacent rows that create a heathered, blended surface. All three approaches produce different visual textures and are appropriate for different parts of a design.",
        "Context changes color. A thread of warm gray looks brown when surrounded by cool blues, and looks lavender when surrounded by warm yellows. This is because the eye compensates for surrounding color — it 'sees' relative contrast, not absolute color values. Josef Albers spent decades exploring this phenomenon in his 'Homage to the Square' painting series. Tapestry weavers must test their colors in context — a yarn that looks perfect in the skein may look completely different surrounded by the other colors in the piece.",
      ],
      technical: {
        title: "Blending Yarn in the Needle",
        body: [
          "The simplest way to create a mixed color is to thread two (or more) strands of different yarn through your tapestry needle and weave them as a single unit. One strand of red and one strand of yellow woven together creates an optical orange — not as vivid as pure orange yarn, but warmer and more complex-looking, with a slight texture variation where the two colors twist.",
          "Try this color exercise: weave a small sample with four needle-blended combinations. First: one strand red + one strand yellow (result: warm orange). Second: one strand blue + one strand yellow (result: sage green). Third: one strand white + one strand red (result: pink). Fourth: one strand black + one strand any bright color (result: a dark, muted version of that color). Each blend has a different character from a single-color yarn of the same overall hue — more complex, more natural-looking, closer to how color appears in the real world.",
        ],
        codeExample: {
          label: "Optical mixing experiments (what to expect)",
          code: `  NEEDLE BLENDING COMBINATIONS:

  🔴 Red   + 🟡 Yellow  →  warm 🟠 orange
  🔵 Blue  + 🟡 Yellow  →  soft 🟢 green
  ⬜ White + 🔴 Red     →  🩷 blush pink
  ⬛ Black + 🔵 Blue    →  deep navy
  🟤 Brown + 🟠 Orange  →  warm terra cotta

  HATCHING OPTICAL MIX:
  Alternating 🔴 red and ⬜ white rows →
  from 2 feet away, reads as soft 🩷 pink

  TIP: Always test your blends on a small
  sample before committing to a large area!`,
        },
      },
      incident: {
        title: "Josef Albers — Color Lies to Us",
        when: "1949–1976",
        where: "Yale University and worldwide",
        impact: "Cultural significance: Josef Albers' 'Homage to the Square' series (over 1,000 paintings) proved that color is fundamentally relative — the same color looks completely different depending on its context. His book 'Interaction of Color' transformed art education.",
        body: [
          "Josef Albers arrived at Yale University in 1950 after teaching at the Bauhaus (where he met and married Anni Albers, the tapestry artist). He began a systematic, decades-long exploration of how colors interact — and how consistently the eye can be fooled. In his 'Homage to the Square' series, he nested squares of color inside each other and showed, painting after painting, that the exact same color square looks entirely different depending on what colors surround it.",
          "Albers' most famous demonstration: take a medium gray square. Place it on a white background — it looks dark gray. Place the same gray square on a black background — it looks light gray. The square hasn't changed; only the context has. This principle is not a curiosity — it is fundamental to how tapestry (and all visual art) actually works in the real world. When planning a tapestry, always surround your test color with the colors that will actually appear next to it. The yarn skein tells you almost nothing about what the color will do in context.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Two separate colors", sub: "in the needle or adjacent rows", type: "attacker" },
          { label: "Distance", sub: "the eye blends at 1–3 feet", type: "system" },
          { label: "Context effects", sub: "surrounding colors shift perception", type: "victim" },
          { label: "New mixed tone", sub: "richer than single-color yarn", type: "result" },
        ],
      },
      timeline: [
        { year: 1839, event: "Chevreul discovers simultaneous contrast — adjacent colors affect each other's appearance" },
        { year: 1886, event: "Seurat exhibits 'A Sunday Afternoon' — Pointillism makes optical mixing a conscious art technique", highlight: true },
        { year: 1923, event: "Josef Albers begins teaching color theory at the Bauhaus" },
        { year: 1963, event: "Albers publishes 'Interaction of Color' — essential reading for any artist working with color" },
        { year: 1980, event: "Rebecca Mezoff and other tapestry artists systematize optical mixing approaches for weavers" },
      ],
      keyTakeaways: [
        "Optical mixing: separate threads of different colors blend in the eye at distance",
        "Three methods: blended needle (two strands), hatching (alternating rows), adjacent color areas",
        "Color is relative, not absolute — surrounding colors change how any color appears",
        "Test your yarn colors surrounded by the other yarns you'll use — the skein deceives",
        "Josef Albers proved: the same color looks completely different depending on context",
      ],
      references: [
        { title: "Josef Albers — Interaction of Color (App/Online)", url: "https://yupnet.org/interactionofcolor/" },
        { title: "Rebecca Mezoff — Color in Tapestry Weaving", url: "https://rebeccamezoff.com/" },
        { title: "Optical Color Mixing in Weaving — Video", url: "https://www.youtube.com/results?search_query=optical+color+mixing+tapestry+weaving" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "tapestry-10-q1",
          type: "Color Mixing",
          challenge: `  NEEDLE BLENDING EXPERIMENT:

  A weaver threads her needle with:
  • ONE strand of sky blue yarn
  • ONE strand of sunny yellow yarn

  She weaves several rows with this double
  strand. The blue and yellow twist together
  as they pass through the warp.

  When she steps back three feet, what
  color does this area appear to be?`,
          text: "What color does the blue-yellow needle blend create optically at a distance?",
          options: [
            "The two colors stay separate — you see stripes of blue and yellow",
            "A soft, somewhat textured green",
            "A bright violet (mixing opposite colors)",
            "Pure white — complementary colors cancel out",
          ],
          correctIndex: 1,
          explanation: "A soft, textured green! Blue + yellow = green — whether mixed on a palette, in a dye bath, or optically in the eye from blended yarn. The result is different from a plain green yarn: it has a slight texture and complexity because you can see traces of the individual blue and yellow threads up close. From a few feet away, the eye blends them and reads green. This is exactly what the Impressionists discovered with paint — and it works beautifully in tapestry.",
        },
        {
          id: "tapestry-10-q2",
          type: "Color Context",
          challenge: `  The SAME gray square is placed
  in two different settings:

  SETTING A:
  ┌─────────────────────────┐
  │  ██████████ white bg    │
  │  ██ GRAY ██             │
  │  ██████████             │
  └─────────────────────────┘

  SETTING B:
  ┌─────────────────────────┐
  │  ▓▓▓▓▓▓▓▓▓▓ black bg  │
  │  ▓▓ GRAY ▓▓            │
  │  ▓▓▓▓▓▓▓▓▓▓            │
  └─────────────────────────┘

  The gray square is IDENTICAL in both.`,
          text: "How does the same gray appear differently in these two settings?",
          options: [
            "It looks identical — context doesn't change color perception",
            "On white it looks darker; on black it looks lighter",
            "On white it looks lighter; on black it looks darker",
            "On white it looks warm (yellowish); on black it looks cool (bluish)",
          ],
          correctIndex: 1,
          explanation: "On white, the gray looks darker (because it contrasts with the lighter background). On black, the same gray looks lighter (because it contrasts with the darker background). This is called simultaneous contrast — the eye constantly compares colors to their neighbors. For tapestry weavers, this means a yarn you chose to be a 'medium tone' may read as very light or very dark depending on what surrounds it in the actual weaving. Always test in context!",
        },
        {
          id: "tapestry-10-q3",
          type: "Optical Mixing",
          challenge: `  A weaver is creating a tapestry sky that
  needs to look like a pale, warm pink.

  She has only these yarns available:
  🔴 Bright red
  ⬜ White
  🔵 Navy blue

  She does NOT have any pink yarn.`,
          text: "How can she create the appearance of pale pink using only these three yarns?",
          options: [
            "She cannot create pink — she needs a pink yarn",
            "Mix blue + red together to get purple, which looks pink from a distance",
            "Alternate rows of white and red, or needle-blend one white with one red strand — optically reads as pink",
            "Use only white — it reads as pink when surrounded by dark colors",
          ],
          correctIndex: 2,
          explanation: "Alternating rows of white and red (hatching), or blending one white strand and one red strand in the needle, will create an optical pink. White dilutes the red's intensity — just as adding white paint to red makes pink. The same principle applies in the loom. This is one of the most useful things to understand about tapestry: you don't need a separate yarn for every single color. Optical mixing lets you create many tones from a smaller number of yarns.",
        },
        {
          id: "tapestry-10-q4",
          type: "Art History",
          challenge: `  A painter at Yale University spends 26 years
  making over 1,000 paintings, all using the
  same format: nested squares of color.

  His point: the SAME color looks completely
  DIFFERENT depending on what colors surround it.

  He publishes a book that becomes the standard
  text in color theory courses worldwide.

  What was this artist's name, and what is his
  most famous book?`,
          text: "Who wrote the landmark color theory book 'Interaction of Color'?",
          options: [
            "Paul Klee — 'Pedagogical Sketchbook'",
            "Johannes Itten — 'The Art of Color'",
            "Josef Albers — 'Interaction of Color'",
            "Wassily Kandinsky — 'Concerning the Spiritual in Art'",
          ],
          correctIndex: 2,
          explanation: "Josef Albers! His book 'Interaction of Color' (1963, Yale University Press) is one of the most important books ever written about color. His 'Homage to the Square' painting series (1950–1976, over 1,000 works) systematically demonstrated that color is fundamentally relative — the same color looks completely different in different contexts. Albers was also the husband of tapestry artist Anni Albers. Together they represent one of the most remarkable partnerships in 20th-century art. His book is still in print and still taught in art schools worldwide.",
        },
      ],
    },
  },

  // ─── tapestry-11: Contemporary Practice ──────────────────────────────────────
  {
    epochId: "tapestry",
    wonder: { name: "The Textile Museum", location: "Washington D.C., USA", era: "Present Day", emoji: "🏛️" },
    id: "tapestry-11",
    order: 11,
    title: "Tapestry Today",
    subtitle: "Contemporary tapestry artists, materials, and the living tradition",
    category: "arts",
    xp: 150,
    badge: { id: "tapestry-badge-11", name: "Modern Weaver", emoji: "🏛️" },
    challengeType: "quiz",
    info: {
      tagline: "Tapestry is not a relic. It is a living art form practiced by thousands of artists worldwide, right now, today.",
      year: 2000,
      overview: [
        "Tapestry weaving is more widely practiced today than at any point in the past century. The Internet has connected weavers across the world into communities of practice; online tutorials (YouTube, Instagram, TikTok) have made basic techniques accessible to complete beginners; and a new generation of fiber artists has brought tapestry into the contemporary art world, where it is represented in major galleries and museums alongside painting and sculpture.",
        "Contemporary tapestry artists work in a huge range of styles and approaches. Some, like the Scottish weaver Archie Brennan (1931–2019), maintained a close connection to the traditional Gobelin high-warp technique while exploring deeply contemporary subjects. Others, like the American artist Rebecca Mezoff, have made tapestry instruction their life's work, writing and teaching with a rigor and generosity that has transformed how people learn to weave. Still others use tapestry as raw material for installation art, sculpture, and social practice.",
        "The materials of contemporary tapestry are also more diverse than ever. Traditional wool and silk remain central, but weavers now incorporate cotton, linen, recycled materials, wire, paper yarn, bamboo, and even found objects. Some work at enormous scale (wall-filling installations); others work tiny (miniature tapestries a few inches across). The shared element is always the warp and weft structure — over-under, thread by thread — that connects every contemporary weaver directly to those Egyptian artisans of 1400 BCE.",
      ],
      technical: {
        title: "Finding Your Community and Materials",
        body: [
          "The best thing a beginning tapestry weaver can do, after learning the basics, is find their community. Guilds exist in most cities — search for your local 'Handweavers Guild' or 'Fiber Arts Guild.' Many guilds offer beginner workshops, group weave-alongs, and access to equipment you can try before you buy. Online, the American Tapestry Alliance (americantapestryalliance.org) maintains a directory of resources, exhibits, and a journal of tapestry practice.",
          "For materials, start with what's accessible and inexpensive: smooth cotton string for warp (crochet thread or cotton seine twine), and 100% wool yarn for weft in a weight appropriate to your loom. Many weavers use 8/4 cotton carpet warp (available from yarn stores and online suppliers like Halcyon Yarn, Yarn Barn of Kansas, or Webs). Good wool weft options include Harrisville Designs wool, Bartlettyarns, and Malabrigo. As you gain experience, you'll develop strong opinions about your preferred materials. This is one of the pleasures of the craft.",
        ],
        codeExample: {
          label: "Starter materials shopping list",
          code: `  WARP:
  • 8/4 cotton carpet warp (Halcyon Yarn, WEBS)
    OR cotton crochet thread (any craft store)
    Cost: $8–$15 per cone; lasts a long time

  WEFT:
  • 100% wool yarn, worsted or bulky weight
    (Harrisville Designs, Bartlettyarns, Cascade 220)
    Cost: $6–$20 per skein; many colors available

  LOOM (your first):
  • Beginner frame loom 8×10" to 12×18"
    (Beka, Schacht, Friendly Loom)
    Cost: $20–$60

  TOOLS:
  • Tapestry needle pack (Susan Bates or Clover)
    Cost: $3–$6
  • Tapestry fork/comb
    Cost: $5–$15
  • Scissors (any good craft scissors)`,
        },
      },
      incident: {
        title: "Archie Brennan — Tapestry as Contemporary Art",
        when: "1960s–2019",
        where: "Edinburgh, Scotland, and USA",
        impact: "Cultural significance: Brennan, trained in the traditional Edinburgh College of Art tapestry studio, became one of the most influential voices for tapestry as fine art — challenging the assumption that tapestry was merely decorative craft.",
        body: [
          "Archie Brennan trained in the traditional high-warp tapestry technique at Edinburgh and the Edinburgh College of Art, but his subject matter was completely contemporary — baseball, television, advertising, pop culture, political imagery — woven in a technique 600 years old. He argued passionately that tapestry is a fully realized fine art medium, not a craft, and that the distinction between 'fine art' and 'craft' was a recent and harmful invention.",
          "Brennan moved to the United States in the 1990s and taught for many years, influencing a generation of American tapestry artists. He was also a tremendously generous teacher — his online presence before his death in 2019 made complex technical information freely available to weavers worldwide. He believed that the democratization of tapestry knowledge was one of the most important things that could happen to the art form, and he worked toward that goal all his professional life.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Traditional Roots", sub: "high-warp, wool, Gobelin", type: "attacker" },
          { label: "Contemporary Materials", sub: "mixed fibers, found objects", type: "system" },
          { label: "Online Community", sub: "YouTube, ATA, Instagram", type: "victim" },
          { label: "Gallery & Home", sub: "fine art and everyday beauty", type: "result" },
        ],
      },
      timeline: [
        { year: 1962, event: "Lausanne International Tapestry Biennial — tapestry enters the fine art world", highlight: true },
        { year: 1976, event: "American Tapestry Alliance founded — professional organization for tapestry artists" },
        { year: 2000, event: "Internet forums connect tapestry weavers globally — knowledge sharing transforms" },
        { year: 2010, event: "YouTube tapestry tutorials proliferate — beginner access transforms completely" },
        { year: 2020, event: "Social media fiber arts communities — Instagram, TikTok bring tapestry to new audiences" },
        { year: 2024, event: "Tapestry woven by thousands worldwide; represented in major contemporary art galleries" },
      ],
      keyTakeaways: [
        "Tapestry is more widely practiced today than at any point in the past century",
        "Online communities and tutorials have made learning accessible to complete beginners",
        "Contemporary artists use traditional technique with contemporary materials and subjects",
        "Guilds, the American Tapestry Alliance, and online communities are your best resources",
        "The best starter warp: 8/4 cotton carpet warp. Best starter weft: 100% wool, worsted weight",
      ],
      references: [
        { title: "American Tapestry Alliance", url: "https://americantapestryalliance.org/" },
        { title: "Archie Brennan Tapestry Pages — Archive", url: "https://www.archie-brennan.com/" },
        { title: "Halcyon Yarn — Weaving Supplies", url: "https://halcyonyarn.com/" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "tapestry-11-q1",
          type: "Contemporary Practice",
          challenge: `  You want to connect with other tapestry
  weavers to share your work, get feedback,
  and learn from experienced artists.

  You have these options:
  A) Join your local Handweavers Guild
  B) Follow tapestry artists on Instagram
     and YouTube
  C) Become a member of the American
     Tapestry Alliance
  D) All of the above`,
          text: "Which of these is the best approach for building a tapestry community?",
          options: [
            "A only — in-person guilds are the only way to truly learn",
            "B only — social media is where all the contemporary tapestry happens",
            "C only — professional organizations are most rigorous",
            "D — all of these complement each other wonderfully",
          ],
          correctIndex: 3,
          explanation: "All of the above! Each offers something different. Local guilds give you in-person community, access to equipment, and workshops. Social media gives you inspiration, tutorials, and a global audience for your work. Professional organizations like the ATA give you access to journal publications, exhibition opportunities, and a curated network of serious practitioners. These communities don't compete — they layer beautifully, and any single one will open doors you didn't know existed.",
        },
        {
          id: "tapestry-11-q2",
          type: "Materials Quiz",
          challenge: `  WARP MATERIAL OPTIONS for tapestry:

  A) Fluffy mohair yarn — soft and beautiful
  B) Stretchy lycra/spandex blend — colorful
  C) Smooth 8/4 cotton carpet warp — plain white
  D) Thick bulky wool — available in many colors

  A good warp needs to be:
  → Strong (won't break under tension)
  → Smooth (weft slides over it easily)
  → Non-stretchy (maintains stable tension)`,
          text: "Which warp material best meets all three requirements?",
          options: [
            "A — mohair, because it's beautiful and soft",
            "B — lycra blend, because it's colorful",
            "C — 8/4 cotton carpet warp, because it's strong, smooth, and non-stretchy",
            "D — bulky wool, because it's easier to see",
          ],
          correctIndex: 2,
          explanation: "8/4 cotton carpet warp! It's strong (won't break under the tension of warp threads), smooth (weft slides over it easily and the warp doesn't interfere with the color of the weft), and has almost no stretch (maintains stable, consistent tension throughout the weaving). It's also inexpensive and lasts a very long time. Mohair is too fuzzy, lycra is too stretchy, and bulky wool stretches. Cotton carpet warp is the standard recommendation for tapestry weavers at all levels.",
        },
        {
          id: "tapestry-11-q3",
          type: "Art History",
          challenge: `  An artist weaves tapestries about:
  • Baseball and American pop culture
  • Television imagery and advertising
  • Political subjects and current events

  His technique? Traditional high-warp tapestry,
  600 years old — the same technique used at
  the Gobelins in Paris.

  He trained in Edinburgh, Scotland, and later
  moved to the United States to teach.
  He died in 2019.`,
          text: "Who is this influential tapestry artist who bridged tradition and contemporary art?",
          options: [
            "William Morris",
            "Jean Lurçat",
            "Archie Brennan",
            "Anni Albers",
          ],
          correctIndex: 2,
          explanation: "Archie Brennan! He was trained in the traditional Edinburgh high-warp tapestry technique but spent his career using that technique to engage with completely contemporary subjects — pop culture, advertising, politics. He was also a passionate advocate for tapestry as fine art (not 'just craft') and a generous teacher who made tapestry knowledge freely available. His influence on American tapestry practice is immense.",
        },
        {
          id: "tapestry-11-q4",
          type: "Materials Quiz",
          challenge: `  You are in a yarn store choosing weft yarn
  for your first tapestry.

  You see these options:
  A) 100% acrylic yarn — inexpensive, squeaky feel
  B) 100% wool yarn — soft, matte, beautiful colors
  C) 100% cotton yarn — smooth, slightly stiff
  D) Mohair blend — very fuzzy, halo effect

  Tapestry weft needs to:
  → Pack down tightly (cover the warp)
  → Hold its shape after weaving
  → Accept color well
  → Feel pleasant to work with`,
          text: "Which yarn type is generally best for tapestry weft?",
          options: [
            "A — acrylic, because it's the least expensive",
            "B — 100% wool, because it packs well, holds shape, and colors beautifully",
            "C — cotton, because it's the smoothest",
            "D — mohair, because the halo creates beautiful soft edges",
          ],
          correctIndex: 1,
          explanation: "100% wool is the classic tapestry weft for excellent reasons: it packs down beautifully (the slight fuzziness of wool helps rows lock together), it holds its shape after weaving, it accepts dye gorgeously (wool has more color depth than acrylic), and it's pleasant to work with. Acrylic doesn't pack as well and has a less pleasing surface. Cotton works but can feel stiff. Mohair is beautiful but the halo makes clean edges and color changes harder to control. Start with wool.",
        },
      ],
    },
  },

  // ─── tapestry-12: Your First Tapestry ────────────────────────────────────────
  {
    epochId: "tapestry",
    wonder: { name: "Your Studio", location: "Wherever you are", era: "Today", emoji: "🏠" },
    id: "tapestry-12",
    order: 12,
    title: "Begin Your First Tapestry",
    subtitle: "A complete guide to planning and starting your first woven piece",
    category: "arts",
    xp: 200,
    badge: { id: "tapestry-badge-12", name: "First Weaver", emoji: "🌟" },
    challengeType: "quiz",
    info: {
      tagline: "The greatest tapestry you will ever weave is the next one. The second-greatest is the one you're working on right now.",
      year: 2024,
      overview: [
        "Everything you have learned in this course comes together in the act of weaving your first tapestry. You understand warp and weft. You know how to read a cartoon and transfer it to the loom. You can mix colors optically, change colors cleanly, and manage simple joins. You know about hatching for gradients and soumak for texture. You have all the knowledge you need. The only thing left is to begin.",
        "For your first tapestry, keep it beautifully simple: a piece about 15 × 20 cm (6 × 8 inches), three to five colors, a clear horizontal design — a simple landscape, an abstract geometric pattern, or even just beautiful stripes of color in shades you love. The goal of the first piece is not to produce a masterwork. The goal is to finish it, to feel the texture of the finished cloth, to understand how warp and weft interact in practice rather than in theory, and to experience the quiet, absorbing pleasure of building an image thread by thread.",
        "Tapestry is one of the oldest and most meditative of the crafts. The repetitive motion of passing the weft through the shed, turning, and beating down is genuinely calming — many weavers describe it as similar to meditation or knitting in its capacity to quieten the mind. The slow accumulation of rows that gradually reveals an image has its own particular joy, different from the immediate results of painting or drawing. Be patient with yourself. Every experienced weaver's first tapestry had uneven tension, wandering edges, and at least one color change that didn't go as planned. This is how it always begins.",
      ],
      technical: {
        title: "Your First Tapestry: Step by Step",
        body: [
          "Step 1: Choose a simple design — three horizontal color zones work beautifully. Draw your cartoon at full size and mark the boundary lines on your warp threads with a fine marker. Step 2: Start weaving at the bottom with a few rows of plain weft in your background color — this stabilizes the warp and gives you a clean starting edge. Step 3: Work from bottom to top, changing colors as your design requires. Beat each row down firmly so no warp peeks through. Step 4: When you reach the top, leave a few extra rows of the final color and secure your last row with a lark's head knot or by weaving the tail back through the finished rows.",
          "Step 5: Removing the tapestry from the loom. Carefully slide the warp loops off the pegs (or cut them if there's no other way). Tie warp ends in pairs with overhand knots close to the weaving. Trim or tuck weft tails into the back of the weaving with your tapestry needle. Step 6: Wet-finish your tapestry. Fill a bowl with cool water, gently submerge your tapestry, squeeze gently (never wring), and press out excess water in a towel. Lay flat to dry. This final step opens the wool fibers, evens the weave, and transforms your tapestry from 'woven object' into something that looks and feels finished.",
        ],
        codeExample: {
          label: "First tapestry checklist",
          code: `  BEFORE YOU BEGIN:
  ☐ Loom set up and warped
  ☐ Cartoon drawn at full size
  ☐ Major boundary lines on warp threads
  ☐ Yarns wound on small butterflies or bobbins
  ☐ Tapestry needle threaded

  WHILE WEAVING:
  ☐ 3 rows plain weave at bottom (stabilize warp)
  ☐ Beat each row firmly — warp should be hidden
  ☐ Leave tails of 8–10 cm when changing colors
  ☐ Check for consistent width (warp shouldn't pull in)
  ☐ Step back every 20 rows to see the whole

  FINISHING:
  ☐ Secure last row
  ☐ Remove from loom, knot warp ends
  ☐ Tuck or trim weft tails
  ☐ Wet-finish (cool water, lay flat to dry)
  ☐ Hang and admire 🌟`,
        },
      },
      incident: {
        title: "The Medici Tapestries — Finishing as Transformation",
        when: "16th Century",
        where: "Florence, Italy",
        impact: "Cultural significance: The Medici family's tapestry collection — including pieces woven in Brussels — demonstrated how wet-finishing transformed a freshly-woven tapestry from a loose fabric into a coherent, durable textile. The tradition continues unchanged today.",
        body: [
          "Wet-finishing — submerging a finished tapestry in cool water to relax the fibers — has been part of tapestry practice for as long as wool has been woven. The great Flemish workshops of the 14th–16th centuries routinely wet-finished their tapestries before delivery to clients, and the Medici inventories note which pieces had been 'wetted and stretched.' The process hasn't changed in 600 years: cool water, gentle pressure, dry flat.",
          "What wet-finishing does mechanically: wool fibers have microscopic scales. In the loom, these scales are pressed flat by the weaving process, leaving the fabric feeling slightly stiff and uneven. In cool water, the scales relax and bloom slightly, locking into neighboring fibers and creating a more cohesive, even surface. The tapestry often grows slightly — a piece that was 20 × 25 cm on the loom may finish at 21 × 26 cm — and always looks more finished, more alive, and more settled after the wet-finishing bath. Never skip this step.",
        ],
      },
      diagram: {
        nodes: [
          { label: "Design & Warp", sub: "cartoon + thread setup", type: "attacker" },
          { label: "Weave Bottom to Top", sub: "row by row, beat firmly", type: "system" },
          { label: "Finish & Remove", sub: "knot warps, tuck tails", type: "victim" },
          { label: "Wet-Finish & Hang", sub: "the final transformation", type: "result" },
        ],
      },
      timeline: [
        { year: -1400, event: "Egyptian weavers produce the first known tapestries in linen" },
        { year: 1400, event: "Flemish workshops perfect wet-finishing as standard practice" },
        { year: 1870, event: "William Morris wet-finishes his natural-dye tapestries at Merton Abbey" },
        { year: 1970, event: "Fiber arts revival — thousands of new weavers make their first tapestries", highlight: true },
        { year: 2024, event: "You — beginning your first tapestry, connected to 3,500 years of tradition" },
      ],
      keyTakeaways: [
        "Keep your first tapestry simple: small size, 3–5 colors, clear horizontal design",
        "Start with a few rows of plain weave at the bottom to stabilize and square the warp",
        "Beat each row firmly so no warp is visible — packed weft is the defining feature of tapestry",
        "Always wet-finish: cool water, gentle press, dry flat — transforms the finished piece",
        "The goal of your first tapestry is to finish it and experience the craft — not to make a masterwork",
      ],
      references: [
        { title: "Rebecca Mezoff — 'The Art of Tapestry Weaving' (Book)", url: "https://rebeccamezoff.com/tapestry-weaving-book" },
        { title: "Mirrix Looms — Starting Your First Tapestry", url: "https://mirrixlooms.com/blogs/mirrix-blog/how-to-start-your-first-tapestry" },
        { title: "Tapestry 101 Video Series — YouTube", url: "https://www.youtube.com/results?search_query=tapestry+weaving+101+beginner" },
      ],
    },
    quiz: {
      questions: [
        {
          id: "tapestry-12-q1",
          type: "Project Planning",
          challenge: `  SIZE OPTIONS for a first tapestry:

  Option A: 60 × 90 cm (24 × 36 inches)
            Large, impressive, ambitious

  Option B: 15 × 20 cm (6 × 8 inches)
            Small, manageable, completable in
            a few sessions

  Option C: 120 × 180 cm (4 × 6 feet)
            Wall-filling, very ambitious

  Option D: 5 × 5 cm (2 × 2 inches)
            Miniature, extremely detailed`,
          text: "Which size is most recommended for a beginner's first tapestry?",
          options: [
            "Option A — large enough to practice all the techniques",
            "Option B — small enough to finish, large enough to learn",
            "Option C — ambition is the best teacher",
            "Option D — small is easier for a beginner",
          ],
          correctIndex: 1,
          explanation: "Option B — around 15 × 20 cm. Small enough to finish in a few pleasant sessions (finishing is important — it's the reward and the consolidation of everything learned), but large enough to practice changing colors, maintaining even tension, and seeing how the design develops. Very large pieces take months and can be discouraging before you've established the habit of weaving. Very small pieces are harder because every thread placement is critical. 6 × 8 inches is the sweet spot.",
        },
        {
          id: "tapestry-12-q2",
          type: "Getting Started",
          challenge: `  You've warped your frame loom.
  Your cartoon is behind the warp.
  Your yarns are ready.
  Your needle is threaded.

  The VERY FIRST THING you weave
  should be:

  A) Your most complex color area — get
     the hardest part done first
  B) A few rows of plain, straight weave
     in a single color — to stabilize
     the warp and create an even base
  C) A hatched area to practice technique
     before the main design
  D) The top section of your design, so
     you can see the final look first`,
          text: "What should the very first rows of your tapestry be?",
          options: [
            "A — tackle the hardest section first while you're freshest",
            "B — a few rows of straight plain weave to stabilize and square the warp",
            "C — hatching to warm up the technical skills",
            "D — the top section for visual motivation",
          ],
          correctIndex: 1,
          explanation: "A few rows of straight plain weave at the bottom! This serves a crucial structural purpose: warp threads spread apart during warping and tend to bunch slightly. Several rows of plain weave spread them evenly to their correct spacing and square up the bottom edge of your tapestry. Think of it as the foundation — the invisible rows that make everything above them sit correctly. Use a neutral color if you like, or the first color of your design. Just don't skip them.",
        },
        {
          id: "tapestry-12-q3",
          type: "Finishing",
          challenge: `  Your tapestry is finished on the loom.
  You remove it carefully.
  The warp ends stick out at top and bottom.
  The weft tails stick out at the sides and
  at each color change.

  Your tapestry looks a little rough —
  somewhat uneven in texture, slightly stiff.

  What is the final step that transforms it?`,
          text: "What is wet-finishing, and what does it do to a tapestry?",
          options: [
            "Ironing at high heat — flattens the weave and sets the colors permanently",
            "Soaking in warm water with soap to clean — removes any dirt from handling",
            "Submerging in cool water, gently pressing, and drying flat — relaxes fibers, evens the weave, makes it look finished",
            "Stretching on a frame while damp — pulls it to exact dimensions",
          ],
          correctIndex: 2,
          explanation: "Wet-finishing! Submerge your tapestry in cool water (not warm — warm water can felt wool), gently squeeze it (never wring or agitate), press out excess moisture in a clean towel, and lay flat to dry. The wool fibers relax and bloom slightly, locking together and creating a more even, cohesive surface. Your tapestry will look and feel completely different — more finished, more settled, more alive. This step is used by professionals and beginners alike, and it's been standard practice for 600 years. Never skip it.",
        },
        {
          id: "tapestry-12-q4",
          type: "Reflection",
          challenge: `  You have now learned:

  ✓ What tapestry is (weft-faced weave)
  ✓ 3,500 years of tapestry history
  ✓ Egyptian, Flemish, Asian, and American traditions
  ✓ Color theory and optical mixing
  ✓ Warp and weft structure
  ✓ Frame loom setup
  ✓ Hatching, soumak, slits, and rya knots
  ✓ Cartoon design
  ✓ Wet-finishing
  ✓ Where to find community and materials

  What is the most important next step?`,
          text: "What is the single most important thing to do after completing this course?",
          options: [
            "Read five more books on tapestry before starting",
            "Buy the most expensive loom available",
            "Sit down, set up your loom, and begin weaving",
            "Wait until you feel completely ready and confident",
          ],
          correctIndex: 2,
          explanation: "Begin weaving! All the knowledge in the world is preparation for the moment of actually sitting down with thread and loom. The first row will teach you more than any lesson. The first color change will make hatching make sense. The first finished row will feel like an accomplishment. You will never feel 'completely ready' — no one ever does. The weavers who improve are the ones who begin, make mistakes, notice what happened, and keep going. Your first tapestry is waiting. The loom is patient. The thread is ready. Begin.",
        },
      ],
    },
  },
];
