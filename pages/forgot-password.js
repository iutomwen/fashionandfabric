import Head from "next/head";
import { APPNAME } from "../libs/constant";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../components/utils/Copyright";
import MessageBox from "../components/common/MessageBox";
import ApplicationLogo from "../components/common/ApplicationLogo";
import { supabase } from "../libs/supabaseClient";
import { Store } from "../utils/Store";
import LoadingBox from "../components/common/LoadingBox";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";
export default function Auth() {
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

  // const [error, setError] = useState(null);
  // const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [pending, setPending] = useState(false);
  const { vertical, horizontal, open } = openState;
  const handleClick = (newState) => {
    setOpenState({ open: true, ...newState });
  };

  const handleClose = (event, reason, newState) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenState({ open: false, ...newState });
  };
  useEffect(() => {
    setLoading(true);
    if (accountDetails && accountSession) {
      router.push("/app/dashboard");
      return;
    }
    setLoading(false);
    return () => {
      !accountDetails;
      !accountSession;
    };
  }, []);
  const handleRestPassword = async ({ email }) => {
    setPending(true);
    try {
      const { data, error } = await supabase.auth.api.resetPasswordForEmail(
        email
      );
      if (error) throw error;
      if (data) {
        handleClick({ vertical: "bottom", horizontal: "center" });
        setMessage({
          message: "A reset mail has been sent",
          status: 200,
          type: "success",
        });
        console.log(data);
      }
    } catch (error) {
      handleClick({ vertical: "bottom", horizontal: "center" });
      setMessage({
        message: error.message || error.error_description,
        status: 404,
        type: "warning",
      });
    } finally {
      setPending(false);
    }
  };
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
        <title>{APPNAME} - Password Reset</title>
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
              Reset Password
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(handleRestPassword)}
              noValidate
              sx={{ mt: 1 }}
            >
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
                    autoComplete="email"
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={pending}
                sx={{ mt: 3, mb: 2 }}
              >
                <span>{pending ? "Please wait..." : "Reset Password"}</span>
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="/login" variant="body2">
                    <a>Login?</a>
                  </Link>
                </Grid>
                <Grid item>{""}</Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4, bottom: 0 }} />
        </Container>
      )}
    </>
  );
}
