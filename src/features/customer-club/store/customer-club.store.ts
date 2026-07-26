import { create } from "zustand";
import { persist } from "zustand/middleware";

import { RecentActivitiesTypeEnum } from "@/features/customer-club/types/customer-club.types";

interface CustomerClubState {
  scope: "user" | "vitrin";
  vitrinId?: string;
  activityType: RecentActivitiesTypeEnum;
  setUserScope: () => void;
  setVitrinScope: (vitrinId: string) => void;
  setActivityType: (activityType: RecentActivitiesTypeEnum) => void;
}

export const useCustomerClubStore = create<CustomerClubState>()(
  persist(
    (set) => ({
      scope: "user",
      vitrinId: undefined,
      activityType: RecentActivitiesTypeEnum.BOTH,
      setUserScope: () => set({ scope: "user", vitrinId: undefined }),
      setVitrinScope: (vitrinId) => set({ scope: "vitrin", vitrinId }),
      setActivityType: (activityType) => set({ activityType }),
    }),
    {
      name: "paraf-customer-club-selection",
      partialize: ({ scope, vitrinId }) => ({ scope, vitrinId }),
    },
  ),
);
