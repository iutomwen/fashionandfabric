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
import Link from "next/link";
import { Button, CardHeader, Divider } from "@material-ui/core";
import { DeleteForeverOutlined } from "@material-ui/icons";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function LatestOrders() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState([]);
  const dispatch = useDispatch();
  const { personError, personPending, personalAccounts } = useSelector(
    (state) => state.personal
  );
  useEffect(() => {
    setLoading(true);
    dispatch(getAllPersonal());
    setLoading(false);
  }, [dispatch, rows]);
  return (
    <div style={{ height: 400, maxWidth: "100%" }}>
      <CardHeader title="Latest Products" />
      <Divider className="mb-4" />
      <TableContainer component={Paper}>
        {Object.keys(personPending).length > 0 && personPending ? (
          <LoadingBox />
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Store</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Object.keys(personalAccounts).length > 0 &&
                personalAccounts?.map((row) => (
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
                    <TableCell align="center">{row?.users?.phone}</TableCell>
                    <TableCell align="center">
                      <div className="flex">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ marginLeft: 16 }}
                          onClick={() => {}}
                        >
                          <Link href={`/app/product/${row.users.id}/view`}>
                            <a>View</a>
                          </Link>
                        </Button>
                        <Button
                          startIcon={<DeleteForeverOutlined size={10} />}
                          variant="outlined"
                          color="secondary"
                          size="small"
                          style={{ marginLeft: 16 }}
                          onClick={() => {}}
                        >
                          <Link href={`/app/product/${row.users.id}/delete`}>
                            <a>Remove</a>
                          </Link>
                        </Button>
                      </div>
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
