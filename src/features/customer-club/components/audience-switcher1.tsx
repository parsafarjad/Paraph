"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import type { ReactNode } from "react";

import { useCustomerClubStore } from "@/features/customer-club/store/customer-club.store";
import type { UserVitrin } from "@/features/customer-club/types/customer-club.types";
import { cn } from "@/shared/utils/cn";

interface AudienceSwitcherProps {
  vitrins: UserVitrin[];
}

export function AudienceSwitcher({ vitrins }: AudienceSwitcherProps) {
  const scope = useCustomerClubStore((state) => state.scope);
  const vitrinId = useCustomerClubStore((state) => state.vitrinId);
  const setUserScope = useCustomerClubStore((state) => state.setUserScope);
  const setVitrinScope = useCustomerClubStore((state) => state.setVitrinScope);

  const selectedValue = scope === "vitrin" && vitrinId ? `vitrin:${vitrinId}` : "user";

  return (
    <section aria-label="انتخاب باشگاه مشتریان" >
      <div className="mx-auto flex min-h-[72px] w-[calc(100%_-_32px)] max-w-[1600px] flex-col justify-center gap-4 py-3 md:flex-row md:items-start md:justify-between md:py-1">
        <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <p className="shrink-0 text-[14px] font-medium text-[#252525]">
            انتخاب باشگاه مشتریان:
          </p>

          <Tabs.Root
            dir="rtl"
            value={selectedValue}
            onValueChange={(nextValue) => {
              if (nextValue === "user") {
                setUserScope();
                return;
              }

              setVitrinScope(nextValue.replace("vitrin:", ""));
            }}
            className="min-w-0"
          >
            <Tabs.List
              aria-label="نوع پروفایل باشگاه مشتریان"
              className="flex h-12 max-w-full items-center overflow-x-auto rounded-[8px] border border-[#cfd5d9] bg-[#e8ecef] p-[3px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <AudienceTab value="user">پروفایل شخصی</AudienceTab>

              {vitrins.map((vitrin) => (
                <AudienceTab key={vitrin.id} value={`vitrin:${vitrin.id}`}>
                  {vitrin.companyName}
                </AudienceTab>
              ))}
            </Tabs.List>
          </Tabs.Root>
        </div>

        <nav
          aria-label="راهنمای باشگاه مشتریان"
          className="flex items-center gap-10 text-[14px] font-bold text-[#161616] md:min-h-12"
        >
          <Link
            href="#rules"
            className="rounded-md outline-none transition-colors hover:text-[#159ed8] focus-visible:ring-2 focus-visible:ring-[#20aae5]/40"
          >
            قوانین و مقررات
          </Link>
          <Link
            href="#faq"
            className="rounded-md outline-none transition-colors hover:text-[#159ed8] focus-visible:ring-2 focus-visible:ring-[#20aae5]/40"
          >
            سوالات متداول شما
          </Link>
        </nav>
      </div>
    </section>
  );
}

function AudienceTab({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  return (
    <Tabs.Trigger
      value={value}
      className={cn(
        "h-10 min-w-[126px] shrink-0 rounded-[7px] px-4 text-[15px] font-medium text-[#2f3437] outline-none transition-colors",
        "hover:bg-white/60 focus-visible:ring-2 focus-visible:ring-[#20aae5]/45",
        "data-[state=active]:border-2 data-[state=active]:border-[#139edc] data-[state=active]:bg-white data-[state=active]:font-black data-[state=active]:text-[#171717] data-[state=active]:shadow-[0_1px_2px_rgba(15,23,42,0.08)]",
      )}
    >
      {children}
    </Tabs.Trigger>
  );
}
