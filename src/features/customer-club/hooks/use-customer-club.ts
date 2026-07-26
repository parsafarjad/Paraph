"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import {
  getDashboard,
  getLevels,
  getRecentActivities,
} from "@/features/customer-club/services/customer-club.api";
import type {
  ActivitiesQuery,
  DashboardQuery,
} from "@/features/customer-club/types/customer-club.types";

export const customerClubKeys = {
  all: ["customer-club"] as const,
  dashboard: (query: DashboardQuery) => [...customerClubKeys.all, "dashboard", query] as const,
  levels: () => [...customerClubKeys.all, "levels"] as const,
  activities: (query: ActivitiesQuery) => [...customerClubKeys.all, "activities", query] as const,
};

export function useCustomerClubDashboard(query: DashboardQuery) {
  return useQuery({
    queryKey: customerClubKeys.dashboard(query),
    queryFn: () => getDashboard(query),
  });
}

export function useCustomerClubLevels() {
  return useQuery({
    queryKey: customerClubKeys.levels(),
    queryFn: getLevels,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useRecentActivities(query: Omit<ActivitiesQuery, "offset">) {
  return useInfiniteQuery({
    queryKey: customerClubKeys.activities({ ...query, offset: 0 }),
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getRecentActivities({ ...query, offset: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.offset + lastPage.items.length : undefined,
  });
}
