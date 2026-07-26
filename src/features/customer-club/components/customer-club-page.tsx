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
import { RecentActivitiesTypeEnum } from "@/features/customer-club/types/customer-club.types";
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
    type: activityType ?? RecentActivitiesTypeEnum.BOTH,
  });

  useEffect(() => {
    if (scope === "vitrin" && dashboardQuery.data && !dashboardQuery.data.selectedVitrin) {
      setUserScope();
    }
  }, [dashboardQuery.data, scope, setUserScope]);

  const dashboard = dashboardQuery.data;
  const activities = activitiesQuery.data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div dir="rtl" className="min-h-screen bg-[#e6e5ff] text-slate-900">
      <SiteHeader />
      <CustomerClubBreadcrumb
        coins={dashboard?.selectedVitrin?.coins ?? dashboard?.user.coins}
        score={dashboard?.selectedVitrin?.scores ?? dashboard?.user.scores}
        isLoading={dashboardQuery.isLoading}
      />
      <WelcomeHero userName={dashboard?.user.fullName} />

      <main>
        {dashboardQuery.isLoading ? (
          <section className="bg-white py-12">
            <div className="mx-auto w-[calc(100%_-_32px)] max-w-[1120px]">
              <DashboardSkeleton />
            </div>
          </section>
        ) : dashboardQuery.isError || !dashboard ? (
          <section className="bg-white py-12">
            <div className="mx-auto w-[calc(100%_-_32px)] max-w-[1120px]">
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
            </div>
          </section>
        ) : (
          <>
            <AudienceSwitcher vitrins={dashboard.vitrins} />
            <ProfileOverview
              user={dashboard.user}
              selectedVitrin={dashboard.selectedVitrin}
              summary={dashboard.summary}
            />

            <section className="bg-[linear-gradient(180deg,#dcecff_0%,#e4e2ff_100%)] pb-14 pt-6">
              <div className="mx-auto w-[calc(100%_-_32px)] max-w-[1120px]">
                <LevelProgress
                  levels={levelsQuery.data ?? []}
                  score={dashboard.selectedVitrin?.scores ?? dashboard.user.scores}
                  isLoading={levelsQuery.isLoading}
                  isError={levelsQuery.isError}
                  error={levelsQuery.error}
                  onRetry={() => levelsQuery.refetch()}
                />
              </div>
            </section>
          </>
        )}

        <CampaignBanner />

        <div className="bg-[linear-gradient(180deg,#dbe6ff_0%,#e9e5ff_100%)] py-12 lg:py-16">
          <div className="mx-auto max-w-[1120px] space-y-16 px-4 lg:px-6">
            <section className="grid gap-5 lg:grid-cols-[0.83fr_1.45fr]">
              <ActivityChart activities={activities} />
              <RecentActivities
                items={activities}
                isLoading={activitiesQuery.isLoading}
                isFetching={activitiesQuery.isFetching}
                hasNextPage={activitiesQuery.hasNextPage}
                isFetchingNextPage={activitiesQuery.isFetchingNextPage}
                onLoadMore={() => activitiesQuery.fetchNextPage()}
              />
            </section>
            <FeatureGrid />
          </div>
        </div>
      </main>

      <footer className="bg-slate-950 px-4 py-7 text-center text-xs text-slate-400">
        توسعه‌یافته برای باشگاه مشتریان پاراف - معماری Feature-based، TypeScript و App Router
      </footer>
    </div>
  );
}
