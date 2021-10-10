import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../libs/supabaseClient";

export const getAllPersonal = createAsyncThunk(
  "user/getAllPersonal",
  async () => {
    let { data: user_roles, error } = await supabase
      .from("user_roles")
      .select(
        ` 
        users:user_id (id, first_name, username, last_name, phone) `
      )
      .eq("role", "personal")
      .neq("role", "admin");
    if (error) throw error;
    // if (typeof window !== "undefined") {
    //   localStorage.setItem("personalAccounts", JSON.stringify(user_roles));
    // }
    // dispatch(getAllProducts());
    return user_roles;
  }
);
const initialState = {
  personal: [],
  error: null,
  loading: true,
};

export const personalSlice = createSlice({
  name: "personal",
  initialState,
  extraReducers: {
    [getAllPersonal.pending]: (state) => {
      state.loading = true;
    },
    [getAllPersonal.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.personal = payload;
    },
    [getAllPersonal.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default personalSlice.reducer;
