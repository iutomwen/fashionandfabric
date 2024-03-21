import React from "react";
import Table from "@/components/ui/table";
import ListOfCategories from "./ListOfCategories";
import { CategoryTableProps } from "@/utils/types";

export default function CategoryTable({
  data,
}: {
  data: CategoryTableProps[];
}) {
  const tableHeader = ["Name", "Products", "HasOptions", "Created"];
  return (
    <Table className="grid grid-cols-5" headers={tableHeader}>
      <ListOfCategories
        className="grid grid-cols-5"
        data={data as CategoryTableProps[]}
      />
    </Table>
  );
}
