import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AddressState } from "../../types/address";

const initialState: AddressState = {
    addresses: []
};

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        setAddresses: (
            state,
            action: PayloadAction<AddressState>
        ) => {
            state.addresses = action.payload.addresses;
        },
    },
});

export const { setAddresses } = addressSlice.actions;
export default addressSlice.reducer; 