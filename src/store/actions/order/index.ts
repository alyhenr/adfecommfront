import { setError } from "../../reducers/errors/errorReducer";
import type { Dispatch } from "@reduxjs/toolkit";
import type { Order } from "../../../types";
import type { OrderRequest, StripePaymentResponse } from "../../types/order";
import { AxiosError, type AxiosResponse } from "axios";
import api from "../../../api/api";

export const createStripePaymentSecret = (amount: number) => async (dispatch: Dispatch): Promise<StripePaymentResponse> => {
    try {
        dispatch(setError({ errorMessage: "", isLoading: true }));
        
        const { data }: AxiosResponse<StripePaymentResponse> = await api.post(`/users/order/payments/stripe`, {
            amount, currency: "brl"
        });
        
        if (data instanceof AxiosError) throw data;
        dispatch(setError({ errorMessage: "", isLoading: false }));

        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            dispatch(setError({ 
                errorMessage: error?.response?.data?.message || "Falha ao criar intenção de pagamento...", 
                isLoading: false 
            }));
        }
        
        return { success: false, clientSecret: "", paymentId: "" };
    }
};

export const confirmStripePayment = (paymentId: string, pgResponseMessage: string) => async (dispatch: Dispatch): Promise<{ success: boolean, message: string, order: Order | null }> => {
    try {
        dispatch(setError({ errorMessage: "", isLoading: true }));
        
        const { data }: AxiosResponse<Order> = await api.post(`/users/order/payments/confirm/${paymentId}/${pgResponseMessage}`);
        
        if (data instanceof AxiosError) throw data;
        dispatch(setError({ errorMessage: "", isLoading: false }));

        localStorage.removeItem("cartItems");

        return { success: true, message: data.payment.pgResponseMessage, order: data };
    } catch (error) {
        if (error instanceof AxiosError) {
            dispatch(setError({ 
                errorMessage: error?.response?.data?.message || "Falha ao confirmar pagamento...", 
                isLoading: false 
            }));

            return { success: false, message: "Falha ao confirmar o pagamento com o provedor: " + error?.response?.data?.message, order: null };
        }
        
        return { success: false, message: "Falha ao confirmar o pagamento com o provedor", order: null };
    }
};

export const createOrder = ({ paymentMethod, orderRequest }: {
    paymentMethod: string;
    orderRequest: OrderRequest;
}) => async (dispatch: Dispatch): Promise<{ success: boolean, message: string }> => {
    try {
        dispatch(setError({ errorMessage: "", isLoading: true }));
        
        const { data }: AxiosResponse<Order> = await api.post(`/users/orders/${paymentMethod}`, {
            ...orderRequest 
        });
        
        if (data instanceof AxiosError) throw data;
        dispatch(setError({ errorMessage: "", isLoading: false }));

        localStorage.removeItem("cartItems");

        return { success: true, message: data.payment.pgResponseMessage };
    } catch (error) {
        if (error instanceof AxiosError) {
            dispatch(setError({ 
                errorMessage: error?.response?.data?.message || "Falha ao criar pedido...", 
                isLoading: false 
            }));

            return { success: false, message: "Falha ao confirmar o pagamento com o provedor: " + error?.response?.data?.message };
        }
        
        return { success: false, message: "Falha ao confirmar o pagamento com o provedor"};
    }
}; 