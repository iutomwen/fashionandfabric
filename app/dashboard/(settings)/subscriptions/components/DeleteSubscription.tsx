"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { TrashIcon } from "@radix-ui/react-icons";
import { deleteSubscriptionById } from "../actions";

export default function DeleteSubscription({
  subscriptionId,
}: {
  subscriptionId: number;
}) {
  const [isPending, startTransition] = useTransition();
  const onSubmit = () => {
    startTransition(async () => {
      const result = JSON.parse(await deleteSubscriptionById(subscriptionId));
      if (result?.error.message) {
        toast({
          title: "Error - Failed to delete subscription.",
          description: result.error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Subscription deleted successfully.",
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
