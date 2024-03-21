import DailogForm from "@/app/dashboard/components/DailogForm";
import { Button } from "@/components/ui/button";
import React from "react";
import CreateForm from "./CreateForm";

export default function CreateCategory() {
  return (
    <DailogForm
      id="create-trigger"
      title="Create Category"
      Trigger={<Button variant="outline">Create+</Button>}
      form={<CreateForm triggerId="create-trigger" />}
      description="Create a new category. This will be used to group products."
    />
  );
}
