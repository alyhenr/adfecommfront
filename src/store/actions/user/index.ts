import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UpdateProfileRequest, UpdateAddressRequest, UserProfile, UserPurchase } from "../../types/user";
import api from "../../../api/api";

export const fetchUserProfile = createAsyncThunk(
    "user/fetchProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<UserProfile>(`/users/profile`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    "user/updateProfile",
    async (data: UpdateProfileRequest, { rejectWithValue }) => {
        try {
            const response = await api.put<UserProfile>(`/users/profile`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update profile");
        }
    }
);

export const updateUserAddress = createAsyncThunk(
    "user/updateAddress",
    async (data: UpdateAddressRequest, { rejectWithValue }) => {
        try {
            const response = await api.put<UserProfile>(`/users/address`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update address");
        }
    }
);

export const fetchUserPurchases = createAsyncThunk(
    "user/fetchPurchases",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<UserPurchase[]>(`/users/purchases`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch purchases");
        }
    }
); 