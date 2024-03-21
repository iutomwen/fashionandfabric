import DailogForm from "@/app/dashboard/components/DailogForm";
import { Button } from "@/components/ui/button";
import { StateTableProps } from "@/utils/types";
import React from "react";
import CreateForm from "./CreateForm";

export default function CreateCity({ states }: { states: StateTableProps[] }) {
  return (
    <DailogForm
      id="create-city-trigger"
      title="Create city"
      Trigger={<Button variant="outline">Create+</Button>}
      form={<CreateForm triggerId="create-city-trigger" states={states} />}
      description="Create a new city. This will be used to group products."
    />
  );
}
