import DailogForm from "@/app/dashboard/components/DailogForm";
import { Button } from "@/components/ui/button";
import { CountryTableProps, Tables } from "@/utils/types";
import { Pencil1Icon } from "@radix-ui/react-icons";
import React from "react";
import EditForm from "./EditForm";

export default function EditState({
  state,
  countries,
}: {
  state: Tables<"states">;
  countries: CountryTableProps[];
}) {
  return (
    <DailogForm
      id={`update-trigger-${state.id}`}
      title="Edit State"
      Trigger={
        <Button variant="outline">
          <Pencil1Icon />
          Edit
        </Button>
      }
      form={
        <EditForm
          triggerId={`update-trigger-${state.id}`}
          state={state}
          countries={countries}
        />
      }
      description="Edit a state. This will be used to group products."
    />
  );
}
