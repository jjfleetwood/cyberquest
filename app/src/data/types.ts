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

export type CtfConfig = {
  scenario: string;
  hint: string;
  hints?: string[];
  flag: string;
  files: Record<string, string>;
  dirs: Record<string, { name: string; isDir: boolean; hidden?: boolean }[]>;
  extraCommands?: Record<string, CtfCommand>;
};

export type StageConfig = {
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
