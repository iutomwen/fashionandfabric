import { useContext, useEffect } from "react";
import { Store } from "../utils/Store";
import { supabase } from "./supabaseClient";

function useNotifications(notifications) {
  const { dispatch } = useContext(Store);
  const { notifications } = state;
  const {
    notifyid,
    user_id,
    notify_type,
    notify_url,
    notification,
    created_at,
  } = notifications;

  async function doNotify() {
    try {
      const { data, error } = await supabase.from("notifications").insert([
        {
          notifyid,
          user_id,
          notify_type,
          notify_url,
          notification,
          created_at,
        },
      ]);
      if (error) throw error;
      if (data) {
        dispatch({ type: "ADD_NEW_NOTIFICATION", payload: data });
      }
    } catch (error) {
      console.log("notify error:", error);
    }
  }
  useEffect(() => {
    doNotify();
  });

  return {
    data: null,
    loading: true,
    error: null,
  };
}

export default useNotifications;
