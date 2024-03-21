import {
  CategoryTableProps,
  ProductTableProps,
  SubCategoryTableProps,
} from "@/utils/types";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { readCategories } from "@/app/dashboard/(settings)/settings/categories/actions";
import { readSubCategories } from "@/app/dashboard/(settings)/settings/subcategories/actions";
import ProductInfo from "./ProductInfo";
import EditProductInfoForm from "./EditProductInfoForm";
export default async function EditProductForm({
  product,
  triggerId,
  type,
}: {
  product: ProductTableProps;
  triggerId: string;
  type?: string;
}) {
  const categories = await readCategories();
  const subCategories = await readSubCategories();
  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 ">
        <Tabs defaultValue="info" className="space-y-4">
          <TabsList>
            <TabsTrigger value="info">Product Info</TabsTrigger>
            <TabsTrigger disabled={!!type} value="edit">
              Edit Product
            </TabsTrigger>
          </TabsList>
          <TabsContent value="info" className="space-y-4">
            <ProductInfo product={product} type={type} />
          </TabsContent>
          <TabsContent value="edit" className="space-y-4">
            <EditProductInfoForm
              triggerId={triggerId}
              product={product}
              categories={categories as unknown as CategoryTableProps[]}
              subCategories={
                subCategories as unknown as SubCategoryTableProps[]
              }
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
