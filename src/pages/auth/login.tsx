import { LoginForm } from "@/components/auth/login-form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import type { TAuthOutletContext } from "@/types/auth.type";
import { X } from "lucide-react";
import { useOutletContext } from "react-router";
import { Fragment } from "react/jsx-runtime";

export default function LoginPage() {
  const { isError, message, setIsError } =
    useOutletContext<TAuthOutletContext>();

  return (
    <Fragment>
      <div className="flex flex-col-reverse gap-4 p-6 md:p-10">
        {isError && (
          <Alert
            className="mb-12 flex justify-between border-0 bg-red-50 no-underline"
            variant={"destructive"}
          >
            <AlertTitle>{message}</AlertTitle>

            <X
              className="cursor-pointer stroke-red-400"
              onClick={() => setIsError(null)}
            />
          </Alert>
        )}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/image/Illustrasi-Login.png"
          alt="Image-login"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </Fragment>
  );
}
