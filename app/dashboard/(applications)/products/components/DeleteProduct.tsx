"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader2, TrashIcon } from "lucide-react";
import React, { useTransition } from "react";
import { softDeleteProductById } from "../actions";

export default function DeleteProduct({ productId }: { productId: number }) {
  const [isPending, startTransition] = useTransition();
  const onSubmit = () => {
    const deleted = confirm(
      "Are you sure you want to archive this product?\n This action is irreversible and will remove the product from the active list. \nYou can still view the product in the archive list. Click OK to proceed or Cancel to abort"
    );
    if (deleted) {
      startTransition(async () => {
        const result = JSON.parse(await softDeleteProductById(productId));
        if (result?.error?.message) {
          toast({
            title: "Error - Failed to archive product.",
            description: result?.error?.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: "Product archive successfully.",
            variant: "success",
          });
        }
      });
    } else {
      toast({
        title: "Error - Failed to archive product.",
        description: "Product not archived.",
        variant: "warning",
      });
    }
  };
  return (
    <form action={onSubmit}>
      <Button
        variant="outline"
        className="gap-1 bg-red-700"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <TrashIcon size={16} />
        )}
        Delete
      </Button>
    </form>
  );
}
