import React, { useContext, useEffect } from "react";
import Head from "next/head";
import { APPNAME } from "../libs/constant";
import Auth from "../components/Auth";
import { useRouter } from "next/router";
import { supabase } from "../libs/supabaseClient";
import { Store } from "../utils/Store";

export default function Home() {
  const { state, dispatch } = useContext(Store);
  const { accountDetails, accountSession } = state;
  const router = useRouter();
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          dispatch({ type: "USER_LOGIN" });
          if (accountSession && accountDetails) {
            router.push("/app/dashboard");
            console.log("allow to pass");
          }
        }
        if (event === "SIGNED_OUT") {
          dispatch({ type: "USER_LOGOUT" });
        }
      }
    );
    checkUser();
    return () => {
      authListener.unsubscribe();
    };
  }, []);
  async function checkUser() {
    const user = await supabase.auth.user();
    if (user) {
      dispatch({ type: "USER_LOGIN" });
    }
  }
  async function handleAuthChange(event, session) {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  }

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <div className="container">
      <Head>
        <title>{APPNAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Auth className="mt-24 ml-0 md:ml-5 xl:ml-52" />
    </div>
  );
}
