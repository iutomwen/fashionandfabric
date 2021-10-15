import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from "@material-ui/core";
import NavItem from "./NavItem";
import { menuItems } from "../../libs/menuItems";
import { Store } from "../../utils/Store";

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  //   const location = useLocation();
  const { state } = useContext(Store);
  const { accountDetails } = state;
  const user = {
    avatar: "/assets/images/avatars/avatar_6.png",
    jobTitle: accountDetails?.username,
    name: `${accountDetails?.first_name} ${accountDetails?.last_name}`,
  };
  const router = useRouter();
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [router.pathname]);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          p: 4,
        }}
      >
        <Avatar
          //   component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: "pointer",
            width: 64,
            height: 64,
          }}
          to="/app/account"
        />
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {menuItems?.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
              badge={item.badge || null}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: "calc(100% - 64px)",
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default DashboardSidebar;
