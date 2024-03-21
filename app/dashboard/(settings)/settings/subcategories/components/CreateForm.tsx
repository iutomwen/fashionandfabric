"use client";
import React from "react";
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
import { iconList } from "@/utils/helpers";
import RenderIconImage from "@/components/RenderIconImage";
import { useTransition } from "react";
import { CategoryTableProps } from "@/utils/types";
import { createSubCategory } from "../actions";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Catgory name must be at least 2 characters.",
  }),
  icon: z.string({
    required_error: "Category icon is required.",
  }),
  category_id: z.string({
    invalid_type_error: "Please select a category.",
    required_error: "Category is required.",
  }),
});
export default function CreateForm({
  triggerId,
  data: categories,
}: {
  triggerId: string;
  data: CategoryTableProps[];
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      icon: "",
      category_id: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  function onSubmit(values: z.infer<typeof FormSchema>) {
    const { name, icon, category_id } = values;
    const data = {
      name,
      icon,
      category_id,
    };
    startTransition(async () => {
      const result = await createSubCategory(data as any);
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
        title: "Category Created",
        description: "Category has been created successfully.",
      });
      document.getElementById(triggerId)?.click();
    });
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
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Sub-category name" {...field} />
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
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This will be attached to the category.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a icon" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {iconList.map((icon) => (
                        <SelectItem key={icon.name} value={icon.icon}>
                          <div className=" inline-flex items-center justify-start gap-5">
                            {RenderIconImage(icon?.icon, icon.name)}
                            {icon.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This will be attached to the category.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full flex gap-2 items-center"
          variant="outline"
        >
          Submit{" "}
          <AiOutlineLoading3Quarters
            className={cn("animate-spin", { hidden: !isPending })}
          />
        </Button>
      </form>
    </Form>
  );
}
