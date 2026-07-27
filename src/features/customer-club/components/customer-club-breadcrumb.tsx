import { ArrowRight, ChevronLeft, CircleHelp } from "lucide-react";
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
        <nav
          aria-label="مسیر صفحه"
          className="flex min-w-0 items-center gap-3 text-[12px]"
        >
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3 font-bold text-[#15181a] transition-colors hover:text-[#0f6489]"
          >
            <ArrowRight aria-hidden="true" className="size-5 stroke-[1.7]" />
            <span>برگشت</span>
          </Link>

          <Link
            href="/"
            className="shrink-0 font-medium text-[#667880] transition-colors hover:text-[#15181a]"
          >
            صفحه اصلی
          </Link>

          <ChevronLeft
            aria-hidden="true"
            className="size-4 shrink-0 text-[#a3aeb3]"
          />

          <span aria-current="page" className="truncate text-[#a3aeb3]">
            پاراف کلاب
          </span>
        </nav>

        <div dir="ltr" className="hidden items-center gap-4 md:flex">
          <div
  aria-label={`امتیاز وفاداری: ${formatNumber(score)}`}
  className="
    relative h-8 w-[196px] shrink-0
    overflow-visible rounded-full bg-white
    shadow-[0_2px_12px_rgba(102,120,128,0.28)]
  "
>
  <span
    dir="rtl"
    className="
      absolute right-[20px] top-1/2
      flex h-6 w-[76px] -translate-y-1/2
      items-center justify-center rounded-full
      bg-[linear-gradient(90deg,#7344eb_0%,#8b45f6_100%)]
      pr-4 text-[12px] font-bold leading-none text-white
    "
  >
    {isLoading ? "—" : formatNumber(score)}
  </span>

  {/* White background under the transparent image */}
  <span
    aria-hidden="true"
    className="
      absolute right-0 top-1/2 z-10
      grid size-8 -translate-y-1/2
      place-items-center rounded-full bg-white
    "
  >
    <Image
      src="/assets/loyalty-cup.svg"
      alt=""
      width={30}
      height={34}
      priority
      draggable={false}
      className="
        pointer-events-none
        h-[34px] w-[30px]
        select-none object-contain
      "
    />
  </span>
</div>

          <button
            type="button"
            aria-label="راهنمای کیف پول و امتیازها"
            className="grid size-8 place-items-center rounded-full text-[#a3aeb3] transition-colors hover:bg-white hover:text-[#667880] focus-visible:ring-2 focus-visible:ring-[#19a7e5]/35 focus-visible:outline-none"
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
