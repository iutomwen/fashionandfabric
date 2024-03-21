import { cn } from "@/lib/utils";
import { CountryTableProps, StateTableProps } from "@/utils/types";
import React from "react";
import DeleteState from "./DeleteState";
import EditState from "./EditState";

export default function ListOfStates({
  className,
  data,
  countries,
}: {
  className: string;
  data: StateTableProps[];
  countries: CountryTableProps[];
}) {
  return (
    <div className="dark:bg-inherit bg-white mx-2 rounded-sm">
      {data.map((state) => {
        return (
          <div
            className={`${className} rounded-sm  p-1 align-middle font-normal items-center justify-center py-3`}
            key={state.id}
          >
            <h1>{state.name}</h1>
            <h1>
              {state.country.flag} {state.country.name}
            </h1>

            <div>
              <span
                className={cn(
                  " dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
                  state.profiles[0].count > 0
                    ? "bg-zinc-100 border-zinc-200 dark:border-zinc-600 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                    : "bg-red-100 border-red-200 text-red-500"
                )}
              >
                {state.profiles[0].count}
              </span>
            </div>
            <div>
              <span
                className={cn(
                  " dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
                  state.products[0].count > 0
                    ? "bg-zinc-100 border-zinc-200 dark:border-zinc-600 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                    : "bg-red-100 border-red-200 text-red-500"
                )}
              >
                {state.products[0].count}
              </span>
            </div>

            <div className="text-sm">
              {new Date(state.created_at).toDateString()}
            </div>

            <div className="flex gap-2 items-center">
              <DeleteState stateId={state.id} />
              <EditState state={state} countries={countries} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
