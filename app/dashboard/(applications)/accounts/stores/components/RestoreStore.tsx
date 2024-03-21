import DailogForm from "@/app/dashboard/components/DailogForm";
import { Button } from "@/components/ui/button";
import { UpdateIcon } from "@radix-ui/react-icons";
import React from "react";
import RestoreStoreDialog from "./RestoreStoreDialog";

export default function RestoreStore({ storeId }: { storeId: number }) {
  return (
    <DailogForm
      id={`update-trigger-${storeId}`}
      title="Restore this Account"
      Trigger={
        <Button variant="outline" className="bg-yellow-600">
          <UpdateIcon />
          Restore account
        </Button>
      }
      form={
        <RestoreStoreDialog
          storeId={storeId}
          triggerId={`update-trigger-${storeId}`}
        />
      }
      description=""
    />
  );
}
