import React from "react";
import {
  Navbar,
  Group,
  ScrollArea,
  createStyles,
  Text,
  UnstyledButton,
  ActionIcon,
} from "@mantine/core";
import {
  User,
  BrandProducthunt,
  BuildingStore,
  Messages,
  LayoutDashboard,
  Adjustments,
  Lock,
  Logout,
} from "tabler-icons-react";
const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));
import UserButton from "./UserButton";
import { LinksGroup } from "./LinksGroup";
import { signOutUser } from "@/utils/services";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAccount } from "@/utils/slices/accountSlice";
import { fullName } from "@/utils/helper";
import { persistor } from "@/utils/store";
import { clearUsers } from "@/utils/slices/usersSlice";
const mockdata = [
  { label: "Dashboard", icon: LayoutDashboard, link: "/dashboard" },
  {
    label: "Users & Roles",
    icon: User,
    initiallyOpened: true,
    links: [
      { label: "Overview", link: "/dashboard/users/overview" },
      { label: "Personal", link: "/dashboard/users/personal" },
      { label: "Busniess", link: "/dashboard/users/business" },
      { label: "Delete Request", link: "/dashboard/users/delete-request" },
    ],
  },
  {
    label: "Products",
    icon: BrandProducthunt,
    links: [
      {
        label: "New Products",
        link: "/dashboard/users/store/products/new-products",
      },
      { label: "Product List", link: "/dashboard/users/store/products/list" },
      {
        label: "Releases Products",
        link: "/dashboard/users/store/products/unlisted",
      },
    ],
  },
  {
    label: "Stores",
    icon: BuildingStore,
    link: "/dashboard/users/stores",
  },
  {
    label: "Message Center",
    icon: Messages,
    links: [
      { label: "Notifications", link: "/dashboard/messages/notifications" },
      { label: "Reports", link: "/dashboard/messages/reports" },
      { label: "Contact Message", link: "/dashboard/messages/contact" },
    ],
  },
  {
    label: "Settings",
    icon: Adjustments,
    links: [
      { label: "General", link: "/dashboard/settings/general" },
      { label: "Security", link: "/dashboard/settings/security" },
      { label: "Category", link: "/dashboard/settings/category" },
      { label: "Subcriptions", link: "/dashboard/settings/subcriptions" },
    ],
  },
  {
    label: "Security",
    icon: Lock,
    links: [
      { label: "Account Profile", link: "/dashboard/profile" },
      { label: "Change password", link: "/dashboard/profile/change-password" },
      { label: "Enable 2FA", link: "/dashboard" },
    ],
  },
];
function AppNavBar({ opened }) {
  const { classes } = useStyles();
  const { account } = useSelector((state) => state.account);
  const route = useRouter();
  const dispatch = useDispatch();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  const handleLogout = () => {
    dispatch(logoutUserAccount());
    dispatch(clearUsers());
    // dispatch(clearMessages());
    // dispatch(clearProducts());
    // dispatch(clearSubcriptions());
    // dispatch(clearCategories());
    // dispatch(clearSettings());
    route.push("/");
  };
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Navbar.Section className={classes.header}>
        <UnstyledButton
          onClick={() => console.log("try focusing button with tab")}
        >
          <UserButton
            image={null}
            name={fullName(account?.first_name, account?.last_name)}
            email={account?.username}
          />
        </UnstyledButton>
      </Navbar.Section>
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>
      <Navbar.Section className={`p-5 ${classes.footer}`}>
        <Group direction="column" spacing={"xl"}>
          <UserButton
            image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            name={fullName(account?.first_name, account?.last_name)}
            email={account?.username}
          />
          <Group
            position="apart"
            className=" cursor-pointer"
            onClick={() => handleLogout()}
          >
            <ActionIcon variant="transparent">
              <Logout size={26} />
            </ActionIcon>
            <Text size="lg">Logout</Text>
          </Group>
        </Group>
      </Navbar.Section>
    </Navbar>
  );
}

export default AppNavBar;
