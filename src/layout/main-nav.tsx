"use client";

import * as React from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Link } from "react-router";

export function MainNav() {
  return (
    <div className="hidden gap-6 lg:flex">
      <Link to="/dashboard" className="hidden items-center space-x-2 lg:flex">
        <img src="/image/Logo.png" className="size-7" />
        <span className="hidden font-medium lg:inline-block">
          {siteConfig.name}
        </span>
        <span className="sr-only">Home</span>
      </Link>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          to={href as string}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
            className,
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
