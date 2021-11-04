import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { supabase } from "../../../../libs/supabaseClient";
import PropTypes from "prop-types";
import ToastNotify from "../../../../libs/useNotify";
import NextLink from "next/link";
import {
  Box,
  Link,
  CssBaseline,
  Typography,
  Container,
  Tabs,
  Tab,
  Breadcrumbs,
} from "@mui/material";
import AppLayout from "../../../../components/layouts/AppLayout";
import { APPNAME } from "../../../../libs/constant";
import UserEdit from "../../../../components/users/edit/UserEdit";
import LoadingBox from "../../../../components/common/LoadingBox";
import toast from "react-hot-toast";
import StoreEdit from "../../../../components/users/edit/StoreEdit";

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
function EditUser() {
  const [value, setValue] = useState(0);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const route = useRouter();
  const { id } = route?.query;
  async function getDetails(id) {
    try {
      let { data: users, error } = await supabase
        .from("users")
        .select(
          `*,
      store(*,
        subcriptions(package,id)),
      user_roles(role)
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
    }
  }

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    if (!isCancelled) {
      if (id) {
        getDetails(id);
        setLoading(false);
      }
    }

    return () => {
      isCancelled = true;
    };
  }, [id]);

  return (
    <AppLayout>
      <ToastNotify />
      <CssBaseline />
      <Head>
        <title>{APPNAME} - Edit Profile</title>
        <link rel="icon" href="/favicon.ico" />{" "}
      </Head>
      {loading ? (
        <LoadingBox />
      ) : (
        <Box
          className="relative mt-5 ml-0 md:ml-5 xl:ml-10"
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
          </Box>
          <Breadcrumbs aria-label="breadcrumb">
            <NextLink href="/app/dashboard" passHref>
              <Link underline="hover" color="inherit">
                Dashboard
              </Link>
            </NextLink>
            <NextLink href={`/app/${user?.user_roles[0].role}`} passHref>
              <Link underline="hover" color="inherit">
                <div className="capitalize">{`${user?.user_roles[0].role} User`}</div>
              </Link>
            </NextLink>
            <NextLink
              href={`/app/${user?.user_roles[0].role}/${user?.id}`}
              passHref
            >
              <Link underline="hover" color="inherit">
                <div className="capitalize">View profile</div>
              </Link>
            </NextLink>
            <Typography color="text.primary">Edit Profile</Typography>
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
                  <Tab label="User Edit" {...a11yProps(0)} />
                  {user?.user_roles[0].role === `personal` ? (
                    <Tab
                      disabled
                      label="Store Not Available"
                      {...a11yProps(1)}
                    />
                  ) : (
                    <Tab label="Store Edit" {...a11yProps(1)} />
                  )}
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <UserEdit user={user} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <StoreEdit store={user?.store[0]} />
              </TabPanel>
            </Box>
          </Container>
        </Box>
      )}
    </AppLayout>
  );
}

export default EditUser;
