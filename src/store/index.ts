import { configureStore } from "@reduxjs/toolkit";

// Import reducers
import productReducer from "./reducers/products/productReducer";
import filteredProductReducer from "./reducers/products/filteredProductReducer";
import errorReducer from "./reducers/errors/errorReducer";
import categoryReducer from "./reducers/categories/categoryReducer";
import cartReducer from "./reducers/cart/cartReducer";
import authReducer from "./reducers/auth/authReducer";
import addressReducer from "./reducers/address/addressReducer";
import orderReducer from "./reducers/order/orderReducer";

// Import types
import type { RootState } from "./types/root";

// Define initial state
const pagination = {
    pageNumber: 0,
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
    lastPage: false
};

export const initialState: RootState = {
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
            email: "",
            username: "",
            roles: []
        },
        expiresIn: 0,
    },
    addressState: {
        addresses: []
    },
    orderState: {
        orders: []
    }
};

// Create store
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
        serializableCheck: false
    }),
});

// Export types
export type { RootState };
export type AppDispatch = typeof store.dispatch;