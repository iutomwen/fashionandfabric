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
  appSubcriptions: null,
  products: null,
  shops: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "USER_LOGIN":
      //   Cookies.set("isLogin", true);
      return { ...state, isLogin: true };
    case "USER_LOGOUT":
      Cookies.remove("accountDetails");
      Cookies.remove("accountSession");
      Cookies.remove();
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
      };
    case "USER_REGISTER":
      Cookies.set("isLogin", true);
      Cookies.set("isRegister", true);
      return { ...state, isLogin: true, isRegister: true };
    case "ACCOUNTDETAILS":
      Cookies.set("accountDetails", JSON.stringify(action.payload));
      return { ...state, accountDetails: action.payload };
    case "ACCOUNTSESSION":
      Cookies.set("accountSession", JSON.stringify(action.payload));
      return { ...state, accountSession: action.payload };

    default:
      return state;
  }
}
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
