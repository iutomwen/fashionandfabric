import React, { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
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
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Head from "next/head";
import { Store } from "../../../utils/Store";
import { APPNAME } from "../../../libs/constant";
import LoadingBox from "../../../components/common/LoadingBox";
import AppLayout from "../../../components/layouts/AppLayout";
import toast from "react-hot-toast";
import { supabase } from "../../../libs/supabaseClient";

const defaultValues = {
  name: "",
  price: "",
  productlimit: "",
  timeframe: "",
};

export default function CreateSubcription() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const SubmitHandler = async ({ name, productlimit, price, timeframe }) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("subcriptions	").insert([
        {
          package: name,
          productlimit,
          price,
          timeframe,
          created_at: new Date(),
        },
      ]);

      if (error) throw error;
      if (data) {
        toast.success("Subcriptions Created Successfully");
        router.push("/app/subcriptions");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      reset(defaultValues);
    }
  };

  return (
    <AppLayout>
      <Head>
        <title>{APPNAME} - Create New Subcription</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {pageLoading ? (
        <LoadingBox />
      ) : (
        <Box
          sx={{
            backgroundColor: "background.default",
            minHeight: "100%",
            py: 3,
            px: 4,
          }}
        >
          <Container maxWidth="lg">
            <Breadcrumbs aria-label="breadcrumb">
              <NextLink href="/app/dashboard" passHref>
                <Link underline="hover" color="inherit">
                  Dashboard
                </Link>
              </NextLink>
              <NextLink href="/app/subcriptions" passHref>
                <Link underline="hover" color="inherit">
                  Subcription List
                </Link>
              </NextLink>
              <Typography color="text.primary">Create</Typography>
            </Breadcrumbs>
            <Grid container spacing={3}>
              <Box
                component="form"
                onSubmit={handleSubmit(SubmitHandler)}
                noValidate
                sx={{ mt: 6 }}
              >
                <Grid item lg={12} md={12} xs={12}>
                  <Card>
                    <CardHeader
                      subheader="The information can be edited"
                      title="Create new subcription"
                    />
                    <Divider />
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                          <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                              minLength: 3,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="name"
                                inputProps={{ type: "text" }}
                                label="Subcription Name"
                                error={Boolean(errors.name)}
                                helperText={
                                  errors.name
                                    ? errors.name.type === "minLength"
                                      ? "Min chars is 3"
                                      : "Package Name is required"
                                    : ""
                                }
                                {...field}
                              />
                            )}
                          ></Controller>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Controller
                            name="price"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                              pattern: /^\d{0,9}(\.\d{1,2})?$/,
                            }}
                            render={({ field }) => (
                              <TextField
                                fullWidth
                                label="Subcription Price"
                                id="price"
                                error={Boolean(errors.price)}
                                helperText={
                                  errors.price
                                    ? errors.price.type === "pattern"
                                      ? "Invalid number format"
                                      : "Subcription price is required"
                                    : ""
                                }
                                {...field}
                                variant="outlined"
                              />
                            )}
                          ></Controller>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Controller
                            name="productlimit"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                              pattern: /^\d+$/,
                            }}
                            render={({ field }) => (
                              <TextField
                                fullWidth
                                label="Subcription Product Limit"
                                id="productlimit"
                                variant="outlined"
                                error={Boolean(errors.productlimit)}
                                helperText={
                                  errors.productlimit
                                    ? errors.productlimit.type === "pattern"
                                      ? "Invalid Input"
                                      : "Subcription Product Limit is required"
                                    : ""
                                }
                                {...field}
                              />
                            )}
                          ></Controller>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <Controller
                            name="timeframe"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                              pattern: /^\d+$/,
                            }}
                            render={({ field }) => (
                              <TextField
                                fullWidth
                                label="Subcription Time Limit(days)"
                                id="timeframe"
                                variant="outlined"
                                error={Boolean(errors.timeframe)}
                                helperText={
                                  errors.timeframe
                                    ? errors.timeframe.type === "pattern"
                                      ? "Invalid Input"
                                      : "Subcription Time Limit is required"
                                    : ""
                                }
                                {...field}
                              />
                            )}
                          ></Controller>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                    <Container
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        p: 2,
                      }}
                    >
                      <Button type="submit" variant="text">
                        {loading ? "loading..." : "Create Subcription"}
                      </Button>
                    </Container>
                  </Card>
                </Grid>
              </Box>
            </Grid>
          </Container>
        </Box>
      )}
    </AppLayout>
  );
}
