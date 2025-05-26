import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction, } from "@reduxjs/toolkit"
import type { Cart } from "../../types"

export type CartState = Cart

const initialState: CartState = {
    products: [],
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        fetchCart: (
            state,
            action: PayloadAction<Cart>
        ) => {
            state.products = action.payload.products;
            state.totalPrice = action.payload.totalPrice;
        },
        addItemToCart: (state, action: PayloadAction<Cart>) => {
            state.products = action.payload.products;
            state.totalPrice = action.payload.totalPrice;
        },
    },
});

export const { fetchCart } = cartSlice.actions;
export const { addItemToCart } = cartSlice.actions;
export default cartSlice.reducer;
