"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle2, CheckSquare, Sparkles, X } from "lucide-react";

export function MissionDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex h-11 min-w-[210px] items-center justify-center gap-3 rounded-[10px] bg-[#20aae5] px-6 text-[16px] font-black text-white shadow-[0_6px_14px_rgba(32,170,229,0.20)] outline-none transition-colors hover:bg-[#159ed8] focus-visible:ring-2 focus-visible:ring-[#20aae5]/45 focus-visible:ring-offset-2"
        >
          <CheckSquare className="size-5" />
          مشاهده ماموریت
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in" />
        <Dialog.Content
          dir="rtl"
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100%_-_2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-2xl outline-none data-[state=closed]:animate-out data-[state=open]:animate-in"
        >
          <Dialog.Close
            className="absolute left-4 top-4 grid size-9 place-items-center rounded-full bg-slate-100 text-slate-500 hover:text-slate-950"
            aria-label="بستن"
          >
            <X className="size-4" />
          </Dialog.Close>

          <div className="mb-5 grid size-14 place-items-center rounded-2xl bg-violet-100 text-violet-700">
            <Sparkles className="size-7" />
          </div>

          <Dialog.Title className="text-xl font-black text-slate-950">
            ماموریت‌های باشگاه مشتریان
          </Dialog.Title>
          <Dialog.Description className="mt-3 text-sm leading-7 text-slate-500">
            API لیست ماموریت‌ها در مستند فعلی ارائه نشده است. این پنجره محل اتصال به
            endpoint ماموریت‌ها و نمایش جزئیات آن خواهد بود.
          </Dialog.Description>

          <div className="mt-5 space-y-3 rounded-2xl bg-slate-50 p-4 text-xs text-slate-600">
            <p className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-500" /> نمایش لیست ماموریت‌ها
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-500" /> ثبت وضعیت انجام ماموریت
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-500" /> نمایش پاداش سکه و امتیاز
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
