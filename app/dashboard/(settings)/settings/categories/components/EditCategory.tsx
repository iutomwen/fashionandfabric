import DailogForm from "@/app/dashboard/components/DailogForm";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import React from "react";
import EditForm from "./EditForm";
import { Tables } from "@/utils/types";

export default function EditCategory({
  category,
}: {
  category: Tables<"categories">;
}) {
  return (
    <DailogForm
      id={`update-trigger-${category.id}`}
      title="Edit Category"
      Trigger={
        <Button variant="outline">
          <Pencil1Icon />
          Edit
        </Button>
      }
      form={
        <EditForm
          triggerId={`update-trigger-${category.id}`}
          category={category as Tables<"categories">}
        />
      }
      description="Edit a category. This will be used to group products."
    />
  );
}
