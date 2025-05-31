import type { Category, Pagination } from "../../../types";

export type CategoryState = {
    categories: Category[];
    pagination: Pagination;
};

export type CategoriesResponse = {
    content: Category[];
} & Pagination; 