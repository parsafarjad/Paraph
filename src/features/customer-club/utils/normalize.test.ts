import { describe, expect, it } from "vitest";

import {
  normalizeActivities,
  normalizeLevels,
  normalizeSummary,
  normalizeUser,
} from "./normalize";

describe("customer club normalizers", () => {
  it("normalizes a user payload", () => {
    expect(normalizeUser({ name: "آرین", level: "برنزی", coins: "12", scores: 50 })).toMatchObject({
      fullName: "آرین",
      level: "برنزی",
      coins: 12,
      scores: 50,
    });
  });

  it("sorts levels by required score", () => {
    const levels = normalizeLevels([
      { name: "طلایی", scores: 1000 },
      { name: "برنزی", scores: 0 },
    ]);
    expect(levels.map((level) => level.name)).toEqual(["برنزی", "طلایی"]);
  });

  it("defaults missing summary fields to zero", () => {
    expect(normalizeSummary({})).toEqual({
      numberTasksCompleted: 0,
      totalScoreMonthly: 0,
      totalCoinMonthly: 0,
    });
  });

  it("reads recent activities total from the API count array", () => {
    const activities = normalizeActivities(
      {
        success: true,
        result: Array.from({ length: 10 }, (_, index) => ({
          id: index + 1,
          type: "SCORE",
          taskTitle: `فعالیت ${index + 1}`,
        })),
        total: [{ count: 25 }],
      },
      0,
      10,
    );

    expect(activities.total).toBe(25);
    expect(activities.hasMore).toBe(true);
  });

  it("handles an empty recent activities response", () => {
    expect(
      normalizeActivities(
        {
          success: true,
          result: [],
          total: [{ count: 0 }],
        },
        0,
        10,
      ),
    ).toMatchObject({
      items: [],
      total: 0,
      hasMore: false,
    });
  });
});
