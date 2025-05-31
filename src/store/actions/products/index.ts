import { fetchProducts as setProducts } from "../../reducers/products/productReducer";
import { setFilteredProducts } from "../../reducers/products/filteredProductReducer";
import type { Dispatch } from "@reduxjs/toolkit";
import type { Product, ProductsResponse } from "../../../types";
import { AxiosError, type AxiosResponse } from "axios";
import api from "../../../api/api";
import { setError } from "../../reducers/errors/errorReducer";

export const fetchProductsThunk = (queryString: string = "") => async (dispatch: Dispatch) => {
    try {
        dispatch(setError({ errorMessage: "", isLoading: true }));
        
        const { data }: AxiosResponse<ProductsResponse> = await api.get(`/public/products?${queryString}`);
        
        if (data instanceof AxiosError) throw data;

        dispatch(
            setProducts({
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
                errorMessage: error?.response?.data?.message || "Falha ao buscar produtos...", 
                isLoading: false 
            }));
    }
};

export const filterProducts = (products: Product[]) => (dispatch: Dispatch) => {
    dispatch(setFilteredProducts(products));
}; 