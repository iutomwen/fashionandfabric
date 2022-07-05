import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import toast from "react-hot-toast";
import { supabase } from "../../libs/supabaseClient";

export default function UserSettings({ settings, userID }) {
  const user_settings = settings.length;

  console.log("setting: ", user_settings);
  const [setting, setSetting] = React.useState();
  const [count, setCount] = React.useState(0);
  const updateUserSettings = async () => {
    try {
      const { data, error } = await supabase.from("user_settings").upsert([
        {
          user_id: userID,
          created_at: new Date(),
          updated_at: new Date(),
          newsletter: false,
          twofactor: false,
          login_notify: false,
        },
      ]);

      if (error) throw error;

      if (data) {
        setSetting(data);
        setCount(1);
        toast.success("settings registered..");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  React.useEffect(() => {
    setCount(user_settings);
  }, [settings]);
  React.useEffect(() => {
    if (user_settings === 0) {
      updateUserSettings();
    }
  }, [user_settings]);
  console.log("state: ", count);
  return (
    <Card raised sx={{ minWidth: "100%" }}>
      <CardContent>
        <Typography variant="h4" color="text.secondary" gutterBottom>
          Notifications
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item md={6} xs={12}>
              <Typography variant="h6" sx={{ fontWeight: "semi" }}>
                System
              </Typography>
              <Typography sx={{ fontSize: 14 }}>
                You will receive emails in your business email address
              </Typography>
              <FormGroup sx={{ p: 4 }}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Email Alert"
                />
                <FormControlLabel
                  disabled
                  control={<Checkbox />}
                  label="Push Notification"
                />
                <FormControlLabel
                  disabled
                  control={<Checkbox />}
                  label="Text Message"
                />
              </FormGroup>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h6" sx={{ fontWeight: "semi" }}>
                Message App
              </Typography>
              <Typography sx={{ fontSize: 14 }}>
                You will receive emails in your business email address
              </Typography>
              <FormGroup sx={{ p: 4 }}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Email Alert"
                />
                <FormControlLabel
                  disabled
                  control={<Checkbox />}
                  label="Push Notification"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <CardActions sx={{ pl: 4 }}>
        <Button size="small">Save Settings</Button>
      </CardActions>
    </Card>
  );
}
