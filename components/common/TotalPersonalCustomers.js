import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
const TotalPersonalCustomers = (props) => (
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
            TOTAL PERSONAL CUSTOMERS
          </Typography>
          <Typography color="textPrimary" variant="h3">
            29
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
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default TotalPersonalCustomers;
