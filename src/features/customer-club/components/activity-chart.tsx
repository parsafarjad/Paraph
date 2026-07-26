"use client";

import { Eye, TrendingDown, UsersRound } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { RecentActivity } from "@/features/customer-club/types/customer-club.types";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { EmptyState } from "@/shared/components/ui/empty-state";
import { formatNumber, formatPersianDate, toPersianDigits } from "@/shared/utils/format";

function chartDataFromActivities(activities: RecentActivity[]) {
  return [...activities]
    .reverse()
    .slice(-10)
    .map((activity, index) => ({
      name: activity.createdAt ? formatPersianDate(activity.createdAt) : toPersianDigits(index + 1),
      value: Math.max(0, activity.scoreAmount + activity.coinAmount),
    }));
}

export function ActivityChart({ activities }: { activities: RecentActivity[] }) {
  const data = chartDataFromActivities(activities);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="p-5 lg:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-black text-slate-900">نمودار فعالیت‌ها</h3>
        <Eye className="size-4 text-slate-400" />
      </div>

      <div className="mb-5 rounded-2xl bg-slate-100 p-4">
        <p className="mb-3 text-xs font-semibold text-slate-700">آخرین پیشنهاد برای رشد:</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm">
            <UsersRound />
            دعوت دوستان
          </Button>
          <Button variant="secondary" size="sm">
            شرکت در نظرسنجی
          </Button>
        </div>
      </div>

      <p className="mb-4 flex items-center gap-2 text-xs text-slate-500">
        <TrendingDown className="size-4 text-rose-500" />
        مجموع ارزش فعالیت‌های نمایش‌داده‌شده: <strong className="text-slate-800">{formatNumber(total)}</strong>
      </p>

      {data.length > 1 ? (
        <div className="h-[260px] w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="currentColor" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(value) => [formatNumber(Number(value)), "مقدار"]}
                contentStyle={{ borderRadius: 14, borderColor: "#e2e8f0", direction: "rtl" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="currentColor"
                strokeWidth={3}
                fill="url(#activityGradient)"
                className="text-teal-500"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <EmptyState message="برای رسم نمودار، حداقل دو فعالیت لازم است." />
      )}
    </Card>
  );
}
