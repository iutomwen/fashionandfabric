import React from "react";
import { readAllStates } from "../states/actions";
import { readAllCities } from "./actions";
import { CityTableProps, StateTableProps } from "@/utils/types";
import SearchCity from "./components/SearchCity";
import CreateCity from "./components/CreateCity";
import CityTable from "./components/CityTable";

export default async function page() {
  const states = await readAllStates();
  const data = await readAllCities();
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Countries</h1>
      <div className="flex gap-2">
        <SearchCity />
        <CreateCity states={states as unknown as StateTableProps[]} />
      </div>
      <CityTable
        data={data as unknown as CityTableProps[]}
        states={states as unknown as StateTableProps[]}
      />
    </div>
  );
}
