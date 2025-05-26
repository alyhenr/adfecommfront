import { fetchProducts as setProducts } from "../reducers/productReducer";
import { fetchCategories as setCategories } from "../reducers/categoryReducer"

import type { Dispatch } from "@reduxjs/toolkit";

import api from "../../api/api";

import type { CategoriesResponse, Product, ProductsResponse } from "../../types";

import { AxiosError, type AxiosResponse } from "axios";
import { setError } from "../reducers/errorReducer";
import type { RootState } from "../reducers/store";
import { addItemToCart } from "../reducers/cartReducer";

export const fetchProductsThunk = (queryString: string = "") => async (dispatch: Dispatch) => {
  // console.log("fetching products");
  try {
    dispatch(setError({ errorMessage: "", isLoading: true}))
    await new Promise(r => setTimeout(r, 1000)); //testing loading state
    // console.log(`/public/products?${queryString}`);
    
    const { data }: AxiosResponse<ProductsResponse> = await api.get(`/public/products?${queryString}`);
    // console.log(data);
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
  // console.log("fetching categories");

  try {
    dispatch(setError({ errorMessage: "", isLoading: true}))
    await new Promise(r => setTimeout(r, 1000)); //testing loading state
    // console.log(`/public/categories?${queryString}`);
    
    const { data }: AxiosResponse<CategoriesResponse> = await api.get(`/public/categories?${queryString}`);
    // console.log(data);
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

export const addToCart = (data: Product, updateQtde: boolean = false) => (dispatch: Dispatch, currState: () => RootState) : { addedToCart: boolean, message: string, type: string }=> {
  const state = currState();
  const { products: cartItems } = state.cartState;
  const existingProduct = state.productsState.products.find(p => p.productId === data.productId);
  if (!existingProduct) return {addedToCart: false, message: "Product not found, please refresh the page", type: "alert" };
  
  let updatedCartItems = [...cartItems];
  let foundProduct = updatedCartItems.find(p => p.productId === data.productId)
  
  if (foundProduct) {

    if (!updateQtde) return {addedToCart: false, message: `${data.productName} already in cart`, type: "ok"};

    if (foundProduct.quantity < existingProduct.quantity) {
      updatedCartItems = updatedCartItems.map(item => {
        if (item.productId == foundProduct.productId) {
          return { ...foundProduct, quantity: foundProduct.quantity + (updateQtde ? 1 : 0)  }
        } else {
          return item
        }
      })
    }
  } else {
    updatedCartItems.push({ ...existingProduct, quantity: 1 });
  }

  const updatedTotal = updatedCartItems.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );  

  localStorage.setItem("cartItems", JSON.stringify({
    products: updatedCartItems,
    totalPrice: updatedTotal,
  }))

  dispatch(
    addItemToCart({
      products: updatedCartItems,
      totalPrice: updatedTotal,
    })
  );

  return {addedToCart: true, message: `${data.productName} added to cart`, type: "ok"};
};