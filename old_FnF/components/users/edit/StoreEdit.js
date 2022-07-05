import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Save } from "react-feather";
import {
  Box,
  Grid,
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { supabase } from "../../../libs/supabaseClient";
import { Store } from "../../../utils/Store";

function StoreEdit({ store }) {
  const [loading, setLoading] = useState(false);
  const [subcriptions, setSubcriptions] = useState([]);
  const { state } = useContext(Store);
  const { appSubcriptions } = state;
  const router = useRouter();
  const subID = appSubcriptions.filter(
    (item) => item.id == store?.subcription_id
  );

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: store,
  });

  async function getAllSubcription() {
    try {
      let { data: subcriptions, error } = await supabase
        .from("subcriptions")
        .select("*");
      if (error) throw error;
      setSubcriptions(subcriptions);
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      if (store) {
        getAllSubcription();
        reset(store);
      }
    }

    return () => (isCancelled = true);
  }, [reset, store]);

  const SubmitHandler = async ({
    name,
    businessreg,
    phone,
    city,
    state,
    country,
    postcode,
    description,
    address,
    subcription,
  }) => {
    setLoading(true);

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("store")
        .update(
          {
            name,
            businessreg,
            phone,
            city,
            state,
            country,
            postcode,
            description,
            address,
            subcription_id: subcription,
          },
          {
            returning: "minimal",
          }
        )
        .eq("id", store.id);
      if (error) throw error;
      toast.success("Store Edited Successfully");
      router.back();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(SubmitHandler)}
        noValidate
        sx={{ mt: 3 }}
      >
        <Card raised sx={{ minWidth: "95%", backgroundColor: "#f5f5f5" }}>
          <CardContent sx={{ my: 4 }}>
            <Grid container spacing={2}>
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
                      label="Store Name"
                      error={Boolean(errors.name)}
                      helperText={
                        errors.name
                          ? errors.name.type === "minLength"
                            ? "Min chars is 2"
                            : "Store Name is required"
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
                    required: true,
                    minLength: 10,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="description"
                      inputProps={{ type: "text" }}
                      label="Store Description"
                      error={Boolean(errors.description)}
                      helperText={
                        errors.description
                          ? errors.description.type === "minLength"
                            ? "Min chars is 10"
                            : "Store description is required"
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
                    // required: true,
                    // minLength: 10,
                    pattern:
                      /^\(*\+*[0-9]{0,3}\)*-*[1-9]{0,3}[-. /]*\(*[2-9]\d{2}\)*[-. /]*\d{3}[-. /]*\d{4} *e*x*t*\.* *\d{0,4}$/,
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
                  name="businessreg"
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
                      id="businessreg"
                      // inputProps={{ type: "textarea" }}
                      label="Business Registration Number	"
                      error={Boolean(errors.businessreg)}
                      helperText={
                        errors.businessreg
                          ? errors.businessreg.type === "minLength"
                            ? "Min chars is 10"
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
                  name="subcription"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Select Subcription"
                      id="subcription"
                      select
                      SelectProps={{ native: true }}
                      variant="outlined"
                      error={Boolean(errors.subcription)}
                      helperText={
                        errors.subcription
                          ? errors.subcription.type === "required"
                            ? "Please select a subcription"
                            : "Subcription is required"
                          : ""
                      }
                      {...field}
                    >
                      {/* <option value={subID[0].id}>{subID[0].package}</option> */}
                      {subcriptions?.map((option) => (
                        <option
                          key={option.id}
                          value={option.id}
                          selected={subID[0].id === option.id ? true : false}
                        >
                          {option.package}
                        </option>
                      ))}
                    </TextField>
                  )}
                ></Controller>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ my: 4, pl: 3 }}>
            <Button
              type="submit"
              startIcon={<Save />}
              size="medium"
              variant="text"
              color="primary"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Store"}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}

export default StoreEdit;
