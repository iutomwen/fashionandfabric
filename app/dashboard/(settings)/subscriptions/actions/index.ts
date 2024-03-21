"use server";
import { createSupabaseAdmin } from "@/utils/supabase";
import { InsertTables } from "@/utils/types";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const readAllSubscriptions = cache(async () => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase.from("subcriptions").select("*");
  if (error) {
    throw error;
  }
  return data;
});

export const createSubscription = async (
  subscription: InsertTables<"subcriptions">
) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("subcriptions")
    .insert(subscription);
  revalidatePath("/dashboard/settings/subscriptions");
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
};

export const updateSubscriptionById = async (
  id: number,
  subscription: InsertTables<"subcriptions">
) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("subcriptions")
    .update(subscription)
    .eq("id", id)
    .select();
  revalidatePath("/dashboard/settings/subscriptions");
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
};

export const deleteSubscriptionById = async (id: number) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("subcriptions")
    .delete()
    .eq("id", id);
  revalidatePath("/dashboard/settings/subscriptions");
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
};
