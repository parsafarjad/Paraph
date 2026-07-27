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
      <div className="flex min-h-[92px] flex-col items-end gap-6">
        <div dir="ltr" className="flex w-full flex-col gap-4 lg:h-[43px] lg:flex-row lg:items-center lg:justify-between">
          <button
            type="button"
            onClick={hasNextPage ? onLoadMore : undefined}
            aria-disabled={!hasNextPage || isFetchingNextPage}
            className="inline-flex h-[33px] shrink-0 items-center gap-2 self-start rounded-lg px-2 text-[14px] font-bold leading-[25px] text-[#15181a] outline-none transition hover:bg-[#f5f7f7] focus-visible:ring-2 focus-visible:ring-[#19a7e5]/35 disabled:cursor-default"
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Eye className="size-4" strokeWidth={1.8} />
            )}
            لیست کامل
          </button>

          <div dir="rtl" className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
            <h2
              id="recent-activities-title"
              className="shrink-0 text-[24px] font-bold leading-[37px] tracking-[-0.18px] text-[#15181a]"
            >
              فعالیت‌های اخیر
            </h2>

            <Tabs.Root
              dir="rtl"
              value={activityType}
              onValueChange={(value) => setActivityType(value as RecentActivitiesFilter)}
              className="min-w-0"
            >
              <Tabs.List className="flex h-[43px] max-w-full items-center overflow-x-auto rounded-full border border-black/10 bg-[#ecf0f2] p-[6px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {filters.map(([value, label]) => (
                  <Tabs.Trigger
                    key={value}
                    value={value}
                    className="h-[30px] shrink-0 rounded-full px-3 text-[12px] font-normal leading-none tracking-[-0.09px] text-[#15181a] outline-none transition data-[state=active]:border data-[state=active]:border-[#15181a] data-[state=active]:bg-white data-[state=active]:font-bold"
                  >
                    {label}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
            </Tabs.Root>
          </div>
        </div>

        <p className="text-right text-[14px] leading-[25px] tracking-[-0.105px] text-[#667880]">
          مروری بر آخرین فعالیت‌ها و دستاوردهات
        </p>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <RecentActivitiesSkeleton />
        ) : items.length === 0 ? (
          <div className="rounded-[24px] bg-[#f5f7f7] py-10">
            <EmptyState message="فعالیتی با فیلتر انتخاب‌شده پیدا نشد." />
          </div>
        ) : (
          <div className="space-y-1" aria-busy={isFetching}>
            {items.slice(0, 10).map((activity) => (
              <ActivityRow key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function RecentActivitiesSkeleton() {
  return (
    <div className="space-y-1">
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className="h-[52px] w-full rounded-full bg-[#edf0f1]" />
      ))}
    </div>
  );
}

// function ActivityRow({ activity }: { activity: RecentActivity }) {
//   const config = getActivityConfig(activity.type);
//   const amounts = getActivityAmounts(activity);
//   const description = activity.taskDescription || activity.taskTitle;

//   return (
//     <article
//       dir="ltr"
//       className="grid h-[52px] grid-cols-[minmax(0,1fr)_auto_40px] items-center gap-3 overflow-hidden rounded-full bg-[#f5f7f7] p-2 sm:grid-cols-[120px_58px_minmax(0,1fr)_100px_40px] sm:px-2"
//     >
//       <time
//         dir="rtl"
//         className="hidden items-center whitespace-nowrap text-[9px] font-medium text-[#9aa3a9] sm:flex"
//       >
//         {formatActivityTimestamp(activity.createdAt)}
//       </time>

//       <span
//         dir="rtl"
//         className="hidden h-6 items-center justify-center rounded-full bg-[#f0f2f3] px-2 text-[9px] font-bold text-[#31363a] sm:flex"
//       >
//         موفق
//       </span>

//       <p
//         dir="rtl"
//         className="min-w-0 truncate text-right text-[11px] font-medium leading-6 text-[#303438]"
//         title={description}
//       >
//         {description}
//       </p>

//       <div
//         dir="rtl"
//         className="flex min-w-[84px] flex-col items-start justify-center whitespace-nowrap text-right text-[11px] font-black leading-[18px] text-[#17191b] sm:min-w-0"
//       >
//         {amounts.map((amount) => (
//           <span key={amount}>{amount}</span>
//         ))}
//       </div>

//       <span
//         className={cn(
//           "grid size-9 place-items-center rounded-full bg-white",
//           config.className,
//         )}
//         aria-hidden="true"
//       >
//         {config.icon}
//       </span>
//     </article>
//   );
// }
function ActivityRow({ activity }: { activity: RecentActivity }) {
  const config = getActivityConfig(activity.type);
  const amounts = getActivityAmounts(activity);
  const description = activity.taskDescription || activity.taskTitle;

  return (
    <article
      dir="ltr"
      className={cn(
        `
          group relative isolate
          grid h-[52px]
          grid-cols-[minmax(0,1fr)_auto_40px]
          items-center gap-3
          overflow-hidden rounded-full
          border border-transparent
          bg-[#f5f7f7] p-2

          transition-[border-color,box-shadow]
          duration-300 ease-out

          sm:grid-cols-[120px_58px_minmax(0,1fr)_100px_40px]
          sm:px-2
        `,
        config.hoverBorderClassName,
      )}
    >
      {/* Animated hover background */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 z-0 rounded-full
          opacity-0 transition-opacity duration-300 ease-out
          group-hover:opacity-100
        "
        style={{
          background: config.hoverBackground,
        }}
      />

      <time
        dir="rtl"
        className="
          relative z-10 hidden items-center whitespace-nowrap
          text-[9px] font-medium text-[#9aa3a9]
          transition-colors duration-300
          sm:flex
        "
      >
        {formatActivityTimestamp(activity.createdAt)}
      </time>

      <span
        dir="rtl"
        className="
          relative z-10 hidden h-6 items-center justify-center
          rounded-full border border-transparent
          bg-[#f0f2f3] px-2
          text-[9px] font-bold text-[#31363a]

          transition-[background-color,border-color,box-shadow]
          duration-300 ease-out

          group-hover:border-[#859196]
          group-hover:bg-white/90
          group-hover:shadow-[0_2px_7px_rgba(42,57,63,0.08)]

          sm:flex
        "
      >
        موفق
      </span>

      <p
        dir="rtl"
        className="
          relative z-10 min-w-0 truncate text-right
          text-[11px] font-medium leading-6 text-[#303438]
        "
        title={description}
      >
        {description}
      </p>

      <div
        dir="rtl"
        className={cn(
          `
            relative z-10
            flex min-w-[84px] flex-col
            items-start justify-center
            whitespace-nowrap text-right
            text-[11px] font-black leading-[18px]
            text-[#17191b]

            transition-colors duration-300 ease-out

            sm:min-w-0
          `,
          config.amountHoverClassName,
        )}
      >
        {amounts.map((amount) => (
          <span key={amount}>{amount}</span>
        ))}
      </div>

      <span
        aria-hidden="true"
        className={cn(
          `
            relative z-10 grid size-9 place-items-center
            rounded-full bg-white

            transition-[color,background-color,transform,box-shadow]
            duration-300 ease-out
            will-change-transform

            group-hover:scale-[1.06]
          `,
          config.iconClassName,
          config.iconHoverClassName,
        )}
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

// function getActivityConfig(type: string) {
//   switch (type) {
//     case RecentActivitiesTypeEnum.COIN:
//       return {
//         icon: <Coins className="size-[19px]" strokeWidth={1.9} />,
//         className: "text-[#57b8ff]",
//       };

//     case RecentActivitiesTypeEnum.SCORE:
//       return {
//         icon: <Zap className="size-[19px]" strokeWidth={2} />,
//         className: "text-[#55e1bd]",
//       };

//     case RecentActivitiesTypeEnum.SPENTCOIN:
//       return {
//         icon: <MinusCircle className="size-[19px]" strokeWidth={1.9} />,
//         className: "text-[#ff8cad]",
//       };

//     case RecentActivitiesTypeEnum.TRANSFERCOIN:
//       return {
//         icon: <ArrowLeftRight className="size-[19px]" strokeWidth={1.9} />,
//         className: "text-[#75dec7]",
//       };

//     case RecentActivitiesTypeEnum.BOTH:
//       return {
//         icon: <Gift className="size-[19px]" strokeWidth={1.9} />,
//         className: "text-[#5bd9bc]",
//       };

//     default:
//       return {
//         icon: <Sparkles className="size-[19px]" strokeWidth={1.9} />,
//         className: "text-[#93a1ab]",
//       };
//   }
// }

function getActivityConfig(type: string) {
  switch (type) {
    case RecentActivitiesTypeEnum.COIN:
      return {
        icon: <Coins className="size-[19px]" strokeWidth={1.9} />,

        iconClassName: "text-[#57bff0]",

        iconHoverClassName: `
          group-hover:bg-[#55bde9]
          group-hover:text-white
          group-hover:shadow-[0_5px_14px_rgba(85,189,233,0.3)]
        `,

        amountHoverClassName: "group-hover:text-[#178eb8]",

        hoverBorderClassName: "hover:border-[#c6eaf6]",

        hoverBackground:
          "linear-gradient(90deg, #dff3fa 0%, #edf9fc 42%, #fbfdfe 100%)",
      };

    case RecentActivitiesTypeEnum.SCORE:
      return {
        icon: <Zap className="size-[19px]" strokeWidth={2} />,

        iconClassName: "text-[#55dfb8]",

        iconHoverClassName: `
          group-hover:bg-[#36c996]
          group-hover:text-white
          group-hover:shadow-[0_5px_14px_rgba(54,201,150,0.3)]
        `,

        amountHoverClassName: "group-hover:text-[#23b884]",

        hoverBorderClassName: "hover:border-[#b9ecd9]",

        hoverBackground:
          "linear-gradient(90deg, #d9f5eb 0%, #ecfaf5 46%, #fbfefd 100%)",
      };

    case RecentActivitiesTypeEnum.SPENTCOIN:
      return {
        icon: <Coins className="size-[19px]" strokeWidth={1.9} />,

        iconClassName: "text-[#ecc954]",

        iconHoverClassName: `
          group-hover:bg-[#e5bc2e]
          group-hover:text-white
          group-hover:shadow-[0_5px_14px_rgba(229,188,46,0.3)]
        `,

        amountHoverClassName: "group-hover:text-[#b68d06]",

        hoverBorderClassName: "hover:border-[#f1dda0]",

        hoverBackground:
          "linear-gradient(90deg, #fff0bf 0%, #fff8df 48%, #fffdf7 100%)",
      };

    case RecentActivitiesTypeEnum.TRANSFERCOIN:
      return {
        icon: <Coins className="size-[19px]" strokeWidth={1.9} />,

        iconClassName: "text-[#ff8698]",

        iconHoverClassName: `
          group-hover:bg-[#d3233d]
          group-hover:text-white
          group-hover:shadow-[0_5px_14px_rgba(211,35,61,0.28)]
        `,

        amountHoverClassName: "group-hover:text-[#c72139]",

        hoverBorderClassName: "hover:border-[#efbec6]",

        hoverBackground:
          "linear-gradient(90deg, #f5d2d7 0%, #f9e4e7 46%, #fffafb 100%)",
      };

    case RecentActivitiesTypeEnum.BOTH:
      return {
        icon: <ArrowLeftRight className="size-[19px]" strokeWidth={1.9} />,

        iconClassName: "text-[#6bdec1]",

        iconHoverClassName: `
          group-hover:bg-[#46ceaa]
          group-hover:text-white
          group-hover:shadow-[0_5px_14px_rgba(70,206,170,0.3)]
        `,

        amountHoverClassName: "group-hover:text-[#25ad89]",

        hoverBorderClassName: "hover:border-[#bcebdc]",

        hoverBackground:
          "linear-gradient(90deg, #d9f5eb 0%, #ebfaf5 46%, #fbfefd 100%)",
      };

    default:
      return {
        icon: <Sparkles className="size-[19px]" strokeWidth={1.9} />,

        iconClassName: "text-[#93a1ab]",

        iconHoverClassName: `
          group-hover:bg-[#8798a2]
          group-hover:text-white
          group-hover:shadow-[0_5px_14px_rgba(72,87,96,0.2)]
        `,

        amountHoverClassName: "group-hover:text-[#58666d]",

        hoverBorderClassName: "hover:border-[#dce3e6]",

        hoverBackground:
          "linear-gradient(90deg, #e8edef 0%, #f3f6f7 50%, #fcfdfd 100%)",
      };
  }
}