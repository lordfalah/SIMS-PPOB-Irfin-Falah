import type { Service } from "./service.type";

export interface TTransactionRequest {
  service_code: string;
}

export interface TTransactionRecord {
  invoice_number: string;
  transaction_type: "TOPUP" | "PAYMENT";
  description: string;
  total_amount: number;
  created_on: string;
}

export interface THistoryResponse {
  offset: number;
  limit: number;
  records: TTransactionRecord[];
}

export interface PaymentDialogProps {
  service: Service | undefined;
  openConfirm: boolean;
  setOpenConfirm: (v: boolean) => void;
  openStatus: boolean;
  setOpenStatus: (v: boolean) => void;
  status: "success" | "error" | null;
  onConfirm: () => void;
  onCloseStatus: () => void;
}

export interface TransactionStatusDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  status: "success" | "error" | null;
  title: string;
  amount: number;
  onClose: () => void;
}
