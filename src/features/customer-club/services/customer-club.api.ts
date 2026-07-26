import type {
  ActivitiesQuery,
  ClubLevel,
  DashboardQuery,
  DashboardResponse,
  RecentActivitiesResponse,
} from "@/features/customer-club/types/customer-club.types";
import {
  normalizeActivities,
  normalizeLevels,
  normalizeSummary,
  normalizeUser,
  normalizeVitrin,
  normalizeVitrinList,
} from "@/features/customer-club/utils/normalize";
import { apiClient } from "@/shared/lib/api/client";
import { unwrapApiPayload } from "@/shared/lib/api/response";
import type { ApiEnvelope } from "@/shared/types/api";

async function getPayload<T>(path: string, params?: Record<string, unknown>): Promise<T> {
  const { data } = await apiClient.get<ApiEnvelope<T> | T>(path, { params });
  return unwrapApiPayload<T>(data);
}

export async function getDashboard(query: DashboardQuery): Promise<DashboardResponse> {
  const [userPayload, vitrinsPayload] = await Promise.all([
    getPayload<unknown>("/users/me"),
    getPayload<unknown>("/users/vitrin/all-user"),
  ]);

  const user = normalizeUser(userPayload);
  const vitrins = normalizeVitrinList(vitrinsPayload);

  if (query.scope === "vitrin") {
    if (!query.vitrinId) {
      throw new Error("شناسه ویترین برای نمایش اطلاعات ویترین الزامی است.");
    }

    const encodedVitrinId = encodeURIComponent(query.vitrinId);
    const fallbackVitrin = vitrins.find((item) => item.id === query.vitrinId);
    const [vitrinPayload, summaryPayload] = await Promise.all([
      getPayload<unknown>(`/users/vitrin/${encodedVitrinId}`),
      getPayload<unknown>(`/customer-club/summary-user-vitrin/${encodedVitrinId}`),
    ]);

    return {
      scope: "vitrin",
      user,
      selectedVitrin: normalizeVitrin(vitrinPayload, fallbackVitrin),
      vitrins,
      summary: normalizeSummary(summaryPayload),
    };
  }

  const summaryPayload = await getPayload<unknown>("/customer-club/summary");

  return {
    scope: "user",
    user,
    selectedVitrin: null,
    vitrins,
    summary: normalizeSummary(summaryPayload),
  };
}

export async function getLevels(): Promise<ClubLevel[]> {
  const payload = await getPayload<unknown>("/levels");
  return normalizeLevels(payload);
}

export async function getRecentActivities(
  query: ActivitiesQuery,
): Promise<RecentActivitiesResponse> {
  const payload = await getPayload<unknown>("/recent-activities", {
    offset: query.offset,
    size: query.size,
    type: query.type,
    ...(query.scope === "vitrin" && query.vitrinId
      ? { userVitrinId: query.vitrinId }
      : {}),
  });

  return normalizeActivities(payload, query.offset, query.size);
}
