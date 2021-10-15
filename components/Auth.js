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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "./utils/Copyright";
import MessageBox from "./common/MessageBox";
import ApplicationLogo from "./common/ApplicationLogo";
import LoadingBox from "./common/LoadingBox";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";

const theme = createTheme();
export default function Auth() {
  const { state, dispatch } = useContext(Store);
  const { accountDetails, accountSession } = state;
  const [error, setError] = useState(null);
  const router = useRouter();
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function isValidEmailAddress(address) {
    return !!address.match(/.+@.+/);
  }

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
  }, [accountDetails, accountSession]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setPending(true);
    if (!password || !email) {
      setFormError({
        emailError: "Please Enter Email and Password to continue.",
        passwordError: "",
      });
      return;
    }
    if (!isValidEmailAddress(email)) {
      setFormError({
        emailError: "Invalid Email Address",
        passwordError: "",
      });
      return;
    }
    try {
      const { user, session, error } = await supabase.auth.signIn({
        email: email,
        password: password,
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
          setError({ message: "No access allowed.", status: 401 });
          return;
        }
        let { data: users } = await supabase
          .from("users")
          .select("*")
          .eq("id", id)
          .single();
        setError(null);
        dispatch({ type: "ACCOUNTSESSION", payload: session });
        dispatch({ type: "ACCOUNTDETAILS", payload: users });
      }
      return { error, user, session };
    } catch (error) {
      setError({
        message: error.message || error.error_description,
        status: 400,
      });
      return;
    } finally {
      setPending(false);
      setFormError({});
    }
  };

  return (
    <>
      <Head>
        <title>{APPNAME} - Login</title>
        <link rel="icon" href="/favicon.ico" />{" "}
      </Head>
      <ThemeProvider theme={theme}>
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
                onSubmit={handleLogin}
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  className="bg-[#995d46]"
                  variant="contained"
                  disabled={pending}
                  sx={{ mt: 3, mb: 2 }}
                >
                  <span>{pending ? "Loading" : "Sign In"}</span>
                </Button>
                {error?.status && (
                  <MessageBox types="error"> {error.message}</MessageBox>
                )}
                {formError.emailError && (
                  <MessageBox types="warning">
                    {formError.emailError}
                  </MessageBox>
                )}
                <Grid container>
                  <Grid item xs>
                    <Link href="/forgot-password" variant="body2">
                      <a>Forgot password? </a>
                    </Link>
                  </Grid>
                  <Grid item>
                    {/* <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4, bottom: 0 }} />
          </Container>
        )}
      </ThemeProvider>
    </>
  );
}
