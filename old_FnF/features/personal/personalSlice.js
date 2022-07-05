import { createSlice } from "@reduxjs/toolkit";

export const personalSlice = createSlice({
  name: "users",
  initialState: {
    users: null,
  },
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
  },
});
export const { setUsers } = personalSlice.actions;

export default personalSlice.reducer;
