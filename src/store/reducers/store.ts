import { configureStore } from "@reduxjs/toolkit"
import productReducer from "../reducers/productReducer.ts"
import errorReducer from "../reducers/errorReducer.ts";
import categoryReducer from "../reducers/categoryReducer.ts";

export const store = configureStore({
    reducer: {
        productsState: productReducer,
        categoriesState: categoryReducer,
        errorsState: errorReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;