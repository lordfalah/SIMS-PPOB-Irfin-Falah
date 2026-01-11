import { Skeleton } from "@/components/ui/skeleton";

const AccountSkeleton = () => {
  return (
    <div className="container max-w-5xl space-y-6">
      {/* Avatar Skeleton */}
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="size-24 rounded-full" />
        <Skeleton className="h-6 w-48" />{" "}
        {/* Skeleton untuk Nama di bawah foto */}
      </div>

      {/* Email Input Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" /> {/* Label */}
        <Skeleton className="h-12 w-full rounded-md" /> {/* Input Group */}
      </div>

      {/* Grid Nama Depan & Belakang */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="w-full space-y-4">
        <Skeleton className="h-12 w-full rounded-md" />
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </div>
  );
};

export default AccountSkeleton;
