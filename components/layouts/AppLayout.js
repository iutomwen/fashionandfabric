import React, { useState } from "react";
import { supabase } from "../../libs/supabaseClient";
import "react-perfect-scrollbar/dist/css/styles.css";
// import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "../common/GlobalStyles";
// import theme from "./theme";
import DashboardLayout from "./DashboardLayout";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import LoadingBox from "../common/LoadingBox";

export default function AppLayout(props) {
  const [loading, setLoading] = useState(false);
  if (props.session) {
    setLoading(false);
  }
  const theme = createTheme();
  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : (
        <ThemeProvider theme={theme}>
          {/* <GlobalStyles /> */}
          <DashboardLayout children={props.children} />
        </ThemeProvider>
      )}
    </>
  );
}

export async function getServerSideProps({ req }) {
  const session = supabase.auth.session();
  console.log(session);
  if (!session) {
    return { props: {}, redirect: { destination: "/login", permanent: true } };
  }

  return { props: { session } };
}
