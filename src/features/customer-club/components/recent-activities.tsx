"use client";

import * as Tabs from "@radix-ui/react-tabs";
import {
  ArrowLeftRight,
  Coins,
  Gift,
  LoaderCircle,
  MinusCircle,
  Sparkles,
  Trophy,
} from "lucide-react";

import {
  RecentActivitiesTypeEnum,
  type RecentActivity,
} from "@/features/customer-club/types/customer-club.types";
import { useCustomerClubStore } from "@/features/customer-club/store/customer-club.store";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { EmptyState } from "@/shared/components/ui/empty-state";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/utils/cn";
import { formatNumber, formatPersianDate } from "@/shared/utils/format";

const filters = [
  [RecentActivitiesTypeEnum.BOTH, "نمایش همه"],
  [RecentActivitiesTypeEnum.SCORE, "امتیاز"],
  [RecentActivitiesTypeEnum.COIN, "سکه"],
  [RecentActivitiesTypeEnum.SPENTCOIN, "برداشت سکه"],
  [RecentActivitiesTypeEnum.TRANSFERCOIN, "انتقال سکه"],
] as const;

export function RecentActivities({
  items,
  isLoading,
  isFetching,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: {
  items: RecentActivity[];
  isLoading: boolean;
  isFetching: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
}) {
  const activityType = useCustomerClubStore((state) => state.activityType);
  const setActivityType = useCustomerClubStore((state) => state.setActivityType);

  return (
    <Card className="p-5 lg:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-black text-slate-900">فعالیت‌های اخیر</h3>
          <p className="mt-1 text-[11px] text-slate-400">مروری بر آخرین فعالیت‌ها و دستاوردهای شما</p>
        </div>
        {isFetching && !isLoading && <LoaderCircle className="size-4 animate-spin text-sky-500" />}
      </div>

      <Tabs.Root
        dir="rtl"
        value={activityType}
        onValueChange={(value) => setActivityType(value as RecentActivitiesTypeEnum)}
      >
        <Tabs.List className="mb-5 flex max-w-full gap-1 overflow-x-auto rounded-2xl bg-slate-100 p-1">
          {filters.map(([value, label]) => (
            <Tabs.Trigger
              key={value}
              value={value}
              className="shrink-0 rounded-xl px-3 py-2 text-[11px] font-semibold text-slate-500 transition data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
            >
              {label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton key={index} className="h-14 w-full" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState message="فعالیتی با فیلتر انتخاب‌شده پیدا نشد." />
      ) : (
        <>
          <div className="divide-y divide-slate-100">
            {items.map((activity) => (
              <ActivityRow key={activity.id} activity={activity} />
            ))}
          </div>
          {hasNextPage && (
            <div className="mt-5 text-center">
              <Button
                variant="secondary"
                size="sm"
                onClick={onLoadMore}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage && <LoaderCircle className="animate-spin" />}
                {isFetchingNextPage ? "در حال دریافت..." : "نمایش فعالیت‌های بیشتر"}
              </Button>
            </div>
          )}
        </>
      )}
    </Card>
  );
}

function ActivityRow({ activity }: { activity: RecentActivity }) {
  const config = activityConfig(activity.type);
  return (
    <article className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3.5">
      <span className={cn("grid size-9 place-items-center rounded-full", config.className)}>
        {config.icon}
      </span>
      <div className="min-w-0">
        <h4 className="truncate text-xs font-bold text-slate-800">{activity.taskTitle}</h4>
        <p className="mt-1 line-clamp-1 text-[10px] text-slate-400">
          {activity.taskDescription || "فعالیت ثبت‌شده در باشگاه مشتریان"}
        </p>
      </div>
      <div className="text-left">
        <div className="flex items-center justify-end gap-2 text-[11px] font-black">
          {activity.scoreAmount !== 0 && (
            <span className="text-violet-700">{signed(activity.scoreAmount)} امتیاز</span>
          )}
          {activity.coinAmount !== 0 && (
            <span className="text-amber-600">{signed(activity.coinAmount)} سکه</span>
          )}
        </div>
        <time className="mt-1 block text-[9px] text-slate-400">
          {formatPersianDate(activity.createdAt)}
        </time>
      </div>
    </article>
  );
}

function signed(value: number) {
  return `${value > 0 ? "+" : ""}${formatNumber(value)}`;
}

function activityConfig(type: string) {
  switch (type) {
    case RecentActivitiesTypeEnum.COIN:
      return { icon: <Coins className="size-4" />, className: "bg-amber-50 text-amber-600" };
    case RecentActivitiesTypeEnum.SCORE:
      return { icon: <Trophy className="size-4" />, className: "bg-violet-50 text-violet-600" };
    case RecentActivitiesTypeEnum.SPENTCOIN:
      return { icon: <MinusCircle className="size-4" />, className: "bg-rose-50 text-rose-500" };
    case RecentActivitiesTypeEnum.TRANSFERCOIN:
      return { icon: <ArrowLeftRight className="size-4" />, className: "bg-sky-50 text-sky-600" };
    case RecentActivitiesTypeEnum.BOTH:
      return { icon: <Gift className="size-4" />, className: "bg-emerald-50 text-emerald-600" };
    default:
      return { icon: <Sparkles className="size-4" />, className: "bg-slate-100 text-slate-500" };
  }
}
