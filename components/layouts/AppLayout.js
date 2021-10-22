import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { supabase } from "../../libs/supabaseClient";
import "react-perfect-scrollbar/dist/css/styles.css";
import DashboardLayout from "./DashboardLayout";
import LoadingBox from "../common/LoadingBox";
import { Store } from "../../utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
// import ApiProvider, { checkUserRole, getCategory } from "../../libs/api";

function AppLayout(props, { user }) {
  const { state, dispatch } = useContext(Store);
  const { accountDetails, accountSession } = state;
  const router = useRouter();
  const logoutUser = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log("logout am here");
      Cookies.remove("accountDetails");
      Cookies.remove("accountSession");
      dispatch({ type: "USER_LOGOUT" });
      localStorage.clear();
      router.push("/login");
      return;
    } catch (error) {
      console.log(error);
    }
  };
  const checkUserRole = async (id) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", id)
        .single();
      if (error) throw error;
      const { role } = data;
      if (role === "personal" || role === "business") {
        logoutUser();
        return;
      }
      return role;
    } catch (error) {
      console.log(error);
      logoutUser();
      return;
    } finally {
      setLoading(false);
    }
  };

  async function getCategory() {
    setLoading(true);

    try {
      let { data: category, error } = await supabase
        .from("category")
        .select("*");
      if (error) throw error;
      dispatch({ type: "LOAD_ALL_CATEGORY", payload: category });
      Cookies.set("categories", JSON.stringify(category));
      return { category };
    } catch (error) {
      console.log(error);
    }
  }

  async function getSubcriptions() {
    try {
      let { data: subcriptions, error } = await supabase
        .from("subcriptions")
        .select("*");
      if (error) throw error;
      dispatch({ type: "LOAD_ALL_SUBCRIPTION", payload: subcriptions });
      Cookies.set("appSubcriptions", JSON.stringify(subcriptions));
      return { subcriptions };
    } catch (error) {
      console.log(error);
    }
  }
  async function getUsers(userType) {
    try {
      let { data: user_roles, error } = await supabase
        .from("user_roles")
        .select(
          ` 
  users(id, first_name, username, last_name, phone) `
        )
        .eq("role", userType)
        .order("id", { ascending: false });
      if (error) throw error;
      if (user_roles) {
        if (userType == "personal") {
          dispatch({ type: "LOAD_ALL_PERSONAL", payload: user_roles });
          Cookies.set("personalUsers", JSON.stringify(user_roles));
        }
        if (userType == "business") {
          dispatch({ type: "LOAD_ALL_BUSINESS", payload: user_roles });
          Cookies.set("businessUsers", JSON.stringify(user_roles));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getStores() {
    try {
      let { data: store, error } = await supabase.from("store").select(`
      id,address, businessreg, city, country, created_at, description, name, postcode, state,isactive,
      users (
        id,username
      ),
      subcriptions (
        id, package, price
        ) `);
      if (error) throw error;
      dispatch({ type: "LOAD_ALL_SHOPS", payload: store });
      Cookies.set("shops", JSON.stringify(store));
      return { store };
    } catch (error) {
      console.log(error);
    }
  }
  const [loading, setLoading] = useState(false);
  const [getPayload, setGetPayoad] = useState(null);
  const session = supabase.auth.session();

  const userRoles = supabase
    .from("*")
    .on("*", (payload) => {
      // console.log("Change received!", payload);
      setGetPayoad(payload);
    })
    .subscribe();

  useEffect(() => {
    setLoading(true);
    //check for user session
    if (!session) {
      setLoading(true);
      logoutUser();
      setLoading(false);
      router.push("/login");
      return;
    }

    if (!accountSession || !accountDetails) {
      setLoading(true);
      logoutUser();
      setLoading(false);
      router.push("/login");
      return;
    }
    //check if its the right user
    if (session) {
      const { id } = session.user;
      checkUserRole(id);
      //load the componenet needed for this app to render
      getCategory();
      getSubcriptions();
      getStores();
      if (getUsers("personal")) {
        getUsers("business");
      }
    }
    setLoading(false);
    return () => {};
  }, [getPayload]);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : (
        <DashboardLayout>{props.children}</DashboardLayout>
      )}
    </>
  );
}

export default dynamic(() => Promise.resolve(AppLayout), { ssr: false });
// export default AppLayout;
