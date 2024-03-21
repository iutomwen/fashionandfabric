"use server";
import { createSupabaseAdmin } from "@/utils/supabase";
import { InsertTables } from "@/utils/types";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const readAllCountries = cache(async () => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("countries")
    .select("*, states(count), profiles(count), products(count)")
    .order("name", { ascending: true });
  if (error) {
    throw error;
  }
  return data;
});

export const deleteCountryById = async (id: number) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("countries")
    .delete()
    .eq("id", id);
  revalidatePath("/dashboard/settings/countries");
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
};

export const createCountry = async (countries: InsertTables<"countries">) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("countries")
    .insert(countries)
    .select();
  revalidatePath("/dashboard/settings/countries");
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
};

export const updateCountryById = async (
  id: number,
  countries: InsertTables<"countries">
) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("countries")
    .update(countries)
    .eq("id", id)
    .select();
  revalidatePath("/dashboard/settings/countries");
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
};
