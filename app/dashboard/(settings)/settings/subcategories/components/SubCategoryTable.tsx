import Table from "@/components/ui/table";
import { SubCategoryTableProps } from "@/utils/types";
import React from "react";
import ListOfSubCategories from "./ListOfSubCategories";

export default function SubCategoryTable({
  data,
  categories,
}: {
  data: SubCategoryTableProps[];
  categories: any[];
}) {
  const tableHeader = ["Name", "Products", "Category", "Created"];
  return (
    <Table className="grid grid-cols-5" headers={tableHeader}>
      <ListOfSubCategories
        className="grid grid-cols-5"
        data={data as SubCategoryTableProps[]}
        categories={categories}
      />
    </Table>
  );
}
