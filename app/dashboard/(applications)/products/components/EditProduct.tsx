import React from "react";
import { AccountTableProps, ProductTableProps } from "@/utils/types";
import DailogForm from "@/app/dashboard/components/DailogForm";
import { Button } from "@/components/ui/button";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import EditProductForm from "./EditProductForm";
export default function EditProduct({
  product,
  type,
}: {
  product: ProductTableProps;
  type?: string;
}) {
  return (
    <DailogForm
      id={`update-trigger-${product.id}`}
      title="Product Details"
      Trigger={
        <Button variant="outline" className="bg-green-600 gap-1">
          <EyeOpenIcon />
          View
        </Button>
      }
      form={
        <EditProductForm
          product={product}
          triggerId={`update-trigger-${product.id}`}
          type={type}
        />
      }
      description={`View ${type ? "" : "and edit"} ${product.name} details.`}
    />
  );
}
