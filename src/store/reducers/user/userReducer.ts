import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "../../types/user";

const initialState: UserState = {
    profile: {
        userId: 0,
        username: "",
        email: "",
        createdAt: "",
        updatedAt: "",
    },
    purchases: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        setPurchases: (state, action) => {
            state.purchases = action.payload;
        },
    },
});

export const { setProfile, setPurchases } = userSlice.actions;
export default userSlice.reducer; 