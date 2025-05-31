import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../../types/auth";

const initialState: AuthState = {
    user: {
        userId: -1,
        email: "",
        username: "",
        roles: [],
    }
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (
            state,
            action: PayloadAction<AuthState>
        ) => {
            state.user = action.payload.user;
        },
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer; 