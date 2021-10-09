import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../libs/supabaseClient";

export const getAllSettings = createAsyncThunk(
  "user/getAllSettings",
  async () => {
    let { data: app_settings, error } = await supabase
      .from("app_settings")
      .select("status,layout,currency ");

    if (error) throw error;
    if (typeof window !== "undefined") {
      localStorage.setItem("appSettings", JSON.stringify(app_settings));
    }
    return app_settings;
  }
);

export const countPersonalUsers = createAsyncThunk(
  "user/countPersonalUsers",
  async () => {
    let {
      data: user_roles,
      error,
      count,
    } = await supabase
      .from("user_roles")
      .select(
        ` *,
  users:user_id (id) `,
        { count: "exact", head: true }
      )
      .eq("role", "personal")
      .neq("role", "admin")
      .neq("role", "staff");
    if (error) throw error;
    if (typeof window !== "undefined") {
      localStorage.setItem("totalPersonalUsers", JSON.stringify(count));
    }
    return count;
  }
);

export const countBusinessUsers = createAsyncThunk(
  "user/countBusinessUsers",
  async () => {
    let {
      data: user_roles,
      error,
      count,
    } = await supabase
      .from("user_roles")
      .select(
        ` *,
    users:user_id (id) `,
        { count: "exact", head: true }
      )
      .eq("role", "business")
      .neq("role", "admin")
      .neq("role", "staff");
    if (error) throw error;
    if (typeof window !== "undefined") {
      localStorage.setItem("totalBusinessUsers", JSON.stringify(count));
    }
    return count;
  }
);
const initialState = {
  appSettings: {},
  appSubcriptions: {},
  totalUsers: 0,
  totalPersonalUsers: 0,
  totalBusinessUsers: 0,
  totalAdminStaffUsers: 0,
  totalAdminUsers: 0,
  totalProctucts: 0,
  appError: null,
  appPending: false,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllSettings.pending]: (state) => {
      state.appPending = true;
    },
    [getAllSettings.fulfilled]: (state, { payload }) => {
      state.appPending = false;
      state.appSettings = payload;
    },
    [getAllSettings.rejected]: (state, { payload }) => {
      state.appPending = false;
      state.appError = payload;
    },
    [countPersonalUsers.pending]: (state) => {
      state.appPending = true;
    },
    [countPersonalUsers.fulfilled]: (state, { payload }) => {
      state.appPending = false;
      state.totalPersonalUsers = payload;
    },
    [countPersonalUsers.rejected]: (state, { payload }) => {
      state.appPending = false;
      state.appError = payload;
    },
    [countBusinessUsers.pending]: (state) => {
      state.appPending = true;
    },
    [countBusinessUsers.fulfilled]: (state, { payload }) => {
      state.appPending = false;
      state.totalBusinessUsers = payload;
    },
    [countBusinessUsers.rejected]: (state, { payload }) => {
      state.appPending = false;
      state.appError = payload;
    },
  },
});

export default generalSlice.reducer;
