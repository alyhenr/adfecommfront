import { fetchProducts as setProducts } from "../reducers/productReducer"; // ✅ slice action
import type { Dispatch } from "@reduxjs/toolkit";
import api from "../../api/api";
import type { ProductsResponse } from "../../types";
import type { AxiosResponse } from "axios";

export const fetchProductsThunk = () => async (dispatch: Dispatch) => {
  console.log("fetching products");
  try {
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
      })
    );
  } catch (error) {
    console.log(error);
  }
};
