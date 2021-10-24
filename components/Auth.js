import { useContext, useEffect, useState } from "react";
import { APPNAME } from "../libs/constant";
import Head from "next/head";
import { supabase } from "../libs/supabaseClient";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "./utils/Copyright";
import ApplicationLogo from "./common/ApplicationLogo";
import LoadingBox from "./common/LoadingBox";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ToastNotify from "../libs/useNotify";

export default function Auth() {
  const { state, dispatch } = useContext(Store);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { accountDetails, accountSession } = state;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (accountDetails && accountSession) {
      toast.loading("Please wait while we load up the app");

      router.push("/app/dashboard");
      return;
    }
    setLoading(false);
    return () => {
      !accountDetails;
      !accountSession;
    };
  }, [accountDetails, accountSession]);

  const handleLogin = async ({ email, password }) => {
    setPending(true);
    try {
      const { user, session, error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) throw error;
      if (user) {
        const { id } = user;
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", id)
          .single();
        const { role } = data;

        if (role === "personal" || role === "business") {
          const { error } = await supabase.auth.signOut();
          Cookies.remove("accountDetails");
          Cookies.remove("accountSession");
          dispatch({ type: "USER_LOGOUT" });
          localStorage.clear();
          setPending(false);
          toast.error(
            "This account has no permission to access this dashboard!"
          );

          return;
        }
        let { data: users } = await supabase
          .from("users")
          .select("*")
          .eq("id", id)
          .single();

        dispatch({ type: "ACCOUNTSESSION", payload: session });
        Cookies.set("accountSession", JSON.stringify(session));
        dispatch({ type: "ACCOUNTDETAILS", payload: users });
        Cookies.set("accountDetails", JSON.stringify(users));
      }
      return { error, user, session };
    } catch (error) {
      toast.error(error.message || error.error_description, {
        duration: 4000,
        position: "top-center",
      });
      return;
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <Head>
        <title>{APPNAME} - Login</title>
        <link rel="icon" href="/favicon.ico" />{" "}
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
              Sign in
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
                        autoFocus
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
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        inputProps={{ type: "password" }}
                        autoComplete="current-password"
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
              </Grid>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                className="bg-[#995d46] border"
                variant="contained"
                disabled={pending}
                sx={{ mt: 3, mb: 2 }}
              >
                <span>{pending ? "Loading" : "Sign In"}</span>
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="/forgot-password" variant="body2">
                    <a>Forgot password? </a>
                  </Link>
                </Grid>
                <Grid item></Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4, bottom: 0 }} />
        </Container>
      )}
    </>
  );
}
