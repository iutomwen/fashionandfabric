import DailogForm from "@/app/dashboard/components/DailogForm";
import { Button } from "@/components/ui/button";
import { StoreTableProps } from "@/utils/types";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import React from "react";
import EditStoreForm from "./EditStoreForm";

export default function EditStore({ store }: { store: StoreTableProps }) {
  return (
    <DailogForm
      id={`update-trigger-${store.id}`}
      title="Store Details"
      Trigger={
        <Button variant="outline" className="bg-green-600 gap-1">
          <EyeOpenIcon />
          View
        </Button>
      }
      form={
        <EditStoreForm store={store} triggerId={`update-trigger-${store.id}`} />
      }
      description="View and edit store details."
    />
  );
}
