import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
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
    badge: 2,
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
    badge: 2,
  },
  {
    href: "/app/VendorMessages",
    icon: MessagesIcon,
    title: "Vendors Messages",
    badge: 70,
  },
  {
    href: "/app/notifications",
    icon: NotificationsNoneIcon,
    title: "Notifications",
    badge: 900,
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
