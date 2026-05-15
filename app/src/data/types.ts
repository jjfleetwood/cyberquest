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
};

export type CtfCommandResult = { lines: string[]; solved?: boolean };
export type CtfCommand = (args: string[]) => CtfCommandResult;

export type CtfFragment = {
  trigger: string; // file path (starts with "/") matched on cat, or full command string matched on any command
  value: string;   // the fragment piece, e.g. "FLAG{C1A_"
  label: string;   // display label shown on collection, e.g. "King's Chamber — Confidentiality"
};

export type CtfConfig = {
  scenario: string;
  hint: string;
  hints?: string[];
  flag: string;
  files: Record<string, string>;
  dirs: Record<string, { name: string; isDir: boolean; hidden?: boolean }[]>;
  extraCommands?: Record<string, CtfCommand>;
  fragments?: CtfFragment[];
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
  wonder: Wonder;
  id: string;
  order: number;
  title: string;
  subtitle: string;
  category: "cybersecurity" | "ai" | "owasp";
  owaspRef?: string;
  cveId?: string;
  cvssScore?: number;
  xp: number;
  badge: { id: string; name: string; emoji: string };
  challengeType: "quiz" | "ctf";
  info: StageInfo;
  ctf?: CtfConfig;
};
