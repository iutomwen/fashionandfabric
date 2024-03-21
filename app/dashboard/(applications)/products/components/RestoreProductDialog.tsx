"use client";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { restoreProductById } from "../actions";
export default function RestoreProductDialog({
  triggerId,
  productId,
  type,
}: {
  triggerId: string;
  productId: number;
  type?: string;
}) {
  const onCancel = () => {
    document.getElementById(triggerId)?.click();
  };
  const [isPending, startTransition] = useTransition();
  const onRestore = () => {
    startTransition(async () => {
      const result = JSON.parse(await restoreProductById(productId));
      if (result?.error?.message) {
        toast({
          title: `Error - Failed to ${type ? "accept" : "restore"} product.`,
          description: result?.error?.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: `Product ${
            type ? "accepted" : "restored"
          } successfully.`,
          variant: "success",
        });
      }
    });
  };
  return (
    <form action={onRestore}>
      <div className="p-4">
        <p>
          Are you sure you want to {type ? "accept" : "restore"} this product?
        </p>
      </div>
      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button
          variant="default"
          className="bg-green-600"
          type="submit"
          disabled={isPending}
        >
          {isPending
            ? `${type ? "Accepting" : "Restoring"} product...`
            : `Yes, ${type ? "Accept" : "Restore"} product`}
        </Button>
      </div>
    </form>
  );
}
