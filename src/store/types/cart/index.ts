import type { Product, CartItem } from "../../../types";

export type CartState = {
    cartId: number;
    products: Product[];
    totalPrice: number;
};

export type CartResponse = {
    cartId: number;
    cartItems: CartItem[];
    totalPrice: number;
}; 