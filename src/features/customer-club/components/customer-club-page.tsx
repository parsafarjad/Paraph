"use client";

import { RefreshCw } from "lucide-react";
import { useEffect } from "react";

import { ActivityChart } from "@/features/customer-club/components/activity-chart";
import { AudienceSwitcher } from "@/features/customer-club/components/audience-switcher";
import { CampaignBanner } from "@/features/customer-club/components/campaign-banner";
import { CustomerClubBreadcrumb } from "@/features/customer-club/components/customer-club-breadcrumb";
import { DashboardSkeleton } from "@/features/customer-club/components/dashboard-skeleton";
import { FeatureGrid } from "@/features/customer-club/components/feature-grid";
import { LevelProgress } from "@/features/customer-club/components/level-progress";
import { ProfileOverview } from "@/features/customer-club/components/profile-overview";
import { RecentActivities } from "@/features/customer-club/components/recent-activities";
import { SiteHeader } from "@/features/customer-club/components/site-header";
import { WelcomeHero } from "@/features/customer-club/components/welcome-hero";
import {
  useCustomerClubDashboard,
  useCustomerClubLevels,
  useRecentActivities,
} from "@/features/customer-club/hooks/use-customer-club";
import { useCustomerClubStore } from "@/features/customer-club/store/customer-club.store";
import { MainPageBackground } from "@/shared/components/layout/main-page-background";
import { PageContainer } from "@/shared/components/layout/page-container";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { getRequestErrorMessage } from "@/shared/lib/api/response";

