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
import { Delete } from "react-feather";
import { useRouter } from "next/router";
import VisibilityIcon from "@mui/icons-material/Visibility";
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

export default function UnverifiedUsers({ userType }) {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const route = useRouter();
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
      getUnVerified(userType, search);
    }
    setLoading(false);
    return () => (isCancelled = true);
  }, [search]);
  async function getUnVerified(userType, search) {
    try {
      let { data: unverified, error } = await supabase
        .from("users")
        .select(
          `id, first_name, username, last_name, phone, verified, roles, isdeleted  `
        )
        .filter("roles", "eq", userType)
        .filter("verified", "eq", false)
        .ilike("first_name", `%${search}%`)
        .order("id", { ascending: false });
      if (error) throw error;
      if (unverified) {
        setRows(unverified);
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
                      align={column.align}
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
                        <TableCell>
                          <div className="flex space-x-2">
                            {row?.isdeleted && (
                              <Delete className="items-center mr-2 text-red-500 fill-current" />
                            )}
                            {row?.first_name}
                          </div>
                        </TableCell>
                        <TableCell>{row?.last_name}</TableCell>
                        <TableCell>{row?.username}</TableCell>
                        <TableCell>{row?.phone}</TableCell>
                        <TableCell align="center">
                          {row?.verified ? (
                            <Badge badgeContent={`verified`} color="success" />
                          ) : (
                            <div className="flex items-center justify-evenly">
                              <div>
                                <Badge
                                  badgeContent={`unverified`}
                                  color="warning"
                                />
                              </div>
                              <div className="max-w-full ml-8 cursor-pointer">
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
                            onClick={() =>
                              route.push(`/app/${userType}/${row?.id}`)
                            }
                            startIcon={<VisibilityIcon />}
                            variant="text"
                            color="primary"
                            size="small"
                            style={{
                              marginLeft: 16,
                            }}
                          >
                            <span className="text-xs"> View Profile</span>
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
