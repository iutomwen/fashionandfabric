import React, { useEffect, useState } from "react";
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

export default function LatestOrders() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
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
      <CardHeader title="Latest Products" />
      <Divider className="mb-4" />
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
                      {product.name}
                    </TableCell>
                    <TableCell align="center">{product.price}</TableCell>
                    <TableCell align="center">{product.store?.name}</TableCell>
                    <TableCell align="center">
                      {product.category.name}
                    </TableCell>
                    <TableCell align="center">
                      {product.approved ? "Approved" : "Not Approved"}
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex items-center justify-center">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ marginLeft: 16 }}
                          onClick={() => {}}
                        >
                          <Link href={`/app/product/${product.id}/view`}>
                            <a>View</a>
                          </Link>
                        </Button>
                        <Button
                          startIcon={<DeleteForeverOutlined size={10} />}
                          variant="outlined"
                          color="secondary"
                          size="small"
                          style={{ marginLeft: 16 }}
                          onClick={() => {}}
                        >
                          <Link href={`/app/product/${product.id}/delete`}>
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
