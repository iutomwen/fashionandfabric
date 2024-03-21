import DailogForm from "@/app/dashboard/components/DailogForm";
import { Button } from "@/components/ui/button";
import { StateTableProps } from "@/utils/types";
import { Pencil1Icon } from "@radix-ui/react-icons";
import React from "react";
import EditForm from "./EditForm";

export default function EditCity({
  city,
  states,
}: {
  city: any;
  states: StateTableProps[];
}) {
  return (
    <DailogForm
      id={`update-trigger-${city.id}`}
      title="Edit City"
      Trigger={
        <Button variant="outline">
          <Pencil1Icon />
          Edit
        </Button>
      }
      form={
        <EditForm
          triggerId={`update-trigger-${city.id}`}
          city={city}
          States={states}
        />
      }
      description="Edit a city. This will be used to group products."
    />
  );
}
