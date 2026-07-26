"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

import {
  DEFAULT_CLUB_LEVELS,
  readCachedLevels,
  writeCachedLevels,
} from "@/features/customer-club/data/levels-fallback";
import {
  getDashboard,
  getLevels,
  getRecentActivities,
} from "@/features/customer-club/services/customer-club.api";
import type {
  ActivitiesQuery,
  ClubLevel,
  DashboardQuery,
} from "@/features/customer-club/types/customer-club.types";

export const customerClubKeys = {
  all: ["customer-club"] as const,
  dashboard: (query: DashboardQuery) => [...customerClubKeys.all, "dashboard", query] as const,
  levels: () => [...customerClubKeys.all, "levels"] as const,
  activities: (query: ActivitiesQuery) => [...customerClubKeys.all, "activities", query] as const,
};

function shouldRetryLevelsRequest(failureCount: number, error: unknown) {
  if (failureCount >= 3) {
    return false;
  }

  if (!axios.isAxiosError(error)) {
    return true;
  }

  const status = error.response?.status;

  // Retry transient network errors, rate limiting and backend 5xx responses.
  if (!status || status === 408 || status === 429 || status >= 500) {
    return true;
  }

  return false;
}

export function useCustomerClubDashboard(query: DashboardQuery) {
  return useQuery({
    queryKey: customerClubKeys.dashboard(query),
    queryFn: () => getDashboard(query),
  });
}

export function useCustomerClubLevels() {
  const [cachedLevels, setCachedLevels] = useState<ClubLevel[] | null>(null);

  const query = useQuery({
    queryKey: customerClubKeys.levels(),
    queryFn: getLevels,
    staleTime: 15 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    retry: shouldRetryLevelsRequest,
    retryDelay: (attemptIndex) => Math.min(1_000 * 2 ** attemptIndex, 8_000),
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    setCachedLevels(readCachedLevels());
  }, []);

  useEffect(() => {
    if (!query.data?.length) {
      return;
    }

    writeCachedLevels(query.data);
    setCachedLevels(query.data);
  }, [query.data]);

  const displayLevels = useMemo(() => {
    if (query.data?.length) {
      return query.data;
    }

    if (cachedLevels?.length) {
      return cachedLevels;
    }

    return DEFAULT_CLUB_LEVELS;
  }, [cachedLevels, query.data]);

  return {
    ...query,
    data: displayLevels,
    isUsingFallback: !query.data?.length,
    isBlockingError: query.isError && displayLevels.length === 0,
  };
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
