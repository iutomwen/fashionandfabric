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
  const router = useRouter();
  const { accountDetails, accountSession } = state;
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

  async function getCategory() {
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

  async function getStores() {
    try {
      let { data: store, error } = await supabase.from("store").select(`
      id,address, businessReg, city, country, created_at, description, name, postcode, state,
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
      console.log("Change received!", payload);
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
      checkUserRole();
      //load the componenet needed for this app to render
      //get all category
      getCategory();
      getSubcriptions();
      getStores();
    }
    setLoading(false);
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
