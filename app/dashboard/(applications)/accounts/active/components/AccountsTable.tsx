import Table from "@/components/ui/table";
import { AccountTableProps } from "@/utils/types";
import React from "react";
import ListOfAccounts from "./ListOfAccounts";

export default function AccountsTable({
  data,
  type,
}: {
  data: AccountTableProps[];
  type?: string;
}) {
  const tableHeader = ["Name", "Role", "Email", "Phone", "Created"];
  return (
    <Table className="grid grid-cols-6" headers={tableHeader}>
      {data.length === 0 ? (
        <div className="col-span-6 text-center">No data available</div>
      ) : (
        <ListOfAccounts
          className="grid grid-cols-6"
          type={type}
          data={data as AccountTableProps[]}
        />
      )}
    </Table>
  );
}
