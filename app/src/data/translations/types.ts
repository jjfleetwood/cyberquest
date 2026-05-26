export type StageTranslation = {
  tagline?: string;
  overview?: string[];
  technical?: { title?: string; body?: string[] };
  incident?: { title?: string; impact?: string; body?: string[] };
  timeline?: string[];
  keyTakeaways?: string[];
};

export type TranslationMap = Record<string, StageTranslation>;
