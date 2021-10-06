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
import { supabase } from "./supabaseClient";
const logout = async () => {
  const { error } = await supabase.auth.signOut();
};
export const menuItems = [
  {
    href: "/app/dashboard",
    icon: BarChartIcon,
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
    href: "/app/products",
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
