import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { readCategories } from "./categories/actions";
import { readSubCategories } from "./subcategories/actions";
import { readAllStates } from "./states/actions";
import { readAllCities } from "./cities/actions";
export default async function page() {
  const categories = await readCategories();
  const subcategories = await readSubCategories();
  const states = await readAllStates();
  const cities = await readAllCities();
  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Global Settings</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories?.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Subcategory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subcategories?.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total States
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{states?.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Cities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cities.length}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
