import React from "react";
import SearchCountry from "./components/SearchCountry";
import CreateCountry from "./components/CreateCountry";
import { CountryTableProps } from "@/utils/types";
import CountryTable from "./components/CountryTable";
import { readAllCountries } from "./actions";

export default async function page() {
  const data = await readAllCountries();
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Countries</h1>
      <div className="flex gap-2">
        <SearchCountry />
        <CreateCountry />
      </div>
      <CountryTable data={data as unknown as CountryTableProps[]} />
    </div>
  );
}
