import Table from "@/components/ui/table";
import { CountryTableProps, StateTableProps } from "@/utils/types";
import React from "react";
import ListOfStates from "./ListOfStates";

export default function StateTable({
  data,
  countries,
}: {
  data: StateTableProps[];
  countries: CountryTableProps[];
}) {
  const tableHeader = ["Name", "Country", "Accounts", "Products", "Created"];
  return (
    <Table className="grid grid-cols-6" headers={tableHeader}>
      <ListOfStates
        className="grid grid-cols-6"
        data={data as StateTableProps[]}
        countries={countries}
      />
    </Table>
  );
}
