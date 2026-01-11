import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardHeaderSkeleton() {
  return (
    <div className="container flex flex-col items-start justify-between gap-y-4 md:flex-row md:items-center">
      {/* Profile */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-14 w-14 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-7 w-48" />
        </div>
      </div>

      {/* Balance Card */}
      <Card className="min-w-full md:min-w-md lg:min-w-lg xl:min-w-2xl">
        <CardContent className="space-y-3 p-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-8 w-32" />
        </CardContent>
      </Card>
    </div>
  );
}

export function ServicesSkeleton() {
  return (
    <div className="container flex flex-wrap justify-baseline gap-x-6 gap-y-5">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="flex size-22 flex-col items-center justify-between rounded-md py-2.5"
        >
          <Skeleton className="mb-2 h-10 w-14 rounded-lg" />
          <Skeleton className="h-3.5 w-full" />
        </div>
      ))}
    </div>
  );
}

export function PromoSkeleton() {
  return (
    <div className="container space-y-4">
      <Skeleton className="h-5 w-48" />
      <div className="grid grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-36 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
