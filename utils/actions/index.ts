"use server";
import { logout } from "@/app/auth/actions";
import { createSupbaseServerClientReadOnly } from "../supabase";
import { cache } from "react";
import { revalidateTag } from "next/cache";
export const readUserSession = cache(async () => {
  const supabase = await createSupbaseServerClientReadOnly();
  const session = await supabase.auth.getSession();
  const { data: user, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.data.session?.user?.id)
    .eq("account_type", "admin")
    .single();
  if (error) {
    return { error };
  }
  if (!user) {
    logout();
    return { error: { message: "User not found" } };
  }
  revalidateTag("user");

  return { user, session };
});
