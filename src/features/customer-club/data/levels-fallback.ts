import type { ClubLevel } from "@/features/customer-club/types/customer-club.types";

const LEVELS_CACHE_KEY = "paraf-customer-club-levels-v1";

interface CachedLevelsPayload {
  savedAt: number;
  levels: ClubLevel[];
}

/**
 * Last-resort values based on the current backend contract.
 * Remote data always takes priority, then the last successful cached response,
 * and these values are only used when neither is available.
 */
export const DEFAULT_CLUB_LEVELS: ClubLevel[] = [
  { id: "fallback-bronze", name: "برنزی", scores: 100 },
  { id: "fallback-silver", name: "نقره‌ای", scores: 200 },
  { id: "fallback-gold", name: "طلایی", scores: 300 },
  { id: "fallback-diamond", name: "الماس", scores: 400 },
];

function isClubLevel(value: unknown): value is ClubLevel {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<ClubLevel>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    candidate.name.trim().length > 0 &&
    typeof candidate.scores === "number" &&
    Number.isFinite(candidate.scores) &&
    candidate.scores >= 0 &&
    (candidate.iconUrl === undefined || typeof candidate.iconUrl === "string")
  );
}

export function readCachedLevels(): ClubLevel[] | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(LEVELS_CACHE_KEY);

    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue) as Partial<CachedLevelsPayload>;

    if (!Array.isArray(parsed.levels)) {
      return null;
    }

    const validLevels = parsed.levels.filter(isClubLevel);

    return validLevels.length > 0
      ? validLevels.sort((first, second) => first.scores - second.scores)
      : null;
  } catch {
    return null;
  }
}

export function writeCachedLevels(levels: ClubLevel[]): void {
  if (typeof window === "undefined" || levels.length === 0) {
    return;
  }

  try {
    const payload: CachedLevelsPayload = {
      savedAt: Date.now(),
      levels,
    };

    window.localStorage.setItem(LEVELS_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Storage can be unavailable in private mode or when the quota is full.
    // The in-memory React Query cache and static fallback still keep the UI usable.
  }
}
