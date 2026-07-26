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
import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/shared/utils/cn";

const navigationItems = [
  { label: "کالا", href: "/", hasMenu: true },
  { label: "خدمات", href: "/", hasMenu: true },
  { label: "فروشندگان", href: "/", hasMenu: false },
  { label: "نمایندگی‌ها", href: "/", hasMenu: false },
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
        "focus-ring grid size-8 place-items-center rounded-lg text-[#111719] transition-colors",
        "hover:bg-[#f3f6f7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20aee7]/35",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 h-12 border-b border-[#edf0f1] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-[1180px] items-center px-4 xl:px-0">
        <div className="flex shrink-0 items-center gap-7">
          <Link
            href="/"
            aria-label="صفحه اصلی پاراف"
            className="relative block h-10 w-[150px] shrink-0"
          >
            <Image
              src="/assets/paraf-brand.svg"
              alt="پاراف؛ بازار کالا و خدمات"
              fill
              priority
              sizes="150px"
              className="object-contain"
            />
          </Link>

          <nav aria-label="ناوبری اصلی" className="hidden items-center gap-6 lg:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex h-9 items-center gap-1 whitespace-nowrap text-[11px] font-semibold text-[#56646b] transition-colors hover:text-[#111719]"
              >
                <span>{item.label}</span>
                {item.hasMenu ? (
                  <ChevronDown
                    aria-hidden="true"
                    className="size-3 stroke-[1.7] text-[#7c878c] transition-transform group-hover:translate-y-0.5"
                  />
                ) : null}
              </Link>
            ))}
          </nav>
        </div>

        <div
          role="search"
          className="ms-auto hidden h-[28px] w-[230px] shrink-0 items-center rounded-full border border-[#cbd3d7] bg-[#f3f6f7] px-3 shadow-[inset_0_1px_1px_rgba(15,23,42,0.03)] md:flex"
        >
          <Search aria-hidden="true" className="size-4 shrink-0 stroke-[1.7] text-[#687980]" />
          <input
            type="search"
            aria-label="جستجو در آگهی‌ها"
            placeholder="جستجو در آگهی‌ها..."
            className="h-full min-w-0 flex-1 bg-transparent px-2 text-right text-[10px] text-[#46545a] outline-none placeholder:text-[#adb6ba]"
          />
        </div>

        <div className="ms-4 hidden h-full shrink-0 items-center xl:flex">
          <button
            type="button"
            className="focus-ring flex h-8 items-center gap-1 px-2 text-[10px] font-semibold text-[#9aa4a8] transition-colors hover:text-[#59676d]"
            aria-label="انتخاب زبان و واحد پول"
          >
            <Languages aria-hidden="true" className="size-3.5 stroke-[1.7] text-[#a6afb3]" />
            <span className="whitespace-nowrap">فارسی / IRT</span>
          </button>

          <Link
            href="/"
            className="mx-2 inline-flex h-8 items-center whitespace-nowrap px-1 text-[11px] font-extrabold text-[#13191c] transition-colors hover:text-[#159fd8]"
          >
            ثبت آگهی جدید
          </Link>

          <span aria-hidden="true" className="mx-2 h-7 w-px bg-[#e8ecee]" />

          <div dir="ltr" className="flex items-center gap-[2px]">
            <HeaderIconButton label="اپلیکیشن‌ها">
              <Grid2X2 className="size-[17px] stroke-[1.9]" />
            </HeaderIconButton>
            <HeaderIconButton label="سبد خرید">
              <ShoppingCart className="size-[17px] stroke-[1.8]" />
            </HeaderIconButton>
            <HeaderIconButton label="اعلان‌ها">
              <Bell className="size-[17px] stroke-[1.8]" />
            </HeaderIconButton>
          </div>
        </div>

        <div className="ms-auto flex items-center gap-1 xl:hidden">
          <HeaderIconButton label="سبد خرید" className="hidden sm:grid">
            <ShoppingCart className="size-5" />
          </HeaderIconButton>
          <HeaderIconButton label="باز کردن منو">
            <Menu className="size-6" />
          </HeaderIconButton>
        </div>
      </div>
    </header>
  );
}
