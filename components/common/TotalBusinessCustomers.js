import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
const TotalBusinessCustomers = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid
        className="justify-between"
        container
        spacing={3}
        sx={{ justifyContent: "space-between" }}
      >
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            TOTAL BUSINESS CUSTOMERS
          </Typography>
          <Typography color="textPrimary" variant="h3">
            10
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: green[600],
              height: 56,
              width: 56,
            }}
          >
            <BusinessCenterIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default TotalBusinessCustomers;
