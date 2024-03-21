import Table from "@/components/ui/table";
import { CityTableProps, StateTableProps } from "@/utils/types";
import React from "react";
import ListOfCities from "./ListOfCities";

export default function CityTable({
  data,
  states,
}: {
  data: CityTableProps[];
  states: StateTableProps[];
}) {
  const tableHeader = ["Name", "State", "Accounts", "Products", "Created"];
  return (
    <Table className="grid grid-cols-6" headers={tableHeader}>
      <ListOfCities
        className="grid grid-cols-6"
        data={data as CityTableProps[]}
        states={states}
      />
    </Table>
  );
}
