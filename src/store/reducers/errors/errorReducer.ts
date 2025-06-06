import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ErrorState } from "../../types/errors";

const initialState: ErrorState = {
    isLoading: true,
    errorMessage: "",
};

const errorSlice = createSlice({
    name: "errors",
    initialState,
    reducers: {
        setError: (
            state,
            action: PayloadAction<ErrorState>
        ) => {
            return {
                ...state,
                ...action.payload
            };
        },
    },
});

export const { setError } = errorSlice.actions;
export default errorSlice.reducer; 