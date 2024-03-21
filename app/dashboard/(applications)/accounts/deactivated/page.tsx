import React from "react";
import SearchAccount from "../active/components/SearchAccount";
import AccountsTable from "../active/components/AccountsTable";
import { AccountTableProps } from "@/utils/types";
import { readAllDeactivatedAccounts } from "../actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deactivated Accounts",
  description: "View all deactivated accounts in the system",
};
export default async function page() {
  const data = await readAllDeactivatedAccounts();
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Deactivated Accounts</h1>
      <div className="flex gap-2">
        <SearchAccount />
      </div>
      <AccountsTable data={data as AccountTableProps[]} type="deactivated" />
    </div>
  );
}
