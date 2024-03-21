"use server";
import { createSupabaseAdmin } from "@/utils/supabase";
import { InsertTables } from "@/utils/types";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const readSubCategories = cache(async () => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("sub_categories")
    .select("*, category:category_id(*), products(count)")
    .order("name", { ascending: true });
  if (error) {
    throw error;
  }
  return data;
});

export async function createSubCategory(
  sub_categories: InsertTables<"sub_categories">
) {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("sub_categories")
    .insert(sub_categories)
    .select();
  revalidatePath("/dashboard/settings/subcategories");
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
}

export const deleteSubCategoryById = async (id: number) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("sub_categories")
    .delete()
    .eq("id", id);
  revalidatePath("/dashboard/settings/subcategories");
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
};

export const updateSubCategoryById = async (
  id: number,
  sub_categories: InsertTables<"sub_categories">
) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("sub_categories")
    .update(sub_categories)
    .eq("id", id)
    .select();
  revalidatePath("/dashboard/settings/subcategories");
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
};
