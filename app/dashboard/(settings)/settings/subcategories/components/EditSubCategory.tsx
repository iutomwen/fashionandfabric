import DailogForm from "@/app/dashboard/components/DailogForm";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import React from "react";
import { Tables } from "@/utils/types";
import EditForm from "./EditForm";
export default function EditSubCategory({
  subcategory,
  categories,
}: {
  subcategory: Tables<"sub_categories">;
  categories: Tables<"categories">[];
}) {
  return (
    <DailogForm
      id={`update-trigger-${subcategory.id}`}
      title="Edit Category"
      Trigger={
        <Button variant="outline">
          <Pencil1Icon />
          Edit
        </Button>
      }
      form={
        <EditForm
          triggerId={`update-trigger-${subcategory.id}`}
          subcategory={subcategory as Tables<"sub_categories">}
          categories={categories}
        />
      }
      description="Edit a category. This will be used to group products."
    />
  );
}
