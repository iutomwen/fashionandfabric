import Table from "@/components/ui/table";
import { ProductTableProps } from "@/utils/types";
import React from "react";
import ListOfProducts from "./ListOfProducts";

export default function ProductsTable({
  data,
  type,
}: {
  data: ProductTableProps[];
  type?: string;
}) {
  const tableHeader = [
    "Name",
    "Price",
    "Delivery Type",
    "Category",
    "Store",
    "Likes",
    "Created",
  ];
  return (
    <Table className="grid grid-cols-8" headers={tableHeader}>
      {data.length === 0 ? (
        <div className="col-span-8 text-center">No data available</div>
      ) : (
        <ListOfProducts
          className="grid grid-cols-8"
          type={type}
          data={data as ProductTableProps[]}
        />
      )}
    </Table>
  );
}
