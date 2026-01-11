import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { abbreviationName, formatToRupiah } from "@/lib/utils";
import { useGetProfileQuery } from "@/features/api/profile-api";
import { useState } from "react";
import { DashboardHeaderSkeleton } from "./skeleton-dashboard";
import { DataErrorState } from "@/components/ui/data-error-state";
import { useGetBalanceQuery } from "@/features/api/transaction-api";

export default function DashboardHeader() {
  const [showBalance, setShowBalance] = useState(false);

  const {
    data: profile,
    isLoading: loadingProfile,
    isError: errorProfile,
    refetch: refetchProfile,
  } = useGetProfileQuery();

  const {
    data: balance,
    isLoading: loadingBalance,
    isError: errorBalance,
    refetch: refetchBalance,
  } = useGetBalanceQuery();

  const loadingPage = loadingBalance || loadingProfile;
  const isError = errorProfile || errorBalance;

  // 1. Handling Loading State
  if (loadingPage) {
    return <DashboardHeaderSkeleton />;
  }

  // 2. Handling Error State menggunakan DataErrorState
  if (isError) {
    return (
      <DataErrorState
        title="Gagal Memuat Informasi Akun"
        description="Kami tidak dapat mengambil data profil atau saldo Anda saat ini."
        onRetry={() => {
          refetchProfile();
          refetchBalance();
        }}
      />
    );
  }

  // 3. Handling data kosong (Opsional tapi aman)
  if (!profile || !balance) return null;

  return (
    <div className="container flex flex-col items-start justify-between gap-y-4 md:flex-row md:items-center md:gap-y-0">
      {/* Profil Section */}
      <div className="flex w-full flex-col items-center gap-4 md:basis-1/2">
        <Avatar className="border-muted-foreground/30 size-16 self-start border">
          <AvatarImage src={profile.profile_image} alt={profile.first_name} />
          <AvatarFallback>
            {abbreviationName(profile.first_name)}
          </AvatarFallback>
        </Avatar>
        <div className="self-start">
          <p className="text-lg text-black/75">Selamat datang,</p>
          <h2 className="max-w-[300px] truncate text-3xl font-bold md:max-w-full">
            {`${profile.first_name} ${profile.last_name}`}
          </h2>
        </div>
      </div>

      {/* Balance Card Section */}
      <Card className="w-full rounded-xl border-none bg-red-500 text-white md:basis-1/2">
        <CardContent className="space-y-2 p-6">
          <p className="text-md font-medium">Saldo anda</p>
          <div className="flex items-center gap-2">
            <h3 className="flex h-10 items-center gap-x-2 text-2xl font-semibold">
              Rp{" "}
              {showBalance ? (
                <span className="text-2xl">
                  {formatToRupiah(balance.balance ?? 0)}
                </span>
              ) : (
                <span className="pt-2 text-4xl leading-none tracking-widest">
                  •••••••
                </span>
              )}
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="cursor-pointer !px-0 text-white hover:bg-transparent hover:text-white/80"
            onClick={() => setShowBalance((prev) => !prev)}
          >
            <span className="mr-2 text-xs">
              {showBalance ? "Tutup Saldo" : "Lihat Saldo"}
            </span>
            {showBalance ? (
              <Eye className="size-4" />
            ) : (
              <EyeOff className="size-4" />
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
