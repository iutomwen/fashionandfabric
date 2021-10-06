import Head from "next/head";
import { APPNAME } from "../libs/constant";
import { useState, useEffect } from "react";
import { supabase } from "../libs/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../components/Auth";
import Dashboard from "./app/dashboard";
import { useRouter } from "next/router";
import { saveSession, userValidate } from "../features/user/userSlice";

export default function Home() {
  const [session, setSession] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [authenticatedState, setAuthenticatedState] =
    useState("not-authenticated");
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          setAuthenticatedState("authenticated");
          router.push("/app/dashboard");
        }
        if (event === "SIGNED_OUT") {
          setAuthenticatedState("not-authenticated");
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
      dispatch(saveSession(user));
      const { id } = user;
      dispatch(userValidate({ id }));
      setAuthenticatedState("authenticated");
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
  return (
    <div className="container">
      <Head>
        <title>{APPNAME}</title>
        <link rel="icon" href="/favicon.ico" />{" "}
      </Head>
      {authenticatedState === "not-authenticated" ? (
        <Auth className="mt-24 ml-0 md:ml-5 xl:ml-52" />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}
