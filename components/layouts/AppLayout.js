import React from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "../common/GlobalStyles";
import theme from "./theme";
import DashboardLayout from "./DashboardLayout";
function AppLayout({ children }) {
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
