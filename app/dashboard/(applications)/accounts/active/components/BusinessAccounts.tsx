import React from "react";
import SearchAccount from "./SearchAccount";
import AccountsTable from "./AccountsTable";
import { AccountTableProps } from "@/utils/types";

export default function BusinessAccounts({
  data,
}: {
  data: AccountTableProps[];
}) {
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Business Account</h1>
      <div className="flex gap-2">
        <SearchAccount />
      </div>
      <AccountsTable data={data as AccountTableProps[]} />
    </div>
  );
}
