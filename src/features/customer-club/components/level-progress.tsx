import {
  ArrowLeft,
  Check,
  CheckSquare,
  RefreshCw,
  Sparkles,
  Zap,
} from "lucide-react";
import Image from "next/image";

import { MissionDialog } from "@/features/customer-club/components/mission-dialog";
import type { ClubLevel } from "@/features/customer-club/types/customer-club.types";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { getRequestErrorMessage } from "@/shared/lib/api/response";
import { cn } from "@/shared/utils/cn";
import { formatNumber } from "@/shared/utils/format";

const fallbackLevelIcons = ["🥉", "🥈", "🥇", "💎", "🏆"] as const;

interface LevelProgressProps {
  levels: ClubLevel[];
  score: number;
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
  onRetry?: () => void;
}

interface LevelIconProps {
  level?: ClubLevel;
  index?: number;
  size: "sm" | "md" | "lg";
  className?: string;
}

const iconSizes = {
  sm: 28,
  md: 56,
  lg: 112,
} as const;

function LevelIcon({ level, index = 0, size, className }: LevelIconProps) {
  const pixels = iconSizes[size];

  if (level?.iconUrl) {
    return (
      <Image
        src={level.iconUrl}
        alt={`نشان ${level.name}`}
        width={pixels}
        height={pixels}
        unoptimized
        draggable={false}
        className={cn(
          "object-contain drop-shadow-[0_6px_8px_rgba(71,58,122,0.16)] select-none",
          className,
        )}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid place-items-center drop-shadow-[0_5px_7px_rgba(71,58,122,0.14)] select-none",
        size === "sm" && "size-7 text-[22px]",
        size === "md" && "size-14 text-[44px]",
        size === "lg" && "size-28 text-[88px]",
        className,
      )}
    >
      {fallbackLevelIcons[index] ?? "🏆"}
    </span>
  );
}

function LevelProgressSkeleton() {
  return (
    <section
      aria-label="در حال دریافت اطلاعات سطح‌ها"
      className="mx-auto w-full max-w-[1284px] px-4 pt-10 pb-[50px] min-[1440px]:px-0"
    >
      <div className="grid animate-pulse gap-8 min-[1440px]:grid-cols-[360px_884px] lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-10">
        <div className="order-2 h-[156px] rounded-[80px] bg-[#e2e8ff] lg:order-1 lg:mt-[78px]" />

        <div className="order-1 lg:order-2">
          <div className="h-[239px] rounded-[24px] bg-[#d9deff]" />
          <div className="mx-auto mt-6 h-10 max-w-[700px] rounded-full bg-slate-100" />
        </div>
      </div>
    </section>
  );
}

