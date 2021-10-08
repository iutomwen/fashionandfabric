import React, { useEffect, useState } from "react";
import { supabase } from "../../libs/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import "react-perfect-scrollbar/dist/css/styles.css";
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "../common/GlobalStyles";
import theme from "./theme";
import DashboardLayout from "./DashboardLayout";
import { useRouter } from "next/router";
import {
  loadFromLocal,
  logoutUser,
  userDetails,
} from "../../features/user/userSlice";
import LoadingBox from "../common/LoadingBox";

export default function AppLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const router = useRouter();
  const { userSession, userInfo } = useSelector((state) => state.user);
  const session = supabase.auth.session();
  //   console.log("session: ", session);
  async function checkUser() {
    const user = await supabase.auth.user();
    // console.log("user", user);
    if (!user) {
      dispatch(logoutUser());
    }
  }
  useEffect(() => {
    setLoading(true);
    if (session) {
      setLoading(true);

      // dispatch(logoutUser());
      //fill redux with local storage
      checkUser();
      dispatch(loadFromLocal({ session }));
      setLoading(false);
    }
    if (!session) {
      setLoading(true);
      dispatch(logoutUser());
      router.push("/login");
      setLoading(false);
      console.log("user logged out");
    }
    setLoading(false);
  }, [session]);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : (
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <DashboardLayout children={children} />
        </ThemeProvider>
      )}
    </>
  );
}
