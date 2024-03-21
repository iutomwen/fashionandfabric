import DailogForm from "@/app/dashboard/components/DailogForm";
import { Button } from "@/components/ui/button";
import { UpdateIcon } from "@radix-ui/react-icons";
import React from "react";
import RestoreAccountDialog from "./RestoreAccountDialog";

export default function RestoreAccount({ profileId }: { profileId: string }) {
  return (
    <DailogForm
      id={`update-trigger-${profileId}`}
      title="Restore this Account"
      Trigger={
        <Button variant="outline" className="bg-yellow-600">
          <UpdateIcon />
          Restore account
        </Button>
      }
      form={
        <RestoreAccountDialog
          profileId={profileId}
          triggerId={`update-trigger-${profileId}`}
        />
      }
      description=""
    />
  );
}
