import type { MainNavItem } from "@/types/nav.type";

export type SiteConfig = typeof siteConfig;

const links = {
  x: "https://x.com/IrfinF19505",
  github: "https://github.com/lordfalah/wasshoes",
  githubAccount: "https://github.com/lordfalah",
  discord: "https://discord.com/users/falhhalla",
  instagram: "https://www.instagram.com/cleaningwasshoes/",
};

export const siteConfig = {
  name: "SIMS PPOB",
  description:
    "A modern, open-source application for creating and managing daily customer orders easily.",
  url: `${import.meta.env.VITE_PUBLIC_APP_URL!}`,
  ogImage: "https://skateshop.sadmn.com/opengraph-image.png",
  links,
  mainNav: [
    {
      title: "Dashboard",
      items: [
        {
          title: "Home",
          href: "/dashboard",
          description: "dashboard",
          items: [],
        },
        {
          title: "Top Up",
          href: "/dashboard/top-up",
          description: "dashboard top up",
          items: [],
        },
        {
          title: "Transaction",
          href: "/dashboard/transaction",
          description: "dashboard transaction",
          items: [],
        },
        {
          title: "Akun",
          href: "/dashboard/account",
          description: "dashboard account",
          items: [],
        },
      ],
    },
  ] satisfies MainNavItem[],
};