function LevelProgressError({
  error,
  onRetry,
}: Pick<LevelProgressProps, "error" | "onRetry">) {
  return (
    <div className="mx-auto w-full max-w-[1284px] px-4 py-10 min-[1440px]:px-0">
      <Card className="border border-amber-200/80 bg-white/95 p-8 text-center shadow-sm">
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
    </div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
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
      <div className="mx-auto w-full max-w-[1284px] px-4 py-10 min-[1440px]:px-0">
        <Card className="p-8 text-center text-sm text-slate-500">
          هنوز سطحی برای باشگاه مشتریان تعریف نشده است.
        </Card>
      </div>
    );
  }

  const sortedLevels = [...levels].sort(
    (first, second) => first.scores - second.scores,
  );

  const currentIndex = sortedLevels.findLastIndex(
    (level) => score >= level.scores,
  );

  const currentLevel =
    currentIndex >= 0 ? sortedLevels[currentIndex] : undefined;

  const nextLevel = sortedLevels[currentIndex + 1];

  const currentThreshold = currentLevel?.scores ?? 0;
  const nextThreshold = nextLevel?.scores ?? currentThreshold;
  const segmentRange = Math.max(1, nextThreshold - currentThreshold);

  const segmentProgress = nextLevel
    ? clamp(((score - currentThreshold) / segmentRange) * 100, 0, 100)
    : 100;

  const remainingScore = nextLevel ? Math.max(0, nextLevel.scores - score) : 0;

  /*
   * Positions measured from the reference image:
   *
   * card width: 884px
   * next level center: 13%
   * current level center: 82%
   * normal-user marker: 92%
   */
  const nextAnchor = 13;
  const currentAnchor = 82;
  const baseAnchor = 92;

  const activeWidth = ((currentAnchor - nextAnchor) * segmentProgress) / 100;

  const scoreAnchor = currentAnchor - activeWidth;

  return (
    <section
      aria-labelledby="level-progress-title"
      className="mx-auto w-full max-w-[1284px] px-4 pt-10 pb-[50px] min-[1440px]:px-0"
    >
      <div
        className="grid gap-8 min-[1440px]:grid-cols-[360px_884px] lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-10"
        dir="ltr"
      >
        {/* Mission card */}
        <aside
          dir="rtl"
          className="relative order-2 flex h-[156px] overflow-hidden rounded-[80px] bg-[radial-gradient(circle_at_18%_15%,rgba(255,255,255,0.85),transparent_30%),radial-gradient(circle_at_75%_90%,rgba(255,255,255,0.32),transparent_42%),linear-gradient(112deg,#d7e5ff_0%,#cedbff_46%,#dfdbff_100%)] px-8 py-7 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] lg:order-1 lg:mt-[78px]"
        >
          <div className="pointer-events-none absolute -top-8 -left-10 size-40 rounded-full bg-white/30 blur-[38px]" />
          <div className="pointer-events-none absolute right-0 -bottom-16 h-36 w-56 rounded-full bg-[#b9c9ff]/35 blur-[42px]" />

          <div className="relative z-10 flex w-full flex-col items-center">
            {nextLevel ? (
              <>
                <div className="mb-[19px] flex min-h-8 items-center justify-center gap-2.5 text-[15px] font-bold whitespace-nowrap text-[#242631]">
                  <span>
                    امتیاز لازم تا سطح{" "}
                    <strong className="font-black">{nextLevel.name}</strong>
                  </span>

                  <span className="inline-flex h-8 items-center gap-1 rounded-[14px] bg-white/75 px-2.5 text-[13px] font-black text-[#7b4cf4] shadow-[0_3px_12px_rgba(98,72,190,0.08)] backdrop-blur-sm">
                    <Zap className="size-[15px] text-[#8654f5]" />+
                    {formatNumber(remainingScore)}
                  </span>
                </div>

                <MissionDialog
                  triggerLabel="ماموریت‌ها"
                  triggerIcon={<CheckSquare className="size-5 stroke-[2.2]" />}
                  triggerClassName="
                    h-11 w-[232px] rounded-[12px]
                    border border-[#0aacec] bg-white
                    text-[15px] font-black text-[#0aacec]
                    shadow-none transition-colors
                    hover:bg-[#f4fcff]
                  "
                />
              </>
            ) : (
              <>
                <div className="mb-4 grid size-11 place-items-center rounded-full bg-white/80 text-[#7b4cf4] shadow-sm">
                  <Sparkles className="size-6" />
                </div>

                <p className="text-[15px] font-black text-[#3c2d73]">
                  شما در بالاترین سطح باشگاه هستید!
                </p>
              </>
            )}
          </div>
        </aside>

        {/* Progress card */}
        <div dir="rtl" className="order-1 min-w-0 lg:order-2">
          <div className="relative h-[239px] overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_17%_18%,rgba(255,255,255,0.56),transparent_31%),radial-gradient(circle_at_48%_5%,rgba(255,255,255,0.26),transparent_31%),radial-gradient(circle_at_87%_70%,rgba(185,181,255,0.34),transparent_42%),linear-gradient(111deg,#bdccff_0%,#d3d7ff_48%,#d9d5ff_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
            {/* Soft background lights */}
            <div className="pointer-events-none absolute top-2 -left-12 h-48 w-80 rounded-full bg-white/25 blur-[46px]" />
            <div className="pointer-events-none absolute top-0 left-[38%] h-32 w-72 rounded-full bg-white/15 blur-[42px]" />
            <div className="pointer-events-none absolute -right-10 bottom-0 h-44 w-80 rounded-full bg-[#b6b4ff]/25 blur-[46px]" />

            {/* Next-level icon */}
            {nextLevel ? (
              <div
                className="absolute top-[26px] z-10 flex -translate-x-1/2 flex-col items-center"
                style={{ left: `${nextAnchor}%` }}
              >
                <LevelIcon
                  level={nextLevel}
                  index={currentIndex + 1}
                  size="md"
                />
              </div>
            ) : (
              <div
                aria-hidden="true"
                className="absolute top-[29px] z-10 grid size-14 -translate-x-1/2 place-items-center text-[44px]"
                style={{ left: `${nextAnchor}%` }}
              >
                💎
              </div>
            )}

            {/* Current-level icon */}
            <div
              className="absolute top-[18px] z-10 flex -translate-x-1/2 flex-col items-center"
              style={{ left: `${currentAnchor}%` }}
            >
              {currentLevel ? (
                <LevelIcon
                  level={currentLevel}
                  index={currentIndex}
                  size="lg"
                />
              ) : (
                <div className="grid size-28 place-items-center">
                  <Image
                    src="/assets/flag.svg"
                    alt=""
                    width={64}
                    height={64}
                    className="size-16 object-contain"
                  />
                </div>
              )}
            </div>

            {/* Normal-user flag */}
            {currentLevel ? (
              <div
                aria-hidden="true"
                className="absolute top-[64px] z-10 -translate-x-1/2"
                style={{ left: `${baseAnchor}%` }}
              >
                <Image
                  src="/assets/flag.svg"
                  alt=""
                  width={52}
                  height={52}
                  draggable={false}
                  className="size-[52px] object-contain drop-shadow-[0_3px_6px_rgba(97,81,129,0.12)]"
                />
              </div>
            ) : null}

            {/* Divider */}
            <div className="absolute inset-x-0 top-[154px] h-[2px] bg-white/90" />

            {/* Future segment */}
            <div
              className="absolute top-[151px] h-[11px] rounded-full bg-[#b6a2fa]/55"
              style={{
                left: `${currentAnchor}%`,
                width: `${baseAnchor - currentAnchor}%`,
              }}
            />

            {/* Active progress segment */}
            <div
              className="absolute top-[151px] h-[11px] rounded-full bg-[linear-gradient(90deg,#8b55f8_0%,#7740f3_100%)] shadow-[0_0_12px_rgba(116,56,243,0.28)] transition-[left,width] duration-700 ease-out"
              style={{
                left: `${scoreAnchor}%`,
                width: `${activeWidth}%`,
              }}
            />

            {/* Current-level check */}
            <div
              aria-label="سطح فعلی"
              className="absolute top-[145px] z-20 grid size-6 -translate-x-1/2 place-items-center rounded-[5px] bg-[#7840f3] text-white shadow-[0_4px_10px_rgba(99,53,211,0.25)]"
              style={{ left: `${currentAnchor}%` }}
            >
              <Check className="size-[17px] stroke-[3]" />
            </div>

            {/* Base-level check */}
            {currentLevel ? (
              <div
                aria-hidden="true"
                className="absolute top-[145px] z-20 grid size-5 -translate-x-1/2 place-items-center rounded-[4px] bg-[#eee5ff]/75 text-[#b395f8]"
                style={{ left: `${baseAnchor}%` }}
              >
                <Check className="size-3.5 stroke-[3]" />
              </div>
            ) : null}

            {/* Next-level required-score badge */}
            {nextLevel ? (
              <div
                className="absolute top-[135px] z-20 inline-flex h-8 -translate-x-1/2 items-center gap-1 rounded-[14px] bg-[#eee5ff]/90 px-2.5 text-[13px] font-black text-[#9468f5] shadow-[0_3px_9px_rgba(116,79,207,0.06)] backdrop-blur-sm"
                style={{ left: `${nextAnchor}%` }}
                dir="ltr"
              >
                <Zap className="size-[15px] text-[#a075f5]" />+
                {formatNumber(nextLevel.scores)}
              </div>
            ) : null}

            {/* Current score badge */}
            <div
              className="animate-swing animate-duration-[1800ms] animate-ease-in-out repeat-infinite absolute top-[170px] z-30 -translate-x-1/2 rounded-full bg-[#7440f4] px-4 py-[7px] text-[18px] leading-none font-black whitespace-nowrap text-white shadow-[0_6px_14px_rgba(100,54,222,0.2)] transition-[left] duration-700 ease-out"
              style={{ left: `${scoreAnchor}%` }}
            >
              <span className="inline-flex items-center gap-1.5" dir="ltr">
                <Zap className="size-[19px] text-[#f9c823]" />
                {formatNumber(score)}
              </span>
            </div>

            {/* Next-level label */}
            <div
              className="absolute top-[172px] w-[132px] -translate-x-1/2 text-center"
              style={{ left: `${nextAnchor}%` }}
            >
              <p className="truncate text-[13px] font-black text-[#5c5b70]">
                {nextLevel?.name ?? "بالاترین سطح"}
              </p>

              <p className="mt-[9px] text-[11px] font-semibold text-[#9798ad]">
                {nextLevel ? formatNumber(nextLevel.scores) : "—"}
              </p>
            </div>

            {/* Current-level label */}
            <div
              className="absolute top-[172px] w-[132px] -translate-x-1/2 text-center"
              style={{ left: `${currentAnchor}%` }}
            >
              <p
                id="level-progress-title"
                className="animate-pulsing animate-duration-[1800ms] animate-ease-in-out repeat-infinite truncate text-[13px] font-black text-[#2c2c35]"
              >
                {currentLevel?.name ?? "کاربر عادی"}
              </p>

              <p className="mt-[9px] text-[11px] font-semibold text-[#89899c]">
                {formatNumber(currentThreshold)}
              </p>
            </div>

            {/* Normal-user label */}
            {currentLevel ? (
              <div
                className="absolute top-[172px] w-[116px] -translate-x-1/2 text-center"
                style={{ left: `${baseAnchor}%` }}
              >
                <p className="text-[13px] font-black text-[#aaa9b8]">
                  کاربر عادی
                </p>

                <p className="mt-[9px] text-[11px] font-semibold text-[#b5b5c2]">
                  ۰
                </p>
              </div>
            ) : null}
          </div>

          {/* Level list */}
          <nav
            aria-label="سطح‌های باشگاه مشتریان"
            className="mx-auto mt-[24px] flex min-h-10 max-w-[700px] items-center justify-between gap-3 overflow-x-auto px-1 pb-1"
          >
            {sortedLevels.map((level, index) => {
              const isReached = score >= level.scores;

              return (
                <div key={level.id} className="contents">
                  <div
                    className={cn(
                      "flex min-w-fit items-center gap-2 text-[14px] font-black whitespace-nowrap",
                      isReached ? "text-[#22232a]" : "text-[#353640]",
                    )}
                  >
                    <LevelIcon level={level} index={index} size="sm" />

                    <span>
                      {level.name.startsWith("سطح")
                        ? level.name
                        : `سطح ${level.name}`}
                    </span>
                  </div>

                  {index < sortedLevels.length - 1 ? (
                    <ArrowLeft
                      aria-hidden="true"
                      className="size-7 shrink-0 stroke-[1.4] text-[#eef0f5]"
                    />
                  ) : null}
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}
