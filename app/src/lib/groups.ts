export type UserGroup = "elementary" | "junior-hs" | "high-school" | "university" | "career" | "curious";

export const USER_GROUPS: UserGroup[] = [
  "elementary",
  "junior-hs",
  "high-school",
  "university",
  "career",
  "curious",
];

export const GROUP_LABELS: Record<UserGroup, string> = {
  "elementary": "Elementary",
  "junior-hs": "Junior HS",
  "high-school": "High School",
  "university": "University",
  "career": "Career",
  "curious": "Curious",
};

export const GROUP_ICONS: Record<UserGroup, string> = {
  "elementary": "🧒",
  "junior-hs": "🎒",
  "high-school": "🏫",
  "university": "🎓",
  "career": "💼",
  "curious": "🔍",
};

export function getClientGroup(): UserGroup {
  if (typeof document === "undefined") return "high-school";
  const match = document.cookie.match(/(?:^|;\s*)userGroup=([^;]+)/);
  const val = match?.[1] as UserGroup | undefined;
  if (val && USER_GROUPS.includes(val)) return val;
  return "high-school";
}

export function setClientGroup(group: UserGroup) {
  document.cookie = `userGroup=${group}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}
