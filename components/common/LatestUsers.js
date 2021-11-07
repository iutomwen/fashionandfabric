import React, { useContext, useEffect, useState } from "react";
import LoadingBox from "./LoadingBox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@material-ui/core";
import Link from "next/link";

import { Badge } from "@mui/material";
import { supabase } from "../../libs/supabaseClient";
import { Store } from "../../utils/Store";
import ToastNotify from "../../libs/useNotify";
import { Delete } from "react-feather";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/router";
import CustomBadge from "./CustomBadge";
export default function LatestUsers({ userType }) {
  const { state } = useContext(Store);
  const { businessUsers, personalUsers } = state;
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const route = useRouter();
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
                users?.slice(0, 3).map((user, i) => (
                  <TableRow
                    key={i}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <div className="flex space-x-2">
                        {user?.isdeleted && (
                          <Delete className="items-center mr-2 text-red-500 fill-current" />
                        )}
                        {user?.first_name}
                      </div>
                    </TableCell>
                    <TableCell align="center">{user?.last_name}</TableCell>
                    <TableCell align="center">{user?.username}</TableCell>
                    <TableCell align="center">{user?.phone}</TableCell>
                    <TableCell align="center">
                      {user?.verified ? (
                        <CustomBadge
                          text="verified"
                          className="bg-green-600 w-1/2"
                        />
                      ) : (
                        <div className="flex items-center justify-evenly">
                          <div>
                            <CustomBadge
                              text="unverified"
                              className="bg-yellow-600"
                            />
                          </div>
                          <div className="max-w-full ml-2 cursor-pointer">
                            <CustomBadge
                              text="Resend"
                              className="bg-blue-600"
                            />
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() =>
                          route.push(`/app/${userType}/${user?.id}`)
                        }
                        startIcon={<VisibilityIcon />}
                        variant="text"
                        color="primary"
                        size="small"
                        style={{
                          marginLeft: 15,
                        }}
                      >
                        <span className="text-xs"> View Profile</span>
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
