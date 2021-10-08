import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import Logo from "../common/ApplicationLogo";
import { logoutUser } from "../../features/user/userSlice";
import { useRouter } from "next/router";

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications, setNotification] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  function signOutUser() {
    dispatch(logoutUser());
    router.push("/login");
  }
  return (
    <AppBar elevation={3} {...rest}>
      <Toolbar className="flex justify-between bg-gray-300">
        <Link href="/">
          <a>
            {" "}
            <Logo width={70} height={70} />
          </a>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden mdDown>
          <div className="flex justify-evenly space-x-9">
            <IconButton color="inherit" size="small">
              <Badge badgeContent={4} color="error" variant="dot">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton onClick={signOutUser} color="inherit" size="small">
              <InputIcon />
            </IconButton>
          </div>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen} size="small">
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;
