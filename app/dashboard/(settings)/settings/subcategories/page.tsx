import { SubCategoryTableProps } from "@/utils/types";
import React from "react";
import { readSubCategories } from "./actions";
import SubCategoryTable from "./components/SubCategoryTable";
import SearchSubCategories from "./components/SearchSubCategories";
import CreateSubCategory from "./components/CreateSubCategory";
import { readCategories } from "../categories/actions";

export const revalidate = 3600; // revalidate the data at most every hour
export default async function page() {
  const data = await readSubCategories();
  const categories = await readCategories();
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Sub Categories</h1>
      <div className="flex gap-2">
        <SearchSubCategories />
        <CreateSubCategory data={categories} />
      </div>
      <SubCategoryTable
        data={data as unknown as SubCategoryTableProps[]}
        categories={categories}
      />
    </div>
  );
}
