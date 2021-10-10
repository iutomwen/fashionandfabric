import { formLabelClasses } from "@mui/material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../libs/supabaseClient";

export const getAllProducts = createAsyncThunk(
  "user/getAllPersonal",
  async () => {
    let { data: product, error } = await supabase.from("product").select(`
    approved, currency, name, price,id,
    store:store_id(name),
    category:category_id(name),
    sub_category:subCategory_id(name)
    `);
    if (error) throw error;
    if (typeof window !== "undefined") {
      localStorage.setItem("allProducts", JSON.stringify(product));
    }
    return product;
  }
);

const initialState = {
  products: [],
  error: null,
  loading: true,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: {
    [getAllProducts.pending]: (state) => {
      state.loading = true;
    },
    [getAllProducts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.products = payload;
    },
    [getAllProducts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export default productSlice.reducer;
