import { ProductTableProps } from "@/utils/types";
import React from "react";
import SearchProduct from "./SearchProduct";
import ProductsTable from "./ProductsTable";

export default function PendingProducts({
  data,
}: {
  data: ProductTableProps[];
}) {
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Pending Products</h1>
      <div className="flex gap-2 ">
        <SearchProduct />
      </div>
      <ProductsTable data={data as ProductTableProps[]} type="pending" />
    </div>
  );
}
