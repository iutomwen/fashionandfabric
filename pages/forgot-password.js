import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userPasswordReset } from "../features/user/userSlice";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../components/utils/Copyright";
import MessageBox from "../components/common/MessageBox";
import ApplicationLogo from "../components/common/ApplicationLogo";

const theme = createTheme();
export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { userPasswordResetDetails, pending, userPasswordResetError } =
    useSelector((state) => state.user);

  console.log("details :", userPasswordResetDetails);
  const dispatch = useDispatch();
  const handleRest = async (e) => {
    e.preventDefault();
    dispatch(userPasswordReset({ email }));
  };

  return (
    <ThemeProvider theme={theme}>
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
              className="bg-[#995d46]"
              variant="contained"
              disabled={pending}
              sx={{ mt: 3, mb: 2 }}
            >
              <span>{pending ? "Please wait..." : "Reset Password"}</span>
            </Button>
            {userPasswordResetError?.status && (
              <MessageBox types="error">
                {userPasswordResetError?.message}
              </MessageBox>
            )}
            {userPasswordResetDetails?.message && (
              <MessageBox types="success">
                {userPasswordResetDetails.message}
              </MessageBox>
            )}
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
