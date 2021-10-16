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

export default function Auth() {
  const { state, dispatch } = useContext(Store);
  const { accountDetails, accountSession } = state;
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [pending, setPending] = useState(false);
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
  const handleRestPassword = async (e) => {
    e.preventDefault();
    setPending(true);
    try {
      const { data, error } = await supabase.auth.api.resetPasswordForEmail(
        email
      );
      if (error) throw error;
      if (data) {
        setMessage({
          message: "A reset mail has been sent",
          status: 200,
          type: "success",
        });
        console.log(data);
      }
    } catch (error) {
      setMessage({
        message: error.message || error.error_description,
        status: 404,
        type: "warning",
      });
    } finally {
      setEmail("");
      setPending(false);
    }
  };

  return (
    <>
      <Head>
        <title>{APPNAME} - Password Reset</title>
        <link rel="icon" href="/favicon.ico" />{" "}
      </Head>
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
              onSubmit={handleRestPassword}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
              />

              <Button
                type="submit"
                fullWidth
                className="bg-[#995d46]"
                variant="contained"
                disabled={pending}
                sx={{ mt: 3, mb: 2 }}
              >
                <span>{pending ? "Please wait..." : "Reset Password"}</span>
              </Button>
              {message?.status && (
                <MessageBox types={message.type}>{message?.message}</MessageBox>
              )}

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
