import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction, } from "@reduxjs/toolkit"
import type { Address, User } from "../../types"

export type AuthState = {
    user: User,
}

const initialState: AuthState = {
    user: {
        userId: 0,
        username: "",
        email: "",
        roles: []
    },
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        fetchUser: (
            state,
            action: PayloadAction<AuthState>
        ) => {
            state.user = action.payload.user
        },
    },
});

export const { fetchUser } = authSlice.actions;
export default authSlice.reducer;
