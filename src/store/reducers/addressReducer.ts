import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction, } from "@reduxjs/toolkit"
import type { Address } from "../../types"

export type AddressState = {
    addresses: Address[],
}

const initialState: AddressState = {
    addresses: []
}

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        fetchAddresses: (
            state,
            action: PayloadAction<AddressState>
        ) => {
            state.addresses = action.payload.addresses
        },
    },
});

export const { fetchAddresses } = addressSlice.actions;
export default addressSlice.reducer;
