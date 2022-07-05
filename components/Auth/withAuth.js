import { useEffect } from "react";
import Router from "next/router";
import { supabase } from "@/utils/supabase";
import { useDispatch } from "react-redux";
import { logoutUserAccount } from "@/utils/slices/accountSlice";

const withAuth = (Component) => {
  const Auth = (props) => {
    const user = supabase.auth.user();
    // console.log("auth: ", user);
    const dispatch = useDispatch();
    useEffect(() => {
      if (!user) {
        dispatch(logoutUserAccount());
        Router.push("/");
      }
      if (user?.user_metadata.role !== "staff") {
        dispatch(logoutUserAccount());
        Router.push("/");
      }
    });

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
