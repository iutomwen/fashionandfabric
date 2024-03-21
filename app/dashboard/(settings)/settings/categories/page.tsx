import React from "react";
import CategoryTable from "./components/CategoryTable";
import SearchCategories from "./components/SearchCategories";
import { readCategories } from "./actions";
import { CategoryTableProps } from "@/utils/types";
import CreateCategory from "./components/CreateCategory";

export const revalidate = 3600; // revalidate the data at most every hour
export default async function page() {
  const data = await readCategories();
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Categories</h1>
      <div className="flex gap-2">
        <SearchCategories />
        <CreateCategory />
      </div>
      <CategoryTable data={data as unknown as CategoryTableProps[]} />
    </div>
  );
}
