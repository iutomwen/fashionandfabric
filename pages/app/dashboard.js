import React from "react";
import AppLayout from "../../components/layouts/AppLayout";

import { Box, Container, Grid } from "@material-ui/core";
import Budget from "../../components/common/Budget";
import TotalCustomers from "../../components/common/TotalCustomers";

const Dashboard = () => (
  <>
    <AppLayout>
      <Box
        className="mt-20 ml-0 md:ml-5 xl:ml-5"
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCustomers />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCustomers />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCustomers sx={{ height: "100%" }} />
            </Grid>
            {/* <Grid item lg={8} md={12} xl={9} xs={12}>
              <Sales />
            </Grid> */}
            {/* <Grid item lg={4} md={6} xl={3} xs={12}>
              <TrafficByDevice sx={{ height: "100%" }} />
            </Grid> */}
            {/* <Grid item lg={4} md={6} xl={3} xs={12}>
              <LatestProducts sx={{ height: "100%" }} />
            </Grid> */}
            {/* <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestOrders />
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </AppLayout>
  </>
);

export default Dashboard;
