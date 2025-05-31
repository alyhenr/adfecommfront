import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { OrderState } from "../../types/order";

const initialState: OrderState = {
    orders: []
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrders: (
            state,
            action: PayloadAction<OrderState>
        ) => {
            state.orders = action.payload.orders;
        },
    },
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer; 