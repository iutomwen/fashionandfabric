import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import AppLayout from "../../../components/layouts/AppLayout";
import { APPNAME } from "../../../libs/constant";
import Head from "next/head";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Store } from "../../../utils/Store";
import { useRouter } from "next/router";
import { Edit } from "react-feather";
import { Done } from "@material-ui/icons";
import { Remove } from "@mui/icons-material";
import NumberFormat from "react-number-format";
import Moment from "moment";
import toast from "react-hot-toast";
import { supabase } from "../../../libs/supabaseClient";
import Active from "../../../components/common/Active";
import InActive from "../../../components/common/InActive";

function Product() {
  const { state } = useContext(Store);
  const [product, setProduct] = useState({});
  let { products, appSettings } = state;
  Moment.locale("en");
  const route = useRouter();
  const { productID } = route.query;
  useLayoutEffect(() => {
    let prod = products.find((x) => x.id == productID);
    setProduct(prod);
  }, [products, productID]);
  async function handleDisableProduct(id) {
    try {
      const { data: product, error } = await supabase
        .from("products")
        .update({ published: false })
        .eq("id", id);
      if (error) throw error;
      if (product) {
        setProduct((prevProduct) => ({
          ...prevProduct,
          published: false,
        }));
        toast.success("Product has been unpublished.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function handleApprove(id) {
    try {
      const { data: product, error } = await supabase
        .from("products")
        .update({ published: true })
        .eq("id", id);
      if (error) throw error;
      if (product) {
        setProduct((prevProduct) => ({
          ...prevProduct,
          published: true,
        }));
        toast.success("Product has been published.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <AppLayout>
      <Head>
        <title>{APPNAME} - Product View</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Breadcrumbs aria-label="breadcrumb">
            <NextLink href="/app/dashboard" passHref>
              <Link underline="hover" color="inherit">
                Dashboard
              </Link>
            </NextLink>
            <NextLink href="/app/product" passHref>
              <Link underline="hover" color="inherit">
                Products
              </Link>
            </NextLink>
            <Typography color="text.primary">View</Typography>
          </Breadcrumbs>
          <Box
            sx={{
              my: 4,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {!product?.published ? (
              <Button
                onClick={() => {
                  handleApprove(product?.id);
                }}
                variant="text"
                color="success"
                startIcon={<Done />}
              >
                Approve product
              </Button>
            ) : (
              <Button
                onClick={() => {
                  handleDisableProduct(product?.id);
                }}
                variant="text"
                color="primary"
                startIcon={<Remove />}
              >
                Disable product
              </Button>
            )}

            <Button
              onClick={() => route.push(`/app/product/edit/${product?.id}`)}
              variant="text"
              startIcon={<Edit />}
            >
              Edit Product
            </Button>
          </Box>
          <TableContainer
            component={Paper}
            elevation={5}
            sx={{
              width: "100%",
              mt: 4,
            }}
          >
            <Table sx={{ maxWidth: "98%", whiteSpace: "nowrap" }} size="large">
              <TableBody>
                <TableRow sx={{ whiteSpace: "nowrap" }}>
                  <TableCell colSpan={2} align="left">
                    <div className="text-2xl capitalize">Product Details</div>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ whiteSpace: "nowrap" }}>
                  <TableCell align="left">Product Name</TableCell>
                  <TableCell align="left">
                    <div className="font-bold capitalize ">{product?.name}</div>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ whiteSpace: "nowrap" }}>
                  <TableCell align="left">Product Price</TableCell>
                  <TableCell align="left">
                    <div className="font-bold capitalize ">
                      <NumberFormat
                        value={product?.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={appSettings?.currency}
                      />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ whiteSpace: "nowrap" }}>
                  <TableCell align="left">Product Description</TableCell>
                  <TableCell align="left">
                    <div className="font-bold capitalize ">
                      {product?.description}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ whiteSpace: "nowrap" }}>
                  <TableCell align="left">Store</TableCell>
                  <TableCell align="left">
                    <div className="font-bold capitalize ">
                      {product?.store?.name}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ whiteSpace: "nowrap" }}>
                  <TableCell align="left">Product Category</TableCell>
                  <TableCell align="left">
                    <div className="font-bold capitalize ">
                      {product?.category?.name}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ whiteSpace: "nowrap" }}>
                  <TableCell align="left">Product Sub Category</TableCell>
                  <TableCell align="left">
                    <div className="font-bold capitalize ">
                      {product?.sub_category?.name}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ whiteSpace: "nowrap" }}>
                  <TableCell align="left">Product Updated At</TableCell>
                  <TableCell align="left">
                    <div className="font-bold capitalize ">
                      {product?.updated_at
                        ? Moment(product?.updated_at).format(
                            "ddd Do, MMM YYYY LT"
                          )
                        : null}

                      {/* {product?.updated_at} */}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ whiteSpace: "nowrap" }}>
                  <TableCell align="left">Product Created At</TableCell>
                  <TableCell align="left">
                    <div className="font-bold capitalize ">
                      {product?.created_at
                        ? Moment(product?.created_at).format(
                            "ddd Do, MMM YYYY LT"
                          )
                        : null}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ whiteSpace: "nowrap" }}>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">
                    <div className="font-bold capitalize ">
                      {product?.published ? (
                        <Active>Published</Active>
                      ) : (
                        <InActive>UnPublished</InActive>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </AppLayout>
  );
}
export default dynamic(() => Promise.resolve(Product), { ssr: false });
