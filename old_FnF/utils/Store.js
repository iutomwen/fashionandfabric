import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const Store = createContext();

const initialState = {
  isError: [],
  isLogin: Cookies.get("isLogin") === "active" ? true : false,
  isRegister: false,
  accountSession: Cookies.get("accountSession")
    ? JSON.parse(Cookies.get("accountSession"))
    : {},
  accountDetails: Cookies.get("accountDetails")
    ? JSON.parse(Cookies.get("accountDetails"))
    : {},
  vendorMessages: Cookies.get("vendorMessages")
    ? JSON.parse(Cookies.get("vendorMessages"))
    : [],
  contactMessages: Cookies.get("contactMessages")
    ? JSON.parse(Cookies.get("contactMessages"))
    : [],
  businessUsers: Cookies.get("businessUsers")
    ? JSON.parse(Cookies.get("businessUsers"))
    : [],
  personalUsers: Cookies.get("personalUsers")
    ? JSON.parse(Cookies.get("personalUsers"))
    : [],
  appSettings: Cookies.get("appSettings")
    ? JSON.parse(Cookies.get("appSettings"))
    : {},
  appSubcriptions: Cookies.get("appSubcriptions")
    ? JSON.parse(Cookies.get("appSubcriptions"))
    : [],
  notifications: Cookies.get("notifications")
    ? JSON.parse(Cookies.get("notifications"))
    : [],
  products: Cookies.get("products") ? JSON.parse(Cookies.get("products")) : [],
  shops: Cookies.get("shops") ? JSON.parse(Cookies.get("shops")) : [],
  categories: Cookies.get("categories")
    ? JSON.parse(Cookies.get("categories"))
    : [],
};

function reducer(state, action) {
  switch (action.type) {
    case "USER_LOGIN":
      //   Cookies.set("isLogin", true);
      return { ...state, isLogin: true };
    case "USER_LOGOUT":
      Cookies.remove("isLogin");
      Cookies.remove("isRegister");
      Cookies.remove("accountDetails");
      Cookies.remove("accountSession");
      Cookies.remove("vendorMessages");
      Cookies.remove("contactMessages");
      Cookies.remove("businessUsers");
      Cookies.remove("personalUsers");
      Cookies.remove("appSettings");
      Cookies.remove("appSubcriptions");
      Cookies.remove("notifications");
      Cookies.remove("products");
      Cookies.remove("shops");
      Cookies.remove("categories");
      localStorage.clear();
      return {
        ...state,
        isError: [],
        isLogin: false,
        isRegister: false,
        accountDetails: {},
        accountSession: {},
        vendorMessages: [],
        contactMessages: [],
        businessUsers: [],
        personalUsers: [],
        appSettings: {},
        appSubcriptions: [],
        notifications: [],
        products: [],
        shops: [],
        categories: [],
      };
    case "USER_REGISTER":
      Cookies.set("isLogin", true);
      Cookies.set("isRegister", true);
      return { ...state, isLogin: true, isRegister: true };
    case "ACCOUNTDETAILS":
      return { ...state, accountDetails: action.payload };
    case "ACCOUNTSESSION":
      return { ...state, accountSession: action.payload };
    case "LOAD_ALL_CATEGORY":
      return { ...state, categories: action.payload };
    case "LOAD_ALL_SUBCRIPTION":
      return { ...state, appSubcriptions: action.payload };
    case "LOAD_ALL_SHOPS":
      return { ...state, shops: action.payload };
    case "LOAD_ALL_PRODUCTS":
      return { ...state, products: action.payload };
    case "LOAD_SETTINGS":
      return { ...state, appSettings: action.payload };
    case "ADD_NEW_NOTIFICATION":
      const newNotify = action.payload;
      const existItem = state.notifications.find(
        (notify) => notify.notifyid === newNotify.notifyid
      );
      const notifyItems = existItem
        ? state.notifications.map((item) =>
            item.notifyid === existItem.notifyid ? newNotify : item
          )
        : [...state.notifications, newNotify];
      return {
        ...state,
        notifications: notifyItems,
      };
    case "LOAD_ALL_NOTIFICATIONS":
      return { ...state, notifications: action.payload };
    case "LOAD_ALL_PERSONAL":
      return { ...state, personalUsers: action.payload };
    case "LOAD_ALL_BUSINESS":
      return { ...state, businessUsers: action.payload };

    default:
      return state;
  }
}
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
