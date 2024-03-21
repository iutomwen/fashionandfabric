"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import React, { useTransition } from "react";
import { disableProductById } from "../actions";

export default function DisableProduct({ productId }: { productId: number }) {
  const [isPending, startTransition] = useTransition();
  const onSubmit = () => {
    startTransition(async () => {
      const result = JSON.parse(await disableProductById(productId));
      if (result?.error?.message) {
        toast({
          title: "Error - Failed to disable product.",
          description: result?.error?.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Product disabled successfully.",
        });
      }
    });
  };
  return (
    <form action={onSubmit}>
      <Button
        variant="outline"
        className="gap-1 bg-yellow-700"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <CircleBackslashIcon />
        )}
        Disable
      </Button>
    </form>
  );
}
