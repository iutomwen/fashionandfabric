"use server";
import { createSupabaseAdmin } from "@/utils/supabase";
import { InsertTables, UpdateTables } from "@/utils/types";
import { revalidatePath, revalidateTag } from "next/cache";
import { cache } from "react";

export const updateMyProfile = async (profile: InsertTables<"profiles">) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase
    .from("profiles")
    .update(profile)
    .eq("id", profile.id)
    .select();
  revalidatePath("/dashboard/settings/my-profile");
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
};

export const updateAuthUser = async (id: string, update: any) => {
  const supabase = await createSupabaseAdmin();
  const { data, error } = await supabase.auth.admin.updateUserById(id, update);
  revalidateTag("user");
  revalidatePath("/dashboard/settings/my-profile");
  revalidatePath("/auth");
  if (error) {
    throw error;
  }
  return JSON.stringify(data);
};
