"use server";
import { createSupabaseAdmin } from "@/utils/supabase";
import { UpdateTables } from "@/utils/types";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const readAllStores = cache(async () => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("stores")
    .select(
      "*, owner:profile_id(*), city:city_id(*), state:state_id(*), country:country_id(*), subscriptionHistory:subscription_history!subscription_history_store_id_fkey(*), products:products(count)"
    )
    .order("name", { ascending: true });
  if (error) {
    throw error;
  }
  return data;
});

export const disableStoreById = async (storeId: number) => {
  const supabase = await createSupabaseAdmin();
  const { error, data } = await supabase
    .from("stores")
    .update({ status: false })
    .eq("id", storeId)
    .select();
  if (error) {
    throw error;
  }
  revalidatePath("/dashboard/accounts/stores");
  return JSON.stringify(data);
};

export const restoreStoreById = async (storeId: number) => {
  const supabase = await createSupabaseAdmin();
  const { error, data } = await supabase
    .from("stores")
    .update({ status: true })
    .eq("id", storeId)
    .select();
  if (error) {
    throw error;
  }
  revalidatePath("/dashboard/accounts/stores");
  return JSON.stringify(data);
};

export const updateStoreById = async (
  storeId: number,
  store: UpdateTables<"stores">
) => {
  const supabase = await createSupabaseAdmin();
  const { error, data } = await supabase
    .from("stores")
    .update(store)
    .eq("id", storeId)
    .select();
  if (error) {
    throw error;
  }
  revalidatePath("/dashboard/accounts/stores");
  return JSON.stringify(data);
};
