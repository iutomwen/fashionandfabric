import { Button, Container, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Link from "next/link";
import LatestOrders from "../../../components/common/LatestOrders";
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <div className="">
              <TextField fullWidth label="Search Product" id="product" />
            </div>
            <Link href="/app/product/create">
              <Button variant="outlined">
                <a>Create New</a>
              </Button>
            </Link>
          </Box>
          <Grid className="h-screen" container spacing={3}>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <LatestOrders />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </AppLayout>
  );
}

export default Index;
