import { formatDate, formatToRupiah } from "@/lib/utils";
import type { TTransactionRecord } from "@/types/transaction.type";

interface TransactionItemProps {
  record: TTransactionRecord;
}

export const TransactionItem = ({ record }: TransactionItemProps) => {
  const isTopUp = record.transaction_type === "TOPUP";

  return (
    <div className="flex items-center justify-between rounded-md border bg-white p-4 shadow-sm">
      <div className="space-y-1">
        <p
          className={`text-xl font-bold ${
            isTopUp ? "text-emerald-500" : "text-red-500"
          }`}
        >
          {isTopUp ? "+" : "-"} Rp. {formatToRupiah(record.total_amount)}
        </p>
        <p className="text-muted-foreground text-xs">
          {formatDate(record.created_on)}
        </p>
      </div>
      <p className="text-sm font-medium text-black/80">{record.description}</p>
    </div>
  );
};
