import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatToRupiah } from "@/lib/utils";
import { TransactionStatusDialog } from "./transaction-status-dialog";
import { Fragment } from "react/jsx-runtime";
import type { PaymentDialogProps } from "@/types/transaction.type";

export const PaymentTransactionDialog = ({
  service,
  openConfirm,
  setOpenConfirm,
  openStatus,
  setOpenStatus,
  status,
  onConfirm,
  onCloseStatus,
}: PaymentDialogProps) => {
  return (
    <Fragment>
      <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <AlertDialogContent className="w-[350px] border-none text-center">
          <AlertDialogHeader className="flex flex-col items-center">
            <img
              src={service?.service_icon}
              className="mb-4 size-16"
              alt="icon"
            />
            <AlertDialogTitle className="text-center text-sm font-normal text-black/75">
              {service?.service_name} prabayar senilai
            </AlertDialogTitle>
            <AlertDialogDescription className="text-2xl font-semibold text-black">
              Rp{formatToRupiah(service?.service_tariff ?? 0)} ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col gap-2 sm:flex-col sm:space-x-0">
            <AlertDialogAction
              onClick={onConfirm}
              className="w-full cursor-pointer bg-transparent font-bold text-red-500 hover:bg-black/5"
            >
              Ya, lanjutkan Bayar
            </AlertDialogAction>
            <AlertDialogCancel className="w-full cursor-pointer border-none font-bold text-black/35 shadow-none hover:bg-transparent">
              Batalkan
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TransactionStatusDialog
        open={openStatus}
        setOpen={setOpenStatus}
        status={status}
        title={`Pembayaran ${service?.service_name}`}
        amount={service?.service_tariff ?? 0}
        onClose={onCloseStatus}
      />
    </Fragment>
  );
};
