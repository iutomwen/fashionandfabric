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
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { supabase } from "../../libs/supabaseClient";
export default function TotalPersonalCustomers(props) {
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    setLoading(true);
    async function countItem() {
      try {
        const {
          data: user_roles,
          error,
          count,
        } = await supabase
          .from("user_roles")
          .select(
            ` id,
    users(id) `,
            { count: "exact", head: true }
          )
          .eq("role", "personal");
        console.log("object", user_roles);
        if (error) throw error;
        setTotalCount(count);
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
              PERSONAL USERS
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
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
