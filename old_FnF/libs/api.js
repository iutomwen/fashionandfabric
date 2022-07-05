import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Store } from "../utils/Store";
import { supabase } from "./supabaseClient";

export default function ApiProvider() {
  const session = supabase.auth.session();
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  return <>llwowl</>;
}

const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  console.log("am here");
  Cookies.remove("accountDetails");
  Cookies.remove("accountSession");
  dispatch({ type: "USER_LOGOUT" });
  localStorage.clear();
  router.push("/login");
  return;
};
const checkUserRole = async () => {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", session.user.id)
    .single();
  const { role } = data;
  if (role === "personal" || role === "business") {
    logoutUser();
    return;
  }
  return role;
};

//
async function getCategory() {
  try {
    let { data: category, error } = await supabase.from("category").select("*");
    if (error) throw error;
    dispatch({ type: "LOAD_ALL_CATEGORY", payload: category });
    console.log(category);
    return { category };
  } catch (error) {
    console.log(error);
  }
}

export { getCategory, checkUserRole };
