import { useEffect } from "react";
import Router from "next/router";
import { supabase } from "@/utils/supabase";
import { useDispatch } from "react-redux";
import {
  fetchAccountDetails,
  logoutUserAccount,
} from "@/utils/slices/accountSlice";

const withGuest = (Component) => {
  const Auth = (props) => {
    const user = supabase.auth.user();
    // console.log("guest: ", user);
    const dispatch = useDispatch();
    useEffect(() => {
      if (user) {
        if (user?.user_metadata.role === "staff") {
          dispatch(fetchAccountDetails(user.id));
          Router.push("/dashboard");
        } else {
          dispatch(logoutUserAccount());
          Router.push("/");
        }
      }
    });

    return <Component {...props} />;
  };

  return Auth;
};

export default withGuest;
