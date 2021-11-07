import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import AppLayout from "../../../components/layouts/AppLayout";
import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Typography,
  Button,
  CssBaseline,
  Alert,
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
import StoreDetails from "../../../components/users/StoreDetails";
import ToastNotify from "../../../libs/useNotify";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import LoadingBox from "../../../components/common/LoadingBox";
import UserProducts from "../../../components/users/UserProducts";
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
export default function BusinessID() {
  const [value, setValue] = useState(0);
  const [userID, setUserID] = useState(0);
  const [user, setUser] = useState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRouter();
  const { businessID } = route.query;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  async function getDetails(id) {
    try {
      let { data: users, error } = await supabase
        .from("users")
        .select(
          `*,
      store(*,
        subcriptions(package,id))
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

  async function getStoreProducts(storeid) {
    try {
      const { data: products, error } = await supabase
        .from("products")
        .select(
          `
  id, name,price,description,published,created_at, updated_at, category(name), sub_category(name)
  store (
  name
  )
  `
        )
        .eq("store_id", storeid);
      if (error) throw error;
      if (products) {
        setProducts(products);
      }
      return true;
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function undoDelete(id) {
    try {
      const { data, error } = await supabase
        .from("users")
        .update({ isdeleted: false, updated_at: new Date() })
        .eq("id", id);
      if (data) {
        //get store details
        let { data: users, error } = await supabase
          .from("users")
          .select(
            `
  id,roles,
  store (
  id
  )
  `
          )
          .eq("id", id)
          .single();
        if (users.roles == "business") {
          const { data: storeData, storeError } = await supabase
            .from("store")
            .update({ isactive: true, updated_at: new Date() })
            .eq("id", users.store[0].id);
        }
      }
      route.reload(`/app/business`);
      if (error) throw error;
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    if (!isCancelled) {
      if (userID) {
        getDetails(userID);
        if (user) {
          getStoreProducts(user?.store[0].id);
          setLoading(true);
        }
      }
    }
    setLoading(false);
    return () => {
      isCancelled = true;
    };
  }, [userID]);

  useLayoutEffect(() => {
    if (businessID) {
      setUserID(businessID);
    }
  }, [businessID]);
  return (
    <AppLayout>
      <ToastNotify />
      <CssBaseline />
      <Head>
        <title>{APPNAME} - View Profile</title>
        <link rel="icon" href="/favicon.ico" />
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

            <Button
              startIcon={<Edit />}
              variant="text"
              onClick={() => route.push(`/app/user/edit/${user?.id}`)}
            >
              Edit
            </Button>
          </Box>
          <Breadcrumbs aria-label="breadcrumb" sx={{ pl: 2 }}>
            <NextLink href="/app/dashboard" passHref>
              <Link underline="hover" color="inherit">
                Dashboard
              </Link>
            </NextLink>
            <NextLink href="/app/business" passHref>
              <Link underline="hover" color="inherit">
                Business Users
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
            {user?.isdeleted && (
              <Alert
                variant="outlined"
                severity="warning"
                action={
                  <Button
                    onClick={() => undoDelete(user?.id)}
                    color="inherit"
                    size="small"
                  >
                    UNDO
                  </Button>
                }
              >
                This account has been deleted. — Every associate products and
                store will be deactivated!
              </Alert>
            )}
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="fullWidth"
                  aria-label="basic tabs example"
                >
                  <Tab label="User Details" {...a11yProps(0)} />
                  <Tab label="Store Info" {...a11yProps(1)} />
                  <Tab label="Products" {...a11yProps(2)} />
                  <Tab label="Account Settings" {...a11yProps(3)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <ContactDetails user={user} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <StoreDetails store={user?.store[0]} userID={user?.id} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <UserProducts products={products} />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <UserSettings />
              </TabPanel>
            </Box>
          </Container>
        </Box>
      )}
    </AppLayout>
  );
}
