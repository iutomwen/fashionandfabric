"use client";
import React, { useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { InsertTables } from "@/utils/types";
import { createSubscription } from "../actions";
import { toast } from "@/components/ui/use-toast";
export const SubcriptionFormSchema = z.object({
  name: z.string().min(2, {
    message: "Plan name must be at least 2 characters.",
  }),
  price: z.string({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number",
  }),
  duration: z.string().min(1, {
    message: "Duration must be at least 1.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  allowed_products: z.string().min(1, {
    message: "Allowed products must be at least 1.",
  }),

  metadata: z.object({
    has_promotion: z.boolean().optional().default(false),
    allowed_promotions: z.string().optional(),
  }),
});
export default function CreateSubscriptionForm({
  triggerId,
}: {
  triggerId: string;
}) {
  const form = useForm<z.infer<typeof SubcriptionFormSchema>>({
    resolver: zodResolver(SubcriptionFormSchema),
  });
  const [isPending, startTransition] = useTransition();
  async function onSubmit(data: z.infer<typeof SubcriptionFormSchema>) {
    const { name, price, duration, description, allowed_products, metadata } =
      data;
    const { has_promotion, allowed_promotions } = metadata;
    const subscriptionData: InsertTables<"subcriptions"> = {
      name,
      amount: Number(price),
      duration: Number(duration),
      description,
      allowed_products: Number(allowed_products),
      meta_data: {
        has_promotion,
        allowed_promotions: Number(allowed_promotions),
      },
    };

    startTransition(async () => {
      const result = await createSubscription(subscriptionData);
      const { error, data: updatedData } = JSON.parse(result);
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Subscription Created",
        description: "Subscription has been created successfully.",
      });
    });

    document.getElementById(triggerId)?.click();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <div className="grid gap-4 py-4 grid-cols-2">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcription name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Subcription name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be the public name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcription price *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Subcription price"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormDescription>This will be the price.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcription duration *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Subcription duration(in days)"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormDescription>
                    This will be the public name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcription description *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Subcription description"
                      {...field}
                      multiple
                    />
                  </FormControl>
                  <FormDescription>
                    This explains what the subcription is for.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <FormField
              control={form.control}
              name="allowed_products"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allowed Products *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Allowed Products"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormDescription>
                    This is the number of product a subcriber can post.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="metadata.has_promotion"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Subcription has promotion
                </FormLabel>
                <FormDescription>
                  This will allow product to be top of the list
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <FormField
            control={form.control}
            name="metadata.allowed_promotions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allowed promotion </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Allowed promotion"
                    {...field}
                    type="number"
                  />
                </FormControl>
                <FormDescription>
                  This is the number of allowed promotion product a subcriber.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full flex gap-2 items-center"
          variant="outline"
        >
          Create Subscription
          <AiOutlineLoading3Quarters
            className={cn("animate-spin", { hidden: !isPending })}
          />
        </Button>
      </form>
    </Form>
  );
}
