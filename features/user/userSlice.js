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

export const userPasswordReset = createAsyncThunk(
  "user/userPasswordReset",
  async ({ email }) => {
    // console.log(email);
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(
      email
    );
    return { error, data };
  }
);
const initialState = {
  userInfo: {},
  userPasswordResetError: {},
  userPasswordResetDetails: {},
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
      state.userPasswordResetDetails = {};
      state.userPasswordResetError = {};
    },
    [userLogin.fulfilled]: (state, actions) => {
      state.pending = false;
      if (actions.payload.error.status == 400) {
        state.loginError = actions.payload.error;
      }
      state.userInfo = actions.payload.user;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.pending = false;
      state.loginError = payload.error;
    },
    [userPasswordReset.pending]: (state) => {
      state.pending = true;
      state.loginError = {};
      state.userPasswordResetDetails = {};
      state.userPasswordResetError = {};
    },
    [userPasswordReset.fulfilled]: (state, actions) => {
      state.pending = false;
      if (actions.payload.error) {
        state.userPasswordResetError = actions.payload.error;
      }
      state.userPasswordResetDetails = actions.payload.data;
    },
    [userPasswordReset.rejected]: (state, actions) => {
      state.pending = false;
      state.userPasswordResetError = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { userLogin } = userSlice.actions;

export default userSlice.reducer;
