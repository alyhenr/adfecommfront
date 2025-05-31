import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CategoryState, CategoriesResponse } from "../../types/categories";

const initialState: CategoryState = {
    categories: [],
    pagination: {
        pageNumber: 0,
        pageSize: 0,
        totalElements: 0,
        totalPages: 0,
        lastPage: false
    }
};

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
                pageNumber: action.payload.pageNumber,
                pageSize: action.payload.pageSize,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                lastPage: action.payload.lastPage,
            };
        },
    },
});

export const { fetchCategories } = categorySlice.actions;
export default categorySlice.reducer; 