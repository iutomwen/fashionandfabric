import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { APPNAME, NEW_USER_REGISTER } from "../libs/constant";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "./utils/Copyright";
import ApplicationLogo from "./common/ApplicationLogo";
import { supabase } from "../libs/supabaseClient";
import LoadingBox from "../components/common/LoadingBox";
import { Store } from "../utils/Store";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import ToastNotify from "../libs/useNotify";

const defaultValues = {
  email: "",
  firstName: "",
  lastName: "",
  role: { value: "", label: "Role" },
  password: "",
};

export default function Register() {
  const { state, dispatch } = useContext(Store);
  const { accountDetails, accountSession } = state;
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(false);

  const doReset = () => {
    reset(defaultValues);
  };

  const router = useRouter();

  const handleRegister = async ({
    email,
    firstName,
    lastName,
    role,
    password,
  }) => {
    setPending(true);
    dispatch({ type: "USER_REGISTER" });
    try {
      const { user, session, error } = await supabase.auth.signUp(
        {
          email,
          password,
        },
        {
          data: {
            firstName,
            lastName,
            role,
          },
        }
      );

      if (error) throw error;
      if (session) {
        try {
          const { data, error } = await supabase.from("notifications").insert([
            {
              notifyid: uuidv4(),
              user_id: user.id,
              notify_type: "register",
              notify_url: `/app/${role}/${user.id}/view`,
              notification: NEW_USER_REGISTER,
              created_at: new Date(),
            },
          ]);
          if (error) throw error;
          if (data) {
            dispatch({ type: "ADD_NEW_NOTIFICATION", payload: data });
          }
        } catch (error) {
          toast.error(error.message);
        }
        const { app: data, errors } = await supabase
          .from("user_roles")
          .update({ role })
          .eq("user_id", user.id);
        const { userdata: userInfo, errorUser } = await supabase
          .from("users")
          .update({ roles: role, created_at: new Date() })
          .match({ id: user.id });
        if (role === "personal" || role === "business") {
          if (role === "business") {
            const { storeDate: store, storeError } = await supabase
              .from("store")
              .insert([{ user_id: user.id }]);
          }
          supabase.auth.signOut();
          console.log("block login");
          dispatch({ type: "USER_LOGOUT" });
          localStorage.clear();
          toast.success("Account Created");
        }

        if (role == "staff") {
          let { data: users } = await supabase
            .from("users")
            .select("*")
            .eq("id", id)
            .single();
          dispatch({ type: "ACCOUNTSESSION", payload: session });
          dispatch({ type: "ACCOUNTDETAILS", payload: users });
          // console.log("admin pass");
          router.push("/app/dashboard");
        }
      }
    } catch (error) {
      toast.error(error.message || error.error_description);
    } finally {
      setPending(false);
      reset(defaultValues);
    }
  };
  useEffect(() => {
    setLoading(true);
    if (accountDetails && accountSession) {
      console.log("allow");
      router.push("/app/dashboard");
    }
    setLoading(false);
    return () => {
      !accountDetails;
      !accountSession;
    };
  }, [accountDetails, accountSession]);

  return (
    <>
      <Head>
        <title>{APPNAME} - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastNotify />
      {loading ? (
        <LoadingBox />
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Link href="/">
              <a>
                <ApplicationLogo />
              </a>
            </Link>
            <Typography component="h1" variant="h5">
              Register Here
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(handleRegister)}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 3,
                    }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        error={Boolean(errors.firstName)}
                        helperText={
                          errors.firstName
                            ? errors.firstName.type === "pattern"
                              ? "Min chars is 3"
                              : "First name is required"
                            : ""
                        }
                        {...field}
                      />
                    )}
                  ></Controller>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 3,
                    }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        autoFocus
                        error={Boolean(errors.lastName)}
                        helperText={
                          errors.lastName
                            ? errors.lastName.type === "pattern"
                              ? "Min chars is 3"
                              : "Last name is required"
                            : ""
                        }
                        {...field}
                      />
                    )}
                  ></Controller>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        inputProps={{ type: "email" }}
                        error={Boolean(errors.email)}
                        helperText={
                          errors.email
                            ? errors.email.type === "pattern"
                              ? "Invalid email address"
                              : "Email address is required"
                            : ""
                        }
                        {...field}
                      />
                    )}
                  ></Controller>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 6,
                    }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        id="password"
                        label="Password"
                        inputProps={{ type: "password" }}
                        error={Boolean(errors.password)}
                        helperText={
                          errors.password
                            ? errors.password.type === "minLength"
                              ? "Password lenght is too short"
                              : "Password is required"
                            : ""
                        }
                        {...field}
                      />
                    )}
                  ></Controller>
                </Grid>

                <Grid item md={12} xs={12}>
                  <Controller
                    name="role"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 1,
                    }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        id="role"
                        label="Role"
                        select
                        SelectProps={{ native: true }}
                        error={Boolean(errors.role)}
                        helperText={
                          errors.role
                            ? errors.role.type === "minLength"
                              ? "Please select a Role"
                              : "Role is required"
                            : ""
                        }
                        {...field}
                      >
                        <option value={null}></option>
                        <option value={`personal`}>Personal</option>
                        <option value={`business`}>Business</option>
                        {/* <option value={`staff`}>Staff</option> */}
                      </TextField>
                    )}
                  ></Controller>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={pending}
                    sx={{ mt: 0, mb: 2 }}
                  >
                    <span>{pending ? "Loading" : "Sign Up"}</span>
                  </Button>
                </Grid>
                <Box
                  sx={{
                    marginTop: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                  }}
                >
                  <Grid container>
                    <Grid
                      item
                      md={12}
                      flex
                      alignContent="center"
                      justifyContent="center"
                    >
                      <Link href="/login" variant="body2">
                        <a>Already have an account? </a>
                      </Link>
                      <div
                        className=" cursor-pointer"
                        onClick={() => doReset()}
                      >
                        Reset Form
                      </div>
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                </Box>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4, bottom: 0 }} />
        </Container>
      )}
    </>
  );
}
