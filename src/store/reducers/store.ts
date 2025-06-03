import { configureStore } from "@reduxjs/toolkit"

import productReducer from "../reducers/products/productReducer.ts"
import filteredProductReducer from "../reducers/products/filteredProductReducer.ts";  
import errorReducer from "../reducers/errors/errorReducer.ts";
import categoryReducer from "../reducers/categories/categoryReducer.ts";
import cartReducer from "../reducers/cart/cartReducer.ts";
import authReducer from "../reducers/auth/authReducer.ts";
import addressReducer from "../reducers/address/addressReducer.ts";
import userReducer from "../reducers/user/userReducer.ts";
import orderReducer from "../reducers/order/orderReducer.ts";

import type { ErrorState } from "../types/errors/index.ts";
import type { ProductState } from "../types/products/index.ts";
import type { FilteredProductState } from "../types/products/index.ts";
import type { CategoryState } from "../types/categories/index.ts";
import type { CartState } from "../types/cart/index.ts";
import type { AuthState } from "../types/auth/index.ts";
import type { UserState } from "../types/user/index.ts";
import type { AddressState } from "../types/address/index.ts";
import type { OrderState } from "../types/order/index.ts";

import { validateLocalStoredItems } from "../../utils/common.ts";
import { getStoredAuthData, isTokenValid, clearAuthData } from "../../utils/auth.ts";

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
    filteredProductsState: FilteredProductState,
    categoriesState: CategoryState,
    cartState: CartState,
    authState: AuthState,
    addressState: AddressState,
    orderState: OrderState,
    userState: UserState,
} = {
    errorsState: {
        isLoading: false,
        errorMessage: ""
    },
    productsState: {
        products: [],
        pagination
    },
    filteredProductsState: {
        filteredProducts: [],
    },
    categoriesState: {
        categories: [],
        pagination
    },
    cartState: {
        cartId: 0,
        products: [],
        totalPrice: 0
    },
    authState: {
        user: {
            userId: -1,
            username: "",
            email: "",
            roles: []
        },
        expiresIn: 0,
    },
    addressState: {
        addresses: []
    },
    orderState: {
        orders: [],
    },
    userState: {
        profile: {
            userId: 0,
            username: "",
            email: "",
            createdAt: "",
            updatedAt: "",
        },
        purchases: []
    },
}

// Only access localStorage in browser environment
if (typeof window !== 'undefined') {
    try {
        const cartItemsState = localStorage.getItem("cartItems")
        if (cartItemsState && validateLocalStoredItems("cartItems")) {
            initialState.cartState = JSON.parse(cartItemsState)
        }
    } catch (error) {
        console.error('Error loading cart state:', error)
    }

    try {
        // Check for stored auth data and validate token
        const authData = getStoredAuthData();
        if (authData && isTokenValid()) {
            initialState.authState = {
                user: authData.user,
                expiresIn: authData.expiresAt,
            };
        } else if (authData) {
            // If token is expired, clear auth data
            clearAuthData();
        }
    } catch (error) {
        console.error('Error loading auth state:', error)
        clearAuthData();
    }
}

export const store = configureStore({
    reducer: {
        errorsState: errorReducer,
        productsState: productReducer,
        filteredProductsState: filteredProductReducer,
        categoriesState: categoryReducer,
        cartState: cartReducer,
        authState: authReducer,
        addressState: addressReducer,
        orderState: orderReducer,
        userState: userReducer,
    },
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false // Disable serializable check if needed
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;