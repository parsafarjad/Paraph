import {
  BadgeCheck,
  CheckSquare,
  ChevronLeft,
  CircleAlert,
  CircleHelp,
  Link2,
  Zap,
} from "lucide-react";
import Image from "next/image";

import { MissionDialog } from "@/features/customer-club/components/mission-dialog";
import type {
  ClubSummary,
  UserProfile,
  VitrinProfile,
} from "@/features/customer-club/types/customer-club.types";
import { roleLabels } from "@/features/customer-club/utils/normalize";
import { PageContainer } from "@/shared/components/layout/page-container";
import { formatNumber } from "@/shared/utils/format";

interface ProfileOverviewProps {
  user: UserProfile;
  selectedVitrin: VitrinProfile | null;
  summary: ClubSummary;
}

const COIN_VALUE_IN_TOMAN = 100;

export function ProfileOverview({
  user,
  selectedVitrin,
  summary,
}: ProfileOverviewProps) {
  const title = selectedVitrin?.companyName ?? user.fullName;
  const avatarUrl =
    selectedVitrin?.avatarUrl ?? user.avatarUrl ?? "/assets/avatar.jpg";
  const scores = selectedVitrin?.scores ?? user.scores;
  const coins = selectedVitrin?.coins ?? user.coins;
  const level = selectedVitrin?.level ?? user.level;
  const roleLabel = selectedVitrin
    ? (roleLabels[selectedVitrin.role] ?? selectedVitrin.role)
    : (user.membershipTitle ?? "مغازه‌دار");
  const profileDescription = selectedVitrin
    ? `${roleLabels[selectedVitrin.role] ?? selectedVitrin.role} / ویترین پاراف`
    : getProfileDescription(user);

  return (
    <section aria-label="خلاصه پروفایل باشگاه مشتریان">
      <PageContainer>
        <div className="rounded-[24px] border-[1.5px] border-white bg-white p-5 shadow-[0_1px_0_rgba(255,255,255,.8)] min-[1440px]:h-[224px] min-[1440px]:p-10 sm:p-8">
          <div
            dir="ltr"
            className="grid h-full gap-8 min-[1440px]:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)_1px_minmax(0,1fr)] min-[1440px]:gap-10"
          >
            <StatsPanel
              coins={coins}
              scores={scores}
              level={level}
              summary={summary}
            />
            <Separator />
            <MissionPanel />
            <Separator />
            <ProfilePanel
              title={title}
              description={profileDescription}
              roleLabel={roleLabel}
              avatarUrl={avatarUrl}
              completedMissions={summary.numberTasksCompleted}
            />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function Separator() {
  return (
    <span
      aria-hidden="true"
      className="hidden h-full w-px bg-[#ecf0f2] min-[1440px]:block"
    />
  );
}

function ProfilePanel({
  title,
  description,
  roleLabel,
  avatarUrl,
  completedMissions,
}: {
  title: string;
  description: string;
  roleLabel: string;
  avatarUrl: string;
  completedMissions: number;
}) {
  return (
    <div
      dir="rtl"
      className="flex min-w-0 items-center justify-center gap-6 min-[1440px]:justify-end"
    >
      <div className="relative size-32 shrink-0 overflow-hidden rounded-[24px] border-8 border-white">
        <Image
          src={avatarUrl}
          alt={`تصویر پروفایل ${title}`}
          fill
          unoptimized
          sizes="128px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-col items-start gap-1.5 text-right min-[1440px]:w-[220px]">
        <div className="flex max-w-full items-center gap-2">
          <h2 className="h-9 truncate text-right text-[24px] leading-none font-semibold text-[#15181a]">
            {title}
          </h2>
          <BadgeCheck
            aria-label="پروفایل تاییدشده"
            className="size-6 shrink-0 text-[#0a9ff0]"
          />
        </div>

        <p className="max-w-full truncate text-[14px] leading-[25px] text-[#a3aeb3]">
          {description}
        </p>

        <span className="inline-flex min-h-[23px] items-center rounded-full bg-[#ecf0f2] px-2 text-[12px] leading-none text-[#15181a]">
          {roleLabel}
        </span>

        <p className="flex items-center justify-end gap-2 px-1 py-0.5 text-[13px] leading-[23px] text-[#667880]">
          <CheckSquare className="size-5 text-[#c2c9cc]" />
          <span>ماموریت انجام‌شده</span>
          <strong className="text-[14px] leading-[25px] font-bold text-[#15181a]">
            {formatNumber(completedMissions)}
          </strong>
        </p>
      </div>
    </div>
  );
}

function MissionPanel() {
  return (
    <div
      dir="rtl"
      className="flex min-w-0 flex-col items-center justify-center gap-3 text-center"
    >
      <p className="inline-flex max-w-full items-center gap-1 rounded-full bg-[#f9d5d5] px-2 py-0.5 text-[14px] leading-[25px] text-[#e02d2d]">
        <span className="truncate">
          وقت کمی مونده، ماموریتت رو همین الان انجام بده.
        </span>
        <CircleAlert className="size-4 shrink-0" />
      </p>

      <MissionDialog />
    </div>
  );
}

function StatsPanel({
  coins,
  scores,
  level,
  summary,
}: {
  coins: number;
  scores: number;
  level: string;
  summary: ClubSummary;
}) {
  return (
    <div dir="ltr" className="min-w-0">
      <div className="grid grid-cols-1 gap-6 min-[1440px]:h-[88px] sm:grid-cols-2">
        <CoinCard coins={coins} />
        <LevelCard level={level} scores={scores} />
      </div>

      <div className="mt-4 flex min-h-10 flex-wrap items-center justify-between gap-2 border-t border-[#ecf0f2] px-2 pt-1 text-[10px] font-semibold text-[#667880] min-[1440px]:flex-nowrap">
        <div
          dir="rtl"
          className="flex shrink-0 items-center gap-1 whitespace-nowrap"
        >
          <Image
            src="/assets/cup.svg"
            alt=""
            width={32}
            height={32}
            aria-hidden="true"
            className="size-8 object-contain"
          />
          <span>معادل:</span>
          <strong className="text-[14px] leading-[25px] font-bold text-[#15181a]">
            {formatNumber(summary.totalScoreMonthly)} امتیاز
          </strong>
        </div>

        <div dir="rtl" className="flex min-w-0 items-center gap-1">
          <Image
            src="/assets/badge.svg"
            alt=""
            width={32}
            height={32}
            aria-hidden="true"
            className="size-8 shrink-0 object-contain"
          />
          <p className="truncate">
            سکه دریافتی از طرح تخفیف سکه‌ای:
            <strong className="mx-1 text-[14px] leading-[25px] font-bold text-[#15181a]">
              {formatNumber(summary.totalCoinMonthly)}
            </strong>
            سکه
          </p>
        </div>

        <span
          dir="rtl"
          className="flex items-center h-[23px] shrink-0 items-center gap-1 rounded-full bg-[#ecf0f2] px-2 text-[12px] font-normal text-[#15181a]"
        >
          <strong className="font-bold">۳۰</strong> روز اخیر
          <ChevronLeft className="size-4" />
        </span>
      </div>
    </div>
  );
}

function CoinCard({ coins }: { coins: number }) {
  const tomanValue = coins * COIN_VALUE_IN_TOMAN;

  return (
    <article
      dir="ltr"
      className="flex min-h-[88px] items-center gap-2 overflow-hidden rounded-[24px] bg-[rgba(217,163,0,.08)] px-2 py-3 shadow-[0_0_12px_rgba(102,120,128,.40)]"
    >
      <Image
        src="/assets/coins.svg"
        alt="سکه‌های پاراف"
        width={64}
        height={64}
        className="size-16 shrink-0 object-contain"
      />

      <div dir="rtl" className="flex min-w-0 flex-1 items-end justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-1 ">
            <Link2 className="size-5 text-[#c2c9cc]" />
            <strong className="leading-[30px] font-bold text-[#15181a]">
              {formatNumber(coins)}
            </strong>
            <p className="text-[16px] leading-7 whitespace-nowrap text-[#667880]">

            سکه
            </p>
            <Image
              src={"/assets/coin-icon.svg"}
              alt=""
              width={20}
              height={20}
            />
          </div>
          <p className="text-[12px] whitespace-nowrap text-[#a3aeb3]">
            <strong className="text-[16px] leading-[30px] font-semibold">
              {formatNumber(tomanValue)}
            </strong>{" "}
            تومان
          </p>
        </div>
      </div>
    </article>
  );
}

function LevelCard({ level, scores }: { level: string; scores: number }) {
  const normalizedLevel = level.startsWith("سطح") ? level : `سطح ${level}`;

  return (
    <article
      dir="rtl"
      className="flex min-h-[88px] items-center gap-2 overflow-hidden rounded-[24px] bg-white px-2 py-3 shadow-[0_0_12px_rgba(102,120,128,.40)]"
    >
      <Image
        src="/assets/bronze-cup.svg"
        alt="جام سطح باشگاه"
        width={64}
        height={64}
        className="size-16 shrink-0 object-contain"
      />

      <div className="flex min-w-0 flex-1 items-end justify-between">
        <div className="text-right">
          <p className="text-[16px] leading-[30px] font-bold whitespace-nowrap text-[#15181a]">
            {normalizedLevel}
          </p>
          <p className="flex items-center gap-1 text-[12px] whitespace-nowrap text-[#a3aeb3]">
            <Zap className="size-5 text-[#c2c9cc]" />
            امتیاز
            <strong className="text-[16px] leading-[30px] font-semibold text-[#15181a]">
              {formatNumber(scores)}
            </strong>
          </p>
        </div>

        <CircleHelp className="size-[18px] shrink-0 text-[#667880]" />
      </div>
    </article>
  );
}

function getProfileDescription(user: UserProfile) {
  const occupation = user.jobTitle ?? "تعمیرکار موبایل";
  const city = user.city ?? "مشهد";
  const country = user.country ?? "ایران";

  return `${occupation} / ${city}، ${country}`;
}
