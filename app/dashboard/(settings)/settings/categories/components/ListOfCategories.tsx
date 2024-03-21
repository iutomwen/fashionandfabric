import { cn } from "@/lib/utils";
import { CategoryTableProps } from "@/utils/types";
import React from "react";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

export default function ListOfCategories({
  data,
  className,
}: {
  data: CategoryTableProps[];
  className?: string;
}) {
  return (
    <div className="dark:bg-inherit bg-white mx-2 rounded-sm">
      {data.map((category) => {
        return (
          <div
            className={`${className} rounded-sm  p-3 align-middle font-normal`}
            key={category.id}
          >
            <h1>{category.name}</h1>

            <div>
              <span
                className={cn(
                  " dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
                  category.products[0].count > 0
                    ? "bg-zinc-100 border-zinc-200 dark:border-zinc-600 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                    : "bg-red-100 border-red-200 text-red-500"
                )}
              >
                {category.products[0].count}
              </span>
            </div>
            <h1>{category.has_options ? "Has Options" : "N/A"}</h1>
            <div>{new Date(category.created_at).toDateString()}</div>

            <div className="flex gap-2 items-center">
              <DeleteCategory categoryId={category.id} />
              <EditCategory category={category} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
