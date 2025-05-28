import { fetchProducts as setProducts } from "../reducers/productReducer";
import { fetchCategories as setCategories } from "../reducers/categoryReducer"

import type { Dispatch } from "@reduxjs/toolkit";

import api from "../../api/api";

import type { Address, CategoriesResponse, Product, ProductsResponse, User } from "../../types";

import { AxiosError, type AxiosResponse } from "axios";
import { setError } from "../reducers/errorReducer";
import { initialState, type RootState } from "../reducers/store";
import { setCartItems } from "../reducers/cartReducer";
import { truncateText } from "../../utils/common";
import type { LoginRequest } from "../../components/auth/Login";
import { fetchUser as setUser } from "../reducers/authReducer";
import type { SignUpRequest } from "../../components/auth/SignUp";
import { fetchAddresses as setAddresses} from "../reducers/addressReducer";

export const authenticateUser = (credentials: LoginRequest)  => async (dispatch: Dispatch) : Promise<{
  success: boolean, message: string, redirectTo: string
}> => {
  try {
    await new Promise(r => setTimeout(r, 1000)); //testing loading state
    const { data : user }: AxiosResponse<User> = await api.post(`/auth/sign-in`, credentials)
    
    if (user instanceof AxiosError) throw user;

    localStorage.setItem("loggedInUser", JSON.stringify({
      user
    }))
    
    dispatch(
      setUser({
        user: user
      })
    )
    
    return { success: true, message: `Bem vindo novamente ${user.username}`, redirectTo: "/" }
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error?.response?.data?.message, redirectTo: "/login" }
    }
  }

  return { success: false, message: "Falha ao realizar login", redirectTo: "/login" }
}

export const registerUser = (userData : SignUpRequest) => async (_dispatch: Dispatch) => {
  try {
    await new Promise(r => setTimeout(r, 1000)); //testing loading state
    const { data }: AxiosResponse<User> = await api.post(`/auth/sign-up`, userData)
    
    if (data instanceof AxiosError) throw data;
    
    return { success: true, message: `Registrado com sucesso`, redirectTo: "/login" }
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error?.response?.data?.message, redirectTo: "/sign-up" }
    }
  }
  return { success: false, message: "Failed to create account", redirectTo: "/sign-up" }
}

export const logoutUser = () => async (dispatch: Dispatch) => {
  localStorage.removeItem("loggedInUser")
  dispatch(setUser({
    user: {
      userId: -1, email: "", username: "", roles: [], 
    }
  }))
  //TODO: invalidate token on backend
}

export const fetchProductsThunk = (queryString: string = "") => async (dispatch: Dispatch) => {
  try {
    dispatch(setError({ errorMessage: "", isLoading: true}))
    await new Promise(r => setTimeout(r, 1000)); //testing loading state

    
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
    dispatch(setError({ errorMessage: "", isLoading: false}))
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError)     
      dispatch(setError({ errorMessage: error?.response?.data?.message || "Fail to fetch products...", isLoading: false}))
  }
  
}

export const addToCart = (data: Product, updateQtde: boolean = false) => (dispatch: Dispatch, currState: () => RootState) : { addedToCart: boolean, message: string, type: string } => {
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
    } else {
      return { addedToCart: false, message: `${truncateText(data.productName, 50)} is out of stock`, type: "alert" };
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
    setCartItems({
      products: updatedCartItems,
      totalPrice: updatedTotal,
    })
  );

  return {addedToCart: true, message: `${truncateText(data.productName, 50)} added to cart`, type: "ok"};
};

export const removeFromCart = (productId: number, clean: boolean = false) => (dispatch: Dispatch, currState: () => RootState) : { removedFromCart: boolean, message: string, type: string } => {
  const state = currState();
  const { products: cartItems } = state.cartState;
  const existingProduct = state.productsState.products.find(p => p.productId === productId);
  if (!existingProduct) return { removedFromCart: false, message: "Product not found, please refresh the page", type: "alert" };

  let updatedCartItems : Product[] = [ ...cartItems ]
  let foundProduct = updatedCartItems.find(p => p.productId === productId)  
  
  if (!foundProduct) return { removedFromCart: false, message: `${truncateText(existingProduct.productName, 50)} not in the cart`, type: "alert" };

  if (clean || foundProduct.quantity <= 1) {
    updatedCartItems = cartItems.filter(i => i.productId != productId)
  } else {
    updatedCartItems = cartItems.map(i => {
      if (i.productId == productId) return { ...i, quantity: i.quantity - 1 }
      return i
    })
  }

  const updatedTotal = updatedCartItems.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  )

  localStorage.setItem("cartItems", JSON.stringify({
    products: updatedCartItems,
    totalPrice: updatedTotal,
  }))

  dispatch(
    setCartItems({
      products: updatedCartItems,
      totalPrice: updatedTotal
    })
  )

  return { removedFromCart: true, message: `${truncateText(existingProduct.productName, 50)} removed from cart`, type: "alert" };
}

export const fetchAddressThunk = () => async (dispatch: Dispatch) : Promise<void> => {
  try {
    dispatch(setError({ errorMessage: "", isLoading: true}))
    await new Promise(r => setTimeout(r, 1000)); //testing loading state
    
    const { data }: AxiosResponse<Address[]> = await api.get(`/users/addresses/user`);
    console.log(data);
    
    if (data instanceof AxiosError) throw data;

    dispatch(
      setAddresses({
        addresses: data
      }),
    );
    dispatch(setError({ errorMessage: "", isLoading: false}))
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      dispatch(setError({ errorMessage: error?.response?.data?.message || "Fail to fetch addresses...", isLoading: false}))
    }
  }
}

export const addAddress = (address: Address) => async (dispatch: Dispatch, currState: () => RootState) : Promise<{ success: boolean, message: string }> => {
  const state = currState();
  const { addresses } = state.addressState;
  try {
    dispatch(setError({ errorMessage: "", isLoading: true}))
    await new Promise(r => setTimeout(r, 1000)); //testing loading state
    
    const { data }: AxiosResponse<Address> = await api.post(`/users/addresses/user/address`, address);
    
    if (data instanceof AxiosError) throw data;

    dispatch(
      setAddresses({
        addresses: [...addresses, data]
      }),
    );
    dispatch(setError({ errorMessage: "", isLoading: false}))

    return { success: true, message: "Endereço cadastrado com sucesso" }
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      dispatch(setError({ errorMessage: error?.response?.data?.message || "Fail to fetch addresses...", isLoading: false}))

      return { success: false, message: "Falha ao cadastrar endereço: " + error?.response?.data?.message }
    }
    
    return { success: false, message: "Falha ao cadastrar endereço"}
  }
}