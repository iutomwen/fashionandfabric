"use server";
import { createSupabaseAdmin } from "@/utils/supabase";
import { InsertTables } from "@/utils/types";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const readAllCities = cache(async () => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("cities")
    .select("*, state:states(*), profiles(count), products(count)")
    .order("state_id", { ascending: true })
    .order("name", { ascending: true });
  if (error) {
    throw error;
  }
  return data;
});

export const createCity = async (city: InsertTables<"cities">) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase.from("cities").insert(city);
  revalidatePath("/dashboard/settings/cities");
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
};

export const updateCityById = async (
  id: number,
  city: InsertTables<"cities">
) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("cities")
    .update(city)
    .eq("id", id)
    .select();
  revalidatePath("/dashboard/settings/cities");
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
};

export const deleteCityById = async (id: number) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase.from("cities").delete().eq("id", id);
  revalidatePath("/dashboard/settings/cities");
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
};
