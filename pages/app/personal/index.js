import React, { useEffect, useState } from "react";
import Head from "next/head";
import LatestUsers from "../../../components/common/LatestUsers";
import AppLayout from "../../../components/layouts/AppLayout";
import {
  Link,
  Box,
  Container,
  Grid,
  Breadcrumbs,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import NextLink from "next/link";
import { APPNAME } from "../../../libs/constant";
import LoadingBox from "../../../components/common/LoadingBox";
import toast from "react-hot-toast";
import ToastNotify from "../../../libs/useNotify";
import { supabase } from "../../../libs/supabaseClient";
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
  const [verifiedUsers, setVerifiedUsers] = useState();
  const [unVerifiedUsers, setUnVerifiedUsers] = useState();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  async function getVerified(userType) {
    try {
      let { data: verified, error } = await supabase
        .from("user_roles")
        .select(
          ` 
  users(id, first_name, username, last_name, phone, verified) `
        )
        .eq("users.verified", 1)
        .eq("role", userType)
        .order("id", { ascending: false });
      if (error) throw error;
      if (verified) {
        console.log(verified);
        setVerifiedUsers(verified);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  async function getUnVerified(userType) {
    try {
      let { data: unverified, error } = await supabase
        .from("user_roles")
        .select(
          ` 
  users(id, first_name, username, last_name, phone, verified) `
        )
        .eq("users.verified", 0)
        .eq("role", userType)
        .order("id", { ascending: false });
      if (error) throw error;
      if (unverified) {
        setUnVerifiedUsers(unverified);
        // console.log(unverified);
      }
    } catch (error) {
      toast.error(error.message);
      // console.log(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    let isCancelled = false;
    if (!isCancelled) {
      getVerified("personal");
      getUnVerified("personal");
      // console.log("un", unVerifiedUsers);
      // console.log("ver", verifiedUsers);
      if (verifiedUsers && unVerifiedUsers) {
        setLoading(false);
      }
    }
    return () => (isCancelled = true);
  }, []);
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
        <Breadcrumbs aria-label="breadcrumb">
          <NextLink href="/app/dashboard" passHref>
            <Link underline="hover" color="inherit">
              Dashboard
            </Link>
          </NextLink>
          <Typography underline="hover" color="inherit">
            Personal Users
          </Typography>
        </Breadcrumbs>
        {loading ? (
          <LoadingBox />
        ) : (
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
              Verified
            </TabPanel>
            <TabPanel value={value} index={2}>
              Unverified
            </TabPanel>
          </Box>
        )}
      </Box>
    </AppLayout>
  );
}

export default Index;
