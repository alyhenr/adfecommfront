import type { Order, OrderStatus } from "../../../types";

export type OrderState = {
    orders: Order[];
};

export type OrderRequest = {
    addressId: number;
    pgPaymentId: string;
    pgStatus: OrderStatus;
    pgResponseMessage: string;
    tax: number;
};

export type StripePaymentResponse = {
    success: boolean;
    clientSecret: string;
    paymentId: string;
}; 