"use client";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { deleteAccountById } from "../../actions";
import { Loader2, TrashIcon } from "lucide-react";
export default function DeleteAccount({ profileId }: { profileId: string }) {
  const [isPending, startTransition] = useTransition();
  const onSubmit = () => {
    const deleted = confirm(
      "Are you sure you want to delete this account?\nThis action cannot be undone."
    );
    if (deleted) {
      startTransition(async () => {
        const result = JSON.parse(await deleteAccountById(profileId));
        if (result?.error?.message) {
          toast({
            title: "Error - Failed to delete account.",
            description: result?.error?.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: "Account removed successfully.",
            variant: "success",
          });
        }
      });
    } else {
      toast({
        title: "Error - Failed to delete account.",
        description: "Account not deleted.",
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
        Delete Forever
      </Button>
    </form>
  );
}
