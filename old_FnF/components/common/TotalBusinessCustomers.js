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
import { useContext, useEffect, useState } from "react";

import NumberFormat from "react-number-format";
import { supabase } from "../../libs/supabaseClient";
import { Store } from "../../utils/Store";

export default function TotalBusinessCustomers(props) {
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const { state } = useContext(Store);
  const { businessUsers } = state;

  useEffect(() => {
    setLoading(true);
    let isCancelled = false;
    if (!isCancelled) {
      if (businessUsers) {
        setTotalCount(
          Object.keys(businessUsers).length
            ? Object.keys(businessUsers).length
            : 0
        );
        setLoading(false);
      }
    }
    return () => {
      isCancelled = true;
    };
  }, [businessUsers]);
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
            <Typography color="textSecondary" gutterBottom variant="h6">
              BUSINESS USERS
            </Typography>
            <Typography color="textPrimary" variant="h6">
              {loading ? (
                <span>loading...</span>
              ) : (
                <NumberFormat
                  value={totalCount}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              )}
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
}
