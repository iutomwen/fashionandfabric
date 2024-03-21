"use client";
import { Button } from "@/components/ui/button";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import React, { useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { disableAccountById } from "../../actions";
import { Loader2 } from "lucide-react";
export default function DisableAccount({ profileId }: { profileId: string }) {
  const [isPending, startTransition] = useTransition();
  const onSubmit = () => {
    startTransition(async () => {
      const result = JSON.parse(await disableAccountById(profileId));
      if (result?.error?.message) {
        toast({
          title: "Error - Failed to disable account.",
          description: result?.error?.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Account disabled successfully.",
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
