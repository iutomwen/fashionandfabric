import React, { useContext, useEffect, useState } from "react";
import LoadingBox from "./LoadingBox";
import Link from "next/link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CardHeader, Divider } from "@material-ui/core";
import { DeleteForeverOutlined } from "@material-ui/icons";
import { supabase } from "../../libs/supabaseClient";
import toast from "react-hot-toast";
import ToastNotify from "../../libs/useNotify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";
import { Store } from "../../utils/Store";
import PopUpDelete from "./PopUpDelete";
import Cookies from "js-cookie";
import CustomBadge from "./CustomBadge";

export default function LatestOrders() {
  const { state, dispatch } = useContext(Store);
  let { appSettings, products } = state;

  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState(null);
  const route = useRouter();
  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      setAllProducts(products);
      setLoading(false);
    }
    return () => {
      isCancelled = true;
    };
  }, [products]);
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
    <div style={{ maxWidth: "100%" }}>
      <ToastNotify />
      {loading && <LoadingBox />}

      {products?.length === 0 ? (
        "No products available."
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sortDirection="asc">
                  Name
                </TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Store</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>
            {/* {console.log(Object.keys(products)?.lenght)} */}

            <TableBody>
              {!loading &&
                allProducts?.slice(0, 10).map((product, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {product?.name}
                    </TableCell>
                    <TableCell align="center">
                      <NumberFormat
                        value={product?.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={appSettings?.currency}
                      />
                    </TableCell>
                    <TableCell align="center">{product?.store?.name}</TableCell>
                    <TableCell align="center">
                      {product?.category?.name}
                    </TableCell>
                    <TableCell align="center">
                      {product?.published ? (
                        <CustomBadge
                          text="Published"
                          className="bg-green-600"
                        />
                      ) : (
                        <CustomBadge
                          text="Un-Published"
                          className="bg-red-600"
                        />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex items-center justify-center">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<VisibilityIcon />}
                          style={{ marginLeft: 16 }}
                          onClick={() => {
                            route.push(`/app/product/${product?.id}`);
                          }}
                        >
                          View
                        </Button>
                        <Button
                          startIcon={<DeleteForeverOutlined size={10} />}
                          variant="outlined"
                          color="secondary"
                          size="small"
                          style={{ marginLeft: 16 }}
                          onClick={(e) => handleDelete(product?.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {popup.show && (
            <PopUpDelete
              id={popup.id}
              text={`Delete Product `}
              handleDeleteTrue={handleDeleteTrue}
              handleDeleteFalse={handleDeleteFalse}
            />
          )}
        </TableContainer>
      )}
    </div>
  );
}
