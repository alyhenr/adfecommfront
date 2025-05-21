import { fetchProducts as setProducts } from "../reducers/productReducer";
import { fetchCategories as setCategories } from "../reducers/categoryReducer"

import type { Dispatch } from "@reduxjs/toolkit";

import api from "../../api/api";

import type { CategoriesResponse, ProductsResponse } from "../../types";

import { AxiosError, type AxiosResponse } from "axios";
import { setError } from "../reducers/errorReducer";

export const fetchProductsThunk = (queryString: string = "") => async (dispatch: Dispatch) => {
  console.log("fetching products");
  try {
    dispatch(setError({ errorMessage: "", isLoading: true}))
    await new Promise(r => setTimeout(r, 1000)); //testing loading state
    console.log(`/public/products?${queryString}`);
    
    const { data }: AxiosResponse<ProductsResponse> = await api.get(`/public/products?${queryString}`);
    console.log(data);
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
    dispatch(setError({ errorMessage: "", isLoading: false}))
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError)     
      dispatch(setError({ errorMessage: error?.response?.data?.message || "Fail to fetch products...", isLoading: false}))
  }
};


export const fetchCategoriesThunk = (queryString: string = "")  => async (dispatch: Dispatch) => {
  console.log("fetching categories");

  try {
    dispatch(setError({ errorMessage: "", isLoading: true}))
    await new Promise(r => setTimeout(r, 1000)); //testing loading state
    console.log(`/public/categories?${queryString}`);
    
    const { data }: AxiosResponse<CategoriesResponse> = await api.get(`/public/categories?${queryString}`);
    console.log(data);
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
    dispatch(setError({ errorMessage: "", isLoading: false}))
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError)     
      dispatch(setError({ errorMessage: error?.response?.data?.message || "Fail to fetch products...", isLoading: false}))
  }
  
}