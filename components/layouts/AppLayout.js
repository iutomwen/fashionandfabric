import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../../libs/supabaseClient";
import "react-perfect-scrollbar/dist/css/styles.css";
import DashboardLayout from "./DashboardLayout";
import LoadingBox from "../common/LoadingBox";
import { Store } from "../../utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function AppLayout(props, { user }) {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

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
  const [loading, setLoading] = useState(false);
  const [getPayload, setGetPayoad] = useState(null);
  const session = supabase.auth.session();

  const userRoles = supabase
    .from("user_roles")
    .on("*", (payload) => {
      console.log("Change received!", payload);
      setGetPayoad(payload);
    })
    .subscribe();

  useEffect(() => {
    setLoading(true);
    //check for user session
    if (!session) {
      logoutUser();
      setLoading(false);
      return;
    }

    //check if its the right user
    if (session) {
      checkUserRole();
    }
    //load the componenet needed for this app to render
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

// export async function getServerSideProps({ req }) {
//   const { user } = await supabase.auth.api.getUserByCookie(req);
//   const session = supabase.auth.session();
//   console.log("this", user);
//   if (!user) {
//     return { props: {}, redirect: { destination: "/login", permanent: true } };
//   }

//   return { props: { user } };
// }

// export async function getStaticProps(context) {
//   const { user } = await supabase.auth.api.getUserByCookie(req);
//   return {
//     props: { user }, // will be passed to the page component as props
//   };
// }
