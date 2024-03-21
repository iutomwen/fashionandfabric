import DailogForm from "@/app/dashboard/components/DailogForm";
import { Button } from "@/components/ui/button";
import { Tables } from "@/utils/types";
import { Pencil1Icon } from "@radix-ui/react-icons";
import React from "react";
import EditSubscriptionForm from "./EditSubscriptionForm";

export default function EditSubscription({
  subscription,
}: {
  subscription: Tables<"subcriptions">;
}) {
  return (
    <DailogForm
      id={`update-trigger-${subscription.id}`}
      title="Edit Subscription"
      Trigger={
        <Button variant="outline">
          <Pencil1Icon />
          Edit
        </Button>
      }
      form={
        <EditSubscriptionForm
          triggerId={`update-trigger-${subscription.id}`}
          subscription={subscription as any}
        />
      }
      description="Edit subscription details. This will be used for payment."
    />
  );
}
