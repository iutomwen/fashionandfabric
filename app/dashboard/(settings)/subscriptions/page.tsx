import React from "react";
import { readAllSubscriptions } from "./actions";
import { Button } from "@/components/ui/button";
import DailogForm from "../../components/DailogForm";
import { Tables } from "@/utils/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { currencyFormat } from "@/utils/helpers";
import CreateSubscriptionForm from "./components/CreateSubscriptionForm";
import DeleteSubscription from "./components/DeleteSubscription";
import EditSubscription from "./components/EditSubscription";
export default async function page() {
  const subcriptions = await readAllSubscriptions();
  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4  pt-6">
        <div className="md:flex flex items-start justify-between space-y-2 max-w-3xl">
          <div className="flex-col">
            <h2 className="text-3xl font-bold tracking-tight">Subcriptions</h2>
            <h4 className="text-lg  tracking-tight">
              For Starter plan, payment is made by Paystack on a monthly basis.
            </h4>
          </div>
          <DailogForm
            id={`create-new-subscription`}
            title="Create Subscription"
            Trigger={<Button variant="outline">Create+</Button>}
            form={
              <CreateSubscriptionForm triggerId={`create-new-subscription`} />
            }
            description="Create a new subscription. This will be used for payment."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
          {subcriptions.map(
            (
              subcription: Tables<"subcriptions"> & {
                meta_data: {
                  has_promotion: boolean;
                  allowed_promotions: number;
                };
              }
            ) => (
              <Card key={subcription.id} className=" col-span-1">
                <CardHeader>
                  <CardTitle>{subcription.name}</CardTitle>
                  <CardDescription>{subcription.description}</CardDescription>
                </CardHeader>
                <CardContent className=" space-y-3">
                  <div className="flex  space-x-3 items-center justify-between">
                    <div>
                      <Label>Duration</Label>
                      <p>{subcription.duration} days</p>
                    </div>
                    <div>
                      <Label>Price</Label>
                      <p>{currencyFormat(subcription.amount)}</p>
                    </div>
                    <div>
                      <Label>Allowed products</Label>
                      <p>{subcription.allowed_products}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">Options</h3>
                  <div className="flex flex-col items-start justify-between gap-3">
                    {subcription.meta_data?.has_promotion ? (
                      <Label className="text-green-400">Has promotion</Label>
                    ) : (
                      <Label className="text-red-400">No promotion</Label>
                    )}
                    <div className="flex space-x-3 items-center ">
                      <Label>Allowed promotions</Label>
                      <p className="text-sm">
                        {subcription.meta_data?.allowed_promotions}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <DeleteSubscription subscriptionId={subcription.id} />
                  <EditSubscription subscription={subcription} />
                </CardFooter>
              </Card>
            )
          )}
        </div>
        {subcriptions.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-32 space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              No subcriptions
            </h2>
            <p className="text-muted-foreground">
              No subcriptions has been created yet.
            </p>
            <DailogForm
              id={`create-new-subscription`}
              title="Create Subscription"
              Trigger={<Button variant="outline">Create+</Button>}
              form={
                <CreateSubscriptionForm triggerId={`create-new-subscription`} />
              }
              description="Create a new subscription. This will be used for payment."
            />
          </div>
        )}
      </div>
    </div>
  );
}
