import React, { useEffect, useState } from "react";
import { supabase } from "../../libs/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import "react-perfect-scrollbar/dist/css/styles.css";
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "../common/GlobalStyles";
import theme from "./theme";
import DashboardLayout from "./DashboardLayout";
import { useRouter } from "next/router";
import { loadFromLocal, logoutUser } from "../../features/user/userSlice";
import LoadingBox from "../common/LoadingBox";
import { getAllPersonal } from "../../features/personal/personalSlice";
import { getAllProducts } from "../../features/shops/productSlice";

export default function AppLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const session = supabase.auth.session();

  useEffect(() => {
    if (!session) {
      setLoading(true);
      dispatch(logoutUser());
      router.push("/login");
      setLoading(false);
      console.log("user logged out");
    }
    if (session) {
      setLoading(true);
      //fill redux with local storage
      dispatch(loadFromLocal({ session }));
      setLoading(false);
    }

    setLoading(false);
    // return () => {
    //   dispatch(loadFromLocal({ session }));
    //   session;
    //   console.log("clean up app..");
    // };
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
