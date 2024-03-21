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
import { iconList } from "@/utils/helpers";
import RenderIconImage from "@/components/RenderIconImage";
import { useTransition } from "react";
import { createCategory } from "../actions";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Catgory name must be at least 2 characters.",
  }),
  icon: z.string({
    required_error: "Category icon is required.",
  }),
  has_options: z.string(),
});

export default function CreateForm({ triggerId }: { triggerId: string }) {
  const status = [
    {
      name: "True",
      value: "1",
    },
    {
      name: "False",
      value: "0",
    },
  ];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      icon: "",
      has_options: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  function onSubmit(values: z.infer<typeof FormSchema>) {
    const { name, icon, has_options } = values;
    const data = {
      name,
      icon,
      has_options: has_options === "1" ? true : false,
    };
    startTransition(async () => {
      const result = await createCategory(data);
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
              <FormLabel>Category Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Category Name"
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
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className=" overflow-scroll">
                  {iconList.map((icon) => (
                    <SelectGroup key={icon.name}>
                      <SelectLabel> {icon.name}</SelectLabel>
                      <SelectItem key={icon.name} value={icon.icon}>
                        <div className="flex items-center gap-5 overflow-scroll overflow-y-scroll">
                          {RenderIconImage(icon?.icon, icon.name)}
                          {icon.name}
                        </div>
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
          name="has_options"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Has Options</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {status.map((status, index) => {
                    return (
                      <SelectItem value={status.value} key={index}>
                        {status.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormDescription>Has more than one option</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
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
