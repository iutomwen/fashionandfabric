import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalAccounts from "./components/PersonalAccounts";
import BusinessAccounts from "./components/BusinessAccounts";
import { readAllActiveAccounts } from "../actions";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Active Accounts",
  description: "View all active accounts in the system",
};
export default async function page() {
  const accounts = await readAllActiveAccounts();
  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4  pt-6">
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList>
            <TabsTrigger value="personal">Personal Accounts</TabsTrigger>
            <TabsTrigger value="business">Business Accounts</TabsTrigger>
          </TabsList>
          <TabsContent value="personal" className="space-y-4">
            <PersonalAccounts
              data={accounts?.filter((ac) => ac.role === "personal") as any[]}
            />
          </TabsContent>
          <TabsContent value="business" className="space-y-4">
            <BusinessAccounts
              data={accounts?.filter((ac) => ac.role === "business") as any[]}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
