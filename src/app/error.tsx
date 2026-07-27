"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/shared/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      className="grid min-h-screen place-items-center bg-slate-100 p-4"
      dir="rtl"
    >
      <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
        <AlertTriangle className="mx-auto mb-4 size-12 text-rose-500" />
        <h1 className="mb-3 text-xl font-black">خطایی در نمایش صفحه رخ داد</h1>
        <p className="mb-6 text-sm leading-7 text-slate-500">
          لطفاً دوباره تلاش کنید. در صورت تکرار خطا، گزارش فنی را بررسی کنید.
        </p>
        <Button onClick={reset}>
          <RotateCcw />
          تلاش مجدد
        </Button>
      </div>
    </main>
  );
}
