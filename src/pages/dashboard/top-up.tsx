import DashboardHeader from "@/components/dashboard/home/dashboard-header";
import { TransactionStatusDialog } from "@/components/dashboard/transaction/transaction-status-dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { useTopUpMutation } from "@/features/api/transaction-api";
import ErrorHandler from "@/lib/error-handler";
import { formatToRupiah } from "@/lib/utils";
import {
  topUpSchema,
  type TTopUpSchemaRequest,
} from "@/validation/top-up.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banknote } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Fragment } from "react/jsx-runtime";
import { toast } from "sonner";

const topUpBtn = [10000, 20000, 50000, 100000, 250000, 500000];

const TopUp = () => {
  const [topUp, { isLoading }] = useTopUpMutation();
  const navigate = useNavigate();

  // State
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [confirmedAmount, setConfirmedAmount] = useState<number>(0);

  const form = useForm<TTopUpSchemaRequest>({
    resolver: zodResolver(topUpSchema),
    defaultValues: {
      top_up_amount: undefined,
    },
    mode: "onChange",
  });

  async function onSubmit(values: TTopUpSchemaRequest) {
    setConfirmedAmount(values.top_up_amount);
    try {
      const resTopUp = await topUp(values).unwrap();
      if (resTopUp.data) {
        toast.success(resTopUp.message);
        setStatus("success");
        form.reset();
        return;
      }
      toast.error(resTopUp.message);
      setStatus("error");
    } catch (error) {
      toast.error(ErrorHandler.handleDefault(error).message ?? "Gagal Top Up");
      setStatus("error");
    } finally {
      setIsStatusOpen(true);
    }
  }

  return (
    <Fragment>
      <DashboardHeader />

      <section className="container mt-14 space-y-10">
        <div className="">
          <p className="text-lg text-black/75">Silahkan masukkan</p>
          <h2 className="text-3xl font-medium">Nominal Top Up</h2>
        </div>

        <div className="flex flex-col gap-x-8 gap-y-6 md:flex-row">
          <form
            className="basis-[60%]"
            id="form-topUp"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup>
              <Controller
                name="top_up_amount"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? "" : Number(val));
                        }}
                        value={field.value ?? ""}
                        type="number"
                        placeholder="masukkan nominal Top Up"
                        autoComplete="off"
                      />
                      <InputGroupAddon>
                        <Banknote />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                className="cursor-pointer rounded-xs bg-red-500 py-6 hover:bg-red-800"
                disabled={
                  !form.formState.isDirty ||
                  !form.formState.isValid ||
                  isLoading
                }
                type="submit"
                form="form-topUp"
              >
                {isLoading ? <Spinner /> : "Top Up"}
              </Button>
            </FieldGroup>
          </form>

          <div className="grid basis-[40%] grid-cols-12 content-between gap-2">
            {topUpBtn.map((price, idx) => (
              <Button
                key={idx}
                type="button"
                variant={"ghost"}
                className="col-span-4 cursor-pointer rounded-xs border px-4 py-5"
                onClick={() => {
                  form.setValue("top_up_amount", price, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              >
                <span className="text-xs text-black/65">
                  Rp{formatToRupiah(price)}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      <TransactionStatusDialog
        open={isStatusOpen}
        setOpen={setIsStatusOpen}
        status={status}
        title="Top Up"
        amount={confirmedAmount}
        onClose={() => {
          setIsStatusOpen(false);
          if (status === "success") navigate("/dashboard/transaction");
        }}
      />
    </Fragment>
  );
};

export default TopUp;
