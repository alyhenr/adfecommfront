import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product, Pagination } from "../../types";

export type FilteredProductState = {
  filteredProducts: Product[];
  pagination: Pagination;
};

const initialState: FilteredProductState = {
  filteredProducts: [],
  pagination: {
    pageNumber: 1,
    totalPages: 1,
    totalElements: 0,
    pageSize: 10,
    lastPage: true,
  },
};

const filteredProductsSlice = createSlice({
  name: 'filteredProducts',
  initialState,
  reducers: {
    setFilteredProducts: (state, action: PayloadAction<Product[]>) => {
      state.filteredProducts = action.payload;
    },
  },
});

export const { setFilteredProducts } = filteredProductsSlice.actions;
export default filteredProductsSlice.reducer; 