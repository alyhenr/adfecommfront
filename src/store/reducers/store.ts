import { configureStore } from "@reduxjs/toolkit"
import productReducer from "../reducers/productReducer.ts"

export const store = configureStore({
    reducer: {
        productsState: productReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;