import { describe, expect, it } from "vitest";

import { loginSchema, normalizeIranianPhone } from "./login.schema";

describe("loginSchema", () => {
  it("accepts the API phone format", () => {
    expect(loginSchema.safeParse({ phone: "989121234567", password: "secret1" }).success).toBe(true);
  });

  it("normalizes local Iranian mobile numbers", () => {
    expect(normalizeIranianPhone("09121234567")).toBe("989121234567");
  });

  it("keeps an API-format Iranian mobile number unchanged", () => {
    expect(normalizeIranianPhone("989121234567")).toBe("989121234567");
  });
});
