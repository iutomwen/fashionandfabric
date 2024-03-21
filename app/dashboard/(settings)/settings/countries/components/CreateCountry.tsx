import DailogForm from "@/app/dashboard/components/DailogForm";
import { Button } from "@/components/ui/button";
import React from "react";
import CreateForm from "./CreateForm";

export default function CreateCountry() {
  return (
    <DailogForm
      id="create-country-trigger"
      title="Create country"
      Trigger={<Button variant="outline">Create+</Button>}
      form={<CreateForm triggerId="create-country-trigger" />}
      description="Create a new country. This will be used to group products."
    />
  );
}
