import { useState } from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState<null | boolean>(null);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <Outlet
        context={{
          message,
          setMessage,
          isError,
          setIsError,
        }}
      />
    </div>
  );
};

export default AuthLayout;
