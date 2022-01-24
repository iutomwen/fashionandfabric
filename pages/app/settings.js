import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppLayout from "../../components/layouts/AppLayout";
import { Breadcrumbs, Container, Link } from "@mui/material";
import NextLink from "next/link";
import Category from "../../components/settings/Category";
import { APPNAME } from "../../libs/constant";
import Head from "next/head";
import GeneralInfo from "../../components/settings/GeneralInfo";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

export default function Settings() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppLayout>
      <Head>
        <title>{APPNAME} - Settings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
            Application Settings
          </Typography>
        </Breadcrumbs>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="basic tabs example"
          >
            <Tab label="General" {...a11yProps(0)} />
            <Tab label="Category" {...a11yProps(1)} />
            <Tab label="Events" {...a11yProps(2)} />
            <Tab label="Application" {...a11yProps(3)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <GeneralInfo />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Category />
          </TabPanel>
          <TabPanel value={value} index={2}>
            Events
          </TabPanel>
          <TabPanel value={value} index={3}>
            Application
          </TabPanel>
        </Box>
      </Box>
    </AppLayout>
  );
}
