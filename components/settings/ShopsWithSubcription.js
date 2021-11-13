import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../utils/Store";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import LoadingBox from "../common/LoadingBox";
import { Button, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomBadge from "../common/CustomBadge";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "description", label: "Subcription Details", minWidth: 270 },
  {
    id: "owner",
    label: "Store Owner",
    minWidth: 170,
  },
  {
    id: "businessreg",
    label: "Business Reg Number",
    minWidth: 170,
  },
  {
    id: "subcription",
    label: "Subcription",
    minWidth: 170,
  },
  {
    id: "products",
    label: "No of Products",
    minWidth: 40,
  },
  {
    id: "options",
    label: "Options",
    minWidth: 170,
  },
];
function ShopsWithSubcription() {
  const { state, dispatch } = useContext(Store);
  let { appSettings, shops } = state;
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const route = useRouter();
  //   console.log(shops);
  //   const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  //   const firstDate = new Date(2008, 1, 12);
  //   const secondDate = new Date(2008, 1, 22);

  //   function days_between(date1, date2) {

  //     // The number of milliseconds in one day
  //     const ONE_DAY = 1000 * 60 * 60 * 24;

  //     // Calculate the difference in milliseconds
  //     const differenceMs = Math.abs(date1 - date2);

  //     // Convert back to days and return
  //     return Math.round(differenceMs / ONE_DAY);

  // }
  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

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
      setRows(shops);
    }
    setLoading(false);
    return () => (isCancelled = true);
  }, [shops]);

  useEffect(() => {
    let calls = setTimeout(() => {
      if (search != "") {
        let searchText = shops.filter(
          ({ name }) =>
            search.toLowerCase() &&
            name.toLowerCase().includes(search.toLowerCase())
        );
        setRows(searchText);
      }
    }, 400);

    return () => clearTimeout(calls);
  }, [search]);
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
                        <TableCell>{row?.name}</TableCell>
                        <TableCell>
                          <div className="flex-col flex-1">
                            <div>
                              <b>Allowed Items: </b>
                              {row?.subcriptions?.productlimit} products
                            </div>
                            <div>
                              <b>Time Allowed: </b>
                              {row?.subcriptions?.timeframe} days
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className=" capitalize">
                            {row?.users?.first_name} {row?.users?.last_name}
                          </div>
                        </TableCell>
                        <TableCell>{row?.businessreg}</TableCell>
                        <TableCell>{row?.subcriptions?.package}</TableCell>
                        <TableCell>{row?.products?.length}</TableCell>

                        <TableCell align="center">
                          {row?.published ? (
                            <CustomBadge
                              text="Published"
                              className="bg-green-600 w-1/2"
                            />
                          ) : (
                            <CustomBadge
                              text="Un-Published"
                              className="bg-red-600"
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center">
                            <Button
                              variant="text"
                              color="primary"
                              size="small"
                              startIcon={<VisibilityIcon />}
                              style={{ marginLeft: 16 }}
                              onClick={() => {
                                route.push(`/app/business/${row?.users.id}`);
                              }}
                            >
                              View
                            </Button>
                          </div>
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

export default ShopsWithSubcription;
