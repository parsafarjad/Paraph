"use client";

import * as Tabs from "@radix-ui/react-tabs";
import {
  ArrowLeftRight,
  Coins,
  Eye,
  Gift,
  LoaderCircle,
  MinusCircle,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";

import { useCustomerClubStore } from "@/features/customer-club/store/customer-club.store";
import {
  RecentActivitiesTypeEnum,
  type RecentActivitiesFilter,
  type RecentActivity,
} from "@/features/customer-club/types/customer-club.types";
import { EmptyState } from "@/shared/components/ui/empty-state";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/utils/cn";
import { formatNumber } from "@/shared/utils/format";

const filters: ReadonlyArray<readonly [RecentActivitiesFilter, string]> = [
  ["ALL", "نمایش همه"],
  [RecentActivitiesTypeEnum.SCORE, "امتیاز"],
  [RecentActivitiesTypeEnum.COIN, "سکه"],
  [RecentActivitiesTypeEnum.BOTH, "دوگانه"],
  [RecentActivitiesTypeEnum.SPENTCOIN, "برداشت سکه"],
  [RecentActivitiesTypeEnum.TRANSFERCOIN, "انتقال سکه"],
];

interface RecentActivitiesProps {
  items: RecentActivity[];
  isLoading: boolean;
  isFetching: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
}

const persianMonthFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  month: "long",
});

const persianTimeFormatter = new Intl.DateTimeFormat("fa-IR", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function formatActivityTimestamp(value?: string) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfActivityDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
  const differenceInDays = Math.round(
    (startOfActivityDay - startOfToday) / 86_400_000,
  );

  const dayLabel =
    differenceInDays === 0
      ? "امروز"
      : differenceInDays === -1
        ? "دیروز"
        : persianMonthFormatter.format(date);

  return `${dayLabel} - ${persianTimeFormatter.format(date)}`;
}

export function RecentActivities({
  items,
  isLoading,
  isFetching,
  hasNextPage = false,
  isFetchingNextPage,
  onLoadMore,
}: RecentActivitiesProps) {
  const activityType = useCustomerClubStore((state) => state.activityType);
  const setActivityType = useCustomerClubStore((state) => state.setActivityType);

  return (
    <section aria-labelledby="recent-activities-title" className="min-w-0">
      <div className="mb-[27px] flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
        <div className="shrink-0 text-right">
          <h2
            id="recent-activities-title"
            className="text-[23px] font-black leading-8 text-[#171717]"
          >
            فعالیت‌های اخیر
          </h2>
          <p className="mt-[26px] whitespace-nowrap text-[12px] leading-6 text-[#89939a]">
            مروری بر آخرین فعالیت‌ها و دستاوردهای شما
          </p>
        </div>

        <Tabs.Root
          dir="rtl"
          value={activityType}
          onValueChange={(value) => setActivityType(value as RecentActivitiesFilter)}
          className="min-w-0 lg:pt-0"
        >
          <Tabs.List className="flex h-[42px] max-w-full items-center gap-0 overflow-x-auto rounded-[22px] border border-[#d6dadd] bg-[#f0f2f3] p-[4px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filters.map(([value, label]) => (
              <Tabs.Trigger
                key={value}
                value={value}
                className="h-[32px] shrink-0 rounded-[17px] px-[15px] text-[10px] font-medium text-[#42484d] outline-none transition data-[state=active]:border data-[state=active]:border-[#1c1c1c] data-[state=active]:bg-white data-[state=active]:font-bold data-[state=active]:text-[#1c1c1c]"
              >
                {label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>

        <button
          type="button"
          onClick={hasNextPage ? onLoadMore : undefined}
          aria-disabled={!hasNextPage || isFetchingNextPage}
          className="inline-flex h-8 shrink-0 items-center gap-2 self-start rounded-lg px-2 text-[12px] font-semibold text-[#202326] outline-none transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-sky-300 disabled:cursor-default"
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Eye className="size-4" strokeWidth={1.8} />
          )}
          لیست کامل
        </button>
      </div>

      {isLoading ? (
        <RecentActivitiesSkeleton />
      ) : items.length === 0 ? (
        <div className="rounded-[24px] bg-[#f5f7f7] py-10">
          <EmptyState message="فعالیتی با فیلتر انتخاب‌شده پیدا نشد." />
        </div>
      ) : (
        <div className="space-y-2" aria-busy={isFetching}>
          {items.slice(0, 10).map((activity) => (
            <ActivityRow key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </section>
  );
}

function RecentActivitiesSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className="h-12 w-full rounded-[24px] bg-[#edf0f1]" />
      ))}
    </div>
  );
}

