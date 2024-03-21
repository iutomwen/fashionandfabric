"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { CityTableProps, StateTableProps, Tables } from "@/utils/types";

import { zodResolver } from "@hookform/resolvers/zod";
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { updateCityById } from "../actions";
const FormSchema = z.object({
  name: z.string().min(2, {
    message: "City name must be at least 2 characters.",
  }),
  state_id: z.string({
    required_error: "City is required.",
  }),
});
export default function EditForm({
  triggerId,
  city,
  States,
}: {
  triggerId: string;
  city: CityTableProps;
  States: StateTableProps[];
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: city?.name || "",
      state_id: city?.state_id?.toString() || "",
    },
  });

  const [isPending, startTransition] = useTransition();
  function onSubmit(values: z.infer<typeof FormSchema>) {
    const { name, state_id } = values;
    const data = {
      name,
      state_id: parseInt(state_id),
    };
    startTransition(async () => {
      const result = await updateCityById(city.id, data);
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
        title: "State Created",
        description: "State has been created successfully.",
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
              <FormLabel>City Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="City Name"
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
          name="state_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className=" overflow-scroll">
                  {States.map((state) => (
                    <SelectGroup key={state.id}>
                      <SelectItem value={state.id.toString()}>
                        {state.name}
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
