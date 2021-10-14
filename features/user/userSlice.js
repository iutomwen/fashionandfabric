import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../libs/supabaseClient";
import { getAllPersonal } from "../personal/personalSlice";
import { getAllProducts } from "../shops/productSlice";

export const loadFromLocal = createAsyncThunk(
  "user/loadFromLocal",
  async (data, { dispatch, getState }) => {
    const session = supabase.auth.session();

    if (session) {
      const { id } = session.user;
      dispatch(userDetails({ id }));
      // getState().user.userSession= session
    }
    return session;
  }
);
export const userLogin = createAsyncThunk(
  "user/userLogin",
  async ({ email, password }, { dispatch, getState }) => {
    const { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });
    if (user) {
      const { id } = user;
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", id)
        .single();
      const { role } = data;
      console.log("log: ", role);
      if (role === "personal" || role === "business") {
        const { error } = await supabase.auth.signOut();
        localStorage.clear();
      }

      dispatch(userDetails({ id }));
      //set localstorage to save data locally
      if (typeof window !== "undefined") {
        localStorage.setItem("userSession", JSON.stringify(user));
      }
    }
    return { error, user, session };
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  const { error } = await supabase.auth.signOut();
  localStorage.clear();
  return error;
});

export const userRegistration = createAsyncThunk(
  "user/userRegistration",
  async ({ email, password, firstName, lastName, role }) => {
    const { user, session, error } = await supabase.auth.signUp(
      {
        email: email,
        password: password,
      },
      {
        data: {
          firstName,
          lastName,
          role,
        },
      }
    );

    console.log(error);
    if (error) throw error;
    if (!error && user) {
      // console.log("userlog: ", user.id);
      const { data, error } = await supabase
        .from("user_roles")
        .update({ role: role })
        .eq("user_id", user.id);
      if (data) {
        //check if user.role is staff
        if (role == "staff") {
          const { id } = user;
          dispatch(userDetails({ id }));
          // if (typeof window !== "undefined") {
          //   localStorage.setItem("userSession", JSON.stringify(user));
          // }
        }
        if (role === "personal" || role === "business") {
          supabase.auth.signOut();
          return {
            message: "Account Created",
            status: 201,
          };
        }
      }

      //set localstorage to save data locally
    }
    return { error, user, session };
  }
);

export const userDetails = createAsyncThunk(
  "user/userDetails",
  async ({ id }, { getState }) => {
    let { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();
    if (typeof window !== "undefined") {
      localStorage.setItem("userInfo", JSON.stringify(users));
    }
    return users;
  }
);

export const userPasswordReset = createAsyncThunk(
  "user/userPasswordReset",
  async ({ email }) => {
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(
      email
    );
    return { error, data };
  }
);
if (typeof window !== "undefined") {
  const sessionLog = localStorage.getItem("userInfo")
    ? localStorage.getItem("userInfo")
    : null;

  const userlog = localStorage.getItem("userSession")
    ? localStorage.getItem("userSession")
    : null;
}
const initialState = {
  userInfo: {},
  userSession: {},
  errorLog: {},
  pending: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [loadFromLocal.pending]: (state) => {
      state.pending = true;
      state.errorLog = {};
    },
    [loadFromLocal.fulfilled]: (state, { payload }) => {
      state.pending = false;
      state.userSession = payload;
    },
    [loadFromLocal.rejected]: (state, { payload }) => {
      state.pending = false;
      state.errorLog = payload;
    },
    [userRegistration.pending]: (state) => {
      state.pending = true;
      state.errorLog = {};
    },
    [userRegistration.fulfilled]: (state, { payload }) => {
      state.pending = false;
      state.userSession = payload;
    },
    [userRegistration.rejected]: (state, { payload }) => {
      state.pending = false;
      state.errorLog = payload;
    },
    [userDetails.pending]: (state) => {
      state.pending = true;
      state.errorLog = {};
    },
    [userDetails.fulfilled]: (state, { payload }) => {
      state.pending = false;
      state.userInfo = payload;
      state.errorLog = {};
    },
    [userLogin.pending]: (state) => {
      state.pending = true;
      state.errorLog = {};
    },
    [userLogin.fulfilled]: (state, actions) => {
      state.pending = false;
      state.userSession = actions.payload;
      state.errorLog = actions.payload.error;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.pending = false;
      state.errorLog = payload;
    },
    [userPasswordReset.pending]: (state) => {
      state.pending = true;
      state.errorLog = {};
    },
    [userPasswordReset.fulfilled]: (state, actions) => {
      state.pending = false;
      if (actions.payload.error) {
        state.errorLog = actions.payload.error;
      }
      state.userSession = actions.payload.data;
    },
    [userPasswordReset.rejected]: (state, actions) => {
      state.pending = false;
      state.errorLog = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { saveSession } = userSlice.actions;

export default userSlice.reducer;
