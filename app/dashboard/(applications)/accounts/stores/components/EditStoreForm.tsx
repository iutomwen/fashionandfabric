import React from "react";
import { StoreTableProps } from "@/utils/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { readAllCountries } from "@/app/dashboard/(settings)/settings/countries/actions";
import { readAllStates } from "@/app/dashboard/(settings)/settings/states/actions";
import { readAllCities } from "@/app/dashboard/(settings)/settings/cities/actions";
import StoreInfo from "./StoreInfo";
import EditStoreInfoForm from "./EditStoreInfoForm";
export default async function EditStoreForm({
  store,
  triggerId,
}: {
  store: StoreTableProps;
  triggerId: string;
}) {
  const countries = await readAllCountries();
  const states = await readAllStates();
  const cities = await readAllCities();
  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 ">
        <Tabs defaultValue="info" className="space-y-4">
          <TabsList>
            <TabsTrigger value="info">Store Info</TabsTrigger>
            <TabsTrigger value="edit">Edit Store</TabsTrigger>
          </TabsList>
          <TabsContent value="info" className="space-y-4">
            <StoreInfo store={store} />
          </TabsContent>
          <TabsContent value="edit" className="space-y-4">
            <EditStoreInfoForm
              triggerId={triggerId}
              store={store}
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
