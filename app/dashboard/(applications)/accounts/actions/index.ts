"use server";
import { createSupabaseAdmin } from "@/utils/supabase";
import { InsertTables } from "@/utils/types";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const readAllActiveAccounts = cache(async () => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("profiles")
    .select("*, city:city_id(*), country:country_id(*), state:state_id(*)")
    .eq("account_type", "personal")
    .eq("disabled", false);

  if (error) {
    throw error;
  }
  return data;
});

export const readAllDeactivatedAccounts = cache(async () => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("account_type", "personal")
    .eq("disabled", true);
  if (error) {
    throw error;
  }
  return data;
});

export const disableAccountById = async (id: string) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase.auth.admin.updateUserById(id, {
    ban_duration: "876600h",
  });
  const { data: profile, error: error2 } = await supabase
    .from("profiles")
    .update({
      disabled: true,
      status: "deactivated",
    })
    .eq("id", id)
    .select()
    .single();

  if (profile?.role === "business") {
    const { data: store, error: error3 } = await supabase
      .from("stores")
      .update({
        subscription_history_id: null,
        status: true,
      })
      .eq("profile_id", id)
      .select()
      .single();
    if (store) {
      const { data: products, error: error4 } = await supabase
        .from("products")
        .update({
          status: "deactivated",
          is_deleted: true,
        })
        .eq("store_id", store.id);
    }
  }
  revalidatePath("/dashboard/accounts/active");
  revalidatePath("/dashboard/accounts/deactivated");
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
};

export const restoreAccountById = async (id: string) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase.auth.admin.updateUserById(id, {
    ban_duration: "none",
  });
  const { data: profile, error: error2 } = await supabase
    .from("profiles")
    .update({
      disabled: false,
      status: "active",
    })
    .eq("id", id)
    .select()
    .single();
  if (profile?.role === "business") {
    const { data: store, error: error3 } = await supabase
      .from("stores")
      .update({
        status: false,
      })
      .eq("profile_id", id)
      .select()
      .single();
    if (store) {
      const { data: products, error: error4 } = await supabase
        .from("products")
        .update({
          status: "active",
          is_deleted: false,
        })
        .eq("store_id", store.id);
    }
  }
  revalidatePath("/dashboard/accounts/active");
  revalidatePath("/dashboard/accounts/deactivated");
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
};

export const deleteAccountById = async (id: string) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase.auth.admin.deleteUser(id);
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
};

export const updateAccountById = async (
  id: string,
  data: InsertTables<"profiles">
) => {
  const supabase = await createSupabaseAdmin();
  const { data: profile, error } = await supabase
    .from("profiles")
    .update(data)
    .eq("id", id)
    .select()
    .single();
  revalidatePath("/dashboard/accounts/active");
  if (error) {
    throw error;
  }
  return JSON.stringify(profile);
};
