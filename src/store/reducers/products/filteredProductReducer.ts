import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FilteredProductState } from "../../types/products";
import type { Product } from "../../../types";

const initialState: FilteredProductState = {
    filteredProducts: [],
};

const filteredProductsSlice = createSlice({
    name: "filteredProducts",
    initialState,
    reducers: {
        setFilteredProducts: (
            state,
            action: PayloadAction<Product[]>
        ) => {
            state.filteredProducts = action.payload;
        },
    },
});

export const { setFilteredProducts } = filteredProductsSlice.actions;
export default filteredProductsSlice.reducer; 