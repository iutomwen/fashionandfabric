"use server";
import { createSupabaseAdmin } from "@/utils/supabase";
import { InsertTables } from "@/utils/types";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const readAllProducts = cache(async () => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("products")
    .select(
      "*, category:category_id(*), sub_category:sub_category_id(*), store:store_id(*),city:city_id(*), country:country_id(*), state:state_id(*), productImages:product_images(*), productLikes:product_likes(count), productViews:product_views(count)"
    )
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
});

export const disableProductById = async (productId: number) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("products")
    .update({ status: "expired" })
    .eq("id", productId);
  if (error) {
    throw error;
  }
  revalidatePath("/dashboard/(applications)/products");
  return JSON.stringify(data);
};

export const softDeleteProductById = async (productId: number) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("products")
    .update({ status: "deleted", is_deleted: true })
    .eq("id", productId);
  if (error) {
    throw error;
  }
  revalidatePath("/dashboard/(applications)/products");
  return JSON.stringify(data);
};

export const restoreProductById = async (productId: number) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("products")
    .update({ status: "active", is_deleted: false })
    .eq("id", productId);
  if (error) {
    throw error;
  }
  revalidatePath("/dashboard/(applications)/products");
  return JSON.stringify(data);
};

export const deleteProductById = async (productId: number) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);
  if (error) {
    throw error;
  }
  revalidatePath("/dashboard/(applications)/products");
  return JSON.stringify(data);
};

export const updateProductById = async (
  productId: number,
  data: InsertTables<"products">
) => {
  const supabase = await createSupabaseAdmin();
  const { error } = await supabase
    .from("products")
    .update(data)
    .eq("id", productId);
  if (error) {
    throw error;
  }
  revalidatePath("/dashboard/(applications)/products");
  return JSON.stringify(data);
};
