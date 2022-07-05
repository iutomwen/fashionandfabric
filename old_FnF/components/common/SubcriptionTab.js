import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import MoneyIcon from "@material-ui/icons/Money";
import { red } from "@material-ui/core/colors";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../utils/Store";
const SubcriptionTab = (props) => {
  const { state } = useContext(Store);
  const { appSubcriptions } = state;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(appSubcriptions.length);
  }, [appSubcriptions]);

  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid
          className="justify-between"
          container
          spacing={3}
          sx={{ justifyContent: "space-between" }}
        >
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              SUBCRIPTIONS
            </Typography>
            <Typography color="textPrimary" variant="h6">
              {total}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: red[600],
                height: 56,
                width: 56,
              }}
            >
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SubcriptionTab;
