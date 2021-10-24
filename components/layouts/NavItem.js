import { useRouter } from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";
import { Button, ListItem } from "@material-ui/core";
import Badge from "@mui/material/Badge";
import { supabase } from "../../libs/supabaseClient";
import { useContext } from "react";
import { Store } from "../../utils/Store";
import toast from "react-hot-toast";

const NavItem = ({ href, icon: Icon, title, badge, ...rest }) => {
  const { dispatch } = useContext(Store);

  const router = useRouter();
  const active = router.pathname;
  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    toast.loading("Signing out this account");

    dispatch({ type: "USER_LOGOUT" });
    router.push("/login");
    return;
  }
  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        py: 0,
      }}
      {...rest}
    >
      <Link href={href == "/logout" ? "#" : href}>
        <a>
          <Button
            sx={{
              color: "text.secondary",
              fontWeight: "medium",
              justifyContent: "flex-start",
              letterSpacing: 0,
              py: 1.25,
              textTransform: "none",
              width: "100%",
              ...(active && {
                color: "red",
              }),
              "& svg": {
                mr: 1,
              },
            }}
          >
            <div
              onClick={href === "/logout" ? signOutUser : null}
              className=" flex items-center justify-center space-x-2"
            >
              {Icon && <Icon size="20" />}
              <Badge badgeContent={badge} color="error">
                <span
                  className={`${
                    active === href && "text-red-600"
                  } font-normal text-xs`}
                >
                  {title}
                </span>
              </Badge>
            </div>
          </Button>
        </a>
      </Link>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
};

export default NavItem;
