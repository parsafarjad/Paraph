import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  setTokens: (tokens: AuthTokens) => void;
  clearAuth: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      hasHydrated: false,
      setTokens: ({ accessToken, refreshToken }) =>
        set({
          accessToken,
          refreshToken,
          isAuthenticated: Boolean(accessToken),
        }),
      clearAuth: () =>
        set({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "paraf-customer-club-auth",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: ({ accessToken, refreshToken, isAuthenticated }) => ({
        accessToken,
        refreshToken,
        isAuthenticated,
      }),
    },
  ),
);
