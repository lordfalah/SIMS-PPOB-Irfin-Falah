import App from "@/layout/Root";
import { createBrowserRouter, redirect } from "react-router";
import AuthLayout from "../layout/auth-layout";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import DashboardLayout from "../layout/dashboard-layout";
import DashboardHome from "../pages/dashboard/home";
import TopUp from "../pages/dashboard/top-up";
import Transaction from "../pages/dashboard/transaction";
import Account from "../pages/dashboard/account";
import Service from "@/pages/dashboard/service";
import { authMiddleware, guestMiddleware } from "@/middleware";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,

    children: [
      {
        index: true,
        loader: () => redirect("/auth/login"),
      },
      {
        path: "/auth",
        Component: AuthLayout,
        middleware: [guestMiddleware],
        children: [
          { path: "login", Component: LoginPage },
          { path: "register", Component: RegisterPage },
        ],
      },

      {
        path: "/dashboard",
        Component: DashboardLayout,
        middleware: [authMiddleware],
        children: [
          { index: true, Component: DashboardHome },

          { path: ":serviceCode", Component: Service },
          {
            path: "top-up",
            Component: TopUp,
          },
          {
            path: "transaction",
            Component: Transaction,
          },
          {
            path: "account",
            Component: Account,
          },
        ],
      },
    ],
  },
]);
