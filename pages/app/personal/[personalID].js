import React, { useState, useEffect } from "react";
import AppLayout from "../../../components/layouts/AppLayout";
import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Typography,
  Button,
  CssBaseline,
} from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import NextLink from "next/link";
import Head from "next/head";
import { APPNAME } from "../../../libs/constant";
import { supabase } from "../../../libs/supabaseClient";
import { Edit } from "@material-ui/icons";
import ContactDetails from "../../../components/users/ContactDetails";
import ToastNotify from "../../../libs/useNotify";
import toast from "react-hot-toast";
import router, { useRouter } from "next/router";
import LoadingBox from "../../../components/common/LoadingBox";
import UserSettings from "../../../components/users/UserSettings";

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
function personalID() {
  const [value, setValue] = useState(0);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const route = useRouter();
  const { personalID } = route.query;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  async function getDetails(id) {
    try {
      let { data: users, error } = await supabase
        .from("users")
        .select(
          `*,
      user_settings(*)
      `
        )
        .eq("id", id)
        .single();
      if (error) throw error;
      if (users) {
        setUser(users);
      }
      return true;
    } catch (error) {
      toast.error(error.message);
      router.push("/app/personal");
    }
  }

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    if (!isCancelled) {
      if (personalID) {
        setLoading(true);
        getDetails(personalID);
      }
    }
    setLoading(false);
    return () => {
      isCancelled = true;
    };
  }, [personalID]);
  return (
    <AppLayout>
      <ToastNotify />
      <CssBaseline />
      <Head>
        <title>{APPNAME} - View Profile</title>
        <link rel="icon" href="/favicon.ico" />{" "}
      </Head>
      {loading ? (
        <LoadingBox />
      ) : (
        <Box
          className="mt-5 ml-0 md:ml-5 xl:ml-10 relative"
          sx={{
            backgroundColor: "background.default",
            minHeight: "100%",
            py: 3,
            px: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <div className="text-2xl font-bold capitalize">
              {user?.first_name} {user?.last_name}
            </div>
            <NextLink href={`/app/user/edit/${user?.id}`} passHref>
              <Link>
                <Button startIcon={<Edit />} variant="outlined">
                  Edit
                </Button>
              </Link>
            </NextLink>
          </Box>
          <Breadcrumbs aria-label="breadcrumb">
            <NextLink href="/app/dashboard" passHref>
              <Link underline="hover" color="inherit">
                Dashboard
              </Link>
            </NextLink>
            <NextLink href="/app/personal" passHref>
              <Link underline="hover" color="inherit">
                Personal Users
              </Link>
            </NextLink>
            <Typography color="text.primary">View Profile</Typography>
          </Breadcrumbs>
          <Container
            sx={{
              mt: 2,
              width: "100%",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="fullWidth"
                  aria-label="basic tabs example"
                >
                  <Tab label="User Details" {...a11yProps(0)} />

                  <Tab label="Account Settings" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <ContactDetails user={user} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <UserSettings />
              </TabPanel>
            </Box>
          </Container>
        </Box>
      )}
    </AppLayout>
  );
}

export default personalID;
