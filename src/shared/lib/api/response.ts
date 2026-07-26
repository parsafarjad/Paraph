import axios from "axios";

import type { ApiEnvelope, ApiErrorResponse } from "@/shared/types/api";

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readMessage(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export class ApiResponseError extends Error {
  readonly payload: unknown;

  constructor(message: string, payload: unknown) {
    super(message);
    this.name = "ApiResponseError";
    this.payload = payload;
  }
}

export function unwrapApiPayload<T>(payload: ApiEnvelope<T> | T): T {
  if (!isRecord(payload)) return payload as T;

  if (payload.success === false) {
    throw new ApiResponseError(getApiPayloadErrorMessage(payload), payload);
  }

  const nested = payload.result ?? payload.data ?? payload.payload;
  return (nested ?? payload) as T;
}

export function getApiPayloadErrorMessage(
  payload: unknown,
  fallback = "خطایی در ارتباط با سرور رخ داد.",
): string {
  const directMessage = readMessage(payload);
  if (directMessage) return directMessage;
  if (!isRecord(payload)) return fallback;

  const topLevelMessage = readMessage(payload.message);
  if (topLevelMessage) return topLevelMessage;

  if (isRecord(payload.error)) {
    const nestedMessage = readMessage(payload.error.message);
    if (nestedMessage) return nestedMessage;
  }

  const stringError = readMessage(payload.error);
  if (stringError) return stringError;

  if (isRecord(payload.snackbar)) {
    const snackbarMessage = readMessage(payload.snackbar.message);
    if (snackbarMessage) return snackbarMessage;
  }

  return fallback;
}

export function getRequestErrorMessage(
  error: unknown,
  fallback = "خطایی در ارتباط با سرور رخ داد.",
): string {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return error instanceof Error && error.message ? error.message : fallback;
  }

  const enrichedMessage = (error as typeof error & { userMessage?: string }).userMessage;
  return enrichedMessage ?? getApiPayloadErrorMessage(error.response?.data, error.message || fallback);
}
