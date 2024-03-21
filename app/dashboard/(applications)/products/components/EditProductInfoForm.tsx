"use client";
import {
  CategoryTableProps,
  ProductTableProps,
  SubCategoryTableProps,
  UpdateTables,
} from "@/utils/types";
import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import validator from "validator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { updateProductById } from "../actions";
const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  deliveryType: z
    .string({
      required_error: "Delivery type is required.",
    })
    .optional()
    .or(z.literal("")),
  price: z
    .string({
      required_error: "Price is required.",
    })
    .optional()
    .or(z.literal("")),
  priceBargain: z
    .string({
      required_error: "Price bargain is required.",
    })
    .optional()
    .or(z.literal("")),
  description: z
    .string({
      required_error: "Description is required.",
    })
    .optional()
    .or(z.literal("")),
  category: z
    .string({
      required_error: "Category is required.",
    })
    .optional()
    .or(z.literal("")),
  subCategory: z
    .string({
      required_error: "Subcategory is required.",
    })
    .optional()
    .or(z.literal("")),
});
export default function EditProductInfoForm({
  triggerId,
  product,
  categories,
  subCategories,
}: {
  triggerId: string;
  product: ProductTableProps;
  categories: CategoryTableProps[];
  subCategories: SubCategoryTableProps[];
}) {
  const [isPending, startTransition] = useTransition();
  const [category, setCategory] = React.useState<CategoryTableProps[]>([]);
  const [subCategory, setSubCategory] = React.useState<SubCategoryTableProps[]>(
    []
  );

  React.useEffect(() => {
    setCategory(categories);
  }, [categories]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: product?.name ?? "",
      deliveryType: product.delivery_type ?? "",
      price: product.price?.toString() ?? "",
      priceBargain: product.price_bargain?.toString() ?? "",
      description: product.description ?? "",
      category: product.category.id.toString(),
      subCategory: product.sub_category.id.toString(),
    },
    mode: "onBlur",
  });

  React.useEffect(() => {
    if (form.getValues("category")) {
      setSubCategory(
        subCategories?.filter(
          (sub) =>
            sub.category_id === parseInt(form.getValues("category") ?? "")
        )
      );
    }
  }, [form.getValues("category")]);

  function onSubmit(values: z.infer<typeof FormSchema>) {
    const {
      name,
      price,
      priceBargain,
      deliveryType,
      description,
      category,
      subCategory,
    } = values;
    const updateData: UpdateTables<"products"> = {
      name,
      price: parseInt(price as string),
      price_bargain: priceBargain === "true",
      delivery_type: deliveryType as string,
      description,
      category_id: parseInt(category as string),
      sub_category_id: parseInt(subCategory as string),
    };
    startTransition(async () => {
      const result = await updateProductById(product.id, updateData);
      const { error, data: updatedData } = JSON?.parse(result);
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Product Updated",
        description: `${updateData.name} has been updated.`,
      });
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(values, null, 2)}
            </code>
          </pre>
        ),
      });
      document.getElementById(triggerId)?.click();
    });
  }
  const bargain = [
    { label: "Negotiable", value: true },
    { label: "Non-Negotiable", value: false },
  ];
  const delivery = [
    { label: "Pickup", value: "pickup" },
    { label: "Delivery", value: "delivery" },
    { label: "Both", value: "both" },
  ];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Product Name"
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
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product price *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Product price"
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
            name="priceBargain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price bargain *</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className=" overflow-scroll">
                      {bargain.map((el) => (
                        <SelectItem key={el.label} value={el.value.toString()}>
                          {el.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deliveryType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Type *</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className=" overflow-scroll">
                      {delivery.map((el) => (
                        <SelectItem key={el.label} value={el.value.toString()}>
                          {el.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an icon" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className=" overflow-scroll">
                    {category.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategory</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subCategory.map((sub) => {
                      return (
                        <SelectItem value={sub.id.toString()} key={sub.id}>
                          {sub.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Product description"
                  {...field}
                  draggable
                  onChange={field.onChange}
                  className="h-48 resize"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full flex gap-2 items-center bg-black text-white dark:bg-white dark:text-black"
          variant="outline"
        >
          Update Info
          <AiOutlineLoading3Quarters
            className={cn("animate-spin", { hidden: !isPending })}
          />
        </Button>
      </form>
    </Form>
  );
}
