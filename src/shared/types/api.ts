export interface ApiSuccessResponse<T> {
  success: true;
  result: T;
}

export interface ApiErrorDetails {
  code?: number;
  httpCode?: number;
  message?: string;
}

export interface ApiSnackbar {
  type?: "success" | "error" | "warning" | "info" | string;
  message?: string;
}

export interface ApiErrorResponse {
  success?: false;
  message?: string;
  error?: ApiErrorDetails | string;
  snackbar?: ApiSnackbar;
}

export interface ApiEnvelope<T> {
  success?: boolean;
  result?: T;
  data?: T;
  payload?: T;
}
