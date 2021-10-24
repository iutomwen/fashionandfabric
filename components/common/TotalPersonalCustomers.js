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
import { useContext, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { Store } from "../../utils/Store";
export default function TotalPersonalCustomers(props) {
  const { state } = useContext(Store);
  const { personalUsers } = state;
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    setLoading(true);
    let isCancelled = false;
    if (!isCancelled) {
      if (personalUsers) {
        setTotalCount(
          Object.keys(personalUsers).length
            ? Object.keys(personalUsers).length
            : 0
        );
        setLoading(false);
      }
    }
    return () => {
      isCancelled = true;
    };
  }, [personalUsers]);
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
