import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Store } from "../../utils/Store";
import CustomBadge from "../common/CustomBadge";
import NumberFormat from "react-number-format";
import { Button, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DeleteForeverOutlined } from "@material-ui/icons";
import PopUpDelete from "../common/PopUpDelete";
import { useRouter } from "next/router";
const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "price", label: "Price", minWidth: 100 },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
  },
  {
    id: "category",
    label: "Category",
    minWidth: 170,
  },
  {
    id: "published",
    label: "Published",
    minWidth: 170,
  },
  {
    id: "options",
    label: "Options",
    minWidth: 170,
  },
];

export default function UserProducts({ storeID }) {
  const { state, dispatch } = useContext(Store);
  let { appSettings, products } = state;
  const route = useRouter();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    setLoading(true);
    let isCancelled = false;
    if (!isCancelled) {
      let storeProducts = products.filter((x) => x.store.id == storeID);
      setRows(storeProducts);
    }
    setLoading(false);
    return () => (isCancelled = true);
  }, [products]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
  });

  const handleDelete = (id) => {
    setPopup({
      show: true,
      id,
    });
  };
  const handleDeleteTrue = async () => {
    if (popup.show && popup.id) {
      try {
        const { data, error } = await supabase
          .from("products")
          .delete()
          .eq("id", popup.id);
        if (error) throw error;
        toast.success("Product Removed Successfully");
        //mutate the state
        let newProducts = allProducts.filter((x) => x.id !== popup.id);
        dispatch({ type: "LOAD_ALL_PRODUCTS", payload: newProducts });
        Cookies.set("products", JSON.stringify(newProducts));
        setAllProducts(newProducts);
      } catch (error) {
        toast.error(error.message);
      }

      setPopup({
        show: false,
        id: null,
      });
    }
  };
  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
    });
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
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
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{row?.name}</TableCell>
                    <TableCell>
                      <NumberFormat
                        value={row?.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={appSettings?.currency}
                      />
                    </TableCell>
                    <TableCell>{row?.description}</TableCell>

                    <TableCell>{row?.category?.name}</TableCell>
                    <TableCell>
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
                            route.push(`/app/product/${row?.id}`);
                          }}
                        >
                          View
                        </Button>
                        <Button
                          startIcon={<DeleteForeverOutlined size={10} />}
                          variant="text"
                          color="secondary"
                          size="small"
                          style={{ marginLeft: 16 }}
                          onClick={(e) => handleDelete(row?.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {popup.show && (
        <PopUpDelete
          id={popup.id}
          text={`Delete Product`}
          handleDeleteTrue={handleDeleteTrue}
          handleDeleteFalse={handleDeleteFalse}
        />
      )}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
