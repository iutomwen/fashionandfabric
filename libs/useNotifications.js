import { useContext, useEffect } from "react";
import { Store } from "../utils/Store";
import { supabase } from "./supabaseClient";
import toast from "react-hot-toast";

export default function useNotifications(notifications) {
  const { dispatch } = useContext(Store);
  async function doNotify(notifications) {
    const {
      notifyid,
      user_id,
      notify_type,
      notify_url,
      notification,
      created_at,
    } = notifications;
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
      toast.error(error);
      console.log("notify error:", error);
    }
  }
  useEffect(() => {
    doNotify(notifications);
  });
  return [notifications];
}
