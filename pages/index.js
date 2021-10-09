import Head from "next/head";
import { APPNAME } from "../libs/constant";
import { useState, useEffect } from "react";
import { supabase } from "../libs/supabaseClient";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logoutUser } from "../features/user/userSlice";
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

  const session = supabase.auth.session();
  console.log("lol", session);
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
