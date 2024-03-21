import { cn } from "@/lib/utils";
import { SubCategoryTableProps } from "@/utils/types";
import React from "react";
import DeleteSubCategory from "./DeleteSubCategory";
import EditSubCategory from "./EditSubCategory";

export default function ListOfSubCategories({
  data,
  categories,
  className,
}: {
  data: SubCategoryTableProps[];
  categories: any[];
  className: string;
}) {
  return (
    <div className="dark:bg-inherit bg-white mx-2 rounded-sm">
      {data.map((sub) => {
        return (
          <div
            className={`${className} rounded-sm  p-3 align-middle font-normal`}
            key={sub.id}
          >
            <h1>{sub.name}</h1>

            <div>
              <span
                className={cn(
                  " dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
                  sub.products[0].count > 0
                    ? "bg-zinc-100 border-zinc-200 dark:border-zinc-600 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                    : "bg-red-100 border-red-200 text-red-500"
                )}
              >
                {sub.products[0].count}
              </span>
            </div>
            <h1>{sub.category?.name}</h1>
            <div>{new Date(sub.created_at).toDateString()}</div>

            <div className="flex gap-2 items-center">
              <DeleteSubCategory subcategoryId={sub.id} />
              <EditSubCategory subcategory={sub} categories={categories} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
