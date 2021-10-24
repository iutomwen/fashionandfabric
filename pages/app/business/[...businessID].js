import React from "react";
import AppLayout from "../../../components/layouts/AppLayout";
import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import Head from "next/head";
import { APPNAME } from "../../../libs/constant";

function BusinessID() {
  return (
    <AppLayout>
      <Head>
        <title>{APPNAME} - View Profile</title>
        <link rel="icon" href="/favicon.ico" />{" "}
      </Head>
      <Box
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
          <NextLink href="/app/business" passHref>
            <Link underline="hover" color="inherit">
              Business Users
            </Link>
          </NextLink>
          <Typography color="text.primary">Create</Typography>
        </Breadcrumbs>
        <Container>Business Id</Container>
      </Box>
    </AppLayout>
  );
}

export default BusinessID;
