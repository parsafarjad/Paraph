import {
  BadgeCheck,
  CheckSquare,
  ChevronLeft,
  CircleAlert,
  CircleHelp,
  // CircleInfo,
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
    selectedVitrin?.avatarUrl ?? user.avatarUrl ?? "/assets/profile-placeholder.jpg";
  const scores = selectedVitrin?.scores ?? user.scores;
  const coins = selectedVitrin?.coins ?? user.coins;
  const level = selectedVitrin?.level ?? user.level;
  const roleLabel = selectedVitrin
    ? roleLabels[selectedVitrin.role] ?? selectedVitrin.role
    : user.membershipTitle ?? "مغازه‌دار";
  const profileDescription = selectedVitrin
    ? `${roleLabels[selectedVitrin.role] ?? selectedVitrin.role} / ویترین پاراف`
    : getProfileDescription(user);

  return (
    <section aria-label="خلاصه پروفایل باشگاه مشتریان" className=" pb-10 pt-[31px]">
      <div className="mx-auto w-[calc(100%_-_32px)] max-w-[1600px]">
        <div
          dir="ltr"
          className="grid gap-5 xl:min-h-[145px] xl:grid-cols-[minmax(0,1fr)_minmax(360px,1.077fr)_minmax(0,1fr)] xl:gap-0 min-[1680px]:grid-cols-[520px_560px_520px]"
        >
          <StatsPanel coins={coins} scores={scores} level={level} summary={summary} />
          <MissionPanel />
          <ProfilePanel
            title={title}
            description={profileDescription}
            roleLabel={roleLabel}
            avatarUrl={avatarUrl}
            completedMissions={summary.numberTasksCompleted}
          />
        </div>
      </div>
    </section>
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
      className="flex min-h-[145px] items-center justify-center gap-5 rounded-3xl border border-[#edf0f2] p-4 xl:justify-end xl:rounded-none xl:border-0 xl:pr-0"
    >
      <div className="relative size-[130px] shrink-0 overflow-hidden rounded-[26px] bg-[#eef1f3] shadow-[0_4px_14px_rgba(15,23,42,0.20)] ring-1 ring-[#e2e7ea]">
        <Image
          src={avatarUrl}
          alt={`تصویر پروفایل ${title}`}
          fill
          unoptimized
          sizes="130px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 text-right xl:w-[205px]">
        <div className="flex items-center justify-start gap-2">
          <h2 className="truncate text-[25px] font-black leading-9 text-[#1f1f1f]">{title}</h2>
          <BadgeCheck aria-label="پروفایل تاییدشده" className="size-[22px] shrink-0 text-[#0aa2ef]" />
        </div>

        <p className="mt-2 truncate text-[15px] font-normal text-[#9aa2a8]">{description}</p>

        <span className="mt-2 inline-flex min-h-6 items-center rounded-full bg-[#f1f3f4] px-3 text-[12px] font-medium text-[#4f5559]">
          {roleLabel}
        </span>

        <p className="mt-2.5 flex items-center gap-1.5 text-[12px] text-[#8d959b]">
          <CheckSquare className="size-4 text-[#cbd1d5]" />
          <span>
            ماموریت انجام‌شده
            <strong className="mr-2 text-[14px] font-black text-[#222]">
              {formatNumber(completedMissions)}
            </strong>
          </span>
        </p>
      </div>
    </div>
  );
}

