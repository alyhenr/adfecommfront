import { configureStore } from "@reduxjs/toolkit"
import productReducer, { type ProductState } from "../reducers/productReducer.ts"
import filteredProductReducer, { type FilteredProductState } from "../reducers/filteredProductReducer.ts";  
import errorReducer, { type ErrorState } from "../reducers/errorReducer.ts";
import categoryReducer, { type CategoryState } from "../reducers/categoryReducer.ts";
import cartReducer, { type CartState } from "../reducers/cartReducer.ts";
import authReducer, { type  AuthState } from "../reducers/authReducer.ts";
import type { AddressState } from "./addressReducer.ts";
import addressReducer from "./addressReducer.ts";
import { validateLocalStoredItems } from "../../utils/common.ts";
import type { OrderState } from "../reducers/orderReducer.ts";
import orderReducer from "../reducers/orderReducer.ts";
import { OrderStatus } from "../../types/index.ts";

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
        pagination: {
            pageNumber: 0,
            pageSize: 0,
            totalElements: 0,
            totalPages: 0,
            lastPage: false
        }
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
            userId: 0,
            username: "",
            email: "",
            roles: []
        },
    },
    addressState: {
        addresses: []
    },
    orderState: {
        addressId: 0,
        products: [],
        status: OrderStatus.WAITING_PAYMENT,
        totalPrice: 0
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
        const authState = localStorage.getItem("loggedInUser")
        if (authState) {
            initialState.authState = JSON.parse(authState)
        }
    } catch (error) {
        console.error('Error loading auth state:', error)
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
    },
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false // Disable serializable check if needed
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;