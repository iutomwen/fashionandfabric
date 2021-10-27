import React, { useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import { Save } from 'react-feather';
import { Box, Grid, TextField,Card, CardContent,CardActions, Button} from '@mui/material'
import { useRouter } from 'next/router';

function UserEdit() {
    const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm();

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
        <>
            <Card raised sx={{ minWidth: "95%" ,mt:5, backgroundColor:"#f5f5f5" }}>
      <CardContent>
      <Box
                component="form"
                onSubmit={handleSubmit(SubmitHandler)}
                noValidate
                sx={{ mt: 6 }}
              >
      <Grid container spacing={2}>
  <Grid item md={6} xs={12}>
  <Controller
                            name="first_name"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                              minLength: 2,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="first_name"
                                inputProps={{ type: "text" }}
                                label="First Name"
                                error={Boolean(errors.first_name)}
                                helperText={
                                  errors.first_name
                                    ? errors.first_name.type === "minLength"
                                      ? "Min chars is 2"
                                      : "First is required"
                                    : ""
                                }
                                {...field}
                              />
                            )}
                          ></Controller>
  </Grid>
  <Grid item md={6} xs={12}>
  <Controller
                            name="last_name"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                              minLength: 2,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="last_name"
                                inputProps={{ type: "text" }}
                                label="Last Name"
                                error={Boolean(errors.last_name)}
                                helperText={
                                  errors.last_name
                                    ? errors.last_name.type === "minLength"
                                      ? "Min chars is 2"
                                      : "Last Name is required"
                                    : ""
                                }
                                {...field}
                              />
                            )}
                          ></Controller>
  </Grid>
  <Grid item md={6} xs={12}>
  <Controller
                            name="phone"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                              // minLength: 10,
                              pattern: /^(1?(-?\d{3})-?)?(\d{3})(-?\d{4})$/
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="phone"
                                inputProps={{ type: "text" }}
                                label="Phone Number"
                                error={Boolean(errors.phone)}
                                helperText={
                                  errors.phone
                                    ? errors.phone.type === "pattern"
                                      ? "Invalid phone number format"
                                      : "Phone number is required"
                                    : ""
                                }
                                {...field}
                              />
                            )}
                          ></Controller>
  </Grid>
  <Grid item md={6} xs={12}>
  <Controller
                            name="address"
                            control={control}
                            defaultValue=""
                            rules={{
                              // required: true,
                              minLength: 3,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="address"
                                inputProps={{ type: "text" }}
                                label="Address"
                                error={Boolean(errors.address)}
                                helperText={
                                  errors.address
                                    ? errors.address.type === "minLength"
                                      ? "Min chars is 3" : "" :""
                                }
                                {...field}
                              />
                            )}
                          ></Controller>
  </Grid>
  <Grid item md={6} xs={12}>
  <Controller
                            name="city"
                            control={control}
                            defaultValue=""
                            rules={{
                              // required: true,
                              minLength: 3,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="city"
                                inputProps={{ type: "text" }}
                                label="City"
                                error={Boolean(errors.city)}
                                helperText={
                                  errors.city
                                    ? errors.city.type === "minLength"
                                      ? "Min chars is 3"
                                      : ""
                                    : ""
                                }
                                {...field}
                              />
                            )}
                          ></Controller>
  </Grid>
  <Grid item md={6} xs={12}>
  <Controller
                            name="state"
                            control={control}
                            defaultValue=""
                            rules={{
                              // required: true,
                              minLength: 3,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="state"
                                inputProps={{ type: "text" }}
                                label="State"
                                error={Boolean(errors.state)}
                                helperText={
                                  errors.state
                                    ? errors.state.type === "minLength"
                                      ? "Min chars is 3"
                                      : ""
                                    : ""
                                }
                                {...field}
                              />
                            )}
                          ></Controller>
  </Grid>
  <Grid item md={6} xs={12}>
  <Controller
                            name="country"
                            control={control}
                            defaultValue=""
                            rules={{
                              // required: true,
                              minLength: 3,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="country"
                                inputProps={{ type: "text" }}
                                label="Country"
                                error={Boolean(errors.country)}
                                helperText={
                                  errors.country
                                    ? errors.country.type === "minLength"
                                      ? "Min chars is 3"
                                      : ""
                                    : ""
                                }
                                {...field}
                              />
                            )}
                          ></Controller>
  </Grid>
  <Grid item md={6} xs={12}>
  <Controller
                            name="postcode"
                            control={control}
                            defaultValue=""
                            rules={{
                              // required: true,
                              minLength: 3,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="postcode"
                                inputProps={{ type: "text" }}
                                label="Postcode"
                                error={Boolean(errors.postcode)}
                                helperText={
                                  errors.postcode
                                    ? errors.postcode.type === "minLength"
                                      ? "Min chars is 3"
                                      : ""
                                    : ""
                                }
                                {...field}
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
                              // required: true,
                              minLength: 10,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                maxRows={4}
                                id="description"
                                // inputProps={{ type: "textarea" }}
                                label="About User"
                                error={Boolean(errors.description)}
                                helperText={
                                  errors.description
                                    ? errors.description.type === "minLength"
                                      ? "Min chars is 10"
                                      : ""
                                    : ""
                                }
                                {...field}
                              />
                            )}
                          ></Controller>
  </Grid>
  </Grid>
  </Box>
      </CardContent>
      <CardActions sx={{my:4, pl:3}}>
        <Button startIcon={<Save/>} size="medium" variant="outlined" color="primary">Update User</Button>
      </CardActions>
    </Card>
        </>
    )
}

export default UserEdit
