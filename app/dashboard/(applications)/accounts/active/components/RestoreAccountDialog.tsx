"use client";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { restoreAccountById } from "../../actions";
import { toast } from "@/components/ui/use-toast";

export default function RestoreAccountDialog({
  triggerId,
  profileId,
}: {
  triggerId: string;
  profileId: string;
}) {
  const onCancel = () => {
    document.getElementById(triggerId)?.click();
  };
  const [isPending, startTransition] = useTransition();
  const onRestore = () => {
    startTransition(async () => {
      const result = JSON.parse(await restoreAccountById(profileId));
      if (result?.error?.message) {
        toast({
          title: "Error - Failed to restore account.",
          description: result?.error?.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Account restored successfully.",
          variant: "success",
        });
      }
    });
  };
  return (
    <form action={onRestore}>
      <div className="p-4">
        <p>Are you sure you want to restore this account?</p>
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
          {isPending ? "Restoring..." : "Restore"}
        </Button>
      </div>
    </form>
  );
}
