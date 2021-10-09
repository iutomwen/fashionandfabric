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
import { useDispatch, useSelector } from "react-redux";
import { countBusinessUsers } from "../../features/general/generalSlice";
import LoadingBox from "./LoadingBox";
import NumberFormat from "react-number-format";

export default function TotalBusinessCustomers(props) {
  const [loading, setLoading] = useState([]);
  const dispatch = useDispatch();

  const { appError, appPending, totalBusinessUsers } = useSelector(
    (state) => state.general
  );
  useEffect(() => {
    setLoading(true);
    dispatch(countBusinessUsers());
    setLoading(false);
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
              TOTAL BUSINESS CUSTOMERS
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {appPending ? (
                <LoadingBox />
              ) : (
                <NumberFormat
                  value={totalBusinessUsers}
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
