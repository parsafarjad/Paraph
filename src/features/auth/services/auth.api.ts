import type { LoginInput } from "@/features/auth/schemas/login.schema";
import { normalizeIranianPhone } from "@/features/auth/schemas/login.schema";
import type { LoginResult } from "@/features/auth/types/auth.types";
import { apiClient } from "@/shared/lib/api/client";
import { unwrapApiPayload } from "@/shared/lib/api/response";
import type { ApiSuccessResponse } from "@/shared/types/api";

export async function login(input: LoginInput): Promise<LoginResult> {
  const { data } = await apiClient.post<ApiSuccessResponse<LoginResult>>(
    "/users/login",
    {
      phone: normalizeIranianPhone(input.phone),
      password: input.password,
    },
  );

  const result = unwrapApiPayload<LoginResult>(data);

  if (!result.accessToken || !result.refreshToken) {
    throw new Error("پاسخ سرویس ورود شامل توکن‌های معتبر نیست.");
  }

  return result;
}
