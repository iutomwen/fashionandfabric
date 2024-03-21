"use client";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import React, { useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { deleteSubCategoryById } from "../actions";
export default function DeleteSubCategory({
  subcategoryId,
}: {
  subcategoryId: number;
}) {
  const [isPending, startTransition] = useTransition();
  const onSubmit = () => {
    startTransition(async () => {
      const result = JSON.parse(await deleteSubCategoryById(subcategoryId));
      if (result?.error.message) {
        toast({
          title: "Error - Failed to delete sub category.",
          description: result.error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Sub-Category deleted successfully.",
        });
      }
    });
  };
  return (
    <form action={onSubmit}>
      <Button variant="destructive">
        <TrashIcon />
        Delete
      </Button>
    </form>
  );
}
