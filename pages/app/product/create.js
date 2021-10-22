import React, { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
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
import { Store } from "../../../utils/Store";
import { supabase } from "../../../libs/supabaseClient";
import LoadingBox from "../../../components/common/LoadingBox";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";

const defaultValues = {
  name: "",
  description: "",
  price: "",
  store: "",
  category: { value: "category", label: "Category" },
  subcategory: [],
};

function CreateProduct() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const { categories, shops } = state;
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [subCat, setSubCat] = useState(null);

  useEffect(() => {
    setPageLoading(true);
    if (categories && shops) {
      setPageLoading(false);
    }
  }, []);
  async function getSub(id) {
    setLoading(true);
    try {
      let { data: sub_category, error } = await supabase
        .from("sub_category")
        .select("*")
        .eq("category_id", id);
      if (error) throw error;
      setSubCat(sub_category);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  const cat = watch("category");
  // console.log(cat);
  useEffect(() => {
    setShow(false);
    if (cat == null) {
      return;
    }
    if (cat != "") {
      getSub(cat);
      setShow(true);
    }
    return () => !cat;
  }, [cat]);

  const SubmitHandler = async ({
    name,
    description,
    price,
    store,
    category,
    subcategory,
  }) => {
    setPageLoading(true);
    try {
      const { data, error } = await supabase.from("product").insert([
        {
          name,
          description,
          price,
          store_id: store,
          subCategory_id: subcategory,
          category_id: category,
          approved: false,
          created_at: new Date(),
          currency: "USD",
        },
      ]);

      if (error) throw error;
      if (data) {
        router.push("/app/product");
        // 22a65848
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
      reset(defaultValues);
    }
  };

  return (
    <AppLayout>
      {pageLoading ? (
        <LoadingBox />
      ) : (
        <Box
          sx={{
            backgroundColor: "background.default",
            minHeight: "100%",
            py: 3,
          }}
        >
          <Container maxWidth="lg">
            <Breadcrumbs aria-label="breadcrumb">
              <NextLink href="/app/dashboard" passHref>
                <Link underline="hover" color="inherit">
                  Dashboard
                </Link>
              </NextLink>
              <NextLink href="/app/product" passHref>
                <Link underline="hover" color="inherit">
                  Products
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
                      title="Create new product"
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
                                label="Prodct Name"
                                error={Boolean(errors.name)}
                                helperText={
                                  errors.name
                                    ? errors.name.type === "minLength"
                                      ? "Min chars is 3"
                                      : "Product name is required"
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
                                label="Product Price"
                                id="price"
                                error={Boolean(errors.price)}
                                helperText={
                                  errors.price
                                    ? errors.price.type === "pattern"
                                      ? "Invalid number format"
                                      : "Product price is required"
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
                            name="description"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                              minLength: 10,
                            }}
                            render={({ field }) => (
                              <TextField
                                fullWidth
                                label="Product Description"
                                id="description"
                                variant="outlined"
                                error={Boolean(errors.description)}
                                helperText={
                                  errors.description
                                    ? errors.description.type === "minLength"
                                      ? "Min chars is 10"
                                      : "Product description is required"
                                    : ""
                                }
                                {...field}
                              />
                            )}
                          ></Controller>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Controller
                            name="store"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                fullWidth
                                label="Select Store"
                                id="store"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                                error={Boolean(errors.store)}
                                helperText={
                                  errors.store
                                    ? errors.store.type === "required"
                                      ? "Please select a store"
                                      : "Product store is required"
                                    : ""
                                }
                                {...field}
                              >
                                <option value={null}></option>
                                {shops?.map((option) => (
                                  <option key={option.id} value={option.id}>
                                    {option.name}
                                  </option>
                                ))}
                              </TextField>
                            )}
                          ></Controller>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Controller
                            name="category"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                fullWidth
                                label="Select Category"
                                id="category"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                                error={Boolean(errors.category)}
                                helperText={
                                  errors.category
                                    ? errors.category.type === "required"
                                      ? "Please select a category"
                                      : "Product category is required"
                                    : ""
                                }
                                {...field}
                              >
                                <option value=""></option>
                                {categories?.map((option) => (
                                  <option key={option.id} value={option.id}>
                                    {option.name}
                                  </option>
                                ))}
                              </TextField>
                            )}
                          ></Controller>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <div className={`${show ? "" : "hidden"}`}>
                            {loading ? (
                              "loading..."
                            ) : (
                              <Controller
                                name="subcategory"
                                control={control}
                                defaultValue=""
                                rules={{
                                  required: true,
                                }}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="Select Sub-Category"
                                    id="subcategory"
                                    select
                                    SelectProps={{ native: true }}
                                    variant="outlined"
                                    error={Boolean(errors.subcategory)}
                                    helperText={
                                      errors.subcategory
                                        ? errors.subcategory.type === "required"
                                          ? "Please select a sub-category"
                                          : "Product subcategory is required"
                                        : ""
                                    }
                                    {...field}
                                  >
                                    <option value=""></option>
                                    {subCat?.map((option) => (
                                      <option key={option.id} value={option.id}>
                                        {option.name}
                                      </option>
                                    ))}
                                  </TextField>
                                )}
                              ></Controller>
                            )}
                          </div>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            inputProps={{ type: "file" }}
                            required
                            fullWidth
                            id="files"
                            // label="File Upload"
                          />
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
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={() => {}}
                      >
                        Create Product
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

export default CreateProduct;
