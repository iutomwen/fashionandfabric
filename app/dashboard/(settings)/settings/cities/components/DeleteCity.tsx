"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { TrashIcon } from "@radix-ui/react-icons";
import React, { useTransition } from "react";
import { deleteCityById } from "../actions";
export default function DeleteCity({ cityId }: { cityId: number }) {
  const [isPending, startTransition] = useTransition();
  const onSubmit = () => {
    startTransition(async () => {
      const result = JSON.parse(await deleteCityById(cityId));
      if (result?.error.message) {
        toast({
          title: "Error - Failed to delete city.",
          description: result.error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "City deleted successfully.",
        });
      }
    });
  };
  return (
    <form action={onSubmit}>
      <Button variant="destructive" disabled={isPending}>
        <TrashIcon />
        Delete
      </Button>
    </form>
  );
}
