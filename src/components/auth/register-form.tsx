import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import {
  registerSchema,
  type TRegisterRequest,
} from "@/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Label } from "../ui/label";
import { useState, useTransition } from "react";
import { Spinner } from "../ui/spinner";
import type { TApiResponse } from "@/types/index.type";
import { Eye, EyeOff, LockKeyhole, User } from "lucide-react";
import { Link, useOutletContext } from "react-router";
import ErrorHandler from "@/lib/error-handler";
import type { TAuthOutletContext } from "@/types/auth.type";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { setIsError, setMessage } = useOutletContext<TAuthOutletContext>();

  const form = useForm<TRegisterRequest>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      first_name: "",
      last_name: "",
    },
  });

  const onSubmit = (values: TRegisterRequest) => {
    startTransition(async () => {
      try {
        const req = await fetch(
          `${import.meta.env.VITE_API_URL}/registration`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          },
        );

        if (!req.ok) setIsError(true);
        if (req.ok) setIsError(false);

        const res: TApiResponse = await req.json();
        setMessage(res.message);
        form.reset();
      } catch (error) {
        setMessage(ErrorHandler.handleDefault(error).message);
        setIsError(true);
      }
    });
  };

  return (
    <form
      id="form-login"
      className={cn("flex flex-col gap-6", className)}
      onSubmit={form.handleSubmit(onSubmit)}
      {...props}
    >
      <FieldGroup>
        <div className="space-y-10">
          <div className="flex items-center justify-center gap-x-2.5">
            <img src="/image/Logo.png" alt="logo" className="size-8" />
            <h2 className="text-2xl font-medium">SIMS PPOB</h2>
          </div>

          <div className="mb-6 flex flex-col items-center gap-1 text-center">
            <h1 className="text-3xl font-medium">
              Lengkapi data untuk membuat akun
            </h1>
          </div>
        </div>

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="masukkan email anda"
                  autoComplete="off"
                  type="email"
                />
                <InputGroupAddon>
                  <Label htmlFor={field.name}>@</Label>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && (
                <FieldError
                  className="flex justify-end"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        <Controller
          name="first_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="nama depan"
                  autoComplete="off"
                />
                <InputGroupAddon>
                  <Label htmlFor={field.name}>
                    <User size={15} />
                  </Label>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && (
                <FieldError
                  className="flex justify-end"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        <Controller
          name="last_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="nama belakang"
                  autoComplete="off"
                />
                <InputGroupAddon>
                  <Label htmlFor={field.name}>
                    <User size={15} />
                  </Label>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && (
                <FieldError
                  className="flex justify-end"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  type={showPassword ? "text" : "password"}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="buat password"
                  autoComplete="off"
                  className={cn(
                    "placeholder:font-sans placeholder:text-sm placeholder:tracking-normal",
                    showPassword
                      ? "tracking-normal"
                      : "font-mono !text-xl tracking-widest",
                  )}
                />
                <InputGroupAddon align={"inline-start"}>
                  <Label htmlFor={field.name}>
                    <LockKeyhole size={15} />
                  </Label>
                </InputGroupAddon>
                <InputGroupAddon className="!mr-0" align={"inline-end"}>
                  <button
                    type="button"
                    aria-label={
                      showPassword
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && (
                <FieldError
                  className="flex justify-end"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        <Controller
          name="confirm_password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  type={showConfirmPassword ? "text" : "password"}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="konfirmasi password"
                  autoComplete="off"
                  className={cn(
                    "placeholder:font-sans placeholder:text-sm placeholder:tracking-normal",
                    showConfirmPassword
                      ? "tracking-normal"
                      : "font-mono !text-xl tracking-widest",
                  )}
                />
                <InputGroupAddon align={"inline-start"}>
                  <Label htmlFor={field.name}>
                    <LockKeyhole size={15} />
                  </Label>
                </InputGroupAddon>
                <InputGroupAddon className="!mr-0" align={"inline-end"}>
                  <button
                    type="button"
                    aria-label={
                      showConfirmPassword
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && (
                <FieldError
                  className="flex justify-end"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        <Field className="mt-6 space-y-6">
          <Button
            className="cursor-pointer rounded-sm bg-red-500 py-6 hover:bg-red-800"
            form="form-login"
            disabled={isPending}
            type="submit"
          >
            {isPending ? <Spinner /> : "Masuk"}
          </Button>

          <div className="flex items-center justify-center gap-x-1 text-center text-sm">
            <p className="text-black/50">sudah punya akun? login</p>{" "}
            <Link to={"/auth/login"} className="font-bold text-red-400">
              di sini
            </Link>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}
