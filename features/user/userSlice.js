import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../libs/supabaseClient";

// First, create the thunk
export const userLogin = createAsyncThunk(
  "user/userLogin",
  async ({ email, password }) => {
    const { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });
    return { error, user, session };
  }
);
const initialState = {
  userInfo: {},
  pending: false,
  loginError: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.pending = true;
      state.loginError = {};
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.pending = false;
      state.userInfo = payload;
    },
    [userLogin.rejected]: (state, { payload }) => {
      console.log("payload: ", state);
      state.pending = false;
      state.loginError = error;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { userLogin } = userSlice.actions;

export default userSlice.reducer;
