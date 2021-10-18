import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { APPNAME } from "../libs/constant";
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
import MessageBox from "./common/MessageBox";
import ApplicationLogo from "./common/ApplicationLogo";
import { supabase } from "../libs/supabaseClient";
import LoadingBox from "../components/common/LoadingBox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Store } from "../utils/Store";
import { Controller, useForm } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

export default function Register() {
  const { state, dispatch } = useContext(Store);
  const { accountDetails, accountSession } = state;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [openState, setOpenState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [pending, setPending] = useState(false);
  const { vertical, horizontal, open } = openState;
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [email, setEmail] = useState("");
  // const [formError, setFormError] = useState({});
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [role, setRole] = useState("");
  // const [password, setPassword] = useState("");
  const router = useRouter();
  const handleClick = (newState) => {
    setOpenState({ open: true, ...newState });
  };

  const handleClose = (event, reason, newState) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenState({ open: false, ...newState });
  };
  const handleLogin = async ({
    email,
    firstName,
    lastName,
    role,
    password,
  }) => {
    dispatch({ type: "USER_REGISTER" });
    try {
      const { user, session, error } = await supabase.auth.signUp(
        {
          email: email,
          password: password,
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
      const { app: data, errors } = await supabase
        .from("user_roles")
        .update({ role: role })
        .eq("user_id", user.id);
      if (role === "personal" || role === "business") {
        supabase.auth.signOut();
        console.log("block login");
        dispatch({ type: "USER_LOGOUT" });
        localStorage.clear();
        handleClick({ vertical: "bottom", horizontal: "center" });
        setMessage({
          message: "Account Created",
          status: 201,
          type: "success",
        });
        return;
      }

      if (role == "staff") {
        let { data: users } = await supabase
          .from("users")
          .select("*")
          .eq("id", id)
          .single();
        setMessage(null);
        dispatch({ type: "ACCOUNTSESSION", payload: session });
        dispatch({ type: "ACCOUNTDETAILS", payload: users });
        console.log("admin pass");
        // router.push("/app/dashboard");
      }
    } catch (error) {
      handleClick({ vertical: "bottom", horizontal: "center" });
      setMessage({
        message: error.message || error.error_description,
        status: 400,
        type: "warning",
      });
    } finally {
    }
  };
  useEffect(() => {
    setLoading(true);

    if (accountDetails && accountSession) {
      console.log("allow");
      //router.push("/app/dashboard");
    }
    setLoading(false);
    return () => {
      !accountDetails;
      !accountSession;
    };
  }, [accountDetails, accountSession]);
  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <>
      <Head>
        <title>{APPNAME} - Login</title>
        <link rel="icon" href="/favicon.ico" />{" "}
      </Head>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleClose}
          severity={message?.type}
          sx={{ width: "100%" }}
        >
          {message?.message}
        </Alert>
      </Snackbar>
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
              onSubmit={handleSubmit(handleLogin)}
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
                  <InputLabel id="role">Role</InputLabel>
                  <Controller
                    name="role"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 1,
                    }}
                    render={({ field }) => (
                      <Select
                        fullWidth
                        labelId="role"
                        id="role"
                        label="Role"
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
                        <MenuItem value={`personal`}>Personal</MenuItem>
                        <MenuItem value={`business`}>Business</MenuItem>
                        <MenuItem value={`staff`}>Staff</MenuItem>
                      </Select>
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

                <Grid container>
                  <Grid item xs>
                    <Link href="/login" variant="body2">
                      <a>Already have an account? </a>
                    </Link>
                  </Grid>
                  <Grid item></Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4, bottom: 0 }} />
        </Container>
      )}
    </>
  );
}
