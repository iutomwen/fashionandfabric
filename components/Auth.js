import { useState } from "react";
import { supabase } from "../libs/supabaseClient";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "./utils/Copyright";

const theme = createTheme();
export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const data = new FormData(event.currentTarget);

      //   const { error } = await supabase.auth.signIn({ email });
      const { user, session, error } = await supabase.auth.signIn({
        email: data.get("email"),
        password: data.get("email"),
      });
      if (error) {
        alert("Error with auth: " + error.message);
      }
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    // <div className="row flex flex-center">
    //   <div className="col-6 form-widget">
    //     <h1 className="header">Supabase + Next.js</h1>
    //     <p className="description">
    //       Sign in via magic link with your email below
    //     </p>
    //     <div>
    //       <input
    //         className="inputField"
    //         type="email"
    //         placeholder="Your email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <button
    //         onClick={(e) => {
    //           e.preventDefault();
    //           handleLogin(email);
    //         }}
    //         className="button block"
    //         disabled={loading}
    //       >
    //         <span>{loading ? "Loading" : "Send magic link"}</span>
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
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
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              <span>{loading ? "Loading" : "Sign In"}</span>
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="forget-password" variant="body2">
                  Forgot password?
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
  );
}
