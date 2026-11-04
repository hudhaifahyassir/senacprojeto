export const CORRECT_POINTS = 100;
export const WRONG_PENALTY = 50;
export const COMBO_BONUS = 25; // per combo step from the 2nd consecutive hit
export const MAX_LIVES = 3;
export const QUESTION_TIME = 40;

export type Medal = "ouro" | "prata" | "bronze" | null;

export function scoreAnswer(correct: boolean, combo: number, timeLeft: number) {
  if (!correct) return { points: -WRONG_PENALTY, xp: 10, combo: 0 };
  const newCombo = combo + 1;
  const points = CORRECT_POINTS + (newCombo - 1) * COMBO_BONUS;
  const xp = 50 + Math.max(0, Math.round(timeLeft));
  return { points, xp, combo: newCombo };
}

export function medalFor(correct: number, total: number): Medal {
  const r = total ? correct / total : 0;
  if (r >= 0.9) return "ouro";
  if (r >= 0.7) return "prata";
  if (r >= 0.5) return "bronze";
  return null;
}

export function levelFromXp(xp: number) {
  return Math.floor(xp / 500) + 1;
}

// Storage
export type Progress = { unlocked: number; medals: Record<number, Medal> };
export type RankEntry = { name: string; score: number; date: string; phase: string; accuracy: number };

const K = { best: "wm_best", progress: "wm_progress", rank: "wm_rank", xp: "wm_xp" };

function read<T>(k: string, d: T): T {
  if (typeof window === "undefined") return d;
  try {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : d;
  } catch {
    return d;
  }
}
const write = (k: string, v: unknown) => localStorage.setItem(k, JSON.stringify(v));

export const store = {
  best: () => read<number>(K.best, 0),
  setBest: (s: number) => write(K.best, Math.max(s, store.best())),
  xp: () => read<number>(K.xp, 0),
  addXp: (x: number) => write(K.xp, store.xp() + x),
  progress: () => read<Progress>(K.progress, { unlocked: 1, medals: {} }),
  setProgress: (p: Progress) => write(K.progress, p),
  rank: () => read<RankEntry[]>(K.rank, []),
  addRank: (e: RankEntry) =>
    write(K.rank, [...store.rank(), e].sort((a, b) => b.score - a.score).slice(0, 20)),
  reset: () => Object.values(K).forEach((k) => localStorage.removeItem(k)),
};
