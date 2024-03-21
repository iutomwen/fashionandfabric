"use server";
import { createSupabaseAdmin } from "@/utils/supabase";
import { InsertTables } from "@/utils/types";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const readAllStates = cache(async () => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("states")
    .select("*, country:countries(*), profiles(count), products(count)")
    .order("name", { ascending: true });
  if (error) {
    throw error;
  }
  return data;
});

export const deleteStateById = async (id: number) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase.from("states").delete().eq("id", id);
  revalidatePath("/dashboard/settings/states");
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
};

export const createState = async (states: InsertTables<"states">) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase.from("states").insert(states).select();
  revalidatePath("/dashboard/settings/states");
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
};

export const updateStateById = async (
  id: number,
  states: InsertTables<"states">
) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("states")
    .update(states)
    .eq("id", id)
    .select();
  revalidatePath("/dashboard/settings/states");
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
};
