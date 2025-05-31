import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction, } from "@reduxjs/toolkit"
import type { Cart, Product } from "../../types"

export type CartState = Cart

const initialState: CartState = {
    cartId: 0,
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
        setCartItems: (state, action: PayloadAction<Cart>) => {
            state.products = action.payload.products;
            state.totalPrice = action.payload.totalPrice;
        },
        addToCart: (state, action: PayloadAction<Product>) => {
            state.products = [...state.products, action.payload];
            state.totalPrice += action.payload.price;
        },
        removeFromCart: (state, action: PayloadAction<Product>) => {
            state.products = state.products.filter((p: Product) => p.productId !== action.payload.productId);
            state.totalPrice -= action.payload.price;
        },
    },
});

export const { fetchCart, setCartItems, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
