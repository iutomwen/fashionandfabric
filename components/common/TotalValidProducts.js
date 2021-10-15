import React from "react";
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

function TotalValidProducts(props) {
  return (
    <Card {...props}>
      <CardContent>
        <Grid
          className="justify-between"
          container
          spacing={3}
          sx={{ justifyContent: "space-between" }}
        >
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h5">
              TOTAL PRODUCTS
            </Typography>
            <Typography color="textPrimary" variant="h6">
              1,600
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
              <ProductionQuantityLimitsIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default TotalValidProducts;
