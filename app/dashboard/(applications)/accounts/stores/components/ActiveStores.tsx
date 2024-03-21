import React from "react";
import SearchStores from "./SearchStores";
import StoresTable from "./StoresTable";
import { StoreTableProps } from "@/utils/types";

export default function ActiveStores({ data }: { data: StoreTableProps[] }) {
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Active Business Stores</h1>
      <div className="flex gap-2">
        <SearchStores />
      </div>
      <StoresTable data={data as StoreTableProps[]} type="active" />
    </div>
  );
}
