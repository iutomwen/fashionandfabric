import React from "react";
import SearchAccount from "./SearchAccount";
import { AccountTableProps } from "@/utils/types";
import AccountsTable from "./AccountsTable";

export default function PersonalAccounts({
  data,
}: {
  data: AccountTableProps[];
}) {
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Personal Account</h1>
      <div className="flex gap-2">
        <SearchAccount />
      </div>
      <AccountsTable data={data as AccountTableProps[]} />
    </div>
  );
}
