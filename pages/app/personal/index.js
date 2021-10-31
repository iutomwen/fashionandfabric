import React, { useState } from "react";
import Head from "next/head";
import LatestUsers from "../../../components/common/LatestUsers";
import AppLayout from "../../../components/layouts/AppLayout";
import { Link, Box, Container, Breadcrumbs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import NextLink from "next/link";
import { APPNAME } from "../../../libs/constant";
import ToastNotify from "../../../libs/useNotify";
import VerifiedUsers from "../../../components/common/VerifiedUsers";
import UnverifiedUsers from "../../../components/common/UnverifiedUsers";
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppLayout>
      <Head>
        <title>{APPNAME} - Personal Profile List</title>
        <link rel="icon" href="/favicon.ico" />{" "}
      </Head>
      <ToastNotify />
      <Box
        // className={layout ? layout : `mt-5 ml-0 md:ml-5 xl:ml-5`}
        className="mt-2 ml-0 md:ml-5 xl:ml-10 relative"
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
            Personal Users
          </Typography>
        </Breadcrumbs>

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              aria-label="basic tabs"
            >
              <Tab label="Latest Personal Users" {...a11yProps(0)} />
              <Tab label="Verified Users" {...a11yProps(1)} />
              <Tab label="Unverified Users" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <LatestUsers userType="personal" />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <VerifiedUsers userType="personal" />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <UnverifiedUsers userType="personal" />
          </TabPanel>
        </Box>
      </Box>
    </AppLayout>
  );
}

export default Index;
