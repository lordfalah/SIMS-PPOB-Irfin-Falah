import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/style/index.css";
import { RouterProvider } from "react-router/dom";
import { router } from "@/routes/index";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster richColors position="top-center" />
    </Provider>
  </StrictMode>,
);
