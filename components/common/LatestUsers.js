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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const renderDetailsButton = (params) => {
  return (
    <strong>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginLeft: 16 }}
        onClick={() => {
          alert(params.row.id);
        }}
      >
        More Info
      </Button>
    </strong>
  );
};

export default function LatestUsers() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState([]);
  const dispatch = useDispatch();
  const { personError, personPending, personalAccounts } = useSelector(
    (state) => state.personal
  );
  console.log(personalAccounts);
  useEffect(() => {
    setLoading(true);
    dispatch(getAllPersonal());
    setRows(JSON.parse(localStorage.getItem("personalAccounts")));
    setLoading(false);
  }, []);
  async function loadLocal() {
    const personal = await localStorage.getItem("personalAccounts");
    return personal;
  }
  return (
    <div className="mt-10" style={{ height: 400, maxWidth: "100%" }}>
      <CardHeader title="Latest Users" />
      <Divider className="mb-4" />

      <TableContainer component={Paper}>
        {loading ? (
          <LoadingBox />
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows?.map((row) => (
                <TableRow
                  key={row?.users?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row?.users?.first_name}
                  </TableCell>
                  <TableCell align="center">{row?.users?.last_name}</TableCell>
                  <TableCell align="center">{row?.users?.username}</TableCell>
                  <TableCell align="center">{row?.users?.phone}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{ marginLeft: 16 }}
                      onClick={() => {}}
                    >
                      More Info
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
