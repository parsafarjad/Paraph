import {
  Bell,
  ChevronDown,
  Grid2X2,
  Languages,
  Menu,
  Search,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { PageContainer } from "@/shared/components/layout/page-container";
import { cn } from "@/shared/utils/cn";

const navigationItems = [
  { label: "کالا", href: "#", hasMenu: true },
  { label: "خدمات", href: "#", hasMenu: true },
  { label: "فروشندگان", href: "#", hasMenu: false },
  { label: "نمایندگی‌ها", href: "#", hasMenu: false },
] as const;

type HeaderIconButtonProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

function HeaderIconButton({ label, children, className }: HeaderIconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "grid size-10 place-items-center rounded-lg text-[#15181a] transition-colors hover:bg-[#f5f7f7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#19a7e5]/35",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function SiteHeader() {
  return (
    <header className="relative z-50 h-[73px] border-b border-[#ecf0f2] bg-white">
      <PageContainer className="flex h-full items-center justify-between">
        <div className="flex min-w-0 items-center gap-10">
          <Link
            href="/"
            aria-label="صفحه اصلی پاراف"
            className="relative block h-[49px] w-[174px] shrink-0"
          >
            <Image
              src="/assets/paraf-brand.svg"
              alt="پاراف؛ بازار کالا و خدمات"
              fill
              priority
              sizes="174px"
              className="object-contain object-right"
            />
          </Link>

          <nav aria-label="ناوبری اصلی" className="hidden items-center gap-9 xl:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex h-10 items-center gap-1.5 whitespace-nowrap text-[16px] font-medium leading-7 text-[#667880] transition-colors hover:text-[#15181a]"
              >
                <span>{item.label}</span>
                {item.hasMenu ? (
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 stroke-[1.6] text-[#859399] transition-transform group-hover:translate-y-0.5"
                  />
                ) : null}
              </Link>
            ))}
          </nav>
        </div>

        <label className="mx-6 hidden h-10 w-[350px] shrink-0 items-center rounded-full border border-[#c2c9cc] bg-[#ecf0f2] px-4 shadow-[inset_0_1px_2px_rgba(21,24,26,0.04)] lg:flex">
          <Search aria-hidden="true" className="size-5 shrink-0 stroke-[1.6] text-[#667880]" />
          <input
            type="search"
            aria-label="جستجو در آگهی‌ها"
            placeholder="جستجو در آگهی‌ها..."
            className="h-full min-w-0 flex-1 bg-transparent px-3 text-right text-[14px] text-[#49575d] outline-none placeholder:text-[#a3aeb3]"
          />
        </label>

        <div dir="ltr" className="hidden shrink-0 items-center gap-2 xl:flex">
          <div className="flex items-center gap-1">
            <HeaderIconButton label="اپلیکیشن‌ها">
              <Grid2X2 className="size-5 stroke-[1.8]" />
            </HeaderIconButton>
            <HeaderIconButton label="سبد خرید">
              <ShoppingCart className="size-[22px] stroke-[1.7]" />
            </HeaderIconButton>
            <HeaderIconButton label="اعلان‌ها">
              <Bell className="size-[21px] stroke-[1.7]" />
            </HeaderIconButton>
          </div>

          <span aria-hidden="true" className="mx-2 h-10 w-px bg-[#ecf0f2]" />

          <Link
            dir="rtl"
            href="#"
            className="inline-flex h-10 items-center whitespace-nowrap px-3 text-[16px] font-bold text-[#15181a] transition-colors hover:text-[#0f6489]"
          >
            ثبت آگهی جدید
          </Link>

          <button
            type="button"
            dir="rtl"
            className="flex h-10 items-center gap-2 whitespace-nowrap px-3 text-[14px] font-medium text-[#a3aeb3] transition-colors hover:text-[#667880]"
            aria-label="انتخاب زبان و واحد پول"
          >
            <Languages aria-hidden="true" className="size-[18px] stroke-[1.6]" />
            <span>فارسی / IRT</span>
          </button>
        </div>

        <div className="flex items-center gap-1 xl:hidden">
          <HeaderIconButton label="سبد خرید" className="hidden sm:grid">
            <ShoppingCart className="size-5" />
          </HeaderIconButton>
          <HeaderIconButton label="باز کردن منو">
            <Menu className="size-6" />
          </HeaderIconButton>
        </div>
      </PageContainer>
    </header>
  );
}