function MissionPanel() {
  return (
    <div
      dir="rtl"
      className="flex min-h-[145px] flex-col items-center justify-center rounded-3xl border border-[#edf0f2] px-4 py-7 text-center xl:rounded-none xl:border-y-0 xl:border-x"
    >
      <p className="mb-3 inline-flex min-h-[30px] max-w-full items-center gap-1.5 rounded-full bg-[#ffe2e2] px-3 text-[13px] font-medium text-[#f24f51]">
        <CircleAlert className="size-[17px] shrink-0" />
        <span className="truncate">وقت کمی مونده، ماموریت رو همین الان انجام بده.</span>
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
    <div dir="ltr" className="min-h-[145px] rounded-3xl border border-[#edf0f2] p-4 xl:rounded-none xl:border-0 xl:p-0">
      <div className="grid h-[88px] grid-cols-2 gap-[22px]">
        <CoinCard coins={coins} />
        <LevelCard level={level} scores={scores} />
      </div>

      <div className="mt-4 flex min-h-[41px] items-center justify-between gap-2 border-t border-[#edf0f2] pt-2 text-[11px] text-[#555d62]">
        <div dir="rtl" className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
          <span>معادل:</span>
          <strong className="font-black text-[#1f2529]">
            {formatNumber(summary.totalScoreMonthly)} امتیاز
          </strong>
          <Image
            src="/assets/profile-overview/small-trophy.png"
            alt=""
            width={25}
            height={28}
            aria-hidden="true"
            className="object-contain"
          />
        </div>

        <div dir="rtl" className="flex min-w-0 items-center gap-1.5">
          <Image
            src="/assets/profile-overview/discount-tag.png"
            alt=""
            width={27}
            height={27}
            aria-hidden="true"
            className="shrink-0 object-contain"
          />
          <p className="truncate">
            سکه دریافتی از طرح تخفیف سکه‌ای:
            <strong className="mx-1 font-black text-[#2f3437]">
              {formatNumber(summary.totalCoinMonthly)}
            </strong>
            سکه
          </p>
        </div>

        <span
          dir="rtl"
          className="inline-flex h-[27px] shrink-0 items-center gap-1 rounded-full  px-3 font-bold text-[#4b5257]"
        >
          <ChevronLeft className="size-3.5 text-[#aab1b6]" />
          {formatNumber(30)} روز اخیر
        </span>
      </div>
    </div>
  );
}

function CoinCard({ coins }: { coins: number }) {
  const tomanValue = coins * COIN_VALUE_IN_TOMAN;

  return (
    <article
      dir="rtl"
      className="relative flex h-[88px] items-center justify-between overflow-hidden rounded-[24px] border border-[#f1ead8] bg-[#fffbef] px-4 shadow-[0_4px_12px_rgba(55,65,81,0.16)]"
    >
      <div className="min-w-0 pr-1">
        <p className="flex items-center gap-1.5 whitespace-nowrap text-[14px] font-black text-[#303438]">
          <Link2 className="size-4 text-[#bcc3c7]" />
          <strong className="text-[16px]">{formatNumber(coins)}</strong>
          سکه
        </p>
        <p className="mt-2 whitespace-nowrap text-[12px] text-[#afb4b7]">
          <strong className="text-[13px] font-medium text-[#9da4a8]">
            {formatNumber(tomanValue)}
          </strong>{" "}
          تومان
        </p>
      </div>

      <Image
        src="/assets/profile-overview/coins-stack.png"
        alt="سکه‌های پاراف"
        width={56}
        height={66}
        className="object-contain"
      />

      {/* <CircleInfo className="absolute bottom-[17px] right-[16px] size-[17px] text-[#7d8c94]" /> */}
    </article>
  );
}

function LevelCard({ level, scores }: { level: string; scores: number }) {
  const normalizedLevel = level.startsWith("سطح") ? level : `سطح ${level}`;

  return (
    <article
      dir="rtl"
      className="relative flex h-[88px] items-center justify-end gap-5 overflow-hidden rounded-[24px] border border-[#edf0f2] bg-white px-4 shadow-[0_4px_12px_rgba(55,65,81,0.16)]"
    >
      <Image
        src="/assets/profile-overview/bronze-trophy.png"
        alt="جام سطح باشگاه"
        width={38}
        height={58}
        className="object-contain"
      />

      <div className="text-right">
        <p className="whitespace-nowrap text-[16px] font-black text-[#22272a]">{normalizedLevel}</p>
        <p className="mt-2 flex items-center gap-1 whitespace-nowrap text-[12px] text-[#aab0b4]">
          <Zap className="size-[18px] text-[#d9dde0]" />
          امتیاز
          <strong className="mr-1 text-[14px] font-black text-[#303438]">
            {formatNumber(scores)}
          </strong>
        </p>
      </div>

      <CircleHelp className="absolute bottom-[17px] left-[16px] size-[17px] text-[#7d8c94]" />
    </article>
  );
}

function getProfileDescription(user: UserProfile) {
  const occupation = user.jobTitle ?? "تعمیرکار موبایل";
  const city = user.city ?? "مشهد";
  const country = user.country ?? "ایران";

  return `${occupation} / ${city}، ${country}`;
}
