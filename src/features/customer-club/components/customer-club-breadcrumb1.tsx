import { ArrowLeft, ChevronLeft, CircleHelp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    <section className="h-8 border-b border-[#edf0f1] bg-[#f5f7f7]">
      <div className="mx-auto flex h-full max-w-[1180px] items-center justify-between px-4 xl:px-0">
        <nav
          aria-label="مسیر صفحه"
          className="flex min-w-0 items-center gap-2 text-[10px]"
        >
          <Link
            href="/"
            className="flex shrink-0 items-center gap-[10px] font-extrabold text-[#161c1f] transition-colors hover:text-[#159fd8]"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5 stroke-[2]" />
            <span>برگشت</span>
          </Link>

          <Link
            href="/"
            className="shrink-0 font-semibold text-[#607078] transition-colors hover:text-[#1b2428]"
          >
            صفحه اصلی
          </Link>

          <ChevronLeft
            aria-hidden="true"
            className="size-[13px] shrink-0 stroke-[1.8] text-[#9aa5aa]"
          />

          <span aria-current="page" className="truncate text-[#9aa5aa]">
            پاراف کلاب
          </span>
        </nav>

        <div dir="ltr" className="hidden items-center gap-3 md:flex">
          <div
            aria-label={`امتیاز وفاداری: ${formatNumber(score)}`}
            className="relative h-6 w-[152px] overflow-visible rounded-full bg-white shadow-[0_2px_10px_rgba(30,45,52,0.16)]"
          >
            <span
              className="absolute top-[3px] right-7 flex h-[18px] w-14 items-center justify-center rounded-full bg-[linear-gradient(90deg,#6841ea_0%,#9f48ef_100%)] text-[9px] leading-none font-extrabold text-white"
              dir="rtl"
            >
              {isLoading ? "—" : formatNumber(score)}
            </span>
            <div className="z-10 size-6 rounded-full bg-white">
              <Image
                src="/assets/loyalty-cup.svg"
                alt=""
                aria-hidden="true"
                width={26}
                height={30}
                className="absolute -top-[3px] right-px z-20 h-[30px] w-[26px] object-contain"
              />
            </div>
          </div>

          <button
            type="button"
            aria-label="راهنمای کیف پول و امتیازها"
            className="grid size-6 place-items-center rounded-full text-[#a2adb1] transition-colors hover:bg-white hover:text-[#5e6d73] focus-visible:ring-2 focus-visible:ring-[#20aee7]/35 focus-visible:outline-none"
          >
            <CircleHelp
              aria-hidden="true"
              className="size-[19px] stroke-[1.7]"
            />
          </button>

          <div
            dir="rtl"
            className="flex h-6 w-[130px] items-center justify-center gap-1 rounded-md border border-[#c8d0d3] bg-[#f7f9f9] px-2 text-[9px] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]"
          >
            <span className="font-semibold text-[#929da2]">کیف پول :</span>
            <strong className="font-extrabold tracking-[-0.02em] text-[#172024]">
              {isLoading ? "—" : formatNumber(coins)}
            </strong>
            <span className="text-[9px] font-medium text-[#a4adb1]">تومان</span>
          </div>
        </div>
      </div>
    </section>
  );
}
