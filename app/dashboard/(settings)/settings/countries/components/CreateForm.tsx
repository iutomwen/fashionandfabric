"use client";
import { Input } from "@/components/ui/input";

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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { createCountry } from "../actions";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Country name must be at least 2 characters.",
  }),
  flag: z.string({
    required_error: "Flag is required.",
  }),
  currency: z.string({
    required_error: "Currency is required.",
  }),
});
export default function CreateForm({ triggerId }: { triggerId: string }) {
  const worldCurrency = [
    {
      name: "Naira",
      value: "₦",
    },
    {
      name: "US Dollar",
      value: "$",
    },
    {
      name: "Pound Sterling",
      value: "£",
    },
    {
      name: "Euro",
      value: "€",
    },
  ];

  const worldFlags = [
    {
      name: "Nigeria",
      value: "🇳🇬",
    },
    {
      name: "United States",
      value: "🇺🇸",
    },
    {
      name: "United Kingdom",
      value: "🇬🇧",
    },
    {
      name: "European Union",
      value: "🇪🇺",
    },
  ];
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      flag: "",
      currency: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  function onSubmit(values: z.infer<typeof FormSchema>) {
    const { name, flag, currency } = values;
    const data = {
      name,
      flag,
      currency,
    };
    startTransition(async () => {
      const result = await createCountry(data);
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
        title: "Country Created",
        description: "Country has been created successfully.",
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
              <FormLabel>Country Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Country Name"
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
          name="flag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flag Icon *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an flag" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className=" overflow-scroll">
                  {worldFlags.map((icon) => (
                    <SelectGroup key={icon.name}>
                      <SelectLabel> {icon.name}</SelectLabel>
                      <SelectItem value={icon.value}>
                        {icon.value} {icon.name}
                      </SelectItem>
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {worldCurrency.map((status, index) => {
                    return (
                      <SelectItem value={status.value} key={index}>
                        {status.name}
                      </SelectItem>
                    );
                  })}
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
          Create New
          <AiOutlineLoading3Quarters
            className={cn("animate-spin", { hidden: !isPending })}
          />
        </Button>
      </form>
    </Form>
  );
}
