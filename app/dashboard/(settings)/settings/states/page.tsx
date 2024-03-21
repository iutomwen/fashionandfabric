import React from "react";
import { readAllStates } from "./actions";
import { StateTableProps } from "@/utils/types";
import SearchState from "./components/SearchState";
import CreateState from "./components/CreateState";
import { readAllCountries } from "../countries/actions";
import StateTable from "./components/StateTable";

export default async function page() {
  const data = await readAllStates();
  const countries = await readAllCountries();
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Countries</h1>
      <div className="flex gap-2">
        <SearchState />
        <CreateState countries={countries} />
      </div>
      <StateTable data={data as StateTableProps[]} countries={countries} />
    </div>
  );
}
