import axios, { AxiosError, AxiosHeaders } from "axios";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { getApiPayloadErrorMessage } from "@/shared/lib/api/response";
import type { ApiErrorResponse } from "@/shared/types/api";

const DEFAULT_API_BASE_URL = "https://wholesaler-core-v2.paraf.app/api";

export const apiClient = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/$/, ""),
  timeout: 20_000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    const headers = AxiosHeaders.from(config.headers);
    headers.set("Authorization", `Bearer ${accessToken}`);
    config.headers = headers;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const message = getApiPayloadErrorMessage(
      error.response?.data,
      error.message || "خطایی در ارتباط با سرور رخ داد.",
    );

    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth();
    }

    return Promise.reject(
      Object.assign(error, {
        userMessage: message,
      }),
    );
  },
);
