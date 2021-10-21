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
import { useEffect, useState } from "react";

import NumberFormat from "react-number-format";
import { supabase } from "../../libs/supabaseClient";

export default function TotalBusinessCustomers(props) {
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    async function countItem() {
      try {
        const { data: error, count } = await supabase
          .from("user_roles")
          .select(
            ` *,
    users (id) `,
            { count: "exact", head: true }
          )
          .eq("role", "business");
        if (error) throw error;
        if (count) {
          setTotalCount(count);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    countItem();
    // return () => {
    //   !count;
    // };
  }, []);
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
