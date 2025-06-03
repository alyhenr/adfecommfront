import type { User } from "../../../types";

export type AuthState = {
    user: User;
    expiresIn: number;
    accessToken?: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type SignUpRequest = {
    username: string;
    email: string;
    password: string;
};

export type GoogleAuthRequest = {
    credential: string;
}; 