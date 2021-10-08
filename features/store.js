import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import personalReducer from "./personal/personalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    personal: personalReducer,
  },
});
