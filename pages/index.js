import Head from "next/head";
import { APPNAME } from "../libs/constant";
import { useState, useEffect } from "react";
import { supabase } from "../libs/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./app/dashboard";
import { useRouter } from "next/router";
import { logoutUser, userDetails } from "../features/user/userSlice";
import Login from "./login";
import LoadingBox from "../components/common/LoadingBox";
import Auth from "../components/Auth";

export default function Home() {
  if (typeof window !== "undefined") {
    console.log("Rendering on browser or client");
  } else {
    console.log("Rendering on server");
  }
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [authenticatedState, setAuthenticatedState] =
    useState("not-authenticated");
  // useEffect(() => {
  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     (event, session) => {
  //       handleAuthChange(event, session);
  //       if (event === "SIGNED_IN") {
  //         setAuthenticatedState("authenticated");
  //         router.push("/app/dashboard");
  //       }
  //       if (event === "SIGNED_OUT") {
  //         setAuthenticatedState("not-authenticated");
  //         router.push("/login");
  //       }
  //     }
  //   );
  //   checkUser();
  //   return () => {
  //     authListener.unsubscribe();
  //   };
  // }, []);
  // async function checkUser() {
  //   const user = await supabase.auth.user();
  //   if (user) {
  //     console.log("try :", user);
  //     const { id } = user;
  //     dispatch(userDetails({ id }));
  //     setAuthenticatedState("authenticated");
  //   }
  // }
  // async function handleAuthChange(event, session) {
  //   await fetch("/api/auth", {
  //     method: "POST",
  //     headers: new Headers({ "Content-Type": "application/json" }),
  //     credentials: "same-origin",
  //     body: JSON.stringify({ event, session }),
  //   });
  // }
  const session = supabase.auth.session();
  console.log(session);
  useEffect(() => {
    setLoading(true);
    if (!session) {
      dispatch(logoutUser());
      router.push("/login");
      setLoading(false);
      console.log("user logged out");
    }
    setLoading(false);
  }, [session]);
  return (
    <div className="container">
      <Head>
        <title>{APPNAME}</title>
        <link rel="icon" href="/favicon.ico" />{" "}
      </Head>
      {loading ? (
        <>
          <LoadingBox />
        </>
      ) : (
        <Auth className="mt-24 ml-0 md:ml-5 xl:ml-52" />
      )}
    </div>
  );
}
