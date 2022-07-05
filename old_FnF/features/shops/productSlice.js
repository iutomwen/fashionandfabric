import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../libs/supabaseClient";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: null,
  },
  reducers: {
    setProducts: (state, { payload }) => {
      state.products = payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
