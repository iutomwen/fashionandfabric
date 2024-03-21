import DailogForm from "@/app/dashboard/components/DailogForm";
import { Button } from "@/components/ui/button";
import React from "react";
import CreateForm from "./CreateForm";
import { CountryTableProps } from "@/utils/types";

export default function CreateState({
  countries,
}: {
  countries: CountryTableProps[];
}) {
  return (
    <DailogForm
      id="create-state-trigger"
      title="Create state"
      Trigger={<Button variant="outline">Create+</Button>}
      form={
        <CreateForm triggerId="create-state-trigger" countries={countries} />
      }
      description="Create a new state. This will be used to group products."
    />
  );
}
