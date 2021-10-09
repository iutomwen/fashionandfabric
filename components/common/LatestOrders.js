import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../features/shops/productSlice";
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function LatestOrders() {
  const [loading, setLoading] = useState(true);
  // const [allProducts, setAllProducts] = useState({});
  const dispatch = useDispatch();
  const { productError, productPending, products } = useSelector(
    (state) => state.products
  );
  // console.log(products);
  useEffect(() => {
    dispatch(getAllProducts());
    // setAllProducts(products);
    setLoading(false);
    return () => dispatch(getAllProducts());
  }, [products]);
  return (
    <div style={{ maxWidth: "100%" }}>
      <CardHeader title="Latest Products" />
      <Divider className="mb-4" />
      <TableContainer component={Paper}>
        {loading ? (
          <LoadingBox />
        ) : (
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

            <TableBody>
              {products &&
                products?.map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {product.name}
                    </TableCell>
                    <TableCell align="center">{product.price}</TableCell>
                    <TableCell align="center">{product.store?.name}</TableCell>
                    <TableCell align="center">
                      {product.category?.name}
                    </TableCell>
                    <TableCell align="center">{product.currency}</TableCell>
                    <TableCell align="center">
                      <div className="flex">
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
        )}
      </TableContainer>
    </div>
  );
}
