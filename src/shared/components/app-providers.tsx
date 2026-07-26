"use client";

import { domAnimation, LazyMotion } from "motion/react";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { Toaster } from "sonner";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { QueryProvider } from "@/shared/lib/query/query-provider";

export function AppProviders({ children }: PropsWithChildren) {
  useEffect(() => {
    let cancelled = false;

    const hydrateAuthStore = async () => {
      try {
        await Promise.resolve(useAuthStore.persist.rehydrate());
      } finally {
        if (cancelled) return;

        const { accessToken, setHasHydrated } = useAuthStore.getState();

        useAuthStore.setState({
          isAuthenticated: Boolean(accessToken),
        });

        setHasHydrated(true);
      }
    };

    void hydrateAuthStore();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <QueryProvider>
        {children}
        <Toaster position="top-center" richColors dir="rtl" />
      </QueryProvider>
    </LazyMotion>
  );
}
