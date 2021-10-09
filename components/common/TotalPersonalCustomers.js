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
import { useDispatch, useSelector } from "react-redux";
import { countPersonalUsers } from "../../features/general/generalSlice";
import LoadingBox from "./LoadingBox";
import NumberFormat from "react-number-format";
export default function TotalPersonalCustomers(props) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { appError, appPending, totalPersonalUsers } = useSelector(
    (state) => state.general
  );
  useEffect(() => {
    setLoading(true);
    dispatch(countPersonalUsers());
    setLoading(false);
    return () => dispatch(countPersonalUsers());
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
              TOTAL PERSONAL CUSTOMERS
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {loading ? (
                <span>loading...</span>
              ) : (
                <NumberFormat
                  value={totalPersonalUsers}
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
