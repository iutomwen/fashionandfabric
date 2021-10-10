import { Box, Container, Grid } from "@material-ui/core";
import React from "react";
import LatestOrders from "../../../components/common/LatestOrders";
import LatestUsers from "../../../components/common/LatestUsers";
import AppLayout from "../../../components/layouts/AppLayout";

function Index() {
  return (
    <AppLayout>
      <Box
        // className={layout ? layout : `mt-5 ml-0 md:ml-5 xl:ml-5`}
        className="mt-2 ml-0 md:ml-5 xl:ml-10 relative"
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Grid className="h-screen" container spacing={3}>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              {/* <LatestUsers /> */}
              <LatestOrders />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </AppLayout>
  );
}

export default Index;
