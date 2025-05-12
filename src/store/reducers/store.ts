import { configureStore } from "@reduxjs/toolkit"
import productReducer from "../reducers/productReducer.ts"
import errorReducer from "../reducers/errorReducer.ts";

export const store = configureStore({
    reducer: {
        productsState: productReducer,
        errorsState: errorReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;