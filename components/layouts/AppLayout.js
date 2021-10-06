import React, { useEffect } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "../common/GlobalStyles";
import theme from "./theme";
import DashboardLayout from "./DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { supabase } from "../../libs/supabaseClient";
import { saveSession, userValidate } from "../../features/user/userSlice";

function AppLayout({ user, children }) {
  //   console.log("user:", user);
  const router = useRouter();
  const dispatch = useDispatch();
  const { userSession, userInfo } = useSelector((state) => state.user);
  console.log("info", userSession);
  if (!userSession) {
    router.push("/");
    return;
  }
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange();
    checkUser();
    return () => {
      authListener.unsubscribe();
    };
  }, []);
  async function checkUser() {
    const user = await supabase.auth.user();
    if (user) {
      //   console.log(user);
      dispatch(saveSession(user));
      const { id } = user;
      dispatch(userValidate({ id }));
    }
    if (!user) {
      router.push("/");
    }
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <DashboardLayout children={children} />
      </ThemeProvider>
    </>
  );
}
export default AppLayout;
export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  const { id } = user;
  console.log("id", user);
  dispatch(userValidate({ id }));
  if (!user) {
    return { props: {}, redirect: { destination: "/" } };
  }

  return { props: { user } };
}
