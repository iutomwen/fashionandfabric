import { cn } from "@/lib/utils";
import { CountryTableProps } from "@/utils/types";
import React from "react";
import DeleteCountry from "./DeleteCountry";
import EditCountry from "./EditCountry";

export default function ListOfCountries({
  data,
  className,
}: {
  data: CountryTableProps[];
  className?: string;
}) {
  return (
    <div className="dark:bg-inherit bg-white mx-2 rounded-sm">
      {data.map((country) => {
        return (
          <div
            className={`${className} rounded-sm  p-1 align-middle font-normal items-center justify-center py-3`}
            key={country.id}
          >
            <h1>{country.name}</h1>
            <h1>{country.flag}</h1>
            <h1>{country.currency}</h1>

            <div>
              <span
                className={cn(
                  " dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
                  country.states[0].count > 0
                    ? "bg-zinc-100 border-zinc-200 dark:border-zinc-600 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                    : "bg-red-100 border-red-200 text-red-500"
                )}
              >
                {country.states[0].count}
              </span>
            </div>
            <div>
              <span
                className={cn(
                  " dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
                  country.profiles[0].count > 0
                    ? "bg-zinc-100 border-zinc-200 dark:border-zinc-600 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                    : "bg-red-100 border-red-200 text-red-500"
                )}
              >
                {country.profiles[0].count}
              </span>
            </div>
            <div>
              <span
                className={cn(
                  " dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
                  country.products[0].count > 0
                    ? "bg-zinc-100 border-zinc-200 dark:border-zinc-600 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                    : "bg-red-100 border-red-200 text-red-500"
                )}
              >
                {country.products[0].count}
              </span>
            </div>
            <div className="text-sm">
              {new Date(country.created_at).toDateString()}
            </div>

            <div className="flex gap-2 items-center">
              <DeleteCountry countryId={country.id} />
              <EditCountry country={country} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
