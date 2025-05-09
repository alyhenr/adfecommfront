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