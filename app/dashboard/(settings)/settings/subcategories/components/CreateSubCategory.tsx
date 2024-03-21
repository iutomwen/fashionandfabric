import DailogForm from "@/app/dashboard/components/DailogForm";
import { Button } from "@/components/ui/button";
import React from "react";
import CreateForm from "./CreateForm";
import { readCategories } from "../../categories/actions";

export default async function CreateSubCategory({
  data: categories,
}: {
  data: any[];
}) {
  return (
    <DailogForm
      id="create-sub-trigger"
      title="Create Sub Category"
      Trigger={<Button variant="outline">Create+</Button>}
      form={<CreateForm triggerId="create-sub-trigger" data={categories} />}
      description="Create a new sub category. This will be used to group products."
    />
  );
}
