import React from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "../../components/SidebarNav";
import { Metadata } from "next";
import { NavBarProps } from "@/utils/types";

export const metadata: Metadata = {
  title: {
    template: "%s | Fashion & Fabric Store",
    default: "Report Settings",
  },
  description: "App Settings.",
};
const path = "/dashboard/reports";

interface AccountLayoutProps {
  children: React.ReactNode;
}
const sidebarNavItems: NavBarProps[] = [
  {
    title: "Report Summary",
    href: `${path}/`,
  },
  {
    title: "Bug Reports",
    href: `${path}/bugs`,
  },
  {
    title: "User Reports",
    href: `${path}/users`,
  },
  {
    title: "Product Reports",
    href: `${path}/products`,
  },
  {
    title: "Stores Reports",
    href: `${path}/stores`,
  },

  { title: "Feedback Reports", href: `${path}/feedbacks` },
];
export default function ReportLayout({ children }: AccountLayoutProps) {
  return (
    <div className=" space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Account Dashboard</h2>
        <p className="text-muted-foreground">
          View the current users avaliable in the system.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-5xl p-6 border rounded-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
