"use server";
import { createSupabaseAdmin } from "@/utils/supabase";
import { InsertTables } from "@/utils/types";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const readCategories = cache(async () => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("categories")
    .select("*, products(count)")
    .order("name", { ascending: true });
  if (error) {
    throw error;
  }
  return data;
});

export const readCategoryById = cache(async (id: number) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  return data;
});

export async function updateCategoryById(
  id: number,
  category: InsertTables<"categories">
) {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("categories")
    .update(category)
    .eq("id", id)
    .select();
  revalidatePath("/dashboard/settings/categories");
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
}

export async function deleteCategoryById(id: number) {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);
  revalidatePath("/dashboard/settings/categories");
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
}

export async function createCategory(category: InsertTables<"categories">) {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase.from("categories").insert(category);
  revalidatePath("/dashboard/settings/categories");
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
}
