import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  loadFromLocal,
  userLogin,
  userRegistration,
} from "../features/user/userSlice";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "./utils/Copyright";
import MessageBox from "./common/MessageBox";
import ApplicationLogo from "./common/ApplicationLogo";
import { supabase } from "../libs/supabaseClient";
import LoadingBox from "../components/common/LoadingBox";

const theme = createTheme();
export default function Register() {
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const session = supabase.auth.session();

  const { userInfo, userSession, pending, errorLog } = useSelector(
    (state) => state.user
  );
  console.log("info :", userInfo);
  console.log("session :", userSession);
  console.log("error :", errorLog);
  function isValidEmailAddress(address) {
    return !!address.match(/.+@.+/);
  }
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
    dispatch(userRegistration({ email, password }));
    setFormError({});
    dispatch(userLogin({ email, password }));
    if (userSession.user) {
      router.push("/app/dashboard");
    }
  };
  useEffect(() => {
    setLoading(true);
    if (session) {
      //fill redux with local storage
      dispatch(loadFromLocal({ session }));
    }
    if (userInfo && userSession.user && session) {
      router.push("/app/dashboard");
      console.log("allowed to pass");
      setLoading(false);
    }
    setLoading(false);
  }, [session, userInfo]);

  return (
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
              Register Here
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
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              <Button
                type="submit"
                fullWidth
                className="bg-[#995d46]"
                variant="contained"
                disabled={pending}
                sx={{ mt: 3, mb: 2 }}
              >
                <span>{pending ? "Loading" : "Sign Up"}</span>
              </Button>
              {errorLog?.status && (
                <MessageBox types="error"> {errorLog.message} </MessageBox>
              )}
              {formError.emailError && (
                <MessageBox types="warning">{formError.emailError}</MessageBox>
              )}
              {!errorLog && (
                <MessageBox types="success">
                  {`Thanks for registering, now check your email to complete the process.`}
                </MessageBox>
              )}
              <Grid container>
                <Grid item xs>
                  <Link href="/login" variant="body2">
                    <a>Already have an account? </a>
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
  );
}
