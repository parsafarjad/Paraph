"use client";

import { UsersRound } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import type { RecentActivity } from "@/features/customer-club/types/customer-club.types";
import { Button } from "@/shared/components/ui/button";
import { formatNumber } from "@/shared/utils/format";

const persianMonthFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  month: "long",
});

interface ActivityChartPoint {
  month: string;
  value: number;
}

function getLastSixPersianMonths() {
  const months: string[] = [];
  const today = new Date();

  for (let step = 0; step < 12 && months.length < 6; step += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - step * 32);

    const month = persianMonthFormatter.format(date);

    if (!months.includes(month)) {
      months.push(month);
    }
  }

  return months.reverse();
}

function getActivityValue(activity: RecentActivity) {
  return Math.max(0, Math.abs(activity.scoreAmount) + Math.abs(activity.coinAmount));
}

function buildChartData(activities: RecentActivity[]): ActivityChartPoint[] {
  const monthNames = getLastSixPersianMonths();
  const values = new Map(monthNames.map((month) => [month, 0]));

  for (const activity of activities) {
    if (!activity.createdAt) {
      continue;
    }

    const createdAt = new Date(activity.createdAt);

    if (Number.isNaN(createdAt.getTime())) {
      continue;
    }

    const month = persianMonthFormatter.format(createdAt);

    if (values.has(month)) {
      values.set(month, (values.get(month) ?? 0) + getActivityValue(activity));
    }
  }

  return monthNames.map((month) => ({
    month,
    value: values.get(month) ?? 0,
  }));
}

function getTrend(data: ActivityChartPoint[]) {
  const currentValue = data.at(-1)?.value ?? 0;
  const previousValue = data.at(-2)?.value ?? 0;

  if (previousValue <= 0) {
    return {
      percent: 0,
      direction: "same" as const,
    };
  }

  const percent = Math.round((Math.abs(currentValue - previousValue) / previousValue) * 100);

  return {
    percent,
    direction:
      currentValue < previousValue
        ? ("down" as const)
        : currentValue > previousValue
          ? ("up" as const)
          : ("same" as const),
  };
}

function YAxisTick({
  x = 0,
  y = 0,
  payload,
}: {
  x?: number;
  y?: number;
  payload?: { value?: number };
}) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path
        d="M-13 -5.5L-17 0H-13.8L-16 5.5L-9.5 -1H-12.6L-10.6 -5.5Z"
        fill="none"
        stroke="#9aa4ad"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
      />
      <text
        x={-21}
        y={3.5}
        fill="#6f7881"
        fontSize="10"
        textAnchor="end"
      >
        {formatNumber(payload?.value ?? 0)}
      </text>
    </g>
  );
}

export function ActivityChart({ activities }: { activities: RecentActivity[] }) {
  const data = buildChartData(activities);
  const trend = getTrend(data);
  const highestValue = Math.max(...data.map((item) => item.value), 0);
  const yAxisMaximum = Math.max(100, Math.ceil(highestValue / 20) * 20);

  return (
    <section aria-labelledby="activity-chart-title" className="w-full">
      <h2
        id="activity-chart-title"
        className="mb-[18px] text-right text-[23px] font-black leading-8 text-[#171717]"
      >
        نمودار فعالیت‌ها
      </h2>

      <div className="min-h-[154px] rounded-[12px] bg-[#eef1f3] px-6 pb-6 pt-4 text-right sm:px-8">
        <p className="text-[13px] font-semibold leading-7 text-[#31363b]">
          اخیراً کم‌فعالیت بودی؛
          <br />
          برای حفظ سطح برنزی، بیشتر مشارکت کن! 👀
        </p>

        <div className="mt-[22px] flex flex-wrap gap-3">
          <Button
            type="button"
            variant="secondary"
            className="h-11 min-w-[144px] rounded-[12px] border-[#00aaf1] px-6 text-[14px] font-bold text-[#00aaf1] shadow-none hover:bg-white"
          >
            <UsersRound className="size-[17px]" />
            دعوت دوستان
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="h-11 min-w-[174px] rounded-[12px] border-[#00aaf1] px-6 text-[14px] font-bold text-[#00aaf1] shadow-none hover:bg-white"
          >
            شرکت در نظرسنجی
          </Button>
        </div>
      </div>

      <p className="mt-[27px] text-center text-[12px] leading-6 text-[#7b858d]">
        نمودار تغییرات امتیاز بر اساس فعالیت ۶ ماه شما
      </p>

      <p className="mt-[18px] text-center text-[14px] font-semibold text-[#242424]">
        فعالیت شما نسبت به ماه گذشته{" "}
        {trend.direction === "same" ? (
          <span className="font-black text-[#00aaf1]">بدون تغییر</span>
        ) : (
          <>
            <span
              className={
                trend.direction === "down"
                  ? "font-black text-[#f23838]"
                  : "font-black text-[#22b888]"
              }
            >
              %{formatNumber(trend.percent)} {trend.direction === "down" ? "کاهش" : "افزایش"}
            </span>{" "}
            یافته.
          </>
        )}
      </p>

      <div className="mt-[31px] h-[250px] w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 34, bottom: 4, left: 38 }}
          >
            <defs>
              <linearGradient id="activityLineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f43d3d" />
                <stop offset="48%" stopColor="#2bc596" />
                <stop offset="68%" stopColor="#69a79d" />
                <stop offset="100%" stopColor="#f43d3d" />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke="#dfe3e5" strokeWidth={1} />

            <XAxis
              dataKey="month"
              axisLine={{ stroke: "#767d83", strokeWidth: 1 }}
              tickLine={false}
              tick={{ fill: "#60676d", fontSize: 10 }}
              interval={0}
              padding={{ left: 18, right: 18 }}
            />

            <YAxis
              domain={[0, yAxisMaximum]}
              axisLine={false}
              tickLine={false}
              tickCount={6}
              width={42}
              tick={<YAxisTick />}
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#activityLineGradient)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#22b888", stroke: "#ffffff", strokeWidth: 2 }}
              animationDuration={700}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
