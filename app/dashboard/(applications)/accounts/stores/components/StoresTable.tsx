import Table from "@/components/ui/table";
import { StoreTableProps } from "@/utils/types";
import React from "react";
import ListOfStores from "./ListOfStores";

export default function StoresTable({
  data,
  type,
}: {
  data: StoreTableProps[];
  type?: string;
}) {
  const tableHeader = [
    "Name",
    "Owner",
    "Products",
    "Contact",
    "Store Info",
    "Created",
  ];
  return (
    <Table className="grid grid-cols-7" headers={tableHeader}>
      {data.length === 0 ? (
        <div className="col-span-7 text-center">No data available</div>
      ) : (
        <ListOfStores
          className="grid grid-cols-7"
          data={data as StoreTableProps[]}
          type={type}
        />
      )}
    </Table>
  );
}
