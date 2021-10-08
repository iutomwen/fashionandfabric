import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../libs/supabaseClient";

export const getAllPersonal = createAsyncThunk(
  "user/getAllPersonal",
  async (data, { dispatch, getState }) => {
    let { data: user_roles, error } = await supabase
      .from("user_roles")
      .select(
        ` 
        users:user_id (id, first_name,username, last_name,phone) `
      )
      .eq("role", "personal")
      .range(0, 9);
    if (typeof window !== "undefined") {
      localStorage.setItem("personalAccounts", JSON.stringify(user_roles));
    }
    return user_roles;
  }
);
const initialState = {
  personalAccounts: {},
  personError: {},
  personPending: false,
};

export const personalSlice = createSlice({
  name: "personal",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllPersonal.pending]: (state) => {
      state.personPending = true;
    },
    [getAllPersonal.fulfilled]: (state, { payload }) => {
      state.personPending = false;
      state.personalAccounts = payload;
    },
    [getAllPersonal.rejected]: (state, { payload }) => {
      state.personPending = false;
      state.personError = payload;
    },
  },
});

export default personalSlice.reducer;
