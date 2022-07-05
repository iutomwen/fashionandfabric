import React from "react";
import { LoginPage } from "@/components/Auth/LoginPage";
import Head from "next/head";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { checkAccountSession, signOutUser } from "@/utils/services";
import { showNotification } from "@mantine/notifications";
import {
  fetchAccountDetails,
  logoutUserAccount,
} from "@/utils/slices/accountSlice";
import { LoadingOverlay } from "@mantine/core";
import withGuest from "@/components/Auth/withGuest";
function Home() {
  const router = useRouter();
  const { account } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          if (Object.keys(account).length > 0) {
            router.push("/dashboard");
          }
        }
        if (event === "SIGNED_OUT") {
          dispatch(logoutUserAccount());
          setVisible(false);
          router.push("/");
        }
      }
    );
    return () => {
      authListener.unsubscribe();
    };
  }, [account, dispatch, router]);

  React.useEffect(() => {
    if (Object.keys(account).length === 0) {
      setVisible(false);
    }
  }, [account]);

  async function handleAuthChange(event, session) {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  }
  return (
    <div className="flex flex-col items-center justify-center my-20 relative">
      <LoadingOverlay visible={visible} />
      <Head>
        <title>Fashion and Fabrics</title>
        <meta
          name="description"
          content="Admin access for fashion and fabrics"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginPage />
    </div>
  );
}

export default withGuest(Home);
