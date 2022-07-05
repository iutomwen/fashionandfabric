import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { editUser, usersDetails } from "../services";

export const fetchUsersDetails = createAsyncThunk(
  "users/fetchUsersDetails",
  async (limit) => {
    try {
      const { users, error } = await usersDetails(limit);
      if (error) throw error;
      return users;
    } catch (error) {
      return error;
    }
  }
);

export const editUserDetails = createAsyncThunk(
  "users/editUserDetails",
  async (id, data) => {
    try {
      const { info, error } = await editUser(id, data);
      if (error) throw error;
      return info;
    } catch (error) {
      return error;
    }
  }
);
export const clearUsers = createAsyncThunk("users/clearUsers", async () => {
  return { data: [] };
});
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsersDetails.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUsersDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(editUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editUserDetails.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(editUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(clearUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(clearUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    });
  },
});

export default usersSlice.reducer;
