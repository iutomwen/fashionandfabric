import React from "react";
// import { Box, Container, Grid } from "@material-ui/core";
import LatestUsers from "../../../components/common/LatestUsers";
import AppLayout from "../../../components/layouts/AppLayout";
import Head from "next/head";
import NextLink from "next/link";

import { APPNAME } from "../../../libs/constant";
import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Typography,
  Button,
  Grid,
  CssBaseline,
} from "@mui/material";
function index() {
  return (
    <AppLayout>
      <Head>
        <title>{APPNAME} - Business Profile List</title>
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
        <Breadcrumbs aria-label="breadcrumb">
          <NextLink href="/app/dashboard" passHref>
            <Link underline="hover" color="inherit">
              Dashboard
            </Link>
          </NextLink>

          <Link underline="hover" color="inherit">
            Business Users
          </Link>
        </Breadcrumbs>
        <Container maxWidth={false}>
          <Grid className="h-screen" container spacing={3}>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <LatestUsers userType="business" />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </AppLayout>
  );
}

export default index;
