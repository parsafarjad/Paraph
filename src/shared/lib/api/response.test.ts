import { describe, expect, it } from "vitest";

import {
  getApiPayloadErrorMessage,
  unwrapApiPayload,
} from "@/shared/lib/api/response";

describe("API response helpers", () => {
  it("unwraps the Paraf result envelope", () => {
    expect(
      unwrapApiPayload({
        success: true,
        result: { accessToken: "access", refreshToken: "refresh" },
      }),
    ).toEqual({ accessToken: "access", refreshToken: "refresh" });
  });

  it("throws when the backend returns success false with HTTP 200", () => {
    expect(() =>
      unwrapApiPayload({
        success: false,
        error: { message: "Invalid session" },
      }),
    ).toThrow("Invalid session");
  });

  it("reads nested backend error messages", () => {
    expect(
      getApiPayloadErrorMessage({
        success: false,
        error: { code: 11001, httpCode: 404, message: "User Not Found" },
      }),
    ).toBe("User Not Found");
  });
});