function ActivityRow({ activity }: { activity: RecentActivity }) {
  const config = getActivityConfig(activity.type);
  const amounts = getActivityAmounts(activity);
  const description = activity.taskDescription || activity.taskTitle;

  return (
    <article
      dir="ltr"
      className="grid min-h-12 grid-cols-[minmax(0,1fr)_auto_40px] items-center gap-3 rounded-[24px] bg-[#f5f7f7] px-2.5 py-1.5 sm:grid-cols-[112px_58px_minmax(0,1fr)_120px_40px] sm:gap-3 sm:px-3"
    >
      <time
        dir="rtl"
        className="hidden items-center whitespace-nowrap text-[9px] font-medium text-[#9aa3a9] sm:flex"
      >
        {formatActivityTimestamp(activity.createdAt)}
      </time>

      <span
        dir="rtl"
        className="hidden h-6 items-center justify-center rounded-full bg-[#f0f2f3] px-2 text-[9px] font-bold text-[#31363a] sm:flex"
      >
        موفق
      </span>

      <p
        dir="rtl"
        className="min-w-0 truncate text-right text-[11px] font-medium leading-6 text-[#303438]"
        title={description}
      >
        {description}
      </p>

      <div
        dir="rtl"
        className="flex min-w-[84px] flex-col items-start justify-center whitespace-nowrap text-right text-[11px] font-black leading-[18px] text-[#17191b] sm:min-w-0"
      >
        {amounts.map((amount) => (
          <span key={amount}>{amount}</span>
        ))}
      </div>

      <span
        className={cn(
          "grid size-9 place-items-center rounded-full bg-white",
          config.className,
        )}
        aria-hidden="true"
      >
        {config.icon}
      </span>
    </article>
  );
}

function getActivityAmounts(activity: RecentActivity) {
  const score = activity.scoreAmount;
  const coin = activity.coinAmount;

  switch (activity.type) {
    case RecentActivitiesTypeEnum.SPENTCOIN:
      return [`-${formatNumber(Math.abs(coin || score))} برداشت`];

    case RecentActivitiesTypeEnum.TRANSFERCOIN:
      return [`-${formatNumber(Math.abs(coin || score))} انتقال`];

    case RecentActivitiesTypeEnum.COIN:
      return [`${signed(coin)} سکه`];

    case RecentActivitiesTypeEnum.SCORE:
      return [`${signed(score)} امتیاز`];

    case RecentActivitiesTypeEnum.BOTH:
      return [
        ...(score !== 0 ? [`${signed(score)} امتیاز`] : []),
        ...(coin !== 0 ? [`${signed(coin)} سکه`] : []),
      ];

    default:
      return [
        ...(score !== 0 ? [`${signed(score)} امتیاز`] : []),
        ...(coin !== 0 ? [`${signed(coin)} سکه`] : []),
      ].length
        ? [
            ...(score !== 0 ? [`${signed(score)} امتیاز`] : []),
            ...(coin !== 0 ? [`${signed(coin)} سکه`] : []),
          ]
        : ["۰ امتیاز"];
  }
}

function signed(value: number) {
  return `${value > 0 ? "+" : ""}${formatNumber(value)}`;
}

function getActivityConfig(type: string) {
  switch (type) {
    case RecentActivitiesTypeEnum.COIN:
      return {
        icon: <Coins className="size-[19px]" strokeWidth={1.9} />,
        className: "text-[#57b8ff]",
      };

    case RecentActivitiesTypeEnum.SCORE:
      return {
        icon: <Zap className="size-[19px]" strokeWidth={2} />,
        className: "text-[#55e1bd]",
      };

    case RecentActivitiesTypeEnum.SPENTCOIN:
      return {
        icon: <MinusCircle className="size-[19px]" strokeWidth={1.9} />,
        className: "text-[#ff8cad]",
      };

    case RecentActivitiesTypeEnum.TRANSFERCOIN:
      return {
        icon: <ArrowLeftRight className="size-[19px]" strokeWidth={1.9} />,
        className: "text-[#75dec7]",
      };

    case RecentActivitiesTypeEnum.BOTH:
      return {
        icon: <Gift className="size-[19px]" strokeWidth={1.9} />,
        className: "text-[#5bd9bc]",
      };

    default:
      return {
        icon: <Sparkles className="size-[19px]" strokeWidth={1.9} />,
        className: "text-[#93a1ab]",
      };
  }
}
