import Head from "next/head";
import { APPNAME } from "../libs/constant";
import { useState, useEffect } from "react";
import { supabase } from "../libs/supabaseClient";
import Auth from "../components/Auth";
import Account from "../components/Account";
import AppLayout from "../components/layouts/AppLayout";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      <Head>
        <title>{APPNAME}</title>
        <link rel="icon" href="/favicon.ico" />{" "}
      </Head>
      {!session ? (
        <AppLayout />
      ) : (
        <AppLayout key={session.user.id} session={session} />
      )}
    </div>
  );
}
