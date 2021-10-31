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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, minWidth: "100%" }}>
          <Container
            sx={{
              width: "100%",
            }}
          >
            <Typography>{children}</Typography>
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
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
        <link rel="icon" href="/favicon.ico" />{" "}
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
        <Box
          sx={{
            flexGrow: 1,
            mt: 5,
            mx: 5,
            bgcolor: "background.paper",
            display: "flex",
            height: "100%",
            minWidth: "100%",
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider", minWidth: "20%" }}
          >
            <Tab label="General" {...a11yProps(0)} sx={{ minWidth: "100%" }} />
            <Tab label="Category" {...a11yProps(1)} sx={{ minWidth: "100%" }} />
            <Tab label="Events" {...a11yProps(2)} />
            <Tab label="Application" {...a11yProps(3)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            General
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
