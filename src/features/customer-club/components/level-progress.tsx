import { ArrowLeft, Check, LockKeyhole, RefreshCw, Sparkles } from "lucide-react";
import Image from "next/image";

import type { ClubLevel } from "@/features/customer-club/types/customer-club.types";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { getRequestErrorMessage } from "@/shared/lib/api/response";
import { cn } from "@/shared/utils/cn";
import { formatNumber } from "@/shared/utils/format";

const trophyFallbacks = ["🥉", "🥈", "🥇", "🏆", "💎"];

interface LevelProgressProps {
  levels: ClubLevel[];
  score: number;
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
  onRetry?: () => void;
}

function LevelProgressSkeleton() {
  return (
    <section
      aria-label="در حال دریافت اطلاعات سطح‌ها"
      className="grid animate-pulse gap-5 lg:grid-cols-[230px_1fr]"
    >
      <div className="min-h-[260px] rounded-3xl bg-white/65" />
      <div className="min-h-[260px] rounded-3xl bg-white/65" />
    </section>
  );
}

function LevelProgressError({ error, onRetry }: Pick<LevelProgressProps, "error" | "onRetry">) {
  return (
    <Card className="border border-amber-200/80 bg-white/90 p-8 text-center shadow-sm">
      <h2 className="mb-2 text-base font-black text-slate-900">
        اطلاعات سطح‌ها در دسترس نیست
      </h2>
      <p className="mx-auto mb-5 max-w-xl text-sm leading-7 text-slate-500">
        {getRequestErrorMessage(
          error,
          "سرویس سطح‌ها موقتاً پاسخ نمی‌دهد. سایر بخش‌های باشگاه مشتریان همچنان قابل استفاده هستند.",
        )}
      </p>
      {onRetry ? (
        <Button type="button" variant="secondary" onClick={onRetry}>
          <RefreshCw className="size-4" />
          تلاش مجدد
        </Button>
      ) : null}
    </Card>
  );
}

export function LevelProgress({
  levels,
  score,
  isLoading = false,
  isError = false,
  error,
  onRetry,
}: LevelProgressProps) {
  if (isLoading) {
    return <LevelProgressSkeleton />;
  }

  if (isError) {
    return <LevelProgressError error={error} onRetry={onRetry} />;
  }

  if (levels.length === 0) {
    return (
      <Card className="p-8 text-center text-sm text-slate-500">
        هنوز سطحی برای باشگاه مشتریان تعریف نشده است.
      </Card>
    );
  }

  const currentIndex = Math.max(0, levels.findLastIndex((level) => score >= level.scores));
  const current = levels[currentIndex];
  const next = levels[currentIndex + 1];
  const range = next ? Math.max(1, next.scores - current.scores) : 1;
  const progress = next
    ? Math.min(100, Math.max(0, ((score - current.scores) / range) * 100))
    : 100;
  const remaining = next ? Math.max(0, next.scores - score) : 0;

  return (
    <section className="grid gap-5 lg:grid-cols-[230px_1fr]">
      <Card className="flex flex-col items-center justify-center bg-gradient-to-br from-violet-100/95 to-sky-100/90 p-6 text-center">
        <div className="mb-4 text-5xl [animation:float_3.2s_ease-in-out_infinite]">
          {next ? trophyFallbacks[Math.min(currentIndex + 1, trophyFallbacks.length - 1)] : "🏆"}
        </div>
        {next ? (
          <>
            <p className="mb-2 text-sm font-black text-slate-800">
              امتیاز لازم تا سطح {next.name}
            </p>
            <span className="mb-5 rounded-full bg-violet-600 px-3 py-1 text-xs font-black text-white">
              +{formatNumber(remaining)}
            </span>
            <Button variant="secondary" className="w-full">
              ماموریت‌ها
              <ArrowLeft />
            </Button>
          </>
        ) : (
          <p className="font-black text-violet-700">شما در بالاترین سطح هستید!</p>
        )}
      </Card>

      <Card className="relative overflow-hidden bg-gradient-to-l from-violet-200/80 via-indigo-100/70 to-sky-100/70 p-6 lg:p-8">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(115deg,transparent_40%,white_50%,transparent_60%)] [background-size:250%_100%] [animation:shimmer_5s_linear_infinite]" />
        <div className="relative">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-500">سطح فعلی شما</p>
              <h3 className="mt-1 text-xl font-black text-slate-900">{current.name}</h3>
            </div>
            <div className="rounded-2xl bg-violet-600 px-5 py-2 text-center text-white shadow-lg shadow-violet-300">
              <span className="block text-[10px] opacity-80">امتیاز فعلی</span>
              <strong className="text-xl">{formatNumber(score)}</strong>
            </div>
          </div>

          <div className="relative mb-7 h-4 rounded-full bg-white/80 shadow-inner">
            <div
              className="absolute inset-y-0 right-0 rounded-full bg-gradient-to-l from-violet-700 to-fuchsia-500 transition-[width] duration-700"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 size-6 -translate-y-1/2 rounded-full border-4 border-white bg-violet-700 shadow"
              style={{ right: `calc(${progress}% - 12px)` }}
            >
              <Check className="size-4 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {levels.slice(0, 4).map((level, index) => {
              const unlocked = score >= level.scores;

              return (
                <div
                  key={level.id}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-xl border border-white/80 bg-white/80 px-3 py-2 text-xs font-bold text-slate-600 shadow-sm",
                    index === currentIndex && "ring-2 ring-violet-400",
                  )}
                >
                  {level.iconUrl ? (
                    <Image
                      src={level.iconUrl}
                      alt=""
                      width={28}
                      height={28}
                      unoptimized
                      className="size-7 object-contain"
                    />
                  ) : (
                    <span className="text-xl">{trophyFallbacks[index] ?? "🏆"}</span>
                  )}
                  <span>{level.name}</span>
                  {unlocked ? (
                    <Check className="size-3.5 text-emerald-500" />
                  ) : (
                    <LockKeyhole className="size-3.5 text-slate-300" />
                  )}
                </div>
              );
            })}
          </div>

          <p className="mt-5 flex items-center gap-2 text-xs text-slate-600">
            <Sparkles className="size-4 text-violet-600" />
            {next
              ? `با کسب ${formatNumber(remaining)} امتیاز دیگر به سطح ${next.name} می‌رسید.`
              : "همه سطح‌ها برای شما باز شده‌اند."}
          </p>
        </div>
      </Card>
    </section>
  );
}
