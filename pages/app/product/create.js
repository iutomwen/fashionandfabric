import React, { useEffect, useState } from "react";
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
const categoryState = [
  {
    value: 1,
    label: "kids",
  },
  {
    value: 2,
    label: "Fabrics",
  },
  {
    value: 3,
    label: "Men",
  },
];

const subcategoryState = [
  {
    value: 1,
    label: "shoes",
  },
  {
    value: 2,
    label: "Clothing",
  },
  {
    value: 3,
    label: "Men",
  },
];
const storeState = [
  {
    value: 1,
    label: "Williams",
  },
  {
    value: 2,
    label: "John",
  },
];
function CreateProduct() {
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    store: "",
    currency: "",
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    // let { data: category, error } = await supabase
    // .from('category')
    // .select('id,name')
  }, []);
  useEffect(() => {
    if (values.category != "") {
      //   console.log(values.category);
      setShow(true);
    }
  }, [values.category]);
  return (
    <AppLayout>
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

            <Link underline="hover" color="inherit">
              Products
            </Link>
            <Typography color="text.primary">Breadcrumbs</Typography>
          </Breadcrumbs>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
              <Card>
                <CardHeader
                  subheader="The information can be edited"
                  title="Profile"
                />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify the name"
                        label="Prodct Name"
                        name="name"
                        onChange={handleChange}
                        required
                        value={values.name}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Product Description"
                        name="description"
                        onChange={handleChange}
                        required
                        value={values.description}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Product Price"
                        name="price"
                        onChange={handleChange}
                        required
                        value={values.price}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Select Store"
                        name="store"
                        onChange={handleChange}
                        required
                        select
                        SelectProps={{ native: true }}
                        value={values.store}
                        variant="outlined"
                      >
                        {storeState.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Select Category"
                        name="category"
                        onChange={handleChange}
                        required
                        select
                        SelectProps={{ native: true }}
                        value={values.category}
                        variant="outlined"
                      >
                        {categoryState.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <div className={`${show ? "" : "hidden"}`}>
                        <TextField
                          fullWidth
                          label="Select SubCategory"
                          name="subcategory"
                          onChange={handleChange}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.subcategory}
                          variant="outlined"
                        >
                          {subcategoryState.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                      </div>
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
                    variant="contained"
                    onClick={() => {
                      console.log(values);
                    }}
                  >
                    Save details
                  </Button>
                </Container>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </AppLayout>
  );
}

export default CreateProduct;
