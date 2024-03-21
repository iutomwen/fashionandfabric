import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DeletedProducts from "./components/DeletedProducts";
import PendingProducts from "./components/PendingProducts";
import ActiveProducts from "./components/ActiveProducts";
import ExpiredProducts from "./components/ExpiredProducts";
import { readAllProducts } from "./actions";
import { ProductTableProps } from "@/utils/types";
export default async function page() {
  const products = await readAllProducts();
  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Product Summary</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{122}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{1122}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{322}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Expired Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{342}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-col md:flex">
          <div className="flex-1 space-y-4  pt-6">
            <Tabs defaultValue="pending" className="space-y-4">
              <TabsList>
                <TabsTrigger value="active">All Active Products</TabsTrigger>
                <TabsTrigger value="pending">Pending Products</TabsTrigger>
                <TabsTrigger value="deleted">Deleted Products</TabsTrigger>
                <TabsTrigger value="expired">Expired Products</TabsTrigger>
              </TabsList>
              <TabsContent value="active" className="space-y-4">
                <ActiveProducts
                  data={
                    products.filter(
                      (product) => product.status === "active"
                    ) as unknown as ProductTableProps[] as unknown as ProductTableProps[]
                  }
                />
              </TabsContent>
              <TabsContent value="pending" className="space-y-4">
                <PendingProducts
                  data={
                    products.filter(
                      (product) => product.status === "pending"
                    ) as unknown as ProductTableProps[]
                  }
                />
              </TabsContent>
              <TabsContent value="deleted" className="space-y-4">
                <DeletedProducts
                  data={
                    products.filter(
                      (product) =>
                        product.status === "deleted" &&
                        product.is_deleted === true
                    ) as unknown as ProductTableProps[]
                  }
                />
              </TabsContent>
              <TabsContent value="expired" className="space-y-4">
                <ExpiredProducts
                  data={
                    products.filter(
                      (product) => product.status === "expired"
                    ) as unknown as ProductTableProps[]
                  }
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
