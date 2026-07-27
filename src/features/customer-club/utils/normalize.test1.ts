import { describe, expect, it } from "vitest";

import { normalizeLevels, normalizeSummary, normalizeUser } from "./normalize";

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
});
