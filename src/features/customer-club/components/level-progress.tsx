import { Check, CheckSquare, Flag, RefreshCw, Sparkles, Zap } from "lucide-react";
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
  md: 52,
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
        className={cn("object-contain drop-shadow-[0_6px_8px_rgba(71,58,122,0.16)]", className)}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid select-none place-items-center drop-shadow-[0_5px_7px_rgba(71,58,122,0.14)]",
        size === "sm" && "size-7 text-[22px]",
        size === "md" && "size-[52px] text-[42px]",
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
      className="mx-auto grid w-full max-w-[1280px] animate-pulse gap-10 lg:grid-cols-[360px_minmax(0,1fr)]"
    >
      <div className="mt-[78px] h-[156px] rounded-[80px] bg-[#e7ebff]" />
      <div>
        <div className="h-[240px] rounded-[24px] bg-[#dfe2ff]" />
        <div className="mx-auto mt-6 h-10 w-[78%] rounded-full bg-slate-100" />
      </div>
    </section>
  );
}

function LevelProgressError({ error, onRetry }: Pick<LevelProgressProps, "error" | "onRetry">) {
  return (
    <Card className="mx-auto max-w-[1280px] border border-amber-200/80 bg-white/95 p-8 text-center shadow-sm">
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
      <Card className="mx-auto max-w-[1280px] p-8 text-center text-sm text-slate-500">
        هنوز سطحی برای باشگاه مشتریان تعریف نشده است.
      </Card>
    );
  }

  const sortedLevels = [...levels].sort((first, second) => first.scores - second.scores);
  const currentIndex = sortedLevels.findLastIndex((level) => score >= level.scores);
  const currentLevel = currentIndex >= 0 ? sortedLevels[currentIndex] : undefined;
  const nextLevel = sortedLevels[currentIndex + 1];
  const currentThreshold = currentLevel?.scores ?? 0;
  const nextThreshold = nextLevel?.scores ?? currentThreshold;
  const segmentRange = Math.max(1, nextThreshold - currentThreshold);
  const segmentProgress = nextLevel
    ? clamp(((score - currentThreshold) / segmentRange) * 100, 0, 100)
    : 100;
  const remainingScore = nextLevel ? Math.max(0, nextLevel.scores - score) : 0;

  // These anchors reproduce the desktop Figma layout: next level on the left,
  // active level near the right, and the normal-user marker at the far right.
  const nextAnchor = 13;
  const currentAnchor = 82;
  const baseAnchor = 94;
  const activeWidth = ((currentAnchor - nextAnchor) * segmentProgress) / 100;
  const scoreAnchor = currentAnchor - activeWidth;

  return (
    <section
      aria-labelledby="level-progress-title"
      className="mx-auto grid w-full max-w-[1280px] gap-8 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-10"
      dir="ltr"
    >
      <aside
        dir="rtl"
        className="order-2 flex min-h-[156px] flex-col items-center justify-center rounded-[80px] bg-[radial-gradient(circle_at_23%_18%,rgba(255,255,255,.78),transparent_34%),linear-gradient(125deg,#c9d7ff_0%,#e1e2ff_55%,#cdd4ff_100%)] px-8 py-7 text-center shadow-[inset_0_1px_0_rgba(255,255,255,.75)] lg:order-1 lg:mt-[78px]"
      >
        {nextLevel ? (
          <>
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2 text-[15px] font-bold text-[#20232b]">
              <span>
                امتیاز لازم تا سطح <strong className="font-black">{nextLevel.name}</strong>
              </span>
              <span className="inline-flex h-8 items-center gap-1 rounded-full bg-white/80 px-2.5 text-[13px] font-black text-[#7b4cf4] shadow-[0_3px_12px_rgba(98,72,190,.08)]">
                <Zap className="size-[15px] fill-[#f9c523] text-[#8a55ff]" />
                +{formatNumber(remainingScore)}
              </span>
            </div>

            <MissionDialog
              triggerLabel="ماموریت‌ها"
              triggerIcon={<CheckSquare className="size-5" />}
              triggerClassName="h-11 w-full max-w-[232px] rounded-[12px] border border-[#14a9ec] bg-white text-[15px] font-black text-[#13a8eb] shadow-none hover:bg-[#f5fcff]"
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
      </aside>

      <div dir="rtl" className="order-1 min-w-0 lg:order-2">
        <div className="relative h-[240px] overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_22%_26%,rgba(255,255,255,.58),transparent_26%),radial-gradient(circle_at_60%_5%,rgba(255,255,255,.26),transparent_31%),linear-gradient(112deg,#bac9ff_0%,#d4d4ff_52%,#d4d0ff_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,.68)]">
          <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,.68)_1px,transparent_1.4px)] [background-size:9px_9px] [mask-image:linear-gradient(100deg,black,transparent_72%)]" />
          <div className="pointer-events-none absolute -left-8 top-3 h-44 w-80 rounded-full bg-white/25 blur-3xl" />
          <div className="pointer-events-none absolute right-32 top-0 h-40 w-72 rounded-full bg-[#b8baff]/30 blur-3xl" />

          {nextLevel ? (
            <div
              className="absolute top-[26px] z-10 flex -translate-x-1/2 flex-col items-center"
              style={{ left: `${nextAnchor}%` }}
            >
              <LevelIcon level={nextLevel} index={currentIndex + 1} size="md" />
            </div>
          ) : (
            <div
              className="absolute top-[31px] z-10 flex -translate-x-1/2 flex-col items-center text-[44px]"
              style={{ left: `${nextAnchor}%` }}
              aria-hidden="true"
            >
              💎
            </div>
          )}

          <div
            className="absolute top-[18px] z-10 flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${currentAnchor}%` }}
          >
            {currentLevel ? (
              <LevelIcon level={currentLevel} index={currentIndex} size="lg" />
            ) : (
              <div className="grid size-28 place-items-center text-[#b1a1c6]">
                <Flag className="size-16 fill-white/80 stroke-[1.4]" />
              </div>
            )}
          </div>

          {currentLevel ? (
            <div
              aria-hidden="true"
              className="absolute top-[54px] z-10 -translate-x-1/2 text-[#bab4c6]"
              style={{ left: `${baseAnchor}%` }}
            >
              <Flag className="size-11 fill-white/85 stroke-[1.3] drop-shadow-[0_3px_6px_rgba(97,81,129,.12)]" />
            </div>
          ) : null}

          <div className="absolute left-0 right-0 top-[154px] h-px bg-white/90" />

          <div
            className="absolute top-[151px] h-[7px] rounded-full bg-[#a99eff]/65"
            style={{ left: `${nextAnchor}%`, width: `${currentAnchor - nextAnchor}%` }}
          />
          <div
            className="absolute top-[151px] h-[7px] rounded-full bg-[linear-gradient(90deg,#8a5af7,#7438f3)] shadow-[0_0_10px_rgba(116,56,243,.25)] transition-[left,width] duration-700 ease-out"
            style={{ left: `${scoreAnchor}%`, width: `${activeWidth}%` }}
          />

          <div
            className="absolute top-[143px] z-20 grid size-6 -translate-x-1/2 place-items-center rounded-[5px] bg-[#7c43f3] text-white shadow-[0_4px_10px_rgba(99,53,211,.25)]"
            style={{ left: `${currentAnchor}%` }}
            aria-label="سطح فعلی"
          >
            <Check className="size-[17px] stroke-[3]" />
          </div>

          <div
            className="absolute top-[145px] z-10 grid size-5 -translate-x-1/2 place-items-center rounded-[4px] bg-white/35 text-white/75"
            style={{ left: `${nextAnchor}%` }}
            aria-hidden="true"
          >
            <Check className="size-3.5 stroke-[3]" />
          </div>

          {currentLevel ? (
            <div
              className="absolute top-[145px] z-10 grid size-5 -translate-x-1/2 place-items-center rounded-[4px] bg-white/30 text-white/65"
              style={{ left: `${baseAnchor}%` }}
              aria-hidden="true"
            >
              <Check className="size-3.5 stroke-[3]" />
            </div>
          ) : null}

          <div
            className="absolute top-[168px] z-30 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#7440f4] px-4 py-1.5 text-[18px] font-black leading-none text-white shadow-[0_6px_14px_rgba(100,54,222,.20)] transition-[left] duration-700 ease-out"
            style={{ left: `${scoreAnchor}%` }}
          >
            <span className="inline-flex items-center gap-1.5" dir="ltr">
              <Zap className="size-[19px] fill-[#f9c823] text-[#f9c823]" />
              {formatNumber(score)}
            </span>
          </div>

          <div
            className="absolute top-[174px] w-[126px] -translate-x-1/2 text-center"
            style={{ left: `${nextAnchor}%` }}
          >
            <p className="truncate text-[13px] font-black text-[#53526b]">
              {nextLevel?.name ?? "بالاترین سطح"}
            </p>
            <p className="mt-2 text-[11px] font-semibold text-[#86869b]">
              {nextLevel ? formatNumber(nextLevel.scores) : "—"}
            </p>
          </div>

          <div
            className="absolute top-[174px] w-[128px] -translate-x-1/2 text-center"
            style={{ left: `${currentAnchor}%` }}
          >
            <p
              id="level-progress-title"
              className="truncate text-[13px] font-black text-[#282832]"
            >
              {currentLevel?.name ?? "کاربر عادی"}
            </p>
            <p className="mt-2 text-[11px] font-semibold text-[#75758a]">
              {formatNumber(currentThreshold)}
            </p>
          </div>

          {currentLevel ? (
            <div
              className="absolute top-[174px] w-[110px] -translate-x-1/2 text-center"
              style={{ left: `${baseAnchor}%` }}
            >
              <p className="text-[13px] font-black text-[#a0a0af]">کاربر عادی</p>
              <p className="mt-2 text-[11px] font-semibold text-[#b3b3c0]">۰</p>
            </div>
          ) : null}
        </div>

        <nav
          aria-label="سطح‌های باشگاه مشتریان"
          className="mx-auto mt-[24px] flex max-w-[760px] items-center justify-between gap-3 overflow-x-auto px-2 pb-1"
        >
          {sortedLevels.map((level, index) => {
            const isReached = score >= level.scores;

            return (
              <div key={level.id} className="contents">
                <div
                  className={cn(
                    "flex min-w-fit items-center gap-2 whitespace-nowrap text-[14px] font-black",
                    isReached ? "text-[#22232a]" : "text-[#33343c]",
                  )}
                >
                  <LevelIcon level={level} index={index} size="sm" />
                  <span>{level.name.startsWith("سطح") ? level.name : `سطح ${level.name}`}</span>
                </div>
                {index < sortedLevels.length - 1 ? (
                  <span aria-hidden="true" className="text-[28px] font-light leading-none text-[#eef0f5]">
                    ←
                  </span>
                ) : null}
              </div>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
