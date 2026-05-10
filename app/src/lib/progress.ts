import { getSession } from "@/lib/auth";

export type UserProgress = {
  xp: number;
  completedStages: string[];
  badges: string[];
};

const BASE_KEY = "kryptos_progress";

/** Returns the localStorage key scoped to the current session user, or the
 *  anonymous fallback key if no session is active. */
function progressKey(): string {
  const username = getSession();
  return username ? `${BASE_KEY}_${username}` : BASE_KEY;
}

function load(): UserProgress {
  if (typeof window === "undefined") return { xp: 0, completedStages: [], badges: [] };
  try {
    const raw = localStorage.getItem(progressKey());
    return raw ? (JSON.parse(raw) as UserProgress) : { xp: 0, completedStages: [], badges: [] };
  } catch {
    return { xp: 0, completedStages: [], badges: [] };
  }
}

function save(p: UserProgress) {
  if (typeof window !== "undefined") localStorage.setItem(progressKey(), JSON.stringify(p));
}

export function getProgress(): UserProgress {
  return load();
}

export function awardStage(stageId: string, xp: number, badge?: string): UserProgress {
  const p = load();
  if (!p.completedStages.includes(stageId)) {
    p.xp += xp;
    p.completedStages.push(stageId);
  }
  if (badge && !p.badges.includes(badge)) {
    p.badges.push(badge);
  }
  save(p);
  return p;
}
