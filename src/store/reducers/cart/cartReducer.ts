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
        getUserCart: (state, action: PayloadAction<CartResponse>) => {
            state.cartId = action.payload.cartId;
            state.products = action.payload.cartItems.map((ci: CartItem) => ci.product);
            state.totalPrice = action.payload.totalPrice;
        },
    },
});

export const { setCartItems } = cartSlice.actions;
export const { addToCart } = cartSlice.actions;
export const { removeFromCart } = cartSlice.actions;
export const { getUserCart } = cartSlice.actions;
export default cartSlice.reducer; 