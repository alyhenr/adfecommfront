import { fetchProducts as setProducts } from "../reducers/productReducer"; // ✅ slice action
import type { Dispatch } from "@reduxjs/toolkit";
import api from "../../api/api";
import type { ProductsResponse } from "../../types";
import { AxiosError, type AxiosResponse } from "axios";
import { setError } from "../reducers/errorReducer";

export const fetchProductsThunk = () => async (dispatch: Dispatch) => {
  console.log("fetching products");
  try {
    dispatch(setError({ errorMessage: "", isLoading: true}))
    await new Promise(r => setTimeout(r, 1000)); //testing loading state
    const { data }: AxiosResponse<ProductsResponse> = await api.get(`/public/products`);
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
