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

const SubcriptionTab = (props) => (
  <Card sx={{ height: "100%" }} {...props}>
    <CardContent>
      <Grid
        className="justify-between"
        container
        spacing={3}
        sx={{ justifyContent: "space-between" }}
      >
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h5">
            SUBCRIPTIONS
          </Typography>
          <Typography color="textPrimary" variant="h6">
            $24,000
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

export default SubcriptionTab;
