import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { Pagination, Category, CategoriesResponse } from "../../types"

export type CategoryState = {
    categories: Category[],
    pagination: Pagination,
}

const initialState: CategoryState = {
    categories: [],
    pagination: {
        pageNumber: 0,
        lastPage: true,
        pageSize: 0,
        totalElements: 0,
        totalPages: 0,
    },
}

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        fetchCategories: (
            state,
            action: PayloadAction<CategoriesResponse>
        ) => {
            state.categories = action.payload.content;
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

export const { fetchCategories } = categorySlice.actions;
export default categorySlice.reducer;
