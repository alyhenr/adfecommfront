import { configureStore } from "@reduxjs/toolkit"
import productReducer, { type ProductState } from "../reducers/productReducer.ts"
import errorReducer, { type ErrorState } from "../reducers/errorReducer.ts";
import categoryReducer, { type CategoryState } from "../reducers/categoryReducer.ts";
import cartReducer, { type CartState } from "../reducers/cartReducer.ts";

const pagination = {
    pageNumber: 0,
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
    lastPage: false
}
const initialState : {
    errorsState : ErrorState,
    productsState : ProductState
    categoriesState: CategoryState
    cartState: CartState
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
    }
}

try {
    const cartItemsState = localStorage.getItem("cartItems")
    if (cartItemsState) initialState.cartState = JSON.parse(cartItemsState)
} catch (error) {}



export const store = configureStore({
    reducer: {
        errorsState: errorReducer,
        productsState: productReducer,
        categoriesState: categoryReducer,
        cartState: cartReducer,
    },
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;