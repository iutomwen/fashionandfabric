import { useState } from "react";
import { supabase } from "../libs/supabaseClient";
import { useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../components/utils/Copyright";
import { userLogin } from "../features/user/userSlice";

const theme = createTheme();
export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const handleRest = async (event) => {
    event.preventDefault();
    dispatch(userLogin(userData));
    try {
      setLoading(true);
      console.log(email);
      const { data, error } = await supabase.auth.api.resetPasswordForEmail(
        email
      );

      if (error) {
        alert("Error : " + error.message);
      }
    } catch (error) {
      alert(error.msg || error.msg);
    } finally {
      setLoading(false);
    }
  };

  return (
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
            Reset Password
          </Typography>
          <Box component="form" onSubmit={handleRest} noValidate sx={{ mt: 1 }}>
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
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              <span>{loading ? "Loading" : "Reset Password"}</span>
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  <a>Login?</a>
                </Link>
              </Grid>
              <Grid item>{""}</Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4, bottom: 0 }} />
      </Container>
    </ThemeProvider>
  );
}
