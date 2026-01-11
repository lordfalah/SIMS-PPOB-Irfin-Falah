import { Outlet } from "react-router";

function Root() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Root;
