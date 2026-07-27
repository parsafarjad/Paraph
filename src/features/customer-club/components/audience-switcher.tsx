"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import type { ReactNode } from "react";

import { useCustomerClubStore } from "@/features/customer-club/store/customer-club.store";
import type { UserVitrin } from "@/features/customer-club/types/customer-club.types";
import { PageContainer } from "@/shared/components/layout/page-container";
import { cn } from "@/shared/utils/cn";

interface AudienceSwitcherProps {
  vitrins: UserVitrin[];
}

export function AudienceSwitcher({ vitrins }: AudienceSwitcherProps) {
  const scope = useCustomerClubStore((state) => state.scope);
  const vitrinId = useCustomerClubStore((state) => state.vitrinId);
  const setUserScope = useCustomerClubStore((state) => state.setUserScope);
  const setVitrinScope = useCustomerClubStore((state) => state.setVitrinScope);

  const selectedValue =
    scope === "vitrin" && vitrinId ? `vitrin:${vitrinId}` : "user";

  return (
    <section
      aria-label="انتخاب باشگاه مشتریان"
      className="bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,.50)_15%,rgba(255,255,255,.05)_32%,rgba(255,255,255,.05)_59%,rgba(255,255,255,.50)_79%,rgba(255,255,255,0)_100%)]"
    >
      <PageContainer
        dir="ltr"
        className="flex min-h-[56px] flex-col justify-center gap-4 py-2 min-[1440px]:px-10 min-[1440px]:py-1 md:flex-row md:items-center md:justify-between"
      >
        <nav
          dir="rtl"
          aria-label="راهنمای باشگاه مشتریان"
          className="flex items-center gap-8 text-[14px] leading-[25px] font-bold text-[#15181a] min-[1440px]:gap-10"
        >
          <Link
            href="#faq"
            className="rounded-md transition-colors outline-none hover:text-[#0f6489] focus-visible:ring-2 focus-visible:ring-[#19a7e5]/40"
          >
            سوالات متداول شما
          </Link>
          <Link
            href="#rules"
            className="rounded-md transition-colors outline-none hover:text-[#0f6489] focus-visible:ring-2 focus-visible:ring-[#19a7e5]/40"
          >
            قوانین و مقررات
          </Link>
        </nav>

        <div
          dir="rtl"
          className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-2"
        >
          <p className="shrink-0 text-[14px] leading-[25px] font-semibold text-[#15181a]">
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
              className="flex h-12 max-w-full [scrollbar-width:none] items-center overflow-x-auto rounded-lg border border-black/10 bg-[#e0e4e6] p-1 [&::-webkit-scrollbar]:hidden"
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
      </PageContainer>
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
        "h-10 min-w-[126px] shrink-0 rounded-lg px-3 text-[16px] leading-7 font-normal text-[#15181a] transition-colors outline-none",
        "hover:bg-white/60 focus-visible:ring-2 focus-visible:ring-[#19a7e5]/45",
        "data-[state=active]:border-2 data-[state=active]:border-[#19a7e5] data-[state=active]:bg-white data-[state=active]:leading-[30px] data-[state=active]:font-bold data-[state=active]:shadow-[0_1px_2px_rgba(15,23,42,0.08)]",
      )}
    >
      {children}
    </Tabs.Trigger>
  );
}
