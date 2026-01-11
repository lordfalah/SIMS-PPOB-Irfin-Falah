import { SiteHeader } from "@/components/site-header";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="relative flex min-h-screen flex-col gap-y-10">
      <SiteHeader />
      <main className="mb-10 flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
