import React from "react";
import { AccountTableProps } from "@/utils/types";
import DailogForm from "@/app/dashboard/components/DailogForm";
import { Button } from "@/components/ui/button";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import EditAccountForm from "./EditAccountForm";

export default function EditAccount({
  profile,
}: {
  profile: AccountTableProps;
}) {
  return (
    <DailogForm
      id={`update-trigger-${profile.id}`}
      title="Account Details"
      Trigger={
        <Button variant="outline" className="bg-green-600 gap-1">
          <EyeOpenIcon />
          View
        </Button>
      }
      form={
        <EditAccountForm
          profile={profile}
          triggerId={`update-trigger-${profile.id}`}
        />
      }
      description="View and edit account details."
    />
  );
}
