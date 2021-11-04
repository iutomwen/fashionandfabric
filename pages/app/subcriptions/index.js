import React, { useState } from "react";
import AppLayout from "../../../components/layouts/AppLayout";
import NextLink from "next/link";
import Head from "next/head";
import { APPNAME } from "../../../libs/constant";
import {
  Breadcrumbs,
  Box,
  Link,
  Tab,
  Tabs,
  Typography,
  Button,
  ThemeProvider,
} from "@mui/material";
import PropTypes from "prop-types";
import SubcriptionList from "../../../components/settings/SubcriptionList";
import { useRouter } from "next/router";
import theme from "../../../utils/theme";

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
        <Box sx={{ p: 3 }}>
          {children}
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
export default function Subcriptions() {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <ThemeProvider theme={theme}>


      <AppLayout>
        <Head>
          <title>{APPNAME} - Subcriptions List</title>
          <link rel="icon" href="/favicon.ico" />{" "}
        </Head>
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
              Subcriptions
            </Typography>
          </Breadcrumbs>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            <div className="mb-5 mr-20">
              <Button
                onClick={() => {
                  router.push("/app/subcriptions/create");
                }}
                variant="text"
                color="primary"
              >
                Add Subcriptions
              </Button>
            </div>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                variant="fullWidth"
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Subcriptions Items" {...a11yProps(0)} />
                <Tab label="Shops With Subcriptions" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <SubcriptionList />
            </TabPanel>
            <TabPanel value={value} index={1}>
              ShopsWithSubcription
            </TabPanel>
          </Box>
        </Box>
      </AppLayout>
    </ThemeProvider>
  );
}
