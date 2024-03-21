"use client";
import React from "react";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { CountryTableProps, Tables } from "@/utils/types";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { createState, updateStateById } from "../actions";
import { stat } from "fs";
const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Country name must be at least 2 characters.",
  }),
  country_id: z.string({
    required_error: "Country is required.",
  }),
});
export default function EditForm({
  triggerId,
  state,
  countries,
}: {
  triggerId: string;
  state: Tables<"states">;
  countries: CountryTableProps[];
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: state.name,
      country_id: state.country_id.toString(),
    },
  });

  const [isPending, startTransition] = useTransition();
  function onSubmit(values: z.infer<typeof FormSchema>) {
    const { name, country_id } = values;
    const data = {
      name,
      country_id: parseInt(country_id),
    };
    startTransition(async () => {
      const result = await updateStateById(state.id, data);
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
        title: "State Updated",
        description: "State has been updated successfully.",
      });
    });

    document.getElementById(triggerId)?.click();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="State Name"
                  type="text"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className=" overflow-scroll">
                  {countries.map((country) => (
                    <SelectGroup>
                      <SelectItem
                        key={country.name}
                        value={country.id.toString()}
                      >
                        {country.flag} {country.name}
                      </SelectItem>
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full flex gap-2 items-center"
          variant="outline"
        >
          Save Changes
          <AiOutlineLoading3Quarters
            className={cn("animate-spin", { hidden: !isPending })}
          />
        </Button>
      </form>
    </Form>
  );
}
