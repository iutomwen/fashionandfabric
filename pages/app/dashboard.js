import React from "react";
import { supabase } from "../../libs/supabaseClient";
import AppLayout from "../../components/layouts/AppLayout";

import { Box, Container, Grid } from "@material-ui/core";
import SubcriptionTab from "../../components/common/SubcriptionTab";
import TotalBusinessCustomers from "../../components/common/TotalBusinessCustomers";
import TotalPersonalCustomers from "../../components/common/TotalPersonalCustomers";
import TotalValidProducts from "../../components/common/TotalValidProducts";
import LatestOrders from "../../components/common/LatestOrders";
import LatestUsers from "../../components/common/LatestUsers";
import Head from "next/head";
import { APPNAME } from "../../libs/constant";
export default function Dashboard() {
  return (
    <>
      <Head>
        <title>{APPNAME} - Application Dashboard</title>
        <link rel="icon" href="/favicon.ico" />{" "}
      </Head>
      <AppLayout>
        <Box
          // className={layout ? layout : `mt-5 ml-0 md:ml-5 xl:ml-5`}
          className="mt-5 ml-0 md:ml-5 xl:ml-10 relative"
          sx={{
            backgroundColor: "background.default",
            minHeight: "100%",
            py: 3,
          }}
        >
          <Container maxWidth={false}>
            <Grid container spacing={3}>
              <Grid item lg={6} md={6} sm={12} xl={6} xs={12}>
                <SubcriptionTab sx={{ height: "100%" }} />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xl={6} xs={12}>
                <TotalBusinessCustomers sx={{ height: "100%" }} />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xl={6} xs={12}>
                <TotalPersonalCustomers sx={{ height: "100%" }} />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xl={6} xs={12}>
                <TotalValidProducts sx={{ height: "100%" }} />
              </Grid>
              {/* <Grid item lg={12} md={12} xl={12} xs={12}>
                <LatestOrders />
              </Grid>*/}
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <LatestUsers />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </AppLayout>
    </>
  );
}
