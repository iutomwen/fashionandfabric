import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActiveStores from "./components/ActiveStores";
import InactiveStores from "./components/InactiveStores";
import { readAllStores } from "./actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Stores",
  description: "View all business stores in the system",
};
export default async function page() {
  const stores = await readAllStores();
  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4  pt-6">
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Stores</TabsTrigger>
            <TabsTrigger value="inactive">Inactive Stores</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4">
            <ActiveStores
              data={stores.filter((store) => store.status === true) as any[]}
            />
          </TabsContent>
          <TabsContent value="inactive" className="space-y-4">
            <InactiveStores
              data={stores.filter((store) => store.status === false) as any[]}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
