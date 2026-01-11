import { siteConfig } from "@/config/site";
import { MainNav } from "@/layout/main-nav";
import { MobileNav } from "@/layout/mobile-nav";
import { NavLink } from "react-router";

export function SiteHeader() {
  return (
    <header className="bg-background/50 sticky top-0 z-50 w-full border-b border-b-black/10 backdrop-blur-md backdrop-filter">
      <div className="container flex h-16 items-center">
        <MainNav />
        <MobileNav items={siteConfig.mainNav} />
        <div className="hidden flex-1 items-center justify-end space-x-4 lg:flex">
          <nav className="flex items-center gap-x-14">
            {siteConfig.mainNav[0].items.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/dashboard"}
                className={({ isActive }) =>
                  `hover:text-muted-foreground text-sm transition-colors ${
                    isActive
                      ? "font-semibold text-red-500"
                      : "font-normal text-black"
                  }`
                }
              >
                {item.title}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
