import { ArrowLeft, ChevronLeft, CircleHelp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PageContainer } from "@/shared/components/layout/page-container";
import { formatNumber } from "@/shared/utils/format";

type CustomerClubBreadcrumbProps = {
  coins?: number;
  score?: number;
  isLoading?: boolean;
};

export function CustomerClubBreadcrumb({
  coins = 0,
  score = 0,
  isLoading = false,
}: CustomerClubBreadcrumbProps) {
  return (
    <section className="h-[49px] border-b border-[#ecf0f2] bg-[#f5f7f7]">
      <PageContainer className="flex h-full items-center justify-between">
        <nav aria-label="مسیر صفحه" className="flex min-w-0 items-center gap-3 text-[12px]">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3 font-bold text-[#15181a] transition-colors hover:text-[#0f6489]"
          >
            <ArrowLeft aria-hidden="true" className="size-5 stroke-[1.7]" />
            <span>برگشت</span>
          </Link>

          <Link
            href="/"
            className="shrink-0 font-medium text-[#667880] transition-colors hover:text-[#15181a]"
          >
            صفحه اصلی
          </Link>

          <ChevronLeft aria-hidden="true" className="size-4 shrink-0 text-[#a3aeb3]" />

          <span aria-current="page" className="truncate text-[#a3aeb3]">
            پاراف کلاب
          </span>
        </nav>

        <div dir="ltr" className="hidden items-center gap-4 md:flex">
          <div
            aria-label={`امتیاز وفاداری: ${formatNumber(score)}`}
            className="relative h-8 w-[196px] overflow-visible rounded-full bg-white shadow-[0_0_12px_rgba(102,120,128,0.25)]"
          >
            <span
              dir="rtl"
              className="absolute right-[35px] top-1 flex h-6 min-w-[76px] items-center justify-center rounded-full bg-[linear-gradient(90deg,#6841ea_0%,#9747ff_100%)] px-3 text-[12px] font-bold leading-none text-white"
            >
              {isLoading ? "—" : formatNumber(score)}
            </span>
            <Image
              src="/assets/loyalty-cup.svg"
              alt=""
              aria-hidden="true"
              width={38}
              height={44}
              className="absolute -top-[6px] right-0 z-10 h-11 w-[38px] object-contain"
            />
          </div>

          <button
            type="button"
            aria-label="راهنمای کیف پول و امتیازها"
            className="grid size-8 place-items-center rounded-full text-[#a3aeb3] transition-colors hover:bg-white hover:text-[#667880] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#19a7e5]/35"
          >
            <CircleHelp aria-hidden="true" className="size-5 stroke-[1.6]" />
          </button>

          <div
            dir="rtl"
            className="flex h-8 min-w-[190px] items-center justify-center gap-1.5 rounded-lg border border-[#c2c9cc] bg-white/70 px-4 text-[12px]"
          >
            <span className="font-medium text-[#859399]">کیف پول:</span>
            <strong className="font-bold text-[#15181a]">
              {isLoading ? "—" : formatNumber(coins)}
            </strong>
            <span className="text-[10px] text-[#a3aeb3]">تومان</span>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
