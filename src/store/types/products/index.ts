import type { Pagination, Product } from "../../../types";

export type ProductState = {
    products: Product[];
    pagination: Pagination;
};

export type ProductsResponse = {
    content: Product[];
} & Pagination;

export type FilteredProductState = {
    filteredProducts: Product[];
}; 