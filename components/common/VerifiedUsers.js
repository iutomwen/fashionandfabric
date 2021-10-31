import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import toast from "react-hot-toast";
import { supabase } from "../../libs/supabaseClient";
import LoadingBox from "./LoadingBox";
import { Badge, Button, TextField } from "@mui/material";
import Link from "next/link";

const columns = [
  { id: "first_name", label: "First Name", minWidth: 170 },
  { id: "last_name", label: "Last Name", minWidth: 170 },
  {
    id: "username",
    filter: true,
    label: "Email",
    minWidth: 170,
  },
  {
    id: "phone",
    label: "Phone Number",
    minWidth: 170,
  },
  {
    id: "verified",
    label: "Verification",
    minWidth: 170,
  },
  {
    id: "options",
    label: "Options",
    minWidth: 170,
  },
];

export default function VerifiedUsers({ userType }) {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    setLoading(true);
    let isCancelled = false;
    if (!isCancelled) {
      getVerified(userType, search);
    }
    setLoading(false);
    return () => (isCancelled = true);
  }, [search]);
  async function getVerified(userType, search) {
    try {
      let { data: verified, error } = await supabase
        .from("users")
        .select(`id, first_name, username, last_name, phone, verified, roles  `)
        .filter("roles", "eq", userType)
        .filter("verified", "eq", true)
        .ilike("first_name", `%${search}%`)
        .order("id", { ascending: false });
      if (error) throw error;
      if (verified) {
        setRows(verified);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {loading ? (
        <LoadingBox />
      ) : (
        <>
          <TextField
            id="standard-basic"
            label="Search..."
            variant="standard"
            fullWidth
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            sx={{ mb: 2, pl: 1 }}
          />
          <TableContainer sx={{ maxHeight: "95%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell>{row?.first_name}</TableCell>
                        <TableCell>{row?.last_name}</TableCell>
                        <TableCell>{row?.username}</TableCell>
                        <TableCell>{row?.phone}</TableCell>
                        <TableCell align="center">
                          {" "}
                          {row?.verified ? (
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
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            style={{
                              marginLeft: 16,
                            }}
                          >
                            <Link href={`/app/${userType}/${row?.id}`}>
                              <a>
                                <span className="text-xs"> View Profile</span>
                              </a>
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  );
}
