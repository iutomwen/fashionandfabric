"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Trash2Icon } from "lucide-react";
import React, { useTransition } from "react";
import { deleteProductById } from "../actions";

export default function RemoveProduct({ productId }: { productId: number }) {
  const [isPending, startTransition] = useTransition();
  const onSubmit = () => {
    const deleted = confirm(
      "Are you sure you want to permanently delete this product?\n This action cannot be undone. Click OK to proceed or Cancel to abort"
    );
    if (deleted) {
      startTransition(async () => {
        const result = JSON.parse(await deleteProductById(productId));
        if (result?.error?.message) {
          toast({
            title: "Error - Failed to remove product.",
            description: result?.error?.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: "Product removed successfully.",
            variant: "success",
          });
        }
      });
    } else {
      toast({
        title: "Error - Failed to remove product.",
        description: "Product not removed.",
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
          <Trash2Icon size={16} />
        )}
        Delete
      </Button>
    </form>
  );
}
