"use client";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import React, { useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { deleteCategoryById } from "../actions";

export default function DeleteCategory({ categoryId }: { categoryId: number }) {
  const [isPending, startTransition] = useTransition();
  const onSubmit = () => {
    startTransition(async () => {
      const result = JSON.parse(await deleteCategoryById(categoryId));
      if (result?.error.message) {
        toast({
          title: "Error - Failed to delete category.",
          description: result.error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Category deleted successfully.",
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
