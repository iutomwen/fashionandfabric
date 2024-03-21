import React from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "../../components/SidebarNav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Fashion & Fabric Store",
    default: "Account Settings",
  },
  description: "App Settings.",
};
const path = "/dashboard/accounts";

interface AccountLayoutProps {
  children: React.ReactNode;
}
const sidebarNavItems = [
  {
    title: "Account Summary",
    href: `${path}/`,
  },
  {
    title: "Active Accounts",
    href: `${path}/active`,
  },
  {
    title: "Deactivated Accounts",
    href: `${path}/deactivated`,
  },
  {
    title: "Business Stores",
    href: `${path}/stores`,
  },
  {
    title: "Staff Members",
    href: `${path}/staff`,
  },
];
export default function AccountLayout({ children }: AccountLayoutProps) {
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
