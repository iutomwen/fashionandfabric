import React, { ReactNode } from "react";
import { readUserSession } from "@/utils/actions";
import { redirect } from "next/navigation";
import SideNav from "./components/SideNav";
import MobileSideNav from "./components/MobileSideNav";
import ToggleSidebar from "./components/ToggleSidebar";

export default async function Layout({ children }: { children: ReactNode }) {
  const { user, session } = await readUserSession();

  if (!user || !session) {
    return redirect("/auth");
  }
  return (
    <div className="w-full flex ">
      <div className="h-screen flex flex-col">
        <SideNav />
        <MobileSideNav />
      </div>

      <div className="w-full sm:flex-1 p-5 sm:p-10 space-y-5 bg-gray-100 dark:bg-inherit">
        <ToggleSidebar />
        {children}
      </div>
    </div>
  );
}
