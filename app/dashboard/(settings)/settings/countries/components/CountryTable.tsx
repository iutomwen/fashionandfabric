import Table from "@/components/ui/table";
import { CountryTableProps } from "@/utils/types";
import React from "react";
import ListOfCountries from "./ListOfCountries";

export default function CountryTable({ data }: { data: CountryTableProps[] }) {
  const tableHeader = [
    "Name",
    "Flag",
    "Currency",
    "States",
    "Accounts",
    "Products",
    "Created",
  ];
  return (
    <Table className="grid grid-cols-8" headers={tableHeader}>
      <ListOfCountries
        className="grid grid-cols-8"
        data={data as CountryTableProps[]}
      />
    </Table>
  );
}
