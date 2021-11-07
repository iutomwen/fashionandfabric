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

const CustomBadge = ({ text, className }) => {
  return (
    <div
      className={`${className} text-xs rounded py-1 text-white min-w-full max-w-full overflow-hidden px-2`}
    >
      {text}
    </div>
  );
};

export default function LatestOrders() {
  const { state } = useContext(Store);
  let { appSettings } = state;

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const route = useRouter();
  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      async function getProducts() {
        try {
          setLoading(true);
          let { data: product, error } = await supabase
            .from("products")
            .select(
              `
            published, name, price,id,
    store(name),
    category(name),
    sub_category(name)
    `
            )
            .order("id", { ascending: false });
          if (error) throw error;
          if (product) {
            setProducts(product);
          }
        } catch (error) {
          toast.error(error.message);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      getProducts();
    }
    return () => {
      isCancelled = true;
    };
  }, []);
  // toast.success(products.length);
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
                products?.map((product, i) => (
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
                          onClick={() => {}}
                        >
                          <Link href={`/app/product/${product?.id}`}>
                            <a>Remove</a>
                          </Link>
                        </Button>
                      </div>
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
