import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { Category, Pagination, Product } from "../../types"

export type ProductState = {
    products: Product[],
    categories: Category[],
    pagination: Pagination,
}

const initialState: ProductState = {
    products: [],
    categories: [],
    pagination: {
        pageNumber: 0,
        lastPage: true,
        pageSize: 0,
        totalElements: 0,
        totalPages: 0,
    },
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        fetchProducts: (
            state,
            action: PayloadAction<{
                content: Product[];
                pageNumber: number;
                lastPage: boolean;
                pageSize: number;
                totalElements: number;
                totalPages: number;
            }>
        ) => {
            state.products = action.payload.content;
            state.pagination = {
                ...state.pagination,
                pageNumber: action.payload.pageNumber,
                lastPage: action.payload.lastPage,
                pageSize: action.payload.pageSize,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
            };
        },
    },
});

export const { fetchProducts } = productSlice.actions;
export default productSlice.reducer;
