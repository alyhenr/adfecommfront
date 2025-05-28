import { configureStore } from "@reduxjs/toolkit"
import productReducer, { type ProductState } from "../reducers/productReducer.ts"
import errorReducer, { type ErrorState } from "../reducers/errorReducer.ts";
import categoryReducer, { type CategoryState } from "../reducers/categoryReducer.ts";
import cartReducer, { type CartState } from "../reducers/cartReducer.ts";
import authReducer, { type  AuthState } from "../reducers/authReducer.ts";
import type { AddressState } from "./addressReducer.ts";
import addressReducer from "./addressReducer.ts";


const pagination = {
    pageNumber: 0,
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
    lastPage: false
}
export const initialState : {
    errorsState : ErrorState,
    productsState : ProductState,
    categoriesState: CategoryState,
    cartState: CartState,
    authState: AuthState,
    addressState: AddressState
} = {
    errorsState: {
        isLoading: false,
        errorMessage: ""
    },
    productsState: {
        products: [],
        pagination
    },
    categoriesState: {
        categories: [],
        pagination
    },
    cartState: {
        products: [],
        totalPrice: 0
    },
    authState: {
        user: {
            userId: 0,
            username: "",
            email: "",
            roles: []
        },
    },
    addressState: {
        addresses: []
    }
}

try {
    const cartItemsState = localStorage.getItem("cartItems")
    if (cartItemsState) initialState.cartState = JSON.parse(cartItemsState)     
} catch (error) {}

try {
    const authState = localStorage.getItem("loggedInUser")
    if (authState) initialState.authState = JSON.parse(authState)
} catch (error) {}

export const store = configureStore({
    reducer: {
        errorsState: errorReducer,
        productsState: productReducer,
        categoriesState: categoryReducer,
        cartState: cartReducer,
        authState: authReducer,
        addressState: addressReducer,
    },
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;