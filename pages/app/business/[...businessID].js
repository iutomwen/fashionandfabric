import React from "react";
import AppLayout from "../../../components/layouts/AppLayout";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import NextLink from "next/link";

function BusinessID() {
  return (
    <AppLayout>
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
