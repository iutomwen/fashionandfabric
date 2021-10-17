import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const Store = createContext();

const initialState = {
  isError: [],
  isLogin: Cookies.get("isLogin") === "active" ? true : false,
  isRegister: false,
  accountSession: Cookies.get("accountSession")
    ? JSON.parse(Cookies.get("accountSession"))
    : null,
  accountDetails: Cookies.get("accountDetails")
    ? JSON.parse(Cookies.get("accountDetails"))
    : null,
  vendorMessages: null,
  contactMessages: null,
  businessUsers: null,
  personalUsers: null,
  appSettings: null,
  appSubcriptions: Cookies.get("appSubcriptions")
    ? JSON.parse(Cookies.get("appSubcriptions"))
    : null,
  products: null,
  shops: Cookies.get("shops") ? JSON.parse(Cookies.get("shops")) : null,
  categories: Cookies.get("categories")
    ? JSON.parse(Cookies.get("categories"))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case "USER_LOGIN":
      //   Cookies.set("isLogin", true);
      return { ...state, isLogin: true };
    case "USER_LOGOUT":
      Cookies.remove("accountDetails");
      Cookies.remove("accountSession");
      Cookies.remove("isLogin");
      Cookies.remove("isRegister");
      Cookies.remove("categories");
      Cookies.remove("appSubcriptions");
      Cookies.remove("shops");
      localStorage.clear();
      return {
        ...state,
        isLogin: false,
        isRegister: false,
        isError: [],
        accountDetails: null,
        accountSession: null,
        vendorMessages: null,
        contactMessages: null,
        businessUsers: null,
        personalUsers: null,
        appSettings: null,
        appSubcriptions: null,
        products: null,
        shops: null,
        categories: null,
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

    default:
      return state;
  }
}
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
