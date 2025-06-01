import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../../types/auth";
import type { User } from "../../../types";

const initialState: AuthState = {
    user: {
        userId: -1,
        email: "",
        username: "",
        roles: [],
    },
    expiresIn: 0,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (
            state,
            action: PayloadAction<{
                user: User;
                expiresIn: number;
            }>
        ) => {
            state.user = action.payload.user;
            state.expiresIn = action.payload.expiresIn;
        },
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer; 