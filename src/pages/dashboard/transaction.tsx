import DashboardHeader from "@/components/dashboard/home/dashboard-header";
import { TransactionItem } from "@/components/dashboard/transaction/transaction-item";
import { Button } from "@/components/ui/button";
import { DataErrorState } from "@/components/ui/data-error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetHistoryQuery } from "@/features/api/transaction-api";
import { Fragment, useState } from "react";

const LIMIT = 5;

const Transaction = () => {
  const [offset, setOffset] = useState(0);
  const { data, isLoading, isFetching, isError, refetch } = useGetHistoryQuery({
    offset,
    limit: LIMIT,
  });

  // Tentukan apakah tombol "Show More" harus tampil
  const hasRecords = data && data.records.length > 0;
  const isLastPage = data ? data.records.length < offset + LIMIT : false;

  const handleShowMore = () => {
    setOffset((prev) => prev + LIMIT);
  };

  if (isError) {
    return (
      <Fragment>
        <DashboardHeader />
        <DataErrorState
          title="Riwayat Gagal Dimuat"
          description="Gagal mengambil riwayat transaksi Anda. Silakan coba lagi nanti."
          onRetry={refetch}
        />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <DashboardHeader />

      <section className="container mt-14 space-y-6 pb-20">
        <h3 className="text-lg font-bold">Semua Transaksi</h3>

        <div className="space-y-4">
          {/* List Transaksi */}
          {data?.records.map((record, idx) => (
            <TransactionItem
              key={`${record.invoice_number}-${idx}`}
              record={record}
            />
          ))}

          {/* Skeleton Loader */}
          {(isLoading || isFetching) &&
            Array.from({ length: LIMIT }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-md" />
            ))}
        </div>

        {/* Empty State */}
        {!isLoading && data?.records.length === 0 && (
          <p className="text-muted-foreground py-10 text-center italic">
            Belum ada riwayat transaksi
          </p>
        )}

        {/* Action Button */}
        {!isLastPage && hasRecords && (
          <div className="flex justify-center pt-4">
            <Button
              variant="ghost"
              onClick={handleShowMore}
              disabled={isFetching}
              className="cursor-pointer font-bold text-red-500 hover:bg-transparent hover:text-red-600 disabled:text-gray-400"
            >
              {isFetching ? "Loading..." : "Show More"}
            </Button>
          </div>
        )}
      </section>
    </Fragment>
  );
};

export default Transaction;
