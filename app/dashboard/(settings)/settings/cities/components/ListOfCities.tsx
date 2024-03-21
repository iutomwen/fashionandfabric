import { cn } from "@/lib/utils";
import { CityTableProps, StateTableProps } from "@/utils/types";
import React from "react";
import DeleteCity from "./DeleteCity";
import EditCity from "./EditCity";

export default function ListOfCities({
  data,
  states,
  className,
}: {
  data: CityTableProps[];
  states: StateTableProps[];
  className: string;
}) {
  return (
    <div className="dark:bg-inherit bg-white mx-2 rounded-sm">
      {data.map((city) => {
        return (
          <div
            className={`${className} rounded-sm  p-1 align-middle font-normal items-center justify-center py-3`}
            key={city.id}
          >
            <h1>{city.name}</h1>
            <h1>{city.state.name}</h1>

            <div>
              <span
                className={cn(
                  " dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
                  city.profiles[0].count > 0
                    ? "bg-zinc-100 border-zinc-200 dark:border-zinc-600 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                    : "bg-red-100 border-red-200 text-red-500"
                )}
              >
                {city.profiles[0].count}
              </span>
            </div>
            <div>
              <span
                className={cn(
                  " dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
                  city.products[0].count > 0
                    ? "bg-zinc-100 border-zinc-200 dark:border-zinc-600 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                    : "bg-red-100 border-red-200 text-red-500"
                )}
              >
                {city.products[0].count}
              </span>
            </div>

            <div className="text-sm">
              {new Date(city.created_at).toDateString()}
            </div>

            <div className="flex gap-2 items-center">
              <DeleteCity cityId={city.id} />
              <EditCity city={city} states={states} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
