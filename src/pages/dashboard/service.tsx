import DashboardHeader from "@/components/dashboard/home/dashboard-header";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Skeleton } from "@/components/ui/skeleton";
import { formatToRupiah } from "@/lib/utils";
import { Banknote } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { DataErrorState } from "@/components/ui/data-error-state";
import { ServiceHeader } from "@/components/dashboard/service/service-header";
import { PaymentTransactionDialog } from "@/components/dashboard/transaction/payment-transaction-dialog";
import { useGetServicesQuery } from "@/features/api/info-api";
import { useCreateTransactionMutation } from "@/features/api/transaction-api";

const Service = () => {
  const { serviceCode } = useParams<{ serviceCode: string }>();
  const navigate = useNavigate();

  // States
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  // Queries
  const {
    data: services,
    isLoading: loadingService,
    isError,
    refetch,
  } = useGetServicesQuery();
  const [createTransaction, { isLoading: loadingTransaction }] =
    useCreateTransactionMutation();

  const selectedService = services?.find((s) => s.service_code === serviceCode);

  const handlePayment = async () => {
    if (!selectedService) return;
    try {
      await createTransaction({
        service_code: selectedService.service_code,
      }).unwrap();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setIsStatusOpen(true);
    }
  };

  if (isError) {
    return (
      <Fragment>
        <DashboardHeader />
        <DataErrorState title="Service Gagal Dimuat" onRetry={refetch} />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <DashboardHeader />

      <section className="container mt-14 space-y-10">
        <ServiceHeader isLoading={loadingService} service={selectedService} />

        <div className="w-full space-y-6">
          <InputGroup>
            {loadingService ? (
              <Skeleton className="h-12 w-full" />
            ) : (
              <>
                <InputGroupInput
                  disabled
                  value={formatToRupiah(selectedService?.service_tariff ?? 0)}
                />
                <InputGroupAddon>
                  <Banknote />
                </InputGroupAddon>
              </>
            )}
          </InputGroup>

          <Button
            className="w-full cursor-pointer rounded-sm bg-red-500 py-6 hover:bg-red-800"
            disabled={loadingTransaction || loadingService || !selectedService}
            onClick={() => setIsConfirmOpen(true)}
          >
            Bayar
          </Button>
        </div>
      </section>

      <PaymentTransactionDialog
        service={selectedService}
        openConfirm={isConfirmOpen}
        setOpenConfirm={setIsConfirmOpen}
        openStatus={isStatusOpen}
        setOpenStatus={setIsStatusOpen}
        status={status}
        onConfirm={handlePayment}
        onCloseStatus={() => {
          setIsStatusOpen(false);
          if (status === "success") navigate("/dashboard/transaction");
        }}
      />
    </Fragment>
  );
};

export default Service;
