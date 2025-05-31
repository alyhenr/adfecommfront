import type { User } from "../../../types";

export type AuthState = {
    user: User;
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