export function CustomerClubPage() {
  const scope = useCustomerClubStore((state) => state.scope);
  const vitrinId = useCustomerClubStore((state) => state.vitrinId);
  const activityType = useCustomerClubStore((state) => state.activityType);
  const setUserScope = useCustomerClubStore((state) => state.setUserScope);

  const dashboardQuery = useCustomerClubDashboard({ scope, vitrinId });
  const levelsQuery = useCustomerClubLevels();
  const activitiesQuery = useRecentActivities({
    scope,
    vitrinId,
    size: 10,
    type: activityType,
  });

  useEffect(() => {
    if (scope === "vitrin" && dashboardQuery.data && !dashboardQuery.data.selectedVitrin) {
      setUserScope();
    }
  }, [dashboardQuery.data, scope, setUserScope]);

  const dashboard = dashboardQuery.data;
  const activities = activitiesQuery.data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div dir="rtl" className="min-h-screen bg-white text-[#15181a]">
      <SiteHeader />
      <CustomerClubBreadcrumb
        coins={dashboard?.selectedVitrin?.coins ?? dashboard?.user.coins}
        score={dashboard?.selectedVitrin?.scores ?? dashboard?.user.scores}
        isLoading={dashboardQuery.isLoading}
      />

      <MainPageBackground className="pt-[15px] pb-16">
        <WelcomeHero userName={dashboard?.user.fullName} />

        <div className="mt-10">
          {dashboardQuery.isLoading ? (
            <PageContainer className="py-10">
              <DashboardSkeleton />
            </PageContainer>
          ) : dashboardQuery.isError || !dashboard ? (
            <PageContainer className="py-10">
              <Card className="p-8 text-center">
                <h2 className="mb-3 text-lg font-black">
                  دریافت اطلاعات باشگاه مشتریان ناموفق بود
                </h2>
                <p className="mb-5 text-sm text-slate-500">
                  {getRequestErrorMessage(
                    dashboardQuery.error,
                    "ارتباط با سرویس برقرار نشد. لطفاً دوباره تلاش کنید.",
                  )}
                </p>
                <Button onClick={() => dashboardQuery.refetch()}>
                  <RefreshCw />
                  تلاش مجدد
                </Button>
              </Card>
            </PageContainer>
          ) : (
            <>
              <AudienceSwitcher vitrins={dashboard.vitrins} />

              <div className="mt-2">
                <ProfileOverview
                  user={dashboard.user}
                  selectedVitrin={dashboard.selectedVitrin}
                  summary={dashboard.summary}
                />
              </div>

              <section className="mt-10 min-h-[392px]">
                <PageContainer className="flex min-h-[392px] items-start justify-center pt-10">
                  <LevelProgress
                    levels={levelsQuery.data}
                    score={dashboard.selectedVitrin?.scores ?? dashboard.user.scores}
                    isLoading={levelsQuery.isLoading && levelsQuery.data.length === 0}
                    isError={levelsQuery.isBlockingError}
                    error={levelsQuery.error}
                    onRetry={() => void levelsQuery.refetch()}
                  />
                </PageContainer>
              </section>
            </>
          )}
        </div>

        <div className="mt-3">
          <CampaignBanner />
        </div>

        {/* <section className="mt-6 min-[1760px]:h-[832px]">
          <PageContainer
            dir="ltr"
            className="grid items-start gap-6 py-10 xl:grid-cols-[minmax(420px,650px)_minmax(0,1fr)] min-[1760px]:h-[832px] min-[1760px]:grid-cols-[650px_1006px]"
          >
            <div
              dir="rtl"
              className="min-h-[620px] rounded-[24px] bg-white px-6 py-8 sm:px-10 min-[1760px]:h-[752px] min-[1760px]:px-12 min-[1760px]:py-10"
            >
              <ActivityChart activities={activities} />
            </div>

            <div
              dir="rtl"
              className="min-h-[620px] rounded-[24px] bg-white px-6 py-8 sm:px-10 min-[1760px]:h-[752px] min-[1760px]:px-12 min-[1760px]:py-10"
            >
              <RecentActivities
                items={activities}
                isLoading={activitiesQuery.isLoading}
                isFetching={activitiesQuery.isFetching}
                hasNextPage={activitiesQuery.hasNextPage}
                isFetchingNextPage={activitiesQuery.isFetchingNextPage}
                onLoadMore={() => void activitiesQuery.fetchNextPage()}
              />
            </div>
          </PageContainer>
        </section> */}

<section className="mt-4 sm:mt-6 min-[1760px]:h-[832px]">
  <PageContainer
    dir="ltr"
    className="
      grid min-w-0 grid-cols-1 items-start
      gap-4 py-6

      sm:gap-6 sm:py-8

      xl:grid-cols-[minmax(360px,650px)_minmax(0,1fr)]

      min-[1760px]:h-[832px]
      min-[1760px]:grid-cols-[650px_1006px]
      min-[1760px]:py-10
    "
  >
    <div
      dir="rtl"
      className="
        min-w-0 rounded-[20px] bg-white
        px-4 py-5

        sm:rounded-[24px] sm:px-6 sm:py-8
        md:px-8

        xl:min-h-[620px]

        min-[1760px]:h-[752px]
        min-[1760px]:px-12
        min-[1760px]:py-10
      "
    >
      <ActivityChart activities={activities} />
    </div>

    <div
      dir="rtl"
      className="
        min-w-0 rounded-[20px] bg-white
        px-3 py-5

        sm:rounded-[24px] sm:px-6 sm:py-8
        md:px-8

        xl:min-h-[620px]

        min-[1760px]:h-[752px]
        min-[1760px]:px-12
        min-[1760px]:py-10
      "
    >
      <RecentActivities
        items={activities}
        isLoading={activitiesQuery.isLoading}
        isFetching={activitiesQuery.isFetching}
        hasNextPage={activitiesQuery.hasNextPage}
        isFetchingNextPage={activitiesQuery.isFetchingNextPage}
        onLoadMore={() => void activitiesQuery.fetchNextPage()}
      />
    </div>
  </PageContainer>
</section>

        <div className="mt-10">
          <FeatureGrid />
        </div>
      </MainPageBackground>
    </div>
  );
}
