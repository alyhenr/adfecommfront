export interface Category {
    categoryId: number;
    categoryName: string;
}

export interface Product {
    productId: number;
    productName: string;
    imageUrl: string;
    description: string;
    quantity: number;
    price: number;
    discount: number;
    category: Category;
}

export interface Pagination {
    pageNumber: number,
    pageSize: number,
    totalElements: number,
    totalPages: number,
    lastPage: boolean,
}

export interface ProductsResponse extends Pagination {
    content: Product[],
}

export interface CategoriesResponse extends Pagination {
    content: Category[],
}

export interface DispatchState<T> extends Pagination {
    type: string,
    content: T[]
}

export interface Cart {
    products: Product[],
    totalPrice: number,
}

export interface CartItem {
    product: Product,
    quantity: number,
    discount: number,
    price: number,
}

export enum Role {
    ROLE_ADMIN,
    ROLE_USER
}

export interface User {
    userId: number,
    username: string,
    email: string,
    roles: Role[],
}

export interface Address {
    addressId: number,
    city: string,
    state: string,
    zipCode: string,
    number: number,
    reference: string,
    buildingName: string,
    streetName: string,
}

export enum AddressFormOperation {
    CREATE, EDIT, DELETE
}