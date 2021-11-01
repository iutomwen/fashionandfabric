import {
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Users as UsersIcon,
  Rss as RssIcon,
  Briefcase as BriefcaseIcon,
  Mail as MailIcon,
  LogOut as LogOutIcon,
  MessageCircle as MessagesIcon,
} from "react-feather";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { useContext } from "react";
import { Store } from "../utils/Store";
function menuDate() {
  const { state, dispatch } = useContext(Store);
  const { notifications } = state;
}
export default menuDate;

export const menuItems = [
  {
    href: "/app/dashboard",
    icon: DashboardOutlinedIcon,
    title: "Dashboard",
  },
  {
    href: "/app/personal",
    icon: UsersIcon,
    title: "Personal Accounts",
  },
  {
    href: "/app/business",
    icon: BriefcaseIcon,
    title: "Business Accounts",
  },
  {
    href: "/app/product",
    icon: ShoppingBagIcon,
    title: "Products",
    badge: null,
  },
  {
    href: "/app/subcriptions",
    icon: RssIcon,
    title: "Subcriptions",
    badge: null,
  },

  {
    href: "/app/contactMessages",
    icon: MailIcon,
    title: "Contact Messages",
    badge: null,
  },
  {
    href: "/app/VendorMessages",
    icon: MessagesIcon,
    title: "Vendors Messages",
    badge: null,
  },
  {
    href: "/app/notifications",
    icon: NotificationsNoneIcon,
    title: "Notifications",
    badge: null,
  },
  {
    href: "/app/account",
    icon: UserIcon,
    title: "My Account",
  },
  {
    href: "/app/settings",
    icon: SettingsIcon,
    title: "Settings",
  },

  {
    href: "/logout",
    icon: LogOutIcon,
    title: "Logout",
  },
];
