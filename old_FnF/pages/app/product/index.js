import {
  Breadcrumbs,
  Button,
  Container,
  Link,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import LatestOrders from "../../../components/common/LatestOrders";
import AppLayout from "../../../components/layouts/AppLayout";
import Head from "next/head";
import { APPNAME } from "../../../libs/constant";
import ToastNotify from "../../../libs/useNotify";
import NextLink from "next/link";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import Tab from "@mui/material/Tab";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import Products from "../../../components/common/Products";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 2, maxWidth: "100%" }}>
          <Container
            sx={{
              width: "100%",
            }}
          >
            {children}
          </Container>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function Index() {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const route = useRouter();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppLayout>
      <Head>
        <title>{APPNAME} - Product List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastNotify />
      <Box
        // className={layout ? layout : `mt-5 ml-0 md:ml-5 xl:ml-5`}
        className="relative mt-2 ml-0 md:ml-5 xl:ml-10"
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" sx={{ pl: 2, mb: 3 }}>
          <NextLink href="/app/dashboard" passHref>
            <Link underline="hover" color="inherit">
              Dashboard
            </Link>
          </NextLink>
          <Typography underline="hover" color="inherit">
            Products
          </Typography>
        </Breadcrumbs>
        <Container maxWidth={false}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <div className=""></div>

            <Button
              startIcon={<AddIcon />}
              variant="text"
              onClick={() => {
                route.push("/app/product/create");
              }}
            >
              Add New
            </Button>
          </Box>

          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                aria-label="basic tabs"
              >
                <Tab label="Latest Products" {...a11yProps(0)} />
                <Tab label="Published" {...a11yProps(1)} />
                <Tab label="Un-Published" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <LatestOrders />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Products type="published" />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Products type="unpublished" />
            </TabPanel>
          </Box>
        </Container>
      </Box>
    </AppLayout>
  );
}

export default Index;
