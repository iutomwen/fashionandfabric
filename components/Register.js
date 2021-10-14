import { useEffect, useState } from "react";
import Head from "next/head";
import { APPNAME } from "../libs/constant";
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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const theme = createTheme();
export default function Register() {
  const [formError, setFormError] = useState({});
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const session = supabase.auth.session();

  const { userInfo, userSession, pending, errorLog } = useSelector(
    (state) => state.user
  );
  // console.log("info :", userInfo);
  console.log("session :", userSession);
  // console.log("error :", errorLog);
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
    dispatch(userRegistration({ email, password, role, firstName, lastName }));
    setFormError({});
    if (role == "staff") {
      dispatch(userLogin({ email, password }));
      if (userSession.user) {
        router.push("/app/dashboard");
      }
    } else {
      setMsg("Account Created");
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
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="firstName"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="lastName"
                  autoFocus
                />
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
                <InputLabel id="role-select-input">Role</InputLabel>
                <Select
                  required
                  fullWidth
                  labelId="role"
                  id="role-select"
                  value={role}
                  label="Role"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value={`personal`}>Personal</MenuItem>
                  <MenuItem value={`business`}>Business</MenuItem>
                  <MenuItem value={`staff`}>Staff</MenuItem>
                </Select>
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
                  <MessageBox types="warning">
                    {formError.emailError}
                  </MessageBox>
                )}
                {!errorLog && (
                  <MessageBox types="success">
                    {`Thanks for registering, now check your email to complete the process.`}
                  </MessageBox>
                )}
                {msg && <MessageBox types="success">{msg}</MessageBox>}
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
    </>
  );
}
