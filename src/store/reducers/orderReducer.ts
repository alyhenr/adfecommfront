import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction, } from "@reduxjs/toolkit"
import { OrderStatus, type Product } from "../../types"

export type OrderState = {
    addressId: number,
    products: Product[],
    status: OrderStatus,
    totalPrice: number,
}


const initialState: OrderState = {
    addressId: 0,
    products: [],
    status: OrderStatus.WAITING_PAYMENT,
    totalPrice: 0
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrder: (state, action: PayloadAction<OrderState>) => {
            state.addressId = action.payload.addressId
            state.products = action.payload.products
            state.status = action.payload.status
            state.totalPrice = action.payload.totalPrice
        },
    },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
