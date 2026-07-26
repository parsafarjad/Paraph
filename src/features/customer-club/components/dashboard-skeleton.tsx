import { Card } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-80 max-w-full" />
      <Card className="p-6">
        <div className="grid gap-5 lg:grid-cols-3">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
      </Card>
      <div className="grid gap-5 lg:grid-cols-[230px_1fr]">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.4fr]">
        <Skeleton className="h-[460px]" />
        <Skeleton className="h-[460px]" />
      </div>
    </div>
  );
}
