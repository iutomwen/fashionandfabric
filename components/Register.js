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

export default function Register() {
  const { state, dispatch } = useContext(Store);
  const { accountDetails, accountSession } = state;
  const [pending, setPending] = useState(false);

  const [formError, setFormError] = useState({});
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function isValidEmailAddress(address) {
    return !!address.match(/.+@.+/);
  }
  const handleLogin = async (e) => {
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
      setMessage({
        message: error.message || error.error_description,
        status: 400,
        type: "warning",
      });
    } finally {
      setFormError({});
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

  return (
    <>
      <Head>
        <title>{APPNAME} - Login</title>
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
              {message?.status && (
                <MessageBox types={message.type}>
                  {" "}
                  {message.message}{" "}
                </MessageBox>
              )}
              {formError.emailError && (
                <MessageBox types="warning">{formError.emailError}</MessageBox>
              )}
              <Grid container>
                <Grid item xs>
                  <Link href="/login" variant="body2">
                    <a>Already have an account? </a>
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
