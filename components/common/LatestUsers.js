import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "./LoadingBox";
import { setUsers } from "../../features/personal/personalSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CardHeader, Divider } from "@material-ui/core";
import Link from "next/link";

import { Badge } from "@mui/material";
import { supabase } from "../../libs/supabaseClient";

export default function LatestUsers({ userType }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true);
        let { data: user_roles, error } = await supabase
          .from("user_roles")
          .select(
            ` 
        users:user_id (id, first_name, username, last_name, phone) `
          )
          .eq("role", userType);
        if (error) throw error;
        if (user_roles) {
          dispatch(setUsers(user_roles));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getUsers();
    return () => getUsers();
  }, [userType]);

  return (
    <div style={{ maxWidth: "100%" }}>
      {loading && <LoadingBox />}
      <CardHeader title={`Latest ${userType}`} />
      <Divider className="mb-4" />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Verification(email)</TableCell>
              <TableCell align="center">Options</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {!loading &&
              users.map((data, i) => (
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
                  <TableCell align="center">{data.users?.id}</TableCell>
                  <TableCell align="center">
                    <Badge badgeContent={`verified`} color="success" />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{
                        marginLeft: 16,
                      }}
                    >
                      <Link href={`/app/${userType}/${data.users.id}/view`}>
                        <a>
                          <span className="text-xs"> View Profile</span>
                        </a>
                      </Link>
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
