import React from "react";
import { Box, Container, Grid } from "@material-ui/core";
import LatestUsers from "../../../components/common/LatestUsers";
import AppLayout from "../../../components/layouts/AppLayout";
import { Button } from "@mui/material";
import Head from "next/head";
import { APPNAME } from "../../../libs/constant";
function Index() {
  return (
    <AppLayout>
      <Head>
        <title>{APPNAME} - Personal Profile List</title>
        <link rel="icon" href="/favicon.ico" />{" "}
      </Head>
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
          <div className="flex w-full items-end ">
            <div className=" ">
              <Button variant="outlined" fullWidth>
                Create New
              </Button>
            </div>
          </div>
          <Grid className="h-screen" container spacing={3}>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <LatestUsers userType="personal" />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </AppLayout>
  );
}

export default Index;
