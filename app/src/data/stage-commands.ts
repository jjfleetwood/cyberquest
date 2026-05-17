import type { CtfCommand } from "./types";
import { stages } from "./stages";

const registry: Record<string, Record<string, CtfCommand>> = {};

for (const s of stages) {
  if (s.ctf?.extraCommands) {
    registry[s.id] = s.ctf.extraCommands;
  }
}

export function getExtraCommands(stageId: string): Record<string, CtfCommand> | undefined {
  return registry[stageId];
}
