import { useEffect, useState } from "react";
import { APPNAME } from "../libs/constant";
import Head from "next/head";
import { supabase } from "../libs/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import {
  loadFromLocal,
  logoutUser,
  userLogin,
} from "../features/user/userSlice";
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

const theme = createTheme();
export default function Auth() {
  if (typeof window !== "undefined") {
    console.log("Rendering on browser or client");
  } else {
    console.log("Rendering on server");
  }
  if (typeof window !== "undefined") {
    const data = JSON.parse(localStorage.getItem("userInfo"));
    localStorage.setItem("username", "Joe Smith");
  }
  const router = useRouter();
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo, userSession, pending, errorLog } = useSelector(
    (state) => state.user
  );
  // console.log(userSession);
  const dispatch = useDispatch();
  function isValidEmailAddress(address) {
    return !!address.match(/.+@.+/);
  }
  const session = supabase.auth.session();
  useEffect(() => {
    setLoading(true);
    if (!session) {
      dispatch(logoutUser());
      console.log("user signed out");
      setLoading(false);
    }
    if (session) {
      //fill redux with local storage
      dispatch(loadFromLocal({ session }));

      if (userSession && session) {
        router.push("/app/dashboard");
        setLoading(false);

        console.log("Allowed to pass");
      }
    }
    setLoading(false);
  }, [session, userSession]);

  const handleLogin = (e) => {
    e.preventDefault();
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
    dispatch(userLogin({ email, password }));
    if (userSession) {
      router.push("/app/dashboard");
    }

    // setFormError({});
  };

  return (
    <>
      <Head>
        <title>{APPNAME} - Login</title>
        <link rel="icon" href="/favicon.ico" />{" "}
      </Head>
      <ThemeProvider theme={theme}>
        {loading && <LoadingBox />}
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
                disabled={pending || loading}
                sx={{ mt: 3, mb: 2 }}
              >
                <span>{pending || loading ? "Loading" : "Sign In"}</span>
              </Button>
              {errorLog?.status && (
                <MessageBox types="error">
                  {" "}
                  {errorLog.message || errorLog.error_description}{" "}
                </MessageBox>
              )}
              {formError.emailError && (
                <MessageBox types="warning">{formError.emailError}</MessageBox>
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
      </ThemeProvider>
    </>
  );
}
