import React, { useContext, useEffect, useState } from "react";
import LoadingBox from "./LoadingBox";
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
import { Store } from "../../utils/Store";
import Cookies from "js-cookie";

export default function LatestUsers({ userType }) {
  const { state, dispatch } = useContext(Store);
  const { businessUsers, personalUsers } = state;
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    // async function getUsers() {
    //   try {
    //     setLoading(true);
    //     let { data: user_roles, error } = await supabase
    //       .from("user_roles")
    //       .select(
    //         `
    //     users(id, first_name, username, last_name, phone) `
    //       )
    //       .eq("role", userType)
    //       .order("id", { ascending: false });
    //     if (error) throw error;
    //     if (user_roles) {
    //       setUsers(user_roles);
    //     }
    //   } catch (error) {
    //     setErrors(error);
    //     console.log(error);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    // getUsers();
    async function getUsers() {
      try {
        setLoading(true);
        let { data: user_roles, error } = await supabase
          .from("user_roles")
          .select(
            ` 
  users(id, first_name, username, last_name, phone) `
          )
          .eq("role", userType)
          .order("id", { ascending: false });
        if (error) throw error;
        if (user_roles) {
          if (userType == "personal") {
            dispatch({ type: "LOAD_ALL_PERSONAL", payload: user_roles });
            Cookies.set("personalUsers", JSON.stringify(user_roles));
          }
          if (userType == "business") {
            dispatch({ type: "LOAD_ALL_BUSINESS", payload: user_roles });
            Cookies.set("businessUsers", JSON.stringify(user_roles));
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (!personalUsers || !businessUsers) {
      getUsers();
    }
    // console.log(userType);
    if (userType == "personal") {
      setUsers(personalUsers);
      // console.log("u", personalUsers);
      // console.log("su", users);
      setLoading(false);
    } else if (userType == "business") {
      setUsers(businessUsers);
      // console.log("p", businessUsers);
      setLoading(false);
    }
  }, [personalUsers]);

  return (
    <div style={{ maxWidth: "100%" }}>
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
            {errors
              ? errors.message
              : !loading &&
                users &&
                users?.map((data, i) => (
                  <TableRow
                    key={i}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {data.users?.first_name}
                    </TableCell>
                    <TableCell align="center">
                      {data.users?.last_name}
                    </TableCell>
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
                        <Link href={`/app/${userType}/${data.users?.id}/view`}>
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
