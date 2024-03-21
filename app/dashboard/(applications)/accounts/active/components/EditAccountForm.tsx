import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountTableProps } from "@/utils/types";
import AccountInfo from "./AccountInfo";
import EditInfoForm from "./EditInfoForm";
import { readAllCountries } from "@/app/dashboard/(settings)/settings/countries/actions";
import { readAllStates } from "@/app/dashboard/(settings)/settings/states/actions";
import { readAllCities } from "@/app/dashboard/(settings)/settings/cities/actions";

export default async function EditAccountForm({
  triggerId,
  profile,
}: {
  triggerId: string;
  profile: AccountTableProps;
}) {
  const countries = await readAllCountries();
  const states = await readAllStates();
  const cities = await readAllCities();
  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 ">
        <Tabs defaultValue="info" className="space-y-4">
          <TabsList>
            <TabsTrigger value="info">Account Info</TabsTrigger>
            <TabsTrigger value="edit">Edit Account</TabsTrigger>
          </TabsList>
          <TabsContent value="info" className="space-y-4">
            <AccountInfo profile={profile} />
          </TabsContent>
          <TabsContent value="edit" className="space-y-4">
            <EditInfoForm
              triggerId={triggerId}
              profile={profile}
              countries={countries as any[]}
              cities={cities as any[]}
              states={states as any[]}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
