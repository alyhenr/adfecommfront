import { fetchCategories as setCategories } from "../../reducers/categories/categoryReducer";
import { setError } from "../../reducers/errors/errorReducer";
import type { Dispatch } from "@reduxjs/toolkit";
import type { CategoriesResponse } from "../../../types";
import { AxiosError, type AxiosResponse } from "axios";
import api from "../../../api/api";

export const fetchCategoriesThunk = (queryString: string = "") => async (dispatch: Dispatch) => {
    try {
        dispatch(setError({ errorMessage: "", isLoading: true }));
        
        const { data }: AxiosResponse<CategoriesResponse> = await api.get(`/public/categories?${queryString}`);
        
        if (data instanceof AxiosError) throw data;

        dispatch(
            setCategories({
                content: data.content,
                pageNumber: data.pageNumber,
                pageSize: data.pageSize,
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                lastPage: data.lastPage,
            }),
        );
        dispatch(setError({ errorMessage: "", isLoading: false }));
    } catch (error) {
        if (error instanceof AxiosError)     
            dispatch(setError({ 
                errorMessage: error?.response?.data?.message || "Falha ao buscar categorias...", 
                isLoading: false 
            }));
    }
}; 