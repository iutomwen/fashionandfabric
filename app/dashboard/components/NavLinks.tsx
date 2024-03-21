"use client";
import React from "react";
import {
  PersonIcon,
  CrumpledPaperIcon,
  GearIcon,
  UpdateIcon,
  QuestionMarkCircledIcon,
  HomeIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const menuItems = [
    {
      mainMenu: "Dashboard",
      subMenu: [
        {
          href: "/dashboard",
          text: "Dashboard",
          Icon: HomeIcon,
        },
        {
          href: "/dashboard/analytics",
          text: "Analytics",
          Icon: RocketIcon,
        },
      ],
    },
    {
      mainMenu: "Application",
      subMenu: [
        {
          href: "/dashboard/accounts",
          text: "Accounts",
          Icon: PersonIcon,
        },
        {
          href: "/dashboard/products",
          text: "Products",
          Icon: CrumpledPaperIcon,
        },
        {
          href: "/dashboard/reports",
          text: "Reports",
          Icon: QuestionMarkCircledIcon,
        },
      ],
    },
    {
      mainMenu: "Settings",
      subMenu: [
        {
          href: "/dashboard/settings",
          text: "Settings",
          Icon: GearIcon,
        },
        {
          href: "/dashboard/subscriptions",
          text: "Subscriptions",
          Icon: UpdateIcon,
        },
        {
          href: "/dashboard/my-profile",
          text: "My Profile",
          Icon: PersonIcon,
        },
      ],
    },
  ];

  return (
    <div className="space-y-5">
      {menuItems.map((links, index) => (
        <div key={index} className="space-y-2">
          <h3 className="text-lg font-semibold">{links.mainMenu}</h3>
          <ul className="space-y-2">
            {links.subMenu.map((link, index) => {
              const Icon = link.Icon;
              return (
                <Link
                  onClick={() =>
                    document.getElementById("sidebar-close")?.click()
                  }
                  href={link.href}
                  key={index}
                  className={cn("flex items-center gap-2 rounded-sm p-2", {
                    " bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 ":
                      pathname.includes(link.href) &&
                      link.href !== "/dashboard",
                  })}
                >
                  <Icon />
                  {link.text}
                </Link>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
