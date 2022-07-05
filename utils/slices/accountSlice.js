import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { accountDetails, signOutUser } from "../services";

export const fetchAccountDetails = createAsyncThunk(
  "account/fetchAccountDetails",
  async (id) => {
    const { accountInfo } = await accountDetails(id);
    return accountInfo;
  }
);

export const logoutUserAccount = createAsyncThunk(
  "account/logoutUserAccount",
  async () => {
    const { error } = await signOutUser();
    return error;
  }
);
const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAccountDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAccountDetails.fulfilled, (state, action) => {
      state.account = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAccountDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.meta;
    });
    builder.addCase(logoutUserAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUserAccount.fulfilled, (state, action) => {
      state.loading = false;
      state.account = {};
    });
    builder.addCase(logoutUserAccount.rejected, (state, action) => {
      state.loading = false;
      state.account = {};
      state.error = null;
    });
  },
});

export default accountSlice.reducer;
