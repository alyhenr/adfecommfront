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