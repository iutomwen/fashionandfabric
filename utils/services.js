import { supabase } from "./supabase";

export const loginUser = async (email, password) => {
  try {
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) throw error;
    return { user, session };
  } catch (error) {
    return { error };
  }
};

export const checkUser = async (id) => {
  try {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", id)
      .single();
    const { role } = data;
    if (error) throw error;
    return { role };
  } catch (error) {
    return { error };
  }
};

export const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    // if (error) throw error;
  } catch (error) {
    return { error };
  }
};

export const checkAccountSession = async () => {
  try {
    const session = supabase.auth.session();
    return session;
  } catch (error) {
    return { error };
  }
};
export const accountDetails = async (id) => {
  try {
    const { data: accountInfo, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .neq("roles", "personal")
      .single();
    if (error) throw error;
    return { accountInfo };
  } catch (error) {
    return { error };
  }
};

export const usersDetails = async (limit) => {
  try {
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .neq("roles", "admin")
      .neq("roles", "staff")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return { users };
  } catch (error) {
    return { error };
  }
};

export const editUser = async (id, data) => {
  try {
    const { data: info, error } = await supabase
      .from("users")
      .update(data)
      .eq("id", id)
      .single();
    if (error) throw error;
    return { info };
  } catch (error) {
    return { error };
  }
};

export const countTotalUsers = async () => {
  try {
    const { error, count } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .neq("roles", "admin")
      .neq("roles", "staff");
    if (error) throw error;
    return { count };
  } catch (error) {
    return { error };
  }
};

export const countTotalProducts = async () => {
  try {
    const { error, count } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });
    if (error) throw error;
    return { count };
  } catch (error) {
    return { error };
  }
};

export const countTotalPaidSubcriptions = async () => {
  try {
    const { error, count } = await supabase
      .from("users")
      .select(
        `store:store_user_id_fkey(id, subcriptions:store_subcription_id_fkey(id,package))`,
        { count: "exact", head: true }
      )
      .neq("roles", "admin")
      .neq("roles", "staff")
      .neq("roles", "personal")
      .neq("store.subcriptions.package", "Free Tier", { ignore: true });
    if (error) throw error;
    return { count };
  } catch (error) {
    return { error };
  }
};

export const countTotalMessages = async () => {
  try {
    const { error, count } = await supabase
      .from("contactMessage")
      .select("*", { count: "exact", head: true });
    if (error) throw error;
    return { count };
  } catch (error) {
    return { error };
  }
};
