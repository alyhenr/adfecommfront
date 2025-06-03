import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartState } from "../../types/cart";
import type { CartItem, CartResponse, Product } from "../../../types";

const initialState: CartState = {
    cartId: 0,
    products: [],
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartItems: (
            state,
            action: PayloadAction<CartState>
        ) => {         
            state.cartId = action.payload.cartId;
            state.products = action.payload.products;
            state.totalPrice = action.payload.products.reduce((sum: number, p: Product) => sum + (p.price - (p.price * p.discount)) * p.quantity, 0);
        },
        addToCart: (state, action: PayloadAction<Product>) => {
            state.products = [...state.products, action.payload];
            state.totalPrice += (action.payload.price - (action.payload.price * action.payload.discount));
        },
        removeFromCart: (state, action: PayloadAction<Product>) => {
            state.products = state.products.filter((p: Product) => p.productId !== action.payload.productId);
            state.totalPrice -= (action.payload.price - (action.payload.price * action.payload.discount));
        },  
        getOrCreateUserCart: (state, action: PayloadAction<CartResponse>) => {
            state.cartId = action.payload.cartId;
            state.products = action.payload.cartItems.map((ci: CartItem) => ci.product);
            state.totalPrice = action.payload.cartItems.reduce((sum: number, ci: CartItem) => sum + (ci.price - (ci.price * ci.discount)) * ci.quantity, 0);
        },
    },
});

export const { setCartItems } = cartSlice.actions;
export const { addToCart } = cartSlice.actions;
export const { removeFromCart } = cartSlice.actions;
export const { getOrCreateUserCart } = cartSlice.actions;
export default cartSlice.reducer; 