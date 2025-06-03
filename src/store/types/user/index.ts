export type UserProfile = {
    userId: number;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    address?: UserAddress;
};

export type UserAddress = {
    addressId: number;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
};

export type UpdateProfileRequest = {
    username?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
};

export type UpdateAddressRequest = {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
};

export type UserPurchase = {
    orderId: number;
    orderDate: string;
    totalAmount: number;
    status: string;
    items: {
        productId: number;
        productName: string;
        quantity: number;
        price: number;
        imageUrl: string;
    }[];
}; 

export interface UserState {
    profile: UserProfile;
    purchases: UserPurchase[];
}