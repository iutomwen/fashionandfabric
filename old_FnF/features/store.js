import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import personalReducer from "./personal/personalSlice";
import generalReducer from "./general/generalSlice";
import productReducer from "./shops/productSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: personalReducer,
    general: generalReducer,
    products: productReducer,
  },
});
