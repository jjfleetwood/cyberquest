export type DiagramNode = {
  label: string;
  sub?: string;
  type: "attacker" | "system" | "victim" | "result";
};

export type StageInfo = {
  tagline: string;
  year: number;
  overview: string[];
  technical: {
    title: string;
    body: string[];
    codeExample?: { label: string; code: string };
  };
  incident: {
    title: string;
    when: string;
    where: string;
    impact: string;
    body: string[];
  };
  diagram: { nodes: DiagramNode[] };
  timeline: { year: number; event: string; highlight?: boolean }[];
  keyTakeaways: string[];
  references: { title: string; url: string }[];
  downloads?: { name: string; url: string; description: string }[];
};

export type CtfCommandResult = { lines: string[]; solved?: boolean };
export type CtfCommand = (args: string[]) => CtfCommandResult;

export type CtfFragment = {
  trigger: string; // file path (starts with "/") matched on cat, or full command string matched on any command
  value: string;   // the fragment piece, e.g. "FLAG{C1A_"
  label: string;   // display label shown on collection, e.g. "King's Chamber — Confidentiality"
};

export type QuizQuestion = {
  id: string;
  type: string;
  challenge: string;
  text: string;
  options: string[];
  correctIndex?: number;  // server-only, stripped before client
  explanation?: string;   // server-only, stripped before client
};

export type QuizConfig = {
  questions: QuizQuestion[];
};

export type CtfQuizQuestion = {
  q: string;
  options: [string, string];
  correct: 0 | 1;
};

export type CtfQuizEntry = {
  questions: CtfQuizQuestion[]; // exactly 5
};

export type CtfConfig = {
  scenario: string;
  hint: string;
  hints?: string[];
  flag?: string;
  files: Record<string, string>;
  dirs: Record<string, { name: string; isDir: boolean; hidden?: boolean }[]>;
  extraCommands?: Record<string, CtfCommand>;
  fragments?: CtfFragment[];
  /** Minimum fragments needed to assemble flag (easter-egg: collect any N of M). Defaults to all. */
  minFragments?: number;
  /** Extra context injected into the AI hint chatbot system prompt for this stage. */
  chatbotContext?: string;
};

export type Wonder = {
  name: string;
  location: string;
  era: string;
  emoji: string;
};

export type EpochConfig = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  emoji: string;
  color: string;
  unlocked: boolean;
};

export type StageConfig = {
  epochId: string;
  group?: "elementary" | "junior-hs" | "high-school" | "university" | "career" | "curious";
  wonder: Wonder;
  id: string;
  order: number;
  title: string;
  subtitle: string;
  category: "cybersecurity" | "ai" | "owasp" | "arts" | "driving" | "health" | "sports";
  owaspRef?: string;
  cveId?: string;
  cvssScore?: number;
  xp: number;
  badge: { id: string; name: string; emoji: string };
  challengeType: "quiz" | "ctf";
  info: StageInfo;
  ctf?: CtfConfig;
  quiz?: QuizConfig;
};
