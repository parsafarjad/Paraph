// src/shared/lib/api/levels-client.ts

import axios, {
  AxiosError,
  AxiosHeaders,
  type InternalAxiosRequestConfig,
} from "axios";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { getApiPayloadErrorMessage } from "@/shared/lib/api/response";
import type { ApiErrorResponse } from "@/shared/types/api";

const DEFAULT_API_BASE_URL =
  "https://wholesaler-core-v2.paraf.app/api";

export const levelsClient = axios.create({
  baseURL: (
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    DEFAULT_API_BASE_URL
  ).replace(/\/$/, ""),
  timeout: 20_000,
  withCredentials: false,
});

levelsClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken =
      useAuthStore.getState().accessToken;

    const headers = new AxiosHeaders();

    headers.set("Accept", "application/json");

    if (accessToken) {
      headers.set(
        "Authorization",
        `Bearer ${accessToken}`,
      );
    }

    config.headers = headers;
    config.method = "get";
    config.data = undefined;
    config.withCredentials = false;

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

levelsClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const message = getApiPayloadErrorMessage(
      error.response?.data,
      error.message ||
        "خطایی در دریافت سطح‌ها رخ داد.",
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