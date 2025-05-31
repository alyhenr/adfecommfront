import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ProductState, ProductsResponse } from "../../types/products";

const initialState: ProductState = {
    products: [],
    pagination: {
        pageNumber: 0,
        pageSize: 0,
        totalElements: 0,
        totalPages: 0,
        lastPage: false
    }
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        fetchProducts: (
            state,
            action: PayloadAction<ProductsResponse>
        ) => {
            state.products = action.payload.content;
            state.pagination = {
                pageNumber: action.payload.pageNumber,
                pageSize: action.payload.pageSize,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                lastPage: action.payload.lastPage,
            };
        },
    },
});

export const { fetchProducts } = productSlice.actions;
export default productSlice.reducer; 