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
import { Badge, Button, CardHeader, Divider } from "@mui/material";

export default function LatestUsers() {
  const [rows, setRows] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { personError, personPending, personalAccounts } = useSelector(
    (state) => state.personal
  );
  useEffect(() => {
    dispatch(getAllPersonal());
    return () => dispatch(getAllPersonal());
  }, []);

  return (
    <div style={{ maxWidth: "100%" }}>
      {personPending && <LoadingBox />}
      <CardHeader title="Latest Users" />
      <Divider className="mb-4" />

      <TableContainer component={Paper}>
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
            {!personPending &&
              personalAccounts.map((data, i) => (
                <TableRow
                  key={i}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {data.users?.first_name}
                  </TableCell>
                  <TableCell align="center">{data.users?.last_name}</TableCell>
                  <TableCell align="center">{data.users?.username}</TableCell>
                  <TableCell align="center">{data.users?.phone}</TableCell>
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
      </TableContainer>
    </div>
  );
}
