import DailogForm from "@/app/dashboard/components/DailogForm";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import React from "react";
import EditForm from "./EditForm";

export default function EditCountry({ country }: { country: any }) {
  return (
    <DailogForm
      id={`update-trigger-${country.id}`}
      title="Edit Country"
      Trigger={
        <Button variant="outline">
          <Pencil1Icon />
          Edit
        </Button>
      }
      form={
        <EditForm
          triggerId={`update-trigger-${country.id}`}
          country={country}
        />
      }
      description="Edit a country. This will be used to group products."
    />
  );
}
