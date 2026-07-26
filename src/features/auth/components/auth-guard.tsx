"use client";

import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";

import { useAuthStore } from "@/features/auth/store/auth.store";

function FullPageLoader() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#e6e5ff]" aria-live="polite">
      <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-bold text-slate-700 shadow-lg">
        <LoaderCircle className="size-5 animate-spin text-sky-600" />
        در حال بررسی نشست کاربری...
      </div>
    </main>
  );
}

export function AuthGuard({ children }: PropsWithChildren) {
  const router = useRouter();
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated || !isAuthenticated) return <FullPageLoader />;
  return children;
}

export function GuestGuard({ children }: PropsWithChildren) {
  const router = useRouter();
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (hasHydrated && isAuthenticated) {
      router.replace("/");
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated || isAuthenticated) return <FullPageLoader />;
  return children;
}
