import React, { useContext, useEffect, useState } from "react";
import LoadingBox from "./LoadingBox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CardHeader, Divider, Typography } from "@material-ui/core";
import Link from "next/link";
import toast from "react-hot-toast";

import { Badge } from "@mui/material";
import { supabase } from "../../libs/supabaseClient";
import { Store } from "../../utils/Store";
import Cookies from "js-cookie";
import ToastNotify from "../../libs/useNotify";

export default function LatestUsers({ userType }) {
  const { state, dispatch } = useContext(Store);
  const { businessUsers, personalUsers } = state;
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  async function resendVerification(email) {
    try {
      const { data, error } = await supabase.auth.api.resendEmailConfirmation(
        "email@example.com"
      );
      if (error) throw error;
    } catch (error) {}
  }
  let findUsers = null;
  switch (userType) {
    case "business":
      findUsers = businessUsers;
      break;
    case "personal":
      findUsers = personalUsers;
      break;

    default:
      findUsers = "";
  }
  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      async function getUsers() {
        try {
          setLoading(true);
          let { data: user_roles, error } = await supabase
            .from("user_roles")
            .select(
              ` 
  users(id, first_name, username, last_name, phone, verified) `
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
          toast.error(error.message);

          console.log(error);
        } finally {
          setLoading(false);
        }
      }

      if (!personalUsers || !businessUsers) {
        getUsers();
      }
      if (userType == "personal") {
        setUsers(personalUsers);
        setLoading(false);
      } else if (userType == "business") {
        setUsers(businessUsers);
        setLoading(false);
      }
    }
    return () => {
      isCancelled = true;
    };
  }, [findUsers]);

  return (
    <div style={{ maxWidth: "100%" }}>
      <ToastNotify />
      {loading && <LoadingBox />}
      <CardHeader title={`Latest ${userType}`} />
      <Divider className="mb-4" />

      {users?.lenght === 0 ? (
        `No ${userType} profile available`
      ) : (
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
                    <TableCell align="center">{data.users?.phone}</TableCell>
                    <TableCell align="center">
                      {data.users?.verified ? (
                        <Badge badgeContent={`verified`} color="success" />
                      ) : (
                        <div className="flex justify-evenly items-center">
                          <div>
                            <Badge
                              badgeContent={`unverified`}
                              color="warning"
                            />
                          </div>
                          <div className="ml-8 max-w-full cursor-pointer">
                            <Badge
                              badgeContent={`Resend`}
                              color="info"
                              title={`Resend verification email`}
                            />
                          </div>
                        </div>
                      )}
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
      )}
    </div>
  );
}
