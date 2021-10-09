import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "./LoadingBox";
import { getAllPersonal } from "../../features/personal/personalSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CardHeader, Divider } from "@material-ui/core";
import { Badge } from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function LatestUsers() {
  const [rows, setRows] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { personError, personPending, personalAccounts } = useSelector(
    (state) => state.personal
  );
  useEffect(() => {
    setLoading(true);
    dispatch(getAllPersonal());
    setRows(personalAccounts);
    setLoading(false);
    return () => {
      dispatch(getAllPersonal());
      personalAccounts;
      rows;
      console.log("clean up user..");
    };
  }, [rows]);

  return (
    <div style={{ maxWidth: "100%" }}>
      <CardHeader title="Latest Users" />
      <Divider className="mb-4" />
      {personError && <p>There was an error loading this component</p>}
      <TableContainer component={Paper}>
        {loading && loading ? (
          <LoadingBox />
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Verification(email)</TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows &&
                rows?.map((row) => (
                  <TableRow
                    key={row?.users?.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row?.users?.first_name}
                    </TableCell>
                    <TableCell align="center">
                      {row?.users?.last_name}
                    </TableCell>
                    <TableCell align="center">{row?.users?.username}</TableCell>
                    <TableCell align="center">{row?.users?.phone}</TableCell>
                    <TableCell align="center">
                      <Badge badgeContent={`verified`} color="success" />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16 }}
                        onClick={() => {}}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
}
