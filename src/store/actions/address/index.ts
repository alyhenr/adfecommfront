import { setAddresses } from "../../reducers/address/addressReducer";
import { setError } from "../../reducers/errors/errorReducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Address } from "../../../types";
import { AxiosError, type AxiosResponse } from "axios";
import api from "../../../api/api";
import type { RootState } from "../../index";

export const fetchAddressThunk = createAsyncThunk(
    'address/fetchAddress',
    async (_, { dispatch }) => {
        try {
            dispatch(setError({ errorMessage: "", isLoading: true }));
            
            const { data }: AxiosResponse<Address[]> = await api.get(`/users/addresses/user`);
            
            if (data instanceof AxiosError) throw data;

            dispatch(
                setAddresses({
                    addresses: data
                }),
            );
            dispatch(setError({ errorMessage: "", isLoading: false }));
            return { success: true, message: "Endereços carregados com sucesso" };
        } catch (error) {
            if (error instanceof AxiosError) {
                dispatch(setError({ 
                    errorMessage: error?.response?.data?.message || "Falha ao buscar endereços...", 
                    isLoading: false 
                }));
            }
            return { success: false, message: "Falha ao buscar endereços" };
        }
    }
);

export const addAddress = createAsyncThunk(
    'address/addAddress',
    async (address: Address, { dispatch, getState }) => {
        const state = getState() as RootState;
        const { addresses } = state.addressState;
        try {
            dispatch(setError({ errorMessage: "", isLoading: true }));
            
            const { data }: AxiosResponse<Address> = await api.post(`/users/addresses/user/address`, address);
            
            if (data instanceof AxiosError) throw data;

            dispatch(
                setAddresses({
                    addresses: [...addresses, data]
                }),
            );
            dispatch(setError({ errorMessage: "", isLoading: false }));

            return { success: true, message: "Endereço cadastrado com sucesso" };
        } catch (error) {
            if (error instanceof AxiosError) {
                dispatch(setError({ 
                    errorMessage: error?.response?.data?.message || "Falha ao cadastrar endereço...", 
                    isLoading: false 
                }));

                return { success: false, message: "Falha ao cadastrar endereço: " + error?.response?.data?.message };
            }
            
            return { success: false, message: "Falha ao cadastrar endereço"};
        }
    }
);

export const editAddress = createAsyncThunk(
    'address/editAddress',
    async (address: Address, { dispatch, getState }) => {
        const state = getState() as RootState;
        const { addresses } = state.addressState;
        try {
            dispatch(setError({ errorMessage: "", isLoading: true }));
            
            const { data }: AxiosResponse<Address> = await api.put(`/users/addresses/${address.addressId}`, address);
            
            if (data instanceof AxiosError) throw data;

            dispatch(
                setAddresses({
                    addresses: addresses.map((a: Address) => a.addressId == data.addressId ? data : a)
                }),
            );
            dispatch(setError({ errorMessage: "", isLoading: false }));

            return { success: true, message: "Endereço alterado com sucesso" };
        } catch (error) {
            if (error instanceof AxiosError) {
                dispatch(setError({ 
                    errorMessage: error?.response?.data?.message || "Falha ao editar endereço...", 
                    isLoading: false 
                }));

                return { success: false, message: "Falha ao editar endereço: " + error?.response?.data?.message };
            }
            
            return { success: false, message: "Falha ao editar endereço"};
        }
    }
);

export const deleteAddress = createAsyncThunk(
    'address/deleteAddress',
    async (addressId: number, { dispatch, getState }) => {
        const state = getState() as RootState;
        const { addresses } = state.addressState;
        try {
            dispatch(setError({ errorMessage: "", isLoading: true }));
            
            const { data }: AxiosResponse<Address> = await api.delete(`/users/addresses/${addressId}`);
            
            if (data instanceof AxiosError) throw data;

            dispatch(
                setAddresses({
                    addresses: addresses.filter(a => a.addressId != data.addressId)
                }),
            );
            dispatch(setError({ errorMessage: "", isLoading: false }));

            return { success: true, message: "Endereço excluído com sucesso" };
        } catch (error) {
            if (error instanceof AxiosError) {
                dispatch(setError({ 
                    errorMessage: error?.response?.data?.message || "Falha ao excluir endereço...", 
                    isLoading: false 
                }));

                return { success: false, message: "Falha ao excluir endereço: " + error?.response?.data?.message };
            }
            
            return { success: false, message: "Falha ao excluir endereço"};
        }
    }
); 