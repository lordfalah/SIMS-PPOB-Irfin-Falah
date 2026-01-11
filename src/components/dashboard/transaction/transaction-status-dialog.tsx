import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatToRupiah } from "@/lib/utils";
import type { TransactionStatusDialogProps } from "@/types/transaction.type";

export const TransactionStatusDialog = ({
  open,
  setOpen,
  status,
  title,
  amount,
  onClose,
}: TransactionStatusDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[350px] text-center [&>button]:hidden">
        <div className="flex flex-col items-center py-4">
          <div
            className={`mb-4 flex size-14 items-center justify-center rounded-full ${
              status === "success" ? "bg-emerald-500" : "bg-red-500"
            }`}
          >
            {status === "success" ? (
              <Check className="size-8 stroke-white stroke-2" />
            ) : (
              <X className="size-8 stroke-white stroke-2" />
            )}
          </div>
          <DialogHeader>
            <DialogTitle className="text-sm font-normal text-black/75">
              {title} sebesar
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex flex-col">
            <span className="my-1 text-2xl font-semibold text-black">
              Rp{formatToRupiah(amount)}
            </span>
            <span className="text-muted-foreground mb-6 text-sm">
              {status === "success" ? "Berhasil!" : "Gagal"}
            </span>
          </DialogDescription>
          <Button
            variant="ghost"
            className="cursor-pointer font-bold text-red-500 hover:text-red-600"
            onClick={onClose}
          >
            Kembali ke Beranda
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
