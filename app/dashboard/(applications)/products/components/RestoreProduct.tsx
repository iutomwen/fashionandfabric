import DailogForm from "@/app/dashboard/components/DailogForm";
import { Button } from "@/components/ui/button";
import { CheckIcon, UpdateIcon } from "@radix-ui/react-icons";
import React from "react";
import RestoreProductDialog from "./RestoreProductDialog";

export default function RestoreProduct({
  productId,
  type,
  layout,
}: {
  productId: number;
  type?: string;
  layout?: string;
}) {
  return (
    <DailogForm
      id={`${type && layout ? "pending-lay" : "restore"}-trigger-${productId}`}
      title={`${type ? "Accept this product" : "Restore this Product"}`}
      Trigger={
        <Button
          variant="outline"
          className={`${type ? "bg-green-700" : "bg-yellow-600 gap-1"}`}
        >
          {type ? <CheckIcon /> : <UpdateIcon />}
          {type ? "Accept" : "Restore"}
        </Button>
      }
      form={
        <RestoreProductDialog
          productId={productId}
          triggerId={`${
            type && layout ? "pending-lay" : "restore"
          }-trigger-${productId}`}
          type={type}
        />
      }
      description=""
    />
  );
}
